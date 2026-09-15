# LeadHopper development rules

## Commands

- Use Node.js LTS and pnpm. Run `pnpm install` before local work.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before opening a PR.
- Use `pnpm format:check` in CI; format with `pnpm format`.

## Architecture

- `apps/api` and `apps/web` are hosts, not business logic containers.
- Keep reusable API code in `libs/api/*` and cross-application contracts in
  `libs/shared/*`.
- Respect the dependency direction: presentation → application → domain.
- Domain code must remain framework and infrastructure independent.
- Keep external integrations behind small adapters and explicit ports.

## Safety

- The MVP is single-tenant; do not introduce tenant IDs, memberships, or
  cross-tenant abstractions unless a future ADR reopens this decision.
- Never commit secrets, `.env` files, or sensitive fixtures.
- Never use `latest` Docker tags or TypeORM `synchronize: true`.
- External calls require timeout, bounded retry, idempotency, and safe logs.
- Do not add product features while changing the foundation.
