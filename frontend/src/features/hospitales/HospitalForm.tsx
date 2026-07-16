import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { FormField, inputClasses } from '../../components/ui/FormField'
import type { Hospital, HospitalInput } from '../../api/types'
import { ApiError } from '../../api/client'

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria'),
  telefono: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
})

interface HospitalFormProps {
  initialValue?: Hospital
  onSubmit: (input: HospitalInput) => Promise<unknown>
  onCancel: () => void
}

export function HospitalForm({ initialValue, onSubmit, onCancel }: HospitalFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<HospitalInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialValue?.nombre ?? '',
      direccion: initialValue?.direccion ?? '',
      ciudad: initialValue?.ciudad ?? '',
      telefono: initialValue?.telefono ?? '',
      email: initialValue?.email ?? '',
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof HospitalInput, { message })
        })
      } else {
        setError('nombre', { message: err instanceof Error ? err.message : 'Error inesperado' })
      }
    }
  })

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField label="Nombre" htmlFor="nombre" error={errors.nombre?.message}>
        <input id="nombre" className={inputClasses} {...register('nombre')} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Dirección" htmlFor="direccion" error={errors.direccion?.message}>
          <input id="direccion" className={inputClasses} {...register('direccion')} />
        </FormField>
        <FormField label="Ciudad" htmlFor="ciudad" error={errors.ciudad?.message}>
          <input id="ciudad" className={inputClasses} {...register('ciudad')} />
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
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValue ? 'Guardar cambios' : 'Crear hospital'}
        </Button>
      </div>
    </form>
  )
}
