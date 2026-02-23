/**
 * Format a price in Spanish convention: dot for thousands, comma for decimals, EUR suffix.
 * Examples: formatPrice(27) -> "27 €", formatPrice(2450) -> "2.450 €"
 */
export function formatPrice(amount: number): string {
  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${formatted} €`;
}
