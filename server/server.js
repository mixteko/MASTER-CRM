import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..");
loadEnv();

const PORT = Number(process.env.PORT || 3000);
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mini_farmacia_webhook_2026";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const AI_ENABLED = process.env.AI_ENABLED === "true";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const productSearchContexts = new Map();

const server = createServer(async (request, response) => {
  console.log("REQUEST:", request.method, request.url);
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/") {
    sendJSON(response, 200, { ok: true, service: "Mini Farmacia WhatsApp API" });
    return;
  }

  if (request.method === "GET" && request.url.startsWith("/webhook")) {
    handleWebhookVerification(request, response);
    return;
  }

  if (request.method === "POST" && isWebhookPath(request.url)) {
    await handleIncomingWebhook(request, response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/send-whatsapp") {
    await handleSendWhatsApp(request, response);
    return;
  }

  if (request.method === "GET" && request.url.startsWith("/api/products")) {
    await handleGetProducts(response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/products") {
    await handleCreateProduct(request, response);
    return;
  }

  if (request.method === "PATCH" && request.url.startsWith("/api/products/")) {
    await handleUpdateProduct(request, response);
    return;
  }

  if (request.method === "DELETE" && request.url.startsWith("/api/products/")) {
    await handleDeactivateProduct(request, response);
    return;
  }

  if (request.method === "GET" && request.url.startsWith("/api/conversations")) {
    await handleGetConversations(response);
    return;
  }

  if (request.method === "GET") {
    sendStaticFile(request, response);
    return;
  }

  sendJSON(response, 404, { error: "Ruta no encontrada" });
});

server.listen(PORT, () => {
  console.log(`Mini Farmacia WhatsApp API escuchando en http://localhost:${PORT}`);
});

async function handleSendWhatsApp(request, response) {
  try {
    const { telefono, mensaje } = await readJSONBody(request);

    if (!telefono || !mensaje) {
      sendJSON(response, 400, { error: "telefono y mensaje son requeridos" });
      return;
    }

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      sendJSON(response, 500, { error: "Credenciales de WhatsApp no configuradas" });
      return;
    }

    const data = await sendWhatsAppMessage(telefono, mensaje);
    sendJSON(response, 200, { ok: true, data });
  } catch (error) {
    sendJSON(response, 500, { error: "Error interno del servidor", details: error.message });
  }
}

function handleWebhookVerification(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(challenge || "");
    return;
  }

  sendJSON(response, 403, { error: "Token de verificacion invalido" });
}

async function handleIncomingWebhook(request, response) {
  try {
    const body = await readJSONBody(request);
    const messages = extractIncomingMessages(body);

    for (const message of messages) {
      console.log("WEBHOOK NUMERO RECIBIDO:", message.from);
      const record = await saveIncomingMessage(message);
      const reply = await buildChatbotReply(message.text, message.from, record);
      if (reply) {
        await saveOutgoingMessage(record, replyText(reply), reply.conversationStatus);
        try {
          await sendWhatsAppReply(message.from, reply);
        } catch (error) {
          console.error("No se pudo enviar respuesta automatica:", error.message);
        }
      }
    }

    sendJSON(response, 200, { ok: true });
  } catch (error) {
    sendJSON(response, 500, { error: "Error al procesar webhook", details: error.message });
  }
}

async function handleGetConversations(response) {
  if (!isSupabaseEnabled()) {
    sendJSON(response, 200, { ok: true, conversations: [] });
    return;
  }

  try {
    const conversations = await supabaseRequest(
      "/rest/v1/conversaciones?select=id,estado,ultimo_mensaje,ultimo_mensaje_at,created_at,clientes(id,nombre,telefono),mensajes(id,direccion,mensaje,created_at)&order=updated_at.desc&mensajes.order=created_at.asc&limit=50",
    );
    sendJSON(response, 200, { ok: true, conversations });
  } catch (error) {
    sendJSON(response, 500, { error: "No se pudieron cargar conversaciones", details: error.message });
  }
}

async function handleGetProducts(response) {
  if (!isSupabaseEnabled()) {
    sendJSON(response, 500, { error: "Supabase no configurado" });
    return;
  }

  try {
    const products = await getProductsFromSupabase();
    sendJSON(response, 200, { ok: true, products });
  } catch (error) {
    sendJSON(response, 500, { error: "No se pudieron cargar productos", details: error.message });
  }
}

async function handleCreateProduct(request, response) {
  if (!isSupabaseEnabled()) {
    sendJSON(response, 500, { error: "Supabase no configurado" });
    return;
  }

  try {
    const product = await readJSONBody(request);
    const created = await createSupabaseProduct(product);
    sendJSON(response, 200, { ok: true, product: created });
  } catch (error) {
    sendJSON(response, 500, { error: "No se pudo crear producto", details: error.message });
  }
}

async function handleUpdateProduct(request, response) {
  if (!isSupabaseEnabled()) {
    sendJSON(response, 500, { error: "Supabase no configurado" });
    return;
  }

  try {
    const id = getProductIdFromUrl(request.url);
    if (!id) {
      sendJSON(response, 400, { error: "ID de producto requerido" });
      return;
    }

    const product = await readJSONBody(request);
    const updated = await updateSupabaseProduct(id, product);
    sendJSON(response, 200, { ok: true, product: updated });
  } catch (error) {
    sendJSON(response, 500, { error: "No se pudo actualizar producto", details: error.message });
  }
}

async function handleDeactivateProduct(request, response) {
  if (!isSupabaseEnabled()) {
    sendJSON(response, 500, { error: "Supabase no configurado" });
    return;
  }

  try {
    const id = getProductIdFromUrl(request.url);
    if (!id) {
      sendJSON(response, 400, { error: "ID de producto requerido" });
      return;
    }

    const updated = await supabaseRequest(`/rest/v1/productos?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: {
        activo: false,
        updated_at: new Date().toISOString(),
      },
      prefer: "return=representation",
    });
    sendJSON(response, 200, { ok: true, product: mapDbProduct(updated[0]) });
  } catch (error) {
    sendJSON(response, 500, { error: "No se pudo desactivar producto", details: error.message });
  }
}

function isWebhookPath(url) {
  const path = url.split("?")[0];
  return path === "/webhook" || path === "/webhook/";
}

function extractIncomingMessages(body) {
  const entries = Array.isArray(body.entry) ? body.entry : [];

  return entries.flatMap((entry) => {
    const changes = Array.isArray(entry.changes) ? entry.changes : [];

    return changes.flatMap((change) => {
      const messages = Array.isArray(change.value?.messages) ? change.value.messages : [];

      return messages
        .filter((message) => message.from && (message.text?.body || message.interactive?.button_reply))
        .map((message) => ({
          id: message.id,
          from: message.from,
          text: message.text?.body || message.interactive?.button_reply?.id || message.interactive?.button_reply?.title || "",
          buttonId: message.interactive?.button_reply?.id || "",
          buttonTitle: message.interactive?.button_reply?.title || "",
        }));
    });
  });
}

async function buildChatbotReply(text, from, record) {
  const botConfig = await loadBotConfig();
  const menuReply = await buildMenuReply(text, from, botConfig, record);
  if (menuReply) return menuReply;
  const fixedReply = await buildFixedReply(text, from, botConfig);
  if (fixedReply) return fixedReply;
  const productReply = await buildProductReply(text, from);
  if (productReply) return productReply;
  if (AI_ENABLED) {
    console.log("IA ACTIVADA");
    return await getDeepSeekReply(text);
  }
  return "Gracias por escribir a Mini Farmacia. Por ahora puedo ayudarte con: horario, ubicacion, medicamento, pedido o asesor.";
}

async function buildMenuReply(text, from, botConfig, record) {
  const normalizedText = normalizeText(text);

  if (isMainMenuRequest(normalizedText)) return mainMenuMessage();
  if (isEndChatRequest(normalizedText)) {
    if (record?.conversacion?.id) await updateConversacion(record.conversacion.id, "Chat finalizado", "cerrado");
    return {
      text: "✅ Chat finalizado. Cuando necesites ayuda nuevamente, escribe 'hola' o 'menú'.",
      conversationStatus: "cerrado",
    };
  }

  if (normalizedText === "consultar_producto" || normalizedText === "btn_consultar_producto" || normalizedText === "1") {
    return followUpMessage("Escribe el nombre del medicamento o producto que deseas consultar.");
  }

  if (normalizedText === "2") {
    return followUpMessage(await buildCategoriesReply());
  }

  if (normalizedText === "hacer_pedido" || normalizedText === "btn_hacer_pedido" || normalizedText === "3") {
    return followUpMessage("Para levantar tu pedido, envíanos nombre, producto, cantidad y domicilio de entrega.");
  }

  if (normalizedText === "4") {
    return followUpMessage(buildScheduleLocationReply(botConfig));
  }

  if (normalizedText === "asesor_humano" || normalizedText === "btn_asesor_humano" || normalizedText === "5") {
    await sendAdminAlerts(botConfig, from, text);
    return followUpMessage("Te canalizo con un asesor humano. En breve te atenderemos.", "asesor humano");
  }

  if (normalizedText === "6") {
    return followUpMessage("Compártenos tu número de pedido o teléfono para revisar el seguimiento.");
  }

  if (normalizedText === "7") {
    return followUpMessage("Por ahora no hay promociones registradas.");
  }

  if (normalizedText === "menu_principal" || normalizedText === "btn_menu_principal") return mainMenuMessage();
  if (normalizedText === "terminar_chat" || normalizedText === "btn_terminar_chat") {
    if (record?.conversacion?.id) await updateConversacion(record.conversacion.id, "Chat finalizado", "cerrado");
    return {
      text: "✅ Chat finalizado. Cuando necesites ayuda nuevamente, escribe 'hola' o 'menú'.",
      conversationStatus: "cerrado",
    };
  }

  return null;
}

function mainMenuMessage() {
  return {
    text:
      "👋 ¡Hola! Bienvenido a Mini Farmacia.\n\n" +
      "Soy tu asistente virtual.\n" +
      "Puedo ayudarte con productos, precios, pedidos y atención personalizada.\n\n" +
      "Selecciona una opción:\n\n" +
      "1️⃣ Consultar medicamento o precio\n" +
      "2️⃣ Ver productos disponibles\n" +
      "3️⃣ Hacer pedido\n" +
      "4️⃣ Horario y ubicación\n" +
      "5️⃣ Hablar con asesor humano\n" +
      "6️⃣ Seguimiento de pedido\n" +
      "7️⃣ Promociones",
    buttons: [
      { id: "consultar_producto", title: "Consultar producto" },
      { id: "hacer_pedido", title: "Hacer pedido" },
      { id: "asesor_humano", title: "Asesor humano" },
    ],
  };
}

function followUpMessage(text, conversationStatus) {
  return {
    text,
    conversationStatus,
    buttons: [
      { id: "menu_principal", title: "Ir al menú principal" },
      { id: "terminar_chat", title: "Terminar Chat" },
    ],
  };
}

function isMainMenuRequest(normalizedText) {
  return ["hola", "inicio", "menu", "menú", "0", "volver", "regresar"].includes(normalizedText) || normalizedText.startsWith("hola ");
}

function isEndChatRequest(normalizedText) {
  return ["terminar", "salir", "cerrar", "finalizar"].includes(normalizedText);
}

async function buildCategoriesReply() {
  if (!isSupabaseEnabled()) return "Por ahora no pude consultar las categorías disponibles.";

  try {
    const categories = await supabaseRequest("/rest/v1/categorias?select=nombre&activo=eq.true&order=nombre.asc&limit=20");
    if (!categories.length) return "Por ahora no hay categorías registradas.";
    return `Categorías disponibles:\n${categories.map((category, index) => `${index + 1}. ${category.nombre}`).join("\n")}`;
  } catch (error) {
    console.error("No se pudieron consultar categorias:", error.message);
    return "Por ahora no pude consultar las categorías disponibles.";
  }
}

function buildScheduleLocationReply(botConfig) {
  const negocio = botConfig.negocio || {};
  const horario = negocio.horario || "Horario no disponible.";
  const direccion = negocio.direccion || "Ubicación no disponible.";
  return `Horario:\n${horario}\n\nUbicación:\n${direccion}`;
}

async function buildFixedReply(text, from, botConfig) {
  const normalizedText = normalizeText(text);
  const respuestas = botConfig.respuestas || {};
  const negocio = botConfig.negocio || {};
  const sinDato = respuestas.sin_dato || "Por ahora no tengo ese dato disponible. Un asesor te apoyara lo antes posible.";

  if (normalizedText.includes("hola")) {
    return respuestas.hola || sinDato;
  }

  if (normalizedText.includes("horario")) {
    return negocio.horario || sinDato;
  }

  if (normalizedText.includes("ubicacion")) {
    return negocio.direccion || sinDato;
  }

  if (normalizedText === "medicamento" || normalizedText === "medicamentos") {
    return respuestas.medicamento || sinDato;
  }

  if (normalizedText.includes("pedido")) {
    return respuestas.pedido || sinDato;
  }

  if (normalizedText.includes("asesor") || normalizedText.includes("humano")) {
    if (!respuestas.asesor) return sinDato;
    await sendAdminAlerts(botConfig, from, text);
    return respuestas.asesor;
  }

  return "";
}

async function sendAdminAlerts(botConfig, from, text) {
  const admins = Array.isArray(botConfig.admins) ? botConfig.admins : [];
  const negocio = botConfig.negocio || {};
  const sinDato = botConfig.respuestas?.sin_dato || "Por ahora no tengo ese dato disponible. Un asesor te apoyara lo antes posible.";
  if (!admins.length) return;

  const alertMessage = `Alerta de asesor humano - ${negocio.nombre || "Mini Farmacia"}\nCliente: ${cleanPhone(from) || sinDato}\nMensaje: ${text}`;

  for (const admin of admins) {
    try {
      await sendWhatsAppMessage(admin, alertMessage);
    } catch (error) {
      console.error("No se pudo alertar al administrador:", admin, error.message);
    }
  }
}

async function buildProductReply(text, from) {
  const contextKey = cleanPhone(from);
  const previousProducts = productSearchContexts.get(contextKey) || [];

  if (isPreviousProductReference(text) || isPriceFollowUp(text)) {
    if (!previousProducts.length) return "¿Me puedes escribir el nombre del producto que deseas consultar?";
    return followUpMessage(formatProductReply(previousProducts, { fromContext: true }));
  }

  const products = await searchProductsByMessage(text);
  if (!products.length) return "";
  productSearchContexts.set(contextKey, products);
  return followUpMessage(formatProductReply(products));
}

function formatProductReply(products, options = {}) {
  const productLines = products.map((product, index) => {
    const stock = Number(product.stock || 0);
    const prefix = products.length > 1 ? `${index + 1}. ` : "";
    const availability = stock > 0 ? `Existencia: ${stock} piezas.` : "Actualmente no tenemos existencia.";

    return `${prefix}${product.nombre}\nPrecio: $${formatPrice(product.precio)}\n${availability}`;
  });

  const hasStock = products.some((product) => Number(product.stock || 0) > 0);
  const footer = products.length > 1 && !options.fromContext
    ? "\n\n¿Cuál presentación desea?"
    : hasStock
      ? "\n\n¿Deseas que lo agregue a tu pedido?"
      : "";

  return `Tenemos:\n${productLines.join("\n\n")}${footer}`;
}

async function searchProductsByMessage(text) {
  if (!isSupabaseEnabled()) return [];

  const terms = getProductSearchTerms(text);
  if (!terms.length) return [];
  const query = terms.join(" ");

  try {
    const exactProducts = await supabaseRequest(
      `/rest/v1/productos?select=id,nombre,descripcion,precio,stock,codigo_barras,activo&activo=eq.true&nombre=ilike.${encodeSupabaseFilterValue(query)}&order=nombre.asc&limit=5`,
    );
    if (exactProducts.length) return exactProducts.slice(0, 5);

    const orFilter = terms
      .flatMap((term) => [`nombre.ilike.*${encodeSupabaseFilterValue(term)}*`, `descripcion.ilike.*${encodeSupabaseFilterValue(term)}*`])
      .join(",");
    const candidates = await supabaseRequest(
      `/rest/v1/productos?select=id,nombre,descripcion,precio,stock,codigo_barras,activo&activo=eq.true&or=(${orFilter})&order=nombre.asc&limit=25`,
    );
    return rankProductMatches(candidates, terms, query).slice(0, 5);
  } catch (error) {
    console.error("No se pudo consultar productos:", error.message);
    return [];
  }
}

function rankProductMatches(products, terms, query) {
  return (Array.isArray(products) ? products : [])
    .map((product) => {
      const name = normalizeText(product.nombre || "");
      const description = normalizeText(product.descripcion || "");
      const searchable = `${name} ${description}`;
      const matchedTerms = terms.filter((term) => searchable.includes(term));
      if (!matchedTerms.length) return null;

      let score = matchedTerms.length;
      if (name === query) score += 10;
      if (name.includes(query)) score += 5;
      if (terms.every((term) => searchable.includes(term))) score += 3;

      return { product, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.product.nombre.localeCompare(b.product.nombre))
    .map((item) => item.product);
}

async function getProductsFromSupabase() {
  const products = await supabaseRequest(
    "/rest/v1/productos?select=*,categorias(nombre),inventario(stock_minimo,stock_maximo,fecha_caducidad,costo)&order=nombre.asc",
  );
  return products.map(mapDbProduct);
}

async function createSupabaseProduct(product) {
  const categoriaId = await findOrCreateCategoriaId(product.category);
  const created = await supabaseRequest("/rest/v1/productos", {
    method: "POST",
    body: mapProductToDb(product, categoriaId),
    prefer: "return=representation",
  });
  const dbProduct = created[0];
  await upsertProductInventory(dbProduct.id, product);
  return (await getSupabaseProductById(dbProduct.id)) || mapDbProduct(dbProduct);
}

async function updateSupabaseProduct(id, product) {
  const categoriaId = await findOrCreateCategoriaId(product.category);
  const updated = await supabaseRequest(`/rest/v1/productos?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: mapProductToDb(product, categoriaId),
    prefer: "return=representation",
  });
  await upsertProductInventory(id, product);
  return (await getSupabaseProductById(id)) || mapDbProduct(updated[0]);
}

async function getSupabaseProductById(id) {
  const products = await supabaseRequest(
    `/rest/v1/productos?select=*,categorias(nombre),inventario(stock_minimo,stock_maximo,fecha_caducidad,costo)&id=eq.${encodeURIComponent(id)}&limit=1`,
  );
  return products[0] ? mapDbProduct(products[0]) : null;
}

async function findOrCreateCategoriaId(categoryName) {
  const nombre = String(categoryName || "").trim();
  if (!nombre) return null;

  const existing = await supabaseRequest(`/rest/v1/categorias?select=id&nombre=eq.${encodeURIComponent(nombre)}&limit=1`);
  if (existing[0]) return existing[0].id;

  const created = await supabaseRequest("/rest/v1/categorias", {
    method: "POST",
    body: {
      nombre,
      activo: true,
    },
    prefer: "return=representation",
  });
  return created[0]?.id || null;
}

async function upsertProductInventory(productId, product) {
  const inventory = await supabaseRequest(`/rest/v1/inventario?select=id&producto_id=eq.${encodeURIComponent(productId)}&limit=1`);
  const body = {
    producto_id: productId,
    stock: toInteger(product.stock),
    stock_minimo: toInteger(product.minStock),
    stock_maximo: toNullableInteger(product.maxStock),
    fecha_caducidad: product.expiresAt || null,
    costo: toNumber(product.cost),
    updated_at: new Date().toISOString(),
  };

  if (inventory[0]) {
    await supabaseRequest(`/rest/v1/inventario?id=eq.${inventory[0].id}`, {
      method: "PATCH",
      body,
      prefer: "return=representation",
    });
    return;
  }

  await supabaseRequest("/rest/v1/inventario", {
    method: "POST",
    body,
    prefer: "return=representation",
  });
}

function mapDbProduct(product) {
  const inventory = Array.isArray(product?.inventario) ? product.inventario[0] : null;
  const category = product?.categorias?.nombre || "";

  return {
    id: product.id,
    sku: product.codigo_barras || "",
    name: product.nombre || "",
    category,
    description: product.descripcion || "",
    substance: product.descripcion || "",
    expiresAt: inventory?.fecha_caducidad || "",
    stock: toInteger(product.stock),
    minStock: toInteger(inventory?.stock_minimo),
    maxStock: toInteger(inventory?.stock_maximo),
    cost: toNumber(inventory?.costo),
    regularPrice: toNumber(product.precio),
    price: toNumber(product.precio),
    discountPrice: toNumber(product.precio),
    imageUrl: product.imagen_url || "",
    type: product.requiere_receta ? "Receta medica" : "Venta libre",
    requiresRecipe: Boolean(product.requiere_receta),
    iva: false,
    status: product.activo ? "Activo" : "Pausado",
  };
}

function mapProductToDb(product, categoriaId) {
  return {
    categoria_id: categoriaId,
    nombre: String(product.name || "").trim(),
    descripcion: String(product.description || product.substance || "").trim(),
    precio: toNumber(product.price),
    stock: toInteger(product.stock),
    codigo_barras: String(product.sku || "").trim() || null,
    imagen_url: String(product.imageUrl || "").trim() || null,
    presentacion: null,
    laboratorio: null,
    activo: product.status !== "Pausado",
    requiere_receta: product.requiresRecipe || product.type === "Receta medica",
    updated_at: new Date().toISOString(),
  };
}

function getProductIdFromUrl(url) {
  return decodeURIComponent(url.split("?")[0].replace("/api/products/", "").trim());
}

function getProductSearchTerms(text) {
  const stopwords = new Set([
    "agregar",
    "alguna",
    "alguno",
    "ambas",
    "ambos",
    "cuanto",
    "cuánto",
    "cuesta",
    "costo",
    "dame",
    "del",
    "dos",
    "ese",
    "esa",
    "esas",
    "esos",
    "existencia",
    "generico",
    "genérico",
    "gracias",
    "hay",
    "las",
    "los",
    "medicamento",
    "medicina",
    "para",
    "precio",
    "producto",
    "puedo",
    "quiero",
    "saber",
    "tendra",
    "tendran",
    "tienen",
    "tienes",
    "venden",
  ]);
  const normalized = normalizeText(text).replace(/[^a-z0-9\s]/g, " ");
  const tokens = normalized
    .split(/\s+/)
    .filter((token) => token.length >= 3)
    .filter((token) => !stopwords.has(token))
    .filter((token) => !/^\d+$/.test(token))
    .slice(0, 4);

  return [...new Set(tokens)];
}

function isPreviousProductReference(text) {
  const normalized = normalizeText(text);
  return /\b(las dos|los dos|ambas|ambos|esas dos|esos dos)\b/.test(normalized);
}

function isPriceFollowUp(text) {
  const normalized = normalizeText(text);
  const hasPriceIntent = /\b(precio|precios|costo|costos|cuanto|cuánto|cuesta|cuestan)\b/.test(normalized);
  return hasPriceIntent && !getProductSearchTerms(text).length;
}

function encodeSupabaseFilterValue(value) {
  return encodeURIComponent(value).replace(/[()*,]/g, "");
}

function formatPrice(price) {
  const amount = Number(price || 0);
  return amount.toFixed(2);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function toInteger(value) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : 0;
}

function toNullableInteger(value) {
  if (value === "" || value === null || value === undefined) return null;
  return toInteger(value);
}

async function saveIncomingMessage(message) {
  console.log("SUPABASE_URL configurado:", SUPABASE_URL ? "SI" : "NO");
  console.log("SUPABASE_SERVICE_ROLE_KEY configurado:", SUPABASE_SERVICE_ROLE_KEY ? "SI" : "NO");
  if (!isSupabaseEnabled()) return null;

  try {
    console.log("ENTRANDO A GUARDAR MENSAJE ENTRANTE");
    const telefono = cleanPhone(message.from);
    const cliente = await findOrCreateCliente(telefono, message.text);
    const conversacion = await findOrCreateConversacion(cliente, message.text, conversationStatusFromMessage(message.text));
    await createMensaje({
      conversacionId: conversacion.id,
      clienteId: cliente.id,
      direccion: "entrante",
      mensaje: message.text,
      whatsappMessageId: message.id,
      metadata: message,
    });
    return { cliente, conversacion };
  } catch (error) {
    console.error("No se pudo guardar mensaje entrante:", error.message);
    return null;
  }
}

async function saveOutgoingMessage(record, reply, conversationStatus) {
  console.log("SUPABASE_URL configurado:", SUPABASE_URL ? "SI" : "NO");
  console.log("SUPABASE_SERVICE_ROLE_KEY configurado:", SUPABASE_SERVICE_ROLE_KEY ? "SI" : "NO");
  if (!record || !isSupabaseEnabled()) return;

  try {
    console.log("ENTRANDO A GUARDAR MENSAJE SALIENTE");
    await createMensaje({
      conversacionId: record.conversacion.id,
      clienteId: record.cliente.id,
      direccion: "saliente",
      mensaje: reply,
      metadata: { origen: "bot" },
    });
    await updateConversacion(record.conversacion.id, reply, conversationStatus || record.conversacion.estado);
  } catch (error) {
    console.error("No se pudo guardar respuesta del bot:", error.message);
  }
}

async function findOrCreateCliente(telefono, ultimoMensaje) {
  console.log("ENTRANDO A GUARDAR CLIENTE");
  const clientes = await supabaseRequest(`/rest/v1/clientes?telefono=eq.${encodeURIComponent(telefono)}&limit=1`);
  const now = new Date().toISOString();

  if (clientes[0]) {
    const updated = await supabaseRequest(`/rest/v1/clientes?id=eq.${clientes[0].id}`, {
      method: "PATCH",
      body: {
        ultimo_mensaje: ultimoMensaje,
        updated_at: now,
      },
      prefer: "return=representation",
    });
    return updated[0] || clientes[0];
  }

  const created = await supabaseRequest("/rest/v1/clientes", {
    method: "POST",
    body: {
      nombre: "Cliente WhatsApp",
      telefono,
      whatsapp_id: telefono,
      ultimo_mensaje: ultimoMensaje,
      estado: "nuevo",
    },
    prefer: "return=representation",
  });
  return created[0];
}

async function findOrCreateConversacion(cliente, ultimoMensaje, estado) {
  console.log("ENTRANDO A GUARDAR CONVERSACION");
  const conversaciones = await supabaseRequest(
    `/rest/v1/conversaciones?cliente_id=eq.${cliente.id}&canal=eq.whatsapp&order=updated_at.desc&limit=1`,
  );

  if (conversaciones[0]) {
    const updated = await updateConversacion(conversaciones[0].id, ultimoMensaje, estado || conversaciones[0].estado);
    return updated || conversaciones[0];
  }

  const created = await supabaseRequest("/rest/v1/conversaciones", {
    method: "POST",
    body: {
      cliente_id: cliente.id,
      canal: "whatsapp",
      estado: estado || "nuevo",
      ultimo_mensaje: ultimoMensaje,
      ultimo_mensaje_at: new Date().toISOString(),
    },
    prefer: "return=representation",
  });
  return created[0];
}

async function updateConversacion(id, ultimoMensaje, estado) {
  const updated = await supabaseRequest(`/rest/v1/conversaciones?id=eq.${id}`, {
    method: "PATCH",
    body: {
      estado,
      ultimo_mensaje: ultimoMensaje,
      ultimo_mensaje_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    prefer: "return=representation",
  });
  return updated[0];
}

async function createMensaje({ conversacionId, clienteId, direccion, mensaje, whatsappMessageId, metadata }) {
  const created = await supabaseRequest("/rest/v1/mensajes", {
    method: "POST",
    body: {
      conversacion_id: conversacionId,
      cliente_id: clienteId,
      direccion,
      origen: "whatsapp",
      tipo: "text",
      mensaje,
      whatsapp_message_id: whatsappMessageId || null,
      metadata: metadata || null,
    },
    prefer: "return=representation",
  });
  return created[0];
}

function conversationStatusFromMessage(message) {
  const text = normalizeText(message);
  if (text.includes("asesor") || text.includes("humano")) return "asesor humano";
  if (text.includes("pedido")) return "pedido";
  if (text.includes("entregado")) return "entregado";
  return "nuevo";
}

async function getDeepSeekReply(text) {
  if (!DEEPSEEK_API_KEY) {
    return "Gracias por escribir a Mini Farmacia. Un asesor revisara tu mensaje lo antes posible.";
  }

  try {
    console.log("CONSULTA IA", text);
    const deepSeekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Eres el asistente virtual de Mini Farmacia. Responde breve. Maximo 3 lineas. No des diagnosticos. No indiques tratamientos. No inventes precios. No inventes existencia. Si preguntan algo medico, indica que consulte a un profesional de salud.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 180,
      }),
    });

    const data = await deepSeekResponse.json();

    if (!deepSeekResponse.ok) {
      console.error("DEEPSEEK ERROR:", JSON.stringify(data, null, 2));
      return "Gracias por escribir a Mini Farmacia. Un asesor revisara tu mensaje lo antes posible.";
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || "Gracias por escribir a Mini Farmacia. Un asesor revisara tu mensaje lo antes posible.";
    console.log("RESPUESTA IA", reply);
    return reply;
  } catch (error) {
    console.error("DEEPSEEK REQUEST ERROR:", error.message);
    return "Gracias por escribir a Mini Farmacia. Un asesor revisara tu mensaje lo antes posible.";
  }
}

async function loadBotConfig() {
  if (isSupabaseEnabled()) {
    try {
      const configs = await supabaseRequest("/rest/v1/configuracion_bot?select=*&order=updated_at.desc&limit=1");
      if (configs[0]) return mapDbBotConfig(configs[0]);
    } catch (error) {
      console.error("No se pudo leer configuracion_bot:", error.message);
    }
  }

  const configPath = join(__dirname, "bot-config.json");
  const fallback = {
    negocio: {},
    admins: [],
    respuestas: {
      sin_dato: "Por ahora no tengo ese dato disponible. Un asesor te apoyara lo antes posible.",
    },
  };

  try {
    if (!existsSync(configPath)) return fallback;
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error("No se pudo leer bot-config.json:", error.message);
    return fallback;
  }
}

function mapDbBotConfig(config) {
  return {
    negocio: {
      nombre: config.negocio_nombre,
      horario: config.horario,
      direccion: config.direccion,
    },
    admins: config.telefonos_admin || [],
    respuestas: {
      hola: config.respuesta_hola,
      medicamento: config.respuesta_medicamento,
      pedido: config.respuesta_pedido,
      asesor: config.respuesta_asesor,
      sin_dato: config.respuesta_sin_dato,
    },
  };
}

function isSupabaseEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseRequest(path, options = {}) {
  const supabaseUrl = normalizeSupabaseUrl(SUPABASE_URL);
  const requestPath = path.startsWith("/rest/v1") ? path : `/rest/v1${path.startsWith("/") ? path : `/${path}`}`;
  const requestUrl = `${supabaseUrl}${requestPath}`;

  const response = await fetch(requestUrl, {
    method: options.method || "GET",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  console.log("SUPABASE REQUEST:", options.method || "GET", requestUrl);
  console.log("STATUS HTTP de Supabase:", response.status);
  console.log("RESPUESTA COMPLETA de Supabase:", text || "");

  if (!response.ok) {
    throw new Error(JSON.stringify(data || { status: response.status }));
  }

  return data || [];
}

function normalizeSupabaseUrl(url) {
  return String(url || "")
    .trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");
}

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

async function sendWhatsAppMessage(telefono, mensaje) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error("Credenciales de WhatsApp no configuradas");
  }

  const destination = cleanPhone(telefono);
  const graphUrl = `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`;
  console.log("WHATSAPP NUMERO RECIBIDO:", telefono);
  console.log("WHATSAPP DESTINO:", destination);
  console.log("WHATSAPP MENSAJE:", mensaje);
  console.log("WHATSAPP GRAPH URL:", graphUrl);

  const whatsappResponse = await fetch(graphUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: destination,
      type: "text",
      text: {
        preview_url: true,
        body: mensaje,
      },
    }),
  });

  const data = await whatsappResponse.json();
  console.log("WHATSAPP STATUS:", whatsappResponse.status);

  if (!whatsappResponse.ok) {
    console.error("WHATSAPP META ERROR:", JSON.stringify(data, null, 2));
    throw new Error(data.error?.message || "No se pudo enviar el mensaje de WhatsApp");
  }

  return data;
}

async function sendWhatsAppReply(telefono, reply) {
  if (typeof reply === "string") return await sendWhatsAppMessage(telefono, reply);
  if (reply?.buttons?.length) return await sendWhatsAppButtonMessage(telefono, reply.text, reply.buttons);
  return await sendWhatsAppMessage(telefono, replyText(reply));
}

async function sendWhatsAppButtonMessage(telefono, mensaje, buttons) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error("Credenciales de WhatsApp no configuradas");
  }

  const destination = cleanPhone(telefono);
  const graphUrl = `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`;
  const payload = {
    messaging_product: "whatsapp",
    to: destination,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: mensaje,
      },
      action: {
        buttons: buttons.slice(0, 3).map((button) => ({
          type: "reply",
          reply: {
            id: button.id,
            title: button.title,
          },
        })),
      },
    },
  };

  console.log("WHATSAPP NUMERO RECIBIDO:", telefono);
  console.log("WHATSAPP DESTINO:", destination);
  console.log("WHATSAPP MENSAJE:", mensaje);
  console.log("WHATSAPP GRAPH URL:", graphUrl);
  console.log("WHATSAPP INTERACTIVE PAYLOAD:", JSON.stringify(payload, null, 2));

  const whatsappResponse = await fetch(graphUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await whatsappResponse.json();
  console.log("WHATSAPP INTERACTIVE STATUS:", whatsappResponse.status);

  if (!whatsappResponse.ok) {
    console.error("WHATSAPP INTERACTIVE ERROR:", JSON.stringify(data, null, 2));
    throw new Error(data.error?.message || "No se pudo enviar el mensaje interactivo de WhatsApp");
  }

  return data;
}

function replyText(reply) {
  if (typeof reply === "string") return reply;
  return reply?.text || "";
}

function loadEnv() {
  const envPath = join(__dirname, ".env");
  if (!existsSync(envPath)) return;

  const envFile = readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separator = trimmed.indexOf("=");
    if (separator === -1) return;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

function readJSONBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1000000) {
        request.destroy();
        reject(new Error("Payload demasiado grande"));
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON invalido"));
      }
    });

    request.on("error", reject);
  });
}

function cleanPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("521") && digits.length === 13) return `52${digits.slice(-10)}`;
  return digits;
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendStaticFile(request, response) {
  const requestPath = request.url === "/" ? "/index.html" : decodeURIComponent(request.url.split("?")[0]);
  const filePath = normalize(join(publicDir, requestPath));

  if (!filePath.startsWith(publicDir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    sendJSON(response, 404, { error: "Archivo no encontrado" });
    return;
  }

  response.writeHead(200, { "Content-Type": getContentType(filePath) });
  response.end(readFileSync(filePath));
}

function getContentType(filePath) {
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
  };
  return types[extname(filePath)] || "application/octet-stream";
}

function sendJSON(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(payload));
}
