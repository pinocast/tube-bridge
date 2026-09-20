self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Lascia transitare le richieste di rete standard senza bloccarle o metterle in cache
  e.respondWith(fetch(e.request));
});

