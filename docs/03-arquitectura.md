# Arquitectura hexagonal + VSA

## Topología

```text
apps/api  ── host NestJS REST/OpenAPI
apps/web  ── host Next.js UI
libs/api/
  shared-kernel/
  users/
  discovery/
  lead-discovery/
  raw-results/
libs/shared/
  contracts/
  config/
  testing/
```

Cada módulo es una feature slice vertical. Dentro de cada módulo se separan
`domain`, `application`, `infrastructure` y `presentation` cuando la
responsabilidad lo requiere.

## Dependencias permitidas

```text
presentation → application → domain
infrastructure → application/domain
domain → solo tipos y lógica pura
```

El dominio no importa NestJS, TypeORM, Redis, BullMQ, `fetch` ni SDKs externos.
Los adapters se inyectan mediante puertos. El primer adapter real será una
fuente de discovery; no se agregan seams de CRM antes de tener dos
implementaciones justificadas.

## Módulos del MVP

- **Operator Account:** cuenta única local, sesión y perfil.
- **Discovery:** contrato de búsqueda, puerto de fuente y adapter fixture
  inicial. El scraper Docker se incorporará después del spike comparativo.
- **Raw Results:** persistencia, consulta y exportación del payload original.

## API pública

REST versionada (`/api/v1`) con OpenAPI. No se agregan GraphQL ni SDKs de CRM
al MVP.

Controllers reciben DTOs, ejecutan Commands/Queries y devuelven Response DTOs.
No contienen repositorios ni reglas de negocio.

La primera implementación usa un repositorio en memoria para mantener el
vertical slice ejecutable sin introducir migraciones antes de definir el
modelo de discovery. El puerto `UserRepository` permite sustituirlo por
PostgreSQL sin tocar dominio ni aplicación.
