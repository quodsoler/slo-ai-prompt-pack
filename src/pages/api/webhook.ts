export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripe } from '../../lib/stripe';
import { sendDeliveryEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  const stripe = getStripe();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      import.meta.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Webhook signature verification failed: ${message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (email) {
      try {
        const hasUpsell = session.metadata?.type === 'upsell';
        await sendDeliveryEmail({
          to: email,
          customerName: session.customer_details?.name ?? undefined,
          hasUpsell,
        });
      } catch (err) {
        console.error('Failed to send delivery email:', err);
        return new Response('Email delivery failed', { status: 500 });
      }
    }
  }

  return new Response('ok', { status: 200 });
};
