# Módulos de MASTER CRM Commerce

## Dashboard

**Propósito:** resumir el estado operativo y facilitar el acceso a las tareas prioritarias.

**Estado actual:** muestra métricas de pedidos, ventas, envíos, productos, tipo de negocio, canales activos y alertas operativas.

**Futuro esperado:** indicadores configurables, filtros por periodo, tendencias, alertas accionables y datos consolidados del backend.

## Clientes

**Propósito:** centralizar información de contacto, entrega y relación comercial.

**Estado actual:** permite registrar, editar, buscar y seleccionar clientes; la operación principal permanece en LocalStorage.

**Futuro esperado:** perfiles persistentes, historial de compras y conversaciones, segmentación, consentimiento y deduplicación.

## Productos

**Propósito:** administrar el catálogo comercial y sus datos de venta.

**Estado actual:** ofrece búsqueda, alta, edición, activación y desactivación mediante la API de productos.

**Futuro esperado:** variantes, listas de precios, impuestos, imágenes gestionadas, categorías avanzadas y validaciones por plantilla.

## Inventario

**Propósito:** controlar existencias, mínimos, máximos, costos, lotes y movimientos.

**Estado actual:** reutiliza la vista de Productos y muestra stock y alertas básicas.

**Futuro esperado:** movimientos auditables, almacenes, ajustes, reservas, lotes, caducidades y actualización transaccional.

## Pedidos

**Propósito:** coordinar solicitudes desde su creación hasta su entrega o cierre.

**Estado actual:** presenta un tablero por estados y permite avanzar pedidos creados desde la tienda; se persiste localmente.

**Futuro esperado:** persistencia central, historial de estados, asignación, notas, cancelaciones y operación multicanal.

## Ventas

**Propósito:** registrar operaciones comerciales confirmadas y sus importes.

**Estado actual:** muestra ventas generadas al confirmar pagos dentro del flujo local.

**Futuro esperado:** ventas centralizadas, devoluciones, descuentos, impuestos, cortes, reportes y conciliación.

## Pagos

**Propósito:** administrar montos, métodos, estados y referencias de cobro.

**Estado actual:** reutiliza la vista de Cobros y permite marcar pagos como pagados en el estado local.

**Futuro esperado:** integraciones con proveedores, links de pago, webhooks, reembolsos, conciliación e historial auditable.

## Envíos

**Propósito:** controlar preparación, despacho, tránsito y entrega de pedidos.

**Estado actual:** muestra envíos locales o nacionales y permite avanzar manualmente su estado.

**Futuro esperado:** paqueterías, generación de guías, rastreo, costos, incidencias y confirmación de entrega.

## Canales

**Propósito:** reunir los puntos de venta y atención que comparten el mismo núcleo comercial.

**Estado actual:** da acceso a la tienda web; también se identifican WhatsApp y mostrador como canales activos.

**Futuro esperado:** configuración individual por canal, disponibilidad de catálogo, precios, atribución y métricas unificadas.

## WhatsApp Manager

**Propósito:** administrar conversaciones comerciales de WhatsApp y convertirlas en acciones del CRM.

**Estado actual:** muestra conversaciones del backend, mensajes, perfil, estados, respuestas y acciones rápidas.

**Futuro esperado:** asignación de asesores, plantillas aprobadas, automatizaciones, SLA, etiquetas, búsqueda e historial completo.

## Configuración

**Propósito:** concentrar identidad, preferencias, integraciones y personalización del negocio.

**Estado actual:** presenta visualmente las plantillas disponibles, con Farmacia como plantilla activa.

**Futuro esperado:** selección persistente de plantilla, usuarios, roles, sucursales, canales, pagos, envíos y automatizaciones.
