/** Prefix a site path with Astro `base` (e.g. `/KindNesta/`). */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleaned = String(path).replace(/^\/+/, '');
  if (!cleaned) return base;
  return `${base}${cleaned}`;
}
