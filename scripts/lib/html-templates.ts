import { PDF_STYLES } from './pdf-styles.js';

export function wrapDocument(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${PDF_STYLES}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

export function mainCoverPage(): string {
  return `
<div class="cover-page">
  <div class="cover-badge">PACK COMPLETO</div>
  <h1 class="cover-title">275+ Prompts IA para Marketing y Negocios</h1>
  <p class="cover-subtitle">
    Prompts profesionales listos para usar en ChatGPT y Claude.<br>
    Adaptados al mercado hispanohablante.
  </p>
  <div class="cover-footer">
    <span>promptsparatunegocio.com</span> &middot; Edici\u00f3n 2026
  </div>
</div>`;
}

export function bumpCoverPage(): string {
  return `
<div class="cover-page" style="background: linear-gradient(180deg, #1e1b4b 0%, #0f0a2e 100%);">
  <div class="cover-badge" style="border-color: rgba(99, 102, 241, 0.5); color: #818cf8;">PACK AUTOMATIZACI\u00d3N</div>
  <h1 class="cover-title" style="background: linear-gradient(135deg, #818cf8 0%, #06b6d4 100%); -webkit-background-clip: text; background-clip: text;">50 Prompts Avanzados de Automatizaci\u00f3n</h1>
  <p class="cover-subtitle">
    Automatiza flujos de trabajo con IA usando Zapier, Make.com, n8n y m\u00e1s.<br>
    Nivel intermedio-avanzado.
  </p>
  <div class="cover-footer">
    <span style="color: #6366f1;">promptsparatunegocio.com</span> &middot; Edici\u00f3n 2026
  </div>
</div>`;
}

export function guideCoverPage(): string {
  return `
<div class="cover-page" style="background: linear-gradient(180deg, #022c22 0%, #064e3b 100%);">
  <div class="cover-badge" style="border-color: rgba(16, 185, 129, 0.5); color: #34d399;">GU\u00cdA COMPLETA</div>
  <h1 class="cover-title" style="background: linear-gradient(135deg, #34d399 0%, #06b6d4 100%); -webkit-background-clip: text; background-clip: text;">C\u00f3mo Usar la IA para Marketing y Negocios</h1>
  <p class="cover-subtitle">
    T\u00e9cnicas, workflows y plantillas para sacar el m\u00e1ximo partido a ChatGPT y Claude.<br>
    Gu\u00eda pr\u00e1ctica para emprendedores y peque\u00f1os negocios.
  </p>
  <div class="cover-footer">
    <span style="color: #10b981;">promptsparatunegocio.com</span> &middot; Edici\u00f3n 2026
  </div>
</div>`;
}

export function sectionDivider(letter: string, title: string, promptCount?: string): string {
  return `
<div class="section-divider">
  <div class="section-divider-letter">${letter}</div>
  <div class="section-divider-label">Secci\u00f3n ${letter}</div>
  <div class="section-divider-title">${title}</div>
  ${promptCount ? `<div class="section-divider-count">${promptCount}</div>` : ''}
</div>`;
}
