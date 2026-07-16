import { apiClient } from './client'
import type { Hospital, HospitalInput } from './types'

export const hospitalesApi = {
  list: () => apiClient.get<Hospital[]>('/hospitales'),
  get: (id: number) => apiClient.get<Hospital>(`/hospitales/${id}`),
  create: (input: HospitalInput) => apiClient.post<Hospital>('/hospitales', input),
  update: (id: number, input: HospitalInput) =>
    apiClient.put<Hospital>(`/hospitales/${id}`, input),
  remove: (id: number) => apiClient.del(`/hospitales/${id}`),
}
