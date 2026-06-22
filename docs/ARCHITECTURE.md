# Arquitectura de MASTER CRM Commerce

## Panorama general

MASTER CRM Commerce se plantea como un CRM comercial modular. La implementación actual es una aplicación web monolítica en JavaScript Vanilla con un servidor Node.js y persistencia híbrida. La arquitectura objetivo separará responsabilidades gradualmente, sin reescrituras completas ni cambios simultáneos de alto riesgo.

## Core

El Core representa las capacidades compartidas por todo el sistema: identidad del negocio, configuración, clientes, usuarios, permisos, estados comunes, auditoría y reglas de navegación. Debe evitar dependencias específicas de un giro comercial.

Actualmente estas responsabilidades están distribuidas entre la interfaz, objetos de estado y LocalStorage. Su separación se realizará después de definir los contratos de datos.

## Commerce

Commerce contiene catálogo, inventario, carrito, pedidos, ventas, pagos y envíos. Es responsable del flujo comercial desde la selección de productos hasta el cierre y entrega de una venta.

Actualmente el catálogo puede obtenerse del backend, pero pedidos, ventas, pagos y envíos siguen operando principalmente en el navegador. La arquitectura futura debe ejecutar en el backend las operaciones críticas y transaccionales.

## Channels

Channels agrupa los puntos de contacto y venta: tienda web, mostrador, WhatsApp y futuros canales. Cada canal debe reutilizar los mismos contratos comerciales y evitar crear fuentes de datos independientes.

La tienda y WhatsApp existen actualmente dentro de la misma interfaz. En futuras fases podrán evolucionar como experiencias diferenciadas que consuman un núcleo común.

## Templates

Templates define configuraciones por tipo de negocio, como farmacia, ferretería, refaccionaria, abarrotes, consultorio o tienda de suplementos. Una plantilla podrá definir vocabulario, módulos visibles, campos adicionales y reglas configurables sin duplicar el producto completo.

En la versión actual las plantillas son una representación visual; Farmacia es la plantilla activa y no existe todavía lógica de selección.

## AI

AI reúne asistencia para conversaciones, clasificación, sugerencias y automatización supervisada. La inteligencia artificial no debe sustituir validaciones comerciales, inventario real ni decisiones sensibles.

El backend contempla respuestas mediante DeepSeek con reglas básicas de seguridad. La evolución deberá incluir trazabilidad, límites, aprobación humana y manejo explícito de errores.

## Automations

Automations coordinará eventos repetibles, por ejemplo bienvenida, seguimiento de pedidos, alertas de inventario, recordatorios de pago y cambios de estado. Las automatizaciones deberán ser idempotentes, auditables y configurables.

Actualmente existen respuestas automáticas de WhatsApp y acciones manuales en la interfaz, pero no hay un motor general de automatizaciones.

## Backend

El backend actual utiliza Node.js y el módulo HTTP nativo. Expone rutas para productos, conversaciones, webhooks y envío de mensajes de WhatsApp, además de comunicarse con Supabase y servicios externos.

Todavía no ofrece cobertura completa para clientes, pedidos, ventas, pagos y envíos. Antes de ampliarlo deben definirse contratos, autenticación, permisos, validaciones y límites claros de cada endpoint.

## Frontend actual

El frontend se compone principalmente de `index.html`, `styles.css` y `app.js`. Funciona como una SPA basada en secciones visibles, eventos del DOM y un estado global. No utiliza frameworks y conserva compatibilidad móvil mediante CSS responsive.

`app.js` contiene datos iniciales, estado, acceso a APIs, persistencia, renderizado y eventos. No debe modularizarse hasta contar con contratos y pruebas que permitan mover responsabilidades sin cambiar comportamiento.

## Riesgos actuales

- Persistencia dividida entre LocalStorage y Supabase.
- Lógica de interfaz, estado, red y dominio concentrada en archivos grandes.
- Operaciones comerciales críticas ejecutadas solo en el navegador.
- Autenticación y autorización incompletas.
- APIs y servicios externos con configuraciones aún acopladas al despliegue actual.
- Falta de pruebas automatizadas y contratos versionados.
- Posible desincronización de inventario, pedidos y ventas.
- Plantillas de negocio todavía sin modelo funcional.

## Principios de evolución

### Desarrollo incremental

Cada cambio debe ser pequeño, verificable y compatible con el estado anterior. Las migraciones deben permitir periodos controlados de convivencia entre mecanismos viejos y nuevos.

### No romper funcionalidad

Los flujos actuales deben conservarse mientras se sustituyen sus componentes. Antes de mover responsabilidades se documentarán contratos y pruebas de regresión.

### Un sprint, un objetivo

Cada sprint tendrá un resultado principal claramente delimitado. No se combinarán rebranding, refactorización, migración de datos y nuevas funciones dentro del mismo sprint.
