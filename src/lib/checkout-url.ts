import { getStoredUTMParams } from './tracking';
import { trackEvent } from './analytics';

/** POST to local API to create a Stripe Checkout Session. Returns the checkout URL or null on error. */
export async function initiateCheckout(section: string): Promise<string | null> {
  const utmParams = getStoredUTMParams();

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utmParams, section }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}

/** Debounced CTA click handler. Fires analytics, creates checkout session, redirects. */
let lastClickTime = 0;
export async function handleCtaClick(section: string): Promise<void> {
  const now = Date.now();
  if (now - lastClickTime < 500) return;
  lastClickTime = now;

  trackEvent({
    name: 'cta_clicked',
    params: {
      section,
      destination_url: '/api/checkout',
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

  const url = await initiateCheckout(section);
  if (url) {
    window.location.href = url;
  } else {
    alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
  }
}
