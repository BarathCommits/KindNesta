// @ts-check
import { defineConfig } from 'astro/config';

// Project site on GitHub Pages: https://barathcommits.github.io/KindNesta/
// When you attach a custom domain later, remove `base` and set `site` to that domain.
export default defineConfig({
  site: 'https://barathcommits.github.io',
  base: '/KindNesta',
  output: 'static',
  trailingSlash: 'always',
});
