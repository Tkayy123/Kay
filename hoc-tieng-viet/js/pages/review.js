/* Tab Ôn tập */
/* ôn tập */
const RO={due:false,listen:false,unk:false,weak:false};let rc=null,ans=false;
[['due','Đến hạn hôm nay · Due today'],['listen','Chế độ nghe · Listen mode'],['unk','Chỉ từ chưa nhớ · Unknown only'],['weak','Từ hay sai · Weak words']].forEach(([k,t])=>{const b=el('button','chip',t);b.setAttribute('aria-pressed','false');b.onclick=()=>{RO[k]=!RO[k];b.setAttribute('aria-pressed',RO[k]);rnext()};$('#rm').append(b)});
function rnext(){const p=RO.due?dueWords():RO.weak?ALL.filter(w=>ST.miss[w.k]>0):RO.unk?ALL.filter(w=>!known[w.k]):ALL,ro=$('#ro'),rr=$('#rr');ro.textContent='';rr.textContent='';rr.className='';
if(!p.length){$('#rq').textContent='🎉';rr.textContent=RO.due?'Hôm nay chưa có từ nào đến hạn ôn. · Nothing is due today.':RO.weak?'Chưa có từ hay sai. · No weak words yet.':'Em đã nhớ hết các từ! · All words known!';return}
rc=p[Math.floor(Math.random()*p.length)];ans=false;const o=[rc];
while(o.length<4){const w=ALL[Math.floor(Math.random()*ALL.length)];if(!o.some(x=>x.e===w.e))o.push(w)}
o.sort(()=>Math.random()-.5);$('#rq').textContent=RO.listen?'🔊':rc.v;
o.forEach(w=>{const b=el('button','tone',w.e);b.style.fontSize='17px';b.onclick=()=>{
if(w===rc){if(!ans){ST.n++;ST.ok++;srsMark(rc.k,true);addXp(2);if(ST.miss[rc.k]>0)ST.miss[rc.k]--;store.set('vn-stat',ST)}ans=true;rr.className='ok';rr.textContent='Đúng rồi! · '+rc.v+' = '+rc.e;$('#rq').textContent=rc.v;say(rc.v)}
else{if(!ans){ST.n++;srsMark(rc.k,false);ST.miss[rc.k]=(ST.miss[rc.k]||0)+1;store.set('vn-stat',ST)}ans=true;rr.className='bad';rr.textContent='Chưa đúng, thử lại. · Not quite, try again.'}
$('#rs').textContent='Độ chính xác · Accuracy: '+Math.round(ST.ok/ST.n*100)+'% ('+ST.ok+'/'+ST.n+')'};ro.append(b)});
if(RO.listen)say(rc.v)}
if(new URLSearchParams(location.search).get('mode')==='due'){RO.due=true;$('#rm').children[0].setAttribute('aria-pressed','true')}
$('#rn').onclick=rnext;$('#rh').onclick=()=>rc&&say(rc.v);rnext();
