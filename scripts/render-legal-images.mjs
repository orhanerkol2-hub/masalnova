import puppeteer from 'puppeteer';
import { imprint, privacy } from '../src/data/legal.mjs';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function renderSection(section) {
  const paragraphs = (section.paragraphs ?? []).map((text) => `<p>${escapeHtml(text)}</p>`).join('');
  const lines = section.lines?.length
    ? `<div class="lines">${section.lines.map((line) => `<div>${escapeHtml(line)}</div>`).join('')}</div>`
    : '';
  const bullets = section.bullets?.length
    ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  return `<section><h2>${escapeHtml(section.heading)}</h2>${paragraphs}${lines}${bullets}</section>`;
}

function pageHtml(document) {
  const note = document.note ? `<p class="note">${escapeHtml(document.note)}</p>` : '';
  return `<!doctype html>
  <html lang="de"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    html, body { margin: 0; background: #123f99; }
    body { padding: 22px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; color: #fff; }
    .card { width: 1156px; padding: 46px 52px 50px; border: 1px solid rgba(255,255,255,.28); border-radius: 26px; background: #315fc2; box-shadow: inset 0 1px rgba(255,255,255,.08); }
    h1 { margin: 0; font-size: 50px; line-height: 1.08; font-weight: 850; letter-spacing: -.8px; color: #ffb41f; }
    .subtitle { margin: 10px 0 30px; font-size: 24px; line-height: 1.4; font-weight: 700; color: #eaf1ff; }
    section + section { margin-top: 29px; padding-top: 27px; border-top: 1px solid rgba(255,255,255,.18); }
    h2 { margin: 0 0 11px; font-size: 29px; line-height: 1.22; color: #ffbc2e; }
    p, .lines, li { font-size: 22px; line-height: 1.55; }
    p { margin: 0; }
    p + p, p + .lines, p + ul { margin-top: 12px; }
    .lines { font-weight: 650; }
    ul { margin: 10px 0 0; padding-left: 30px; }
    li + li { margin-top: 4px; }
    .note { margin-top: 31px; padding: 18px 20px; border-radius: 15px; background: rgba(9, 40, 112, .44); font-weight: 750; }
  </style></head><body><main class="card">
    <h1>${escapeHtml(document.title)}</h1>
    <p class="subtitle">${escapeHtml(document.subtitle)}</p>
    ${document.sections.map(renderSection).join('')}
    ${note}
  </main></body></html>`;
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  for (const [document, filename] of [[imprint, 'Imprint.png'], [privacy, 'privacy.png']]) {
    await page.setContent(pageHtml(document), { waitUntil: 'load' });
    await page.screenshot({ path: new URL(`../public/${filename}`, import.meta.url).pathname, fullPage: true });
  }
} finally {
  await browser.close();
}

console.log('Imprint.png und privacy.png wurden aus src/data/legal.mjs erzeugt.');
