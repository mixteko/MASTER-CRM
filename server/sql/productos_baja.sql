alter table productos
  add column if not exists eliminado boolean default false,
  add column if not exists eliminado_at timestamptz default null;
