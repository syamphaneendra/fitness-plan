// Cache-first service worker for the 7-Day Fitness Plan PWA.
var CACHE_NAME = 'fitness-cache-v3';
var PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(PRECACHE_URLS);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(name){
        if(name !== CACHE_NAME){ return caches.delete(name); }
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET'){ return; }
  // Cross-origin requests (e.g. embedded video players) bypass the cache and go to the network.
  if(new URL(event.request.url).origin !== self.location.origin){ return; }
  event.respondWith(
    caches.match(event.request).then(function(cached){
      if(cached){ return cached; }
      return fetch(event.request).then(function(response){
        return response;
      }).catch(function(){
        // Offline and not in cache: fall back to the app shell for navigations.
        if(event.request.mode === 'navigate'){
          return caches.match('./index.html');
        }
      });
    })
  );
});
