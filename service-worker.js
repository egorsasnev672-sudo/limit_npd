/* ============================================================
   M30: SERVICE WORKER — офлайн-кэш
   Версия: увеличьте CACHE_VERSION при обновлении index.html
   ============================================================ */
var CACHE_VERSION = 'taxcalc-v1-2026-11-08';
var CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './tessdata/rus.traineddata.gz',
  './tessdata/eng.traineddata.gz'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      /* Кэшируем по одному, чтобы отсутствие tessdata не ломало установку */
      return Promise.all(CORE_ASSETS.map(function(url){
        return cache.add(url).catch(function(){ /* игнорируем отсутствующие */ });
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE_VERSION) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var req = event.request;
  if(req.method !== 'GET') return;

  /* Навигационные запросы — network-first, fallback на кэш */
  if(req.mode === 'navigate'){
    event.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){
        return caches.match(req).then(function(r){ return r || caches.match('./index.html'); });
      })
    );
    return;
  }

  /* Остальное — cache-first, затем сеть */
  event.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;
      return fetch(req).then(function(res){
        if(!res || res.status !== 200 || res.type === 'opaque') return res;
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){
        return caches.match('./index.html');
      });
    })
  );
});
