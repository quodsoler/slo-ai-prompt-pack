export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripe } from '../../lib/stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const originalSessionId = body.sessionId;
    const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://example.com';

    const stripe = getStripe();

    // Pre-fill customer email from the original session
    let customerEmail: string | undefined;
    if (originalSessionId) {
      const originalSession = await stripe.checkout.sessions.retrieve(originalSessionId);
      customerEmail = originalSession.customer_details?.email ?? undefined;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'es',
      line_items: [{ price: import.meta.env.STRIPE_PRICE_UPSELL, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${siteUrl}/gracias?session_id=${originalSessionId}&upsell=1`,
      cancel_url: `${siteUrl}/gracias?session_id=${originalSessionId}`,
      metadata: {
        original_session_id: originalSessionId || '',
        type: 'upsell',
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
