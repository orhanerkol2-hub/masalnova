// Voller LLM-Lesepass über alle Märchen: prüft (a) Rechtschreibung/Grammatik (Türkisch),
// (b) Kindgerechtheit (Gewalt, Tod, Angst, Stereotype), (c) abgeschnittene/unlogische Stellen.
//
// Ändert KEINE Märchen. Schreibt einen Report (Markdown + JSON) zur menschlichen Durchsicht.
// Auto-Fixes von Inhalten sind bewusst NICHT enthalten — sensible Entscheidung des Nutzers.
//
//   ANTHROPIC_API_KEY=sk-... node scripts/review-stories-llm.mjs
//   ... --batch-size=10 --model=claude-opus-4-8 --limit=50   # nur erste 50 (Testlauf)
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = join(__dirname, '..', 'src', 'content', 'stories');
const OUT_DIR = process.env.REVIEW_OUT_DIR || join(__dirname, '..', 'src', 'content');

function parseArgs() {
  let batchSize = 8, model = 'claude-opus-4-8', effort = 'medium', limit = Infinity;
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--batch-size=')) batchSize = parseInt(a.slice(13), 10);
    else if (a.startsWith('--model=')) model = a.slice(8);
    else if (a.startsWith('--effort=')) effort = a.slice(9);
    else if (a.startsWith('--limit=')) limit = parseInt(a.slice(8), 10);
  }
  return { batchSize, model, effort, limit };
}

function bodyOf(raw) {
  const m = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return (m ? m[1] : raw).trim();
}

const REVIEW_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    findings: {
      type: 'array',
      description: 'Ein Eintrag je gefundenem Problem. Leeres Array = keine Probleme.',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          slug: { type: 'string' },
          type: { type: 'string', enum: ['rechtschreibung', 'grammatik', 'kindgerechtheit', 'trunkierung', 'logik', 'sonstiges'] },
          severity: { type: 'string', enum: ['hoch', 'mittel', 'niedrig'] },
          quote: { type: 'string', description: 'Kurzes wörtliches Zitat der Fehlerstelle (max ~120 Zeichen).' },
          issue: { type: 'string', description: 'Was ist das Problem (Türkisch oder Deutsch, knapp).' },
          suggestion: { type: 'string', description: 'Konkreter Korrekturvorschlag.' },
        },
        required: ['slug', 'type', 'severity', 'quote', 'issue', 'suggestion'],
      },
    },
  },
  required: ['findings'],
};

const SYSTEM = `Du bist ein sorgfältiger Lektor für türkische Kindermärchen (Zielalter 3-9).
Prüfe jedes Märchen streng in drei Richtungen:
1. RECHTSCHREIBUNG & GRAMMATIK (Türkisch): Tippfehler, falsche Suffixe, Groß-/Kleinschreibung, fehlende/falsche türkische Sonderzeichen (ç ğ ı İ ö ş ü), Zeichensetzung, holprige Sätze.
2. KINDGERECHTHEIT: Gewalt, Tod, Verletzung, Angst/Horror, bedrohliche Bilder, negative Stereotype, alles nicht Altersgerechte.
3. TRUNKIERUNG/LOGIK: mitten im Satz abgebrochen, unfertige Handlung, Logikbrüche, geleakte Meta-/Formatartefakte.
Melde NUR echte Probleme. Sprachlich saubere, harmlose Märchen liefern ein leeres findings-Array.
Sei bei Kindgerechtheit besonders wachsam, aber ordne harmlose Motive (Schneeballschlacht, ein Apfel wird mit einem Messer geteilt, sanfte Spannung) NICHT als Problem ein.
Antworte NUR mit dem geforderten JSON.`;

function extractJson(msg) {
  if (msg.stop_reason === 'refusal') throw new Error('refusal');
  const text = msg.content.find((b) => b.type === 'text');
  if (!text) throw new Error('no text block');
  return JSON.parse(text.text);
}

async function reviewBatch(client, opts, batch) {
  const joined = batch.map((s) => `### slug: ${s.slug}\n${s.body}`).join('\n\n---\n\n');
  const msg = await client.messages.create({
    model: opts.model, max_tokens: 8000, thinking: { type: 'adaptive' },
    output_config: { effort: opts.effort, format: { type: 'json_schema', schema: REVIEW_SCHEMA } },
    system: SYSTEM,
    messages: [{ role: 'user', content: `Prüfe die folgenden ${batch.length} Märchen. Verwende exakt die angegebenen slugs.\n\n${joined}` }],
  });
  return extractJson(msg).findings || [];
}

async function main() {
  const opts = parseArgs();
  if (!process.env.ANTHROPIC_API_KEY) { console.error('Fehlt: ANTHROPIC_API_KEY'); process.exit(1); }
  const client = new Anthropic();

  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md')).slice(0, opts.limit);
  const stories = [];
  for (const f of files) stories.push({ slug: f.replace(/\.md$/, ''), body: bodyOf(await readFile(join(STORIES_DIR, f), 'utf8')) });
  console.log(`Prüfe ${stories.length} Märchen in Batches à ${opts.batchSize} (Modell ${opts.model}) ...`);

  const all = [];
  for (let i = 0; i < stories.length; i += opts.batchSize) {
    const batch = stories.slice(i, i + opts.batchSize);
    try {
      const findings = await reviewBatch(client, opts, batch);
      all.push(...findings);
      process.stdout.write(`  ${Math.min(i + opts.batchSize, stories.length)}/${stories.length} — ${all.length} Funde\r`);
    } catch (e) { console.warn(`\n  ⚠ Batch ab ${i}: ${e.message}`); }
  }
  console.log('');

  // Report schreiben
  await mkdir(OUT_DIR, { recursive: true });
  const jsonPath = join(OUT_DIR, '.story-review.json');
  await writeFile(jsonPath, JSON.stringify(all, null, 2), 'utf8');

  const order = { hoch: 0, mittel: 1, niedrig: 2 };
  all.sort((a, b) => (order[a.severity] - order[b.severity]) || a.type.localeCompare(b.type));
  const byType = all.reduce((m, f) => ((m[f.type] = (m[f.type] || 0) + 1), m), {});
  let md = `# Märchen-Lektorat (LLM-Lesepass)\n\nGeprüft: ${stories.length} Märchen. Funde: ${all.length}.\n\n`;
  md += `**Nach Typ:** ${Object.entries(byType).map(([k, v]) => `${k}: ${v}`).join(' · ')}\n\n`;
  for (const sev of ['hoch', 'mittel', 'niedrig']) {
    const group = all.filter((f) => f.severity === sev);
    if (!group.length) continue;
    md += `## Severity: ${sev} (${group.length})\n\n`;
    for (const f of group) {
      md += `- **${f.slug}** — _${f.type}_\n  - Stelle: \`${(f.quote || '').replace(/`/g, "'")}\`\n  - Problem: ${f.issue}\n  - Vorschlag: ${f.suggestion}\n`;
    }
    md += '\n';
  }
  const mdPath = join(OUT_DIR, '.story-review.md');
  await writeFile(mdPath, md, 'utf8');
  console.log(`Report: ${mdPath}\nJSON:   ${jsonPath}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
