---
name: MASTER CRM
description: Sistema local de gestión para farmacia — estética Mac/BSG, compacta y clara
colors:
  primary: "#f02d8e"
  primary-soft: "#fceef5"
  teal: "#0d9488"
  teal-soft: "#e6f4ea"
  blue: "#2d5af0"
  blue-soft: "#e8f0fe"
  page-bg: "#f4f7f9"
  card-bg: "#ffffff"
  sidebar-bg: "#ffffff"
  border: "#dee2e6"
  ink: "#1f2937"
  muted: "#64748b"
  success-text: "#1e7e34"
  success-soft: "#e6f4ea"
  warning-text: "#c2410c"
  warning-soft: "#fff7ed"
  danger-text: "#b91c1c"
  danger-soft: "#fee2e2"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, SF Pro Display, system-ui, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  nav:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: normal
  table-header:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  card: "12px"
  button: "12px"
  input: "12px"
  badge: "999px"
spacing:
  sidebar-width: "212px"
  panel-padding: "18px 20px"
  table-cell-y: "10px"
  table-cell-x: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "0 14px"
    height: "34px"
  button-ghost:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 11px"
    height: "31px"
  nav-item-active:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  status-badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success-text}"
    rounded: "{rounded.badge}"
    padding: "0 8px"
    height: "22px"
  status-badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning-text}"
    rounded: "{rounded.badge}"
    padding: "0 8px"
    height: "22px"
  status-badge-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger-text}"
    rounded: "{rounded.badge}"
    padding: "0 8px"
    height: "22px"
---

## Overview

MASTER CRM es un panel administrativo local para farmacia. La interfaz sigue una estética **Mac / BSG**: fondo gris-azulado claro, sidebar blanca fija, tipografía system-ui (SF Pro en macOS), bordes sutiles y sombras ligeras. El tono es **médico/farmacéutico operativo**: confiable, compacto, sin efectos exagerados.

**Shell:** grid `sidebar (212px) + workspace`. Navegación lateral con ítems de 34px de alto; estado activo con fondo rosa suave (`--master-primary-soft`).

**Módulos:** Productos (con submenú Inventario, Categorías, Clasificaciones), Clientes, Pedidos, Ventas, Pagos, Envíos, Canales, WhatsApp, Configuración.

**Preferir:** tablas compactas, filtros chip, badges suaves, modales `<dialog>` centrados.

**Evitar:** grids de tarjetas idénticas, animaciones llamativas, glassmorphism, decoración que compita con los datos.

## Colors

Paleta extraída de `:root` en `styles.css`:

| Rol | Token | Uso |
|-----|-------|-----|
| Acento marca | `--master-primary` (#f02d8e) | Botones primarios, foco, nav activo |
| Acento suave | `--master-primary-soft` | Fondo ítem nav activo, chips activos |
| Información | `--master-blue` | Marca, enlaces, acentos secundarios |
| Éxito / stock OK | `--master-teal`, `--master-success-*` | Estados positivos, pills de estado |
| Advertencia | `--master-warning-*` | Pendientes, por cobrar |
| Peligro | `--master-danger-*` | Cancelado, vencido, errores |
| Fondo página | `--master-bg` (#f4f7f9) | Body; gris-azulado, no crema |
| Superficie | `--master-card` | Paneles, tablas, modales |
| Texto | `--master-text` | Cuerpo y títulos |
| Secundario | `--master-muted` | Metadatos, footers de tabla |

La barra superior de cards (`.penpot-card::before`) usa un gradiente decorativo mínimo; no replicar gradientes en texto ni como patrón dominante.

Contraste: texto body ≥ 4.5:1 sobre fondos claros; badges usan par fondo/texto de la misma familia semántica.

## Typography

- **Familia:** `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, "Segoe UI", sans-serif`
- **Base:** 14px body; `-webkit-font-smoothing: antialiased`
- **Jerarquía:** `h1` en workspace header; `.eyebrow` pequeño sobre títulos de vista; labels de formulario 0.74–0.82rem semibold
- **Tablas:** headers ~0.72rem uppercase/semibold; celdas ~0.82rem; totales en `strong`
- **Sin** display type oversized en vistas operativas; el dashboard usa métricas compactas, no hero typography

## Elevation

Sombras sutiles, estilo Mac:

- `--shadow-soft`: hover ligero
- `--shadow-card`: paneles y cards (`0 1px 2px …, 0 8px 24px …`)
- Modales: backdrop semitransparente (`::backdrop`), sin blur pesado
- Sin elevaciones arbitrarias (no `z-index: 9999`); modales y toasts por encima del workspace

Bordes: `1px solid var(--master-border)` en paneles, inputs y botones ghost.

## Components

### Sidebar (`.sidebar`, `.nav-item`)
- Ancho fijo 212px, fondo blanco, borde derecho
- Ítems compactos; activo = rosa suave + borde rosa translúcido
- Subnav para Productos con `.nav-subitem`

### Botones
- **Primary** (`.primary-button`): rosa marca, 34px alto, radius 12px
- **Ghost** (`.ghost-button`): borde gris, fondo blanco; variante `.small` en tablas

### Paneles y tablas
- **Panel** (`.panel-card`, `.penpot-card`, `.table-panel`): borde + sombra card; padding 18–20px
- **Tablas** (`.sales-list-table`, `.orders-list-table`, etc.): filas hover gris muy claro; scroll horizontal en móvil
- **Filtros** (`.sales-filter-chip`, `.orders-filter-chip`): pills; activo = borde rosa + fondo rosa suave

### Badges
- **Estado** (`.sales-status-badge`, `.orders-status-badge`, `.orders-payment-badge`): fondos pastel (info/warning/success/danger), texto semibold ~0.72rem, radius pill
- Suaves, legibles, siempre con etiqueta textual

### Modales (`<dialog>`)
- Centrados, max-width acotado, header + body + footer
- Clases: `.inventory-dialog`, `.product-action-dialog`, modales de pedido/venta
- Backdrop oscuro semitransparente; sin animaciones exageradas

### Métricas dashboard (`.metric-card`)
- Solo en dashboard: grid 3 columnas, icono + label + valor + small
- No usar metric-card como patrón por defecto en listados operativos

## Do's and Don'ts

**Do**
- Reutilizar `.penpot-card`, `.table-panel`, chips de filtro y badges existentes
- Mantener filas de tabla compactas y acciones contextuales mínimas
- Usar modales nativos centrados para crear/editar/confirmar
- Separar Pedidos (logística) y Ventas (económico) visualmente con las mismas convenciones de tabla
- Probar responsive: sidebar colapsa o apila en ≤900px

**Don't**
- Apilar tarjetas donde basta una tabla
- Añadir glassmorphism, gradient text, o animaciones bounce/elastic
- Usar fondos crema/arena o eyebrows en mayúsculas en cada sección
- Botones múltiples por fila sin jerarquía clara
- Efectos hover exagerados o sombras pesadas en cada elemento
