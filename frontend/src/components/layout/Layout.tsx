import { Outlet } from 'react-router'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-white/40 py-4 text-center text-xs text-slate-400 dark:border-white/10">
        Proyecto educativo — Citas Médicas · Spring Boot + React
      </footer>
    </div>
  )
}
