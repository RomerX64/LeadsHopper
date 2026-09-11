# LeadHopper

LeadHopper es una plataforma open source y self-hosted para descubrir,
organizar y operar leads comerciales. Su interfaz es una consola de
prospección: configura zonas y búsquedas, programa ejecuciones, revisa leads y
los deriva a herramientas especializadas.

LeadHopper no intenta reemplazar un CRM ni una bandeja de conversaciones:

- **Twenty** mantiene el pipeline comercial.
- **Chatwoot** mantiene las conversaciones.
- **LeadHopper** coordina el descubrimiento, la calidad del dato y la
  sincronización.

El primer caso de uso serán inmobiliarias de Alta Gracia y Córdoba Capital,
pero el dominio soporta cualquier categoría y región.

## Estado

La base técnica está implementada y validada. La primera etapa de desarrollo
consiste en convertir los hosts mínimos en un vertical slice ejecutable de
identidad y tenancy; todavía no hay funcionalidades comerciales terminadas.

## Documentación

- [Visión y principios](docs/01-vision-y-principios.md)
- [Stack y entorno](docs/02-stack-y-entorno.md)
- [Arquitectura hexagonal + VSA](docs/03-arquitectura.md)
- [Modelo multi-tenant](docs/04-multi-tenancy.md)
- [Frontend y flujos](docs/05-frontend-y-flujos.md)
- [Fuentes y discovery](docs/06-fuentes-y-discovery.md)
- [Integraciones Twenty y Chatwoot](docs/07-integraciones.md)
- [Sincronización y operaciones](docs/08-sincronizacion-y-operaciones.md)
- [Calidad y linting](docs/09-calidad-y-linting.md)
- [Issue modeling](docs/10-issue-modeling.md)
- [Roadmap](docs/11-roadmap.md)
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
`docs/` o `spike/` y usa Conventional Commits. Las imágenes de Twenty y
Chatwoot son dependencias externas versionadas; sus repositorios fuente no se
copian dentro de este monorepo.

## Licencia

LeadHopper se distribuirá bajo [AGPL-3.0](LICENSE). Twenty, Chatwoot y las
restantes dependencias conservan sus propias licencias y marcas.
