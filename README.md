# Citas Médicas — Proyecto Full-Stack Educativo

Proyecto de demostración full-stack: backend en **Spring Boot 4.1.0** y frontend en **React 19 + Vite 8**, comunicados por API REST/JSON. Dominio: gestión básica de citas médicas (pacientes, médicos, especialidades, citas). Fines educativos — sin autenticación, base de datos en memoria (H2), que se reinicia con datos de ejemplo cada vez que se levanta el backend.

## Stack

- **Backend**: Spring Boot 4.1.0, Java 21, Maven (via wrapper), Spring Data JPA, H2 en memoria, Bean Validation, Lombok.
- **Frontend**: React 19.2, Vite 8, TypeScript, React Router, TanStack Query, React Hook Form + Zod, Tailwind CSS v4, Three.js / React Three Fiber (escena 3D decorativa en la landing).

## Estructura

```
backend/   API REST (Spring Boot) — puerto 8080
frontend/  SPA (React + Vite) — puerto 5173
```

## Prerrequisitos

- **Java 21** instalado (verificar con `java -version`).
- **Node.js 24** y **npm 11** (verificar con `node -v` / `npm -v`).
- No se requiere instalar Maven ni base de datos: el backend usa el Maven Wrapper (`mvnw`) y H2 en memoria.

### ⚠️ Importante: variable `JAVA_HOME`

Si tu `JAVA_HOME` global apunta a una versión de Java menor a 17 (Spring Boot 4.1 requiere Java 17+), debes sobreescribirla **en la sesión de terminal** antes de compilar o correr el backend:

**PowerShell:**
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"
```

**Git Bash:**
```bash
export JAVA_HOME="C:/Program Files/Java/jdk-21.0.10"
```

(Ajusta la ruta a donde tengas instalado tu JDK 21.) Verifica con `.\mvnw.cmd -v` (o `./mvnw -v`) que reporte Java 21 antes de continuar.

## Cómo correr el backend

```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"
.\mvnw.cmd spring-boot:run
```

- API disponible en `http://localhost:8080/api`.
- Consola H2 en `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:citasdb`, usuario `sa`, contraseña en blanco).
- Al arrancar, se siembran automáticamente datos de ejemplo (especialidades, médicos, pacientes y citas). **Estos datos se pierden al reiniciar el backend** (comportamiento esperado de H2 en memoria).

## Cómo correr el frontend

```powershell
cd frontend
npm install
npm run dev
```

- App disponible en `http://localhost:5173`.
- La URL base de la API se configura en `frontend/.env` (`VITE_API_BASE_URL`, por defecto `http://localhost:8080/api`). Ver `frontend/.env.example`.
- El backend debe estar corriendo para que las páginas de Pacientes/Médicos/Especialidades/Citas carguen datos.

## Endpoints principales

| Recurso | Rutas |
|---|---|
| Especialidades | `GET/POST /api/especialidades`, `GET/PUT/DELETE /api/especialidades/{id}` |
| Médicos | `GET/POST /api/medicos`, `GET/PUT/DELETE /api/medicos/{id}` |
| Pacientes | `GET/POST /api/pacientes`, `GET/PUT/DELETE /api/pacientes/{id}` |
| Citas | `GET/POST /api/citas`, `GET/PUT/DELETE /api/citas/{id}`, `GET /api/citas/paciente/{id}`, `GET /api/citas/medico/{id}` |
| Resumen | `GET /api/dashboard/summary` |

## Notas de diseño

- Sin autenticación: CRUD abierto sobre las 4 entidades.
- Relaciones JPA unidireccionales (`@ManyToOne`) para evitar ciclos de serialización.
- Manejo de errores centralizado (`GlobalExceptionHandler`): 400 en validación, 404 en recurso no encontrado, 409 al intentar borrar un registro con datos asociados (ej. un médico con citas).
- Frontend: una página por entidad, con tabla + modal reutilizado para crear/editar, usando TanStack Query para el estado de servidor y React Hook Form + Zod para validación de formularios.
- La escena 3D (`frontend/src/features/landing/HeroScene.tsx`) es puramente decorativa, vive solo en la landing, y usa geometría procedural (sin assets externos) con fallback a un degradado CSS si WebGL no está disponible.
