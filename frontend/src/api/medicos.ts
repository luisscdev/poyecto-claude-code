import { apiClient } from './client'
import type { Medico, MedicoInput } from './types'

export const medicosApi = {
  list: () => apiClient.get<Medico[]>('/medicos'),
  get: (id: number) => apiClient.get<Medico>(`/medicos/${id}`),
  create: (input: MedicoInput) => apiClient.post<Medico>('/medicos', input),
  update: (id: number, input: MedicoInput) => apiClient.put<Medico>(`/medicos/${id}`, input),
  remove: (id: number) => apiClient.del(`/medicos/${id}`),
}
