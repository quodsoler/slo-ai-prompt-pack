import { describe, it, expect, beforeEach } from 'vitest';
import { getConsentState, setConsentState, hasAnalyticsConsent, hasMarketingConsent } from '../cookie-consent';

describe('cookie-consent', () => {
  beforeEach(() => {
    localStorage.clear();
    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      const name = c.trim().split('=')[0];
      if (name) document.cookie = `${name}=; max-age=0; path=/`;
    });
  });

  describe('getConsentState', () => {
    it('returns null when no consent has been set', () => {
      expect(getConsentState()).toBeNull();
    });

    it('reads consent from localStorage', () => {
      const state = {
        necessary: true,
        analytics: true,
        marketing: false,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: 1,
      };
      localStorage.setItem('cookie_consent', JSON.stringify(state));

      expect(getConsentState()).toEqual(state);
    });

    it('returns null for outdated consent version', () => {
      const state = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: '2024-01-01T00:00:00.000Z',
        version: 0, // older than CURRENT_VERSION (1)
      };
      localStorage.setItem('cookie_consent', JSON.stringify(state));

      expect(getConsentState()).toBeNull();
    });

    it('falls back to cookie when localStorage is empty', () => {
      document.cookie = 'cookie_consent=accepted; path=/';

      const result = getConsentState();
      expect(result?.analytics).toBe(true);
      expect(result?.marketing).toBe(true);
    });

    it('handles "rejected" cookie fallback', () => {
      document.cookie = 'cookie_consent=rejected; path=/';

      const result = getConsentState();
      expect(result?.analytics).toBe(false);
      expect(result?.marketing).toBe(false);
    });

    it('handles "custom" cookie fallback with analytics-only default', () => {
      document.cookie = 'cookie_consent=custom; path=/';

      const result = getConsentState();
      expect(result?.analytics).toBe(true);
      expect(result?.marketing).toBe(false);
    });
  });

  describe('setConsentState', () => {
    it('saves full consent to localStorage', () => {
      setConsentState({ analytics: true, marketing: true });

      const stored = JSON.parse(localStorage.getItem('cookie_consent')!);
      expect(stored.analytics).toBe(true);
      expect(stored.marketing).toBe(true);
      expect(stored.necessary).toBe(true); // always true
      expect(stored.version).toBe(1);
      expect(stored.timestamp).toBeTruthy();
    });

    it('sets "accepted" cookie when both analytics and marketing are true', () => {
      setConsentState({ analytics: true, marketing: true });

      expect(document.cookie).toContain('cookie_consent=accepted');
    });

    it('sets "rejected" cookie when both are false', () => {
      setConsentState({ analytics: false, marketing: false });

      expect(document.cookie).toContain('cookie_consent=rejected');
    });

    it('sets "custom" cookie for mixed preferences', () => {
      setConsentState({ analytics: true, marketing: false });

      expect(document.cookie).toContain('cookie_consent=custom');
    });

    it('always forces necessary to true', () => {
      setConsentState({ necessary: false, analytics: false, marketing: false });

      const stored = JSON.parse(localStorage.getItem('cookie_consent')!);
      expect(stored.necessary).toBe(true);
    });
  });

  describe('hasAnalyticsConsent', () => {
    it('returns true when analytics consent is granted', () => {
      setConsentState({ analytics: true, marketing: false });
      expect(hasAnalyticsConsent()).toBe(true);
    });

    it('returns false when no consent state exists', () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns false when analytics consent is denied', () => {
      setConsentState({ analytics: false, marketing: false });
      expect(hasAnalyticsConsent()).toBe(false);
    });
  });

  describe('hasMarketingConsent', () => {
    it('returns true when marketing consent is granted', () => {
      setConsentState({ analytics: true, marketing: true });
      expect(hasMarketingConsent()).toBe(true);
    });

    it('returns false when marketing consent is denied', () => {
      setConsentState({ analytics: true, marketing: false });
      expect(hasMarketingConsent()).toBe(false);
    });
  });
});
