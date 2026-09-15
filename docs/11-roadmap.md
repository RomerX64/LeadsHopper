# Roadmap

## Fase 0 — Diseño y foundation

- stack y versiones;
- Nx, TypeScript, linting y boundaries;
- Docker Compose core;
- licencia y documentación comunitaria;
- contrato de fuentes y política de datos crudos.

## Fase 1 — MVP discovery

Implementar en este orden de dependencias:

1. Contrato de búsqueda y ejecución.
2. Persistencia de ejecuciones y payload crudo.
3. Puerto y adapter inicial de fuente.
4. API REST de discovery.
5. UI de búsqueda y resultados.
6. Fixtures y contract tests.
7. Journey E2E completo.
8. Documentación de operación y fuente.

El orden de los números de issue coincide con este camino, pero la regla real
es la dependencia técnica: #99 bloquea #100/#101; #100 y #101 bloquean #102;
#102 bloquea #103; #103 y #104 bloquean #105. #106 puede avanzar en paralelo
desde que el contrato de fuente esté aprobado.

## Fase 2 — Robustez de fuentes

- timeout, rate limit y errores clasificados;
- adapters compatibles por defecto;
- retries acotados;
- fixtures y contract tests de fuentes;
- historial básico de ejecuciones.

## Fase 3 — Automatización opcional

- cronjobs;
- BullMQ;
- historial y operaciones reparables.

## Fase 4 — Integraciones posteriores

- CRM y bandeja de conversaciones;
- autenticación multiusuario;
- multi-tenancy;
- sincronización y reconciliación.

## Fase 5 — Release público

- CI/CD;
- seguridad;
- backups y restore;
- documentación de instalación;
- guía de contribución;
- release versionado y changelog.

## Fuera del MVP

- importar repositorios de terceros;
- kanban propio;
- envío automático de campañas;
- Twenty y Chatwoot;
- scoring y enriquecimiento;
- billing;
- polígonos dibujados;
- IA conversacional;
- WhatsApp gateway propio.
