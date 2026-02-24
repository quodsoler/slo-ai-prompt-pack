import { writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { assembleMainProduct, assembleOrderBump, assembleGuideCompleta } from './lib/content-assembler.js';
import { renderMarkdown, resetHeadingCounter, setCurrentSection } from './lib/markdown-parser.js';
import { wrapDocument, mainCoverPage, bumpCoverPage, guideCoverPage, sectionDivider } from './lib/html-templates.js';
import { extractHeadings, buildTocHtml } from './lib/toc-generator.js';
import { launchBrowser, closeBrowser, getHeadingPageNumbers, renderPdf } from './lib/pdf-builder.js';

const OUTPUT_DIR = resolve(import.meta.dirname, '../output');
const PRIVATE_DIR = resolve(import.meta.dirname, '../private/pdfs');

const args = process.argv.slice(2);
const mainOnly = args.includes('--main-only');
const bumpOnly = args.includes('--bump-only');
const guideOnly = args.includes('--guide-only');

async function generateMainPdf(): Promise<void> {
  console.log('\n--- Generating main product PDF ---');

  resetHeadingCounter();
  const sections = assembleMainProduct();

  // Build body HTML from all sections, setting section context for each
  let bodyHtml = '';
  for (const section of sections) {
    setCurrentSection(section.id);
    if (section.markdown.startsWith('<!-- SECTION_DIVIDER:')) {
      const cleanMd = section.markdown.replace(/<!-- SECTION_DIVIDER:\S+ -->\n\n/, '');
      if (section.letter) {
        bodyHtml += sectionDivider(section.letter, section.title, section.promptCount);
      }
      bodyHtml += renderMarkdown(cleanMd);
    } else {
      bodyHtml += renderMarkdown(section.markdown);
    }
  }

  // === Pass 1: Render without ToC to get page numbers ===
  console.log('  Pass 1: Extracting page numbers...');
  const pass1Html = wrapDocument(mainCoverPage() + bodyHtml);
  const pageMap = await getHeadingPageNumbers(pass1Html);

  // Build ToC with page numbers
  const headings = extractHeadings(bodyHtml);
  for (const entry of headings) {
    const pageNum = pageMap.get(entry.id);
    if (pageNum != null) {
      entry.page = pageNum;
    }
  }
  const tocHtml = buildTocHtml(headings);

  // === Pass 2: Render final PDF with ToC ===
  console.log('  Pass 2: Rendering final PDF...');
  const finalHtml = wrapDocument(mainCoverPage() + tocHtml + bodyHtml);
  const pdf = await renderPdf(finalHtml);

  const outPath = resolve(OUTPUT_DIR, 'pack-275-prompts-ia-marketing-negocios.pdf');
  writeFileSync(outPath, pdf);

  const sizeMb = (pdf.length / 1024 / 1024).toFixed(1);
  console.log(`  Saved: ${outPath} (${sizeMb} MB)`);
}

async function generateBumpPdf(): Promise<void> {
  console.log('\n--- Generating order bump PDF ---');

  resetHeadingCounter();
  const sections = assembleOrderBump();

  let bodyHtml = '';
  for (const section of sections) {
    setCurrentSection(section.id);
    bodyHtml += renderMarkdown(section.markdown);
  }

  // === Pass 1: Get page numbers ===
  console.log('  Pass 1: Extracting page numbers...');
  const pass1Html = wrapDocument(bumpCoverPage() + bodyHtml);
  const pageMap = await getHeadingPageNumbers(pass1Html);

  // Build ToC
  const headings = extractHeadings(bodyHtml);
  for (const entry of headings) {
    const pageNum = pageMap.get(entry.id);
    if (pageNum != null) {
      entry.page = pageNum;
    }
  }
  const tocHtml = buildTocHtml(headings);

  // === Pass 2: Render final PDF ===
  console.log('  Pass 2: Rendering final PDF...');
  const finalHtml = wrapDocument(bumpCoverPage() + tocHtml + bodyHtml);
  const pdf = await renderPdf(finalHtml);

  const outPath = resolve(OUTPUT_DIR, 'pack-50-prompts-automatizacion-avanzada.pdf');
  writeFileSync(outPath, pdf);

  const sizeMb = (pdf.length / 1024 / 1024).toFixed(1);
  console.log(`  Saved: ${outPath} (${sizeMb} MB)`);
}

async function generateGuidePdf(): Promise<void> {
  console.log('\n--- Generating guide completa PDF ---');

  resetHeadingCounter();
  const sections = assembleGuideCompleta();

  let bodyHtml = '';
  for (const section of sections) {
    setCurrentSection(section.id);
    bodyHtml += renderMarkdown(section.markdown);
  }

  // === Pass 1: Get page numbers ===
  console.log('  Pass 1: Extracting page numbers...');
  const pass1Html = wrapDocument(guideCoverPage() + bodyHtml);
  const pageMap = await getHeadingPageNumbers(pass1Html);

  // Build ToC
  const headings = extractHeadings(bodyHtml);
  for (const entry of headings) {
    const pageNum = pageMap.get(entry.id);
    if (pageNum != null) {
      entry.page = pageNum;
    }
  }
  const tocHtml = buildTocHtml(headings);

  // === Pass 2: Render final PDF ===
  console.log('  Pass 2: Rendering final PDF...');
  const finalHtml = wrapDocument(guideCoverPage() + tocHtml + bodyHtml);
  const pdf = await renderPdf(finalHtml);

  const outPath = resolve(OUTPUT_DIR, 'guia-completa-ia-marketing-negocios.pdf');
  writeFileSync(outPath, pdf);

  const sizeMb = (pdf.length / 1024 / 1024).toFixed(1);
  console.log(`  Saved: ${outPath} (${sizeMb} MB)`);
}

async function main(): Promise<void> {
  console.log('PDF Generator for SLO AI Prompt Pack');
  console.log('=====================================');

  mkdirSync(OUTPUT_DIR, { recursive: true });

  await launchBrowser();

  try {
    if (guideOnly) {
      await generateGuidePdf();
    } else {
      if (!bumpOnly) await generateMainPdf();
      if (!mainOnly) await generateBumpPdf();
      await generateGuidePdf();
    }
  } finally {
    await closeBrowser();
  }

  // Copy PDFs to private/pdfs/ for gated download API
  mkdirSync(PRIVATE_DIR, { recursive: true });
  const pdfFiles = readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.pdf'));
  for (const file of pdfFiles) {
    copyFileSync(join(OUTPUT_DIR, file), join(PRIVATE_DIR, file));
  }
  console.log(`\nCopied ${pdfFiles.length} PDFs to private/pdfs/`);

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  closeBrowser().finally(() => process.exit(1));
});
