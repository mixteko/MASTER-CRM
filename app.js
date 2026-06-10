const products = [
  {
    id: "paracetamol-500",
    name: "Paracetamol 500 mg",
    category: "Dolor y fiebre",
    description: "Caja con tabletas para alivio temporal de dolor y fiebre.",
    price: 48,
    stock: 28,
    prescription: false,
    colors: ["#143ee8", "#e8edff"],
  },
  {
    id: "ibuprofeno-400",
    name: "Ibuprofeno 400 mg",
    category: "Dolor y fiebre",
    description: "Antiinflamatorio de venta común. Confirmar indicaciones antes de comprar.",
    price: 72,
    stock: 16,
    prescription: false,
    colors: ["#f92d93", "#ffe1f0"],
  },
  {
    id: "loratadina-10",
    name: "Loratadina 10 mg",
    category: "Alergias",
    description: "Antihistamínico para molestias estacionales y rinitis alérgica.",
    price: 64,
    stock: 22,
    prescription: false,
    colors: ["#22c7b8", "#d8fff9"],
  },
  {
    id: "ambroxol-jarabe",
    name: "Ambroxol jarabe",
    category: "Respiratorio",
    description: "Jarabe expectorante para apoyo respiratorio de uso familiar.",
    price: 93,
    stock: 12,
    prescription: false,
    colors: ["#ef0b36", "#ffd8e0"],
  },
  {
    id: "vitamina-c",
    name: "Vitamina C",
    category: "Vitaminas",
    description: "Suplemento diario con tabletas efervescentes sabor naranja.",
    price: 118,
    stock: 34,
    prescription: false,
    colors: ["#ffb000", "#fff0c2"],
  },
  {
    id: "suero-oral",
    name: "Suero oral",
    category: "Hidratación",
    description: "Sobres para preparar solución de rehidratación oral.",
    price: 36,
    stock: 40,
    prescription: false,
    colors: ["#0a7bff", "#dcecff"],
  },
  {
    id: "curitas-kit",
    name: "Kit de curación",
    category: "Primeros auxilios",
    description: "Gasas, vendas y apósitos para cuidado básico en casa.",
    price: 149,
    stock: 18,
    prescription: false,
    colors: ["#f92d93", "#ffe1f0"],
  },
  {
    id: "amoxicilina-500",
    name: "Amoxicilina 500 mg",
    category: "Receta médica",
    description: "Producto sujeto a validación de receta antes de surtir.",
    price: 185,
    stock: 9,
    prescription: true,
    colors: ["#143ee8", "#e8edff"],
  },
];

const storageKeys = {
  cart: "minifarmacia_cart",
  user: "minifarmacia_user",
  orders: "minifarmacia_orders",
  settings: "minifarmacia_settings",
};

const state = {
  category: "Todos",
  query: "",
  cart: readJSON(storageKeys.cart, []),
  user: readJSON(storageKeys.user, null),
  orders: readJSON(storageKeys.orders, []),
  settings: readJSON(storageKeys.settings, {
    marketplaceUrl: "https://minifarmacia.mx/tienda",
    businessPhone: "5218112345678",
  }),
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const categoryTabs = document.querySelector("#categoryTabs");
const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const subtotalAmount = document.querySelector("#subtotalAmount");
const shippingAmount = document.querySelector("#shippingAmount");
const totalAmount = document.querySelector("#totalAmount");
const shippingType = document.querySelector("#shippingType");
const paymentMethod = document.querySelector("#paymentMethod");
const deliveryAddress = document.querySelector("#deliveryAddress");
const checkoutForm = document.querySelector("#checkoutForm");
const whatsappOrderLink = document.querySelector("#whatsappOrderLink");
const accountButton = document.querySelector("#accountButton");
const accountDialog = document.querySelector("#accountDialog");
const accountForm = document.querySelector("#accountForm");
const savedUser = document.querySelector("#savedUser");
const ordersList = document.querySelector("#ordersList");
const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const incomingMessage = document.querySelector("#incomingMessage");
const marketplaceUrl = document.querySelector("#marketplaceUrl");
const businessPhone = document.querySelector("#businessPhone");
const welcomeMessage = document.querySelector("#welcomeMessage");
const copyWelcomeButton = document.querySelector("#copyWelcomeButton");
const toast = document.querySelector("#toast");

init();

function init() {
  hydrateSettings();
  renderCategories();
  renderProducts();
  renderCart();
  renderOrders();
  renderSavedUser();
  seedChat();
  bindEvents();
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderProducts();
  });

  cartButton.addEventListener("click", openCart);
  document.querySelectorAll("[data-close-drawer]").forEach((node) => {
    node.addEventListener("click", closeCart);
  });

  shippingType.addEventListener("change", () => {
    renderCart();
    persistUserShipping();
  });

  paymentMethod.addEventListener("change", renderCart);
  deliveryAddress.addEventListener("input", renderCart);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmOrder();
  });

  accountButton.addEventListener("click", () => {
    fillAccountForm();
    accountDialog.showModal();
  });

  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAccount();
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    simulateIncomingMessage();
  });

  [marketplaceUrl, businessPhone].forEach((input) => {
    input.addEventListener("input", saveSettings);
  });

  welcomeMessage.addEventListener("input", saveCustomWelcome);

  copyWelcomeButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(buildWelcomeMessage());
    showToast("Respuesta copiada");
  });
}

function hydrateSettings() {
  marketplaceUrl.value = state.settings.marketplaceUrl;
  businessPhone.value = state.settings.businessPhone;
  welcomeMessage.value = state.settings.welcomeMessage || defaultWelcomeMessage();

  if (state.user?.address) {
    deliveryAddress.value = state.user.address;
  }

  if (state.user?.shippingType) {
    shippingType.value = state.user.shippingType;
  }
}

function renderCategories() {
  const categories = ["Todos", ...new Set(products.map((product) => product.category))];
  categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button
          class="tab-button ${category === state.category ? "active" : ""}"
          type="button"
          role="tab"
          aria-selected="${category === state.category}"
          data-category="${category}"
        >
          ${category}
        </button>
      `,
    )
    .join("");

  categoryTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const filteredProducts = products.filter((product) => {
    const matchesCategory = state.category === "Todos" || product.category === state.category;
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && haystack.includes(state.query);
  });

  productGrid.innerHTML =
    filteredProducts
      .map((product) => {
        const inCart = getCartLine(product.id)?.quantity || 0;
        return `
          <article class="product-card">
            <div
              class="product-visual"
              style="--visual-a:${product.colors[0]}; --visual-b:${product.colors[1]}"
              aria-hidden="true"
            >
              <span class="rx-badge">${product.prescription ? "Venta con receta" : "Venta libre"}</span>
              <span class="stock-badge">${product.stock} en stock</span>
            </div>
            <div>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </div>
            <div class="product-actions">
              <span class="price">${currency.format(product.price)}</span>
              <button
                class="add-button"
                type="button"
                data-add="${product.id}"
                ${product.stock <= inCart ? "disabled" : ""}
              >
                ${product.stock <= inCart ? "Agotado" : "Agregar al carrito"}
              </button>
            </div>
          </article>
        `;
      })
      .join("") || '<div class="empty-state">No encontramos productos con esos filtros.</div>';

  productGrid.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.add));
  });
}

function addToCart(productId) {
  const product = getProduct(productId);
  const line = getCartLine(productId);

  if (!product || (line?.quantity || 0) >= product.stock) {
    showToast("Sin inventario disponible");
    return;
  }

  if (line) {
    line.quantity += 1;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }

  persistCart();
  renderCart();
  renderProducts();
  showToast("Producto agregado");
}

function renderCart() {
  cartCount.textContent = String(state.cart.reduce((total, line) => total + line.quantity, 0));

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-state">Tu carrito está vacío.</div>';
  } else {
    cartItems.innerHTML = state.cart
      .map((line) => {
        const product = getProduct(line.productId);
        return `
          <div class="cart-line">
            <div>
              <h3>${product.name}</h3>
              <p>${currency.format(product.price)} x ${line.quantity}</p>
            </div>
            <div class="quantity-controls" aria-label="Cantidad de ${product.name}">
              <button type="button" data-dec="${product.id}" aria-label="Quitar uno">-</button>
              <strong>${line.quantity}</strong>
              <button type="button" data-inc="${product.id}" aria-label="Agregar uno">+</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  cartItems.querySelectorAll("[data-inc]").forEach((button) => {
    button.addEventListener("click", () => changeQuantity(button.dataset.inc, 1));
  });

  cartItems.querySelectorAll("[data-dec]").forEach((button) => {
    button.addEventListener("click", () => changeQuantity(button.dataset.dec, -1));
  });

  const totals = calculateTotals();
  subtotalAmount.textContent = currency.format(totals.subtotal);
  shippingAmount.textContent = totals.shipping === 0 ? "Gratis" : currency.format(totals.shipping);
  totalAmount.textContent = currency.format(totals.total);
  whatsappOrderLink.href = buildWhatsAppOrderLink();
}

function changeQuantity(productId, delta) {
  const product = getProduct(productId);
  const line = getCartLine(productId);
  if (!product || !line) return;

  line.quantity += delta;

  if (line.quantity <= 0) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
  }

  if (line.quantity > product.stock) {
    line.quantity = product.stock;
    showToast("Llegaste al inventario disponible");
  }

  persistCart();
  renderCart();
  renderProducts();
}

function calculateTotals() {
  const subtotal = state.cart.reduce((total, line) => {
    const product = getProduct(line.productId);
    return total + product.price * line.quantity;
  }, 0);
  const baseShipping = shippingType.value === "national" ? 149 : 49;
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : baseShipping;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

function confirmOrder() {
  if (!state.cart.length) {
    showToast("Agrega productos antes de confirmar");
    return;
  }

  if (!deliveryAddress.value.trim()) {
    showToast("Agrega una dirección de entrega");
    deliveryAddress.focus();
    return;
  }

  const totals = calculateTotals();
  const order = {
    id: `MF-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    customer: state.user?.name || "Cliente sin registro",
    phone: state.user?.phone || "",
    address: deliveryAddress.value.trim(),
    shippingType: shippingType.value,
    paymentMethod: paymentMethod.value,
    items: state.cart.map((line) => ({
      ...line,
      productName: getProduct(line.productId).name,
      price: getProduct(line.productId).price,
    })),
    total: totals.total,
  };

  state.orders.unshift(order);
  state.cart = [];
  writeJSON(storageKeys.orders, state.orders);
  persistCart();
  renderCart();
  renderOrders();
  closeCart();
  showToast(`Pedido ${order.id} confirmado`);
}

function renderOrders() {
  if (!state.orders.length) {
    ordersList.innerHTML = '<div class="empty-state">Los pedidos confirmados aparecerán aquí.</div>';
    return;
  }

  ordersList.innerHTML = state.orders
    .map((order) => {
      const itemSummary = order.items.map((item) => `${item.quantity} x ${item.productName}`).join(", ");
      return `
        <article class="order-card">
          <h3>${order.id}</h3>
          <div class="order-meta">
            <span class="order-pill">${order.customer}</span>
            <span>${formatDate(order.createdAt)}</span>
            <span>${order.shippingType === "national" ? "Nacional" : "Local"}</span>
            <strong>${currency.format(order.total)}</strong>
          </div>
          <p>${itemSummary}</p>
        </article>
      `;
    })
    .join("");
}

function fillAccountForm() {
  document.querySelector("#customerName").value = state.user?.name || "";
  document.querySelector("#customerPhone").value = state.user?.phone || "";
  document.querySelector("#customerEmail").value = state.user?.email || "";
  document.querySelector("#customerPassword").value = state.user?.password || "";
  document.querySelector("#customerAddress").value = state.user?.address || deliveryAddress.value || "";
}

function saveAccount() {
  const user = {
    name: document.querySelector("#customerName").value.trim(),
    phone: document.querySelector("#customerPhone").value.trim(),
    email: document.querySelector("#customerEmail").value.trim(),
    password: document.querySelector("#customerPassword").value,
    address: document.querySelector("#customerAddress").value.trim(),
    shippingType: shippingType.value,
  };

  state.user = user;
  writeJSON(storageKeys.user, user);
  deliveryAddress.value = user.address;
  renderSavedUser();
  accountDialog.close();
  showToast("Cuenta guardada");
}

function renderSavedUser() {
  if (!state.user) {
    savedUser.textContent = "";
    return;
  }

  savedUser.textContent = `Sesión local: ${state.user.name} · ${state.user.email}`;
}

function persistUserShipping() {
  if (!state.user) return;
  state.user.shippingType = shippingType.value;
  writeJSON(storageKeys.user, state.user);
}

function seedChat() {
  chatLog.innerHTML = "";
  addBubble("customer", "Hola, quiero comprar medicamento");
  addBubble("business", buildWelcomeMessage());
}

function simulateIncomingMessage() {
  const message = incomingMessage.value.trim();
  if (!message) return;
  addBubble("customer", message);
  addBubble("business", buildWelcomeMessage());
  incomingMessage.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;
}

function addBubble(type, message) {
  const node = document.createElement("div");
  node.className = `bubble ${type}`;
  node.innerHTML = `${escapeHTML(message).replaceAll("\n", "<br>")}<time>${timeNow()}</time>`;
  chatLog.appendChild(node);
}

function defaultWelcomeMessage() {
  return `Gracias por visitar Mini Farmacia. Puedes comprar en la siguiente liga: ${marketplaceUrl?.value || state.settings.marketplaceUrl}. Regístrate para guardar tus datos de entrega y dar seguimiento a tus pedidos.`;
}

function buildWelcomeMessage() {
  const configured = welcomeMessage.value.trim() || defaultWelcomeMessage();
  return configured.replaceAll("{{liga}}", marketplaceUrl.value.trim());
}

function saveSettings() {
  state.settings.marketplaceUrl = marketplaceUrl.value.trim();
  state.settings.businessPhone = businessPhone.value.trim();
  state.settings.welcomeMessage = welcomeMessage.value.trim() || defaultWelcomeMessage();
  writeJSON(storageKeys.settings, state.settings);
}

function saveCustomWelcome() {
  state.settings.welcomeMessage = welcomeMessage.value.trim();
  writeJSON(storageKeys.settings, state.settings);
}

function buildWhatsAppOrderLink() {
  const phone = businessPhone.value.replace(/\D/g, "");
  const totals = calculateTotals();
  const lines = state.cart.map((line) => {
    const product = getProduct(line.productId);
    return `- ${line.quantity} x ${product.name}`;
  });
  const message = [
    "Hola, quiero confirmar este pedido de Mini Farmacia:",
    ...lines,
    `Entrega: ${shippingType.value === "national" ? "Nacional" : "Local"}`,
    `Pago: ${paymentMethod.value}`,
    `Dirección: ${deliveryAddress.value || "Por confirmar"}`,
    `Total: ${currency.format(totals.total)}`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function openCart() {
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.setAttribute("aria-hidden", "true");
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartLine(productId) {
  return state.cart.find((line) => line.productId === productId);
}

function persistCart() {
  writeJSON(storageKeys.cart, state.cart);
}

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function timeNow() {
  return new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}
