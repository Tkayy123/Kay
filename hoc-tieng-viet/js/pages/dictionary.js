/* Trang Tra từ điển (v18: tra số, lưu từ vào Sổ từ → chủ đề học riêng, nút ☆ ở mọi dòng kết quả): từ điển cơ bản (js/data/dict.js) + từ điển mở rộng ngoại tuyến (dict/, Wiktionary CC BY-SA 4.0) + Wiktionary trực tuyến dự phòng. Tra được Việt→Anh và Anh→Việt. */
let NB=store.get('vn-nb',[]),HI=store.get('vn-dhist',[]);
const dq=$('#dq'),dres=$('#dres');
const strip=h=>{const d=new DOMParser().parseFromString(h||'','text/html');return d.body.textContent.replace(/\s+/g,' ').trim()};
const POS={n:'danh từ · noun',v:'động từ · verb',adj:'tính từ · adj.',adv:'phó từ · adv.',pron:'đại từ · pron.',prep:'giới từ · prep.',conj:'liên từ · conj.',cl:'loại từ · classifier',part:'trợ từ · particle',num:'số từ · number',int:'thán từ · phrase',name:'tên riêng · name',phrase:'cụm từ · phrase',comb:'thành tố · combining form',det:'hạn định từ · determiner'};
/* chỉ mục từ điển cơ bản = dict.js + từ vựng của app */
const LEX=[];{const seen=new Set();DICT.forEach(d=>{const l=d.v.toLowerCase().normalize('NFC'),k=l+'|'+d.p;if(seen.has(k))return;seen.add(k);LEX.push({v:d.v,p:d.p,e:d.e,l})});
const have=new Set(LEX.map(x=>x.l));ALL.forEach(w=>{const l=w.v.toLowerCase().normalize('NFC');if(!have.has(l)){have.add(l);LEX.push({v:w.v,p:'',e:w.e,l})}})}
LEX.forEach(w=>{w.n=nf(w.v);w.g=w.e.toLowerCase().split(/[;,()\/]/).map(x=>x.trim().replace(/^to /,'')).filter(Boolean)});
const nCore=new Set(LEX.map(x=>x.l)).size;
$('#dcnt').textContent='Từ điển có '+nCore.toLocaleString('vi')+' từ cơ bản (chọn lọc cho người học) và '+DX.n[0].toLocaleString('vi')+' từ mở rộng từ Wiktionary, dùng được khi không có mạng. · '+nCore.toLocaleString()+' core + '+DX.n[0].toLocaleString()+' extended entries, offline.';
const rankW=x=>x.f-(x.d[0][0]==='name'?2:0);
const wrow=x=>({v:x.w,p:x.d[0][0],e:x.d[0][1].slice(0,2).join('; '),l:x.l,w:1});
function erow(w,cur){const r=el('div','erow'+(w.l===cur?' cur':''));const m=el('button','emain');m.append(el('b','',w.v),el('span','epos',w.p?POS[w.p]||w.p:''),el('span','eme',w.e));m.onclick=()=>look(w.v);const h=el('button','btn alt','🔊');h.setAttribute('aria-label','Nghe '+w.v);h.onclick=()=>say(w.v,'w'+w.v);
const s=el('button','btn alt',inNB(w.v)?'★':'☆');s.setAttribute('aria-label','Lưu '+w.v+' vào sổ từ');s.setAttribute('aria-pressed',inNB(w.v));s.onclick=()=>{toggleNB(w.v,w.e);s.textContent=inNB(w.v)?'★':'☆';s.setAttribute('aria-pressed',inNB(w.v))};r.append(m,h,s);return r}
function elist(rows,cur){const L=el('div','elist');rows.forEach(w=>L.append(erow(w,cur||'')));return L}
function syl(w){return clean(w).split(' ').filter(Boolean)}
function toneRow(w){const r=el('div','trow');syl(w).forEach(s=>{const t=toneOf(s),b=el('span','tbadge t'+t);b.append(el('b','',s),el('small','',TONES_VI[t]));r.append(b)});return r}
const inNB=v=>NB.some(x=>x.v===v);
function toggleNB(v,e){if(inNB(v))NB=NB.filter(x=>x.v!==v);else NB.unshift({v,e:String(e||'').split(';')[0].slice(0,50)});saveNB()}
function saveNB(){store.set('vn-nb',NB);syncMine();drawNB()}
function mineIdx(){return LS.findIndex(l=>l[0]===MINE)}
function drawNB(){const n=$('#nb');n.textContent='';NB.forEach(x=>{const b=el('button','chip',x.v+(x.e?' — '+x.e:''));b.onclick=()=>look(x.v);const r=el('span','chx','✕');r.setAttribute('role','button');r.setAttribute('aria-label','Xóa '+x.v);r.onclick=e=>{e.stopPropagation();NB=NB.filter(y=>y.v!==x.v);saveNB()};b.append(r);n.append(b)});$('#nbm').textContent=NB.length?'Sổ từ tự thành một chủ đề trong Từ vựng, Bài học, Ôn tập và Luyện nói. · Your notebook is also a topic in Vocabulary, Lessons, Review and Speaking.':'Chưa có từ nào. Bấm ☆ ở kết quả tra để lưu. · Nothing saved yet: tap ☆ on any result.';
const ac=$('#nbact');ac.textContent='';if(!NB.length)return;const i=mineIdx();
const a1=el('a','btn','📇 Học bằng thẻ · Flashcards');a1.href='words.html?t='+i;const a2=el('a','btn alt','🎯 Làm bài · Practice');a2.href='lesson.html?l='+i;
const b3=el('button','btn alt','📋 Sao chép · Copy');b3.type='button';b3.onclick=async()=>{const t=NB.map(x=>x.v+' — '+x.e).join('\n');try{await navigator.clipboard.writeText(t);b3.textContent='✓ Đã chép · Copied'}catch(e){window.prompt('Sao chép danh sách:',t)}};
const b4=el('button','btn alt','🗑 Xóa hết · Clear');b4.type='button';b4.onclick=()=>{if(confirm('Xóa toàn bộ sổ từ? · Clear the whole notebook?')){NB=[];saveNB()}};ac.append(a1,a2,b3,b4)}
function drawHist(){const h=$('#dhist');h.textContent='';if(!HI.length)return;h.append(el('span','mean','Vừa tra · Recent:'));HI.slice(0,8).forEach(x=>{const b=el('button','chip',x);b.onclick=()=>look(x);h.append(b)})}
/* gợi ý khi gõ: từ cơ bản trước, rồi từ mở rộng (Việt) và thuật ngữ tiếng Anh */
let sugTok=0;
async function suggest(){const sg=$('#dsug'),raw=dq.value.trim(),t=nf(raw),q=raw.toLowerCase(),my=++sugTok;sg.textContent='';if(!t)return;
const add=(label,go)=>{const b=el('button','chip',label);b.onclick=go;sg.append(b)};const seen=new Set();
LEX.filter(w=>w.n.startsWith(t)||w.g.some(x=>x===q||x.startsWith(q))).slice(0,6).forEach(w=>{seen.add(w.l);add(w.v+' — '+w.e.split(';')[0],()=>{dq.value=w.v;look(w.v)})});
if(t.length<2)return;
const ix=await ixOf(raw);if(my!==sugTok)return;
ix.filter(x=>!seen.has(x.l)&&x.n.startsWith(t)).sort((a,b)=>rankW(b)-rankW(a)).slice(0,6).forEach(x=>{seen.add(x.l);add(x.w+' — '+x.d[0][1][0].slice(0,40),()=>{dq.value=x.w;look(x.w)})});
if(/^[\x00-\x7f]+$/.test(raw)&&q.length>=2){const es=await shard('e',sk(q));if(my!==sugTok)return;const pre=Object.keys(es).filter(k=>k.startsWith(q)).sort((a,b)=>a.length-b.length);pre.slice(0,5).forEach(k=>add(k+' → '+es[k][0][0],()=>{dq.value=k;look(k)}));
if(!es[q]&&pre.length<3&&/^[a-z'-]{4,}$/.test(q)){const f=(await fuzzyEn(q,4)).filter(w=>!pre.includes(w));if(my!==sugTok)return;if(f.length){sg.append(el('span','mean','Có phải · Did you mean:'));f.forEach(w=>add(w,()=>{dq.value=w;look(w)}))}}}}
dq.oninput=()=>{clearTimeout(dq._t);dq._t=setTimeout(suggest,90)};
$('#df').onsubmit=e=>{e.preventDefault();look(dq.value)};
function section(title,en){const s=el('div','block dsec');s.append(el('h3','bt'));s.firstChild.innerHTML='<span class="tt">'+title+'<small>'+en+'</small></span>';dres.append(s);return s}
async function wik(host,term){try{const r=await fetch('https://'+host+'/api/rest_v1/page/definition/'+encodeURIComponent(term),{headers:{Accept:'application/json'}});if(!r.ok)return null;const j=await r.json();return j.vi||j['Vietnamese']||null}catch(e){return undefined}}
/* chi tiết một mục từ điển mở rộng: loại từ, các nghĩa, ví dụ, độ thông dụng */
function wdetail(x){const g=el('div','wg'),f=ftag(x.f),h=el('div','wfreq');h.append(el('span','fdots',f[0]),el('span','',f[1]));g.append(h);
x.d.forEach(([p,gl,ex])=>{g.append(el('div','wpos',POS[p]||p||''));const ol=el('ol','wdef');[...new Set(gl)].forEach(t=>ol.append(el('li','',t)));g.append(ol);
if(ex){const b=el('div','exbox2');b.append(el('b','',ex[0]),el('span','',ex[1]));const s=el('button','btn alt','🔊');s.setAttribute('aria-label','Nghe câu ví dụ');s.onclick=()=>say(ex[0]);b.append(s);g.append(b)}});return g}
/* v24: xếp hạng Anh→Việt cho người học + dịch từng từ khi gõ cả cụm/câu tiếng Anh */
const BADG=/alternative form|misspelling|dialect|(Northern|Southern|Central|North Central) Vietnam|obsolete|archaic|nonstandard|used by|initialism|abbreviation|Wu Xing|slang/i;
const isBad=g=>BADG.test(g||'');
const cleanRows=rows=>{const seen=new Set();return rows.map(r=>({r,s:(r[2]||0)-(isBad(r[3])?3:0)})).sort((a,b)=>b.s-a.s).filter(x=>{const k=x.r[0].toLowerCase();if(seen.has(k))return false;seen.add(k);return true}).map(x=>x.r)};
const rkE=(w,q)=>{let b=9;w.g.forEach(g=>{if(g===q)b=0;else if(g.startsWith(q))b=Math.min(b,1);else if(new RegExp('\\b'+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(g))b=Math.min(b,2)});return b};
/* từ thông dụng nhất cho người mới học (Anh = Việt|loại|ghi chú / lựa chọn khác; ;) */
const FW=new Map();('i=tôi|pron;me=tôi|pron;you=bạn|pron|dùng với bạn bè cùng tuổi;he=anh ấy|pron;she=chị ấy|pron;we=chúng tôi|pron;they=họ|pron;it=nó|pron;my=của tôi|pron;your=của bạn|pron;this=này|det;that=đó|det;here=ở đây|adv;there=ở đó|adv;am=là|v|to be, đứng trước danh từ;is=là|v|to be, đứng trước danh từ;are=là|v|to be, đứng trước danh từ;not=không|adv;no=không|int;yes=vâng|int|lịch sự/dạ|int|lịch sự, miền Nam;and=và|conj;or=hoặc|conj;with=với|prep;very=rất|adv;too=quá|adv|quá mức;want=muốn|v;like=thích|v;have=có|v;need=cần|v;can=có thể|v|có thể, được;where=ở đâu|adv;what=gì|pron;who=ai|pron;when=khi nào|adv;why=tại sao|adv;how=thế nào|adv;how much=bao nhiêu|pron;how many=mấy|pron;thank you=cảm ơn|int;thanks=cảm ơn|int;please=xin|part|đứng trước lời đề nghị;sorry=xin lỗi|int;hello=xin chào|int;hi=chào|int;goodbye=tạm biệt|int;eat=ăn|v;drink=uống|v;go=đi|v;come=đến|v;buy=mua|v;sell=bán|v;speak=nói|v;know=biết|v;understand=hiểu|v;rice=cơm|n|cơm đã nấu/gạo|n|gạo chưa nấu;toilet=nhà vệ sinh|n;bathroom=nhà vệ sinh|n|cũng nói phòng tắm;today=hôm nay|adv;tomorrow=ngày mai|adv;yesterday=hôm qua|adv;now=bây giờ|adv;name=tên|n;water=nước|n;good=tốt|adj;bad=xấu|adj;big=to|adj;small=nhỏ|adj;cheap=rẻ|adj;expensive=đắt|adj;help=giúp|v|giúp đỡ;friend=bạn|n;money=tiền|n;price=giá|n|giá tiền;ticket=vé|n;hotel=khách sạn|n;market=chợ|n;street=đường|n;left=trái|adj|bên trái;right=phải|adj|bên phải;how are you=bạn khỏe không|int|hỏi thăm sức khỏe;what is your name=bạn tên là gì|int;where is the toilet=nhà vệ sinh ở đâu|int;how much is this=cái này bao nhiêu tiền|int;i do not understand=tôi không hiểu|int;do you speak english=bạn nói được tiếng Anh không|int;i am lost=tôi bị lạc|int;excuse me=xin lỗi|int|để gọi hoặc nhờ ai đó;good morning=chào buổi sáng|int;good night=chúc ngủ ngon|int;see you tomorrow=hẹn mai gặp lại|int;nice to meet you=rất vui được gặp bạn|int;i am=tôi là|v;i want=tôi muốn|v;i like=tôi thích|v;i need=tôi cần|v;i have=tôi có|v;no problem=không sao|int;of course=tất nhiên|int;straight=thẳng|adj|đi thẳng').split(';').forEach(e=>{const i=e.indexOf('=');FW.set(e.slice(0,i),e.slice(i+1).split('/').map(o=>{const [v,p,n]=o.split('|');return [v,p||'',n||'']}))});
const SKP=new Set(['a','an','the','to','do','does','be']);
/* bộ đoán chính tả cũng biết các từ của từ điển cơ bản và từ chức năng */
[...FW.keys()].forEach(k=>/^[a-z'-]+$/.test(k)&&fzAdd(k,5));'of in on at for from by it its as if so but'.split(' ').forEach(w=>fzAdd(w,6));LEX.forEach(w=>w.g.forEach(x=>/^[a-z'-]{2,24}$/.test(x)&&fzAdd(x,4)));
const isEnTok=t=>FW.has(t)||SKP.has(t)||FZ.set.has(t);
async function look(q,typo,alts){q=String(q||'').trim();if(!q)return;dq.value=q;$('#dsug').textContent='';sugTok++;dres.textContent='';
HI=[q,...HI.filter(x=>x!==q&&x!==typo)].slice(0,12);store.set('vn-dhist',HI);drawHist();touch();
if(typo){const bn=el('div','dym');bn.setAttribute('role','status');bn.append(el('span','','Không thấy “'+typo+'”, đang hiện kết quả cho · No match for “'+typo+'”, showing '),el('b','',q));
const oth=(alts||[]).filter(x=>x!==q).slice(0,4);if(oth.length){const c=el('div','chips');c.append(el('span','mean','Hay là · Or:'));oth.forEach(w=>{const b=el('button','chip',w);b.onclick=()=>look(w);c.append(b)});bn.append(c)}dres.append(bn)}
if(/^\d[\d.,\s]*$/.test(q)){const v=parseN(q);if(v!==null){const s=section('Số “'+fmtN(v)+'” đọc là · How to read it','Number reader'),r=nv(v),c=nvCasual(v);
s.append(el('div','dword',r));if(c)s.append(el('p','mean','Nói thường ngày · Casual: '+c));
const act=el('div','act'),b1=el('button','btn alt','🔊 Nghe');b1.onclick=()=>say(r);const b2=el('button','btn alt','🐢 Chậm');b2.onclick=()=>saySlow(r);const b3=el('button','btn alt','💵 Như giá tiền');b3.onclick=()=>say(r+' đồng');
const a=el('a','btn','🔢 Luyện số đếm');a.href='numbers.html?n='+v;act.append(b1,b2,b3,a);s.append(act)}return}
const n=nf(q),viq=/[^\x00-\x7f]/.test(q),ql=q.toLowerCase().normalize('NFC'),asc=/^[\x00-\x7f]+$/.test(q);
const ix=await ixOf(q);
const wEx=ix.filter(x=>x.l===ql),wSm=wEx.length?[]:ix.filter(x=>x.n===n).sort((a,b)=>rankW(b)-rankW(a)),wh=wEx.length?wEx:wSm;
const exact=LEX.filter(w=>w.l===ql),same=(exact.length||wEx.length)?[]:LEX.filter(w=>w.n===n),hit=exact.length?exact:same;
const known=hit.length>0||wh.length>0,word=hit.length?hit[0].v:wh.length?wh[0].w:viq?q:null;
let found=known,hasTr=false;
/* 1. thẻ từ */
if(word){const s=section('Từ “'+word+'”','Word'),top=el('div','dhead');top.append(el('div','dword',word));
const act=el('div','act');act.style.margin='0';
const b1=el('button','btn alt','🔊 Nghe');b1.onclick=()=>say(word,'w'+word);const b2=el('button','btn alt','🐢 Chậm');b2.onclick=()=>saySlow(word);
const b3=el('button','btn','🎤 Luyện phát âm');b3.onclick=()=>pronModal(word,()=>{});
const wl=word.toLowerCase().normalize('NFC'),wm=ix.find(x=>x.l===wl),mean=((hit.find(x=>x.v===word)||{}).e)||(wm?wm.d[0][1][0]:'');
const has=()=>inNB(word),b4=el('button','btn alt',has()?'★ Đã lưu':'☆ Lưu vào sổ');b4.onclick=()=>{toggleNB(word,mean);b4.textContent=has()?'★ Đã lưu':'☆ Lưu vào sổ'};
act.append(b1,b2,b3,b4);top.append(act);s.append(top);s.append(el('p','mean','Thanh điệu từng âm tiết · Tone of each syllable'));s.append(toneRow(word));
const mine=hit.filter(x=>x.v===word);if(mine.length)s.append(elist(mine,wl));
const ex=exOf(word);if(ex){const x=el('div','exbox2');x.append(el('b','',ex[0]),el('span','',ex[1]));const h=el('button','btn alt','🔊');h.setAttribute('aria-label','Nghe câu ví dụ');h.onclick=()=>say(ex[0]);const p=el('button','btn alt','🎤');p.setAttribute('aria-label','Luyện nói câu này');p.onclick=()=>pronModal(ex[0],()=>{});x.append(h,p);s.append(x)}
if(wm){const s2=section('Nghĩa mở rộng · Extended meanings','From the offline Wiktionary dictionary');s2.append(wdetail(wm))}
else if(!mine.length)s.append(el('p','mean','Chưa có nghĩa trong từ điển ngoại tuyến. · No offline meaning yet.'))}
/* 2. cùng chữ, khác dấu */
if(!exact.length&&!wEx.length){const seen=new Set(),rows=[];same.forEach(w=>{seen.add(w.l);rows.push(w)});wSm.forEach(x=>{if(!seen.has(x.l)){seen.add(x.l);rows.push(wrow(x))}});
if(rows.length>1){const s=section('Cùng chữ, khác dấu · Same letters, other tones','Words that differ only by tone');s.append(elist(rows.slice(0,14),word?word.toLowerCase():''))}}
/* 3. tra từng từ khi gõ cả cụm / câu */
const toks=ql.split(/\s+/).filter(Boolean);
const enHit=asc&&toks.length>=2&&(await shard('e',sk(ql)))[ql];
let enMode=false;
if(asc&&toks.length>=2&&!known&&!enHit){await Promise.all(toks.flatMap(t=>[ixOf(t),shard('e',sk(t))]));
const vn=toks.filter(t=>LEX.some(w=>w.n===nf(t))||ixSync(t).some(y=>y.n===nf(t))).length,en=toks.filter(t=>FW.has(t)||SKP.has(t)||LEX.some(w=>w.g.includes(t))||(DX.e[sk(t)]||{})[t]).length;enMode=en>vn;
if(enMode&&!typo){await loadEW();const unk=toks.filter(t=>!isEnTok(t)&&!(DX.e[sk(t)]||{})[t]);
if(unk.length&&unk.length<toks.length){const fs=toks.map(t=>unk.includes(t)?(fuzzySync(t,1)[0]||t):t).join(' ');if(fs!==ql)return look(fs,q)}}}
if(toks.length>=2&&!known&&!enHit&&!enMode){await Promise.all(toks.map(t=>ixOf(t)));
const key=x=>viq?x:nf(x),map=new Map();LEX.forEach(w=>{const k=key(w.l);if(!map.has(k))map.set(k,w)});
const wfind=ph=>{const k=key(ph);const x=ixSync(ph).filter(y=>key(y.l)===k).sort((a,b)=>b.f-a.f)[0];return x?wrow(x):null};
const seg=[];for(let i=0;i<toks.length;){let m=0,hw=null;for(let L=Math.min(4,toks.length-i);L>=1&&!hw;L--){const ph=toks.slice(i,i+L).join(' ');hw=map.get(key(ph))||wfind(ph);if(hw)m=L}
if(hw){seg.push(hw);i+=m}else{seg.push({v:toks[i],e:'(chưa có · not found)',p:'',l:toks[i]});i++}}
const s=section('Tra từng từ trong cụm · Word by word','Each word in your phrase');s.append(elist(seg));found=true;
const sb=el('button','btn alt','🔊 Nghe cả cụm');sb.style.marginTop='12px';sb.onclick=()=>say(q);const pb=el('button','btn','🎤 Luyện nói cụm này');pb.style.cssText='margin:12px 0 0 8px';pb.onclick=()=>pronModal(q,()=>{});s.append(sb,pb)}
/* 3b. cả cụm / câu tiếng Anh: dịch từng từ (tham khảo) */
if(enMode){const es2={};await Promise.all(toks.map(async t=>{es2[sk(t)]=await shard('e',sk(t))}));
const nsy=v=>String(v).trim().split(/\s+/).length,bestEn=(ph,L)=>{if(FW.has(ph)){const f=FW.get(ph)[0];return {v:f[0],p:f[1],e:ph+(f[2]?' · '+f[2]:''),l:f[0].toLowerCase()}}
const lx=LEX.map(w=>[rkE(w,ph),w]).filter(x=>x[0]<=(L>1?0:1)&&nsy(x[1].v)>=L-1).sort((a,b)=>a[0]-b[0]||a[1].v.length-b[1].v.length)[0];if(lx)return {v:lx[1].v,p:lx[1].p,e:lx[1].e,l:lx[1].l};
const r=cleanRows((es2[sk(ph)]||{})[ph]||[]).filter(x=>nsy(x[0])>=L-1)[0];return r?{v:r[0],p:r[1],e:r[3],l:r[0].toLowerCase()}:null};
const segE=[];for(let i=0;i<toks.length;){let m=0,hw=null;for(let L=Math.min(4,toks.length-i);L>=1&&!hw;L--){const ph=toks.slice(i,i+L).join(' ');if(L===1&&SKP.has(ph)){hw='skip';m=1;break}const b=bestEn(ph,L);if(b){hw=b;m=L}}
if(hw==='skip'){i+=m;continue}
if(hw){segE.push(hw);i+=m}else{segE.push({v:toks[i],e:'(chưa có · not found)',p:'',l:toks[i],nf:1});i++}}
const s=section('Dịch từng từ · Word by word','English → Vietnamese (tham khảo, chưa phải câu hoàn chỉnh · a rough guide, not a full translation)');
s.append(elist(segE.filter(x=>!x.nf)));
const miss=segE.filter(x=>x.nf).map(x=>x.v);if(miss.length)s.append(el('p','mean','Chưa có trong từ điển · Not found: '+miss.join(', ')+'. Thử tra từng từ riêng. · Try looking each one up on its own.'));
const rough=segE.filter(x=>!x.nf).map(x=>x.v).join(' ');
if(rough)s.append(el('p','mean','Ghép tạm theo thứ tự · Rough order: '+rough+' — thứ tự từ trong tiếng Việt có thể khác; các từ như a/the/to thường không dịch. · Vietnamese word order can differ; words like a/the/to are usually not translated.'));
found=true}
/* 4. từ và cụm từ liên quan */
if(word&&n.length>=2){const seen=new Set([ql]),rows=[];LEX.forEach(w=>{if(!seen.has(w.l)&&(w.n.startsWith(n+' ')||w.n.endsWith(' '+n)||w.n.includes(' '+n+' '))){seen.add(w.l);rows.push(w)}});
ix.filter(x=>!seen.has(x.l)&&x.n.startsWith(n+' ')).sort((a,b)=>rankW(b)-rankW(a)).forEach(x=>{seen.add(x.l);rows.push(wrow(x))});
if(rows.length){const s=section('Từ và cụm từ liên quan · Related','Words and phrases containing “'+word+'”');s.append(elist(rows.slice(0,12)))}}
/* 5. tra ngược Anh → Việt */
if(asc&&ql.length>=2){const q2=ql.replace(/^to /,''),rk=w=>{let b=9;w.g.forEach(g=>{if(g===q2)b=0;else if(g.startsWith(q2))b=Math.min(b,1);else if(new RegExp('\\b'+q2.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(g))b=Math.min(b,2)});return b};
const locX=LEX.map(w=>[rk(w),w]).filter(x=>x[0]<9).sort((a,b)=>a[0]-b[0]||a[1].v.length-b[1].v.length);
const es=await shard('e',sk(q2)),rows=cleanRows(es[q2]||es[ql]||[]),seen=new Set(),all=[],push=w=>{if(!seen.has(w.l)){seen.add(w.l);all.push(w)}},mk=r=>({v:r[0],p:r[1],e:r[3],l:r[0].toLowerCase(),w:1});
(FW.get(q2)||[]).forEach(f=>push({v:f[0],p:f[1],e:q2+(f[2]?' · '+f[2]:''),l:f[0].toLowerCase()}));
locX.filter(x=>x[0]<=1).forEach(x=>push(x[1]));
rows.filter(r=>!isBad(r[3])).forEach(r=>push(mk(r)));
locX.filter(x=>x[0]===2).slice(0,6).forEach(x=>push(x[1]));
rows.filter(r=>isBad(r[3])).forEach(r=>push(mk(r)));
const near=Object.keys(es).filter(k=>k!==q2&&k!==ql&&k.startsWith(q2)).sort((a,b)=>a.length-b.length||a.localeCompare(b)).slice(0,10);
if(all.length){found=true;hasTr=true;const s=section('Tiếng Việt cho “'+q+'” · Vietnamese for “'+q+'”','English → Vietnamese');s.append(elist(all.slice(0,16)))}
if(near.length){const s=section('Cụm tiếng Anh liên quan · Related English','Tap one to look it up');const c=el('div','chips');near.forEach(k=>{const b=el('button','chip');b.append(el('b','',k),el('small','',es[k][0][0]));b.onclick=()=>look(k);c.append(b)});s.append(c);found=true}}
if(!hasTr&&!known&&!typo&&asc&&toks.length===1&&ql.length>=3){const f=await fuzzyEn(ql,5);if(f.length)return look(f[0],q,f)}
if(!found){const s=section('Chưa thấy trong từ điển ngoại tuyến','Not in the offline dictionary');s.append(el('p','mean','Thử viết ngắn hơn, đổi cách viết, hoặc xem kết quả trực tuyến bên dưới. · Try a shorter word or another spelling, or see the online result below.'))}
if(innerWidth<900)setTimeout(()=>dres.scrollIntoView({behavior:'smooth',block:'start'}),60);
/* 6. Wiktionary trực tuyến: chỉ khi từ điển ngoại tuyến không có */
const term=word||ql;
if(!found){const s2=section('Wiktionary trực tuyến','Online (needs Internet)');const box=el('div','wik','Đang tra… · Looking up…');s2.append(box);
const [en,vi]=await Promise.all([wik('en.wiktionary.org',term),wik('vi.wiktionary.org',term)]);box.textContent='';
const render=(arr,label)=>{if(!arr||!arr.length)return false;const g=el('div','wg');g.append(el('h4','sh',label));arr.slice(0,5).forEach(p=>{g.append(el('div','wpos',p.partOfSpeech||''));const ol=el('ol','wdef');(p.definitions||[]).slice(0,5).forEach(d=>{const t=strip(d.definition);if(t)ol.append(el('li','',t))});g.append(ol)});box.append(g);return true};
const a=render(vi,'Tiếng Việt · Vietnamese'),b=render(en,'English');
if(en===undefined&&vi===undefined)box.append(el('p','bad','Không kết nối được Internet. · Could not reach the online dictionary.'));else if(!a&&!b)box.append(el('p','mean','Wiktionary cũng chưa có mục này. · No Wiktionary entry either.'))}
/* 7. liên kết ngoài */
const e=encodeURIComponent(term),isVi=known||viq,L=[['VDict','https://vdict.com/'+e+',1,0,0.html'],['Soha Từ điển','https://tratu.soha.vn/dict/vn_en/'+e],['Wiktionary','https://en.wiktionary.org/wiki/'+e+'#Vietnamese'],['Google Dịch','https://translate.google.com/?sl='+(isVi?'vi':'en')+'&tl='+(isVi?'en':'vi')+'&text='+e]];
const s3=section('Tra thêm ở nơi khác','More dictionaries');const c=el('div','chips');L.forEach(([t,u])=>{const a=el('a','chip',t+' ↗');a.href=u;a.target='_blank';a.rel='noopener noreferrer';c.append(a)});s3.append(c)}
drawNB();drawHist();
const qs=new URLSearchParams(location.search).get('q');if(qs)look(qs);else dq.focus();

addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||'')){e.preventDefault();dq.focus();dq.select()}else if(e.key==='Escape'&&e.target===dq){dq.value='';$('#dsug').textContent=''}});
