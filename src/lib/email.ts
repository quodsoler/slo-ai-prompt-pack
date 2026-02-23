import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;

  const key = import.meta.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  _resend = new Resend(key);
  return _resend;
}

interface DeliveryEmailParams {
  to: string;
  customerName?: string;
  hasUpsell: boolean;
}

export async function sendDeliveryEmail({
  to,
  customerName,
  hasUpsell,
}: DeliveryEmailParams): Promise<void> {
  const notionUrl = import.meta.env.DELIVERY_NOTION_URL;
  const pdfUrl = import.meta.env.DELIVERY_PDF_URL;
  const greeting = customerName ? `Hola ${customerName}` : 'Hola';

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#1f2937;border-radius:12px;padding:32px;border:1px solid #374151;">
      <h1 style="color:#a78bfa;font-size:24px;margin:0 0 16px;">${greeting}, tu pack está listo 🎉</h1>
      <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Gracias por tu compra del <strong style="color:#fff;">Pack de 275+ Prompts IA para Marketing y Negocios</strong>.
        Aquí tienes tus enlaces de acceso:
      </p>
      <div style="margin:0 0 16px;">
        <a href="${notionUrl}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">
          Abrir en Notion
        </a>
      </div>
      <div style="margin:0 0 24px;">
        <a href="${pdfUrl}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">
          Descargar PDF
        </a>
      </div>
      ${hasUpsell ? `<div style="background:#7c3aed20;border:1px solid #7c3aed40;border-radius:8px;padding:16px;margin:0 0 24px;">
        <p style="color:#c4b5fd;font-size:14px;margin:0;">
          <strong>Sistema Completo de IA</strong> — Revisa tu bandeja de entrada. Recibirás acceso por separado en las próximas horas.
        </p>
      </div>` : ''}
      <p style="color:#9ca3af;font-size:14px;line-height:1.5;margin:0;">
        Guarda este email para acceder a tus prompts en cualquier momento.<br>
        Si tienes alguna pregunta, responde directamente a este correo.
      </p>
    </div>
  </div>
</body>
</html>`;

  const resend = getResend();
  const { error } = await resend.emails.send({
    from: 'Pack Prompts IA <entrega@updates.example.com>',
    to,
    subject: '🎉 Tu Pack de 275+ Prompts IA está listo',
    html,
  });

  if (error) {
    throw new Error(`Failed to send delivery email: ${error.message}`);
  }
}
