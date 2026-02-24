import { createHmac } from 'node:crypto';

function getSecret(): string {
  const secret = import.meta.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    throw new Error('DOWNLOAD_TOKEN_SECRET is not configured');
  }
  return secret;
}

/** Generate a permanent download token for a customer email. */
export function generateDownloadToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase()).toString('base64url');
  const hmac = createHmac('sha256', getSecret())
    .update(email.toLowerCase())
    .digest('hex');
  return `${payload}.${hmac}`;
}

/** Validate a download token. Returns the email if valid, null otherwise. */
export function validateDownloadToken(token: string): string | null {
  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return null;

  const payload = token.slice(0, dotIndex);
  const providedHmac = token.slice(dotIndex + 1);

  let email: string;
  try {
    email = Buffer.from(payload, 'base64url').toString('utf-8').toLowerCase();
  } catch {
    return null;
  }

  const expectedHmac = createHmac('sha256', getSecret())
    .update(email)
    .digest('hex');

  // Constant-time comparison
  if (providedHmac.length !== expectedHmac.length) return null;
  const a = Buffer.from(providedHmac, 'hex');
  const b = Buffer.from(expectedHmac, 'hex');
  if (a.length !== b.length) return null;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i]! ^ b[i]!;
  }

  return diff === 0 ? email : null;
}
