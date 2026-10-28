/* Ngoại tuyến cho "Từ Từ" (v25). Chỉ chạy khi app được phục vụ qua http(s).
   - Trang HTML: ưu tiên mạng, mất mạng thì dùng bản đã lưu.
   - Mã, dữ liệu, từ điển (dict/), âm thanh (audio/): dùng bản đã lưu ngay, cập nhật nền cho lần sau.
   Đổi VERSION mỗi khi phát hành để dọn bộ nhớ cũ. */
const VERSION='hoc-viet-v25',CORE=['./','index.html','icon.svg','icon-192.png','icon-512.png','alphabet.html','tones.html','numbers.html','words.html','dictionary.html','phrasebook.html','speak.html','grammar.html','lesson.html','dialogues.html','review.html','progress.html','settings.html',
'css/style.css','js/core.js','js/init.js','js/pron.js','js/dictload.js','js/fuzzy.js','js/data/phrases.js','js/pages/phrasebook.js','dict/ew.js','js/data/vocab.js','js/data/examples.js','js/data/dict.js','js/modules.js','dict/index.js',
'js/pages/home.js','js/pages/alphabet.js','js/pages/tones.js','js/pages/numbers.js','js/pages/words.js','js/pages/dictionary.js','js/pages/speak.js','js/pages/grammar.js','js/pages/lesson.js','js/pages/dialogues.js','js/pages/review.js','js/pages/progress.js','js/pages/settings.js','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('hoc-viet-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range'))return;/* âm thanh có Range: để trình duyệt tự xử lý */
const html=r.mode==='navigate'||/\.html?$/.test(u.pathname)||u.pathname.endsWith('/');
if(html){e.respondWith(fetch(r).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(VERSION).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))));return}
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(x=>{if(x&&x.ok&&x.status===200){const c=x.clone();caches.open(VERSION).then(k=>k.put(r,c))}return x}).catch(()=>hit);return hit||net}))});
