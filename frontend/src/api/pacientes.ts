import { apiClient } from './client'
import type { Paciente, PacienteInput } from './types'

export const pacientesApi = {
  list: () => apiClient.get<Paciente[]>('/pacientes'),
  get: (id: number) => apiClient.get<Paciente>(`/pacientes/${id}`),
  create: (input: PacienteInput) => apiClient.post<Paciente>('/pacientes', input),
  update: (id: number, input: PacienteInput) => apiClient.put<Paciente>(`/pacientes/${id}`, input),
  remove: (id: number) => apiClient.del(`/pacientes/${id}`),
}
