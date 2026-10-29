/* Câu cần thiết theo tình huống. Mỗi dòng có ba cột ngăn bằng dấu gạch đứng: câu tiếng Anh, câu tiếng Việt, ghi chú (có thể bỏ trống)
   Thêm câu: viết thêm một dòng đúng định dạng. File nghe (mp3) do tools/make_audio.py tạo từ cột tiếng Việt. */
const PB=[];
function C(id,vi,en,ic,rows){PB.push({id,vi,en,ic,p:rows.trim().split('\n').map(l=>{const [e,v,n]=l.split('|');return {e,v,n:n||'',c:id}})})}

C('co-ban','Giao tiếp cơ bản','Essentials','👋',`
Hello.|Xin chào.
Goodbye.|Tạm biệt.
Thank you.|Cảm ơn.
Thank you very much.|Cảm ơn nhiều.
You're welcome. / No problem.|Không có gì.
Yes.|Vâng.|Miền Nam hay nói “Dạ”. · In the South people often say “Dạ”.
No.|Không.
Excuse me. (to get attention)|Xin lỗi.|Cũng dùng để xin lỗi. · Also used to apologise.
I'm sorry.|Tôi xin lỗi.
Please. (asking for a favour)|Làm ơn.
I don't understand.|Tôi không hiểu.
Do you speak English?|Bạn có nói được tiếng Anh không?
Please speak slowly.|Bạn nói chậm một chút được không?
Can you repeat that?|Bạn nhắc lại được không?
What does this mean?|Cái này nghĩa là gì?
How do you say this in Vietnamese?|Cái này tiếng Việt nói thế nào?
I speak a little Vietnamese.|Tôi nói được một chút tiếng Việt.
Can you write it down?|Bạn viết ra giúp tôi được không?
`);

C('lam-quen','Làm quen & trò chuyện','Small talk','💬',`
My name is Lisa.|Tôi tên là Lisa.|Thay Lisa bằng tên của bạn. · Replace Lisa with your own name.
Nice to meet you.|Rất vui được gặp bạn.
How are you?|Bạn có khỏe không?
I'm fine, thanks.|Tôi khỏe, cảm ơn.
Where are you from?|Bạn đến từ đâu?
I'm from Australia.|Tôi đến từ nước Úc.|Thay bằng nước của bạn. · Replace with your own country.
I'm a tourist.|Tôi là khách du lịch.
I'm a student.|Tôi là sinh viên.
I'm learning Vietnamese.|Tôi đang học tiếng Việt.
Vietnam is beautiful!|Việt Nam đẹp quá!
I like Vietnamese food.|Tôi thích đồ ăn Việt Nam.
Can I take a photo?|Tôi chụp ảnh được không?
Could you take a photo of us?|Bạn chụp giúp chúng tôi một tấm ảnh được không?
Cheers!|Một, hai, ba, dô!|Câu nâng ly quen thuộc. · A familiar toast.
Good morning.|Chào buổi sáng.
Good night.|Chúc ngủ ngon.
See you again.|Hẹn gặp lại.
Have a nice day.|Chúc bạn một ngày tốt lành.
`);

C('hoi-duong','Hỏi đường','Directions','🧭',`
Where is the toilet?|Nhà vệ sinh ở đâu?
Where is the bus station?|Bến xe buýt ở đâu?
Where is the train station?|Ga tàu ở đâu?
Where is the airport?|Sân bay ở đâu?
Where is the nearest ATM?|Cây ATM gần nhất ở đâu?
How do I get to this place?|Đến chỗ này đi thế nào?|Đưa bản đồ hoặc địa chỉ cho họ xem. · Show them a map or an address.
Is it far?|Có xa không?
How many minutes on foot?|Đi bộ mất bao nhiêu phút?
Go straight.|Đi thẳng.
Turn left.|Rẽ trái.
Turn right.|Rẽ phải.
It's next to the supermarket.|Nó ở bên cạnh siêu thị.
Can you show me on the map?|Bạn chỉ giúp tôi trên bản đồ được không?
I'm lost.|Tôi bị lạc đường.
`);

C('goi-mon','Gọi món & ăn uống','Eating out','🍜',`
A table for two, please.|Cho tôi một bàn hai người.
Can I see the menu?|Cho tôi xem thực đơn.
What do you recommend?|Bạn gợi ý món nào?
I'd like this one. (pointing)|Cho tôi món này.
One bowl of beef noodle soup, please.|Cho tôi một tô phở bò.
An iced tea, please.|Cho tôi một ly trà đá.
An iced milk coffee, please.|Cho tôi một ly cà phê sữa đá.
A bottle of water, please.|Cho tôi một chai nước.
Is this dish spicy?|Món này có cay không?
Not spicy, please.|Không cay nhé.
No ice, please.|Không đá nhé.
I'm vegetarian.|Tôi ăn chay.
I'm allergic to peanuts.|Tôi bị dị ứng đậu phộng.|Miền Bắc gọi là “lạc”. · In the North it is called “lạc”.
No MSG, please.|Không cho bột ngọt.
A pair of chopsticks, please.|Cho tôi một đôi đũa.
More water, please.|Cho tôi thêm nước.
Takeaway, please.|Cho tôi mang về.
Delicious!|Ngon quá!
The bill, please.|Tính tiền giúp tôi.
Can I pay by card?|Tôi trả bằng thẻ được không?
`);

C('mua-sam','Mua sắm & tiền bạc','Shopping & money','🛍️',`
How much is this?|Cái này bao nhiêu tiền?
Please write down the price.|Bạn viết giá ra giúp tôi được không?
That's too expensive!|Đắt quá!
Can you lower the price a little?|Bớt một chút được không?
Do you have a cheaper one?|Có cái nào rẻ hơn không?
Do you have a bigger size?|Có cỡ lớn hơn không?
Do you have a smaller size?|Có cỡ nhỏ hơn không?
Can I try it on?|Tôi thử được không?
I'll take it.|Tôi lấy cái này.
I'm just looking.|Tôi chỉ xem thôi.
Do you accept cards?|Bạn có nhận thẻ không?
Can I have a receipt?|Cho tôi xin hóa đơn.
I'd like to change money.|Tôi muốn đổi tiền.
What's the exchange rate today?|Tỷ giá hôm nay là bao nhiêu?
The ATM kept my card.|Máy ATM nuốt thẻ của tôi.
`);

C('di-chuyen','Taxi & di chuyển','Getting around','🚕',`
Please take me to this address.|Cho tôi đến địa chỉ này.
Please take me to the airport.|Cho tôi đến sân bay.
Please turn on the meter.|Làm ơn bật đồng hồ tính tiền.
How much to the city centre?|Đi đến trung tâm giá bao nhiêu?
How long does it take?|Đi mất bao lâu?
Please drive slowly.|Làm ơn đi chậm một chút.
I'm in a hurry.|Tôi đang vội.
Stop here, please.|Làm ơn dừng ở đây.
Please wait for me here.|Làm ơn đợi tôi ở đây.
I booked a ride on the app.|Tôi đã đặt xe trên ứng dụng.
Does this bus go to the city centre?|Xe buýt này có đến trung tâm không?
Where do I buy a ticket?|Mua vé ở đâu?
One ticket to Hue, please.|Cho tôi một vé đi Huế.|Thay Huế bằng nơi bạn muốn đến. · Replace Huế with where you want to go.
What time does the train leave?|Mấy giờ tàu chạy?
Where can I rent a motorbike?|Thuê xe máy ở đâu?
How much per day?|Thuê một ngày bao nhiêu tiền?
Does it come with a helmet?|Có mũ bảo hiểm không?
Where is the nearest petrol station?|Trạm xăng gần nhất ở đâu?
`);

C('khach-san','Khách sạn','Hotel','🏨',`
I have a reservation.|Tôi đã đặt phòng.
Do you have any rooms available?|Còn phòng trống không?
A single room, please.|Cho tôi một phòng đơn.
A double room, please.|Cho tôi một phòng đôi.
How much is it per night?|Một đêm bao nhiêu tiền?
Is breakfast included?|Có gồm bữa sáng không?
What's the wifi password?|Mật khẩu wifi là gì?
What time is check-out?|Mấy giờ phải trả phòng?
Can I leave my luggage here?|Tôi gửi hành lý ở đây được không?
The air conditioner doesn't work.|Máy lạnh không chạy.|Miền Bắc nói “điều hòa”. · In the North people say “điều hòa”.
There's no hot water.|Không có nước nóng.
Could you clean my room, please?|Làm ơn dọn phòng giúp tôi.
Could I have extra towels?|Cho tôi thêm khăn tắm.
I lost my key.|Tôi làm mất chìa khóa.
Could you call a taxi for me?|Bạn gọi giúp tôi một chiếc taxi được không?
`);

C('suc-khoe','Khám bệnh & hiệu thuốc','Health','🏥',`
I don't feel well.|Tôi thấy không khỏe.
I need a doctor.|Tôi cần gặp bác sĩ.
Where is the nearest hospital?|Bệnh viện gần nhất ở đâu?
Where is the pharmacy?|Nhà thuốc ở đâu?
It hurts here.|Tôi đau ở đây.
I have a headache.|Tôi bị đau đầu.
I have a stomachache.|Tôi bị đau bụng.
I have a fever.|Tôi bị sốt.
I have a cough.|Tôi bị ho.
I feel dizzy.|Tôi bị chóng mặt.
I feel sick. (nauseous)|Tôi buồn nôn.
I have diarrhoea.|Tôi bị tiêu chảy.
I'm allergic to antibiotics.|Tôi bị dị ứng với thuốc kháng sinh.
I'm pregnant.|Tôi đang mang thai.
I need some cold medicine.|Cho tôi thuốc cảm.
I need a painkiller.|Cho tôi thuốc giảm đau.
How many times a day should I take it?|Một ngày uống mấy lần?
I have travel insurance.|Tôi có bảo hiểm du lịch.
`);

C('khan-cap','Khẩn cấp','Emergency','🚨',`
Help!|Cứu tôi với!
I need help.|Tôi cần giúp đỡ.
Call the police!|Gọi công an!|Số điện thoại công an: 113. · Police phone number: 113.
Call an ambulance!|Gọi xe cấp cứu!|Số cấp cứu: 115. · Emergency (ambulance): 115.
Fire!|Cháy!|Số cứu hỏa: 114. · Fire brigade: 114.
I've had an accident.|Tôi bị tai nạn.
Someone stole my phone.|Tôi bị mất cắp điện thoại.
I lost my passport.|Tôi làm mất hộ chiếu.
Where is the police station?|Đồn công an ở đâu?
Please call my embassy.|Làm ơn gọi đại sứ quán của tôi.
Is there anyone who speaks English?|Ở đây có ai nói được tiếng Anh không?
Leave me alone.|Đừng làm phiền tôi.
`);

C('tham-quan','Tham quan','Sightseeing','🏛️',`
How much is the entrance ticket?|Vé vào cửa bao nhiêu tiền?
Is there a student discount?|Có giảm giá cho sinh viên không?
What time does it open?|Mấy giờ mở cửa?
What time does it close?|Mấy giờ đóng cửa?
Can I take photos here?|Ở đây chụp ảnh được không?
Is there an English-speaking guide?|Có hướng dẫn viên nói tiếng Anh không?
Is this the way to the temple?|Đường này có đến chùa không?
It's so beautiful!|Đẹp quá!
I'll come back tomorrow.|Ngày mai tôi sẽ quay lại.
`);

C('dien-thoai','Điện thoại & mạng','Phone & internet','📱',`
Is there wifi here?|Ở đây có wifi không?
Can I charge my phone here?|Tôi sạc điện thoại ở đây được không?
My phone is out of battery.|Điện thoại của tôi hết pin.
Where can I buy a SIM card?|Tôi mua thẻ SIM ở đâu?
I'd like a data plan.|Tôi muốn mua gói dữ liệu.
Can you call this number for me?|Bạn gọi số này giúp tôi được không?
Can we connect on Zalo?|Bạn kết bạn Zalo với tôi nhé.
`);
