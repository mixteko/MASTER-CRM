const storageKeys = {
  products: "minifarmacia_crm_products",
  customers: "minifarmacia_crm_customers",
  orders: "minifarmacia_crm_orders",
  payments: "minifarmacia_crm_payments",
  shipments: "minifarmacia_crm_shipments",
  sales: "minifarmacia_crm_sales",
  conversations: "minifarmacia_crm_conversations",
  settings: "minifarmacia_crm_settings",
};

const initialProducts = [
  {
    id: "prod-paracetamol-500",
    name: "Paracetamol 500 mg",
    category: "Dolor y fiebre",
    description: "Caja con tabletas para alivio temporal de dolor y fiebre.",
    price: 48,
    stock: 28,
    minStock: 8,
    maxStock: 80,
    type: "Venta libre",
    status: "Activo",
  },
  {
    id: "prod-ibuprofeno-400",
    name: "Ibuprofeno 400 mg",
    category: "Dolor y fiebre",
    description: "Antiinflamatorio de venta comun.",
    price: 72,
    stock: 16,
    minStock: 10,
    maxStock: 70,
    type: "Venta libre",
    status: "Activo",
  },
  {
    id: "prod-loratadina-10",
    name: "Loratadina 10 mg",
    category: "Alergias",
    description: "Antihistaminico para molestias estacionales.",
    price: 64,
    stock: 22,
    minStock: 8,
    maxStock: 60,
    type: "Venta libre",
    status: "Activo",
  },
  {
    id: "prod-ambroxol-jarabe",
    name: "Ambroxol jarabe",
    category: "Respiratorio",
    description: "Jarabe expectorante de uso familiar.",
    price: 93,
    stock: 12,
    minStock: 10,
    maxStock: 45,
    type: "Venta libre",
    status: "Activo",
  },
  {
    id: "prod-vitamina-c",
    name: "Vitamina C",
    category: "Vitaminas",
    description: "Tabletas efervescentes sabor naranja.",
    price: 118,
    stock: 34,
    minStock: 12,
    maxStock: 90,
    type: "Venta libre",
    status: "Activo",
  },
  {
    id: "prod-amoxicilina-500",
    name: "Amoxicilina 500 mg",
    category: "Receta medica",
    description: "Producto sujeto a validacion de receta.",
    price: 185,
    stock: 9,
    minStock: 10,
    maxStock: 50,
    type: "Receta medica",
    status: "Activo",
  },
];

const initialCustomers = [
  {
    id: "cust-laura",
    name: "Laura Martinez",
    phone: "81 2200 1840",
    email: "laura@email.com",
    address: "Monterrey, NL",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cust-nuevo-leon",
    name: "Paciente Nuevo Leon",
    phone: "81 1500 9000",
    email: "paciente@correo.com",
    address: "San Nicolas, NL",
    createdAt: new Date().toISOString(),
  },
];

const initialConversations = [
  {
    id: "conv-laura",
    customerName: "Laura Martinez",
    phone: "81 2200 1840",
    status: "Liga enviada",
    lastMessage: "Hola, quiero revisar medicamentos para fiebre.",
    createdAt: new Date().toISOString(),
  },
];

const state = {
  products: readJSON(storageKeys.products, initialProducts),
  customers: readJSON(storageKeys.customers, initialCustomers),
  orders: readJSON(storageKeys.orders, []),
  payments: readJSON(storageKeys.payments, []),
  shipments: readJSON(storageKeys.shipments, []),
  sales: readJSON(storageKeys.sales, []),
  conversations: readJSON(storageKeys.conversations, initialConversations),
  settings: readJSON(storageKeys.settings, {
    storeLink: "https://mixteko.github.io/Minifarmacia/",
    businessPhone: "5218112345678",
    welcomeMessage:
      "Gracias por visitar Mini Farmacia. Puedes comprar en esta liga: {{liga}}. Registrate para guardar tus datos de entrega y dar seguimiento a tu pedido.",
  }),
  storeCart: [],
  productQuery: "",
  customerQuery: "",
  storeQuery: "",
  storeCategory: "Todas",
};

const viewTitles = {
  dashboard: "Inicio",
  whatsapp: "WhatsApp",
  tienda: "Tienda online",
  clientes: "Clientes",
  pedidos: "Pedidos",
  productos: "Productos",
  ventas: "Ventas",
  envios: "Envios",
  cobros: "Cobros",
};

const orderColumns = ["Nuevo", "Por cobrar", "Por enviar", "Enviado", "Completado"];
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  viewTitle: $("#viewTitle"),
  todayLabel: $("#todayLabel"),
  toast: $("#toast"),
  metricOpenOrders: $("#metricOpenOrders"),
  metricPendingPayments: $("#metricPendingPayments"),
  metricSalesToday: $("#metricSalesToday"),
  metricSalesCount: $("#metricSalesCount"),
  metricShipments: $("#metricShipments"),
  metricNationalShipments: $("#metricNationalShipments"),
  metricProducts: $("#metricProducts"),
  metricLowStock: $("#metricLowStock"),
  navOrdersBadge: $("#navOrdersBadge"),
  dashboardOrders: $("#dashboardOrders"),
  dashboardAlerts: $("#dashboardAlerts"),
  chatLog: $("#chatLog"),
  chatForm: $("#chatForm"),
  incomingMessage: $("#incomingMessage"),
  storeLink: $("#storeLink"),
  businessPhone: $("#businessPhone"),
  welcomeMessage: $("#welcomeMessage"),
  copyWelcomeButton: $("#copyWelcomeButton"),
  conversationList: $("#conversationList"),
  storeSearch: $("#storeSearch"),
  storeCategory: $("#storeCategory"),
  storeProductGrid: $("#storeProductGrid"),
  storeLoginButton: $("#storeLoginButton"),
  storeCartList: $("#storeCartList"),
  clearStoreCartButton: $("#clearStoreCartButton"),
  storeCheckoutForm: $("#storeCheckoutForm"),
  storeCustomer: $("#storeCustomer"),
  storeDeliveryType: $("#storeDeliveryType"),
  storeAddress: $("#storeAddress"),
  storePaymentMethod: $("#storePaymentMethod"),
  storeSubtotal: $("#storeSubtotal"),
  storeShipping: $("#storeShipping"),
  storeTotal: $("#storeTotal"),
  customerDialog: $("#customerDialog"),
  storeLoginForm: $("#storeLoginForm"),
  storeLoginEmail: $("#storeLoginEmail"),
  storeLoginPassword: $("#storeLoginPassword"),
  storeCustomerForm: $("#storeCustomerForm"),
  storeRegisterName: $("#storeRegisterName"),
  storeRegisterPhone: $("#storeRegisterPhone"),
  storeRegisterEmail: $("#storeRegisterEmail"),
  storeRegisterPassword: $("#storeRegisterPassword"),
  storeRegisterConfirmPassword: $("#storeRegisterConfirmPassword"),
  storeRegisterAddress: $("#storeRegisterAddress"),
  storeRegisterRobot: $("#storeRegisterRobot"),
  showRegisterButton: $("#showRegisterButton"),
  showLoginButton: $("#showLoginButton"),
  customerForm: $("#customerForm"),
  customerFormTitle: $("#customerFormTitle"),
  customerId: $("#customerId"),
  customerName: $("#customerName"),
  customerPhone: $("#customerPhone"),
  customerEmail: $("#customerEmail"),
  customerAddress: $("#customerAddress"),
  customerSearch: $("#customerSearch"),
  customerCards: $("#customerCards"),
  clearCustomerForm: $("#clearCustomerForm"),
  ordersBoard: $("#ordersBoard"),
  productForm: $("#productForm"),
  productFormTitle: $("#productFormTitle"),
  productId: $("#productId"),
  productName: $("#productName"),
  productCategory: $("#productCategory"),
  productPrice: $("#productPrice"),
  productStock: $("#productStock"),
  productMinStock: $("#productMinStock"),
  productMaxStock: $("#productMaxStock"),
  productType: $("#productType"),
  productStatus: $("#productStatus"),
  productDescription: $("#productDescription"),
  productSearch: $("#productSearch"),
  productTable: $("#productTable"),
  clearProductForm: $("#clearProductForm"),
  salesTable: $("#salesTable"),
  shipmentsTable: $("#shipmentsTable"),
  paymentsTable: $("#paymentsTable"),
  resetDemoButton: $("#resetDemoButton"),
};

init();

function init() {
  elements.todayLabel.textContent = `Operacion local - ${formatShortDate(new Date().toISOString())}`;
  hydrateSettings();
  bindEvents();
  seedChat();
  renderAll();
}

function bindEvents() {
  $$(".nav-item, [data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  elements.resetDemoButton.addEventListener("click", resetDemoData);
  elements.chatForm.addEventListener("submit", simulateIncomingMessage);
  elements.copyWelcomeButton.addEventListener("click", copyWelcomeMessage);
  [elements.storeLink, elements.businessPhone].forEach((input) => input.addEventListener("input", saveSettings));
  elements.welcomeMessage.addEventListener("input", saveSettings);

  elements.storeSearch.addEventListener("input", (event) => {
    state.storeQuery = event.target.value.trim().toLowerCase();
    renderStore();
  });
  elements.storeCategory.addEventListener("change", (event) => {
    state.storeCategory = event.target.value;
    renderStore();
  });
  elements.storeLoginButton.addEventListener("click", openLoginDialog);
  elements.clearStoreCartButton.addEventListener("click", clearStoreCart);
  elements.storeDeliveryType.addEventListener("change", renderStoreCart);
  elements.storeCustomer.addEventListener("change", fillStoreCustomerAddress);
  elements.storeCheckoutForm.addEventListener("submit", createOnlineOrder);
  elements.storeLoginForm.addEventListener("submit", loginStoreCustomer);
  elements.storeCustomerForm.addEventListener("submit", saveStoreCustomer);
  elements.showRegisterButton.addEventListener("click", () => showAccountView("register"));
  elements.showLoginButton.addEventListener("click", () => showAccountView("login"));

  elements.customerForm.addEventListener("submit", saveCustomer);
  elements.clearCustomerForm.addEventListener("click", clearCustomerForm);
  elements.customerSearch.addEventListener("input", (event) => {
    state.customerQuery = event.target.value.trim().toLowerCase();
    renderCustomers();
  });

  elements.productForm.addEventListener("submit", saveProduct);
  elements.clearProductForm.addEventListener("click", clearProductForm);
  elements.productSearch.addEventListener("input", (event) => {
    state.productQuery = event.target.value.trim().toLowerCase();
    renderProducts();
  });

  document.addEventListener("click", handleDocumentAction);
}

function handleDocumentAction(event) {
  const action = event.target.closest("[data-action]");
  if (!action) return;

  const id = action.dataset.id;
  if (action.dataset.action === "add-store-item") addStoreItem(id);
  if (action.dataset.action === "remove-store-item") removeStoreItem(id);
  if (action.dataset.action === "edit-customer") editCustomer(id);
  if (action.dataset.action === "edit-product") editProduct(id);
  if (action.dataset.action === "toggle-product") toggleProduct(id);
  if (action.dataset.action === "order-next") moveOrderNext(id);
  if (action.dataset.action === "mark-paid") markPaymentPaid(id);
  if (action.dataset.action === "mark-shipped") markShipmentSent(id);
}

function showView(viewId) {
  if (!viewId || !viewTitles[viewId]) return;
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
  elements.viewTitle.textContent = viewTitles[viewId];
}

function hydrateSettings() {
  elements.storeLink.value = state.settings.storeLink;
  elements.businessPhone.value = state.settings.businessPhone;
  elements.welcomeMessage.value = state.settings.welcomeMessage;
}

function renderAll() {
  renderDashboard();
  renderConversations();
  renderStore();
  renderCustomers();
  renderOrders();
  renderProducts();
  renderSales();
  renderShipments();
  renderPayments();
  renderCustomerSelects();
}

function renderDashboard() {
  const today = new Date().toDateString();
  const openOrders = state.orders.filter((order) => order.status !== "Completado");
  const pendingPayments = state.payments.filter((payment) => payment.status !== "Pagado");
  const todaySales = state.sales.filter((sale) => new Date(sale.createdAt).toDateString() === today);
  const salesTotal = todaySales.reduce((total, sale) => total + sale.total, 0);
  const activeShipments = state.shipments.filter((shipment) => shipment.status !== "Entregado");
  const nationalShipments = activeShipments.filter((shipment) => shipment.type === "Nacional");
  const lowStock = state.products.filter((product) => product.stock <= product.minStock);

  elements.metricOpenOrders.textContent = String(openOrders.length);
  elements.metricPendingPayments.textContent = `${pendingPayments.length} por cobrar`;
  elements.metricSalesToday.textContent = currency.format(salesTotal);
  elements.metricSalesCount.textContent = `${todaySales.length} tickets`;
  elements.metricShipments.textContent = String(activeShipments.length);
  elements.metricNationalShipments.textContent = `${nationalShipments.length} nacionales`;
  elements.metricProducts.textContent = String(state.products.filter((product) => product.status === "Activo").length);
  elements.metricLowStock.textContent = `${lowStock.length} con stock bajo`;
  if (elements.navOrdersBadge) elements.navOrdersBadge.textContent = String(openOrders.length);

  elements.dashboardOrders.innerHTML = state.orders.length
    ? state.orders.slice(0, 5).map((order) => listRow(order.id, `${order.customerName} - ${order.status}`, currency.format(order.total))).join("")
    : emptyState("Aun no hay pedidos.");

  elements.dashboardAlerts.innerHTML = lowStock.length
    ? lowStock.map((product) => listRow(product.name, `${product.stock} disponibles`, "Stock bajo")).join("")
    : emptyState("Sin alertas por ahora.");
}

function seedChat() {
  elements.chatLog.innerHTML = "";
  addBubble("customer", "Hola, quiero comprar medicamentos");
  addBubble("business", buildWelcomeMessage());
}

function simulateIncomingMessage(event) {
  event.preventDefault();
  const message = elements.incomingMessage.value.trim();
  if (!message) return;

  addBubble("customer", message);
  addBubble("business", buildWelcomeMessage());
  state.conversations.unshift({
    id: createId("conv"),
    customerName: "Cliente WhatsApp",
    phone: "Por identificar",
    status: "Liga enviada",
    lastMessage: message,
    createdAt: new Date().toISOString(),
  });
  persist(storageKeys.conversations, state.conversations);
  elements.incomingMessage.value = "";
  renderConversations();
}

function addBubble(type, message) {
  const node = document.createElement("div");
  node.className = `bubble ${type}`;
  node.innerHTML = `${escapeHTML(message).replaceAll("\n", "<br>")}<time>${formatTime(new Date().toISOString())}</time>`;
  elements.chatLog.appendChild(node);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function buildWelcomeMessage() {
  return elements.welcomeMessage.value.trim().replaceAll("{{liga}}", elements.storeLink.value.trim());
}

async function copyWelcomeMessage() {
  await navigator.clipboard.writeText(buildWelcomeMessage());
  showToast("Respuesta copiada");
}

function saveSettings() {
  state.settings = {
    storeLink: elements.storeLink.value.trim(),
    businessPhone: elements.businessPhone.value.trim(),
    welcomeMessage: elements.welcomeMessage.value.trim(),
  };
  persist(storageKeys.settings, state.settings);
}

function renderConversations() {
  elements.conversationList.innerHTML = state.conversations.length
    ? state.conversations
        .slice(0, 8)
        .map((conversation) => listRow(conversation.customerName, conversation.lastMessage, conversation.status))
        .join("")
    : emptyState("Sin conversaciones.");
}

function renderStore() {
  const categories = ["Todas", ...new Set(state.products.map((product) => product.category))];
  elements.storeCategory.innerHTML = categories
    .map((category) => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`)
    .join("");
  elements.storeCategory.value = state.storeCategory;

  const products = state.products.filter((product) => {
    const matchesCategory = state.storeCategory === "Todas" || product.category === state.storeCategory;
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return product.status === "Activo" && matchesCategory && text.includes(state.storeQuery);
  });

  elements.storeProductGrid.innerHTML = products.length
    ? products
        .map(
          (product) => `
            <article class="product-card">
              <div class="product-visual"><span>${escapeHTML(product.type)}</span></div>
              <div>
                <p class="product-category">${escapeHTML(product.category)}</p>
                <h3>${escapeHTML(product.name)}</h3>
                <p>${escapeHTML(product.description)}</p>
                <p>Precio: ${currency.format(product.price)}</p>
                <p>Stock: ${product.stock}</p>
              </div>
              <div class="product-actions">
                <strong>Cantidad 1</strong>
                <button class="primary-button small" type="button" data-action="add-store-item" data-id="${product.id}" ${product.stock <= 0 ? "disabled" : ""}>
                  Agregar al carrito
                </button>
                <button class="ghost-button small" type="button">♡ Favoritos</button>
              </div>
            </article>
          `,
        )
        .join("")
    : emptyState("No hay productos disponibles.");

  renderStoreCart();
}

function addStoreItem(productId) {
  const product = getProduct(productId);
  if (!product || product.stock <= 0) return showToast("Producto sin existencia");

  const line = state.storeCart.find((item) => item.productId === productId);
  const currentQuantity = line?.quantity || 0;
  if (currentQuantity + 1 > product.stock) return showToast("No hay mas existencia disponible");

  if (line) line.quantity += 1;
  else state.storeCart.push({ lineId: createId("cart"), productId, quantity: 1 });
  renderStoreCart();
}

function removeStoreItem(lineId) {
  state.storeCart = state.storeCart.filter((item) => item.lineId !== lineId);
  renderStoreCart();
}

function clearStoreCart() {
  state.storeCart = [];
  renderStoreCart();
}

function renderStoreCart() {
  const totals = storeTotals();
  elements.storeCartList.innerHTML = state.storeCart.length
    ? state.storeCart
        .map((item) => {
          const product = getProduct(item.productId);
          return `
            <div class="ticket-line">
              <div>
                <strong>${escapeHTML(product.name)}</strong>
                <span>${item.quantity} x ${currency.format(product.price)}</span>
              </div>
              <button class="ghost-button small" type="button" data-action="remove-store-item" data-id="${item.lineId}">Quitar</button>
            </div>
          `;
        })
        .join("")
    : emptyState("El carrito esta vacio.");

  elements.storeSubtotal.textContent = currency.format(totals.subtotal);
  elements.storeShipping.textContent = totals.shipping === 0 ? "Gratis" : currency.format(totals.shipping);
  elements.storeTotal.textContent = currency.format(totals.total);
}

function fillStoreCustomerAddress() {
  const customer = getCustomer(elements.storeCustomer.value);
  if (customer && !elements.storeAddress.value.trim()) elements.storeAddress.value = customer.address || "";
}

function storeTotals() {
  const subtotal = state.storeCart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + product.price * item.quantity;
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : elements.storeDeliveryType.value === "Nacional" ? 149 : 49;
  return { subtotal, shipping, total: subtotal + shipping };
}

function createOnlineOrder(event) {
  event.preventDefault();
  if (!state.storeCart.length) return showToast("Agrega productos antes de generar pedido");

  const customer = getCustomer(elements.storeCustomer.value);
  if (!customer) return showToast("Selecciona o registra un cliente");

  for (const item of state.storeCart) {
    const product = getProduct(item.productId);
    if (!product || product.stock < item.quantity) return showToast(`Stock insuficiente: ${item.productId}`);
  }

  const totals = storeTotals();
  const order = {
    id: `PD-${Date.now().toString().slice(-6)}`,
    customerId: customer.id,
    customerName: customer.name,
    status: elements.storePaymentMethod.value === "Pendiente" ? "Por cobrar" : "Por enviar",
    deliveryType: elements.storeDeliveryType.value,
    address: elements.storeAddress.value.trim(),
    paymentMethod: elements.storePaymentMethod.value,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    items: state.storeCart.map((item) => {
      const product = getProduct(item.productId);
      return { productId: product.id, name: product.name, quantity: item.quantity, price: product.price };
    }),
    createdAt: new Date().toISOString(),
  };

  order.items.forEach((item) => {
    const product = getProduct(item.productId);
    product.stock -= item.quantity;
  });

  const payment = {
    id: createId("pay"),
    orderId: order.id,
    customerName: order.customerName,
    method: order.paymentMethod,
    total: order.total,
    status: order.paymentMethod === "Pendiente" ? "Pendiente" : "Pagado",
    createdAt: order.createdAt,
  };

  const shipment = {
    id: createId("ship"),
    orderId: order.id,
    customerName: order.customerName,
    type: order.deliveryType,
    address: order.address,
    status: payment.status === "Pagado" ? "Preparando" : "Esperando pago",
    createdAt: order.createdAt,
  };

  state.orders.unshift(order);
  state.payments.unshift(payment);
  state.shipments.unshift(shipment);
  if (payment.status === "Pagado") createSaleFromOrder(order, payment);
  state.storeCart = [];
  persistAll();
  elements.storeCheckoutForm.reset();
  renderAll();
  showToast(`Pedido ${order.id} generado`);
}

function openLoginDialog() {
  showAccountView("login");
  elements.customerDialog.showModal();
}

function showAccountView(view) {
  const isRegister = view === "register";
  elements.storeLoginForm.classList.toggle("is-hidden", isRegister);
  elements.storeCustomerForm.classList.toggle("is-hidden", !isRegister);
}

function loginStoreCustomer(event) {
  event.preventDefault();
  const email = elements.storeLoginEmail.value.trim().toLowerCase();
  const customer = state.customers.find((item) => (item.email || "").toLowerCase() === email);
  if (!customer) {
    showAccountView("register");
    elements.storeRegisterEmail.value = elements.storeLoginEmail.value.trim();
    return showToast("No encontramos esa cuenta. Completa tu registro");
  }
  elements.customerDialog.close();
  elements.storeLoginForm.reset();
  elements.storeCustomer.value = customer.id;
  elements.storeAddress.value = customer.address || "";
  showToast("Sesion iniciada");
}

function saveStoreCustomer(event) {
  event.preventDefault();
  const password = elements.storeRegisterPassword.value.trim();
  const confirmPassword = elements.storeRegisterConfirmPassword.value.trim();
  if (password !== confirmPassword) return showToast("Las contrasenas no coinciden");
  if (!elements.storeRegisterRobot.checked) return showToast("Confirma la verificacion de cuenta");
  const customer = {
    id: createId("cust"),
    name: elements.storeRegisterName.value.trim(),
    phone: elements.storeRegisterPhone.value.trim(),
    email: elements.storeRegisterEmail.value.trim(),
    address: elements.storeRegisterAddress.value.trim(),
    account: true,
    createdAt: new Date().toISOString(),
  };
  state.customers.unshift(customer);
  persist(storageKeys.customers, state.customers);
  elements.customerDialog.close();
  elements.storeCustomerForm.reset();
  renderAll();
  elements.storeCustomer.value = customer.id;
  elements.storeAddress.value = customer.address;
  showToast("Cliente registrado");
}

function renderCustomerSelects() {
  const options = state.customers.map((customer) => `<option value="${customer.id}">${escapeHTML(customer.name)}</option>`).join("");
  elements.storeCustomer.innerHTML = options || '<option value="">Sin clientes</option>';
}

function renderCustomers() {
  const customers = state.customers.filter((customer) => {
    const text = `${customer.name} ${customer.phone} ${customer.email} ${customer.address}`.toLowerCase();
    return text.includes(state.customerQuery);
  });
  elements.customerCards.innerHTML = customers.length
    ? customers
        .map((customer) => {
          const orders = state.orders.filter((order) => order.customerId === customer.id);
          const total = orders.reduce((sum, order) => sum + order.total, 0);
          return `
            <article class="customer-card">
              <div class="avatar">${escapeHTML(initials(customer.name))}</div>
              <div>
                <h3>${escapeHTML(customer.name)}</h3>
                <p>${escapeHTML(customer.phone)}</p>
                <p>${escapeHTML(customer.email || "Sin correo")}</p>
                <small>${escapeHTML(customer.address || "Sin direccion")}</small>
                <div class="customer-meta">
                  <span>${orders.length} pedidos</span>
                  <span>${currency.format(total)}</span>
                </div>
                <button class="ghost-button small" type="button" data-action="edit-customer" data-id="${customer.id}">Editar</button>
              </div>
            </article>
          `;
        })
        .join("")
    : emptyState("No hay clientes.");
}

function saveCustomer(event) {
  event.preventDefault();
  const id = elements.customerId.value || createId("cust");
  const customer = {
    id,
    name: elements.customerName.value.trim(),
    phone: elements.customerPhone.value.trim(),
    email: elements.customerEmail.value.trim(),
    address: elements.customerAddress.value.trim(),
    createdAt: getCustomer(id)?.createdAt || new Date().toISOString(),
  };
  const index = state.customers.findIndex((item) => item.id === id);
  if (index >= 0) state.customers[index] = customer;
  else state.customers.unshift(customer);
  persist(storageKeys.customers, state.customers);
  clearCustomerForm();
  renderAll();
  showToast("Cliente guardado");
}

function editCustomer(id) {
  const customer = getCustomer(id);
  if (!customer) return;
  elements.customerFormTitle.textContent = "Editar cliente";
  elements.customerId.value = customer.id;
  elements.customerName.value = customer.name;
  elements.customerPhone.value = customer.phone;
  elements.customerEmail.value = customer.email;
  elements.customerAddress.value = customer.address;
  showView("clientes");
}

function clearCustomerForm() {
  elements.customerForm.reset();
  elements.customerId.value = "";
  elements.customerFormTitle.textContent = "Nuevo cliente";
}

function renderOrders() {
  elements.ordersBoard.innerHTML = orderColumns
    .map((column) => {
      const orders = state.orders.filter((order) => order.status === column);
      return `
        <section class="kanban-column">
          <h3>${column}</h3>
          ${orders.length ? orders.map(orderCard).join("") : emptyState("Sin pedidos")}
        </section>
      `;
    })
    .join("");
}

function orderCard(order) {
  const nextAction = order.status === "Completado" ? "" : `<button class="ghost-button small" type="button" data-action="order-next" data-id="${order.id}">Avanzar</button>`;
  return `
    <article class="order-card">
      <strong>${escapeHTML(order.id)}</strong>
      <span>${escapeHTML(order.customerName)}</span>
      <span>${escapeHTML(order.deliveryType)} - ${currency.format(order.total)}</span>
      ${nextAction}
    </article>
  `;
}

function moveOrderNext(orderId) {
  const order = getOrder(orderId);
  if (!order) return;
  const currentIndex = orderColumns.indexOf(order.status);
  if (currentIndex < orderColumns.length - 1) order.status = orderColumns[currentIndex + 1];
  const shipment = state.shipments.find((item) => item.orderId === order.id);
  if (order.status === "Enviado" && shipment) shipment.status = "En ruta";
  if (order.status === "Completado" && shipment) shipment.status = "Entregado";
  persistAll();
  renderAll();
}

function renderProducts() {
  const products = state.products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.type} ${product.status}`.toLowerCase();
    return text.includes(state.productQuery);
  });
  elements.productTable.innerHTML = products.length
    ? products
        .map((product) => {
          const status = stockStatus(product);
          return `
            <tr>
              <td><strong>${escapeHTML(product.name)}</strong><span>${escapeHTML(product.description)}</span></td>
              <td>${escapeHTML(product.category)}</td>
              <td>${currency.format(product.price)}</td>
              <td><strong>${product.stock}</strong><span>${escapeHTML(status.label)}</span></td>
              <td><span class="badge ${product.type === "Receta medica" ? "danger" : "success"}">${escapeHTML(product.type)}</span></td>
              <td>
                <div class="table-actions">
                  <button class="ghost-button small" type="button" data-action="edit-product" data-id="${product.id}">Editar</button>
                  <button class="ghost-button small" type="button" data-action="toggle-product" data-id="${product.id}">
                    ${product.status === "Activo" ? "Pausar" : "Activar"}
                  </button>
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(6, "No hay productos.");
}

function saveProduct(event) {
  event.preventDefault();
  const id = elements.productId.value || createId("prod");
  const price = toNumber(elements.productPrice.value);
  const stock = toInteger(elements.productStock.value);
  const minStock = toInteger(elements.productMinStock.value);
  const maxStock = toInteger(elements.productMaxStock.value);
  if ([price, stock, minStock, maxStock].some((value) => value < 0)) return showToast("No se permiten valores negativos");
  if (minStock > maxStock) return showToast("El minimo no puede superar el maximo");
  if (stock > maxStock) return showToast("El stock no puede superar el maximo");

  const product = {
    id,
    name: elements.productName.value.trim(),
    category: elements.productCategory.value.trim(),
    price,
    stock,
    minStock,
    maxStock,
    type: elements.productType.value,
    status: elements.productStatus.value,
    description: elements.productDescription.value.trim(),
  };
  const index = state.products.findIndex((item) => item.id === id);
  if (index >= 0) state.products[index] = product;
  else state.products.unshift(product);
  persist(storageKeys.products, state.products);
  clearProductForm();
  renderAll();
  showToast("Producto guardado");
}

function editProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  elements.productFormTitle.textContent = "Editar producto";
  elements.productId.value = product.id;
  elements.productName.value = product.name;
  elements.productCategory.value = product.category;
  elements.productPrice.value = product.price;
  elements.productStock.value = product.stock;
  elements.productMinStock.value = product.minStock;
  elements.productMaxStock.value = product.maxStock;
  elements.productType.value = product.type;
  elements.productStatus.value = product.status;
  elements.productDescription.value = product.description;
  showView("productos");
}

function toggleProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  product.status = product.status === "Activo" ? "Pausado" : "Activo";
  persist(storageKeys.products, state.products);
  renderAll();
}

function clearProductForm() {
  elements.productForm.reset();
  elements.productId.value = "";
  elements.productFormTitle.textContent = "Nuevo producto";
  elements.productMinStock.value = 5;
  elements.productMaxStock.value = 50;
}

function renderSales() {
  elements.salesTable.innerHTML = state.sales.length
    ? state.sales
        .map(
          (sale) => `
            <tr>
              <td><strong>${escapeHTML(sale.id)}</strong></td>
              <td>${escapeHTML(sale.orderId)}</td>
              <td>${escapeHTML(sale.customerName)}</td>
              <td>${escapeHTML(sale.paymentMethod)}</td>
              <td>${currency.format(sale.total)}</td>
              <td>${formatShortDate(sale.createdAt)}</td>
            </tr>
          `,
        )
        .join("")
    : tableEmpty(6, "Aun no hay ventas confirmadas.");
}

function renderShipments() {
  elements.shipmentsTable.innerHTML = state.shipments.length
    ? state.shipments
        .map(
          (shipment) => `
            <tr>
              <td><strong>${escapeHTML(shipment.orderId)}</strong></td>
              <td>${escapeHTML(shipment.customerName)}</td>
              <td>${escapeHTML(shipment.type)}</td>
              <td>${escapeHTML(shipment.address)}</td>
              <td><span class="badge info">${escapeHTML(shipment.status)}</span></td>
              <td><button class="ghost-button small" type="button" data-action="mark-shipped" data-id="${shipment.id}">Marcar enviado</button></td>
            </tr>
          `,
        )
        .join("")
    : tableEmpty(6, "No hay envios.");
}

function markShipmentSent(shipmentId) {
  const shipment = state.shipments.find((item) => item.id === shipmentId);
  if (!shipment) return;
  shipment.status = "En ruta";
  const order = getOrder(shipment.orderId);
  if (order && order.status !== "Completado") order.status = "Enviado";
  persistAll();
  renderAll();
}

function renderPayments() {
  elements.paymentsTable.innerHTML = state.payments.length
    ? state.payments
        .map(
          (payment) => `
            <tr>
              <td><strong>${escapeHTML(payment.orderId)}</strong></td>
              <td>${escapeHTML(payment.customerName)}</td>
              <td>${escapeHTML(payment.method)}</td>
              <td>${currency.format(payment.total)}</td>
              <td><span class="badge ${payment.status === "Pagado" ? "success" : "warning"}">${escapeHTML(payment.status)}</span></td>
              <td><button class="ghost-button small" type="button" data-action="mark-paid" data-id="${payment.id}">Marcar pagado</button></td>
            </tr>
          `,
        )
        .join("")
    : tableEmpty(6, "No hay cobros.");
}

function markPaymentPaid(paymentId) {
  const payment = state.payments.find((item) => item.id === paymentId);
  if (!payment || payment.status === "Pagado") return;
  payment.status = "Pagado";
  payment.method = payment.method === "Pendiente" ? "Transferencia" : payment.method;
  const order = getOrder(payment.orderId);
  if (order) {
    order.paymentMethod = payment.method;
    if (order.status === "Por cobrar") order.status = "Por enviar";
    createSaleFromOrder(order, payment);
  }
  const shipment = state.shipments.find((item) => item.orderId === payment.orderId);
  if (shipment && shipment.status === "Esperando pago") shipment.status = "Preparando";
  persistAll();
  renderAll();
}

function createSaleFromOrder(order, payment) {
  if (state.sales.some((sale) => sale.orderId === order.id)) return;
  state.sales.unshift({
    id: `VT-${Date.now().toString().slice(-6)}`,
    orderId: order.id,
    customerName: order.customerName,
    paymentMethod: payment.method,
    total: order.total,
    items: order.items,
    createdAt: new Date().toISOString(),
  });
}

function getProduct(id) {
  return state.products.find((product) => product.id === id);
}

function getCustomer(id) {
  return state.customers.find((customer) => customer.id === id);
}

function getOrder(id) {
  return state.orders.find((order) => order.id === id);
}

function stockStatus(product) {
  if (product.stock <= 0) return { label: "Agotado", className: "danger" };
  if (product.stock <= product.minStock) return { label: "Stock bajo", className: "warning" };
  return { label: "Disponible", className: "success" };
}

function resetDemoData() {
  if (!window.confirm("Reiniciar demo de Mini Farmacia?")) return;
  state.products = initialProducts.map((item) => ({ ...item }));
  state.customers = initialCustomers.map((item) => ({ ...item }));
  state.orders = [];
  state.payments = [];
  state.shipments = [];
  state.sales = [];
  state.conversations = initialConversations.map((item) => ({ ...item }));
  state.storeCart = [];
  persistAll();
  seedChat();
  renderAll();
  showToast("Demo reiniciado");
}

function persistAll() {
  persist(storageKeys.products, state.products);
  persist(storageKeys.customers, state.customers);
  persist(storageKeys.orders, state.orders);
  persist(storageKeys.payments, state.payments);
  persist(storageKeys.shipments, state.shipments);
  persist(storageKeys.sales, state.sales);
  persist(storageKeys.conversations, state.conversations);
}

function persist(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function listRow(title, subtitle, meta) {
  return `
    <article class="list-row">
      <div>
        <strong>${escapeHTML(title)}</strong>
        <span>${escapeHTML(subtitle)}</span>
      </div>
      <em>${escapeHTML(meta)}</em>
    </article>
  `;
}

function tableEmpty(colspan, message) {
  return `<tr><td colspan="${colspan}">${emptyState(message)}</td></tr>`;
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHTML(message)}</div>`;
}

function toNumber(value) {
  return Number.parseFloat(value || "0");
}

function toInteger(value) {
  return Number.parseInt(value || "0", 10);
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatTime(value) {
  return new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => elements.toast.classList.remove("visible"), 2200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}
