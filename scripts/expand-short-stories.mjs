// Erweitert die KLAREN Wortzahl-Ausreißer (>15% unter Kategorie-Minimum) sowie
// genuin abgeschnittene Märchen auf den Kategorie-Zielbereich — per Claude.
//
// Behält Titel, Charaktere, Thema, Kategorie, Cover-Felder und Slug bei; ersetzt nur
// den Fließtext und rechnet readingTime neu. Kategorie-Moralregel wird eingehalten
// (uyku: KEINE „Kıssadan hisse", warmer Schluss; sonst Moral-Schlusszeile).
//
//   ANTHROPIC_API_KEY=sk-... node scripts/expand-short-stories.mjs --dry-run
//   ANTHROPIC_API_KEY=sk-... node scripts/expand-short-stories.mjs
//   ... --slug=alice --slug=uykucu-ay      # nur bestimmte Dateien
//   ... --model=claude-opus-4-8 --effort=high
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { CATEGORIES, SYSTEM_PROMPT, wordCount, readingTimeFor } from './lib/story-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = join(__dirname, '..', 'src', 'content', 'stories');
const RANGE_KEYS = Object.keys(CATEGORIES);

// Standard-Zielliste (die 10 klaren Ausreißer aus dem Audit).
const DEFAULT_SLUGS = [
  'akilli-tavsan', 'alice', 'caliskan-karinca', 'keloglan-degirmen', 'keloglan-dev',
  'keloglan-tohum', 'keloglanin-yedi-akcesi', 'minik-selinin-kayip-eldiveni',
  'uykucu-ay', 'yildiz-toplayan-cocuk',
];

function parseArgs() {
  const slugs = [];
  let model = 'claude-opus-4-8', effort = 'high', dry = false;
  for (const a of process.argv.slice(2)) {
    if (a === '--dry-run') dry = true;
    else if (a.startsWith('--slug=')) slugs.push(a.slice(7));
    else if (a.startsWith('--model=')) model = a.slice(8);
    else if (a.startsWith('--effort=')) effort = a.slice(9);
  }
  return { slugs: slugs.length ? slugs : DEFAULT_SLUGS, model, effort, dry };
}

function splitFile(raw) {
  const m = raw.match(/^(---\n)([\s\S]*?)(\n---\n)([\s\S]*)$/);
  if (!m) return null;
  return { fmOpen: m[1], fm: m[2], fmClose: m[3], body: m[4] };
}
function fmValue(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
  return m ? m[1] : null;
}
function fmArray(fm, key) {
  const raw = fmValue(fm, key);
  if (!raw) return [];
  try { return JSON.parse(raw.replace(/'/g, '"')); } catch { return []; }
}

const EXPAND_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { body: { type: 'string', description: 'Der vollständige, erweiterte Märchentext (Markdown, kurze Absätze).' } },
  required: ['body'],
};

function buildPrompt({ cat, minW, maxW, title, themes, characters, oldBody }) {
  const c = CATEGORIES[cat];
  const moralLine = c.moral
    ? 'Die LETZTE Zeile ist eine Moral im Format "**Kıssadan hisse:** ..." (ein Satz).'
    : 'Dies ist ein UYKU-Märchen: KEINE Moral/„Kıssadan hisse". Stattdessen ein warmer, schläfriger Schlusssatz (z. B. „İyi geceler").';
  return `Erweitere das folgende türkische Kindermärchen auf ${minW}-${maxW} Wörter (Fließtext). Es ist aktuell zu kurz${/,$|,\s*$/.test(oldBody.trim()) ? ' bzw. mitten im Satz abgeschnitten' : ''}.

VORGABEN:
- Kategorie: ${c.label}. Stil: ${c.guidance}
- Behalte Titel ("${title}"), Kernthema (${themes.join(', ') || '—'}) und Hauptfiguren (${characters.join(', ') || '—'}) bei. Ändere NICHT das Grundmotiv, vertiefe es nur (mehr Szenen, Dialoge, kleine Hindernisse, Beschreibungen).
- Kindgerecht: keine Gewalt, kein Tod/Verletzung, keine Angst, keine Stereotype. Warm und hoffnungsvoll.
- Natürliches, zeitgemäßes Türkisch im Märchenton (-mış'lı geçmiş zaman).
- ${moralLine}
- Gib NUR JSON zurück: {"body": "..."}.

BISHERIGER (zu kurzer/abgeschnittener) TEXT:
"""
${oldBody.trim()}
"""`;
}

function extractJson(msg) {
  if (msg.stop_reason === 'refusal') throw new Error('refusal');
  const text = msg.content.find((b) => b.type === 'text');
  if (!text) throw new Error('no text block');
  return JSON.parse(text.text);
}

async function main() {
  const opts = parseArgs();
  if (!process.env.ANTHROPIC_API_KEY) { console.error('Fehlt: ANTHROPIC_API_KEY'); process.exit(1); }
  const client = new Anthropic();
  console.log(`Modell: ${opts.model} | effort: ${opts.effort}${opts.dry ? ' | DRY-RUN' : ''} | ${opts.slugs.length} Dateien`);

  for (const slug of opts.slugs) {
    const path = join(STORIES_DIR, `${slug}.md`);
    let raw;
    try { raw = await readFile(path, 'utf8'); } catch { console.warn(`  ⚠ nicht gefunden: ${slug}`); continue; }
    const parts = splitFile(raw);
    if (!parts) { console.warn(`  ⚠ kein Frontmatter: ${slug}`); continue; }

    const cats = fmArray(parts.fm, 'categories');
    const cat = cats.find((c) => RANGE_KEYS.includes(c));
    if (!cat) { console.warn(`  ⚠ unbekannte Kategorie: ${slug} (${cats})`); continue; }
    const [minW, maxW] = CATEGORIES[cat].words;
    const title = (fmValue(parts.fm, 'title') || '').replace(/^"|"$/g, '');

    const msg = await client.messages.create({
      model: opts.model, max_tokens: 8000, thinking: { type: 'adaptive' },
      output_config: { effort: opts.effort, format: { type: 'json_schema', schema: EXPAND_SCHEMA } },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildPrompt({
        cat, minW, maxW, title,
        themes: fmArray(parts.fm, 'themes'), characters: fmArray(parts.fm, 'characters'),
        oldBody: parts.body,
      }) }],
    });

    let data;
    try { data = extractJson(msg); } catch (e) { console.warn(`  ⚠ ${slug}: ${e.message}`); continue; }
    const newBody = (data.body || '').trim();
    const w = wordCount(newBody);
    const rt = readingTimeFor(w);
    const flag = w >= minW && w <= maxW ? '✓' : `~${w}W (Soll ${minW}-${maxW})`;

    const newFm = parts.fm.replace(/^readingTime:.*$/m, `readingTime: ${rt}`);
    const out = `${parts.fmOpen}${newFm}${parts.fmClose}${newBody}\n`;
    if (opts.dry) console.log(`  [dry] ${slug} (${cat}): ${w}W ${flag}`);
    else { await writeFile(path, out, 'utf8'); console.log(`  ✎ ${slug} (${cat}): ${w}W ${flag}`); }
  }
  console.log('Fertig. Bitte die erweiterten Texte gegenlesen (Inhaltsänderung).');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
