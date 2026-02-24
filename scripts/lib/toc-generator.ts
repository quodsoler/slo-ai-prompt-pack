export interface TocEntry {
  id: string;
  text: string;
  level: number;
  sectionId: string;
  page?: number;
}

const SECTION_LABELS: Record<string, string> = {
  guide: 'Guía de Inicio Rápido',
  'section-a': 'Sección A — Marketing Digital',
  'section-b': 'Sección B — Negocios y Autónomos',
  'section-c': 'Sección C — Redes Sociales',
  automation: 'Automatización Avanzada',
  'guia-completa': 'Guía Completa — Cómo Usar la IA',
};

/**
 * Extract h2 headings from rendered HTML.
 * Reads data-section attribute directly from each heading tag.
 */
export function extractHeadings(html: string): TocEntry[] {
  const entries: TocEntry[] = [];
  // Match h2 tags that have both data-toc-id and data-section attributes
  const regex = /<h2\s+id="([^"]+)"\s+data-toc-id="([^"]+)"\s+data-toc-level="2"\s+data-section="([^"]+)">([\s\S]*?)<\/h2>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const text = match[4]
      .replace(/<[^>]*>/g, '')
      .trim();

    if (text.length < 3) continue;

    entries.push({
      id: match[2],
      text,
      level: 2,
      sectionId: match[3],
    });
  }

  return entries;
}

/**
 * Build ToC HTML grouped by section.
 */
export function buildTocHtml(entries: TocEntry[]): string {
  if (entries.length === 0) return '';

  let html = '<div class="toc-page">\n';
  html += '  <div class="toc-title">CONTENIDO</div>\n';

  let currentSection = '';

  for (const entry of entries) {
    if (entry.sectionId !== currentSection) {
      currentSection = entry.sectionId;
      const label = SECTION_LABELS[currentSection] ?? currentSection;
      html += `  <div class="toc-section-header">${label}</div>\n`;
    }

    const pageText = entry.page != null ? `${entry.page}` : '';
    html += `  <div class="toc-entry">
    <span class="toc-entry-text">${entry.text}</span>
    <span class="toc-entry-dots"></span>
    <span class="toc-entry-page">${pageText}</span>
  </div>\n`;
  }

  html += '</div>\n';
  return html;
}
