// Stale-while-revalidate service worker for the 7-Day Fitness Plan PWA.
var CACHE_NAME = 'fitness-cache-v4';
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
  var url = new URL(event.request.url);
  // Cross-origin requests (e.g. embedded YouTube players) bypass the cache and
  // go straight to the network — they are never cached.
  if(url.origin !== self.location.origin){ return; }

  // Same-origin shell: stale-while-revalidate. Serve the cached copy immediately
  // for speed, and refetch in the background to keep the cache current so the
  // next launch is up to date.
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.match(event.request).then(function(cached){
        var network = fetch(event.request).then(function(resp){
          if(resp && resp.status === 200 && resp.type === 'basic'){
            cache.put(event.request, resp.clone());   // revalidate
          }
          return resp;
        }).catch(function(){
          // Offline. Navigations fall back to the app shell.
          if(event.request.mode === 'navigate'){ return cache.match('./index.html'); }
          // Sub-resource miss while offline: return the cached copy if present,
          // else an explicit 504 so the handler never resolves to `undefined`.
          // (Unreachable for the shipped app: every same-origin resource is
          // precached — this is a defined fallback for an unexpected uncached GET.)
          return cached || new Response('', { status: 504, statusText: 'Offline' });
        });
        return cached || network;   // stale-first, else network
      });
    })
  );
});
