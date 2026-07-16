import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { DataTable, type Column } from '../../components/ui/DataTable'
import type { Paciente } from '../../api/types'
import { ApiError } from '../../api/client'
import { useCreatePaciente, useDeletePaciente, usePacientes, useUpdatePaciente } from './usePacientes'
import { PacienteForm } from './PacienteForm'

export function PacientesPage() {
  const { data, isLoading, error } = usePacientes()
  const createMutation = useCreatePaciente()
  const updateMutation = useUpdatePaciente()
  const deleteMutation = useDeletePaciente()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Paciente | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const columns: Column<Paciente>[] = [
    { header: 'Nombre', render: (row) => `${row.nombre} ${row.apellido}` },
    { header: 'Documento', render: (row) => row.documentoIdentidad },
    { header: 'Nacimiento', render: (row) => row.fechaNacimiento },
    { header: 'Contacto', render: (row) => row.email || row.telefono || '—' },
  ]

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (row: Paciente) => {
    setEditing(row)
    setModalOpen(true)
  }

  const handleDelete = async (row: Paciente) => {
    setDeleteError(null)
    if (!confirm(`¿Eliminar al paciente "${row.nombre} ${row.apellido}"?`)) return
    try {
      await deleteMutation.mutateAsync(row.id)
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : 'No se pudo eliminar')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-800 dark:text-slate-100">Pacientes</h1>
        <Button onClick={openCreate}>+ Nuevo paciente</Button>
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
          error={error ? 'No se pudieron cargar los pacientes.' : null}
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
        title={editing ? 'Editar paciente' : 'Nuevo paciente'}
        onClose={() => setModalOpen(false)}
      >
        <PacienteForm
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
