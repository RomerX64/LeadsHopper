# Multi-tenancy y autorización

## Modelo

```text
Tenant
 ├── Membership ── User
 ├── Lead
 ├── SearchZone / SearchDefinition / Schedule
 ├── IntegrationConnection
 ├── ProvisioningOperation
 └── SynchronizationOperation
```

Cada tenant tiene como máximo un workspace lógico de Twenty y una cuenta de
Chatwoot por conexión. Sus usuarios comparten esos recursos según sus permisos.

## Invariantes

- Toda entidad de negocio persistida tiene `tenantId`, salvo entidades globales.
- Toda query de tenant aplica el contexto antes de acceder al repositorio.
- Un usuario nunca puede leer o mutar recursos de otro tenant.
- Un `super_admin` puede ver métricas agregadas, no datos comerciales crudos,
  salvo una operación auditada explícita.
- Los adapters nunca reciben un tenant implícito.

## Roles

| Rol | Alcance |
|---|---|
| `super_admin` | instalación, tenants y métricas agregadas |
| `admin` | usuarios, conexiones y configuración de su tenant |
| `user` | leads, búsquedas y conversaciones autorizadas |

## Ciclo de vida

El registro crea un tenant y su primer admin. El provisioning externo puede
quedar `pending`, `in_progress`, `completed`, `failed` o `needs_repair`.
Registrar el tenant local no depende de que Twenty o Chatwoot estén disponibles.
