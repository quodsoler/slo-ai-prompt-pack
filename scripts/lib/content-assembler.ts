import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '../../data/product-content');

export interface ContentSection {
  id: string;
  title: string;
  letter?: string;
  promptCount?: string;
  markdown: string;
}

const MAIN_FILES: { path: string; sectionId: string }[] = [
  { path: 'getting-started-guide/guia-inicio-rapido-ia.md', sectionId: 'guide' },
  { path: 'section-a-marketing/part1-email-landing-social.md', sectionId: 'section-a' },
  { path: 'section-a-marketing/part2-ads-seo-brand.md', sectionId: 'section-a' },
  { path: 'section-b-business/part1-proposals-invoicing-strategy-finance.md', sectionId: 'section-b' },
  { path: 'section-b-business/part2-legal-tax-onboarding.md', sectionId: 'section-b' },
  { path: 'section-c-socialmedia/part1-youtube-pinterest-platforms.md', sectionId: 'section-c' },
  { path: 'section-c-socialmedia/part2-strategy-analytics-growth.md', sectionId: 'section-c' },
];

const BUMP_FILES: { path: string; sectionId: string }[] = [
  { path: 'order-bump-automation/prompts-automatizacion-avanzada.md', sectionId: 'automation' },
];

const GUIDE_FILES: { path: string; sectionId: string }[] = [
  { path: 'guia-completa-ia/guia-completa-como-usar-ia.md', sectionId: 'guia-completa' },
];

function readMd(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

/**
 * Normalize heading levels so all individual prompts are h4,
 * categories stay as h2, and strip redundant H1/top-level headings.
 */
function normalizeHeadings(content: string, sectionId: string): string {
  return content
    .split('\n')
    .map((line) => {
      // Strip top-level H1 headings (redundant with cover/dividers)
      if (/^# /.test(line)) return '';

      // Strip the "Prompt " prefix in section-b part2 headings
      // "### Prompt N-061:" → "### N-061:"
      if (/^### Prompt ([A-Z]-\d{3}:)/.test(line)) {
        line = line.replace(/^### Prompt /, '### ');
      }

      // Normalize H3 prompt headings (matching X-NNN: pattern) to H4
      // section-a part2: ### M-055: → #### M-055:
      // section-b: ### N-001: → #### N-001:
      // order-bump: ### A-001: → #### A-001:
      if (/^### [A-Z]-\d{3}:/.test(line)) {
        line = '#' + line; // ### → ####
      }

      // Also: strip secondary H2 that's just a pack title (section-b part2)
      if (/^## Pack de \d+\+ Prompts/.test(line)) return '';

      return line;
    })
    .join('\n')
    // Collapse multiple blank lines
    .replace(/\n{4,}/g, '\n\n\n');
}

/** Insert page-break-before markers at ## Category headings, skipping the first one */
function insertPageBreaks(content: string): string {
  let first = true;
  return content.replace(/^(## .+)$/gm, (match) => {
    if (first) {
      first = false;
      return match; // No page break before the first category heading
    }
    return `<div class="page-break-before"></div>\n\n${match}`;
  });
}

export function assembleMainProduct(): ContentSection[] {
  const sections: ContentSection[] = [];
  let lastSectionId = '';

  for (const file of MAIN_FILES) {
    let md = readMd(file.path);
    md = normalizeHeadings(md, file.sectionId);
    md = insertPageBreaks(md);

    // Track section transitions for divider pages
    const isNewSection = file.sectionId !== lastSectionId && file.sectionId !== 'guide';
    lastSectionId = file.sectionId;

    sections.push({
      id: file.sectionId,
      title: getSectionTitle(file.sectionId),
      letter: getSectionLetter(file.sectionId),
      promptCount: getSectionPromptCount(file.sectionId),
      markdown: isNewSection ? `<!-- SECTION_DIVIDER:${file.sectionId} -->\n\n${md}` : md,
    });
  }

  return sections;
}

export function assembleOrderBump(): ContentSection[] {
  return BUMP_FILES.map((file) => {
    let md = readMd(file.path);
    md = normalizeHeadings(md, file.sectionId);
    md = insertPageBreaks(md);
    return {
      id: file.sectionId,
      title: 'Prompts de Automatización Avanzada',
      markdown: md,
    };
  });
}

export function assembleGuideCompleta(): ContentSection[] {
  return GUIDE_FILES.map((file) => {
    let md = readMd(file.path);
    md = normalizeHeadings(md, file.sectionId);
    md = insertPageBreaks(md);
    return {
      id: file.sectionId,
      title: 'Guía Completa: Cómo Usar la IA',
      markdown: md,
    };
  });
}

function getSectionTitle(id: string): string {
  const titles: Record<string, string> = {
    guide: 'Guía de Inicio Rápido',
    'section-a': 'Marketing Digital y Comunicación',
    'section-b': 'Negocios y Autónomos',
    'section-c': 'Redes Sociales Avanzadas',
  };
  return titles[id] ?? id;
}

function getSectionLetter(id: string): string | undefined {
  const letters: Record<string, string> = {
    'section-a': 'A',
    'section-b': 'B',
    'section-c': 'C',
  };
  return letters[id];
}

function getSectionPromptCount(id: string): string | undefined {
  const counts: Record<string, string> = {
    'section-a': '105 prompts',
    'section-b': '105 prompts',
    'section-c': '65 prompts',
  };
  return counts[id];
}
