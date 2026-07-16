import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { DataTable, type Column } from '../../components/ui/DataTable'
import type { Cita } from '../../api/types'
import { ApiError } from '../../api/client'
import { useCitas, useCreateCita, useDeleteCita, useUpdateCita } from './useCitas'
import { CitaForm } from './CitaForm'

function formatFechaHora(value: string) {
  const date = new Date(value)
  return date.toLocaleString('es-EC', { dateStyle: 'medium', timeStyle: 'short' })
}

export function CitasPage() {
  const { data, isLoading, error } = useCitas()
  const createMutation = useCreateCita()
  const updateMutation = useUpdateCita()
  const deleteMutation = useDeleteCita()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Cita | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const columns: Column<Cita>[] = [
    { header: 'Fecha y hora', render: (row) => formatFechaHora(row.fechaHora) },
    { header: 'Paciente', render: (row) => `${row.paciente.nombre} ${row.paciente.apellido}` },
    {
      header: 'Médico',
      render: (row) => `${row.medico.nombre} ${row.medico.apellido} (${row.medico.especialidad.nombre})`,
    },
    { header: 'Estado', render: (row) => <Badge estado={row.estado} /> },
    { header: 'Motivo', render: (row) => row.motivo || '—' },
  ]

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (row: Cita) => {
    setEditing(row)
    setModalOpen(true)
  }

  const handleDelete = async (row: Cita) => {
    setDeleteError(null)
    if (!confirm('¿Eliminar esta cita?')) return
    try {
      await deleteMutation.mutateAsync(row.id)
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'No se pudo eliminar')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-800 dark:text-slate-100">Citas</h1>
        <Button onClick={openCreate}>+ Nueva cita</Button>
      </div>

      {deleteError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {deleteError}
        </div>
      )}

      <Card>
        <DataTable
          columns={columns}
          rows={data ?? []}
          rowKey={(row) => row.id}
          isLoading={isLoading}
          error={error ? 'No se pudieron cargar las citas.' : null}
          actions={(row) => (
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => openEdit(row)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(row)}>
                Eliminar
              </Button>
            </div>
          )}
        />
      </Card>

      <Modal open={modalOpen} title={editing ? 'Editar cita' : 'Nueva cita'} onClose={() => setModalOpen(false)}>
        <CitaForm
          initialValue={editing ?? undefined}
          onCancel={() => setModalOpen(false)}
          onSubmit={async (input) => {
            if (editing) {
              await updateMutation.mutateAsync({ id: editing.id, input })
            } else {
              await createMutation.mutateAsync(input)
            }
            setModalOpen(false)
          }}
        />
      </Modal>
    </div>
  )
}
