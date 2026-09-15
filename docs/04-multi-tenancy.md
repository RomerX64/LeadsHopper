# Modelo de instalación single-tenant

El MVP representa una única instalación para un equipo comercial. Todas las
búsquedas y ejecuciones pertenecen a esa instalación; no se agrega un
`tenantId`, memberships ni una jerarquía de roles antes de necesitarla.

## Invariantes

- La configuración se carga desde el entorno de la instalación.
- Cada ejecución conserva la fuente, el request original, `collectedAt`,
  errores y payload crudo.
- No existen lecturas cross-tenant porque no existe un segundo tenant.
- Una futura decisión multi-tenant debe registrarse en un ADR y no filtrarse
  como abstracción preventiva por todo el código.

## Futuro

Autenticación multiusuario, roles, memberships y aislamiento por tenant quedan
fuera del MVP. Este archivo conserva su nombre histórico para no romper enlaces.
