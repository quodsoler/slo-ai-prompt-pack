import { describe, it, expect, beforeEach } from 'vitest';
import { getConsentState, setConsentState, hasAnalyticsConsent, hasMarketingConsent } from '../cookie-consent';

describe('cookie-consent', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie.split(';').forEach((c) => {
      const name = c.trim().split('=')[0];
      if (name) document.cookie = `${name}=; max-age=0; path=/`;
    });
  });

  describe('getConsentState', () => {
    it('returns null when no consent recorded', () => {
      const state = getConsentState();
      expect(state).toBeNull();
    });

    it('returns stored consent after setConsentState', () => {
      setConsentState({ analytics: true, marketing: false });

      const state = getConsentState();
      expect(state).not.toBeNull();
      expect(state!.analytics).toBe(true);
      expect(state!.marketing).toBe(false);
      expect(state!.necessary).toBe(true);
    });
  });

  describe('setConsentState', () => {
    it('saves full consent to localStorage', () => {
      setConsentState({ analytics: true, marketing: true });

      const stored = JSON.parse(localStorage.getItem('cookie_consent')!);
      expect(stored.analytics).toBe(true);
      expect(stored.marketing).toBe(true);
      expect(stored.necessary).toBe(true);
      expect(stored.version).toBe(1);
      expect(stored.timestamp).toBeTruthy();
    });

    it('sets "accepted" cookie when both analytics and marketing are true', () => {
      setConsentState({ analytics: true, marketing: true });

      expect(document.cookie).toContain('cookie_consent=accepted');
    });

    it('always forces necessary to true', () => {
      setConsentState({ necessary: false, analytics: false, marketing: false });

      const stored = JSON.parse(localStorage.getItem('cookie_consent')!);
      expect(stored.necessary).toBe(true);
    });
  });

  describe('hasAnalyticsConsent', () => {
    it('returns false when no consent recorded', () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns true after granting analytics consent', () => {
      setConsentState({ analytics: true, marketing: false });
      expect(hasAnalyticsConsent()).toBe(true);
    });
  });

  describe('hasMarketingConsent', () => {
    it('returns false when no consent recorded', () => {
      expect(hasMarketingConsent()).toBe(false);
    });

    it('returns true after granting marketing consent', () => {
      setConsentState({ analytics: false, marketing: true });
      expect(hasMarketingConsent()).toBe(true);
    });
  });
});
