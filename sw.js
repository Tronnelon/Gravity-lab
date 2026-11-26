const CACHE = 'gravity-lab-051';
const ASSETS = [
  './', './index.html', './manifest.json', './icon.png', './music.js', './deep-space-drift.m4a'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(response => response || fetch(request)));
});
