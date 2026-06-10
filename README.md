# Mini Farmacia

Prototipo inicial para una tienda de farmacia enlazada desde WhatsApp, con una identidad visual modernizada a partir del logo original.

## Qué incluye

- Catálogo por categorías con búsqueda, inventario demo y productos con receta.
- Registro local de cliente con nombre, teléfono, correo, contraseña y dirección.
- Carrito con cantidades, envío local/nacional, método de pago y confirmación.
- Historial local de pedidos.
- Simulador de entrada por WhatsApp con mensaje de bienvenida configurable.
- Liga `wa.me` para enviar el resumen del pedido al número del negocio.

## Cómo probarlo

Abre `index.html` en el navegador o sirve la carpeta con un servidor local:

```bash
python3 -m http.server 8080
```

Después entra a:

```text
http://localhost:8080
```

## Siguiente paso de integración

La pantalla de WhatsApp deja el flujo definido:

1. El cliente manda un mensaje al WhatsApp del negocio.
2. Un webhook recibe el mensaje.
3. El backend responde con el texto de bienvenida y la liga de la tienda.
4. El cliente se registra, compra y confirma el pedido.

Para producción conviene conectar WhatsApp Cloud API de Meta o un proveedor como Twilio. Si se decide usar una sesión de WhatsApp Web, se puede agregar un backend Node.js con `whatsapp-web.js`, QR de vinculación, cola de mensajes y persistencia real de clientes/pedidos.
