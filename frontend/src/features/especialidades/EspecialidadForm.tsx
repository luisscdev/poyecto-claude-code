import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { FormField, inputClasses } from '../../components/ui/FormField'
import type { Especialidad, EspecialidadInput } from '../../api/types'
import { ApiError } from '../../api/client'

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
})

interface EspecialidadFormProps {
  initialValue?: Especialidad
  onSubmit: (input: EspecialidadInput) => Promise<unknown>
  onCancel: () => void
}

export function EspecialidadForm({ initialValue, onSubmit, onCancel }: EspecialidadFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EspecialidadInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialValue?.nombre ?? '',
      descripcion: initialValue?.descripcion ?? '',
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof EspecialidadInput, { message })
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
      <FormField label="Descripción" htmlFor="descripcion" error={errors.descripcion?.message}>
        <input id="descripcion" className={inputClasses} {...register('descripcion')} />
      </FormField>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialValue ? 'Guardar cambios' : 'Crear especialidad'}
        </Button>
      </div>
    </form>
  )
}
