/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CHECKOUT_URL: string;
  readonly PUBLIC_CHECKOUT_URL_VARIANT?: string;
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
