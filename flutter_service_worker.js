'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/1494.gif": "58fb5f753a3f7ea26eed5a44c1b3c56e",
"assets/AssetManifest.bin": "70a5be8577843b18bb8aa899ff84b672",
"assets/AssetManifest.json": "aa1993a21bf5f702db72a7851207910c",
"assets/assets/images/247672167_1423431341386750_3581772462151814100_n.jpg": "8793bda61622c71fa3e913caa776e85a",
"assets/assets/images/269687271_1461303537599530_4989178079168148131_n.jpg": "008b1f8219cb0be4890152a33eb34c78",
"assets/assets/images/277563506_1527331110996772_4605645507836425168_n.jpg": "5641af9fe82234784d33f854baa93828",
"assets/assets/images/custom_resized_75ac9bcc-4461-48de-8748-47cde6bb26d1.jpg": "17dec30306beaa509bed92a97d302bf5",
"assets/assets/images/iconinsta.png": "3c635180fd664ba04116a224225934da",
"assets/assets/images/IMG-18.jpg": "829ec06b57ca93425966762f36e2acea",
"assets/assets/images/IMG-2433.jpg": "93865675dd8642d30fa52008f6a5551d",
"assets/assets/images/IMG-2435.jpg": "2b9a8cd25015a95760d23655d52ce79f",
"assets/assets/images/IMG-2450.jpg": "c08fd3529c92e049e84302feab578156",
"assets/assets/images/IMG-2453.jpg": "48aec1458138e6eb92fcf0aa0f0490f3",
"assets/assets/images/IMG-2457.jpg": "d9eca0dc03fc36a5985f615970035c99",
"assets/assets/images/IMG-2458.jpg": "01d7e0bb3251bffa7107a6324d7d41d5",
"assets/assets/images/IMG-2459.jpg": "19844edc59e8bc95476e648fdfe918a5",
"assets/assets/images/IMG-2460.jpg": "e54e97381686bedc17f369733839de00",
"assets/assets/images/IMG_1586.jpg": "1631dcdd577b6d21f4e7411d2e996d14",
"assets/assets/images/IMG_1596.jpg": "06c5b57a4a3dfd0f9777b24a46bd6259",
"assets/assets/images/IMG_1597.jpg": "7663599fb3864f8dc0c8900d5a62d5b7",
"assets/assets/images/insta%2520icon.jpg": "a11a1b92edbf3034073f579044b578ab",
"assets/assets/images/Logo_Hymeri_.svg": "9e9ba377a48de486c562f1048c1dfd6d",
"assets/assets/images/meister.png": "1fb577003dc0df8bf766f9e3916a8b16",
"assets/assets/images/ushtria.jpg": "9c569ef81b65b24ec139992e1efbf070",
"assets/FontManifest.json": "316a636bcc17db9bf8d0e5e78901c58b",
"assets/fonts/MaterialIcons-Regular.otf": "9335ad921538e57481e30c28d5d4dff5",
"assets/Logo_Hymeri_.svg": "9e9ba377a48de486c562f1048c1dfd6d",
"assets/meister.png": "1fb577003dc0df8bf766f9e3916a8b16",
"assets/NOTICES": "45bbaef7f511fb7a4a58d55549258cc2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/packages/social_media_flutter/fonts/icons.ttf": "a2943704265adec89858d6d95150a109",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/android-chrome-192x192.png": "aba408c1fd261b255fa16c2a8d01cd8d",
"icons/android-chrome-512x512.png": "49f80dd3eff3ce3ee28959893bd9bbdd",
"icons/apple-touch-icon.png": "9c5da4cdc9c922342dee6fc08822199c",
"index.html": "2b12d4719c403e6c669fad5a72f696f6",
"/": "2b12d4719c403e6c669fad5a72f696f6",
"logo%20(2).png": "49f80dd3eff3ce3ee28959893bd9bbdd",
"main.dart.js": "ff37b8f29bbbd7c6ddc0c4613d10e924",
"manifest.json": "e0e741ef2dbc7742b7c54435b40d6c25",
"version.json": "1991ddc54fe836f4f47c30751d5302ad"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
