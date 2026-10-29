/* Dữ liệu dùng chung cho Trang chủ và Tiến độ: các mục học, số đã xong / tổng, % toàn lộ trình */
const DLG_TOTAL=23;/* số đoạn hội thoại trong dialogues.js; sửa số này khi thêm đoạn mới */
const GOAL_WEEK_LESSONS=5;
const cnt=o=>Object.keys(o||{}).length;
const pc=(n,t)=>t?Math.round(Math.min(n,t)/t*100):0;
const hx=(tag,cls,html)=>{const e=el(tag,cls);if(html!=null)e.innerHTML=html;return e};/* chỉ dùng với chuỗi do app tự viết, không dùng cho chữ người học nhập */

const MODS=[
{g:'Kiến thức nền tảng',e:'Foundation',items:[
 {id:'alphabet',vi:'Bảng chữ cái',en:'Alphabet',d:'29 chữ cái: tên và cách đọc',n:cnt(ST.letters),t:29,u:'chữ đã xem',c:'155 28 49'},
 {id:'tones',vi:'Thanh điệu',en:'Tones',d:'Sáu thanh điệu, cặp từ, nghe và chọn',n:cnt(ST.tones),t:6,u:'thanh đã nghe',c:'201 100 66'},
 {id:'numbers',vi:'Số đếm',en:'Numbers',d:'Cách đọc số, luyện nghe số',n:Math.min(ST.nums||0,10),t:10,u:'câu nghe số đúng',c:'201 138 27'},
 {id:'grammar',vi:'Ngữ pháp',en:'Grammar',d:'10 mẫu câu thường dùng, ví dụ và thử thách',n:cnt(ST.gram),t:10,u:'mẫu câu đã xem',c:'168 85 110'}]},
{g:'Luyện tập kỹ năng',e:'Practice & application',items:[
 {id:'words',vi:'Từ vựng',en:'Vocabulary',d:nTopics()+' chủ đề, thẻ ghi nhớ có câu ví dụ, tìm từ',n:nKnown(),t:nWords(),u:'từ đã nhớ',c:'43 122 86'},
 {id:'dialogues',vi:'Hội thoại',en:'Dialogues',d:'Nhập vai hội thoại hằng ngày',n:cnt(ST.dlg),t:DLG_TOTAL,u:'đoạn đã xong',c:'58 112 150'},
 {id:'lesson',vi:'Bài học',en:'Practice lessons',d:'Chọn, nghe, ghép cặp, gõ từ',n:Object.keys(ST.done||{}).filter(k=>LS[k]&&LS[k][0]!==MINE).length,t:nTopics(),u:'bài đã xong',c:'124 76 140'}]}];
const all6=MODS.flatMap(g=>g.items);
const overall=Math.round(all6.reduce((s,m)=>s+pc(m.n,m.t),0)/all6.length);
