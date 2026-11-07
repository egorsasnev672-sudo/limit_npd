/* Налоговый калькулятор — Service Worker (базовый кэш) */
const CACHE_NAME = 'taxcalc-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap',
  'https://raw.githubusercontent.com/egorsasnev672-sudo/limit_npd/main/zoomai-69478-1.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS.map(function(u){ 
        return new Request(u, {mode: u.startsWith('http') ? 'cors' : 'same-origin'}); 
      })).catch(function(){});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  
  var url = e.request.url;
  
  // CDN библиотеки (Chart.js, jsPDF, XLSX, jsQR, Tesseract) — network-first
  if (url.indexOf('cdn.jsdelivr.net') >= 0 || url.indexOf('fonts.gstatic.com') >= 0) {
    e.respondWith(
      fetch(e.request).then(function(resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function(c){ c.put(e.request, copy); });
        return resp;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }
  
  // Остальное (index.html, шрифты, иконки) — cache-first с fallback на network
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function(c){ c.put(e.request, copy); });
        return resp;
      }).catch(function() {
        if (e.request.destination === 'document') return caches.match('./index.html');
      });
    })
  );
});
