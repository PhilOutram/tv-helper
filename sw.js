// Network-first service worker: always fetch the latest when online, fall back to the
// cache when offline. Keep ASSETS in sync with the files the app needs.
const CACHE = "tv-helper-v2";
const ASSETS = [
  ".",
  "index.html",
  "styles.css?v=v0.02",
  "app.js?v=v0.02",
  "guides.js?v=v0.02",
  "screens.js?v=v0.02",
  "notes.js?v=v0.02",
  "version.js?v=v0.02",
  "manifest.webmanifest",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "img/panasonic.webp",
  "img/samsung.webp",
  "img/recorder.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
