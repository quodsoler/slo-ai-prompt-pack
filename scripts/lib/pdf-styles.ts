export const PDF_STYLES = `
/* ===== BASE RESET & TYPOGRAPHY ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #1e293b;
  background: #ffffff;
}

/* ===== COVER PAGE ===== */
.cover-page {
  page-break-after: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
  color: #f8fafc;
  text-align: center;
  padding: 4cm 3cm;
}

.cover-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3));
  border: 1px solid rgba(147, 51, 234, 0.5);
  border-radius: 20px;
  padding: 6px 20px;
  font-size: 10pt;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #a855f7;
  margin-bottom: 2cm;
}

.cover-title {
  font-size: 36pt;
  font-weight: 800;
  line-height: 1.15;
  background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1cm;
  max-width: 16cm;
}

.cover-subtitle {
  font-size: 13pt;
  color: #cbd5e1;
  line-height: 1.7;
  max-width: 14cm;
  margin-bottom: 2.5cm;
}

.cover-footer {
  font-size: 10pt;
  color: #64748b;
  letter-spacing: 1px;
}

.cover-footer span {
  color: #7c3aed;
}

/* ===== SECTION DIVIDER ===== */
.section-divider {
  page-break-before: always;
  page-break-after: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);
  color: #ffffff;
  text-align: center;
  padding: 4cm 3cm;
  position: relative;
  overflow: hidden;
}

.section-divider-letter {
  font-size: 200pt;
  font-weight: 900;
  position: absolute;
  opacity: 0.08;
  color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

.section-divider-label {
  font-size: 10pt;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 1cm;
}

.section-divider-title {
  font-size: 28pt;
  font-weight: 700;
  line-height: 1.2;
  position: relative;
  z-index: 1;
  margin-bottom: 0.8cm;
}

.section-divider-count {
  font-size: 12pt;
  opacity: 0.7;
  position: relative;
  z-index: 1;
}

/* ===== TABLE OF CONTENTS ===== */
.toc-page {
  page-break-after: always;
  padding: 2cm 0;
}

.toc-title {
  font-size: 24pt;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5cm;
  text-align: center;
  letter-spacing: 2px;
}

.toc-section-header {
  font-size: 11pt;
  font-weight: 700;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 0.6cm;
  margin-bottom: 0.3cm;
  padding-bottom: 0.15cm;
  border-bottom: 2px solid #ede9fe;
}

.toc-entry {
  display: flex;
  align-items: baseline;
  font-size: 10pt;
  line-height: 2;
  color: #334155;
}

.toc-entry-text {
  white-space: nowrap;
}

.toc-entry-dots {
  flex: 1;
  border-bottom: 1px dotted #cbd5e1;
  margin: 0 4px;
  min-width: 2cm;
}

.toc-entry-page {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: #64748b;
}

/* ===== BODY CONTENT ===== */
h2 {
  font-size: 18pt;
  font-weight: 700;
  color: #7c3aed;
  margin-top: 1.5cm;
  margin-bottom: 0.5cm;
  padding-bottom: 0.2cm;
  border-bottom: 3px solid #ede9fe;
  page-break-after: avoid;
}

h3 {
  font-size: 14pt;
  font-weight: 600;
  color: #1e293b;
  margin-top: 1cm;
  margin-bottom: 0.4cm;
  page-break-after: avoid;
}

h4 {
  font-size: 12pt;
  font-weight: 700;
  color: #4c1d95;
  margin-top: 0.8cm;
  margin-bottom: 0.3cm;
  padding: 0.15cm 0;
  page-break-after: avoid;
}

p {
  margin-bottom: 0.4cm;
  orphans: 3;
  widows: 3;
}

strong {
  font-weight: 600;
  color: #0f172a;
}

ul, ol {
  margin-left: 0.8cm;
  margin-bottom: 0.5cm;
}

li {
  margin-bottom: 0.15cm;
}

/* ===== PROMPT BLOCKS ===== */
pre.prompt-block {
  background: #f5f3ff;
  border-left: 4px solid #7c3aed;
  border-radius: 0 6px 6px 0;
  padding: 0.5cm 0.6cm;
  margin: 0.4cm 0 0.6cm 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9pt;
  line-height: 1.55;
  color: #1e293b;
  white-space: pre-wrap;
  word-wrap: break-word;
  page-break-inside: avoid;
  overflow: hidden;
}

pre.prompt-block code {
  font-family: inherit;
  font-size: inherit;
  background: none;
  padding: 0;
}

/* Generic code */
code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9pt;
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
}

/* ===== BLOCKQUOTES ===== */
blockquote {
  background: #f5f3ff;
  border-left: 4px solid #7c3aed;
  border-radius: 0 6px 6px 0;
  padding: 0.4cm 0.6cm;
  margin: 0.4cm 0 0.6cm 0;
  color: #334155;
  font-size: 10pt;
  page-break-inside: avoid;
}

blockquote p {
  margin-bottom: 0.2cm;
}

blockquote p:last-child {
  margin-bottom: 0;
}

/* ===== VARIABLES ===== */
.variable {
  background: #fef3c7;
  color: #92400e;
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.95em;
}

/* ===== TABLES ===== */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5cm 0;
  font-size: 9.5pt;
  page-break-inside: avoid;
}

th {
  background: #f5f3ff;
  color: #4c1d95;
  font-weight: 600;
  text-align: left;
  padding: 0.25cm 0.4cm;
  border-bottom: 2px solid #7c3aed;
}

td {
  padding: 0.2cm 0.4cm;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

tr:nth-child(even) td {
  background: #fafafa;
}

/* ===== HORIZONTAL RULES ===== */
hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 0.8cm 0;
}

/* ===== PAGE BREAKS ===== */
.page-break-before {
  page-break-before: always;
}

.page-break-after {
  page-break-after: always;
}

/* ===== PRINT ===== */
@page {
  size: A4;
  margin: 2cm 2.5cm 2.5cm 2.5cm;
}

@page :first {
  margin: 0;
}
`;
