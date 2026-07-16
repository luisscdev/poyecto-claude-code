import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { FormField, inputClasses } from '../../components/ui/FormField'
import { Select } from '../../components/ui/Select'
import { ESTADOS_CITA } from '../../api/types'
import type { Cita, CitaInput, Medico, Paciente } from '../../api/types'
import { ApiError } from '../../api/client'
import { usePacientes } from '../pacientes/usePacientes'
import { useMedicos } from '../medicos/useMedicos'

const schema = z.object({
  fechaHora: z.string().min(1, 'La fecha y hora son obligatorias'),
  estado: z.enum(['PROGRAMADA', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA']),
  motivo: z.string().optional(),
  pacienteId: z.coerce.number({ message: 'Selecciona un paciente' }).int().positive(),
  medicoId: z.coerce.number({ message: 'Selecciona un médico' }).int().positive(),
})

const estadoLabels: Record<string, string> = {
  PROGRAMADA: 'Programada',
  CONFIRMADA: 'Confirmada',
  CANCELADA: 'Cancelada',
  COMPLETADA: 'Completada',
}

function toDatetimeLocal(value?: string) {
  if (!value) return ''
  return value.slice(0, 16)
}

interface CitaFormProps {
  initialValue?: Cita
  onSubmit: (input: CitaInput) => Promise<unknown>
  onCancel: () => void
}

export function CitaForm({ initialValue, onSubmit, onCancel }: CitaFormProps) {
  const { data: pacientes } = usePacientes()
  const { data: medicos } = useMedicos()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>, unknown, CitaInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      fechaHora: toDatetimeLocal(initialValue?.fechaHora),
      estado: initialValue?.estado ?? 'PROGRAMADA',
      motivo: initialValue?.motivo ?? '',
      pacienteId: initialValue?.paciente.id,
      medicoId: initialValue?.medico.id,
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof CitaInput, { message })
        })
      } else {
        setError('fechaHora', { message: err instanceof Error ? err.message : 'Error inesperado' })
      }
    }
  })

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Paciente" htmlFor="pacienteId" error={errors.pacienteId?.message}>
          <Select id="pacienteId" {...register('pacienteId')} defaultValue="">
            <option value="" disabled>
              Selecciona un paciente
            </option>
            {pacientes?.map((p: Paciente) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Médico" htmlFor="medicoId" error={errors.medicoId?.message}>
          <Select id="medicoId" {...register('medicoId')} defaultValue="">
            <option value="" disabled>
              Selecciona un médico
            </option>
            {medicos?.map((m: Medico) => (
              <option key={m.id} value={m.id}>
                {m.nombre} {m.apellido} · {m.especialidad.nombre}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Fecha y hora" htmlFor="fechaHora" error={errors.fechaHora?.message}>
          <input
            id="fechaHora"
            type="datetime-local"
            className={inputClasses}
            {...register('fechaHora')}
          />
        </FormField>
        <FormField label="Estado" htmlFor="estado" error={errors.estado?.message}>
          <Select id="estado" {...register('estado')}>
            {ESTADOS_CITA.map((estado) => (
              <option key={estado} value={estado}>
                {estadoLabels[estado]}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      <FormField label="Motivo" htmlFor="motivo" error={errors.motivo?.message}>
        <input id="motivo" className={inputClasses} {...register('motivo')} />
      </FormField>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValue ? 'Guardar cambios' : 'Crear cita'}
        </Button>
      </div>
    </form>
  )
}
