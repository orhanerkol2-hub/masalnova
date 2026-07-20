const CACHE_PREFIX = 'masalnova-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const OFFLINE_URL = '/offline/';

// Deliberately small: no pages, stories, cover archive or third-party files.
const PRECACHE_URLS = [OFFLINE_URL, '/manifest.webmanifest'];
const PRECACHE_PATHS = new Set(PRECACHE_URLS);
const STATIC_DESTINATIONS = new Set(['style', 'script', 'font']);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
              .map((key) => caches.delete(key)),
          ),
        ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ads, analytics, video providers and every other third-party request remain
  // completely outside the service worker and its caches.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // All HTML, including story pages, is network-only. On a connection failure
    // the generic offline screen is shown without storing the requested page.
    event.respondWith(
      fetch(request).catch(() =>
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.match(OFFLINE_URL, { ignoreSearch: true })),
      ),
    );
    return;
  }

  const isPrecachedShellFile = PRECACHE_PATHS.has(url.pathname);
  const isGeneratedUiAsset =
    url.pathname.startsWith('/_astro/') && STATIC_DESTINATIONS.has(request.destination);

  if (!isPrecachedShellFile && !isGeneratedUiAsset) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (!response || !response.ok || response.type !== 'basic') return response;

          return cache.put(request, response.clone()).then(() => response);
        });
      }),
    ),
  );
});
