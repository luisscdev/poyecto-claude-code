import { apiClient } from './client'
import type { Especialidad, EspecialidadInput } from './types'

export const especialidadesApi = {
  list: () => apiClient.get<Especialidad[]>('/especialidades'),
  get: (id: number) => apiClient.get<Especialidad>(`/especialidades/${id}`),
  create: (input: EspecialidadInput) => apiClient.post<Especialidad>('/especialidades', input),
  update: (id: number, input: EspecialidadInput) =>
    apiClient.put<Especialidad>(`/especialidades/${id}`, input),
  remove: (id: number) => apiClient.del(`/especialidades/${id}`),
}
