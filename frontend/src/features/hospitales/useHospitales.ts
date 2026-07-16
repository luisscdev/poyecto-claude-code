import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hospitalesApi } from '../../api/hospitales'
import type { HospitalInput } from '../../api/types'

const KEY = ['hospitales']

export function useHospitales() {
  return useQuery({ queryKey: KEY, queryFn: hospitalesApi.list })
}

export function useCreateHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: HospitalInput) => hospitalesApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: HospitalInput }) =>
      hospitalesApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteHospital() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => hospitalesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
