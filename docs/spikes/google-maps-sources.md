# Spike: fuentes Google Maps

## Objetivo

Comparar dos scrapers Docker con la búsqueda:

```text
categoría: restaurantes
región: Alta Gracia, Córdoba
límite: 10
timeout: 90 segundos
```

Repetir después con `inmobiliarias`.

## Candidatos

1. [`gosom/google-maps-scraper`](https://github.com/gosom/google-maps-scraper)
2. [`Ayyouboss0011/SherlockMaps`](https://github.com/Ayyouboss0011/SherlockMaps)

Ambos declaran licencia MIT y soporte Docker/JSON. La versión que se integre
debe quedar fijada por tag o digest; no se usará `latest`.

## Protocolo reproducible

Para cada candidato:

1. Ejecutar una instancia limpia con Docker.
2. Enviar una búsqueda de restaurantes de Alta Gracia.
3. Registrar tiempo hasta completar, código de salida y consumo aproximado.
4. Guardar el JSON fuera del repositorio como artefacto local del spike.
5. Verificar la presencia o ausencia de nombre, categoría, dirección,
   teléfono, sitio web y URL de Google Maps.
6. Repetir con inmobiliarias.
7. Simular timeout y respuesta inválida.

No se deben guardar datos reales en fixtures versionados. Para CI se usarán
fixtures sintéticos que ejerciten el mismo contrato.

## Criterios de decisión

| Criterio                                    | Peso |
| ------------------------------------------- | ---: |
| Resultados útiles para Alta Gracia          |  30% |
| Contrato JSON estable y adaptable           |  20% |
| Timeout, errores y cancelación controlables |  20% |
| Reproducibilidad Docker                     |  15% |
| Mantenimiento y documentación               |  10% |
| Licencia y restricciones operativas         |   5% |

## Decisión

Pendiente de ejecutar el spike. Hasta entonces, la API usa un adapter fixture
in-memory para desarrollar el contrato sin depender de Google Maps.
