import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { DataTable, type Column } from '../../components/ui/DataTable'
import type { Especialidad } from '../../api/types'
import { ApiError } from '../../api/client'
import {
  useCreateEspecialidad,
  useDeleteEspecialidad,
  useEspecialidades,
  useUpdateEspecialidad,
} from './useEspecialidades'
import { EspecialidadForm } from './EspecialidadForm'

export function EspecialidadesPage() {
  const { data, isLoading, error } = useEspecialidades()
  const createMutation = useCreateEspecialidad()
  const updateMutation = useUpdateEspecialidad()
  const deleteMutation = useDeleteEspecialidad()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Especialidad | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const columns: Column<Especialidad>[] = [
    { header: 'Nombre', render: (row) => row.nombre },
    { header: 'Descripción', render: (row) => row.descripcion || '—' },
  ]

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (row: Especialidad) => {
    setEditing(row)
    setModalOpen(true)
  }

  const handleDelete = async (row: Especialidad) => {
    setDeleteError(null)
    if (!confirm(`¿Eliminar la especialidad "${row.nombre}"?`)) return
    try {
      await deleteMutation.mutateAsync(row.id)
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'No se pudo eliminar')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-800 dark:text-slate-100">
          Especialidades
        </h1>
        <Button onClick={openCreate}>+ Nueva especialidad</Button>
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
          error={error ? 'No se pudieron cargar las especialidades.' : null}
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

      <Modal
        open={modalOpen}
        title={editing ? 'Editar especialidad' : 'Nueva especialidad'}
        onClose={() => setModalOpen(false)}
      >
        <EspecialidadForm
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
