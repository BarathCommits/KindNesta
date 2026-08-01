import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const site = 'https://barathcommits.github.io/KindNesta';
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
    ...staticRoutes.map((path) => `${site}/${path}`),
    ...products.map((p) => `${site}/products/${p.id}/`),
    ...posts.map((p) => `${site}/blog/${p.id}/`),
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
