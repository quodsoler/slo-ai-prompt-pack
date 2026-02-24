import MarkdownIt from 'markdown-it';
import type { Options } from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';

let headingCounter = 0;
let currentSectionId = '';

/** Reset heading counter between documents */
export function resetHeadingCounter(): void {
  headingCounter = 0;
  currentSectionId = '';
}

/** Set the current section ID so headings get tagged with it */
export function setCurrentSection(sectionId: string): void {
  currentSectionId = sectionId;
}

function createParser(): MarkdownIt {
  const md = new MarkdownIt({
    html: true,
    linkify: false,
    typographer: true,
  } satisfies Options);

  // Add IDs + section info to headings for ToC anchor links
  md.renderer.rules['heading_open'] = (tokens: Token[], idx: number) => {
    const token = tokens[idx];
    const tag = token.tag;
    const level = parseInt(tag.slice(1), 10);

    // Get the inline content of the heading
    const inlineToken = tokens[idx + 1];
    const text = inlineToken?.children
      ?.map((t) => t.content)
      .join('')
      .trim() ?? '';

    // Generate a slug from the heading text
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-áéíóúñü]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);

    const id = `heading-${headingCounter++}-${slug}`;
    const sectionAttr = currentSectionId ? ` data-section="${currentSectionId}"` : '';

    return `<${tag} id="${id}" data-toc-id="${id}" data-toc-level="${level}"${sectionAttr}>`;
  };

  md.renderer.rules['heading_close'] = (tokens: Token[], idx: number) => {
    return `</${tokens[idx].tag}>`;
  };

  // Highlight [variable] placeholder patterns in text
  // Matches bracketed text with letters (upper/lowercase + accented), spaces, colons, slashes, etc.
  // Min 3 chars inside brackets to avoid matching single-char brackets
  const variablePattern = /\[([a-zA-ZáéíóúñüÁÉÍÓÚÑÜ][a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\d\s/:,.\-()]{2,80})\]/g;

  md.renderer.rules['text'] = (tokens: Token[], idx: number) => {
    const content = tokens[idx].content;
    return content.replace(
      variablePattern,
      '<span class="variable">[$1]</span>'
    );
  };

  // Also highlight variables inside code blocks (fence)
  md.renderer.rules['fence'] = (tokens: Token[], idx: number) => {
    const token = tokens[idx];
    let content = md.utils.escapeHtml(token.content);
    content = content.replace(
      variablePattern,
      '<span class="variable">[$1]</span>'
    );
    return `<pre class="prompt-block"><code>${content}</code></pre>`;
  };

  return md;
}

const parser = createParser();

export function renderMarkdown(markdown: string): string {
  return parser.render(markdown);
}
