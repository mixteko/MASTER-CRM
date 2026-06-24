-- Categorías: subcategorías y visibilidad en tienda
-- Ejecutar en el SQL Editor de Supabase antes de usar subcategorías y ocultar en tienda.
-- Seguro para re-ejecutar: usa IF NOT EXISTS.

alter table categorias
  add column if not exists parent_id uuid null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'categorias_parent_id_fkey'
  ) then
    alter table categorias
      add constraint categorias_parent_id_fkey
      foreign key (parent_id) references categorias(id) on delete set null;
  end if;
end $$;

alter table categorias
  add column if not exists visible_en_tienda boolean not null default true;

create index if not exists idx_categorias_parent_id on categorias(parent_id);

create index if not exists idx_categorias_parent_active
  on categorias(parent_id, activo)
  where parent_id is not null;
