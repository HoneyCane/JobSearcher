version = '1.1';

let cacheName = 'JobSearcher' + version;

var appFiles = [
 "./index.html",
 "./script.js",
 "./style.css",
 "./favicon.png"
];

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(appFiles)
      .then(() => self.skipWaiting());
    })
  )
});

// https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim
// 
// self.addEventListener('activate',  event => {
//   event.waitUntil(self.clients.claim());
// });

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
