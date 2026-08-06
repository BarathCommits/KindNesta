/** Prefix a site path with Astro `base` (e.g. `/KindNesta/`). */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleaned = String(path).replace(/^\/+/, '');
  if (!cleaned) return base;
  return `${base}${cleaned}`;
}

/** Prefer WebP packshots (much smaller) while keeping PNG fallback. */
export function productImageSources(path = ''): { src: string; webp: string } {
  const src = withBase(path);
  return {
    src,
    webp: src.replace(/\.png(\?|#|$)/i, '.webp$1'),
  };
}
