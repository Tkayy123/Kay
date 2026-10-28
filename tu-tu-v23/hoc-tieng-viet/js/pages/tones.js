/* Tab Thanh điệu */
/* tones */
const TN=[
{n:'ngang',w:'ma',e:'ghost',d:'Giọng đều và cao · level and high',p:'M8 28H92'},
{n:'huyền',w:'mà',e:'but',d:'Giọng thấp, đi xuống nhẹ · low, gently falling',p:'M8 44C40 55 70 66 92 78'},
{n:'sắc',w:'má',e:'cheek; mom (South)',d:'Giọng đi lên nhanh · rising sharply',p:'M8 60C40 48 70 30 92 14'},
{n:'hỏi',w:'mả',e:'tomb',d:'Xuống rồi lên · dipping, then rising',p:'M8 40C28 52 38 76 55 70C72 64 80 44 92 34'},
{n:'ngã',w:'mã',e:'horse (Sino-Vietnamese)',d:'Lên, gãy giữa chừng, rồi lên tiếp · rising with a break',p:'M8 50C20 30 34 26 44 36L50 74C66 62 80 36 92 16'},
{n:'nặng',w:'mạ',e:'rice seedling',d:'Thấp, ngắn, rơi mạnh · low, short, heavy drop',p:'M10 56C30 66 50 76 66 88'}];
let ti=0;const tb=$('#toneBtns');
function pickTone(i,speak){ti=i;[...tb.children].forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const t=TN[i];$('#tw').textContent=t.w;$('#tn').textContent='Thanh '+t.n;$('#te').textContent=t.e;$('#td').textContent=t.d;const c=$('#curve');c.setAttribute('d',t.p);c.classList.remove('draw');void c.getBoundingClientRect();c.classList.add('draw');if(speak){mark('tones',i);say(t.w)}}
TN.forEach((t,i)=>{const b=el('button','tone',t.w);b.setAttribute('aria-pressed','false');b.onclick=()=>pickTone(i,true);tb.append(b)});
$('#tl').onclick=()=>say(TN[ti].w);
let qa=-1;const qo=$('#qo');
TN.forEach((t,i)=>{const b=el('button','tone',t.n);b.onclick=()=>{if(qa<0){$('#qr').textContent='Nhấn “Phát một từ” trước. · Press “Play a word” first.';return}const r=$('#qr');if(i===qa){r.className='ok';r.textContent='Đúng rồi! · Correct: '+TN[qa].w+' ('+TN[qa].n+')'}else{r.className='bad';r.textContent='Chưa đúng, thử lại. · Not quite, try again.'}};qo.append(b)});
$('#qp').onclick=()=>{qa=Math.floor(Math.random()*6);$('#qr').textContent='';say(TN[qa].w)};
pickTone(0,false);
/* tone lessons */
const MK=['a','à','á','ả','ã','ạ'],MN=['ngang · không dấu','huyền','sắc','hỏi','ngã','nặng'];
MK.forEach((m,i)=>{const b=el('button','mk');b.append(el('div','mw',m),el('div','mn',MN[i]));b.onclick=()=>{mark('tones',i);say(TN[i].w,'w'+TN[i].w);pickTone(i,false);scrollTo({top:0,behavior:'smooth'})};$('#marks').append(b)});
TN.forEach((t,i)=>{const d=el('button','mini');d.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><line class="grid" x1="0" y1="50" x2="100" y2="50"/><path class="curve" style="stroke-width:7" d="'+t.p+'"/></svg>';d.append(el('b','',t.w+' · '+t.n));d.onclick=()=>{mark('tones',i);say(t.w,'w'+t.w)};$('#minis').append(d)});
const PS=[['mua=to buy','mùa=season'],['sau=after','sáu=six'],['tôi=I / me','tối=evening'],['bàn=table','bán=to sell','bạn=friend'],['cá=fish','cà=tomato / eggplant'],['nằm=to lie down','năm=year / five']];
PS.forEach(s=>{const w=el('div','chips');w.style.marginBottom='8px';s.forEach(x=>{const [v,e]=x.split('=');const b=el('button','chip');b.append(el('b','',v),el('small','',e));b.onclick=()=>{say(v,'w'+v);$('#pm').textContent=v+' = '+e};w.append(b)});$('#pairs').append(w)});
let pa=null,pAns=true,pS={n:0,ok:0,st:0};
const pO=$('#po'),pR=$('#pr');
function pNext(){const s=[...PS[Math.floor(Math.random()*PS.length)]].sort(()=>Math.random()-.5);pa=s[Math.floor(Math.random()*s.length)].split('=')[0];pAns=false;pR.textContent='';pO.textContent='';$('#prp').hidden=false;$('#prs').hidden=false;$('#pq').textContent='▶ Từ khác · Next word';
s.forEach(x=>{const [v,e]=x.split('='),b=el('button','popt');b.append(el('b','pw',v),el('span','pe','Chạm để chọn · Tap'),el('span','pt',''));b.onclick=()=>pPick(b,v,s);pO.append(b)});say(pa,'w'+pa)}
function pPick(b,v,s){if(pAns){say(v,'w'+v);return}pAns=true;const ok=v===pa;pS.n++;if(ok){pS.ok++;pS.st++;try{addXp(1)}catch(e){}}else pS.st=0;
[...pO.children].forEach((c,i)=>{const [cv,ce]=s[i].split('=');c.querySelector('.pe').textContent=ce;c.querySelector('.pt').textContent='thanh '+TONES_VI[toneOf(cv)];c.classList.add(cv===pa?'right':c===b?'wrong':'dim');c.setAttribute('aria-label',cv+': '+ce)});
const pe=s.find(x=>x.split('=')[0]===pa).split('=')[1];
pR.className=ok?'ok':'bad';pR.innerHTML=(ok?'<b>Đúng rồi! ✓</b> Từ vừa nghe là “'+pa+'” ('+pe+'), thanh '+TONES_VI[toneOf(pa)]+'.':'<b>Chưa đúng.</b> Em chọn “'+v+'” (thanh '+TONES_VI[toneOf(v)]+'), nhưng từ vừa nghe là “'+pa+'” (thanh '+TONES_VI[toneOf(pa)]+', '+pe+').')+'<div class="act"><button class="btn" id="pnx">Từ tiếp theo ›</button><button class="btn alt" id="pmc">🎤 Nói thử “'+pa+'”</button></div><small class="mean">Chạm vào từng thẻ để nghe lại. · Tap any card to hear it.</small>';
$('#pnx').onclick=pNext;$('#pmc').onclick=()=>pronModal(pa);
$('#psc').textContent='Đúng '+pS.ok+'/'+pS.n+(pS.st>1?' · chuỗi '+pS.st+' 🔥':'');
if(ok)setTimeout(()=>say(pa,'w'+pa),250)}
$('#pq').onclick=pNext;$('#prp').onclick=()=>pa&&say(pa,'w'+pa);$('#prs').onclick=()=>pa&&saySlow(pa,'w'+pa);
