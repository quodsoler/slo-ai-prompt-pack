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

/** Read persisted consent from localStorage. Returns null if no consent recorded yet. */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CURRENT_VERSION) return null;
    return { ...DEFAULT_STATE, ...parsed, necessary: true };
  } catch {
    return null;
  }
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

  // Load tracking scripts if analytics consent was granted
  if (fullState.analytics) {
    loadGTM();
    loadClarity();
  }
}

export function hasAnalyticsConsent(): boolean {
  const state = getConsentState();
  return state?.analytics ?? false;
}

export function hasMarketingConsent(): boolean {
  const state = getConsentState();
  return state?.marketing ?? false;
}

/** Dynamically inject GTM script. Only runs once. */
let gtmLoaded = false;
export function loadGTM(): void {
  if (typeof window === 'undefined' || gtmLoaded) return;

  const containerId = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_GTM_CONTAINER_ID;
  if (!containerId || containerId === 'GTM-XXXXXXX') return;

  gtmLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);
}

/** Dynamically inject Microsoft Clarity script. Only runs once. */
let clarityLoaded = false;
export function loadClarity(): void {
  if (typeof window === 'undefined' || clarityLoaded) return;

  const projectId = (import.meta as unknown as { env: Record<string, string> }).env
    .PUBLIC_CLARITY_PROJECT_ID;
  if (!projectId) return;

  clarityLoaded = true;

  /* eslint-disable */
  (window as any).clarity =
    (window as any).clarity ||
    function (...args: unknown[]) {
      ((window as any).clarity.q = (window as any).clarity.q || []).push(args);
    };
  /* eslint-enable */

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}
