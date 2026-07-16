import { apiClient } from './client'
import type { Cita, CitaInput } from './types'

export const citasApi = {
  list: () => apiClient.get<Cita[]>('/citas'),
  get: (id: number) => apiClient.get<Cita>(`/citas/${id}`),
  byPaciente: (pacienteId: number) => apiClient.get<Cita[]>(`/citas/paciente/${pacienteId}`),
  byMedico: (medicoId: number) => apiClient.get<Cita[]>(`/citas/medico/${medicoId}`),
  create: (input: CitaInput) => apiClient.post<Cita>('/citas', input),
  update: (id: number, input: CitaInput) => apiClient.put<Cita>(`/citas/${id}`, input),
  remove: (id: number) => apiClient.del(`/citas/${id}`),
}
