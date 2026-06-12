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

const server = createServer(async (request, response) => {
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
      const reply = buildChatbotReply(message.text);
      if (reply) {
        try {
          await sendWhatsAppMessage(message.from, reply);
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
        .filter((message) => message.from && message.text?.body)
        .map((message) => ({
          from: message.from,
          text: message.text.body,
        }));
    });
  });
}

function buildChatbotReply(text) {
  const normalizedText = normalizeText(text);

  if (normalizedText.includes("hola")) {
    return "Hola, gracias por escribir a Mini Farmacia. Puedes preguntar por horario, ubicacion, medicamento, pedido o escribir humano para atencion personalizada.";
  }

  if (normalizedText.includes("horario")) {
    return "Nuestro horario de atencion es de lunes a sabado de 9:00 AM a 7:00 PM.";
  }

  if (normalizedText.includes("ubicacion")) {
    return "Estamos en Monterrey, Nuevo Leon. Comparte tu zona y te ayudamos con entrega local o nacional.";
  }

  if (normalizedText.includes("medicamento")) {
    return "Claro. Escribenos el nombre del medicamento, presentacion y cantidad que necesitas para revisar disponibilidad.";
  }

  if (normalizedText.includes("pedido")) {
    return "Para revisar tu pedido, compartenos tu nombre completo y numero de pedido.";
  }

  if (normalizedText.includes("humano")) {
    return "Un asesor de Mini Farmacia revisara tu mensaje y te respondera lo antes posible.";
  }

  return "Gracias por escribir a Mini Farmacia. Por ahora puedo ayudarte con: horario, ubicacion, medicamento, pedido o humano.";
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

  const whatsappResponse = await fetch(`https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: cleanPhone(telefono),
      type: "text",
      text: {
        preview_url: true,
        body: mensaje,
      },
    }),
  });

  const data = await whatsappResponse.json();

  if (!whatsappResponse.ok) {
    throw new Error(data.error?.message || "No se pudo enviar el mensaje de WhatsApp");
  }

  return data;
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
  return String(phone).replace(/\D/g, "");
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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
