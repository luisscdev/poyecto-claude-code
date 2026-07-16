export interface Especialidad {
  id: number
  nombre: string
  descripcion: string | null
}

export interface EspecialidadInput {
  nombre: string
  descripcion?: string
}

export interface Medico {
  id: number
  nombre: string
  apellido: string
  numeroColegiado: string
  telefono: string | null
  email: string | null
  especialidad: Especialidad
}

export interface MedicoInput {
  nombre: string
  apellido: string
  numeroColegiado: string
  telefono?: string
  email?: string
  especialidadId: number
}

export interface Paciente {
  id: number
  nombre: string
  apellido: string
  documentoIdentidad: string
  fechaNacimiento: string
  telefono: string | null
  email: string | null
  direccion: string | null
}

export interface PacienteInput {
  nombre: string
  apellido: string
  documentoIdentidad: string
  fechaNacimiento: string
  telefono?: string
  email?: string
  direccion?: string
}

export type EstadoCita = 'PROGRAMADA' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'

export const ESTADOS_CITA: EstadoCita[] = ['PROGRAMADA', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA']

export interface Cita {
  id: number
  fechaHora: string
  estado: EstadoCita
  motivo: string | null
  paciente: Paciente
  medico: Medico
}

export interface CitaInput {
  fechaHora: string
  estado: EstadoCita
  motivo?: string
  pacienteId: number
  medicoId: number
}

export interface Hospital {
  id: number
  nombre: string
  direccion: string
  ciudad: string
  telefono: string | null
  email: string | null
}

export interface HospitalInput {
  nombre: string
  direccion: string
  ciudad: string
  telefono?: string
  email?: string
}

export interface DashboardSummary {
  pacientes: number
  medicos: number
  especialidades: number
  citas: number
}
