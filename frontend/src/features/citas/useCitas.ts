import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { citasApi } from '../../api/citas'
import type { CitaInput } from '../../api/types'

const KEY = ['citas']

export function useCitas() {
  return useQuery({ queryKey: KEY, queryFn: citasApi.list })
}

export function useCreateCita() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CitaInput) => citasApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateCita() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: CitaInput }) => citasApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteCita() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => citasApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
