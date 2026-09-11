# Visión y principios

## Qué problema resolvemos

Los equipos que prospectan negocios locales suelen descubrir empresas en
fuentes dispersas, revisar sus datos manualmente y copiar información entre
planillas, CRM e inboxes. LeadHopper convierte ese trabajo en un flujo
repetible:

```text
Configurar → descubrir → revisar → priorizar → sincronizar → conversar
```

La primera validación usará inmobiliarias de Alta Gracia y Córdoba Capital. El
producto no quedará acoplado a ese rubro: categoría, región y fuente son
configurables.

## Usuarios y roles

- `super_admin`: operación de la instalación y métricas agregadas entre tenants.
- `admin`: configuración y usuarios de su tenant.
- `user`: ejecución de búsquedas, gestión de leads y acceso a integraciones
  permitidas.

Un tenant representa un equipo o workspace comercial. Sus usuarios comparten
un workspace de Twenty y una cuenta de Chatwoot.

## Qué es LeadHopper

Una consola self-hosted de adquisición y operación de leads. Mantiene la
identidad local del lead, sus evidencias de descubrimiento, el score, las
ejecuciones y el estado de sincronización.

## Qué no es

- No es un CRM alternativo: el pipeline comercial vive en Twenty.
- No es una bandeja de chat: las conversaciones viven en Chatwoot.
- No envía mensajes automáticamente en el primer release.
- No recopila datos privados ni autenticados.
- No convierte un score heurístico en una afirmación sobre un negocio.

## Principios

1. **Self-hosted primero:** el entorno debe ser reproducible con Docker Compose.
2. **Fuente trazable:** cada dato externo conserva fuente, fecha y estado de
   verificación.
3. **Tenant explícito:** ninguna consulta o job opera sin contexto de tenant.
4. **Fallos reparables:** un servicio externo caído no debe destruir el dato
   local ni dejar operaciones sin estado.
5. **Adapters antes que acoplamiento:** proveedores externos quedan detrás de
   puertos pequeños.
6. **Automatizar lo repetible:** el usuario conserva la decisión de contacto.
7. **Open source responsable:** licencias, límites y dependencias se
   documentan; los scrapers de riesgo son opt-in y experimentales.
