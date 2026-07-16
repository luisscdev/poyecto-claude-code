# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Spring Boot REST API half of an educational full-stack medical-appointments demo (`citasmedicas`). The sibling `frontend/` is a React 19 + Vite SPA that consumes this API. Domain: pacientes, médicos, especialidades, citas. No authentication — CRUD is open on all four entities. Code and API messages are in Spanish; keep new code consistent with that.

## Commands

Run from `backend/`. Spring Boot 4.1 requires Java 17+; if the global `JAVA_HOME` points at anything older, override it for the terminal session first:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"   # PowerShell
```
```bash
export JAVA_HOME="C:/Program Files/Java/jdk-21.0.10"   # Git Bash
```

Verify with `.\mvnw.cmd -v` that it reports Java 21 before building.

| Task | Command (PowerShell / Git Bash) |
|---|---|
| Run the API | `.\mvnw.cmd spring-boot:run` / `./mvnw spring-boot:run` |
| Build | `.\mvnw.cmd clean package` |
| All tests | `.\mvnw.cmd test` |
| Single test class | `.\mvnw.cmd test -Dtest=CitasMedicasApplicationTests` |
| Single test method | `.\mvnw.cmd test -Dtest=CitasMedicasApplicationTests#contextLoads` |

Test coverage is currently just a `@SpringBootTest` context-load smoke test. The webmvc / data-jpa / validation test starters are already on the classpath, so `@WebMvcTest` and `@DataJpaTest` slices can be added without touching `pom.xml`.

## Ports and database — read before debugging connection errors

`application.yml` and the root `README.md` disagree, and **`application.yml` wins**:

- Server port is **8353** (the README says 8080). API base is `http://localhost:8353/api`.
- H2 console at `/h2-console`; JDBC URL `jdbc:h2:mem:citasdb`, user `sa`, password **`sa`** (the README says blank).
- `CorsConfig` allows exactly one origin: `http://localhost:5173` (the Vite dev server). A frontend on any other port gets CORS-blocked.
- The frontend's `VITE_API_BASE_URL` in `frontend/.env` must match the real backend port — a mismatch here is the usual cause of "frontend loads but tables are empty".

H2 is in-memory with `ddl-auto: create-drop`. The schema is derived from the JPA entities (no migration files), and `config/DataSeeder` reseeds sample data on every boot. **All data is lost on restart — this is expected, not a bug.**

## Architecture

Package-by-feature under `com.citasmedicas`, one package per entity (`cita`, `medico`, `paciente`, `especialidad`), plus `common` (error handling), `config` (CORS, seeding), and `dashboard`.

Each feature package repeats the same five-file vertical slice, so mirroring an existing one — `cita` is the richest — is the fastest way to add an entity:

```
Entity.java          @Entity, Lombok @Getter/@Setter/@NoArgsConstructor + an all-args constructor
EntityRepository     JpaRepository<Entity, Long>
EntityService        @Service; owns findById-or-throw and cross-entity resolution
EntityController     @RestController on /api/<plural>; maps DTOs, no business logic
EntityMapper         final class, private ctor, static toEntity / updateEntity / toResponse
dto/EntityRequest    Java record, Bean Validation annotations with Spanish messages
dto/EntityResponse   Java record
```

Conventions that are load-bearing across the slice:

- **Entities never cross the HTTP boundary.** Controllers accept `EntityRequest` and return `EntityResponse` records; mappers do the translation. Relations serialize as nested response records (`CitaResponse` embeds `PacienteResponse` and `MedicoResponse`).
- **Relations are unidirectional `@ManyToOne(fetch = LAZY)` only** — deliberately, to avoid Jackson serialization cycles. Don't add the inverse `@OneToMany` side.
- **Services resolve foreign keys for each other.** `CitaService` holds `PacienteService`/`MedicoService` and exposes `resolvePaciente`/`resolveMedico`; `MedicoService` does the same with `EspecialidadService`. Controllers call these to turn request IDs into managed entities before handing them to the mapper. Services depend on other *services*, not on other repositories.
- **Constructor injection everywhere**, no `@Autowired` fields. Lombok is used on entities only, not on services or controllers.
- **404s come from the service layer**: `findById` throws `ResourceNotFoundException.forId("Cita", id)`. Never return `Optional` or null from a service `findById`.

`DashboardController` is the one intentional exception to the layering: it injects the four repositories directly and only calls `count()`, with no service in between.

## Error handling

`common/exception/GlobalExceptionHandler` (`@RestControllerAdvice`) is the single place errors become HTTP responses. Every response body is an `ApiError` record (`status`, `message`, `timestamp`, `fieldErrors`). Throw domain exceptions and let the handler translate; don't build error `ResponseEntity`s in controllers.

| Exception | Status | Meaning |
|---|---|---|
| `MethodArgumentNotValidException` | 400 | Bean Validation failure; per-field messages land in `fieldErrors` |
| `ResourceNotFoundException` | 404 | Unknown id |
| `DataIntegrityViolationException` | 409 | Deleting a row with dependents (e.g. a médico that still has citas) |
| `Exception` | 500 | Catch-all, generic message |

The 409 is not explicitly checked anywhere — it emerges from the FK constraint when `delete` is attempted, and the handler turns it into a friendly message. Preserve that path if you touch deletion.
