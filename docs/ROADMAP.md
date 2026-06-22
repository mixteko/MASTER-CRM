# Roadmap de MASTER CRM Commerce

## Visión del producto

MASTER CRM Commerce será una plataforma comercial modular para negocios locales. Su objetivo es centralizar clientes, catálogo, inventario, pedidos, ventas, pagos, envíos y canales de atención sin obligar a cada negocio a cambiar su operación de golpe.

El producto parte de la plantilla funcional de farmacia y evolucionará hacia un núcleo reutilizable para distintos giros comerciales, manteniendo JavaScript Vanilla y una migración incremental de la persistencia local hacia servicios de backend.

## Estado actual

La aplicación cuenta con una interfaz CRM responsive, tienda, carrito, clientes, productos, pedidos, ventas, pagos, envíos y administración de conversaciones de WhatsApp. El frontend mantiene parte de la operación en LocalStorage, mientras productos y conversaciones utilizan integraciones de backend y Supabase.

El branding base de MASTER CRM Commerce y la navegación por módulos corresponden a la versión `v0.1.0`. La arquitectura todavía es monolítica y no todos los módulos tienen persistencia remota.

## Fases

### v0.1.0 — Branding CRM

- Adoptar la identidad MASTER CRM Commerce.
- Organizar el menú alrededor de módulos comerciales.
- Incorporar el concepto visual de plantillas de negocio.

### v0.2.0 — Documentación núcleo

- Establecer roadmap, arquitectura, módulos y changelog.
- Crear una fuente de verdad previa a nuevos desarrollos.

### v0.3.0 — Contratos de datos

- Definir entidades, campos, estados y relaciones.
- Documentar contratos entre frontend, backend y almacenamiento.
- Acordar reglas de compatibilidad y migración.

### v0.4.0 — Backend Commerce

- Completar APIs para clientes, pedidos, partidas, ventas, pagos y envíos.
- Incorporar validaciones y operaciones transaccionales.
- Centralizar las reglas críticas de inventario en el servidor.

### v0.5.0 — Migración LocalStorage a Supabase

- Migrar datos por módulo sin interrumpir la operación existente.
- Mantener compatibilidad temporal con LocalStorage.
- Definir respaldo, reconciliación y recuperación.

### v0.6.0 — Auth y roles

- Implementar autenticación real.
- Separar accesos administrativos y de clientes.
- Definir roles y permisos por módulo.

### v0.7.0 — Tienda pública

- Separar claramente la experiencia pública del panel CRM.
- Consolidar catálogo, cuenta de cliente y seguimiento de pedidos.
- Mejorar SEO, accesibilidad y experiencia móvil.

### v0.8.0 — WhatsApp Manager

- Consolidar bandeja, historial, asignación y estados.
- Integrar respuestas asistidas, plantillas y escalamiento humano.
- Añadir trazabilidad de acciones y conversaciones.

### v0.9.0 — Envíos y pagos

- Integrar proveedores de pago y logística.
- Gestionar referencias, guías, eventos y conciliación.
- Unificar estados de pedido, pago y envío.

### v1.0.0 — MVP estable

- Completar los flujos comerciales principales de extremo a extremo.
- Contar con seguridad, pruebas, documentación y monitoreo mínimos.
- Publicar una versión estable para operación real controlada.
