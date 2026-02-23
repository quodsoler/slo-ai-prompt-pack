import { getStoredUTMParams, appendUtmParams } from './tracking';
import { trackEvent } from './analytics';

const VARIANT_KEY = 'checkout_variant';

interface CheckoutVariant {
  url: string;
  variant: string;
}

/** Get the checkout URL and variant assignment. Uses localStorage for sticky A/B. */
export function getCheckoutVariant(): CheckoutVariant {
  const primary = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_CHECKOUT_URL;
  const variantUrl = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_CHECKOUT_URL_VARIANT;

  if (!primary) {
    console.warn('[checkout] PUBLIC_CHECKOUT_URL not configured');
    return { url: '#', variant: 'default' };
  }

  // No variant configured — everyone gets primary
  if (!variantUrl) {
    return { url: primary, variant: 'default' };
  }

  // Check for existing assignment
  try {
    const stored = localStorage.getItem(VARIANT_KEY);
    if (stored === 'A' || stored === 'B') {
      return {
        url: stored === 'A' ? primary : variantUrl,
        variant: stored === 'A' ? 'price_27' : 'price_17',
      };
    }
  } catch {
    // localStorage unavailable
  }

  // Random 50/50 assignment
  const assignment = Math.random() < 0.5 ? 'A' : 'B';
  try {
    localStorage.setItem(VARIANT_KEY, assignment);
  } catch {
    // localStorage unavailable
  }

  return {
    url: assignment === 'A' ? primary : variantUrl,
    variant: assignment === 'A' ? 'price_27' : 'price_17',
  };
}

/** Build the full checkout URL with UTM params and variant info. */
export function buildCheckoutUrl(_section: string): string {
  const { url, variant } = getCheckoutVariant();
  if (url === '#') return '#';

  const utms = getStoredUTMParams();

  // Override utm_content with variant if A/B test is active
  if (variant !== 'default') {
    utms.utm_content = variant;
  }

  return appendUtmParams(url, utms);
}

/** Debounced click handler for CTA buttons. Fires consent-gated analytics then navigates. */
let lastClickTime = 0;
export function handleCtaClick(section: string, url: string): void {
  const now = Date.now();
  if (now - lastClickTime < 500) return; // debounce 500ms
  lastClickTime = now;

  const { variant } = getCheckoutVariant();

  // Fire consent-gated analytics events via trackEvent
  trackEvent({
    name: 'cta_clicked',
    params: {
      section,
      destination_url: url,
      variant: variant !== 'default' ? variant : undefined,
    },
  });
  trackEvent({
    name: 'checkout_started',
    params: {
      source_section: section,
      product_name: 'Pack 275+ Prompts IA',
      product_price: 27,
    },
  });

  // Delay navigation to let GTM process the dataLayer events
  setTimeout(() => {
    window.location.href = url;
  }, 150);
}
