# MASTER CRM

Sistema integral de gestión para farmacias con tienda web e integración a WhatsApp.

## Stack

* HTML
* CSS
* JavaScript Vanilla
* LocalStorage

## Ejecutar frontend estatico

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

Este modo sirve solo los archivos estaticos. Python no incluye el backend, por lo que `/api/send-whatsapp` no esta disponible desde `http://localhost:8080`.

## Ejecutar backend y frontend local

Desde la carpeta `server/`:

```bash
npm start
```

Abrir:

```text
http://localhost:3000/index.html
```

Este modo usa el servidor Node.js y permite acceder a las rutas locales de API, incluida `/api/send-whatsapp`, cuando las variables de entorno requeridas estan configuradas.

## Documentación

* [Guía de desarrollo](docs/DEVELOPMENT_GUIDE.md)
* AGENTS.md
* docs/PROJECT_CONTEXT.md
* [Roadmap](docs/ROADMAP.md)
* [Arquitectura](docs/ARCHITECTURE.md)
* [Módulos](docs/MODULES.md)
* [Changelog](docs/CHANGELOG.md)
