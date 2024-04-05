const CACHE_NAME = 'v9';
const STATIC_ASSETS = ["/css/bootstrap-datetimepicker.min.css","/js/moment-with-locales.min.js","/js/bootstrap-datetimepicker.min.js","/modules/ckeditor5-build-classic/ckeditor.js","/assets/main.143ecbc6.css","/assets/main.3be493b7.js","/js/jquery-currency.js","/modules/typeahead/typeahead.js","/css/app.min.css","/css/kv-html5-sortable.min.css","/socket.io/socket.io.js","/js/form.js","/js/socket.js","/js/app.js","/js/jquery-sortable.js","/css/two-asset.min.css","/js/datatableaddon.min.js","/js/two-asset.min.js","/mdb/css/bootstrap.min.css","/js/sortable.css","/mdb/css/mdb.min.css","/mdb/css/style.css","/runtime/scripts/bank/1690136309246.js","/runtime/scripts/bot/1690194146500.js","/runtime/scripts/coding_generator/1690134717830.js","/runtime/scripts/music_box/1690190708662.js","/runtime/scripts/provinsi/1690135243819.js","/runtime/scripts/restaurant/1690136309250.js","/runtime/scripts/zapprovals/1690190748634.js","/runtime/scripts/zuser/1690136263315.js","/img/age.png","/img/avatar_2x.png","/img/ball.gif","/img/bg03.jpg","/img/chain.png","/img/clock.png","/img/clock2.png","/img/clock3.png","/img/cms.gif","/img/cms.png","/img/cobaprompt.png","/img/datepicker.png","/img/dropdowncheckbox.png","/img/dropdowngroup.png","/img/dropdownmulti.png","/img/dropdown_static.png","/img/editor.png","/img/excel.png","/img/file.png","/img/google.png","/img/loading.gif","/img/logo-2.svg","/img/logo_pupr.png","/img/module_selectyear.png","/img/no-body.jpg","/img/number.png","/img/pdf.png","/img/plus.png","/img/ppt.png","/img/pu.png","/img/pupr.png","/img/rar.jpg","/img/rolling.png","/img/save2.png","/img/save3.png","/img/save4.png","/img/snap.png","/img/switch.png","/img/timepicker.png","/img/twitter.png","/img/txt.png","/img/typeahead.png","/img/user.png","/img/user2.png","/img/wonderful.png","/img/word.png","/img/zip.jpg"];

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
};

self.addEventListener('install', event => {
    console.log('service worker install');
    event.waitUntil(
        addResourcesToCache(STATIC_ASSETS)
    );
});

self.addEventListener('activate', event => {
    //console.log('service worker activated');
    //remove unwanted cache
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== CACHE_NAME){
                        console.log('service worker : deleting old cache');
                        cache.delete(cache);
                    }
                })
            )
        })
    );
});


self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (STATIC_ASSETS.includes(url.pathname)) {
        console.log(`has assets ${url.pathname}`);
        caches.open(CACHE_NAME).then(cache => {
            console.log(JSON.stringify(cache));

            if(cache.match(url.pathname)){
                console.log('match');
                event.respondWith(caches.match(url.pathname));
            } else {
                console.log('not matchmatch');

                cache.add(url.pathname);
            }
        })
        /*        const responseFromCache = caches.match(event.request);
                if (responseFromCache) {
                    return responseFromCache;
                }
                //if(caches[CACHE_NAME].keys())
                console.log(JSON.stringify(caches[CACHE_NAME]));
                if(caches[CACHE_NAME]) {
                    event.respondWith(caches.match(url.pathname));
                }*/

    }
});
