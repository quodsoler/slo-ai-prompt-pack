import { describe, it, expect, beforeEach } from 'vitest';
import { captureUTMParams, getStoredUTMParams, getCurrentUtmParams, appendUtmParams } from '../tracking';

describe('tracking', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe('captureUTMParams', () => {
    it('stores UTM params from URL in sessionStorage', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?utm_source=google&utm_medium=cpc&utm_campaign=test' },
        writable: true,
      });

      captureUTMParams();

      const stored = JSON.parse(sessionStorage.getItem('utm_params')!);
      expect(stored).toEqual({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'test',
      });
    });

    it('captures gclid param', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?gclid=abc123&utm_source=google' },
        writable: true,
      });

      captureUTMParams();

      const stored = JSON.parse(sessionStorage.getItem('utm_params')!);
      expect(stored.gclid).toBe('abc123');
      expect(stored.utm_source).toBe('google');
    });

    it('does not store anything when no UTM params in URL', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      });

      captureUTMParams();

      expect(sessionStorage.getItem('utm_params')).toBeNull();
    });

    it('ignores non-UTM params', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?foo=bar&utm_source=google' },
        writable: true,
      });

      captureUTMParams();

      const stored = JSON.parse(sessionStorage.getItem('utm_params')!);
      expect(stored).toEqual({ utm_source: 'google' });
      expect(stored.foo).toBeUndefined();
    });
  });

  describe('getStoredUTMParams', () => {
    it('returns stored UTMs from sessionStorage', () => {
      const utms = { utm_source: 'google', utm_medium: 'cpc' };
      sessionStorage.setItem('utm_params', JSON.stringify(utms));

      expect(getStoredUTMParams()).toEqual(utms);
    });

    it('returns defaults when no stored UTMs', () => {
      expect(getStoredUTMParams()).toEqual({
        utm_source: 'website',
        utm_medium: 'sales_page',
        utm_campaign: 'prompt_pack',
      });
    });
  });

  describe('getCurrentUtmParams', () => {
    it('reads UTMs directly from URL', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?utm_source=facebook&utm_content=ad1' },
        writable: true,
      });

      expect(getCurrentUtmParams()).toEqual({
        utm_source: 'facebook',
        utm_content: 'ad1',
      });
    });

    it('returns empty object when no UTMs in URL', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      });

      expect(getCurrentUtmParams()).toEqual({});
    });
  });

  describe('appendUtmParams', () => {
    it('appends UTM params to a URL', () => {
      const result = appendUtmParams('https://checkout.example.com/pack', {
        utm_source: 'google',
        utm_medium: 'cpc',
      });

      const url = new URL(result);
      expect(url.searchParams.get('utm_source')).toBe('google');
      expect(url.searchParams.get('utm_medium')).toBe('cpc');
    });

    it('preserves existing URL params', () => {
      const result = appendUtmParams('https://checkout.example.com/pack?existing=1', {
        utm_source: 'google',
      });

      const url = new URL(result);
      expect(url.searchParams.get('existing')).toBe('1');
      expect(url.searchParams.get('utm_source')).toBe('google');
    });

    it('sets params in priority order', () => {
      const result = appendUtmParams('https://checkout.example.com/pack', {
        gclid: 'abc',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'test',
        utm_content: 'ad1',
        utm_term: 'keyword',
      });

      const url = new URL(result);
      const keys = Array.from(url.searchParams.keys());
      // utm_source should come before gclid (priority order)
      expect(keys.indexOf('utm_source')).toBeLessThan(keys.indexOf('gclid'));
    });

    it('truncates low-priority params when URL exceeds 2048 chars', () => {
      // Create a URL that will be very long
      const longValue = 'a'.repeat(1900);
      const result = appendUtmParams('https://checkout.example.com/pack', {
        utm_source: longValue,
        utm_term: 'should-be-dropped',
        utm_campaign: 'should-also-be-dropped',
      });

      // utm_term should be truncated first, then utm_campaign if still over
      expect(result.length).toBeLessThanOrEqual(2048);
    });

    it('preserves gclid during truncation (highest priority)', () => {
      const longValue = 'a'.repeat(1800);
      const result = appendUtmParams('https://checkout.example.com/pack', {
        utm_source: longValue,
        utm_term: 'drop-me',
        gclid: 'keep-me',
      });

      const url = new URL(result);
      expect(url.searchParams.get('gclid')).toBe('keep-me');
    });
  });
});
