# Módulos de MASTER CRM

## Dashboard

**Propósito:** resumir el estado operativo y facilitar el acceso a las tareas prioritarias.

**Estado actual:** muestra métricas de pedidos, ventas, envíos, productos, tipo de negocio, canales activos y alertas operativas.

**Futuro esperado:** indicadores configurables, filtros por periodo, tendencias, alertas accionables y datos consolidados del backend.

## Clientes

**Propósito:** centralizar información de contacto, entrega y relación comercial.

**Estado actual:** permite registrar, editar, buscar y seleccionar clientes; la operación principal permanece en LocalStorage.

**Futuro esperado:** perfiles persistentes, historial de compras y conversaciones, segmentación, consentimiento y deduplicación.

**Planificado (US-012, tras cerrar Productos):** tipos de cliente con descuento general, reglas de excepción por categoría/clasificación, regla de mejor precio (promoción vs descuento). Ver `docs/DEVELOPMENT_GUIDE.md` § US-012. No aplicar a ventas en fase 1.

## Productos

**Propósito:** administrar el catálogo de productos farmacéuticos y sus condiciones de venta.

**Estado actual:** ofrece búsqueda, alta, edición, activación y desactivación mediante la API de productos; ya maneja datos básicos como sustancia, caducidad, stock y condición de receta.

**Inventario (US-011A):** en **Productos → Inventario**, ajuste de stock con Agregar / Descontar / Reemplazar, motivo obligatorio, historial por producto y API `POST /api/inventory/adjust`. Ver `docs/DEVELOPMENT_GUIDE.md` § US-011A.

**Futuro esperado:** nombre comercial, sustancia activa, laboratorio, presentación, concentración, forma farmacéutica, receta, clasificación de controlado, refrigeración e imágenes gestionadas.

**Categorías (Tiendanube / US-012A):** subcategorías, ocultar en tienda, acciones visibles en escritorio, eliminación segura con conteo de productos y subcategorías; si hay productos asignados se bloquea el borrado y se ofrece ocultar en tienda. Ver `docs/DEVELOPMENT_GUIDE.md`.

**Clasificaciones (US-012B):** etiquetas internas clínicas/administrativas (no se muestran en tienda); acciones visibles en escritorio; activar/desactivar sin afectar productos existentes; eliminación segura solo sin productos asociados; si hay productos asignados se bloquea el borrado y se ofrece desactivar. Ver `docs/DEVELOPMENT_GUIDE.md`.

**Importar / Exportar CSV (US-013 / US-013B):** exportar catálogo activo a `master-crm-productos-YYYY-MM-DD.csv`; importar con vista previa editable, botón **Revalidar datos**, normalización de fechas y confirmación bloqueada si hay errores; tras importar se muestra resumen final y se limpia la vista previa; SKU como clave de actualización; no borra productos ausentes del CSV; conserva imágenes si `imagen_url` viene vacío y la opción está activa. Ver `docs/DEVELOPMENT_GUIDE.md`.

## Inventario

**Propósito:** controlar existencias farmacéuticas por lote, caducidad, costo y condición de almacenamiento.

**Estado actual:** reutiliza la vista de Productos y muestra stock y alertas básicas.

**Ajuste de stock (US-011A / US-011C / US-011D):** modal unificado con **Ajustar lote existente** (modifica lote ya creado; Agregar/Descontar/Reemplazar) y **Agregar nuevo lote** (entrada nueva en el mismo producto; sin selector de lote existente; movimiento `entrada`). Inventario: **Ajustar stock** y **Ver historial**. Historial con badges compactos en columna Tipo.

**Lotes en producto:** Editar, Pausar (reversible) y Eliminar (irreversible; confirmación escribiendo `ELIMINAR`; recalcula stock; movimiento `correccion`).

**FEFO:** las salidas deben priorizar el lote con caducidad más próxima; en Inventario, Descontar preselecciona ese lote.

**Futuro esperado:** entradas y salidas auditables adicionales, alertas de stock bajo y caducidad próxima, cadena fría, reservas y actualización transaccional en ventas.

## Recetas

**Propósito:** registrar y validar la autorización necesaria para dispensar productos que requieren receta, especialmente medicamentos controlados.

**Estado actual:** los productos pueden indicar que requieren receta, pero no existe un módulo independiente ni validación documental persistente.

**Futuro esperado:** carga segura, vigencia, validación manual, responsable de aprobación, trazabilidad y acceso restringido. Ningún medicamento controlado debe procesarse automáticamente.

## Pedidos

**Propósito:** coordinar solicitudes desde su creación, validando stock, lotes, receta y productos controlados antes de preparación y entrega.

**Estado actual:** presenta un tablero por estados y permite avanzar pedidos creados desde la tienda; se persiste localmente.

**Futuro esperado:** persistencia central, estado `pendiente_validacion`, revisión de receta, aprobación manual de controlados, asignación FEFO, descuento atómico de inventario, historial y cancelaciones auditables.

## Ventas

**Propósito:** registrar operaciones comerciales confirmadas y sus importes.

**Estado actual:** muestra ventas generadas al confirmar pagos dentro del flujo local.

**Futuro esperado:** ventas centralizadas, devoluciones, descuentos, impuestos, cortes, reportes y conciliación.

## Pagos

**Propósito:** administrar montos, métodos, estados y referencias de cobro.

**Estado actual:** reutiliza la vista de Cobros y permite marcar pagos como pagados en el estado local.

**Futuro esperado:** integraciones con proveedores, links de pago, webhooks, reembolsos, conciliación e historial auditable.

## Envíos

**Propósito:** controlar preparación, despacho, tránsito y entrega local de pedidos farmacéuticos.

**Estado actual:** muestra envíos locales o nacionales y permite avanzar manualmente su estado; la primera prioridad de producto será la entrega local.

**Futuro esperado:** zonas y tarifas locales, asignación de repartidor, rastreo, incidencias, confirmación de entrega y controles para productos refrigerados. La paquetería nacional queda en una fase posterior.

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

**Futuro esperado:** configuración persistente de Farmacia, usuarios, roles, sucursales, canales, pagos, envíos y reglas farmacéuticas. Otros tipos de negocio quedan como idea posterior al MVP.
