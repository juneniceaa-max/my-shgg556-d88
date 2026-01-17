const CACHE_NAME = 'v1_cache';
// 这里的数组要包含你图片里显示的所有文件名
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/daily.html',
  '/matrix.html',
  '/monthly.html',
  '/weekly.html',
  '/yearly.html',
  '/icon.png'
];

// 安装阶段：缓存文件
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker 激活成功');
});

// 策略：优先从缓存中读取，如果没有则请求网络
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
