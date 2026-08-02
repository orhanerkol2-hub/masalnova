export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Small defensive persistence adapter. Browsers can disable or restrict local
 * storage, so every storage access is treated as fallible.
 */
export class HighScoreStore {
  private fallbackScore = 0;

  public constructor(
    private readonly storage: KeyValueStore | null,
    private readonly key: string,
  ) {}

  public read(): number {
    if (!this.storage) {
      return this.fallbackScore;
    }

    try {
      const parsed = Number.parseInt(this.storage.getItem(this.key) ?? '', 10);
      const storedScore =
        Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
      this.fallbackScore = Math.max(this.fallbackScore, storedScore);
      return this.fallbackScore;
    } catch {
      return this.fallbackScore;
    }
  }

  public commitIfHigher(score: number): number {
    const safeScore =
      Number.isFinite(score) && score > 0 ? Math.floor(score) : 0;
    const previous = this.read();
    const next = Math.max(previous, safeScore);
    this.fallbackScore = next;

    if (this.storage && next !== previous) {
      try {
        this.storage.setItem(this.key, String(next));
      } catch {
        // The in-memory result is still useful when persistence is unavailable.
      }
    }

    return next;
  }
}
