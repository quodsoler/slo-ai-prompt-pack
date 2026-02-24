import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

Object.assign(import.meta.env, {
  RESEND_API_KEY: 're_test_123',
  PUBLIC_SITE_URL: 'https://example.com',
  DOWNLOAD_TOKEN_SECRET: 'test-secret-for-unit-tests-only',
});

import { sendDeliveryEmail } from '../email';

describe('email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: 'email_123' }, error: null });
  });

  it('sends email with correct recipient and subject', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      customerName: 'María',
      hasUpsell: false,
    });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'buyer@example.com',
        subject: expect.stringContaining('275+ Prompts IA'),
      })
    );
  });

  it('includes gated pack download URL in email HTML', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('https://example.com/api/download?file=pack&token=');
  });

  it('includes gated guide download URL in email HTML', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('https://example.com/api/download?file=guide&token=');
  });

  it('includes customer name greeting when provided', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      customerName: 'Carlos',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('Hola Carlos');
  });

  it('uses generic greeting when no name provided', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('Hola,');
  });

  it('includes upsell info when hasUpsell is true', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: true,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('Sistema Completo de IA');
  });

  it('throws on Resend API error', async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid API key', name: 'validation_error' },
    });

    await expect(
      sendDeliveryEmail({ to: 'buyer@example.com', hasUpsell: false })
    ).rejects.toThrow('Failed to send delivery email');
  });
});
