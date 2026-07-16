import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { especialidadesApi } from '../../api/especialidades'
import type { EspecialidadInput } from '../../api/types'

const KEY = ['especialidades']

export function useEspecialidades() {
  return useQuery({ queryKey: KEY, queryFn: especialidadesApi.list })
}

export function useCreateEspecialidad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: EspecialidadInput) => especialidadesApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateEspecialidad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: EspecialidadInput }) =>
      especialidadesApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteEspecialidad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => especialidadesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
