import type { ReactNode } from 'react'

export interface Column<T> {
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string | number
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
  actions?: (row: T) => ReactNode
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  isLoading,
  error,
  emptyMessage = 'No hay registros todavía.',
  actions,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-slate-500 dark:text-slate-400">
        Cargando datos…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
        {error}
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">
            {columns.map((col) => (
              <th key={col.header} className={`px-3 py-2 font-semibold ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
            {actions && <th className="px-3 py-2 text-right font-semibold">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-slate-100 last:border-0 hover:bg-white/50 dark:border-white/5 dark:hover:bg-white/5"
            >
              {columns.map((col) => (
                <td key={col.header} className={`px-3 py-3 text-slate-700 dark:text-slate-200 ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
              {actions && <td className="px-3 py-3 text-right">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
