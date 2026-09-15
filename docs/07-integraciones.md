# Integraciones futuras

Twenty, Chatwoot y otras integraciones CRM no forman parte del MVP. Se
mantienen fuera de Docker y del camino crítico para poder validar primero la
calidad del discovery.

Cuando exista evidencia de uso, cada integración deberá agregarse detrás de un
adapter pequeño, con contrato, timeout, retries, idempotencia y pruebas contra
una versión fijada.
