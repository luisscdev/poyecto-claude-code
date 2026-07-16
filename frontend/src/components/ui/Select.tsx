import type { SelectHTMLAttributes } from 'react'
import { inputClasses } from './FormField'

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClasses} ${props.className ?? ''}`} />
}
