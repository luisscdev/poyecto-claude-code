import { NavLink } from 'react-router'

const links = [
  { to: '/pacientes', label: 'Pacientes' },
  { to: '/medicos', label: 'Médicos' },
  { to: '/especialidades', label: 'Especialidades' },
  { to: '/citas', label: 'Citas' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-heading text-lg font-bold text-brand-700 dark:text-brand-300">
          <span aria-hidden="true">✚</span>
          Citas Médicas
        </NavLink>
        <ul className="flex flex-wrap items-center gap-1 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
