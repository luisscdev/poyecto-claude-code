import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { medicosApi } from '../../api/medicos'
import type { MedicoInput } from '../../api/types'

const KEY = ['medicos']

export function useMedicos() {
  return useQuery({ queryKey: KEY, queryFn: medicosApi.list })
}

export function useCreateMedico() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: MedicoInput) => medicosApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateMedico() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: MedicoInput }) => medicosApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteMedico() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => medicosApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
