import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { FormField, inputClasses } from '../../components/ui/FormField'
import { Select } from '../../components/ui/Select'
import type { Especialidad, Medico, MedicoInput } from '../../api/types'
import { ApiError } from '../../api/client'
import { useEspecialidades } from '../especialidades/useEspecialidades'

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  numeroColegiado: z.string().min(1, 'El número de colegiado es obligatorio'),
  telefono: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  especialidadId: z.coerce.number({ message: 'Selecciona una especialidad' }).int().positive(),
})

interface MedicoFormProps {
  initialValue?: Medico
  onSubmit: (input: MedicoInput) => Promise<unknown>
  onCancel: () => void
}

export function MedicoForm({ initialValue, onSubmit, onCancel }: MedicoFormProps) {
  const { data: especialidades } = useEspecialidades()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>, unknown, MedicoInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialValue?.nombre ?? '',
      apellido: initialValue?.apellido ?? '',
      numeroColegiado: initialValue?.numeroColegiado ?? '',
      telefono: initialValue?.telefono ?? '',
      email: initialValue?.email ?? '',
      especialidadId: initialValue?.especialidad.id,
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof MedicoInput, { message })
        })
      } else {
        setError('nombre', { message: err instanceof Error ? err.message : 'Error inesperado' })
      }
    }
  })

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nombre" htmlFor="nombre" error={errors.nombre?.message}>
          <input id="nombre" className={inputClasses} {...register('nombre')} />
        </FormField>
        <FormField label="Apellido" htmlFor="apellido" error={errors.apellido?.message}>
          <input id="apellido" className={inputClasses} {...register('apellido')} />
        </FormField>
      </div>
      <FormField label="Número de colegiado" htmlFor="numeroColegiado" error={errors.numeroColegiado?.message}>
        <input id="numeroColegiado" className={inputClasses} {...register('numeroColegiado')} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Teléfono" htmlFor="telefono" error={errors.telefono?.message}>
          <input id="telefono" className={inputClasses} {...register('telefono')} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" className={inputClasses} {...register('email')} />
        </FormField>
      </div>
      <FormField label="Especialidad" htmlFor="especialidadId" error={errors.especialidadId?.message}>
        <Select id="especialidadId" {...register('especialidadId')} defaultValue="">
          <option value="" disabled>
            Selecciona una especialidad
          </option>
          {especialidades?.map((e: Especialidad) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </Select>
      </FormField>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValue ? 'Guardar cambios' : 'Crear médico'}
        </Button>
      </div>
    </form>
  )
}
