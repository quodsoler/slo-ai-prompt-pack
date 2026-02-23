import { useEffect, useState } from 'preact/hooks';
import { bumpTeaser } from '../../data/thank-you-data';

export default function ThankYouContent() {
  const [hasBump, setHasBump] = useState(false);
  const [hasUpsell, setHasUpsell] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHasBump(params.get('bump') === '1');
    setHasUpsell(params.get('upsell') === '1');
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div class="space-y-4">
      {/* Order summary */}
      <div class="bg-surface border border-card-border rounded-xl p-4">
        <p class="text-text-primary font-semibold">
          Tu compra: Pack de 275+ Prompts IA para Marketing y Negocios
        </p>
        <p class="text-text-secondary text-sm mt-1">27 EUR — Pago único, acceso de por vida</p>
      </div>

      {hasBump && (
        <div class="bg-success/10 border border-success/30 rounded-xl p-4">
          <p class="text-success font-medium">
            También incluido: Tu Pack de 50 Prompts de Automatización
          </p>
        </div>
      )}

      {hasUpsell && (
        <div class="bg-primary/10 border border-primary/30 rounded-xl p-4">
          <p class="text-primary-light font-medium">
            También incluido: Sistema Completo de IA
          </p>
        </div>
      )}

      {!hasBump && !hasUpsell && (
        <div class="bg-accent/10 border border-accent/30 rounded-xl p-4">
          <p class="text-accent-light font-medium">{bumpTeaser.title}</p>
          <p class="text-text-secondary text-sm mt-1">{bumpTeaser.description}</p>
        </div>
      )}
    </div>
  );
}
