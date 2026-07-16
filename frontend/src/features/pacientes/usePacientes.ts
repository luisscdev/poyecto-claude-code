import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pacientesApi } from '../../api/pacientes'
import type { PacienteInput } from '../../api/types'

const KEY = ['pacientes']

export function usePacientes() {
  return useQuery({ queryKey: KEY, queryFn: pacientesApi.list })
}

export function useCreatePaciente() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: PacienteInput) => pacientesApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdatePaciente() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: PacienteInput }) =>
      pacientesApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeletePaciente() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => pacientesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
