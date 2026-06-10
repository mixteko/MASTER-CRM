const storageKeys = {
  products: "minifarmacia_v1_products",
  customers: "minifarmacia_v1_customers",
  sales: "minifarmacia_v1_sales",
  movements: "minifarmacia_v1_movements",
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
    description: "Antiinflamatorio de venta comun. Confirmar indicaciones antes de comprar.",
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
    description: "Jarabe expectorante para apoyo respiratorio de uso familiar.",
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
    description: "Suplemento diario con tabletas efervescentes sabor naranja.",
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
    description: "Producto sujeto a validacion de receta antes de surtir.",
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
    id: "cust-paciente-nl",
    name: "Paciente Nuevo Leon",
    phone: "81 1500 9000",
    email: "paciente@correo.com",
    address: "San Nicolas, NL",
    createdAt: new Date().toISOString(),
  },
];

const state = {
  products: readJSON(storageKeys.products, initialProducts),
  customers: readJSON(storageKeys.customers, initialCustomers),
  sales: readJSON(storageKeys.sales, []),
  movements: readJSON(storageKeys.movements, []),
  saleCart: [],
  productQuery: "",
  customerQuery: "",
};

const viewTitles = {
  dashboard: "Dashboard",
  productos: "Productos",
  inventario: "Inventario",
  ventas: "Ventas",
  clientes: "Clientes",
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  viewTitle: $("#viewTitle"),
  todayLabel: $("#todayLabel"),
  toast: $("#toast"),
  metricSalesToday: $("#metricSalesToday"),
  metricSalesCount: $("#metricSalesCount"),
  metricProducts: $("#metricProducts"),
  metricLowStock: $("#metricLowStock"),
  metricCustomers: $("#metricCustomers"),
  metricNewCustomers: $("#metricNewCustomers"),
  metricInventoryValue: $("#metricInventoryValue"),
  dashboardAlerts: $("#dashboardAlerts"),
  dashboardSales: $("#dashboardSales"),
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
  inventoryForm: $("#inventoryForm"),
  inventoryProduct: $("#inventoryProduct"),
  inventoryType: $("#inventoryType"),
  inventoryQuantity: $("#inventoryQuantity"),
  inventoryReason: $("#inventoryReason"),
  inventoryTable: $("#inventoryTable"),
  movementList: $("#movementList"),
  saleItemForm: $("#saleItemForm"),
  saleProduct: $("#saleProduct"),
  saleQuantity: $("#saleQuantity"),
  saleDiscount: $("#saleDiscount"),
  saleCartList: $("#saleCartList"),
  clearSaleButton: $("#clearSaleButton"),
  saleCheckoutForm: $("#saleCheckoutForm"),
  saleCustomer: $("#saleCustomer"),
  salePayment: $("#salePayment"),
  saleSubtotal: $("#saleSubtotal"),
  saleDiscountTotal: $("#saleDiscountTotal"),
  saleTotal: $("#saleTotal"),
  salesTable: $("#salesTable"),
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
  resetDemoButton: $("#resetDemoButton"),
};

init();

function init() {
  elements.todayLabel.textContent = `Operacion local - ${formatShortDate(new Date().toISOString())}`;
  bindEvents();
  renderAll();
}

function bindEvents() {
  $$(".nav-item, [data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  elements.resetDemoButton.addEventListener("click", resetDemoData);
  elements.productForm.addEventListener("submit", saveProduct);
  elements.clearProductForm.addEventListener("click", clearProductForm);
  elements.productSearch.addEventListener("input", (event) => {
    state.productQuery = event.target.value.trim().toLowerCase();
    renderProducts();
  });

  elements.inventoryForm.addEventListener("submit", saveInventoryMovement);
  elements.saleItemForm.addEventListener("submit", addSaleItem);
  elements.clearSaleButton.addEventListener("click", clearSale);
  elements.saleCheckoutForm.addEventListener("submit", confirmSale);

  elements.customerForm.addEventListener("submit", saveCustomer);
  elements.clearCustomerForm.addEventListener("click", clearCustomerForm);
  elements.customerSearch.addEventListener("input", (event) => {
    state.customerQuery = event.target.value.trim().toLowerCase();
    renderCustomers();
  });

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!action) return;

    const id = action.dataset.id;
    if (action.dataset.action === "edit-product") editProduct(id);
    if (action.dataset.action === "toggle-product") toggleProduct(id);
    if (action.dataset.action === "edit-customer") editCustomer(id);
    if (action.dataset.action === "remove-sale-item") removeSaleItem(id);
  });
}

function showView(viewId) {
  if (!viewId || !viewTitles[viewId]) return;
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
  elements.viewTitle.textContent = viewTitles[viewId];
}

function renderAll() {
  renderDashboard();
  renderProducts();
  renderInventory();
  renderSales();
  renderCustomers();
  renderSelects();
}

function renderDashboard() {
  const today = new Date().toDateString();
  const todaySales = state.sales.filter((sale) => new Date(sale.createdAt).toDateString() === today);
  const salesTotal = todaySales.reduce((total, sale) => total + sale.total, 0);
  const lowStockProducts = state.products.filter((product) => product.stock <= product.minStock);
  const inventoryValue = state.products.reduce((total, product) => total + product.price * product.stock, 0);
  const newCustomers = state.customers.filter((customer) => new Date(customer.createdAt).toDateString() === today);

  elements.metricSalesToday.textContent = currency.format(salesTotal);
  elements.metricSalesCount.textContent = `${todaySales.length} tickets`;
  elements.metricProducts.textContent = String(state.products.filter((product) => product.status === "Activo").length);
  elements.metricLowStock.textContent = `${lowStockProducts.length} con stock bajo`;
  elements.metricCustomers.textContent = String(state.customers.length);
  elements.metricNewCustomers.textContent = `${newCustomers.length} nuevos`;
  elements.metricInventoryValue.textContent = currency.format(inventoryValue);

  elements.dashboardAlerts.innerHTML = lowStockProducts.length
    ? lowStockProducts
        .slice(0, 6)
        .map((product) => listRow(product.name, `${product.stock} disponibles - minimo ${product.minStock}`, stockStatus(product).label))
        .join("")
    : emptyState("Sin alertas de inventario.");

  elements.dashboardSales.innerHTML = state.sales.length
    ? state.sales
        .slice(0, 6)
        .map((sale) => listRow(sale.id, `${sale.customerName} - ${sale.paymentMethod}`, currency.format(sale.total)))
        .join("")
    : emptyState("Aun no hay ventas registradas.");
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
              <td>
                <strong>${escapeHTML(product.name)}</strong>
                <span>${escapeHTML(product.description || "Sin descripcion")}</span>
              </td>
              <td>${escapeHTML(product.category)}</td>
              <td>${currency.format(product.price)}</td>
              <td>
                <strong>${product.stock}</strong>
                <span>${escapeHTML(status.label)}</span>
              </td>
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
    : tableEmpty(6, "No hay productos con ese filtro.");
}

function saveProduct(event) {
  event.preventDefault();

  const id = elements.productId.value || createId("prod");
  const price = toNumber(elements.productPrice.value);
  const stock = toInteger(elements.productStock.value);
  const minStock = toInteger(elements.productMinStock.value);
  const maxStock = toInteger(elements.productMaxStock.value);

  if (price < 0 || stock < 0 || minStock < 0 || maxStock < 0) {
    showToast("Los valores numericos no pueden ser negativos");
    return;
  }

  if (minStock > maxStock) {
    showToast("El stock minimo no puede ser mayor al maximo");
    return;
  }

  if (stock > maxStock) {
    showToast("El stock actual no puede superar el maximo");
    return;
  }

  const product = {
    id,
    name: elements.productName.value.trim(),
    category: elements.productCategory.value.trim(),
    description: elements.productDescription.value.trim(),
    price,
    stock,
    minStock,
    maxStock,
    type: elements.productType.value,
    status: elements.productStatus.value,
  };

  const existingIndex = state.products.findIndex((item) => item.id === id);
  if (existingIndex >= 0) state.products[existingIndex] = product;
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
  elements.productDescription.value = product.description || "";
  showView("productos");
}

function toggleProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  product.status = product.status === "Activo" ? "Pausado" : "Activo";
  persist(storageKeys.products, state.products);
  renderAll();
  showToast(`Producto ${product.status.toLowerCase()}`);
}

function clearProductForm() {
  elements.productForm.reset();
  elements.productId.value = "";
  elements.productFormTitle.textContent = "Nuevo producto";
  elements.productMinStock.value = 5;
  elements.productMaxStock.value = 50;
}

function renderInventory() {
  elements.inventoryTable.innerHTML = state.products.length
    ? state.products
        .map((product) => {
          const status = stockStatus(product);
          return `
            <tr>
              <td><strong>${escapeHTML(product.name)}</strong><span>${escapeHTML(product.category)}</span></td>
              <td>${product.stock}</td>
              <td>${product.minStock}</td>
              <td>${product.maxStock}</td>
              <td><span class="badge ${status.className}">${escapeHTML(status.label)}</span></td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(5, "No hay productos para controlar.");

  elements.movementList.innerHTML = state.movements.length
    ? state.movements
        .slice(0, 10)
        .map((movement) => {
          const product = getProduct(movement.productId);
          return listRow(
            product?.name || "Producto eliminado",
            `${movement.type} - ${movement.quantity} unidades - ${movement.reason || "Sin motivo"}`,
            formatShortDate(movement.createdAt),
          );
        })
        .join("")
    : emptyState("Aun no hay movimientos registrados.");
}

function saveInventoryMovement(event) {
  event.preventDefault();

  const product = getProduct(elements.inventoryProduct.value);
  const quantity = toInteger(elements.inventoryQuantity.value);
  const type = elements.inventoryType.value;
  const reason = elements.inventoryReason.value.trim();

  if (!product) {
    showToast("Selecciona un producto");
    return;
  }

  if (quantity < 0) {
    showToast("La cantidad no puede ser negativa");
    return;
  }

  let nextStock = product.stock;
  if (type === "entrada") nextStock += quantity;
  if (type === "salida") nextStock -= quantity;
  if (type === "ajuste") nextStock = quantity;

  if (nextStock < 0) {
    showToast("No se permite stock negativo");
    return;
  }

  if (nextStock > product.maxStock) {
    showToast("La existencia supera el stock maximo configurado");
    return;
  }

  product.stock = nextStock;
  state.movements.unshift({
    id: createId("mov"),
    productId: product.id,
    type,
    quantity,
    reason,
    createdAt: new Date().toISOString(),
  });

  persist(storageKeys.products, state.products);
  persist(storageKeys.movements, state.movements);
  elements.inventoryForm.reset();
  renderAll();
  showToast("Movimiento registrado");
}

function renderSales() {
  renderSaleCart();
  elements.salesTable.innerHTML = state.sales.length
    ? state.sales
        .map(
          (sale) => `
            <tr>
              <td><strong>${escapeHTML(sale.id)}</strong><span>${sale.items.length} productos</span></td>
              <td>${escapeHTML(sale.customerName)}</td>
              <td>${escapeHTML(sale.paymentMethod)}</td>
              <td>${currency.format(sale.total)}</td>
              <td>${formatShortDate(sale.createdAt)}</td>
            </tr>
          `,
        )
        .join("")
    : tableEmpty(5, "No hay ventas registradas.");
}

function addSaleItem(event) {
  event.preventDefault();

  const product = getProduct(elements.saleProduct.value);
  const quantity = toInteger(elements.saleQuantity.value);
  const discount = toNumber(elements.saleDiscount.value);

  if (!product || product.status !== "Activo") {
    showToast("Selecciona un producto activo");
    return;
  }

  if (quantity <= 0) {
    showToast("La cantidad debe ser mayor a cero");
    return;
  }

  if (discount < 0) {
    showToast("El descuento no puede ser negativo");
    return;
  }

  const existingQuantity = state.saleCart
    .filter((item) => item.productId === product.id)
    .reduce((total, item) => total + item.quantity, 0);

  if (existingQuantity + quantity > product.stock) {
    showToast("No hay suficiente existencia para esta venta");
    return;
  }

  state.saleCart.push({
    lineId: createId("line"),
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
    discount,
  });

  elements.saleItemForm.reset();
  elements.saleQuantity.value = 1;
  elements.saleDiscount.value = 0;
  renderSaleCart();
  showToast("Producto agregado al ticket");
}

function renderSaleCart() {
  const totals = saleTotals();
  elements.saleCartList.innerHTML = state.saleCart.length
    ? state.saleCart
        .map(
          (item) => `
            <div class="ticket-line">
              <div>
                <strong>${escapeHTML(item.name)}</strong>
                <span>${item.quantity} x ${currency.format(item.price)} - desc. ${currency.format(item.discount)}</span>
              </div>
              <button class="ghost-button small" type="button" data-action="remove-sale-item" data-id="${item.lineId}">Quitar</button>
            </div>
          `,
        )
        .join("")
    : emptyState("Agrega productos para iniciar una venta.");

  elements.saleSubtotal.textContent = currency.format(totals.subtotal);
  elements.saleDiscountTotal.textContent = currency.format(totals.discount);
  elements.saleTotal.textContent = currency.format(totals.total);
}

function removeSaleItem(lineId) {
  state.saleCart = state.saleCart.filter((item) => item.lineId !== lineId);
  renderSaleCart();
}

function clearSale() {
  state.saleCart = [];
  renderSaleCart();
  showToast("Ticket vacio");
}

function confirmSale(event) {
  event.preventDefault();

  if (!state.saleCart.length) {
    showToast("Agrega productos antes de confirmar");
    return;
  }

  for (const item of state.saleCart) {
    const product = getProduct(item.productId);
    if (!product || product.stock < item.quantity) {
      showToast(`Stock insuficiente para ${item.name}`);
      return;
    }
  }

  const totals = saleTotals();
  const customer = getCustomer(elements.saleCustomer.value);
  const sale = {
    id: `VT-${Date.now().toString().slice(-6)}`,
    customerId: customer?.id || "",
    customerName: customer?.name || "Venta mostrador",
    paymentMethod: elements.salePayment.value,
    items: state.saleCart.map((item) => ({ ...item })),
    subtotal: totals.subtotal,
    discount: totals.discount,
    total: totals.total,
    createdAt: new Date().toISOString(),
  };

  sale.items.forEach((item) => {
    const product = getProduct(item.productId);
    product.stock -= item.quantity;
    state.movements.unshift({
      id: createId("mov"),
      productId: product.id,
      type: "salida",
      quantity: item.quantity,
      reason: `Venta ${sale.id}`,
      createdAt: sale.createdAt,
    });
  });

  state.sales.unshift(sale);
  state.saleCart = [];
  persist(storageKeys.products, state.products);
  persist(storageKeys.sales, state.sales);
  persist(storageKeys.movements, state.movements);
  renderAll();
  showToast(`Venta ${sale.id} confirmada`);
}

function saleTotals() {
  const subtotal = state.saleCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = state.saleCart.reduce((total, item) => total + item.discount, 0);
  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
  };
}

function renderCustomers() {
  const customers = state.customers.filter((customer) => {
    const text = `${customer.name} ${customer.phone} ${customer.email} ${customer.address}`.toLowerCase();
    return text.includes(state.customerQuery);
  });

  elements.customerCards.innerHTML = customers.length
    ? customers
        .map((customer) => {
          const sales = state.sales.filter((sale) => sale.customerId === customer.id);
          const total = sales.reduce((sum, sale) => sum + sale.total, 0);
          return `
            <article class="customer-card">
              <div class="avatar">${escapeHTML(initials(customer.name))}</div>
              <div>
                <h3>${escapeHTML(customer.name)}</h3>
                <p>${escapeHTML(customer.phone)}</p>
                <p>${escapeHTML(customer.email || "Sin correo")}</p>
                <small>${escapeHTML(customer.address || "Sin direccion")}</small>
                <div class="customer-meta">
                  <span>${sales.length} ventas</span>
                  <span>${currency.format(total)}</span>
                </div>
                <button class="ghost-button small" type="button" data-action="edit-customer" data-id="${customer.id}">Editar</button>
              </div>
            </article>
          `;
        })
        .join("")
    : emptyState("No hay clientes con ese filtro.");
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

  const existingIndex = state.customers.findIndex((item) => item.id === id);
  if (existingIndex >= 0) state.customers[existingIndex] = customer;
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

function renderSelects() {
  const activeProducts = state.products.filter((product) => product.status === "Activo");
  const productOptions = activeProducts
    .map((product) => `<option value="${product.id}">${escapeHTML(product.name)} - ${product.stock} disp.</option>`)
    .join("");

  elements.inventoryProduct.innerHTML = state.products
    .map((product) => `<option value="${product.id}">${escapeHTML(product.name)}</option>`)
    .join("");
  elements.saleProduct.innerHTML = productOptions || '<option value="">Sin productos activos</option>';
  elements.saleCustomer.innerHTML =
    '<option value="">Venta mostrador</option>' +
    state.customers.map((customer) => `<option value="${customer.id}">${escapeHTML(customer.name)}</option>`).join("");
}

function stockStatus(product) {
  if (product.stock <= 0) return { label: "Agotado", className: "danger" };
  if (product.stock <= product.minStock) return { label: "Stock bajo", className: "warning" };
  if (product.stock >= product.maxStock) return { label: "Stock maximo", className: "info" };
  return { label: "Disponible", className: "success" };
}

function getProduct(id) {
  return state.products.find((product) => product.id === id);
}

function getCustomer(id) {
  return state.customers.find((customer) => customer.id === id);
}

function resetDemoData() {
  if (!window.confirm("Reiniciar los datos demo de Mini Farmacia?")) return;
  state.products = initialProducts.map((product) => ({ ...product }));
  state.customers = initialCustomers.map((customer) => ({ ...customer }));
  state.sales = [];
  state.movements = [];
  state.saleCart = [];
  persist(storageKeys.products, state.products);
  persist(storageKeys.customers, state.customers);
  persist(storageKeys.sales, state.sales);
  persist(storageKeys.movements, state.movements);
  clearProductForm();
  clearCustomerForm();
  renderAll();
  showToast("Datos demo reiniciados");
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

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback.map ? fallback.map((item) => ({ ...item })) : fallback;
  } catch {
    return fallback.map ? fallback.map((item) => ({ ...item })) : fallback;
  }
}

function persist(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function toNumber(value) {
  return Number.parseFloat(value || "0");
}

function toInteger(value) {
  return Number.parseInt(value || "0", 10);
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
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
