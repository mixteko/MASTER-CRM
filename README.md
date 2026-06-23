# MASTER CRM

Sistema integral de gestión para farmacias con tienda web e integración a WhatsApp.

## Stack

* HTML
* CSS
* JavaScript Vanilla
* LocalStorage

## Ejecutar local

MASTER CRM usa un solo servidor local oficial en el puerto `3090`. El backend Node.js sirve el frontend estatico y las APIs desde el mismo origen.

```bash
npm --prefix server start
```

Abrir:

```text
http://localhost:3090
```

Rutas principales:

* `GET /` sirve `index.html`.
* `GET /index.html` sirve `index.html`.
* `/api/products` usa el CRUD local de productos.
* `POST /api/uploads/product-image` sube imagenes al bucket Supabase `product-images`.
* `/api/conversations` usa el historial local de conversaciones cuando las variables de entorno requeridas estan configuradas.

Variables sensibles:

* `SUPABASE_SERVICE_ROLE_KEY` solo en `server/.env` (nunca en frontend).
* El frontend guarda en productos solo `imagen_url` con URL publica devuelta por el backend.

No usar `python3 -m http.server 8080` para el trabajo normal, porque ese modo no incluye backend local ni APIs.

## Documentación

* [Guía de desarrollo](docs/DEVELOPMENT_GUIDE.md)
* AGENTS.md
* docs/PROJECT_CONTEXT.md
* [Roadmap](docs/ROADMAP.md)
* [Arquitectura](docs/ARCHITECTURE.md)
* [Módulos](docs/MODULES.md)
* [Changelog](docs/CHANGELOG.md)
