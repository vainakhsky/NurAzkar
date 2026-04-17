const CACHE = 'nurazkar-v1';
const ASSETS = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/manifest.webmanifest',
  '/static/icon-192.png',
  '/static/icon-512.png',
  '/api/morning',
  '/api/evening'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
