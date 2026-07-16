import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { FormField, inputClasses } from '../../components/ui/FormField'
import type { Paciente, PacienteInput } from '../../api/types'
import { ApiError } from '../../api/client'

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  documentoIdentidad: z.string().min(1, 'El documento es obligatorio'),
  fechaNacimiento: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  telefono: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  direccion: z.string().optional(),
})

interface PacienteFormProps {
  initialValue?: Paciente
  onSubmit: (input: PacienteInput) => Promise<unknown>
  onCancel: () => void
}

export function PacienteForm({ initialValue, onSubmit, onCancel }: PacienteFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PacienteInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialValue?.nombre ?? '',
      apellido: initialValue?.apellido ?? '',
      documentoIdentidad: initialValue?.documentoIdentidad ?? '',
      fechaNacimiento: initialValue?.fechaNacimiento ?? '',
      telefono: initialValue?.telefono ?? '',
      email: initialValue?.email ?? '',
      direccion: initialValue?.direccion ?? '',
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof PacienteInput, { message })
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
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Documento de identidad"
          htmlFor="documentoIdentidad"
          error={errors.documentoIdentidad?.message}
        >
          <input id="documentoIdentidad" className={inputClasses} {...register('documentoIdentidad')} />
        </FormField>
        <FormField
          label="Fecha de nacimiento"
          htmlFor="fechaNacimiento"
          error={errors.fechaNacimiento?.message}
        >
          <input
            id="fechaNacimiento"
            type="date"
            className={inputClasses}
            {...register('fechaNacimiento')}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Teléfono" htmlFor="telefono" error={errors.telefono?.message}>
          <input id="telefono" className={inputClasses} {...register('telefono')} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" className={inputClasses} {...register('email')} />
        </FormField>
      </div>
      <FormField label="Dirección" htmlFor="direccion" error={errors.direccion?.message}>
        <input id="direccion" className={inputClasses} {...register('direccion')} />
      </FormField>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValue ? 'Guardar cambios' : 'Crear paciente'}
        </Button>
      </div>
    </form>
  )
}
