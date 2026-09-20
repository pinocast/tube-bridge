const CACHE_NAME = 'invidious-pwa-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png',
  'sw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Gestisce le richieste di condivisione ignorando i parametri di ricerca nella cache
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('index.html') || url.pathname === '/') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('index.html'))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
  }
});
