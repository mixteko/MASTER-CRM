create extension if not exists pgcrypto;

create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text,
  telefono text not null unique,
  email text,
  direccion text,
  whatsapp_id text,
  ultimo_mensaje text,
  estado text default 'nuevo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  descripcion text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid references categorias(id) on delete set null,
  nombre text not null,
  descripcion text,
  precio numeric(12,2) not null default 0,
  stock integer not null default 0,
  codigo_barras text unique,
  presentacion text,
  laboratorio text,
  activo boolean not null default true,
  requiere_receta boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inventario (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete cascade,
  stock integer not null default 0,
  stock_minimo integer not null default 0,
  stock_maximo integer,
  lote text,
  fecha_caducidad date,
  costo numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists usuarios_admin (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text unique,
  email text unique,
  rol text not null default 'admin',
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists conversaciones (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  estado text not null default 'nuevo',
  canal text not null default 'whatsapp',
  ultimo_mensaje text,
  ultimo_mensaje_at timestamptz,
  asignado_a uuid references usuarios_admin(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mensajes (
  id uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references conversaciones(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete set null,
  direccion text not null check (direccion in ('entrante', 'saliente')),
  origen text not null default 'whatsapp',
  tipo text not null default 'text',
  mensaje text not null,
  whatsapp_message_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete restrict,
  conversacion_id uuid references conversaciones(id) on delete set null,
  folio text unique,
  estado text not null default 'nuevo',
  subtotal numeric(12,2) not null default 0,
  envio numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  direccion_entrega text,
  metodo_pago text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pedido_items (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  producto_id uuid not null references productos(id) on delete restrict,
  nombre_producto text not null,
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists pagos (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete set null,
  metodo text not null,
  estado text not null default 'pendiente',
  monto numeric(12,2) not null default 0,
  referencia text,
  pagado_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists envios (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete set null,
  tipo text not null default 'local',
  estado text not null default 'pendiente',
  direccion text,
  paqueteria text,
  guia text,
  enviado_at timestamptz,
  entregado_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists configuracion_bot (
  id uuid primary key default gen_random_uuid(),
  negocio_nombre text not null default 'Mini Farmacia',
  horario text,
  direccion text,
  telefonos_admin text[] not null default '{}',
  mensaje_bienvenida text,
  respuesta_sin_dato text,
  respuesta_hola text,
  respuesta_medicamento text,
  respuesta_pedido text,
  respuesta_asesor text,
  ai_enabled boolean not null default false,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clientes_telefono on clientes(telefono);
create index if not exists idx_conversaciones_cliente_id on conversaciones(cliente_id);
create index if not exists idx_conversaciones_estado on conversaciones(estado);
create index if not exists idx_mensajes_conversacion_id on mensajes(conversacion_id);
create index if not exists idx_mensajes_created_at on mensajes(created_at);
create index if not exists idx_productos_categoria_id on productos(categoria_id);
create index if not exists idx_productos_codigo_barras on productos(codigo_barras);
create index if not exists idx_inventario_producto_id on inventario(producto_id);
create index if not exists idx_pedidos_cliente_id on pedidos(cliente_id);
create index if not exists idx_pedido_items_pedido_id on pedido_items(pedido_id);
create index if not exists idx_pagos_pedido_id on pagos(pedido_id);
create index if not exists idx_envios_pedido_id on envios(pedido_id);
