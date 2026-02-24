import { describe, it, expect, beforeEach, vi } from 'vitest';

const { mockPut } = vi.hoisted(() => ({ mockPut: vi.fn() }));
vi.mock('@vercel/blob', () => ({
  put: mockPut,
}));

import { saveCustomerRecord, type CustomerRecord } from '../customers';

const sampleRecord: CustomerRecord = {
  email: 'buyer@example.com',
  name: 'María García',
  amount: 2700,
  currency: 'usd',
  sessionId: 'cs_test_abc123',
  timestamp: '2026-02-24T12:00:00.000Z',
};

describe('saveCustomerRecord', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPut.mockResolvedValue({ url: 'https://blob.vercel-storage.com/customers/cs_test_abc123.json' });
  });

  it('saves record to correct blob path', async () => {
    await saveCustomerRecord(sampleRecord);

    expect(mockPut).toHaveBeenCalledWith(
      'customers/cs_test_abc123.json',
      expect.any(String),
      expect.objectContaining({
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
      }),
    );
  });

  it('writes valid JSON with all fields', async () => {
    await saveCustomerRecord(sampleRecord);

    const jsonArg = mockPut.mock.calls[0][1];
    const parsed = JSON.parse(jsonArg);

    expect(parsed).toEqual(sampleRecord);
  });

  it('handles null name', async () => {
    const noName = { ...sampleRecord, name: null };
    await saveCustomerRecord(noName);

    const jsonArg = mockPut.mock.calls[0][1];
    const parsed = JSON.parse(jsonArg);

    expect(parsed.name).toBeNull();
  });

  it('propagates blob storage errors', async () => {
    mockPut.mockRejectedValueOnce(new Error('Blob storage unavailable'));

    await expect(saveCustomerRecord(sampleRecord)).rejects.toThrow('Blob storage unavailable');
  });
});
