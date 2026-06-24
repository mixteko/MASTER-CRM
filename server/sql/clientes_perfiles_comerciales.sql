-- Catálogo de perfiles comerciales para MASTER CRM
-- NO aplicar automáticamente. Ejecutar manualmente cuando se conecte el módulo Clientes a Supabase.

create table if not exists perfiles_comerciales (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  compra_minima numeric(12,2) not null default 0,
  piezas_minimas integer not null default 0,
  descuento_sugerido_pct numeric(5,2) not null default 0,
  credito_permitido boolean not null default false,
  limite_credito_sugerido numeric(12,2),
  notas text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table perfiles_comerciales is 'Catálogo editable de perfiles comerciales (General, Mayorista, etc.)';

-- Opcional: vincular clientes al catálogo por nombre o id
alter table if exists clientes
  add column if not exists perfil_comercial_id uuid references perfiles_comerciales(id) on delete set null,
  add column if not exists perfil_comercial_nombre text;

create index if not exists idx_perfiles_comerciales_activo on perfiles_comerciales(activo);
create index if not exists idx_clientes_perfil_comercial_id on clientes(perfil_comercial_id);

-- Mapeo localStorage frontend -> Supabase:
-- commercialProfiles[].name              -> nombre
-- commercialProfiles[].minPurchase       -> compra_minima
-- commercialProfiles[].minPieces         -> piezas_minimas
-- commercialProfiles[].suggestedDiscount -> descuento_sugerido_pct
-- commercialProfiles[].creditAllowed     -> credito_permitido
-- commercialProfiles[].suggestedCreditLimit -> limite_credito_sugerido
-- commercialProfiles[].notes             -> notas
-- customer.customerType                  -> perfil_comercial_nombre (texto libre si perfil eliminado)
