// Generates deterministic, story-aware MasalNova cover artwork for stories that
// do not yet have a matching cover asset.
//
// Output:
//   public/covers/stories/<slug>.webp
//
// The artwork is intentionally generated as consistent vector storybook scenes
// and rasterized to WebP. This keeps the full library visually coherent and
// makes the process repeatable for future missing stories.
//
// Examples:
//   node scripts/generate-missing-cover-assets.mjs
//   node scripts/generate-missing-cover-assets.mjs --limit=20
//   node scripts/generate-missing-cover-assets.mjs --force
import { access, mkdir, readdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'src', 'content', 'stories');
const COVER_DIR = join(ROOT, 'public', 'covers', 'stories');

const WIDTH = 1200;
const HEIGHT = 750;

const CATEGORY_PALETTES = {
  keloglan: {
    sky1: '#5fa7ff',
    sky2: '#ffe0a6',
    ground1: '#f3b545',
    ground2: '#9ccf60',
    accent: '#ffb01f',
    shadow: '#a6631a',
  },
  uyku: {
    sky1: '#122a76',
    sky2: '#7b5cff',
    ground1: '#233e90',
    ground2: '#10245c',
    accent: '#ffd86a',
    shadow: '#0b1740',
  },
  hayvan: {
    sky1: '#62c7ff',
    sky2: '#d7fff3',
    ground1: '#56bd78',
    ground2: '#148f79',
    accent: '#21b6c9',
    shadow: '#126a5c',
  },
  egitici: {
    sky1: '#4b8fff',
    sky2: '#fbf6df',
    ground1: '#5ec392',
    ground2: '#2870bb',
    accent: '#2f74e8',
    shadow: '#163d82',
  },
  kisa: {
    sky1: '#64b5ff',
    sky2: '#fff0c2',
    ground1: '#ffb15d',
    ground2: '#6dbb7b',
    accent: '#ff8a00',
    shadow: '#8e4c10',
  },
};

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

function parseArgs() {
  const raw = Object.fromEntries(
    process.argv.slice(2).map((s) => {
      const [key, ...rest] = s.replace(/^--/, '').split('=');
      return [key, rest.length ? rest.join('=') : true];
    })
  );
  return {
    limit: raw.limit ? Number(raw.limit) : null,
    force: Boolean(raw.force),
  };
}

function normalize(input) {
  return String(input || '')
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase();
}

function has(input, term) {
  return normalize(input).includes(normalize(term));
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function hash(input) {
  let h = 2166136261;
  for (const ch of String(input)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(seed, values) {
  return values[seed % values.length];
}

function inferScene(story) {
  const text = `${story.title} ${story.shortDescription} ${story.body.slice(0, 900)}`;
  if (has(text, 'deniz feneri')) return 'lighthouse';
  if (has(text, 'deniz') || has(text, 'kumsal') || has(text, 'balık') || has(text, 'balik')) return 'sea';
  if (has(text, 'göl') || has(text, 'gol') || has(text, 'pınar') || has(text, 'pinar')) return 'water';
  if (has(text, 'değirmen') || has(text, 'degirmen')) return 'mill';
  if (has(text, 'saray') || has(text, 'kale')) return 'palace';
  if (has(text, 'fırın') || has(text, 'firin') || has(text, 'simit') || has(text, 'ekmek')) return 'bakery';
  if (has(text, 'çarsi') || has(text, 'carsi') || has(text, 'pazar')) return 'market';
  if (has(text, 'kar') || has(text, 'karlı') || has(text, 'karli')) return 'snow';
  if (has(text, 'yağmur') || has(text, 'yagmur') || has(text, 'fırtına') || has(text, 'firtina')) return 'rain';
  if (has(text, 'mağara') || has(text, 'magara')) return 'cave';
  if (has(text, 'bahçe') || has(text, 'bahce') || has(text, 'çiçek') || has(text, 'cicek')) return 'garden';
  if (has(text, 'tarla') || has(text, 'başak') || has(text, 'basak') || has(text, 'tohum')) return 'field';
  if (has(text, 'dağ') || has(text, 'dag') || has(text, 'kulübe') || has(text, 'kulube')) return 'mountain';
  if (has(text, 'ay') || has(text, 'yıldız') || has(text, 'yildiz')) return 'night';
  return story.categories.includes('uyku') ? 'night' : story.categories.includes('hayvan') ? 'forest' : 'village';
}

function inferCharacters(story) {
  const source = `${story.title} ${(story.characters || []).join(' ')} ${story.shortDescription}`;
  const chars = [];

  if (has(source, 'keloğlan') || has(source, 'keloglan')) chars.push('keloglan');
  if (has(source, 'nine') || has(source, 'ninenin') || has(source, 'teyze')) chars.push('grandmother');
  if (has(source, 'dede') || has(source, 'amca')) chars.push('grandfather');
  if (has(source, 'çoban') || has(source, 'coban')) chars.push('shepherd');
  if (has(source, 'balıkçı') || has(source, 'balikci')) chars.push('fisherman');
  if (has(source, 'bahçıvan') || has(source, 'bahcivan')) chars.push('gardener');
  if (has(source, 'fırıncı') || has(source, 'firinci') || has(source, 'simitçi') || has(source, 'simitci')) chars.push('baker');
  if (has(source, 'dev')) chars.push('giant');
  if (has(source, 'padişah') || has(source, 'padisah') || has(source, 'sultan')) chars.push('ruler');
  if (has(source, 'çocuk') || has(source, 'cocuk') || ['elif', 'deniz', 'defne', 'zeynep', 'mert', 'kaan', 'azra', 'ela', 'baran', 'barış', 'baris', 'batu', 'umut', 'onur'].some((n) => has(source, n))) chars.push('child');
  if (has(source, 'ay')) chars.push('moon');

  const animals = [
    ['rabbit', ['tavşan', 'tavsan']],
    ['fox', ['tilki']],
    ['lion', ['aslan']],
    ['bear', ['ayı', 'ayi', 'ayisi']],
    ['turtle', ['kaplumbağa', 'kaplumbaga', 'tosbaga']],
    ['bird', ['kuş', 'kus', 'serçe', 'serce', 'cıvı', 'civi']],
    ['ant', ['karınca', 'karinca']],
    ['elephant', ['fil']],
    ['cat', ['kedi']],
    ['dog', ['köpek', 'kopek']],
    ['hedgehog', ['kirpi']],
    ['owl', ['baykuş', 'baykus']],
    ['squirrel', ['sincap']],
    ['butterfly', ['kelebek']],
    ['bee', ['arı', 'ari']],
    ['lamb', ['kuzu', 'koyun']],
    ['rooster', ['horoz']],
    ['duck', ['ördek', 'ordek']],
    ['fish', ['balık', 'balik']],
  ];
  for (const [type, keys] of animals) {
    if (keys.some((key) => has(source, key))) chars.push(type);
  }

  const unique = [...new Set(chars)];
  if (unique.length) return unique.slice(0, 3);
  if (story.categories.includes('hayvan')) return ['rabbit', 'bird'];
  if (story.categories.includes('keloglan')) return ['keloglan'];
  if (story.categories.includes('uyku')) return ['moon', 'child'];
  return ['child'];
}

function categoryPalette(story) {
  return CATEGORY_PALETTES[story.categories[0]] || CATEGORY_PALETTES.kisa;
}

function defs(palette, story) {
  const id = hash(story.slug);
  return `
    <defs>
      <linearGradient id="sky-${id}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${palette.sky1}" />
        <stop offset="100%" stop-color="${palette.sky2}" />
      </linearGradient>
      <linearGradient id="ground-${id}" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${palette.ground1}" />
        <stop offset="100%" stop-color="${palette.ground2}" />
      </linearGradient>
      <radialGradient id="sun-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff7c8" stop-opacity="1" />
        <stop offset="100%" stop-color="#ffd86a" stop-opacity="0" />
      </radialGradient>
      <filter id="softShadow-${id}" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#071538" flood-opacity=".26"/>
      </filter>
    </defs>`;
}

function skyLayer(story, palette, scene) {
  const seed = hash(story.slug);
  const id = seed;
  const night = scene === 'night' || story.categories.includes('uyku');
  const sunX = 820 + (seed % 220);
  const sunY = night ? 160 : 130 + (seed % 80);
  const stars = Array.from({ length: night ? 22 : 8 }, (_, i) => {
    const x = 60 + ((seed * (i + 7)) % 1080);
    const y = 55 + ((seed * (i + 13)) % 260);
    const r = 2 + ((seed + i) % 4);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff7bd" opacity="${night ? 0.9 : 0.28}"/>`;
  }).join('');

  return `
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#sky-${id})"/>
    <circle cx="${sunX}" cy="${sunY}" r="${night ? 88 : 140}" fill="url(#sun-${id})" opacity="${night ? 0.9 : 1}"/>
    ${night ? `<path d="M${sunX + 10} ${sunY - 56}a70 70 0 1 0 0 112a48 48 0 1 1 0-112" fill="#ffe8a3" opacity=".96"/>` : `<circle cx="${sunX}" cy="${sunY}" r="54" fill="#ffe082" opacity=".95"/>`}
    ${stars}
    <path d="M0 250 C180 185 270 210 405 170 C560 125 725 210 880 168 C1030 128 1120 162 1200 135 L1200 460 L0 460 Z" fill="#ffffff" opacity=".12"/>
    <path d="M0 330 C210 275 330 292 500 252 C700 205 860 310 1040 252 C1120 228 1170 218 1200 220 L1200 505 L0 505 Z" fill="#0d2b6d" opacity="${night ? '.34' : '.12'}"/>
  `;
}

function groundLayer(story, palette, scene) {
  const snow = scene === 'snow';
  const groundFill = snow ? '#f6fbff' : `url(#ground-${hash(story.slug)})`;
  return `
    <path d="M0 520 C150 455 310 530 460 475 C640 410 760 518 940 455 C1060 415 1140 430 1200 392 L1200 750 L0 750 Z" fill="${groundFill}"/>
    <path d="M0 625 C190 590 320 645 500 604 C690 560 860 650 1200 590 L1200 750 L0 750 Z" fill="${snow ? '#e5f2ff' : '#163f6a'}" opacity="${snow ? '.65' : '.18'}"/>
    <ellipse cx="620" cy="672" rx="410" ry="52" fill="#071538" opacity=".16"/>
  `;
}

function prop(scene, story, palette) {
  const common = {
    tree: `<g opacity=".96"><path d="M118 505 C92 440 132 410 122 356 C166 386 192 438 160 506Z" fill="#1e8f6a"/><rect x="130" y="454" width="28" height="98" rx="14" fill="#8c552c"/></g>`,
    flowers: `<g opacity=".95">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${835 + i * 44}" cy="${612 + (i % 2) * 18}" r="10" fill="${pick(hash(story.slug) + i, ['#ff6f91', '#ffd166', '#7b5cff', '#ffffff'])}"/><rect x="${831 + i * 44}" y="${624 + (i % 2) * 18}" width="8" height="34" rx="4" fill="#247b55"/>`).join('')}</g>`,
  };
  if (scene === 'mill') {
    return `
      <g transform="translate(800 300)" filter="url(#softShadow-${hash(story.slug)})">
        <rect x="40" y="135" width="185" height="220" rx="18" fill="#c78345"/>
        <path d="M30 145 L134 60 L238 145 Z" fill="#7c4a31"/>
        <rect x="106" y="250" width="50" height="105" rx="18" fill="#6d3f28"/>
        <circle cx="134" cy="154" r="42" fill="#f8d287"/>
        <g transform="translate(134 154)" stroke="#74401f" stroke-width="14" stroke-linecap="round">
          <line x1="0" y1="-112" x2="0" y2="112"/>
          <line x1="-112" y1="0" x2="112" y2="0"/>
          <line x1="-78" y1="-78" x2="78" y2="78" opacity=".75"/>
          <line x1="78" y1="-78" x2="-78" y2="78" opacity=".75"/>
        </g>
      </g>`;
  }
  if (scene === 'palace') {
    return `
      <g transform="translate(780 220)" filter="url(#softShadow-${hash(story.slug)})">
        <rect x="50" y="205" width="290" height="210" rx="24" fill="#f2cf8f"/>
        <rect x="92" y="140" width="70" height="275" rx="22" fill="#ffe1a8"/>
        <rect x="230" y="118" width="70" height="297" rx="22" fill="#ffe1a8"/>
        <path d="M95 140 L128 70 L160 140 Z" fill="#7b5cff"/>
        <path d="M232 118 L265 45 L298 118 Z" fill="#7b5cff"/>
        <path d="M40 212 C105 160 275 160 350 212 Z" fill="#ffb01f"/>
        <rect x="170" y="300" width="54" height="115" rx="27" fill="#7c4a31"/>
      </g>`;
  }
  if (scene === 'bakery') {
    return `
      <g transform="translate(775 330)" filter="url(#softShadow-${hash(story.slug)})">
        <rect x="10" y="100" width="310" height="190" rx="26" fill="#d88945"/>
        <path d="M0 112 L165 25 L330 112 Z" fill="#7e4227"/>
        <rect x="115" y="168" width="96" height="122" rx="44" fill="#4a2b20"/>
        <ellipse cx="165" cy="228" rx="48" ry="28" fill="#ffcf6e"/>
        <circle cx="72" cy="170" r="22" fill="#ffd08a"/>
        <circle cx="260" cy="170" r="22" fill="#ffd08a"/>
      </g>`;
  }
  if (scene === 'market') {
    return `
      <g transform="translate(720 385)" filter="url(#softShadow-${hash(story.slug)})">
        <rect x="0" y="90" width="340" height="150" rx="18" fill="#f7d7a0"/>
        <path d="M-12 88 L28 30 L332 30 L374 88 Z" fill="#ff6f61"/>
        <path d="M28 30 H332 L296 88 H-12 Z" fill="#fff1cf" opacity=".55"/>
        <rect x="60" y="140" width="220" height="36" rx="18" fill="#8bcf63"/>
        <circle cx="94" cy="134" r="18" fill="#ffd166"/>
        <circle cx="142" cy="132" r="18" fill="#f36"/>
        <circle cx="192" cy="132" r="18" fill="#5ec392"/>
      </g>`;
  }
  if (scene === 'sea' || scene === 'lighthouse' || scene === 'water') {
    return `
      <path d="M0 530 C170 500 290 555 450 520 C640 478 820 555 1200 505 L1200 750 L0 750 Z" fill="#0ca8c9" opacity=".78"/>
      <path d="M70 594 C180 565 250 620 368 590 C500 555 602 612 735 582" fill="none" stroke="#ffffff" stroke-width="16" opacity=".45" stroke-linecap="round"/>
      ${scene === 'lighthouse' ? `<g transform="translate(850 260)" filter="url(#softShadow-${hash(story.slug)})"><rect x="70" y="125" width="70" height="250" rx="22" fill="#fff4e4"/><path d="M58 125 H152 L132 70 H78 Z" fill="#e44b4b"/><rect x="82" y="170" width="46" height="42" rx="8" fill="#2f74e8"/><path d="M34 388 H176 L148 338 H62 Z" fill="#81503a"/></g>` : ''}
    `;
  }
  if (scene === 'cave') {
    return `
      <g transform="translate(780 315)" filter="url(#softShadow-${hash(story.slug)})">
        <path d="M40 330 C12 210 60 85 180 40 C310 0 405 120 388 330 Z" fill="#5b5a72"/>
        <path d="M118 330 C104 238 134 146 202 128 C284 106 330 208 318 330 Z" fill="#17172c"/>
        <circle cx="210" cy="220" r="72" fill="#ffd86a" opacity=".25"/>
      </g>`;
  }
  if (scene === 'mountain') {
    return `
      <path d="M720 520 L885 205 L1050 520 Z" fill="#dce9f7" opacity=".95"/>
      <path d="M820 520 L980 260 L1165 520 Z" fill="#bcd2e8" opacity=".85"/>
      <path d="M862 248 L886 205 L912 252 L890 242 Z" fill="#ffffff"/>
      <g transform="translate(850 450)"><rect x="0" y="70" width="170" height="92" rx="16" fill="#a96b39"/><path d="M-14 78 L85 10 L184 78 Z" fill="#70442b"/></g>`;
  }
  if (scene === 'rain') {
    return `
      ${Array.from({ length: 18 }, (_, i) => `<line x1="${90 + i * 60}" y1="${95 + (i % 5) * 38}" x2="${65 + i * 60}" y2="${155 + (i % 5) * 38}" stroke="#d9f2ff" stroke-width="8" stroke-linecap="round" opacity=".58"/>`).join('')}
      <g transform="translate(800 405)" opacity=".92"><path d="M0 80 C40 25 104 25 150 80 C196 22 280 44 300 114 C190 88 116 94 0 80Z" fill="#ffcf65"/><rect x="146" y="92" width="14" height="130" rx="7" fill="#6f432a"/></g>`;
  }
  if (scene === 'snow') {
    return `
      ${Array.from({ length: 28 }, (_, i) => `<circle cx="${40 + ((hash(story.slug) * (i + 5)) % 1120)}" cy="${50 + ((hash(story.slug) * (i + 11)) % 420)}" r="${3 + (i % 6)}" fill="#ffffff" opacity=".78"/>`).join('')}
      <g transform="translate(880 435)" filter="url(#softShadow-${hash(story.slug)})"><circle cx="80" cy="138" r="72" fill="#fff"/><circle cx="82" cy="52" r="48" fill="#fff"/><circle cx="64" cy="42" r="6" fill="#20345c"/><circle cx="100" cy="42" r="6" fill="#20345c"/><path d="M76 58 L112 66 L78 76 Z" fill="#ff8a00"/><path d="M34 94 C70 116 110 116 146 94" stroke="#e7475e" stroke-width="20" fill="none" stroke-linecap="round"/></g>`;
  }
  if (scene === 'garden' || scene === 'field') {
    return `
      ${common.flowers}
      <path d="M820 570 C880 485 960 510 1018 426 C1046 518 986 580 904 604 Z" fill="#2f9c68" opacity=".65"/>
      ${scene === 'field' ? Array.from({ length: 14 }, (_, i) => `<path d="M${780 + i * 28} 660 C${770 + i * 28} 606 ${790 + i * 28} 562 ${776 + i * 28} 508" stroke="#ffd166" stroke-width="8" fill="none"/><ellipse cx="${776 + i * 28}" cy="${506 + (i % 3) * 8}" rx="13" ry="25" fill="#ffd166" transform="rotate(${i % 2 ? -20 : 18} ${776 + i * 28} ${506 + (i % 3) * 8})"/>`).join('') : ''}
    `;
  }
  return `${common.tree}${common.flowers}`;
}

function human(type, x, y, scale, story) {
  const skin = '#b86f45';
  const hair = type === 'keloglan' ? skin : '#3e251b';
  const vest = {
    keloglan: '#e8503f',
    grandmother: '#7b5cff',
    grandfather: '#233e90',
    shepherd: '#72a84a',
    fisherman: '#2f74e8',
    gardener: '#3bb98b',
    baker: '#f5efe1',
    ruler: '#127c89',
    child: pick(hash(story.slug), ['#ff6f61', '#21b6c9', '#7b5cff', '#ffb01f']),
    giant: '#74a65d',
  }[type] || '#ff6f61';
  const hat = type === 'shepherd' || type === 'gardener' || type === 'fisherman' || type === 'baker';
  const giant = type === 'giant';
  const s = scale * (giant ? 1.42 : 1);
  return `
    <g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow-${hash(story.slug)})">
      <ellipse cx="0" cy="190" rx="92" ry="28" fill="#071538" opacity=".18"/>
      <path d="M-72 128 C-66 70 66 70 72 128 L58 220 L-58 220 Z" fill="${vest}"/>
      <path d="M-44 122 C-32 92 32 92 44 122 L34 210 L-34 210 Z" fill="#fff4df" opacity="${type === 'baker' ? '.35' : '.95'}"/>
      <circle cx="0" cy="45" r="62" fill="${skin}"/>
      ${type === 'keloglan' ? '' : `<path d="M-54 31 C-38 -28 42 -28 58 32 C28 10 -16 8 -54 31Z" fill="${hair}"/>`}
      ${type === 'grandmother' ? `<path d="M-68 48 C-60 -28 60 -28 70 50 C34 10 -34 10 -68 48Z" fill="#bca6ff"/><path d="M-62 52 C-28 20 30 20 62 52 L50 96 C20 80 -20 80 -50 96Z" fill="#bca6ff"/>` : ''}
      ${hat ? `<path d="M-70 12 C-28 -28 34 -28 72 12 C42 26 -38 26 -70 12Z" fill="${type === 'baker' ? '#fff7e8' : '#d2a85f'}"/><rect x="-56" y="2" width="112" height="18" rx="9" fill="${type === 'baker' ? '#fff' : '#9c6f37'}"/>` : ''}
      ${type === 'ruler' ? `<path d="M-42 -10 L-18 -54 L0 -10 L22 -54 L46 -10 Z" fill="#ffd166"/>` : ''}
      <circle cx="-22" cy="42" r="7" fill="#18233f"/>
      <circle cx="22" cy="42" r="7" fill="#18233f"/>
      <path d="M-22 70 C-8 84 12 84 26 70" stroke="#5c2d22" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M-74 145 C-118 168 -130 196 -108 220" stroke="${skin}" stroke-width="24" fill="none" stroke-linecap="round"/>
      <path d="M74 145 C118 168 130 196 108 220" stroke="${skin}" stroke-width="24" fill="none" stroke-linecap="round"/>
      <rect x="-54" y="214" width="40" height="100" rx="20" fill="#355d9b"/>
      <rect x="14" y="214" width="40" height="100" rx="20" fill="#355d9b"/>
      ${type === 'fisherman' ? `<path d="M100 130 C178 150 178 218 112 250" stroke="#f8f0d2" stroke-width="8" fill="none" opacity=".95"/><circle cx="180" cy="223" r="24" fill="none" stroke="#f8f0d2" stroke-width="7"/>` : ''}
      ${type === 'gardener' ? `<path d="M-124 215 C-92 178 -58 166 -26 178" stroke="#2e6b3f" stroke-width="8" fill="none"/><circle cx="-128" cy="214" r="18" fill="#ff6f91"/>` : ''}
      ${type === 'shepherd' ? `<line x1="112" y1="110" x2="112" y2="315" stroke="#70442b" stroke-width="12" stroke-linecap="round"/>` : ''}
      ${type === 'baker' ? `<ellipse cx="-112" cy="210" rx="42" ry="25" fill="#ffcf6e"/><path d="M-148 210 C-128 195 -96 195 -76 210" stroke="#bd7c32" stroke-width="6" fill="none"/>` : ''}
    </g>`;
}

function animal(type, x, y, scale, story) {
  const colors = {
    rabbit: ['#f5efe9', '#f9b4c4'],
    fox: ['#e9782d', '#fff0d5'],
    lion: ['#d49134', '#a86422'],
    bear: ['#9a6338', '#d0a072'],
    turtle: ['#5c9b58', '#315d42'],
    bird: ['#45a5ff', '#ffcf65'],
    ant: ['#6a3d2b', '#9b5a3e'],
    elephant: ['#8aa7c7', '#d0dceb'],
    cat: ['#f4d6a1', '#b56b3c'],
    dog: ['#c98a4f', '#5d351f'],
    hedgehog: ['#b98758', '#6b442e'],
    owl: ['#8b5a35', '#ffd166'],
    squirrel: ['#c46d32', '#f4b47b'],
    butterfly: ['#21b6c9', '#ffd166'],
    bee: ['#ffd166', '#2e2b38'],
    lamb: ['#fff7ef', '#e6d7cb'],
    rooster: ['#f4b24a', '#e43f3f'],
    duck: ['#fff7df', '#ffd166'],
    fish: ['#21b6c9', '#ffcf65'],
  }[type] || ['#f5efe9', '#7b5cff'];
  const [main, accent] = colors;
  const s = scale;
  if (type === 'butterfly') {
    return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow-${hash(story.slug)})"><ellipse cx="-52" cy="42" rx="55" ry="82" fill="${main}" transform="rotate(-24 -52 42)"/><ellipse cx="52" cy="42" rx="55" ry="82" fill="#7b5cff" transform="rotate(24 52 42)"/><ellipse cx="0" cy="72" rx="20" ry="76" fill="#40325f"/><circle cx="0" cy="-8" r="28" fill="#40325f"/><circle cx="-9" cy="-12" r="5" fill="#fff"/><circle cx="9" cy="-12" r="5" fill="#fff"/><path d="M-10 8 C0 18 12 18 22 8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  }
  if (type === 'fish') {
    return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow-${hash(story.slug)})"><ellipse cx="0" cy="65" rx="96" ry="58" fill="${main}"/><path d="M-88 65 L-160 18 L-150 112 Z" fill="${accent}"/><circle cx="36" cy="50" r="9" fill="#111b36"/><path d="M48 82 C72 92 94 86 108 70" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  }
  const ears = {
    rabbit: `<ellipse cx="-44" cy="-42" rx="24" ry="72" fill="${main}" transform="rotate(-16 -44 -42)"/><ellipse cx="44" cy="-42" rx="24" ry="72" fill="${main}" transform="rotate(16 44 -42)"/>`,
    fox: `<path d="M-58 0 L-98 -72 L-25 -42 Z" fill="${main}"/><path d="M58 0 L98 -72 L25 -42 Z" fill="${main}"/>`,
    cat: `<path d="M-56 -2 L-90 -70 L-20 -36 Z" fill="${main}"/><path d="M56 -2 L90 -70 L20 -36 Z" fill="${main}"/>`,
    dog: `<ellipse cx="-72" cy="12" rx="25" ry="58" fill="${accent}" transform="rotate(22 -72 12)"/><ellipse cx="72" cy="12" rx="25" ry="58" fill="${accent}" transform="rotate(-22 72 12)"/>`,
    bear: `<circle cx="-58" cy="-10" r="30" fill="${main}"/><circle cx="58" cy="-10" r="30" fill="${main}"/>`,
    lion: `<circle cx="0" cy="30" r="104" fill="${accent}" opacity=".96"/>`,
    owl: `<path d="M-78 2 L-96 -58 L-36 -24 Z" fill="${main}"/><path d="M78 2 L96 -58 L36 -24 Z" fill="${main}"/>`,
    elephant: `<ellipse cx="-82" cy="40" rx="44" ry="68" fill="${main}"/><ellipse cx="82" cy="40" rx="44" ry="68" fill="${main}"/>`,
    lamb: `<circle cx="-58" cy="-4" r="30" fill="${accent}"/><circle cx="58" cy="-4" r="30" fill="${accent}"/>`,
  }[type] || '';
  const extra = {
    turtle: `<ellipse cx="0" cy="120" rx="116" ry="68" fill="${accent}"/><path d="M-70 104 C-18 75 36 75 76 104" stroke="#9ed37e" stroke-width="10" fill="none"/>`,
    bird: `<path d="M-78 92 C-150 84 -152 20 -74 46" fill="${main}" opacity=".85"/><path d="M78 92 C150 84 152 20 74 46" fill="${main}" opacity=".85"/><path d="M70 48 L126 70 L70 88 Z" fill="${accent}"/>`,
    ant: `<ellipse cx="-92" cy="122" rx="54" ry="42" fill="${main}"/><ellipse cx="0" cy="112" rx="58" ry="45" fill="${main}"/><ellipse cx="82" cy="96" rx="52" ry="42" fill="${main}"/>`,
    hedgehog: `<path d="M-106 115 C-70 24 84 18 122 112 C48 82 -24 82 -106 115Z" fill="${accent}"/>`,
    squirrel: `<path d="M-85 118 C-180 60 -120 -70 -28 8 C-108 8 -110 74 -68 104 Z" fill="${accent}"/>`,
    bee: `<rect x="-54" y="70" width="108" height="22" fill="${accent}"/><rect x="-54" y="112" width="108" height="22" fill="${accent}"/><ellipse cx="-70" cy="42" rx="44" ry="28" fill="#ffffff" opacity=".55"/><ellipse cx="70" cy="42" rx="44" ry="28" fill="#ffffff" opacity=".55"/>`,
    rooster: `<path d="M-20 -28 C-40 -70 0 -78 0 -38 C12 -82 52 -60 22 -28 Z" fill="${accent}"/><path d="M68 62 L122 82 L68 96 Z" fill="#ffd166"/>`,
    duck: `<path d="M76 60 L132 78 L76 98 Z" fill="${accent}"/>`,
  }[type] || '';
  return `
    <g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow-${hash(story.slug)})">
      <ellipse cx="0" cy="214" rx="110" ry="30" fill="#071538" opacity=".16"/>
      ${ears}
      ${extra}
      <ellipse cx="0" cy="122" rx="92" ry="104" fill="${main}"/>
      <ellipse cx="0" cy="146" rx="48" ry="42" fill="${accent}" opacity="${type === 'lion' ? '.35' : '.82'}"/>
      ${type === 'elephant' ? `<path d="M10 120 C20 180 -10 210 -44 218" stroke="${main}" stroke-width="34" fill="none" stroke-linecap="round"/>` : ''}
      <circle cx="-32" cy="86" r="10" fill="#152038"/>
      <circle cx="32" cy="86" r="10" fill="#152038"/>
      <circle cx="-28" cy="82" r="3.5" fill="#fff"/>
      <circle cx="36" cy="82" r="3.5" fill="#fff"/>
      <path d="M-22 138 C-5 154 14 154 30 138" stroke="#403025" stroke-width="8" fill="none" stroke-linecap="round"/>
      ${type === 'fox' ? `<path d="M0 105 L-18 128 H18 Z" fill="#3e251b"/>` : ''}
      ${type === 'owl' ? `<circle cx="-34" cy="86" r="26" fill="${accent}" opacity=".85"/><circle cx="34" cy="86" r="26" fill="${accent}" opacity=".85"/>` : ''}
    </g>`;
}

function moonCharacter(x, y, scale, story) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" filter="url(#softShadow-${hash(story.slug)})">
      <path d="M28 -126a142 142 0 1 0 0 252a96 96 0 1 1 0-252" fill="#ffe8a3"/>
      <circle cx="-28" cy="-16" r="9" fill="#6f5a3c"/>
      <circle cx="24" cy="-18" r="9" fill="#6f5a3c"/>
      <path d="M-24 26 C0 46 28 44 48 22" stroke="#6f5a3c" stroke-width="9" fill="none" stroke-linecap="round"/>
    </g>`;
}

function subject(type, x, y, scale, story) {
  if (['keloglan', 'grandmother', 'grandfather', 'shepherd', 'fisherman', 'gardener', 'baker', 'child', 'giant', 'ruler'].includes(type)) {
    return human(type, x, y, scale, story);
  }
  if (type === 'moon') return moonCharacter(x, y, scale, story);
  return animal(type, x, y, scale, story);
}

function renderSubjects(story) {
  const chars = inferCharacters(story);
  const seed = hash(story.slug);
  const layouts = [
    [[380, 330, 1.15]],
    [[330, 335, 1.05], [535, 360, 0.86]],
    [[260, 355, 0.95], [465, 360, 0.82], [650, 374, 0.72]],
  ];
  const layout = layouts[Math.min(chars.length, 3) - 1];
  return chars.slice(0, 3).map((type, i) => {
    const [x, y, scale] = layout[i];
    const dx = (seed % 23) - 11;
    const dy = ((seed >> 4) % 18) - 9;
    return subject(type, x + dx, y + dy, scale, story);
  }).join('');
}

function foregroundDetails(story, scene, palette) {
  const text = `${story.title} ${story.shortDescription}`;
  const items = [];
  if (has(text, 'para') || has(text, 'kumbar')) {
    items.push(`<g transform="translate(655 605)"><ellipse cx="0" cy="34" rx="72" ry="28" fill="#071538" opacity=".14"/><rect x="-58" y="-8" width="116" height="70" rx="30" fill="#d48a42"/><rect x="-22" y="-34" width="44" height="28" rx="12" fill="#eaa558"/><circle cx="0" cy="28" r="18" fill="#ffd166"/></g>`);
  }
  if (has(text, 'sepet')) {
    items.push(`<g transform="translate(690 610)"><ellipse cx="0" cy="44" rx="78" ry="22" fill="#071538" opacity=".14"/><path d="M-70 0 H70 L52 78 H-52 Z" fill="#c78345"/><path d="M-48 4 C-34 -52 34 -52 48 4" stroke="#8c552c" stroke-width="14" fill="none"/><path d="M-50 28 H50 M-44 52 H44" stroke="#8c552c" stroke-width="7" opacity=".6"/></g>`);
  }
  if (has(text, 'testi') || has(text, 'vazo')) {
    items.push(`<g transform="translate(675 604)"><ellipse cx="0" cy="78" rx="58" ry="18" fill="#071538" opacity=".14"/><path d="M-42 0 C-22 -18 22 -18 42 0 C24 38 54 68 0 92 C-54 68 -24 38 -42 0Z" fill="#b96d42"/><ellipse cx="0" cy="0" rx="39" ry="15" fill="#e7a06a"/><path d="M42 28 C82 28 78 70 38 68" stroke="#b96d42" stroke-width="13" fill="none"/></g>`);
  }
  if (has(text, 'yıldız') || has(text, 'yildiz')) {
    items.push(`<g transform="translate(690 220)">${[0, 1, 2].map((i) => `<path d="M${i * 76} 0 L${18 + i * 76} 38 L60 ${44 + i * 4} L28 ${70 + i * 2} L36 112 L0 88 L-36 112 L-28 70 L-60 ${44 + i * 4} L-18 38 Z" fill="#ffd86a" opacity=".88"/>`).join('')}</g>`);
  }
  if (has(text, 'anahtar')) {
    items.push(`<g transform="translate(720 620) rotate(-18)"><circle cx="0" cy="0" r="28" fill="none" stroke="#ffd166" stroke-width="14"/><rect x="24" y="-8" width="110" height="16" rx="8" fill="#ffd166"/><rect x="108" y="0" width="18" height="36" fill="#ffd166"/></g>`);
  }
  if (items.length) return items.join('');
  return `<circle cx="695" cy="620" r="34" fill="${palette.accent}" opacity=".28"/><circle cx="735" cy="648" r="18" fill="#fff" opacity=".35"/>`;
}

function buildSvg(story) {
  const palette = categoryPalette(story);
  const scene = inferScene(story);
  const seed = hash(story.slug);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="${esc(story.title)}">
  ${defs(palette, story)}
  ${skyLayer(story, palette, scene)}
  ${groundLayer(story, palette, scene)}
  ${prop(scene, story, palette)}
  <g opacity=".22">
    <circle cx="${120 + (seed % 140)}" cy="165" r="145" fill="#fff"/>
    <circle cx="${1020 - (seed % 180)}" cy="375" r="110" fill="#fff"/>
  </g>
  ${renderSubjects(story)}
  ${foregroundDetails(story, scene, palette)}
  <rect x="22" y="22" width="${WIDTH - 44}" height="${HEIGHT - 44}" rx="44" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="6"/>
  <path d="M0 0 H1200 V750 H0 Z" fill="none"/>
</svg>`;
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
      coverImage: data.coverImage || '',
      coverEmoji: data.coverEmoji || '',
      coverColor: data.coverColor || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      characters: Array.isArray(data.characters) ? data.characters : [],
      body,
    });
  }
  return stories;
}

async function main() {
  const opts = parseArgs();
  await mkdir(COVER_DIR, { recursive: true });

  const stories = await loadStories();
  let candidates = [];
  for (const story of stories) {
    const target = join(COVER_DIR, `${story.slug}.webp`);
    const hasAsset = await exists(target);
    if (opts.force || (!story.coverImage && !hasAsset)) candidates.push({ story, target });
  }
  if (opts.limit) candidates = candidates.slice(0, opts.limit);

  let written = 0;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  for (const { story, target } of candidates) {
    const svg = buildSvg(story);
    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:transparent}svg{display:block;width:${WIDTH}px;height:${HEIGHT}px}</style></head><body>${svg}</body></html>`,
      { waitUntil: 'load' }
    );
    await page.screenshot({ path: target, type: 'webp', quality: 86, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    written++;
  }
  await browser.close();

  console.log(`generated: ${written} cover assets`);
  console.log(`target: ${COVER_DIR.replace(`${ROOT}/`, '')}/<slug>.webp`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
