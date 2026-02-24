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

  it('includes pack PDF URL in email HTML', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('https://example.com/descargas/pack-275-prompts-ia-marketing-negocios.pdf');
  });

  it('includes guide PDF URL in email HTML', async () => {
    await sendDeliveryEmail({
      to: 'buyer@example.com',
      hasUpsell: false,
    });

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain('https://example.com/descargas/guia-completa-ia-marketing-negocios.pdf');
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
