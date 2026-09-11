# Fuentes y discovery

## Contrato común

Todo adapter implementa un puerto que recibe categoría, zona, límites y
configuración del tenant, y devuelve registros crudos con:

- nombre y categoría;
- dirección, ciudad y coordenadas;
- teléfono, web y redes si están disponibles;
- `sourceType`, `sourceUrl` y `collectedAt`;
- advertencias de cobertura o verificación.

## Política de fuentes

- Fuentes con API, dataset o licencia compatible son el camino por defecto.
- OSM/Overpass y extractos compatibles son candidatos iniciales.
- Overture y otras fuentes se incorporan tras un spike de cobertura/licencia.
- Scrapers de riesgo son opt-in, experimentales, versionados y advertidos.
- No se ocultan rate limits ni se intenta evadir controles.

## Discovery

Una ejecución registra configuración, inicio, fin, cantidad de resultados,
duplicados, errores, fuente y usuario/tenant. Puede ejecutarse manualmente o
por cronjob.

Los adaptadores deben aplicar timeout, retry limitado, backoff y User-Agent
identificable cuando la fuente lo requiera.

## Calidad del dato

Normalizar no significa inventar. Un teléfono ausente es desconocido; no prueba
que el negocio no tenga teléfono. Los conflictos se conservan como evidencia.
