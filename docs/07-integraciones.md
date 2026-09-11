# Integraciones con Twenty y Chatwoot

## Estrategia por capas

El camino soportado usa imágenes oficiales versionadas en Docker Compose o una
instancia externa configurada por tenant. Los repositorios fuente de Twenty y
Chatwoot quedan fuera del monorepo LeadHopper.

Los repositorios pueden clonarse mediante scripts de investigación para
inspeccionar contratos, ejecutar contract tests o desarrollar un fork separado.
No se copia código de terceros dentro de LeadHopper sin una decisión explícita.

## Twenty

LeadHopper sincroniza un lead empresarial como `Company`. Una `Person` se crea
solo cuando existe una persona de contacto identificada.

La creación de workspace puede depender de mutaciones internas de Twenty. Por
eso el adapter debe:

- fijar la versión probada;
- detectar capabilities;
- registrar si el flujo es oficial o interno;
- fallar con diagnóstico explícito;
- permitir conexión manual como fallback.

## Chatwoot

LeadHopper crea o localiza account, usuarios, inbox, contacto y conversación
según las capacidades de la instancia. El Platform API token se configura por
instancia y nunca se expone al navegador.

## SSO y deep links

SSO se trata como una capacidad de integración, no como una suposición. El MVP
debe soportar deep links seguros y, cuando la versión instalada lo permita,
tokens o mecanismos SSO documentados.

Un enlace a una conversación se genera solo después de resolver el `contactId`,
`inboxId` y `conversationId` correspondientes al tenant.

## Instancias externas

Cada tenant puede configurar su propia URL y credenciales para Twenty y
Chatwoot. La conexión tiene estado, health check, capabilities, fecha de
validación y rotación/desconexión.
