const STORAGE_KEY = 'cookie_consent';
const COOKIE_NAME = 'cookie_consent';
const CURRENT_VERSION = 1;

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '',
  version: CURRENT_VERSION,
};

/** Consent is always granted — no banner needed. */
export function getConsentState(): ConsentState {
  return {
    ...DEFAULT_STATE,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString(),
  };
}

/** Persist consent state to localStorage and first-party cookie. */
export function setConsentState(state: Partial<ConsentState>): void {
  if (typeof window === 'undefined') return;

  const fullState: ConsentState = {
    ...DEFAULT_STATE,
    ...state,
    necessary: true, // always on
    timestamp: new Date().toISOString(),
    version: CURRENT_VERSION,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullState));
  } catch {
    // localStorage unavailable
  }

  // Set first-party cookie (1 year)
  const cookieValue =
    fullState.analytics && fullState.marketing
      ? 'accepted'
      : !fullState.analytics && !fullState.marketing
        ? 'rejected'
        : 'custom';

  try {
    document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Cookie setting failed
  }

  // Load GTM if analytics consent was granted
  if (fullState.analytics) {
    loadGTM();
  }
}

export function hasAnalyticsConsent(): boolean {
  return true;
}

export function hasMarketingConsent(): boolean {
  return true;
}

/** Dynamically inject GTM script. Only runs once. */
let gtmLoaded = false;
export function loadGTM(): void {
  if (typeof window === 'undefined' || gtmLoaded) return;

  const containerId = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_GTM_CONTAINER_ID;
  if (!containerId || containerId === 'GTM-XXXXXXX') return;

  gtmLoaded = true;

  // Push cross-domain linker configuration before GTM initializes.
  // GTM's GA4 Configuration tag should also have systeme.io in its cross-domain settings.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  // GTM head script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);
}
