/* Dữ liệu từ vựng dùng chung · mỗi chủ đề 8 từ, nhóm theo GR */
const P=(t,s)=>[t,s.split(';')];
const LS=[P('Chào hỏi','Xin chào=Hello;Chào bạn=Hi (to a friend);Tôi=I / me;Bạn=you (peer);tên=name;khỏe=well;cảm ơn=thank you;Tạm biệt=Goodbye'),
P('Quốc tịch & nghề','người Việt Nam=Vietnamese person;người Úc=Australian;người Mỹ=American;người Nhật=Japanese;giáo viên=teacher;sinh viên=university student;bác sĩ=doctor;kỹ sư=engineer'),
P('Số đếm','không=0;một=1;hai=2;ba=3;năm=5;mười=10;hai mươi=20;một trăm=100'),
P('Tuổi & điện thoại','tuổi=age;bao nhiêu=how many / how much;số điện thoại=phone number;số=number;năm nay=this year;sinh nhật=birthday;mấy=how many (small numbers);của=of / ’s'),
P('Gia đình','gia đình=family;bố / ba=dad (North / South);mẹ=mom;anh=older brother;chị=older sister;em=younger sibling;ông=grandfather;bà=grandmother'),
P('Xưng hô','anh=older man (you);chị=older woman (you);em=younger person;cô=Ms. / aunt / teacher;thầy=male teacher;chú=uncle / man your father’s age;bác=older uncle / aunt;cháu=child speaking to elders'),
P('Ăn uống','phở=pho noodle soup;cơm=cooked rice;bánh mì=bread / Vietnamese sandwich;cà phê=coffee;trà=tea;nước=water;nước cam=orange juice;sữa=milk'),
P('Mua sắm','bao nhiêu tiền=how much (money);đồng=dong (currency);nghìn=thousand;đắt=expensive;rẻ=cheap;mua=to buy;bán=to sell;chợ=market'),
P('Giờ giấc','giờ=hour / o’clock;phút=minute;rưỡi=half past;sáng=morning;trưa=noon;chiều=afternoon;tối=evening / night;bây giờ=now'),
P('Ngày trong tuần','thứ hai=Monday;thứ ba=Tuesday;thứ tư=Wednesday;thứ năm=Thursday;thứ sáu=Friday;thứ bảy=Saturday;Chủ nhật=Sunday;cuối tuần=weekend'),
P('Hỏi đường','đi thẳng=go straight;rẽ trái=turn left;rẽ phải=turn right;ở đâu=where;gần=near;xa=far;bên cạnh=next to;đối diện=opposite'),
P('Phương tiện','xe máy=motorbike;xe đạp=bicycle;xe buýt=bus;taxi=taxi;ô tô=car;máy bay=airplane;sân bay=airport;đi bộ=to walk'),
P('Nhà cửa','nhà=house / home;phòng khách=living room;phòng ngủ=bedroom;nhà bếp=kitchen;nhà vệ sinh=toilet;bàn=table;ghế=chair;giường=bed'),
P('Thời tiết','trời=sky / weather;nóng=hot;lạnh=cold;mát=cool / pleasant;mưa=rain;nắng=sunny;gió=wind;mùa=season'),
P('Sở thích','sở thích=hobby;đọc sách=to read books;nghe nhạc=to listen to music;xem phim=to watch movies;nấu ăn=to cook;chơi thể thao=to play sports;đi du lịch=to travel;đi dạo=to go for a walk'),
P('Câu lịch sự','xin lỗi=sorry / excuse me;làm ơn=please;không có gì=you’re welcome;vâng / dạ=yes (polite);không=no / not;được=OK / can;hiểu=to understand;không hiểu=I don’t understand'),
P('Cơ thể','đầu=head;mắt=eye;mũi=nose;miệng=mouth;tai=ear;tay=hand / arm;chân=foot / leg;bụng=stomach'),
P('Cảm xúc','vui=happy;buồn=sad;giận=angry;sợ=afraid;yêu=to love;nhớ=to miss;thích=to like;bận=busy'),
P('Trái cây','chuối=banana;xoài=mango;cam=orange;dưa hấu=watermelon;táo=apple;thanh long=dragon fruit;dứa=pineapple;nho=grapes'),
P('Rau & thịt','rau=vegetables;cà chua=tomato;hành=onion;tỏi=garlic;thịt bò=beef;thịt gà=chicken;thịt heo=pork (South);cá=fish'),
P('Món ăn & gia vị','muối=salt;đường=sugar;tiêu=pepper;nước mắm=fish sauce;ớt=chili;bún=rice vermicelli;cháo=rice porridge;chả giò=spring roll'),
P('Địa điểm','ngân hàng=bank;siêu thị=supermarket;nhà hàng=restaurant;khách sạn=hotel;bưu điện=post office;công viên=park;nhà ga=train station;hiệu thuốc=pharmacy'),
P('Du lịch','hộ chiếu=passport;vé=ticket;đặt phòng=to book a room;hành lý=luggage;bản đồ=map;thành phố=city;biển=sea / beach;núi=mountain'),
P('Quần áo','áo=shirt;quần=trousers;váy=skirt / dress;giày=shoes;dép=sandals;mũ=hat;áo khoác=jacket;túi=bag'),
P('Màu sắc','đỏ=red;xanh dương=blue;xanh lá=green;vàng=yellow;trắng=white;đen=black;cam=orange (color);hồng=pink'),
P('Trường học & công việc','trường=school;lớp học=classroom;sách=book;bút=pen;vở=notebook;bài tập=homework;công ty=company;văn phòng=office'),
P('Sức khỏe','bệnh viện=hospital;thuốc=medicine;đau=pain / sore;sốt=fever;ho=cough;mệt=tired;khám bệnh=to see a doctor;khỏe mạnh=healthy'),
P('Động vật','chó=dog;mèo=cat;gà=chicken;vịt=duck;bò=cow;chim=bird;cá=fish;voi=elephant'),
P('Động từ thông dụng','ăn=to eat;uống=to drink;ngủ=to sleep;đi=to go;đến=to arrive;làm=to do / work;học=to study;nói=to speak'),
P('Tính từ','lớn=big;nhỏ=small;đẹp=beautiful;ngon=delicious;mới=new;cũ=old;nhanh=fast;chậm=slow'),
P('Từ để hỏi','ai=who;gì=what;khi nào=when;tại sao=why;như thế nào=how;bao lâu=how long;nào=which;mấy giờ=what time'),
P('Gọi món & nhà hàng','cho tôi=please give me;thực đơn=menu;tính tiền=the bill, please;không cay=not spicy;cay=spicy;đá=ice;thêm=more / add;mang về=takeaway'),
P('Mặc cả & thanh toán','bớt=to lower the price;giảm giá=discount;tiền mặt=cash;thẻ=card;chuyển khoản=bank transfer;tiền thừa=change (money back);hóa đơn=receipt / invoice;đắt quá=too expensive'),
P('Đi taxi & Grab','đặt xe=to book a ride;tài xế=driver;điểm đón=pick-up point;dừng lại=stop here;quay đầu=make a U-turn;ngã tư=intersection;đèn đỏ=red light;đến nơi=to arrive'),
P('Khách sạn','phòng đơn=single room;phòng đôi=double room;nhận phòng=check in;trả phòng=check out;chìa khóa=key;điều hòa=air conditioner;wifi=wifi;bữa sáng=breakfast'),
P('Điện thoại & Internet','điện thoại=phone;gọi điện=to make a call;nhắn tin=to text;mạng=internet / network;sạc pin=to charge;hết pin=out of battery;sim=SIM card;mật khẩu=password'),
P('Gặp bác sĩ','đau đầu=headache;đau bụng=stomachache;đau họng=sore throat;dị ứng=allergy;đơn thuốc=prescription;uống thuốc=to take medicine;cấp cứu=emergency;nghỉ ngơi=to rest'),
P('Vị trí','trên=above / on;dưới=below / under;trong=inside;ngoài=outside;trước=in front / before;sau=behind / after;giữa=between / middle;ở đây=here'),
P('Thời gian','hôm nay=today;ngày mai=tomorrow;hôm qua=yesterday;tuần này=this week;tuần sau=next week;tháng=month;lúc nào=when / what time;luôn luôn=always'),
P('Loại từ (đếm đồ vật)','cái=general objects;con=animals;quả / trái=fruit, round things;chiếc=single items (vehicle, shirt);cuốn=books;tờ=sheets (paper, tickets);ly=glass / cup;chai=bottle'),
P('Từ chỉ mức độ & từ nối','rất=very;quá=too / so;hơi=a bit;lắm=very much;và=and;nhưng=but;vì=because;nếu=if'),
P('Từ ngữ pháp thường dùng','là=to be;có=to have / there is;muốn=to want;có thể=can / may;phải=must / have to;đã=already (past);đang=in progress;sẽ=will (future)'),
P('Thức uống & tráng miệng','bia=beer;nước ngọt=soft drink;sinh tố=smoothie;trà đá=iced tea;cà phê sữa đá=iced milk coffee;kem=ice cream;chè=sweet dessert soup;bánh=cake / pastry'),
P('Đồ dùng hằng ngày','ví=wallet;kính=glasses;ô=umbrella;đồng hồ=watch / clock;máy tính=computer;đèn=lamp / light;cửa=door;cửa sổ=window'),
P('Số lớn & tiền','mười nghìn=ten thousand;trăm nghìn=hundred thousand;triệu=million;tỷ=billion;lẻ=and (zero in the tens place);phần trăm=percent;nửa=half;tổng=total'),
P('Ngân hàng','tài khoản=account;rút tiền=withdraw money;gửi tiền=deposit money;đổi tiền=exchange money;tỷ giá=exchange rate;máy ATM=ATM;lãi suất=interest rate;chuyển tiền=transfer money'),
P('Công việc','nhân viên=employee;sếp=boss;đồng nghiệp=colleague;cuộc họp=meeting;lương=salary;nghỉ phép=take leave;làm việc=to work;xin việc=apply for a job'),
P('Học tập','học sinh=school student;bài kiểm tra=test;thi=take an exam;điểm=score / grade;thư viện=library;bảng=board;cặp sách=school bag;tốt nghiệp=to graduate'),
P('Nấu ăn & nhà bếp','nồi=pot;chảo=frying pan;dao=knife;đũa=chopsticks;bát / chén=bowl (North / South);nấu=to cook;luộc=to boil;nướng=to grill / bake'),
P('Điện thoại & mạng xã hội','ứng dụng=app;tải xuống=download;đăng nhập=log in;ảnh=photo;chia sẻ=share;bình luận=comment;màn hình=screen;tin nhắn=message'),
P('Tháng & năm','tháng một=January;tháng hai=February;tháng ba=March;tháng tư=April;tháng mười=October;tháng mười hai=December;năm ngoái=last year;năm sau=next year'),
P('Thiên nhiên','sông=river;hồ=lake;rừng=forest;đảo=island;bãi biển=beach;cây=tree;hoa=flower;mặt trời=sun'),
P('Lễ hội & văn hóa','Tết=Lunar New Year;bánh chưng=sticky rice cake;lì xì=lucky money;áo dài=ao dai (long dress);lễ hội=festival;chùa=pagoda;chúc mừng=congratulations;quà=gift'),
P('Việc hằng ngày','thức dậy=wake up;đánh răng=brush teeth;tắm=take a shower;mặc=to wear;giặt=to wash (clothes);dọn dẹp=tidy up;đi làm=go to work;về nhà=go home'),
P('Nhờ giúp đỡ','Cẩn thận=Careful;Giúp tôi với=Help me;Chờ một chút=Wait a moment;Nói lại được không=Could you say it again;Nói chậm thôi=Please speak slowly;Tôi bị lạc=I am lost;Tôi đồng ý=I agree;Tôi không biết=I do not know')];
const GR=[['Làm quen · Getting to know people',[0,15,1,3]],['Con người · People',[4,5,16,17]],['Ăn uống & mua sắm · Food and shopping',[6,18,19,20,42,7,48]],['Số & thời gian · Numbers and time',[2,44,8,9,50]],['Đi lại & nơi chốn · Getting around',[10,11,21,22,12]],['Đời sống · Daily life',[23,24,25,26,43,53,46,47]],['Thiên nhiên & sở thích · Nature and hobbies',[13,27,14,51,52]],['Ngôn ngữ cơ bản · Core language',[28,29,30]],
['Giao tiếp thực tế · Real-life situations',[31,32,33,34,35,36,45,49,54]],
['Ngữ pháp & từ nối · Grammar words',[37,38,39,40,41]]];
/* Tên tiếng Anh của từng chủ đề (chỉ để hiển thị; khóa lưu tiến độ vẫn là tên tiếng Việt) */
const TEN={'Chào hỏi':'Greetings','Quốc tịch & nghề':'Nationality & jobs','Số đếm':'Counting numbers','Tuổi & điện thoại':'Age & phone number','Gia đình':'Family','Xưng hô':'Forms of address','Ăn uống':'Food & drink','Mua sắm':'Shopping','Giờ giấc':'Telling time','Ngày trong tuần':'Days of the week','Hỏi đường':'Asking directions','Phương tiện':'Transport','Nhà cửa':'Home & house','Thời tiết':'Weather','Sở thích':'Hobbies','Câu lịch sự':'Polite phrases','Cơ thể':'Body','Cảm xúc':'Feelings','Trái cây':'Fruit','Rau & thịt':'Vegetables & meat','Món ăn & gia vị':'Dishes & seasonings','Địa điểm':'Places','Du lịch':'Travel','Quần áo':'Clothes','Màu sắc':'Colors','Trường học & công việc':'School & work','Sức khỏe':'Health','Động vật':'Animals','Động từ thông dụng':'Common verbs','Tính từ':'Adjectives','Từ để hỏi':'Question words','Gọi món & nhà hàng':'Ordering & restaurants','Mặc cả & thanh toán':'Bargaining & paying','Đi taxi & Grab':'Taxi & Grab rides','Khách sạn':'Hotel','Điện thoại & Internet':'Phone & internet','Gặp bác sĩ':'Seeing a doctor','Vị trí':'Position & location','Thời gian':'Time words','Loại từ (đếm đồ vật)':'Classifiers (counting things)','Từ chỉ mức độ & từ nối':'Degree words & connectors','Từ ngữ pháp thường dùng':'Common grammar words','Thức uống & tráng miệng':'Drinks & desserts','Đồ dùng hằng ngày':'Everyday items','Số lớn & tiền':'Big numbers & money','Ngân hàng':'Bank','Công việc':'Work & jobs','Học tập':'Studying','Nấu ăn & nhà bếp':'Cooking & kitchen','Điện thoại & mạng xã hội':'Phone & social media','Tháng & năm':'Months & years','Thiên nhiên':'Nature','Lễ hội & văn hóa':'Festivals & culture','Việc hằng ngày':'Daily routine','Nhờ giúp đỡ':'Asking for help','Sổ từ của em':'My word book'};
/* Nhãn chủ đề song ngữ: tên Việt + tên Anh (+ số từ đã nhớ nếu có). Chế độ “Chỉ tiếng Việt” tự ẩn phần Anh. */
function topicChip(name,cls){const b=el('button',cls||'chip'),l=el('span','cl');l.append(el('span','vi',name));if(TEN[name])l.append(el('span','en',TEN[name]));b.append(l);return b}
const topicTxt=n=>TEN[n]?n+' · '+TEN[n]:n;
const known=store.get('vn-known',{});
(()=>{let c=false;Object.keys(known).forEach(k=>{const n=k.replace(/^Buổi \d+ · /,'');if(n!==k){known[n]=known[k];delete known[k];c=true}});if(c)store.set('vn-known',known)})();
/* Sổ từ của em: các từ lưu ở trang Tra từ điển (khóa 'vn-nb') thành một chủ đề học riêng (thẻ ghi nhớ, bài học, ôn tập, luyện nói).
   Từ trong chủ đề này (cờ m:1) KHÔNG tính vào các tỷ lệ tiến độ của lộ trình. syncMine() chạy lại mỗi khi sổ từ đổi. */
const MINE='Sổ từ của em',ALL=[];
function syncMine(){let i=LS.findIndex(l=>l[0]===MINE);if(i>=0)LS.splice(i,1);const g=GR.findIndex(x=>x[2]==='mine');if(g>=0)GR.splice(g,1);
const seen=new Set(),items=[];store.get('vn-nb',[]).forEach(x=>{if(!x||!x.v)return;const k=String(x.v).toLowerCase();if(seen.has(k))return;seen.add(k);
items.push(String(x.v).replace(/[;=]/g,' ').trim()+'='+(String(x.e||'—').replace(/[;=]/g,',').trim()||'—'))});
if(items.length){LS.push([MINE,items]);GR.push(['Của em · Mine',[LS.length-1],'mine'])}
ALL.length=0;LS.forEach(l=>l[1].forEach(w=>{const [v,e]=w.split('=');const o={v,e,k:l[0]+'|'+v};if(l[0]===MINE)o.m=1;ALL.push(o)}))}
syncMine();
const nWords=()=>ALL.filter(w=>!w.m).length,nTopics=()=>LS.filter(l=>l[0]!==MINE).length;
const nKnown=()=>ALL.filter(w=>!w.m&&known[w.k]).length;
function refreshSide(){$('#sk').textContent=streak();$('#sb').style.width=nKnown()/nWords()*100+'%';$('#st').textContent=nKnown()+'/'+nWords()+' từ đã nhớ · words known'}
