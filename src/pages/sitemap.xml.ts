import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? 'https://kindnesta.com').replace(/\/$/, '');
  const products = await getCollection('products');
  const posts = await getCollection('blog');

  const staticRoutes = [
    '',
    'products/',
    'kindness-score/',
    'partners/',
    'blog/',
    'about/',
    'contact/',
  ];

  const urls = [
    ...staticRoutes.map((path) => `${origin}/${path}`),
    ...products.map((p) => `${origin}/products/${p.id}/`),
    ...posts.map((p) => `${origin}/blog/${p.id}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
