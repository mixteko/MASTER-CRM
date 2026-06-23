create table if not exists clasificaciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  descripcion text,
  activo boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table productos
  add column if not exists clasificacion_id uuid references clasificaciones(id) on delete set null;

create index if not exists idx_productos_clasificacion_id on productos(clasificacion_id);

insert into clasificaciones (nombre, descripcion)
values
  ('Venta libre', 'Producto de venta libre'),
  ('Receta medica', 'Requiere receta medica'),
  ('Controlado', 'Medicamento controlado'),
  ('Refrigerado', 'Requiere cadena de frio'),
  ('Alto costo', 'Medicamento de alto costo'),
  ('Caducidad corta', 'Rotacion prioritaria por caducidad')
on conflict (nombre) do nothing;
