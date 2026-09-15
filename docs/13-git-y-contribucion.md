# Git, ramas y contribución

## Rama principal

`develop` es la rama de integración principal durante el desarrollo inicial.
Las ramas de trabajo se crean desde `develop` y se integran mediante Pull
Request. Cuando exista un release público estable se podrá introducir
`main` como rama de producción; no se mantiene `main` como rama paralela de
desarrollo.

## Ramas permitidas

| Prefijo                  | Uso                                 |
| ------------------------ | ----------------------------------- |
| `feature/<issue>-<slug>` | Capacidad nueva                     |
| `fix/<issue>-<slug>`     | Corrección reproducible             |
| `test/<issue>-<slug>`    | Tests o infraestructura QA          |
| `docs/<issue>-<slug>`    | Documentación                       |
| `spike/<issue>-<slug>`   | Investigación con entregable        |
| `release/<version>`      | Preparar una versión, solo temporal |
| `hotfix/<issue>-<slug>`  | Corrección urgente de una release   |

No se trabaja directamente sobre `develop` salvo cambios de mantenimiento
trivial y explícitamente revisados.

## Commits

Se usa Conventional Commits:

```text
<type>(<scope>): <imperative summary>
```

Tipos permitidos: `feat`, `fix`, `test`, `docs`, `refactor`, `perf`, `build`,
`ci`, `chore`, `style`, `revert`.

El commit debe ser atómico, no incluir secretos y referenciar la issue cuando
corresponda, por ejemplo `feat(iam): add session revocation (#22)`.

## Antes de abrir un PR

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

El PR debe explicar contrato, migraciones, alcance single-tenant, pruebas y
riesgos.
