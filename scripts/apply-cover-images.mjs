// Adds coverImage and altText frontmatter fields for stories that have finished
// cover files in public/covers/stories.
//
// Examples:
//   node scripts/apply-cover-images.mjs --dry-run
//   node scripts/apply-cover-images.mjs
import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'src', 'content', 'stories');
const COVER_DIR = join(ROOT, 'public', 'covers', 'stories');
const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg'];

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  return { dryRun: args.has('--dry-run') };
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function splitFrontmatter(src, file) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  return { frontmatter: match[1], body: match[2] || '' };
}

function titleFromFrontmatter(frontmatter, slug) {
  const match = frontmatter.match(/^title:\s*(.+)$/m);
  if (!match) return slug;
  return match[1].trim().replace(/^"|"$/g, '');
}

function upsertLine(frontmatter, key, value, afterKeys = []) {
  const lines = frontmatter.split('\n');
  const existing = lines.findIndex((line) => line.startsWith(`${key}:`));
  const rendered = `${key}: ${JSON.stringify(value)}`;
  if (existing >= 0) {
    lines[existing] = rendered;
    return lines.join('\n');
  }

  let insertAt = -1;
  for (const afterKey of afterKeys) {
    const idx = lines.findIndex((line) => line.startsWith(`${afterKey}:`));
    if (idx >= 0) insertAt = Math.max(insertAt, idx + 1);
  }
  if (insertAt < 0) insertAt = lines.length;
  lines.splice(insertAt, 0, rendered);
  return lines.join('\n');
}

async function imagePathForSlug(slug) {
  for (const ext of IMAGE_EXTENSIONS) {
    const file = `${slug}${ext}`;
    if (await fileExists(join(COVER_DIR, file))) return `/covers/stories/${file}`;
  }
  return null;
}

async function main() {
  const opts = parseArgs();
  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md')).sort();
  let changed = 0;
  let missing = 0;

  for (const file of files) {
    const slug = basename(file, '.md');
    const coverImage = await imagePathForSlug(slug);
    if (!coverImage) {
      missing++;
      continue;
    }

    const path = join(STORIES_DIR, file);
    const src = await readFile(path, 'utf8');
    const { frontmatter, body } = splitFrontmatter(src, file);
    const title = titleFromFrontmatter(frontmatter, slug);
    let next = upsertLine(frontmatter, 'coverImage', coverImage, ['coverColor', 'coverEmoji']);
    next = upsertLine(next, 'altText', `Kapak görseli: ${title}`, ['coverImage']);
    const out = `---\n${next}\n---\n${body}`;

    if (out !== src) {
      changed++;
      if (!opts.dryRun) await writeFile(path, out, 'utf8');
    }
  }

  const mode = opts.dryRun ? 'dry-run' : 'write';
  console.log(`${mode}: ${changed} story files would be updated; ${missing} stories have no matching cover file yet.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
