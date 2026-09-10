const CACHE='ai-cert-v6';
const CORE=['/','/index.html','/manifest.webmanifest','/icon-192.svg','/icon-512.svg','/q1.js','/q2.js','/q3.js','/q4.js','/q5.js','/q6.js','/q7.js','/q8.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.pathname==='/'||u.pathname==='/index.html'||u.pathname==='/sw.js'||u.pathname==='/hero.svg'||u.pathname==='/hero-cute.webp'||u.pathname==='/hero-cute-v2.svg'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('/index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r})));
});
