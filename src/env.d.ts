/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly STRIPE_PRICE_MAIN: string;
  readonly STRIPE_PRICE_UPSELL: string;
  readonly RESEND_API_KEY: string;
  readonly DELIVERY_NOTION_URL: string;
  readonly DELIVERY_PDF_URL: string;
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_GTM_CONTAINER_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
