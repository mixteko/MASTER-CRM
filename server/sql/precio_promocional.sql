-- US-010A: precio lista vs precio promocional
-- Ejecutar en Supabase si se requiere persistir precio promocional separado.

alter table productos
  add column if not exists precio_promocional numeric default null;
