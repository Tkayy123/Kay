/* Trang Luyện nói: chọn từ/câu rồi mở bộ chấm phát âm AI */
const MODES=[['w','Từ theo chủ đề · Words'],['s','Câu ví dụ · Sentences'],['t','Cặp thanh điệu · Tone pairs'],['c','Tự nhập · Custom']];
let mode='w',topic=0;
const PAIRS=['ma','mà','má','mả','mã','mạ','bàn','bán','bạn','sau','sáu','cá','cà','năm','nằm','tôi','tối','mua','mùa'];
const sl=$('#sl'),sm=$('#sm'),st2=$('#st2');
MODES.forEach(([k,t])=>{const b=el('button','chip',t);b.dataset.k=k;b.onclick=()=>{mode=k;draw()};sm.append(b)});
function items(){if(mode==='w')return LS[topic][1].map(x=>x.split('=')).map(([v,e])=>({t:v,e}));
if(mode==='s')return Object.entries(EX).map(([v,x])=>({t:x[0],e:x[1]}));
if(mode==='t')return PAIRS.map(t=>({t,e:'thanh '+TONES_VI[toneOf(t)]}));
return (store.get('vn-custom',[])).map(t=>({t,e:''}))}
function draw(){[...sm.children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===mode));$('#sf').hidden=mode!=='c';
st2.textContent='';if(mode==='w'){const c=el('div','chips');c.style.marginTop='14px';LS.forEach((l,i)=>{const b=topicChip(l[0]);b.setAttribute('aria-pressed',i===topic);b.onclick=()=>{topic=i;draw()};c.append(b)});st2.append(c)}
const it=items();sl.textContent='';
const done=it.filter(x=>pronBest(x.t)>=70).length;
$('#sinfo').textContent=it.length?'Đạt từ 70 điểm: '+done+'/'+it.length+' · Passed (70+): '+done+'/'+it.length:'Chưa có nội dung. Hãy gõ một câu ở trên. · Nothing here yet.';
it.forEach(x=>{const b=el('button','spi');const s=pronBest(x.t);b.append(el('b','',x.t),el('small','',x.e||''));const badge=el('span','sbadge'+(s>=90?' g':s>=70?' o':s>=0?' m':''),s>=0?String(s):'–');if(s===undefined)badge.textContent='–';b.append(badge);b.onclick=()=>pronModal(x.t,()=>draw());sl.append(b)})}
$('#sf').onsubmit=e=>{e.preventDefault();const t=$('#sx').value.trim();if(!t)return;const l=store.get('vn-custom',[]);if(!l.includes(t)){l.unshift(t);store.set('vn-custom',l.slice(0,30))}$('#sx').value='';draw();pronModal(t,()=>draw())};
draw();
