// Mechanische Auto-Fixes für Märchen — nur EINDEUTIGE Defekte, Frontmatter-sicher.
//
//   1. Editier-/Meta-Notizen ([Not: ...], [... düzeltildi]) aus dem Body entfernen.
//   2. Geleakte JSON-/Markdown-Artefakte am Textende strippen:
//        - nachlaufende Klammern } ] { [
//        - an Satzzeichen geklebte Junk-Token (".atolic", ".eger")
//        - UNPAARIGE Anführungszeichen am Ende (paarige Zitatenden bleiben erhalten!)
//        - vereinzelte ** am Ende
//   3. readingTime für ALLE Dateien = round(words/130) im Frontmatter setzen.
//
// Der eigentliche Fließtext wird nie inhaltlich geändert; nur Müll am Rand entfernt.
// Genuin abgeschnittene Geschichten (enden mitten im Satz) werden NICHT repariert —
// sie werden gemeldet und via expand-short-stories.mjs neu erzeugt.
//
//   node scripts/fix-stories-mechanical.mjs --dry-run   # zeigt nur, was sich ändern würde
//   node scripts/fix-stories-mechanical.mjs             # wendet an
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { wordCount, readingTimeFor } from './lib/story-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = join(__dirname, '..', 'src', 'content', 'stories');
const DRY = process.argv.includes('--dry-run');

const META_NOTE = /\s*\[[^\]]*(Not|Note|düzelt|internal|tag|Anmerk|Hinweis|fixed|corrected)[^\]]*\]/gi;
const QUOTE_CHARS = /["'“”„‟‘’]/g;

// Zählt Anführungszeichen im Absatz, ohne türkische Wort-Apostrophe (Keloğlan'ın).
function quoteCount(text) {
  const withoutPossessive = text.replace(/(?<=\p{L})['’](?=\p{L})/gu, '');
  return (withoutPossessive.match(QUOTE_CHARS) || []).length;
}

// Entfernt Rand-Artefakte am Textende, ohne echten Inhalt anzutasten.
export function cleanBody(input) {
  let b = input.replace(/\s+$/, '');
  b = b.replace(META_NOTE, '').replace(/\s+$/, '');

  let prev;
  do {
    prev = b;
    // nachlaufende Klammern (nie legitim)
    b = b.replace(/[}{\]\[]+$/, '').replace(/\s+$/, '');
    // isoliertes Kurz-Token, das an Klammer/Zitat klebt (Junk-Fragment "}}I{" -> "I")
    b = b.replace(/(?<=[}{\]\[“„‘”’"'])[A-Za-z0-9]{1,3}$/u, '');
    // an Satzzeichen geklebtes Junk-Token ohne Leerzeichen (".atolic", ".eger")
    b = b.replace(/([.!?…])[A-Za-zçğıöşüâîûÇĞİÖŞÜ]{1,12}$/u, '$1');
    // vereinzelte ** am Ende nach Satzzeichen/Zitat
    b = b.replace(/([.!?…"”’])\s*\*{1,2}$/u, '$1').replace(/\s+$/, '');
    // Öffnende Zitatglyphen am Ende sind immer Artefakte
    b = b.replace(/[“„‘]+$/u, '').replace(/\s+$/, '');
    // Schließende/gerade Zitatzeichen am Ende NUR strippen, wenn im letzten
    // Absatz unpaarig (= Artefakt); paarige Zitatenden bleiben erhalten.
    if (/["'”’]$/u.test(b)) {
      const lastPara = b.split(/\n\s*\n/).pop();
      if (quoteCount(lastPara) % 2 === 1) b = b.replace(/["'”’]$/u, '').replace(/\s+$/, '');
    }
  } while (b !== prev);

  return b;
}

function setReadingTime(fm, minutes) {
  if (/^readingTime:/m.test(fm)) {
    return fm.replace(/^readingTime:.*$/m, `readingTime: ${minutes}`);
  }
  // Falls (unerwartet) nicht vorhanden: nach categories oder am Ende einfügen.
  return `${fm}\nreadingTime: ${minutes}`;
}

async function main() {
  const files = (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.md'));
  let bodyChanged = 0, rtChanged = 0;
  const changes = [];

  for (const f of files) {
    const raw = await readFile(join(STORIES_DIR, f), 'utf8');
    const m = raw.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
    if (!m) { console.warn(`  ⚠ kein Frontmatter: ${f}`); continue; }
    let [, header, body] = m;
    const fm = header.slice(4, -5); // ohne führendes/abschließendes ---

    const bodyTrim = body.replace(/\s+$/, '');
    const cleaned = cleanBody(bodyTrim);
    const words = wordCount(cleaned);
    const minutes = readingTimeFor(words);

    let newFm = setReadingTime(fm, minutes);
    const storedRt = parseInt((fm.match(/^readingTime:\s*(\d+)/m) || [])[1], 10);

    const bodyDidChange = cleaned !== bodyTrim;
    const rtDidChange = storedRt !== minutes;
    if (bodyDidChange) { bodyChanged++; changes.push({ f, before: bodyTrim.slice(-45), after: cleaned.slice(-45) }); }
    if (rtDidChange) rtChanged++;

    if (!bodyDidChange && !rtDidChange) continue;
    const out = `---\n${newFm}\n---\n${cleaned}\n`;
    if (!DRY) await writeFile(join(STORIES_DIR, f), out, 'utf8');
  }

  console.log(`${DRY ? '[DRY] ' : ''}Body bereinigt: ${bodyChanged} | readingTime aktualisiert: ${rtChanged}`);
  console.log(`\nBody-Änderungen (Textende vorher → nachher):`);
  for (const c of changes) console.log(`  ${c.f}\n     – ${JSON.stringify(c.before)}\n     + ${JSON.stringify(c.after)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
