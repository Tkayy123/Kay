/* Trang chủ dạng bảng điều khiển: banner tiếp tục học, các nhóm học, ôn tập thông minh, chỉ số động lực */

const today=dk(new Date()),studied=ST.days.includes(today),sk=streak();
const xpToday=((ST.log||{})[today]||{}).xp||0,goal=SET.goal||40,gp=Math.min(1,xpToday/goal);
const xpWeek=lastDays('xp',7),lesWeek=lastDays('les',7);
const due=dueWords().length,weak=Object.values(ST.miss).filter(x=>x>0).length,unk=ALL.filter(w=>!known[w.k]).length;
const first=!ST.days.length&&!ST.last;

/* huy hiệu: mở khóa rồi giữ vĩnh viễn */
const BG=[['seed','🌱','Bắt đầu','Học 1 ngày',ST.days.length>=1],['f3','🔥','3 ngày liền','Chuỗi 3 ngày',sk>=3],['f7','📅','7 ngày liền','Chuỗi 7 ngày',sk>=7],
['w50','📚','50 từ','Nhớ 50 từ',nKnown()>=50],['l5','🎯','5 bài học','Xong 5 bài học',(ST.lessons||0)>=5],['x500','⭐','500 XP','Đạt 500 XP',(ST.xp||0)>=500]];
ST.badges=ST.badges||{};let nb=false;BG.forEach(b=>{if(b[4]&&!ST.badges[b[0]]){ST.badges[b[0]]=1;nb=true}});if(nb)saveST();

const TIPS=[['Mỗi ngày học 10 phút hiệu quả hơn học một giờ mỗi tuần một lần.','Ten minutes a day beats one hour a week.'],
['Nghe xong hãy nhắc lại thành tiếng. Miệng nhớ cũng quan trọng như tai nghe.','After listening, say it out loud. Your mouth needs practice too.'],
['Cùng một chữ nhưng khác dấu thanh là khác nghĩa: ma, má, mà, mả, mã, mạ.','Same letters, different tone, different word: ma, má, mà, mả, mã, mạ.'],
['Học từ theo chủ đề (gia đình, đồ ăn…) dễ nhớ hơn học từ rời rạc.','Learning words by topic is easier than learning them one by one.'],
['Trả lời sai cũng không sao: từ sai sẽ tự quay lại đúng lúc để em ôn.','Wrong answers are fine: the word comes back at the right time.'],
['Khi mới học thanh điệu, hãy chỉnh tốc độ đọc chậm hơn trong Cài đặt.','When starting with tones, slow the speech speed in Settings.'],
['Khi tập hội thoại, hãy tự nói câu của mình trước khi bấm nghe đáp án.','In dialogues, say your line before tapping to hear it.'],
['Nhìn đường cong của thanh điệu và vẽ theo bằng ngón tay khi phát âm.','Trace the tone curve with your finger as you say the word.']];
const tip=TIPS[dayNo()%TIPS.length];

const root=$('#dash'),main=hx('div','dmain'),side=hx('div','dside');root.append(main,side);

/* 1. Banner */
const lastLabel=l=>l.h.includes('?')?l.t:l.t.split(' · ')[0];/* trang chung chỉ hiện tên tiếng Việt; từ vựng/bài học hiện cả chủ đề */
const cta=first?{h:'alphabet.html',t:'Bắt đầu: Bảng chữ cái'}:ST.last?{h:ST.last.h,t:'Tiếp tục học: '+lastLabel(ST.last)}:{h:'lesson.html',t:'Làm một bài học'};
const hero=hx('section','hero');
const ht=hx('div','hero-t');
const h2=el('h2','','Chào mừng '+(SET.name||'em')+(first?'':' trở lại')+'!');
ht.append(h2,hx('p','hero-s',first?'Từ từ thôi, mỗi ngày một chút — học tiếng Việt từ số không.<br><span>Slowly, a little every day — learn Vietnamese from zero.</span>':'Em đã hoàn thành <b>'+overall+'%</b> lộ trình A0–A1.<br><span>You have completed '+overall+'% of the A0–A1 path.</span>'));
const hb=hx('div','hbar','<i style="width:'+overall+'%"></i>');hb.setAttribute('role','progressbar');hb.setAttribute('aria-valuenow',overall);hb.setAttribute('aria-valuemin',0);hb.setAttribute('aria-valuemax',100);hb.setAttribute('aria-label','Tiến độ lộ trình');
const ca=hx('a','hcta');ca.href=cta.h;ca.append(el('span','',cta.t+' '),el('b','','→'));
ht.append(hb,ca);hero.append(ht,hx('div','hero-i','🎓'));hero.lastChild.setAttribute('aria-hidden','true');
main.append(hero);

/* Từ của ngày: mỗi ngày một từ có câu ví dụ */
{const pool=ALL.filter(w=>exOf(w.v)),w=pool[dayNo()%pool.length],x=exOf(w.v),s=hx('section','w wotd'),t=el('div','wtx');
t.append(hx('h3','wt','Từ của ngày <small>· Word of the day</small>'),el('div','wv',w.v),el('div','we',w.e),el('p','wx',x[0]+' — '+x[1]));
const b1=el('button','btn alt','🔊 Từ · Word'),b2=el('button','btn alt','🔊 Câu · Sentence');b1.onclick=()=>say(w.v);b2.onclick=()=>say(x[0]);
const bw=el('div','wbtns');bw.append(b1,b2);s.append(t,bw);main.append(s)}

/* 2. Các nhóm học */
const mods=hx('section','dmods');
MODS.forEach(g=>{const gs=hx('div','mgroup');gs.append(hx('h3','mgt',g.g+' <small>· '+g.e+'</small>'));const grid=hx('div','mgrid');
g.items.forEach(m=>{const p=pc(m.n,m.t),a=hx('a','mcard');a.href=m.id+'.html';a.style.setProperty('--c',m.c);
a.append(hx('span','mic',IC[m.id]),hx('b','mt',m.vi+' <small>'+m.en+'</small>'),hx('span','md',m.d),
hx('span','mp','<span class="mpb" role="progressbar" aria-valuenow="'+p+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+p+'%"></i></span><span class="mpt"><b>'+m.n+'/'+m.t+'</b> '+m.u+'</span>'));grid.append(a)});
gs.append(grid);mods.append(gs)});
/* Giảm tải: người mới thấy 3 bước nên làm; danh sách đầy đủ gập lại */
const quick=hx('div','quick');[['dictionary.html','🔎','Tra từ điển','Dictionary'],['phrasebook.html','🗣️','Câu cần thiết','Survival phrases'],['speak.html','🎤','Luyện nói (AI chấm)','Speaking coach']].forEach(([h,i,v,e])=>{const a=hx('a','qk','<span aria-hidden="true">'+i+'</span><b>'+v+'</b><small>'+e+'</small>');a.href=h;quick.append(a)});
if(overall<30){const SP=[['alphabet.html','Bảng chữ cái','Alphabet',cnt(ST.letters)>=10],['tones.html','Thanh điệu','Tones',cnt(ST.tones)>=6],['lesson.html?l=0','Bài học đầu tiên','First lesson',nKnown()>=8]];let nx=SP.findIndex(x=>!x[3]);
const st=hx('section','steps');st.append(hx('h3','mgt','Bắt đầu từ đây <small>· 3 steps for beginners</small>'));const sg=hx('div','sgr');
SP.forEach(([h,v,e,dn],i)=>{const a=hx('a','stp'+(dn?' done':'')+(i===nx?' next':''),'<i>'+(dn?'✓':i+1)+'</i><b>'+v+'</b><small>'+e+'</small>'+(i===nx?'<em>Tiếp theo</em>':''));a.href=h;sg.append(a)});st.append(sg);main.append(st,quick);
const det=hx('details','allmods');det.append(hx('summary','','Xem tất cả mục học · All sections'),mods);main.append(det)}
else{main.append(quick,mods)}

/* 3. Ôn tập thông minh */
const rev=hx('section','drev');
rev.append(hx('span','rico','🔁'));
const rb=hx('div','rbody');
rb.append(hx('h3','','Ôn tập thông minh <small>· Smart review</small>'),
 hx('p','rbig',due?'Có <b>'+due+'</b> từ cần ôn hôm nay':'Hôm nay chưa có từ nào đến hạn ôn'),
 hx('p','rsub',(due?'':'Học thêm bài mới, những từ em đã làm sẽ được nhắc lại đúng lúc. ')+'Từ hay sai: <b>'+weak+'</b> · Từ chưa nhớ: <b>'+unk+'</b>'),
 hx('p','rnote','Từ trả lời đúng sẽ được nhắc lại sau 1, 2, 4, 8, 16 ngày; từ trả lời sai quay lại ngay.<br><span>Correct words return after 1, 2, 4, 8, 16 days; wrong ones come back right away.</span>'));
const rbtn=hx('a','btn');rbtn.href=due?'review.html?mode=due':'review.html';rbtn.textContent=due?'Ôn ngay · Review now':'Luyện tập · Practice';
rev.append(rb,rbtn);main.append(rev);

/* ---- Cột phải ---- */
/* Chuỗi ngày + XP + lịch tuần */
const WK=['CN','T2','T3','T4','T5','T6','T7'];const wd=[];{const d=new Date();d.setDate(d.getDate()-6);for(let i=0;i<7;i++){wd.push([WK[d.getDay()],ST.days.includes(dk(d)),i===6]);d.setDate(d.getDate()+1)}}
const w1=hx('section','w w-streak');
w1.append(hx('div','wk','<span class="fire" aria-hidden="true">🔥</span><div><div class="wn"><b>'+sk+'</b> <small>ngày liên tiếp</small></div><div class="wsub">day streak</div></div>'),
 hx('p','whint',studied?'Hôm nay em đã học rồi! 🎉':sk?'Học hôm nay để giữ chuỗi nhé!':'Học hôm nay để bắt đầu chuỗi.'),
 hx('div','week',wd.map(([l,on,t])=>'<span class="wd'+(on?' on':'')+(t?' now':'')+'"><i>'+(on?'✓':'')+'</i>'+l+'</span>').join('')),
 hx('div','xps','<div><b>'+xpWeek+'</b><span>XP tuần này</span></div><div><b>'+(ST.xp||0)+'</b><span>Tổng XP</span></div>'));
/* Mục tiêu hằng ngày */
const C=2*Math.PI*42;
const w2=hx('section','w w-goal');
w2.append(hx('h3','wt','Mục tiêu hôm nay <small>· Daily goal</small>'),
 hx('div','ringw','<svg viewBox="0 0 100 100" class="ring" role="img" aria-label="'+xpToday+' trên '+goal+' XP"><circle class="rb" cx="50" cy="50" r="42"/><circle class="rf" cx="50" cy="50" r="42" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+(C*(1-gp)).toFixed(1)+'" transform="rotate(-90 50 50)"/></svg><div class="rt"><b>'+xpToday+'</b><span>/ '+goal+' XP</span></div>'),
 hx('p','whint',gp>=1?'Đã đạt mục tiêu! ✓':'Còn '+(goal-xpToday)+' XP nữa là đạt mục tiêu.'),
 hx('a','wl','Đổi mục tiêu · Change goal'));w2.lastChild.href='settings.html';
/* Thử thách tuần */
const wl=Math.min(lesWeek,GOAL_WEEK_LESSONS);
const w3=hx('section','w w-chal');
w3.append(hx('h3','wt','Thử thách tuần <small>· Weekly challenge</small>'),
 hx('p','wc','Hoàn thành <b>'+GOAL_WEEK_LESSONS+' bài học</b> trong 7 ngày'+(wl>=GOAL_WEEK_LESSONS?' ✓':'')),
 hx('div','mpb','<i style="width:'+pc(wl,GOAL_WEEK_LESSONS)+'%"></i>'),hx('p','wsub2',wl+'/'+GOAL_WEEK_LESSONS+' bài · '+(wl>=GOAL_WEEK_LESSONS?'Giỏi lắm!':'Cố lên!')));
/* Huy hiệu */
const w4=hx('section','w w-badge');
w4.append(hx('h3','wt','Huy hiệu <small>· Badges</small>'),hx('div','bgs',BG.map(b=>'<span class="bg'+(ST.badges[b[0]]?' on':'')+'" title="'+b[3]+'"><i aria-hidden="true">'+b[1]+'</i><small>'+b[2]+'</small></span>').join('')));
/* Mẹo */
const w5=hx('section','w w-tip');
w5.append(hx('h3','wt','Mẹo học nhanh <small>· Quick tip</small>'),hx('p','wc',tip[0]),hx('p','wsub2',tip[1]));
side.append(w1,w2,w3,w4,w5);
