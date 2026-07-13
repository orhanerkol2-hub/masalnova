// Read-only Qualitätsaudit für alle Märchen unter src/content/stories.
//
// Prüft in vier Richtungen:
//   1. readingTime vs. Wortzahl  (Soll = readingTimeFor(wordCount(body)))
//   2. Wortzahl vs. Kategorie-Zielbereich (CATEGORIES[...].words), Bucket clear/minor
//   3. Defekte Textenden: geleakte JSON-Artefakte, echte Trunkierung
//   4. Editier-Meta-Notizen im Fließtext + Moral-Regel je Kategorie
//
// Schreibt scratchpad/story-audit.json und gibt eine Konsolenzusammenfassung aus.
// Verändert KEINE Dateien.
//
//   node scripts/audit-stories.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CATEGORIES, wordCount, readingTimeFor } from './lib/story-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = join(__dirname, '..', 'src', 'content', 'stories');
const OUT = process.env.AUDIT_OUT
  || join(__dirname, '..', 'src', 'content', '.story-audit.json');

// Regex für geleakte JSON-/Markdown-Artefakte am Textende.
export const ARTIFACT_TAIL = /["'“”’]?\s*[}\]]+\s*$|(?<=[.!?"“”’])\s*\*{1,2}\s*$/;
// Editier-/Meta-Notizen in eckigen Klammern.
export const META_NOTE = /\[[^\]]*(Not|Note|düzelt|internal|tag|Anmerk|Hinweis|fixed|corrected)[^\]]*\]/i;
// Bekannte Kategorie-Keys mit Wortbereich.
const RANGE_KEYS = Object.keys(CATEGORIES);

export function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function fmValue(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
  return m ? m[1] : null;
}

function fmCategories(fm) {
  const raw = fmValue(fm, 'categories');
  if (!raw) return [];
  try { return JSON.parse(raw.replace(/'/g, '"')); } catch { return []; }
}

// Textende bereinigt um Artefakte prüfen: endet es „sauber"?
function endsCleanly(body) {
  const stripped = body.replace(ARTIFACT_TAIL, '').trimEnd();
  const last = stripped.slice(-1);
  return /[.!?"“”…»]/.test(last);
}

export async function auditAll() {
  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md'));
  const report = {
    total: files.length,
    parsed: 0,
    readingTimeMismatch: [],
    rangeClear: [],   // >15% außerhalb
    rangeMinor: [],   // <=15% außerhalb
    artifacts: [],    // geleakte JSON-/**-Artefakte am Ende
    metaNotes: [],    // [Not: ...] im Body
    truncated: [],    // endet auch nach Bereinigung nicht auf Satzzeichen
    moralIssue: [],   // fehlende/überflüssige "Kıssadan hisse:"
    noFrontmatter: [],
  };

  for (const f of files) {
    const raw = await readFile(join(STORIES_DIR, f), 'utf8');
    const split = splitFrontmatter(raw);
    if (!split) { report.noFrontmatter.push(f); continue; }
    report.parsed++;
    const body = split.body.trim();
    const words = wordCount(body);

    // 1. readingTime
    const stored = parseInt(fmValue(split.fm, 'readingTime'), 10);
    const calc = readingTimeFor(words);
    if (stored !== calc) report.readingTimeMismatch.push({ f, words, stored, calc });

    // 2. Wortzahl-Range (erste bekannte Kategorie)
    const cats = fmCategories(split.fm);
    const cat = cats.find((c) => RANGE_KEYS.includes(c));
    if (cat) {
      const [min, max] = CATEGORIES[cat].words;
      if (words < min || words > max) {
        const deficit = words < min ? (min - words) / min : (words - max) / max;
        const entry = { f, cat, words, range: `${min}-${max}`, pct: Math.round(deficit * 100) };
        (deficit > 0.15 ? report.rangeClear : report.rangeMinor).push(entry);
      }
    }

    // 3. Artefakte / Trunkierung
    if (ARTIFACT_TAIL.test(body)) report.artifacts.push({ f, tail: body.slice(-40) });
    else if (!endsCleanly(body)) report.truncated.push({ f, tail: body.slice(-40) });

    // 4. Meta-Notizen
    if (META_NOTE.test(body)) report.metaNotes.push({ f, match: (body.match(META_NOTE) || [])[0] });

    // Moral-Regel: uyku darf KEIN "Kıssadan hisse:" haben, andere sollten.
    if (cat) {
      const hasMoral = /\*\*Kıssadan hisse:\*\*/.test(body);
      if (cat === 'uyku' && hasMoral) report.moralIssue.push({ f, cat, issue: 'uyku hat Moral' });
      if (cat !== 'uyku' && CATEGORIES[cat].moral && !hasMoral) report.moralIssue.push({ f, cat, issue: 'Moral fehlt' });
    }
  }

  return report;
}

function section(title, arr, sample = 12) {
  console.log(`\n### ${title}: ${arr.length}`);
  for (const x of arr.slice(0, sample)) console.log('   ', JSON.stringify(x));
  if (arr.length > sample) console.log(`    … und ${arr.length - sample} weitere`);
}

async function main() {
  const r = await auditAll();
  await writeFile(OUT, JSON.stringify(r, null, 2), 'utf8').catch(async () => {
    const { mkdir } = await import('node:fs/promises');
    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, JSON.stringify(r, null, 2), 'utf8');
  });
  console.log(`Geprüft: ${r.parsed}/${r.total} Dateien`);
  section('readingTime falsch', r.readingTimeMismatch);
  section('Wortzahl KLARE Ausreißer (>15%)', r.rangeClear);
  section('Wortzahl kleine Abweichung (<=15%)', r.rangeMinor, 6);
  section('Geleakte Artefakte am Textende', r.artifacts);
  section('Echte Trunkierung', r.truncated);
  section('Editier-Meta-Notizen im Text', r.metaNotes);
  section('Moral-Regel-Verstoß', r.moralIssue);
  section('Ohne Frontmatter', r.noFrontmatter);
  console.log(`\nReport: ${OUT}`);
}

// Nur ausführen, wenn direkt gestartet (nicht bei Import).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
