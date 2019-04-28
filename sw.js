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

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          if (!e.request.url.includes("googletagmanager")) {
            cache.put(e.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
