# Frontend y flujos del MVP

El frontend del MVP es una consola mínima de discovery, no un CRM.

## Navegación

- `/`: creación de cuenta, login y consola del operador.
- `/search`: formulario de categoría, región y límite (máximo 10).
- `/search`: formulario de categoría, región, fuente y límites.
- `/runs`: historial simple de ejecuciones.
- `/runs/[id]`: resultado en JSON y tabla.

## Flujo de cuenta

```text
Crear cuenta → iniciar sesión → consultar perfil → cerrar sesión
```

La instalación es single-tenant y admite una única cuenta de operador. La
sesión se identifica mediante un bearer token revocable en memoria de proceso;
las respuestas nunca incluyen el hash de contraseña.

## Flujo principal de discovery

```text
Iniciar sesión → configurar búsqueda → ejecutar
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

Múltiples usuarios, roles, memberships, recuperación por email, CRM, chat,
sincronización, scheduling y kanban quedan fuera de estas rutas iniciales.
