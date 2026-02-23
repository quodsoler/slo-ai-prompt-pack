import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
  output: 'static',
  trailingSlash: 'never',

  integrations: [
    preact(),
    sitemap({
      filter: (page) => !page.includes('/gracias'),
    }),
  ],

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
