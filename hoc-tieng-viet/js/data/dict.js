/* Từ điển Việt–Anh ngoại tuyến (từ thông dụng A0–A2). Mỗi dòng: từ|loại|nghĩa tiếng Anh
   Loại: n danh từ · v động từ · adj tính từ · adv phó từ · pron đại từ · prep giới từ · conj liên từ · cl loại từ · part trợ từ · num số · int thán từ
   Thêm từ: viết thêm một dòng đúng định dạng. Từ trùng với vocab.js vẫn được gộp. */
const DICT=[];
`tôi|pron|I, me
tao|pron|I, me (very informal, to close friends)
mình|pron|I / we (friendly); oneself
chúng tôi|pron|we (excluding the listener)
chúng ta|pron|we (including the listener)
họ|pron|they, them; surname Ho
anh ấy|pron|he, him
chị ấy|pron|she, her (older)
cô ấy|pron|she, her (young woman)
ông ấy|pron|he (elderly, respectful)
bà ấy|pron|she (elderly, respectful)
nó|pron|it; he/she (child or informal)
các bạn|pron|you (plural, peers)
ai|pron|who; anyone
gì|pron|what; anything
nào|pron|which
đâu|pron|where; anywhere
sao|pron|why, how; star (n)
tại sao|adv|why
như thế nào|adv|how, in what way
bao giờ|adv|when (future/past)
khi nào|adv|when
mấy giờ|adv|what time
bao lâu|adv|how long
bao xa|adv|how far
thế nào|adv|how
này|adj|this
đó|adj|that
kia|adj|that over there
đây|pron|here; this one
ấy|adj|that (already mentioned)
ở đây|adv|here
ở đó|adv|there
bên trong|prep|inside
bên ngoài|prep|outside
trên|prep|on, above
dưới|prep|under, below
trước|prep|before, in front of
sau|prep|after, behind
giữa|prep|between, in the middle of
trong|prep|in, inside
ngoài|prep|outside
cạnh|prep|beside
từ|prep|from
đến|prep|to, until; to arrive
tới|prep|to, towards; to arrive
cho|prep|for; to give
với|prep|with; and
bằng|prep|by means of, with; equal
về|prep|about; to return
theo|prep|according to; to follow
vì|conj|because
nên|conj|so, therefore; should
nhưng|conj|but
và|conj|and
hoặc|conj|or
hay|conj|or; often
nếu|conj|if
thì|conj|then, as for
khi|conj|when
trong khi|conj|while
rồi|adv|already; then
đã|adv|already (past marker)
đang|adv|currently (progressive marker)
sẽ|adv|will (future marker)
vừa|adv|just now; moderately
mới|adv|just, recently; only then; new (adj)
cũng|adv|also, too
còn|adv|still; also; to remain
vẫn|adv|still
chỉ|adv|only; to point
lại|adv|again; back
luôn|adv|always; immediately
thường|adv|usually, often
hay|adv|often
đôi khi|adv|sometimes
thỉnh thoảng|adv|occasionally
ít khi|adv|rarely
không bao giờ|adv|never
rất|adv|very
quá|adv|too, very
lắm|adv|very much
hơi|adv|a bit, slightly
khá|adv|fairly, quite
nhất|adv|most, -est
hơn|adv|more, -er
cùng|adv|together; same
với nhau|adv|together, with each other
cả|adv|all, both, even
mọi|adj|every
mỗi|adj|each
những|cl|plural marker (the, some)
các|cl|plural marker (all the)
một vài|adj|a few
nhiều|adj|many, much
ít|adj|few, little
vài|adj|a few
tất cả|pron|all, everything
không|part|no, not; question particle
chưa|adv|not yet
chẳng|adv|not at all
đừng|adv|don't (imperative)
phải|v|must, have to; right
cần|v|to need
nên|v|should
muốn|v|to want
thích|v|to like
yêu|v|to love
ghét|v|to hate
biết|v|to know
hiểu|v|to understand
nhớ|v|to remember; to miss
quên|v|to forget
nghĩ|v|to think
tin|v|to believe; news (n)
hy vọng|v|to hope
lo lắng|v|to worry
sợ|v|to be afraid
đi|v|to go
đến|v|to arrive, to come to
về|v|to return, go back
ra|v|to go out
vào|v|to enter
lên|v|to go up
xuống|v|to go down
qua|v|to cross, to pass
chạy|v|to run
bước|v|to step
đứng|v|to stand
ngồi|v|to sit
nằm|v|to lie down
ngủ|v|to sleep
thức dậy|v|to wake up
dậy|v|to get up
ăn|v|to eat
uống|v|to drink
nấu|v|to cook
rửa|v|to wash
tắm|v|to bathe, take a shower
mặc|v|to wear (clothes)
đội|v|to wear (hat)
đeo|v|to wear (glasses, jewelry)
thay|v|to change, replace
mở|v|to open; to turn on
đóng|v|to close; to pay (fees)
bật|v|to turn on
tắt|v|to turn off
cầm|v|to hold
lấy|v|to take
đưa|v|to give, hand over; to take someone
để|v|to put, to leave; in order to
đặt|v|to put; to order, to book
mang|v|to carry, bring
gửi|v|to send
nhận|v|to receive
mua|v|to buy
bán|v|to sell
trả|v|to pay; to return
trả tiền|v|to pay money
tìm|v|to look for
thấy|v|to see, to feel
nhìn|v|to look at
xem|v|to watch; to look at
nghe|v|to listen, to hear
nói|v|to speak, to say
kể|v|to tell (a story)
hỏi|v|to ask
trả lời|v|to answer
gọi|v|to call; to order
đọc|v|to read
viết|v|to write
vẽ|v|to draw, to paint
học|v|to study, to learn
dạy|v|to teach
luyện tập|v|to practise
làm|v|to do, to make; to work
làm việc|v|to work
nghỉ|v|to rest; to take a break
chơi|v|to play; to hang out
hát|v|to sing
nhảy|v|to jump; to dance
cười|v|to laugh, to smile
khóc|v|to cry
giúp|v|to help
giúp đỡ|v|to help, assist
cảm thấy|v|to feel
cảm ơn|v|to thank
chúc|v|to wish
mời|v|to invite; please (offering)
gặp|v|to meet
hẹn|v|to make an appointment
chờ|v|to wait
đợi|v|to wait
bắt đầu|v|to begin
kết thúc|v|to finish, end
xong|v|to be done
thử|v|to try
dùng|v|to use
sử dụng|v|to use
cần thiết|adj|necessary
ở|v|to live, to stay; at, in
sống|v|to live; raw
có|v|to have; there is
là|v|to be
trở thành|v|to become
thành|v|to become
được|v|to get, be able to; passive marker
bị|v|to suffer, to get (something bad)
cho phép|v|to allow
cấm|v|to forbid
đi bộ|v|to walk
đi chơi|v|to go out, to hang out
đi làm|v|to go to work
đi học|v|to go to school
đi ngủ|v|to go to bed
đi chợ|v|to go to the market
lái xe|v|to drive
đạp xe|v|to cycle
bơi|v|to swim
leo núi|v|to climb a mountain
tập thể dục|v|to exercise
chụp ảnh|v|to take photos
gọi điện|v|to make a phone call
nhắn tin|v|to text
đăng ký|v|to register
thanh toán|v|to pay, to settle
đổi|v|to exchange, to change
sửa|v|to repair, to fix
dọn dẹp|v|to clean up, tidy
quét nhà|v|to sweep the house
giặt|v|to wash (clothes)
là quần áo|v|to iron clothes
tưới|v|to water (plants)
trồng|v|to plant, to grow
nuôi|v|to raise, to feed (animals)
tốt|adj|good
xấu|adj|bad; ugly
đẹp|adj|beautiful, nice
dễ|adj|easy
khó|adj|difficult
nhanh|adj|fast
chậm|adj|slow
lớn|adj|big; grown-up
to|adj|big, large; loud
nhỏ|adj|small
bé|adj|small, tiny; little child
cao|adj|tall, high
thấp|adj|short, low
dài|adj|long
ngắn|adj|short
rộng|adj|wide, spacious
hẹp|adj|narrow
nặng|adj|heavy
nhẹ|adj|light
mới|adj|new
cũ|adj|old (things)
già|adj|old (people)
trẻ|adj|young
nóng|adj|hot
lạnh|adj|cold
ấm|adj|warm
mát|adj|cool
khô|adj|dry
ướt|adj|wet
sạch|adj|clean
bẩn|adj|dirty
đầy|adj|full
trống|adj|empty
đúng|adj|correct, right
sai|adj|wrong
thật|adj|real, true
giả|adj|fake
vui|adj|happy, fun
buồn|adj|sad
mệt|adj|tired
đói|adj|hungry
khát|adj|thirsty
no|adj|full (after eating)
buồn ngủ|adj|sleepy
bận|adj|busy
rảnh|adj|free (time)
khỏe|adj|healthy, well
ốm|adj|sick; thin
đau|adj|painful, hurting
bình thường|adj|normal, ordinary
đặc biệt|adj|special
quan trọng|adj|important
thú vị|adj|interesting
chán|adj|boring; bored
lạ|adj|strange, unfamiliar
quen|adj|familiar; to be used to
giỏi|adj|good at, skilled
dở|adj|bad at, poor
thông minh|adj|smart
chăm chỉ|adj|hard-working
lười|adj|lazy
vui vẻ|adj|cheerful
tức giận|adj|angry
ngạc nhiên|adj|surprised
xấu hổ|adj|embarrassed, shy
lịch sự|adj|polite
thân thiện|adj|friendly
tốt bụng|adj|kind-hearted
hiền|adj|gentle
dữ|adj|fierce
giàu|adj|rich
nghèo|adj|poor
rẻ|adj|cheap
đắt|adj|expensive
an toàn|adj|safe
nguy hiểm|adj|dangerous
yên tĩnh|adj|quiet, peaceful
ồn ào|adj|noisy
đông|adj|crowded
vắng|adj|deserted, empty
tiện lợi|adj|convenient
ngon|adj|delicious
dở|adj|bad-tasting
cay|adj|spicy
ngọt|adj|sweet
mặn|adj|salty
chua|adj|sour
đắng|adj|bitter
nhạt|adj|bland
béo|adj|fatty; fat
gầy|adj|thin
đỏ|adj|red
vàng|adj|yellow; gold
xanh|adj|blue or green
xanh lá cây|adj|green
xanh dương|adj|blue
trắng|adj|white
đen|adj|black
nâu|adj|brown
hồng|adj|pink
tím|adj|purple
cam|adj|orange (colour); orange (n)
xám|adj|grey
màu|n|colour
người|n|person, people
đàn ông|n|man
đàn bà|n|woman
phụ nữ|n|woman, women
con trai|n|boy; son
con gái|n|girl; daughter
em bé|n|baby
trẻ em|n|children
bạn bè|n|friends
bạn trai|n|boyfriend
bạn gái|n|girlfriend
chồng|n|husband
vợ|n|wife
con|n|child; (classifier for animals)
cha|n|father
bố|n|father, dad
ba|n|father, dad (South); three
mẹ|n|mother
má|n|mother (South)
anh trai|n|older brother
chị gái|n|older sister
em trai|n|younger brother
em gái|n|younger sister
anh em|n|brothers and sisters, siblings
ông nội|n|paternal grandfather
bà nội|n|paternal grandmother
ông ngoại|n|maternal grandfather
bà ngoại|n|maternal grandmother
cháu|n|grandchild; niece/nephew
cô|n|aunt (father's sister); Miss; female teacher
dì|n|aunt (mother's sister)
chú|n|uncle (father's younger brother)
bác|n|uncle/aunt (parent's elder sibling)
cậu|n|uncle (mother's brother); you (to a boy)
hàng xóm|n|neighbour
khách|n|guest, customer
khách hàng|n|customer
người lạ|n|stranger
người nước ngoài|n|foreigner
người Việt|n|Vietnamese person
người bạn|n|a friend
đồng nghiệp|n|colleague
sếp|n|boss
bác sĩ|n|doctor
y tá|n|nurse
giáo viên|n|teacher
học sinh|n|pupil, school student
sinh viên|n|university student
nhân viên|n|employee, staff
công nhân|n|worker
nông dân|n|farmer
đầu bếp|n|chef
phục vụ|n|waiter; to serve
tài xế|n|driver
cảnh sát|n|police officer
ca sĩ|n|singer
nghệ sĩ|n|artist
nhà báo|n|journalist
luật sư|n|lawyer
kỹ sư|n|engineer
lập trình viên|n|programmer
thợ|n|craftsman, tradesperson
thợ cắt tóc|n|barber, hairdresser
bán hàng|n|salesperson; to sell
chủ|n|owner
nhà|n|house, home
căn hộ|n|apartment
phòng|n|room
cửa|n|door
cửa sổ|n|window
tường|n|wall
sàn nhà|n|floor
mái nhà|n|roof
cầu thang|n|stairs
sân|n|yard
vườn|n|garden
tủ lạnh|n|refrigerator
tủ|n|cupboard, cabinet
bếp|n|kitchen, stove
nồi|n|pot
chảo|n|frying pan
dao|n|knife
dĩa|n|fork; plate (South)
nĩa|n|fork
thìa|n|spoon
muỗng|n|spoon (South)
đũa|n|chopsticks
bát|n|bowl
chén|n|small cup, bowl (South)
đĩa|n|plate
cốc|n|glass, cup
ly|n|glass (South)
chai|n|bottle
bình|n|vase; flask
khăn|n|towel, scarf
xà phòng|n|soap
bàn chải|n|brush
kem đánh răng|n|toothpaste
gương|n|mirror
đèn|n|lamp, light
quạt|n|fan
máy lạnh|n|air conditioner
điều hòa|n|air conditioner
tivi|n|television
điện thoại|n|telephone
điện thoại di động|n|mobile phone
máy tính|n|computer
máy tính xách tay|n|laptop
máy ảnh|n|camera
sạc|n|charger
mạng|n|network; internet
wifi|n|wifi
mật khẩu|n|password
email|n|email
tin nhắn|n|message
ảnh|n|photo
sách|n|book
vở|n|notebook
bút|n|pen
bút chì|n|pencil
giấy|n|paper
báo|n|newspaper
tạp chí|n|magazine
bản đồ|n|map
vé|n|ticket
hộ chiếu|n|passport
chìa khóa|n|key
túi|n|bag, pocket
ba lô|n|backpack
vali|n|suitcase
ví|n|wallet
tiền|n|money
tiền mặt|n|cash
thẻ|n|card
thẻ tín dụng|n|credit card
ngân hàng|n|bank
giá|n|price
hóa đơn|n|bill, invoice
thuế|n|tax
quà|n|gift
hoa|n|flower
cây|n|tree, plant
lá|n|leaf
cỏ|n|grass
núi|n|mountain
sông|n|river
biển|n|sea
hồ|n|lake
bãi biển|n|beach
đảo|n|island
rừng|n|forest
đất|n|soil, land
đá|n|stone; ice
cát|n|sand
nước|n|water; country
lửa|n|fire
không khí|n|air
mặt trời|n|sun
mặt trăng|n|moon
ngôi sao|n|star
mây|n|cloud
bầu trời|n|sky
bão|n|storm, typhoon
sấm|n|thunder
tuyết|n|snow
sương mù|n|fog
chó|n|dog
mèo|n|cat
chim|n|bird
cá|n|fish
gà|n|chicken
vịt|n|duck
heo|n|pig (South)
lợn|n|pig (North)
bò|n|cow, beef
trâu|n|water buffalo
ngựa|n|horse
dê|n|goat
thỏ|n|rabbit
chuột|n|mouse, rat
rắn|n|snake
voi|n|elephant
hổ|n|tiger
khỉ|n|monkey
côn trùng|n|insect
muỗi|n|mosquito
kiến|n|ant
bướm|n|butterfly
cơm|n|cooked rice
gạo|n|uncooked rice
bún|n|rice vermicelli
mì|n|noodles
phở|n|pho noodle soup
bánh|n|cake, pastry, bread
bánh mì|n|bread; Vietnamese sandwich
bánh cuốn|n|steamed rice rolls
bánh xèo|n|Vietnamese savory pancake
nem|n|spring roll (North)
chả giò|n|fried spring roll (South)
gỏi cuốn|n|fresh spring roll
thịt|n|meat
thịt bò|n|beef
thịt heo|n|pork (South)
thịt lợn|n|pork (North)
thịt gà|n|chicken meat
cá|n|fish (food)
tôm|n|shrimp
cua|n|crab
mực|n|squid; ink
trứng|n|egg
rau|n|vegetables
rau muống|n|water spinach
cà chua|n|tomato
cà rốt|n|carrot
khoai tây|n|potato
hành|n|onion, scallion
tỏi|n|garlic
ớt|n|chili
gừng|n|ginger
đậu hũ|n|tofu
đậu phụ|n|tofu (North)
nấm|n|mushroom
trái cây|n|fruit (South)
hoa quả|n|fruit (North)
chuối|n|banana
cam|n|orange
táo|n|apple
xoài|n|mango
dưa hấu|n|watermelon
dứa|n|pineapple
thơm|adj|fragrant; pineapple (South)
nho|n|grape
dừa|n|coconut
sầu riêng|n|durian
đu đủ|n|papaya
chanh|n|lemon, lime
bơ|n|butter; avocado
đường|n|sugar; road
muối|n|salt
tiêu|n|pepper
nước mắm|n|fish sauce
nước tương|n|soy sauce
dầu|n|oil
sữa|n|milk
sữa chua|n|yoghurt
phô mai|n|cheese
kem|n|ice cream, cream
kẹo|n|candy
sô cô la|n|chocolate
bia|n|beer
rượu|n|alcohol, wine
nước ngọt|n|soft drink
nước suối|n|bottled water
nước đá|n|ice
cà phê sữa|n|coffee with milk
cà phê đen|n|black coffee
sinh tố|n|smoothie
nước ép|n|juice
bữa sáng|n|breakfast
bữa trưa|n|lunch
bữa tối|n|dinner
ăn sáng|v|to have breakfast
ăn trưa|v|to have lunch
ăn tối|v|to have dinner
món ăn|n|dish
thực đơn|n|menu
nhà hàng|n|restaurant
quán ăn|n|eatery
quán cà phê|n|café
quán|n|small shop, stall
tính tiền|v|to ask for the bill
đầu|n|head
tóc|n|hair
mặt|n|face
mắt|n|eye
mũi|n|nose
miệng|n|mouth
răng|n|tooth
lưỡi|n|tongue
tai|n|ear
cổ|n|neck
vai|n|shoulder
tay|n|hand, arm
ngón tay|n|finger
ngực|n|chest
lưng|n|back
bụng|n|stomach, belly
chân|n|foot, leg
đầu gối|n|knee
da|n|skin
tim|n|heart
máu|n|blood
xương|n|bone
sức khỏe|n|health
bệnh|n|illness
bệnh viện|n|hospital
hiệu thuốc|n|pharmacy
thuốc|n|medicine
sốt|n|fever
ho|n|cough
cảm cúm|n|flu
cảm lạnh|n|cold
đau đầu|n|headache
đau bụng|n|stomachache
đau răng|n|toothache
dị ứng|n|allergy
vết thương|n|wound
khám bệnh|v|to see a doctor
uống thuốc|v|to take medicine
quần áo|n|clothes
áo|n|shirt, top
áo khoác|n|jacket
áo dài|n|ao dai (traditional dress)
quần|n|trousers
quần short|n|shorts
váy|n|skirt, dress
giày|n|shoes
dép|n|sandals, flip-flops
tất|n|socks
vớ|n|socks (South)
mũ|n|hat
nón|n|hat (South); conical hat
kính|n|glasses; glass
đồng hồ|n|clock, watch
nhẫn|n|ring
dây chuyền|n|necklace
thành phố|n|city
tỉnh|n|province
quê|n|hometown, countryside
làng|n|village
nông thôn|n|countryside
thủ đô|n|capital city
quốc gia|n|nation
nước ngoài|n|abroad
đường phố|n|street
ngõ|n|alley (North)
hẻm|n|alley (South)
số nhà|n|house number
địa chỉ|n|address
ngã tư|n|intersection
đèn đỏ|n|red light
vỉa hè|n|pavement
cầu|n|bridge
công viên|n|park
quảng trường|n|square
chợ|n|market
siêu thị|n|supermarket
cửa hàng|n|shop
tiệm|n|shop (South)
trung tâm thương mại|n|shopping mall
bưu điện|n|post office
đồn công an|n|police station
trường học|n|school
trường|n|school
đại học|n|university
thư viện|n|library
bảo tàng|n|museum
nhà hát|n|theatre
rạp chiếu phim|n|cinema
chùa|n|pagoda, temple
nhà thờ|n|church
khách sạn|n|hotel
nhà nghỉ|n|guesthouse
nhà trọ|n|rental room, hostel
sân bay|n|airport
ga|n|station
bến xe|n|bus station
bến|n|terminal, dock
công ty|n|company
văn phòng|n|office
nhà máy|n|factory
chuyến|cl|trip, flight (classifier)
chuyến bay|n|flight
chuyến đi|n|trip
xe|n|vehicle
xe máy|n|motorbike
xe đạp|n|bicycle
xe hơi|n|car (South)
ô tô|n|car
xe buýt|n|bus
xe tải|n|truck
tàu|n|ship, train
tàu hỏa|n|train
máy bay|n|aeroplane
thuyền|n|boat
xe ôm|n|motorbike taxi
vé khứ hồi|n|return ticket
một chiều|adj|one-way
hành lý|n|luggage
visa|n|visa
du lịch|n|travel, tourism
khách du lịch|n|tourist
hướng dẫn viên|n|tour guide
phong cảnh|n|scenery
kỳ nghỉ|n|holiday, vacation
ngày|n|day
đêm|n|night
tuần|n|week
tháng|n|month
năm|n|year; five
hôm nay|n|today
hôm qua|n|yesterday
ngày mai|n|tomorrow
ngày kia|n|the day after tomorrow
sáng nay|n|this morning
tối nay|n|tonight
tuần này|n|this week
tuần sau|n|next week
tuần trước|n|last week
tháng này|n|this month
năm ngoái|n|last year
năm sau|n|next year
mùa xuân|n|spring
mùa hè|n|summer
mùa thu|n|autumn
mùa đông|n|winter
mùa mưa|n|rainy season
mùa khô|n|dry season
lúc|n|moment, at (time)
hồi|n|time, period
giây|n|second
phút|n|minute
giờ|n|hour
tiếng|n|hour; sound; language
lịch|n|calendar
ngày lễ|n|public holiday
Tết|n|Vietnamese New Year
sinh nhật|n|birthday
đám cưới|n|wedding
bữa tiệc|n|party
lễ hội|n|festival
trường|n|school
lớp|n|class
bài|n|lesson, text
bài tập|n|exercise, homework
câu hỏi|n|question
câu trả lời|n|answer
từ vựng|n|vocabulary
ngữ pháp|n|grammar
phát âm|n|pronunciation
chữ|n|letter, character, script
câu|n|sentence
tiếng Việt|n|Vietnamese language
tiếng Anh|n|English language
thi|v|to take an exam
kỳ thi|n|exam
điểm|n|point, score; grade
ý kiến|n|opinion
vấn đề|n|problem, issue
công việc|n|job, work
việc|n|matter, work
lương|n|salary
họp|v|to have a meeting
cuộc họp|n|meeting
hợp đồng|n|contract
dự án|n|project
kinh nghiệm|n|experience
cơ hội|n|opportunity
ước mơ|n|dream, ambition
mơ|v|to dream
tình yêu|n|love
tình bạn|n|friendship
hạnh phúc|adj|happy; happiness
hy vọng|n|hope
niềm vui|n|joy
tương lai|n|future
quá khứ|n|past
hiện tại|n|present
lịch sử|n|history
văn hóa|n|culture
truyền thống|n|tradition
âm nhạc|n|music
bài hát|n|song
phim|n|film
trò chơi|n|game
bóng đá|n|football
bơi lội|n|swimming
thể thao|n|sport
tin tức|n|news
thời tiết|n|weather
nhiệt độ|n|temperature
độ|cl|degree
mưa|v|to rain
nắng|adj|sunny
gió|n|wind
môi trường|n|environment
động vật|n|animal
thực vật|n|plant
thiên nhiên|n|nature
cái|cl|classifier for objects, things
chiếc|cl|classifier for vehicles, single items
con|cl|classifier for animals
quyển|cl|classifier for books
cuốn|cl|classifier for books
tờ|cl|classifier for sheets, papers
cây|cl|classifier for long objects, trees
quả|cl|classifier for fruit, round things
trái|cl|classifier for fruit (South); left
bức|cl|classifier for pictures, letters
tấm|cl|classifier for flat things
bộ|cl|classifier for sets, outfits
đôi|cl|pair
ly|cl|glass of
chén|cl|bowl of (South)
bát|cl|bowl of
đĩa|cl|plate of
chai|cl|bottle of
hộp|cl|box of
gói|cl|packet of
kg|n|kilogram
ký|n|kilogram (colloquial)
lít|n|litre
mét|n|metre
cây số|n|kilometre
ki-lô-mét|n|kilometre
phần trăm|n|percent
nửa|num|half
một nửa|num|one half
đầu tiên|adj|first
thứ nhất|adj|first
thứ hai|adj|second; Monday
cuối cùng|adj|last, final
mười một|num|11
mười hai|num|12
hai mươi mốt|num|21
ba mươi|num|30
bốn mươi|num|40
năm mươi|num|50
một trăm|num|100
một nghìn|num|1,000
một triệu|num|1,000,000
nghìn|num|thousand
ngàn|num|thousand (South)
triệu|num|million
tỷ|num|billion
xin chào|int|hello
chào|int|hello, hi, goodbye
chào buổi sáng|int|good morning
chúc ngủ ngon|int|good night
hẹn gặp lại|int|see you again
tạm biệt|int|goodbye
cảm ơn|int|thank you
cảm ơn nhiều|int|thank you very much
xin lỗi|int|sorry; excuse me
không sao|int|no problem, it's okay
không có gì|int|you're welcome
làm ơn|int|please
xin mời|int|please (go ahead)
chúc mừng|int|congratulations
chúc mừng năm mới|int|happy New Year
chúc sức khỏe|int|cheers, to your health
dạ|part|yes (polite); polite particle
vâng|part|yes (polite)
ừ|part|yeah (informal)
ạ|part|polite particle at end of sentence
nhé|part|okay? (soft ending)
nhỉ|part|right? isn't it?
đi|part|go on; let's (imperative)
thôi|part|just; that's all; let's stop
mà|part|but; emphasis particle
à|part|oh?; question particle
hả|part|huh?
chứ|part|of course; right?
đấy|part|there; emphasis
đâu|part|(negative emphasis) not at all
cơ|part|emphasis particle
vậy|adv|so, like that
thế|adv|so, like that
vậy thì|conj|in that case
thế thì|conj|in that case
tuy nhiên|conj|however
nhưng mà|conj|but
vì vậy|conj|therefore
cho nên|conj|so
mặc dù|conj|although
để|conj|in order to
hoặc là|conj|either … or
vừa… vừa|conj|both … and
càng… càng|conj|the more … the more
bao nhiêu|pron|how many, how much
bao nhiêu tuổi|pron|how old
mấy|pron|how many (small numbers)
ví dụ|n|example
chẳng hạn|adv|for example
đặc biệt là|adv|especially
thật ra|adv|actually
tất nhiên|adv|of course
chắc chắn|adv|certainly
có lẽ|adv|maybe, perhaps
có thể|v|can, may; possibly
không thể|v|cannot
biết nói|v|to be able to speak
phải không|part|right? isn't it?
đúng không|part|right?
được không|part|is that okay?
có… không|part|yes/no question frame
đã… chưa|part|have you … yet? frame
xin hỏi|v|excuse me, may I ask
cho tôi|v|give me; may I have
cho hỏi|v|may I ask
đừng lo|int|don't worry
cẩn thận|adj|careful
nhanh lên|int|hurry up
chờ một chút|int|wait a moment
đợi chút|int|wait a moment
chậm thôi|int|slowly please
nói lại|v|to say again
nói chậm|v|to speak slowly
viết ra|v|to write down
giúp tôi|v|help me
cứu|v|to rescue, to save
cứu với|int|help!
chỉ đường|v|to give directions
lạc đường|v|to be lost
thẳng|adj|straight
quay lại|v|to turn back
rẽ|v|to turn
trái|adj|left
phải|adj|right
bên trái|n|left side
bên phải|n|right side
phía trước|n|the front
phía sau|n|the back
gần đây|adv|nearby; recently
phía đông|n|east
phía tây|n|west
phía nam|n|south
phía bắc|n|north
Bắc|n|North
Trung|n|Central (Vietnam)
Nam|n|South
Hà Nội|n|Hanoi
Sài Gòn|n|Saigon
Việt Nam|n|Vietnam
Đà Nẵng|n|Da Nang
Huế|n|Hue
Hội An|n|Hoi An
Mỹ|n|America, USA
Úc|n|Australia
Anh|n|England, UK
Pháp|n|France
Đức|n|Germany
Nhật Bản|n|Japan
Hàn Quốc|n|South Korea
Trung Quốc|n|China
Ấn Độ|n|India
Thái Lan|n|Thailand
Canada|n|Canada
`.split('\n').forEach(l=>{const [v,p,e]=l.split('|');if(v&&e)DICT.push({v,p,e})});
