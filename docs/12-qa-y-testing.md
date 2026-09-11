# QA, testing y contratos de aceptación

## Propósito

La QA de LeadHopper no es una colección de pruebas aisladas: es una red de
contratos ejecutables que guía el desarrollo desde el primer vertical slice.
Cada issue debe añadir pruebas en la frontera que modifica y mantener al menos
un camino observable por usuario cuando la funcionalidad cruza la API o la
interfaz web.

No se escribirán pruebas E2E que pasen por mocks del backend. Los mocks solo
pueden representar proveedores externos en pruebas de aplicación; los flujos
críticos usan PostgreSQL, Redis y las imágenes fijadas de Twenty/Chatwoot.

## Pirámide

| Nivel       | Propósito                                     | Dependencias                     | Cuándo corre            |
| ----------- | --------------------------------------------- | -------------------------------- | ----------------------- |
| Domain      | Invariantes, estados, normalización y scoring | Ninguna                          | Cada cambio             |
| Application | Casos de uso, autorización y errores          | Fakes de puertos                 | Cada cambio             |
| Integration | ORM, migraciones, Redis y outbox              | Contenedores core                | PR                      |
| Contract    | Interfaces Twenty/Chatwoot y fuentes          | Contenedores/proveedores fijados | PR de integración       |
| E2E         | Journeys reales de usuario                    | Stack `full`                     | PR de release y nightly |

La ausencia actual de dominio implementado no justifica crear tests verdes
vacíos. Primero se documentan los contratos E2E y luego cada issue implementa
el test mínimo que hace fallar el comportamiento faltante.

## Datos de prueba

- Cada suite crea un tenant aislado con un usuario `admin` y uno `user`.
- Los nombres, dominios y teléfonos de fixtures son sintéticos y deterministas.
- Nunca se reutilizan credenciales reales ni datos personales.
- Las pruebas limpian sus datos por tenant; no borran la base completa de otro
  proceso.
- Los proveedores externos se identifican por `correlationId` e idempotency key.

## Journeys E2E P0

### QA-001 Registro, tenant y sesión

**Precondición:** stack core saludable.

1. Registrar el primer usuario.
2. Crear el tenant comercial.
3. Ver la consola protegida.
4. Cerrar sesión y verificar que una ruta protegida redirige.
5. Iniciar sesión nuevamente.

Debe verificarse cookie segura, aislamiento de sesión, validación de entradas y
que no se muestre un token en la interfaz.

### QA-002 Aislamiento entre tenants

1. Crear tenants A y B.
2. Crear un lead y una búsqueda en A.
3. Autenticar un usuario de B.
4. Intentar listar, consultar, modificar y exportar recursos de A.

Todas las operaciones sobre recursos ajenos deben responder como inexistentes o
prohibidas según el contrato, sin filtrar IDs, conteos o evidencia.

### QA-003 Gestión de equipo y roles

1. Invitar un usuario al tenant.
2. Aceptar la invitación.
3. Cambiar su rol.
4. Verificar permisos de `admin` y `user`.
5. Verificar que un `user` no puede administrar miembros, secretos ni
   conexiones.

### QA-004 Crear zona, búsqueda y ejecutar discovery

1. Crear una zona de ciudad o bounding box.
2. Configurar categoría y fuente compatible.
3. Ejecutar la búsqueda.
4. Ver estados `queued`, `running`, `completed` y los contadores.
5. Inspeccionar un lead con fuente, fecha y evidencia.

La suite debe cubrir timeout, rate limit, reintento y ejecución duplicada.

### QA-005 Revisar, filtrar y exportar leads

1. Abrir la tabla de leads.
2. Filtrar por zona, fuente, score y estado.
3. Abrir el detalle lateral.
4. Cambiar estado y agregar una nota.
5. Exportar el resultado filtrado.

Debe probarse paginación estable, estado vacío, error recuperable, procedencia y
que el CSV no incluya datos de otro tenant.

### QA-006 Provisioning recuperable de Twenty y Chatwoot

1. Crear un tenant con integraciones administradas.
2. Ejecutar provisioning.
3. Interrumpir una dependencia durante una etapa.
4. Ver estado `needs_repair` y el error clasificado.
5. Reintentar la operación.
6. Verificar que no duplica workspace, account, miembro o credenciales.

### QA-007 Sincronización y deep links

1. Crear o actualizar un lead local.
2. Esperar la sincronización asíncrona.
3. Ver el Company en Twenty y Contact en Chatwoot.
4. Abrir ambos recursos desde el detalle del lead.
5. Reentregar el mismo evento.

La segunda entrega debe ser idempotente. Una caída del proveedor no debe perder
el lead local y debe dejar una operación reparable.

### QA-008 Operaciones, dead-letter y reparación

1. Provocar un error permanente y uno transitorio.
2. Ver retry count, backoff, `correlationId` y estado final.
3. Inspeccionar el dead-letter desde operaciones.
4. Reintentar con credenciales corregidas.
5. Confirmar reconciliación y auditoría.

### QA-009 Accesibilidad y estados de interfaz

Cada vista principal debe probar loading, empty, error y forbidden, navegación
por teclado, foco visible, nombres accesibles y comportamiento con `prefers-
reduced-motion`.

## Definition of Done de una issue

- Existe prueba de dominio o aplicación si se modificó lógica.
- Existe prueba de integración si se modificó persistencia, outbox o Redis.
- Existe contract test si se modificó un Adapter externo.
- Existe o se actualizó el journey E2E correspondiente si cambia una capacidad
  observable.
- Los errores y estados vacíos tienen mensajes accionables.
- `pnpm ci` pasa sin desactivar pruebas.

## Ejecución

`pnpm test` ejecuta la suite de proyectos Nx. `pnpm test:e2e` ejecutará
Playwright contra el entorno configurado; hasta que exista la aplicación real,
la ausencia de un servidor debe fallar explícitamente y no convertirse en una
prueba omitida.
