# Sincronización y operaciones

## Fuente de verdad

- Lead descubierto y evidencias: LeadHopper.
- Pipeline, compañías y etapas comerciales: Twenty.
- Contactos operativos y conversaciones: Chatwoot.
- Estado de integración y correlación: LeadHopper.

## Flujo

```text
Lead creado/actualizado
 → outbox transaccional
 → BullMQ
 → adapter externo
 → persistir IDs/estado
 → emitir resultado auditable
```

La creación local no queda bloqueada por la disponibilidad externa.

## Estados

Cada sistema mantiene su propio estado:

- `pending`
- `syncing`
- `synced`
- `failed`
- `needs_repair`

Cada job tiene `tenantId`, `aggregateId`, `correlationId`,
`idempotencyKey`, intentos y próximo retry.

## Fallos

- Retry con backoff para errores transitorios.
- Dead-letter para errores agotados.
- Reintento manual desde Operations.
- Reconciliación periódica.
- No borrar el lead local por un fallo externo.
- Compensación best-effort para provisioning parcial.

No se afirma atomicidad entre PostgreSQL, Twenty y Chatwoot: son sistemas
distribuidos.

## Observabilidad

Todas las operaciones externas registran duración, proveedor, status,
correlation ID, tenant y error clasificado, sin tokens ni datos sensibles.
