# Stack y entorno

## Aplicaciones propias

| Componente       | Elección                   | Responsabilidad                        |
| ---------------- | -------------------------- | -------------------------------------- |
| Monorepo         | Nx + pnpm                  | Proyectos, cache y boundaries          |
| Runtime          | Node.js LTS                | Ejecución común                        |
| Backend          | NestJS + TypeScript strict | REST, casos de uso y adapters          |
| Frontend         | Next.js App Router         | UI y navegación, sin lógica de negocio |
| ORM              | TypeORM                    | Persistencia y migraciones             |
| Base             | PostgreSQL                 | Datos de LeadHopper                    |
| Jobs             | Futuro Redis + BullMQ      | Automatización posterior al MVP        |
| Unit/integration | Jest                       | Dominio, aplicación e infraestructura  |
| E2E              | Playwright                 | Flujos de usuario con servicios reales |

## Servicios externos

- PostgreSQL propio: persistencia local de ejecuciones y resultados.
- Redis queda reservado para la automatización posterior.

No se usa `latest`. El spike de compatibilidad debe registrar la versión de
imagen, variables requeridas y capacidades comprobadas.

## Perfiles Docker Compose

- `core`: API, web y PostgreSQL.
- `integrations` y `full`: quedan reservados para fases posteriores.

## Reglas de configuración

- `.env.example` se versiona; `.env` no.
- Secretos nunca se guardan en commits, fixtures o logs.
- TypeORM usa `synchronize: false`.
- Las migraciones son obligatorias y reproducibles.
- Los recursos externos tienen timeouts y health checks.

## Comandos operativos

| Comando          | Propósito                                          |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Inicia infraestructura core y hosts en modo watch  |
| `pnpm dev:infra` | Inicia PostgreSQL y Redis                          |
| `pnpm dev:down`  | Detiene los servicios del entorno                  |
| `pnpm test`      | Ejecuta unit e integration tests registrados en Nx |
| `pnpm test:e2e`  | Ejecuta journeys Playwright contra los hosts       |
| `pnpm lint`      | Verifica ESLint en todos los proyectos             |
| `pnpm typecheck` | Verifica TypeScript estricto                       |
| `pnpm build`     | Compila todos los proyectos                        |
| `pnpm ci`        | Ejecuta formato, lint, tipos, tests y build        |

Los comandos de test deben fallar cuando falta el entorno requerido; no se
aceptan scripts que oculten la ausencia de pruebas con salidas exitosas.
