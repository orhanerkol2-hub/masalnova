export type ReaderTheme = 'system' | 'light' | 'sepia' | 'dark';
export type ReaderSize = 's' | 'm' | 'l' | 'xl';
export type ReaderFont = 'sans' | 'serif';
export type ReaderLeading = 'compact' | 'comfortable' | 'spacious';

export interface ReaderPrefs {
  theme: ReaderTheme;
  size: ReaderSize;
  font: ReaderFont;
  leading: ReaderLeading;
}

export const STORAGE_KEY = 'masalnova:reader';

export const DEFAULT_PREFS: ReaderPrefs = {
  theme: 'system',
  size: 'm',
  font: 'sans',
  leading: 'comfortable',
};

const VALID: Record<keyof ReaderPrefs, readonly string[]> = {
  theme: ['system', 'light', 'sepia', 'dark'],
  size: ['s', 'm', 'l', 'xl'],
  font: ['sans', 'serif'],
  leading: ['compact', 'comfortable', 'spacious'],
};

export function loadPrefs(): ReaderPrefs {
  const prefs: ReaderPrefs = { ...DEFAULT_PREFS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return prefs;
    const parsed = JSON.parse(raw) as Partial<ReaderPrefs>;
    for (const key of Object.keys(VALID) as (keyof ReaderPrefs)[]) {
      const value = parsed[key];
      if (typeof value === 'string' && VALID[key].includes(value)) {
        (prefs as Record<string, string>)[key] = value;
      }
    }
  } catch {
    /* Use defaults when storage is unavailable or corrupt. */
  }
  return prefs;
}

export function savePrefs(prefs: ReaderPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* Private mode/quota errors should not break reading. */
  }
}

export function applyPrefs(prefs: ReaderPrefs): void {
  const root = document.documentElement;
  root.dataset.readerTheme = prefs.theme;
  root.dataset.readerSize = prefs.size;
  root.dataset.readerFont = prefs.font;
  root.dataset.readerLeading = prefs.leading;
}

export function updatePref<K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]): ReaderPrefs {
  const prefs = loadPrefs();
  prefs[key] = value;
  savePrefs(prefs);
  applyPrefs(prefs);
  return prefs;
}
