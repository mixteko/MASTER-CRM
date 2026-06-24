-- Movimientos de inventario (US-011A)
-- Ejecutar en el SQL Editor de Supabase antes de usar Ajustar stock.

create table if not exists movimientos_inventario (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete restrict,
  lote_id uuid null,
  tipo_movimiento text not null,
  cantidad numeric not null default 0,
  stock_anterior numeric not null default 0,
  stock_nuevo numeric not null default 0,
  motivo text,
  referencia text,
  created_at timestamptz default now()
);

create index if not exists idx_movimientos_inventario_producto_id
  on movimientos_inventario(producto_id);

create index if not exists idx_movimientos_inventario_created_at
  on movimientos_inventario(created_at);
