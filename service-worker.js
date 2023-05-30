// service-worker.js
// Cache version
const cacheName = 'endorsements-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/android-chrome-144x144.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

// Install event
self.addEventListener('install', async (event) => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll(filesToCache);
    } catch (error) {
      console.error('Error during service worker installation:', error);
    }
  });
  

// Activate event
self.addEventListener('activate', async (event) => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    } catch (error) {
      console.error('Error during service worker activation:', error);
    }
  });

// Fetch event
self.addEventListener('fetch', async (event) => {
    try {
      const response = await caches.match(event.request);
      event.respondWith(response || fetch(event.request));
    } catch (error) {
      console.error('Error during fetch event:', error);
    }
  });