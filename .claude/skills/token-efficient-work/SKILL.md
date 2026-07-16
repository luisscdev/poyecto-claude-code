---
name: token-efficient-work
description: Reglas de trabajo para ahorrar tokens al leer, explorar y editar código en este repo (citasmedicas: backend Spring Boot + frontend React). TRIGGER when: se va a explorar el código, añadir/editar una entidad, endpoint, hook o página en este proyecto, o antes de usar Glob/Grep/Read/Task de forma abierta. DO NOT TRIGGER when: la tarea ya está acotada a un único archivo conocido y no requiere exploración.
---

# Trabajo eficiente en tokens (citasmedicas)

Este repo es un CRUD repetido 4 veces (backend) / 4 veces (frontend). Casi ninguna tarea necesita explorar el árbol completo: necesita copiar una plantilla ya conocida.

## Regla 1 — Usa la plantilla, no explores

Backend: package-by-feature, 5 archivos por entidad. Frontend: 4 archivos por entidad. La plantilla más completa es `cita`/`citas` (referencia a las otras 3 entidades):

```
backend/src/main/java/com/citasmedicas/cita/
  Cita.java  CitaController.java  CitaMapper.java  CitaRepository.java  CitaService.java
  dto/CitaRequest.java  dto/CitaResponse.java

frontend/src/
  api/citas.ts
  features/citas/CitasPage.tsx  CitaForm.tsx  useCitas.ts
```

Para añadir/tocar una entidad: lee directamente los 2-3 archivos análogos de `cita`/`citas` que necesites como plantilla (Read en paralelo, una sola tanda) en vez de Glob/Grep exploratorio. Los detalles de cada capa (convenciones de mapper, validación, query keys, etc.) ya están documentados en `backend/CLAUDE.md` y `frontend/CLAUDE.md` — léelos una vez por sesión, no por tarea.

## Regla 2 — Grep/Read quirúrgico, no de bulto

- Para comprobar si algo existe o su firma: `Grep` con patrón concreto, no `Read` del archivo entero.
- Lee un archivo entero solo cuando vas a editarlo o necesitas entender su lógica completa.
- No repitas `Read` de un archivo ya leído en esta conversación salvo que lo hayas editado fuera de esta sesión.

## Regla 3 — Edit, no reescribas

Usa `Edit` para cambios puntuales. Reserva `Write` para archivos nuevos o reescrituras completas reales.

## Regla 4 — No proceso pesado para verificar detalles pequeños

- No ejecutes `mvnw test` completo para comprobar un solo cambio; usa el test/clase puntual (`backend/CLAUDE.md` tiene los comandos exactos).
- No lances subagentes (`Agent`/Task) para búsquedas o lecturas que caben en 1-3 llamadas directas — este repo es pequeño, el overhead de un subagente nuevo (sin contexto previo) casi siempre cuesta más tokens de los que ahorra.
- Usa `fork` (no un agente nuevo) solo si de verdad vas a generar mucha salida intermedia que no necesitas conservar en tu contexto.

## Regla 5 — Respuestas cortas

Por defecto, resume en 1-3 frases qué cambiaste y qué falta. No repitas el plan ni el código ya mostrado en el diff.

## No duplica

Esta skill no sustituye a `context-budget` (auditoría de overhead de agentes/skills/MCP) ni a `token-budget-advisor` (elegir profundidad de respuesta bajo demanda) — esas ya existen como skills globales. Esta skill es específica de cómo explorar y editar *este* repo con el mínimo de tokens.
