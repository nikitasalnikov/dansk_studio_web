'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3db0e4a2c6637af8fd691cd7c703cd24",
"assets/assets/fonts/Raleway.ttf": "75b4247fdd3b97d0e3b8e07b115673c2",
"assets/assets/icons/telegram.svg": "ed8d81aea2fe005906050f1ac90c0793",
"assets/assets/icons/Telegram_app.svg": "7aa03f8d6a8c9f4af615195baac3aaaa",
"assets/assets/icons/Viber.svg": "44c1d870aeda7d865570c016377bedc1",
"assets/assets/icons/WhatsApp.svg": "a9f0eb91331342b383f4f150c25e8b51",
"assets/assets/images/apple_pay.png": "1243fff260fc83d51c70a5d1ff8e3a18",
"assets/assets/images/author_course-img.png": "01629158cf1cfa8132f0c2fe8bb85c6a",
"assets/assets/images/first_review.png": "bbfb240ddfc8a0a52d4a2790618ae85b",
"assets/assets/images/footerTelegram.png": "21e44f15ea4a58e49c13f693b12ea65a",
"assets/assets/images/footer_facebook.png": "23027e5fc557c8d0479a99002bb4b924",
"assets/assets/images/footer_instagram.png": "55f90c830ec3abf8b5ce9e623bc6089e",
"assets/assets/images/footer_whatsapp.png": "63bdfb6532b6c8b1e9b485218ed2249a",
"assets/assets/images/fourth_review.png": "e3c2147d4529f26249c9920f69353759",
"assets/assets/images/group_course.png": "2081a70b55d4696938f66efc3d5b5993",
"assets/assets/images/header_img.png": "cf9f7a6876f0cdb2a996b39329b0a826",
"assets/assets/images/header_img_bg.png": "3bac734af914093aa031c302c15fe687",
"assets/assets/images/individual_course.png": "1dde8edec526fa75f679ac77669e1c65",
"assets/assets/images/logo.png": "d4f78c845c5bf75551aba32ed5bc8b18",
"assets/assets/images/main_about-bg.png": "b5646e7af3908a5a25c8ec8d8b8f52ef",
"assets/assets/images/main_about.png": "6057d6111c84b465faa734ee2b68aed7",
"assets/assets/images/main_firstStep.png": "1420fb51a64e8aaf2b16c73ec2a9495c",
"assets/assets/images/main_firstStep_bg.png": "d6a9c20ed3fe45a7f8df2f63b438cfcb",
"assets/assets/images/main_img-left.png": "62baaa1453361066ee691bf9e1631b26",
"assets/assets/images/main_img-right.png": "7e595bcb5caf89d24e76029da26c77f2",
"assets/assets/images/mastercard.png": "bef4f4d23ad2bb9fcc0ea2a9a17cd771",
"assets/assets/images/navTelegram.png": "f26469bfaa02e3bf055c2edded15c4d4",
"assets/assets/images/navViber.png": "574097460ea1e0986f83a702094ea2ca",
"assets/assets/images/navWhatsapp.png": "afe4975e5bf7ba73e1d7ced33bf28c29",
"assets/assets/images/second_review.png": "2de961e046a99893696c3edb26285b57",
"assets/assets/images/third_review.png": "c89422e0f30a949eeb98437837a2c6f5",
"assets/assets/images/visa.png": "cec5987ad563d8ca1232183383a7a257",
"assets/FontManifest.json": "93f637d8ddbc2bfb952275bc6feb8558",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "cf47b5046981f0c30330195cbf7f8317",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "becfb7b563a2ef0744907775c595016e",
"/": "becfb7b563a2ef0744907775c595016e",
"main.dart.js": "c49dbe574fa84b92ba32136591f13a0d",
"manifest.json": "0531d444422ff95c55bf7577b33d859a",
"version.json": "01e2c6df3e274ed2b4fb39e7c38bb39c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
