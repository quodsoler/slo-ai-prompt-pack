import { describe, it, expect, beforeEach, vi } from 'vitest';
import { trackEvent, initDataLayer } from '../analytics';

// Mock cookie-consent module
vi.mock('../cookie-consent', () => ({
  hasAnalyticsConsent: vi.fn(),
}));

import { hasAnalyticsConsent } from '../cookie-consent';
const mockHasConsent = vi.mocked(hasAnalyticsConsent);

describe('analytics', () => {
  beforeEach(() => {
    window.dataLayer = [];
    vi.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('pushes event to dataLayer when consent is granted', () => {
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'cta_clicked',
        params: { section: 'hero', destination_url: 'https://example.com' },
      });

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'cta_clicked',
        section: 'hero',
        destination_url: 'https://example.com',
      });
    });

    it('does not push to dataLayer when consent is not granted', () => {
      mockHasConsent.mockReturnValue(false);

      trackEvent({
        name: 'cta_clicked',
        params: { section: 'hero', destination_url: 'https://example.com' },
      });

      expect(window.dataLayer).toHaveLength(0);
    });

    it('handles scroll_depth event correctly', () => {
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'scroll_depth',
        params: { percent: 50, page_path: '/' },
      });

      expect(window.dataLayer[0]).toEqual({
        event: 'scroll_depth',
        percent: 50,
        page_path: '/',
      });
    });

    it('handles faq_expanded event correctly', () => {
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'faq_expanded',
        params: { question_text: 'Test question?', question_index: 2 },
      });

      expect(window.dataLayer[0]).toEqual({
        event: 'faq_expanded',
        question_text: 'Test question?',
        question_index: 2,
      });
    });

    it('handles purchase event correctly', () => {
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'purchase',
        params: {
          transaction_id: 'cs_test_123',
          value: 27,
          currency: 'EUR',
          items: [{ item_id: 'pack-275-prompts', item_name: 'Pack 275+ Prompts IA', price: 27, quantity: 1 }],
        },
      });

      expect(window.dataLayer[0]).toEqual({
        event: 'purchase',
        transaction_id: 'cs_test_123',
        value: 27,
        currency: 'EUR',
        items: [{ item_id: 'pack-275-prompts', item_name: 'Pack 275+ Prompts IA', price: 27, quantity: 1 }],
      });
    });

    it('handles share event correctly', () => {
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'share',
        params: { method: 'linkedin', content_type: 'page', item_id: '/gracias' },
      });

      expect(window.dataLayer[0]).toEqual({
        event: 'share',
        method: 'linkedin',
        content_type: 'page',
        item_id: '/gracias',
      });
    });

    it('initializes dataLayer array if not present', () => {
      // @ts-expect-error -- testing undefined dataLayer
      delete window.dataLayer;
      mockHasConsent.mockReturnValue(true);

      trackEvent({
        name: 'cta_clicked',
        params: { section: 'hero', destination_url: 'https://example.com' },
      });

      expect(window.dataLayer).toHaveLength(1);
    });
  });

  describe('initDataLayer', () => {
    it('pushes page_data event with product info', () => {
      Object.defineProperty(window, 'location', {
        value: { pathname: '/' },
        writable: true,
      });

      initDataLayer();

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'page_data',
        page_path: '/',
        page_language: 'es',
        product_name: 'Pack 275+ Prompts IA',
        product_price: 27,
        product_currency: 'EUR',
      });
    });
  });
});
