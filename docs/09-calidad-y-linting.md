# Calidad y linting

## Herramientas

- ESLint flat config.
- Prettier.
- TypeScript strict.
- Nx module boundaries.
- Commitlint + Husky + lint-staged.
- Jest para unit/integration.
- Playwright para E2E.

## Boundaries

- `scope:api` solo depende de `scope:api` y `scope:shared`.
- `scope:web` solo depende de `scope:web` y `scope:shared`.
- `domain` no importa frameworks, ORM, Redis, BullMQ ni HTTP.
- `application` no importa adapters concretos.
- Las fuentes externas aparecen solo en adapters, contract tests y
  configuración.
- Next.js no contiene API Routes con lógica de negocio.

## Reglas obligatorias

- Sin `any` implícito.
- Sin `console` en producción; usar logger.
- Sin secretos ni URLs sensibles hardcodeadas.
- Sin `synchronize: true`.
- Sin queries sin límites ni paginación cuando corresponda.
- Sin controllers con repositorios o lógica de negocio.
- Sin jobs no idempotentes.
- Sin `latest` en Docker.
- Sin imports relativos que atraviesen módulos.
- Sin tests que solo verifiquen llamadas a mocks.

## Testing mínimo

Cada feature debe cubrir:

1. camino feliz;
2. validación o error de dominio;
3. error de infraestructura relevante;
4. integración real cuando involucre una fuente externa.

Los contract tests deben ejecutarse contra fixtures o versiones fijadas de cada
fuente documentada.
