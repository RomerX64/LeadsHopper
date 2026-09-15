# Visión y principios

## Qué problema resolvemos

Los equipos que prospectan negocios locales suelen descubrir empresas en
fuentes dispersas, revisar sus datos manualmente y copiar información entre
planillas, CRM e inboxes. LeadHopper convierte ese trabajo en un flujo
repetible:

```text
Configurar → ejecutar discovery → recibir JSON crudo → revisar listado
```

La primera validación usará inmobiliarias de Alta Gracia y Córdoba Capital. El
producto no quedará acoplado a ese rubro: categoría, región y fuente son
configurables.

## Usuario y alcance de instalación

El MVP es single-tenant: una instalación representa un único equipo comercial
local. No existen `tenantId`, memberships, roles multi-tenant ni métricas
cross-tenant. La autorización se limita a la frontera de la instalación y se
podrá agregar autenticación cuando el flujo de discovery esté validado.

## Qué es LeadHopper

Una herramienta self-hosted de discovery. Conserva el request de búsqueda, la
fuente, la fecha de ejecución y el retorno crudo para que el usuario pueda
inspeccionarlo y exportarlo.

## Qué no es

- No es un CRM ni una bandeja de chat en el MVP.
- No sincroniza con servicios externos.
- No recopila datos privados ni autenticados.
- No normaliza ni puntúa datos antes de validar el retorno crudo.

## Principios

1. **Self-hosted primero:** el entorno debe ser reproducible con Docker Compose.
2. **Fuente trazable:** cada dato externo conserva fuente, fecha y estado de
   verificación.
3. **Crudo antes que opinión:** primero se preserva el retorno original; toda
   transformación futura debe ser explícita y reversible.
4. **Fallos visibles:** una fuente caída devuelve un error clasificado y no un
   resultado vacío engañoso.
5. **Adapters antes que acoplamiento:** cada fuente queda detrás de
   puertos pequeños.
6. **Open source responsable:** licencias, límites y dependencias se
   documentan; los scrapers de riesgo son opt-in y experimentales.
