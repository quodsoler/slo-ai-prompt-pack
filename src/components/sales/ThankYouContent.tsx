import { useState } from 'preact/hooks';
import { productConfig } from '../../data/product-config';

interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

interface Props {
  lineItems: LineItem[];
  amountPaid: number;
  showUpsell: boolean;
  sessionId: string;
  hasUpsell: boolean;
}

export default function ThankYouContent({ lineItems, amountPaid, showUpsell, sessionId, hasUpsell }: Props) {
  const [upsellLoading, setUpsellLoading] = useState(false);

  async function handleUpsellClick() {
    setUpsellLoading(true);
    try {
      const res = await fetch('/api/upsell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert('Error al procesar. Por favor, inténtalo de nuevo.');
      setUpsellLoading(false);
    }
  }

  return (
    <div class="space-y-4">
      {/* Order summary from Stripe line items */}
      <div class="bg-surface border border-card-border rounded-xl p-4">
        {lineItems.map((item, i) => (
          <div key={i} class={`flex justify-between items-center ${i > 0 ? 'mt-2 pt-2 border-t border-card-border/30' : ''}`}>
            <p class="text-text-primary font-semibold text-left">{item.description}</p>
            <p class="text-text-secondary text-sm whitespace-nowrap ml-4">{item.amount} EUR</p>
          </div>
        ))}
        <div class="mt-3 pt-3 border-t border-card-border/50 flex justify-between items-center">
          <p class="text-text-primary font-bold">Total</p>
          <p class="text-text-primary font-bold">{amountPaid} EUR</p>
        </div>
        <p class="text-text-secondary text-sm mt-1 text-left">Pago único, acceso de por vida</p>
      </div>

      {hasUpsell && (
        <div class="bg-primary/10 border border-primary/30 rounded-xl p-4">
          <p class="text-primary-light font-medium">
            También incluido: {productConfig.upsell.name}
          </p>
        </div>
      )}

      {showUpsell && (
        <div class="bg-accent/10 border border-accent/30 rounded-xl p-5 text-left">
          <p class="text-accent-light font-semibold text-lg mb-1">{productConfig.upsell.name}</p>
          <p class="text-text-secondary text-sm mb-3">{productConfig.upsell.description}</p>
          <button
            type="button"
            onClick={handleUpsellClick}
            disabled={upsellLoading}
            class="px-6 py-3 text-sm font-semibold rounded-xl text-white bg-linear-to-br from-accent to-primary shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {upsellLoading ? 'Procesando...' : `Añadir por solo ${productConfig.upsell.price} €`}
          </button>
        </div>
      )}
    </div>
  );
}
