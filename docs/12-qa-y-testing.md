# QA y testing del MVP

## Pirámide

| Nivel       | Propósito                                    | Dependencias         |
| ----------- | -------------------------------------------- | -------------------- |
| Domain      | Validar contratos y estados de discovery     | Ninguna              |
| Application | Ejecutar búsquedas y clasificar errores      | Fakes de puertos     |
| Integration | Persistencia y adapter de fuente             | PostgreSQL/fixtures  |
| Contract    | Formato de retorno de cada fuente            | Fixtures versionados |
| E2E         | Configurar, ejecutar y visualizar resultados | API + web            |

No se escriben pruebas E2E verdes que oculten funcionalidad faltante.

## Journeys P0

`e2e/smoke.spec.ts` mantiene únicamente el smoke de infraestructura. Los
journeys de producto viven en `e2e/discovery.spec.ts`. Están marcados como
`test.fixme` mientras las issues #99–#103 no implementen sus contratos; al
completar #105 se deben convertir en pruebas activas y eliminar el `fixme`.

### QA-001 Ejecutar una búsqueda

1. Abrir `/search`.
2. Completar categoría, región, fuente y límite.
3. Ejecutar.
4. Ver el estado de la ejecución.
5. Consultar el resultado.

Debe conservarse el request original, la fuente, los tiempos, el estado y el
payload crudo.

### QA-002 Visualizar resultado crudo

1. Abrir una ejecución completada.
2. Cambiar entre vista JSON y tabla.
3. Ver registros cuando existan.
4. Ver estado vacío cuando la fuente no devuelva registros.
5. Descargar el JSON.

La tabla no puede inventar ni descartar campos sin documentarlo.

### QA-003 Errores de fuente

1. Provocar timeout, rate limit y respuesta inválida mediante fixtures.
2. Ver un error clasificado.
3. Confirmar que no se muestra como lista vacía.
4. Reintentar manualmente.

### QA-004 Repetición segura

Ejecutar la misma búsqueda dos veces y verificar que cada ejecución conserva su
request, fecha, resultado y error de forma independiente.

### QA-005 Accesibilidad y estados

Probar loading, empty, error, foco visible, navegación por teclado, nombres
accesibles y responsive behavior.

## Definition of Done

- lógica de dominio y aplicación cubierta;
- adapter cubierto con fixture o contract test;
- journey E2E actualizado si cambia el flujo visible;
- JSON y tabla muestran el mismo payload;
- `pnpm ci` pasa.
