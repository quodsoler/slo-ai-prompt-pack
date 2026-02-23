import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('stripe', () => {
  return {
    default: class MockStripe {
      checkout = { sessions: { create: vi.fn(), retrieve: vi.fn() } };
    },
  };
});

describe('stripe', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('creates a Stripe instance when STRIPE_SECRET_KEY is set', async () => {
    Object.assign(import.meta.env, { STRIPE_SECRET_KEY: 'sk_test_123' });
    const { getStripe } = await import('../stripe');

    const stripe = getStripe();
    expect(stripe).toBeDefined();
    expect(stripe.checkout).toBeDefined();
  });

  it('returns the same singleton on repeated calls', async () => {
    Object.assign(import.meta.env, { STRIPE_SECRET_KEY: 'sk_test_123' });
    const { getStripe } = await import('../stripe');

    const a = getStripe();
    const b = getStripe();
    expect(a).toBe(b);
  });

  it('throws when STRIPE_SECRET_KEY is not set', async () => {
    Object.assign(import.meta.env, { STRIPE_SECRET_KEY: '' });
    const { getStripe } = await import('../stripe');

    expect(() => getStripe()).toThrow('STRIPE_SECRET_KEY is not configured');
  });
});
