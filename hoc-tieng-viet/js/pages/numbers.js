/* Tab Số đếm: đọc số 0 – 999 tỷ (nv() ở core.js), bảng hàng nghìn/triệu/tỷ, nghe và gõ số, giá tiền */
let nmode='0–20',nt=null,nsay='';
const MODES=[['0–20',()=>rnd(20)],['0–100',()=>rnd(100)],['0–999',()=>rnd(999)],['0–9.999',()=>rndBig(9999)],['0–999.999',()=>rndBig(999999)],
['Triệu · Millions',()=>{const q=1+rnd(998),r=Math.random();return q*1e6+(r<.4?0:r<.7?(1+rnd(8))*1e5:(1+rnd(998))*1e3)}],
['Giá tiền · Prices',()=>(1+rnd(199))*5000]];
const rnd=m=>Math.floor(Math.random()*(m+1));
function rndBig(max){const d=1+rnd(String(max).length-1),lim=Math.min(max,Math.pow(10,d)-1);return rnd(lim)}
const sayMoney=n=>nv(n)+' đồng';
/* ô nhập tự chèn dấu chấm ngăn cách hàng nghìn khi gõ (1500000 → 1.500.000), giữ nguyên vị trí con trỏ, tối đa 12 chữ số */
function liveFmt(inp){const v=inp.value,pos=inp.selectionStart==null?v.length:inp.selectionStart,before=v.slice(0,pos).replace(/\D/g,'').length;
const d=v.replace(/\D/g,'').replace(/^0+(?=\d)/,'').slice(0,12),f=fmtN(d);if(f===v)return;inp.value=f;
let c=0,i=0;for(;i<f.length&&c<before;i++)if(/\d/.test(f[i]))c++;try{inp.setSelectionRange(i,i)}catch(e){}}
/* 1. xem cách đọc */
function showN(){const v=parseN($('#ni').value),w=$('#nw'),f=$('#nf'),b=$('#nbrk'),z=$('#nz');
if(v===null){w.textContent=f.textContent=z.textContent='';b.textContent='';return}
w.textContent=nv(v);f.textContent=fmtN(v);
const c=nvCasual(v);z.textContent=c?'Nói thường ngày · Casual: '+c:'';
b.textContent='';const U=[[1e9,'tỷ'],[1e6,'triệu'],[1e3,'nghìn'],[1,'']];
U.forEach(([u,t])=>{const g=Math.floor(v/u)%1000;if(g||(u===1&&v===0)){const s=el('span','tbadge t0');s.append(el('b','',String(g)+(t?' '+t:'')),el('small','',nv(g)));b.append(s)}})}
$('#ni').oninput=()=>{liveFmt($('#ni'));showN()};$('#na').addEventListener('input',()=>liveFmt($('#na')));
$('#nh').onclick=()=>{const v=parseN($('#ni').value);if(v!==null)say(nv(v))};
$('#nhs').onclick=()=>{const v=parseN($('#ni').value);if(v!==null)saySlow(nv(v))};
$('#nm').onclick=()=>{const v=parseN($('#ni').value);if(v!==null)say(sayMoney(v))};
/* 2. bảng các hàng */
[[10,'mười'],[100,'trăm'],[1000,'nghìn (ngàn)'],[10000,'mười nghìn'],[100000,'trăm nghìn'],[1e6,'triệu'],[1e7,'mười triệu'],[1e8,'trăm triệu'],[1e9,'tỷ (tỉ)'],[1500,'nghìn rưỡi'],[1500000,'triệu rưỡi'],[2e9,'hai tỷ']].forEach(([n])=>{
const r=el('div','erow'),m=el('button','emain');m.append(el('b','',fmtN(n)),el('span','epos',''),el('span','eme',nv(n)+(nvCasual(n)?' · '+nvCasual(n):'')));
m.onclick=()=>{$('#ni').value=fmtN(n);showN();$('#ni').scrollIntoView({behavior:'smooth',block:'center'})};
const h=el('button','btn alt','🔊');h.setAttribute('aria-label','Nghe '+nv(n));h.onclick=()=>say(nv(n));r.append(m,h);$('#nt').append(r)});
/* 3. nghe và gõ số */
MODES.forEach(([t],i)=>{const b=el('button','chip',t);b.setAttribute('aria-pressed',i===0);b.onclick=()=>{nmode=t;nt=null;$('#nr').textContent='';[...$('#nl').children].forEach((c,k)=>c.setAttribute('aria-pressed',k===i))};$('#nl').append(b)});
const money=()=>nmode.startsWith('Giá');
$('#np').onclick=()=>{nchk.d=0;nt=MODES.find(m=>m[0]===nmode)[1]();$('#nr').textContent='';$('#na').value='';$('#na').focus();say(money()?sayMoney(nt):nv(nt))};
$('#nrep').onclick=()=>{if(nt!==null)say(money()?sayMoney(nt):nv(nt));else $('#np').click()};
$('#nslow').onclick=()=>{if(nt!==null)saySlow(money()?sayMoney(nt):nv(nt))};
const ans=()=>fmtN(nt)+(money()?' đồng':'')+' = '+nv(nt)+(money()?' đồng':'');
function nchk(){const x=$('#nr');if(nt===null){x.className='';x.textContent='Nhấn “Phát số” trước. · Press “Play a number” first.';return}
const g=parseN($('#na').value);
if(g!==null&&g===nt){x.className='ok';x.textContent='Đúng rồi! · '+ans();if(!nchk.d){nchk.d=1;ST.nums=(ST.nums||0)+1;saveST()}}
else{x.className='bad';x.textContent='Chưa đúng, thử lại. · Not quite, try again.'}}
$('#nc').onclick=nchk;$('#na').onkeydown=e=>{if(e.key==='Enter')nchk()};
$('#ns').onclick=()=>{if(nt!==null){$('#nr').className='';$('#nr').textContent=ans()}};
const q0=new URLSearchParams(location.search).get('n');if(q0){$('#ni').value=q0;liveFmt($('#ni'));showN()}
