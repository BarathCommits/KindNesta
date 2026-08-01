// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site output committed as plain static files in `docs/`.
// Site URL: https://barathcommits.github.io/KindNesta/
export default defineConfig({
  site: 'https://barathcommits.github.io',
  base: '/KindNesta',
  outDir: './docs',
  output: 'static',
  trailingSlash: 'always',
});
