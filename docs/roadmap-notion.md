# LeadHopper — Roadmap MVP

> Documento preparado para importar o copiar en Notion. La fuente de verdad
> operativa de cada tarea sigue siendo GitHub Issues.

## Objetivo del MVP

Validar el flujo completo de discovery en una instalación single-tenant:

```text
Configurar búsqueda → ejecutar fuente → conservar payload crudo
→ consultar JSON → revisar listado → descargar resultado
```

## Estado actual

- **Foundation:** completada y publicada en `develop`.
- **Producto:** sin lógica de discovery implementada.
- **Smoke técnico:** activo y pasando.
- **Journeys de producto:** diseñados en `e2e/discovery.spec.ts`, marcados
  `fixme` hasta completar la API y UI.
- **Issues abiertas:** #98–#106.

## Roadmap de ejecución

| Orden | Issue | Entregable                                  | Dependencias                   | Estado    |
| ----: | ----- | ------------------------------------------- | ------------------------------ | --------- |
|     0 | #98   | Epic y alcance del MVP                      | ADR-004                        | En curso  |
|     1 | #99   | Contrato de búsqueda y ejecución            | #98                            | Pendiente |
|     2 | #100  | Persistencia de ejecuciones y payload crudo | #99                            | Pendiente |
|     3 | #101  | Puerto y adapter inicial de fuente          | #99                            | Pendiente |
|     4 | #102  | API REST de discovery                       | #99, #100, #101                | Pendiente |
|     5 | #103  | UI de búsqueda y resultados                 | #102                           | Pendiente |
|     6 | #104  | Fixtures y contract tests                   | #99, #101                      | Pendiente |
|     7 | #105  | Journey E2E completo                        | #102, #103, #104               | Pendiente |
|     8 | #106  | Documentación de operación y fuente         | #99; puede avanzar en paralelo | Pendiente |

## Milestones

### M0 — Foundation ejecutable

**Objetivo:** poder desarrollar y validar con comandos reproducibles.

- Nx + pnpm.
- NestJS y Next.js ejecutables.
- PostgreSQL en Docker Compose.
- Jest, Playwright, ESLint, Prettier y Commitlint.
- CI de formato, lint, tipos, tests y build.

**Criterio de salida:** `pnpm ci` pasa y el smoke de API/web está activo.

### M1 — Contrato y almacenamiento

**Issues:** #99, #100.

**Objetivo:** tener un modelo estable para pedir una búsqueda y guardar su
resultado original sin opiniones derivadas.

**Criterio de salida:** una ejecución puede persistirse y recuperarse con su
request, fuente, estado, timestamps, errores y payload exacto.

### M2 — Fuente real

**Issues:** #101, #104.

**Objetivo:** consultar una fuente compatible con límites y errores visibles.

**Criterio de salida:** fixtures de éxito, vacío, respuesta inválida, timeout y
rate limit cubiertos sin depender de red durante los tests.

### M3 — Vertical slice API

**Issue:** #102.

**Objetivo:** exponer la ejecución y el resultado mediante REST versionado.

**Criterio de salida:** crear ejecución, consultar estado, obtener JSON crudo y
recibir errores HTTP tipados.

### M4 — Vertical slice UX

**Issue:** #103.

**Objetivo:** configurar búsquedas y revisar resultados desde el navegador.

**Criterio de salida:** formulario, loading, empty, error, JSON, tabla y
descarga funcionales.

### M5 — Release candidate del MVP

**Issues:** #105, #106.

**Objetivo:** validar el flujo completo y permitir que un contributor lo
reproduzca con seguridad.

**Criterio de salida:** Playwright ejecuta configure → execute → inspect →
JSON/table → download; la documentación declara fuente, límites, User-Agent,
cobertura y responsabilidades legales.

## Definition of Done

- La issue cumple sus criterios de aceptación.
- Tiene pruebas de la frontera modificada.
- No agrega multi-tenancy, IAM, CRM, Chatwoot, scoring ni automatización.
- Conserva el payload original.
- Actualiza documentación o contratos afectados.
- `pnpm ci` pasa.
- La issue permanece abierta hasta que el cambio esté implementado, validado y
  mergeado en `develop`.

## Backlog posterior al MVP

1. Robustez y segunda fuente.
2. Normalización y deduplicación, solo después de medir calidad.
3. Historial y reintentos automáticos.
4. Scheduling y BullMQ.
5. Autenticación multiusuario.
6. Integración Twenty.
7. Integración Chatwoot.
8. Multi-tenancy, únicamente si el producto lo justifica.

Estas fases no deben entrar en el sprint del MVP.
