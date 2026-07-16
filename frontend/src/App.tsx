import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './features/landing/LandingPage'
import { EspecialidadesPage } from './features/especialidades/EspecialidadesPage'
import { MedicosPage } from './features/medicos/MedicosPage'
import { PacientesPage } from './features/pacientes/PacientesPage'
import { CitasPage } from './features/citas/CitasPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="especialidades" element={<EspecialidadesPage />} />
        <Route path="medicos" element={<MedicosPage />} />
        <Route path="pacientes" element={<PacientesPage />} />
        <Route path="citas" element={<CitasPage />} />
      </Route>
    </Routes>
  )
}
