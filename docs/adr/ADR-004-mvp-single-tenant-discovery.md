# ADR-004: MVP single-tenant orientado a discovery crudo

## Estado

Aceptada.

## Decisión

El primer MVP será single-tenant y se limitará al flujo:

```text
configurar búsqueda → ejecutar fuente → conservar retorno crudo
→ mostrar JSON/listado → descargar
```

No se implementan todavía usuarios, memberships, CRM, Chatwoot, scoring,
normalización, sincronización ni cronjobs.

## Motivo

El objetivo inicial es validar cobertura y calidad real de los leads. Una capa
multi-tenant o integraciones externas antes de observar el retorno agrega
complejidad que no prueba la hipótesis principal.

## Consecuencias

- El modelo no lleva `tenantId`.
- PostgreSQL y Redis solo soportan el flujo de la instalación local.
- Los adapters de fuentes siguen siendo puertos pequeños para poder cambiar
  proveedor sin reescribir la aplicación.
- El payload crudo se conserva antes de cualquier opinión derivada.
- Multi-tenancy e integraciones se reevalúan con datos de uso y un ADR nuevo.
