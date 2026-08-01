// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain on GitHub Pages — site is served at domain root (not /KindNesta).
// Live URL: https://kindnesta.com/
export default defineConfig({
  site: 'https://kindnesta.com',
  base: '/',
  outDir: './docs',
  output: 'static',
  trailingSlash: 'always',
});
