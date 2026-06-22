# Modelo de datos de Farmacia

## Objetivo

Este documento define los contratos de datos de la plantilla Farmacia de MASTER CRM para la versión `v0.3.0`. Es una especificación funcional previa a cualquier cambio de frontend, backend o base de datos; no representa todavía una migración SQL ni una API implementada.

## Convenciones generales

- Los identificadores se representan como `uuid` o como una cadena estable equivalente durante la transición.
- Los importes monetarios usan decimal con dos posiciones y moneda MXN, nunca números de punto flotante para persistencia definitiva.
- Las fechas de negocio usan formato ISO `YYYY-MM-DD`.
- Las marcas de tiempo usan ISO 8601 con zona horaria.
- Los campos `created_at` y `updated_at` son administrados por el sistema.
- Los campos marcados como opcionales pueden ser `null`; los demás son obligatorios.
- Los catálogos y estados deberán validarse en backend cuando sean implementados.
- Los nombres de campos de este documento son el contrato canónico en `snake_case`.

## A) Producto farmacéutico

Representa un medicamento o artículo farmacéutico disponible en el catálogo. El stock operativo se controla por lotes; `stock_actual` funciona como total consolidado y no debe convertirse en una segunda fuente de verdad.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `nombre_comercial` | texto | Sí | Nombre con el que se comercializa el producto. |
| `sustancia_activa` | texto | No | Principio o combinación de principios activos. |
| `laboratorio` | texto | No | Fabricante o laboratorio. |
| `categoria` | texto o referencia | Sí | Categoría comercial o terapéutica. |
| `presentacion` | texto | Sí | Contenido y empaque, por ejemplo “caja con 20 tabletas”. |
| `concentracion` | texto | No | Concentración declarada, por ejemplo “500 mg”. |
| `forma_farmaceutica` | texto | No | Tableta, cápsula, solución, inyectable u otra forma. |
| `codigo_barras` | texto | No | Código comercial único cuando exista. |
| `sku` | texto | Sí | Clave interna única del producto. |
| `precio_venta` | decimal(12,2) | Sí | Precio vigente de venta; debe ser mayor o igual a cero. |
| `costo_compra` | decimal(12,2) | No | Costo de referencia; el costo real puede variar por lote. |
| `stock_actual` | entero | Sí | Existencia total consolidada; no puede ser negativa. |
| `stock_minimo` | entero | Sí | Umbral para alerta de reposición; no puede ser negativo. |
| `requiere_receta` | booleano | Sí | Indica si la venta necesita receta. |
| `es_controlado` | booleano | Sí | Indica si requiere manejo y validación manual reforzada. |
| `requiere_refrigeracion` | booleano | Sí | Indica necesidad de cadena fría. |
| `imagen_url` | URL | No | Imagen pública o recurso autorizado del producto. |
| `activo` | booleano | Sí | Controla si puede ofrecerse o venderse. |
| `created_at` | timestamp | Sí | Fecha de creación. |
| `updated_at` | timestamp | Sí | Fecha de última actualización. |

Restricciones principales:

- `sku` debe ser único.
- `codigo_barras`, cuando exista, debe ser único.
- `stock_actual` debe coincidir con la suma de `cantidad_actual` de los lotes disponibles.
- Un producto controlado implica validación manual aunque `requiere_receta` no se encuentre correctamente marcado en datos históricos.

## B) Lote

Representa una entrada de inventario identificable con costo y caducidad propios.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único del lote. |
| `producto_id` | uuid | Sí | Referencia al producto farmacéutico. |
| `numero_lote` | texto | Sí | Número asignado por fabricante o proveedor. |
| `fecha_caducidad` | fecha | Sí | Fecha límite de uso o comercialización. |
| `cantidad_inicial` | entero | Sí | Cantidad recibida originalmente; debe ser positiva. |
| `cantidad_actual` | entero | Sí | Cantidad disponible; entre cero y `cantidad_inicial`. |
| `costo_compra` | decimal(12,2) | Sí | Costo unitario del lote. |
| `proveedor` | texto o referencia | No | Proveedor responsable del surtido. |
| `fecha_compra` | fecha | Sí | Fecha de adquisición o recepción. |
| `created_at` | timestamp | Sí | Fecha de registro. |

Restricciones principales:

- La combinación `producto_id` y `numero_lote` debe ser única dentro de la operación definida.
- Un lote caducado o sin cantidad disponible no puede asignarse a un pedido.
- La salida de lotes sigue FEFO: primero caduca, primero sale.

## C) Cliente

Representa a la persona que consulta o realiza una compra. Los datos relacionados con salud requieren acceso restringido y uso mínimo.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `nombre` | texto | Sí | Nombre del cliente. |
| `telefono` | texto | Sí | Teléfono normalizado para contacto y WhatsApp. |
| `email` | texto | No | Correo electrónico válido. |
| `direccion_principal` | texto | No | Dirección predeterminada de entrega. |
| `fecha_nacimiento` | fecha | No | Dato opcional sujeto a necesidad y consentimiento. |
| `alergias` | texto | No | Dato sensible opcional; no debe usarse para diagnóstico automático. |
| `notas` | texto | No | Observaciones autorizadas y pertinentes para la operación. |
| `created_at` | timestamp | Sí | Fecha de alta. |

Restricciones principales:

- El teléfono debe almacenarse normalizado y utilizarse para evitar duplicados cuando corresponda.
- `fecha_nacimiento`, `alergias` y `notas` deben tratarse como datos personales sensibles o de acceso restringido.

## D) Pedido

Representa la solicitud comercial completa y coordina validación, pago, inventario y entrega.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `cliente_id` | uuid | Sí | Referencia al cliente. |
| `canal` | enum | Sí | `web`, `whatsapp` o `mostrador`. |
| `estado` | enum | Sí | Estado operativo del pedido. |
| `subtotal` | decimal(12,2) | Sí | Suma previa a descuento y envío. |
| `descuento` | decimal(12,2) | Sí | Descuento total, mayor o igual a cero. |
| `envio` | decimal(12,2) | Sí | Costo de entrega, mayor o igual a cero. |
| `total` | decimal(12,2) | Sí | `subtotal - descuento + envio`. |
| `metodo_pago` | enum o texto | Sí | Método seleccionado. |
| `estado_pago` | enum | Sí | Estado consolidado del cobro. |
| `requiere_receta` | booleano | Sí | Verdadero cuando cualquier detalle necesita receta. |
| `receta_validada` | booleano | Sí | Resultado de validación humana de la receta. |
| `direccion_entrega` | texto | Condicional | Obligatoria para pedidos con entrega. |
| `notas` | texto | No | Indicaciones comerciales u operativas. |
| `created_at` | timestamp | Sí | Fecha de creación. |
| `updated_at` | timestamp | Sí | Fecha de última actualización. |

Estados sugeridos del pedido: `nuevo`, `pendiente_validacion`, `confirmado`, `preparando`, `enviado`, `completado` y `cancelado`.

Restricciones principales:

- `requiere_receta` se deriva de los detalles y no debe depender solo de entrada manual.
- Un pedido con producto controlado permanece en `pendiente_validacion` hasta aprobación manual.
- El total debe calcularse en un componente confiable y validarse nuevamente en backend.

## E) Detalle de pedido

Representa cada producto y cantidad incluidos en un pedido.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `pedido_id` | uuid | Sí | Referencia al pedido. |
| `producto_id` | uuid | Sí | Referencia al producto. |
| `lote_id` | uuid | No | Lote asignado; puede definirse durante la confirmación o preparación. |
| `cantidad` | entero | Sí | Unidades solicitadas; debe ser mayor que cero. |
| `precio_unitario` | decimal(12,2) | Sí | Precio congelado al crear o confirmar el pedido. |
| `subtotal` | decimal(12,2) | Sí | `cantidad × precio_unitario`. |
| `requiere_receta` | booleano | Sí | Copia histórica de la condición al momento de la venta. |
| `es_controlado` | booleano | Sí | Copia histórica de la clasificación al momento de la venta. |

Restricciones principales:

- Los indicadores farmacéuticos se conservan en el detalle aunque el producto cambie posteriormente.
- Un detalle puede requerir más de un lote en la implementación futura; si ocurre, deberá modelarse una asignación separada sin sobrecargar `lote_id`.

## F) Pago

Representa un intento, registro o confirmación de cobro asociado a un pedido.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `pedido_id` | uuid | Sí | Referencia al pedido. |
| `metodo` | enum o texto | Sí | Efectivo, transferencia, terminal u otro método. |
| `monto` | decimal(12,2) | Sí | Monto del pago; debe ser mayor que cero. |
| `estado` | enum | Sí | Estado del intento de pago. |
| `referencia` | texto | No | Referencia bancaria o del proveedor. |
| `proveedor_pago` | texto | No | Proveedor externo responsable del proceso. |
| `created_at` | timestamp | Sí | Fecha de creación. |

Estados sugeridos: `pendiente`, `procesando`, `pagado`, `fallido`, `cancelado` y `reembolsado`.

## G) Envío

Representa la entrega local o por proveedor vinculada con un pedido.

| Campo | Tipo sugerido | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | uuid | Sí | Identificador único. |
| `pedido_id` | uuid | Sí | Referencia al pedido. |
| `tipo_envio` | enum | Sí | `local`, `recoleccion` o `paqueteria`. |
| `proveedor` | texto | No | Servicio externo o equipo responsable. |
| `costo` | decimal(12,2) | Sí | Costo de entrega, mayor o igual a cero. |
| `estado` | enum | Sí | Estado operativo del envío. |
| `tracking_url` | URL | No | Enlace de seguimiento cuando exista. |
| `direccion_entrega` | texto | Condicional | Obligatoria excepto para recolección. |
| `repartidor` | texto o referencia | No | Persona o unidad asignada. |
| `created_at` | timestamp | Sí | Fecha de creación. |
| `updated_at` | timestamp | Sí | Fecha de última actualización. |

Estados sugeridos: `pendiente`, `preparando`, `asignado`, `en_ruta`, `entregado`, `incidencia` y `cancelado`.

Para la primera implementación se priorizan envíos locales. Los productos refrigerados requieren una regla operativa de cadena fría antes de habilitar su entrega automática.

## Relaciones principales

- Un producto farmacéutico tiene cero o muchos lotes.
- Un cliente tiene cero o muchos pedidos.
- Un pedido tiene uno o muchos detalles.
- Cada detalle pertenece a un producto y puede asignarse a un lote.
- Un pedido tiene cero o muchos pagos.
- Un pedido tiene cero o un envío activo en el alcance inicial.
- Los indicadores de receta y controlado se propagan de Producto a Detalle y de Detalle a Pedido.

## Reglas de negocio para farmacia

1. No vender un producto inactivo.
2. No vender un producto sin stock suficiente.
3. Alertar cuando `stock_actual` sea menor o igual a `stock_minimo`.
4. Alertar la caducidad próxima con un umbral configurable; inicialmente se recomienda 90 días.
5. Si cualquier producto requiere receta, el pedido debe marcarse con `requiere_receta = true`.
6. Un producto controlado siempre requiere validación manual antes de confirmar el pedido.
7. El inventario se descuenta al confirmar el pedido, no al agregar productos al carrito.
8. La confirmación y el descuento de inventario deben ejecutarse como una sola operación atómica en la implementación de backend.
9. Los lotes deben salir por caducidad más próxima primero mediante FEFO.
10. No se asignan lotes caducados, inactivos o sin existencia.
11. No se manejan medicamentos controlados automáticamente sin validación humana explícita.
12. Un pedido que requiera receta no puede avanzar a preparación hasta que `receta_validada = true`.
13. La cancelación posterior a una reserva o descuento debe devolver existencias al lote original mediante un movimiento auditable.
14. Los productos que requieren refrigeración deben identificarse durante preparación y envío.

## Decisiones pendientes para implementación

- Definir el catálogo normativo de medicamentos controlados.
- Definir almacenamiento, acceso, vigencia y eliminación de recetas.
- Acordar el umbral definitivo de caducidad próxima.
- Definir si el inventario se reserva antes de confirmar pedidos con validación pendiente.
- Modelar movimientos de inventario y asignaciones de múltiples lotes por detalle.
- Definir políticas de privacidad para alergias, fecha de nacimiento, notas y recetas.
- Acordar los estados definitivos y sus transiciones permitidas.
