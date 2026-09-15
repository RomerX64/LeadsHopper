# Operaciones futuras

El MVP ejecuta discovery manual y conserva cada resultado. No hay outbox,
BullMQ, provisioning, sincronización ni reconciliación externa.

## Errores del MVP

Una ejecución registra estado, duración, fuente y error clasificado. Los
reintentos son manuales y generan una nueva ejecución para conservar trazabilidad.

## Después del MVP

Cronjobs, workers, retries automáticos, dead-letter, outbox e integraciones
deberán introducirse solo cuando el flujo manual y la calidad de los datos
estén validados.
