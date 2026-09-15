# LeadHopper

LeadHopper es una herramienta open source y self-hosted para descubrir leads
comerciales. Su primer MVP configura una búsqueda, consulta una fuente,
devuelve los registros crudos y los muestra en una vista simple.

El primer caso de uso serán inmobiliarias de Alta Gracia y Córdoba Capital,
pero el dominio soporta cualquier categoría y región.

## Estado

La base técnica está implementada y validada. El MVP actual es single-tenant y
prioriza el flujo completo de discovery hasta obtener el retorno crudo en JSON
y listado web. Autenticación, CRM, Chatwoot, scoring y automatizaciones
avanzadas quedan fuera del primer corte.

## Documentación

- [Visión y principios](docs/01-vision-y-principios.md)
- [Stack y entorno](docs/02-stack-y-entorno.md)
- [Arquitectura hexagonal + VSA](docs/03-arquitectura.md)
- [Modelo de instalación single-tenant](docs/04-multi-tenancy.md)
- [Frontend y flujos](docs/05-frontend-y-flujos.md)
- [Fuentes y discovery](docs/06-fuentes-y-discovery.md)
- [Integraciones futuras](docs/07-integraciones.md)
- [Operaciones futuras](docs/08-sincronizacion-y-operaciones.md)
- [Calidad y linting](docs/09-calidad-y-linting.md)
- [Issue modeling](docs/10-issue-modeling.md)
- [Roadmap](docs/11-roadmap.md)
- [Roadmap para Notion](docs/roadmap-notion.md)
- [QA y testing](docs/12-qa-y-testing.md)
- [Git y contribución](docs/13-git-y-contribucion.md)
- [ADRs](docs/adr/README.md)

## Desarrollo

Usa Node.js LTS y pnpm:

```bash
pnpm install
pnpm dev
```

`pnpm dev` inicia PostgreSQL y Redis mediante Docker Compose y ejecuta API y
web con recarga en desarrollo. Los comandos de calidad son `pnpm lint`,
`pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build` y `pnpm ci`.

La rama de integración es `develop`. Crea ramas `feature/`, `fix/`, `test/`,
`docs/` o `spike/` y usa Conventional Commits.

## Licencia

LeadHopper se distribuirá bajo [AGPL-3.0](LICENSE).
