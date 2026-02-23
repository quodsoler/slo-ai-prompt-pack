// Populate import.meta.env with test values for Astro-style env access
Object.assign(import.meta.env, {
  PUBLIC_CHECKOUT_URL: 'https://checkout.example.com/pack',
  PUBLIC_CHECKOUT_URL_VARIANT: 'https://checkout.example.com/pack-variant',
  PUBLIC_GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  PUBLIC_GTM_CONTAINER_ID: 'GTM-TEST123',
  PUBLIC_SITE_URL: 'https://example.com',
});
