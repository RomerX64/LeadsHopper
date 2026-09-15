# Fuentes y discovery

## Contrato común

Todo adapter implementa un puerto que recibe categoría, región, límites y
configuración de la instalación, y devuelve registros crudos con:

- nombre y categoría cuando la fuente los provee;
- dirección, ciudad y coordenadas cuando están disponibles;
- teléfono, web y redes sin inventar valores;
- `sourceType`, `sourceUrl` y `collectedAt`;
- advertencias de cobertura o verificación;
- el payload original de la fuente.

## Política de fuentes

- Fuentes con API, dataset o licencia compatible son el camino por defecto.
- OSM/Overpass y extractos compatibles son candidatos iniciales.
- Overture y otras fuentes se incorporan tras un spike de cobertura/licencia.
- Scrapers de riesgo son opt-in, experimentales, versionados y advertidos.
- No se ocultan rate limits ni se intenta evadir controles.

## Discovery MVP

El usuario configura categoría, región, límites y fuente, ejecuta manualmente y
recibe una ejecución con estado, inicio, fin, cantidad, errores y payload crudo.
La respuesta debe poder verse como JSON y en una tabla simple.

En el MVP no hay cronjobs, normalización, deduplicación, scoring ni
sincronización externa. Esas operaciones se diseñarán después de validar la
calidad del retorno crudo.

Los adapters deben aplicar timeout, retry limitado, backoff y User-Agent
identificable cuando la fuente lo requiera. Un fallo de fuente debe ser visible
y clasificado; nunca debe convertirse silenciosamente en una lista vacía.
