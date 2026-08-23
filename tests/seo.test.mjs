import test from 'node:test';
import assert from 'node:assert/strict';
import { storySeoTitle } from '../src/lib/seo.ts';

const assertBalancedParentheses = (value) => {
  assert.equal((value.match(/\(/g) ?? []).length, (value.match(/\)/g) ?? []).length);
};

test('story title keeps the age range only when the complete token fits', () => {
  assert.equal(
    storySeoTitle('Küçük Bulut', { ageRange: '3-5 yaş' }),
    'Küçük Bulut Masalı (3-5 Yaş) | MasalNova',
  );
});

test('long story titles never expose a truncated age parenthetical', () => {
  const title = storySeoTitle("Horoz Kırmızıbey ile Kedi Pamuk'un Adil Araştırması", {
    ageRange: '5-7 yaş',
  });

  assert.ok(title.length <= 60);
  assert.ok(title.endsWith(' | MasalNova'));
  assert.doesNotMatch(title, /\([^)]*$/u);
  assertBalancedParentheses(title);
});

test('story intent is not duplicated when it is already present', () => {
  assert.equal(
    storySeoTitle('Dedenin Akşam Sepeti: Sakin Uyku Masalı'),
    'Dedenin Akşam Sepeti: Sakin Uyku Masalı | MasalNova',
  );
});

test('short Islamic story titles get a compact search-intent suffix', () => {
  assert.equal(
    storySeoTitle('Sevr Mağarası', { ageRange: '7-9 yaş', islamic: true }),
    'Sevr Mağarası – İslami Hikâye | MasalNova',
  );
});

test('long Islamic story titles retain whole words and remain compact', () => {
  const title = storySeoTitle("Mûsâ Peygamber ile Allah'ın İlim Verdiği Kul", {
    ageRange: '8–9 yaş · ebeveyn eşliğinde',
    islamic: true,
  });

  assert.equal(title, "Mûsâ Peygamber ile Allah'ın İlim Verdiği Kul | MasalNova");
  assert.ok(title.length <= 60);
  assertBalancedParentheses(title);
});
