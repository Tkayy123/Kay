/* Trang Câu cần thiết: câu sinh tồn theo tình huống, nghe, tìm Anh → Việt (chịu được lỗi chính tả nhẹ) và Việt → Anh, lưu câu hay dùng, chế độ “cho người Việt xem”. */
let FAV=store.get('vn-pbfav',[]),cat='all';
const pq=$('#pq'),plist=$('#plist'),pcats=$('#pcats'),pcnt=$('#pcnt');
const WORDS=s=>s.toLowerCase().replace(/[^a-z0-9' ]+/g,' ').split(/\s+/).filter(Boolean);
const ALLP=PB.flatMap(g=>g.p.map(p=>Object.assign(p,{ew:WORDS(p.e),vn:nf(p.v),vw:WORDS(nf(p.v)),en:p.e.toLowerCase(),g})));
const isFav=p=>FAV.includes(p.v);
function toggleFav(p){FAV=isFav(p)?FAV.filter(x=>x!==p.v):[p.v,...FAV];store.set('vn-pbfav',FAV)}
/* khớp một từ khóa: đúng, gần đúng (gõ sai 1–2 chữ), hoặc tiếng Việt không dấu */
function tokScore(p,t){if(p.ew.includes(t))return 3;if(p.ew.some(w=>w.startsWith(t)))return 2;t=nf(t);if(p.vw.some(w=>w===t||(t.length>=3&&w.startsWith(t))))return 2;
if(t.length>=4){const m=t.length>=7?2:1;if(p.ew.some(w=>dl(t,w,m)<=m))return 1}return 0}
function search(q){const toks=WORDS(nf(q)),vq=nf(q.trim());if(!toks.length&&!vq)return[];
return ALLP.map(p=>{let s=0,ok=true;
if(p.vn.includes(vq))s+=6;else if(p.en.includes(q.trim().toLowerCase()))s+=6;
else{toks.forEach(t=>{const v=tokScore(p,t);if(!v)ok=false;s+=v});if(!toks.length)ok=false}
return ok||s>=6?[s,p]:null}).filter(Boolean).sort((a,b)=>b[0]-a[0]||a[1].v.length-b[1].v.length).map(x=>x[1])}
/* cho người Việt xem: chữ lớn toàn màn hình */
function showLocal(p){const m=el('div','pmodal'),b=el('div','pbox pshow');m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Cho người Việt xem');
const x=el('button','pclose','✕');x.type='button';x.setAttribute('aria-label','Đóng · Close');
const tag=el('div','ptag','Xin cho xem · Please read');const big=el('div','pshow-v',p.v),en=el('p','pshow-e',p.e);
const act=el('div','act'),h=el('button','btn','🔊 Nghe · Play');h.type='button';h.onclick=()=>say(p.v,'');act.append(h);
b.append(x,tag,big,en,act);m.append(b);document.body.append(m);document.body.classList.add('noscroll');
const close=()=>{m.remove();document.body.classList.remove('noscroll');removeEventListener('keydown',esc)},esc=e=>{if(e.key==='Escape')close()};
x.onclick=close;m.onclick=e=>{if(e.target===m)close()};addEventListener('keydown',esc);x.focus()}
function card(p,tag){const a=el('article','pcard');
const t=el('button','ptx');t.type='button';t.setAttribute('aria-label','Nghe: '+p.v);t.onclick=()=>say(p.v,'');
t.append(el('b','pv',p.v),el('span','pe',p.e));if(p.n)t.append(el('small','pn',p.n));if(tag)t.append(el('small','pt2',p.g.ic+' '+p.g.vi));
const bt=el('div','pbt');
const mk=(txt,lab,fn,cls)=>{const b=el('button','btn alt'+(cls?' '+cls:''),txt);b.type='button';b.setAttribute('aria-label',lab);b.onclick=fn;return b};
const sl=mk('🐢','Nghe chậm',()=>saySlow(p.v,''));
const lc=mk('📲','Cho người Việt xem',()=>showLocal(p));
const st=mk(isFav(p)?'★':'☆','Lưu câu này',()=>{toggleFav(p);st.textContent=isFav(p)?'★':'☆';st.setAttribute('aria-pressed',isFav(p));if(cat==='fav')draw()});st.setAttribute('aria-pressed',isFav(p));
const mc=mk('🎤','Luyện nói câu này',()=>pronModal(p.v,()=>{}));
bt.append(mk('🔊','Nghe',()=>say(p.v,''),'pplay'),sl,lc,mc,st);a.append(t,bt);return a}
function group(title,en,ic,rows,tag){const s=el('section','block dsec');const h=el('h3','bt');h.innerHTML='<span class="no"></span><span class="tt"></span>';
h.firstChild.textContent=ic;h.lastChild.textContent=title;h.lastChild.append(el('small','',en));s.append(h);const L=el('div','plist');rows.forEach(p=>L.append(card(p,tag)));s.append(L);return s}
function draw(){plist.textContent='';const q=pq.value.trim();let n=0;
if(q){const r=search(q);n=r.length;if(r.length)plist.append(group('Kết quả cho “'+q+'”','Results',' 🔎'.trim(),r,true));
else{const s=el('div','block');s.append(el('p','mean','Không tìm thấy câu nào. Thử từ khác, hoặc tra từ điển. · No phrase found. Try another word, or use the dictionary.'));const a=el('a','btn','🔎 Tra “'+q+'” trong từ điển · Dictionary');a.href='dictionary.html?q='+encodeURIComponent(q);s.append(a);plist.append(s)}}
else if(cat==='fav'){const r=ALLP.filter(isFav);n=r.length;if(r.length)plist.append(group('Câu đã lưu','Saved','★',r,true));else{const s=el('div','block');s.append(el('p','mean','Chưa lưu câu nào. Bấm ☆ ở bất kỳ câu nào để lưu vào đây. · Nothing saved yet: tap ☆ on any phrase.'));plist.append(s)}}
else if(cat==='all'){PB.forEach(g=>{n+=g.p.length;plist.append(group(g.vi,g.en,g.ic,g.p,false))})}
else{const g=PB.find(x=>x.id===cat)||PB[0];n=g.p.length;plist.append(group(g.vi,g.en,g.ic,g.p,false))}
pcnt.textContent=n+' câu · '+n+(n===1?' phrase':' phrases')+(q?'':cat==='all'?' trong '+PB.length+' tình huống · in '+PB.length+' situations':'')}
function drawCats(){pcats.textContent='';
const add=(id,t)=>{const b=el('button','chip',t);b.type='button';b.dataset.id=id;b.setAttribute('aria-pressed',cat===id);b.onclick=()=>go(id);pcats.append(b)};
add('all','Tất cả · All');add('fav','★ Đã lưu · Saved');PB.forEach(g=>add(g.id,g.ic+' '+g.vi))}
function go(id,keep){cat=id;pq.value='';drawCats();draw();if(!keep)history.replaceState(null,'',id==='all'?location.pathname+location.search:'#'+id);
const on=pcats.querySelector('[aria-pressed=true]');if(on&&on.scrollIntoView)try{on.scrollIntoView({inline:'center',block:'nearest'})}catch(e){}}
pq.oninput=()=>{clearTimeout(pq._t);pq._t=setTimeout(()=>{[...pcats.children].forEach(c=>c.setAttribute('aria-pressed',false));if(!pq.value.trim()){drawCats()}draw()},120)};
$('#pf').onsubmit=e=>{e.preventDefault();pq.blur()};
addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(PB.some(g=>g.id===id)||id==='fav')go(id,1)});
addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||'')){e.preventDefault();pq.focus()}});
{const id=location.hash.slice(1),q0=new URLSearchParams(location.search).get('q');cat=PB.some(g=>g.id===id)||id==='fav'?id:'all';drawCats();if(q0){pq.value=q0;[...pcats.children].forEach(c=>c.setAttribute('aria-pressed',false))}draw()}
