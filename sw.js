const CACHE_NAME = 'invidious-conv-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js'
];

// Installa il Service Worker e salva i file base nella cache locale
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Attiva il Service Worker e pulisce eventuali vecchie cache
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Gestisce le richieste: tenta la rete e, se offline, usa la cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
