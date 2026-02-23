import { useState, useEffect, useRef } from 'preact/hooks';
import { getConsentState, setConsentState, loadGTM } from '../../lib/cookie-consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = getConsentState();
    if (!consent) {
      setIsVisible(true);
    } else if (consent.analytics) {
      // Returning user with analytics consent: load GTM immediately
      loadGTM();
    }

    // Re-open listener for footer link
    const btn = document.getElementById('reopen-cookie-consent');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = getConsentState();
        setAnalytics(current?.analytics ?? false);
        setMarketing(current?.marketing ?? false);
        setShowCustomize(true);
        setIsVisible(true);
      });
    }
  }, []);

  // Focus the dialog when it becomes visible
  useEffect(() => {
    if (isVisible && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isVisible]);

  function acceptAll() {
    setConsentState({ analytics: true, marketing: true });
    setIsVisible(false);
  }

  function rejectAll() {
    setConsentState({ analytics: false, marketing: false });
    setIsVisible(false);
  }

  function saveCustom() {
    setConsentState({ analytics, marketing });
    setIsVisible(false);
    setShowCustomize(false);
  }

  if (!isVisible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Configuración de cookies"
      tabIndex={-1}
      class="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 bg-surface border-t border-card-border/40 shadow-2xl max-h-[40vh] overflow-y-auto"
    >
      <div class="max-w-3xl mx-auto">
        <p class="text-text-secondary text-sm mb-4">
          Usamos cookies para analizar el tráfico y mejorar tu experiencia. Puedes aceptar todas las cookies o solo las necesarias.{' '}
          <a href="/politica-privacidad" class="text-accent underline">
            Más información
          </a>
        </p>

        {showCustomize ? (
          <div class="mb-4 space-y-3">
            <div class="flex items-center justify-between py-2">
              <div>
                <p class="text-text-primary text-sm font-medium">Necesarias</p>
                <p class="text-text-muted text-xs">Esenciales para el funcionamiento del sitio</p>
              </div>
              <span class="text-text-muted text-xs">Siempre activas</span>
            </div>
            <div class="flex items-center justify-between py-2">
              <div>
                <p class="text-text-primary text-sm font-medium">Analíticas</p>
                <p class="text-text-muted text-xs">Nos ayudan a mejorar el sitio</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                class={`w-10 h-6 rounded-full transition-colors cursor-pointer ${analytics ? 'bg-primary' : 'bg-card-border'}`}
                onClick={() => setAnalytics(!analytics)}
                aria-label="Cookies analíticas"
              >
                <span
                  class={`block w-4 h-4 rounded-full bg-white transition-transform ${analytics ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <div class="flex items-center justify-between py-2">
              <div>
                <p class="text-text-primary text-sm font-medium">Marketing</p>
                <p class="text-text-muted text-xs">Publicidad personalizada</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={marketing}
                class={`w-10 h-6 rounded-full transition-colors cursor-pointer ${marketing ? 'bg-primary' : 'bg-card-border'}`}
                onClick={() => setMarketing(!marketing)}
                aria-label="Cookies de marketing"
              >
                <span
                  class={`block w-4 h-4 rounded-full bg-white transition-transform ${marketing ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <button
              type="button"
              class="w-full py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
              onClick={saveCustom}
            >
              Guardar preferencias
            </button>
          </div>
        ) : (
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
              onClick={acceptAll}
            >
              Aceptar todas
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-text-secondary bg-card border border-card-border rounded-lg hover:text-text-primary transition-colors cursor-pointer"
              onClick={rejectAll}
            >
              Rechazar todas
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
              onClick={() => setShowCustomize(true)}
            >
              Personalizar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
