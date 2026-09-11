# Frontend y flujos

LeadHopper es una consola de operación, no un kanban de ventas. El kanban y la
gestión detallada de conversaciones se abren en Twenty y Chatwoot.

## Navegación

### Público

- `/`
- `/docs`
- `/login`
- `/register`
- `/forgot-password`

### Onboarding

- `/onboarding/tenant`
- `/onboarding/provisioning`
- `/onboarding/integrations`
- `/onboarding/complete`

### Operación

- `/app`: actividad, leads prioritarios y operaciones fallidas.
- `/app/leads`: tabla densa, filtros y selección múltiple.
- `/app/leads/[id]`: detalle lateral/página, evidencias, score, notas y enlaces.
- `/app/searches`: búsquedas configurables.
- `/app/searches/[id]`: historial y ejecución.
- `/app/zones`: ciudades, radios y bounding boxes.
- `/app/schedules`: cronjobs, próxima ejecución y fallos.
- `/app/integrations`: Twenty, Chatwoot y conexiones externas.
- `/app/operations`: provisioning, sync, retries y reconciliación.
- `/app/team`: usuarios y membresías.
- `/app/settings`: score, fuentes y preferencias.
- `/app/audit`: actividad sensible del tenant.

### Super admin

- `/super-admin/tenants`
- `/super-admin/users`
- `/super-admin/metrics`
- `/super-admin/operations`

## Flujo principal

```text
Crear tenant → conectar/provisionar → definir zona y búsqueda
→ ejecutar o programar → revisar leads → sincronizar
→ abrir Twenty/Chatwoot → registrar resultado
```

## Dirección visual

La interfaz será un workbench de prospección: alta densidad de información,
líneas finas, estados legibles y un acento único para prioridad y sync.

La tabla es el centro de trabajo. Cada fila muestra procedencia, fecha,
score, zona y estado de sincronización. Loading, error, empty y permisos son
estados diseñados, no placeholders.

## Zonas del MVP

El primer release soporta ciudades, radios y bounding boxes. Los polígonos
dibujados en mapa quedan para una fase posterior.
