import type { EstadoCita } from '../../api/types'

const estadoClasses: Record<EstadoCita, string> = {
  PROGRAMADA: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  CONFIRMADA: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  CANCELADA: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  COMPLETADA: 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300',
}

const estadoLabels: Record<EstadoCita, string> = {
  PROGRAMADA: 'Programada',
  CONFIRMADA: 'Confirmada',
  CANCELADA: 'Cancelada',
  COMPLETADA: 'Completada',
}

export function Badge({ estado }: { estado: EstadoCita }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${estadoClasses[estado]}`}
    >
      {estadoLabels[estado]}
    </span>
  )
}
