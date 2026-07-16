# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The React SPA half of an educational full-stack medical-appointments demo (`citasmedicas`). It consumes the sibling `backend/` Spring Boot API (see `backend/CLAUDE.md`). Domain: pacientes, médicos, especialidades, citas. No authentication. UI copy and code are in Spanish; keep new code consistent with that.

## Commands

Run from `frontend/`:

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 5173) |
| Build | `npm run build` (runs `tsc -b` then `vite build` — a type error fails the build) |
| Lint | `npm run lint` (oxlint, config in `.oxlintrc.json`) |
| Preview build | `npm run preview` |

There is no test runner configured (no Vitest/Jest in `package.json`) — don't assume `npm test` exists.

The backend must be running for any page except the landing to load data. `VITE_API_BASE_URL` in `frontend/.env` (see `.env.example`) must point at the real backend port — **8353**, not 8080 (the root README is wrong; `backend/CLAUDE.md` has the details). `src/api/client.ts` defaults to `http://localhost:8353/api` if the env var is unset.

## Architecture

Every entity (`citas`, `medicos`, `pacientes`, `especialidades`) repeats the same four-file vertical slice. `citas` is the richest (it references the other three) and is the best template to copy:

```
api/entity.ts              thin wrapper: list/get/create/update/remove calling apiClient
features/entity/useEntity.ts   TanStack Query hooks: useEntity (query) + useCreate/useUpdate/useDelete (mutations)
features/entity/EntityPage.tsx table page: Card + DataTable + Modal, owns local UI state
features/entity/EntityForm.tsx react-hook-form + Zod schema, rendered inside the Page's Modal
```

Shared pieces every slice builds on:

- **`api/types.ts`** — hand-written interfaces mirroring the backend response/request DTOs (`Entity` = response shape, `EntityInput` = request shape). Nested relations are embedded objects (`Cita.paciente: Paciente`, `Cita.medico: Medico`), matching the backend's nested `*Response` records. Update this file whenever a backend DTO field changes.
- **`api/client.ts`** — the *only* place `fetch` is called. `apiClient.get/post/put/del` all go through `request()`, which throws `ApiError` (carries `status` and `fieldErrors` parsed straight from the backend's `ApiError` body) on non-2xx responses. Never call `fetch` directly from a feature or component — always go through `apiClient` so error parsing stays centralized.
- **`components/ui/*`** — the only building blocks pages should use for structure: `Card`, `Button`, `Modal`, `DataTable`, `FormField`, `Select`, `Badge`. `DataTable` owns loading/error/empty states via `isLoading`/`error`/`emptyMessage` props — don't reimplement those states inline in a page.
- **`components/layout/Layout.tsx` + `Navbar.tsx`** — the route shell; `App.tsx` nests all entity routes under a single `<Route element={<Layout />}>`.

### Data flow conventions (load-bearing — check these on every change)

- **Query keys are a flat array with a module-level `KEY` constant** per entity hook file (e.g. `const KEY = ['citas']`), not per-hook literals — reuse `KEY` across the query and all its mutations.
- **Every mutation invalidates its entity's query on success**: `onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })`. A new mutation that skips this will leave the table stale after create/edit/delete.
- **Forms never talk to `apiClient` directly.** A `Page` component wires `useCreate.../useUpdate...` mutations and passes an `onSubmit` callback into the `Form`; the `Form` only calls that callback and handles its own validation/error display.
- **Server-side validation errors become field errors, not just banners.** In a form's submit handler, catch `ApiError`, and if `err.fieldErrors` is present, call RHF's `setError(field, { message })` per entry — mirroring the backend's Spanish Bean Validation messages. Only fall back to a generic message when there's no field-level detail.
- **Zod schemas are the client-side mirror of backend `@NotNull`/validation constraints**, with matching Spanish messages, not independent rules — if you add a required field on a `*Request` record in the backend, add the same constraint to the form's Zod schema.
- **IDs in forms are numbers**, coerced from `<select>` string values with `z.coerce.number()` — don't leave them as strings when building the `*Input` payload.

### Styling

Tailwind CSS v4 utility classes inline in JSX (no CSS modules, no styled-components). Dark mode is handled via `dark:` variants throughout — any new UI should support both, matching the existing `slate`/`red` palette usage in `components/ui`. `font-heading` is used for page titles.

`HeroScene.tsx` (React Three Fiber) is the one exception to "plain Tailwind JSX" — it's a decorative Three.js scene scoped to the landing page only, with a CSS-gradient fallback when WebGL is unavailable. Don't use it as a precedent for pulling Three.js into other pages.
