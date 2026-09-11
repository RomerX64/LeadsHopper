# Estándar de issue modeling

LeadHopper usa issues como unidades ejecutables de diseño y trabajo. Ninguna
issue debe ser solo una intención vaga.

## Estructura obligatoria

```markdown
## Problema
## Resultado esperado
## Alcance
## Fuera de alcance
## Contrato de entrada/salida
## Invariantes
## Casos de error
## Diseño propuesto
## Dependencias
## Pruebas
## Criterios de aceptación
## Riesgos y preguntas abiertas
```

## Reglas

- Una issue debe tener un solo resultado verificable.
- Una tarea de producción se limita a un módulo/archivo cohesivo; si excede ese
  límite se subdivide.
- Toda issue de negocio declara el `tenantId` y la política de autorización.
- Toda integración declara timeout, auth, retry, idempotencia y contrato de
  error.
- Toda migración incluye estrategia de rollback o mitigación.
- Toda pantalla declara estados loading, empty, error y permisos.
- Toda feature incluye unit/integration/E2E según su frontera.
- Las dependencias se escriben explícitamente como `blocked by`/`blocks`.

## Tipos

- `Epic`: resultado de producto con sub-issues.
- `Feature`: capacidad observable.
- `Task`: implementación concreta.
- `Spike`: investigación con entregable.
- `Bug`: comportamiento incorrecto reproducible.
- `Docs`: contrato o guía pública.

## Prioridad

- `P0`: bloquea el uso o compromete seguridad/aislamiento.
- `P1`: necesario para el primer release.
- `P2`: mejora importante posterior.
- `P3`: exploración o conveniencia.

La skill global de issue modeling deberá aplicar esta estructura sin crear issues
automáticamente cuando falten decisiones aprobadas.
