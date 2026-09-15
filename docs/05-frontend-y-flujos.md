# Frontend y flujos del MVP

El frontend del MVP es una consola mínima de discovery, no un CRM.

## Navegación

- `/`: estado de la instalación y acceso al discovery.
- `/search`: formulario de categoría, región, fuente y límites.
- `/runs`: historial simple de ejecuciones.
- `/runs/[id]`: resultado en JSON y tabla.

## Flujo principal

```text
Abrir discovery → configurar búsqueda → ejecutar
→ esperar resultado → inspeccionar JSON/listado → descargar
```

## Contrato de la vista

La pantalla debe representar explícitamente:

- formulario vacío y validación;
- ejecución en curso;
- resultado vacío válido;
- resultado con registros;
- error de fuente o timeout;
- error recuperable para volver a ejecutar.

Cada fila muestra únicamente los campos disponibles en el retorno crudo y su
procedencia. No se presenta score, prioridad o estado comercial en el MVP.

## Fuera de alcance

Login, onboarding, team settings, CRM, chat, sincronización, scheduling y
kanban quedan fuera de estas rutas iniciales.
