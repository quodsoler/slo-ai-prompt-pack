export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripe } from '../../lib/stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const utmParams = body.utmParams ?? {};
    const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://promptsparatunegocio.com';

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'es',
      line_items: [{ price: import.meta.env.STRIPE_PRICE_MAIN, quantity: 1 }],
      success_url: `${siteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#oferta`,
      metadata: {
        utm_source: utmParams.utm_source || '',
        utm_medium: utmParams.utm_medium || '',
        utm_campaign: utmParams.utm_campaign || '',
        utm_content: utmParams.utm_content || '',
        utm_term: utmParams.utm_term || '',
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[api/checkout] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
