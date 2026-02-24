import { put } from '@vercel/blob';

export interface CustomerRecord {
  email: string;
  name: string | null;
  amount: number;
  currency: string;
  sessionId: string;
  timestamp: string;
}

/**
 * Save a customer purchase record to Vercel Blob Storage.
 * Filename uses the Stripe session ID so retries are idempotent.
 */
export async function saveCustomerRecord(record: CustomerRecord): Promise<void> {
  await put(
    `customers/${record.sessionId}.json`,
    JSON.stringify(record),
    {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    },
  );
}
