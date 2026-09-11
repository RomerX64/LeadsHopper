# ADR-001: Adapters sobre imágenes oficiales

- Estado: aceptada
- Fecha: 2026-09-11

## Contexto

Twenty y Chatwoot son productos grandes con ciclos y toolchains propios.
LeadHopper necesita demostrar integración real sin convertirse en un fork
difícil de mantener.

## Decisión

Usar imágenes oficiales versionadas en Compose y encapsularlas mediante
adapters. Los repositorios fuente se mantienen fuera del monorepo para
investigación, contract tests y forks separados.

## Consecuencia

Debemos mantener una matriz de compatibilidad y aceptar que algunos contratos
internos pueden cambiar. A cambio, LeadHopper conserva límites claros y un
entorno reproducible.
