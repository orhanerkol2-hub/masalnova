// Rebuilds the small Phosphor fonts and CSS used by MasalNova.
// Requires HarfBuzz' `hb-subset` binary (for example: `brew install harfbuzz`).
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = join(projectRoot, 'src');
const phosphorDirectory = join(projectRoot, 'node_modules/@phosphor-icons/web/src');
const outputDirectory = join(projectRoot, 'public/fonts');
const cssOutput = join(projectRoot, 'src/styles/phosphor-subset.css');
const checkOnly = process.argv.includes('--check');

// These classes are assembled from runtime values rather than complete ph-* literals.
const dynamicRegularIcons = new Set([
  'book-open-text',
  'quotes',
  'scroll',
  'speaker-high',
  'speaker-slash',
]);

// Compatibility aliases for class names that are no longer canonical in v2.
const regularAliases = new Map([
  ['child', 'person-arms-spread'],
]);
const legacyFilledIcons = new Map([
  ['play-fill', 'play'],
]);

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(?:astro|js|ts)$/.test(entry.name) ? [path] : [];
  });
}

function collectIconNames() {
  const regular = new Set(dynamicRegularIcons);
  const fill = new Set();

  for (const path of sourceFiles(sourceDirectory)) {
    const source = readFileSync(path, 'utf8');
    for (const match of source.matchAll(/\bph-(?!fill\b)([a-z0-9-]+)/g)) {
      if (!match[1].endsWith('-')) regular.add(match[1]);
    }
    for (const match of source.matchAll(/\bph-fill\s+ph-([a-z0-9-]+)/g)) {
      fill.add(match[1]);
    }
    // Dynamic templates in Header.astro and index.astro use item.icon/category.icon.
    for (const match of source.matchAll(/\bicon\s*:\s*['"]([a-z0-9-]+)['"]/g)) {
      regular.add(match[1].replace(/^ph-/, ''));
    }
  }

  for (const legacyClass of legacyFilledIcons.keys()) regular.delete(legacyClass);
  return { regular, fill };
}

function glyphMap(weight) {
  const selectorPrefix = weight === 'regular' ? '\\.ph' : '\\.ph-fill';
  const css = readFileSync(join(phosphorDirectory, weight, 'style.css'), 'utf8');
  const pattern = new RegExp(`${selectorPrefix}\\.ph-([a-z0-9-]+):before\\s*\\{\\s*content:\\s*"\\\\([0-9a-f]+)";`, 'g');
  return new Map([...css.matchAll(pattern)].map((match) => [match[1], match[2]]));
}

function resolveEntries(classNames, aliases, glyphs, weight) {
  return [...classNames].sort().map((className) => {
    const sourceName = aliases.get(className) ?? className;
    const code = glyphs.get(sourceName);
    if (!code) throw new Error(`Phosphor-${weight}-Glyph fehlt: ${className} (${sourceName})`);
    return { className, code };
  });
}

function generatedCss(regularEntries, fillEntries, legacyFillEntries) {
  const regularRules = regularEntries
    .map(({ className, code }) => `.ph.ph-${className}::before { content: "\\${code}"; }`)
    .join('\n');
  const fillRules = fillEntries
    .map(({ className, code }) => `.ph-fill.ph-${className}::before { content: "\\${code}"; }`)
    .join('\n');
  const legacyRules = legacyFillEntries
    .map(({ className, code }) => [
      `.ph.ph-${className} { font-family: "MasalNova Phosphor Fill" !important; }`,
      `.ph.ph-${className}::before { content: "\\${code}"; }`,
    ].join('\n'))
    .join('\n');

  return `/* Generated from the ph-* usages in src/ by scripts/generate-phosphor-subset.mjs. */
@font-face {
  font-family: "MasalNova Phosphor";
  src: url('/fonts/phosphor-regular-subset.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "MasalNova Phosphor Fill";
  src: url('/fonts/phosphor-fill-subset.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.ph,
.ph-fill {
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  letter-spacing: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ph { font-family: "MasalNova Phosphor" !important; }
.ph-fill { font-family: "MasalNova Phosphor Fill" !important; }

${regularRules}

/* Legacy class names used by existing templates. */
${legacyRules}

${fillRules}
`;
}

function subsetFont(source, output, codes) {
  const result = spawnSync('hb-subset', [
    source,
    `--unicodes=${[...codes].sort().join(',')}`,
    `--output-file=${output}`,
  ], { cwd: projectRoot, encoding: 'utf8' });
  if (result.error?.code === 'ENOENT') {
    throw new Error('`hb-subset` fehlt. Bitte HarfBuzz installieren.');
  }
  if (result.status !== 0) throw new Error(result.stderr || 'hb-subset ist fehlgeschlagen.');
}

const names = collectIconNames();
const regularGlyphs = glyphMap('regular');
const fillGlyphs = glyphMap('fill');
const regularEntries = resolveEntries(names.regular, regularAliases, regularGlyphs, 'regular');
const fillEntries = resolveEntries(names.fill, new Map(), fillGlyphs, 'fill');
const legacyFillEntries = resolveEntries(
  new Set(legacyFilledIcons.keys()),
  legacyFilledIcons,
  fillGlyphs,
  'fill',
);
const css = generatedCss(regularEntries, fillEntries, legacyFillEntries);

if (checkOnly) {
  if (readFileSync(cssOutput, 'utf8') !== css) {
    throw new Error('Phosphor-Subset ist veraltet. `node scripts/generate-phosphor-subset.mjs` ausführen.');
  }
  console.log(`Phosphor-Subset aktuell: ${regularEntries.length} reguläre, ${fillEntries.length} gefüllte Icons.`);
} else {
  mkdirSync(outputDirectory, { recursive: true });
  subsetFont(
    join(phosphorDirectory, 'regular/Phosphor.ttf'),
    join(outputDirectory, 'phosphor-regular-subset.ttf'),
    new Set(regularEntries.map(({ code }) => code)),
  );
  subsetFont(
    join(phosphorDirectory, 'fill/Phosphor-Fill.ttf'),
    join(outputDirectory, 'phosphor-fill-subset.ttf'),
    new Set([...fillEntries, ...legacyFillEntries].map(({ code }) => code)),
  );
  writeFileSync(cssOutput, css);
  console.log(
    `Phosphor-Subset erzeugt: ${regularEntries.length} reguläre, ${fillEntries.length} gefüllte Icons, ` +
    `${statSync(cssOutput).size} Byte CSS.`,
  );
}
