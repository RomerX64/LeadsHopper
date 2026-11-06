# ADR-004: MVP single-tenant orientado a discovery crudo

## Estado

Aceptada.

## Decisión

El primer MVP será single-tenant y tendrá una cuenta de operador local para
proteger la consola. Los flujos de producto serán:

```text
crear cuenta → iniciar sesión → gestionar perfil
→
configurar búsqueda → ejecutar fuente → conservar retorno crudo
→ mostrar JSON/listado → descargar
```

No se implementan múltiples usuarios, memberships, roles, CRM, Chatwoot,
scoring, normalización, sincronización ni cronjobs.

## Motivo

El objetivo inicial es validar cobertura y calidad real de los leads. Una capa
multi-tenant o integraciones externas antes de observar el retorno agrega
complejidad que no prueba la hipótesis principal.

## Consecuencias

- El modelo no lleva `tenantId`.
- PostgreSQL y Redis solo soportan el flujo de la instalación local.
- El primer adapter de usuarios es en memoria; PostgreSQL queda detrás del
  mismo puerto para el siguiente incremento.
- Los adapters de fuentes siguen siendo puertos pequeños para poder cambiar
  proveedor sin reescribir la aplicación.
- El payload crudo se conserva antes de cualquier opinión derivada.
- Multi-tenancy e integraciones se reevalúan con datos de uso y un ADR nuevo.
