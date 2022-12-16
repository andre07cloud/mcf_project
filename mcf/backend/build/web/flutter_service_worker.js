'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "b272f75bea26addc9a156b76dea26151",
"assets/assets/amine.jpg": "4957fb62639996089e972b062c26b83f",
"assets/assets/anime_mcf.png": "8d72fb1076f8419e5f961ee2cb1d9e53",
"assets/assets/AppIcons.zip": "67b1013e0e18d5285d21450c71f05084",
"assets/assets/arrierplanquiz.jpg": "3ac51c84f8d7b85523d2915f5e26828f",
"assets/assets/astranaut.png": "e1b5a2749d7957ad256948fdb921a7ab",
"assets/assets/authentication.png": "c27cf36695b9b4946cd3dd4f9aa1b08b",
"assets/assets/Banner.png": "96b820b756a5622daec57a5ba9514af3",
"assets/assets/bonhomme.jpeg": "834b6abb3c0f9ebdb97a95507c3097f7",
"assets/assets/certif_an.png": "5ee82f5b44a7d0be5e4b6a52fdc6bdc0",
"assets/assets/certif_excel.png": "91c4cb90af0a8472e11dc48d83df1c58",
"assets/assets/certif_scrum.png": "59726326c9fa6b0ba161cbc99bf0050f",
"assets/assets/chatt.png": "879398981efec4f33bfe0a1163f9655f",
"assets/assets/design_mcf.png": "a19b79728fab25c436f150f61267fafd",
"assets/assets/desktop.png": "f2c87363d3b1ccfe111b1315b429110c",
"assets/assets/dribble.png": "37daf912f3c8e8d72a09197934898bbe",
"assets/assets/fondMessageMCF.png": "419eaa4f45dcf0255893e52b73d56de6",
"assets/assets/forum.png": "5f317724801327dc2d70624d25db8b48",
"assets/assets/icons/mobile.png": "607baef715938a2544485bbcdbf4387d",
"assets/assets/image1.png": "7c5c23ddcfafbb158a59b676c30509c3",
"assets/assets/image2.png": "56db7dd62ab50048bccef13809589ff3",
"assets/assets/immo.pdf": "77febab0c0b372f5f5e81b8c82264b7e",
"assets/assets/kevin.jpg": "4c885e26c3252dd828884d03969fb583",
"assets/assets/livres.jpeg": "4a31e60d31c69d6bba7ebc4763ec525e",
"assets/assets/logo.png": "add4be96fc5fbc4597521de3ab6aee5e",
"assets/assets/logo1_mcf.PNG": "06bc72bcecf3b628acb029571bf5792a",
"assets/assets/logo_mcf.png": "2fcfed1b88c66df54a26f5cbcf3114d6",
"assets/assets/maria.jpg": "d19657b9ea12b7d0e21f65e0f56b2eea",
"assets/assets/MCF.jpeg": "398e53cfa77d2ab473d6d13b64f4e52a",
"assets/assets/mcf_image13.png": "603079c9ad274f940297e8498bb0797f",
"assets/assets/mobile.png": "423845b756afdb5e535460964e93cdd1",
"assets/assets/montre.png": "a9c9f9ba127996bfe8e9cfe6b801429b",
"assets/assets/news1.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/news2.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/news3.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/news4.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/news5.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/news6.jpg": "f389f35f8aaa4db989455b451fd3ef18",
"assets/assets/pedro.jpg": "6b1ed9ad9354afea182aa5d89851cf16",
"assets/assets/profile-bg.jpg": "4ab13019734f0ccfc4cf3f8728a8ec70",
"assets/assets/profile.jpg": "99fd024cda9070cd81730db9d7c11b56",
"assets/assets/signin.png": "f2dd7ebe829b58d1283c63556cf73de3",
"assets/assets/signup.png": "132e3708fe1c3be3c84126b02477fa71",
"assets/assets/simple.pdf": "7732c82fb2bf6100e7b762089c73ad83",
"assets/FontManifest.json": "1987afade7d3d04b6d3a71c0fcdaeb4d",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "4583b4892e2014336c489e7388f85cb9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/flutter_dropzone_web/assets/flutter_dropzone.js": "0266ef445553f45f6e45344556cfd6fd",
"assets/packages/flutter_inappwebview_quill/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview_quill/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_AMS-Regular.ttf": "657a5353a553777e270827bd1630e467",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Bold.ttf": "a9c8e437146ef63fcd6fae7cf65ca859",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Regular.ttf": "7ec92adfa4fe03eb8e9bfb60813df1fa",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Bold.ttf": "46b41c4de7a936d099575185a94855c4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Regular.ttf": "dede6f2c7dad4402fa205644391b3a94",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Bold.ttf": "9eef86c1f9efa78ab93d41a0551948f7",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-BoldItalic.ttf": "e3c361ea8d1c215805439ce0941a1c8d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Italic.ttf": "ac3b1882325add4f148f05db8cafd401",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Regular.ttf": "5a5766c715ee765aa1398997643f1589",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-BoldItalic.ttf": "946a26954ab7fbd7ea78df07795a6cbc",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-Italic.ttf": "a7732ecb5840a15be39e1eda377bc21d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Bold.ttf": "ad0a28f28f736cf4c121bcb0e719b88a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Italic.ttf": "d89b80e7bdd57d238eeaa80ed9a1013a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Regular.ttf": "b5f967ed9e4933f1c3165a12fe3436df",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Script-Regular.ttf": "55d2dcd4778875a53ff09320a85a5296",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size1-Regular.ttf": "1e6a3368d660edc3a2fbbe72edfeaa85",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size2-Regular.ttf": "959972785387fe35f7d47dbfb0385bc4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size3-Regular.ttf": "e87212c26bb86c21eb028aba2ac53ec3",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size4-Regular.ttf": "85554307b465da7eb785fd3ce52ad282",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Typewriter-Regular.ttf": "87f56927f1ba726ce0591955c8b3b42d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d1722d5cf2c7855862f68edb85e31f88",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "613e4cc1af0eb5148b8ce409ad35446d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dd3c4233029270506ecc994d67785a37",
"assets/packages/math_keyboard/fonts/CustomKeyIcons.ttf": "b0bace3f25c2bd05862680e5ad4c6b54",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/packages/youtube_player_flutter_quill/assets/speedometer.webp": "50448630e948b5b3998ae5a5d112622b",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "4e1a849a2927445eeabba6c2b4f05e61",
"favicons.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "002bd922dd1b908ce16f85537707c012",
"/": "002bd922dd1b908ce16f85537707c012",
"main.dart.js": "97651e42a7041095b3d419d9eb76f8aa",
"manifest.json": "609eea88dc1bd8a347121ca34936bd07",
"version.json": "e3f4370b837ca380ab0f3e8a06cd61d2"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
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
