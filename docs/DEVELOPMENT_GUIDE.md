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

1. Levantar el servidor local (desde `server/`: `npm start`).
2. Abrir el navegador en `http://localhost:3000/index.html`.
3. Revisar la consola del navegador y del terminal — sin errores.

Para cambios solo de frontend estático (sin API):

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080` — recordando que `/api/*` no estará disponible en ese modo.

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
