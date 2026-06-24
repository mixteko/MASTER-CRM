# Guía de desarrollo — MASTER CRM

Documento de referencia para desarrollar el proyecto con reglas claras antes de agregar nuevas funcionalidades.

---

## 1. Nombre del proyecto

**MASTER CRM**

---

## 2. Enfoque

Sistema integral de gestión para farmacias.

---

## 3. Stack actual

| Capa | Tecnología |
|------|------------|
| Frontend | HTML, CSS, JavaScript Vanilla |
| Backend | Node.js sin Express |
| Datos | Supabase (productos, conversaciones) |
| Mensajería | WhatsApp Cloud API |
| Despliegue | Render / backend remoto |

---

## 4. Flujo de trabajo

1. **Una historia por cambio** — Cada tarea o PR debe resolver un solo objetivo de negocio o técnico.
2. **Un objetivo por commit** — Cada commit debe ser atómico y describir un único cambio coherente.
3. **No mezclar frontend, backend y docs en cambios grandes** — Separar cambios por capa cuando sea posible para facilitar revisión y rollback.
4. **No hacer commit si la app no corre** — Verificar que el proyecto arranca y responde antes de versionar.
5. **Probar antes de commitear** — Ejecutar las pruebas mínimas (sección 8) en cada cambio.

---

## 5. Convenciones de commits

Usar prefijos convencionales al inicio del mensaje:

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Solo documentación |
| `chore:` | Tareas de mantenimiento (deps, config, scripts) |
| `refactor:` | Cambio interno sin alterar comportamiento observable |

Ejemplos:

```text
feat: agregar filtro por categoría en catálogo
fix: corregir total del carrito con descuentos
docs: actualizar guía de desarrollo
```

---

## 6. Reglas de seguridad

- **No versionar `.env`** — Mantener credenciales fuera del repositorio; usar `.env.example` si aplica.
- **No exponer tokens** — API keys, service role y secrets solo en variables de entorno del servidor.
- **No imprimir datos sensibles** — Evitar `console.log` de payloads completos, tokens o datos de clientes en producción.
- **Validar payloads en backend** — Toda entrada de API debe validarse antes de procesarse o persistirse.
- **No usar service role en frontend** — El cliente solo debe usar claves públicas/anónimas con RLS; operaciones privilegiadas van al backend.

---

## 7. Reglas para productos

- **Mantener compatibilidad del contrato actual** — No cambiar la forma en que el frontend consume productos sin migración planificada.
- **No romper catálogo ni carrito** — Cualquier cambio en el modelo o API debe seguir funcionando con los flujos existentes.
- **Agregar campos nuevos sin renombrar campos existentes** — Extender el esquema de forma aditiva; evitar breaking changes en nombres de columnas o propiedades JSON.
- **Probar GET, POST, PATCH y DELETE** — Verificar todas las operaciones CRUD de productos tras cada cambio relacionado.

---

## 8. Pruebas mínimas por cambio

Ejecutar antes de considerar un cambio listo:

```bash
node --check app.js
node --check server/server.js
git diff --check
```

Además:

1. Levantar el servidor local oficial:

```bash
npm --prefix server start
```

2. Abrir el navegador en `http://localhost:3090`.
3. Revisar la consola del navegador y del terminal — sin errores.

El servidor Node sirve frontend y APIs desde el mismo origen en `http://localhost:3090`. No usar `python3 -m http.server 8080` para el trabajo normal, porque ese modo no incluye backend local ni APIs.

Subida de imagenes de producto:

* Endpoint: `POST /api/uploads/product-image`
* Bucket Supabase: `product-images`
* `SUPABASE_SERVICE_ROLE_KEY` solo en `server/.env`
* La tabla `productos` guarda solo `imagen_url` (URL publica); no base64

Categorias y clasificaciones (US-008):

* Endpoints: `GET/POST/PATCH/DELETE /api/categories` y `/api/classifications`
* `DELETE` desactiva (`activo=false`); no hay borrado fisico
* Tabla `categorias` ya existe en Supabase (`server/sql/schema.sql`)
* Tabla `clasificaciones` debe crearse en Supabase antes de usar la seccion administrativa

SQL recomendado (ejecutar en el SQL Editor de Supabase):

```sql
create table if not exists clasificaciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  descripcion text,
  activo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table productos
  add column if not exists clasificacion_id uuid references clasificaciones(id) on delete set null;

create index if not exists idx_productos_clasificacion_id on productos(clasificacion_id);
```

Archivo completo con datos de ejemplo: `server/sql/clasificaciones.sql`

Prueba rapida de APIs:

```bash
curl -s http://localhost:3090/api/categories | python3 -m json.tool | head -40
curl -s http://localhost:3090/api/classifications | python3 -m json.tool | head -40
```

Alertas de caducidad (US-007 / US-007B):

* Campo frontend: `expiresAt` (mapeado desde `inventario.fecha_caducidad` en backend)
* Funciones en `app.js`: `getExpirationStatus(expiresAt)` y `getExpirationSummary(products)`
* Semáforo sanitario (días restantes desde hoy; calculado en frontend):
  * `red` (0 días / vencidos): `daysLeft <= 0` — etiquetas «Vencido» o «Vence hoy»
  * `orange` (15 días): 1 a 15 días
  * `yellow` (1 mes): 16 a 30 días
  * `green` (2 meses): 31 a 60 días
  * `blue` (3 meses): 61 a 90 días
  * `safe` (+3 meses): más de 90 días — badge gris oscuro discreto, sin alerta sanitaria
  * `none`: sin fecha — «Sin fecha» discreto, sin alerta
* **Grupos exclusivos (US-010C):** `getExpirationSummary()` clasifica cada producto activo en un solo grupo. La suma `red + orange + yellow + green + blue + noAlert` debe coincidir con `total` activos. `noAlert = safe + none` (tarjeta «Sin alerta»); no incluye productos en rojo–azul.
* Las tarjetas de alerta en **Lista de productos** son filtros clicables (`state.expirationFilter`). El chip «Mostrando: …» y el botón **Ver lista completa** aparecen junto al título de alertas (solo con filtro activo) y quitan el filtro de caducidad sin borrar la búsqueda textual. **Actualizar** recarga desde API y también limpia el filtro de caducidad.
* El color del producto en lista usa el lote activo con stock > 0 y caducidad más próxima (el más urgente gana)
* Badges y franja lateral usan clases `is-expiration-*`

Inventario por lote (US-010 / US-010A):

* Un producto maestro (`productos`) puede tener múltiples filas en `inventario` (lotes)
* El stock total del producto es la suma del stock de lotes activos; el backend sincroniza `productos.stock`
* La caducidad mostrada en lista/alertas usa el lote activo con **stock > 0** y fecha más próxima (semáforo US-007B / US-010B)
* **Ganancia comercial ponderada** (`getProductCommercialMetrics`):
  * Por cada lote activo con stock: `ganancia_lote = (precioLista - costoLote) * stockLote`
  * Ganancia total lista = suma de `ganancia_lote`
  * Costo promedio ponderado = `sum(costoLote * stockLote) / stockTotal`
  * Margen = `((precioLista - costoPromedio) / costoPromedio) * 100`
  * Si hay precio promocional distinto, se muestra ganancia promocional total aparte
* **Precios separados** (US-010B):
  * `regularPrice` / `price` / `precio` = precio lista (columna `productos.precio`)
  * `discountPrice` / `promotionalPrice` = precio promocional (columna `productos.precio_promocional`)
  * Ejecutar en Supabase SQL Editor: `server/sql/precio_promocional.sql` antes de usar precio promocional
  * No se copia automáticamente lista → promocional al guardar; son campos independientes
* API de lotes: `POST /api/product-lots`, `PATCH /api/product-lots/:id`
* Lotes pausados: prefijo `[INACTIVO]` en `inventario.lote`
* FEFO preparado: `sortLotsFefo()` y `planFefoDeduction()` (ventas pendientes)
* Formulario de edición centrado (`max-width` alineado a lista de productos)

Ajuste de stock en Inventario (US-011A / US-011C):

* Subpágina **Inventario**: acciones **Ajustar stock** y **Ver historial** por producto
* Modal **Ajustar stock** con dos pestañas principales:
  * **Ajustar lote existente** — selector de lote, Agregar / Descontar / Reemplazar, motivo; modifica un lote ya creado
  * **Agregar nuevo lote** — solo campos de lote nuevo (sin selector ni Descontar/Reemplazar); crea entrada en el mismo producto; movimiento `entrada`
* **Lista de productos** y **Inventario** usan el mismo flujo para agregar lote (pestaña **Agregar nuevo lote** o botón **Agregar Lote** en edición de producto)
* El producto es único en catálogo (`productos`); los lotes son filas en `inventario`
* **Pausar lote** es reversible (prefijo `[INACTIVO]`); **Eliminar lote** es irreversible y requiere escribir `ELIMINAR` en confirmación
* Al eliminar lote: `DELETE /api/inventory/lots/:lotId`, recalcula stock total, registra movimiento `correccion` con motivo «Eliminación permanente de lote»; conserva historial previo del producto
* Si el lote eliminado tenía stock > 0, la confirmación advierte que se descontará del total
* Si ya existe lote con mismo número y caducidad, advertencia antes de duplicar al agregar
* Endpoints: `POST /api/inventory/adjust`, `POST /api/inventory/lots`, `DELETE /api/inventory/lots/:lotId`, `GET /api/inventory/movements?productId=ID`
* Tabla Supabase: `movimientos_inventario` — SQL en `server/sql/movimientos_inventario.sql` (ejecutar en Supabase antes de usar)
* No modifica productos con `eliminado=true`; no borra lotes; no permite stock negativo en ajustes
* Tras ajuste: toast «Stock ajustado»; tras nuevo lote: toast «Lote agregado al inventario»; recarga productos
* **Ver historial** — movimientos del producto; columna Tipo como badge corto (Entrada, Salida, Reemplazo, etc.)
* **FEFO:** al descontar stock, el sistema sugiere primero el lote con caducidad más próxima (`sortLotsFefo()`)

Módulo Productos (navegación):

* La sección principal del menú lateral es **Productos**, con submenús:
  * **Lista de productos** (`products-list`) — pantalla principal del módulo
  * **Inventario** (`products-inventory`) — stock, filtros y control operativo
  * **Categorías** (`products-categories`) — administración de tipos de producto
  * **Clasificaciones** (`products-classifications`) — administración de reglas de manejo
  * **Importar / Exportar** (`products-import-export`) — respaldo y carga masiva por CSV
* **Agregar producto** abre la vista dedicada `product-form` (pantalla limpia con Cancelar / Guardar producto)
* **Editar producto** reutiliza la misma vista `product-form`
* Las rutas legacy `inventario`, `productos`, `categorias` y `clasificaciones` redirigen al submenú correspondiente

Categoría vs Clasificación:

| Concepto | Pregunta que responde | Ejemplos |
|----------|---------------------|----------|
| **Categoría** | ¿Qué tipo de producto es? | Medicamentos, Material de curación, Suplementos, Higiene, Bebé, Dermocosmética |
| **Clasificación** | ¿Cómo debe manejarse? | Venta libre, Receta médica, Controlado, Refrigerado, Alto costo, Caducidad corta |

* En el formulario de producto son campos separados (`productCategory` y `productType`)
* No mezclar valores entre ambos catálogos

Laboratorio en producto:

* Campo opcional en la pantalla `product-form` (`productLaboratory`)
* Se persiste como `laboratory` / `laboratorio` vía `mapProductToDb` en el backend
* Un producto puede guardarse sin laboratorio

Pantalla Agregar / Editar producto:

* Vista dedicada `#product-form`, separada de la lista
* Secciones: Nombre y descripción · Imagen · Clasificación comercial · Inventario y caducidad · Precios y ganancia
* Enlace discreto «Volver a productos» arriba; **Cancelar** y **Guardar producto** al final del formulario
* Al abrir nuevo o editar, la vista hace scroll al inicio (`scrollWorkspaceToTop`)
* Clic en el nombre del producto en la lista abre la misma vista de edición

Lista de productos (US-009A):

* Tabla compacta estilo administrativo con imagen miniatura, nombre clicable, stock y precios editables
* Edición rápida de precios: al salir del input (`blur`) o presionar Enter se valida y guarda con `PATCH /api/products/:id`
* Si el valor no cambió, no se envía petición
* Si falla, se restaura el valor anterior y se muestra toast de error
* Acciones: duplicar, pausar/activar y eliminar (iconos compactos con tooltips)
  * **Pausar** — reversible; `PATCH` con `status: "Pausado"` (`activo: false`, `eliminado: false`)
  * **Eliminar producto** — baja administrativa; `DELETE /api/products/:id` marca `eliminado: true`, `activo: false`, `eliminado_at`; no borrado físico
  * **Eliminar definitivamente** — `DELETE /api/products/:id/permanent`; borrado físico real; requiere escribir `ELIMINAR` en modal; bloqueado si hay `pedido_items` u otras dependencias históricas (409)
* Productos con `eliminado=true` no aparecen en `/api/products` ni cuentan en alertas
* Ejecutar en Supabase SQL Editor: `server/sql/productos_baja.sql` para columnas `eliminado` / `eliminado_at`
* Precio venta (`regularPrice` / `precio`) y precio promocional (`precio_promocional`) son campos separados y persistentes; ver `server/sql/precio_promocional.sql`

Pulido módulo Productos (US-010D / US-010F):

* **Ver lista completa** visible junto al bloque «Alertas de caducidad» cuando hay filtro activo
* Checkboxes de selección más pequeños; tabla y tarjetas de alerta más compactas
* Botón **Agregar producto** con altura reducida
* Formulario: botón **Quitar imagen** limpia `imageUrl`, preview y archivo local; al guardar persiste sin imagen (no borra archivo en Storage)
* Texto formal **Agregar Lote** en formulario de producto; en Inventario se accede desde la pestaña **Agregar nuevo lote** dentro de **Ajustar stock**
* Acciones en lista: duplicar y pausar visibles; menú **Más acciones** con eliminar (baja) y eliminar definitivamente (modal con confirmación `ELIMINAR`)

Importar / Exportar CSV (US-011):

* Subpágina **Importar / Exportar** dentro de Productos (`products-import-export`)
* **Exportar CSV**: genera `master-crm-productos-YYYY-MM-DD.csv` desde `state.products` con columnas:
  `sku`, `name`, `description`, `category`, `classification`, `laboratory`, `stock`, `minStock`, `maxStock`, `lot`, `expiresAt`, `cost`, `regularPrice`, `price`, `promotionalPrice`, `discountPrice`, `imageUrl`, `status`
* **Importar CSV**: lectura en frontend, vista previa (total / válidas / errores / primeras 10 filas) y botón **Confirmar importación**
* Validaciones mínimas por fila: `name` requerido, `price` y `stock` numéricos `>= 0`, `expiresAt` opcional en formato `YYYY-MM-DD`
* Si `sku` coincide con un producto existente → `PATCH /api/products/:id`; si no hay `sku` o no existe → `POST /api/products`
* No borra productos ausentes del CSV; no elimina por importación en esta fase
* `imageUrl` vacío no sobrescribe imagen existente salvo que se marque **Sobrescribir imagen si imageUrl viene vacío**; no sube archivos a Storage (solo URL)
* Si hay filas con error crítico, **Confirmar importación** permanece deshabilitado

Pulido acciones y filtros (US-010G):

* Menú **Más acciones** flotante (`position: fixed`) para no recortarse en la tabla; cada opción peligrosa incluye título + texto secundario explicativo
  * **Eliminar producto** = baja administrativa (conserva trazabilidad, no borrado físico)
  * **Eliminar definitivamente** = borrado físico irreversible (requiere escribir `ELIMINAR`)
* **Ver lista completa** (`clearExpirationFilter`) pone `expirationFilter = null`, recalcula `getFilteredProducts()` y oculta el chip; mantiene búsqueda textual si existe
* **Actualizar** recarga desde API y también limpia el filtro de caducidad

Pulido visual productos (US-009B):

* Iconos SVG en acciones de lista (duplicar, pausar/activar, eliminar), botones ~30px con tooltips rápidos (`data-tooltip`)
* Nombre del producto con tooltip «Editar producto»
* Formulario más compacto: menos padding, gaps y tipografía Inter (13–14px tabla, 12–13px labels/secundario)
* Botones de guardado en barra inferior; header del formulario sin acciones duplicadas

---

## Próximas historias (planificadas)

### US-012 — Clientes, tipos de cliente y reglas de descuento con excepciones

> **Estado:** planificado — **no implementar** hasta cerrar el módulo Productos.
> **Alcance fase 1:** dejar configuración lista y documentada; **no aplicar a ventas** si el módulo de Ventas no está listo.

#### Objetivo

Módulo de **Clientes** con tipos de cliente, descuento general por tipo y excepciones por categoría o clasificación de producto. El descuento depende principalmente del **tipo de cliente**, no del producto, salvo excepciones explícitas.

#### Navegación deseada

```text
Clientes
├── Lista de clientes
├── Tipos de cliente
└── Reglas de descuento
```

#### Concepto de negocio

| Elemento | Descripción |
|----------|-------------|
| **Tipo de cliente** | Define descuento general y condiciones mínimas de compra |
| **Regla de descuento** | Excepción opcional por categoría y/o clasificación |
| **Cliente** | Persona o cuenta comercial con un tipo asignado |

**Tipos sugeridos (semilla):** Público general, Médico, Mayoreo, Familiar, Convenio, Cliente especial.

**Ejemplo — Tipo Médico:**

- Descuento general: 10 %
- Excepciones:
  - Medicamentos controlados → sin descuento (`permite_descuento = false`)
  - Alto costo → máximo 5 % (`descuento_maximo = 5`)
  - Dermocosmética → 15 % (`descuento_porcentaje = 15`)

Si un cliente no tiene tipo asignado, usar **Público general** por defecto.

#### Modelo de datos sugerido (Supabase)

**`tipos_cliente`**

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `uuid` PK | `default gen_random_uuid()` |
| `nombre` | `text` NOT NULL UNIQUE | |
| `descripcion` | `text` | |
| `descuento_general` | `numeric` | default `0` |
| `monto_minimo_compra` | `numeric` | default `0` |
| `cantidad_minima_piezas` | `integer` | default `0` |
| `regla_minima` | `text` | default `'none'` |
| `activo` | `boolean` | default `true` |
| `created_at` / `updated_at` | `timestamptz` | default `now()` |

Valores de `regla_minima`:

- `none` — sin mínimo
- `amount` — exige monto mínimo
- `quantity` — exige cantidad mínima de piezas
- `amount_or_quantity` — basta cumplir monto **o** cantidad
- `amount_and_quantity` — exige monto **y** cantidad

**`reglas_descuento_cliente`**

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `uuid` PK | `default gen_random_uuid()` |
| `tipo_cliente_id` | `uuid` FK → `tipos_cliente(id)` | |
| `categoria_id` | `uuid` NULL | FK a `categorias` |
| `clasificacion_id` | `uuid` NULL | FK a `clasificaciones` |
| `descuento_porcentaje` | `numeric` | default `0` |
| `descuento_maximo` | `numeric` NULL | tope opcional |
| `permite_descuento` | `boolean` | default `true` |
| `prioridad` | `integer` | default `100`; mayor número gana |
| `activo` | `boolean` | default `true` |
| `created_at` / `updated_at` | `timestamptz` | default `now()` |

SQL de referencia (crear en fase de implementación, no ejecutar aún):

```sql
create table if not exists tipos_cliente (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  descripcion text,
  descuento_general numeric default 0,
  monto_minimo_compra numeric default 0,
  cantidad_minima_piezas integer default 0,
  regla_minima text default 'none',
  activo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists reglas_descuento_cliente (
  id uuid primary key default gen_random_uuid(),
  tipo_cliente_id uuid not null references tipos_cliente(id) on delete cascade,
  categoria_id uuid references categorias(id) on delete set null,
  clasificacion_id uuid references clasificaciones(id) on delete set null,
  descuento_porcentaje numeric default 0,
  descuento_maximo numeric,
  permite_descuento boolean default true,
  prioridad integer default 100,
  activo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### Reglas de aplicación de descuento

1. Si **no hay excepción** aplicable, usar `descuento_general` del tipo de cliente.
2. Si hay excepción por **categoría**, usar esa regla.
3. Si hay excepción por **clasificación**, usar esa regla.
4. Si `permite_descuento = false`, **no aplicar** descuento (precio lista).
5. Si existe `descuento_maximo`, el porcentaje efectivo no puede superarlo.
6. Si varias reglas aplican, usar la de **mayor `prioridad`**.
7. El **precio promocional** del producto siempre se respeta; no se anula con un descuento de cliente peor.

Evaluar también `regla_minima` del tipo antes de conceder descuento (monto/cantidad del carrito o pedido).

#### Regla de mejor precio (recomendada)

```text
precio_final = min(
  precio_promocional_válido,
  precio_venta_con_descuento_aplicable
)
```

**Ejemplo 1 — promoción gana:**

- Precio venta: 50 · Precio promocional: 40
- Cliente Médico (10 %): 50 × 0.90 = 45
- **Precio final: 40** (la promoción es mejor)

**Ejemplo 2 — excepción con tope:**

- Producto Alto costo · Precio venta: 1000
- Médico general: 10 % → 900
- Excepción Alto costo: máximo 5 % → 950
- **Precio final por descuento: 950** (si no hay promoción activa)

Función sugerida en implementación: `resolveCustomerPrice(product, customerType, cartContext)`.

#### UI planificada

**Tipos de cliente**

- Crear, editar y desactivar tipo
- Campos: nombre, descripción, descuento general, monto mínimo, cantidad mínima, regla mínima

**Reglas de descuento**

- Seleccionar tipo de cliente
- Categoría opcional · Clasificación opcional
- Descuento, `permite_descuento`, `descuento_maximo`, prioridad, activo/inactivo

**Lista de clientes**

- Crear, editar, buscar
- Asignar tipo de cliente
- Sin tipo → **Público general**

#### APIs sugeridas (fase de implementación)

- `GET/POST/PATCH/DELETE /api/customer-types`
- `GET/POST/PATCH/DELETE /api/customer-discount-rules`
- Extender `GET/POST/PATCH /api/customers` con `tipo_cliente_id`
- Endpoint de cálculo opcional para pruebas: `POST /api/pricing/resolve` — sin integrar a ventas en fase 1

#### Fuera de alcance en fase 1

- Aplicar descuentos en el módulo **Ventas** o en el carrito/tienda
- Cupones, descuentos por producto individual o reglas por SKU
- Historial de cambios de tipo de cliente

#### Dependencias

- Módulo **Productos** cerrado (categorías y clasificaciones estables)
- Tablas `categorias` y `clasificaciones` operativas (US-008)
- Precio lista y promocional separados (US-010B)

---

## 9. Flujo de cierre

Cuando el cambio está probado y listo para versionar:

```bash
git status --short
git add <solo archivos del cambio>
git commit -m "prefijo: mensaje claro"
git push origin main
```

- **`git status --short`** — Confirmar que solo entran archivos del alcance de la tarea.
- **`git add`** — Añadir únicamente los archivos modificados para este cambio; no usar `git add .` a ciegas.
- **`git commit`** — Mensaje con prefijo de la sección 5 y descripción concisa del *por qué*.
- **`git push origin main`** — Publicar solo cuando el commit local está verificado.

---

## Documentación relacionada

- [README.md](../README.md) — Ejecución local y visión general
- [AGENTS.md](../AGENTS.md) — Reglas para agentes y verificación funcional
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Contexto del producto
- [ARCHITECTURE.md](ARCHITECTURE.md) — Arquitectura del sistema
- [ROADMAP.md](ROADMAP.md) — Plan de evolución
