import { hasAnalyticsConsent } from './cookie-consent';

export type AnalyticsEvent =
  | { name: 'cta_clicked'; params: { section: string; variant?: string; destination_url: string } }
  | { name: 'scroll_depth'; params: { percent: 25 | 50 | 75 | 100; page_path: string } }
  | { name: 'faq_expanded'; params: { question_text: string; question_index: number } }
  | {
      name: 'checkout_started';
      params: { source_section: string; product_name: string; product_price: number };
    }
  | { name: 'prompt_showcase_viewed'; params: { prompt_category: string; prompt_index: number } }
  | {
      name: 'social_share_clicked';
      params: { platform: 'linkedin' | 'twitter' | 'whatsapp'; page_path: string };
    }
  | {
      name: 'purchase_confirmed';
      params: {
        page: string;
        has_bump: boolean;
        has_upsell: boolean;
        transaction_id?: string;
        value?: number;
        currency?: string;
      };
    };

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Push a typed event to the dataLayer. Silently skips if consent not given or dataLayer unavailable. */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event.params,
  });
}

/** Initialize dataLayer with page-level data. */
export function initDataLayer(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_data',
    page_path: window.location.pathname,
    page_language: 'es',
    product_name: 'Pack 275+ Prompts IA',
    product_price: 27,
    product_currency: 'EUR',
  });
}
