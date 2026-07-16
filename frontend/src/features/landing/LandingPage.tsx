import { Link } from 'react-router'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { HeroScene } from './HeroScene'
import { useDashboardSummary } from './useDashboardSummary'

const summaryLabels: { key: 'pacientes' | 'medicos' | 'especialidades' | 'citas'; label: string }[] = [
  { key: 'pacientes', label: 'Pacientes' },
  { key: 'medicos', label: 'Médicos' },
  { key: 'especialidades', label: 'Especialidades' },
  { key: 'citas', label: 'Citas' },
]

export function LandingPage() {
  const { data: summary } = useDashboardSummary()

  return (
    <div className="flex flex-col gap-10">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            Proyecto educativo
          </span>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
            Gestión moderna de citas médicas
          </h1>
          <p className="max-w-md text-base text-slate-600 dark:text-slate-300">
            Administra pacientes, médicos, especialidades y citas desde una interfaz simple,
            conectada a una API REST con Spring Boot.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/citas">
              <Button>Ver citas</Button>
            </Link>
            <Link to="/pacientes">
              <Button variant="secondary">Ver pacientes</Button>
            </Link>
          </div>
        </div>
        <div className="h-72 w-full overflow-hidden rounded-3xl border border-white/40 shadow-xl shadow-brand-900/10 dark:border-white/10 sm:h-96">
          <HeroScene />
        </div>
      </section>

      {summary && (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summaryLabels.map(({ key, label }) => (
            <Card key={key} className="text-center">
              <p className="text-3xl font-extrabold text-brand-700 dark:text-brand-300">
                {summary[key]}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </Card>
          ))}
        </section>
      )}
    </div>
  )
}
