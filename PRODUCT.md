# Product

## Register

product

## Users

Dueños y personal operativo de farmacias independientes o pequeñas cadenas en México. Usan MASTER CRM como **sistema local** en mostrador, back office y móvil: registrar ventas, preparar pedidos, revisar inventario, atender clientes por WhatsApp y conciliar cobros. Necesitan respuestas rápidas, datos confiables y pocos clics por tarea.

## Product Purpose

MASTER CRM es un **sistema local para farmacia**: app UI / dashboard / CRM con navegación lateral y módulos operativos:

- Productos
- Inventario
- Categorías
- Clientes
- Pedidos (logística)
- Ventas (historial económico)
- Pagos
- Envíos
- WhatsApp

El éxito es operar el negocio desde un solo panel claro, con información actualizada y flujos que no interrumpan el mostrador.

## Brand Personality

Confiable, eficiente, claro — tono **médico/farmacéutico** sin frialdad clínica. Estética limpia tipo **Mac / BSG**: herramienta de trabajo bien hecha, no landing promocional. Compacta, legible, sobria; prioriza datos operativos sobre decoración.

## Anti-references

- Dashboards SaaS genéricos con métricas hero, grids idénticos de tarjetas y acentos gradiente decorativos.
- **Tarjetas excesivas** donde una tabla o lista compacta bastaría.
- **Efectos exagerados**: glassmorphism, animaciones llamativas, sombras pesadas, bordes laterales de color en cards.
- Estética “AI slop”: fondos crema/arena, eyebrows en mayúsculas en cada sección, botones amontonados, filas gigantes.
- Copiar Tiendanube/Shopify al pie de la letra sin adaptar a contexto farmacéutico y flujos locales.

## Design Principles

1. **Claridad operativa primero** — cada pantalla responde a un trabajo concreto del día (cobrar, surtir, enviar, revisar stock).
2. **Navegación lateral persistente** — acceso directo a módulos; submenús solo donde aporten (p. ej. Productos → Inventario, Categorías).
3. **Tablas legibles y densidad compacta** — filas compactas, columnas claras, filtros por chips; badges suaves para estados.
4. **Modales bien centrados** — formularios y confirmaciones en `<dialog>` centrados, sin overlays ruidosos.
5. **Simplicidad técnica** — JavaScript vanilla; reutilizar patrones existentes antes de inventar componentes nuevos.
6. **Precisión confiable** — totales, estados de pago/entrega e inventario explícitos y auditables.
7. **Sin exceso visual** — cards solo cuando encapsulan una acción o resumen; evitar efectos decorativos innecesarios.

## Accessibility & Inclusion

Objetivo WCAG 2.1 AA en contraste de texto, estados de foco visibles y controles táctiles usables. Respetar `prefers-reduced-motion`. Badges de estado incluyen texto, no solo color. Formularios con etiquetas claras y mensajes de error comprensibles en español.
