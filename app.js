const storageKeys = {
  products: "minifarmacia_crm_products",
  customers: "minifarmacia_crm_customers",
  orders: "minifarmacia_crm_orders",
  payments: "minifarmacia_crm_payments",
  shipments: "minifarmacia_crm_shipments",
  sales: "minifarmacia_crm_sales",
  conversations: "minifarmacia_crm_conversations",
  settings: "minifarmacia_crm_settings",
  catalogVersion: "minifarmacia_product_catalog_version",
};

const PRODUCT_CATALOG_VERSION = "pdv-2026-06-11";

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
  conversationQuery: "",
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
  productSku: $("#productSku"),
  productName: $("#productName"),
  productCategory: $("#productCategory"),
  productSubstance: $("#productSubstance"),
  productImageUrl: $("#productImageUrl"),
  productCost: $("#productCost"),
  productRegularPrice: $("#productRegularPrice"),
  productPrice: $("#productPrice"),
  productStock: $("#productStock"),
  productMinStock: $("#productMinStock"),
  productMaxStock: $("#productMaxStock"),
  productExpiresAt: $("#productExpiresAt"),
  productType: $("#productType"),
  productIva: $("#productIva"),
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
  syncProductCatalog();
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
  if (action.dataset.action === "take-conversation") updateLatestConversation("Asesor humano");
  if (action.dataset.action === "mark-conversation-order") updateLatestConversation("Pedido");
  if (action.dataset.action === "mark-conversation-delivered") updateLatestConversation("Entregado");
  if (action.dataset.action === "send-store-link") sendStoreLinkToConversation();
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

function renderConversations() {
  const conversations = state.conversations.filter((conversation) => {
    const text = `${conversation.customerName} ${conversation.phone} ${conversation.lastMessage} ${conversation.status}`.toLowerCase();
    return text.includes(state.conversationQuery);
  });
  const selected = conversations[0] || state.conversations[0];

  elements.conversationList.innerHTML = conversations.length
    ? conversations
        .slice(0, 12)
        .map(
          (conversation, index) => `
            <article class="conversation-item ${index === 0 ? "active" : ""}">
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
    : emptyState("Sin conversaciones.");

  renderConversationProfile(selected);
  renderAdvisorAlert(selected);
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
  state.conversations[0].status = status;
  persist(storageKeys.conversations, state.conversations);
  renderConversations();
  showToast(`Conversacion marcada: ${status}`);
}

function sendStoreLinkToConversation() {
  addBubble("business", buildWelcomeMessage());
  showToast("Liga de tienda enviada");
}

function renderStore() {
  const categories = ["Todas", ...new Set(state.products.map((product) => product.category))];
  elements.storeCategory.innerHTML = categories
    .map((category) => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`)
    .join("");
  elements.storeCategory.value = state.storeCategory;
  elements.storeCategoryMenu.innerHTML = categories
    .map((category) => {
      const count =
        category === "Todas"
          ? state.products.filter((product) => product.status === "Activo").length
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
    return product.status === "Activo" && matchesCategory && text.includes(state.storeQuery);
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
    const text = `${product.sku || ""} ${product.name} ${product.category} ${product.type} ${product.status} ${product.substance || ""}`.toLowerCase();
    return text.includes(state.productQuery);
  });
  elements.productTable.innerHTML = products.length
    ? products
        .map((product) => {
          const status = stockStatus(product);
          return `
            <tr>
              <td>
                <div class="admin-product-cell">
                  ${product.imageUrl ? `<img src="${escapeHTML(product.imageUrl)}" alt="" loading="lazy" />` : ""}
                  <div>
                    <strong>${escapeHTML(product.name)}</strong>
                    <span>${escapeHTML(product.sku || "Sin SKU")} · ${escapeHTML(product.description)}</span>
                  </div>
                </div>
              </td>
              <td>${escapeHTML(product.category)}</td>
              <td>${currency.format(product.price)}</td>
              <td><strong>${product.stock}</strong><span>${escapeHTML(status.label)} · Cad. ${escapeHTML(product.expiresAt || "N/D")}</span></td>
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
  const sku = elements.productSku.value.trim();
  const id = elements.productId.value || `prod-${sku.toLowerCase()}`;
  const cost = toNumber(elements.productCost.value);
  const regularPrice = toNumber(elements.productRegularPrice.value);
  const price = toNumber(elements.productPrice.value);
  const stock = toInteger(elements.productStock.value);
  const minStock = toInteger(elements.productMinStock.value);
  const maxStock = toInteger(elements.productMaxStock.value);
  if ([cost, regularPrice, price, stock, minStock, maxStock].some((value) => value < 0)) return showToast("No se permiten valores negativos");
  if (minStock > maxStock) return showToast("El minimo no puede superar el maximo");
  if (stock > maxStock) return showToast("El stock no puede superar el maximo");

  const product = {
    id,
    sku,
    name: elements.productName.value.trim(),
    category: elements.productCategory.value.trim(),
    description: elements.productDescription.value.trim(),
    substance: elements.productSubstance.value.trim(),
    expiresAt: elements.productExpiresAt.value,
    stock,
    minStock,
    maxStock,
    cost,
    regularPrice: regularPrice || price,
    price,
    discountPrice: price,
    imageUrl: elements.productImageUrl.value.trim(),
    type: elements.productType.value,
    requiresRecipe: elements.productType.value === "Receta medica",
    iva: elements.productIva.value === "Si",
    status: elements.productStatus.value,
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
  elements.productSku.value = product.sku || "";
  elements.productName.value = product.name;
  elements.productCategory.value = product.category;
  elements.productSubstance.value = product.substance || "";
  elements.productImageUrl.value = product.imageUrl || "";
  elements.productCost.value = product.cost || 0;
  elements.productRegularPrice.value = product.regularPrice || product.price;
  elements.productPrice.value = product.price;
  elements.productStock.value = product.stock;
  elements.productMinStock.value = product.minStock;
  elements.productMaxStock.value = product.maxStock;
  elements.productExpiresAt.value = product.expiresAt || "";
  elements.productType.value = product.type;
  elements.productIva.value = product.iva ? "Si" : "No";
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
  localStorage.setItem(storageKeys.catalogVersion, PRODUCT_CATALOG_VERSION);
  seedChat();
  renderAll();
  showToast("Demo reiniciado");
}

function syncProductCatalog() {
  if (localStorage.getItem(storageKeys.catalogVersion) === PRODUCT_CATALOG_VERSION) return;
  state.products = initialProducts.map((item) => ({ ...item }));
  state.storeCart = [];
  persist(storageKeys.products, state.products);
  localStorage.setItem(storageKeys.catalogVersion, PRODUCT_CATALOG_VERSION);
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
