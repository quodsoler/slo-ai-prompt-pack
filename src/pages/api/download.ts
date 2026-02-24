export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getStripe } from '../../lib/stripe';
import { validateDownloadToken } from '../../lib/download-token';

const FILE_MAP: Record<string, string> = {
  pack: 'pack-275-prompts-ia-marketing-negocios.pdf',
  bump: 'pack-50-prompts-automatizacion-avanzada.pdf',
  guide: 'guia-completa-ia-marketing-negocios.pdf',
};

function getPdfPath(filename: string): string {
  return resolve(process.cwd(), 'private', 'pdfs', filename);
}

export const GET: APIRoute = async ({ url }) => {
  const file = url.searchParams.get('file');
  const sessionId = url.searchParams.get('session_id');
  const token = url.searchParams.get('token');

  // Validate file param
  if (!file || !FILE_MAP[file]) {
    return new Response('Invalid file parameter', { status: 400 });
  }

  // Must provide either session_id or token
  if (!sessionId && !token) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Validate access
  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== 'paid') {
        return new Response('Payment not completed', { status: 403 });
      }
    } catch {
      return new Response('Invalid session', { status: 403 });
    }
  } else if (token) {
    const email = validateDownloadToken(token);
    if (!email) {
      return new Response('Invalid download link', { status: 403 });
    }
  }

  // Serve the PDF
  const filename = FILE_MAP[file]!;
  const pdfPath = getPdfPath(filename);

  if (!existsSync(pdfPath)) {
    return new Response('File not found', { status: 404 });
  }

  const pdfBuffer = readFileSync(pdfPath);

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length.toString(),
      'Cache-Control': 'private, no-store',
    },
  });
};
