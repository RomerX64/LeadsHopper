# Stack y entorno

## Aplicaciones propias

| Componente       | Elección                   | Responsabilidad                         |
| ---------------- | -------------------------- | --------------------------------------- |
| Monorepo         | Nx + pnpm                  | Proyectos, cache y boundaries           |
| Runtime          | Node.js LTS                | Ejecución común                         |
| Backend          | NestJS + TypeScript strict | REST, casos de uso y adapters           |
| Frontend         | Next.js App Router         | UI y navegación, sin lógica de negocio  |
| ORM              | TypeORM                    | Persistencia y migraciones              |
| Base             | PostgreSQL                 | Datos de LeadHopper                     |
| Jobs             | Redis + BullMQ             | Discovery, provisioning, sync y retries |
| Unit/integration | Jest                       | Dominio, aplicación e infraestructura   |
| E2E              | Playwright                 | Flujos de usuario con servicios reales  |

## Servicios externos

- Twenty: imagen oficial fijada por versión.
- Chatwoot: imagen oficial fijada por versión.
- PostgreSQL/Redis propios: servicios del entorno de desarrollo, separados
  lógicamente de los stores que requieran los productos externos cuando sea
  necesario.

No se usa `latest`. El spike de compatibilidad debe registrar la versión de
imagen, variables requeridas y capacidades comprobadas.

## Perfiles Docker Compose

- `core`: API, web, PostgreSQL y Redis.
- `integrations`: agrega Twenty y Chatwoot.
- `full`: agrega herramientas de observabilidad y utilidades de desarrollo.

Las instancias externas por tenant usan la misma interfaz de integración, pero
configuran URL, credenciales y capacidades desde el panel.

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
