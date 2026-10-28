/* AI luyện phát âm: ghi âm + nhận dạng giọng nói tiếng Việt, so khớp từng âm tiết và thanh điệu */
const TONES_VI=['ngang','huyền','sắc','hỏi','ngã','nặng'];
function toneOf(s){const d=String(s).normalize('NFD');if(/\u0300/.test(d))return 1;if(/\u0301/.test(d))return 2;if(/\u0309/.test(d))return 3;if(/\u0303/.test(d))return 4;if(/\u0323/.test(d))return 5;return 0}
const clean=s=>String(s).normalize('NFC').toLowerCase().replace(/[.,!?;:"“”‘’()\/…\-]/g,' ').replace(/\s+/g,' ').trim();
function lev(a,b){const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
/* so khớp từng âm tiết bằng quy hoạch động; trả về [{t,s,h,k}] k: ok|tone|sound|miss */
function compareSyl(target,heard){const A=clean(target).split(' ').filter(Boolean),B=clean(heard).split(' ').filter(Boolean);
const m=A.length,n=B.length,cost=(x,y)=>x===y?0:nf(x)===nf(y)?.4:lev(nf(x),nf(y))/Math.max(nf(x).length,nf(y).length,1)*1.6;
const D=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=1;i<=m;i++)D[i][0]=i;for(let j=1;j<=n;j++)D[0][j]=j;
for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+cost(A[i-1],B[j-1]));
const out=[];let i=m,j=n;while(i>0){if(j>0&&D[i][j]===D[i-1][j-1]+cost(A[i-1],B[j-1])){out.unshift([A[i-1],B[j-1]]);i--;j--}else if(D[i][j]===D[i-1][j]+1){out.unshift([A[i-1],null]);i--}else{j--}}
return out.map(([t,h])=>{if(h==null)return{t,h:'',k:'miss'};if(t===h)return{t,h,k:'ok'};if(nf(t)===nf(h))return{t,h,k:'tone'};return{t,h,k:lev(nf(t),nf(h))<=1&&nf(t).length>2?'near':'sound'}})}
function scoreOf(c){if(!c.length)return 0;const w={ok:1,near:.6,tone:.5,sound:.15,miss:0};return Math.round(c.reduce((s,x)=>s+w[x.k],0)/c.length*100)}
function advice(c){const tips=[];c.forEach(x=>{if(x.k==='tone')tips.push('“'+x.t+'”: cần thanh '+TONES_VI[toneOf(x.t)]+', máy nghe thành thanh '+TONES_VI[toneOf(x.h)]+' (“'+x.h+'”). · tone: needs '+TONES_VI[toneOf(x.t)]);else if(x.k==='sound'||x.k==='near')tips.push('“'+x.t+'”: máy nghe thành “'+x.h+'”. Nghe lại và chú ý nguyên âm/phụ âm. · heard “'+x.h+'”');else if(x.k==='miss')tips.push('“'+x.t+'”: chưa nghe thấy. Nói rõ và đủ âm tiết hơn. · not heard')});return tips}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function pronModal(text,onDone){
document.querySelector('.pmodal')?.remove();
const w=el('div','pmodal');w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','Luyện phát âm');
w.innerHTML='<div class="pbox"><button class="pclose" aria-label="Đóng">✕</button><div class="ptag">Luyện phát âm · Pronunciation coach</div><div class="ptarget" id="pt"></div><div class="prow"><button class="btn alt" id="p1">🔊 Nghe mẫu</button><button class="btn alt" id="p2">🐢 Chậm</button></div><button class="mic" id="pm" aria-label="Bấm để nói"><span>🎤</span><small>Bấm và nói · Tap and speak</small></button><div class="pmeter"><i id="pl"></i></div><div class="pres" id="pr" aria-live="polite"></div><div class="mine" id="pa" hidden><div class="mtag">🎧 Giọng của bạn · Your recording</div><audio id="pau" controls preload="auto"></audio><div class="prow"><button class="btn alt" id="p3">▶ Nghe bạn nói</button><button class="btn alt" id="p5">⇄ So sánh: mẫu → bạn</button><button class="btn alt" id="p4">🔁 Thử lại</button></div><label class="autop"><input type="checkbox" id="pap"> Tự phát lại giọng mình sau khi chấm · Auto-play my recording</label></div></div>';
document.body.append(w);document.body.classList.add('noscroll');
const $$=s=>w.querySelector(s);$$('#pt').textContent=text;$$('#pap').checked=SET.autoplay!==false;$$('#pap').onchange=e=>{SET.autoplay=e.target.checked;store.set('vn-set',SET)};
let rec=null,mr=null,chunks=[],url=null,stream=null,ac=null,raf=0,on=false,alts=[],mrP=Promise.resolve(),cmp=null;
const pr=$$('#pr'),au=$$('#pau');
function release(){try{stream&&stream.getTracks().forEach(t=>t.stop())}catch(e){}stream=null;cancelAnimationFrame(raf);try{ac&&ac.close()}catch(e){}ac=null;$$('#pm').classList.remove('rec');$$('#pm small').textContent='Bấm và nói · Tap and speak';$$('#pl').style.width='0'}
function abort(){on=false;try{rec&&rec.abort()}catch(e){}try{mr&&mr.state!=='inactive'&&mr.stop()}catch(e){}release();try{au.pause()}catch(e){}if(cmp)cmp.pause();if(url)URL.revokeObjectURL(url)}
const close=()=>{abort();w.remove();document.body.classList.remove('noscroll');removeEventListener('keydown',esc)},esc=e=>{if(e.key==='Escape')close()};addEventListener('keydown',esc);$$('.pclose').onclick=close;w.onclick=e=>{if(e.target===w)close()};
$$('#p1').onclick=()=>say(text);$$('#p2').onclick=()=>saySlow(text);
if(!SR){pr.innerHTML='<p class="bad">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy dùng <b>Chrome</b>, <b>Edge</b> hoặc <b>Safari</b>. · Speech recognition is not supported; use Chrome, Edge or Safari.</p>';$$('#pm').disabled=true}
/* bấm lần hai = dừng nói, vẫn chấm điểm */
function userStop(){try{rec&&rec.stop()}catch(e){}try{mr&&mr.state!=='inactive'&&mr.stop()}catch(e){}$$('#pm small').textContent='Đang chấm điểm… · Scoring…'}
async function start(){if(on){userStop();return}
try{if(curAudio)curAudio.pause();speechSynthesis.cancel()}catch(e){}
try{au.pause()}catch(e){}if(cmp)cmp.pause();
pr.textContent='';alts=[];chunks=[];$$('#pa').hidden=true;if(url){URL.revokeObjectURL(url);url=null;au.removeAttribute('src')}
try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}})}catch(e){pr.innerHTML='<p class="bad">Chưa có quyền dùng micro. Hãy cho phép micro trong thanh địa chỉ rồi thử lại. · Microphone permission needed.</p>';return}
mr=null;mrP=Promise.resolve();
try{mr=new MediaRecorder(stream);mrP=new Promise(res=>{mr.ondataavailable=e=>e.data&&e.data.size&&chunks.push(e.data);mr.onstop=()=>{if(chunks.length){const b=new Blob(chunks,{type:mr.mimeType||'audio/webm'});url=URL.createObjectURL(b);au.src=url}res()}});mr.start()}catch(e){mr=null}
try{ac=new (window.AudioContext||window.webkitAudioContext)();const an=ac.createAnalyser();an.fftSize=512;ac.createMediaStreamSource(stream).connect(an);const buf=new Uint8Array(an.fftSize);const tick=()=>{an.getByteTimeDomainData(buf);let m=0;for(const v of buf)m=Math.max(m,Math.abs(v-128));$$('#pl').style.width=Math.min(100,m*1.6)+'%';raf=requestAnimationFrame(tick)};tick()}catch(e){}
rec=new SR();rec.lang='vi-VN';rec.interimResults=true;rec.maxAlternatives=5;rec.continuous=false;
rec.onresult=e=>{const r=e.results[e.results.length-1];alts=[...r].map(a=>a.transcript);if(!r.isFinal)pr.innerHTML='<p class="mean">Đang nghe: '+alts[0]+'…</p>'};
rec.onerror=e=>{if(e.error==='aborted')return;on=false;try{mr&&mr.state!=='inactive'&&mr.stop()}catch(x){}release();pr.innerHTML='<p class="bad">'+(e.error==='no-speech'?'Chưa nghe thấy giọng nói. Nói to và gần micro hơn. · No speech detected.':e.error==='not-allowed'?'Micro bị chặn. · Microphone blocked.':e.error==='network'?'Cần Internet để nhận dạng giọng nói. · Needs Internet.':'Lỗi nhận dạng: '+e.error)+'</p>'};
rec.onend=async()=>{if(!on)return;on=false;try{mr&&mr.state!=='inactive'&&mr.stop()}catch(e){}release();await Promise.race([mrP,new Promise(r=>setTimeout(r,1500))]);finish()};
on=true;$$('#pm').classList.add('rec');$$('#pm small').textContent='Đang nghe… bấm để dừng · Listening…';try{rec.start()}catch(e){on=false;release()}}
/* phát giọng mẫu (mp3 hoặc giọng AI) rồi gọi cb; không có thì gọi cb ngay */
function playModel(cb){const src=sources(text);let i=0;const go=()=>{if(i>=src.length){cb();return}const a=new Audio(src[i++]);cmp=a;a.onended=cb;a.onerror=go;const p=a.play();if(p&&p.catch)p.catch(go)};go()}
function playMine(){if(!au.src)return;try{au.currentTime=0;au.play()}catch(e){}}
function finish(){
const has=!!url;
if(!alts.length){pr.innerHTML='<p class="bad">Chưa nhận dạng được. Thử nói to, rõ hơn. · Nothing recognised, try again.</p>';if(has){$$('#pa').hidden=false;$$('#p5').hidden=false}return}
let best=null;alts.forEach(a=>{const c=compareSyl(text,a),s=scoreOf(c);if(!best||s>best.s)best={a,c,s}});
const {a,c,s}=best,lvl=s>=90?['great','Tuyệt vời! · Excellent'] :s>=70?['good','Khá tốt · Good']:s>=40?['mid','Gần đúng · Getting there']:['low','Cần luyện thêm · Keep practising'];
const t=advice(c);
pr.innerHTML='<div class="score '+lvl[0]+'"><b>'+s+'</b><span>/100</span><em>'+lvl[1]+'</em></div><div class="syls">'+c.map(x=>'<span class="syl '+x.k+'" title="'+(x.h?'nghe: '+x.h:'thiếu')+'">'+x.t+'</span>').join('')+'</div><p class="mean">Máy nghe được: “'+a+'”</p>'+(t.length?'<ul class="tips">'+t.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'<p class="ok">Phát âm rất rõ. · Clear pronunciation.</p>')+'<p class="legend"><span class="syl ok">đúng</span><span class="syl tone">sai thanh</span><span class="syl near">gần đúng</span><span class="syl sound">sai âm</span><span class="syl miss">thiếu</span></p>';
$$('#pa').hidden=false;$$('#pau').hidden=!has;$$('#p3').hidden=!has;$$('#p5').hidden=!has;
if(!has)pr.insertAdjacentHTML('beforeend','<p class="mean">Trình duyệt này không ghi âm được để phát lại. · Playback is not supported here.</p>');
try{addXp(s>=70?1:0)}catch(e){}bumpPron(text,s);if(onDone)onDone(s);
if(has&&$$('#pap').checked)setTimeout(playMine,350)}
$$('#pm').onclick=start;$$('#p4').onclick=start;
$$('#p3').onclick=()=>{if(cmp)cmp.pause();playMine()};
$$('#p5').onclick=()=>{try{au.pause()}catch(e){}playModel(()=>setTimeout(playMine,400))};
setTimeout(()=>$$('#pm').focus(),50)}
/* lưu điểm cao nhất mỗi từ/câu */
function bumpPron(t,s){ST.pron=ST.pron||{};const k=akey(t),o=ST.pron[k]||{best:0,n:0};o.best=Math.max(o.best,s);o.n++;ST.pron[k]=o;saveST()}
const pronBest=t=>((ST.pron||{})[akey(t)]||{}).best;
