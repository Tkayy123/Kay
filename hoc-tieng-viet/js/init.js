/* Khởi động chung cho mọi trang */
theme();refreshSide();
/* nhớ trang học gần nhất cho nút “Tiếp tục học” (từ vựng và bài học tự ghi chủ đề/bài cụ thể) */
(()=>{const p=document.body.dataset.page;if(['alphabet','tones','numbers','grammar','dialogues','review'].includes(p)){const x=PAGES.find(a=>a[0]===p);setLast(p+'.html',x[1]+' · '+x[2])}})();

/* Ngoại tuyến: đăng ký service worker khi chạy qua http(s) (mở file trực tiếp thì bỏ qua) */
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

/* Điện thoại: đang gõ thì ẩn thanh dưới và đưa ô nhập vào giữa màn hình */
(function(){const ok=e=>e.target&&e.target.matches&&e.target.matches('input:not([type=range]):not([type=checkbox]):not([type=radio])');document.addEventListener('focusin',e=>{if(!ok(e))return;document.body.classList.add('typing');setTimeout(()=>{try{e.target.scrollIntoView({block:'center',behavior:'smooth'})}catch(x){}},250)});document.addEventListener('focusout',e=>{if(ok(e))setTimeout(()=>{if(!document.activeElement||!ok({target:document.activeElement}))document.body.classList.remove('typing')},120)})})();
