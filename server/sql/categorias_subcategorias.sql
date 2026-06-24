-- Categorías: subcategorías y visibilidad en tienda (US-Categorías Tiendanube)
-- Ejecutar en el SQL Editor de Supabase antes de usar subcategorías y ocultar en tienda.

alter table categorias
  add column if not exists parent_id uuid references categorias(id) on delete set null;

alter table categorias
  add column if not exists visible_en_tienda boolean not null default true;

create index if not exists idx_categorias_parent_id on categorias(parent_id);
