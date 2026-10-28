/* Trang Ngữ pháp: 10 mẫu câu. X('câu','nghĩa'): dấu * quanh từ = từ cần chú ý. Mỗi mẫu có một câu hỏi nhỏ:
   q:['câu có ___','nghĩa','đáp án đúng','đáp án sai 1','đáp án sai 2'] */
const X=(a,b)=>[a,b];
const GM=[
{t:'Câu với “là”',e:'Sentences with “là” (to be)',f:['Chủ ngữ','là','danh từ'],
 n:'“là” nối chủ ngữ với một danh từ: nghề nghiệp, quốc tịch, tên. Phủ định: “không phải là”.',m:'“là” links the subject to a noun (job, nationality, name). Negative: “không phải là”. Adjectives do not need “là”.',
 ex:[X('Tôi *là* giáo viên.','I am a teacher.'),X('Cô ấy *là* người Nhật.','She is Japanese.'),X('Tôi *không phải là* bác sĩ.','I am not a doctor.')],
 q:['Anh ấy ___ kỹ sư.','He is an engineer.','là','có','đi']},
{t:'Hỏi “có … không?”',e:'Yes/no questions',f:['Chủ ngữ','có','động từ / tính từ','không?'],
 n:'Thêm “có” trước và “không” cuối câu để hỏi có/không. Trả lời: “Có, …” hoặc “Không, …”.',m:'Put “có” before the verb and “không” at the end to ask a yes/no question. Answer “Có, …” (yes) or “Không, …” (no).',
 ex:[X('Bạn *có* khỏe *không*?','Are you well?'),X('Anh *có* uống cà phê *không*?','Do you drink coffee?'),X('*Có*, tôi uống. / *Không*, tôi không uống.','Yes, I do. / No, I don’t.')],
 q:['Bạn có ăn cay ___?','Do you eat spicy food?','không','chưa','là']},
{t:'Tính từ và “rất / quá / lắm”',e:'Adjectives and intensifiers',f:['danh từ','(rất)','tính từ','(lắm)'],
 n:'Tính từ đứng sau danh từ và không cần “là”. “rất” đứng trước tính từ; “quá” và “lắm” đứng sau.',m:'The adjective follows the noun and needs no “to be”. “rất” goes before the adjective; “quá” and “lắm” go after it.',
 ex:[X('Phở *ngon*.','Pho is delicious.'),X('Trời *rất nóng*.','It is very hot.'),X('Cà phê này *ngon lắm*.','This coffee is very good.')],
 q:['Áo này ___ đẹp.','This shirt is very beautiful.','rất','là','đã']},
{t:'Đã – đang – sẽ',e:'Past, ongoing, future',f:['Chủ ngữ','đã / đang / sẽ','động từ'],
 n:'Động từ không đổi hình. “đã” = xong rồi, “đang” = đang diễn ra, “sẽ” = sắp tới. Có từ chỉ thời gian thì có thể bỏ.',m:'Verbs never change form. “đã” = done, “đang” = in progress, “sẽ” = future. You can drop them when a time word is present.',
 ex:[X('Tôi *đã* ăn cơm.','I have eaten.'),X('Tôi *đang* học tiếng Việt.','I am studying Vietnamese.'),X('Ngày mai tôi *sẽ* đi chợ.','Tomorrow I will go to the market.')],
 q:['Bây giờ tôi ___ ngủ.','I am sleeping now.','đang','đã','sẽ']},
{t:'Loại từ',e:'Classifiers',f:['số','loại từ','danh từ'],
 n:'Khi đếm, cần một loại từ giữa số và danh từ: “con” (động vật), “cái” (đồ vật), “quả” (trái cây), “cuốn” (sách), “ly / chai” (đồ uống).',m:'When counting, put a classifier between the number and the noun: con (animals), cái (objects), quả (fruit), cuốn (books), ly / chai (drinks).',
 ex:[X('Tôi có hai *con* mèo.','I have two cats.'),X('Cho tôi ba *quả* xoài.','Three mangoes, please.'),X('Một *ly* cà phê.','One coffee.')],
 q:['Tôi có một ___ chó.','I have a dog.','con','cái','quả']},
{t:'Hỏi giá',e:'Asking the price',f:['Cái này','bao nhiêu tiền?'],
 n:'“bao nhiêu tiền?” đứng cuối câu. Muốn rẻ hơn, nói “Bớt được không?”.',m:'“bao nhiêu tiền?” goes at the end. To ask for a lower price say “Bớt được không?”.',
 ex:[X('Cái này *bao nhiêu tiền*?','How much is this?'),X('Một ký xoài *bao nhiêu tiền*?','How much is a kilo of mangoes?'),X('Đắt quá! *Bớt được không*?','Too expensive! Can you lower it?')],
 q:['Cái mũ này ___?','How much is this hat?','bao nhiêu tiền','ở đâu','khi nào']},
{t:'Hỏi nơi chốn',e:'Asking where',f:['Danh từ','ở đâu?'],
 n:'“ở” là “at / in”. “ở đâu?” = ở chỗ nào? Dùng “ở + nơi chốn” để trả lời.',m:'“ở” means at / in. “ở đâu?” asks where. Answer with “ở + place”.',
 ex:[X('Nhà vệ sinh *ở đâu*?','Where is the toilet?'),X('Tôi *ở* Thành phố Hồ Chí Minh.','I live in Ho Chi Minh City.'),X('Ngân hàng *ở bên cạnh* siêu thị.','The bank is next to the supermarket.')],
 q:['Siêu thị ___?','Where is the supermarket?','ở đâu','là gì','mấy giờ']},
{t:'Muốn – cần – có thể',e:'Want, need, can',f:['Chủ ngữ','muốn / cần / có thể','động từ'],
 n:'Ba từ này đứng ngay trước động từ chính: muốn (want), cần (need), có thể (can).',m:'These three go right before the main verb: muốn (want), cần (need), có thể (can).',
 ex:[X('Tôi *muốn* uống trà.','I want to drink tea.'),X('Tôi *cần* mua vé.','I need to buy a ticket.'),X('Tôi *có thể* nói một chút tiếng Việt.','I can speak a little Vietnamese.')],
 q:['Tôi ___ nói tiếng Việt một chút.','I can speak a little Vietnamese.','có thể','đã','là']},
{t:'Phủ định: không – chưa – đừng',e:'Negatives',f:['Chủ ngữ','không / chưa','động từ'],
 n:'“không” = phủ định thông thường. “chưa” = not yet. “đừng” = don’t (mệnh lệnh).',m:'“không” = plain no / not. “chưa” = not yet. “đừng” = don’t (a request or command).',
 ex:[X('Tôi *không* hiểu.','I don’t understand.'),X('Tôi *chưa* ăn sáng.','I haven’t had breakfast yet.'),X('*Đừng* lo!','Don’t worry!')],
 q:['Tôi ___ ăn sáng.','I haven’t had breakfast yet.','chưa','không','đừng']},
{t:'Nói lịch sự: ạ, nhé',e:'Polite particles',f:['câu','ạ / nhé'],
 n:'“ạ” thêm vào cuối câu để tỏ ý kính trọng. “nhé” làm câu nhẹ nhàng, như “okay?”.',m:'“ạ” at the end shows respect. “nhé” softens the sentence, like “okay?”.',
 ex:[X('Cho tôi một ly nước *ạ*.','A glass of water, please.'),X('Mai gặp *nhé*!','See you tomorrow, okay?'),X('Xin lỗi, nhà vệ sinh ở đâu *ạ*?','Excuse me, where is the toilet?')],
 q:['Cảm ơn cô ___.','Thank you (politely).','ạ','nhé','không']}];
const shf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const gl=$('#gl');let gi=0,gdone={};
GM.forEach((g,i)=>{const b=el('button','chip',(i+1)+'. '+g.t);b.setAttribute('aria-pressed','false');b.onclick=()=>pick(i,true);gl.append(b)});
function paint(){[...gl.children].forEach((b,i)=>{b.setAttribute('aria-pressed',i===gi);b.classList.toggle('seen',!!(ST.gram&&ST.gram[i]))})}
function pick(i,m){gi=i;const g=GM[i];if(m)mark('gram',i);
$('#gt').textContent=(i+1)+'. '+g.t;$('#ge').textContent=g.e;
const f=$('#gf');f.textContent='';g.f.forEach((p,k)=>{if(k)f.append(el('i','','+'));f.append(el('span','',p))});
$('#gn').innerHTML=g.n+'<br><span class="en2">'+g.m+'</span>';
const x=$('#gx');x.textContent='';g.ex.forEach(([a,b])=>{const clean=a.replace(/\*/g,''),btn=el('button','say');btn.innerHTML='<b>'+a.replace(/\*([^*]+)\*/g,'<mark>$1</mark>')+'</b><span></span>';btn.lastChild.textContent=b;btn.onclick=()=>say(clean);x.append(btn)});
const [q,qe,ok,...bad]=g.q;$('#gq').textContent=q;$('#gqe').textContent=qe;$('#gr').textContent='';$('#gr').className='';
const o=$('#go');o.textContent='';shf([ok,...bad]).forEach(w=>{const b=el('button','tone',w);b.onclick=()=>{touch();const r=$('#gr');
if(w===ok){b.classList.add('right');r.className='ok';r.textContent='Đúng rồi! · '+q.replace('___',ok);say(q.replace('___',ok));if(!gdone[gi]){gdone[gi]=1;addXp(2)}}
else{b.classList.add('wrong');r.className='bad';r.textContent='Chưa đúng, thử lại. · Not quite, try again.'}};o.append(b)});
paint()}
$('#gnx').onclick=()=>{pick((gi+1)%GM.length,true);$('#gt').scrollIntoView({behavior:'smooth',block:'start'})};
pick(0,false);
