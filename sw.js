var version = '1.1';

var cacheName = 'JobSearcher' + version;

var appFiles = [
 "./index.html",
 "./script.js",
 "./style.css",
 "./favicon.png"
];

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching all: app content');
      return cache.addAll(appFiles);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
