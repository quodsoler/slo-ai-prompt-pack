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

/** Read consent state from localStorage (primary) or cookie (fallback). */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ConsentState;
      // Re-prompt if version has changed
      if (parsed.version < CURRENT_VERSION) return null;
      return parsed;
    }
  } catch {
    // localStorage unavailable
  }

  // Fallback: check cookie
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (match) {
      const value = decodeURIComponent(match[1]);
      if (value === 'accepted') {
        return { ...DEFAULT_STATE, analytics: true, marketing: true, timestamp: '' };
      }
      if (value === 'rejected') {
        return DEFAULT_STATE;
      }
    }
  } catch {
    // Cookie access failed
  }

  return null;
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
  const state = getConsentState();
  return state?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  const state = getConsentState();
  return state?.marketing === true;
}

/** Dynamically inject GTM script. Only runs once. */
let gtmLoaded = false;
export function loadGTM(): void {
  if (typeof window === 'undefined' || gtmLoaded) return;

  const containerId = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_GTM_CONTAINER_ID;
  if (!containerId || containerId === 'GTM-XXXXXXX') return;

  gtmLoaded = true;

  // GTM head script
  const script = document.createElement('script');
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
  document.head.appendChild(script);
}
