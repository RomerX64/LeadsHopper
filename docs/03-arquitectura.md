# Arquitectura hexagonal + VSA

## Topología

```text
apps/api  ── host NestJS REST/OpenAPI
apps/web  ── host Next.js UI
libs/api/
  shared-kernel/
  iam/
  tenancy/
  lead-discovery/
  lead-management/
  integrations/
  provisioning/
  synchronization/
  operations/
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
Los adapters se inyectan mediante puertos.

## Bounded contexts

- **IAM:** usuarios, credenciales, sesiones y roles.
- **Tenancy:** tenants, memberships y políticas de acceso.
- **Lead Discovery:** zonas, fuentes, búsquedas y ejecuciones.
- **Lead Management:** lead, evidencias, score, estados y notas.
- **Integrations:** conexiones, secretos y capacidades.
- **Provisioning:** creación y reparación de recursos externos.
- **Synchronization:** outbox, jobs, idempotencia y reconciliación.
- **Operations:** health checks, auditoría y operaciones fallidas.

## API pública

REST versionada (`/api/v1`) con OpenAPI. GraphQL solo se permite dentro del
adapter de Twenty cuando sea necesario para un contrato que no tenga una API
estable equivalente.

Controllers reciben DTOs, ejecutan Commands/Queries y devuelven Response DTOs.
No contienen repositorios ni reglas de negocio.
