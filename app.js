const storageKeys = {
  products: "minifarmacia_crm_products",
  customers: "minifarmacia_crm_customers",
  commercialProfiles: "minifarmacia_crm_commercial_profiles",
  orders: "minifarmacia_crm_orders",
  payments: "minifarmacia_crm_payments",
  shipments: "minifarmacia_crm_shipments",
  sales: "minifarmacia_crm_sales",
  orderSeq: "minifarmacia_crm_order_seq",
  saleSeq: "minifarmacia_crm_sale_seq",
  conversations: "minifarmacia_crm_conversations",
  settings: "minifarmacia_crm_settings",
  catalogVersion: "minifarmacia_product_catalog_version",
};

const PRODUCT_CATALOG_VERSION = "pdv-2026-06-11";

let productImagePendingFile = null;
let productImageObjectUrl = "";
let productActionDialogResolver = null;
let customerFormMode = "create";
let customerContactContext = null;
let productPermanentDeleteResolver = null;
let productLotDeleteResolver = null;
let productLotDeleteContext = null;
let categoryDependencyResolver = null;
let classificationDependencyResolver = null;

const initialProducts = [
  {
    "id": "prod-gf049",
    "sku": "GF049",
    "name": "GALACTUS 100 UI (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "galactus 100 ui",
    "substance": "galactus-100-ui",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 395.5,
    "regularPrice": 1393.0,
    "price": 494.37,
    "discountPrice": 494.37,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/GALACTUS100UI.jpg?v=1767637252",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf053",
    "sku": "GF053",
    "name": "OZEMPIC SOL INY 0.25MG/0.5MG (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "ozempic sol iny 0 25mg 0 5mg red fria",
    "substance": "ozempic-sol-iny-0-25mg-0-5mg-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 3800.0,
    "regularPrice": 4400.0,
    "price": 4100.0,
    "discountPrice": 4100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/OZEMPIC.25.jpg?v=1767631431",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf058",
    "sku": "GF058",
    "name": "28 TABS FORXIGA 10 MG.",
    "category": "Controlados",
    "description": "28 tabs forxiga 10 mg",
    "substance": "28-tabs-forxiga-10-mg",
    "expiresAt": "2028-12-31",
    "stock": 260,
    "minStock": 10,
    "maxStock": 260,
    "cost": 700.0,
    "regularPrice": 1544.0,
    "price": 1000.0,
    "discountPrice": 1000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/FORXIGA.jpg?v=1767048381",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf060",
    "sku": "GF060",
    "name": "ZOLADEX IMPLANTE 3.6 MG JGA C/1",
    "category": "Medicamentos",
    "description": "3 6 mg zoladex implante jga c 1",
    "substance": "3-6-mg-zoladex-implante-jga-c-1",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 3800.0,
    "regularPrice": 5682.0,
    "price": 4850.0,
    "discountPrice": 4850.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_4_65931df8-4830-4515-9772-9bc28ca6e78e.jpg?v=1767048378",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf061",
    "sku": "GF061",
    "name": "30 TABS BIKTARVY FCO. 50 MG",
    "category": "Medicamentos",
    "description": "30 tabs biktarvy fco 50 mg",
    "substance": "30-tabs-biktarvy-fco-50-mg",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 1900.0,
    "regularPrice": 14265.0,
    "price": 6500.0,
    "discountPrice": 6500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/IMG_0225.jpg?v=1767048377",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf062",
    "sku": "GF062",
    "name": "5MG BUVACAINA PESADA 1ML CAJA C/5 AMP.INY 3ML",
    "category": "Medicamentos",
    "description": "5mg buvacaina pesada 1ml caja c 5 amp iny 3ml",
    "substance": "5mg-buvacaina-pesada-1ml-caja-c-5-amp-iny-3ml",
    "expiresAt": "2028-12-31",
    "stock": 1000,
    "minStock": 10,
    "maxStock": 1000,
    "cost": 180.0,
    "regularPrice": 350.0,
    "price": 230.0,
    "discountPrice": 230.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/253044.jpg?v=1767048375",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf063",
    "sku": "GF063",
    "name": "5MG EXFORGE HCT 5MG / 160MG / 12.5MG C/28",
    "category": "Medicamentos",
    "description": "5mg exforge hct 5mg 160mg 12 5mg c 28",
    "substance": "5mg-exforge-hct-5mg-160mg-12-5mg-c-28",
    "expiresAt": "2028-12-31",
    "stock": 26,
    "minStock": 3,
    "maxStock": 26,
    "cost": 900.0,
    "regularPrice": 1623.0,
    "price": 1450.0,
    "discountPrice": 1450.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/EXFORGE.jpg?v=1767048374",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf065",
    "sku": "GF065",
    "name": "ACIDO MICOFENILICO 500MG PISA",
    "category": "Medicamentos",
    "description": "acido micofenolico 500mg pisa",
    "substance": "acido-micofenolico-500mg-pisa",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 800.0,
    "regularPrice": 1979.0,
    "price": 1100.0,
    "discountPrice": 1100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/ACIDO_1.jpg?v=1767048371",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf066",
    "sku": "GF066",
    "name": "ACIDO ZOLEDRINICO 4 MG/5 ML INY",
    "category": "Medicamentos",
    "description": "acido zoledronico 4 mg 5 ml iny",
    "substance": "acido-zoledronico-4-mg-5-ml-iny",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 800.0,
    "regularPrice": 1800.0,
    "price": 1100.0,
    "discountPrice": 1100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/ImagendeWhatsApp2025-08-08alas15.00.27_651f3f91.jpg?v=1767048369",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf067",
    "sku": "GF067",
    "name": "ACLASTA 5 MG",
    "category": "Medicamentos",
    "description": "aclasta 5 mg",
    "substance": "aclasta-5-mg",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 8200.0,
    "regularPrice": 14000.0,
    "price": 9800.0,
    "discountPrice": 9800.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/WhatsApp-Image-2025-06-27-at-10.14.09-AM.jpg?v=1767048368",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf068",
    "sku": "GF068",
    "name": "ATROPINA 1 MG SOL 50 AMP",
    "category": "Medicamentos",
    "description": "atropina 1 mg sol 50 amp",
    "substance": "atropina-1-mg-sol-50-amp",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 1050.0,
    "regularPrice": 1900.0,
    "price": 1500.0,
    "discountPrice": 1500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T143844.220.jpg?v=1767048366",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf069",
    "sku": "GF069",
    "name": "BOLENTAX ENOXAPARINA 60 MG C/2 JGA",
    "category": "Medicamentos",
    "description": "bolentax enoxaparina 60 mg c 2 jga",
    "substance": "bolentax-enoxaparina-60-mg-c-2-jga",
    "expiresAt": "2028-12-31",
    "stock": 100,
    "minStock": 10,
    "maxStock": 100,
    "cost": 700.0,
    "regularPrice": 1900.0,
    "price": 1200.0,
    "discountPrice": 1200.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/bolentax-60mg-fotor-bg-remover-20250218175633.jpg?v=1767048364",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf071",
    "sku": "GF071",
    "name": "BUPRENORFINA SOL INY 0.3 MG/ML C/6 AMP PISA",
    "category": "Medicamentos",
    "description": "buprenorfina sol iny 0 3 mg ml c 6 amp pisa",
    "substance": "buprenorfina-sol-iny-0-3-mg-ml-c-6-amp-pisa",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 600.0,
    "regularPrice": 1500.0,
    "price": 900.0,
    "discountPrice": 900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/bupre.jpg?v=1767048362",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf072",
    "sku": "GF072",
    "name": "CAMBINER 150 MG SOL INY FAM CAJ C/1",
    "category": "Medicamentos",
    "description": "cambiner 150 mg sol iny fam caj c 1",
    "substance": "cambiner-150-mg-sol-iny-fam-caj-c-1",
    "expiresAt": "2028-12-31",
    "stock": 90,
    "minStock": 9,
    "maxStock": 90,
    "cost": 1000.0,
    "regularPrice": 1927.0,
    "price": 1425.0,
    "discountPrice": 1425.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/CAMBINER-150-MG.png?v=1767048361",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf073",
    "sku": "GF073",
    "name": "CIPROBAC 400MG / 200ML",
    "category": "Medicamentos",
    "description": "ciprobac 400mg 200ml",
    "substance": "ciprobac-400mg-200ml",
    "expiresAt": "2028-12-31",
    "stock": 260,
    "minStock": 10,
    "maxStock": 260,
    "cost": 500.0,
    "regularPrice": 1750.0,
    "price": 750.0,
    "discountPrice": 750.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/011792.jpg?v=1767048359",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf074",
    "sku": "GF074",
    "name": "CLEXANE 60 MG SOL INY C/2.",
    "category": "Medicamentos",
    "description": "clexane 60 mg sol iny c 2",
    "substance": "clexane-60-mg-sol-iny-c-2",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 600.0,
    "regularPrice": 3014.0,
    "price": 900.0,
    "discountPrice": 900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T150019.901.jpg?v=1767048357",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf075",
    "sku": "GF075",
    "name": "COMBIVENT RESPIMAT 1.68 MG/ 8.77 MG/ 1 ML",
    "category": "Medicamentos",
    "description": "combivent respimat 1 68 mg 8 77 mg 1 ml",
    "substance": "combivent-respimat-1-68-mg-8-77-mg-1-ml",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 950.0,
    "regularPrice": 1329.0,
    "price": 1040.0,
    "discountPrice": 1040.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/WhatsApp-Image-2025-06-27-at-3.02.57-PM-_1.jpg?v=1767048356",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf077",
    "sku": "GF077",
    "name": "COSENTYX 150MG/ML PLP CAJ C/3",
    "category": "Medicamentos",
    "description": "cosentyx 150mg ml plp caj c 3",
    "substance": "cosentyx-150mg-ml-plp-caj-c-3",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 8100.0,
    "regularPrice": 32479.0,
    "price": 8425.0,
    "discountPrice": 8425.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/COSENTYX-150MG.jpg?v=1767048353",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf078",
    "sku": "GF078",
    "name": "CUROSURF 240 MG CAJA FCO CON 3 ML",
    "category": "Medicamentos",
    "description": "curosurf 240 mg caja fco con 3 ml",
    "substance": "curosurf-240-mg-caja-fco-con-3-ml",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 7100.0,
    "regularPrice": 16607.0,
    "price": 7400.0,
    "discountPrice": 7400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T150612.884.jpg?v=1767048352",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf079",
    "sku": "GF079",
    "name": "BIOYETIN 4000 UI/ 0.3 ML. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "bioyetin 4000 ui 0 3 ml",
    "substance": "bioyetin-4000-ui-0-3-ml",
    "expiresAt": "2028-12-31",
    "stock": 23,
    "minStock": 3,
    "maxStock": 23,
    "cost": 850.0,
    "regularPrice": 4688.0,
    "price": 1150.0,
    "discountPrice": 1150.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T144526.869.jpg?v=1767048350",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf080",
    "sku": "GF080",
    "name": "ARANESP 500 MG (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "aranesp 500 mg",
    "substance": "aranesp-500-mg",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 5100.0,
    "regularPrice": 19700.0,
    "price": 5450.0,
    "discountPrice": 5450.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T142840.745.jpg?v=1767048349",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf081",
    "sku": "GF081",
    "name": "ARANESP 40 MG",
    "category": "Medicamentos",
    "description": "aranesp 40 mg",
    "substance": "aranesp-40-mg",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 5050.0,
    "regularPrice": 6213.0,
    "price": 5297.5,
    "discountPrice": 5297.5,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-26T111937.012.jpg?v=1767048347",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf082",
    "sku": "GF082",
    "name": "ACTILYSE 50 MG 2 FCOS. 50 ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "actilyse 50 mg 2 fcos 50 ml",
    "substance": "actilyse-50-mg-2-fcos-50-ml",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 9100.0,
    "regularPrice": 101313.0,
    "price": 9430.0,
    "discountPrice": 9430.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T142943.302.jpg?v=1767048346",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf083",
    "sku": "GF083",
    "name": "ARANESP 300 MCG / 0.6 ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "aranesp 300 mcg 0 6 ml",
    "substance": "aranesp-300-mcg-0-6-ml",
    "expiresAt": "2028-12-31",
    "stock": 13,
    "minStock": 2,
    "maxStock": 13,
    "cost": 6050.0,
    "regularPrice": 12000.0,
    "price": 6445.0,
    "discountPrice": 6445.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-26T111516.562.jpg?v=1767048344",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf084",
    "sku": "GF084",
    "name": "DENEPHAR ENOXAPARINA 40 MG C/2 JGA",
    "category": "Medicamentos",
    "description": "denephar enoxaparina 40 mg c 2 jga",
    "substance": "denephar-enoxaparina-40-mg-c-2-jga",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 550.0,
    "regularPrice": 900.0,
    "price": 800.0,
    "discountPrice": 800.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T145449.280.jpg?v=1767048343",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf085",
    "sku": "GF085",
    "name": "DYNASTAT 40 MG 2 FAM C/2 ML",
    "category": "Medicamentos",
    "description": "dynastat 40 mg 2 fam c 2 ml",
    "substance": "dynastat-40-mg-2-fam-c-2-ml",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 650.0,
    "regularPrice": 950.0,
    "price": 850.0,
    "discountPrice": 850.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/DYNASTAT-40-MG.jpg?v=1767048341",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf086",
    "sku": "GF086",
    "name": "ENTRESTO 100 MG C/60 COMP",
    "category": "Medicamentos",
    "description": "entresto 100 mg c 60 comp",
    "substance": "entresto-100-mg-c-60-comp",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 1500.0,
    "regularPrice": 3416.0,
    "price": 2500.0,
    "discountPrice": 2500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/0a53a676-1c50-4a01-ad2e-195ae0de12c7_2.jpg?v=1767048340",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf087",
    "sku": "GF087",
    "name": "HI-BUMIN 25% 50 ML SOLUC INYEC. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "hi bumin 25 50 ml soluc inyec red fria",
    "substance": "hi-bumin-25-50-ml-soluc-inyec-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 21,
    "minStock": 3,
    "maxStock": 21,
    "cost": 650.0,
    "regularPrice": 2600.0,
    "price": 900.0,
    "discountPrice": 900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-25T150753.221.jpg?v=1767048339",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf088",
    "sku": "GF088",
    "name": "HERZUMA 440 MG",
    "category": "Medicamentos",
    "description": "herzuma 440 mg",
    "substance": "herzuma-440-mg",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 3100.0,
    "regularPrice": 5500.0,
    "price": 3425.0,
    "discountPrice": 3425.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T160630.671.jpg?v=1767048337",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf089",
    "sku": "GF089",
    "name": "HEPA MERZ IV 5 G 5 AMPOLLETAS 10 ML",
    "category": "Medicamentos",
    "description": "hepa merz iv 5 g 5 ampolletas 10 ml",
    "substance": "hepa-merz-iv-5-g-5-ampolletas-10-ml",
    "expiresAt": "2028-12-31",
    "stock": 17,
    "minStock": 2,
    "maxStock": 17,
    "cost": 700.0,
    "regularPrice": 900.0,
    "price": 800.0,
    "discountPrice": 800.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/HepaMERZ.jpg?v=1767048336",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf093",
    "sku": "GF093",
    "name": "FRESOFOL 1 % CAJA 5 AMPOLLETAS C/ 20ML",
    "category": "Medicamentos",
    "description": "fresofol 1 caja 5 ampolletas c 20ml",
    "substance": "fresofol-1-caja-5-ampolletas-c-20ml",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 650.0,
    "regularPrice": 1200.0,
    "price": 950.0,
    "discountPrice": 950.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/fresofol_1725320442512.jpg?v=1767048330",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf094",
    "sku": "GF094",
    "name": "FOLOTYN 20MG/ML FAM CAJ C/1",
    "category": "Medicamentos",
    "description": "folotyn 20mg ml fam caj c 1",
    "substance": "folotyn-20mg-ml-fam-caj-c-1",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 5600.0,
    "regularPrice": 27573.0,
    "price": 6070.0,
    "discountPrice": 6070.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_5.jpg?v=1767048328",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf095",
    "sku": "GF095",
    "name": "FLUDROCORTISONA 0.1MG NOVIT",
    "category": "Medicamentos",
    "description": "fludrocortisona 0 1mg novit",
    "substance": "fludrocortisona-0-1mg-novit",
    "expiresAt": "2028-12-31",
    "stock": 90,
    "minStock": 9,
    "maxStock": 90,
    "cost": 2700.0,
    "regularPrice": 5200.0,
    "price": 3500.0,
    "discountPrice": 3500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/FLUDROCORTISONA_1.jpg?v=1767048327",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf096",
    "sku": "GF096",
    "name": "FINATAK 1G ERTAPENEM SOL. INY",
    "category": "Medicamentos",
    "description": "finatak 1g ertapenem sol iny",
    "substance": "finatak-1g-ertapenem-sol-iny",
    "expiresAt": "2028-12-31",
    "stock": 33,
    "minStock": 4,
    "maxStock": 33,
    "cost": 850.0,
    "regularPrice": 1489.0,
    "price": 960.0,
    "discountPrice": 960.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T153225.785.jpg?v=1767048325",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf101",
    "sku": "GF101",
    "name": "ZOLADEX IMPLANTE JGP 10.8MG C/1",
    "category": "Medicamentos",
    "description": "zoladex implante jgp 10 8mg c 1",
    "substance": "zoladex-implante-jgp-10-8mg-c-1",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 7900.0,
    "regularPrice": 19998.0,
    "price": 8310.0,
    "discountPrice": 8310.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-26T094109.511.jpg?v=1767048318",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf102",
    "sku": "GF102",
    "name": "XTANDI. 120 CAPS. 40 MG.",
    "category": "Medicamentos",
    "description": "xtandi 120 caps 40 mg",
    "substance": "xtandi-120-caps-40-mg",
    "expiresAt": "2028-12-31",
    "stock": 17,
    "minStock": 2,
    "maxStock": 17,
    "cost": 16600.0,
    "regularPrice": 105758.0,
    "price": 17020.0,
    "discountPrice": 17020.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-26T130432.041.jpg?v=1767048316",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf103",
    "sku": "GF103",
    "name": "XELODA 500MG TAB BLI C/120",
    "category": "Medicamentos",
    "description": "xeloda 500mg tab bli c 120",
    "substance": "xeloda-500mg-tab-bli-c-120",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 13600.0,
    "regularPrice": 32322.0,
    "price": 13960.0,
    "discountPrice": 13960.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/XELODA-500MG.jpg?v=1767048315",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf104",
    "sku": "GF104",
    "name": "XARELTO 20 MG C/28.",
    "category": "Medicamentos",
    "description": "xarelto 20 mg c 28",
    "substance": "xarelto-20-mg-c-28",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1250.0,
    "regularPrice": 2676.0,
    "price": 2000.0,
    "discountPrice": 2000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/XARELTO-20-MG.jpg?v=1767048313",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf105",
    "sku": "GF105",
    "name": "KYPROLIS 60MG FA C/1 (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "kyprolis 60mg fa c 1",
    "substance": "kyprolis-60mg-fa-c-1",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 7050.0,
    "regularPrice": 25909.0,
    "price": 7345.0,
    "discountPrice": 7345.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_10.jpg?v=1767048312",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf106",
    "sku": "GF106",
    "name": "KITOSCELL LP 600 MG, 90 TAB.",
    "category": "Medicamentos",
    "description": "kitoscell lp 600 mg 90 tab",
    "substance": "kitoscell-lp-600-mg-90-tab",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 7600.0,
    "regularPrice": 13483.0,
    "price": 9500.0,
    "discountPrice": 9500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T164439.685.jpg?v=1767048310",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf107",
    "sku": "GF107",
    "name": "KEDRIGAMMA 6G/120ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "kedrigamma 6g 120ml",
    "substance": "kedrigamma-6g-120ml",
    "expiresAt": "2028-12-31",
    "stock": 11,
    "minStock": 2,
    "maxStock": 11,
    "cost": 2000.0,
    "regularPrice": 5100.0,
    "price": 3500.0,
    "discountPrice": 3500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T151528.338.jpg?v=1767048309",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf109",
    "sku": "GF109",
    "name": "INVANZ 1 G SOL INY. RX.",
    "category": "Controlados",
    "description": "invanz 1 g sol iny rx",
    "substance": "invanz-1-g-sol-iny-rx",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1500.0,
    "regularPrice": 2247.0,
    "price": 2000.0,
    "discountPrice": 2000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T093935.062.jpg?v=1767048305",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf110",
    "sku": "GF110",
    "name": "IMPLANON NXT 68 MG.",
    "category": "Medicamentos",
    "description": "implanon nxt 68 mg",
    "substance": "implanon-nxt-68-mg",
    "expiresAt": "2028-12-31",
    "stock": 33,
    "minStock": 4,
    "maxStock": 33,
    "cost": 1000.0,
    "regularPrice": 4736.0,
    "price": 1400.0,
    "discountPrice": 1400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T163206.422.jpg?v=1767048304",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf111",
    "sku": "GF111",
    "name": "HUMALOG MIX 25 100 UI (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "humalog mix 25 100 ui",
    "substance": "humalog-mix-25-100-ui",
    "expiresAt": "2028-12-31",
    "stock": 110,
    "minStock": 10,
    "maxStock": 110,
    "cost": 700.0,
    "regularPrice": 1355.0,
    "price": 950.0,
    "discountPrice": 950.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/humalogmix_1.jpg?v=1767048302",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf112",
    "sku": "GF112",
    "name": "HUMALOG LISPRO SOL. 100UI/ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "humalog lispro sol 100ui ml",
    "substance": "humalog-lispro-sol-100ui-ml",
    "expiresAt": "2028-12-31",
    "stock": 90,
    "minStock": 9,
    "maxStock": 90,
    "cost": 750.0,
    "regularPrice": 1500.0,
    "price": 950.0,
    "discountPrice": 950.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T161638.832.jpg?v=1767048300",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf113",
    "sku": "GF113",
    "name": "HIGLOBIN 5G FCO 50 ML.",
    "category": "Medicamentos",
    "description": "higlobin 5g fco 50 ml 1",
    "substance": "higlobin-5g-fco-50-ml-1",
    "expiresAt": "2028-12-31",
    "stock": 17,
    "minStock": 2,
    "maxStock": 17,
    "cost": 1100.0,
    "regularPrice": 10150.0,
    "price": 1400.0,
    "discountPrice": 1400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T103204.292.jpg?v=1767048299",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf114",
    "sku": "GF114",
    "name": "LANTUS SOLOSTAR C/5 AMP 3 ML. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "lantus 100 ui 10 ml frasco ampula",
    "substance": "lantus-100-ui-10-ml-frasco-ampula",
    "expiresAt": "2028-12-31",
    "stock": 100,
    "minStock": 10,
    "maxStock": 100,
    "cost": 1500.0,
    "regularPrice": 2311.0,
    "price": 1800.0,
    "discountPrice": 1800.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T125338.291.jpg?v=1767048297",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf115",
    "sku": "GF115",
    "name": "LEFEBRE NALOXONA 0.40 MG/1 ML C/10 AMP.",
    "category": "Medicamentos",
    "description": "lefebre naloxona 0 40 mg 1 ml c 10 amp",
    "substance": "lefebre-naloxona-0-40-mg-1-ml-c-10-amp",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1100.0,
    "regularPrice": 6700.0,
    "price": 1400.0,
    "discountPrice": 1400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T112257.872.jpg?v=1767048296",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf116",
    "sku": "GF116",
    "name": "MABALL 100 MG / 10 ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "maball 100 mg 10 ml",
    "substance": "maball-100-mg-10-ml",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 2900.0,
    "regularPrice": 6800.0,
    "price": 3300.0,
    "discountPrice": 3300.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T112745.023.jpg?v=1767048294",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf117",
    "sku": "GF117",
    "name": "MABALL 500 MG (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "maball 500 mg",
    "substance": "maball-500-mg",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 5100.0,
    "regularPrice": 14900.0,
    "price": 5455.0,
    "discountPrice": 5455.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T165925.987.jpg?v=1767048292",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf119",
    "sku": "GF119",
    "name": "METALYSE 50 MG SOL INY",
    "category": "Medicamentos",
    "description": "metalyse 50 mg sol iny",
    "substance": "metalyse-50-mg-sol-iny",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 10050.0,
    "regularPrice": 125315.0,
    "price": 10365.0,
    "discountPrice": 10365.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T114947.296.jpg?v=1767048290",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf120",
    "sku": "GF120",
    "name": "MIDAZOLAM SOL. INY. 15 MG/ 3ML. 5 AMP.",
    "category": "Medicamentos",
    "description": "midazolam sol iny 15 mg 3ml 5 amp",
    "substance": "midazolam-sol-iny-15-mg-3ml-5-amp",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 800.0,
    "regularPrice": 1500.0,
    "price": 1200.0,
    "discountPrice": 1200.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/ImagendeWhatsApp2025-08-08alas14.17.12_ad6e7e4b.jpg?v=1767048288",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf121",
    "sku": "GF121",
    "name": "MYFORTIC 360MG GRA CAJ C/121",
    "category": "Medicamentos",
    "description": "myfortic 360mg gra caj c 121",
    "substance": "myfortic-360mg-gra-caj-c-121",
    "expiresAt": "2028-12-31",
    "stock": 8,
    "minStock": 1,
    "maxStock": 8,
    "cost": 8100.0,
    "regularPrice": 13789.0,
    "price": 8750.0,
    "discountPrice": 8750.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T120350.798.jpg?v=1767048286",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf123",
    "sku": "GF123",
    "name": "OCTAGAM SOLUCIIN INYECTABLE 5 G/120ML",
    "category": "Medicamentos",
    "description": "octagam solucion inyectable 5 g 120ml",
    "substance": "octagam-solucion-inyectable-5-g-120ml",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 3600.0,
    "regularPrice": 15000.0,
    "price": 3990.0,
    "discountPrice": 3990.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T122049.928.jpg?v=1767048284",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf124",
    "sku": "GF124",
    "name": "OCTALBIN SOL. INY. 25%",
    "category": "Medicamentos",
    "description": "octalbin sol iny 25",
    "substance": "octalbin-sol-iny-25",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 700.0,
    "regularPrice": 3500.0,
    "price": 1050.0,
    "discountPrice": 1050.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T122835.996.jpg?v=1767048283",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf125",
    "sku": "GF125",
    "name": "OHRENCIA 125MG/ML JPRELL CAJ C/4",
    "category": "Medicamentos",
    "description": "ohrencia 125mg ml jprell caj c 4",
    "substance": "ohrencia-125mg-ml-jprell-caj-c-4",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 15050.0,
    "regularPrice": 22849.0,
    "price": 15350.0,
    "discountPrice": 15350.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T123241.313.jpg?v=1767048282",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf126",
    "sku": "GF126",
    "name": "OPDIVO SOL. INY. 100MG/ 10 ML",
    "category": "Medicamentos",
    "description": "opdivo sol iny 100mg 10 ml",
    "substance": "opdivo-sol-iny-100mg-10-ml",
    "expiresAt": "2028-12-31",
    "stock": 15,
    "minStock": 2,
    "maxStock": 15,
    "cost": 7600.0,
    "regularPrice": 44845.0,
    "price": 7925.0,
    "discountPrice": 7925.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T124941.370.jpg?v=1767048281",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf127",
    "sku": "GF127",
    "name": "PERJETA 420MG/14ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "perjeta 420mg 14ml",
    "substance": "perjeta-420mg-14ml",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 9550.0,
    "regularPrice": 94365.0,
    "price": 10050.0,
    "discountPrice": 10050.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T125502.695.jpg?v=1767048280",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf128",
    "sku": "GF128",
    "name": "PEYONA 20 MG SOL 10 FCO 1 ML",
    "category": "Medicamentos",
    "description": "peyona 20 mg sol 10 fco 1 ml",
    "substance": "peyona-20-mg-sol-10-fco-1-ml",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 5900.0,
    "regularPrice": 7507.0,
    "price": 6900.0,
    "discountPrice": 6900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T130150.189.jpg?v=1767048279",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf129",
    "sku": "GF129",
    "name": "POSCIROL 1 MG 28 TABLETAS.",
    "category": "Medicamentos",
    "description": "poscirol 1 mg 28 tabletas",
    "substance": "poscirol-1-mg-28-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 14,
    "minStock": 2,
    "maxStock": 14,
    "cost": 750.0,
    "regularPrice": 1186.0,
    "price": 900.0,
    "discountPrice": 900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T141110.238.jpg?v=1767048278",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf131",
    "sku": "GF131",
    "name": "PROLIA 60 MG/ML SOL INY NACIONAL (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "prolia 60 mg ml sol iny nacional",
    "substance": "prolia-60-mg-ml-sol-iny-nacional",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 8500.0,
    "regularPrice": 10550.0,
    "price": 9800.0,
    "discountPrice": 9800.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T142144.839.jpg?v=1767048276",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf132",
    "sku": "GF132",
    "name": "PROLIA SOL INY. 60 MG IMPORTACIIN (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "prolia sol iny 60 mg importacion",
    "substance": "prolia-sol-iny-60-mg-importacion",
    "expiresAt": "2028-12-31",
    "stock": 230,
    "minStock": 10,
    "maxStock": 230,
    "cost": 4000.0,
    "regularPrice": 11620.0,
    "price": 5100.0,
    "discountPrice": 5100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T142711.554.jpg?v=1767048274",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf133",
    "sku": "GF133",
    "name": "PULMOZYME SOL 2.5MG/2.5 ML C/6 AMP. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "pulmozyme sol 2 5mg 2 5 ml c 6 amp",
    "substance": "pulmozyme-sol-2-5mg-2-5-ml-c-6-amp",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 2850.0,
    "regularPrice": 9708.0,
    "price": 3125.0,
    "discountPrice": 3125.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T143318.682.jpg?v=1767048273",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf134",
    "sku": "GF134",
    "name": "RECOFOL PISA 200 MG/ 20 ML",
    "category": "Medicamentos",
    "description": "recofol pisa 200 mg 20 ml",
    "substance": "recofol-pisa-200-mg-20-ml",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 600.0,
    "regularPrice": 2250.0,
    "price": 950.0,
    "discountPrice": 950.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T143957.326.jpg?v=1767048273",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf135",
    "sku": "GF135",
    "name": "RENEGY 500MG/10ML IMPORTADO",
    "category": "Medicamentos",
    "description": "renegy 500mg 10ml importado",
    "substance": "renegy-500mg-10ml-importado",
    "expiresAt": "2028-12-31",
    "stock": 120,
    "minStock": 10,
    "maxStock": 120,
    "cost": 2200.0,
    "regularPrice": 5026.0,
    "price": 3342.57,
    "discountPrice": 3342.57,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-11T145355.864.jpg?v=1767048271",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf136",
    "sku": "GF136",
    "name": "REPATHA 140MG/ML. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "repatha 140mg ml",
    "substance": "repatha-140mg-ml",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 1700.0,
    "regularPrice": 5917.0,
    "price": 2000.0,
    "discountPrice": 2000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T145054.778.jpg?v=1767048270",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf137",
    "sku": "GF137",
    "name": "REVOLADE 50MG TAB CAJ C/28",
    "category": "Medicamentos",
    "description": "revolade 50mg tab caj c 28",
    "substance": "revolade-50mg-tab-caj-c-28",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 15100.0,
    "regularPrice": 27613.0,
    "price": 15500.0,
    "discountPrice": 15500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T145627.175.jpg?v=1767048269",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf138",
    "sku": "GF138",
    "name": "RIFOSAR 800MG TAB CAJ C/180",
    "category": "Medicamentos",
    "description": "rifosar 800mg tab caj c 180",
    "substance": "rifosar-800mg-tab-caj-c-180",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1900.0,
    "regularPrice": 3585.0,
    "price": 2250.0,
    "discountPrice": 2250.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T150333.384.jpg?v=1767048268",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf139",
    "sku": "GF139",
    "name": "SANDIMMUN NEORAL 100 MG",
    "category": "Medicamentos",
    "description": "sandimmun neoral 100 mg",
    "substance": "sandimmun-neoral-100-mg",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 5600.0,
    "regularPrice": 9818.0,
    "price": 5925.0,
    "discountPrice": 5925.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T150834.056.jpg?v=1767048267",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf140",
    "sku": "GF140",
    "name": "SANDOSTATINA LAR 20MG FAM CAJ C/1 (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "sandostatina lar 20mg fam caj c 1",
    "substance": "sandostatina-lar-20mg-fam-caj-c-1",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 5100.0,
    "regularPrice": 36751.0,
    "price": 5440.0,
    "discountPrice": 5440.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T151259.056.jpg?v=1767048266",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf141",
    "sku": "GF141",
    "name": "SERETIDE DISKUS 50/100 60 DOSIS",
    "category": "Medicamentos",
    "description": "seretide diskus 50 100 60 dosis",
    "substance": "seretide-diskus-50-100-60-dosis",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 600.0,
    "regularPrice": 890.0,
    "price": 700.0,
    "discountPrice": 700.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T152044.576.jpg?v=1767048264",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf142",
    "sku": "GF142",
    "name": "SKEMCA 500MG TAB CAJ C/120",
    "category": "Medicamentos",
    "description": "skemca 500mg tab caj c 120",
    "substance": "skemca-500mg-tab-caj-c-120",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 3600.0,
    "regularPrice": 13574.0,
    "price": 4000.0,
    "discountPrice": 4000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T153436.621.jpg?v=1767048263",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf145",
    "sku": "GF145",
    "name": "SUPLASYN 1-SHOT 60MG/6ML SOL JPRELL",
    "category": "Medicamentos",
    "description": "suplasyn 1 shot 60mg 6ml sol jprell",
    "substance": "suplasyn-1-shot-60mg-6ml-sol-jprell",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 2000.0,
    "regularPrice": 7107.0,
    "price": 4000.0,
    "discountPrice": 4000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_1_edf90bbb-a944-43f4-88f4-ff1efeb6c326.jpg?v=1767048260",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf146",
    "sku": "GF146",
    "name": "SYNVISC ONE G-F 20 JGA PRELL 6ML",
    "category": "Medicamentos",
    "description": "synvisc one g f 20 jga prell 6ml",
    "substance": "synvisc-one-g-f-20-jga-prell-6ml",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 9000.0,
    "regularPrice": 13070.0,
    "price": 9350.0,
    "discountPrice": 9350.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/SYNVISCONEG-F20JERINGA6M.jpg?v=1767048259",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf147",
    "sku": "GF147",
    "name": "SYNVISC SOL. INY. 8 MG JGA. PRE. 2ML",
    "category": "Medicamentos",
    "description": "synvisc sol iny 8 mg jga pre 2ml",
    "substance": "synvisc-sol-iny-8-mg-jga-pre-2ml",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 1500.0,
    "regularPrice": 4515.0,
    "price": 2200.0,
    "discountPrice": 2200.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T162012.015.jpg?v=1767048258",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf148",
    "sku": "GF148",
    "name": "TAGRISSO 80MG TAB CAJ C/30",
    "category": "Medicamentos",
    "description": "tagrisso 80mg tab caj c 30",
    "substance": "tagrisso-80mg-tab-caj-c-30",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 50100.0,
    "regularPrice": 172615.0,
    "price": 51350.0,
    "discountPrice": 51350.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T162610.047.jpg?v=1767048257",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf149",
    "sku": "GF149",
    "name": "TECENTRIQ 1200MG / 20ML (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "tecentriq 1200mg 20ml",
    "substance": "tecentriq-1200mg-20ml",
    "expiresAt": "2028-12-31",
    "stock": 13,
    "minStock": 2,
    "maxStock": 13,
    "cost": 45050.0,
    "regularPrice": 124959.0,
    "price": 45400.0,
    "discountPrice": 45400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/Tecentriq.png?v=1767048256",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf150",
    "sku": "GF150",
    "name": "TRANSTEC 30MG PCHES CAJ C/4",
    "category": "Medicamentos",
    "description": "transtec 30mg pches caj c 4",
    "substance": "transtec-30mg-pches-caj-c-4",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 1850.0,
    "regularPrice": 3732.0,
    "price": 3000.0,
    "discountPrice": 3000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T163648.838.jpg?v=1767048255",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf151",
    "sku": "GF151",
    "name": "TRAYENTA LINAGLIPTINA 5 MG C/30.",
    "category": "Medicamentos",
    "description": "trayenta linagliptina 5 mg c 30",
    "substance": "trayenta-linagliptina-5-mg-c-30",
    "expiresAt": "2028-12-31",
    "stock": 300,
    "minStock": 10,
    "maxStock": 300,
    "cost": 700.0,
    "regularPrice": 2063.0,
    "price": 1250.0,
    "discountPrice": 1250.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T164320.326.jpg?v=1767048254",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf152",
    "sku": "GF152",
    "name": "TRAZIMERA 440 MG. 1 AMP.(RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "trazimera 440 mg 1 amp",
    "substance": "trazimera-440-mg-1-amp",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 9100.0,
    "regularPrice": 41843.0,
    "price": 9400.0,
    "discountPrice": 9400.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T164635.766.jpg?v=1767048253",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf154",
    "sku": "GF154",
    "name": "VERZENIO 150 MG 56 TABLETAS.",
    "category": "Medicamentos",
    "description": "verzenio 150 mg 56 tabletas",
    "substance": "verzenio-150-mg-56-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 60100.0,
    "regularPrice": 84343.0,
    "price": 60515.0,
    "discountPrice": 60515.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T165725.737.jpg?v=1767048250",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf156",
    "sku": "GF156",
    "name": "VINCRISTINA 1MG",
    "category": "Medicamentos",
    "description": "vincristina 1mg",
    "substance": "vincristina-1mg",
    "expiresAt": "2028-12-31",
    "stock": 40,
    "minStock": 4,
    "maxStock": 40,
    "cost": 650.0,
    "regularPrice": 1800.0,
    "price": 1025.0,
    "discountPrice": 1025.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/vinlon-1mg-injection.jpg?v=1767048248",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf157",
    "sku": "GF157",
    "name": "XARELTO 10 MG C/30.",
    "category": "Medicamentos",
    "description": "xarelto 10 mg c 30",
    "substance": "xarelto-10-mg-c-30",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 800.0,
    "regularPrice": 2667.0,
    "price": 1100.0,
    "discountPrice": 1100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/Xarelto_30_comprimidoss.png?v=1767048247",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf158",
    "sku": "GF158",
    "name": "XARELTO 15 MG C/28 COMP.",
    "category": "Medicamentos",
    "description": "xarelto 15 mg c 28 comp 1",
    "substance": "xarelto-15-mg-c-28-comp-1",
    "expiresAt": "2028-12-31",
    "stock": 13,
    "minStock": 2,
    "maxStock": 13,
    "cost": 1000.0,
    "regularPrice": 2947.0,
    "price": 1300.0,
    "discountPrice": 1300.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-28T172123.774.jpg?v=1767048246",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf159",
    "sku": "GF159",
    "name": "EXETIN-A SOL. INY 6 FCO 4000 UI/1 ML. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "exetin a sol iny 6 fco 4000 ui 1 ml",
    "substance": "exetin-a-sol-iny-6-fco-4000-ui-1-ml",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 900.0,
    "regularPrice": 1684.0,
    "price": 1350.0,
    "discountPrice": 1350.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T124809.822.jpg?v=1767048245",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf160",
    "sku": "GF160",
    "name": "XERENDIP SOMATROPINA 4 UI SOL INY (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "xerendip somatropina 4 ui sol iny",
    "substance": "xerendip-somatropina-4-ui-sol-iny",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 400.0,
    "regularPrice": 780.0,
    "price": 550.0,
    "discountPrice": 550.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-29T092504.824.jpg?v=1767048244",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf161",
    "sku": "GF161",
    "name": "LANTUS SOL INY 100U (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "lantus sol iny 100u red fria",
    "substance": "lantus-sol-iny-100u-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 40,
    "minStock": 4,
    "maxStock": 40,
    "cost": 800.0,
    "regularPrice": 2269.0,
    "price": 1300.0,
    "discountPrice": 1300.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T151944.370.jpg?v=1767048243",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf162",
    "sku": "GF162",
    "name": "XGEVA 120 MG/ 1.7 ML INY. (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "xgeva 120 mg 1 7 ml iny red fria",
    "substance": "xgeva-120-mg-1-7-ml-iny-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 11,
    "minStock": 2,
    "maxStock": 11,
    "cost": 8550.0,
    "regularPrice": 10831.0,
    "price": 8900.0,
    "discountPrice": 8900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-29T114003.997.jpg?v=1767048242",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf163",
    "sku": "GF163",
    "name": "ELIGARD 22.5 MG SOL INY.( RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "eligard 22 5 mg sol iny red fria",
    "substance": "eligard-22-5-mg-sol-iny-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 2250.0,
    "regularPrice": 18162.0,
    "price": 2525.0,
    "discountPrice": 2525.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-29T114657.617.jpg?v=1767048239",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf164",
    "sku": "GF164",
    "name": "ROACTEMRA 200 MG/10 ML FCO AMP",
    "category": "Medicamentos",
    "description": "roactemra 200 mg 10 ml fco amp",
    "substance": "roactemra-200-mg-10-ml-fco-amp",
    "expiresAt": "2028-12-31",
    "stock": 13,
    "minStock": 2,
    "maxStock": 13,
    "cost": 5050.0,
    "regularPrice": 11703.0,
    "price": 5340.0,
    "discountPrice": 5340.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-29T115628.458.jpg?v=1767048238",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf165",
    "sku": "GF165",
    "name": "OFEV 150MG CAP CAJ C/60",
    "category": "Medicamentos",
    "description": "ofev 150mg cap caj c 60",
    "substance": "ofev-150mg-cap-caj-c-60",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 16050.0,
    "regularPrice": 87620.0,
    "price": 16350.0,
    "discountPrice": 16350.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-07-29T124355.467.jpg?v=1767048236",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf166",
    "sku": "GF166",
    "name": "XOLAIR 150 MG  C/2ML (RED FRIA )",
    "category": "Vacunas y red fr\u00eda",
    "description": "xolair 150 mg c 2ml red fria",
    "substance": "xolair-150-mg-c-2ml-red-fria",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 3700.0,
    "regularPrice": 11806.0,
    "price": 4040.0,
    "discountPrice": 4040.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject.jpg?v=1767048235",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf167",
    "sku": "GF167",
    "name": "ENTRESTO 50 MG 30 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "entresto 50 mg 30 comprimidos",
    "substance": "entresto-50-mg-30-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 80,
    "minStock": 8,
    "maxStock": 80,
    "cost": 1100.0,
    "regularPrice": 1730.0,
    "price": 1500.0,
    "discountPrice": 1500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_2.jpg?v=1767048233",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf168",
    "sku": "GF168",
    "name": "ARANESP 60 MCG/0.3 ML 4 JERINGAS PRELLENADAS (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "aranesp 60 mcg 0 3 ml 4 jeringas prellenadas",
    "substance": "aranesp-60-mcg-0-3-ml-4-jeringas-prellenadas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 8000.0,
    "regularPrice": 9995.0,
    "price": 8750.0,
    "discountPrice": 8750.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_3.jpg?v=1767048232",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf169",
    "sku": "GF169",
    "name": "MIRENA 52 MG DISPOSITIVO INTRAUTERINO",
    "category": "Medicamentos",
    "description": "mirena 52 mg dispositivo intrauterino",
    "substance": "mirena-52-mg-dispositivo-intrauterino",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 2500.0,
    "regularPrice": 5137.0,
    "price": 4500.0,
    "discountPrice": 4500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_6.jpg?v=1767048230",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf171",
    "sku": "GF171",
    "name": "HI-BUMIN 20% 50 ML SOLUC INYEC.",
    "category": "Medicamentos",
    "description": "hi bumin 20 50 ml soluc inyec",
    "substance": "hi-bumin-20-50-ml-soluc-inyec",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 850.0,
    "regularPrice": 2100.0,
    "price": 1100.0,
    "discountPrice": 1100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T161017.526.jpg?v=1767048228",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf172",
    "sku": "GF172",
    "name": "KEDRIALB ALBUMINA HUMANA 50 ML 25%",
    "category": "Medicamentos",
    "description": "kedrialb albumina humana 50 ml 25",
    "substance": "kedrialb-albumina-humana-50-ml-25",
    "expiresAt": "2028-12-31",
    "stock": 11,
    "minStock": 2,
    "maxStock": 11,
    "cost": 900.0,
    "regularPrice": 2035.0,
    "price": 1225.0,
    "discountPrice": 1225.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T163927.955.jpg?v=1767048226",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf173",
    "sku": "GF173",
    "name": "ACXION AP LIBERACION PROLONGADA 30 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "acxion ap liberacion prolongada 30 mg 30 tabletas",
    "substance": "acxion-ap-liberacion-prolongada-30-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 620.5,
    "regularPrice": 800.0,
    "price": 647.48,
    "discountPrice": 647.48,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_13_598e78bb-b7a1-4eff-b26a-e456ac1d4b9c.jpg?v=1767048226",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf174",
    "sku": "GF174",
    "name": "ACXION C 15 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "acxion c 15 mg 30 capsulas",
    "substance": "acxion-c-15-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 8,
    "minStock": 1,
    "maxStock": 8,
    "cost": 222.58,
    "regularPrice": 450.0,
    "price": 232.26,
    "discountPrice": 232.26,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_15.jpg?v=1767048225",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf175",
    "sku": "GF175",
    "name": "ADEPSIQUE 10/3/2 MG 30 TABLETAS RX.",
    "category": "Controlados",
    "description": "adepsique 10 3 2 mg 30 tabletas rx",
    "substance": "adepsique-10-3-2-mg-30-tabletas-rx",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 422.76,
    "regularPrice": 640.0,
    "price": 441.14,
    "discountPrice": 441.14,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_14.jpg?v=1767048223",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf176",
    "sku": "GF176",
    "name": "ADEPSIQUE 10/3/2 MG 90 TABLETAS RX.",
    "category": "Controlados",
    "description": "adepsique 10 3 2 mg 90 tabletas rx",
    "substance": "adepsique-10-3-2-mg-90-tabletas-rx",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 971.4,
    "regularPrice": 2050.0,
    "price": 1013.64,
    "discountPrice": 1013.64,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_16.jpg?v=1767048223",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf177",
    "sku": "GF177",
    "name": "ALPRAZOLAM 2.0 MG 30 TABLETAS GENARICO INV FARMA",
    "category": "Controlados",
    "description": "alprazolam 2 0 mg 30 tabletas generico inv farma",
    "substance": "alprazolam-2-0-mg-30-tabletas-generico-inv-farma",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 312.08,
    "regularPrice": 700.0,
    "price": 425.0,
    "discountPrice": 425.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T103949.552.jpg?v=1767048221",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf178",
    "sku": "GF178",
    "name": "ALPRAZOLAM 2MG C/30 TABLETAS GENARICO PSICOFARMA",
    "category": "Controlados",
    "description": "alprazolam 2mg c 30 tabletas generico psicofarma",
    "substance": "alprazolam-2mg-c-30-tabletas-generico-psicofarma",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 314.09,
    "regularPrice": 520.0,
    "price": 327.75,
    "discountPrice": 327.75,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_18.jpg?v=1767048220",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf179",
    "sku": "GF179",
    "name": "ALPRAZOLAM IF 0.25 MG 30 TABLETAS GENARICO INV FAR",
    "category": "Controlados",
    "description": "alprazolam if 0 25 mg 30 tabletas generico inv far",
    "substance": "alprazolam-if-0-25-mg-30-tabletas-generico-inv-far",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 93.79,
    "regularPrice": 200.0,
    "price": 97.87,
    "discountPrice": 97.87,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_19.jpg?v=1767048219",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf180",
    "sku": "GF180",
    "name": "ALZAM 0.25 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "alzam 0 25 mg 30 tabletas",
    "substance": "alzam-0-25-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 235.93,
    "regularPrice": 360.0,
    "price": 246.19,
    "discountPrice": 246.19,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_20.jpg?v=1767048218",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf181",
    "sku": "GF181",
    "name": "ALZAM 0.50 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "alzam 0 50 mg 30 tabletas",
    "substance": "alzam-0-50-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 301.2,
    "regularPrice": 450.0,
    "price": 314.3,
    "discountPrice": 314.3,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_21_c3b5ae2a-da11-4322-a297-494b90a8ac29.jpg?v=1767048217",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf182",
    "sku": "GF182",
    "name": "ALZAM 0.50 MG 90 TABLETAS",
    "category": "Medicamentos",
    "description": "alzam 0 50 mg 90 tabletas",
    "substance": "alzam-0-50-mg-90-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 709.65,
    "regularPrice": 950.0,
    "price": 740.5,
    "discountPrice": 740.5,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_22_db7d6180-0540-4c02-a3e1-c4ec8cd996b5.jpg?v=1767048216",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf183",
    "sku": "GF183",
    "name": "ALZAM 2 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "alzam 2 mg 30 tabletas",
    "substance": "alzam-2-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 669.56,
    "regularPrice": 840.0,
    "price": 698.67,
    "discountPrice": 698.67,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_24.jpg?v=1767048215",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf184",
    "sku": "GF184",
    "name": "ALZAM ALPRAZOLAM 0.25 MG 30 TABLETAS GENARICO PSIC",
    "category": "Controlados",
    "description": "alzam alprazolam 0 25 mg 30 tabletas generico psic",
    "substance": "alzam-alprazolam-0-25-mg-30-tabletas-generico-psic",
    "expiresAt": "2028-12-31",
    "stock": 60,
    "minStock": 6,
    "maxStock": 60,
    "cost": 93.75,
    "regularPrice": 250.0,
    "price": 175.0,
    "discountPrice": 175.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_25.jpg?v=1767048213",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf185",
    "sku": "GF185",
    "name": "ANAPSIQUE 25 MG 50 TABLETAS",
    "category": "Medicamentos",
    "description": "anapsique 25 mg 50 tabletas",
    "substance": "anapsique-25-mg-50-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 479.09,
    "regularPrice": 650.0,
    "price": 499.92,
    "discountPrice": 499.92,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_26.jpg?v=1767048212",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf186",
    "sku": "GF186",
    "name": "ANAPSIQUE 50 MG 20 TABLETAS",
    "category": "Medicamentos",
    "description": "anapsique 50 mg 20 tabletas",
    "substance": "anapsique-50-mg-20-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 391.19,
    "regularPrice": 690.0,
    "price": 408.2,
    "discountPrice": 408.2,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_27.jpg?v=1767048211",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf187",
    "sku": "GF187",
    "name": "ANZANERA 0.1 MG ORODISPERSABLE FRASCO 250 TABLETAS",
    "category": "Medicamentos",
    "description": "anzanera 0 1 mg orodispersable frasco 250 tabletas 1",
    "substance": "anzanera-0-1-mg-orodispersable-frasco-250-tabletas-1",
    "expiresAt": "2028-12-31",
    "stock": 30,
    "minStock": 3,
    "maxStock": 30,
    "cost": 537.61,
    "regularPrice": 670.0,
    "price": 562.05,
    "discountPrice": 562.05,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_29_f41aa87d-4d71-472c-be13-aed3fbed505f.jpg?v=1767048209",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf188",
    "sku": "GF188",
    "name": "ASENLIX 30 MG 60 CAPSULAS",
    "category": "Medicamentos",
    "description": "asenlix 30 mg 60 capsulas 1",
    "substance": "asenlix-30-mg-60-capsulas-1",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 2100.0,
    "regularPrice": 3500.0,
    "price": 2300.0,
    "discountPrice": 2300.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_30_791c79ee-2911-45e0-b46c-c04a6c4d80c4.jpg?v=1767048208",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf189",
    "sku": "GF189",
    "name": "BROMAZEPAM 3 MG 30 TABLETAS GENARICO INV FARMA",
    "category": "Medicamentos",
    "description": "bromazepam 3 mg 30 tabletas generico inv farma 1",
    "substance": "bromazepam-3-mg-30-tabletas-generico-inv-farma-1",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 127.92,
    "regularPrice": 180.0,
    "price": 139.05,
    "discountPrice": 139.05,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_31.jpg?v=1767048207",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf190",
    "sku": "GF190",
    "name": "BROSPINA 0.3 MG 6 AMPOLLETA 1 ML",
    "category": "Medicamentos",
    "description": "brospina 0 3 mg 6 ampolleta 1 ml",
    "substance": "brospina-0-3-mg-6-ampolleta-1-ml",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 590.0,
    "regularPrice": 950.0,
    "price": 750.0,
    "discountPrice": 750.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_32.jpg?v=1767048206",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf191",
    "sku": "GF191",
    "name": "BUFIGEN FRASCO AMPULA 100MG/10 ML",
    "category": "Medicamentos",
    "description": "bufigen frasco ampula 100mg 10 ml",
    "substance": "bufigen-frasco-ampula-100mg-10-ml",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 580.0,
    "regularPrice": 900.0,
    "price": 600.0,
    "discountPrice": 600.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_33_7fee628e-696d-43d0-bab5-79e4e1f3a3e5.jpg?v=1767048205",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf192",
    "sku": "GF192",
    "name": "CARBOLIT LP 300 MG 50 TAB RX.",
    "category": "Controlados",
    "description": "carbolit lp 300 mg 50 tab rx",
    "substance": "carbolit-lp-300-mg-50-tab-rx",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 487.81,
    "regularPrice": 750.0,
    "price": 500.0,
    "discountPrice": 500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_34.jpg?v=1767048203",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf193",
    "sku": "GF193",
    "name": "CLONAZEPAM 2 MG 30 TABLETAS GENARICO INV FARMA",
    "category": "Controlados",
    "description": "clonazepam 2 mg 30 tabletas generico inv farma",
    "substance": "clonazepam-2-mg-30-tabletas-generico-inv-farma",
    "expiresAt": "2028-12-31",
    "stock": 100,
    "minStock": 10,
    "maxStock": 100,
    "cost": 78.17,
    "regularPrice": 210.0,
    "price": 81.57,
    "discountPrice": 81.57,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_35.jpg?v=1767048202",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf194",
    "sku": "GF194",
    "name": "CLONAZEPAM 2 MG 30 TABLETAS GENARICO PSICOFARMA",
    "category": "Controlados",
    "description": "clonazepam 2 mg 30 tabletas generico psicofarma",
    "substance": "clonazepam-2-mg-30-tabletas-generico-psicofarma",
    "expiresAt": "2028-12-31",
    "stock": 90,
    "minStock": 9,
    "maxStock": 90,
    "cost": 55.0,
    "regularPrice": 150.0,
    "price": 80.0,
    "discountPrice": 80.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_36.jpg?v=1767048201",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf195",
    "sku": "GF195",
    "name": "CLONAZEPAM SOLUCIIN 2.5 MG/ML CAJA CON FRASCO GOTE",
    "category": "Controlados",
    "description": "clonazepam solucion 2 5 mg ml caja con frasco gote",
    "substance": "clonazepam-solucion-2-5-mg-ml-caja-con-frasco-gote",
    "expiresAt": "2028-12-31",
    "stock": 110,
    "minStock": 10,
    "maxStock": 110,
    "cost": 88.0,
    "regularPrice": 230.0,
    "price": 110.0,
    "discountPrice": 110.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_37.jpg?v=1767048200",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf196",
    "sku": "GF196",
    "name": "CLOPSINE 100 MG 50 TABLETAS",
    "category": "Medicamentos",
    "description": "clopsine 100 mg 50 tabletas",
    "substance": "clopsine-100-mg-50-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1134.92,
    "regularPrice": 2500.0,
    "price": 1155.56,
    "discountPrice": 1155.56,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_38.jpg?v=1767048199",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf197",
    "sku": "GF197",
    "name": "CONCERTA 18 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "concerta 18 mg 30 tabletas",
    "substance": "concerta-18-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 1439.0,
    "regularPrice": 3000.0,
    "price": 1508.85,
    "discountPrice": 1508.85,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_39.jpg?v=1767048197",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf198",
    "sku": "GF198",
    "name": "CONCERTA 27 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "concerta 27 mg 30 tabletas",
    "substance": "concerta-27-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1662.92,
    "regularPrice": 2400.0,
    "price": 1692.52,
    "discountPrice": 1692.52,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_40.jpg?v=1767048196",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf199",
    "sku": "GF199",
    "name": "CONCERTA 36 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "concerta 36 mg 30 tabletas",
    "substance": "concerta-36-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1774.87,
    "regularPrice": 2900.0,
    "price": 1897.6,
    "discountPrice": 1897.6,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_41.jpg?v=1767048195",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf200",
    "sku": "GF200",
    "name": "CONCERTA 54 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "concerta 54 mg 30 tabletas",
    "substance": "concerta-54-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1959.46,
    "regularPrice": 3200.0,
    "price": 1998.0,
    "discountPrice": 1998.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_42.jpg?v=1767048194",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf201",
    "sku": "GF201",
    "name": "ERGOCAF 1/100 MG 20 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "ergocaf 1 100 mg 20 comprimidos",
    "substance": "ergocaf-1-100-mg-20-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 14,
    "minStock": 2,
    "maxStock": 14,
    "cost": 500.0,
    "regularPrice": 1000.0,
    "price": 510.0,
    "discountPrice": 510.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_43.jpg?v=1767048192",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf202",
    "sku": "GF202",
    "name": "ESBELCAPS 20/6 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "esbelcaps 20 6 mg 30 capsulas",
    "substance": "esbelcaps-20-6-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 986.29,
    "regularPrice": 1800.0,
    "price": 996.89,
    "discountPrice": 996.89,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T112324.241.jpg?v=1767048191",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf203",
    "sku": "GF203",
    "name": "FARMAPRAM 0.25 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "farmapram 0 25 mg 30 tabletas",
    "substance": "farmapram-0-25-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 11,
    "minStock": 2,
    "maxStock": 11,
    "cost": 213.77,
    "regularPrice": 360.0,
    "price": 223.49,
    "discountPrice": 223.49,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_45.jpg?v=1767048190",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf204",
    "sku": "GF204",
    "name": "FARMAPRAM 0.50 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "farmapram 0 50 mg 30 tabletas",
    "substance": "farmapram-0-50-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 282.42,
    "regularPrice": 420.0,
    "price": 299.0,
    "discountPrice": 299.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_46.jpg?v=1767048189",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf205",
    "sku": "GF205",
    "name": "FARMAPRAM 1 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "farmapram 1 mg 30 tabletas",
    "substance": "farmapram-1-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 510.5,
    "regularPrice": 855.0,
    "price": 529.22,
    "discountPrice": 529.22,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_47.jpg?v=1767048187",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf206",
    "sku": "GF206",
    "name": "FENABBOTT 100 MG 40 TABLETAS",
    "category": "Medicamentos",
    "description": "fenabbott 100 mg 40 tabletas",
    "substance": "fenabbott-100-mg-40-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 465.05,
    "regularPrice": 640.0,
    "price": 484.0,
    "discountPrice": 484.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_49.jpg?v=1767048186",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf207",
    "sku": "GF207",
    "name": "HERBANE 0.3 MG SOLUCION INYECTABLE 6 AMPOLLETAS 1",
    "category": "Medicamentos",
    "description": "herbane 0 3 mg solucion inyectable 6 ampolletas 1",
    "substance": "herbane-0-3-mg-solucion-inyectable-6-ampolletas-1",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 439.9,
    "regularPrice": 600.0,
    "price": 459.89,
    "discountPrice": 459.89,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_48_bf4fe1b9-8f4e-48f3-8eba-ec260c455478.jpg?v=1767048185",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf208",
    "sku": "GF208",
    "name": "IFA ACXION 15 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "ifa acxion 15 mg 30 tabletas",
    "substance": "ifa-acxion-15-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 21,
    "minStock": 3,
    "maxStock": 21,
    "cost": 278.71,
    "regularPrice": 420.0,
    "price": 286.17,
    "discountPrice": 286.17,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_50.jpg?v=1767048184",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf209",
    "sku": "GF209",
    "name": "IFA ACXION 30 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "ifa acxion 30 mg 30 tabletas",
    "substance": "ifa-acxion-30-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 429.72,
    "regularPrice": 590.0,
    "price": 448.4,
    "discountPrice": 448.4,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_51.jpg?v=1767048182",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf210",
    "sku": "GF210",
    "name": "KRIADEX 2 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "kriadex 2 mg 30 tabletas",
    "substance": "kriadex-2-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 356.79,
    "regularPrice": 500.0,
    "price": 373.01,
    "discountPrice": 373.01,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_52.jpg?v=1767048179",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf211",
    "sku": "GF211",
    "name": "KRIADEX 2 MG 60 TABLETAS",
    "category": "Medicamentos",
    "description": "kriadex 2 mg 60 tabletas",
    "substance": "kriadex-2-mg-60-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 575.42,
    "regularPrice": 870.0,
    "price": 585.88,
    "discountPrice": 585.88,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_53.jpg?v=1767048178",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf212",
    "sku": "GF212",
    "name": "CLONAZEPAM 2.5MG/1ML LGEN",
    "category": "Controlados",
    "description": "kriadex clonazepam 2 5 mg 1 ml frasco 10 ml generico",
    "substance": "kriadex-clonazepam-2-5-mg-1-ml-frasco-10-ml-generico",
    "expiresAt": "2028-12-31",
    "stock": 230,
    "minStock": 10,
    "maxStock": 230,
    "cost": 75.0,
    "regularPrice": 230.0,
    "price": 110.0,
    "discountPrice": 110.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T144012.650.jpg?v=1767048176",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf213",
    "sku": "GF213",
    "name": "LEPTOPSIQUE 4 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "leptopsique 4 mg 30 tabletas",
    "substance": "leptopsique-4-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 298.68,
    "regularPrice": 410.0,
    "price": 304.16,
    "discountPrice": 304.16,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_55.jpg?v=1767048174",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf214",
    "sku": "GF214",
    "name": "LERTUS CD 50/50 MG 20 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "lertus cd 50 50 mg 20 comprimidos",
    "substance": "lertus-cd-50-50-mg-20-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 60,
    "minStock": 6,
    "maxStock": 60,
    "cost": 1025.25,
    "regularPrice": 1220.0,
    "price": 1062.88,
    "discountPrice": 1062.88,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_56.jpg?v=1767048173",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf215",
    "sku": "GF215",
    "name": "LEXOTAN 3 MG 100 TABLETAS",
    "category": "Medicamentos",
    "description": "lexotan 3 mg 100 tabletas",
    "substance": "lexotan-3-mg-100-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1207.16,
    "regularPrice": 1390.0,
    "price": 1239.5,
    "discountPrice": 1239.5,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_57.jpg?v=1767048171",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf216",
    "sku": "GF216",
    "name": "LEXOTAN 3 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "lexotan 3 mg 30 tabletas",
    "substance": "lexotan-3-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 440.67,
    "regularPrice": 760.0,
    "price": 455.47,
    "discountPrice": 455.47,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_58.jpg?v=1767048170",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf217",
    "sku": "GF217",
    "name": "LEXOTAN 6 MG 100 TABLETAS",
    "category": "Medicamentos",
    "description": "lexotan 6 mg 100 tabletas",
    "substance": "lexotan-6-mg-100-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1990.97,
    "regularPrice": 2200.0,
    "price": 2044.1,
    "discountPrice": 2044.1,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_59.jpg?v=1767048168",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf218",
    "sku": "GF218",
    "name": "LOZAM 1 MG 40 TABLETAS",
    "category": "Medicamentos",
    "description": "lozam 1 mg 40 tabletas",
    "substance": "lozam-1-mg-40-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 434.93,
    "regularPrice": 610.0,
    "price": 442.91,
    "discountPrice": 442.91,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_60.jpg?v=1767048167",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf219",
    "sku": "GF219",
    "name": "LOZAM 2 MG 40 TABLETAS",
    "category": "Medicamentos",
    "description": "lozam 2 mg 40 tabletas",
    "substance": "lozam-2-mg-40-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 786.04,
    "regularPrice": 950.0,
    "price": 793.25,
    "discountPrice": 793.25,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_61.jpg?v=1767048166",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf220",
    "sku": "GF220",
    "name": "LOZAM 2 MG 80 TABLETAS",
    "category": "Medicamentos",
    "description": "lozam 2 mg 80 tabletas",
    "substance": "lozam-2-mg-80-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 1314.36,
    "regularPrice": 1400.0,
    "price": 1338.26,
    "discountPrice": 1338.26,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_62.jpg?v=1767048164",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf221",
    "sku": "GF221",
    "name": "MEDLEY CLONAZEPAM 2 MG 30 TABLETAS GENARICO SANOFI",
    "category": "Controlados",
    "description": "medley clonazepam 2 mg 30 tabletas generico sanofi",
    "substance": "medley-clonazepam-2-mg-30-tabletas-generico-sanofi",
    "expiresAt": "2028-12-31",
    "stock": 100,
    "minStock": 10,
    "maxStock": 100,
    "cost": 59.0,
    "regularPrice": 150.0,
    "price": 65.5,
    "discountPrice": 65.5,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_63.jpg?v=1767048163",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf222",
    "sku": "GF222",
    "name": "METILFENIDATO 10 MG 60 TABLETAS GENARICO PSICOFARM",
    "category": "Medicamentos",
    "description": "metilfenidato 10 mg 60 tabletas generico psicofarm",
    "substance": "metilfenidato-10-mg-60-tabletas-generico-psicofarm",
    "expiresAt": "2028-12-31",
    "stock": 260,
    "minStock": 10,
    "maxStock": 260,
    "cost": 295.0,
    "regularPrice": 460.0,
    "price": 320.0,
    "discountPrice": 320.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_64.jpg?v=1767048162",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf223",
    "sku": "GF223",
    "name": "MIDAZOLAM SOMNOCAL 5 MG/5 ML SOLUCION INYECTABLE 5",
    "category": "Medicamentos",
    "description": "midazolam somnocal 5 mg 5 ml solucion inyectable 5",
    "substance": "midazolam-somnocal-5-mg-5-ml-solucion-inyectable-5",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 509.93,
    "regularPrice": 690.0,
    "price": 533.11,
    "discountPrice": 533.11,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_65.jpg?v=1767048161",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf225",
    "sku": "GF225",
    "name": "NEOBES 75 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "neobes 75 mg 30 capsulas",
    "substance": "neobes-75-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 620.71,
    "regularPrice": 870.0,
    "price": 637.79,
    "discountPrice": 637.79,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_67.jpg?v=1767048158",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf226",
    "sku": "GF226",
    "name": "NEOTREX 10 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "neotrex 10 mg 30 capsulas",
    "substance": "neotrex-10-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 782.28,
    "regularPrice": 1010.0,
    "price": 803.91,
    "discountPrice": 803.91,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_68.jpg?v=1767048157",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf227",
    "sku": "GF227",
    "name": "NOCTE 10 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "nocte 10 mg 30 tabletas",
    "substance": "nocte-10-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1310.0,
    "regularPrice": 1490.0,
    "price": 1390.0,
    "discountPrice": 1390.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_69.jpg?v=1767048156",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf228",
    "sku": "GF228",
    "name": "NUMENCIAL 50 / 2.5 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "numencial 50 2 5 mg 30 tabletas",
    "substance": "numencial-50-2-5-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 500.0,
    "regularPrice": 680.0,
    "price": 535.0,
    "discountPrice": 535.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_70.jpg?v=1767048154",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf229",
    "sku": "GF229",
    "name": "ORTOPSIQUE DIAZEPAM 10 MG 20 TABLETAS GENARICO PSI",
    "category": "Controlados",
    "description": "ortopsique diazepam 10 mg 20 tabletas generico psi",
    "substance": "ortopsique-diazepam-10-mg-20-tabletas-generico-psi",
    "expiresAt": "2028-12-31",
    "stock": 90,
    "minStock": 9,
    "maxStock": 90,
    "cost": 45.0,
    "regularPrice": 100.0,
    "price": 60.0,
    "discountPrice": 60.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_71.jpg?v=1767048153",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf230",
    "sku": "GF230",
    "name": "OTEDRAM BROMAZEPAM 3 MG 30 TABLETAS GENARICO PSICO",
    "category": "Medicamentos",
    "description": "otedram bromazepam 3 mg 30 tabletas generico psico",
    "substance": "otedram-bromazepam-3-mg-30-tabletas-generico-psico",
    "expiresAt": "2028-12-31",
    "stock": 110,
    "minStock": 10,
    "maxStock": 110,
    "cost": 140.0,
    "regularPrice": 240.0,
    "price": 165.0,
    "discountPrice": 165.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_72.jpg?v=1767048152",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf231",
    "sku": "GF231",
    "name": "PANAZECLOX 2.5 MG/ML GOTERO CON PIPETA 10 ML",
    "category": "Medicamentos",
    "description": "panazeclox 2 5 mg ml gotero con pipeta 10 ml",
    "substance": "panazeclox-2-5-mg-ml-gotero-con-pipeta-10-ml",
    "expiresAt": "2028-12-31",
    "stock": 18,
    "minStock": 2,
    "maxStock": 18,
    "cost": 160.0,
    "regularPrice": 260.0,
    "price": 180.0,
    "discountPrice": 180.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_73.jpg?v=1767048151",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf232",
    "sku": "GF232",
    "name": "PISALPRA 0.50 MG 30 TABLETAS",
    "category": "Controlados",
    "description": "pisalpra 0 50 mg 30 tabletas",
    "substance": "pisalpra-0-50-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 215.01,
    "regularPrice": 350.0,
    "price": 230.77,
    "discountPrice": 230.77,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_74.jpg?v=1767048150",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf233",
    "sku": "GF233",
    "name": "RELACUM 15 MG SOLUCIIN INYECTABLE 5 AMPOLLETAS 3 MG",
    "category": "Medicamentos",
    "description": "relacum 15 mg solucion inyectable 5 ampolletas 3 m",
    "substance": "relacum-15-mg-solucion-inyectable-5-ampolletas-3-m",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1319.19,
    "regularPrice": 1500.0,
    "price": 1434.07,
    "discountPrice": 1434.07,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_75.jpg?v=1767048148",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf234",
    "sku": "GF234",
    "name": "RIVOTRIL 2 MG 30 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "rivotril 2 mg 30 comprimidos",
    "substance": "rivotril-2-mg-30-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 8,
    "minStock": 1,
    "maxStock": 8,
    "cost": 727.3,
    "regularPrice": 950.0,
    "price": 750.0,
    "discountPrice": 750.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_76.jpg?v=1767048147",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf235",
    "sku": "GF235",
    "name": "SOLORO 7 10 MG 4 PARCHES",
    "category": "Medicamentos",
    "description": "soloro 7 10 mg 4 parches",
    "substance": "soloro-7-10-mg-4-parches",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1950.0,
    "regularPrice": 2800.0,
    "price": 2000.0,
    "discountPrice": 2000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_78.jpg?v=1767048145",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf236",
    "sku": "GF236",
    "name": "SOLORO 7 5 MG 4 PARCHES",
    "category": "Medicamentos",
    "description": "soloro 7 5 mg 4 parches",
    "substance": "soloro-7-5-mg-4-parches",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1420.0,
    "regularPrice": 1850.0,
    "price": 1450.0,
    "discountPrice": 1450.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_79.jpg?v=1767048144",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf237",
    "sku": "GF237",
    "name": "SOLUCAPS 2 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "solucaps 2 mg 30 capsulas",
    "substance": "solucaps-2-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 450.0,
    "regularPrice": 620.0,
    "price": 475.0,
    "discountPrice": 475.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_81.jpg?v=1767048143",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf238",
    "sku": "GF238",
    "name": "STELABID 1/5 MG 25 TABLETAS",
    "category": "Medicamentos",
    "description": "stelabid 1 5 mg 25 tabletas",
    "substance": "stelabid-1-5-mg-25-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 22,
    "minStock": 3,
    "maxStock": 22,
    "cost": 540.48,
    "regularPrice": 800.0,
    "price": 585.23,
    "discountPrice": 585.23,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_83.jpg?v=1767048142",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf239",
    "sku": "GF239",
    "name": "STILNOX 10 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "stilnox 10 mg 30 tabletas",
    "substance": "stilnox-10-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 8,
    "minStock": 1,
    "maxStock": 8,
    "cost": 1835.0,
    "regularPrice": 2400.0,
    "price": 1900.0,
    "discountPrice": 1900.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T122436.487.jpg?v=1767048140",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf240",
    "sku": "GF240",
    "name": "STILNOX CR 12.5 MG 28 TABLETAS",
    "category": "Medicamentos",
    "description": "stilnox cr 12 5 mg 28 tabletas",
    "substance": "stilnox-cr-12-5-mg-28-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1879.5,
    "regularPrice": 2050.0,
    "price": 1949.47,
    "discountPrice": 1949.47,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_85.jpg?v=1767048139",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf241",
    "sku": "GF241",
    "name": "SYDOLIL 1/50/400 MG 36 TABLETAS",
    "category": "Medicamentos",
    "description": "sydolil 1 50 400 mg 36 tabletas",
    "substance": "sydolil-1-50-400-mg-36-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 720.0,
    "regularPrice": 960.0,
    "price": 785.0,
    "discountPrice": 785.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_87.jpg?v=1767048138",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf242",
    "sku": "GF242",
    "name": "TAFIL 0.25 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "tafil 0 25 mg 30 tabletas",
    "substance": "tafil-0-25-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 450.0,
    "regularPrice": 680.0,
    "price": 470.0,
    "discountPrice": 470.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_88.jpg?v=1767048137",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf243",
    "sku": "GF243",
    "name": "TAFIL 0.5 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "tafil 0 5 mg 30 tabletas",
    "substance": "tafil-0-5-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 580.0,
    "regularPrice": 860.0,
    "price": 620.0,
    "discountPrice": 620.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_89.jpg?v=1767048135",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf244",
    "sku": "GF244",
    "name": "TAFIL 1 MG 90 TABLETAS",
    "category": "Medicamentos",
    "description": "tafil 1 mg 90 tabletas",
    "substance": "tafil-1-mg-90-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1980.0,
    "regularPrice": 2300.0,
    "price": 2050.0,
    "discountPrice": 2050.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_90.jpg?v=1767048134",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf245",
    "sku": "GF245",
    "name": "TRADEA 10 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "tradea 10 mg 30 tabletas",
    "substance": "tradea-10-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 360.85,
    "regularPrice": 480.0,
    "price": 375.89,
    "discountPrice": 375.89,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_92.jpg?v=1767048133",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf246",
    "sku": "GF246",
    "name": "TRADEA 10 MG 60 TABLETAS",
    "category": "Medicamentos",
    "description": "tradea 10 mg 60 tabletas",
    "substance": "tradea-10-mg-60-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 600.0,
    "regularPrice": 890.0,
    "price": 674.22,
    "discountPrice": 674.22,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_93.jpg?v=1767048132",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf247",
    "sku": "GF247",
    "name": "TRADEA LP 54 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "tradea lp 54 mg 30 tabletas",
    "substance": "tradea-lp-54-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 1090.0,
    "regularPrice": 1500.0,
    "price": 1135.0,
    "discountPrice": 1135.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_94.jpg?v=1767048131",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf248",
    "sku": "GF248",
    "name": "TREVISSAGE 20 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "trevissage 20 mg 30 capsulas",
    "substance": "trevissage-20-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1142.25,
    "regularPrice": 1350.0,
    "price": 1194.17,
    "discountPrice": 1194.17,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_96.jpg?v=1767048129",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf251",
    "sku": "GF251",
    "name": "VASTIONIN 20 MG 30 CAPSULAS",
    "category": "Medicamentos",
    "description": "vastionin 20 mg 30 capsulas",
    "substance": "vastionin-20-mg-30-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1320.12,
    "regularPrice": 1530.0,
    "price": 1370.15,
    "discountPrice": 1370.15,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_99.jpg?v=1767048125",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf252",
    "sku": "GF252",
    "name": "VENTURA CLASICA AMITRIPTILINA 25 MG CAJA CON 20 TA",
    "category": "Medicamentos",
    "description": "ventura clasica amitriptilina 25 mg caja con 20 ta",
    "substance": "ventura-clasica-amitriptilina-25-mg-caja-con-20-ta",
    "expiresAt": "2028-12-31",
    "stock": 70,
    "minStock": 7,
    "maxStock": 70,
    "cost": 240.0,
    "regularPrice": 420.0,
    "price": 290.0,
    "discountPrice": 290.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject_100.jpg?v=1767048124",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf253",
    "sku": "GF253",
    "name": "VICTAN 2 MG BLCSTER 30 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "victan 2 mg blister 30 comprimidos",
    "substance": "victan-2-mg-blister-30-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1150.0,
    "regularPrice": 1400.0,
    "price": 1150.0,
    "discountPrice": 1150.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-01T101406.721.jpg?v=1767048123",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf254",
    "sku": "GF254",
    "name": "BUFIGEN 10 MG 5 AMPOLLETAS 1 ML",
    "category": "Medicamentos",
    "description": "bufigen 10 mg 5 ampolletas 1 ml",
    "substance": "bufigen-10-mg-5-ampolletas-1-ml",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 350.0,
    "regularPrice": 800.0,
    "price": 450.0,
    "discountPrice": 450.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-02T091804.563.jpg?v=1767048121",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf255",
    "sku": "GF255",
    "name": "CLOPSINE 25 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "clopsine 25 mg 30 tabletas",
    "substance": "clopsine-25-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 276.6,
    "regularPrice": 360.0,
    "price": 286.6,
    "discountPrice": 286.6,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-02T093850.683.jpg?v=1767048121",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf257",
    "sku": "GF257",
    "name": "TRADEA LP 20 MG 30 TABLETAS",
    "category": "Medicamentos",
    "description": "tradea lp 20 mg 30 tabletas",
    "substance": "tradea-lp-20-mg-30-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 810.0,
    "regularPrice": 950.0,
    "price": 857.0,
    "discountPrice": 857.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-02T115748.637.jpg?v=1767048118",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf258",
    "sku": "GF258",
    "name": "ACXION C 30 MG 30 CAPSULAS RX.",
    "category": "Controlados",
    "description": "acxion c 30 mg 30 capsulas rx",
    "substance": "acxion-c-30-mg-30-capsulas-rx",
    "expiresAt": "2028-12-31",
    "stock": 7,
    "minStock": 1,
    "maxStock": 7,
    "cost": 408.82,
    "regularPrice": 600.0,
    "price": 426.6,
    "discountPrice": 426.6,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-05T102904.650.jpg?v=1767048117",
    "type": "Receta medica",
    "requiresRecipe": true,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf262",
    "sku": "GF262",
    "name": "OLUMIANT 4 MG 28 TABLETAS",
    "category": "Medicamentos",
    "description": "olumiant 4 mg 28 tabletas",
    "substance": "olumiant-4-mg-28-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 11,
    "minStock": 2,
    "maxStock": 11,
    "cost": 10000.0,
    "regularPrice": 25399.0,
    "price": 14000.0,
    "discountPrice": 14000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0726/0055/1615/files/UntitledProject-2025-08-06T122621.111.jpg?v=1767048112",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf263",
    "sku": "GF263",
    "name": "DYSPORT 500UI (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "botox 1000UI inyectable red fr\u00eda",
    "substance": "botox-1000UI-inyectable-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 4500.0,
    "regularPrice": 6500.0,
    "price": 5500.0,
    "discountPrice": 5500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/397-Dysport-500u-1.png?v=1773766081",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf264",
    "sku": "GF264",
    "name": "BOTOX 100UI IMPORTADO (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "botox 1000UI inyectable red fr\u00eda",
    "substance": "botox-1000UI-inyectable-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 3800.0,
    "regularPrice": 7800.0,
    "price": 5000.0,
    "discountPrice": 5000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/BOTOX100UI.jpg?v=1775496402",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf265",
    "sku": "GF265",
    "name": "LECTRUM 11.25 MG INYECTABLE",
    "category": "Medicamentos",
    "description": "leuprorelina 11.25 mg inyectable",
    "substance": "leuprorelina-11.25-mg-inyectable",
    "expiresAt": "2028-12-31",
    "stock": 8,
    "minStock": 1,
    "maxStock": 8,
    "cost": 6100.0,
    "regularPrice": 8000.0,
    "price": 6500.0,
    "discountPrice": 6500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/lectrum11.25mg.jpg?v=1775496362",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf266",
    "sku": "GF266",
    "name": "MOUNJARO 2.5MG C/4 DOSIS IMPORTADO",
    "category": "Vacunas y red fr\u00eda",
    "description": "tirzapatida 2.5 mg inyectable",
    "substance": "tirzapatida-2.5-mg-inyectable",
    "expiresAt": "2028-12-31",
    "stock": 4,
    "minStock": 1,
    "maxStock": 4,
    "cost": 5500.0,
    "regularPrice": 7800.0,
    "price": 6500.0,
    "discountPrice": 6500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/MOUNJARO25.jpg?v=1775493425",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf267",
    "sku": "GF267",
    "name": "GARDASIL 9/ 1 DOSIS (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "gardasil 9 frasco ampula red fr\u00eda",
    "substance": "gardasil-9-frasco-ampula-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 1700.0,
    "regularPrice": 3000.0,
    "price": 2500.0,
    "discountPrice": 2500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/gardasil9_1dosis.jpg?v=1775496210",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf268",
    "sku": "GF268",
    "name": "GARDASIL 9/ 10 DOSIS (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "gardasil 9 frasco ampula red fr\u00eda",
    "substance": "gardasil-9-frasco-ampula-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 6700.0,
    "regularPrice": 9000.0,
    "price": 7700.0,
    "discountPrice": 7700.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/images.jpg?v=1775493993",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf269",
    "sku": "GF269",
    "name": "ULONICO 4MG/5ML SOL INY FAM C/1",
    "category": "Medicamentos",
    "description": "\u00e1cido zoledr\u00f3nico inyectable",
    "substance": "\u00e1cido-zoledr\u00f3nico-inyectable",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 750.0,
    "regularPrice": 2000.0,
    "price": 1000.0,
    "discountPrice": 1000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/ulonico.jpg?v=1775494120",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf270",
    "sku": "GF270",
    "name": "\u00c1CIDO TRANEX\u00c1MICO SOL. INY IMPORTADO",
    "category": "Medicamentos",
    "description": "\u00e1cido tranex\u00e1mico soluci\u00f3n 100 mg sol inyectable",
    "substance": "\u00e1cido-tranex\u00e1mico-soluci\u00f3n-100-mg-sol-inyectable",
    "expiresAt": "2028-12-31",
    "stock": 10,
    "minStock": 1,
    "maxStock": 10,
    "cost": 1150.0,
    "regularPrice": 5000.0,
    "price": 3500.0,
    "discountPrice": 3500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/tranexacan-inj-5ml.jpg?v=1775494541",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf271",
    "sku": "GF271",
    "name": "CICLOFOSFAMIDA SOL. INY 500MG (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "cyclophosphamide soluci\u00f3n inyectable 500 mg red fr\u00eda",
    "substance": "cyclophosphamide-soluci\u00f3n-inyectable-500-mg-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 9,
    "minStock": 1,
    "maxStock": 9,
    "cost": 1150.0,
    "regularPrice": 2000.0,
    "price": 1500.0,
    "discountPrice": 1500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/CICLO.jpg?v=1775494676",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf272",
    "sku": "GF272",
    "name": "CICLOFOSFAMIDA SOL. INY 1G (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "cyclophosphamide soluci\u00f3n inyectable 1 g red fr\u00eda",
    "substance": "cyclophosphamide-soluci\u00f3n-inyectable-1-g-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 12,
    "minStock": 2,
    "maxStock": 12,
    "cost": 2000.0,
    "regularPrice": 5000.0,
    "price": 3300.0,
    "discountPrice": 3300.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/CICLO1G.jpg?v=1775494940",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf273",
    "sku": "GF273",
    "name": "ELICUIS 2.5 MG 60 TAB",
    "category": "Medicamentos",
    "description": "apixab\u00e1n 2.5 mg 60 tabletas",
    "substance": "apixab\u00e1n-2.5-mg-60-tabletas",
    "expiresAt": "2028-12-31",
    "stock": 15,
    "minStock": 2,
    "maxStock": 15,
    "cost": 1500.0,
    "regularPrice": 3400.0,
    "price": 2500.0,
    "discountPrice": 2500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/elicuis25mg60tabs.jpg?v=1775495024",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf274",
    "sku": "GF274",
    "name": "DANAZOL 100MG/ IMPORTADO",
    "category": "Medicamentos",
    "description": "danazol 100 mg importado capsulas",
    "substance": "danazol-100-mg-importado-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 1500.0,
    "regularPrice": 3000.0,
    "price": 2500.0,
    "discountPrice": 2500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/danazol100mg.jpg?v=1775495092",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf275",
    "sku": "GF275",
    "name": "DANAZOL 200MG/ IMPORTADO",
    "category": "Medicamentos",
    "description": "danazol 200 mg importado capsulas",
    "substance": "danazol-200-mg-importado-capsulas",
    "expiresAt": "2028-12-31",
    "stock": 15,
    "minStock": 2,
    "maxStock": 15,
    "cost": 1800.0,
    "regularPrice": 5800.0,
    "price": 3500.0,
    "discountPrice": 3500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/DANAZOL200MG.jpg?v=1775495136",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf276",
    "sku": "GF276",
    "name": "OPDIVO 40MG/4ML FAM CAJ C/1 (RED FRIA)",
    "category": "Vacunas y red fr\u00eda",
    "description": "nivolumab 40 mg 4 ml inyectable red fr\u00eda",
    "substance": "nivolumab-40-mg-4-ml-inyectable-red-fr\u00eda",
    "expiresAt": "2028-12-31",
    "stock": 20,
    "minStock": 2,
    "maxStock": 20,
    "cost": 8000.0,
    "regularPrice": 18000.0,
    "price": 12000.0,
    "discountPrice": 12000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/opdivo40g.jpg?v=1775495199",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf277",
    "sku": "GF277",
    "name": "KITOSCELL-Q GEL 120G",
    "category": "Medicamentos",
    "description": "gel tubo fenil metil piridona 120 g",
    "substance": "gel-tubo-fenil-metil-piridona-120-g",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1200.0,
    "regularPrice": 2900.0,
    "price": 2500.0,
    "discountPrice": 2500.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/kitocellq.jpg?v=1775495343",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf278",
    "sku": "GF278",
    "name": "ONCO BCG 40 MG/ML",
    "category": "Vacunas y red fr\u00eda",
    "description": "bacilus calmette guerin 40 mg ml inyectable",
    "substance": "bacilus-calmette-guerin-40-mg-ml-inyectable",
    "expiresAt": "2028-12-31",
    "stock": 1,
    "minStock": 1,
    "maxStock": 2,
    "cost": 1900.0,
    "regularPrice": 3800.0,
    "price": 3000.0,
    "discountPrice": 3000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/ONCOBCG.jpg?v=1775496034",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf279",
    "sku": "GF279",
    "name": "MVASI 400MG/SOL FCO AMP CAJ C/1",
    "category": "Medicamentos",
    "description": "bevacizumab 400 mg 1 ampula",
    "substance": "bevacizumab-400-mg-1-ampula",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 12000.0,
    "regularPrice": 40475.46,
    "price": 25000.0,
    "discountPrice": 25000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/mvasi.jpg?v=1775495463",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf280",
    "sku": "GF280",
    "name": "KISQALI 200MG/ COM C/63",
    "category": "Medicamentos",
    "description": "ribociclib 200 mg 63 comprimidos",
    "substance": "ribociclib-200-mg-63-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 3,
    "minStock": 1,
    "maxStock": 3,
    "cost": 17000.0,
    "regularPrice": 101534.0,
    "price": 5000.0,
    "discountPrice": 5000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/KISQALI200MG..jpg?v=1775496448",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf281",
    "sku": "GF281",
    "name": "XARELTO 2.5MG C/56 COMPRIMIDOS",
    "category": "Medicamentos",
    "description": "rivaroxab\u00e1n 2.5 mg 56 comprimidos",
    "substance": "rivaroxab\u00e1n-2.5-mg-56-comprimidos",
    "expiresAt": "2028-12-31",
    "stock": 5,
    "minStock": 1,
    "maxStock": 5,
    "cost": 1600.0,
    "regularPrice": 2700.0,
    "price": 2100.0,
    "discountPrice": 2100.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/xarelto2.5mg.png?v=1775496482",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  },
  {
    "id": "prod-gf282",
    "sku": "GF282",
    "name": "ARASAMILA 500MG / 50ML",
    "category": "Vacunas y red fr\u00eda",
    "description": "rituximab 500 mg 50 ml inyectable 1 ampula",
    "substance": "rituximab-500-mg-50-ml-inyectable-1-ampula",
    "expiresAt": "2028-12-31",
    "stock": 2,
    "minStock": 1,
    "maxStock": 2,
    "cost": 9000.0,
    "regularPrice": 30311.09,
    "price": 20000.0,
    "discountPrice": 20000.0,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0773/1308/1592/files/ARASAMILA.jpg?v=1775495579",
    "type": "Venta libre",
    "requiresRecipe": false,
    "iva": false,
    "status": "Activo"
  }
];

const initialCustomers = [
  {
    id: "cust-laura",
    name: "Laura Martinez",
    phone: "81 2200 1840",
    email: "laura@email.com",
    address: "Monterrey, NL",
    city: "Monterrey",
    state: "Nuevo León",
    country: "México",
    customerType: "Frecuente",
    contactPreference: "WhatsApp",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cust-nuevo-leon",
    name: "Paciente Nuevo Leon",
    phone: "81 1500 9000",
    email: "paciente@correo.com",
    address: "San Nicolas, NL",
    city: "San Nicolás de los Garza",
    state: "Nuevo León",
    country: "México",
    customerType: "General",
    contactPreference: "Correo",
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const initialCommercialProfiles = [
  {
    id: "prof-general",
    name: "General",
    minPurchase: 0,
    minPieces: 0,
    suggestedDiscount: 0,
    creditAllowed: false,
    suggestedCreditLimit: null,
    notes: "Cliente estándar sin condiciones especiales.",
  },
  {
    id: "prof-frecuente",
    name: "Frecuente",
    minPurchase: 500,
    minPieces: 0,
    suggestedDiscount: 5,
    creditAllowed: false,
    suggestedCreditLimit: null,
    notes: "Cliente recurrente con compras frecuentes.",
  },
  {
    id: "prof-mayorista",
    name: "Mayorista",
    minPurchase: 2000,
    minPieces: 10,
    suggestedDiscount: 10,
    creditAllowed: true,
    suggestedCreditLimit: 5000,
    notes: "Compra mínima $2,000 o 10 piezas.",
  },
  {
    id: "prof-medico",
    name: "Médico / clínica",
    minPurchase: 0,
    minPieces: 0,
    suggestedDiscount: 8,
    creditAllowed: true,
    suggestedCreditLimit: 3000,
    notes: "Profesional de la salud o clínica con convenio.",
  },
  {
    id: "prof-convenio",
    name: "Convenio",
    minPurchase: 1000,
    minPieces: 0,
    suggestedDiscount: 12,
    creditAllowed: true,
    suggestedCreditLimit: 8000,
    notes: "Empresa o institución con convenio activo.",
  },
];

function normalizeCommercialProfile(profile = {}) {
  return {
    id: profile.id || createId("prof"),
    name: String(profile.name || "").trim() || "Perfil sin nombre",
    minPurchase: toNumber(profile.minPurchase) || 0,
    minPieces: Math.max(0, Math.round(toNumber(profile.minPieces) || 0)),
    suggestedDiscount: Math.min(100, Math.max(0, toNumber(profile.suggestedDiscount) || 0)),
    creditAllowed: Boolean(profile.creditAllowed),
    suggestedCreditLimit:
      profile.suggestedCreditLimit != null && profile.suggestedCreditLimit !== ""
        ? toNumber(profile.suggestedCreditLimit)
        : null,
    notes: profile.notes || "",
  };
}

function getCommercialProfileByName(name) {
  const target = String(name || "").trim().toLowerCase();
  if (!target) return null;
  return (
    state.commercialProfiles.find((profile) => profile.name.trim().toLowerCase() === target) || null
  );
}

function getCommercialProfileById(id) {
  return state.commercialProfiles.find((profile) => profile.id === id) || null;
}

function buildCustomerAddress(customer, fallbackAddress = "") {
  const parts = [
    [customer.street, customer.streetNumber].filter(Boolean).join(" ").trim(),
    customer.addressLine2,
    customer.neighborhood,
    [customer.postalCode, customer.city].filter(Boolean).join(" ").trim(),
    customer.state,
    customer.country,
  ].filter((part) => String(part || "").trim());
  const composed = parts.join(", ");
  return composed || String(fallbackAddress || customer.address || "").trim();
}

function normalizeCustomer(customer = {}) {
  const rawNotes = String(customer.internalNotes || "").trim();
  const legacyParts = [customer.alertsRestrictions, customer.allergies]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const internalNotes = rawNotes || legacyParts.join("\n");

  const normalized = {
    id: customer.id,
    name: customer.name || "",
    phone: customer.phone || "",
    email: customer.email || "",
    active: customer.active !== false,
    createdAt: customer.createdAt || new Date().toISOString(),
    street: customer.street || "",
    streetNumber: customer.streetNumber || "",
    addressLine2: customer.addressLine2 || "",
    postalCode: customer.postalCode || "",
    neighborhood: customer.neighborhood || "",
    city: customer.city || "",
    state: customer.state || "",
    country: customer.country || "México",
    customerType: String(customer.customerType || "General").trim() || "General",
    discountPercent: toNumber(customer.discountPercent) || 0,
    creditLimit:
      customer.creditLimit != null && customer.creditLimit !== "" ? toNumber(customer.creditLimit) : null,
    rfc: customer.rfc || "",
    internalNotes,
    contactPreference: customer.contactPreference || "WhatsApp",
  };
  normalized.address = buildCustomerAddress(normalized, customer.address);
  return normalized;
}

function getActiveCustomers(customers = state.customers) {
  return (Array.isArray(customers) ? customers : []).filter((customer) => customer.active !== false);
}

function getCustomerSearchText(customer) {
  return [
    customer.name,
    customer.phone,
    customer.email,
    customer.address,
    customer.street,
    customer.city,
    customer.customerType,
    customer.rfc,
  ]
    .join(" ")
    .toLowerCase();
}

function getCustomerOrderStats(customerId) {
  const orders = state.orders.filter((order) => order.customerId === customerId);
  const total = orders.reduce((sum, order) => sum + toNumber(order.total), 0);
  let lastOrder = null;
  orders.forEach((order) => {
    if (!lastOrder || new Date(order.createdAt) > new Date(lastOrder.createdAt)) lastOrder = order;
  });
  return { orders, total, lastOrder };
}

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
  products: [],
  customers: readJSON(storageKeys.customers, initialCustomers).map(normalizeCustomer),
  commercialProfiles: readJSON(storageKeys.commercialProfiles, initialCommercialProfiles).map(
    normalizeCommercialProfile,
  ),
  orders: readJSON(storageKeys.orders, []),
  payments: readJSON(storageKeys.payments, []),
  shipments: readJSON(storageKeys.shipments, []),
  sales: readJSON(storageKeys.sales, []),
  conversations: [],
  settings: readJSON(storageKeys.settings, {
    storeLink: "https://mixteko.github.io/Minifarmacia/",
    businessPhone: "5218112345678",
    welcomeMessage:
      "Gracias por visitar MASTER CRM. Puedes comprar en esta liga: {{liga}}. Registrate para guardar tus datos de entrega y dar seguimiento a tu pedido.",
  }),
  storeCart: [],
  productQuery: "",
  customerQuery: "",
  storeQuery: "",
  storeCategory: "Todas",
  conversationQuery: "",
  selectedConversationId: "",
  usingRealConversations: false,
  lastConversationsUpdate: "",
  renderedConversationId: "",
  renderedMessageSignature: "",
  productLoadError: "",
  inventoryQuery: "",
  inventoryCategory: "",
  inventoryLaboratory: "",
  inventoryStatus: "",
  categories: [],
  classifications: [],
  categoryQuery: "",
  classificationQuery: "",
  categoryLoadError: "",
  categoryCapabilities: { parentId: false, visibleInStore: false },
  selectedParentCategoryId: "",
  classificationLoadError: "",
  productsSection: "products-list",
  expirationFilter: null,
  csvImportSession: null,
  stockAdjustmentAction: "add",
  stockAdjustmentMode: "existing",
  stockAdjustmentProductId: null,
  orderQuery: "",
  orderStatusFilter: "",
  saleQuery: "",
  saleStatusFilter: "",
  saleRangeFilter: "all",
  saleDateFrom: "",
  saleDateTo: "",
};

const EXPIRATION_FILTER_LABELS = {
  red: "Rojo / 0 días / vencidos",
  orange: "Naranja / 15 días",
  yellow: "Amarillo / 1 mes",
  green: "Verde / 2 meses",
  blue: "Azul / 3 meses",
  noAlert: "Sin alerta",
};

const conversationsApiUrl = "https://minifarmacia.onrender.com/api/conversations";

// Backend local (Node en localhost:3090): /api/*. Otros dominios: backend remoto.
function usesLocalNodeBackend() {
  const host = window.location.hostname;
  const isLocalhost = host === "localhost" || host === "127.0.0.1";
  return isLocalhost && window.location.port === "3090";
}

function resolveLocalApiPath(path) {
  return usesLocalNodeBackend() ? path : `https://minifarmacia.onrender.com${path}`;
}

const productsApiUrl = resolveLocalApiPath("/api/products");
const productLotsApiUrl = resolveLocalApiPath("/api/product-lots");
const inventoryAdjustApiUrl = resolveLocalApiPath("/api/inventory/adjust");
const inventoryMovementsApiUrl = resolveLocalApiPath("/api/inventory/movements");
const inventoryLotsApiUrl = resolveLocalApiPath("/api/inventory/lots");
const productImageUploadUrl = resolveLocalApiPath("/api/uploads/product-image");
const categoriesApiUrl = resolveLocalApiPath("/api/categories");
const classificationsApiUrl = resolveLocalApiPath("/api/classifications");

const viewTitles = {
  dashboard: "Dashboard",
  whatsapp: "WhatsApp",
  tienda: "Tienda online",
  clientes: "Clientes",
  pedidos: "Pedidos",
  productos: "Productos",
  categorias: "Categorías",
  clasificaciones: "Clasificaciones",
  ventas: "Ventas",
  envios: "Envíos",
  cobros: "Cobros",
  inventario: "Inventario",
  "product-form": "Producto",
  "customer-form": "Cliente",
  pagos: "Pagos",
  canales: "Canales",
  "whatsapp-manager": "WhatsApp Manager",
  configuracion: "Configuración",
};

const productsSectionTitles = {
  "products-list": "Lista de productos",
  "products-inventory": "Inventario",
  "products-categories": "Categorías",
  "products-classifications": "Clasificaciones",
  "products-import-export": "Importar / Exportar",
};

const viewDescriptions = {
  dashboard: "Resumen operativo de pedidos, ventas, inventario y alertas del negocio.",
  clientes: "Registra clientes, consulta su historial y mantén datos de contacto actualizados.",
  pedidos: "Gestiona pedidos de tienda, WhatsApp, teléfono y mostrador.",
  ventas: "Historial económico: totales vendidos, cobrados, pendientes y ganancia estimada.",
  pagos: "Controla cobros pendientes y métodos de pago.",
  envios: "Seguimiento de entregas locales y nacionales.",
  canales: "Tienda online y puntos de venta digital.",
  "whatsapp-manager": "Atiende conversaciones y automatiza respuestas de WhatsApp.",
  configuracion: "Plantillas y personalización del negocio.",
  whatsapp: "Atiende conversaciones y automatiza respuestas de WhatsApp.",
  cobros: "Controla cobros pendientes y métodos de pago.",
  tienda: "Tienda online y puntos de venta digital.",
  productos: "Administra catálogo, stock y reglas comerciales.",
  "product-form": "Formulario de alta y edición de producto.",
  "customer-form": "Registra y actualiza datos de contacto, envío y perfil comercial del cliente.",
};

const productsSectionDescriptions = {
  "products-list": "Consulta, filtra y administra el catálogo de productos activos.",
  "products-inventory": "Consulta existencias, lotes, caducidades y valor del inventario.",
  "products-categories": "Define tipos de producto y controla su visibilidad en tienda.",
  "products-classifications": "Define cómo debe manejarse cada producto en farmacia.",
  "products-import-export": "Respaldá o actualizá tu catálogo en lote mediante archivos CSV.",
};

const viewAliases = {
  pagos: "cobros",
  canales: "tienda",
  "whatsapp-manager": "whatsapp",
  inventario: { view: "productos", productsSection: "products-inventory" },
  productos: { view: "productos", productsSection: "products-list" },
  categorias: { view: "productos", productsSection: "products-categories" },
  clasificaciones: { view: "productos", productsSection: "products-classifications" },
  "importar-exportar": { view: "productos", productsSection: "products-import-export" },
};

const PRODUCT_CSV_EXPORT_COLUMNS = [
  "sku",
  "nombre",
  "descripcion",
  "categoria",
  "clasificacion",
  "laboratorio",
  "precio_venta",
  "precio_promocional",
  "costo",
  "stock",
  "lote",
  "caducidad",
  "imagen_url",
  "estado",
];

const PRODUCT_IMPORT_EDITABLE_FIELDS = [
  { field: "sku", label: "SKU" },
  { field: "name", label: "Nombre" },
  { field: "description", label: "Descripción" },
  { field: "category", label: "Categoría" },
  { field: "classification", label: "Clasificación" },
  { field: "laboratory", label: "Laboratorio" },
  { field: "precio_venta", label: "Precio venta" },
  { field: "precio_promocional", label: "Precio promo" },
  { field: "cost", label: "Costo" },
  { field: "stock", label: "Stock" },
  { field: "lot", label: "Lote" },
  { field: "caducidad", label: "Caducidad" },
  { field: "imagen_url", label: "Imagen URL" },
  { field: "estado", label: "Estado", type: "status" },
];

const STOCK_ADJUST_ACTION_COPY = {
  add: {
    help: "Agregar aumenta el stock actual. Úsalo cuando recibas mercancía nueva o quieras sumar piezas al inventario.",
    example: (current, quantity, next) =>
      `Ejemplo: stock actual ${current} + agregar ${quantity} = nuevo stock ${next}.`,
  },
  subtract: {
    help: "Descontar reduce el stock actual. Úsalo para ventas manuales, mermas, caducados, daños o faltantes.",
    example: (current, quantity, next) =>
      `Ejemplo: stock actual ${current} - descontar ${quantity} = nuevo stock ${next}.`,
  },
  replace: {
    help: "Reemplazar cambia el stock actual por una cantidad exacta. Úsalo cuando hagas conteo físico o corrección administrativa.",
    example: (current, quantity, next) =>
      `Ejemplo: stock actual ${current}, reemplazar por ${quantity} = nuevo stock ${next}.`,
  },
};

const ORDER_STATUS_META = {
  nuevo: { label: "Nuevo", badge: "info" },
  por_cobrar: { label: "Por cobrar", badge: "warning" },
  cobrado: { label: "Cobrado", badge: "success" },
  por_enviar: { label: "Por enviar", badge: "info" },
  por_retirar: { label: "Por retirar", badge: "info" },
  enviado: { label: "Enviado", badge: "info" },
  completado: { label: "Completado", badge: "success" },
  cancelado: { label: "Cancelado", badge: "danger" },
};

const ORDER_STATUS_FILTERS = [
  "",
  "nuevo",
  "por_cobrar",
  "cobrado",
  "por_enviar",
  "por_retirar",
  "enviado",
  "completado",
  "cancelado",
];

const ORDER_FILTER_LABELS = {
  "": "Todos",
  nuevo: "Nuevos",
  por_cobrar: "Por cobrar",
  cobrado: "Cobrados",
  por_enviar: "Por enviar",
  por_retirar: "Por retirar",
  enviado: "Enviados",
  completado: "Completados",
  cancelado: "Cancelados",
};

const ORDER_FILTER_EMPTY_MESSAGES = {
  "": "No hay pedidos registrados. Usa «Crear pedido» para agregar uno.",
  nuevo: "No hay pedidos nuevos",
  por_cobrar: "No hay pedidos por cobrar",
  cobrado: "No hay pedidos cobrados",
  por_enviar: "No hay pedidos por enviar",
  por_retirar: "No hay pedidos por retirar",
  enviado: "No hay pedidos enviados",
  completado: "No hay pedidos completados",
  cancelado: "No hay pedidos cancelados",
};

const FLOW_ALLOWED_STATUSES = {
  mostrador_direct: ["nuevo", "por_cobrar", "cobrado", "completado", "cancelado"],
  mostrador_pickup: ["nuevo", "por_cobrar", "cobrado", "por_retirar", "completado", "cancelado"],
  shipping: ["nuevo", "por_cobrar", "cobrado", "por_enviar", "enviado", "completado", "cancelado"],
  pickup: ["nuevo", "por_cobrar", "cobrado", "por_retirar", "completado", "cancelado"],
};

const ORDER_ORIGIN_LABELS = {
  tienda_en_linea: "Tienda en línea",
  whatsapp: "WhatsApp",
  telefono: "Teléfono",
  mostrador: "Mostrador",
  manual: "Manual",
};

const SALE_STATUS_META = {
  por_cobrar: { label: "Por cobrar", badge: "warning" },
  pagada: { label: "Pagada", badge: "success" },
  completada: { label: "Completada", badge: "success" },
  cancelada: { label: "Cancelada", badge: "danger" },
};

const SALE_STATUS_FILTERS = ["", "por_cobrar", "pagada", "completada", "cancelada"];

const SALE_RANGE_FILTERS = ["all", "today", "week", "month", "custom"];

const SALE_RANGE_LABELS = {
  all: "Todas",
  today: "Hoy",
  week: "Semana",
  month: "Mes",
  custom: "Personalizado",
};

const PAYMENT_STATUS_LABELS = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  vencido: "Vencido",
};

const PAYMENT_METHOD_LABELS = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  tarjeta: "Tarjeta",
  mercado_pago: "Mercado Pago",
  clip: "Clip",
  otro: "Otro",
  pendiente: "Pendiente",
  Pendiente: "Pendiente",
  Transferencia: "Transferencia",
  Efectivo: "Efectivo",
  "Mercado Pago": "Mercado Pago",
  Clip: "Clip",
};

const DELIVERY_TYPE_LABELS = {
  venta_directa: "Venta directa",
  recoger_tienda: "Recoger en tienda",
  envio_local: "Envío local",
  paqueteria: "Paquetería",
  pendiente: "Pendiente definir",
  Local: "Envío local",
  Nacional: "Paquetería",
};

const LEGACY_ORDER_STATUS_MAP = {
  Nuevo: "nuevo",
  "Por cobrar": "por_cobrar",
  Cobrado: "cobrado",
  "Por enviar": "por_enviar",
  "Por retirar": "por_retirar",
  Enviado: "enviado",
  Completado: "completado",
  Cancelado: "cancelado",
};

let orderFormDraft = { items: [] };
let saleFormDraft = { items: [] };
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  viewTitle: $("#viewTitle"),
  viewDescription: $("#viewDescription"),
  dashboardQuickSummary: $("#dashboardQuickSummary"),
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
  dashboardExpirationAlerts: $("#dashboardExpirationAlerts"),
  chatLog: $("#chatLog"),
  chatForm: $("#chatForm"),
  incomingMessage: $("#incomingMessage"),
  conversationSearch: $("#conversationSearch"),
  storeLink: $("#storeLink"),
  businessPhone: $("#businessPhone"),
  welcomeMessage: $("#welcomeMessage"),
  copyWelcomeButton: $("#copyWelcomeButton"),
  conversationList: $("#conversationList"),
  profileName: $("#profileName"),
  profilePhone: $("#profilePhone"),
  profileLastMessage: $("#profileLastMessage"),
  profileStatus: $("#profileStatus"),
  advisorAlert: $("#advisorAlert"),
  storeSearch: $("#storeSearch"),
  storeCategory: $("#storeCategory"),
  storeCategoryMenu: $("#storeCategoryMenu"),
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
  customerFormFooter: $("#customerFormFooter"),
  saveCustomerFormButton: $("#saveCustomerFormButton"),
  customerId: $("#customerId"),
  customerName: $("#customerName"),
  customerPhone: $("#customerPhone"),
  customerEmail: $("#customerEmail"),
  customerStreet: $("#customerStreet"),
  customerStreetNumber: $("#customerStreetNumber"),
  customerAddressLine2: $("#customerAddressLine2"),
  customerPostalCode: $("#customerPostalCode"),
  customerNeighborhood: $("#customerNeighborhood"),
  customerCity: $("#customerCity"),
  customerState: $("#customerState"),
  customerCountry: $("#customerCountry"),
  customerType: $("#customerType"),
  customerRfc: $("#customerRfc"),
  customerInternalNotes: $("#customerInternalNotes"),
  customerContactPreference: $("#customerContactPreference"),
  manageCommercialProfilesButton: $("#manageCommercialProfilesButton"),
  commercialProfileInfo: $("#commercialProfileInfo"),
  commercialProfileInfoDiscount: $("#commercialProfileInfoDiscount"),
  commercialProfileInfoCredit: $("#commercialProfileInfoCredit"),
  commercialProfileInfoCreditLimit: $("#commercialProfileInfoCreditLimit"),
  commercialProfileInfoRules: $("#commercialProfileInfoRules"),
  commercialProfileHint: $("#commercialProfileHint"),
  customerSearch: $("#customerSearch"),
  customerTable: $("#customerTable"),
  customerListCount: $("#customerListCount"),
  customerListFooter: $("#customerListFooter"),
  clearCustomerForm: $("#clearCustomerForm"),
  customerContactDialog: $("#customerContactDialog"),
  customerContactTitle: $("#customerContactDialogTitle"),
  customerContactSummary: $("#customerContactSummary"),
  customerContactError: $("#customerContactError"),
  customerCommercialProfilesDialog: $("#customerCommercialProfilesDialog"),
  commercialProfilesList: $("#commercialProfilesList"),
  commercialProfileForm: $("#commercialProfileForm"),
  commercialProfileFeedback: $("#commercialProfileFeedback"),
  commercialProfileFormTitle: $("#commercialProfileFormTitle"),
  commercialProfileId: $("#commercialProfileId"),
  commercialProfileName: $("#commercialProfileName"),
  commercialProfileMinPurchase: $("#commercialProfileMinPurchase"),
  commercialProfileMinPieces: $("#commercialProfileMinPieces"),
  commercialProfileSuggestedDiscount: $("#commercialProfileSuggestedDiscount"),
  commercialProfileCreditAllowed: $("#commercialProfileCreditAllowed"),
  commercialProfileSuggestedCreditLimit: $("#commercialProfileSuggestedCreditLimit"),
  commercialProfileNotes: $("#commercialProfileNotes"),
  ordersTable: $("#ordersTable"),
  orderSearch: $("#orderSearch"),
  orderListCount: $("#orderListCount"),
  orderListFooter: $("#orderListFooter"),
  orderStatusFilters: $("#orderStatusFilters"),
  openOrderDialogButton: $("#openOrderDialogButton"),
  orderDialog: $("#orderDialog"),
  orderForm: $("#orderForm"),
  orderCustomerSelect: $("#orderCustomerSelect"),
  orderOriginSelect: $("#orderOriginSelect"),
  orderProductSearch: $("#orderProductSearch"),
  orderProductResults: $("#orderProductResults"),
  orderLineItems: $("#orderLineItems"),
  orderLinesEmpty: $("#orderLinesEmpty"),
  orderDiscount: $("#orderDiscount"),
  orderShipping: $("#orderShipping"),
  orderPaymentStatus: $("#orderPaymentStatus"),
  orderPaymentMethod: $("#orderPaymentMethod"),
  orderDeliveryType: $("#orderDeliveryType"),
  orderSubtotalPreview: $("#orderSubtotalPreview"),
  orderDiscountPreview: $("#orderDiscountPreview"),
  orderShippingPreview: $("#orderShippingPreview"),
  orderTotalPreview: $("#orderTotalPreview"),
  orderNotes: $("#orderNotes"),
  saleSearch: $("#saleSearch"),
  saleListCount: $("#saleListCount"),
  saleListFooter: $("#saleListFooter"),
  saleStatusFilters: $("#saleStatusFilters"),
  saleRangeFilters: $("#saleRangeFilters"),
  salesCustomRange: $("#salesCustomRange"),
  saleDateFrom: $("#saleDateFrom"),
  saleDateTo: $("#saleDateTo"),
  salesSummaryCards: $("#salesSummaryCards"),
  salesProfitNotice: $("#salesProfitNotice"),
  openSaleDialogButton: $("#openSaleDialogButton"),
  exportSalesButton: $("#exportSalesButton"),
  saleDialog: $("#saleDialog"),
  saleForm: $("#saleForm"),
  saleCustomerSelect: $("#saleCustomerSelect"),
  saleOriginSelect: $("#saleOriginSelect"),
  saleProductSearch: $("#saleProductSearch"),
  saleProductResults: $("#saleProductResults"),
  saleLineItems: $("#saleLineItems"),
  saleLinesEmpty: $("#saleLinesEmpty"),
  salePaymentMethod: $("#salePaymentMethod"),
  salePaymentStatus: $("#salePaymentStatus"),
  saleTotalPreview: $("#saleTotalPreview"),
  saleNotes: $("#saleNotes"),
  productForm: $("#productForm"),
  productFormTitle: $("#productFormTitle"),
  cancelProductForm: $("#cancelProductForm"),
  backToProductList: $("#backToProductList"),
  saveProductFormButton: $("#saveProductFormButton"),
  productId: $("#productId"),
  productSku: $("#productSku"),
  productName: $("#productName"),
  productLaboratory: $("#productLaboratory"),
  productCategory: $("#productCategory"),
  productSubstance: $("#productSubstance"),
  productImageUrl: $("#productImageUrl"),
  productImageFile: $("#productImageFile"),
  productImageUploadButton: $("#productImageUploadButton"),
  productImageClearButton: $("#productImageClearButton"),
  productImagePreview: $("#productImagePreview"),
  productImagePreviewImg: $("#productImagePreviewImg"),
  productImageStatus: $("#productImageStatus"),
  productCost: $("#productCost"),
  productRegularPrice: $("#productRegularPrice"),
  productPrice: $("#productPrice"),
  productMinStock: $("#productMinStock"),
  productMaxStock: $("#productMaxStock"),
  productExpirationStatus: $("#productExpirationStatus"),
  productLotSummary: $("#productLotSummary"),
  productLotStockTotal: $("#productLotStockTotal"),
  productLotNextExpiry: $("#productLotNextExpiry"),
  productLotActiveCount: $("#productLotActiveCount"),
  productLotCreateFields: $("#productLotCreateFields"),
  productLotsManagePanel: $("#productLotsManagePanel"),
  productLotsTable: $("#productLotsTable"),
  openProductLotFormButton: $("#openProductLotFormButton"),
  productFirstLotCode: $("#productFirstLotCode"),
  productFirstLotStock: $("#productFirstLotStock"),
  productFirstLotExpires: $("#productFirstLotExpires"),
  productLotDialog: $("#productLotDialog"),
  productLotDialogTitle: $("#productLotDialogTitle"),
  productLotForm: $("#productLotForm"),
  productLotId: $("#productLotId"),
  productLotProductId: $("#productLotProductId"),
  productLotCode: $("#productLotCode"),
  productLotStock: $("#productLotStock"),
  productLotExpiresAt: $("#productLotExpiresAt"),
  productLotCost: $("#productLotCost"),
  productType: $("#productType"),
  productIva: $("#productIva"),
  productStatus: $("#productStatus"),
  productDescription: $("#productDescription"),
  productProfitSummary: $("#productProfitSummary"),
  productProfitStockTotal: $("#productProfitStockTotal"),
  productProfitWeightedCost: $("#productProfitWeightedCost"),
  productProfitInventoryValue: $("#productProfitInventoryValue"),
  productProfitAmount: $("#productProfitAmount"),
  productProfitPromoBlock: $("#productProfitPromoBlock"),
  productProfitPromoAmount: $("#productProfitPromoAmount"),
  productProfitPercent: $("#productProfitPercent"),
  productProfitNote: $("#productProfitNote"),
  productPromoPriceNotice: $("#productPromoPriceNotice"),
  productSearch: $("#productSearch"),
  productListCount: $("#productListCount"),
  expirationAlertsFilterActions: $("#expirationAlertsFilterActions"),
  productListFilterChip: $("#productListFilterChip"),
  clearExpirationFilter: $("#clearExpirationFilter"),
  productSelectAll: $("#productSelectAll"),
  productTable: $("#productTable"),
  categoryForm: $("#categoryForm"),
  categoryFormTitle: $("#categoryFormTitle"),
  categoryId: $("#categoryId"),
  categoryParentId: $("#categoryParentId"),
  categoryParentHint: $("#categoryParentHint"),
  categoryName: $("#categoryName"),
  categoryDescription: $("#categoryDescription"),
  categorySearch: $("#categorySearch"),
  categoryTable: $("#categoryTable"),
  clearCategoryForm: $("#clearCategoryForm"),
  categoryDependencyDialog: $("#categoryDependencyDialog"),
  categoryDependencyDialogForm: $("#categoryDependencyDialogForm"),
  categoryDependencyTitle: $("#categoryDependencyTitle"),
  categoryDependencyMessage: $("#categoryDependencyMessage"),
  categoryDependencyHideButton: $("#categoryDependencyHideButton"),
  classificationDependencyDialog: $("#classificationDependencyDialog"),
  classificationDependencyDialogForm: $("#classificationDependencyDialogForm"),
  classificationDependencyTitle: $("#classificationDependencyTitle"),
  classificationDependencyMessage: $("#classificationDependencyMessage"),
  classificationDependencyDeactivateButton: $("#classificationDependencyDeactivateButton"),
  classificationForm: $("#classificationForm"),
  classificationFormTitle: $("#classificationFormTitle"),
  classificationId: $("#classificationId"),
  classificationName: $("#classificationName"),
  classificationDescription: $("#classificationDescription"),
  classificationStatus: $("#classificationStatus"),
  classificationSearch: $("#classificationSearch"),
  classificationTable: $("#classificationTable"),
  clearClassificationForm: $("#clearClassificationForm"),
  inventoryActiveProducts: $("#inventoryActiveProducts"),
  inventoryLowStock: $("#inventoryLowStock"),
  inventoryExpiringSoon: $("#inventoryExpiringSoon"),
  inventoryTotalValue: $("#inventoryTotalValue"),
  inventoryExpirationAlerts: $("#inventoryExpirationAlerts"),
  openProductFormButton: $("#openProductFormButton"),
  exportProductsCsvButton: $("#exportProductsCsvButton"),
  importProductsCsvFile: $("#importProductsCsvFile"),
  importProductsCsvSelectButton: $("#importProductsCsvSelectButton"),
  importProductsKeepCurrentImages: $("#importProductsKeepCurrentImages"),
  importProductsFileName: $("#importProductsFileName"),
  importProductsPreviewPanel: $("#importProductsPreviewPanel"),
  importProductsPreviewWorkspace: $("#importProductsPreviewWorkspace"),
  importProductsStats: $("#importProductsStats"),
  importProductsPreviewTable: $("#importProductsPreviewTable"),
  importProductsWarnings: $("#importProductsWarnings"),
  importProductsErrors: $("#importProductsErrors"),
  importProductsFinalPanel: $("#importProductsFinalPanel"),
  importProductsFinalTitle: $("#importProductsFinalTitle"),
  importProductsFinalMessage: $("#importProductsFinalMessage"),
  importProductsFinalSummary: $("#importProductsFinalSummary"),
  importProductsFinalErrors: $("#importProductsFinalErrors"),
  importProductsAnotherCsvButton: $("#importProductsAnotherCsvButton"),
  importProductsViewProductsButton: $("#importProductsViewProductsButton"),
  confirmProductsImportButton: $("#confirmProductsImportButton"),
  cancelProductsImportButton: $("#cancelProductsImportButton"),
  revalidateProductsImportButton: $("#revalidateProductsImportButton"),
  inventorySearch: $("#inventorySearch"),
  inventoryCategoryFilter: $("#inventoryCategoryFilter"),
  inventoryLaboratoryFilter: $("#inventoryLaboratoryFilter"),
  inventoryStatusFilter: $("#inventoryStatusFilter"),
  inventoryTable: $("#inventoryTable"),
  openInventoryProductModal: $("#openInventoryProductModal"),
  inventoryProductDialog: $("#inventoryProductDialog"),
  inventoryProductVisualForm: $("#inventoryProductVisualForm"),
  inventoryProductName: $("#inventoryProductName"),
  inventoryProductSubstance: $("#inventoryProductSubstance"),
  inventoryProductLaboratory: $("#inventoryProductLaboratory"),
  inventoryProductCategory: $("#inventoryProductCategory"),
  inventoryProductPresentation: $("#inventoryProductPresentation"),
  inventoryProductBarcode: $("#inventoryProductBarcode"),
  inventoryProductSku: $("#inventoryProductSku"),
  inventoryProductCost: $("#inventoryProductCost"),
  inventoryProductPrice: $("#inventoryProductPrice"),
  inventoryProductStock: $("#inventoryProductStock"),
  inventoryProductMinStock: $("#inventoryProductMinStock"),
  inventoryProductRequiresRecipe: $("#inventoryProductRequiresRecipe"),
  inventoryProductImageUrl: $("#inventoryProductImageUrl"),
  inventoryDetailDialog: $("#inventoryDetailDialog"),
  productActionDialog: $("#productActionDialog"),
  productActionDialogForm: $("#productActionDialogForm"),
  productActionDialogTitle: $("#productActionDialogTitle"),
  productActionDialogMessage: $("#productActionDialogMessage"),
  productActionDialogConfirm: $("#productActionDialogConfirm"),
  productPermanentDeleteDialog: $("#productPermanentDeleteDialog"),
  productPermanentDeleteForm: $("#productPermanentDeleteForm"),
  productPermanentDeleteTitle: $("#productPermanentDeleteTitle"),
  productPermanentDeleteMessage: $("#productPermanentDeleteMessage"),
  productPermanentDeleteConfirmInput: $("#productPermanentDeleteConfirmInput"),
  productPermanentDeleteError: $("#productPermanentDeleteError"),
  productPermanentDeleteConfirm: $("#productPermanentDeleteConfirm"),
  productLotDeleteDialog: $("#productLotDeleteDialog"),
  productLotDeleteForm: $("#productLotDeleteForm"),
  productLotDeleteTitle: $("#productLotDeleteTitle"),
  productLotDeleteMessage: $("#productLotDeleteMessage"),
  productLotDeleteConfirmInput: $("#productLotDeleteConfirmInput"),
  productLotDeleteError: $("#productLotDeleteError"),
  productLotDeleteConfirm: $("#productLotDeleteConfirm"),
  inventoryDetailTitle: $("#inventoryDetailTitle"),
  inventoryDetailContent: $("#inventoryDetailContent"),
  stockAdjustmentDialog: $("#stockAdjustmentDialog"),
  stockAdjustmentForm: $("#stockAdjustmentForm"),
  stockAdjustmentProductId: $("#stockAdjustmentProductId"),
  stockAdjustmentProductName: $("#stockAdjustmentProductName"),
  stockAdjustmentSku: $("#stockAdjustmentSku"),
  stockAdjustmentCurrentStock: $("#stockAdjustmentCurrentStock"),
  stockAdjustmentLotField: $("#stockAdjustmentLotField"),
  stockAdjustmentLotId: $("#stockAdjustmentLotId"),
  stockAdjustmentHelp: $("#stockAdjustmentHelp"),
  stockAdjustmentExample: $("#stockAdjustmentExample"),
  stockAdjustmentQuantity: $("#stockAdjustmentQuantity"),
  stockAdjustmentNewStock: $("#stockAdjustmentNewStock"),
  stockAdjustmentReasonPreset: $("#stockAdjustmentReasonPreset"),
  stockAdjustmentReason: $("#stockAdjustmentReason"),
  stockAdjustmentReasonWarning: $("#stockAdjustmentReasonWarning"),
  stockAdjustmentStockLabel: $("#stockAdjustmentStockLabel"),
  stockAdjustmentExistingPanel: $("#stockAdjustmentExistingPanel"),
  stockAdjustmentNewLotPanel: $("#stockAdjustmentNewLotPanel"),
  stockAdjustmentSubmit: $("#stockAdjustmentSubmit"),
  stockAdjustmentNewLotCode: $("#stockAdjustmentNewLotCode"),
  stockAdjustmentNewLotExpiresAt: $("#stockAdjustmentNewLotExpiresAt"),
  stockAdjustmentNewLotQuantity: $("#stockAdjustmentNewLotQuantity"),
  stockAdjustmentNewLotCost: $("#stockAdjustmentNewLotCost"),
  stockAdjustmentNewLotSupplier: $("#stockAdjustmentNewLotSupplier"),
  stockAdjustmentNewLotLocation: $("#stockAdjustmentNewLotLocation"),
  stockAdjustmentNewLotReasonPreset: $("#stockAdjustmentNewLotReasonPreset"),
  stockAdjustmentNewLotReason: $("#stockAdjustmentNewLotReason"),
  stockAdjustmentNewLotTotalStock: $("#stockAdjustmentNewLotTotalStock"),
  stockAdjustmentDuplicateWarning: $("#stockAdjustmentDuplicateWarning"),
  inventoryMovementsDialog: $("#inventoryMovementsDialog"),
  inventoryMovementsTitle: $("#inventoryMovementsTitle"),
  inventoryMovementsContent: $("#inventoryMovementsContent"),
  salesTable: $("#salesTable"),
  shipmentsTable: $("#shipmentsTable"),
  paymentsTable: $("#paymentsTable"),
  resetDemoButton: $("#resetDemoButton"),
};

init();

function init() {
  migrateCommerceState();
  elements.todayLabel.textContent = `Operacion local - ${formatShortDate(new Date().toISOString())}`;
  createProductRefreshButton();
  hydrateSettings();
  bindEvents();
  renderAll();
  loadProducts();
  loadCategories();
  loadClassifications();
  ensureCommerceDemoData();
  loadRealConversations();
  window.setInterval(loadRealConversations, 5000);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const navButton = event.target.closest(".nav-item, .nav-subitem, [data-view]");
    if (!navButton || navButton.closest("dialog")) return;
    const viewId = navButton.dataset.view;
    if (!viewId) return;
    showView(viewId, { productsSection: navButton.dataset.productsSection || null });
  });

  elements.resetDemoButton.addEventListener("click", resetDemoData);
  elements.chatForm.addEventListener("submit", simulateIncomingMessage);
  elements.copyWelcomeButton.addEventListener("click", copyWelcomeMessage);
  elements.conversationSearch.addEventListener("input", (event) => {
    state.conversationQuery = event.target.value.trim().toLowerCase();
    renderConversations();
  });
  [elements.storeLink, elements.businessPhone].forEach((input) => input.addEventListener("input", saveSettings));
  elements.welcomeMessage.addEventListener("input", saveSettings);

  elements.storeSearch.addEventListener("input", (event) => {
    state.storeQuery = event.target.value.trim().toLowerCase();
    renderStore();
  });
  elements.storeCategory.addEventListener("change", (event) => {
    state.storeCategory = event.target.value;
    renderStore();
    scrollStoreSection("products");
  });
  elements.storeCategoryMenu.addEventListener("click", handleStoreCategoryClick);
  $$("[data-store-scroll]").forEach((button) => {
    button.addEventListener("click", () => scrollStoreSection(button.dataset.storeScroll));
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
  elements.customerType?.addEventListener("change", handleCustomerProfileSelection);
  elements.commercialProfileForm?.addEventListener("submit", saveCommercialProfile);
  elements.customerSearch.addEventListener("input", (event) => {
    state.customerQuery = event.target.value.trim().toLowerCase();
    renderCustomers();
  });

  elements.openOrderDialogButton?.addEventListener("click", openOrderDialog);
  elements.orderForm?.addEventListener("submit", saveManualOrder);
  elements.orderSearch?.addEventListener("input", (event) => {
    state.orderQuery = event.target.value.trim().toLowerCase();
    renderOrders();
  });
  elements.orderProductSearch?.addEventListener("input", (event) => {
    renderCommerceProductResults(elements.orderProductResults, event.target.value, "order");
  });
  ["orderDiscount", "orderShipping"].forEach((id) => {
    const input = elements[id];
    input?.addEventListener("input", updateOrderFormPreview);
    input?.addEventListener("change", updateOrderFormPreview);
  });

  elements.openSaleDialogButton?.addEventListener("click", openSaleDialog);
  elements.exportSalesButton?.addEventListener("click", exportSalesList);
  elements.saleForm?.addEventListener("submit", saveManualSale);
  elements.saleSearch?.addEventListener("input", (event) => {
    state.saleQuery = event.target.value.trim().toLowerCase();
    renderSales();
  });
  elements.saleProductSearch?.addEventListener("input", (event) => {
    renderCommerceProductResults(elements.saleProductResults, event.target.value, "sale");
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const index = Number(target.dataset.index);
    if (action === "update-order-line-qty") {
      updateDraftItemQuantity(orderFormDraft, index, target.value);
      renderOrderLineItems();
    }
    if (action === "update-order-line-price") {
      const item = orderFormDraft.items[index];
      if (item) {
        item.unitPrice = toNumber(target.value);
        item.subtotal = item.quantity * item.unitPrice;
        renderOrderLineItems();
      }
    }
    if (action === "update-sale-line-qty") {
      updateDraftItemQuantity(saleFormDraft, index, target.value);
      renderSaleLineItems();
    }
    if (action === "update-sale-line-price") {
      const item = saleFormDraft.items[index];
      if (item) {
        item.unitPrice = toNumber(target.value);
        item.subtotal = item.quantity * item.unitPrice;
        renderSaleLineItems();
      }
    }
  });

  elements.productForm.addEventListener("submit", saveProduct);
  elements.cancelProductForm?.addEventListener("click", closeProductForm);
  elements.backToProductList?.addEventListener("click", closeProductForm);
  elements.productImageUploadButton.addEventListener("click", handleProductImageUploadClick);
  elements.productImageClearButton?.addEventListener("click", handleProductImageClearClick);
  elements.productImageFile.addEventListener("change", handleProductImageFileChange);
  elements.productImageUrl.addEventListener("input", handleProductImageUrlInput);
  elements.productImageUrl.addEventListener("change", handleProductImageUrlInput);
  elements.productImagePreviewImg.addEventListener("error", handleProductImagePreviewError);
  [elements.productCost, elements.productRegularPrice, elements.productPrice].forEach((input) => {
    input.addEventListener("input", updateProductProfitSummary);
    input.addEventListener("change", updateProductProfitSummary);
  });
  elements.productFirstLotExpires?.addEventListener("input", updateProductLotFormPreview);
  elements.productFirstLotExpires?.addEventListener("change", updateProductLotFormPreview);
  updateProductProfitSummary();
  updateProductLotFormPreview();
  updateProductImagePreview();
  elements.productSearch.addEventListener("input", (event) => {
    state.productQuery = event.target.value.trim().toLowerCase();
    renderProducts();
  });
  elements.clearExpirationFilter?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearExpirationFilter();
  });
  window.addEventListener("scroll", closeAllProductActionMenus, true);
  window.addEventListener("resize", closeAllProductActionMenus);
  elements.productTable?.addEventListener("focusin", (event) => {
    const input = event.target.closest(".product-price-input");
    if (input) input.dataset.previousValue = input.value;
  });
  elements.productTable?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.matches(".product-price-input")) {
      event.preventDefault();
      event.target.blur();
    }
  });
  elements.productTable?.addEventListener(
    "blur",
    (event) => {
      const input = event.target.closest(".product-price-input");
      if (input) handleProductPriceInputBlur(input);
    },
    true,
  );
  elements.productSelectAll?.addEventListener("change", (event) => {
    const checked = event.target.checked;
    elements.productTable?.querySelectorAll(".product-row-check").forEach((checkbox) => {
      checkbox.checked = checked;
    });
  });

  elements.categoryForm.addEventListener("submit", saveCategory);
  elements.clearCategoryForm.addEventListener("click", clearCategoryForm);
  elements.categorySearch.addEventListener("input", (event) => {
    state.categoryQuery = event.target.value.trim().toLowerCase();
    renderCategories();
  });

  elements.classificationForm.addEventListener("submit", saveClassification);
  elements.clearClassificationForm.addEventListener("click", clearClassificationForm);
  elements.classificationSearch.addEventListener("input", (event) => {
    state.classificationQuery = event.target.value.trim().toLowerCase();
    renderClassifications();
  });

  elements.openProductFormButton?.addEventListener("click", openProductForm);
  elements.exportProductsCsvButton?.addEventListener("click", exportProductsToCsv);
  elements.importProductsCsvSelectButton?.addEventListener("click", () => elements.importProductsCsvFile?.click());
  elements.importProductsCsvFile?.addEventListener("change", handleImportCsvFileSelect);
  elements.confirmProductsImportButton?.addEventListener("click", confirmProductsImport);
  elements.cancelProductsImportButton?.addEventListener("click", () => resetImportProductsUi());
  elements.revalidateProductsImportButton?.addEventListener("click", revalidateProductsImport);
  elements.importProductsAnotherCsvButton?.addEventListener("click", startAnotherProductsImport);
  elements.importProductsViewProductsButton?.addEventListener("click", goToProductsListAfterImport);
  elements.importProductsPreviewTable?.addEventListener("input", handleImportPreviewInput);
  elements.importProductsPreviewTable?.addEventListener("change", handleImportPreviewInput);
  elements.importProductsPreviewTable?.addEventListener("blur", handleImportPreviewBlur, true);
  elements.importProductsKeepCurrentImages?.addEventListener("change", () => {
    if (state.csvImportSession) renderImportProductsPreview(state.csvImportSession);
  });

  document.addEventListener("mouseover", handleProductActionTooltipOver);
  document.addEventListener("mouseout", handleProductActionTooltipOut);
  window.addEventListener("scroll", hideProductActionTooltip, true);
  window.addEventListener("resize", hideProductActionTooltip);

  if (elements.inventorySearch) {
    elements.inventorySearch.addEventListener("input", (event) => {
      state.inventoryQuery = event.target.value.trim().toLowerCase();
      renderInventoryTable();
    });
  }
  if (elements.inventoryCategoryFilter) {
    elements.inventoryCategoryFilter.addEventListener("change", (event) => {
      state.inventoryCategory = event.target.value;
      renderInventoryTable();
    });
  }
  if (elements.inventoryLaboratoryFilter) {
    elements.inventoryLaboratoryFilter.addEventListener("change", (event) => {
      state.inventoryLaboratory = event.target.value;
      renderInventoryTable();
    });
  }
  if (elements.inventoryStatusFilter) {
    elements.inventoryStatusFilter.addEventListener("change", (event) => {
      state.inventoryStatus = event.target.value;
      renderInventoryTable();
    });
  }
  elements.openInventoryProductModal?.addEventListener("click", () => elements.inventoryProductDialog.showModal());
  elements.inventoryProductVisualForm?.addEventListener("submit", saveInventoryProduct);
  elements.openProductLotFormButton?.addEventListener("click", () => {
    const productId = elements.productId?.value || elements.openProductLotFormButton?.dataset.productId;
    if (!productId) return showToast("Guarda el producto antes de agregar lotes");
    openStockAdjustmentDialog(productId, { mode: "new-lot" });
  });
  elements.productLotForm?.addEventListener("submit", saveProductLot);
  elements.stockAdjustmentForm?.addEventListener("submit", saveStockAdjustment);
  elements.stockAdjustmentQuantity?.addEventListener("input", updateStockAdjustmentPreview);
  elements.stockAdjustmentLotId?.addEventListener("change", updateStockAdjustmentPreview);
  elements.stockAdjustmentNewLotQuantity?.addEventListener("input", updateStockAdjustmentNewLotPreview);
  elements.stockAdjustmentNewLotCode?.addEventListener("input", updateStockAdjustmentNewLotPreview);
  elements.stockAdjustmentNewLotExpiresAt?.addEventListener("change", updateStockAdjustmentNewLotPreview);
  elements.stockAdjustmentReasonPreset?.addEventListener("change", (event) => {
    const value = event.target.value;
    if (!elements.stockAdjustmentReason) return;
    if (value && value !== "Otro") elements.stockAdjustmentReason.value = value;
    if (value === "Otro") elements.stockAdjustmentReason.value = "";
    updateStockAdjustmentReasonWarning();
  });
  elements.stockAdjustmentReason?.addEventListener("input", updateStockAdjustmentReasonWarning);
  elements.stockAdjustmentNewLotReasonPreset?.addEventListener("change", (event) => {
    const value = event.target.value;
    if (!elements.stockAdjustmentNewLotReason) return;
    if (value && value !== "Otro") elements.stockAdjustmentNewLotReason.value = value;
    if (value === "Otro") elements.stockAdjustmentNewLotReason.value = "";
  });
  elements.productActionDialog?.addEventListener("close", handleProductActionDialogClose);
  elements.productPermanentDeleteForm?.addEventListener("submit", handleProductPermanentDeleteSubmit);
  elements.productPermanentDeleteDialog?.addEventListener("close", () => {
    if (productPermanentDeleteResolver) {
      productPermanentDeleteResolver(false);
      productPermanentDeleteResolver = null;
    }
  });
  elements.productLotDeleteForm?.addEventListener("submit", handleProductLotDeleteSubmit);
  elements.productLotDeleteDialog?.addEventListener("close", () => {
    if (productLotDeleteResolver) {
      productLotDeleteResolver(false);
      productLotDeleteResolver = null;
      productLotDeleteContext = null;
    }
  });
  elements.categoryDependencyDialog?.addEventListener("close", handleCategoryDependencyDialogClose);
  elements.classificationDependencyDialog?.addEventListener("close", handleClassificationDependencyDialogClose);

  document.addEventListener("click", handleDocumentAction);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".product-list-action-menu")) {
      closeAllProductActionMenus();
    }
  });
}

const CATEGORY_DOCUMENT_ACTIONS = new Set([
  "edit-category",
  "create-subcategory",
  "hide-category-store",
  "show-category-store",
  "delete-category",
  "toggle-category-menu",
]);

function resolveCategoryActionId(action) {
  return String(action.dataset.id || action.getAttribute("data-id") || "").trim() || null;
}

function handleCategoryDocumentAction(event, action) {
  const actionName = action.dataset.action;
  const id = resolveCategoryActionId(action);
  const category = id ? getCategoryById(id) : null;
  console.log("[category action]", actionName, id, category?.name || "(no encontrada)");

  event.preventDefault();
  event.stopPropagation();
  closeAllProductActionMenus();

  if (!id) {
    showToast("ID de categoría no válido");
    return;
  }

  if (actionName === "edit-category") {
    editCategory(id);
    return;
  }
  if (actionName === "create-subcategory") {
    createSubcategory(id);
    return;
  }
  if (actionName === "hide-category-store") {
    void setCategoryStoreVisibility(id, false);
    return;
  }
  if (actionName === "show-category-store") {
    void setCategoryStoreVisibility(id, true);
    return;
  }
  if (actionName === "delete-category") {
    void deleteCategory(id);
    return;
  }
  if (actionName === "toggle-category-menu") {
    toggleProductActionMenu(action);
  }
}

function handleDocumentAction(event) {
  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (CATEGORY_DOCUMENT_ACTIONS.has(action.dataset.action)) {
    handleCategoryDocumentAction(event, action);
    return;
  }

  const id = action.dataset.id;
  if (action.dataset.action === "add-store-item") addStoreItem(id);
  if (action.dataset.action === "remove-store-item") removeStoreItem(id);
  if (action.dataset.action === "edit-customer") {
    event.preventDefault();
    editCustomer(id);
  }
  if (action.dataset.action === "contact-customer") openCustomerContactDialog(id);
  if (action.dataset.action === "customer-contact-email") handleCustomerContactEmail();
  if (action.dataset.action === "customer-contact-whatsapp") handleCustomerContactWhatsApp();
  if (action.dataset.action === "customer-contact-call") handleCustomerContactCall();
  if (action.dataset.action === "close-customer-contact-dialog") elements.customerContactDialog?.close();
  if (action.dataset.action === "deactivate-customer") deactivateCustomer(id);
  if (action.dataset.action === "reactivate-customer") reactivateCustomer(id);
  if (action.dataset.action === "open-customer-form") openCustomerForm();
  if (action.dataset.action === "back-to-customer-list") closeCustomerForm();
  if (action.dataset.action === "open-commercial-profiles-dialog") openCommercialProfilesDialog();
  if (action.dataset.action === "close-commercial-profiles-dialog") closeCommercialProfilesDialog();
  if (action.dataset.action === "edit-commercial-profile") editCommercialProfile(id);
  if (action.dataset.action === "delete-commercial-profile") deleteCommercialProfile(id);
  if (action.dataset.action === "new-commercial-profile") clearCommercialProfileForm();
  if (action.dataset.action === "edit-product") editProduct(id);
  if (action.dataset.action === "duplicate-product") duplicateProduct(id);
  if (action.dataset.action === "pause-product") pauseProduct(id);
  if (action.dataset.action === "activate-product") activateProduct(id);
  if (action.dataset.action === "toggle-product-menu") toggleProductActionMenu(action);
  if (action.dataset.action === "delete-product") {
    closeAllProductActionMenus();
    deleteProduct(id);
  }
  if (action.dataset.action === "permanent-delete-product") {
    closeAllProductActionMenus();
    permanentDeleteProduct(id);
  }
  if (action.dataset.action === "close-permanent-delete-dialog") elements.productPermanentDeleteDialog?.close("cancel");
  if (action.dataset.action === "close-lot-delete-dialog") elements.productLotDeleteDialog?.close("cancel");
  if (action.dataset.action === "edit-classification") editClassification(id);
  if (action.dataset.action === "deactivate-classification") deactivateClassification(id);
  if (action.dataset.action === "activate-classification") activateClassification(id);
  if (action.dataset.action === "delete-classification") deleteClassification(id);
  if (action.dataset.action === "toggle-classification-menu") toggleProductActionMenu(action);
  if (action.dataset.action === "order-next") moveOrderNext(id);
  if (action.dataset.action === "order-mark-awaiting-payment") markOrderAwaitingPayment(id);
  if (action.dataset.action === "order-mark-paid") markOrderPaid(id);
  if (action.dataset.action === "order-mark-awaiting-shipment") markOrderAwaitingShipment(id);
  if (action.dataset.action === "order-mark-ready-pickup") markOrderReadyPickup(id);
  if (action.dataset.action === "order-mark-shipped") markOrderShipped(id);
  if (action.dataset.action === "order-mark-completed") markOrderCompleted(id);
  if (action.dataset.action === "order-cancel") cancelOrder(id);
  if (action.dataset.action === "filter-orders") {
    state.orderStatusFilter = action.dataset.status || "";
    renderOrders();
  }
  if (action.dataset.action === "filter-sales") {
    state.saleStatusFilter = action.dataset.status || "";
    renderSales();
  }
  if (action.dataset.action === "filter-sales-range") {
    state.saleRangeFilter = action.dataset.range || "all";
    renderSales();
  }
  if (action.dataset.action === "apply-sale-date-range") {
    state.saleDateFrom = elements.saleDateFrom?.value || "";
    state.saleDateTo = elements.saleDateTo?.value || "";
    if (!state.saleDateFrom || !state.saleDateTo) {
      showToast("Selecciona fecha inicio y fin.");
      return;
    }
    if (new Date(state.saleDateFrom) > new Date(state.saleDateTo)) {
      showToast("La fecha inicio no puede ser posterior a la fecha fin.");
      return;
    }
    renderSales();
  }
  if (action.dataset.action === "close-order-dialog") closeOrderDialog();
  if (action.dataset.action === "close-sale-dialog") closeSaleDialog();
  if (action.dataset.action === "add-order-product") addProductToOrderDraft(id);
  if (action.dataset.action === "add-sale-product") addProductToSaleDraft(id);
  if (action.dataset.action === "remove-order-line") {
    orderFormDraft.items.splice(Number(action.dataset.index), 1);
    renderOrderLineItems();
  }
  if (action.dataset.action === "remove-sale-line") {
    saleFormDraft.items.splice(Number(action.dataset.index), 1);
    renderSaleLineItems();
  }
  if (action.dataset.action === "update-order-line-qty") {
    updateDraftItemQuantity(orderFormDraft, Number(action.dataset.index), action.target.value);
    renderOrderLineItems();
  }
  if (action.dataset.action === "update-order-line-price") {
    const item = orderFormDraft.items[Number(action.dataset.index)];
    if (item) {
      item.unitPrice = toNumber(action.target.value);
      item.subtotal = item.quantity * item.unitPrice;
      renderOrderLineItems();
    }
  }
  if (action.dataset.action === "update-sale-line-qty") {
    updateDraftItemQuantity(saleFormDraft, Number(action.dataset.index), action.target.value);
    renderSaleLineItems();
  }
  if (action.dataset.action === "update-sale-line-price") {
    const item = saleFormDraft.items[Number(action.dataset.index)];
    if (item) {
      item.unitPrice = toNumber(action.target.value);
      item.subtotal = item.quantity * item.unitPrice;
      renderSaleLineItems();
    }
  }
  if (action.dataset.action === "mark-paid") markPaymentPaid(id);
  if (action.dataset.action === "mark-shipped") markShipmentSent(id);
  if (action.dataset.action === "take-conversation") updateLatestConversation("Asesor humano");
  if (action.dataset.action === "mark-conversation-order") updateLatestConversation("Pedido");
  if (action.dataset.action === "mark-conversation-delivered") updateLatestConversation("Entregado");
  if (action.dataset.action === "send-store-link") sendStoreLinkToConversation();
  if (action.dataset.action === "refresh-conversations") loadRealConversations({ manual: true, forceChatRender: true });
  if (action.dataset.action === "refresh-products") {
    clearExpirationFilter();
    loadProducts({ manual: true });
  }
  if (action.dataset.action === "select-conversation") selectConversation(id);
  if (action.dataset.action === "filter-expiration") setProductExpirationFilter(action.dataset.level);
  if (action.dataset.action === "clear-expiration-filter") {
    event.preventDefault();
    event.stopPropagation();
    clearExpirationFilter();
  }
  if (action.dataset.action === "view-inventory-product") openInventoryDetail(id);
  if (action.dataset.action === "add-product-lot") openStockAdjustmentDialog(id, { mode: "new-lot" });
  if (action.dataset.action === "edit-product-lot") openProductLotDialog(action.dataset.productId, id);
  if (action.dataset.action === "toggle-product-lot") toggleProductLot(action.dataset.productId, id);
  if (action.dataset.action === "delete-product-lot") deleteProductLot(action.dataset.productId, id);
  if (action.dataset.action === "adjust-inventory-stock") openStockAdjustmentDialog(id);
  if (action.dataset.action === "view-inventory-history") openInventoryMovementsDialog(id);
  if (action.dataset.action === "set-stock-adjust-mode") setStockAdjustmentMode(action.dataset.value);
  if (action.dataset.action === "set-stock-adjust-action") setStockAdjustmentAction(action.dataset.value);
  if (action.dataset.action === "close-stock-adjustment-dialog") closeStockAdjustmentDialog();
  if (action.dataset.action === "close-inventory-movements-dialog") elements.inventoryMovementsDialog?.close();
  if (action.dataset.action === "close-product-lot-dialog") elements.productLotDialog?.close();
  if (action.dataset.action === "close-inventory-product-modal") elements.inventoryProductDialog.close();
  if (action.dataset.action === "close-inventory-detail") elements.inventoryDetailDialog.close();
}

function isNavItemActive(navView, viewId, targetViewId) {
  if (targetViewId === "productos") return navView === "productos";
  const alias = viewAliases[navView];
  if (alias === targetViewId || alias === viewId) return true;
  return navView === viewId || navView === targetViewId;
}

function updateViewHeader(title, description) {
  elements.viewTitle.textContent = title;
  if (elements.viewDescription) {
    elements.viewDescription.textContent = description || "";
  }
}

function showView(viewId, options = {}) {
  if (!viewId) return;

  if (viewId === "product-form") {
    $$(".view").forEach((view) => view.classList.toggle("active", view.id === "product-form"));
    $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === "productos"));
    updateViewHeader(
      elements.productFormTitle.textContent || "Producto",
      viewDescriptions["product-form"],
    );
    scrollWorkspaceToTop();
    return;
  }

  if (viewId === "customer-form") {
    $$(".view").forEach((view) => view.classList.toggle("active", view.id === "customer-form"));
    $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === "clientes"));
    updateViewHeader(elements.customerFormTitle.textContent || "Cliente", viewDescriptions["customer-form"]);
    scrollWorkspaceToTop();
    return;
  }

  const alias = viewAliases[viewId];
  const targetViewId = typeof alias === "object" ? alias.view : alias || viewId;
  const productsSection = options.productsSection || (typeof alias === "object" ? alias.productsSection : null);

  if (!viewTitles[viewId] && !viewTitles[targetViewId]) return;

  if (productsSection) state.productsSection = productsSection;

  $$(".view").forEach((view) => view.classList.toggle("active", view.id === targetViewId));
  $$(".nav-item").forEach((item) =>
    item.classList.toggle("active", isNavItemActive(item.dataset.view, viewId, targetViewId)),
  );

  if (targetViewId === "productos") {
    showProductsSection(state.productsSection || "products-list");
    updateProductsModuleTitle();
    scrollWorkspaceToTop();
    return;
  }

  updateViewHeader(
    viewTitles[viewId] || viewTitles[targetViewId],
    viewDescriptions[viewId] || viewDescriptions[targetViewId] || "",
  );
  scrollWorkspaceToTop();
}

function showProductsSection(sectionId) {
  if (!productsSectionTitles[sectionId]) return;
  state.productsSection = sectionId;

  $$(".nav-subitem").forEach((item) => item.classList.toggle("active", item.dataset.productsSection === sectionId));
  $$(".products-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.productsPanel === sectionId));

  if (sectionId === "products-inventory") renderInventory();

  if ($("#productos")?.classList.contains("active")) updateProductsModuleTitle();
}

function escapeCsvValue(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function getExportLotSnapshot(product) {
  const lots = getActiveProductLots(product);
  if (!lots.length) {
    return {
      lot: product.lot || product.lote || "",
      expiresAt: product.expiresAt || "",
      cost: toNumber(product.cost),
    };
  }

  const fefoLots = sortLotsFefo(lots);
  const primary = fefoLots[0] || lots.find((lot) => lot.active !== false) || lots[0];
  return {
    lot: primary.lot || primary.lote || "",
    expiresAt: primary.expiresAt || "",
    cost: primary.cost != null ? toNumber(primary.cost) : toNumber(product.cost),
  };
}

function productToCsvRecord(product) {
  const promo = getProductStoredPromotionalPrice(product);
  const listPrice = toNumber(product.regularPrice ?? product.price);
  const lotSnapshot = getExportLotSnapshot(product);
  return {
    sku: product.sku || "",
    nombre: product.name || "",
    descripcion: product.description || "",
    categoria: product.category || "",
    clasificacion: product.type || "",
    laboratorio: product.laboratory || product.laboratorio || "",
    precio_venta: listPrice,
    precio_promocional: promo != null ? promo : "",
    costo: lotSnapshot.cost,
    stock: toInteger(product.stock),
    lote: lotSnapshot.lot,
    caducidad: lotSnapshot.expiresAt,
    imagen_url: product.imageUrl || "",
    estado: product.status || "Activo",
  };
}

function exportProductsToCsv() {
  const exportableProducts = state.products.filter((product) => product.status === "Activo");
  if (!exportableProducts.length) return showToast("No hay productos activos para exportar");

  const header = PRODUCT_CSV_EXPORT_COLUMNS.join(",");
  const lines = exportableProducts.map((product) => {
    const record = productToCsvRecord(product);
    return PRODUCT_CSV_EXPORT_COLUMNS.map((column) => escapeCsvValue(record[column])).join(",");
  });

  const csv = `\uFEFF${header}\n${lines.join("\n")}`;
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `master-crm-productos-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`CSV exportado (${exportableProducts.length} productos)`);
}

function parseCsvText(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (char === "\r") index += 1;
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalizeCsvHeaderKey(value) {
  return String(value || "")
    .trim()
    .replace(/^\uFEFF/, "")
    .toLowerCase();
}

function mapCsvRow(headers, values) {
  const row = {};
  headers.forEach((header, index) => {
    if (!header) return;
    row[header] = String(values[index] ?? "").trim();
  });
  return row;
}

function expandImportTwoDigitYear(yearTwo) {
  const yy = Number(yearTwo);
  if (!Number.isFinite(yy) || yy < 0 || yy > 99) return null;
  return yy <= 79 ? 2000 + yy : 1900 + yy;
}

function formatImportDate(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isValidImportCalendarDate(year, month, day) {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const normalized = formatImportDate(year, month, day);
  const date = new Date(`${normalized}T00:00:00`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

function parseImportDate(value) {
  const text = String(value || "").trim();
  if (!text) return { valid: true, normalized: "" };

  const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    if (isValidImportCalendarDate(year, month, day)) {
      return { valid: true, normalized: formatImportDate(year, month, day) };
    }
    return { valid: false, normalized: "" };
  }

  const dayFirstMatch = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2}|\d{4})$/);
  if (dayFirstMatch) {
    const day = Number(dayFirstMatch[1]);
    const month = Number(dayFirstMatch[2]);
    let year = Number(dayFirstMatch[3]);
    if (String(dayFirstMatch[3]).length === 2) {
      const expandedYear = expandImportTwoDigitYear(dayFirstMatch[3]);
      if (expandedYear === null) return { valid: false, normalized: "" };
      year = expandedYear;
    }
    if (isValidImportCalendarDate(year, month, day)) {
      return { valid: true, normalized: formatImportDate(year, month, day) };
    }
  }

  return { valid: false, normalized: "" };
}

function isValidNonNegativeNumber(value) {
  if (value === "" || value === null || value === undefined) return false;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0;
}

function getImportRowPrice(row) {
  const candidates = [row.precio_venta, row.regularPrice, row.price];
  for (const value of candidates) {
    if (value !== "" && value != null) return value;
  }
  return "";
}

function getImportFieldValue(row, field) {
  switch (field) {
    case "precio_venta":
      return getImportRowPrice(row);
    case "precio_promocional":
      return row.promotionalPrice || row.discountPrice || "";
    case "caducidad":
      return row.caducidad || row.expiresAt || "";
    case "imagen_url":
      return row.imageUrl || "";
    case "estado":
      return row.status || "Activo";
    default:
      return row[field] ?? "";
  }
}

function applyImportFieldValue(row, field, value) {
  const text = String(value ?? "").trim();
  switch (field) {
    case "precio_venta":
      row.precio_venta = text;
      row.regularPrice = text;
      row.price = text;
      break;
    case "precio_promocional":
      row.promotionalPrice = text;
      row.discountPrice = text;
      break;
    case "caducidad":
      row.caducidad = text;
      row.expiresAt = text;
      break;
    case "imagen_url":
      row.imageUrl = text;
      break;
    case "estado":
      row.status = text || "Activo";
      break;
    default:
      row[field] = text;
      break;
  }
}

function validateImportCsvRow(row) {
  const fieldErrors = {};
  const errors = [];
  const warnings = [];

  if (!String(row.name || "").trim()) {
    errors.push("falta nombre");
    fieldErrors.name = "falta nombre";
  }

  const priceValue = getImportRowPrice(row);
  if (priceValue === "" || priceValue == null) {
    errors.push("precio_venta requerido");
    fieldErrors.precio_venta = "precio_venta requerido";
  } else if (!isValidNonNegativeNumber(priceValue)) {
    errors.push("precio_venta debe ser número >= 0");
    fieldErrors.precio_venta = "precio_venta debe ser número >= 0";
  }

  if (row.stock !== "" && row.stock != null && !isValidNonNegativeNumber(row.stock)) {
    errors.push("stock debe ser número >= 0");
    fieldErrors.stock = "stock debe ser número >= 0";
  }

  if (row.cost !== "" && row.cost != null && !isValidNonNegativeNumber(row.cost)) {
    errors.push("costo debe ser número >= 0");
    fieldErrors.cost = "costo debe ser número >= 0";
  }

  const rawDate = String(row.caducidad || row.expiresAt || "").trim();
  if (rawDate) {
    const parsedDate = parseImportDate(rawDate);
    if (!parsedDate.valid) {
      const message = "Caducidad inválida. Usa YYYY-MM-DD, DD/MM/YYYY o DD/MM/YY.";
      errors.push(message);
      fieldErrors.caducidad = message;
    } else {
      row.caducidad = parsedDate.normalized;
      row.expiresAt = parsedDate.normalized;
    }
  }

  const categoryName = String(row.category || "").trim();
  if (categoryName && !getCategoryByName(categoryName)) {
    warnings.push(`categoría "${categoryName}" no está registrada`);
  }

  const classificationName = String(row.classification || "").trim();
  if (
    classificationName &&
    !state.classifications.some((classification) => classification.name === classificationName)
  ) {
    warnings.push(`clasificación "${classificationName}" no está registrada`);
  }

  if (!String(row.sku || "").trim()) {
    warnings.push("sin SKU, se creará como producto nuevo");
  }

  return { errors, warnings, fieldErrors };
}

function normalizeImportCsvRow(rawRow) {
  const get = (...keys) => {
    for (const key of keys) {
      const normalized = normalizeCsvHeaderKey(key);
      if (rawRow[normalized] !== undefined && rawRow[normalized] !== "") return rawRow[normalized];
      if (rawRow[key] !== undefined && rawRow[key] !== "") return rawRow[key];
    }
    return "";
  };

  const expiresAt = get("caducidad", "expiresat", "expiresAt", "fecha_caducidad");
  const listPrice = get("precio_venta", "regularprice", "regularPrice", "price", "precio");

  return {
    sku: get("sku"),
    name: get("name", "nombre"),
    description: get("description", "descripcion"),
    category: get("category", "categoria"),
    classification: get("classification", "clasificacion", "type"),
    laboratory: get("laboratory", "laboratorio"),
    stock: get("stock"),
    minStock: get("minstock", "minStock"),
    maxStock: get("maxstock", "maxStock"),
    lot: get("lot", "lote"),
    expiresAt,
    caducidad: expiresAt,
    cost: get("cost", "costo"),
    precio_venta: listPrice,
    regularPrice: listPrice,
    price: get("price", "precio", "precio_venta", "regularprice", "regularPrice"),
    promotionalPrice: get("promotionalprice", "promotionalPrice", "precio_promocional", "discountprice", "discountPrice"),
    discountPrice: get("discountprice", "discountPrice", "precio_promocional", "promotionalprice", "promotionalPrice"),
    imageUrl: get("imageurl", "imageUrl", "imagen_url"),
    status: get("status", "estado", "activo") || "Activo",
  };
}

function findProductBySku(sku) {
  const normalized = String(sku || "").trim().toLowerCase();
  if (!normalized) return null;
  return state.products.find((product) => String(product.sku || "").trim().toLowerCase() === normalized) || null;
}

function buildImportProductPayload(row, existing, options = {}) {
  const keepCurrentImagesWhenEmpty = options.keepCurrentImagesWhenEmpty !== false;
  const listPrice = toNumber(getImportRowPrice(row));
  const promoRaw = row.promotionalPrice || row.discountPrice;
  const promoPrice = promoRaw === "" || promoRaw == null ? null : toNumber(promoRaw);
  const hasStock = row.stock !== "" && row.stock != null;
  const payload = {
    sku: String(row.sku || "").trim(),
    name: String(row.name || "").trim(),
    description: String(row.description || "").trim(),
    category: String(row.category || "").trim(),
    type: String(row.classification || "").trim(),
    laboratory: String(row.laboratory || "").trim(),
    minStock: row.minStock === "" ? 0 : toInteger(row.minStock),
    maxStock: row.maxStock === "" ? 0 : toInteger(row.maxStock),
    lot: String(row.lot || "").trim(),
    lote: String(row.lot || "").trim(),
    expiresAt: String(row.expiresAt || row.caducidad || "").trim(),
    cost: row.cost === "" ? 0 : toNumber(row.cost),
    regularPrice: listPrice,
    price: listPrice,
    discountPrice: promoPrice,
    promotionalPrice: promoPrice,
    status: String(row.status || "Activo").trim() === "Pausado" ? "Pausado" : "Activo",
    requiresRecipe: classificationRequiresRecipe(row.classification),
    iva: false,
  };

  if (hasStock) payload.stock = toInteger(row.stock);
  else if (!existing) payload.stock = 0;

  const imageUrl = String(row.imageUrl || "").trim();
  if (imageUrl) {
    payload.imageUrl = imageUrl;
  } else if (!keepCurrentImagesWhenEmpty) {
    payload.imageUrl = "";
  }

  if (existing) {
    payload.id = existing.id;
    if (!imageUrl && keepCurrentImagesWhenEmpty) delete payload.imageUrl;
  }

  return payload;
}

function resetImportProductsUi(options = {}) {
  if (!options.keepFile && elements.importProductsCsvFile) elements.importProductsCsvFile.value = "";
  if (!options.keepFile && elements.importProductsFileName) {
    elements.importProductsFileName.textContent = "Ningún archivo seleccionado";
  }
  if (elements.importProductsPreviewPanel) elements.importProductsPreviewPanel.hidden = true;
  if (elements.importProductsPreviewWorkspace) elements.importProductsPreviewWorkspace.hidden = false;
  if (elements.importProductsFinalPanel) {
    elements.importProductsFinalPanel.hidden = true;
    elements.importProductsFinalPanel.classList.remove("is-success", "is-partial");
  }
  if (elements.importProductsPreviewTable) elements.importProductsPreviewTable.innerHTML = "";
  if (elements.importProductsStats) elements.importProductsStats.innerHTML = "";
  if (elements.confirmProductsImportButton) elements.confirmProductsImportButton.disabled = true;
  if (elements.revalidateProductsImportButton) elements.revalidateProductsImportButton.disabled = true;
  if (elements.importProductsWarnings) {
    elements.importProductsWarnings.hidden = true;
    elements.importProductsWarnings.innerHTML = "";
  }
  if (elements.importProductsErrors) {
    elements.importProductsErrors.hidden = true;
    elements.importProductsErrors.classList.remove("is-success");
    elements.importProductsErrors.innerHTML = "";
  }
  if (elements.importProductsFinalErrors) {
    elements.importProductsFinalErrors.hidden = true;
    elements.importProductsFinalErrors.innerHTML = "";
  }
  if (elements.importProductsFinalSummary) elements.importProductsFinalSummary.textContent = "";
  if (elements.importProductsFinalMessage) {
    elements.importProductsFinalMessage.hidden = true;
    elements.importProductsFinalMessage.textContent = "";
  }
  if (!options.keepSession) state.csvImportSession = null;
}

function showImportFinalSummary(summary) {
  const hasRowErrors = summary.errors.length > 0;
  const summaryLine = `Creados: ${summary.created} · Actualizados: ${summary.updated} · Errores: ${summary.errors.length}`;

  if (elements.importProductsPreviewPanel) elements.importProductsPreviewPanel.hidden = false;
  if (elements.importProductsPreviewWorkspace) elements.importProductsPreviewWorkspace.hidden = true;
  if (elements.importProductsFinalPanel) {
    elements.importProductsFinalPanel.hidden = false;
    elements.importProductsFinalPanel.classList.toggle("is-success", !hasRowErrors);
    elements.importProductsFinalPanel.classList.toggle("is-partial", hasRowErrors);
  }

  if (elements.importProductsFinalTitle) {
    elements.importProductsFinalTitle.textContent = hasRowErrors
      ? "Importación finalizada con errores"
      : "Importación finalizada";
  }
  if (elements.importProductsFinalMessage) {
    elements.importProductsFinalMessage.hidden = hasRowErrors;
    elements.importProductsFinalMessage.textContent = "Importación finalizada correctamente.";
  }
  if (elements.importProductsFinalSummary) {
    elements.importProductsFinalSummary.textContent = summaryLine;
  }
  if (elements.importProductsFinalErrors) {
    if (hasRowErrors) {
      elements.importProductsFinalErrors.hidden = false;
      elements.importProductsFinalErrors.innerHTML = `
        <p><strong>Filas con error al guardar</strong></p>
        <ul>${summary.errors
          .slice(0, 30)
          .map((item) => `<li>Fila ${item.rowNumber}: ${escapeHTML(item.message)}</li>`)
          .join("")}</ul>
        ${summary.errors.length > 30 ? `<p>… y ${summary.errors.length - 30} errores más.</p>` : ""}
      `;
    } else {
      elements.importProductsFinalErrors.hidden = true;
      elements.importProductsFinalErrors.innerHTML = "";
    }
  }

  if (elements.importProductsCsvFile) elements.importProductsCsvFile.value = "";
  if (elements.importProductsFileName) {
    elements.importProductsFileName.textContent = "Ningún archivo seleccionado";
  }
  state.csvImportSession = null;
}

function startAnotherProductsImport() {
  resetImportProductsUi();
  elements.importProductsCsvFile?.click();
}

function goToProductsListAfterImport() {
  resetImportProductsUi();
  showView("productos", { productsSection: "products-list" });
}

function handleImportCsvFileSelect(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (elements.importProductsFileName) elements.importProductsFileName.textContent = file.name;
  if (elements.importProductsFinalPanel) {
    elements.importProductsFinalPanel.hidden = true;
    elements.importProductsFinalPanel.classList.remove("is-success", "is-partial");
  }
  if (elements.importProductsPreviewWorkspace) elements.importProductsPreviewWorkspace.hidden = false;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsedRows = parseProductsCsv(String(reader.result || ""));
      state.csvImportSession = parsedRows;
      renderImportProductsPreview(parsedRows);
    } catch (error) {
      resetImportProductsUi({ keepFile: true, keepSession: true });
      showToast(error.message || "No se pudo leer el CSV");
    }
  };
  reader.onerror = () => showToast("No se pudo leer el archivo CSV");
  reader.readAsText(file, "UTF-8");
}

function parseProductsCsv(text) {
  const matrix = parseCsvText(text);
  if (!matrix.length) throw new Error("El archivo CSV está vacío");

  const headers = matrix[0].map((header) => normalizeCsvHeaderKey(header));
  const dataRows = matrix.slice(1).filter((row) => row.some((cell) => String(cell || "").trim()));

  const rows = dataRows.map((values, index) => {
    const raw = mapCsvRow(headers, values);
    const data = normalizeImportCsvRow(raw);
    const validated = validateImportCsvRow(data);
    const existing = findProductBySku(data.sku);
    return {
      rowNumber: index + 2,
      data,
      errors: validated.errors,
      warnings: validated.warnings,
      fieldErrors: validated.fieldErrors,
      action: existing ? "update" : "create",
    };
  });

  const session = { rows };
  recomputeImportSessionStats(session);
  return session;
}

function revalidateImportRow(row) {
  const validated = validateImportCsvRow(row.data);
  row.errors = validated.errors;
  row.warnings = validated.warnings;
  row.fieldErrors = validated.fieldErrors;
  row.action = findProductBySku(row.data.sku) ? "update" : "create";
}

function recomputeImportSessionStats(session) {
  session.validRows = session.rows.filter((row) => !row.errors.length);
  session.invalidRows = session.rows.filter((row) => row.errors.length);
  session.warningRows = session.rows.filter((row) => row.warnings.length);
  session.total = session.rows.length;
  session.validCount = session.validRows.length;
  session.errorCount = session.invalidRows.length;
  session.createCount = session.validRows.filter((row) => row.action === "create").length;
  session.updateCount = session.validRows.filter((row) => row.action === "update").length;
}

function revalidateImportSession(session) {
  session.rows.forEach((row) => revalidateImportRow(row));
  recomputeImportSessionStats(session);
}

function syncImportRowsFromDom(session) {
  if (!elements.importProductsPreviewTable) return;
  elements.importProductsPreviewTable.querySelectorAll("tr[data-import-row]").forEach((tr) => {
    const rowIndex = Number(tr.dataset.importRow);
    const row = session.rows[rowIndex];
    if (!row) return;
    tr.querySelectorAll("[data-import-field]").forEach((input) => {
      applyImportFieldValue(row.data, input.dataset.importField, input.value);
    });
  });
}

function renderImportEditableField(row, fieldConfig) {
  const { field, type } = fieldConfig;
  const value = getImportFieldValue(row.data, field);
  const invalidClass = row.fieldErrors?.[field] ? " is-invalid" : "";
  const title = row.fieldErrors?.[field] ? escapeHTML(row.fieldErrors[field]) : "";

  if (type === "status") {
    const status = value || "Activo";
    return `
      <td>
        <select class="product-import-cell-input${invalidClass}" data-import-field="${field}" title="${title}">
          <option value="Activo" ${status === "Activo" ? "selected" : ""}>Activo</option>
          <option value="Pausado" ${status === "Pausado" ? "selected" : ""}>Pausado</option>
        </select>
      </td>
    `;
  }

  return `
    <td>
      <input
        type="text"
        class="product-import-cell-input${invalidClass}"
        data-import-field="${field}"
        value="${escapeHTML(value)}"
        title="${title}"
      />
    </td>
  `;
}

function renderImportProductsPreview(session) {
  if (!elements.importProductsPreviewPanel) return;

  elements.importProductsPreviewPanel.hidden = false;
  if (elements.importProductsPreviewWorkspace) elements.importProductsPreviewWorkspace.hidden = false;
  if (elements.importProductsFinalPanel) {
    elements.importProductsFinalPanel.hidden = true;
    elements.importProductsFinalPanel.classList.remove("is-success", "is-partial");
  }
  updateImportPreviewMeta(session);

  if (elements.importProductsPreviewTable) {
    elements.importProductsPreviewTable.innerHTML = session.rows.length
      ? session.rows
          .map((row, rowIndex) => {
            const statusLabel = row.errors.length ? "Error" : row.action === "update" ? "Actualizar" : "Crear";
            const statusClass = row.errors.length ? "is-error" : row.action === "update" ? "is-update" : "is-create";
            const validationText = row.errors.length
              ? row.errors.join("; ")
              : row.warnings.length
                ? row.warnings.join("; ")
                : "OK";
            const editableCells = PRODUCT_IMPORT_EDITABLE_FIELDS.map((fieldConfig) =>
              renderImportEditableField(row, fieldConfig),
            ).join("");
            return `
              <tr data-import-row="${rowIndex}" class="${row.errors.length ? "is-import-error-row" : ""}">
                <td class="product-import-row-number">${row.rowNumber}</td>
                ${editableCells}
                <td class="product-import-action"><span class="product-io-badge ${statusClass}">${statusLabel}</span></td>
                <td class="product-import-validation">${escapeHTML(validationText)}</td>
              </tr>
            `;
          })
          .join("")
      : tableEmpty(PRODUCT_IMPORT_EDITABLE_FIELDS.length + 3, "Sin filas para previsualizar.");
  }
}

function updateImportPreviewMeta(session) {
  if (elements.importProductsStats) {
    elements.importProductsStats.innerHTML = `
      <span>Total filas: <strong>${session.total}</strong></span>
      <span>Válidas: <strong>${session.validCount}</strong></span>
      <span>Con error: <strong>${session.errorCount}</strong></span>
      <span>Crear: <strong>${session.createCount}</strong></span>
      <span>Actualizar: <strong>${session.updateCount}</strong></span>
    `;
  }

  if (elements.importProductsWarnings) {
    if (session.warningRows.length) {
      elements.importProductsWarnings.hidden = false;
      elements.importProductsWarnings.innerHTML = `
        <p><strong>Advertencias (no bloquean la importación).</strong></p>
        <ul>${session.warningRows
          .slice(0, 50)
          .map((row) => `<li>Fila ${row.rowNumber}: ${escapeHTML(row.warnings.join("; "))}</li>`)
          .join("")}</ul>
        ${session.warningRows.length > 50 ? `<p>… y ${session.warningRows.length - 50} filas más con advertencias.</p>` : ""}
      `;
    } else {
      elements.importProductsWarnings.hidden = true;
      elements.importProductsWarnings.innerHTML = "";
    }
  }

  if (elements.importProductsErrors) {
    if (session.errorCount) {
      elements.importProductsErrors.hidden = false;
      elements.importProductsErrors.classList.remove("is-success");
      elements.importProductsErrors.innerHTML = `
        <p><strong>Corrige los errores antes de importar.</strong></p>
        <ul>${session.invalidRows
          .slice(0, 50)
          .map((row) => `<li>Fila ${row.rowNumber}: ${escapeHTML(row.errors.join("; "))}</li>`)
          .join("")}</ul>
        ${session.invalidRows.length > 50 ? `<p>… y ${session.invalidRows.length - 50} filas más con error.</p>` : ""}
      `;
    } else if (session.validCount) {
      elements.importProductsErrors.hidden = false;
      elements.importProductsErrors.classList.add("is-success");
      elements.importProductsErrors.innerHTML = `<p><strong>Datos válidos. Puedes confirmar la importación.</strong></p>`;
    } else {
      elements.importProductsErrors.hidden = true;
      elements.importProductsErrors.classList.remove("is-success");
      elements.importProductsErrors.innerHTML = "";
    }
  }

  if (elements.confirmProductsImportButton) {
    elements.confirmProductsImportButton.disabled = session.errorCount > 0 || session.validCount === 0;
  }
  if (elements.revalidateProductsImportButton) {
    elements.revalidateProductsImportButton.disabled = !session.rows.length;
  }
}

function refreshImportPreviewRowUi(session, rowIndex) {
  const row = session.rows[rowIndex];
  const tr = elements.importProductsPreviewTable?.querySelector(`tr[data-import-row="${rowIndex}"]`);
  if (!row || !tr) return;

  tr.classList.toggle("is-import-error-row", row.errors.length > 0);
  tr.querySelectorAll("[data-import-field]").forEach((input) => {
    const field = input.dataset.importField;
    const fieldError = row.fieldErrors?.[field];
    input.classList.toggle("is-invalid", Boolean(fieldError));
    input.title = fieldError || "";
    if (field === "caducidad" && row.data.caducidad && input.value !== row.data.caducidad) {
      input.value = row.data.caducidad;
    }
  });

  const statusLabel = row.errors.length ? "Error" : row.action === "update" ? "Actualizar" : "Crear";
  const statusClass = row.errors.length ? "is-error" : row.action === "update" ? "is-update" : "is-create";
  const validationText = row.errors.length
    ? row.errors.join("; ")
    : row.warnings.length
      ? row.warnings.join("; ")
      : "OK";

  const badge = tr.querySelector(".product-import-action .product-io-badge");
  if (badge) {
    badge.className = `product-io-badge ${statusClass}`;
    badge.textContent = statusLabel;
  }
  const validationCell = tr.querySelector(".product-import-validation");
  if (validationCell) validationCell.textContent = validationText;
}

function handleImportPreviewInput(event) {
  const input = event.target.closest("[data-import-field]");
  if (!input || !state.csvImportSession) return;
  const tr = input.closest("tr[data-import-row]");
  if (!tr) return;
  const row = state.csvImportSession.rows[Number(tr.dataset.importRow)];
  if (!row) return;
  applyImportFieldValue(row.data, input.dataset.importField, input.value);
  input.classList.remove("is-invalid");
}

function handleImportPreviewBlur(event) {
  const input = event.target.closest("[data-import-field]");
  if (!input || !state.csvImportSession) return;
  const tr = input.closest("tr[data-import-row]");
  if (!tr) return;
  const rowIndex = Number(tr.dataset.importRow);
  const row = state.csvImportSession.rows[rowIndex];
  if (!row) return;
  applyImportFieldValue(row.data, input.dataset.importField, input.value);
  revalidateImportRow(row);
  recomputeImportSessionStats(state.csvImportSession);
  refreshImportPreviewRowUi(state.csvImportSession, rowIndex);
  updateImportPreviewMeta(state.csvImportSession);
}

function revalidateProductsImport() {
  const session = state.csvImportSession;
  if (!session) return showToast("Selecciona un archivo CSV primero");
  syncImportRowsFromDom(session);
  revalidateImportSession(session);
  renderImportProductsPreview(session);
  showToast(
    session.errorCount
      ? `Quedan ${session.errorCount} fila${session.errorCount === 1 ? "" : "s"} con error`
      : "Datos válidos. Puedes confirmar la importación.",
  );
}

async function confirmProductsImport() {
  const session = state.csvImportSession;
  if (!session) return showToast("Selecciona un archivo CSV primero");
  syncImportRowsFromDom(session);
  revalidateImportSession(session);
  renderImportProductsPreview(session);
  if (session.errorCount > 0) return showToast("Corrige los errores del CSV antes de importar");
  if (!session.validCount) return showToast("No hay filas válidas para importar");

  const keepCurrentImagesWhenEmpty = elements.importProductsKeepCurrentImages?.checked !== false;
  const summary = { created: 0, updated: 0, errors: [] };
  const createdInBatch = new Map();

  if (elements.confirmProductsImportButton) elements.confirmProductsImportButton.disabled = true;

  for (const row of session.validRows) {
    try {
      const skuKey = String(row.data.sku || "").trim().toLowerCase();
      let existing = findProductBySku(row.data.sku);
      if (!existing && skuKey && createdInBatch.has(skuKey)) {
        existing = createdInBatch.get(skuKey);
      }
      const payload = buildImportProductPayload(row.data, existing, { keepCurrentImagesWhenEmpty });
      if (existing) {
        const saved = await saveProductToApi({ ...existing, ...payload, id: existing.id });
        if (skuKey && saved) createdInBatch.set(skuKey, saved);
        summary.updated += 1;
      } else {
        const saved = await saveProductToApi(payload);
        if (skuKey && saved) createdInBatch.set(skuKey, saved);
        summary.created += 1;
      }
    } catch (error) {
      summary.errors.push({ rowNumber: row.rowNumber, message: error.message || "Error al guardar" });
    }
  }

  await loadProducts();

  const totalSuccess = summary.created + summary.updated;
  if (totalSuccess === 0) {
    if (elements.confirmProductsImportButton) {
      elements.confirmProductsImportButton.disabled = false;
    }
    if (summary.errors.length && elements.importProductsErrors) {
      elements.importProductsErrors.hidden = false;
      elements.importProductsErrors.classList.remove("is-success");
      elements.importProductsErrors.innerHTML = `
        <p><strong>No se pudo importar ningún producto.</strong></p>
        <ul>${summary.errors
          .map((item) => `<li>Fila ${item.rowNumber}: ${escapeHTML(item.message)}</li>`)
          .join("")}</ul>
      `;
    }
    showToast("No se pudo importar ningún producto. Corrige los datos e intenta de nuevo.");
    return;
  }

  showImportFinalSummary(summary);
  showToast(
    summary.errors.length
      ? `Importación con ${summary.errors.length} error${summary.errors.length === 1 ? "" : "es"}`
      : "Importación finalizada correctamente.",
  );
}

function updateProductsModuleTitle() {
  const section = state.productsSection || "products-list";
  updateViewHeader(
    `Productos · ${productsSectionTitles[section] || "Lista de productos"}`,
    productsSectionDescriptions[section] || viewDescriptions.productos,
  );
}

function openProductForm() {
  clearProductForm();
  renderProductCatalogSelects();
  showView("product-form");
}

function closeProductForm() {
  showView("productos", { productsSection: "products-list" });
}

function scrollWorkspaceToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
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
  renderCommercialProfileSelect(elements.customerType?.value || "General");
  renderOrders();
  renderProducts();
  renderCategories();
  renderClassifications();
  renderProductCatalogSelects();
  renderInventory();
  renderSales();
  renderShipments();
  renderPayments();
  renderCustomerSelects();
}

async function loadRealConversations(options = {}) {
  try {
    const response = await fetch(conversationsApiUrl);
    if (!response.ok) throw new Error("Backend no disponible");

    const data = await response.json();
    if (!Array.isArray(data.conversations)) throw new Error("Respuesta invalida");

    const selectedId = state.selectedConversationId;
    state.conversations = data.conversations.map(mapServerConversation);
    state.usingRealConversations = true;
    state.selectedConversationId = state.conversations.some((conversation) => conversation.id === selectedId)
      ? selectedId
      : state.conversations[0]?.id || "";
    state.lastConversationsUpdate = new Date().toISOString();
    if (!state.conversations.length) {
      elements.chatLog.innerHTML = emptyState("Sin historial real.");
    }
    renderConversations({ forceChatRender: options.forceChatRender });
    if (options.manual) showToast("Conversaciones actualizadas");
  } catch {
    state.conversations = [];
    state.usingRealConversations = false;
    state.selectedConversationId = "";
    state.lastConversationsUpdate = "";
    state.renderedConversationId = "";
    state.renderedMessageSignature = "";
    elements.conversationList.innerHTML = emptyState("No se pudo cargar historial real");
    elements.chatLog.innerHTML = emptyState("No se pudo cargar historial real");
    renderConversationProfile(null);
    renderAdvisorAlert(null);
    if (options.manual) showToast("No se pudo cargar historial real");
  }
}

function mapServerConversation(conversation) {
  const customer = conversation.clientes || {};
  return {
    id: conversation.id,
    customerName: customer.nombre || "Cliente WhatsApp",
    phone: customer.telefono || "Por identificar",
    status: normalizeConversationStatus(conversation.estado),
    lastMessage: conversation.ultimo_mensaje || "Sin mensaje reciente",
    createdAt: conversation.ultimo_mensaje_at || conversation.created_at || new Date().toISOString(),
    messages: uniqueMessages((conversation.mensajes || []).map(mapServerMessage)),
  };
}

function mapServerMessage(message) {
  return {
    id: message.id,
    type: message.direccion === "saliente" ? "business" : "customer",
    message: message.mensaje,
    createdAt: message.created_at,
  };
}

function uniqueMessages(messages) {
  const seen = new Set();
  return messages.filter((message) => {
    const key = message.id || `${message.type}-${message.createdAt}-${message.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeConversationStatus(status) {
  const value = String(status || "nuevo").toLowerCase();
  if (value.includes("asesor")) return "Asesor humano";
  if (value.includes("pedido")) return "Pedido";
  if (value.includes("entregado")) return "Entregado";
  return "Nuevo";
}

function renderDashboard() {
  const today = new Date().toDateString();
  const openOrders = state.orders.filter((order) => isOrderOpen(order));
  const pendingPayments = state.payments.filter((payment) => payment.status !== "Pagado");
  const todaySales = state.sales.filter((sale) => {
    if (new Date(sale.createdAt).toDateString() !== today) return false;
    const status = normalizeSaleStatus(sale.status, sale.paymentStatus);
    return status === "pagada" || status === "completada";
  });
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

  if (elements.dashboardQuickSummary) {
    const activeProducts = state.products.filter((product) => product.status === "Activo").length;
    elements.dashboardQuickSummary.textContent = `Productos ${activeProducts} · Clientes ${getActiveCustomers().length} · Canales 3 · Pedidos hoy ${openOrders.length} · Ventas hoy ${currency.format(salesTotal)}`;
  }

  renderDashboardExpirationAlerts();

  elements.dashboardOrders.innerHTML = state.orders.length
    ? state.orders
        .slice(0, 5)
        .map((order) =>
          listRow(order.id, `${order.customerName} - ${getOrderStatusLabel(order.status)}`, currency.format(order.total)),
        )
        .join("")
    : emptyState("Aun no hay pedidos.");

  elements.dashboardAlerts.innerHTML = lowStock.length
    ? lowStock.map((product) => listRow(product.name, `${product.stock} disponibles`, "Stock bajo")).join("")
    : emptyState("Sin alertas por ahora.");
}

function renderDashboardExpirationAlerts() {
  const activeProducts = state.products.filter((product) => product.status === "Activo");
  renderExpirationAlertsSummary(elements.dashboardExpirationAlerts, activeProducts);
}

function renderExpirationAlertsSummary(container, products, options = {}) {
  if (!container) return;

  const clickable = Boolean(options.clickable);
  const summary = getExpirationSummary(products);
  const items = [
    { key: "red", label: "0 días / vencidos", className: "is-expiration-red" },
    { key: "orange", label: "15 días", className: "is-expiration-orange" },
    { key: "yellow", label: "1 mes", className: "is-expiration-yellow" },
    { key: "green", label: "2 meses", className: "is-expiration-green" },
    { key: "blue", label: "3 meses", className: "is-expiration-blue" },
    { key: "noAlert", label: "Sin alerta", className: "is-expiration-safe", discrete: true },
  ];

  function summaryCount(key) {
    if (key === "noAlert") return summary.noAlert;
    return summary[key] ?? 0;
  }

  function cardMarkup(item) {
    const active = state.expirationFilter === item.key ? " is-active-filter" : "";
    const discreteClass = item.discrete ? " is-discrete" : "";
    const interactive = clickable
      ? ` role="button" tabindex="0" data-action="filter-expiration" data-level="${item.key}"`
      : "";
    return `
      <article class="expiration-summary-card ${item.className}${discreteClass}${clickable ? " is-clickable" : ""}${active}"${interactive}>
        <span>${item.label}</span>
        <strong>${summaryCount(item.key)}</strong>
      </article>
    `;
  }

  container.innerHTML = products.length
    ? items.map((item) => cardMarkup(item)).join("")
    : emptyState("Sin alertas de caducidad en productos activos.");
}

function setProductExpirationFilter(level) {
  state.expirationFilter = level ? String(level) : null;
  updateProductListFilterBar();
  renderProducts();
  renderExpirationAlertsSummary(
    elements.inventoryExpirationAlerts,
    state.products.filter((product) => product.status === "Activo"),
    { clickable: true },
  );
}

function clearExpirationFilter() {
  state.expirationFilter = null;
  updateProductListFilterBar();
  const activeProducts = state.products.filter((product) => product.status === "Activo");
  renderExpirationAlertsSummary(elements.inventoryExpirationAlerts, activeProducts, { clickable: true });
  renderProducts();
}

function updateProductListFilterBar() {
  if (!elements.expirationAlertsFilterActions) return;
  const active = Boolean(state.expirationFilter);
  elements.expirationAlertsFilterActions.hidden = !active;
  if (elements.productListFilterChip) {
    elements.productListFilterChip.textContent = active
      ? `Mostrando: ${EXPIRATION_FILTER_LABELS[state.expirationFilter] || state.expirationFilter}`
      : "";
    elements.productListFilterChip.hidden = !active;
  }
}

function getFilteredProducts(options = {}) {
  const applyExpiration = options.applyExpirationFilter !== false;
  const expirationFilter = applyExpiration ? state.expirationFilter : null;
  const query = state.productQuery;

  return state.products.filter((product) => {
    const laboratory = inventoryLaboratory(product);
    const text = `${product.sku || ""} ${product.name} ${product.category} ${product.type} ${product.status} ${product.substance || ""} ${laboratory}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    const matchesExpiration = productMatchesExpirationFilter(product, expirationFilter);
    return matchesQuery && matchesExpiration;
  });
}

function getProductStoredPromotionalPrice(product) {
  if (product.promotionalPrice != null && product.promotionalPrice !== "") return toNumber(product.promotionalPrice);
  const salePrice = toNumber(product.regularPrice ?? product.price);
  if (product.discountPrice != null && product.discountPrice !== "" && toNumber(product.discountPrice) !== salePrice) {
    return toNumber(product.discountPrice);
  }
  return null;
}

function seedChat() {
  elements.chatLog.innerHTML = "";
  addBubble("customer", "Hola, quiero comprar medicamentos");
  addBubble("business", buildWelcomeMessage());
}

async function simulateIncomingMessage(event) {
  event.preventDefault();
  const message = elements.incomingMessage.value.trim();
  if (!message) return;

  const responseMessage = buildWelcomeMessage();
  addBubble("customer", message);
  addBubble("business", responseMessage);
  state.conversations.unshift({
    id: createId("conv"),
    customerName: "Cliente WhatsApp",
    phone: "Por identificar",
    status: conversationStatusFromMessage(message),
    lastMessage: message,
    createdAt: new Date().toISOString(),
  });
  persist(storageKeys.conversations, state.conversations);
  elements.incomingMessage.value = "";
  renderConversations();

  try {
    await sendWhatsApp(elements.businessPhone.value, responseMessage);
    showToast("Mensaje enviado por WhatsApp");
  } catch (error) {
    showToast(error.message);
  }
}

function addBubble(type, message, createdAt = new Date().toISOString()) {
  const node = document.createElement("div");
  node.className = `bubble ${type}`;
  node.innerHTML = `${escapeHTML(message).replaceAll("\n", "<br>")}<time>${formatTime(createdAt)}</time>`;
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

async function sendWhatsApp(telefono, mensaje) {
  const response = await fetch("/api/send-whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telefono, mensaje }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "No se pudo enviar WhatsApp");
  return data;
}

function saveSettings() {
  state.settings = {
    storeLink: elements.storeLink.value.trim(),
    businessPhone: elements.businessPhone.value.trim(),
    welcomeMessage: elements.welcomeMessage.value.trim(),
  };
  persist(storageKeys.settings, state.settings);
}

function renderConversations(options = {}) {
  const conversations = state.conversations.filter((conversation) => {
    const text = `${conversation.customerName} ${conversation.phone} ${conversation.lastMessage} ${conversation.status}`.toLowerCase();
    return text.includes(state.conversationQuery);
  });
  const selected = conversations.find((conversation) => conversation.id === state.selectedConversationId) || conversations[0];
  if (selected) state.selectedConversationId = selected.id;

  elements.conversationList.innerHTML = `
    <div class="conversation-sync-status">
      <strong><span></span>En linea</strong>
      <small>Ultima actualizacion: ${state.lastConversationsUpdate ? formatFullTime(state.lastConversationsUpdate) : "--:--:--"}</small>
    </div>
    <button class="ghost-button small refresh-conversations-button" type="button" data-action="refresh-conversations">Actualizar ahora</button>
    ${
      conversations.length
        ? conversations
        .slice(0, 12)
        .map(
          (conversation) => `
            <article class="conversation-item ${conversation.id === state.selectedConversationId ? "active" : ""}" data-action="select-conversation" data-id="${conversation.id}">
              <div class="conversation-avatar">${escapeHTML(initials(conversation.customerName))}</div>
              <div class="conversation-main">
                <strong>${escapeHTML(conversation.customerName)}</strong>
                <span>${escapeHTML(conversation.lastMessage)}</span>
                <div class="conversation-meta">
                  <small>${formatTime(conversation.createdAt)}</small>
                  <em class="conversation-status ${conversationStatusClass(conversation.status)}">${escapeHTML(conversation.status)}</em>
                </div>
              </div>
            </article>
          `,
        )
        .join("")
        : emptyState(state.usingRealConversations ? "Sin historial real." : "No se pudo cargar historial real")
    }
  `;

  renderConversationProfile(selected);
  renderConversationMessages(selected, options);
  renderAdvisorAlert(selected);
}

function selectConversation(id) {
  state.selectedConversationId = id;
  renderConversations({ forceChatRender: true });
}

function renderConversationMessages(conversation, options = {}) {
  if (!conversation) {
    state.renderedConversationId = "";
    state.renderedMessageSignature = "";
    elements.chatLog.innerHTML = emptyState(state.usingRealConversations ? "Sin historial real." : "No se pudo cargar historial real");
    return;
  }

  if (!conversation.messages?.length) {
    state.renderedConversationId = conversation.id;
    state.renderedMessageSignature = "";
    elements.chatLog.innerHTML = emptyState("Esta conversacion aun no tiene mensajes.");
    return;
  }

  const signature = conversation.messages.map((message) => message.id || `${message.type}-${message.createdAt}-${message.message}`).join("|");
  const shouldRender =
    options.forceChatRender ||
    conversation.id !== state.renderedConversationId ||
    signature !== state.renderedMessageSignature;

  if (!shouldRender) return;

  elements.chatLog.innerHTML = "";
  conversation.messages.forEach((message) => addBubble(message.type, message.message, message.createdAt));
  state.renderedConversationId = conversation.id;
  state.renderedMessageSignature = signature;
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function renderConversationProfile(conversation) {
  if (!conversation) {
    elements.profileName.textContent = "Cliente WhatsApp";
    elements.profilePhone.textContent = "Por identificar";
    elements.profileLastMessage.textContent = "Sin mensaje reciente";
    elements.profileStatus.textContent = "Nuevo";
    return;
  }

  elements.profileName.textContent = conversation.customerName;
  elements.profilePhone.textContent = conversation.phone;
  elements.profileLastMessage.textContent = conversation.lastMessage;
  elements.profileStatus.innerHTML = `<span class="profile-status-badge ${conversationStatusClass(conversation.status)}">${escapeHTML(conversation.status)}</span>`;
}

function renderAdvisorAlert(conversation) {
  const alertConversation =
    conversation?.status === "Asesor humano" ? conversation : state.conversations.find((item) => item.status === "Asesor humano");

  if (!alertConversation) {
    elements.advisorAlert.classList.add("is-hidden");
    elements.advisorAlert.innerHTML = "";
    return;
  }

  elements.advisorAlert.classList.remove("is-hidden");
  elements.advisorAlert.innerHTML = `
    <strong>Solicitud de asesor humano</strong>
    <span>Cliente: ${escapeHTML(alertConversation.customerName)}</span>
    <span>Telefono: ${escapeHTML(alertConversation.phone)}</span>
    <span>Mensaje: ${escapeHTML(alertConversation.lastMessage)}</span>
    <button class="primary-button small" type="button" data-action="take-conversation">Tomar conversacion</button>
  `;
}

function conversationStatusFromMessage(message) {
  const text = message.toLowerCase();
  if (text.includes("asesor") || text.includes("humano")) return "Asesor humano";
  if (text.includes("pedido")) return "Pedido";
  return "Nuevo";
}

function conversationStatusClass(status) {
  if (status === "Asesor humano") return "human";
  if (status === "Pedido") return "order";
  if (status === "Entregado") return "delivered";
  return "new";
}

function updateLatestConversation(status) {
  if (!state.conversations.length) return showToast("Sin conversaciones");
  const conversation = state.conversations.find((item) => item.id === state.selectedConversationId) || state.conversations[0];
  conversation.status = status;
  persist(storageKeys.conversations, state.conversations);
  renderConversations();
  showToast(`Conversacion marcada: ${status}`);
}

function sendStoreLinkToConversation() {
  addBubble("business", buildWelcomeMessage());
  showToast("Liga de tienda enviada");
}

function renderStore() {
  const categoryNames = [
    "Todas",
    ...new Set(
      state.products
        .filter((product) => product.status === "Activo" && isCategoryVisibleInStore(product.category))
        .map((product) => product.category)
        .filter(Boolean),
    ),
  ];
  const categories = categoryNames;
  elements.storeCategory.innerHTML = categories
    .map((category) => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`)
    .join("");
  elements.storeCategory.value = state.storeCategory;
  elements.storeCategoryMenu.innerHTML = categories
    .map((category) => {
      const count =
        category === "Todas"
          ? state.products.filter((product) => product.status === "Activo" && isCategoryVisibleInStore(product.category)).length
          : state.products.filter((product) => product.status === "Activo" && product.category === category).length;
      return `
        <button class="${category === state.storeCategory ? "active" : ""}" type="button" data-category="${escapeHTML(category)}">
          <span>${escapeHTML(category)}</span>
          <strong>${count}</strong>
        </button>
      `;
    })
    .join("");

  const products = state.products.filter((product) => {
    const matchesCategory = state.storeCategory === "Todas" || product.category === state.storeCategory;
    const text = `${product.sku || ""} ${product.name} ${product.category} ${product.description}`.toLowerCase();
    return (
      product.status === "Activo" &&
      isCategoryVisibleInStore(product.category) &&
      matchesCategory &&
      text.includes(state.storeQuery)
    );
  });

  elements.storeProductGrid.innerHTML = products.length
    ? products
        .map(
          (product) => `
            <article class="product-card">
              <div class="product-visual">
                ${product.imageUrl ? `<img src="${escapeHTML(product.imageUrl)}" alt="${escapeHTML(product.name)}" loading="lazy" />` : ""}
                <span>${escapeHTML(product.type)}</span>
              </div>
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

function handleStoreCategoryClick(event) {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.storeCategory = button.dataset.category;
  elements.storeCategory.value = state.storeCategory;
  renderStore();
  scrollStoreSection("products");
}

function scrollStoreSection(section) {
  const targets = {
    home: "#storeHomeAnchor",
    products: "#storeProductsAnchor",
    categories: "#storeCategoriesAnchor",
    promos: "#storePromosAnchor",
    cart: ".store-cart",
  };
  const target = document.querySelector(targets[section] || "#storeProductsAnchor");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const paymentStatus = elements.storePaymentMethod.value === "Pendiente" ? "pendiente" : "pagado";
  const deliveryType = elements.storeDeliveryType.value === "Nacional" ? "paqueteria" : "envio_local";
  const initialStatus = resolveInitialOrderStatus({
    origin: "tienda_en_linea",
    paymentStatus,
    deliveryType,
  });
  const order = normalizeOrder({
    id: getNextOrderFolio(),
    customerId: customer.id,
    customerName: customer.name,
    origin: "tienda_en_linea",
    status: initialStatus,
    paymentStatus: resolveInitialOrderPaymentStatus(paymentStatus, initialStatus),
    paymentMethod: elements.storePaymentMethod.value === "Pendiente" ? "pendiente" : normalizePaymentMethod(elements.storePaymentMethod.value),
    deliveryType,
    address: elements.storeAddress.value.trim(),
    subtotal: totals.subtotal,
    discount: 0,
    shipping: totals.shipping,
    total: totals.total,
    items: state.storeCart.map((item) => {
      const product = getProduct(item.productId);
      const unitPrice = toNumber(product.discountPrice ?? product.price ?? product.regularPrice);
      return normalizeOrderItem({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice,
      });
    }),
    createdAt: new Date().toISOString(),
  });

  if (paymentStatus === "pagado") {
    for (const item of order.items) {
      const product = getProduct(item.productId);
      if (!product || product.stock < item.quantity) return showToast(`Stock insuficiente: ${product?.name || item.productId}`);
    }
  }

  state.orders.unshift(order);
  syncOrderPaymentRecord(order);
  syncOrderShipmentRecord(order);
  if (paymentStatus === "pagado") {
    deductOrderInventory(order);
    createSaleFromOrder(order);
  } else {
    createSaleFromOrder(order, { pending: true });
  }
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
  const customer = normalizeCustomer({
    id: createId("cust"),
    name: elements.storeRegisterName.value.trim(),
    phone: elements.storeRegisterPhone.value.trim(),
    email: elements.storeRegisterEmail.value.trim(),
    address: elements.storeRegisterAddress.value.trim(),
    account: true,
    createdAt: new Date().toISOString(),
  });
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
  const options = getActiveCustomers()
    .map((customer) => `<option value="${customer.id}">${escapeHTML(customer.name)}</option>`)
    .join("");
  elements.storeCustomer.innerHTML = options || '<option value="">Sin clientes</option>';
}

function renderCommercialProfileSelect(selectedName = "General") {
  if (!elements.customerType) return;
  const selected = String(selectedName || "General").trim();
  const knownNames = new Set(state.commercialProfiles.map((profile) => profile.name));
  const options = state.commercialProfiles
    .map(
      (profile) =>
        `<option value="${escapeHTML(profile.name)}"${profile.name === selected ? " selected" : ""}>${escapeHTML(profile.name)}</option>`,
    )
    .join("");
  const orphanOption =
    selected && !knownNames.has(selected)
      ? `<option value="${escapeHTML(selected)}" selected>${escapeHTML(selected)} (perfil anterior)</option>`
      : "";
  elements.customerType.innerHTML = orphanOption + options;
  renderCommercialProfileInfo(selected);
}

function resolveCustomerCommercialTerms(customerType, existingCustomer = null) {
  const profile = getCommercialProfileByName(customerType);
  if (profile) {
    return {
      discountPercent: profile.suggestedDiscount,
      creditLimit: profile.creditAllowed ? profile.suggestedCreditLimit : null,
    };
  }
  return {
    discountPercent: existingCustomer?.discountPercent ?? 0,
    creditLimit: existingCustomer?.creditLimit ?? null,
  };
}

function renderCommercialProfileInfo(profileName) {
  const profile = getCommercialProfileByName(profileName);
  const hasName = Boolean(String(profileName || "").trim());

  if (elements.commercialProfileInfo) {
    elements.commercialProfileInfo.hidden = !profile;
  }
  if (elements.commercialProfileHint) {
    if (!profile && hasName) {
      elements.commercialProfileHint.textContent =
        "Perfil guardado previamente. Puedes mantenerlo o elegir otro del catálogo.";
      elements.commercialProfileHint.hidden = false;
    } else {
      elements.commercialProfileHint.textContent = "";
      elements.commercialProfileHint.hidden = true;
    }
  }

  if (!profile) return;

  if (elements.commercialProfileInfoDiscount) {
    elements.commercialProfileInfoDiscount.textContent =
      profile.suggestedDiscount > 0 ? `${profile.suggestedDiscount}%` : "Sin descuento";
  }
  if (elements.commercialProfileInfoCredit) {
    elements.commercialProfileInfoCredit.textContent = profile.creditAllowed ? "Sí" : "No";
  }
  if (elements.commercialProfileInfoCreditLimit) {
    elements.commercialProfileInfoCreditLimit.textContent =
      profile.creditAllowed && profile.suggestedCreditLimit != null
        ? currency.format(profile.suggestedCreditLimit)
        : "—";
  }

  const extraRules = [];
  if (profile.minPurchase > 0) extraRules.push(`Compra mínima ${currency.format(profile.minPurchase)}`);
  if (profile.minPieces > 0) extraRules.push(`${profile.minPieces} piezas mínimas`);
  const rulesText = [profile.notes, extraRules.join(" · ")].filter(Boolean).join(" · ") || "Sin reglas definidas";

  if (elements.commercialProfileInfoRules) {
    elements.commercialProfileInfoRules.textContent = rulesText;
  }
}

function handleCustomerProfileSelection() {
  renderCommercialProfileInfo(elements.customerType?.value || "General");
}

function formatCommercialProfileRulesSummary(profile) {
  const parts = [];
  if (profile.minPurchase > 0) parts.push(`Compra mín. ${currency.format(profile.minPurchase)}`);
  if (profile.minPieces > 0) parts.push(`${profile.minPieces} pzas mín.`);
  parts.push(profile.suggestedDiscount > 0 ? `Descuento ${profile.suggestedDiscount}%` : "Sin descuento");
  parts.push(profile.creditAllowed ? "Crédito sí" : "Crédito no");
  if (profile.creditAllowed && profile.suggestedCreditLimit != null) {
    parts.push(`Límite ${currency.format(profile.suggestedCreditLimit)}`);
  }
  return parts.join(" · ");
}

function getCustomersByCommercialProfile(profileName) {
  const target = String(profileName || "")
    .trim()
    .toLowerCase();
  if (!target) return [];
  return (Array.isArray(state.customers) ? state.customers : []).filter(
    (customer) => String(customer.customerType || "").trim().toLowerCase() === target,
  );
}

function ensureDefaultCommercialProfile() {
  if (state.commercialProfiles.length > 0) return;
  const general = normalizeCommercialProfile(initialCommercialProfiles[0]);
  state.commercialProfiles.push(general);
  persist(storageKeys.commercialProfiles, state.commercialProfiles);
}

function setCommercialProfileFormMode(mode = "new") {
  if (elements.commercialProfileFormTitle) {
    elements.commercialProfileFormTitle.textContent = mode === "edit" ? "Editar perfil" : "Nuevo perfil";
  }
}

function renderCommercialProfilesList() {
  if (!elements.commercialProfilesList) return;
  const selectedId = elements.commercialProfileId?.value || "";
  elements.commercialProfilesList.innerHTML = state.commercialProfiles.length
    ? state.commercialProfiles
        .map((profile) => {
          const selectedClass = profile.id === selectedId ? " is-selected" : "";
          return `
            <article class="commercial-profile-item${selectedClass}">
              <div>
                <strong>${escapeHTML(profile.name)}</strong>
                <span>${escapeHTML(formatCommercialProfileRulesSummary(profile))}</span>
              </div>
              <div class="commercial-profile-item-actions">
                <button class="customer-action-btn is-neutral" type="button" data-action="edit-commercial-profile" data-id="${escapeHTML(profile.id)}">Editar</button>
                <button class="customer-action-btn is-danger commercial-profile-delete-btn" type="button" data-action="delete-commercial-profile" data-id="${escapeHTML(profile.id)}">Eliminar</button>
              </div>
            </article>
          `;
        })
        .join("")
    : emptyState("No hay perfiles comerciales.");
}

function clearCommercialProfileForm() {
  elements.commercialProfileForm?.reset();
  if (elements.commercialProfileId) elements.commercialProfileId.value = "";
  if (elements.commercialProfileCreditAllowed) elements.commercialProfileCreditAllowed.checked = false;
  setCommercialProfileFormMode("new");
  renderCommercialProfilesList();
}

function populateCommercialProfileForm(profile) {
  const normalized = normalizeCommercialProfile(profile);
  elements.commercialProfileId.value = normalized.id;
  elements.commercialProfileName.value = normalized.name;
  elements.commercialProfileMinPurchase.value =
    normalized.minPurchase > 0 ? String(normalized.minPurchase) : "";
  elements.commercialProfileMinPieces.value =
    normalized.minPieces > 0 ? String(normalized.minPieces) : "";
  elements.commercialProfileSuggestedDiscount.value =
    normalized.suggestedDiscount > 0 ? String(normalized.suggestedDiscount) : "";
  elements.commercialProfileCreditAllowed.checked = normalized.creditAllowed;
  elements.commercialProfileSuggestedCreditLimit.value =
    normalized.suggestedCreditLimit != null ? String(normalized.suggestedCreditLimit) : "";
  elements.commercialProfileNotes.value = normalized.notes;
  setCommercialProfileFormMode("edit");
  renderCommercialProfilesList();
}

function openCommercialProfilesDialog() {
  renderCommercialProfilesList();
  clearCommercialProfileForm();
  setCommercialProfileFormMode("new");
  elements.customerCommercialProfilesDialog?.showModal();
}

function closeCommercialProfilesDialog() {
  elements.customerCommercialProfilesDialog?.close();
  clearCommercialProfileForm();
  hideCommercialProfileFeedback();
}

function hideCommercialProfileFeedback() {
  if (!elements.commercialProfileFeedback) return;
  elements.commercialProfileFeedback.hidden = true;
  elements.commercialProfileFeedback.classList.remove("is-visible");
  elements.commercialProfileFeedback.textContent = "";
  window.clearTimeout(showCommercialProfileFeedback.timeout);
}

function editCommercialProfile(id) {
  const profile = getCommercialProfileById(id);
  if (!profile) return showToast("Perfil comercial no encontrado");
  populateCommercialProfileForm(profile);
}

async function deleteCommercialProfile(id) {
  const profile = getCommercialProfileById(id);
  if (!profile) return showToast("Perfil comercial no encontrado");

  const associatedCustomers = getCustomersByCommercialProfile(profile.name);
  if (associatedCustomers.length > 0) {
    await openProductActionDialog({
      title: "No se puede eliminar este perfil",
      message:
        "No se puede eliminar este perfil porque tiene clientes asociados. Cambia primero el perfil de esos clientes y vuelve a intentarlo.\n\n" +
        `Clientes asociados: ${associatedCustomers.length}`,
      confirmLabel: "Entendido",
      confirmClass: "primary-button",
    });
    return;
  }

  const confirmed = await openProductActionDialog({
    title: "Eliminar perfil comercial",
    message: `¿Eliminar el perfil comercial "${profile.name}"? Esta acción no afectará clientes porque no hay clientes asociados.`,
    confirmLabel: "Eliminar perfil",
    confirmClass: "primary-button is-danger",
  });
  if (!confirmed) return;

  const wasEditingDeleted = elements.commercialProfileId?.value === profile.id;
  state.commercialProfiles = state.commercialProfiles.filter((item) => item.id !== profile.id);
  ensureDefaultCommercialProfile();
  persist(storageKeys.commercialProfiles, state.commercialProfiles);
  renderCommercialProfilesList();
  renderCommercialProfileSelect(elements.customerType?.value || "General");

  if (wasEditingDeleted) {
    clearCommercialProfileForm();
  }

  showToast(`Perfil "${profile.name}" eliminado`);
}

function saveCommercialProfile(event) {
  event.preventDefault();
  const id = elements.commercialProfileId.value || createId("prof");
  const name = elements.commercialProfileName.value.trim();
  if (!name) return showToast("El nombre del perfil es obligatorio");
  const duplicate = state.commercialProfiles.find(
    (profile) => profile.name.trim().toLowerCase() === name.toLowerCase() && profile.id !== id,
  );
  if (duplicate) return showToast("Ya existe un perfil con ese nombre");

  const profile = normalizeCommercialProfile({
    id,
    name,
    minPurchase: elements.commercialProfileMinPurchase.value,
    minPieces: elements.commercialProfileMinPieces.value,
    suggestedDiscount: elements.commercialProfileSuggestedDiscount.value,
    creditAllowed: elements.commercialProfileCreditAllowed.checked,
    suggestedCreditLimit: elements.commercialProfileSuggestedCreditLimit.value,
    notes: elements.commercialProfileNotes.value.trim(),
  });

  const index = state.commercialProfiles.findIndex((item) => item.id === id);
  if (index >= 0) state.commercialProfiles[index] = profile;
  else state.commercialProfiles.push(profile);

  persist(storageKeys.commercialProfiles, state.commercialProfiles);
  renderCommercialProfilesList();
  renderCommercialProfileSelect(elements.customerType?.value || profile.name);
  populateCommercialProfileForm(profile);
  showToast(index >= 0 ? "Perfil comercial actualizado" : "Perfil comercial agregado");
}

function cleanPhoneDigits(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function cleanPhoneForWhatsApp(phone) {
  const digits = cleanPhoneDigits(phone);
  if (digits.length === 10) return `52${digits}`;
  return digits;
}

function showCustomerContactError(message) {
  if (!elements.customerContactError) return;
  if (!message) {
    elements.customerContactError.hidden = true;
    elements.customerContactError.textContent = "";
    return;
  }
  elements.customerContactError.hidden = false;
  elements.customerContactError.textContent = message;
}

function openCustomerContactDialog(id) {
  const customer = getCustomer(id);
  if (!customer) return showToast("Cliente no encontrado");
  customerContactContext = customer;
  showCustomerContactError("");
  if (elements.customerContactTitle) {
    elements.customerContactTitle.textContent = `Contactar a ${customer.name || "cliente"}`;
  }
  if (elements.customerContactSummary) {
    elements.customerContactSummary.innerHTML = `
      <div class="customer-contact-summary-row"><span>Nombre</span><strong>${escapeHTML(customer.name || "No informado")}</strong></div>
      <div class="customer-contact-summary-row"><span>Teléfono</span><strong>${escapeHTML(customer.phone || "—")}</strong></div>
      <div class="customer-contact-summary-row"><span>Correo</span><strong>${escapeHTML(customer.email || "—")}</strong></div>
      <div class="customer-contact-summary-row"><span>Preferencia</span><strong>${escapeHTML(customer.contactPreference || "—")}</strong></div>
    `;
  }
  elements.customerContactDialog?.showModal();
}

function handleCustomerContactEmail() {
  const customer = customerContactContext;
  if (!customer) return;
  const email = String(customer.email || "").trim();
  if (!email) {
    showCustomerContactError("Este cliente no tiene correo registrado.");
    return;
  }
  showCustomerContactError("");
  const subject = encodeURIComponent("Contacto farmacia");
  const body = encodeURIComponent(
    `Hola ${customer.name || ""}, te contactamos de la farmacia. ¿En qué podemos ayudarte?`,
  );
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
}

function handleCustomerContactWhatsApp() {
  const customer = customerContactContext;
  if (!customer) return;
  const digits = cleanPhoneForWhatsApp(customer.phone);
  if (!digits) {
    showCustomerContactError("Este cliente no tiene teléfono registrado.");
    return;
  }
  showCustomerContactError("");
  const message = encodeURIComponent(
    `Hola ${customer.name || ""}, te contactamos de la farmacia.`,
  );
  window.open(`https://wa.me/${digits}?text=${message}`, "_blank", "noopener,noreferrer");
}

function handleCustomerContactCall() {
  const customer = customerContactContext;
  if (!customer) return;
  const phone = String(customer.phone || "").trim();
  if (!phone) {
    showCustomerContactError("Este cliente no tiene teléfono registrado.");
    return;
  }
  showCustomerContactError("");
  window.location.href = `tel:${phone.replace(/\s+/g, "")}`;
}

function renderCustomerStatusBadge(customer) {
  const isActive = customer.active !== false;
  return `<span class="customer-status-badge ${isActive ? "is-active" : "is-inactive"}">${isActive ? "Activo" : "Inactivo"}</span>`;
}

function renderCustomerActionsMarkup(customer) {
  const customerId = escapeHTML(customer.id);
  const isActive = customer.active !== false;
  const toggleAction = isActive ? "deactivate-customer" : "reactivate-customer";
  const toggleLabel = isActive ? "Desactivar" : "Reactivar";
  const toggleClass = isActive ? "is-danger" : "is-success";
  const toggleTitle = isActive ? "Desactivar cliente" : "Reactivar cliente";
  return `
    <div class="customer-admin-actions">
      <button class="customer-action-btn is-neutral" type="button" data-action="edit-customer" data-id="${customerId}" title="Editar cliente">Editar</button>
      <button class="customer-action-btn is-contact" type="button" data-action="contact-customer" data-id="${customerId}" title="Contactar cliente">Contactar</button>
      <button class="customer-action-btn ${toggleClass}" type="button" data-action="${toggleAction}" data-id="${customerId}" title="${toggleTitle}">${toggleLabel}</button>
    </div>
  `;
}

function renderCustomerLastPurchaseCell(lastOrder) {
  if (!lastOrder) return '<span class="customer-muted">Sin compras</span>';
  const date = formatShortDate(lastOrder.createdAt) || "—";
  return `<div class="customer-last-order"><strong>${escapeHTML(lastOrder.id)}</strong><span>${escapeHTML(date)}</span></div>`;
}

function renderCustomers() {
  if (!elements.customerTable) return;

  const customers = state.customers.filter((customer) =>
    getCustomerSearchText(customer).includes(state.customerQuery),
  );

  if (elements.customerListCount) {
    elements.customerListCount.textContent = `${customers.length} cliente${customers.length === 1 ? "" : "s"}`;
  }

  if (elements.customerListFooter) {
    if (!customers.length) {
      elements.customerListFooter.textContent = "Mostrando 0 clientes";
    } else {
      elements.customerListFooter.textContent = `Mostrando 1-${customers.length} clientes de ${customers.length}`;
    }
  }

  elements.customerTable.innerHTML = customers.length
    ? customers
        .map((customer) => {
          const { total, lastOrder } = getCustomerOrderStats(customer.id);
          const rowClass = customer.active === false ? "customer-admin-row is-inactive" : "customer-admin-row";
          return `
            <tr class="${rowClass}">
              <td class="customer-col-name"><a class="customer-name-link" href="#" data-action="edit-customer" data-id="${escapeHTML(customer.id)}">${escapeHTML(customer.name || "No informado")}</a></td>
              <td>${escapeHTML(customer.phone || "—")}</td>
              <td>${escapeHTML(customer.email || "—")}</td>
              <td>${renderCustomerStatusBadge(customer)}</td>
              <td>${renderCustomerLastPurchaseCell(lastOrder)}</td>
              <td class="customer-col-total"><strong>${currency.format(total || 0)}</strong></td>
              <td class="customer-col-actions">${renderCustomerActionsMarkup(customer)}</td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(7, "No hay clientes registrados. Usa «Agregar cliente» para crear el primero.");
}

function readCustomerFormValues() {
  return {
    name: elements.customerName?.value.trim() || "",
    phone: elements.customerPhone?.value.trim() || "",
    email: elements.customerEmail?.value.trim() || "",
    street: elements.customerStreet?.value.trim() || "",
    streetNumber: elements.customerStreetNumber?.value.trim() || "",
    addressLine2: elements.customerAddressLine2?.value.trim() || "",
    postalCode: elements.customerPostalCode?.value.trim() || "",
    neighborhood: elements.customerNeighborhood?.value.trim() || "",
    city: elements.customerCity?.value.trim() || "",
    state: elements.customerState?.value.trim() || "",
    country: elements.customerCountry?.value.trim() || "México",
    customerType: elements.customerType?.value || "General",
    rfc: elements.customerRfc?.value.trim() || "",
    internalNotes: elements.customerInternalNotes?.value.trim() || "",
    contactPreference: elements.customerContactPreference?.value || "WhatsApp",
  };
}

function populateCustomerForm(customer) {
  const normalized = normalizeCustomer(customer);
  elements.customerId.value = normalized.id || "";
  elements.customerName.value = normalized.name;
  elements.customerPhone.value = normalized.phone;
  elements.customerEmail.value = normalized.email;
  elements.customerStreet.value = normalized.street;
  elements.customerStreetNumber.value = normalized.streetNumber;
  elements.customerAddressLine2.value = normalized.addressLine2;
  elements.customerPostalCode.value = normalized.postalCode;
  elements.customerNeighborhood.value = normalized.neighborhood;
  elements.customerCity.value = normalized.city;
  elements.customerState.value = normalized.state;
  elements.customerCountry.value = normalized.country || "México";
  renderCommercialProfileSelect(normalized.customerType);
  elements.customerRfc.value = normalized.rfc;
  elements.customerInternalNotes.value = normalized.internalNotes;
  elements.customerContactPreference.value = normalized.contactPreference || "WhatsApp";
}

function setCustomerFormMode(mode) {
  customerFormMode = mode;
  elements.customerForm?.querySelectorAll("input, select, textarea, button").forEach((field) => {
    if (field.id === "customerId") return;
    if (field.id === "manageCommercialProfilesButton") return;
    if (field.type === "submit") return;
    field.disabled = false;
  });
  if (elements.saveCustomerFormButton) elements.saveCustomerFormButton.hidden = false;
  if (elements.clearCustomerForm) elements.clearCustomerForm.hidden = false;
  if (elements.manageCommercialProfilesButton) elements.manageCommercialProfilesButton.disabled = false;
}

function openCustomerForm(customer = null, options = {}) {
  clearCustomerForm();
  if (customer) populateCustomerForm(customer);
  elements.customerFormTitle.textContent = customer ? "Editar cliente" : "Agregar cliente";
  setCustomerFormMode(customer ? "edit" : "create");
  showView("customer-form");
}

function closeCustomerForm() {
  clearCustomerForm();
  showView("clientes");
}

function saveCustomer(event) {
  event.preventDefault();

  const id = elements.customerId.value || createId("cust");
  const existing = getCustomer(id);
  const formValues = readCustomerFormValues();
  const commercialTerms = resolveCustomerCommercialTerms(formValues.customerType, existing);
  const customer = normalizeCustomer({
    id,
    ...formValues,
    discountPercent: commercialTerms.discountPercent,
    creditLimit: commercialTerms.creditLimit,
    active: existing?.active !== false,
    createdAt: existing?.createdAt || new Date().toISOString(),
  });

  if (!customer.name) return showToast("El nombre es obligatorio");
  if (!customer.phone) return showToast("El teléfono es obligatorio");

  const index = state.customers.findIndex((item) => item.id === id);
  if (index >= 0) state.customers[index] = customer;
  else state.customers.unshift(customer);

  persist(storageKeys.customers, state.customers);
  clearCustomerForm();
  renderCustomers();
  renderCustomerSelects();
  showView("clientes");
  showToast(existing ? "Cliente actualizado" : "Cliente guardado");
}

function editCustomer(id) {
  const customer = getCustomer(id);
  if (!customer) return showToast("Cliente no encontrado");
  openCustomerForm(customer);
}

function deactivateCustomer(id) {
  const customer = getCustomer(id);
  if (!customer) return showToast("Cliente no encontrado");
  if (customer.active === false) return showToast("Este cliente ya está inactivo");
  const orders = getCustomerOrderStats(id).orders.length;
  customer.active = false;
  const index = state.customers.findIndex((item) => item.id === id);
  if (index >= 0) state.customers[index] = customer;
  persist(storageKeys.customers, state.customers);
  renderCustomers();
  renderCustomerSelects();
  showToast(
    orders > 0
      ? "Cliente desactivado. Sigue visible en la lista con estado Inactivo."
      : "Cliente desactivado",
  );
}

function reactivateCustomer(id) {
  const customer = getCustomer(id);
  if (!customer) return showToast("Cliente no encontrado");
  if (customer.active !== false) return showToast("Este cliente ya está activo");
  customer.active = true;
  const index = state.customers.findIndex((item) => item.id === id);
  if (index >= 0) state.customers[index] = customer;
  persist(storageKeys.customers, state.customers);
  renderCustomers();
  renderCustomerSelects();
  showToast("Cliente reactivado");
}

function clearCustomerForm() {
  elements.customerForm?.reset();
  elements.customerId.value = "";
  if (elements.customerCountry) elements.customerCountry.value = "México";
  renderCommercialProfileSelect("General");
  if (elements.customerContactPreference) elements.customerContactPreference.value = "WhatsApp";
  if (elements.commercialProfileHint) {
    elements.commercialProfileHint.textContent = "";
    elements.commercialProfileHint.hidden = true;
  }
  if (elements.commercialProfileInfo) elements.commercialProfileInfo.hidden = true;
  elements.customerFormTitle.textContent = "Agregar cliente";
  setCustomerFormMode("create");
}

function normalizeOrderStatus(status) {
  const value = String(status || "").trim();
  if (ORDER_STATUS_META[value]) return value;
  return LEGACY_ORDER_STATUS_MAP[value] || "nuevo";
}

function normalizePaymentStatus(status, paymentMethod = "") {
  const value = String(status || "").trim().toLowerCase();
  if (value === "pagado" || value === "paid") return "pagado";
  if (value === "vencido" || value === "overdue") return "vencido";
  if (paymentMethod === "Pendiente" || value === "pendiente") return "pendiente";
  return "pendiente";
}

function normalizeOrderOrigin(origin) {
  const value = String(origin || "manual").trim().toLowerCase();
  if (ORDER_ORIGIN_LABELS[value]) return value;
  if (value.includes("tienda")) return "tienda_en_linea";
  if (value.includes("whats")) return "whatsapp";
  if (value.includes("tel")) return "telefono";
  if (value.includes("mostrador")) return "mostrador";
  return "manual";
}

function normalizeDeliveryType(value) {
  const raw = String(value || "pendiente").trim().toLowerCase();
  if (DELIVERY_TYPE_LABELS[raw]) return raw;
  if (raw === "local") return "envio_local";
  if (raw === "nacional") return "paqueteria";
  if (raw.includes("directa") || raw.includes("sin entrega")) return "venta_directa";
  return "pendiente";
}

function getOrderFlowProfile(origin, deliveryType) {
  const normalizedOrigin = normalizeOrderOrigin(origin);
  const normalizedDelivery = normalizeDeliveryType(deliveryType);

  if (normalizedOrigin === "mostrador") {
    return normalizedDelivery === "recoger_tienda" ? "mostrador_pickup" : "mostrador_direct";
  }
  if (normalizedDelivery === "recoger_tienda") return "pickup";
  if (normalizedDelivery === "envio_local" || normalizedDelivery === "paqueteria") return "shipping";
  return "shipping";
}

function getOrderFlowByOriginAndDelivery(origin, deliveryType) {
  return getOrderFlowProfile(origin, deliveryType);
}

function getAllowedOrderStatuses(order) {
  const profile = getOrderFlowProfile(order.origin, order.deliveryType);
  return FLOW_ALLOWED_STATUSES[profile] || FLOW_ALLOWED_STATUSES.shipping;
}

function isOrderStatusAllowed(order, status) {
  return getAllowedOrderStatuses(order).includes(normalizeOrderStatus(status));
}

function getAllowedOrderActions(order) {
  const status = normalizeOrderStatus(order.status);
  const profile = getOrderFlowProfile(order.origin, order.deliveryType);

  if (status === "cancelado" || status === "completado") return [];

  const actions = [];
  const add = (action, label, className = "is-neutral") => {
    actions.push({ action, label, className });
  };

  if (profile === "mostrador_direct") {
    if (status === "nuevo" || status === "por_cobrar") {
      add("order-mark-paid", "Cobrar", "is-success");
      add("order-cancel", "Cancelar", "is-danger");
    } else if (status === "cobrado") {
      add("order-mark-completed", "Completar", "is-success");
      add("order-cancel", "Cancelar", "is-danger");
    }
    return actions;
  }

  if (profile === "shipping") {
    if (status === "nuevo") {
      add("order-mark-awaiting-payment", "Marcar por cobrar", "is-neutral");
      add("order-cancel", "Cancelar", "is-danger");
    } else if (status === "por_cobrar") {
      add("order-mark-paid", "Cobrar", "is-success");
      add("order-cancel", "Cancelar", "is-danger");
    } else if (status === "cobrado") {
      add("order-mark-awaiting-shipment", "Por enviar", "is-neutral");
      add("order-cancel", "Cancelar", "is-danger");
    } else if (status === "por_enviar") {
      add("order-mark-shipped", "Enviado", "is-neutral");
      add("order-cancel", "Cancelar", "is-danger");
    } else if (status === "enviado") {
      add("order-mark-completed", "Completar", "is-success");
    }
    return actions;
  }

  // pickup + mostrador_pickup
  if (status === "nuevo") {
    add("order-mark-awaiting-payment", "Marcar por cobrar", "is-neutral");
    add("order-cancel", "Cancelar", "is-danger");
  } else if (status === "por_cobrar") {
    add("order-mark-paid", "Cobrar", "is-success");
    add("order-cancel", "Cancelar", "is-danger");
  } else if (status === "cobrado") {
    add("order-mark-ready-pickup", "Por retirar", "is-neutral");
    add("order-cancel", "Cancelar", "is-danger");
  } else if (status === "por_retirar") {
    add("order-mark-completed", "Completar", "is-success");
  }
  return actions;
}

function getNextOrderActions(order) {
  return getAllowedOrderActions(order);
}

function transitionOrderStatus(order, nextStatus, options = {}) {
  const target = normalizeOrderStatus(nextStatus);
  if (!isOrderStatusAllowed(order, target)) {
    showToast("Este estado no aplica para este tipo de pedido.");
    return false;
  }
  order.status = target;
  if (options.paymentStatus) order.paymentStatus = normalizePaymentStatus(options.paymentStatus);
  return true;
}

function normalizePaymentMethod(method) {
  const value = String(method || "efectivo").trim().toLowerCase();
  const map = {
    efectivo: "efectivo",
    transferencia: "transferencia",
    tarjeta: "tarjeta",
    "mercado pago": "mercado_pago",
    mercado_pago: "mercado_pago",
    clip: "clip",
    otro: "otro",
    pendiente: "pendiente",
  };
  return map[value] || "otro";
}

function normalizeOrderItem(item = {}) {
  const quantity = Math.max(1, toInteger(item.quantity));
  const unitPrice = toNumber(item.unitPrice ?? item.price);
  const normalized = {
    productId: item.productId || "",
    name: item.name || "Producto",
    quantity,
    unitPrice,
    price: unitPrice,
    subtotal: toNumber(item.subtotal ?? unitPrice * quantity),
  };
  if (item.cost != null && item.cost !== "") normalized.cost = toNumber(item.cost);
  return normalized;
}

function normalizeOrder(order = {}) {
  const paymentStatus = normalizePaymentStatus(order.paymentStatus, order.paymentMethod);
  let status = normalizeOrderStatus(order.status);
  const deliveryType = normalizeDeliveryType(order.deliveryType);
  const origin = normalizeOrderOrigin(order.origin);
  const items = Array.isArray(order.items) ? order.items.map(normalizeOrderItem) : [];
  const subtotal = toNumber(order.subtotal ?? items.reduce((sum, item) => sum + item.subtotal, 0));
  const discount = toNumber(order.discount);
  const shipping = toNumber(order.shipping ?? order.shippingCost);
  const total = toNumber(order.total ?? subtotal - discount + shipping);

  const normalized = {
    id: order.id || getNextOrderFolio(),
    customerId: order.customerId || "",
    customerName: order.customerName || "Cliente no informado",
    origin,
    status: status === "cancelado" ? "cancelado" : status,
    paymentStatus,
    paymentMethod: normalizePaymentMethod(order.paymentMethod),
    deliveryType,
    address: order.address || "",
    subtotal,
    discount,
    shipping,
    total,
    items,
    notes: order.notes || "",
    inventoryDeducted: Boolean(order.inventoryDeducted),
    createdAt: order.createdAt || new Date().toISOString(),
    updatedAt: order.updatedAt || order.createdAt || new Date().toISOString(),
  };

  if (!isOrderStatusAllowed(normalized, normalized.status)) {
    if (paymentStatus === "pagado" && normalized.status === "por_enviar" && !isOrderStatusAllowed(normalized, "por_enviar")) {
      normalized.status = isOrderStatusAllowed(normalized, "cobrado") ? "cobrado" : "completado";
    } else if (paymentStatus === "pagado" && isOrderStatusAllowed(normalized, "cobrado")) {
      normalized.status = "cobrado";
    } else if (!isOrderStatusAllowed(normalized, normalized.status)) {
      normalized.status = "por_cobrar";
    }
  }

  return normalized;
}

function normalizeSaleStatus(status, paymentStatus = "") {
  const value = String(status || "").trim().toLowerCase();
  if (value === "enviada") return "pagada";
  if (SALE_STATUS_META[value]) return value;
  if (value === "pagado" || paymentStatus === "pagado") return "pagada";
  if (value === "completado") return "completada";
  if (value === "cancelado") return "cancelada";
  return "por_cobrar";
}

function normalizeSale(sale = {}) {
  const items = Array.isArray(sale.items) ? sale.items.map(normalizeOrderItem) : [];
  const paymentStatus = normalizePaymentStatus(sale.paymentStatus, sale.paymentMethod);
  return {
    id: sale.id || getNextSaleId(),
    orderId: sale.orderId || "",
    customerId: sale.customerId || "",
    customerName: sale.customerName || "Cliente no informado",
    origin: normalizeOrderOrigin(sale.origin),
    status: normalizeSaleStatus(sale.status, paymentStatus),
    paymentStatus,
    paymentMethod: normalizePaymentMethod(sale.paymentMethod),
    deliveryType: normalizeDeliveryType(sale.deliveryType),
    total: toNumber(sale.total ?? items.reduce((sum, item) => sum + item.subtotal, 0)),
    items,
    productSummary: sale.productSummary || summarizeSaleProducts(items),
    notes: sale.notes || "",
    createdAt: sale.createdAt || new Date().toISOString(),
  };
}

function getNextOrderFolio() {
  const current = toInteger(localStorage.getItem(storageKeys.orderSeq) || 1000);
  const next = current + 1;
  localStorage.setItem(storageKeys.orderSeq, String(next));
  return `#${next}`;
}

function getNextSaleId() {
  const current = toInteger(localStorage.getItem(storageKeys.saleSeq) || 1000);
  const next = current + 1;
  localStorage.setItem(storageKeys.saleSeq, String(next));
  return `VT-${next}`;
}

function summarizeSaleProducts(items = []) {
  const count = items.reduce((sum, item) => sum + toInteger(item.quantity), 0);
  if (!count) return "Sin productos";
  return count === 1 ? "1 producto" : `${count} productos`;
}

function getOrderStatusLabel(status) {
  return ORDER_STATUS_META[normalizeOrderStatus(status)]?.label || status;
}

function getSaleStatusLabel(status) {
  return SALE_STATUS_META[normalizeSaleStatus(status)]?.label || status;
}

function getOrderOriginLabel(origin) {
  return ORDER_ORIGIN_LABELS[normalizeOrderOrigin(origin)] || origin;
}

function getPaymentStatusLabel(status) {
  return PAYMENT_STATUS_LABELS[normalizePaymentStatus(status)] || status;
}

function getPaymentMethodLabel(method) {
  return PAYMENT_METHOD_LABELS[normalizePaymentMethod(method)] || method;
}

function getDeliveryTypeLabel(type) {
  return DELIVERY_TYPE_LABELS[normalizeDeliveryType(type)] || type;
}

function isOrderOpen(order) {
  const status = normalizeOrderStatus(order.status);
  return status !== "completado" && status !== "cancelado";
}

function resolveInitialOrderStatus({ origin, paymentStatus, deliveryType }) {
  const profile = getOrderFlowProfile(origin, deliveryType);
  const delivery = normalizeDeliveryType(deliveryType);

  if (paymentStatus !== "pagado") {
    if (profile === "mostrador_direct") return "por_cobrar";
    return profile === "shipping" || profile === "pickup" ? "nuevo" : "por_cobrar";
  }

  if (profile === "mostrador_direct") return "completado";
  return "cobrado";
}

function resolveInitialOrderPaymentStatus(paymentStatus, orderStatus) {
  if (normalizeOrderStatus(orderStatus) === "completado") return "pagado";
  return normalizePaymentStatus(paymentStatus);
}

function migrateCommerceState() {
  state.orders = (Array.isArray(state.orders) ? state.orders : []).map(normalizeOrder);
  state.sales = (Array.isArray(state.sales) ? state.sales : []).map(normalizeSale);
}

function ensureCommerceDemoData() {
  if (state.orders.length) {
    persist(storageKeys.orders, state.orders);
    persist(storageKeys.sales, state.sales);
    return;
  }

  localStorage.setItem(storageKeys.orderSeq, "1005");
  localStorage.setItem(storageKeys.saleSeq, "1005");

  const demoItemsA = [
    { productId: "demo-1", name: "Paracetamol 500 mg", quantity: 2, unitPrice: 89, subtotal: 178 },
    { productId: "demo-2", name: "Suero oral 1 L", quantity: 1, unitPrice: 45, subtotal: 45 },
  ];
  const demoItemsB = [
    { productId: "demo-3", name: "Alcohol gel 500 ml", quantity: 3, unitPrice: 68, subtotal: 204 },
  ];
  const demoItemsC = [
    { productId: "demo-4", name: "Vitamina C 1 g", quantity: 1, unitPrice: 206, subtotal: 206 },
  ];
  const demoItemsD = [
    { productId: "demo-5", name: "Ibuprofeno 400 mg", quantity: 2, unitPrice: 55, subtotal: 110 },
  ];

  state.orders = [
    normalizeOrder({
      id: "#1001",
      customerName: "Venta mostrador",
      origin: "mostrador",
      status: "completado",
      paymentStatus: "pagado",
      paymentMethod: "efectivo",
      deliveryType: "venta_directa",
      subtotal: 204,
      discount: 0,
      shipping: 0,
      total: 204,
      items: demoItemsB,
      inventoryDeducted: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    }),
    normalizeOrder({
      id: "#1002",
      customerName: "Ángel Lucero",
      origin: "whatsapp",
      status: "por_cobrar",
      paymentStatus: "pendiente",
      paymentMethod: "transferencia",
      deliveryType: "envio_local",
      subtotal: 223,
      discount: 0,
      shipping: 49,
      total: 272,
      items: demoItemsA,
      notes: "Envío local por la tarde.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }),
    normalizeOrder({
      id: "#1003",
      customerName: "María Gómez",
      origin: "whatsapp",
      status: "por_enviar",
      paymentStatus: "pagado",
      paymentMethod: "transferencia",
      deliveryType: "envio_local",
      subtotal: 110,
      discount: 0,
      shipping: 39,
      total: 149,
      items: demoItemsD,
      inventoryDeducted: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    }),
    normalizeOrder({
      id: "#1004",
      customerName: "Carlos Ruiz",
      origin: "whatsapp",
      status: "por_retirar",
      paymentStatus: "pagado",
      paymentMethod: "efectivo",
      deliveryType: "recoger_tienda",
      subtotal: 178,
      discount: 0,
      shipping: 0,
      total: 178,
      items: [{ productId: "demo-1", name: "Paracetamol 500 mg", quantity: 2, unitPrice: 89, subtotal: 178 }],
      inventoryDeducted: true,
      createdAt: new Date(Date.now() - 5400000).toISOString(),
    }),
    normalizeOrder({
      id: "#1005",
      customerName: "Laura Martinez",
      customerId: "cust-laura",
      origin: "tienda_en_linea",
      status: "enviado",
      paymentStatus: "pagado",
      paymentMethod: "mercado_pago",
      deliveryType: "paqueteria",
      subtotal: 206,
      discount: 0,
      shipping: 99,
      total: 305,
      items: demoItemsC,
      inventoryDeducted: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }),
  ];

  state.sales = [
    normalizeSale({
      id: "VT-1001",
      customerName: "Venta mostrador",
      origin: "mostrador",
      status: "completada",
      paymentStatus: "pagado",
      paymentMethod: "efectivo",
      deliveryType: "venta_directa",
      total: 204,
      items: [
        { productId: "demo-3", name: "Ibuprofeno 400 mg", quantity: 3, unitPrice: 68, subtotal: 204, cost: 42 },
      ],
      createdAt: new Date(new Date().setHours(11, 15, 0, 0)).toISOString(),
    }),
    normalizeSale({
      id: "VT-1002",
      orderId: "#1002",
      customerName: "Ángel Lucero",
      origin: "whatsapp",
      status: "por_cobrar",
      paymentStatus: "pendiente",
      paymentMethod: "transferencia",
      deliveryType: "envio_local",
      total: 272,
      items: demoItemsA,
      createdAt: new Date(new Date().setHours(16, 40, 0, 0)).toISOString(),
    }),
    normalizeSale({
      id: "VT-1003",
      orderId: "#1003",
      customerName: "María Gómez",
      origin: "whatsapp",
      status: "completada",
      paymentStatus: "pagado",
      paymentMethod: "transferencia",
      deliveryType: "envio_local",
      total: 149,
      items: demoItemsD,
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    }),
    normalizeSale({
      id: "VT-1004",
      customerName: "Pedido cancelado",
      origin: "telefono",
      status: "cancelada",
      paymentStatus: "pendiente",
      paymentMethod: "efectivo",
      deliveryType: "recoger_tienda",
      total: 178,
      items: [{ productId: "demo-1", name: "Paracetamol 500 mg", quantity: 2, unitPrice: 89, subtotal: 178 }],
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    }),
    normalizeSale({
      id: "VT-1005",
      orderId: "#1005",
      customerName: "Laura Martinez",
      origin: "tienda_en_linea",
      status: "pagada",
      paymentStatus: "pagado",
      paymentMethod: "mercado_pago",
      deliveryType: "paqueteria",
      total: 305,
      items: demoItemsC,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }),
  ];

  persist(storageKeys.orders, state.orders);
  persist(storageKeys.sales, state.sales);
}

function countOrdersByStatus(status) {
  if (!status) return state.orders.length;
  return state.orders.filter((order) => normalizeOrderStatus(order.status) === status).length;
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function getWeekStart(date = new Date()) {
  const value = startOfDay(date);
  const weekday = value.getDay();
  const diff = weekday === 0 ? 6 : weekday - 1;
  value.setDate(value.getDate() - diff);
  return value;
}

function getMonthStart(date = new Date()) {
  const value = startOfDay(date);
  value.setDate(1);
  return value;
}

function getSaleDateRangeBounds(rangeFilter, dateFrom = "", dateTo = "") {
  const now = new Date();
  if (rangeFilter === "today") return { start: startOfDay(now), end: endOfDay(now) };
  if (rangeFilter === "week") return { start: getWeekStart(now), end: endOfDay(now) };
  if (rangeFilter === "month") return { start: getMonthStart(now), end: endOfDay(now) };
  if (rangeFilter === "custom" && dateFrom && dateTo) {
    return { start: startOfDay(dateFrom), end: endOfDay(dateTo) };
  }
  return null;
}

function isSaleInDateRange(sale, rangeFilter = "all", dateFrom = "", dateTo = "") {
  if (!rangeFilter || rangeFilter === "all") return true;
  const bounds = getSaleDateRangeBounds(rangeFilter, dateFrom, dateTo);
  if (!bounds) return false;
  const saleDate = new Date(sale.createdAt);
  if (Number.isNaN(saleDate.getTime())) return false;
  return saleDate >= bounds.start && saleDate <= bounds.end;
}

function getProductPurchaseCost(product) {
  if (!product || typeof product !== "object") return null;
  const candidates = [product.cost, product.costo_compra, product.costo, product.precio_compra];
  for (const value of candidates) {
    if (value == null || value === "") continue;
    const parsed = toNumber(value);
    if (parsed > 0) return parsed;
  }
  return null;
}

function calculateSaleCost(sale, products = state.products) {
  const items = Array.isArray(sale.items) ? sale.items : [];
  let totalCost = 0;
  let hasAnyCost = false;

  items.forEach((item) => {
    let unitCost = item.cost != null && item.cost !== "" ? toNumber(item.cost) : null;
    if (unitCost == null && item.productId) {
      const product = products.find((entry) => entry.id === item.productId);
      unitCost = getProductPurchaseCost(product);
    }
    if (unitCost != null && unitCost > 0) {
      hasAnyCost = true;
      totalCost += unitCost * Math.max(1, toInteger(item.quantity));
    }
  });

  return { totalCost, hasAnyCost };
}

function calculateSaleProfit(sale, products = state.products) {
  const total = toNumber(sale.total);
  const { totalCost, hasAnyCost } = calculateSaleCost(sale, products);
  if (!hasAnyCost) return { profit: 0, hasCost: false, cost: 0, total };
  return { profit: total - totalCost, hasCost: true, cost: totalCost, total };
}

function calculateSalesSummary(sales, products = state.products) {
  let totalSold = 0;
  let totalCollected = 0;
  let totalPending = 0;
  let totalProfit = 0;
  let profitKnown = false;
  let profitMissing = false;
  let activeCount = 0;

  sales.forEach((sale) => {
    const status = normalizeSaleStatus(sale.status, sale.paymentStatus);
    const total = toNumber(sale.total);
    if (status === "cancelada") return;

    activeCount += 1;
    totalSold += total;
    if (status === "por_cobrar") totalPending += total;
    if (status === "pagada" || status === "completada") totalCollected += total;

    const profitInfo = calculateSaleProfit(sale, products);
    if (profitInfo.hasCost) {
      profitKnown = true;
      totalProfit += profitInfo.profit;
    } else {
      profitMissing = true;
    }
  });

  return {
    totalSold,
    totalCollected,
    totalPending,
    totalProfit,
    profitKnown,
    profitMissing,
    count: activeCount,
    averageTicket: activeCount > 0 ? totalSold / activeCount : 0,
  };
}

function getSalesForSummary() {
  return state.sales.filter((sale) => {
    const matchesStatus =
      !state.saleStatusFilter || normalizeSaleStatus(sale.status, sale.paymentStatus) === state.saleStatusFilter;
    const matchesRange = isSaleInDateRange(sale, state.saleRangeFilter, state.saleDateFrom, state.saleDateTo);
    return matchesStatus && matchesRange;
  });
}

function getFilteredSales() {
  return getSalesForSummary().filter((sale) => getSaleSearchText(sale).includes(state.saleQuery));
}

function renderSaleRangeFilters() {
  if (!elements.saleRangeFilters) return;
  elements.saleRangeFilters.innerHTML = SALE_RANGE_FILTERS.map((range) => {
    return `
      <button
        class="sales-filter-chip${state.saleRangeFilter === range ? " is-active" : ""}"
        type="button"
        data-action="filter-sales-range"
        data-range="${range}"
      >${SALE_RANGE_LABELS[range] || range}</button>
    `;
  }).join("");

  if (elements.salesCustomRange) {
    elements.salesCustomRange.hidden = state.saleRangeFilter !== "custom";
  }
  if (elements.saleDateFrom && state.saleDateFrom) elements.saleDateFrom.value = state.saleDateFrom;
  if (elements.saleDateTo && state.saleDateTo) elements.saleDateTo.value = state.saleDateTo;
}

function renderSalesSummary(summary) {
  if (!elements.salesSummaryCards) return;

  const profitDisplay = summary.profitKnown ? currency.format(summary.totalProfit) : "$0";
  const profitNote = !summary.profitKnown && summary.profitMissing ? "Pendiente de costo" : "";

  elements.salesSummaryCards.innerHTML = `
    <article class="sales-summary-card">
      <span class="sales-summary-label">Total vendido</span>
      <strong>${currency.format(summary.totalSold)}</strong>
    </article>
    <article class="sales-summary-card">
      <span class="sales-summary-label">Total cobrado</span>
      <strong>${currency.format(summary.totalCollected)}</strong>
    </article>
    <article class="sales-summary-card">
      <span class="sales-summary-label">Total por cobrar</span>
      <strong>${currency.format(summary.totalPending)}</strong>
    </article>
    <article class="sales-summary-card">
      <span class="sales-summary-label">Ganancia estimada</span>
      <strong>${profitDisplay}</strong>
      ${profitNote ? `<small>${escapeHTML(profitNote)}</small>` : ""}
    </article>
    <article class="sales-summary-card">
      <span class="sales-summary-label">Ventas</span>
      <strong>${summary.count}</strong>
    </article>
    <article class="sales-summary-card">
      <span class="sales-summary-label">Ticket promedio</span>
      <strong>${currency.format(summary.averageTicket)}</strong>
    </article>
  `;

  if (elements.salesProfitNotice) {
    const showNotice = summary.profitMissing;
    elements.salesProfitNotice.hidden = !showNotice;
    elements.salesProfitNotice.textContent = showNotice
      ? "Agrega costo de compra en productos para calcular ganancia real."
      : "";
  }
}

function renderSaleProfitCell(sale) {
  const profitInfo = calculateSaleProfit(sale);
  if (!profitInfo.hasCost) {
    return `<span class="sales-profit-pending" title="Agrega costo de compra en productos">Pendiente</span>`;
  }
  const tone = profitInfo.profit >= 0 ? "is-positive" : "is-negative";
  return `<span class="sales-profit-value ${tone}">${currency.format(profitInfo.profit)}</span>`;
}

function renderSaleActionsCell(sale) {
  if (!sale.orderId) return `<span class="orders-muted">—</span>`;
  return `<span class="sales-order-link" title="Pedido ${escapeHTML(sale.orderId)}">${escapeHTML(sale.orderId)}</span>`;
}

function renderOrderStatusFilters() {
  if (!elements.orderStatusFilters) return;
  elements.orderStatusFilters.innerHTML = ORDER_STATUS_FILTERS.map((status) => {
    const count = countOrdersByStatus(status);
    const label = ORDER_FILTER_LABELS[status] || status;
    const countLabel = status === "" ? "" : ` (${count})`;
    return `
      <button
        class="orders-filter-chip${state.orderStatusFilter === status ? " is-active" : ""}"
        type="button"
        data-action="filter-orders"
        data-status="${status}"
      >${label}${countLabel}</button>
    `;
  }).join("");
}

function renderSaleStatusFilters() {
  if (!elements.saleStatusFilters) return;
  const labels = {
    "": "Todos",
    por_cobrar: "Por cobrar",
    pagada: "Pagadas",
    completada: "Completadas",
    cancelada: "Canceladas",
  };
  const rangeSales = state.sales.filter((sale) =>
    isSaleInDateRange(sale, state.saleRangeFilter, state.saleDateFrom, state.saleDateTo),
  );
  elements.saleStatusFilters.innerHTML = SALE_STATUS_FILTERS.map((status) => {
    const count =
      status === ""
        ? rangeSales.length
        : rangeSales.filter((sale) => normalizeSaleStatus(sale.status, sale.paymentStatus) === status).length;
    const countLabel = status === "" ? "" : ` (${count})`;
    return `
      <button
        class="sales-filter-chip${state.saleStatusFilter === status ? " is-active" : ""}"
        type="button"
        data-action="filter-sales"
        data-status="${status}"
      >${labels[status] || status}${countLabel}</button>
    `;
  }).join("");
}

function getOrderSearchText(order) {
  return [
    order.id,
    order.customerName,
    getOrderOriginLabel(order.origin),
    getOrderStatusLabel(order.status),
    getPaymentStatusLabel(order.paymentStatus),
  ]
    .join(" ")
    .toLowerCase();
}

function getSaleSearchText(sale) {
  return [
    sale.id,
    sale.orderId,
    sale.customerName,
    getOrderOriginLabel(sale.origin),
    getSaleStatusLabel(sale.status),
    sale.productSummary,
  ]
    .join(" ")
    .toLowerCase();
}

function renderOrderStatusBadge(order) {
  const status = normalizeOrderStatus(order.status);
  const meta = ORDER_STATUS_META[status] || ORDER_STATUS_META.nuevo;
  return `<span class="orders-status-badge is-${meta.badge}">${escapeHTML(meta.label)}</span>`;
}

function renderSaleStatusBadge(sale) {
  const status = normalizeSaleStatus(sale.status, sale.paymentStatus);
  const meta = SALE_STATUS_META[status] || SALE_STATUS_META.por_cobrar;
  return `<span class="sales-status-badge is-${meta.badge}">${escapeHTML(meta.label)}</span>`;
}

function renderOrderActionsMarkup(order) {
  const actions = getAllowedOrderActions(order);
  if (!actions.length) {
    const status = normalizeOrderStatus(order.status);
    if (status === "cancelado") return `<span class="orders-muted">Cancelado</span>`;
    if (status === "completado") return `<span class="orders-muted">Completado</span>`;
    return `<span class="orders-muted">Sin acciones</span>`;
  }
  const orderId = escapeHTML(order.id);
  return `
    <div class="orders-admin-actions">
      ${actions
        .map(
          (item) =>
            `<button class="orders-action-btn ${item.className}" type="button" data-action="${item.action}" data-id="${orderId}">${escapeHTML(item.label)}</button>`,
        )
        .join("")}
    </div>
  `;
}

function renderOrders() {
  renderOrderStatusFilters();

  const orders = state.orders.filter((order) => {
    const matchesStatus = !state.orderStatusFilter || normalizeOrderStatus(order.status) === state.orderStatusFilter;
    return matchesStatus && getOrderSearchText(order).includes(state.orderQuery);
  });

  if (elements.orderListCount) {
    elements.orderListCount.textContent = `${orders.length} pedido${orders.length === 1 ? "" : "s"}`;
  }
  if (elements.orderListFooter) {
    elements.orderListFooter.textContent = orders.length
      ? `Mostrando 1-${orders.length} pedidos de ${orders.length}`
      : "Mostrando 0 pedidos";
  }
  if (!elements.ordersTable) return;

  const emptyMessage =
    state.orderQuery.trim() && !orders.length
      ? "No hay pedidos que coincidan con la búsqueda."
      : ORDER_FILTER_EMPTY_MESSAGES[state.orderStatusFilter] || ORDER_FILTER_EMPTY_MESSAGES[""];

  elements.ordersTable.innerHTML = orders.length
    ? orders
        .map((order) => {
          const paymentLabel = getPaymentStatusLabel(order.paymentStatus);
          const paymentClass = order.paymentStatus === "pagado" ? "is-paid" : order.paymentStatus === "vencido" ? "is-overdue" : "is-pending";
          return `
            <tr class="orders-admin-row">
              <td class="orders-col-id"><strong>${escapeHTML(order.id)}</strong></td>
              <td>${escapeHTML(formatShortDate(order.createdAt) || "—")}</td>
              <td>${escapeHTML(order.customerName || "—")}</td>
              <td>${escapeHTML(getOrderOriginLabel(order.origin))}</td>
              <td><strong>${currency.format(order.total || 0)}</strong></td>
              <td><span class="orders-payment-badge ${paymentClass}">${escapeHTML(paymentLabel)}</span></td>
              <td>${escapeHTML(getDeliveryTypeLabel(order.deliveryType))}</td>
              <td>${renderOrderStatusBadge(order)}</td>
              <td class="orders-col-actions">${renderOrderActionsMarkup(order)}</td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(9, emptyMessage);
}

function renderSales() {
  renderSaleRangeFilters();
  renderSaleStatusFilters();

  const summary = calculateSalesSummary(getSalesForSummary());
  renderSalesSummary(summary);

  const sales = getFilteredSales();

  if (elements.saleListCount) {
    elements.saleListCount.textContent = `${sales.length} venta${sales.length === 1 ? "" : "s"}`;
  }
  if (elements.saleListFooter) {
    elements.saleListFooter.textContent = sales.length
      ? `Mostrando 1-${sales.length} ventas de ${sales.length}`
      : "Mostrando 0 ventas";
  }
  if (!elements.salesTable) return;

  const emptyMessage =
    state.saleQuery.trim() && !sales.length
      ? "No hay ventas que coincidan con la búsqueda."
      : state.saleRangeFilter === "custom" && (!state.saleDateFrom || !state.saleDateTo)
        ? "Selecciona fecha inicio y fin, luego aplica el filtro."
        : "No hay ventas en este rango o filtro.";

  elements.salesTable.innerHTML = sales.length
    ? sales
        .map((sale) => {
          const paymentLabel = getPaymentStatusLabel(sale.paymentStatus);
          const paymentClass = sale.paymentStatus === "pagado" ? "is-paid" : "is-pending";
          return `
            <tr class="sales-admin-row">
              <td class="sales-col-id"><strong>${escapeHTML(sale.id)}</strong>${sale.orderId ? `<span class="sales-order-ref">${escapeHTML(sale.orderId)}</span>` : ""}</td>
              <td>${escapeHTML(formatShortDate(sale.createdAt) || "—")}</td>
              <td>${escapeHTML(sale.customerName || "—")}</td>
              <td><strong>${currency.format(sale.total || 0)}</strong></td>
              <td>${renderSaleProfitCell(sale)}</td>
              <td>${escapeHTML(sale.productSummary || summarizeSaleProducts(sale.items))}</td>
              <td><span class="orders-payment-badge ${paymentClass}">${escapeHTML(paymentLabel)} · ${escapeHTML(getPaymentMethodLabel(sale.paymentMethod))}</span></td>
              <td>${escapeHTML(getDeliveryTypeLabel(sale.deliveryType))}</td>
              <td>${escapeHTML(getOrderOriginLabel(sale.origin))}</td>
              <td>${renderSaleStatusBadge(sale)}</td>
              <td class="sales-col-actions">${renderSaleActionsCell(sale)}</td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(11, emptyMessage);
}

function populateCommerceCustomerSelect(select, selectedId = "") {
  if (!select) return;
  const walkInSelected = selectedId === "__walkin__" ? " selected" : "";
  const options = getActiveCustomers()
    .map(
      (customer) =>
        `<option value="${escapeHTML(customer.id)}"${customer.id === selectedId ? " selected" : ""}>${escapeHTML(customer.name)}</option>`,
    )
    .join("");
  select.innerHTML = `<option value="__walkin__"${walkInSelected}>Cliente no informado / venta rápida</option>${options}`;
}

function resetOrderFormDraft() {
  orderFormDraft = { items: [] };
  if (elements.orderProductSearch) elements.orderProductSearch.value = "";
  if (elements.orderProductResults) elements.orderProductResults.hidden = true;
  if (elements.orderDiscount) elements.orderDiscount.value = "0";
  if (elements.orderShipping) elements.orderShipping.value = "0";
  if (elements.orderPaymentStatus) elements.orderPaymentStatus.value = "pendiente";
  if (elements.orderPaymentMethod) elements.orderPaymentMethod.value = "efectivo";
  if (elements.orderDeliveryType) elements.orderDeliveryType.value = "venta_directa";
  if (elements.orderNotes) elements.orderNotes.value = "";
  renderOrderLineItems();
}

function resetSaleFormDraft() {
  saleFormDraft = { items: [] };
  if (elements.saleProductSearch) elements.saleProductSearch.value = "";
  if (elements.saleProductResults) elements.saleProductResults.hidden = true;
  if (elements.salePaymentMethod) elements.salePaymentMethod.value = "efectivo";
  if (elements.salePaymentStatus) elements.salePaymentStatus.value = "pagado";
  if (elements.saleNotes) elements.saleNotes.value = "";
  renderSaleLineItems();
}

function openOrderDialog() {
  populateCommerceCustomerSelect(elements.orderCustomerSelect);
  if (elements.orderOriginSelect) elements.orderOriginSelect.value = "whatsapp";
  resetOrderFormDraft();
  elements.orderDialog?.showModal();
}

function closeOrderDialog() {
  elements.orderDialog?.close();
  resetOrderFormDraft();
}

function openSaleDialog() {
  populateCommerceCustomerSelect(elements.saleCustomerSelect);
  if (elements.saleOriginSelect) elements.saleOriginSelect.value = "mostrador";
  resetSaleFormDraft();
  elements.saleDialog?.showModal();
}

function closeSaleDialog() {
  elements.saleDialog?.close();
  resetSaleFormDraft();
}

function getCommerceProductSearchResults(query) {
  const value = String(query || "").trim().toLowerCase();
  if (!value) return [];
  return state.products
    .filter((product) => product.status === "Activo")
    .filter((product) => {
      const haystack = `${product.name || ""} ${product.sku || ""} ${product.substance || ""}`.toLowerCase();
      return haystack.includes(value);
    })
    .slice(0, 8);
}

function renderCommerceProductResults(container, query, target = "order") {
  if (!container) return;
  const results = getCommerceProductSearchResults(query);
  if (!results.length) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }
  container.hidden = false;
  container.innerHTML = results
    .map(
      (product) => `
        <button class="order-product-result" type="button" data-action="${target === "sale" ? "add-sale-product" : "add-order-product"}" data-id="${escapeHTML(product.id)}">
          <strong>${escapeHTML(product.name)}</strong>
          <span>${escapeHTML(product.sku || "Sin SKU")} · ${currency.format(product.discountPrice ?? product.price ?? product.regularPrice ?? 0)}</span>
        </button>
      `,
    )
    .join("");
}

function addProductToOrderDraft(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const unitPrice = toNumber(product.discountPrice ?? product.price ?? product.regularPrice);
  const existing = orderFormDraft.items.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += 1;
    existing.subtotal = existing.quantity * existing.unitPrice;
  } else {
    orderFormDraft.items.push(
      normalizeOrderItem({
        productId: product.id,
        name: product.name,
        quantity: 1,
        unitPrice,
      }),
    );
  }
  if (elements.orderProductSearch) elements.orderProductSearch.value = "";
  if (elements.orderProductResults) elements.orderProductResults.hidden = true;
  renderOrderLineItems();
}

function addProductToSaleDraft(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const unitPrice = toNumber(product.discountPrice ?? product.price ?? product.regularPrice);
  const existing = saleFormDraft.items.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += 1;
    existing.subtotal = existing.quantity * existing.unitPrice;
  } else {
    saleFormDraft.items.push(
      normalizeOrderItem({
        productId: product.id,
        name: product.name,
        quantity: 1,
        unitPrice,
      }),
    );
  }
  if (elements.saleProductSearch) elements.saleProductSearch.value = "";
  if (elements.saleProductResults) elements.saleProductResults.hidden = true;
  renderSaleLineItems();
}

function updateDraftItemQuantity(draft, index, quantity) {
  const item = draft.items[index];
  if (!item) return;
  item.quantity = Math.max(1, toInteger(quantity));
  item.subtotal = item.quantity * toNumber(item.unitPrice);
}

function renderOrderLineItems() {
  if (!elements.orderLineItems) return;
  const items = orderFormDraft.items;
  if (elements.orderLinesEmpty) elements.orderLinesEmpty.hidden = items.length > 0;
  elements.orderLineItems.innerHTML = items.length
    ? items
        .map(
          (item, index) => `
            <tr>
              <td>${escapeHTML(item.name)}</td>
              <td><input class="order-line-qty" type="number" min="1" step="1" value="${item.quantity}" data-action="update-order-line-qty" data-index="${index}" /></td>
              <td><input class="order-line-price" type="number" min="0" step="0.01" value="${item.unitPrice}" data-action="update-order-line-price" data-index="${index}" /></td>
              <td>${currency.format(item.subtotal)}</td>
              <td><button class="ghost-button small" type="button" data-action="remove-order-line" data-index="${index}">Quitar</button></td>
            </tr>
          `,
        )
        .join("")
    : "";
  updateOrderFormPreview();
}

function renderSaleLineItems() {
  if (!elements.saleLineItems) return;
  const items = saleFormDraft.items;
  if (elements.saleLinesEmpty) elements.saleLinesEmpty.hidden = items.length > 0;
  elements.saleLineItems.innerHTML = items.length
    ? items
        .map(
          (item, index) => `
            <tr>
              <td>${escapeHTML(item.name)}</td>
              <td><input class="order-line-qty" type="number" min="1" step="1" value="${item.quantity}" data-action="update-sale-line-qty" data-index="${index}" /></td>
              <td><input class="order-line-price" type="number" min="0" step="0.01" value="${item.unitPrice}" data-action="update-sale-line-price" data-index="${index}" /></td>
              <td>${currency.format(item.subtotal)}</td>
              <td><button class="ghost-button small" type="button" data-action="remove-sale-line" data-index="${index}">Quitar</button></td>
            </tr>
          `,
        )
        .join("")
    : "";
  updateSaleFormPreview();
}

function calculateDraftTotals(items, discount = 0, shipping = 0) {
  const subtotal = items.reduce((sum, item) => sum + toNumber(item.subtotal), 0);
  const discountValue = Math.max(0, toNumber(discount));
  const shippingValue = Math.max(0, toNumber(shipping));
  const total = Math.max(0, subtotal - discountValue + shippingValue);
  return { subtotal, discount: discountValue, shipping: shippingValue, total };
}

function updateOrderFormPreview() {
  const totals = calculateDraftTotals(
    orderFormDraft.items,
    elements.orderDiscount?.value,
    elements.orderShipping?.value,
  );
  if (elements.orderSubtotalPreview) elements.orderSubtotalPreview.textContent = currency.format(totals.subtotal);
  if (elements.orderDiscountPreview) elements.orderDiscountPreview.textContent = currency.format(totals.discount);
  if (elements.orderShippingPreview) elements.orderShippingPreview.textContent = currency.format(totals.shipping);
  if (elements.orderTotalPreview) elements.orderTotalPreview.textContent = currency.format(totals.total);
}

function updateSaleFormPreview() {
  const totals = calculateDraftTotals(saleFormDraft.items);
  if (elements.saleTotalPreview) elements.saleTotalPreview.textContent = currency.format(totals.total);
}

function readOrderCustomerSelection() {
  const value = elements.orderCustomerSelect?.value || "__walkin__";
  if (value === "__walkin__") {
    return { customerId: "", customerName: "Cliente no informado" };
  }
  const customer = getCustomer(value);
  return {
    customerId: customer?.id || "",
    customerName: customer?.name || "Cliente no informado",
  };
}

function saveManualOrder(event) {
  event.preventDefault();
  if (!orderFormDraft.items.length) return showToast("Agrega al menos un producto al pedido");

  const customer = readOrderCustomerSelection();
  const origin = elements.orderOriginSelect?.value || "manual";
  const paymentStatus = normalizePaymentStatus(elements.orderPaymentStatus?.value);
  const deliveryType = normalizeDeliveryType(elements.orderDeliveryType?.value);
  const totals = calculateDraftTotals(
    orderFormDraft.items,
    elements.orderDiscount?.value,
    elements.orderShipping?.value,
  );
  const status = resolveInitialOrderStatus({ origin, paymentStatus, deliveryType });
  const order = normalizeOrder({
    id: getNextOrderFolio(),
    ...customer,
    origin,
    status,
    paymentStatus: resolveInitialOrderPaymentStatus(paymentStatus, status),
    paymentMethod: elements.orderPaymentMethod?.value || "efectivo",
    deliveryType,
    subtotal: totals.subtotal,
    discount: totals.discount,
    shipping: totals.shipping,
    total: totals.total,
    items: orderFormDraft.items.map((item) => ({ ...item })),
    notes: elements.orderNotes?.value.trim() || "",
    createdAt: new Date().toISOString(),
  });

  state.orders.unshift(order);
  syncOrderPaymentRecord(order);
  syncOrderShipmentRecord(order);
  if (paymentStatus === "pagado" || status === "completado") {
    deductOrderInventory(order);
    createSaleFromOrder(order);
  } else {
    createSaleFromOrder(order, { pending: true });
  }
  persistAll();
  closeOrderDialog();
  renderAll();
  showToast("Pedido creado correctamente.");
}

function saveManualSale(event) {
  event.preventDefault();
  if (!saleFormDraft.items.length) return showToast("Agrega al menos un producto a la venta");

  const customerValue = elements.saleCustomerSelect?.value || "__walkin__";
  const customer =
    customerValue === "__walkin__"
      ? { customerId: "", customerName: "Cliente no informado" }
      : {
          customerId: customerValue,
          customerName: getCustomer(customerValue)?.name || "Cliente no informado",
        };
  const paymentStatus = normalizePaymentStatus(elements.salePaymentStatus?.value);
  const totals = calculateDraftTotals(saleFormDraft.items);
  const saleOrigin = elements.saleOriginSelect?.value || "mostrador";
  const sale = normalizeSale({
    id: getNextSaleId(),
    orderId: "",
    ...customer,
    origin: saleOrigin,
    status: paymentStatus === "pagado" ? "completada" : "por_cobrar",
    paymentStatus,
    paymentMethod: elements.salePaymentMethod?.value || "efectivo",
    deliveryType: saleOrigin === "mostrador" ? "venta_directa" : "recoger_tienda",
    total: totals.total,
    items: saleFormDraft.items.map((item) => ({ ...item })),
    notes: elements.saleNotes?.value.trim() || "",
    createdAt: new Date().toISOString(),
  });

  state.sales.unshift(sale);
  if (paymentStatus === "pagado") {
    const pseudoOrder = normalizeOrder({
      id: sale.id,
      customerId: sale.customerId,
      customerName: sale.customerName,
      origin: sale.origin,
      status: "completado",
      paymentStatus: "pagado",
      paymentMethod: sale.paymentMethod,
      deliveryType: sale.deliveryType,
      total: sale.total,
      items: sale.items,
      inventoryDeducted: false,
      createdAt: sale.createdAt,
    });
    deductOrderInventory(pseudoOrder);
  }
  persist(storageKeys.sales, state.sales);
  closeSaleDialog();
  renderSales();
  renderDashboard();
  showToast("Venta registrada correctamente.");
}

function exportSalesList() {
  const sales = getFilteredSales();
  if (!sales.length) return showToast("No hay ventas para exportar");
  const headers = ["Venta", "Pedido", "Fecha", "Cliente", "Total", "Ganancia", "Pago", "Estado", "Origen"];
  const rows = sales.map((sale) => {
    const profitInfo = calculateSaleProfit(sale);
    return [
      sale.id,
      sale.orderId || "",
      formatShortDate(sale.createdAt),
      sale.customerName,
      sale.total,
      profitInfo.hasCost ? profitInfo.profit : "Pendiente de costo",
      getPaymentMethodLabel(sale.paymentMethod),
      getSaleStatusLabel(sale.status),
      getOrderOriginLabel(sale.origin),
    ];
  });
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ventas-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Lista de ventas exportada");
}

function syncOrderPaymentRecord(order) {
  const existing = state.payments.find((payment) => payment.orderId === order.id);
  const payload = {
    id: existing?.id || createId("pay"),
    orderId: order.id,
    customerName: order.customerName,
    method: getPaymentMethodLabel(order.paymentMethod),
    total: order.total,
    status: order.paymentStatus === "pagado" ? "Pagado" : "Pendiente",
    createdAt: order.createdAt,
  };
  if (existing) Object.assign(existing, payload);
  else state.payments.unshift(payload);
}

function syncOrderShipmentRecord(order) {
  const existing = state.shipments.find((shipment) => shipment.orderId === order.id);
  const orderStatus = normalizeOrderStatus(order.status);
  let shipmentStatus = "Preparando";
  if (order.paymentStatus !== "pagado") shipmentStatus = "Esperando pago";
  else if (orderStatus === "completado") shipmentStatus = "Entregado";
  else if (orderStatus === "por_retirar") shipmentStatus = "Listo para retirar";
  else if (orderStatus === "enviado") shipmentStatus = "En ruta";
  else if (orderStatus === "por_enviar") shipmentStatus = "Preparando envío";

  const payload = {
    id: existing?.id || createId("ship"),
    orderId: order.id,
    customerName: order.customerName,
    type: getDeliveryTypeLabel(order.deliveryType),
    address: order.address || "",
    status: shipmentStatus,
    createdAt: order.createdAt,
  };
  if (existing) Object.assign(existing, payload);
  else state.shipments.unshift(payload);
}

function deductOrderInventory(order) {
  if (!order || order.inventoryDeducted || normalizeOrderStatus(order.status) === "cancelado") return;
  if (order.paymentStatus !== "pagado") return;
  const status = normalizeOrderStatus(order.status);
  if (!["cobrado", "por_enviar", "por_retirar", "enviado", "completado"].includes(status)) return;
  if (!Array.isArray(order.items) || !order.items.length) return;

  // TODO: conectar descuento real por lote vía /api/inventory/adjust cuando el flujo de pedidos use backend.
  order.items.forEach((item) => {
    const product = getProduct(item.productId);
    if (!product) return;
    product.stock = Math.max(0, toInteger(product.stock) - toInteger(item.quantity));
  });
  order.inventoryDeducted = true;
}

function updateOrderRecord(order) {
  const index = state.orders.findIndex((item) => item.id === order.id);
  if (index >= 0) state.orders[index] = order;
  order.updatedAt = new Date().toISOString();
  syncOrderPaymentRecord(order);
  syncOrderShipmentRecord(order);
  persist(storageKeys.orders, state.orders);
  persist(storageKeys.payments, state.payments);
  persist(storageKeys.shipments, state.shipments);
}

function markOrderAwaitingPayment(orderId) {
  const order = getOrder(orderId);
  if (!order) return;
  if (!transitionOrderStatus(order, "por_cobrar")) return;
  updateOrderRecord(order);
  createSaleFromOrder(order, { pending: true });
  renderAll();
  showToast("Pedido marcado por cobrar.");
}

function markOrderPaid(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "cobrado", { paymentStatus: "pagado" })) return;
  deductOrderInventory(order);
  updateOrderRecord(order);
  createSaleFromOrder(order);
  renderAll();
  showToast("Pedido marcado como cobrado.");
}

function markOrderAwaitingShipment(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "por_enviar")) return;
  updateOrderRecord(order);
  createSaleFromOrder(order);
  renderAll();
  showToast("Pedido listo por enviar.");
}

function markOrderReadyPickup(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "por_retirar")) return;
  updateOrderRecord(order);
  createSaleFromOrder(order);
  renderAll();
  showToast("Pedido listo por retirar.");
}

function markOrderShipped(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "enviado")) return;
  updateOrderRecord(order);
  createSaleFromOrder(order);
  renderAll();
  showToast("Pedido marcado como enviado.");
}

function markOrderCompleted(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "completado", { paymentStatus: "pagado" })) return;
  deductOrderInventory(order);
  updateOrderRecord(order);
  createSaleFromOrder(order);
  renderAll();
  showToast("Pedido completado.");
}

function cancelOrder(orderId) {
  const order = getOrder(orderId);
  if (!order || normalizeOrderStatus(order.status) === "cancelado") return;
  if (!transitionOrderStatus(order, "cancelado")) return;
  updateOrderRecord(order);
  upsertSaleFromOrder(order, { status: "cancelada", paymentStatus: order.paymentStatus });
  renderAll();
  showToast("Pedido cancelado.");
}

function resolveSaleStatusFromOrder(order) {
  const status = normalizeOrderStatus(order.status);
  if (status === "cancelado") return "cancelada";
  if (order.paymentStatus !== "pagado") return "por_cobrar";
  if (status === "completado") return "completada";
  return "pagada";
}

function upsertSaleFromOrder(order, overrides = {}) {
  const existing = state.sales.find((sale) => sale.orderId === order.id);
  const payload = normalizeSale({
    id: existing?.id || getNextSaleId(),
    orderId: order.id,
    customerId: order.customerId,
    customerName: order.customerName,
    origin: order.origin,
    status: overrides.status || resolveSaleStatusFromOrder(order),
    paymentStatus: overrides.paymentStatus || order.paymentStatus,
    paymentMethod: order.paymentMethod,
    deliveryType: order.deliveryType,
    total: order.total,
    items: order.items,
    createdAt: existing?.createdAt || order.createdAt,
  });
  if (existing) Object.assign(existing, payload);
  else state.sales.unshift(payload);
  persist(storageKeys.sales, state.sales);
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
  const primary = getNextOrderActions(order)[0];
  if (!primary) return;
  if (primary.action === "order-mark-awaiting-payment") markOrderAwaitingPayment(orderId);
  else if (primary.action === "order-mark-paid") markOrderPaid(orderId);
  else if (primary.action === "order-mark-awaiting-shipment") markOrderAwaitingShipment(orderId);
  else if (primary.action === "order-mark-ready-pickup") markOrderReadyPickup(orderId);
  else if (primary.action === "order-mark-shipped") markOrderShipped(orderId);
  else if (primary.action === "order-mark-completed") markOrderCompleted(orderId);
}

function createProductRefreshButton() {
  const heading = document.querySelector(".product-list-toolbar");
  if (!heading || heading.querySelector("[data-action='refresh-products']")) return;

  const button = document.createElement("button");
  button.className = "ghost-button small";
  button.type = "button";
  button.dataset.action = "refresh-products";
  button.textContent = "Actualizar";
  heading.appendChild(button);
}

async function loadProducts(options = {}) {
  try {
    const response = await fetch(productsApiUrl);
    if (!response.ok) throw new Error("Backend no disponible");

    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error("Respuesta invalida");

    state.products = data.products;
    state.productLoadError = "";
    renderAll();
    if (options.manual) showToast("Productos actualizados");
  } catch {
    state.products = [];
    state.productLoadError = "No se pudieron cargar productos desde Supabase.";
    renderAll();
    showToast(state.productLoadError);
  }
}

async function uploadProductImageToApi(file) {
  const formData = new FormData();
  formData.append("image", file, file.name || "product-image");

  const response = await fetch(productImageUploadUrl, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo subir imagen");
  if (!data.imageUrl) throw new Error("Respuesta invalida al subir imagen");
  return data.imageUrl;
}

async function saveProductToApi(product) {
  const isUpdate = Boolean(product.id);
  const url = isUpdate ? `${productsApiUrl}/${encodeURIComponent(product.id)}` : productsApiUrl;
  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.details || "No se pudo guardar producto");
  return data.product;
}

async function archiveProductInApi(id) {
  const response = await fetch(`${productsApiUrl}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.details || "No se pudo dar de baja el producto");
  return data;
}

async function permanentDeleteProductInApi(id) {
  const response = await fetch(`${productsApiUrl}/${encodeURIComponent(id)}/permanent`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.details || "No se pudo eliminar definitivamente el producto");
  return data;
}

function classificationRequiresRecipe(name) {
  return /receta/i.test(String(name || ""));
}

function getActiveCategories(categories = state.categories) {
  const active = (Array.isArray(categories) ? categories : []).filter(
    (category) => category.active !== false && category.status !== "Pausado",
  );
  const activeIds = new Set(active.map((category) => category.id));
  return active.filter((category) => !category.parentId || activeIds.has(category.parentId));
}

function isCategoryHiddenInStore(category) {
  return category && category.visibleInStore === false;
}

function removeCategoryFromState(id) {
  if (!id) return;
  state.categories = state.categories.filter((category) => category.id !== id);
  renderCategories();
  renderProductCatalogSelects();
}

function applyCategoryPatchToState(updated) {
  if (!updated?.id) return;
  if (updated.active === false || updated.status === "Pausado") {
    removeCategoryFromState(updated.id);
    return;
  }
  const index = state.categories.findIndex((category) => category.id === updated.id);
  if (index >= 0) state.categories[index] = updated;
  else state.categories.push(updated);
  state.categories = getActiveCategories(state.categories);
  renderCategories();
  renderProductCatalogSelects();
}

async function loadCategories(options = {}) {
  try {
    const response = await fetch(`${categoriesApiUrl}?_=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) throw new Error("Backend no disponible");

    const data = await response.json();
    if (!Array.isArray(data.categories)) throw new Error("Respuesta invalida");

    state.categories = getActiveCategories(data.categories);
    state.categoryCapabilities = data.capabilities || { parentId: false, visibleInStore: false };
    state.categoryLoadError = "";
    renderCategories();
    renderProductCatalogSelects();
    if (options.manual) showToast("Categorias actualizadas");
  } catch {
    state.categories = [];
    state.categoryCapabilities = { parentId: false, visibleInStore: false };
    state.categoryLoadError = "No se pudieron cargar categorias desde Supabase.";
    renderCategories();
    renderProductCatalogSelects();
    if (options.manual) showToast(state.categoryLoadError);
  }
}

async function loadClassifications(options = {}) {
  try {
    const response = await fetch(classificationsApiUrl);
    if (!response.ok) throw new Error("Backend no disponible");

    const data = await response.json();
    if (!Array.isArray(data.classifications)) throw new Error("Respuesta invalida");

    state.classifications = data.classifications;
    state.classificationLoadError = "";
    renderClassifications();
    renderProductCatalogSelects();
    if (options.manual) showToast("Clasificaciones actualizadas");
  } catch {
    state.classifications = [];
    state.classificationLoadError = "No se pudieron cargar clasificaciones. Revisa el SQL en docs/DEVELOPMENT_GUIDE.md.";
    renderClassifications();
    renderProductCatalogSelects();
    if (options.manual) showToast(state.classificationLoadError);
  }
}

async function saveCategoryToApi(category) {
  const isUpdate = Boolean(category.id);
  const url = isUpdate ? `${categoriesApiUrl}/${encodeURIComponent(category.id)}` : categoriesApiUrl;
  const payload = {
    name: category.name,
    description: category.description,
  };
  if (!isUpdate && category.parentId && state.categoryCapabilities?.parentId) {
    payload.parentId = category.parentId;
  }

  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    console.error("Error guardando categoría:", response.status, data);
    throw new Error(data.details || data.error || "No se pudo guardar categoria");
  }
  return data.category;
}

async function deleteCategoryInApi(id) {
  console.log("[category UI] DELETE /api/categories/:id", id);
  const response = await fetch(`${categoriesApiUrl}/${encodeURIComponent(id)}`, { method: "DELETE" });
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  console.log("[category UI] DELETE respuesta", response.status, data);
  if (!response.ok) {
    const error = new Error(data.error || data.message || data.details || "Error al eliminar categoría");
    error.code = data.error || "";
    error.productCount = toInteger(data.productCount);
    error.subcategoryCount = toInteger(data.subcategoryCount);
    throw error;
  }
  return data;
}

async function patchCategoryInApi(id, patch) {
  const payload = {};
  if (patch.visibleInStore !== undefined) payload.visibleInStore = patch.visibleInStore;
  if (patch.name !== undefined) payload.name = patch.name;
  if (patch.description !== undefined) payload.description = patch.description;
  if (patch.active !== undefined) payload.active = patch.active;

  console.log("[category UI] PATCH /api/categories/:id", id, payload);
  const response = await fetch(`${categoriesApiUrl}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log("[category UI] PATCH respuesta", response.status, data);
  if (!response.ok) {
    console.error("Error actualizando categoría:", response.status, data);
    throw new Error(data.error || data.message || data.details || "Error al actualizar categoría");
  }
  return data.category;
}

async function saveClassificationToApi(classification) {
  const isUpdate = Boolean(classification.id);
  const url = isUpdate ? `${classificationsApiUrl}/${encodeURIComponent(classification.id)}` : classificationsApiUrl;
  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(classification),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo guardar clasificacion");
  return data.classification;
}

async function deactivateClassificationInApi(id) {
  const response = await fetch(`${classificationsApiUrl}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active: false }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo desactivar clasificacion");
  return data.classification;
}

async function activateClassificationInApi(id) {
  const response = await fetch(`${classificationsApiUrl}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active: true }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo activar clasificacion");
  return data.classification;
}

async function deleteClassificationInApi(id) {
  const response = await fetch(`${classificationsApiUrl}/${encodeURIComponent(id)}`, { method: "DELETE" });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || data.details || data.error || "No se pudo eliminar clasificacion");
    error.code = data.error || "";
    error.productCount = toInteger(data.productCount);
    throw error;
  }
  return data;
}

function getCategoryById(id) {
  return state.categories.find((item) => item.id === id) || null;
}

function getCategoryByName(name) {
  return state.categories.find((item) => item.name === name) || null;
}

function isCategoryVisibleInStore(categoryName) {
  const category = getCategoryByName(categoryName);
  if (!category) return true;
  return category.visibleInStore !== false;
}

function sortCategoriesHierarchically(categories) {
  const byParent = new Map();
  categories.forEach((category) => {
    const key = category.parentId || "";
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(category);
  });
  const sortByName = (left, right) => left.name.localeCompare(right.name, "es");
  const result = [];
  function walk(parentId, depth) {
    const items = (byParent.get(parentId || "") || []).sort(sortByName);
    items.forEach((category) => {
      result.push({ ...category, depth });
      walk(category.id, depth + 1);
    });
  }
  walk("", 0);
  return result;
}

function countCategoryProducts(category) {
  if (!category) return 0;
  return state.products.filter((product) => {
    if (product.deleted || product.eliminado) return false;
    if (product.status && product.status !== "Activo") return false;
    if (category.id && product.categoryId && product.categoryId === category.id) return true;
    return product.category === category.name;
  }).length;
}

function countCategorySubcategories(categoryId) {
  if (!categoryId) return 0;
  return getActiveCategories(state.categories).filter(
    (category) => category.parentId && category.parentId === categoryId,
  ).length;
}

function buildCategoryDeleteBlockedMessage(category, deps) {
  const { productCount, subcategoryCount } = deps;
  if (subcategoryCount > 0 && productCount <= 0) {
    return "Esta categoría tiene subcategorías. Primero elimina o reasigna sus subcategorías.";
  }
  if (productCount > 0 && subcategoryCount > 0) {
    return `Esta categoría tiene ${productCount} productos asignados y ${subcategoryCount} subcategorías asociadas.\n\nPrimero mueve esos productos, elimina o reasigna las subcategorías, o usa “Ocultar en tienda”.`;
  }
  if (productCount > 0) {
    return `Esta categoría tiene ${productCount} productos asignados.\n\nPara evitar errores, primero mueve esos productos a otra categoría o usa “Ocultar en tienda”.`;
  }
  return "Esta categoría tiene subcategorías. Primero elimina o reasigna sus subcategorías.";
}

function openCategoryDeleteBlockedDialog(category, deps) {
  return new Promise((resolve) => {
    if (!elements.categoryDependencyDialog) {
      resolve("close");
      return;
    }
    categoryDependencyResolver = resolve;
    elements.categoryDependencyTitle.textContent = "No se puede eliminar esta categoría";
    elements.categoryDependencyMessage.textContent = buildCategoryDeleteBlockedMessage(category, deps);
    if (elements.categoryDependencyHideButton) {
      const showHide = deps.productCount > 0;
      elements.categoryDependencyHideButton.hidden = !showHide;
    }
    elements.categoryDependencyDialog.showModal();
  });
}

function handleCategoryDependencyDialogClose() {
  const value = elements.categoryDependencyDialog?.returnValue || "close";
  categoryDependencyResolver?.(value === "hide-store" ? "hide-store" : "close");
  categoryDependencyResolver = null;
}

function renderCategoryActionsMarkup(category) {
  const hiddenInStore = isCategoryHiddenInStore(category);
  const storeAction = hiddenInStore ? "show-category-store" : "hide-category-store";
  const storeLabel = hiddenInStore ? "Mostrar" : "Ocultar";
  const storeClass = hiddenInStore ? "category-action-btn is-store-show" : "category-action-btn is-store-hide";
  const storeTitle = hiddenInStore
    ? "Mostrar en la tienda online (sigue activa en el CRM)"
    : "Ocultar en la tienda online (sigue en este listado)";
  const categoryId = escapeHTML(category.id);
  return `
    <div class="category-admin-actions">
      <div class="category-admin-actions-desktop">
        <button class="category-action-btn is-neutral" type="button" data-action="edit-category" data-id="${categoryId}" title="Editar categoría">Editar</button>
        <button class="category-action-btn is-neutral" type="button" data-action="create-subcategory" data-id="${categoryId}" title="Crear subcategoría">Subcategoría</button>
        <button class="category-action-btn ${storeClass}" type="button" data-action="${storeAction}" data-id="${categoryId}" title="${storeTitle}">${storeLabel}</button>
        <button class="category-action-btn is-danger" type="button" data-action="delete-category" data-id="${categoryId}" title="Eliminar del catálogo (desactivar, no ocultar en tienda)">Eliminar</button>
      </div>
      <div class="category-admin-actions-mobile product-list-action-menu category-list-action-menu">
        <button class="product-list-action is-menu category-admin-menu-trigger" type="button" data-action="toggle-category-menu" data-id="${categoryId}" aria-label="Acciones de categoría" aria-haspopup="menu">${productListActionIcon("more")}</button>
        <div class="product-list-action-menu-panel category-list-action-menu-panel" role="menu" hidden>
          <button class="product-list-menu-item" type="button" role="menuitem" data-action="edit-category" data-id="${categoryId}"><span class="product-list-menu-title">Editar</span></button>
          <button class="product-list-menu-item" type="button" role="menuitem" data-action="create-subcategory" data-id="${categoryId}"><span class="product-list-menu-title">Subcategoría</span></button>
          <button class="product-list-menu-item" type="button" role="menuitem" data-action="${storeAction}" data-id="${categoryId}"><span class="product-list-menu-title">${storeLabel}</span></button>
          <button class="product-list-menu-item is-danger" type="button" role="menuitem" data-action="delete-category" data-id="${categoryId}"><span class="product-list-menu-title">Eliminar</span></button>
        </div>
      </div>
    </div>
  `;
}

function renderCategoryActionMenuMarkup(category) {
  return renderCategoryActionsMarkup(category);
}

function renderCategories() {
  if (!elements.categoryTable) return;

  const activeCategories = getActiveCategories(state.categories);
  const categories = sortCategoriesHierarchically(
    activeCategories.filter((category) => {
      const parent = category.parentId ? getCategoryById(category.parentId) : null;
      const parentName = parent?.name || "";
      const text = `${category.name} ${category.description || ""} ${parentName}`.toLowerCase();
      return text.includes(state.categoryQuery);
    }),
  );

  if (state.categoryLoadError) {
    elements.categoryTable.innerHTML = tableEmpty(3, state.categoryLoadError);
    return;
  }

  elements.categoryTable.innerHTML = categories.length
    ? categories
        .map((category) => {
          const parent = category.parentId ? getCategoryById(category.parentId) : null;
          const isSubcategory = Boolean(category.parentId);
          const indent = Math.min(category.depth || 0, 3) * 18;
          const hiddenInStore = isCategoryHiddenInStore(category);
          const rowClass = [
            "category-admin-row",
            isSubcategory ? "is-subcategory" : "",
            hiddenInStore ? "is-store-hidden" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const storePillClass = hiddenInStore ? "category-store-pill is-hidden" : "category-store-pill is-visible";
          const storeLabel = hiddenInStore ? "Oculta" : "Visible";
          const storePillTitle = hiddenInStore
            ? "Oculta en la tienda online · activa en administración"
            : "Visible en la tienda online";
          const descriptionLine = category.description
            ? `<span class="category-admin-description">${escapeHTML(category.description)}</span>`
            : "";
          const parentLine =
            isSubcategory && parent
              ? `<span class="category-admin-parent">Subcategoría de: ${escapeHTML(parent.name)}</span>`
              : "";
          return `
            <tr class="${rowClass}">
              <td class="category-admin-name">
                <div class="category-admin-name-cell" style="padding-left:${indent}px">
                  <div class="category-admin-name-line">
                    <strong>${escapeHTML(category.name)}</strong>
                    ${isSubcategory ? '<span class="category-badge is-sub">Subcategoría</span>' : ""}
                  </div>
                  ${descriptionLine}
                  ${parentLine}
                </div>
              </td>
              <td class="category-admin-store"><span class="${storePillClass}" title="${storePillTitle}">${storeLabel}</span></td>
              <td class="category-admin-col-actions">${renderCategoryActionsMarkup(category)}</td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(3, "No hay categorias activas. Crea la primera desde el formulario.");
}

function getClassificationById(id) {
  return state.classifications.find((item) => item.id === id) || null;
}

function getClassificationDisplayStatus(classification) {
  if (!classification) return "";
  return classification.displayStatus || (classification.active ? "Activa" : "Inactiva");
}

function countClassificationProducts(classification) {
  if (!classification) return 0;
  return state.products.filter((product) => {
    if (product.deleted || product.eliminado) return false;
    if (classification.id && product.classificationId === classification.id) return true;
    return product.type === classification.name;
  }).length;
}

function buildClassificationDeleteBlockedMessage(classification, productCount) {
  return `Esta clasificación tiene ${productCount} producto${productCount === 1 ? "" : "s"} asignado${productCount === 1 ? "" : "s"}.\n\nPara evitar errores, primero cambia esos productos a otra clasificación o desactiva la clasificación.`;
}

function openClassificationDeleteBlockedDialog(classification, productCount) {
  return new Promise((resolve) => {
    if (!elements.classificationDependencyDialog) {
      resolve("close");
      return;
    }
    classificationDependencyResolver = resolve;
    elements.classificationDependencyTitle.textContent = "No se puede eliminar esta clasificación";
    elements.classificationDependencyMessage.textContent = buildClassificationDeleteBlockedMessage(
      classification,
      productCount,
    );
    if (elements.classificationDependencyDeactivateButton) {
      elements.classificationDependencyDeactivateButton.hidden = false;
    }
    elements.classificationDependencyDialog.showModal();
  });
}

function handleClassificationDependencyDialogClose() {
  const value = elements.classificationDependencyDialog?.returnValue || "close";
  classificationDependencyResolver?.(value === "deactivate" ? "deactivate" : "close");
  classificationDependencyResolver = null;
}

function renderClassificationActionsMarkup(classification) {
  const toggleLabel = classification.active ? "Desactivar" : "Activar";
  const toggleClass = classification.active
    ? "classification-action-btn is-toggle"
    : "classification-action-btn is-toggle is-activate";
  const toggleAction = classification.active ? "deactivate-classification" : "activate-classification";
  return `
    <div class="classification-admin-actions">
      <div class="classification-admin-actions-desktop">
        <button class="classification-action-btn is-neutral" type="button" data-action="edit-classification" data-id="${classification.id}" title="Editar clasificación">Editar</button>
        <button class="${toggleClass}" type="button" data-action="${toggleAction}" data-id="${classification.id}" title="${classification.active ? "Desactivar clasificación" : "Activar clasificación"}">${toggleLabel}</button>
        <button class="classification-action-btn is-danger" type="button" data-action="delete-classification" data-id="${classification.id}" title="Eliminar clasificación">Eliminar</button>
      </div>
      <div class="classification-admin-actions-mobile product-list-action-menu classification-list-action-menu">
        <button class="product-list-action is-menu classification-admin-menu-trigger" type="button" data-action="toggle-classification-menu" data-id="${classification.id}" aria-label="Acciones de clasificación" aria-haspopup="menu">${productListActionIcon("more")}</button>
        <div class="product-list-action-menu-panel classification-list-action-menu-panel" role="menu" hidden>
          <button class="product-list-menu-item" type="button" role="menuitem" data-action="edit-classification" data-id="${classification.id}"><span class="product-list-menu-title">Editar</span></button>
          <button class="product-list-menu-item" type="button" role="menuitem" data-action="${toggleAction}" data-id="${classification.id}"><span class="product-list-menu-title">${toggleLabel}</span></button>
          <button class="product-list-menu-item is-danger" type="button" role="menuitem" data-action="delete-classification" data-id="${classification.id}"><span class="product-list-menu-title">Eliminar</span></button>
        </div>
      </div>
    </div>
  `;
}

function renderClassifications() {
  if (!elements.classificationTable) return;

  const classifications = state.classifications.filter((classification) => {
    const displayStatus = getClassificationDisplayStatus(classification);
    const text = `${classification.name} ${classification.description || ""} ${displayStatus} ${classification.status}`.toLowerCase();
    return text.includes(state.classificationQuery);
  });

  if (state.classificationLoadError) {
    elements.classificationTable.innerHTML = tableEmpty(4, state.classificationLoadError);
    return;
  }

  elements.classificationTable.innerHTML = classifications.length
    ? classifications
        .map((classification) => {
          const displayStatus = getClassificationDisplayStatus(classification);
          const statusClass = classification.active
            ? "classification-status-pill is-active"
            : "classification-status-pill is-inactive";
          const descriptionCell = classification.description
            ? escapeHTML(classification.description)
            : "—";
          return `
            <tr class="classification-admin-row ${classification.active ? "" : "is-inactive"}">
              <td class="classification-admin-name">
                <div class="classification-admin-name-cell">
                  <strong>${escapeHTML(classification.name)}</strong>
                </div>
              </td>
              <td class="classification-admin-description-cell">${descriptionCell}</td>
              <td class="classification-admin-col-status"><span class="${statusClass}">${escapeHTML(displayStatus)}</span></td>
              <td class="classification-admin-col-actions">${renderClassificationActionsMarkup(classification)}</td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(4, "No hay clasificaciones registradas. Agrega Venta libre, Receta medica, Controlado u otras.");
}

function renderProductCatalogSelects() {
  const activeCategories = getActiveCategories(state.categories);
  const hierarchicalCategories = sortCategoriesHierarchically(activeCategories);
  const activeClassifications = state.classifications.filter((classification) => classification.active);
  const currentCategory = elements.productCategory?.value || "";
  const currentType = elements.productType?.value || "";

  if (elements.productCategory) {
    elements.productCategory.innerHTML =
      `<option value="">Selecciona categoría</option>` +
      hierarchicalCategories
        .map((category) => {
          const prefix = category.depth > 0 ? `${"— ".repeat(category.depth)}` : "";
          return `<option value="${escapeHTML(category.name)}">${escapeHTML(prefix + category.name)}</option>`;
        })
        .join("");
    if (currentCategory) ensureSelectOption(elements.productCategory, currentCategory);
  }

  if (elements.productType) {
    if (activeClassifications.length) {
      elements.productType.innerHTML =
        `<option value="">Selecciona clasificación</option>` +
        activeClassifications
          .map(
            (classification) =>
              `<option value="${escapeHTML(classification.name)}" data-id="${classification.id}">${escapeHTML(classification.name)}</option>`,
          )
          .join("");
    } else {
      elements.productType.innerHTML = `
        <option value="">Selecciona clasificación</option>
        <option value="Venta libre">Venta libre</option>
        <option value="Receta medica">Receta médica</option>
      `;
    }
    if (currentType) ensureSelectOption(elements.productType, currentType);
  }
}

function ensureSelectOption(select, value) {
  if (!select || !value) return;
  const exists = Array.from(select.options).some((option) => option.value === value);
  if (!exists) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
  select.value = value;
}

async function saveCategory(event) {
  event.preventDefault();
  const id = elements.categoryId.value.trim();
  const parentId = state.selectedParentCategoryId || elements.categoryParentId?.value?.trim() || "";
  const category = {
    name: elements.categoryName.value.trim(),
    description: elements.categoryDescription.value.trim(),
  };
  if (id) category.id = id;
  if (!id && parentId) {
    if (state.categoryCapabilities?.parentId) {
      category.parentId = parentId;
    } else {
      showToast("Subcategorías requieren la migración SQL en Supabase (server/sql/categorias_subcategorias.sql). Se guardará como categoría principal.");
    }
  }
  if (!category.name) return showToast("El nombre es obligatorio");

  try {
    await saveCategoryToApi(category);
    await loadCategories();
    clearCategoryForm();
    showToast(id ? "Categoria actualizada" : category.parentId ? "Subcategoría guardada" : "Categoria guardada");
  } catch (error) {
    showToast(error.message || "No se pudo guardar categoria");
  }
}

function editCategory(id) {
  const category = getCategoryById(id);
  console.log("[category action]", "edit-category", id, category?.name || "(no encontrada)");
  if (!category) {
    showToast("Categoría no encontrada");
    return;
  }
  closeAllProductActionMenus();
  elements.categoryFormTitle.textContent = "Editar categoría";
  elements.categoryId.value = category.id;
  elements.categoryName.value = category.name;
  elements.categoryDescription.value = category.description || "";
  if (elements.categoryParentId) elements.categoryParentId.value = category.parentId || "";
  state.selectedParentCategoryId = "";
  if (elements.categoryParentHint) {
    const parent = category.parentId ? getCategoryById(category.parentId) : null;
    if (parent) {
      elements.categoryParentHint.textContent = `Subcategoría de: ${parent.name}`;
      elements.categoryParentHint.hidden = false;
    } else {
      elements.categoryParentHint.textContent = "";
      elements.categoryParentHint.hidden = true;
    }
  }
  showView("productos", { productsSection: "products-categories" });
}

function createSubcategory(parentId) {
  const parent = getCategoryById(parentId);
  console.log("[category action]", "create-subcategory", parentId, parent?.name || "(no encontrada)");
  if (!parent) return showToast("Categoría padre no encontrada");
  closeAllProductActionMenus();
  clearCategoryForm();
  state.selectedParentCategoryId = parentId;
  if (elements.categoryParentId) elements.categoryParentId.value = parentId;
  if (elements.categoryParentHint) {
    elements.categoryParentHint.textContent = `Nueva subcategoría de: ${parent.name}`;
    elements.categoryParentHint.hidden = false;
  }
  elements.categoryFormTitle.textContent = `Nueva subcategoría de: ${parent.name}`;
  if (!state.categoryCapabilities?.parentId) {
    showToast("Aplica server/sql/categorias_subcategorias.sql en Supabase para vincular subcategorías.");
  }
  showView("productos", { productsSection: "products-categories" });
  elements.categoryName?.focus();
}

function clearCategoryForm() {
  elements.categoryForm.reset();
  elements.categoryId.value = "";
  state.selectedParentCategoryId = "";
  if (elements.categoryParentId) elements.categoryParentId.value = "";
  if (elements.categoryParentHint) {
    elements.categoryParentHint.textContent = "";
    elements.categoryParentHint.hidden = true;
  }
  elements.categoryFormTitle.textContent = "Nueva categoría";
}

async function setCategoryStoreVisibility(id, visibleInStore, options = {}) {
  const category = getCategoryById(id);
  console.log(
    "[category action]",
    visibleInStore ? "show-category-store" : "hide-category-store",
    id,
    category?.name || "(no encontrada)",
  );
  if (!category) {
    showToast("Categoría no encontrada");
    return;
  }
  closeAllProductActionMenus();

  if (!options.skipConfirm) {
    const confirmed = await openProductActionDialog({
      title: visibleInStore
        ? `¿Mostrar "${category.name}" en la tienda?`
        : `¿Ocultar "${category.name}" en la tienda?`,
      message: visibleInStore
        ? "Volverá a mostrarse en la tienda online. No cambia su estado en administración."
        : "Seguirá en este listado del CRM. Solo dejará de mostrarse en la tienda online.",
      confirmLabel: visibleInStore ? "Mostrar en tienda" : "Ocultar en tienda",
      confirmClass: visibleInStore ? "primary-button is-success" : "primary-button",
    });
    if (!confirmed) return;
  }

  try {
    const updated = await patchCategoryInApi(id, { visibleInStore });
    if (updated) applyCategoryPatchToState(updated);
    await loadCategories();
    renderCategories();
    showToast(visibleInStore ? "Categoría visible en la tienda" : "Categoría oculta en la tienda");
  } catch (error) {
    showToast(error.message || "Error al actualizar categoría");
  }
}

async function deleteCategory(id) {
  const category = getCategoryById(id);
  console.log("[category action]", "delete-category", id, category?.name || "(no encontrada)");
  if (!category) {
    showToast("Categoría no encontrada");
    return;
  }
  closeAllProductActionMenus();

  const subcategoryCount = countCategorySubcategories(category.id);
  if (subcategoryCount > 0) {
    await openCategoryDeleteBlockedDialog(category, { productCount: 0, subcategoryCount });
    showToast("Esta categoría tiene subcategorías. Primero elimina o reasigna sus subcategorías.");
    return;
  }

  const confirmed = await openProductActionDialog({
    title: `¿Eliminar ${category.parentId ? "subcategoría" : "categoría"} "${category.name}"?`,
    message: category.parentId
      ? "Se desactivará y dejará de aparecer en este listado. La categoría padre no se verá afectada."
      : "Se desactivará y dejará de aparecer en este listado. No es lo mismo que «Ocultar en tienda».",
    confirmLabel: "Eliminar",
    confirmClass: "primary-button is-danger",
  });
  if (!confirmed) return;

  try {
    const wasSubcategory = Boolean(category.parentId);
    await deleteCategoryInApi(id);
    removeCategoryFromState(id);
    await loadCategories();
    renderCategories();
    showToast(wasSubcategory ? "Subcategoría eliminada" : "Categoría eliminada");
  } catch (error) {
    if (error.code === "CATEGORY_HAS_SUBCATEGORIES" || error.code === "CATEGORY_HAS_DEPENDENCIES") {
      await openCategoryDeleteBlockedDialog(category, {
        productCount: error.productCount,
        subcategoryCount: error.subcategoryCount,
      });
      showToast(error.message || "Esta categoría tiene subcategorías. Primero elimina o reasigna sus subcategorías.");
      return;
    }
    if (error.code === "CATEGORY_HAS_PRODUCTS") {
      const action = await openCategoryDeleteBlockedDialog(category, {
        productCount: error.productCount,
        subcategoryCount: error.subcategoryCount,
      });
      if (action === "hide-store") await setCategoryStoreVisibility(id, false, { skipConfirm: true });
      else showToast(error.message || "Error al actualizar categoría");
      return;
    }
    showToast(error.message || "Error al actualizar categoría");
  }
}

async function saveClassification(event) {
  event.preventDefault();
  const classification = {
    id: elements.classificationId.value,
    name: elements.classificationName.value.trim(),
    description: elements.classificationDescription.value.trim(),
    status: elements.classificationStatus.value,
  };
  if (!classification.name) return showToast("El nombre es obligatorio");

  try {
    await saveClassificationToApi(classification);
    await loadClassifications();
    clearClassificationForm();
    showToast("Clasificacion guardada");
  } catch (error) {
    showToast(error.message || "No se pudo guardar clasificacion");
  }
}

function editClassification(id) {
  const classification = getClassificationById(id);
  if (!classification) return;
  closeAllProductActionMenus();
  elements.classificationFormTitle.textContent = "Editar clasificación";
  elements.classificationId.value = classification.id;
  elements.classificationName.value = classification.name;
  elements.classificationDescription.value = classification.description || "";
  elements.classificationStatus.value = classification.status;
  showView("productos", { productsSection: "products-classifications" });
}

function clearClassificationForm() {
  elements.classificationForm.reset();
  elements.classificationId.value = "";
  elements.classificationFormTitle.textContent = "Nueva clasificación";
  elements.classificationStatus.value = "Activo";
}

async function deactivateClassification(id, options = {}) {
  const classification = getClassificationById(id);
  if (!classification || !classification.active) return;
  closeAllProductActionMenus();
  if (!options.skipConfirm) {
    const confirmed = await openProductActionDialog({
      title: `¿Desactivar clasificación "${classification.name}"?`,
      message:
        "La clasificación seguirá existiendo en el CRM, pero dejará de estar disponible para nuevas asignaciones.",
      confirmLabel: "Desactivar clasificación",
      confirmClass: "primary-button",
    });
    if (!confirmed) return;
  }

  try {
    await deactivateClassificationInApi(id);
    await loadClassifications();
    showToast("Clasificación desactivada");
  } catch (error) {
    showToast(error.message || "No se pudo desactivar clasificacion");
  }
}

async function activateClassification(id) {
  const classification = getClassificationById(id);
  if (!classification || classification.active) return;
  closeAllProductActionMenus();
  const confirmed = await openProductActionDialog({
    title: `¿Activar clasificación "${classification.name}"?`,
    message: "La clasificación volverá a estar disponible para productos.",
    confirmLabel: "Activar clasificación",
    confirmClass: "primary-button is-success",
  });
  if (!confirmed) return;

  try {
    await activateClassificationInApi(id);
    await loadClassifications();
    showToast("Clasificación activada");
  } catch (error) {
    showToast(error.message || "No se pudo activar clasificacion");
  }
}

async function deleteClassification(id) {
  const classification = getClassificationById(id);
  if (!classification) return;
  closeAllProductActionMenus();

  const productCount = countClassificationProducts(classification);
  if (productCount > 0) {
    const action = await openClassificationDeleteBlockedDialog(classification, productCount);
    if (action === "deactivate") await deactivateClassification(id, { skipConfirm: true });
    return;
  }

  const confirmed = await openProductActionDialog({
    title: `¿Eliminar clasificación "${classification.name}"?`,
    message: "Esta clasificación no tiene productos asociados.\nLa eliminación no afectará productos.",
    confirmLabel: "Eliminar clasificación",
    confirmClass: "primary-button is-danger",
  });
  if (!confirmed) return;

  try {
    await deleteClassificationInApi(id);
    await loadClassifications();
    showToast("Clasificación eliminada");
  } catch (error) {
    if (error.code === "CLASSIFICATION_HAS_PRODUCTS") {
      const action = await openClassificationDeleteBlockedDialog(classification, error.productCount);
      if (action === "deactivate") await deactivateClassification(id, { skipConfirm: true });
      return;
    }
    showToast(error.message || "No se pudo eliminar clasificacion");
  }
}

function renderProducts() {
  if (!elements.productTable) return;

  const products = getFilteredProducts();
  const visibleWithoutExpiration = getFilteredProducts({ applyExpirationFilter: false });

  if (elements.productListCount) {
    if (state.expirationFilter) {
      elements.productListCount.textContent = `${products.length} de ${visibleWithoutExpiration.length} producto${visibleWithoutExpiration.length === 1 ? "" : "s"}`;
    } else {
      elements.productListCount.textContent = `${products.length} producto${products.length === 1 ? "" : "s"}`;
    }
  }

  elements.productTable.innerHTML = products.length
    ? products
        .map((product) => {
          const salePrice = toNumber(product.regularPrice ?? product.price);
          const storedPromo = getProductStoredPromotionalPrice(product);
          const promoInputValue = storedPromo != null ? formatPriceInputValue(storedPromo) : "";
          const metaParts = [product.category, product.type].filter(Boolean);
          const expirationStatus = getProductUrgentExpirationStatus(product);
          const expirationBadge = expirationBadgeMarkup(expirationStatus.expiresAt || product.expiresAt);
          const activeLotCount = getActiveProductLots(product).filter((lot) => lot.stock > 0).length;
          const rowClass =
            expirationStatus.level !== "none" ? `product-list-row ${expirationStatus.className}` : "product-list-row";
          return `
            <tr class="${rowClass}">
              <td class="col-check"><input class="product-row-check" type="checkbox" aria-label="Seleccionar ${escapeHTML(product.name)}" /></td>
              <td class="col-product">
                <div class="product-list-item">
                  ${productListImageMarkup(product)}
                  <div class="product-list-copy">
                    <button class="product-list-name ${expirationStatus.className}" type="button" data-action="edit-product" data-id="${product.id}" title="Editar producto">${escapeHTML(product.name)}</button>
                    <p class="product-list-meta">${product.sku ? `SKU ${escapeHTML(product.sku)}` : "Sin SKU"}${metaParts.length ? ` · ${escapeHTML(metaParts.join(" · "))}` : ""}</p>
                    <div class="product-list-expiry">${expirationBadge}</div>
                  </div>
                </div>
              </td>
              <td class="col-stock"><span class="product-list-stock">${toInteger(product.stock)}</span></td>
              <td class="col-expiry">
                <span class="product-list-expiry-date">${product.expiresAt ? escapeHTML(product.expiresAt) : "—"}</span>
              </td>
              <td class="col-lots"><span class="product-lot-count">${activeLotCount}</span></td>
              <td class="col-price">
                <input
                  class="product-price-input"
                  type="number"
                  min="0"
                  step="0.01"
                  inputmode="decimal"
                  data-price-field="sale"
                  data-id="${product.id}"
                  value="${formatPriceInputValue(salePrice)}"
                  aria-label="Precio venta de ${escapeHTML(product.name)}"
                />
              </td>
              <td class="col-price">
                <input
                  class="product-price-input"
                  type="number"
                  min="0"
                  step="0.01"
                  inputmode="decimal"
                  data-price-field="promo"
                  data-id="${product.id}"
                  value="${promoInputValue}"
                  placeholder="${formatPriceInputValue(salePrice)}"
                  aria-label="Precio promocional de ${escapeHTML(product.name)}"
                />
              </td>
              <td class="col-actions">
                <div class="product-list-actions">
                  <button class="product-list-action has-tooltip" type="button" data-action="duplicate-product" data-id="${product.id}" data-tooltip="Duplicar producto" aria-label="Duplicar producto">${productListActionIcon("duplicate")}</button>
                  ${
                    product.status === "Activo"
                      ? `<button class="product-list-action has-tooltip" type="button" data-action="pause-product" data-id="${product.id}" data-tooltip="Pausar producto" aria-label="Pausar producto">${productListActionIcon("pause")}</button>`
                      : `<button class="product-list-action has-tooltip is-success" type="button" data-action="activate-product" data-id="${product.id}" data-tooltip="Activar producto" aria-label="Activar producto">${productListActionIcon("activate")}</button>`
                  }
                  <div class="product-list-action-menu">
                    <button class="product-list-action has-tooltip is-menu" type="button" data-action="toggle-product-menu" data-id="${product.id}" data-tooltip="Más acciones" aria-label="Más acciones" aria-haspopup="menu">${productListActionIcon("more")}</button>
                    <div class="product-list-action-menu-panel" role="menu" hidden>
                      <button class="product-list-menu-item is-danger" type="button" role="menuitem" data-action="delete-product" data-id="${product.id}">
                        <span class="product-list-menu-title">Eliminar producto</span>
                        <span class="product-list-menu-desc">Baja administrativa, conserva trazabilidad.</span>
                      </button>
                      <button class="product-list-menu-item is-critical" type="button" role="menuitem" data-action="permanent-delete-product" data-id="${product.id}">
                        <span class="product-list-menu-title">Eliminar definitivamente</span>
                        <span class="product-list-menu-desc">Borrado físico irreversible.</span>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(8, state.productLoadError || (state.expirationFilter ? "No hay productos con este filtro de caducidad." : "No hay productos."));
  updateProductListFilterBar();
  const activeProducts = state.products.filter((product) => product.status === "Activo");
  renderExpirationAlertsSummary(elements.inventoryExpirationAlerts, activeProducts, { clickable: true });
}

function productListImageMarkup(product) {
  const initialsText = initials(product.name || "P");
  if (!product.imageUrl) {
    return `<div class="product-list-thumb product-list-thumb--empty" aria-hidden="true">${escapeHTML(initialsText)}</div>`;
  }
  return `<img class="product-list-thumb" src="${escapeHTML(product.imageUrl)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'product-list-thumb product-list-thumb--empty', textContent: '${escapeHTML(initialsText)}' }))" />`;
}

function productListActionIcon(name) {
  if (name === "duplicate") {
    return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="5.25" y="5.25" width="7.5" height="7.5" rx="1.25" fill="none" stroke="currentColor" stroke-width="1.35"></rect><path d="M3.5 10.75V4.35c0-.47.38-.85.85-.85h6.4" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"></path></svg>`;
  }
  if (name === "pause") {
    return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.35"></circle><path d="M6.35 6.1v3.8M9.65 6.1v3.8" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"></path></svg>`;
  }
  if (name === "delete") {
    return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 4.5h9M6.25 4.5V3.35c0-.47.38-.85.85-.85h1.8c.47 0 .85.38.85.85V4.5M6.4 7.1v4.1M9.6 7.1v4.1M4.65 4.5l.45 8.15c0 .47.38.85.85.85h4.1c.47 0 .85-.38.85-.85l.45-8.15" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
  }
  if (name === "delete-permanent") {
    return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 4.5h9M6.25 4.5V3.35c0-.47.38-.85.85-.85h1.8c.47 0 .85.38.85.85V4.5M6.4 7.1v4.1M9.6 7.1v4.1M4.65 4.5l.45 8.15c0 .47.38.85.85.85h4.1c.47 0 .85-.38.85-.85l.45-8.15" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 2.5v1.2M3.2 3.8 2.5 3.1M12.8 3.8l-.7.7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>`;
  }
  if (name === "more") {
    return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="3.5" cy="8" r="1.1" fill="currentColor"></circle><circle cx="8" cy="8" r="1.1" fill="currentColor"></circle><circle cx="12.5" cy="8" r="1.1" fill="currentColor"></circle></svg>`;
  }
  return `<svg class="product-list-action-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M11.2 4.8A4 4 0 1 0 4.8 11.2" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"></path><path d="M8 3.5V2M11.5 8H13M8 12.5V14M4.5 8H3" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"></path></svg>`;
}

function formatPriceInputValue(value) {
  const number = toNumber(value);
  return Number.isFinite(number) ? String(number) : "0";
}

async function handleProductPriceInputBlur(input) {
  const id = input.dataset.id;
  const field = input.dataset.priceField;
  const product = getProduct(id);
  if (!product || !field) return;

  const nextValue = input.value.trim() === "" ? null : toNumber(input.value);
  const previousRaw = input.dataset.previousValue ?? input.value;
  const previousValue = previousRaw === "" ? null : toNumber(previousRaw);
  if (nextValue !== null && (!Number.isFinite(nextValue) || nextValue < 0)) {
    input.value = previousRaw;
    return showToast("El precio debe ser un número mayor o igual a 0");
  }
  if (nextValue === previousValue) return;

  const payload = {};
  if (field === "sale") {
    payload.regularPrice = nextValue;
    payload.price = nextValue;
  } else {
    if (product.promotionalPriceSupported === false) {
      input.value = previousRaw;
      return showToast("Precio promocional requiere columna precio_promocional en Supabase");
    }
    payload.discountPrice = input.value.trim() === "" ? null : nextValue;
    payload.promotionalPrice = payload.discountPrice;
  }

  try {
    await saveProductToApi({ id: product.id, ...payload });
    const index = state.products.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      const updated = { ...state.products[index] };
      if (field === "sale") {
        updated.regularPrice = nextValue;
        updated.price = nextValue;
      } else {
        updated.discountPrice = payload.discountPrice;
        updated.promotionalPrice = payload.promotionalPrice;
      }
      state.products[index] = updated;
    }
    showToast("Precio actualizado");
  } catch (error) {
    input.value = previousRaw;
    showToast(error.message || "No se pudo actualizar el precio");
  }
}

function formatDuplicateTimestamp(date = new Date()) {
  const pad = (value, length = 2) => String(value).padStart(length, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function generateDuplicateSku(originalSku = "") {
  const stamp = formatDuplicateTimestamp();
  const base = String(originalSku || "").trim();
  return base ? `${base}-COPY-${stamp}` : `COPY-${stamp}`;
}

async function duplicateProduct(id) {
  const product = getProduct(id);
  if (!product) return;

  const suggestedSku = generateDuplicateSku(product.sku);
  const copy = {
    duplicateMode: true,
    sourceProductId: id,
    name: `${product.name} (copia)`,
    laboratory: product.laboratory || product.laboratorio || "",
    category: product.category,
    description: product.description,
    substance: product.substance,
    presentation: product.presentation || product.presentacion || "",
    expiresAt: product.expiresAt,
    stock: product.stock,
    minStock: product.minStock,
    maxStock: product.maxStock,
    cost: product.cost,
    regularPrice: product.regularPrice ?? product.price,
    price: product.regularPrice ?? product.price,
    discountPrice: product.discountPrice ?? null,
    imageUrl: product.imageUrl,
    type: product.type,
    classificationId: product.classificationId || "",
    requiresRecipe: product.requiresRecipe,
    iva: product.iva,
    status: product.status === "Pausado" ? "Pausado" : "Activo",
  };

  try {
    const saved = await saveProductToApi(copy);
    await loadProducts();
    showToast("Producto duplicado. Revisa SKU y código de barras.");
    if (saved?.id) {
      editProduct(saved.id);
      if (elements.productSku) elements.productSku.value = suggestedSku;
    }
  } catch (error) {
    showToast(error.message || "No se pudo duplicar producto");
  }
}

function renderInventory() {
  const activeProducts = state.products.filter((product) => product.status === "Activo");
  const lowStockProducts = activeProducts.filter((product) => product.stock > 0 && product.stock <= product.minStock);
  const summary = getExpirationSummary(activeProducts);
  const expiringCount = summary.red + summary.orange + summary.yellow + summary.green + summary.blue;
  const inventoryValue = activeProducts.reduce((total, product) => {
    const lots = getActiveProductLots(product);
    if (lots.length) {
      return total + lots.reduce((sum, lot) => sum + lot.stock * toNumber(lot.cost), 0);
    }
    return total + product.stock * toNumber(product.cost);
  }, 0);

  if (elements.inventoryActiveProducts) elements.inventoryActiveProducts.textContent = String(activeProducts.length);
  if (elements.inventoryLowStock) elements.inventoryLowStock.textContent = String(lowStockProducts.length);
  if (elements.inventoryExpiringSoon) elements.inventoryExpiringSoon.textContent = String(expiringCount);
  if (elements.inventoryTotalValue) elements.inventoryTotalValue.textContent = currency.format(inventoryValue);

  renderExpirationAlertsSummary(elements.inventoryExpirationAlerts, activeProducts, { clickable: true });
  renderInventoryTable();
}

function renderInventoryTable() {
  if (!elements.inventoryTable) return;

  const categories = [...new Set(state.products.map((product) => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  const laboratories = [...new Set(state.products.map(inventoryLaboratory).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  if (elements.inventoryCategoryFilter) updateInventoryFilterOptions(elements.inventoryCategoryFilter, categories, "Todas", state.inventoryCategory);
  if (elements.inventoryLaboratoryFilter) updateInventoryFilterOptions(elements.inventoryLaboratoryFilter, laboratories, "Todos", state.inventoryLaboratory);

  const products = state.products.filter((product) => {
    const status = inventoryStatus(product).label;
    const laboratory = inventoryLaboratory(product);
    const searchText = `${product.name || ""} ${product.sku || ""} ${product.substance || ""} ${laboratory}`.toLowerCase();
    return (
      searchText.includes(state.inventoryQuery) &&
      (!state.inventoryCategory || product.category === state.inventoryCategory) &&
      (!state.inventoryLaboratory || laboratory === state.inventoryLaboratory) &&
      (!state.inventoryStatus || status === state.inventoryStatus)
    );
  });

  elements.inventoryTable.innerHTML = products.length
    ? products
        .map((product) => {
          const activeLotCount = getActiveProductLots(product).filter((lot) => lot.stock > 0).length;
          const urgentStatus = getProductUrgentExpirationStatus(product);
          const expiryDate = urgentStatus.expiresAt || product.expiresAt || "";
          const skuLine = product.sku
            ? `<span class="inventory-product-sku">SKU ${escapeHTML(product.sku)}</span>`
            : "";
          return `
            <tr class="${isSanitaryExpirationLevel(urgentStatus.level) ? `inventory-row ${urgentStatus.className}` : ""}">
              <td class="inventory-col-product">
                <div class="inventory-product-cell">
                  ${productImageMarkup(product)}
                  <div class="inventory-product-copy">
                    <strong class="inventory-product-name">${escapeHTML(product.name)}</strong>
                    ${skuLine}
                  </div>
                </div>
              </td>
              <td class="inventory-col-category"><span class="catalog-tag is-category inventory-category-tag">${escapeHTML(product.category || "Sin categoría")}</span></td>
              <td class="inventory-col-stock"><span class="inventory-stock-value">${toInteger(product.stock)}</span></td>
              <td class="inventory-col-lots"><span class="inventory-lot-badge">${activeLotCount}</span></td>
              <td class="inventory-col-expiry">
                <div class="inventory-expiry-cell">
                  <span class="inventory-expiry-date">${expiryDate ? escapeHTML(expiryDate) : "—"}</span>
                  ${expiryDate ? expirationBadgeMarkup(expiryDate) : `<span class="expiry-badge is-expiration-none">Sin fecha</span>`}
                </div>
              </td>
              <td class="inventory-col-actions">
                <div class="inventory-table-actions">
                  <button class="ghost-button small inventory-action-btn" type="button" data-action="adjust-inventory-stock" data-id="${product.id}">Ajustar stock</button>
                  <button class="ghost-button small inventory-action-btn" type="button" data-action="view-inventory-history" data-id="${product.id}">Ver historial</button>
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : tableEmpty(6, state.productLoadError || "No hay productos que coincidan con los filtros.");
}

function updateInventoryFilterOptions(select, values, emptyLabel, selectedValue) {
  select.innerHTML = `<option value="">${emptyLabel}</option>${values
    .map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`)
    .join("")}`;
  select.value = selectedValue;
}

function inventoryLaboratory(product) {
  return product.laboratory || product.laboratorio || "No registrado";
}

function isInventoryExpiringSoon(product) {
  const status = getProductUrgentExpirationStatus(product);
  return isSanitaryExpirationLevel(status.level);
}

function inventoryStatus(product) {
  if (toInteger(product.stock) <= 0) return { label: "Agotado", icon: "🔴", className: "is-out" };
  if (isInventoryExpiringSoon(product)) return { label: "Próximo a caducar", icon: "🟠", className: "is-expiring" };
  if (toInteger(product.stock) <= toInteger(product.minStock)) return { label: "Stock bajo", icon: "🟡", className: "is-low" };
  return { label: "Disponible", icon: "🟢", className: "is-available" };
}

function getStockAdjustmentLots(product) {
  return getActiveProductLots(product).filter((lot) => lot.id);
}

function getStockAdjustmentCurrentStock(product, lotId = "") {
  if (!product) return 0;
  const lots = getStockAdjustmentLots(product);
  if (lotId) {
    const lot = lots.find((item) => item.id === lotId);
    return lot ? toInteger(lot.stock) : 0;
  }
  if (lots.length === 1) return toInteger(lots[0].stock);
  return toInteger(product.stock);
}

function getDefaultStockAdjustmentLotId(product, action = "add") {
  const lots = getStockAdjustmentLots(product);
  if (!lots.length) return "";
  if (lots.length === 1) return lots[0].id;
  if (action === "subtract") {
    const fefo = sortLotsFefo(lots);
    if (fefo.length) return fefo[0].id;
  }
  return lots[0].id;
}

function formatStockAdjustmentLotLabel(lot) {
  const code = lot.lot || lot.lote || "Sin lote";
  const expiry = lot.expiresAt ? ` · ${lot.expiresAt}` : "";
  return `${code} (${toInteger(lot.stock)} pzas${expiry})`;
}

function updateStockAdjustmentLotFieldVisibility(product) {
  if (!elements.stockAdjustmentLotField || !elements.stockAdjustmentLotId) return;
  const lots = getStockAdjustmentLots(product);
  if (lots.length > 1) {
    elements.stockAdjustmentLotField.hidden = false;
    elements.stockAdjustmentLotId.innerHTML = lots
      .map((lot) => `<option value="${escapeHTML(lot.id)}">${escapeHTML(formatStockAdjustmentLotLabel(lot))}</option>`)
      .join("");
    elements.stockAdjustmentLotId.value = getDefaultStockAdjustmentLotId(product, state.stockAdjustmentAction);
  } else {
    elements.stockAdjustmentLotField.hidden = true;
    elements.stockAdjustmentLotId.innerHTML = lots.length
      ? `<option value="${escapeHTML(lots[0].id)}">${escapeHTML(formatStockAdjustmentLotLabel(lots[0]))}</option>`
      : "";
    if (lots.length) elements.stockAdjustmentLotId.value = lots[0].id;
  }
}

function setStockAdjustmentMode(mode) {
  const normalized = mode === "new-lot" ? "new-lot" : "existing";
  state.stockAdjustmentMode = normalized;
  document.querySelectorAll("[data-action='set-stock-adjust-mode']").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === normalized);
  });
  if (elements.stockAdjustmentExistingPanel) {
    elements.stockAdjustmentExistingPanel.hidden = normalized !== "existing";
    elements.stockAdjustmentExistingPanel.classList.toggle("is-hidden", normalized !== "existing");
  }
  if (elements.stockAdjustmentNewLotPanel) {
    elements.stockAdjustmentNewLotPanel.hidden = normalized !== "new-lot";
    elements.stockAdjustmentNewLotPanel.classList.toggle("is-hidden", normalized !== "new-lot");
  }
  if (elements.stockAdjustmentSubmit) {
    elements.stockAdjustmentSubmit.textContent = normalized === "new-lot" ? "Guardar lote" : "Guardar ajuste";
  }
  if (elements.stockAdjustmentStockLabel) {
    elements.stockAdjustmentStockLabel.textContent = normalized === "new-lot" ? "Stock actual total" : "Stock actual del lote";
  }
  const product = getProduct(state.stockAdjustmentProductId);
  if (!product) return;
  if (normalized === "new-lot") {
    if (elements.stockAdjustmentCurrentStock) {
      elements.stockAdjustmentCurrentStock.textContent = String(toInteger(product.stock));
    }
    updateStockAdjustmentNewLotPreview();
  } else {
    updateStockAdjustmentLotFieldVisibility(product);
    updateStockAdjustmentPreview();
  }
}

function resetStockAdjustmentNewLotFields(product) {
  if (elements.stockAdjustmentNewLotCode) elements.stockAdjustmentNewLotCode.value = "";
  if (elements.stockAdjustmentNewLotExpiresAt) elements.stockAdjustmentNewLotExpiresAt.value = "";
  if (elements.stockAdjustmentNewLotQuantity) elements.stockAdjustmentNewLotQuantity.value = "";
  if (elements.stockAdjustmentNewLotCost) {
    elements.stockAdjustmentNewLotCost.value = product ? String(product.cost || 0) : "";
  }
  if (elements.stockAdjustmentNewLotSupplier) elements.stockAdjustmentNewLotSupplier.value = "";
  if (elements.stockAdjustmentNewLotLocation) elements.stockAdjustmentNewLotLocation.value = "";
  if (elements.stockAdjustmentNewLotReasonPreset) elements.stockAdjustmentNewLotReasonPreset.value = "";
  if (elements.stockAdjustmentNewLotReason) elements.stockAdjustmentNewLotReason.value = "";
  if (elements.stockAdjustmentDuplicateWarning) elements.stockAdjustmentDuplicateWarning.hidden = true;
  updateStockAdjustmentNewLotPreview();
}

function findMatchingProductLot(product, lotCode, expiresAt) {
  const normalizedLot = String(lotCode || "").trim().toLowerCase();
  const normalizedExpiry = String(expiresAt || "").trim();
  if (!normalizedLot || !normalizedExpiry) return null;
  return getActiveProductLots(product).find((lot) => {
    const code = String(lot.lot || lot.lote || "").trim().toLowerCase();
    const expiry = String(lot.expiresAt || "").trim();
    return code === normalizedLot && expiry === normalizedExpiry;
  });
}

function updateStockAdjustmentNewLotPreview() {
  const product = getProduct(state.stockAdjustmentProductId);
  if (!product) return;

  const current = toInteger(product.stock);
  const rawQuantity = elements.stockAdjustmentNewLotQuantity?.value;
  const quantity = rawQuantity === "" || rawQuantity == null ? 0 : toInteger(rawQuantity);
  if (elements.stockAdjustmentCurrentStock && state.stockAdjustmentMode === "new-lot") {
    elements.stockAdjustmentCurrentStock.textContent = String(current);
  }
  if (elements.stockAdjustmentNewLotTotalStock) {
    elements.stockAdjustmentNewLotTotalStock.textContent = String(current + Math.max(0, quantity));
  }

  const lotCode = String(elements.stockAdjustmentNewLotCode?.value || "").trim();
  const expiresAt = String(elements.stockAdjustmentNewLotExpiresAt?.value || "").trim();
  if (elements.stockAdjustmentDuplicateWarning) {
    const duplicate = findMatchingProductLot(product, lotCode, expiresAt);
    elements.stockAdjustmentDuplicateWarning.hidden = !duplicate;
  }
}

function setStockAdjustmentAction(action) {
  const normalized = String(action || "add").toLowerCase();
  if (!STOCK_ADJUST_ACTION_COPY[normalized]) return;
  state.stockAdjustmentAction = normalized;
  document.querySelectorAll("[data-action='set-stock-adjust-action']").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === normalized);
  });
  const product = getProduct(state.stockAdjustmentProductId);
  if (product && elements.stockAdjustmentLotId) {
    const defaultLotId = getDefaultStockAdjustmentLotId(product, normalized);
    if (defaultLotId) elements.stockAdjustmentLotId.value = defaultLotId;
  }
  const copy = STOCK_ADJUST_ACTION_COPY[normalized];
  if (elements.stockAdjustmentHelp) elements.stockAdjustmentHelp.textContent = copy.help;
  if (elements.stockAdjustmentQuantity) {
    elements.stockAdjustmentQuantity.min = normalized === "replace" ? "0" : "1";
    if (normalized !== "replace" && elements.stockAdjustmentQuantity.value === "0") {
      elements.stockAdjustmentQuantity.value = "";
    }
  }
  updateStockAdjustmentPreview();
}

function updateStockAdjustmentReasonWarning() {
  if (!elements.stockAdjustmentReasonWarning || !elements.stockAdjustmentReason) return;
  const empty = !String(elements.stockAdjustmentReason.value || "").trim();
  elements.stockAdjustmentReasonWarning.hidden = !empty;
}

function updateStockAdjustmentPreview() {
  const product = getProduct(state.stockAdjustmentProductId);
  if (!product) return;

  const lotId = elements.stockAdjustmentLotId?.value || "";
  const current = getStockAdjustmentCurrentStock(product, lotId);
  const action = state.stockAdjustmentAction;
  const rawQuantity = elements.stockAdjustmentQuantity?.value;
  const quantity = rawQuantity === "" || rawQuantity == null ? 0 : toInteger(rawQuantity);
  let next = current;

  if (action === "add") next = current + quantity;
  else if (action === "subtract") next = current - quantity;
  else if (action === "replace") next = quantity;

  if (elements.stockAdjustmentCurrentStock && state.stockAdjustmentMode === "existing") {
    elements.stockAdjustmentCurrentStock.textContent = String(current);
  }
  if (elements.stockAdjustmentNewStock) {
    elements.stockAdjustmentNewStock.textContent = String(Math.max(0, next));
    elements.stockAdjustmentNewStock.classList.toggle("is-invalid", next < 0);
  }

  const copy = STOCK_ADJUST_ACTION_COPY[action];
  if (copy && elements.stockAdjustmentExample) {
    const displayQty = rawQuantity === "" || rawQuantity == null ? "…" : quantity;
    elements.stockAdjustmentExample.textContent = copy.example(current, displayQty, Math.max(0, next));
  }
}

function openStockAdjustmentDialog(productId, options = {}) {
  const product = getProduct(productId);
  if (!product) return showToast("Producto no encontrado");

  state.stockAdjustmentProductId = productId;
  state.stockAdjustmentAction = "add";

  if (elements.stockAdjustmentProductId) elements.stockAdjustmentProductId.value = productId;
  if (elements.stockAdjustmentProductName) elements.stockAdjustmentProductName.textContent = product.name;
  if (elements.stockAdjustmentSku) elements.stockAdjustmentSku.textContent = product.sku || "Sin SKU";
  if (elements.stockAdjustmentQuantity) elements.stockAdjustmentQuantity.value = "";
  if (elements.stockAdjustmentReasonPreset) elements.stockAdjustmentReasonPreset.value = "";
  if (elements.stockAdjustmentReason) elements.stockAdjustmentReason.value = "";
  updateStockAdjustmentReasonWarning();
  resetStockAdjustmentNewLotFields(product);

  updateStockAdjustmentLotFieldVisibility(product);

  document.querySelectorAll("[data-action='set-stock-adjust-action']").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === "add");
  });
  if (elements.stockAdjustmentHelp) {
    elements.stockAdjustmentHelp.textContent = STOCK_ADJUST_ACTION_COPY.add.help;
  }
  setStockAdjustmentMode(options.mode === "new-lot" ? "new-lot" : "existing");
  elements.stockAdjustmentDialog?.showModal();
}

function closeStockAdjustmentDialog() {
  elements.stockAdjustmentDialog?.close();
  state.stockAdjustmentProductId = null;
  state.stockAdjustmentMode = "existing";
}

async function saveStockAdjustment(event) {
  event.preventDefault();
  if (state.stockAdjustmentMode === "new-lot") {
    await saveNewInventoryLotFromAdjustment();
    return;
  }

  const productId = elements.stockAdjustmentProductId?.value || state.stockAdjustmentProductId;
  const product = getProduct(productId);
  if (!product) return showToast("Producto no encontrado");

  const action = state.stockAdjustmentAction;
  const quantityRaw = elements.stockAdjustmentQuantity?.value;
  const reason = String(elements.stockAdjustmentReason?.value || "").trim();

  updateStockAdjustmentReasonWarning();
  if (!reason) return showToast("Agrega un motivo para conservar trazabilidad del inventario");

  if (quantityRaw === "" || quantityRaw == null) return showToast("Ingresa una cantidad");
  const quantity = toInteger(quantityRaw);
  if (!Number.isFinite(quantity) || quantity < 0) return showToast("La cantidad debe ser un número >= 0");
  if ((action === "add" || action === "subtract") && quantity <= 0) {
    return showToast("La cantidad debe ser mayor a 0 para agregar o descontar");
  }

  const previewLotId =
    elements.stockAdjustmentLotId?.value || getDefaultStockAdjustmentLotId(product, action);
  const current = getStockAdjustmentCurrentStock(product, previewLotId);
  const next =
    action === "add" ? current + quantity : action === "subtract" ? current - quantity : quantity;
  if (next < 0) return showToast("El stock no puede quedar negativo");

  const lots = getStockAdjustmentLots(product);
  let resolvedLotId = "";
  if (lots.length === 1) resolvedLotId = lots[0].id;
  else if (lots.length > 1) resolvedLotId = elements.stockAdjustmentLotId?.value || "";

  const payload = {
    productId,
    action,
    quantity,
    reason,
  };
  if (resolvedLotId) payload.lotId = resolvedLotId;

  try {
    await adjustInventoryStockInApi(payload);
    closeStockAdjustmentDialog();
    const detailProductId = productId;
    await loadProducts();
    if (elements.inventoryDetailDialog?.open) openInventoryDetail(detailProductId);
    showToast("Stock ajustado");
  } catch (error) {
    showToast(error.message || "No se pudo ajustar stock");
  }
}

async function adjustInventoryStockInApi(payload) {
  const response = await fetch(inventoryAdjustApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo ajustar stock");
  return data;
}

function getInventoryMovementTypeMeta(type) {
  const key = String(type || "").toLowerCase();
  const labels = {
    entrada: "Entrada",
    salida: "Salida",
    reemplazo: "Reemplazo",
    merma: "Merma",
    caducidad: "Caducado",
    correccion: "Corrección",
    inventario_inicial: "Inicial",
    agregar: "Agregar",
    descontar: "Descontar",
    reemplazar: "Reemplazar",
    add: "Agregar",
    subtract: "Descontar",
    replace: "Reemplazar",
  };
  const label = labels[key] || type || "—";
  let tone = "is-neutral";
  if (["entrada", "agregar", "add", "inventario_inicial"].includes(key)) tone = "is-entry";
  else if (["salida", "descontar", "subtract", "merma", "caducidad"].includes(key)) tone = "is-exit";
  else if (["reemplazo", "reemplazar", "replace"].includes(key)) tone = "is-replace";
  else if (key === "correccion") tone = "is-correction";
  return { label, tone };
}

function formatInventoryMovementType(type) {
  return getInventoryMovementTypeMeta(type).label;
}

function inventoryMovementTypeBadge(type) {
  const meta = getInventoryMovementTypeMeta(type);
  return `<span class="inventory-movement-badge ${meta.tone}">${escapeHTML(meta.label)}</span>`;
}

async function addInventoryLotInApi(payload) {
  const response = await fetch(inventoryLotsApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo agregar lote");
  return data;
}

async function saveNewInventoryLotFromAdjustment() {
  const productId = elements.stockAdjustmentProductId?.value || state.stockAdjustmentProductId;
  const product = getProduct(productId);
  if (!product) return showToast("Producto no encontrado");

  const lot = String(elements.stockAdjustmentNewLotCode?.value || "").trim();
  const expiresAt = String(elements.stockAdjustmentNewLotExpiresAt?.value || "").trim();
  const quantityRaw = elements.stockAdjustmentNewLotQuantity?.value;
  const costRaw = elements.stockAdjustmentNewLotCost?.value;
  const reason = String(elements.stockAdjustmentNewLotReason?.value || "").trim();
  const supplier = String(elements.stockAdjustmentNewLotSupplier?.value || "").trim();
  const location = String(elements.stockAdjustmentNewLotLocation?.value || "").trim();

  if (!lot) return showToast("Ingresa el número de lote");
  if (!expiresAt) return showToast("Ingresa la fecha de caducidad");
  if (!reason) return showToast("Agrega un motivo para conservar trazabilidad del inventario");
  if (quantityRaw === "" || quantityRaw == null) return showToast("Ingresa la cantidad recibida");
  const quantity = toInteger(quantityRaw);
  if (!Number.isFinite(quantity) || quantity <= 0) return showToast("La cantidad debe ser mayor a 0");
  if (costRaw === "" || costRaw == null) return showToast("Ingresa el costo de compra");
  const cost = toNumber(costRaw);
  if (!Number.isFinite(cost) || cost < 0) return showToast("El costo debe ser un número >= 0");

  const duplicate = findMatchingProductLot(product, lot, expiresAt);
  if (duplicate) {
    const confirmed = await openProductActionDialog({
      title: "Lote duplicado",
      message: `Ya existe un lote "${lot}" con caducidad ${expiresAt}. ¿Deseas crear otro registro igual?`,
      confirmLabel: "Crear de todos modos",
    });
    if (!confirmed) return;
  }

  const payload = {
    productId,
    lot,
    expiresAt,
    quantity,
    cost,
    reason,
  };
  if (supplier) payload.supplier = supplier;
  if (location) payload.location = location;

  try {
    await addInventoryLotInApi(payload);
    closeStockAdjustmentDialog();
    const detailProductId = productId;
    await loadProducts();
    if (elements.productId?.value === productId) renderProductLotsPanel(getProduct(productId));
    if (elements.inventoryDetailDialog?.open) openInventoryDetail(detailProductId);
    showToast("Lote agregado al inventario");
  } catch (error) {
    showToast(error.message || "No se pudo agregar lote");
  }
}

async function fetchInventoryMovements(productId) {
  const response = await fetch(`${inventoryMovementsApiUrl}?productId=${encodeURIComponent(productId)}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo cargar historial");
  return Array.isArray(data.movements) ? data.movements : [];
}

async function openInventoryMovementsDialog(productId) {
  const product = getProduct(productId);
  if (!product) return showToast("Producto no encontrado");

  if (elements.inventoryMovementsTitle) {
    elements.inventoryMovementsTitle.textContent = `Historial · ${product.name}`;
  }
  if (elements.inventoryMovementsContent) {
    elements.inventoryMovementsContent.innerHTML = `<p class="inventory-movements-loading">Cargando movimientos…</p>`;
  }
  elements.inventoryMovementsDialog?.showModal();

  try {
    const movements = await fetchInventoryMovements(productId);
    if (!elements.inventoryMovementsContent) return;
    elements.inventoryMovementsContent.innerHTML = movements.length
      ? `
        <div class="table-scroll inventory-movements-scroll">
          <table class="inventory-movements-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Stock anterior</th>
                <th>Stock nuevo</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              ${movements
                .map(
                  (movement) => `
                <tr>
                  <td class="inventory-movements-date">${escapeHTML(formatShortDate(movement.createdAt) || "—")}</td>
                  <td class="inventory-movements-type">${inventoryMovementTypeBadge(movement.type)}</td>
                  <td class="inventory-movements-num">${toInteger(movement.quantity)}</td>
                  <td class="inventory-movements-num">${toInteger(movement.previousStock)}</td>
                  <td class="inventory-movements-num">${toInteger(movement.newStock)}</td>
                  <td class="inventory-movements-reason">${escapeHTML(movement.reason || "—")}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `
      : `<p class="inventory-movements-empty">Sin movimientos registrados para este producto.</p>`;
  } catch (error) {
    if (elements.inventoryMovementsContent) {
      elements.inventoryMovementsContent.innerHTML = `<p class="inventory-movements-empty">${escapeHTML(error.message || "No se pudo cargar historial")}</p>`;
    }
  }
}

function openInventoryDetail(id) {
  const product = getProduct(id);
  if (!product) return;
  const status = inventoryStatus(product);
  const urgentStatus = getProductUrgentExpirationStatus(product);
  elements.inventoryDetailTitle.textContent = product.name;
  elements.inventoryDetailContent.innerHTML = `
    <div class="inventory-detail-hero">
      ${productImageMarkup(product)}
      <div>
        <span class="inventory-status ${status.className}">${status.icon} ${escapeHTML(status.label)}</span>
        <div class="product-list-expiry">${expirationBadgeMarkup(urgentStatus.expiresAt || product.expiresAt)}</div>
        <p>${escapeHTML(product.description || "Sin descripción registrada")}</p>
      </div>
    </div>
    <dl class="inventory-detail-grid">
      ${inventoryDetailItem("Nombre comercial", product.name)}
      ${inventoryDetailItem("Sustancia activa", product.substance || "No registrada")}
      ${inventoryDetailItem("Laboratorio", inventoryLaboratory(product))}
      ${inventoryDetailItem("Categoría", product.category || "Sin categoría")}
      ${inventoryDetailItem("Clasificación", product.type || "Sin clasificación")}
      ${inventoryDetailItem("Presentación", product.presentation || product.presentacion || "No registrada")}
      ${inventoryDetailItem("Código de barras / SKU", product.sku || "No registrado")}
      ${inventoryDetailItem("Stock total", String(toInteger(product.stock)))}
      ${inventoryDetailItem("Próxima caducidad", expirationDetailMarkup(product.expiresAt), { html: true })}
      ${inventoryDetailItem("Precio venta", currency.format(product.price || 0))}
      ${inventoryDetailItem("Requiere receta", product.requiresRecipe ? "Sí" : "No")}
    </dl>
    <section class="product-lots-detail-section">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Inventario</p>
          <h3>Lotes del producto</h3>
        </div>
        <div class="inventory-detail-actions">
          <button class="ghost-button small" type="button" data-action="adjust-inventory-stock" data-id="${product.id}">Ajustar stock</button>
          <button class="ghost-button small" type="button" data-action="view-inventory-history" data-id="${product.id}">Ver historial</button>
        </div>
      </div>
      ${renderProductLotsTableMarkup(product, { showActions: true })}
    </section>
  `;
  elements.inventoryDetailDialog.showModal();
}

function inventoryDetailItem(label, value, options = {}) {
  const content = options.html ? value : escapeHTML(value);
  return `<div><dt>${escapeHTML(label)}</dt><dd>${content}</dd></div>`;
}

function productImageMarkup(product) {
  const initialsText = initials(product.name || "Producto");
  if (!product.imageUrl) return `<div class="product-image-placeholder">${escapeHTML(initialsText)}</div>`;
  return `<img src="${escapeHTML(product.imageUrl)}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'product-image-placeholder', textContent: '${escapeHTML(initialsText)}' }))" />`;
}

async function saveInventoryProduct(event) {
  event.preventDefault();
  const name = elements.inventoryProductName.value.trim();
  const price = toNumber(elements.inventoryProductPrice.value);
  const stock = toInteger(elements.inventoryProductStock.value);
  const minStock = toInteger(elements.inventoryProductMinStock.value);

  if (!name) return showToast("El nombre es obligatorio");
  if (price < 0) return showToast("El precio venta no puede ser negativo");
  if (stock < 0) return showToast("El stock inicial no puede ser negativo");
  if (minStock < 0) return showToast("El stock minimo no puede ser negativo");

  const sku = elements.inventoryProductSku.value.trim() || elements.inventoryProductBarcode.value.trim();
  const substance = elements.inventoryProductSubstance.value.trim();
  const payload = {
    name,
    substance,
    laboratory: elements.inventoryProductLaboratory.value.trim(),
    category: elements.inventoryProductCategory.value.trim(),
    presentation: elements.inventoryProductPresentation.value.trim(),
    sku,
    cost: toNumber(elements.inventoryProductCost.value),
    price,
    stock,
    minStock,
    requiresRecipe: elements.inventoryProductRequiresRecipe.checked,
    imageUrl: elements.inventoryProductImageUrl.value.trim(),
    status: "Activo",
    type: "Medicamento",
  };

  try {
    await saveProductToApi(payload);
    await loadProducts();
    clearInventoryProductForm();
    elements.inventoryProductDialog.close();
    showToast("Producto guardado");
  } catch (error) {
    showToast(error.message || "No se pudo guardar producto en Supabase");
  }
}

function clearInventoryProductForm() {
  elements.inventoryProductVisualForm.reset();
}

async function saveProduct(event) {
  event.preventDefault();
  const sku = elements.productSku.value.trim();
  const id = elements.productId.value;
  const cost = toNumber(elements.productCost.value);
  const minStock = toInteger(elements.productMinStock.value);
  const maxStock = toInteger(elements.productMaxStock.value);
  const firstLotCode = elements.productFirstLotCode?.value.trim() || "";
  const firstLotStock = toInteger(elements.productFirstLotStock?.value);
  const firstLotExpires = elements.productFirstLotExpires?.value || "";

  const listPrice = toNumber(elements.productRegularPrice.value);
  const promoRaw = elements.productPrice.value.trim();
  const promoPrice = promoRaw === "" ? null : toNumber(elements.productPrice.value);

  if ([cost, listPrice, minStock, maxStock].some((value) => value < 0)) return showToast("No se permiten valores negativos");
  if (promoPrice != null && promoPrice < 0) return showToast("No se permiten valores negativos");
  if (minStock > maxStock) return showToast("El minimo no puede superar el maximo");
  if (!id && firstLotStock < 0) return showToast("El stock inicial no puede ser negativo");
  if (!id && firstLotCode && !firstLotExpires) return showToast("Indica la caducidad del lote inicial");
  if (!id && firstLotExpires && !firstLotCode) return showToast("Indica el número del lote inicial");

  const imageUrl = elements.productImageUrl.value.trim();
  if (productImagePendingFile && !imageUrl) {
    try {
      const uploadedImageUrl = await uploadProductImageToApi(productImagePendingFile);
      elements.productImageUrl.value = uploadedImageUrl;
      clearProductImagePendingFile();
      updateProductImagePreview();
      updateProductImageStatus("");
    } catch (error) {
      return showToast(error.message || "No se pudo subir imagen a Supabase Storage");
    }
  }

  const product = {
    id,
    sku,
    name: elements.productName.value.trim(),
    laboratory: elements.productLaboratory.value.trim(),
    category: elements.productCategory.value.trim(),
    description: elements.productDescription.value.trim(),
    substance: elements.productSubstance.value.trim(),
    minStock,
    maxStock,
    cost,
    regularPrice: listPrice,
    price: listPrice,
    discountPrice: promoPrice,
    promotionalPrice: promoPrice,
    imageUrl: elements.productImageUrl.value.trim(),
    type: elements.productType.value,
    classificationId: elements.productType.selectedOptions[0]?.dataset?.id || "",
    requiresRecipe: classificationRequiresRecipe(elements.productType.value),
    iva: elements.productIva.value === "Si",
    status: elements.productStatus.value,
  };

  if (!id) {
    product.stock = firstLotCode ? firstLotStock : 0;
    product.expiresAt = firstLotExpires;
    product.lot = firstLotCode;
    product.lote = firstLotCode;
  }

  if (!product.category) return showToast("Selecciona una categoría");
  if (!product.type) return showToast("Selecciona una clasificación");
  if (!listPrice && listPrice !== 0) return showToast("Indica el precio lista");

  try {
    await saveProductToApi(product);
    await loadProducts();
    closeProductForm();
    showToast("Producto guardado");
  } catch (error) {
    showToast(error.message || "No se pudo guardar producto en Supabase");
  }
}

function editProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  renderProductCatalogSelects();
  elements.productFormTitle.textContent = "Editar producto";
  elements.productId.value = product.id;
  elements.productSku.value = product.sku || "";
  elements.productName.value = product.name;
  elements.productLaboratory.value = product.laboratory || product.laboratorio || "";
  ensureSelectOption(elements.productCategory, product.category);
  elements.productCategory.value = product.category;
  elements.productSubstance.value = product.substance || "";
  elements.productImageUrl.value = product.imageUrl || "";
  clearProductImagePendingFile();
  updateProductImagePreview();
  updateProductImageStatus("");
  elements.productCost.value = product.cost || 0;
  const listPrice = toNumber(product.regularPrice ?? product.price);
  const storedPromo = getProductStoredPromotionalPrice(product);
  elements.productRegularPrice.value = listPrice;
  elements.productPrice.value = storedPromo != null ? storedPromo : listPrice;
  if (elements.productPromoPriceNotice) {
    elements.productPromoPriceNotice.hidden = product.promotionalPriceSupported !== false;
  }
  elements.productMinStock.value = product.minStock;
  elements.productMaxStock.value = product.maxStock;
  ensureSelectOption(elements.productType, product.type);
  elements.productType.value = product.type;
  elements.productIva.value = product.iva ? "Si" : "No";
  elements.productStatus.value = product.status;
  elements.productDescription.value = product.description;
  renderProductLotsPanel(product);
  updateProductProfitSummary();
  showView("product-form");
}

async function refreshProductsAfterAction(message) {
  await loadProducts();
  if (message) showToast(message);
}

function openProductActionDialog({ title, message, confirmLabel, confirmClass = "primary-button" }) {
  return new Promise((resolve) => {
    if (!elements.productActionDialog) {
      resolve(window.confirm(`${title}\n\n${message}`));
      return;
    }
    productActionDialogResolver = resolve;
    elements.productActionDialogTitle.textContent = title;
    elements.productActionDialogMessage.textContent = message;
    elements.productActionDialogConfirm.textContent = confirmLabel;
    elements.productActionDialogConfirm.className = confirmClass;
    elements.productActionDialog.showModal();
  });
}

function handleProductActionDialogClose() {
  const confirmed = elements.productActionDialog?.returnValue === "confirm";
  productActionDialogResolver?.(confirmed);
  productActionDialogResolver = null;
}

function openProductPermanentDeleteDialog(product) {
  return new Promise((resolve) => {
    if (!elements.productPermanentDeleteDialog) {
      resolve(false);
      return;
    }
    productPermanentDeleteResolver = resolve;
    elements.productPermanentDeleteTitle.textContent = `¿Eliminar definitivamente "${product.name}"?`;
    elements.productPermanentDeleteMessage.textContent =
      "Esta acción borrará el producto físicamente de Supabase. No se podrá recuperar desde MASTER CRM. Úsalo solo para productos de prueba o registros creados por error.";
    elements.productPermanentDeleteConfirmInput.value = "";
    elements.productPermanentDeleteError.hidden = true;
    elements.productPermanentDeleteError.textContent = "";
    elements.productPermanentDeleteDialog.showModal();
    elements.productPermanentDeleteConfirmInput.focus();
  });
}

function handleProductPermanentDeleteSubmit(event) {
  event.preventDefault();
  if (elements.productPermanentDeleteConfirmInput.value.trim() !== "ELIMINAR") {
    elements.productPermanentDeleteError.hidden = false;
    elements.productPermanentDeleteError.textContent = "Debes escribir ELIMINAR para confirmar.";
    elements.productPermanentDeleteConfirmInput.focus();
    return;
  }
  const resolve = productPermanentDeleteResolver;
  productPermanentDeleteResolver = null;
  elements.productPermanentDeleteDialog.close();
  resolve?.(true);
}

function closeAllProductActionMenus() {
  hideProductActionTooltip();
  document.querySelectorAll(".product-list-action-menu-panel").forEach((panel) => {
    panel.hidden = true;
    panel.classList.remove("is-floating");
    panel.style.position = "";
    panel.style.top = "";
    panel.style.left = "";
    panel.style.right = "";
    panel.style.zIndex = "";
    panel.style.visibility = "";
    if (panel._menuHost && panel.parentElement === document.body) {
      panel._menuHost.appendChild(panel);
    }
  });
}

function positionProductActionMenu(button, panel) {
  const viewportPadding = 8;
  const gap = 6;
  panel.classList.add("is-floating");
  panel.hidden = false;
  panel.style.visibility = "hidden";
  panel.style.position = "fixed";
  panel.style.zIndex = "10050";

  const menuWidth = panel.offsetWidth || 252;
  const menuHeight = panel.offsetHeight || 132;
  const rect = button.getBoundingClientRect();

  let left = rect.right - menuWidth;
  if (left < viewportPadding) left = viewportPadding;
  if (left + menuWidth > window.innerWidth - viewportPadding) {
    left = Math.max(viewportPadding, window.innerWidth - menuWidth - viewportPadding);
  }

  let top = rect.bottom + gap;
  if (top + menuHeight > window.innerHeight - viewportPadding) {
    top = rect.top - menuHeight - gap;
  }
  if (top < viewportPadding) top = viewportPadding;

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  panel.style.right = "auto";
  panel.style.visibility = "";
}

let productActionTooltipEl = null;
let productActionTooltipButton = null;

function ensureProductActionTooltip() {
  if (!productActionTooltipEl) {
    productActionTooltipEl = document.createElement("div");
    productActionTooltipEl.className = "product-action-floating-tooltip";
    productActionTooltipEl.hidden = true;
    document.body.appendChild(productActionTooltipEl);
  }
  return productActionTooltipEl;
}

function hideProductActionTooltip() {
  if (productActionTooltipEl) productActionTooltipEl.hidden = true;
  productActionTooltipButton = null;
}

function handleProductActionTooltipOver(event) {
  const button = event.target.closest(".product-list-action.has-tooltip");
  if (!button || !elements.productTable?.contains(button)) return;
  if (button.closest(".product-list-action-menu-panel")) return;
  showProductActionTooltip(button);
}

function handleProductActionTooltipOut(event) {
  const button = event.target.closest(".product-list-action.has-tooltip");
  if (!button || button !== productActionTooltipButton) return;
  const next = event.relatedTarget;
  if (next && button.contains(next)) return;
  hideProductActionTooltip();
}

function showProductActionTooltip(button) {
  const text = button.getAttribute("data-tooltip");
  if (!text) return;
  const tooltip = ensureProductActionTooltip();
  productActionTooltipButton = button;
  tooltip.textContent = text;
  tooltip.hidden = false;
  tooltip.style.visibility = "hidden";
  const padding = 8;
  const rect = button.getBoundingClientRect();
  const isMenu = button.classList.contains("is-menu");
  const tipRect = tooltip.getBoundingClientRect();
  let top;
  let left;

  if (isMenu) {
    top = rect.top + rect.height / 2 - tipRect.height / 2;
    left = rect.left - tipRect.width - 8;
    if (left < padding) left = rect.right + 8;
    if (top < padding) top = padding;
    if (top + tipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tipRect.height - padding;
    }
  } else {
    top = rect.top - tipRect.height - 8;
    left = rect.left + rect.width / 2 - tipRect.width / 2;
    if (left < padding) left = padding;
    if (left + tipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tipRect.width - padding;
    }
    if (top < padding) top = rect.bottom + 8;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.style.visibility = "";
}

function toggleProductActionMenu(button) {
  const host = button.closest(".product-list-action-menu");
  const panel = host?.querySelector(".product-list-action-menu-panel");
  if (!panel || !host) return;
  const willOpen = panel.hidden;
  closeAllProductActionMenus();
  if (!willOpen) return;

  hideProductActionTooltip();
  panel._menuHost = host;
  panel.hidden = false;
  document.body.appendChild(panel);
  positionProductActionMenu(button, panel);
}

async function pauseProduct(id) {
  const product = getProduct(id);
  if (!product || product.status !== "Activo") return;
  const confirmed = await openProductActionDialog({
    title: `¿Pausar "${product.name}"?`,
    message:
      "El producto dejará de mostrarse como activo, pero podrás reactivarlo después.",
    confirmLabel: "Pausar producto",
  });
  if (!confirmed) return;
  try {
    await saveProductToApi({ ...product, status: "Pausado" });
    await refreshProductsAfterAction("Producto pausado");
  } catch (error) {
    showToast(error.message || "No se pudo pausar producto");
  }
}

async function activateProduct(id) {
  const product = getProduct(id);
  if (!product || product.status === "Activo") return;
  const confirmed = await openProductActionDialog({
    title: `¿Activar "${product.name}"?`,
    message: "El producto volverá a mostrarse como activo en el catálogo.",
    confirmLabel: "Activar producto",
    confirmClass: "primary-button is-success",
  });
  if (!confirmed) return;
  try {
    await saveProductToApi({ ...product, status: "Activo" });
    await refreshProductsAfterAction("Producto activado");
  } catch (error) {
    showToast(error.message || "No se pudo activar producto");
  }
}

async function deleteProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  const confirmed = await openProductActionDialog({
    title: `¿Eliminar "${product.name}"?`,
    message:
      "El producto se dará de baja del catálogo y dejará de aparecer en la lista activa. No se contabilizará como producto disponible. Esta acción conserva el registro administrativo para trazabilidad.",
    confirmLabel: "Eliminar producto",
    confirmClass: "primary-button is-danger",
  });
  if (!confirmed) return;
  try {
    await archiveProductInApi(id);
    await refreshProductsAfterAction("Producto dado de baja del catálogo");
  } catch (error) {
    showToast(error.message || "No se pudo eliminar producto");
  }
}

async function permanentDeleteProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  const confirmed = await openProductPermanentDeleteDialog(product);
  if (!confirmed) return;
  try {
    await permanentDeleteProductInApi(id);
    await refreshProductsAfterAction("Producto eliminado definitivamente");
  } catch (error) {
    showToast(error.message || "No se pudo eliminar definitivamente el producto");
  }
}

function clearProductForm() {
  elements.productForm.reset();
  elements.productId.value = "";
  elements.productFormTitle.textContent = "Nuevo producto";
  elements.productMinStock.value = 5;
  elements.productMaxStock.value = 50;
  elements.productFirstLotStock.value = "0";
  if (elements.productPromoPriceNotice) elements.productPromoPriceNotice.hidden = true;
  clearProductImagePendingFile();
  updateProductProfitSummary();
  renderProductLotsPanel(null);
  updateProductLotFormPreview();
  updateProductImagePreview();
  updateProductImageStatus("");
}

function clearProductImagePendingFile(options = {}) {
  if (productImageObjectUrl) {
    URL.revokeObjectURL(productImageObjectUrl);
    productImageObjectUrl = "";
  }
  productImagePendingFile = null;
  if (!options.keepInput && elements.productImageFile) elements.productImageFile.value = "";
}

function handleProductImageUploadClick() {
  elements.productImageFile.click();
}

function handleProductImageClearClick() {
  elements.productImageUrl.value = "";
  clearProductImagePendingFile();
  updateProductImagePreview();
  updateProductImageStatus("Imagen quitada. Guarda el producto para persistir el cambio.");
}

function handleProductImageFileChange(event) {
  const file = event.target.files?.[0];
  clearProductImagePendingFile({ keepInput: true });
  if (!file) {
    updateProductImagePreview();
    return;
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    event.target.value = "";
    showToast("Solo se permiten imagenes PNG, JPEG o WebP");
    updateProductImagePreview();
    return;
  }

  productImagePendingFile = file;
  productImageObjectUrl = URL.createObjectURL(file);
  updateProductImagePreview();
  updateProductImageStatus(`Imagen lista: ${file.name}. Se subira al guardar el producto.`);
}

function updateProductImageStatus(message) {
  if (!elements.productImageStatus) return;
  elements.productImageStatus.textContent = message || "";
}

function handleProductImageUrlInput() {
  if (elements.productImageUrl.value.trim()) {
    clearProductImagePendingFile();
    updateProductImageStatus("");
  }
  updateProductImagePreview();
}

function handleProductImagePreviewError() {
  if (productImageObjectUrl) return;
  elements.productImagePreview.classList.add("is-empty");
  elements.productImagePreviewImg.hidden = true;
  elements.productImagePreviewImg.removeAttribute("src");
  const empty = elements.productImagePreview.querySelector(".product-image-preview-empty");
  if (empty) {
    empty.hidden = false;
    empty.textContent = "No se pudo cargar la imagen";
  }
}

function isValidProductImageUrl(value) {
  const url = String(value || "").trim();
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function updateProductImageClearButton() {
  if (!elements.productImageClearButton) return;
  const hasImage = Boolean(productImageObjectUrl || productImagePendingFile || isValidProductImageUrl(elements.productImageUrl.value));
  elements.productImageClearButton.hidden = !hasImage;
}

function updateProductImagePreview() {
  if (!elements.productImagePreview || !elements.productImagePreviewImg) return;

  const empty = elements.productImagePreview.querySelector(".product-image-preview-empty");
  const url = elements.productImageUrl.value.trim();
  let previewSrc = "";

  if (productImageObjectUrl) previewSrc = productImageObjectUrl;
  else if (isValidProductImageUrl(url)) previewSrc = url;

  if (previewSrc) {
    elements.productImagePreview.classList.remove("is-empty");
    elements.productImagePreviewImg.hidden = false;
    if (empty) {
      empty.hidden = true;
      empty.textContent = "Sin imagen";
    }
    if (elements.productImagePreviewImg.getAttribute("src") !== previewSrc) {
      elements.productImagePreviewImg.src = previewSrc;
    }
    updateProductImageClearButton();
    return;
  }

  elements.productImagePreview.classList.add("is-empty");
  elements.productImagePreviewImg.hidden = true;
  elements.productImagePreviewImg.removeAttribute("src");
  if (empty) {
    empty.hidden = false;
    empty.textContent = "Sin imagen";
  }
  updateProductImageClearButton();
}

function updateProductProfitSummary() {
  if (!elements.productProfitSummary) return;

  const productId = elements.productId?.value;
  const product = productId ? getProduct(productId) : null;
  const listPrice = toNumber(elements.productRegularPrice.value);
  const promoPrice = toNumber(elements.productPrice.value);
  const metrics = getProductCommercialMetrics(product, {
    listPrice,
    promoPrice,
    fallbackCost: toNumber(elements.productCost.value),
    fallbackStock: toInteger(elements.productFirstLotStock?.value),
  });

  elements.productProfitSummary.classList.remove("is-loss", "is-profit", "is-neutral");

  if (elements.productProfitStockTotal) elements.productProfitStockTotal.textContent = String(metrics.stockTotal);
  if (elements.productProfitWeightedCost) {
    elements.productProfitWeightedCost.textContent =
      metrics.stockTotal > 0 ? currency.format(metrics.weightedAvgCost) : "—";
  }
  if (elements.productProfitInventoryValue) {
    elements.productProfitInventoryValue.textContent = currency.format(metrics.inventoryCostValue);
  }

  if (!metrics.stockTotal || metrics.weightedAvgCost <= 0) {
    elements.productProfitAmount.textContent = "—";
    elements.productProfitPercent.textContent = "Sin costo por lote";
    elements.productProfitNote.textContent = metrics.stockTotal
      ? "Registra el costo en cada lote activo para calcular ganancia ponderada."
      : "Agrega lotes con stock para calcular ganancia ponderada.";
    if (elements.productProfitPromoBlock) elements.productProfitPromoBlock.hidden = true;
    elements.productProfitSummary.classList.add("is-neutral");
    return;
  }

  elements.productProfitAmount.textContent = currency.format(metrics.listProfitTotal);
  elements.productProfitPercent.textContent = `${metrics.marginPercent.toFixed(1)}%`;

  if (elements.productProfitPromoBlock && elements.productProfitPromoAmount) {
    if (metrics.hasPromo) {
      elements.productProfitPromoBlock.hidden = false;
      elements.productProfitPromoAmount.textContent = currency.format(metrics.promoProfitTotal);
    } else {
      elements.productProfitPromoBlock.hidden = true;
    }
  }

  if (metrics.listProfitTotal < 0 || (metrics.hasPromo && metrics.promoProfitTotal < 0)) {
    elements.productProfitSummary.classList.add("is-loss");
    elements.productProfitNote.textContent = "Hay precios por debajo del costo ponderado de los lotes.";
    return;
  }

  elements.productProfitSummary.classList.add(metrics.listProfitTotal > 0 ? "is-profit" : "is-neutral");
  elements.productProfitNote.textContent =
    metrics.stockTotal > 1 || getActiveProductLots(product || {}).length > 1
      ? "Cálculo ponderado por stock de cada lote activo."
      : "";
}

function getProductCommercialMetrics(product, options = {}) {
  const listPrice = toNumber(options.listPrice ?? product?.regularPrice ?? product?.price);
  const promoInput = options.promoPrice ?? product?.discountPrice;
  const promoPrice = promoInput == null || promoInput === "" ? listPrice : toNumber(promoInput);
  const hasPromo = promoPrice !== listPrice;

  let lots = getActiveProductLots(product || {}).filter((lot) => lot.stock > 0);
  if (!lots.length) {
    const fallbackStock = toInteger(options.fallbackStock ?? product?.stock);
    const fallbackCost = toNumber(options.fallbackCost ?? product?.cost);
    if (fallbackStock > 0) {
      lots = [{ stock: fallbackStock, cost: fallbackCost }];
    }
  }

  let stockTotal = 0;
  let inventoryCostValue = 0;
  let listProfitTotal = 0;
  let promoProfitTotal = 0;

  lots.forEach((lot) => {
    const stock = toInteger(lot.stock);
    const cost = toNumber(lot.cost);
    stockTotal += stock;
    inventoryCostValue += cost * stock;
    listProfitTotal += (listPrice - cost) * stock;
    if (hasPromo) promoProfitTotal += (promoPrice - cost) * stock;
  });

  const weightedAvgCost = stockTotal > 0 ? inventoryCostValue / stockTotal : 0;
  const marginPercent =
    weightedAvgCost > 0 && listPrice > 0 ? ((listPrice - weightedAvgCost) / weightedAvgCost) * 100 : 0;

  return {
    stockTotal,
    inventoryCostValue,
    weightedAvgCost,
    listProfitTotal,
    promoProfitTotal,
    hasPromo,
    marginPercent,
  };
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
  if (order && normalizeOrderStatus(order.status) !== "completado") markOrderShipped(order.id);
  else {
    persist(storageKeys.shipments, state.shipments);
    renderAll();
  }
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
  if (order) markOrderPaid(order.id);
  else {
    persist(storageKeys.payments, state.payments);
    renderAll();
  }
}

function createSaleFromOrder(order, options = {}) {
  if (normalizeOrderStatus(order.status) === "cancelado") {
    upsertSaleFromOrder(order, { status: "cancelada" });
    return;
  }
  if (options.pending || order.paymentStatus !== "pagado") {
    upsertSaleFromOrder(order, { status: "por_cobrar", paymentStatus: order.paymentStatus });
    return;
  }
  upsertSaleFromOrder(order);
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

function getDaysUntilExpiration(expiresAt) {
  if (!expiresAt) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${expiresAt}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return null;
  return Math.round((expiry.getTime() - today.getTime()) / 86400000);
}

async function saveProductLotToApi(payload) {
  const response = await fetch(productLotsApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo guardar lote");
  return data;
}

async function updateProductLotInApi(lotId, payload) {
  const response = await fetch(`${productLotsApiUrl}/${encodeURIComponent(lotId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo actualizar lote");
  return data;
}

const EXPIRATION_URGENCY_RANK = {
  red: 0,
  orange: 1,
  yellow: 2,
  green: 3,
  blue: 4,
  safe: 5,
  none: 6,
};

function getProductLots(product) {
  if (!product) return [];
  if (Array.isArray(product.lots) && product.lots.length) return product.lots;
  if (product.expiresAt || product.lot || product.lote || toInteger(product.stock) > 0) {
    return [
      {
        id: product.lotId || "",
        lot: product.lot || product.lote || "Sin lote",
        lote: product.lot || product.lote || "Sin lote",
        stock: toInteger(product.stock),
        expiresAt: product.expiresAt || "",
        cost: toNumber(product.cost),
        active: true,
      },
    ];
  }
  return [];
}

function getActiveProductLots(product) {
  return getProductLots(product).filter((lot) => lot.active !== false);
}

function getVisibleProductLots(product) {
  return getProductLots(product).filter((lot) => lot.active !== false && (lot.stock > 0 || lot.expiresAt));
}

function sortLotsFefo(lots) {
  return [...lots]
    .filter((lot) => lot.active !== false && lot.stock > 0 && getDaysUntilExpiration(lot.expiresAt) !== null)
    .sort((left, right) => {
      const leftDays = getDaysUntilExpiration(left.expiresAt);
      const rightDays = getDaysUntilExpiration(right.expiresAt);
      return leftDays - rightDays;
    });
}

function planFefoDeduction(lots, quantity) {
  const plan = [];
  let remaining = Math.max(0, toInteger(quantity));
  sortLotsFefo(lots).forEach((lot) => {
    if (remaining <= 0) return;
    const take = Math.min(lot.stock, remaining);
    if (take > 0) {
      plan.push({ lotId: lot.id, lot: lot.lot || lot.lote, quantity: take, expiresAt: lot.expiresAt });
      remaining -= take;
    }
  });
  return { plan, remaining };
}

function getProductUrgentExpirationStatus(product) {
  const lots = getActiveProductLots(product).filter((lot) => lot.stock > 0);
  let urgent = { level: "none", label: "Sin fecha", daysLeft: null, className: "is-expiration-none", expiresAt: "" };
  lots.forEach((lot) => {
    if (!lot.expiresAt) return;
    const status = getExpirationStatus(lot.expiresAt);
    if (
      urgent.level === "none" ||
      EXPIRATION_URGENCY_RANK[status.level] < EXPIRATION_URGENCY_RANK[urgent.level]
    ) {
      urgent = { ...status, expiresAt: lot.expiresAt };
    }
  });
  if (urgent.level !== "none") return urgent;
  const fallback = getExpirationStatus(product.expiresAt);
  return { ...fallback, expiresAt: product.expiresAt || "" };
}

function renderProductLotActionsMarkup(product, lot) {
  const inactive = lot.active === false;
  const pauseTitle = inactive
    ? "Reactiva este lote en el inventario."
    : "Oculta temporalmente este lote sin eliminarlo. Puedes reactivarlo después.";
  return `
    <button class="ghost-button small product-lot-action-btn" type="button" data-action="edit-product-lot" data-product-id="${product.id}" data-id="${lot.id}" title="Modifica datos del lote como stock, caducidad o costo." aria-label="Editar lote">Editar</button>
    <button class="ghost-button small product-lot-action-btn ${inactive ? "is-success" : "is-danger"}" type="button" data-action="toggle-product-lot" data-product-id="${product.id}" data-id="${lot.id}" title="${pauseTitle}" aria-label="${inactive ? "Activar lote" : "Pausar lote"}">${inactive ? "Activar" : "Pausar"}</button>
    <button class="ghost-button small product-lot-action-btn is-danger" type="button" data-action="delete-product-lot" data-product-id="${product.id}" data-id="${lot.id}" title="Elimina permanentemente este lote del stock." aria-label="Eliminar lote">Eliminar</button>
  `;
}

function renderProductLotsTableMarkup(product, options = {}) {
  const lots = getProductLots(product);
  const showActions = Boolean(options.showActions);
  if (!lots.length) {
    return `<p class="product-lots-empty">Sin lotes registrados para este producto.</p>`;
  }

  const sortedLots = [...lots].sort((left, right) => {
    const leftDays = getDaysUntilExpiration(left.expiresAt);
    const rightDays = getDaysUntilExpiration(right.expiresAt);
    return compareExpirationDays(leftDays, rightDays);
  });

  return `
    <div class="table-scroll product-lots-scroll">
      <table class="product-lots-table">
        <thead>
          <tr>
            <th>Lote</th>
            <th>Stock</th>
            <th>Caducidad</th>
            <th>Semáforo</th>
            <th>Costo</th>
            ${showActions ? "<th>Acciones</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${sortedLots
            .map((lot) => {
              const status = getExpirationStatus(lot.expiresAt);
              const inactive = lot.active === false;
              const depleted = lot.stock <= 0;
              const rowClass = inactive ? "is-lot-inactive" : depleted ? "is-lot-depleted" : status.className;
              const actions = showActions
                ? `<td class="table-actions product-lot-table-actions">${renderProductLotActionsMarkup(product, lot)}</td>`
                : "";
              return `
                <tr class="product-lot-row ${rowClass}">
                  <td>${escapeHTML(lot.lot || lot.lote || "Sin lote")}${inactive ? ' <span class="product-lot-flag">Pausado</span>' : ""}${depleted && !inactive ? ' <span class="product-lot-flag">Agotado</span>' : ""}</td>
                  <td>${toInteger(lot.stock)}</td>
                  <td>${lot.expiresAt ? escapeHTML(lot.expiresAt) : "—"}</td>
                  <td>${expirationBadgeMarkup(lot.expiresAt)}</td>
                  <td>${currency.format(lot.cost || 0)}</td>
                  ${actions}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function compareExpirationDays(left, right) {
  if (left === null && right === null) return 0;
  if (left === null) return 1;
  if (right === null) return -1;
  return left - right;
}

function renderProductLotsPanel(product) {
  const isEditing = Boolean(product?.id);
  if (elements.productLotCreateFields) elements.productLotCreateFields.hidden = isEditing;
  if (elements.productLotsManagePanel) elements.productLotsManagePanel.hidden = !isEditing;
  if (!isEditing) {
    updateProductLotFormPreview();
    return;
  }

  const urgentStatus = getProductUrgentExpirationStatus(product);
  const activeLots = getActiveProductLots(product).filter((lot) => lot.stock > 0);
  if (elements.productLotStockTotal) elements.productLotStockTotal.textContent = String(toInteger(product.stock));
  if (elements.productLotNextExpiry) {
    elements.productLotNextExpiry.textContent = product.expiresAt || "—";
  }
  if (elements.productLotActiveCount) elements.productLotActiveCount.textContent = String(activeLots.length);
  if (elements.productExpirationStatus) {
    elements.productExpirationStatus.innerHTML = expirationBadgeMarkup(urgentStatus.expiresAt || product.expiresAt);
    elements.productExpirationStatus.className = `product-expiration-status has-status ${urgentStatus.className}`;
  }
  if (elements.productLotsTable) {
    const lots = getProductLots(product);
    if (!lots.length) {
      elements.productLotsTable.innerHTML = `<tr><td colspan="6">${escapeHTML("Sin lotes registrados.")}</td></tr>`;
    } else {
      const sortedLots = [...lots].sort((left, right) =>
        compareExpirationDays(getDaysUntilExpiration(left.expiresAt), getDaysUntilExpiration(right.expiresAt)),
      );
      elements.productLotsTable.innerHTML = sortedLots
        .map((lot) => {
          const status = getExpirationStatus(lot.expiresAt);
          const inactive = lot.active === false;
          const depleted = lot.stock <= 0;
          const rowClass = inactive ? "is-lot-inactive" : depleted ? "is-lot-depleted" : status.className;
          return `
            <tr class="product-lot-row ${rowClass}">
              <td>${escapeHTML(lot.lot || lot.lote || "Sin lote")}${inactive ? ' <span class="product-lot-flag">Pausado</span>' : ""}${depleted && !inactive ? ' <span class="product-lot-flag">Agotado</span>' : ""}</td>
              <td>${toInteger(lot.stock)}</td>
              <td>${lot.expiresAt ? escapeHTML(lot.expiresAt) : "—"}</td>
              <td>${expirationBadgeMarkup(lot.expiresAt)}</td>
              <td>${currency.format(lot.cost || 0)}</td>
              <td class="table-actions product-lot-table-actions">${renderProductLotActionsMarkup(product, lot)}</td>
            </tr>
          `;
        })
        .join("");
    }
  }
  if (elements.openProductLotFormButton) {
    elements.openProductLotFormButton.dataset.productId = product.id;
  }
  updateProductProfitSummary();
}

function updateProductLotFormPreview() {
  if (!elements.productExpirationStatus) return;
  const isEditing = Boolean(elements.productId?.value);
  if (isEditing) return;
  const expiresAt = elements.productFirstLotExpires?.value || "";
  if (!expiresAt) {
    elements.productExpirationStatus.innerHTML = expirationBadgeMarkup("");
    elements.productExpirationStatus.className = "product-expiration-status has-status is-expiration-none";
    return;
  }
  const status = getExpirationStatus(expiresAt);
  elements.productExpirationStatus.innerHTML = expirationBadgeMarkup(expiresAt);
  elements.productExpirationStatus.className = `product-expiration-status has-status ${status.className}`;
}

function openProductLotDialog(productId, lotId = "") {
  if (!lotId) {
    const resolvedProductId = productId || elements.productId?.value || elements.openProductLotFormButton?.dataset.productId;
    if (!resolvedProductId) return showToast("Guarda el producto antes de agregar lotes");
    openStockAdjustmentDialog(resolvedProductId, { mode: "new-lot" });
    return;
  }

  const resolvedProductId = productId || elements.productId?.value || elements.openProductLotFormButton?.dataset.productId;
  if (!resolvedProductId) return showToast("Guarda el producto antes de agregar lotes");

  const product = getProduct(resolvedProductId);
  const lot = getProductLots(product).find((item) => item.id === lotId);
  if (!lot) return showToast("Lote no encontrado");
  elements.productLotProductId.value = resolvedProductId;
  elements.productLotId.value = lot.id;
  elements.productLotCode.value = lot.lot || lot.lote || "";
  elements.productLotStock.value = String(lot.stock);
  elements.productLotExpiresAt.value = lot.expiresAt || "";
  elements.productLotCost.value = String(lot.cost || 0);
  elements.productLotDialogTitle.textContent = "Editar lote";
  elements.productLotDialog.showModal();
}

async function saveProductLot(event) {
  event.preventDefault();
  const productId = elements.productLotProductId.value;
  const lotId = elements.productLotId.value;
  if (!lotId) return showToast("Usa Ajustar stock para agregar un lote nuevo");
  const payload = {
    productId,
    lot: elements.productLotCode.value.trim(),
    stock: toInteger(elements.productLotStock.value),
    expiresAt: elements.productLotExpiresAt.value,
    cost: toNumber(elements.productLotCost.value),
  };

  if (!payload.lot) return showToast("El número de lote es obligatorio");
  if (!payload.expiresAt) return showToast("La caducidad del lote es obligatoria");
  if (payload.stock < 0) return showToast("El stock no puede ser negativo");

  try {
    await updateProductLotInApi(lotId, payload);
    await loadProducts();
    elements.productLotDialog.close();
    const product = getProduct(productId);
    if (elements.productId.value === productId) renderProductLotsPanel(product);
    if (elements.inventoryDetailDialog.open) openInventoryDetail(productId);
    showToast("Lote actualizado");
  } catch (error) {
    showToast(error.message || "No se pudo guardar lote");
  }
}

async function toggleProductLot(productId, lotId) {
  const product = getProduct(productId);
  const lot = getProductLots(product).find((item) => item.id === lotId);
  if (!lot) return;
  const nextActive = lot.active === false;
  const actionLabel = nextActive ? "activar" : "pausar";
  if (!window.confirm(`¿Deseas ${actionLabel} el lote "${lot.lot || lot.lote}"?`)) return;

  try {
    await updateProductLotInApi(lotId, { active: nextActive });
    await loadProducts();
    const refreshed = getProduct(productId);
    if (elements.productId.value === productId) renderProductLotsPanel(refreshed);
    if (elements.inventoryDetailDialog.open) openInventoryDetail(productId);
    showToast(nextActive ? "Lote activado" : "Lote pausado");
  } catch (error) {
    showToast(error.message || "No se pudo actualizar lote");
  }
}

function openProductLotDeleteDialog(productId, lot) {
  return new Promise((resolve) => {
    if (!elements.productLotDeleteDialog) {
      showToast("No se pudo abrir la confirmación de eliminación de lote");
      resolve(false);
      return;
    }
    productLotDeleteResolver = resolve;
    productLotDeleteContext = { productId, lotId: lot.id };
    const lotCode = lot.lot || lot.lote || "Sin lote";
    const stock = toInteger(lot.stock);
    let message =
      "Este lote se eliminará permanentemente del inventario.\nNo aparecerá en el stock ni podrá usarse para ajustes futuros.\n\nEsta acción no se puede deshacer.";
    if (stock > 0) {
      message = `Este lote todavía tiene ${stock} piezas. Si lo eliminas, se descontarán del stock total.\n\n${message}`;
    }
    elements.productLotDeleteTitle.textContent = `¿Eliminar lote "${lotCode}"?`;
    elements.productLotDeleteMessage.textContent = message;
    elements.productLotDeleteConfirmInput.value = "";
    elements.productLotDeleteError.hidden = true;
    elements.productLotDeleteError.textContent = "";
    elements.productLotDeleteDialog.showModal();
    elements.productLotDeleteConfirmInput.focus();
  });
}

function handleProductLotDeleteSubmit(event) {
  event.preventDefault();
  if (elements.productLotDeleteConfirmInput.value.trim() !== "ELIMINAR") {
    elements.productLotDeleteError.hidden = false;
    elements.productLotDeleteError.textContent = "Debes escribir ELIMINAR para confirmar.";
    elements.productLotDeleteConfirmInput.focus();
    return;
  }
  const resolve = productLotDeleteResolver;
  productLotDeleteResolver = null;
  elements.productLotDeleteDialog.close();
  resolve?.(true);
}

async function deleteProductLotInApi(lotId) {
  const response = await fetch(`${inventoryLotsApiUrl}/${encodeURIComponent(lotId)}`, { method: "DELETE" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.details || data.error || "No se pudo eliminar lote");
  return data;
}

async function deleteProductLot(productId, lotId) {
  const product = getProduct(productId);
  const lot = getProductLots(product).find((item) => item.id === lotId);
  if (!lot) return showToast("Lote no encontrado");

  const confirmed = await openProductLotDeleteDialog(productId, lot);
  if (!confirmed) return;

  try {
    await deleteProductLotInApi(lotId);
    await loadProducts();
    const refreshed = getProduct(productId);
    if (elements.productId?.value === productId) renderProductLotsPanel(refreshed);
    if (elements.inventoryDetailDialog?.open) openInventoryDetail(productId);
    showToast("Lote eliminado del inventario");
  } catch (error) {
    showToast(error.message || "No se pudo eliminar lote");
  } finally {
    productLotDeleteContext = null;
  }
}

function isSanitaryExpirationLevel(level) {
  return level === "red" || level === "orange" || level === "yellow" || level === "green" || level === "blue";
}

function getExpirationStatus(expiresAt) {
  const daysLeft = getDaysUntilExpiration(expiresAt);
  if (daysLeft === null) {
    return { level: "none", label: "Sin fecha", daysLeft: null, className: "is-expiration-none" };
  }
  if (daysLeft <= 0) {
    return {
      level: "red",
      label: daysLeft < 0 ? "Vencido" : "Vence hoy",
      daysLeft,
      className: "is-expiration-red",
    };
  }
  if (daysLeft <= 15) {
    return { level: "orange", label: `${daysLeft} días`, daysLeft, className: "is-expiration-orange" };
  }
  if (daysLeft <= 30) {
    return { level: "yellow", label: `${daysLeft} días`, daysLeft, className: "is-expiration-yellow" };
  }
  if (daysLeft <= 60) {
    return { level: "green", label: `${daysLeft} días`, daysLeft, className: "is-expiration-green" };
  }
  if (daysLeft <= 90) {
    return { level: "blue", label: `${daysLeft} días`, daysLeft, className: "is-expiration-blue" };
  }
  return { level: "safe", label: "+3 meses", daysLeft, className: "is-expiration-safe" };
}

function getProductExpirationGroup(product) {
  return getProductUrgentExpirationStatus(product).level;
}

function productMatchesExpirationFilter(product, filter) {
  if (!filter) return true;
  const level = getProductExpirationGroup(product);
  if (filter === "noAlert") return level === "safe" || level === "none";
  return level === filter;
}

function getExpirationSummary(products) {
  const summary = { red: 0, orange: 0, yellow: 0, green: 0, blue: 0, safe: 0, none: 0 };
  products.forEach((product) => {
    const level = getProductExpirationGroup(product);
    if (Object.prototype.hasOwnProperty.call(summary, level)) summary[level] += 1;
  });
  summary.noAlert = summary.safe + summary.none;
  summary.total = products.length;
  // Grupos exclusivos: cada producto activo cae en un solo bucket.
  const accounted = summary.red + summary.orange + summary.yellow + summary.green + summary.blue + summary.noAlert;
  if (accounted !== summary.total) {
    console.warn("[caducidad] Conteo inconsistente", { summary, accounted });
  }
  return summary;
}

function expirationBadgeMarkup(expiresAt) {
  const status = getExpirationStatus(expiresAt);
  return `<span class="expiry-badge ${status.className}">${escapeHTML(status.label)}</span>`;
}

function expirationCellMarkup(expiresAt) {
  const status = getExpirationStatus(expiresAt);
  if (status.level === "none") return expirationBadgeMarkup(expiresAt);
  return `<span class="expiration-inline"><span class="expiration-date">${escapeHTML(expiresAt)}</span>${expirationBadgeMarkup(expiresAt)}</span>`;
}

function expirationDetailMarkup(expiresAt) {
  const status = getExpirationStatus(expiresAt);
  if (status.level === "none") return "Sin fecha";
  return `<span class="expiration-inline"><span class="expiration-date">${escapeHTML(expiresAt)}</span>${expirationBadgeMarkup(expiresAt)}</span>`;
}

function updateProductExpirationStatus() {
  if (!elements.productExpirationStatus) return;
  const productId = elements.productId?.value;
  if (productId) {
    renderProductLotsPanel(getProduct(productId));
    return;
  }
  updateProductLotFormPreview();
}

function stockStatus(product) {
  if (product.stock <= 0) return { label: "Agotado", className: "danger" };
  if (product.stock <= product.minStock) return { label: "Stock bajo", className: "warning" };
  return { label: "Disponible", className: "success" };
}

function resetDemoData() {
  if (!window.confirm("Reiniciar demo de MASTER CRM?")) return;
  state.products = [];
  state.customers = initialCustomers.map(normalizeCustomer);
  state.commercialProfiles = initialCommercialProfiles.map(normalizeCommercialProfile);
  state.orders = [];
  state.payments = [];
  state.shipments = [];
  state.sales = [];
  localStorage.removeItem(storageKeys.orderSeq);
  localStorage.removeItem(storageKeys.saleSeq);
  state.conversations = initialConversations.map((item) => ({ ...item }));
  state.storeCart = [];
  persistAll();
  localStorage.setItem(storageKeys.catalogVersion, PRODUCT_CATALOG_VERSION);
  ensureCommerceDemoData();
  seedChat();
  renderAll();
  loadProducts();
  showToast("Demo reiniciado");
}

function syncProductCatalog() {
  state.storeCart = [];
}

function persistAll() {
  persist(storageKeys.customers, state.customers);
  persist(storageKeys.commercialProfiles, state.commercialProfiles);
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

function formatFullTime(value) {
  return new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date(value));
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

function showCommercialProfileFeedback(message) {
  const feedback = elements.commercialProfileFeedback;
  if (!feedback) return false;
  feedback.textContent = message;
  feedback.hidden = false;
  feedback.classList.add("is-visible");
  window.clearTimeout(showCommercialProfileFeedback.timeout);
  showCommercialProfileFeedback.timeout = window.setTimeout(() => {
    feedback.classList.remove("is-visible");
    feedback.hidden = true;
  }, 2800);
  return true;
}

function showToast(message) {
  if (elements.customerCommercialProfilesDialog?.open && showCommercialProfileFeedback(message)) {
    return;
  }
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
