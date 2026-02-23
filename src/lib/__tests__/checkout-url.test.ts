import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../tracking', () => ({
  getStoredUTMParams: vi.fn(),
}));

vi.mock('../analytics', () => ({
  trackEvent: vi.fn(),
}));

import { initiateCheckout, handleCtaClick } from '../checkout-url';
import { getStoredUTMParams } from '../tracking';
import { trackEvent } from '../analytics';

const mockGetStoredUTMs = vi.mocked(getStoredUTMParams);
const mockTrackEvent = vi.mocked(trackEvent);

describe('checkout-url', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetStoredUTMs.mockReturnValue({
      utm_source: 'website',
      utm_medium: 'sales_page',
      utm_campaign: 'prompt_pack',
    });

    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('initiateCheckout', () => {
    it('returns URL on successful API response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: 'https://checkout.stripe.com/session123' }),
      } as Response);

      const url = await initiateCheckout('hero');

      expect(url).toBe('https://checkout.stripe.com/session123');
      expect(fetch).toHaveBeenCalledWith('/api/checkout', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }));
    });

    it('returns null on API error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      } as Response);

      const url = await initiateCheckout('hero');
      expect(url).toBeNull();
    });

    it('returns null on network failure', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      const url = await initiateCheckout('hero');
      expect(url).toBeNull();
    });

    it('passes UTM params in request body', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: 'https://checkout.stripe.com/test' }),
      } as Response);

      await initiateCheckout('price_offer');

      const call = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      expect(body.utmParams).toEqual({
        utm_source: 'website',
        utm_medium: 'sales_page',
        utm_campaign: 'prompt_pack',
      });
      expect(body.section).toBe('price_offer');
    });
  });

  describe('handleCtaClick', () => {
    let testEpoch = 1700000000000;

    beforeEach(() => {
      testEpoch += 60000;
      vi.useFakeTimers({ now: testEpoch });

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ url: 'https://checkout.stripe.com/test' }),
      } as Response);

      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
        configurable: true,
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('fires cta_clicked and checkout_started analytics events', async () => {
      await handleCtaClick('hero');

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'cta_clicked' })
      );
      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'checkout_started' })
      );
    });

    it('debounces rapid clicks within 500ms', async () => {
      const p1 = handleCtaClick('hero');
      const p2 = handleCtaClick('hero');
      const p3 = handleCtaClick('hero');
      await Promise.all([p1, p2, p3]);

      expect(mockTrackEvent).toHaveBeenCalledTimes(2);
    });

    it('allows clicks after debounce window expires', async () => {
      await handleCtaClick('hero');
      expect(mockTrackEvent).toHaveBeenCalledTimes(2);

      vi.advanceTimersByTime(501);
      await handleCtaClick('hero');
      expect(mockTrackEvent).toHaveBeenCalledTimes(4);
    });

    it('redirects to Stripe URL on success', async () => {
      const hrefSetter = vi.fn();
      Object.defineProperty(window.location, 'href', {
        set: hrefSetter,
        get: () => '',
        configurable: true,
      });

      await handleCtaClick('hero');

      expect(hrefSetter).toHaveBeenCalledWith('https://checkout.stripe.com/test');
    });

    it('shows alert on API error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'fail' }),
      } as Response);

      window.alert = vi.fn();
      const alertSpy = vi.mocked(window.alert);
      await handleCtaClick('hero');

      expect(alertSpy).toHaveBeenCalledWith(
        'Error al procesar el pago. Por favor, inténtalo de nuevo.'
      );
    });

    it('includes section in cta_clicked event params', async () => {
      await handleCtaClick('price_offer');

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'cta_clicked',
          params: expect.objectContaining({ section: 'price_offer' }),
        })
      );
    });

    it('includes product info in checkout_started event', async () => {
      await handleCtaClick('hero');

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'checkout_started',
          params: expect.objectContaining({
            product_name: 'Pack 275+ Prompts IA',
            product_price: 27,
          }),
        })
      );
    });
  });
});
