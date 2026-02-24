import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';

let browser: Browser | null = null;

export async function launchBrowser(): Promise<void> {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

/**
 * First pass: render HTML and extract page numbers for each heading.
 * Returns a map of data-toc-id → page number.
 */
export async function getHeadingPageNumbers(html: string): Promise<Map<string, number>> {
  if (!browser) throw new Error('Browser not launched');

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Generate a temporary PDF to get page mappings
  // We use Puppeteer's ability to query element positions relative to pages
  const pageNumbers = await page.evaluate(() => {
    const result: Record<string, number> = {};
    const tocElements = document.querySelectorAll('[data-toc-id]');

    // Get the page height (A4 at 96 DPI with margins)
    // A4 = 297mm, margins top: 2cm + bottom: 2.5cm = 4.5cm → content height ≈ 252.5mm
    // At 96 DPI: 1mm ≈ 3.7795px → content height ≈ 954px
    // But Puppeteer uses its own page calculation, so we approximate with full A4 height
    // A4 height at 96 DPI ≈ 1123px, minus margins ≈ 953px of content
    const pageContentHeight = 953;
    // Account for cover page (first page has no margins, different layout)
    // We measure from the top of the document

    tocElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      // Page 1 = cover (no margin, full 1123px), subsequent pages have margins
      // Approximate: page 1 is 0-1123px, page 2 is 1123-2076px, etc.
      const coverHeight = 1123; // Full A4 page at 96 DPI
      let pageNum: number;
      if (top < coverHeight) {
        pageNum = 1;
      } else {
        pageNum = 1 + Math.ceil((top - coverHeight) / pageContentHeight);
      }
      const id = el.getAttribute('data-toc-id');
      if (id) result[id] = pageNum;
    });

    return result;
  });

  await page.close();
  return new Map(Object.entries(pageNumbers));
}

/**
 * Render HTML to a PDF buffer.
 */
export async function renderPdf(html: string): Promise<Buffer> {
  if (!browser) throw new Error('Browser not launched');

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluateHandle('document.fonts.ready');

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      right: '2.5cm',
      bottom: '2.5cm',
      left: '2.5cm',
    },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width: 100%; text-align: center; font-size: 9px; color: #94a3b8; font-family: Inter, sans-serif;">
        <span class="pageNumber"></span>
      </div>
    `,
  });

  await page.close();
  return Buffer.from(pdf);
}
