/* Trang Từ vựng: chọn chủ đề, thẻ ghi nhớ (xáo trộn, chỉ từ chưa nhớ, câu ví dụ, vuốt để chuyển thẻ), tìm từ */
const shf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
let li=0,ci=0,flip=false,shuf=false,onlyUnk=false,deck=[],sw=0;
const lc=$('#lessons'),chipOf={},card=$('#card');
const kk=(i,j)=>LS[i][0]+'|'+LS[i][1][j].split('=')[0];
GR.forEach(([n,ix])=>{lc.append(el('h3','',n));const w=el('div','chips');ix.forEach(i=>{const b=topicChip(LS[i][0]);b.append(el('small'));b.setAttribute('aria-pressed','false');b.onclick=()=>{li=i;flip=false;mkDeck();draw();$('#cardblock').scrollIntoView({behavior:'smooth',block:'start'})};chipOf[i]=b;w.append(b)});lc.append(w)});
/* số từ đã nhớ ngay trên chip; chip sáng đúng chủ đề đang học */
function paint(){LS.forEach((l,i)=>{const b=chipOf[i];if(!b)return;b.lastChild.textContent=l[1].filter((_,j)=>known[kk(i,j)]).length+'/'+l[1].length;b.setAttribute('aria-pressed',i===li)})}
function mkDeck(){let d=[...LS[li][1].keys()];if(onlyUnk){const u=d.filter(j=>!known[kk(li,j)]);if(u.length)d=u}if(shuf)d=shf(d);deck=d;ci=0}
function cur(){const [v,e]=LS[li][1][deck[ci]].split('=');return{v,e,k:LS[li][0]+'|'+v}}
function draw(){const c=cur(),x=exOf(c.v),eb=$('#exbox');$('#ct').textContent=topicTxt(LS[li][0]);paint();
card.textContent='';card.append(el('div','vi',c.v));if(flip)card.append(el('div','en',c.e));card.append(el('small','',flip?'Nhấn để ẩn nghĩa · Tap to hide':'Nhấn để xem nghĩa · Tap for meaning'));
eb.hidden=!(flip&&x);if(flip&&x){const b=eb.querySelector('b');b.textContent='';x[0].split(' ').forEach((w,i,a)=>{const l=el('a','xw',w);l.href='dictionary.html?q='+encodeURIComponent(w.replace(/[.,!?]/g,''));b.append(l,i<a.length-1?' ':'')});eb.querySelector('span').textContent=x[1]}
const tr=$('#trow');tr.textContent='';clean(c.v).split(' ').forEach(s=>{const t=toneOf(s),b=el('span','tbadge t'+t);b.append(el('b','',s),el('small','',TONES_VI[t]));tr.append(b)});
$('#dic').href='dictionary.html?q='+encodeURIComponent(c.v);const pb=pronBest(c.v);$('#mic').textContent='🎤 Nói'+(pb!==undefined?' · '+pb:'');wl();
$('#know').textContent=known[c.k]?'Đã nhớ · Memorised ✓':'Đã nhớ · Memorised';
const T=LS[li][1].length,n=LS[li][1].filter((_,j)=>known[kk(li,j)]).length;
setLast('words.html?t='+li,'Từ vựng · '+LS[li][0]);
$('#prog').textContent='Thẻ '+(ci+1)+'/'+deck.length+' · Đã nhớ '+n+'/'+T+' từ trong chủ đề này'+(n===T?' 🎉':'');$('#pb').style.width=n/T*100+'%'}
function go(d){ci=(ci+d+deck.length)%deck.length;flip=false;draw()}
function pop(){card.classList.remove('pop');void card.offsetWidth;card.classList.add('pop')}
card.onclick=()=>{if(sw){sw=0;return}flip=!flip;draw();pop();if(flip)say(cur().v)};
$('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);$('#hear').onclick=()=>say(cur().v);$('#slow').onclick=()=>saySlow(cur().v);
$('#mic').onclick=()=>pronModal(cur().v,()=>draw());$('#mex').onclick=()=>pronModal(exOf(cur().v)[0]);
$('#hex').onclick=()=>say(exOf(cur().v)[0]);$('#sex').onclick=()=>saySlow(exOf(cur().v)[0]);
$('#know').onclick=()=>{const c=cur();known[c.k]=!known[c.k];store.set('vn-known',known);draw();refreshSide();if(known[c.k]&&deck.length>1)setTimeout(()=>go(1),350)};
/* thanh công cụ bộ thẻ */
[['Xáo trộn · Shuffle',()=>shuf=!shuf],['Chỉ từ chưa nhớ · Unknown only',()=>onlyUnk=!onlyUnk]].forEach(([t,f])=>{const b=el('button','chip',t);b.setAttribute('aria-pressed','false');b.onclick=()=>{b.setAttribute('aria-pressed',f());flip=false;mkDeck();draw()};$('#deckbar').append(b)});
/* vuốt trái/phải trên điện thoại */
let tx=null;card.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
card.addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>60){sw=1;setTimeout(()=>sw=0,350);go(dx<0?1:-1)}},{passive:true});
/* phím tắt · shortcuts */
addEventListener('keydown',e=>{if(/INPUT|SELECT/.test(e.target.tagName))return;
if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);else if(e.key===' '&&e.target.id!=='card'){e.preventDefault();card.click()}else if(e.key==='Enter'&&e.target.tagName!=='BUTTON')$('#know').click()});
/* tìm từ (không dấu cũng được) */
$('#sq').oninput=()=>{const sr=$('#sr'),t=nf($('#sq').value.trim());sr.textContent='';if(!t)return;
const f=ALL.filter(w=>nf(w.v+' '+w.e).includes(t)).slice(0,12);
if(!f.length){sr.append(el('span','mean','Chưa có trong bộ từ của app · Not in the app’s word list'));return}
f.forEach(w=>{const b=el('button','chip',w.v+' — '+w.e);b.onclick=()=>say(w.v,'w'+w.v);sr.append(b)})};
$('#sq').addEventListener('input',()=>{const v=$('#sq').value.trim(),a=$('#sdic');a.hidden=!v;a.querySelector('span').textContent=v;a.href='dictionary.html?q='+encodeURIComponent(v)});
const qt=new URLSearchParams(location.search).get('t');if(qt!==null&&LS[+qt])li=+qt;
mkDeck();draw();

/* danh sách tất cả từ của chủ đề: nghe, nhớ, mở thẻ */
function wl(){const L=$('#wlist');L.textContent='';LS[li][1].forEach((x,j)=>{const [v,e]=x.split('='),k=kk(li,j),r=el('div','wrow'+(known[k]?' kn':''));
const m=el('button','wmain');m.append(el('b','',v),el('small','',e));m.onclick=()=>{ci=Math.max(0,deck.indexOf(j));flip=true;draw();$('#card').scrollIntoView({behavior:'smooth',block:'center'})};
const h=el('button','btn alt','🔊');h.setAttribute('aria-label','Nghe '+v);h.onclick=()=>say(v,'w'+v);
const c=el('button','btn alt',known[k]?'✓':'○');c.setAttribute('aria-label',known[k]?'Bỏ đánh dấu đã nhớ':'Đánh dấu đã nhớ');c.onclick=()=>{known[k]=!known[k];store.set('vn-known',known);refreshSide();draw()};r.append(m,h,c);L.append(r)})}
