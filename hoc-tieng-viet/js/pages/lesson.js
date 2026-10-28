/* Trang Bài học: bài tập kiểu trò chơi (chọn nghĩa, nghe, ghép cặp, gõ) */
const sh=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const nrm=s=>s.normalize('NFC').toLowerCase().trim().replace(/\s+/g,' ');
const PR=['Chính xác!','Giỏi lắm!','Tuyệt vời!','Đúng rồi!'];
setLast('lesson.html','Bài học · Practice lessons');
const topicWords=i=>LS[i][1].map(s=>{const [v,e]=s.split('=');return{v,e,k:LS[i][0]+'|'+v}});
let curTopic,Q=[],qi=0,hearts=5,total=0,okn=0,sel=null,phase='ans',cur=null,pool=[],tried=new Set();
const $lc=$('#lc'),$la=$('#la');
function pad(w){const o=[...w];sh(ALL).forEach(x=>{if(o.length<8&&!o.some(y=>y.e===x.e||y.v===x.v))o.push(x)});return o}
function build(w){const T=['choice','listen','reverse','type','dictate'],ex=[];sh(w).forEach((x,i)=>{ex.push({t:T[i%5],w:x});if(i===3||i===7)ex.push({t:'match',ws:sh(w).slice(0,5)})});const o=sh(w).find(x=>exOf(x.v));if(o)ex.push({t:'order',w:o});return ex}
function opts(w,f){const o=[w];sh(ALL).forEach(x=>{if(o.length<4&&x[f]!==w[f]&&!o.some(y=>y[f]===x[f]))o.push(x)});return sh(o)}
function big(t,s){const d=el('div','big');if(s){const b=el('button','spk','🔊');b.setAttribute('aria-label','Nghe');b.onclick=()=>say(cur.w.v);d.append(b)}if(t)d.append(el('span','',t));return d}
function start(w,ti){pool=w;curTopic=ti;if(ti!==undefined)setLast('lesson.html?l='+ti,'Bài học · '+LS[ti][0]);Q=build(w);qi=0;hearts=5;total=0;okn=0;tried=new Set();$('#picker').hidden=true;$('#result').hidden=true;$('#play').hidden=false;render();$('#play').scrollIntoView({behavior:'smooth',block:'start'})}
function render(){cur=Q[qi];sel=null;phase='ans';$('#lf').className='pfoot';$('#lm').textContent='';$lc.textContent='Kiểm tra';$lc.disabled=true;$la.textContent='';
$('#lpb').style.width=qi/Q.length*100+'%';$('#lh').textContent='❤'.repeat(Math.max(hearts,0))+'♡'.repeat(5-Math.max(hearts,0));
const c=cur,w=c.w,q=$('#lq');
if(c.t==='match'){q.textContent='Ghép các cặp từ · Match the pairs';return rMatch()}
if(c.t==='type'){q.textContent='Gõ bằng tiếng Việt · Type in Vietnamese';$la.append(big(w.e));mkInput();return}
if(c.t==='dictate'){q.textContent='Nghe rồi gõ lại · Listen and type';$la.append(big('',true));mkInput();say(w.v);return}
if(c.t==='order'){q.textContent='Sắp xếp thành câu · Build the sentence';const x=exOf(w.v),d=el('div','big',x[1]);d.style.fontSize='clamp(20px,2.4vw,30px)';$la.append(d);return rOrder(x[0])}
const lab=c.t==='choice'?'e':'v';
if(c.t==='choice'){q.textContent='Chọn nghĩa đúng · Pick the meaning';$la.append(big(w.v,true))}
else if(c.t==='reverse'){q.textContent='Chọn từ tiếng Việt · Pick the Vietnamese word';$la.append(big(w.e))}
else{q.textContent='Nghe và chọn · Listen and choose';$la.append(big('',true));say(w.v)}
const g=el('div','opts');opts(w,lab).forEach(x=>{const b=el('button','opt',x[lab]);b.w=x;b.onclick=()=>{if(phase!=='ans')return;[...g.children].forEach(k=>k.classList.remove('sel'));b.classList.add('sel');sel=x;$lc.disabled=false;if(lab==='v')say(x.v)};g.append(b)});$la.append(g)}
function mkInput(){const i=el('input');i.id='lin';i.type='text';i.autocomplete='off';i.spellcheck=false;i.setAttribute('autocapitalize','none');i.setAttribute('autocorrect','off');i.placeholder='Gõ ở đây · Type here';i.oninput=()=>{$lc.disabled=!i.value.trim()};$la.append(i);i.focus()}
/* xếp câu: chạm các từ theo thứ tự đúng; chạm lại để bỏ ra */
function rOrder(s){const S=el('div','slots'),B=el('div','bank');sel=[];
const upd=()=>{S.textContent='';sel.forEach((t,k)=>{const b=el('button','tile',t.w);b.onclick=()=>{if(phase!=='ans')return;t.b.classList.remove('used');sel.splice(k,1);upd()};S.append(b)});$lc.disabled=!sel.length};
sh(s.split(' ').map(w=>({w}))).forEach(t=>{const b=el('button','tile',t.w);t.b=b;b.onclick=()=>{if(phase!=='ans'||b.classList.contains('used'))return;b.classList.add('used');sel.push(t);upd();say(t.w)};B.append(b)});
$la.append(S,B)}
function rMatch(){const ws=cur.ws;let left=null,mis=0,done=0;const L=el('div','col'),R=el('div','col');
sh(ws).forEach(w=>{const b=el('button','opt',w.v);b.w=w;b.onclick=()=>{if(b.disabled)return;[...L.children].forEach(c=>c.classList.remove('sel'));b.classList.add('sel');left=w;say(w.v)};L.append(b)});
sh(ws).forEach(w=>{const b=el('button','opt',w.e);b.onclick=()=>{if(!left||b.disabled)return;if(left===w){const lb=[...L.children].find(c=>c.w===w);lb.disabled=b.disabled=true;lb.classList.add('done');b.classList.add('done');left=null;if(++done===ws.length)fb(mis===0,null)}else{mis++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400)}};R.append(b)});
const g=el('div','pairs2');g.append(L,R);$la.append(g)}
function fb(r,w,txt){phase='fb';total++;
if(r)okn++;else{hearts--;$('#lh').textContent='❤'.repeat(Math.max(hearts,0))+'♡'.repeat(5-Math.max(hearts,0));Q.push({...cur})}
if(w&&!tried.has(w.k)){tried.add(w.k);srsMark(w.k,r);if(r){if(ST.miss[w.k]>0)ST.miss[w.k]--}else ST.miss[w.k]=(ST.miss[w.k]||0)+1;store.set('vn-stat',ST)}
$('#lf').className='pfoot '+(r?'ok':'bad');
const an=txt||(w?w.v+' = '+w.e:'');$('#lm').textContent=r?'✓ '+PR[Math.floor(Math.random()*4)]+(an?'  '+an:''):(an?'✗ Đáp án đúng · Correct: '+an:'✗ Có cặp ghép sai · Some pairs were wrong');
$lc.textContent='Tiếp tục';$lc.disabled=false;if(w&&r)say(cur.t==='order'?exOf(w.v)[0]:w.v)}
function check(){const c=cur,w=c.w;let r,txt;
if(c.t==='order'){const x=exOf(w.v);r=nrm(sel.map(t=>t.w).join(' '))===nrm(x[0]);document.querySelectorAll('#la .tile').forEach(b=>b.disabled=true);txt=x[0]}
else if(c.t==='type'||c.t==='dictate'){const v=$('#lin').value;r=nrm(v)===nrm(w.v);if(!r&&nf(v)===nf(w.v)){r=true;txt='Gần đúng! Nhớ viết có dấu · Close! Mind the marks: '+w.v}$('#lin').disabled=true}
else{r=sel===w;document.querySelectorAll('#la .opt').forEach(b=>{if(b.w===w)b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')})}
fb(r,w,txt)}
function next(){if(hearts<=0)return end(false);if(++qi>=Q.length)return end(true);render()}
function end(win){$('#play').hidden=true;$('#result').hidden=false;
const xp=win?10+okn*2+hearts*2:okn;addXp(xp);if(win){ST.lessons=(ST.lessons||0)+1;bump('les',1);if(curTopic!==undefined)mark('done',curTopic)}saveST();
$('#rt').textContent=win?'🎉 Hoàn thành bài học! · Lesson complete!':'💔 Hết tim rồi · Out of hearts';
const rg=$('#rg');rg.textContent='';[['XP nhận được · XP earned','+'+xp],['Độ chính xác · Accuracy',total?Math.round(okn/total*100)+'%':'—'],['Tim còn lại · Hearts left',Math.max(hearts,0)+'/5']].forEach(([l,v])=>{const d=el('div','stat');d.append(el('b','',v),el('span','',l));rg.append(d)})}
$lc.onclick=()=>phase==='ans'?check():next();
$('#lx').onclick=()=>{$('#play').hidden=true;$('#picker').hidden=false};
$('#again').onclick=()=>start(pool,curTopic);
$('#other').onclick=()=>{$('#result').hidden=true;$('#picker').hidden=false};
addEventListener('keydown',e=>{if(e.key==='Enter'&&!$('#play').hidden&&!$lc.disabled&&e.target.tagName!=='BUTTON'){e.preventDefault();$lc.click()}});
/* chọn bài */
const lp=$('#lp'),sp=el('div','chips');
[['🔀 Ôn tổng hợp · Mix',()=>pad([])],['⚠️ Từ hay sai · Weak words',()=>{const w=ALL.filter(x=>ST.miss[x.k]>0);return w.length?pad(sh(w).slice(0,8)):null}]].forEach(([t,f])=>{const b=el('button','chip',t);b.onclick=()=>{const w=f();if(w){$('#lpm').textContent='';start(w)}else $('#lpm').textContent='Chưa có từ hay sai. · No weak words yet.'};sp.append(b)});lp.append(sp);
GR.forEach(([n,ix])=>{lp.append(el('h3','',n));const w=el('div','chips');ix.forEach(i=>{const b=el('button','chip',LS[i][0]);b.onclick=()=>start(topicWords(i),i);w.append(b)});lp.append(w)});
const ql=new URLSearchParams(location.search).get('l');if(ql!==null&&LS[+ql])start(topicWords(+ql),+ql);
