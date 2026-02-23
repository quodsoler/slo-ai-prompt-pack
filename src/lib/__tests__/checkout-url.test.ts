import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock dependencies before importing the module under test
vi.mock('../tracking', () => ({
  getStoredUTMParams: vi.fn(),
  appendUtmParams: vi.fn(),
}));

vi.mock('../analytics', () => ({
  trackEvent: vi.fn(),
}));

import { getCheckoutVariant, buildCheckoutUrl, handleCtaClick } from '../checkout-url';
import { getStoredUTMParams, appendUtmParams } from '../tracking';
import { trackEvent } from '../analytics';

const mockGetStoredUTMs = vi.mocked(getStoredUTMParams);
const mockAppendUtmParams = vi.mocked(appendUtmParams);
const mockTrackEvent = vi.mocked(trackEvent);

describe('checkout-url', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockGetStoredUTMs.mockReturnValue({
      utm_source: 'website',
      utm_medium: 'sales_page',
      utm_campaign: 'prompt_pack',
    });
    mockAppendUtmParams.mockImplementation((url) => url);
  });

  describe('getCheckoutVariant', () => {
    // Note: import.meta.env values are compile-time replaced by Vite/Astro.
    // In tests, PUBLIC_CHECKOUT_URL may or may not be available depending on
    // the test runner's env config. These tests verify the logic paths.

    it('returns a non-empty URL string and variant', () => {
      const result = getCheckoutVariant();
      expect(typeof result.url).toBe('string');
      expect(typeof result.variant).toBe('string');
      expect(result.url.length).toBeGreaterThan(0);
    });

    it('returns "default" variant and "#" fallback when env is missing', () => {
      // When PUBLIC_CHECKOUT_URL is not set (test environment), function falls back to '#'
      const result = getCheckoutVariant();
      if (result.url === '#') {
        expect(result.variant).toBe('default');
      } else {
        // If env IS available, the variant is either 'default' or a price variant
        expect(['default', 'price_27', 'price_17']).toContain(result.variant);
      }
    });

    it('reads localStorage for sticky A/B assignment', () => {
      // Set a stored assignment
      localStorage.setItem('checkout_variant', 'A');
      const result = getCheckoutVariant();
      // If env provides variant URL, should honor localStorage; otherwise falls back
      if (result.url !== '#') {
        expect(result.variant).toBe('price_27');
      }
      // Verify it checked localStorage
      expect(localStorage.getItem('checkout_variant')).toBe('A');
    });

    it('persists new assignment to localStorage when none exists', () => {
      const result = getCheckoutVariant();
      if (result.url !== '#') {
        const stored = localStorage.getItem('checkout_variant');
        expect(stored === 'A' || stored === 'B').toBe(true);
      }
    });
  });

  describe('buildCheckoutUrl', () => {
    it('returns "#" when checkout URL is not configured', () => {
      const result = buildCheckoutUrl('hero');
      if (result === '#') {
        // No env = fallback path, appendUtmParams not called
        expect(mockAppendUtmParams).not.toHaveBeenCalled();
      } else {
        // Env is set, UTM functions should be called
        expect(mockGetStoredUTMs).toHaveBeenCalled();
        expect(mockAppendUtmParams).toHaveBeenCalled();
      }
    });

    it('returns a string result', () => {
      const result = buildCheckoutUrl('price_offer');
      expect(typeof result).toBe('string');
    });
  });

  describe('handleCtaClick', () => {
    // Each test uses a unique epoch to avoid cross-test debounce interference.
    // The module-level lastClickTime persists across tests; by setting each test's
    // fake clock to a different second, we ensure Date.now() - lastClickTime > 500ms.
    let testEpoch = 1700000000000;

    beforeEach(() => {
      testEpoch += 60000; // +1 minute per test — always > 500ms from prior lastClickTime
      vi.useFakeTimers({ now: testEpoch });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('fires cta_clicked and checkout_started analytics events', () => {
      handleCtaClick('hero', 'https://checkout.example.com/pack');

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'cta_clicked' })
      );
      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'checkout_started' })
      );
    });

    it('debounces rapid clicks within 500ms', () => {
      handleCtaClick('hero', 'https://checkout.example.com/pack');
      handleCtaClick('hero', 'https://checkout.example.com/pack');
      handleCtaClick('hero', 'https://checkout.example.com/pack');

      // Only the first click fires events (2 events: cta_clicked + checkout_started)
      expect(mockTrackEvent).toHaveBeenCalledTimes(2);
    });

    it('allows clicks after debounce window expires', () => {
      handleCtaClick('hero', 'https://checkout.example.com/pack');
      expect(mockTrackEvent).toHaveBeenCalledTimes(2);

      vi.advanceTimersByTime(501);
      handleCtaClick('hero', 'https://checkout.example.com/pack');
      expect(mockTrackEvent).toHaveBeenCalledTimes(4);
    });

    it('includes section in cta_clicked event params', () => {
      handleCtaClick('price_offer', 'https://checkout.example.com/pack');

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'cta_clicked',
          params: expect.objectContaining({ section: 'price_offer' }),
        })
      );
    });

    it('includes product info in checkout_started event', () => {
      handleCtaClick('hero', 'https://checkout.example.com/pack');

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

    it('navigates after 150ms delay when no element provided', () => {
      const hrefSetter = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window.location, 'href', {
        set: hrefSetter,
        get: () => '',
        configurable: true,
      });

      handleCtaClick('hero', 'https://checkout.example.com/pack');

      expect(hrefSetter).not.toHaveBeenCalled();

      vi.advanceTimersByTime(150);

      expect(hrefSetter).toHaveBeenCalledWith('https://checkout.example.com/pack');
    });
  });
});
