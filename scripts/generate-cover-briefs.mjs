// Generates story-tailored cover prompts for MasalNova.
//
// Output:
//   cover-production/story-cover-prompts.jsonl
//   cover-production/story-cover-prompts.csv
//   cover-production/story-cover-manifest.json
//   cover-production/character-bible.md
//   cover-production/coverage-report.md
//
// Examples:
//   node scripts/generate-cover-briefs.mjs
//   node scripts/generate-cover-briefs.mjs --limit=20
//   node scripts/generate-cover-briefs.mjs --category=keloglan
//   node scripts/generate-cover-briefs.mjs --missing-only
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';
import { CATEGORIES } from './lib/story-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'src', 'content', 'stories');
const DEFAULT_OUT_DIR = join(ROOT, 'cover-production');
const COVER_PUBLIC_DIR = join(ROOT, 'public', 'covers', 'stories');

function parseArgs() {
  const raw = Object.fromEntries(
    process.argv.slice(2).map((s) => {
      const [key, ...rest] = s.replace(/^--/, '').split('=');
      return [key, rest.length ? rest.join('=') : true];
    })
  );
  return {
    limit: raw.limit ? parseInt(raw.limit, 10) : null,
    category: raw.category || null,
    missingOnly: !!raw['missing-only'],
    outDir: raw.out ? join(ROOT, raw.out) : DEFAULT_OUT_DIR,
  };
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
    if (!match) continue;
    data[match[1]] = parseValue(match[2]);
  }
  return data;
}

function cleanText(text) {
  return (text || '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max) {
  const clean = cleanText(text);
  return clean.length > max ? `${clean.slice(0, max).replace(/\s+\S*$/, '')}...` : clean;
}

function hashString(input) {
  let h = 2166136261;
  for (const ch of input) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

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

function normalizeForMatch(input) {
  return String(input || '')
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase();
}

function hasTerm(input, term) {
  const text = normalizeForMatch(input);
  const normalizedTerm = normalizeForMatch(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const suffix = '(lar|ler|i|u|a|e|da|de|ta|te|dan|den|tan|ten|in|un|nin|nun|miz|muz)?';
  return new RegExp(`(^|[^a-z0-9])${normalizedTerm}${suffix}([^a-z0-9]|$)`).test(text);
}

const SCENE_HINTS = [
  ['göl', 'a calm lake with clear reflections and soft reeds'],
  ['deniz kıyısı', 'a warm seaside with turquoise water and rounded stones'],
  ['deniz kiyisi', 'a warm seaside with turquoise water and rounded stones'],
  ['deniz feneri', 'a warm seaside with a small lighthouse and rounded stones'],
  ['kumsal', 'a warm beach with turquoise water and rounded stones'],
  ['orman', 'a friendly green forest with sunbeams and simple depth'],
  ['saray', 'a luminous fairy-tale palace courtyard, not too busy'],
  ['değirmen', 'an old village mill with warm wooden details'],
  ['degirmen', 'an old village mill with warm wooden details'],
  ['çarşı', 'a colorful village market with soft fabric stalls'],
  ['carsi', 'a colorful village market with soft fabric stalls'],
  ['bahçe', 'a blooming garden with clear flowers and butterflies'],
  ['bahce', 'a blooming garden with clear flowers and butterflies'],
  ['karlı', 'a bright snowy village scene with cozy light'],
  ['karli', 'a bright snowy village scene with cozy light'],
  ['yağmur', 'a gentle rainy evening with glowing window light'],
  ['yagmur', 'a gentle rainy evening with glowing window light'],
  ['ay ışığı', 'a moonlit path with a clear crescent moon and stars'],
  ['ay isigi', 'a moonlit path with a clear crescent moon and stars'],
  ['pınar', 'a cool spring beside smooth stones and fresh grass'],
  ['pinar', 'a cool spring beside smooth stones and fresh grass'],
  ['fırın', 'a cozy village bakery with warm bread and golden light'],
  ['firin', 'a cozy village bakery with warm bread and golden light'],
  ['tarla', 'a golden wheat field with a clear horizon'],
  ['dağ', 'a gentle mountain path with a small hut in the distance'],
  ['dag', 'a gentle mountain path with a small hut in the distance'],
  ['mağara', 'a friendly glowing cave entrance, magical but not scary'],
  ['magara', 'a friendly glowing cave entrance, magical but not scary'],
  ['yıldız', 'a dreamy night sky with oversized warm stars'],
  ['yildiz', 'a dreamy night sky with oversized warm stars'],
];

const HUMAN_ARCHETYPES = [
  {
    keys: ['keloğlan', 'keloglan'],
    label: 'Keloglan',
    visual:
      'Keloglan: a kind Turkish boy around age 8, bald head, round expressive face, warm tan skin, cream shirt, red vest, blue salvar trousers, simple sandals; curious smile and clever eyes. Keep this exact look whenever Keloglan appears.',
  },
  {
    keys: ['nine', 'ninenin', 'teyze', 'ayşe', 'ayse', 'sevgi'],
    label: 'Nine',
    visual:
      'Nine / grandmother archetype: elderly Turkish woman with soft wrinkles, kind eyes, lavender headscarf, teal cardigan, patterned skirt, gentle posture. Keep her warm and recognizable across stories.',
  },
  {
    keys: ['dede', 'amca'],
    label: 'Dede',
    visual:
      'Dede / grandfather archetype: elderly Turkish man with white moustache, kind eyes, navy vest over a cream shirt, soft brown trousers, small wooden cane. Keep him calm and trustworthy.',
  },
  {
    keys: ['çoban', 'coban'],
    label: 'Coban',
    visual:
      'Shepherd archetype: young Turkish shepherd with tan skin, beige wool vest, green sash, simple cap, wooden staff, gentle confident expression. Keep the same costume family for all shepherd stories.',
  },
  {
    keys: ['dev'],
    label: 'Dev',
    visual:
      'Gentle giant archetype: very tall friendly giant with soft round face, warm brown hair, oversized patched green vest, huge gentle hands, shy smile; clearly kind and never frightening.',
  },
  {
    keys: ['padişah', 'padisah', 'sultan'],
    label: 'Padisah',
    visual:
      'Padişah archetype: kindly fairy-tale ruler with neat gray beard, deep teal robe with gold trim, simple rounded crown, warm thoughtful eyes; dignified but child-friendly.',
  },
  {
    keys: ['ay'],
    label: 'Ay',
    visual:
      'Moon character: soft crescent moon with a calm sleepy face, warm ivory glow, tiny star companions, gentle expression; magical and soothing.',
  },
  {
    keys: ['balıkçı', 'balikci'],
    label: 'Balikci',
    visual:
      'Fisherman archetype: friendly Turkish fisherman with short dark beard, rolled blue sleeves, ochre vest, simple net or fishing basket, sea-worn but warm expression.',
  },
  {
    keys: ['bahçıvan', 'bahcivan'],
    label: 'Bahcivan',
    visual:
      'Gardener archetype: smiling Turkish gardener with olive apron, rolled sleeves, straw hat, small seed pouch, earth-toned clothes and caring hands.',
  },
  {
    keys: ['fırıncı', 'firinci', 'simitçi', 'simitci'],
    label: 'Firinci',
    visual:
      'Baker archetype: warm village baker with white apron, rolled sleeves, flour-dusted hands, soft round face, golden bakery light.',
  },
  {
    keys: ['çocuk', 'cocuk', 'alice', 'kerem', 'elif', 'deniz', 'defne', 'zeynep', 'mert', 'kaan', 'azra', 'ela'],
    label: 'Child',
    visual:
      'Child protagonist archetype: Turkish child age 6-8, bright curious eyes, expressive face, simple modern village clothes with one colorful accent scarf. Keep proportions childlike and readable.',
  },
];

const ANIMAL_VISUALS = [
  ['tavşan', 'tavsan', 'rabbit with big ears, white muzzle, tiny blue neckerchief'],
  ['tilki', 'fox with orange fur, cream chest, clever but friendly eyes'],
  ['aslan', 'lion with golden mane, rounded child-friendly face, no sharp aggression'],
  ['ayı', 'ayi', 'bear with cinnamon fur, soft round paws, gentle smile'],
  ['kaplumbağa', 'kaplumbaga', 'turtle with moss-green shell and patient eyes'],
  ['kuş', 'kus', 'small bird with blue wings and bright round eyes'],
  ['karınca', 'karinca', 'small ant with warm brown body, expressive face, child-friendly proportions'],
  ['fil', 'elephant with soft gray-blue skin, big ears, kind eyes'],
  ['kedi', 'cat with cream fur, amber patches, curious eyes'],
  ['köpek', 'kopek', 'dog with tan fur, floppy ears, loyal expression'],
  ['kirpi', 'hedgehog with soft rounded spines and shy smile'],
  ['baykuş', 'baykus', 'owl with round glasses-like eyes, warm brown feathers'],
  ['sincap', 'squirrel with reddish tail, tiny green scarf, energetic pose'],
  ['kelebek', 'butterfly with teal and yellow wings, delicate but readable'],
  ['arı', 'ari', 'bee with golden stripes, tiny satchel, friendly face'],
  ['kuzu', 'lamb with fluffy white wool, pink cheeks, gentle eyes'],
  ['horoz', 'rooster with red comb, proud chest, bright feathers'],
  ['ördek', 'ordek', 'duck with yellow beak, soft white feathers, cheerful eyes'],
];

function inferScene(story) {
  const haystack = `${story.title} ${story.shortDescription}`;
  const hit = SCENE_HINTS.find(([needle]) => hasTerm(haystack, needle));
  if (hit) return hit[1];
  const category = story.categories[0];
  if (category === 'uyku') return 'a calm bedtime scene with moonlight, clouds, and cozy village rooftops';
  if (category === 'hayvan') return 'a friendly natural setting with simple readable plants and warm sky';
  if (category === 'keloglan') return 'an Anatolian village path with warm hills and a fairy-tale horizon';
  return 'a warm Turkish village fairy-tale setting with one clear focal place';
}

function describeCharacter(rawName, story) {
  const name = String(rawName || '').trim();
  const matchSource = name || story.title;
  const animal = ANIMAL_VISUALS.find((entry) => entry.slice(0, -1).some((key) => hasTerm(matchSource, key)));
  if (animal) return `${name}: ${animal.at(-1)}.`;
  const archetype = HUMAN_ARCHETYPES.find((entry) => entry.keys.some((key) => hasTerm(matchSource, key)));
  if (archetype) return `${name}: ${archetype.visual}`;

  const palettes = ['red', 'teal', 'gold', 'sky-blue', 'leaf-green', 'coral'];
  const color = palettes[hashString(name || story.slug) % palettes.length];
  return `${name || 'Main character'}: unique child-friendly fairy-tale character with a ${color} accent, large readable eyes, rounded shapes, and a kind expression.`;
}

function leadCharacters(story) {
  const chars = Array.isArray(story.characters) ? story.characters.filter(Boolean) : [];
  if (chars.length) return chars.slice(0, 3);
  return [story.title.split(/\s+(ile|ve|in|un|nın|nin)\s+/i)[0]].filter(Boolean);
}

function categoryLabel(key) {
  return CATEGORIES[key]?.label || key || 'Masal';
}

function buildPrompt(story) {
  const chars = leadCharacters(story);
  const characterLines = chars.map((c) => describeCharacter(c, story)).join('\n- ');
  const themes = story.themes.length ? story.themes.join(', ') : 'warmth, curiosity, kindness';
  const excerpt = truncate(story.body, 560);
  const scene = inferScene(story);

  return `Use case: illustration-story
Asset type: MasalNova story thumbnail and cover image for a Turkish children's fairy tale; 16:10 landscape composition, also safe for a 4:3 crop.
Primary request: Create a custom, story-specific cover illustration for "${story.title}".
Story-specific signal: ${story.shortDescription}
Story category: ${categoryLabel(story.categories[0])}
Themes: ${themes}
Story excerpt for accuracy: ${excerpt}
Scene/backdrop: ${scene}
Subject: show the decisive story moment with the main character(s), not a generic fairy-tale scene.
Character consistency anchors:
- ${characterLines}
Style/medium: premium children's book cover illustration, polished digital painting, Turkish fairy-tale warmth, rounded friendly shapes, rich but uncluttered detail.
Composition/framing: high-CTR thumbnail design; main face or animal eyes large and readable at small size; strong silhouette; one clear focal action; foreground subject fills 55-70% of the frame; clean depth; leave the top-left and top-right corners free of important details for website badges.
Lighting/mood: bright warm cinematic light, magical but gentle, safe for children, emotionally inviting.
Color palette: vivid complementary colors with category-appropriate warmth; avoid muddy low-contrast palettes.
Text (verbatim): no text.
Constraints: tailor every object, character, and setting to this exact story; preserve the character anchors for recurring archetypes; child-safe; no fear, injury, weapons, darkness, or threatening expressions; no logos, no watermark, no border.
Avoid: generic stock illustration, random characters not in the story, busy collage layout, tiny distant characters, photorealism, anime, 3D plastic toy look, unreadable thumbnail, cropped faces, in-image text.`;
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function toCsvCell(value) {
  const text = String(value ?? '').replace(/\r?\n/g, '\\n');
  return `"${text.replace(/"/g, '""')}"`;
}

async function loadStories() {
  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md')).sort();
  const stories = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const src = await readFile(join(STORIES_DIR, file), 'utf8');
    const { frontmatter, body } = splitFrontmatter(src, file);
    const data = parseFrontmatter(frontmatter);
    stories.push({
      slug,
      file,
      title: data.title || slug,
      shortDescription: data.shortDescription || '',
      coverEmoji: data.coverEmoji || '',
      coverColor: data.coverColor || '',
      coverImage: data.coverImage || '',
      altText: data.altText || '',
      ageGroups: Array.isArray(data.ageGroups) ? data.ageGroups : [],
      readingTime: data.readingTime || null,
      categories: Array.isArray(data.categories) ? data.categories : [],
      themes: Array.isArray(data.themes) ? data.themes : [],
      characters: Array.isArray(data.characters) ? data.characters : [],
      body,
    });
  }
  return stories;
}

function buildCharacterBible() {
  const humans = HUMAN_ARCHETYPES.map((entry) => `### ${entry.label}\n${entry.visual}`).join('\n\n');
  const animals = ANIMAL_VISUALS.map((entry) => {
    const names = entry.slice(0, -1).join(' / ');
    return `- ${names}: ${entry.at(-1)}.`;
  }).join('\n');
  return `# MasalNova Cover Character Bible

Use these anchors across all generated covers. The goal is not that every story has the same image, but that recurring archetypes look intentionally related across the site.

## Human Archetypes

${humans}

## Animal Archetypes

${animals}

## Thumbnail Rules

- 16:10 landscape first; must still work after a centered 4:3 crop.
- One decisive story moment per image.
- Faces and eyes must read at small card size.
- Keep top-left and top-right corners free for UI badges.
- No text, logos, watermarks, borders, weapons, frightening faces, or dark horror mood.
- Prefer bright complementary contrast over single-hue backgrounds.
`;
}

function buildCoverageReport(records, totalBeforeFilter) {
  const withCoverImage = records.filter((r) => r.currentCoverImage).length;
  const existingFiles = records.filter((r) => r.assetExists).length;
  const byCategory = new Map();
  for (const r of records) {
    const key = r.category || 'uncategorized';
    byCategory.set(key, (byCategory.get(key) || 0) + 1);
  }
  const categoryLines = [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => `- ${key}: ${count}`)
    .join('\n');

  return `# Cover Production Coverage

- Stories in repository: ${totalBeforeFilter}
- Stories in this prompt pack: ${records.length}
- Already have coverImage in frontmatter: ${withCoverImage}
- Matching image files already in public/covers/stories: ${existingFiles}
- Target image format: /covers/stories/<slug>.webp

## By Category

${categoryLines || '- none'}

## Next Steps

1. Generate images from story-cover-prompts.jsonl or story-cover-prompts.csv.
2. Save generated PNG/JPEG files under public/covers/stories/ using the story slug.
3. Run npm run optimize:covers to create lightweight WebP files.
4. Run npm run apply:covers to add coverImage and altText to stories that have matching files.
5. Run npm run build.
`;
}

async function main() {
  const opts = parseArgs();
  await mkdir(opts.outDir, { recursive: true });
  await mkdir(COVER_PUBLIC_DIR, { recursive: true });

  const allStories = await loadStories();
  let selected = allStories;
  if (opts.category) selected = selected.filter((s) => s.categories.includes(opts.category));
  if (opts.missingOnly) selected = selected.filter((s) => !s.coverImage);
  if (opts.limit) selected = selected.slice(0, opts.limit);

  const records = [];
  for (const story of selected) {
    const targetAssetPath = `/covers/stories/${story.slug}.webp`;
    const assetFsPath = join(COVER_PUBLIC_DIR, `${story.slug}.webp`);
    records.push({
      slug: story.slug,
      title: story.title,
      category: story.categories[0] || '',
      categories: story.categories,
      themes: story.themes,
      characters: story.characters,
      ageGroups: story.ageGroups,
      readingTime: story.readingTime,
      currentCoverImage: story.coverImage || '',
      targetCoverImage: targetAssetPath,
      assetExists: await fileExists(assetFsPath),
      altText: `Kapak görseli: ${story.title}`,
      prompt: buildPrompt(story),
    });
  }

  const jsonl = records.map((r) => JSON.stringify(r)).join('\n') + (records.length ? '\n' : '');
  const csvHeader = ['slug', 'title', 'category', 'targetCoverImage', 'altText', 'prompt'];
  const csv = [
    csvHeader.join(','),
    ...records.map((r) => csvHeader.map((key) => toCsvCell(r[key])).join(',')),
  ].join('\n') + '\n';
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalStories: allStories.length,
    promptCount: records.length,
    targetDirectory: 'public/covers/stories',
    targetPattern: '/covers/stories/<slug>.webp',
    records: records.map(({ prompt, ...rest }) => rest),
  };

  await writeFile(join(opts.outDir, 'story-cover-prompts.jsonl'), jsonl, 'utf8');
  await writeFile(join(opts.outDir, 'story-cover-prompts.csv'), csv, 'utf8');
  await writeFile(join(opts.outDir, 'story-cover-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await writeFile(join(opts.outDir, 'character-bible.md'), buildCharacterBible(), 'utf8');
  await writeFile(join(opts.outDir, 'coverage-report.md'), buildCoverageReport(records, allStories.length), 'utf8');

  console.log(`Wrote ${records.length} cover prompts to ${opts.outDir.replace(`${ROOT}/`, '')}`);
  console.log('Target assets: public/covers/stories/<slug>.webp');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
