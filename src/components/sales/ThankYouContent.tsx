import { productConfig } from '../../data/product-config';

interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

interface Props {
  lineItems: LineItem[];
  amountPaid: number;
}

export default function ThankYouContent({ lineItems, amountPaid }: Props) {
  return (
    <div class="space-y-4">
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
    </div>
  );
}
