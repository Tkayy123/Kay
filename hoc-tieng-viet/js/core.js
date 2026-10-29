/* Lõi chung: tiện ích, lưu trữ, giọng đọc, cài đặt, thống kê, thanh bên */
/* Lõi chung: tiện ích, lưu trữ, giọng đọc, cài đặt, thống kê, điều hướng tab */
const $=s=>document.querySelector(s),el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const SET=Object.assign({rate:.85,theme:'auto',goal:40,name:'',gender:'m'},store.get('vn-set',{}));
document.documentElement.dataset.lang=SET.lang==='vi'?'vi':'bi';/* 'bi' song ngữ (mặc định) · 'vi' chỉ tiếng Việt */
const ST=Object.assign({days:[],ok:0,n:0},store.get('vn-stat',{}));ST.miss=ST.miss||{};
const dk=d=>d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
function theme(){const r=document.documentElement;SET.theme==='auto'?r.removeAttribute('data-theme'):r.setAttribute('data-theme',SET.theme)}
function streak(){let s=0,d=new Date();if(!ST.days.includes(dk(d)))d.setDate(d.getDate()-1);while(ST.days.includes(dk(d))){s++;d.setDate(d.getDate()-1)}return s}
function touch(){const d=dk(new Date());if(!ST.days.includes(d)){ST.days.push(d);store.set('vn-stat',ST);try{refreshSide()}catch(e){}}}
/* ===== Theo dõi tiến độ (lưu trong ST, cùng khóa 'vn-stat') ===== */
const saveST=()=>store.set('vn-stat',ST);
const dayNo=(d=new Date())=>Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5);
/* đánh dấu đã làm một mục: mark('letters',3) */
function mark(k,i){ST[k]=ST[k]||{};if(!ST[k][i]){ST[k][i]=1;saveST()}}
/* nhật ký theo ngày: ST.log['2026-10-26']={xp,les} */
function bump(k,n){const d=dk(new Date());ST.log=ST.log||{};const l=ST.log[d]=ST.log[d]||{};l[k]=(l[k]||0)+n;saveST()}
function addXp(n){if(n>0){ST.xp=(ST.xp||0)+n;bump('xp',n)}else saveST()}
/* tổng một chỉ số trong n ngày gần nhất (kể cả hôm nay) */
function lastDays(k,n){let t=0,d=new Date();for(let i=0;i<n;i++){t+=((ST.log||{})[dk(d)]||{})[k]||0;d.setDate(d.getDate()-1)}return t}
/* Ôn tập lặp lại ngắt quãng (Leitner): đúng thì lên hộp, nhắc lại sau 1·2·4·8·16 ngày; sai thì về hộp 0 và đến hạn ngay */
const BOX=[0,1,2,4,8,16];
function srsMark(k,ok){ST.srs=ST.srs||{};const s=ST.srs[k]||{b:0};s.b=ok?Math.min(s.b+1,5):0;s.d=dayNo()+BOX[s.b];ST.srs[k]=s;saveST()}
function dueWords(){const t=dayNo(),m=ST.srs||{};return ALL.filter(w=>m[w.k]&&m[w.k].d<=t)}
/* nơi học gần nhất, để nút “Tiếp tục học” ở trang chủ */
function setLast(h,t){if(ST.last&&ST.last.h===h&&ST.last.t===t)return;ST.last={h,t};saveST()}
const AUDIO={};/* khi có file nghe: AUDIO['l0']='audio/a.mp3' (chữ cái), 'w0' (ví dụ), 'w'+từ (từ vựng) */
/* Giọng đọc: CHỈ dùng giọng tiếng Việt. Nếu thiết bị chưa có thì báo cho người học, tuyệt đối không đọc bằng giọng tiếng Anh. */
const NOVOICE='Thiết bị chưa có giọng đọc tiếng Việt nên chưa phát được. <a href="settings.html">Xem cách cài ở Cài đặt</a> · No Vietnamese voice found. <a href="settings.html">See Settings</a>';
function viVoices(){try{return speechSynthesis.getVoices().filter(v=>(v.lang&&/^vi([-_]|$)/i.test(v.lang))||/vi[eệ]t/i.test(v.name||''))}catch(e){return[]}}
/* Giọng nam / nữ: SET.gender = 'm' (mặc định) hoặc 'f'. Giọng của thiết bị chỉ có tên, nên nhận dạng nam qua tên (NamMinh, “male”…). */
const isMaleV=v=>/nam\s?minh|(^|[^a-z])nam([^a-z]|$)|(^|[^a-z])male/i.test(v.name||'');
const hasMaleVoice=()=>viVoices().some(isMaleV);
function pickVoice(){const l=viVoices(),w=SET.gender==='f'?l.filter(v=>!isMaleV(v)):l.filter(isMaleV),p=w.length?w:l;
return l.find(v=>v.name===SET.voice)||p.find(v=>/natural/i.test(v.name))||p.find(v=>/^vi[-_]vn$/i.test(v.lang||''))||p[0]}
try{if(window.speechSynthesis)speechSynthesis.getVoices()}catch(e){}
function note(m){let n=$('#vnote');if(!n){n=el('div');n.id='vnote';n.setAttribute('role','status');document.body.append(n)}n.innerHTML=m;n.classList.add('on');clearTimeout(note.t);note.t=setTimeout(()=>n.classList.remove('on'),9000)}
/* Khóa file nghe: audio/<akey(chữ)>.mp3 — tools/make_audio.py tạo file theo cùng công thức này */
function akey(t){t=String(t).normalize('NFC').toLowerCase().replace(/\s+/g,' ').trim();let h=2166136261;for(let i=0;i<t.length;i++)h=Math.imul(h^t.charCodeAt(i),16777619)>>>0;return h.toString(16).padStart(8,'0')}
/* Dự phòng: giọng có sẵn trên thiết bị (chỉ khi chưa có file mp3) */
function speakDevice(t){
if(!window.speechSynthesis){busy(false);note(NOVOICE);return}
const go=()=>{const v=pickVoice();if(!v){busy(false);note(NOVOICE);return}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(t).replace(/-/g,' '));u.voice=v;u.lang=(v.lang||'vi-VN').replace('_','-');u.rate=SET.rate;u.pitch=(SET.gender!=='f'&&!isMaleV(v))?.65:1;u.onend=u.onerror=()=>busy(false);window._u=u;setTimeout(()=>speechSynthesis.speak(u),30)}catch(e){}};
if(speechSynthesis.getVoices().length)go();else{let d=0;const f=()=>{if(d)return;d=1;go()};speechSynthesis.addEventListener('voiceschanged',f,{once:true});setTimeout(f,900)}}
/* Nghe: thử lần lượt (1) file mp3 có sẵn trong audio/, (2) giọng AI trực tuyến, (3) giọng của thiết bị.
   TTS_URL: địa chỉ dịch vụ đọc tiếng Việt, {q} là chữ cần đọc. Để '' nếu muốn tắt giọng trực tuyến.
   Mặc định dùng điểm đọc công khai của Google Dịch (không chính thức, cần Internet); khi có dịch vụ riêng
   (Azure, Google Cloud, máy chủ của trường...) chỉ cần đổi dòng này. */
const TTS_URL='https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q={q}';
let curAudio=null;
const nf=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');/* bỏ dấu để so sánh/tìm */
function saySlow(t,k){const r=SET.rate;SET.rate=.6;say(t,k);setTimeout(()=>{SET.rate=r},1500)}/* nghe chậm, không lưu vào cài đặt */
function sources(t,k){const s=[(k&&AUDIO[k])||'audio/'+akey(t)+'.mp3'];
if(TTS_URL&&navigator.onLine!==false&&!(SET.gender!=='f'&&viVoices().length))s.push(TTS_URL.replace('{q}',encodeURIComponent(String(t).replace(/ \/ /g,', ').replace(/-/g,' '))));return s}
/* Phản hồi tức thì: nút vừa bấm sáng lên + sóng âm cho đến khi phát xong */
let _lb=null;addEventListener('click',e=>{_lb=e.target.closest&&e.target.closest('button,a.btn,.chip,.mini,.mk,.tone,.spi,.wmain,.lt,.card,.say')},true);
function busy(on){const b=window._sb;if(b){b.classList.remove('speaking');window._sb=null}if(on&&_lb&&document.contains(_lb)){window._sb=_lb;_lb.classList.add('speaking');clearTimeout(busy.t);busy.t=setTimeout(()=>busy(false),9000)}}
function say(t,k){touch();busy(true);
try{if(curAudio)curAudio.pause();if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}
const src=sources(t,k);
if(SET.gender!=='f'&&src.length>1&&!say.hint){say.hint=1;note('Chưa có file giọng nam nên đang dùng giọng trực tuyến (giọng nữ). Xem Cài đặt để bật giọng nam. · Male audio files are not added yet, so the online (female) voice is used. See Settings.')}
const go=i=>{if(i>=src.length){speakDevice(t);return}
const a=new Audio(src[i]);curAudio=a;a.onended=a.onpause=()=>{if(curAudio===a)busy(false)};let fell=0;const nx=()=>{if(fell||curAudio!==a)return;fell=1;go(i+1)};
a.preservesPitch=true;a.webkitPreservesPitch=true;a.playbackRate=Math.min(1.2,Math.max(.5,SET.rate||1));
a.onerror=nx;
try{const p=a.play();if(p&&p.catch)p.catch(e=>{if(e&&e.name==='NotAllowedError')return;nx()})}catch(e){nx()}};
go(0)}

/* ===== Thanh bên dùng chung cho mọi trang · Shared sidebar ===== */
const PAGES=[['index','Trang chủ','Home'],['alphabet','Bảng chữ cái','Alphabet'],['tones','Thanh điệu','Tones'],['words','Từ vựng','Vocabulary'],['dictionary','Tra từ điển','Dictionary'],['phrasebook','Câu cần thiết','Survival phrases'],['speak','Luyện nói','Speaking coach'],['grammar','Ngữ pháp','Grammar'],['lesson','Bài học','Practice lessons'],['dialogues','Hội thoại','Dialogues'],['numbers','Số đếm','Numbers'],['review','Ôn tập','Review quiz'],['progress','Tiến độ','Progress'],['settings','Cài đặt','Settings & voice']];
const IC={index:'🏠',alphabet:'🔤',tones:'🎵',numbers:'🔢',words:'📚',dictionary:'🔎',phrasebook:'🗣️',speak:'🎤',grammar:'🧩',dialogues:'💬',lesson:'🎯',review:'🔁',progress:'📈',settings:'⚙️'};
const NAVG=[[null,['index']],['Lộ trình học · Path',['alphabet','tones','numbers','grammar']],['Thư viện · Library',['words','dictionary','phrasebook','dialogues']],['Luyện tập · Practice',['lesson','speak','review']],['Của em · Mine',['progress','settings']]];
(function(){const s=$('#side'),cur=document.body.dataset.page;
s.innerHTML='<div class="brand"><h1><svg class="logo" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="116" fill="#9B1C31"/><g transform="translate(244 246) scale(.86) translate(-256 -256)"><g transform="translate(0 8)"><path d="M96 372H392Q432 372 432 332V282Q432 258 410 258Q388 258 388 282V316H96Q70 316 70 344Q70 372 96 372Z" fill="#FBF6EE"/><circle cx="236" cy="262" r="118" fill="#F2B84B"/><path d="M236 262m0 0a14 14 0 0 1 14 14a28 28 0 0 1 -28 28a44 44 0 0 1 -44 -44a60 60 0 0 1 60 -60a76 76 0 0 1 76 76" fill="none" stroke="#9B1C31" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M404 258L384 196" stroke="#FBF6EE" stroke-width="14" stroke-linecap="round"/><path d="M418 262L452 208" stroke="#FBF6EE" stroke-width="14" stroke-linecap="round"/><circle cx="382" cy="190" r="14" fill="#FBF6EE"/><circle cx="456" cy="202" r="14" fill="#FBF6EE"/></g></g></svg>Từ Từ</h1><p>Học tiếng Việt, từng chút một<br>Learn Vietnamese · A0 → A1</p></div>';
const n=el('nav');n.setAttribute('aria-label','Các phần học');
NAVG.forEach(([h,ids])=>{const g=el('div','ng');if(h)g.append(el('div','nh',h));
ids.forEach(id=>{const p=PAGES.find(x=>x[0]===id),a=el('a','tab');a.href=id+'.html';
const t=el('span','tl',p[1]);t.append(el('small','',p[2]));a.append(el('span','ic',IC[id]),t);if(id===cur)a.setAttribute('aria-current','page');g.append(a)});n.append(g)});
s.append(n);const m=el('div','me');m.innerHTML='<div>🔥 <b id="sk">0</b> ngày liên tiếp · day streak</div><div class="bar"><i id="sb"></i></div><small id="st"></small>';s.append(m)})();


/* ===== Thanh điều hướng dưới + menu cho điện thoại · Mobile bottom bar ===== */
(function(){const cur=document.body.dataset.page;
const main4=['index','lesson','words','review'];
const bar=el('nav','mbar');bar.setAttribute('aria-label','Điều hướng nhanh');
const link=(id,vi,en,cls)=>{const a=el('a');a.href=id+'.html';if(id===cur)a.setAttribute('aria-current','page');a.append(el('span','ic',IC[id]),cls?el('b','',vi):el('span','',vi));if(cls){a.append(el('small','',en))}return a};
main4.forEach(id=>{const p=PAGES.find(x=>x[0]===id);bar.append(link(id,p[1],p[2]))});
const more=el('button');more.type='button';more.append(el('span','ic','☰'),el('span','','Menu'));if(!main4.includes(cur))more.setAttribute('aria-current','page');bar.append(more);
const sheet=el('div','sheet'),box=el('div','sheetbox');sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Tất cả các phần');
box.append(el('h2','','Tất cả các phần · All sections'));const g=el('div','sgrid');PAGES.forEach(([id,vi,en])=>g.append(link(id,vi,en,1)));box.append(g);sheet.append(box);
const close=()=>{sheet.classList.remove('open');document.body.classList.remove('noscroll')};
more.onclick=()=>{sheet.classList.add('open');document.body.classList.add('noscroll')};sheet.onclick=e=>{if(e.target===sheet)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.body.append(bar,sheet)})();

/* ===== Đọc số tiếng Việt, 0 – 999.999.999.999 (tới hàng trăm tỷ) · dùng ở Số đếm và Tra từ điển.
   tools/make_audio.py có bản Python giống hệt (hàm number_words). ===== */
const NUMD=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'],NUMMAX=999999999999;
function nvTens(r){const t=Math.floor(r/10),u=r%10;if(t===1)return 'mười'+(u?' '+(u===5?'lăm':NUMD[u]):'');return NUMD[t]+' mươi'+(u?' '+(u===1?'mốt':u===5?'lăm':NUMD[u]):'')}
/* một nhóm 3 chữ số (1–999); full = phải đọc đủ “không trăm” vì đứng sau nhóm lớn hơn */
function nvGroup(g,full){const h=Math.floor(g/100),r=g%100;let s='';if(h>0||full)s=NUMD[h]+' trăm';if(r===0)return s;
if(h>0||full)return s+' '+(r<10?'lẻ '+NUMD[r]:nvTens(r));return r<10?NUMD[r]:nvTens(r)}
function nv(n){n=Math.floor(+n);if(!(n>0))return NUMD[0];if(n>NUMMAX)n=NUMMAX;
const U=['tỷ','triệu','nghìn',''],G=[Math.floor(n/1e9)%1000,Math.floor(n/1e6)%1000,Math.floor(n/1e3)%1000,n%1000],o=[];let st=false;
G.forEach((g,i)=>{if(g){o.push(nvGroup(g,st)+(U[i]?' '+U[i]:''));st=true}});return o.join(' ')}
/* cách nói thường ngày: 1.500.000 → “một triệu rưỡi”, 1.200.000 → “một triệu hai” (chỉ khi đúng dạng đó) */
function nvCasual(n){n=Math.floor(+n);for(const [u,w] of [[1e9,'tỷ'],[1e6,'triệu'],[1e3,'nghìn']]){const q=Math.floor(n/u);if(q<1||q>=1000)continue;const r=n%u;if(!r||r%(u/10))return '';const d=r/(u/10);return nv(q)+' '+w+' '+(d===5?'rưỡi':NUMD[d])}return ''}
/* đọc số người dùng gõ: dấu chấm, phẩy, khoảng trắng là dấu tách hàng nghìn */
function parseN(s){const d=String(s).replace(/\D/g,'').replace(/^0+(?=\d)/,'');return d===''?null:d.length>12?NUMMAX:Math.min(NUMMAX,+d)}
const fmtN=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');

/* ===== Song ngữ gọn gàng · Tidy bilingual labels =====
   Chữ dạng “Tiếng Việt · English” được tách thành hai phần (.vi / .en) để CSS xếp gọn (tiêu đề: Việt lớn, Anh nhỏ bên dưới)
   và để Cài đặt có thể chọn “Chỉ tiếng Việt”. Chỉ tách ở nhãn, nút, tiêu đề, đoạn giới thiệu; không đụng vào dữ liệu từ điển, câu ví dụ, thẻ. */
const BI_OK='.me,button,.btn,.chip,label,summary,h1,h2,h3,h4,.tt,.mean,.nh,.sub,.mgt,.wt,.msg,.vstat,.mpt,#vnote,footer,small,.rnote,.pv-gh,.pv-wkt,.pv-gh2';
const BI_NO='.erow,.exbox,.exbox2,.say,.wmain,.wrow,.card,.dword,.eme,.emain,.opt,.tile,.popt,.ptx,.pcard,.spi,.pres,.syls,.tips,select,option,textarea,input,script,style,.bi-off';
const BI_VN=/[\u00C0-\u024F\u1E00-\u1EFF]/;
function biSplit(root){if(!root||root.nodeType===3||!root.querySelectorAll)return;
const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const t=n.nodeValue;if(t.indexOf('·')<0)return 2;const p=n.parentElement;return p&&!p.closest(BI_NO)&&p.closest(BI_OK)?1:2}}),L=[];
while(w.nextNode())L.push(w.currentNode);
L.forEach(n=>{const t=n.nodeValue,p=n.parentElement;
if(p.tagName==='SMALL'&&/^\s*·\s/.test(t)){p.classList.add('en');return}
const i=t.indexOf(' · ');if(i<1)return;const vi=t.slice(0,i),en=t.slice(i+3);if(!vi.trim()||!en.trim()||en.indexOf(' · ')>=0||BI_VN.test(en))return;
if(p.classList.contains('sep')||p.classList.contains('en')||p.classList.contains('vi'))return;
const f=document.createDocumentFragment(),a=el('span','vi',vi),b=el('span','sep',' · '),c=el('span','en',en);f.append(a,b,c);n.replaceWith(f)})}
biSplit(document.body);
new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType===1)biSplit(n);else if(n.nodeType===3&&n.parentElement)biSplit(n.parentElement)})}).observe(document.body,{childList:true,subtree:true});
