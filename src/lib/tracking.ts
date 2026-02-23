const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;
const STORAGE_KEY = 'utm_params';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
}

const DEFAULT_UTMS: UtmParams = {
  utm_source: 'website',
  utm_medium: 'sales_page',
  utm_campaign: 'prompt_pack',
};

/** Capture UTM params from current URL and persist in sessionStorage. */
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utms: UtmParams = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utms[key] = val;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
    }
  }
}

/** Retrieve stored UTM params, falling back to defaults if none captured. */
export function getStoredUTMParams(): UtmParams {
  if (typeof window === 'undefined') return DEFAULT_UTMS;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UtmParams;
    }
  } catch {
    // sessionStorage unavailable
  }
  return DEFAULT_UTMS;
}

/** Get UTM params from current URL (live, not stored). */
export function getCurrentUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utms: UtmParams = {};

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utms[key] = val;
    }
  }
  return utms;
}

/** Append UTM params to a base URL, respecting a 2048 char limit. */
export function appendUtmParams(baseUrl: string, params: UtmParams): string {
  const url = new URL(baseUrl);

  // Priority order for truncation (lowest priority first)
  const priorityOrder: (keyof UtmParams)[] = [
    'gclid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ];

  for (const key of priorityOrder) {
    const val = params[key];
    if (val) {
      url.searchParams.set(key, val);
    }
  }

  // Truncate low-priority params if URL exceeds 2048 chars
  const truncationOrder: (keyof UtmParams)[] = ['utm_term', 'utm_content', 'utm_campaign'];
  for (const key of truncationOrder) {
    if (url.toString().length <= 2048) break;
    url.searchParams.delete(key);
  }

  return url.toString();
}
