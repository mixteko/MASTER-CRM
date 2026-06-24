-- Migración opcional: perfil completo de clientes para MASTER CRM
-- NO aplicar automáticamente. Ejecutar manualmente en Supabase cuando se conecte el módulo Clientes al backend.
-- Compatible con tabla existente `clientes` definida en server/sql/schema.sql

alter table if exists clientes
  add column if not exists calle text,
  add column if not exists numero_exterior text,
  add column if not exists direccion_adicional text,
  add column if not exists codigo_postal text,
  add column if not exists colonia text,
  add column if not exists ciudad text,
  add column if not exists estado_region text,
  add column if not exists pais text default 'México',
  add column if not exists tipo_cliente text default 'General',
  add column if not exists descuento_pct numeric(5,2) default 0,
  add column if not exists limite_credito numeric(12,2),
  add column if not exists rfc text,
  add column if not exists notas_internas text,
  add column if not exists alergias text,
  add column if not exists preferencia_contacto text default 'WhatsApp',
  add column if not exists activo boolean not null default true;

comment on column clientes.calle is 'Calle de envío';
comment on column clientes.numero_exterior is 'Número exterior';
comment on column clientes.direccion_adicional is 'Interior, entre calles, referencias';
comment on column clientes.codigo_postal is 'Código postal';
comment on column clientes.colonia is 'Colonia o barrio';
comment on column clientes.ciudad is 'Ciudad';
comment on column clientes.estado_region is 'Estado o región';
comment on column clientes.pais is 'País, default México';
comment on column clientes.tipo_cliente is 'General, Frecuente, Mayorista, Médico / clínica, Convenio';
comment on column clientes.descuento_pct is 'Descuento asignado en porcentaje';
comment on column clientes.limite_credito is 'Límite de crédito opcional';
comment on column clientes.rfc is 'RFC opcional';
comment on column clientes.notas_internas is 'Observaciones internas CRM';
comment on column clientes.alergias is 'Alergias o restricciones farmacéuticas';
comment on column clientes.preferencia_contacto is 'WhatsApp, Teléfono o Correo';
comment on column clientes.activo is 'Soft-delete / desactivación de cliente';

create index if not exists idx_clientes_activo on clientes(activo);
create index if not exists idx_clientes_tipo_cliente on clientes(tipo_cliente);
create index if not exists idx_clientes_email on clientes(email);

-- Mapeo frontend localStorage -> Supabase (referencia):
-- name              -> nombre
-- phone             -> telefono
-- email             -> email
-- address (legacy)  -> direccion
-- street            -> calle
-- streetNumber      -> numero_exterior
-- addressLine2      -> direccion_adicional
-- postalCode        -> codigo_postal
-- neighborhood      -> colonia
-- city              -> ciudad
-- state             -> estado_region
-- country           -> pais
-- customerType      -> tipo_cliente
-- discountPercent   -> descuento_pct
-- creditLimit       -> limite_credito
-- rfc               -> rfc
-- internalNotes     -> notas_internas
-- allergies         -> alergias
-- contactPreference -> preferencia_contacto
-- active            -> activo
