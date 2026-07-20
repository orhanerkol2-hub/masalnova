// Generates premium MasalNova story covers with the OpenAI Images API.
//
// Safety defaults:
// - Reads the API key only from OPENAI_API_KEY or a local ignored .env.local.
// - Does not print secrets.
// - Defaults to a 5-image pilot. Use --all only after reviewing the pilot.
// - Targets only the covers introduced by the known placeholder commit unless
//   --slugs is supplied.
//
// Examples:
//   OPENAI_API_KEY=... node scripts/generate-premium-cover-images.mjs --limit=5
//   node scripts/generate-premium-cover-images.mjs --limit=5 --reference=/path/to/style.png
//   node scripts/generate-premium-cover-images.mjs --all-stories --quality=medium --final-width=1024
import { appendFile, mkdir, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'src', 'content', 'stories');
const COVER_DIR = join(ROOT, 'public', 'covers', 'stories');
const RUN_DIR = join(ROOT, 'cover-production');
const PLACEHOLDER_COMMIT = 'ef59bbd';

const IMAGE_ENDPOINT = 'https://api.openai.com/v1/images/generations';
const EDIT_ENDPOINT = 'https://api.openai.com/v1/images/edits';
const DEFAULT_MODEL = 'gpt-image-1';
const DEFAULT_SIZE = '1536x1024';
const DEFAULT_QUALITY = 'medium';
const DEFAULT_FINAL_WIDTH = 1024;
const DEFAULT_WEBP_QUALITY = 84;

const TR_MAP = {
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ı: 'i',
  İ: 'i',
  ö: 'o',
  Ö: 'o',
  ş: 's',
  Ş: 's',
  ü: 'u',
  Ü: 'u',
  â: 'a',
  î: 'i',
  û: 'u',
};

const SCENE_HINTS = [
  ['deniz feneri', 'a cozy seaside lighthouse with turquoise water and rounded stones'],
  ['deniz', 'a warm seaside village with turquoise water and soft golden light'],
  ['göl', 'a calm lake with clear reflections, reeds, and gentle hills'],
  ['orman', 'a friendly green forest with sunbeams through detailed leaves'],
  ['saray', 'a luminous fairy-tale palace courtyard with Turkish ornamental warmth'],
  ['kale', 'a rounded fairy-tale castle gate with warm stone and flowers'],
  ['değirmen', 'an old village mill with wood, wheat, and glowing window light'],
  ['çarşı', 'a colorful village market with fabric stalls and warm lanterns'],
  ['pazar', 'a colorful village market with fruit baskets and soft fabric stalls'],
  ['bahçe', 'a blooming garden with flowers, butterflies, and rich greenery'],
  ['çiçek', 'a blooming garden with flowers, butterflies, and rich greenery'],
  ['karlı', 'a bright snowy forest or village with cozy blue shadows and golden highlights'],
  ['kar', 'a bright snowy forest or village with cozy blue shadows and golden highlights'],
  ['yağmur', 'a gentle rainy evening with glowing windows and reflective puddles'],
  ['pınar', 'a cool spring beside smooth stones, flowers, and fresh grass'],
  ['fırın', 'a cozy village bakery with warm bread, flour dust, and amber light'],
  ['ekmek', 'a cozy village bakery with warm bread, flour dust, and amber light'],
  ['tarla', 'a golden wheat field with a clear horizon and warm sunset glow'],
  ['başak', 'a golden wheat field with a clear horizon and warm sunset glow'],
  ['dağ', 'a gentle mountain path with a small hut and soft clouds'],
  ['kulübe', 'a gentle mountain path with a small hut and soft clouds'],
  ['mağara', 'a magical but friendly glowing cave entrance with moss and fireflies'],
  ['ay ışığı', 'a moonlit path with a clear crescent moon, stars, and soft blue light'],
  ['yıldız', 'a dreamy night sky with oversized warm stars above a village path'],
];

const HUMAN_ARCHETYPES = [
  {
    keys: ['keloğlan', 'keloglan'],
    visual:
      'Keloğlan: a kind Turkish boy around age 8, bald head, round expressive face, warm tan skin, cream shirt, red vest, blue şalvar trousers, simple sandals, clever curious smile.',
  },
  {
    keys: ['nine', 'teyze'],
    visual:
      'Grandmother: elderly Turkish woman with kind eyes, soft wrinkles, lavender headscarf, teal cardigan, patterned skirt, gentle caring posture.',
  },
  {
    keys: ['dede', 'amca'],
    visual:
      'Grandfather: elderly Turkish man with white moustache, kind eyes, navy vest over cream shirt, soft brown trousers, calm trustworthy expression.',
  },
  {
    keys: ['çoban', 'coban'],
    visual:
      'Shepherd: Turkish shepherd with beige wool vest, green sash, simple cap, wooden staff, gentle confident expression.',
  },
  {
    keys: ['balıkçı', 'balikci'],
    visual:
      'Fisherman: friendly Turkish fisherman with short dark beard, rolled blue sleeves, ochre vest, fishing basket or net, sea-worn warm expression.',
  },
  {
    keys: ['bahçıvan', 'bahcivan'],
    visual:
      'Gardener: smiling Turkish gardener with olive apron, rolled sleeves, straw hat, seed pouch, caring hands.',
  },
  {
    keys: ['fırıncı', 'firinci', 'simitçi', 'simitci'],
    visual:
      'Baker: warm village baker with white apron, rolled sleeves, flour-dusted hands, soft round face, golden bakery light.',
  },
  {
    keys: ['dev'],
    visual:
      'Gentle giant: very tall friendly giant with soft round face, warm brown hair, patched green vest, huge gentle hands, shy smile, never frightening.',
  },
  {
    keys: ['padişah', 'padisah', 'sultan'],
    visual:
      'Ruler: kindly fairy-tale ruler with neat gray beard, deep teal robe with gold trim, simple rounded crown, dignified but child-friendly.',
  },
  {
    keys: ['elif', 'deniz', 'defne', 'zeynep', 'mert', 'kaan', 'azra', 'ela', 'barış', 'baris', 'batu', 'umut', 'onur', 'çocuk', 'cocuk'],
    visual:
      'Child protagonist: Turkish child age 6-8, large curious eyes, expressive rounded face, simple village clothes with one vivid color accent.',
  },
];

const ANIMALS = [
  ['tavşan', 'tavsan', 'rabbit with big ears, white muzzle, tiny blue neckerchief'],
  ['tilki', 'fox with orange fur, cream chest, clever but friendly eyes'],
  ['aslan', 'lion with golden mane, rounded child-friendly face, thoughtful eyes, no aggression'],
  ['ayı', 'ayi', 'bear with cinnamon fur, soft round paws, gentle smile'],
  ['kaplumbağa', 'kaplumbaga', 'turtle with moss-green shell and patient eyes'],
  ['kuş', 'kus', 'small bird with blue wings and bright round eyes'],
  ['martı', 'marti', 'seagull with soft white feathers, gray wing tips, friendly bright eyes'],
  ['serçe', 'serce', 'sparrow with soft brown feathers and bright round eyes'],
  ['karınca', 'karinca', 'small ant with warm brown body and expressive friendly face'],
  ['fil', 'elephant with soft gray-blue skin, big ears, kind eyes'],
  ['kedi', 'cat with cream fur, amber patches, curious eyes'],
  ['köpek', 'kopek', 'dog with tan fur, floppy ears, loyal expression'],
  ['kirpi', 'hedgehog with soft rounded spines and shy smile'],
  ['baykuş', 'baykus', 'owl with large wise eyes and warm brown feathers'],
  ['sincap', 'squirrel with reddish tail, tiny green scarf, energetic pose'],
  ['kelebek', 'butterfly with teal and yellow wings, delicate but readable'],
  ['arı', 'ari', 'bee with golden stripes, tiny satchel, friendly face'],
  ['kuzu', 'lamb with fluffy white wool, pink cheeks, gentle eyes'],
  ['horoz', 'rooster with red comb, proud chest, bright feathers'],
  ['ördek', 'ordek', 'duck with yellow beak, soft white feathers, cheerful eyes'],
];

function parseArgs() {
  const raw = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, ...rest] = arg.replace(/^--/, '').split('=');
      return [key, rest.length ? rest.join('=') : true];
    })
  );
  const slugs = raw.slugs ? String(raw.slugs).split(',').map((s) => s.trim()).filter(Boolean) : null;
  const all = Boolean(raw.all);
  const finalWidth = Number(raw['final-width'] || DEFAULT_FINAL_WIDTH);
  return {
    all,
    allStories: Boolean(raw['all-stories']),
    resume: Boolean(raw.resume),
    continueOnError: Boolean(raw['continue-on-error']),
    dryRun: Boolean(raw['dry-run']),
    force: Boolean(raw.force),
    limit: all ? null : Number(raw.limit || 5),
    slugs,
    model: String(raw.model || DEFAULT_MODEL),
    size: String(raw.size || DEFAULT_SIZE),
    quality: String(raw.quality || DEFAULT_QUALITY),
    concurrency: Math.max(1, Number(raw.concurrency || 1)),
    finalWidth,
    finalHeight: Math.round(finalWidth * 0.625),
    webpQuality: Number(raw['webp-quality'] || DEFAULT_WEBP_QUALITY),
    reference: raw.reference ? resolve(ROOT, String(raw.reference)) : null,
    fromCommit: String(raw['from-commit'] || PLACEHOLDER_COMMIT),
  };
}

async function loadDotEnvLocal() {
  const file = join(ROOT, '.env.local');
  if (!existsSync(file) || process.env.OPENAI_API_KEY) return;
  const src = await readFile(file, 'utf8');
  const line = src
    .split('\n')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith('OPENAI_API_KEY='));
  if (!line) return;
  process.env.OPENAI_API_KEY = line.slice('OPENAI_API_KEY='.length).replace(/^['"]|['"]$/g, '');
}

function normalize(input) {
  return String(input || '')
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase();
}

function hasTerm(input, term) {
  return normalize(input).includes(normalize(term));
}

function splitFrontmatter(src, file) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  return { frontmatter: match[1], body: match[2] || '' };
}

function parseValue(raw) {
  const value = raw.trim();
  if (!value) return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || value.startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.replace(/^"|"$/g, '');
    }
  }
  return value.replace(/^"|"$/g, '');
}

function parseFrontmatter(block) {
  const data = {};
  for (const line of block.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (match) data[match[1]] = parseValue(match[2]);
  }
  return data;
}

function cleanText(text) {
  return String(text || '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max) {
  const clean = cleanText(text);
  return clean.length > max ? `${clean.slice(0, max).replace(/\s+\S*$/, '')}...` : clean;
}

function inferScene(story) {
  const source = `${story.title} ${story.shortDescription} ${story.body.slice(0, 1200)}`;
  for (const [needle, scene] of SCENE_HINTS) {
    if (hasTerm(source, needle)) return scene;
  }
  if (story.categories.includes('uyku')) return 'a calm bedtime scene with moonlight, soft clouds, and cozy village rooftops';
  if (story.categories.includes('hayvan')) return 'a friendly natural setting with rich plants, warm sky, and readable foreground';
  if (story.categories.includes('keloglan')) return 'a warm Anatolian village path with rolling hills and a fairy-tale horizon';
  return 'a warm Turkish village fairy-tale setting with one clear focal place';
}

function describeCharacter(name, story) {
  const source = String(name || '').trim() || `${story.title} ${story.shortDescription}`;
  const animal = ANIMALS.find((entry) => entry.slice(0, -1).some((key) => hasTerm(source, key)));
  if (animal) return `${name}: ${animal.at(-1)}.`;
  const human = HUMAN_ARCHETYPES.find((entry) => entry.keys.some((key) => hasTerm(source, key)));
  if (human) return `${name}: ${human.visual}`;
  return `${name}: unique child-friendly fairy-tale character with large readable eyes, rounded shapes, a kind expression, and one memorable color accent.`;
}

function leadCharacters(story) {
  if (Array.isArray(story.characters) && story.characters.length) return story.characters.slice(0, 3);
  return [story.title.split(/\s+(ile|ve)\s+/i)[0]].filter(Boolean);
}

function buildPrompt(story, hasReference) {
  const characters = leadCharacters(story);
  const characterLines = characters.map((name) => `- ${describeCharacter(name, story)}`).join('\n');
  const scene = inferScene(story);
  const themes = Array.isArray(story.themes) && story.themes.length ? story.themes.join(', ') : 'kindness, curiosity, warmth';
  const referenceLine = hasReference
    ? 'Use the attached MasalNova screenshot only as a style reference for premium polish, character warmth, lighting, and thumbnail readability. Do not reproduce the UI card, badges, borders, or text.'
    : 'Match the existing MasalNova premium card-cover family: polished, cinematic, richly detailed, expressive, warm, and immediately readable as a story thumbnail.';

  return `Create one premium landscape cover illustration for a Turkish children's fairy tale.

${referenceLine}

Story title: ${story.title}
Story summary: ${story.shortDescription}
Themes: ${themes}
Story excerpt for accuracy: ${truncate(story.body, 700)}
Scene / backdrop: ${scene}

Main characters:
${characterLines}

Visual style: high-end animated children's book illustration, polished 3D storybook look, cinematic warm light, rich hand-crafted detail, expressive rounded faces, soft fur/cloth/leaf textures, vivid but tasteful colors, strong depth, magical Turkish fairy-tale atmosphere.

Composition: 16:10 landscape cover, one decisive story moment, two or three main characters max, large readable faces and eyes, foreground subjects fill about 60% of the frame, clear silhouette, premium card thumbnail readability, leave top-left and top-right corners free of important details for website badges.

Mood: joyful, safe, gentle, wonder-filled, emotionally inviting for children age 3-9.

Hard constraints: no text, no title, no letters, no logo, no watermark, no border, no UI, no book mockup, no speech bubbles, no scary darkness, no weapons, no injury, no aggressive expressions, no photorealism, no flat vector icon style, no cheap clipart, no generic stock look, no distorted hands/eyes/faces.`;
}

function buildFallbackPrompt(story) {
  return `Create one safe, premium landscape cover illustration for a Turkish children's fairy tale website card.

Show a gentle, joyful fairy-tale moment with friendly child-safe animal or village characters in a warm Turkish village or friendly nature setting. Use a polished 3D animated children's book look, expressive rounded faces, warm cinematic light, vivid but tasteful colors, and clear thumbnail readability.

Composition: 16:10 landscape cover, two or three friendly characters maximum, large readable faces, no title text and no UI.

Safety and output constraints: child-safe, peaceful, kind, no scary content, no danger, no injury, no weapons, no text, no letters, no logo, no watermark, no border, no distorted hands, eyes, or faces.`;
}

async function loadStories() {
  const files = (await readdir(STORIES_DIR)).filter((file) => file.endsWith('.md')).sort();
  const stories = new Map();
  for (const file of files) {
    const slug = basename(file, '.md');
    const src = await readFile(join(STORIES_DIR, file), 'utf8');
    const { frontmatter, body } = splitFrontmatter(src, file);
    const data = parseFrontmatter(frontmatter);
    stories.set(slug, {
      slug,
      file,
      title: data.title || slug,
      shortDescription: data.shortDescription || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      themes: Array.isArray(data.themes) ? data.themes : [],
      characters: Array.isArray(data.characters) ? data.characters : [],
      body,
    });
  }
  return stories;
}

function placeholderSlugsFromCommit(commit) {
  const output = execFileSync('git', ['show', '--name-only', '--format=', commit, '--', 'public/covers/stories'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.endsWith('.webp'))
    .map((line) => basename(line, '.webp'))
    .sort();
}

async function apiRequest(url, body, apiKey, multipart = false) {
  const headers = { Authorization: `Bearer ${apiKey}` };
  if (!multipart) headers['Content-Type'] = 'application/json';
  const requestBody = multipart ? body : JSON.stringify(body);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: requestBody,
      });
    } catch (error) {
      if (attempt < 7) {
        const waitMs = retryDelayMs(error.message, attempt);
        console.log(`Network request failed; waiting ${Math.round(waitMs / 1000)}s before retry.`);
        await sleep(waitMs);
        continue;
      }
      throw error;
    }
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
    if (response.ok) return json;
    const message = json?.error?.message || json?.raw || `HTTP ${response.status}`;
    if (/rate limit/i.test(message) && attempt < 7) {
      const waitMs = retryDelayMs(message, attempt);
      console.log(`Rate limit hit; waiting ${Math.round(waitMs / 1000)}s before retry.`);
      await sleep(waitMs);
      continue;
    }
    throw new Error(message);
  }
  throw new Error('API request failed after retries.');
}

function isSafetyError(error) {
  return /safety system|rejected|moderation|policy/i.test(error?.message || '');
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function retryDelayMs(message, attempt) {
  const match = String(message || '').match(/try again in\s+(\d+)s/i);
  if (match) return (Number(match[1]) + 2) * 1000;
  return Math.min(60000, (attempt + 1) * 15000);
}

async function generateImageBuffer({ prompt, opts, apiKey }) {
  const referenceExists = opts.reference && existsSync(opts.reference);
  let json;
  if (referenceExists) {
    const form = new FormData();
    const referenceBytes = await readFile(opts.reference);
    const referenceType = opts.reference.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    form.append('model', opts.model);
    form.append('prompt', prompt);
    form.append('size', opts.size);
    form.append('quality', opts.quality);
    form.append('output_format', 'webp');
    form.append('image[]', new Blob([referenceBytes], { type: referenceType }), basename(opts.reference));
    json = await apiRequest(EDIT_ENDPOINT, form, apiKey, true);
  } else {
    json = await apiRequest(
      IMAGE_ENDPOINT,
      {
        model: opts.model,
        prompt,
        size: opts.size,
        quality: opts.quality,
        output_format: 'webp',
      },
      apiKey
    );
  }

  const item = json?.data?.[0];
  if (!item) throw new Error('Images API returned no image data.');
  if (item.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) throw new Error(`Could not download generated image: HTTP ${imageResponse.status}`);
    return Buffer.from(await imageResponse.arrayBuffer());
  }
  throw new Error('Images API response had neither b64_json nor url.');
}

async function generateWithFallback({ story, prompt, opts, apiKey }) {
  try {
    return await generateImageBuffer({ prompt, opts, apiKey });
  } catch (error) {
    if (!isSafetyError(error)) throw error;
    console.log(`Safety retry with simplified prompt for ${story.slug}`);
    return generateImageBuffer({ prompt: buildFallbackPrompt(story), opts, apiKey });
  }
}

async function readCompletedSlugs(logPath) {
  try {
    const src = await readFile(logPath, 'utf8');
    return new Set(
      src
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter((entry) => entry?.status === 'ok')
        .map((entry) => entry.slug)
    );
  } catch {
    return new Set();
  }
}

async function hasUsableCover(slug) {
  try {
    const info = await stat(join(COVER_DIR, `${slug}.webp`));
    return info.size > 60000;
  } catch {
    return false;
  }
}

async function saveCover(buffer, slug, opts) {
  const tmp = join(COVER_DIR, `${slug}.webp.tmp`);
  const out = join(COVER_DIR, `${slug}.webp`);
  try {
    const sharp = (await import('sharp')).default;
    await sharp(buffer)
      .resize(opts.finalWidth, opts.finalHeight, { fit: 'cover', position: 'center' })
      .webp({ quality: opts.webpQuality, smartSubsample: true })
      .toFile(tmp);
  } catch {
    // If sharp is not available on the local machine, keep the API-generated
    // WebP as-is. The card component crops safely via CSS.
    await writeFile(tmp, buffer);
  }
  await rename(tmp, out);
}

async function main() {
  const opts = parseArgs();
  await mkdir(RUN_DIR, { recursive: true });
  await mkdir(COVER_DIR, { recursive: true });
  await loadDotEnvLocal();
  const apiKey = process.env.OPENAI_API_KEY;

  const stories = await loadStories();
  const targetSlugs = opts.slugs || (opts.allStories ? [...stories.keys()].sort() : placeholderSlugsFromCommit(opts.fromCommit));
  const selected = targetSlugs
    .filter((slug) => stories.has(slug))
    .slice(0, opts.limit ?? undefined)
    .map((slug) => stories.get(slug));

  if (!selected.length) {
    console.log('No matching stories selected.');
    return;
  }

  const promptsPath = join(RUN_DIR, 'premium-cover-prompts.jsonl');
  const logPath = join(RUN_DIR, 'premium-cover-run.jsonl');
  const completedSlugs = opts.resume ? await readCompletedSlugs(logPath) : new Set();

  if (opts.dryRun) {
    await writeFile(
      promptsPath,
      selected.map((story) => JSON.stringify({ slug: story.slug, title: story.title, prompt: buildPrompt(story, Boolean(opts.reference)) })).join('\n') + '\n',
      'utf8'
    );
    console.log(`Dry run: wrote ${selected.length} prompts to cover-production/premium-cover-prompts.jsonl`);
    return;
  }

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing. Set it in your shell or in ignored .env.local before running this script.');
  }

  console.log(`Generating ${selected.length} premium cover image(s) with ${opts.model}, ${opts.quality}, ${opts.size}.`);
  console.log(`Final assets: ${opts.finalWidth}x${opts.finalHeight} WebP, quality ${opts.webpQuality}.`);
  if (opts.reference) {
    console.log(existsSync(opts.reference) ? `Using style reference image: ${opts.reference}` : `Reference image not found, continuing without it: ${opts.reference}`);
  }
  console.log('API key loaded. Secret value will not be printed.');

  let nextIndex = 0;
  async function processNext() {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= selected.length) return;
    const story = selected[index];
    if (completedSlugs.has(story.slug)) {
      console.log(`[${index + 1}/${selected.length}] ${story.slug} — skipping completed from previous run`);
      return processNext();
    }
    if (!opts.force && (await hasUsableCover(story.slug))) {
      console.log(`[${index + 1}/${selected.length}] ${story.slug} — skipping existing usable cover`);
      await appendFile(
        logPath,
        JSON.stringify({ slug: story.slug, title: story.title, status: 'skipped-existing', startedAt: new Date().toISOString(), finishedAt: new Date().toISOString() }) + '\n',
        'utf8'
      );
      return processNext();
    }
    const prompt = buildPrompt(story, Boolean(opts.reference && existsSync(opts.reference)));
    const startedAt = new Date().toISOString();
    try {
      console.log(`[${index + 1}/${selected.length}] ${story.slug} — ${story.title}`);
      const buffer = await generateWithFallback({ story, prompt, opts, apiKey });
      await saveCover(buffer, story.slug, opts);
      await appendFile(
        logPath,
        JSON.stringify({
          slug: story.slug,
          title: story.title,
          status: 'ok',
          model: opts.model,
          quality: opts.quality,
          size: opts.size,
          finalWidth: opts.finalWidth,
          finalHeight: opts.finalHeight,
          webpQuality: opts.webpQuality,
          startedAt,
          finishedAt: new Date().toISOString(),
        }) + '\n',
        'utf8'
      );
    } catch (error) {
      await appendFile(
        logPath,
        JSON.stringify({ slug: story.slug, title: story.title, status: 'error', error: error.message, model: opts.model, startedAt, finishedAt: new Date().toISOString() }) + '\n',
        'utf8'
      );
      if (opts.continueOnError) {
        console.log(`Error for ${story.slug}; continuing because --continue-on-error is set.`);
        return processNext();
      }
      throw error;
    }
    return processNext();
  }

  await Promise.all(Array.from({ length: Math.min(opts.concurrency, selected.length) }, () => processNext()));

  console.log(`Done. Run log: cover-production/premium-cover-run.jsonl`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
