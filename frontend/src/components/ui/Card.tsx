import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/40 bg-white/60 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </div>
  )
}
