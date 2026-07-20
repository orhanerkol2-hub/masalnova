/**
 * Small, device-local app state.
 *
 * This module deliberately persists only opaque story IDs, numeric progress and
 * filter preferences. The allow-list in `sanitizeState` prevents story copy,
 * descriptions, images/blobs or account-shaped data from reaching storage.
 */

export const APP_STATE_VERSION = 1 as const;
export const APP_STATE_STORAGE_KEY = 'masalnova:app-state';
export const APP_STATE_CHANGE_EVENT = 'masalnova:app-state-change';

const MAX_ID_LENGTH = 120;
const MAX_PREFERENCE_LENGTH = 40;
const MAX_FAVORITES = 200;
const MAX_RECENT_STORIES = 20;
const MAX_PROGRESS_ENTRIES = 500;

export interface AppPreferences {
  age: string | null;
  duration: string | null;
  mood: string | null;
}

export interface AppState {
  version: typeof APP_STATE_VERSION;
  favorites: string[];
  recentStoryIds: string[];
  progress: Record<string, number>;
  preferences: AppPreferences;
}

export interface AppStateChangeDetail {
  state: AppState;
}

const DEFAULT_STATE: AppState = {
  version: APP_STATE_VERSION,
  favorites: [],
  recentStoryIds: [],
  progress: {},
  preferences: {
    age: null,
    duration: null,
    mood: null,
  },
};

let memoryState = cloneState(DEFAULT_STATE);

function cloneState(state: AppState): AppState {
  return {
    version: APP_STATE_VERSION,
    favorites: [...state.favorites],
    recentStoryIds: [...state.recentStoryIds],
    progress: { ...state.progress },
    preferences: { ...state.preferences },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const id = value.trim();
  if (!id || id.length > MAX_ID_LENGTH) return null;

  // IDs are tokens, never human-readable content or URLs.
  return /^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(id) ? id : null;
}

function normalizePreference(value: unknown): string | null {
  if (value === null || value === '') return null;
  if (typeof value !== 'string') return null;
  const preference = value.trim();
  if (!preference || preference.length > MAX_PREFERENCE_LENGTH) return null;
  return /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(preference) ? preference : null;
}

function normalizeIds(value: unknown, limit: number): string[] {
  if (!Array.isArray(value)) return [];

  const ids: string[] = [];
  const seen = new Set<string>();
  for (const candidate of value) {
    const id = normalizeId(candidate);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
    if (ids.length === limit) break;
  }
  return ids;
}

function normalizeProgress(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {};

  const progress: Record<string, number> = {};
  let count = 0;
  for (const [candidateId, candidateProgress] of Object.entries(value)) {
    const id = normalizeId(candidateId);
    if (!id || typeof candidateProgress !== 'number' || !Number.isFinite(candidateProgress)) continue;
    progress[id] = Math.round(Math.min(100, Math.max(0, candidateProgress)));
    count += 1;
    if (count === MAX_PROGRESS_ENTRIES) break;
  }
  return progress;
}

function sanitizeState(value: unknown): AppState {
  if (!isRecord(value) || value.version !== APP_STATE_VERSION) {
    return cloneState(DEFAULT_STATE);
  }

  const preferences = isRecord(value.preferences) ? value.preferences : {};
  return {
    version: APP_STATE_VERSION,
    favorites: normalizeIds(value.favorites, MAX_FAVORITES),
    recentStoryIds: normalizeIds(value.recentStoryIds, MAX_RECENT_STORIES),
    progress: normalizeProgress(value.progress),
    preferences: {
      age: normalizePreference(preferences.age),
      duration: normalizePreference(preferences.duration),
      mood: normalizePreference(preferences.mood),
    },
  };
}

function notify(state: AppState): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<AppStateChangeDetail>(APP_STATE_CHANGE_EVENT, {
      detail: { state: cloneState(state) },
    }),
  );
}

/** Safely reads and validates the current state. */
export function loadState(): AppState {
  if (typeof window === 'undefined') return cloneState(DEFAULT_STATE);

  try {
    const raw = window.localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!raw) {
      memoryState = cloneState(DEFAULT_STATE);
      return cloneState(memoryState);
    }
    memoryState = sanitizeState(JSON.parse(raw));
  } catch {
    // Corrupt JSON, disabled storage and privacy modes fall back in memory.
  }

  return cloneState(memoryState);
}

/**
 * Saves only the allow-listed state shape and returns the stored snapshot.
 * Storage failures never interrupt the UI; the state remains available in memory.
 */
export function saveState(value: unknown): AppState {
  const state = sanitizeState(value);
  memoryState = state;

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Private mode/quota errors should not break app interactions.
    }
  }

  notify(state);
  return cloneState(state);
}

/** Returns an isolated snapshot so callers cannot mutate stored state directly. */
export function getState(): AppState {
  return loadState();
}

export function toggleFavorite(storyId: string): AppState {
  const id = normalizeId(storyId);
  const state = loadState();
  if (!id) return state;

  const index = state.favorites.indexOf(id);
  if (index >= 0) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.unshift(id);
    state.favorites = state.favorites.slice(0, MAX_FAVORITES);
  }
  return saveState(state);
}

export function recordRecent(storyId: string): AppState {
  const id = normalizeId(storyId);
  const state = loadState();
  if (!id) return state;

  state.recentStoryIds = [id, ...state.recentStoryIds.filter((item) => item !== id)].slice(
    0,
    MAX_RECENT_STORIES,
  );
  return saveState(state);
}

export function setProgress(storyId: string, progress: number): AppState {
  const id = normalizeId(storyId);
  const state = loadState();
  if (!id || !Number.isFinite(progress)) return state;

  state.progress[id] = Math.round(Math.min(100, Math.max(0, progress)));
  return saveState(state);
}

export function setPreferences(preferences: Partial<AppPreferences>): AppState {
  const state = loadState();
  for (const key of ['age', 'duration', 'mood'] as const) {
    if (key in preferences) {
      state.preferences[key] = normalizePreference(preferences[key]);
    }
  }
  return saveState(state);
}
