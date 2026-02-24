import { defineConfig } from 'astro/config';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

/** Read an env var from process.env or .env file. */
function getEnvVar(name) {
  if (process.env[name]) return process.env[name];
  const envPath = join(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8');
    const match = content.match(new RegExp(`^${name}=(.*)$`, 'm'));
    if (match) return match[1].trim();
  }
  return '';
}

/** Validates required environment variables during build. */
const envValidation = {
  name: 'env-validation',
  hooks: {
    'astro:build:start': () => {
      if (!getEnvVar('STRIPE_SECRET_KEY')) {
        throw new Error(
          'BUILD ERROR: STRIPE_SECRET_KEY environment variable is required.\n' +
          'Set it in .env or your deployment environment.\n' +
          'See .env.example for reference.'
        );
      }
    },
  },
};

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://promptsparatunegocio.com',
  output: 'static',
  trailingSlash: 'never',

  integrations: [
    preact(),
    sitemap({
      filter: (page) => !page.includes('/gracias'),
    }),
    envValidation,
  ],

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
