import { useState, useEffect } from 'preact/hooks';
import { buildCheckoutUrl, handleCtaClick } from '../../lib/checkout-url';

export default function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const priceOffer = document.getElementById('oferta');
    const finalCta = document.getElementById('final-cta');

    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero is NOT visible
        if (!entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0 }
    );

    // Hide bar when PriceOffer or FinalCta are visible
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(false);
            return;
          }
        }
      },
      { threshold: 0.3 }
    );

    heroObserver.observe(hero);
    if (priceOffer) ctaObserver.observe(priceOffer);
    if (finalCta) ctaObserver.observe(finalCta);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  function onClick(e: Event) {
    e.preventDefault();
    const url = buildCheckoutUrl('sticky_bar');
    if (url !== '#') {
      handleCtaClick('sticky_bar', url);
    }
  }

  const url = typeof window !== 'undefined' ? buildCheckoutUrl('sticky_bar') : '#';

  return (
    <div
      class={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface/95 backdrop-blur-lg border-t border-card-border/30 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ height: '72px' }}
    >
      <div class="flex items-center justify-between h-full px-4 max-w-lg mx-auto">
        <div>
          <p class="text-lg font-bold text-text-primary">27 €</p>
          <p class="text-xs text-text-muted">Pago único</p>
        </div>
        <a
          href={url}
          onClick={onClick}
          class="px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-linear-to-br from-primary to-accent-dark shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-200"
        >
          Quiero Mis Prompts
        </a>
      </div>
    </div>
  );
}
