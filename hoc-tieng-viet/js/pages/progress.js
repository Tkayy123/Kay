/* Tab Tiến độ (v22): vòng tròn % toàn lộ trình, mục tiêu, biểu đồ 7 ngày, thanh tiến độ theo mục và theo chủ đề */
const DAYN=['CN','T2','T3','T4','T5','T6','T7'];
const STAGES=[[100,'Hoàn thành A1','Completed A1'],[75,'Gần về đích','Almost there'],[50,'Vững dần','Getting solid'],[25,'Đang tiến bộ','Making progress'],[0,'Mới bắt đầu','Just started']];
/* thanh tiến độ: rộng ra từ 0 cho mượt; p là 0–100 */
function pbar(p,rgb,tall){const b=hx('div','pv-bar'+(tall?' tall':''),'<i></i>'),i=b.firstChild;b.setAttribute('role','progressbar');b.setAttribute('aria-valuemin',0);b.setAttribute('aria-valuemax',100);b.setAttribute('aria-valuenow',p);if(rgb)b.style.setProperty('--c',rgb);i.dataset.w=p;if(p>0)i.style.minWidth='10px';return b}
function ringHTML(p){const C=2*Math.PI*52;return '<svg class="pv-ring" viewBox="0 0 120 120" role="img" aria-label="'+p+'%"><circle cx="60" cy="60" r="52" class="pv-trk"/><circle cx="60" cy="60" r="52" class="pv-arc" transform="rotate(-90 60 60)" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+C.toFixed(1)+'" data-off="'+(C*(1-p/100)).toFixed(1)+'"/></svg><div class="pv-ct"><b>'+p+'<small>%</small></b><span>A0 → A1</span></div>'}
function renderProg(){
['pov','pg','pgl','pm','pl'].forEach(id=>$('#'+id).textContent='');
/* 1. tổng quan */
const st=STAGES.find(s=>overall>=s[0]),low=all6.slice().sort((a,b)=>pc(a.n,a.t)-pc(b.n,b.t))[0];
const ov=hx('div','pv-ovw');ov.append(hx('div','pv-rw',ringHTML(overall)));
const tx=hx('div','pv-tx','<div class="pv-stg">'+st[1]+'</div><div class="pv-en">'+st[2]+'</div>'+(overall>=100?'<p>Em đã đi hết lộ trình A0–A1. Giỏi lắm!<br><span class="en2">You finished the whole A0–A1 path. Well done!</span></p>':'<p>Còn <b>'+(100-overall)+'%</b> nữa là hết lộ trình A0–A1.<br><span class="en2">'+(100-overall)+'% to go to finish the A0–A1 path.</span></p><a class="btn" href="'+low.id+'.html">Học tiếp: '+low.vi+' → <small>('+pc(low.n,low.t)+'%)</small></a>'));
ov.append(tx);$('#pov').append(ov);
[['Từ đã nhớ · Words known',nKnown()+'/'+nWords()],['Chuỗi ngày · Day streak',streak()],['Số ngày học · Days studied',ST.days.length],['XP · Điểm',ST.xp||0],['Bài học xong · Lessons done',ST.lessons||0],['Từ hay sai · Weak words',Object.values(ST.miss).filter(x=>x>0).length],['Độ chính xác · Accuracy',ST.n?Math.round(ST.ok/ST.n*100)+'%':'—']].forEach(([l,v])=>{const d=el('div','stat');d.append(el('b','',v),el('span','',l));$('#pg').append(d)});
/* 2. mục tiêu + biểu đồ 7 ngày */
const today=dk(new Date()),goal=SET.goal||40,xpT=((ST.log||{})[today]||{}).xp||0,les7=lastDays('les',7),pg=$('#pgl');
const g1=hx('div','pv-goal','<div class="pv-gh"><span>Hôm nay · Today <small>'+xpT+'/'+goal+' XP</small></span><b>'+pc(xpT,goal)+'%</b></div>');g1.append(pbar(pc(xpT,goal),'43 122 86',true));
const g2=hx('div','pv-goal','<div class="pv-gh"><span>Bài học tuần này · Lessons this week <small>'+Math.min(les7,GOAL_WEEK_LESSONS)+'/'+GOAL_WEEK_LESSONS+'</small></span><b>'+pc(les7,GOAL_WEEK_LESSONS)+'%</b></div>');g2.append(pbar(pc(les7,GOAL_WEEK_LESSONS),'124 76 140',true));
const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push([DAYN[d.getDay()],((ST.log||{})[dk(d)]||{}).xp||0,i===0])}
const mx=Math.max(goal,...days.map(x=>x[1])),wk=hx('div','pv-wk');wk.setAttribute('role','img');wk.setAttribute('aria-label','XP 7 ngày: '+days.map(x=>x[0]+' '+x[1]).join(', '));
days.forEach(([n,v,t])=>{const c=hx('div','pv-col'+(t?' now':'')+(v>=goal?' hit':''),'<span class="pv-v">'+(v||'')+'</span><span class="pv-b"><i data-h="'+Math.round(v/mx*100)+'"></i></span><span class="pv-d">'+n+'</span>');wk.append(c)});
const gl=hx('div','pv-gl');gl.style.setProperty('--gy',(1-goal/mx).toFixed(3));gl.append(wk);
pg.append(g1,g2,hx('div','pv-wkt','XP mỗi ngày · Daily XP <small>vạch ngang = mục tiêu '+goal+' XP · line = '+goal+' XP goal</small>'),gl);
/* 3. theo từng mục học */
MODS.forEach(g=>{pm.append(hx('div','pv-gh2',g.g+' <small>'+g.e+'</small>'));g.items.forEach(m=>{const p=pc(m.n,m.t),a=hx('a','pv-row');a.href=m.id+'.html';a.append(hx('div','pv-rh','<span class="pv-rn">'+m.vi+'<small>'+m.en+'</small></span><b>'+p+'%</b>'),pbar(p,m.c),hx('div','pv-rc',m.n+'/'+m.t+' '+m.u));pm.append(a)})});
/* 4. theo chủ đề */
LS.forEach(l=>{const n=l[1].filter(w=>known[l[0]+'|'+w.split('=')[0]]).length,p=pc(n,l[1].length),r=hx('div','pv-row sm');r.append(hx('div','pv-rh','<span class="pv-rn">'+(p>=100?'✅ ':'')+l[0]+'</span><b>'+p+'%</b>'),pbar(p,'43 122 86'),hx('div','pv-rc',n+'/'+l[1].length+' từ · words'));$('#pl').append(r)});
/* chạy hiệu ứng */
requestAnimationFrame(()=>requestAnimationFrame(()=>{document.querySelectorAll('.pv-bar i[data-w]').forEach(i=>i.style.width=i.dataset.w+'%');document.querySelectorAll('.pv-arc').forEach(a=>a.style.strokeDashoffset=a.dataset.off);document.querySelectorAll('.pv-b i[data-h]').forEach(i=>i.style.height=i.dataset.h+'%')}))}
const pm=$('#pm');renderProg();
