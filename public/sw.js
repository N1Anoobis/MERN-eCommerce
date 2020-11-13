var cacheName = 'app-name';
var filesToCache = [
  '/',
];
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate',  event => {
  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(self.clients.claim());
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});