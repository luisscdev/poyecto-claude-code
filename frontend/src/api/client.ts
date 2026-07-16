const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8353/api'

export interface ApiFieldErrors {
  [field: string]: string
}

export class ApiError extends Error {
  status: number
  fieldErrors: ApiFieldErrors | null

  constructor(status: number, message: string, fieldErrors: ApiFieldErrors | null = null) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `Error ${response.status}`
    let fieldErrors: ApiFieldErrors | null = null
    try {
      const body = await response.json()
      message = body.message ?? message
      fieldErrors = body.fieldErrors ?? null
    } catch {
      // respuesta sin cuerpo JSON, se usa el mensaje por defecto
    }
    throw new ApiError(response.status, message, fieldErrors)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path: string) => request<void>(path, { method: 'DELETE' }),
}
