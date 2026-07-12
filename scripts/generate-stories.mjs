// Märchen-Generator für MasalNova (Anthropic API).
//
// Beispiele:
//   ANTHROPIC_API_KEY=sk-... node scripts/generate-stories.mjs --per=5            # Validierung: 5/Kategorie
//   ANTHROPIC_API_KEY=sk-... node scripts/generate-stories.mjs --target=100       # bis 100/Kategorie auffüllen
//   ... --category=keloglan --model=claude-sonnet-5 --batch
//
// Flags:
//   --per=N        genau N neue Märchen je Kategorie erzeugen
//   --target=N     je Kategorie bis auf N Märchen AUFFÜLLEN (idempotent)
//   --category=key nur eine Kategorie (default: alle)
//   --model=ID     default claude-opus-4-8
//   --effort=      low|medium|high (default medium)
//   --concurrency= parallele Anfragen im Sync-Modus (default 4)
//   --batch        Batches API statt Sync (50% günstiger, asynchron)
//   --dry-run      nichts schreiben, nur zeigen was generiert würde
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import {
  CATEGORIES, SYSTEM_PROMPT, STORY_SCHEMA, makeSeed, buildUserPrompt,
  slugify, wordCount, readingTimeFor, coverColorFor, fallbackEmojiFor,
} from './lib/story-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = join(__dirname, '..', 'src', 'content', 'stories');

function parseArgs() {
  const a = Object.fromEntries(
    process.argv.slice(2).map((s) => {
      const [k, v] = s.replace(/^--/, '').split('=');
      return [k, v === undefined ? true : v];
    })
  );
  return {
    per: a.per ? parseInt(a.per, 10) : null,
    target: a.target ? parseInt(a.target, 10) : null,
    category: a.category || 'all',
    model: a.model || 'claude-opus-4-8',
    effort: a.effort || 'medium',
    concurrency: a.concurrency ? parseInt(a.concurrency, 10) : 4,
    batch: !!a.batch,
    dryRun: !!a['dry-run'],
  };
}

async function loadExisting() {
  await mkdir(STORIES_DIR, { recursive: true });
  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md'));
  const slugs = new Set(files.map((f) => f.replace(/\.md$/, '')));
  const titles = [];
  const countByCat = {};
  for (const f of files) {
    const src = await readFile(join(STORIES_DIR, f), 'utf8');
    const t = src.match(/^title:\s*"?(.+?)"?\s*$/m);
    if (t) titles.push(t[1]);
    const cats = src.match(/^categories:\s*(\[.*\])\s*$/m);
    if (cats) {
      try {
        for (const c of JSON.parse(cats[1].replace(/'/g, '"'))) countByCat[c] = (countByCat[c] || 0) + 1;
      } catch {}
    }
  }
  return { slugs, titles, countByCat };
}

function uniqueSlug(base, slugs) {
  let s = base || 'masal';
  let i = 2;
  while (slugs.has(s)) s = `${base}-${i++}`;
  slugs.add(s);
  return s;
}

function toFrontmatter(fields) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fields)) lines.push(`${k}: ${JSON.stringify(v)}`);
  lines.push('---', '');
  return lines.join('\n');
}

function buildStoryFile({ categoryKey, seed, model, data, slugs }) {
  // trim + entferne vereinzelte, unpaarige ** am Textende (Markdown-Artefakt)
  const body = (data.body || '').trim().replace(/[*\s]+$/, '');
  const words = wordCount(body);
  const slug = uniqueSlug(slugify(data.title), slugs);
  const fm = toFrontmatter({
    title: data.title,
    shortDescription: data.shortDescription,
    coverEmoji: data.coverEmoji || fallbackEmojiFor(categoryKey),
    coverColor: coverColorFor(categoryKey),
    ageGroups: [seed.age],
    readingTime: readingTimeFor(words),
    categories: [categoryKey],
    themes: (data.themes || []).slice(0, 3),
    characters: (data.characters || []).slice(0, 3),
    publishedAt: new Date().toISOString().slice(0, 10),
  });
  return { slug, words, content: fm + body + '\n' };
}

function requestParamsFor(categoryKey, seed, usedTitles, { model, effort }) {
  return {
    model,
    max_tokens: 8000,
    thinking: { type: 'adaptive' },
    output_config: { effort, format: { type: 'json_schema', schema: STORY_SCHEMA } },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt({ categoryKey, seed, wordRange: CATEGORIES[categoryKey].words, usedTitles }) }],
  };
}

function extractJson(msg) {
  if (msg.stop_reason === 'refusal') throw new Error('refusal');
  const text = msg.content.find((b) => b.type === 'text');
  if (!text) throw new Error('no text block');
  return JSON.parse(text.text);
}

// ---- Sync-Modus (mit Wortzahl-Regeneration) ----
async function generateOneSync(client, categoryKey, usedTitles, opts) {
  const [minW, maxW] = CATEGORIES[categoryKey].words;
  let best = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const seed = makeSeed(categoryKey);
    const msg = await client.messages.create(requestParamsFor(categoryKey, seed, usedTitles, opts));
    const data = extractJson(msg);
    const w = wordCount((data.body || '').trim());
    const candidate = { seed, data, w };
    if (w >= minW && w <= maxW) return candidate;
    if (!best || Math.abs(w - (minW + maxW) / 2) < Math.abs(best.w - (minW + maxW) / 2)) best = candidate;
  }
  return best; // beste Näherung nach 3 Versuchen
}

async function runSync(client, plan, opts, state) {
  let done = 0;
  const total = plan.reduce((n, p) => n + p.n, 0);
  for (const { categoryKey, n } of plan) {
    let made = 0;
    while (made < n) {
      const batch = Math.min(opts.concurrency, n - made);
      const results = await Promise.allSettled(
        Array.from({ length: batch }, () => generateOneSync(client, categoryKey, state.titles, opts))
      );
      for (const r of results) {
        made++; done++;
        if (r.status !== 'fulfilled' || !r.value) { console.warn(`  ⚠ ${categoryKey}: Fehler/leer übersprungen`); continue; }
        const { seed, data, w } = r.value;
        state.titles.push(data.title);
        const file = buildStoryFile({ categoryKey, seed, model: opts.model, data, slugs: state.slugs });
        const [minW, maxW] = CATEGORIES[categoryKey].words;
        const flag = w >= minW && w <= maxW ? '✓' : `~${w}W`;
        if (opts.dryRun) console.log(`  [dry] ${categoryKey}/${file.slug} (${w}W) ${flag}`);
        else { await writeFile(join(STORIES_DIR, `${file.slug}.md`), file.content, 'utf8'); console.log(`  [${done}/${total}] ${categoryKey}/${file.slug} (${w}W) ${flag}`); }
      }
    }
  }
}

// ---- Batch-Modus ----
async function runBatch(client, plan, opts, state) {
  const requests = [];
  for (const { categoryKey, n } of plan) {
    for (let i = 0; i < n; i++) {
      const seed = makeSeed(categoryKey);
      requests.push({ custom_id: `${categoryKey}-${i}-${Math.random().toString(36).slice(2, 8)}`, _categoryKey: categoryKey, _seed: seed,
        params: requestParamsFor(categoryKey, seed, state.titles, opts) });
    }
  }
  const meta = new Map(requests.map((r) => [r.custom_id, { categoryKey: r._categoryKey, seed: r._seed }]));
  const wire = requests.map((r) => ({ custom_id: r.custom_id, params: r.params }));
  console.log(`Batch mit ${wire.length} Anfragen wird erstellt ...`);
  const batch = await client.messages.batches.create({ requests: wire });
  console.log(`Batch-ID: ${batch.id} — warte auf Fertigstellung (kann bis zu 1h dauern) ...`);
  let b = batch;
  while (b.processing_status !== 'ended') {
    await new Promise((res) => setTimeout(res, 20000));
    b = await client.messages.batches.retrieve(batch.id);
    process.stdout.write(`  status=${b.processing_status} ok=${b.request_counts.succeeded} err=${b.request_counts.errored}\r`);
  }
  console.log('\nBatch fertig, schreibe Ergebnisse ...');
  let written = 0, off = 0;
  for await (const res of await client.messages.batches.results(batch.id)) {
    if (res.result.type !== 'succeeded') { console.warn(`  ⚠ ${res.custom_id}: ${res.result.type}`); continue; }
    const m = meta.get(res.custom_id);
    let data;
    try { data = extractJson(res.result.message); } catch (e) { console.warn(`  ⚠ ${res.custom_id}: ${e.message}`); continue; }
    state.titles.push(data.title);
    const file = buildStoryFile({ categoryKey: m.categoryKey, seed: m.seed, model: opts.model, data, slugs: state.slugs });
    const [minW, maxW] = CATEGORIES[m.categoryKey].words;
    if (file.words < minW || file.words > maxW) off++;
    if (!opts.dryRun) await writeFile(join(STORIES_DIR, `${file.slug}.md`), file.content, 'utf8');
    written++;
  }
  console.log(`Geschrieben: ${written} (davon ${off} außerhalb der Wortzahl — ggf. erneut laufen lassen)`);
}

async function main() {
  const opts = parseArgs();
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Fehlt: ANTHROPIC_API_KEY. Beispiel: ANTHROPIC_API_KEY=sk-... node scripts/generate-stories.mjs --per=5');
    process.exit(1);
  }
  if (!opts.per && !opts.target) { console.error('Bitte --per=N oder --target=N angeben.'); process.exit(1); }
  const client = new Anthropic();
  const keys = opts.category === 'all' ? Object.keys(CATEGORIES) : [opts.category];
  const existing = await loadExisting();
  const state = { slugs: existing.slugs, titles: [...existing.titles] };

  const plan = keys.map((categoryKey) => {
    const have = existing.countByCat[categoryKey] || 0;
    const n = opts.per != null ? opts.per : Math.max(0, opts.target - have);
    return { categoryKey, have, n };
  }).filter((p) => p.n > 0);

  console.log(`Modell: ${opts.model} | effort: ${opts.effort} | Modus: ${opts.batch ? 'batch' : 'sync'}${opts.dryRun ? ' | DRY-RUN' : ''}`);
  for (const p of plan) console.log(`  ${p.categoryKey}: habe ${p.have}, erzeuge ${p.n}`);
  if (!plan.length) { console.log('Nichts zu tun (Ziel bereits erreicht).'); return; }

  if (opts.batch) await runBatch(client, plan, opts, state);
  else await runSync(client, plan, opts, state);
  console.log('Fertig.');
}

main().catch((e) => { console.error(e); process.exit(1); });
