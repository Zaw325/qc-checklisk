const CACHE_NAME = 'qc-checklist-v1';
const REPO_NAME = 'qc-checklist'; // <-- အစ်ကို့ Repo နာမည်ကို ဒီမှာ ပြောင်းနိုင်ပါတယ်
​const URLS_TO_CACHE = [
/${REPO_NAME}/,
/${REPO_NAME}/index.html,
/${REPO_NAME}/manifest.json,
'https://www.google.com/search?q=https://cdn.tailwindcss.com',
'https://www.google.com/search?q=https://unpkg.com/lucide-react%400.395.0/dist/umd/lucide.js',
'https://www.google.com/search?q=https://placehold.co/192x192/2563eb/ffffff%3Ftext%3DQC',
'https://www.google.com/search?q=https://placehold.co/512x512/2563eb/ffffff%3Ftext%3DQC'
];
​// Install event
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Opened cache');
return cache.addAll(URLS_TO_CACHE);
})
.catch(err => {
console.error('Failed to open cache: ', err);
})
);
});
​// Fetch event (Cache-first strategy)
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
// Cache hit - return response
if (response) {
return response;
}
// Not in cache - fetch from network
return fetch(event.request);
}
)
);
});
​// Activate event - remove old caches
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});
