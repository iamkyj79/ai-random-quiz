const CACHE='ai-cert-v9-final';
const CORE=['/','/index.html','/manifest.webmanifest','/icon-192.svg','/icon-512.svg','/hero-reference-v5.webp','/hero-mobile-v5.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;if(u.pathname==='/'||u.pathname==='/index.html'||u.pathname==='/sw.js'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('/index.html')));return;}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,cp)).catch(()=>{});return r})));});
