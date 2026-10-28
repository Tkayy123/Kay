# Từ Từ · Học tiếng Việt · cấu trúc dự án

Mỗi mục trên thanh bên là **một trang HTML riêng**:

| Trang | JS riêng |
|---|---|
| `index.html` (trang chủ) | – |
| `alphabet.html` · `tones.html` · `grammar.html` · `words.html` · `dialogues.html` · `numbers.html` · `review.html` · `progress.html` · `settings.html` | `js/pages/<tên>.js` |

```
css/style.css        giao diện (font: biến --font, Arial Narrow)
js/core.js           tiện ích, lưu trữ, giọng đọc say(), cài đặt, thanh bên dùng chung
js/data/vocab.js     TOÀN BỘ từ vựng (LS), nhóm chủ đề (GR), danh sách ALL, từ đã nhớ
js/data/examples.js  câu ví dụ cho từ vựng (mỗi dòng: từ|câu tiếng Việt|nghĩa tiếng Anh)
js/pages/*.js        logic riêng của từng trang
js/init.js           khởi động chung
```

## Thêm từ vựng
Mở `js/data/vocab.js`, thêm một dòng `P('Tên chủ đề','từ=nghĩa;từ=nghĩa;…')` vào cuối `LS`, rồi thêm số thứ tự của nó vào một nhóm trong `GR`.

## Thêm trang mới
1. Sao chép một file `.html` (ví dụ `tones.html`), đổi `data-page`, nội dung và tên file JS.
2. Thêm một dòng vào mảng `PAGES` trong `js/core.js`.

## Âm thanh (nghe)
Khi bấm nghe, `say()` trong `js/core.js` thử lần lượt:
1. File `audio/<mã>.mp3` có sẵn (nhanh nhất, chạy offline, chất lượng do bạn kiểm soát).
2. **Giọng AI trực tuyến** qua địa chỉ `TTS_URL` ở đầu phần âm thanh trong `core.js` (cần Internet). Học sinh không phải cài gì.
3. Giọng tiếng Việt có sẵn trên thiết bị (khi mất mạng).
4. Nếu cả ba đều không có: hiện thông báo, **không** đọc bằng giọng tiếng Anh.

`TTS_URL` mặc định là điểm đọc công khai của Google Dịch: không chính thức, có thể bị giới hạn hoặc thay đổi mà không báo trước. Khi có dịch vụ riêng (Azure, Google Cloud, máy chủ của trường), đổi dòng `TTS_URL` thành địa chỉ đó (`{q}` là chữ cần đọc); đặt `''` để tắt tầng này.

### Tạo file mp3 (chạy một lần)
```
pip install edge-tts
python tools/make_audio.py            # giọng nữ HoaiMy; thêm --voice vi-VN-NamMinhNeural cho giọng nam
```
Công cụ tự thu thập mọi từ vựng, chữ cái, thanh điệu, hội thoại, số 0–999 (hiện khoảng 1.600 mục, gồm cả câu ví dụ và ví dụ ngữ pháp), tạo mp3 vào `audio/` rồi bạn đưa cả thư mục lên web cùng app. Thêm từ mới vào `vocab.js` rồi chạy lại: chỉ tạo file còn thiếu. `--dry-run` để chỉ liệt kê.
Tên file là `akey(chữ)` (băm FNV-1a của chữ đã chuẩn hóa, không phân biệt hoa/thường) nên cả `core.js` và `make_audio.py` luôn khớp nhau.

Muốn dùng bản thu thật hoặc dịch vụ khác: chỉ cần đặt file mp3 vào `audio/` với đúng tên `<mã>.mp3` (xem `audio/manifest.json` để biết mã ứng với chữ nào).

## Giao diện
- Mọi trang dùng hết chiều rộng bên cạnh thanh bên (không còn giới hạn cột hẹp).
- **Bài học** khi đang làm bài sẽ phủ kín cả màn hình (thanh tiến độ ở trên, nút Kiểm tra/Tiếp tục ghim ở dưới); bấm ✕ để thoát. Kích thước chữ và nút tự co giãn theo màn hình, đáp án xếp lưới 2×2 (1 cột trên điện thoại hẹp).
- Đáp án ở Ôn tập và bài nghe-đoán thanh điệu cũng là các nút lớn lấp đầy chiều rộng.
- CSS của các thay đổi này nằm ở phần “v9” cuối `css/style.css`.

## Trang chủ (bảng điều khiển)
Bố cục 70/30: cột chính gồm banner “Tiếp tục học”, hai nhóm thẻ học có icon và thanh tiến độ, khối Ôn tập thông minh; cột phải gồm chuỗi ngày + XP + lịch 7 ngày, mục tiêu hằng ngày (vòng tiến độ), thử thách tuần, huy hiệu và mẹo học. Màn hình hẹp chuyển về một cột (chuỗi ngày và mục tiêu nằm ngay dưới banner). Mã ở `js/pages/home.js`, CSS ở phần “v10”.

**Tiến độ được tính từ đâu** (tất cả lưu trong trình duyệt, khóa `vn-stat`, mỗi máy một bộ riêng):
- Bảng chữ cái: số chữ đã bấm xem /29. Thanh điệu: số thanh đã nghe /6. Số đếm: số câu nghe số trả lời đúng (tối đa 10).
- Từ vựng: số từ bấm “Đã nhớ”. Bài học: số chủ đề đã hoàn thành. Hội thoại: số đoạn đã bấm hết các câu (`DLG_TOTAL` trong `home.js` là tổng số đoạn, sửa khi thêm đoạn).
- “% lộ trình” = trung bình % của 6 mục trên.
- XP: bài học hoàn thành (như cũ) và +2 cho mỗi câu Ôn tập trả lời đúng ngay lần đầu. Mục tiêu hằng ngày chọn ở Cài đặt (20/40/60 XP).
- Chuỗi ngày: nếu hôm nay chưa học nhưng hôm qua có học thì chuỗi vẫn được giữ.
- Thử thách tuần: hoàn thành 5 bài học trong 7 ngày gần nhất. Huy hiệu mở khóa rồi giữ vĩnh viễn.

**Ôn tập thông minh** dùng hộp Leitner: mỗi từ làm trong Bài học hoặc Ôn tập đều có lịch; đúng thì lên hộp và nhắc lại sau 1, 2, 4, 8, 16 ngày; sai thì về hộp 0 và đến hạn ngay. “Có N từ cần ôn hôm nay” là số từ đã đến hạn; nút “Ôn ngay” mở `review.html?mode=due`.

**Liên kết sâu** (dùng cho nút “Tiếp tục học”): `words.html?t=<số chủ đề>`, `lesson.html?l=<số chủ đề>` (tự bắt đầu bài), `review.html?mode=due`.

Chưa có: bảng xếp hạng với học sinh khác (cần máy chủ và tài khoản; app hiện chạy hoàn toàn trên trình duyệt).


## v11: cập nhật giao diện và nội dung học
- **Giao diện**: tông kem + đỏ đô (cùng phong cách với bộ slide), chế độ tối chuyển sang nâu ấm thay vì xanh tím lạnh; chữ Be Vietnam Pro (tải từ Google Fonts, có font dự phòng khi mất mạng). Màu nằm ở 4 dòng đầu `css/style.css` (biến `--red` là màu nhấn, `--hero1/--hero2` là màu banner), CSS mới ở phần “v11” cuối file.
- **Từ vựng**: 55 chủ đề, 440 từ (thêm 13 chủ đề: gọi món, mặc cả, taxi/Grab, khách sạn, điện thoại, gặp bác sĩ, vị trí, thời gian, loại từ, từ chỉ mức độ & nối, từ ngữ pháp thường dùng, thức uống, đồ dùng). Thẻ ghi nhớ có câu ví dụ (`examples.js`), nút nghe chậm, xáo trộn, lọc “chỉ từ chưa nhớ”, vuốt để chuyển thẻ, tự sang thẻ kế khi bấm “Đã nhớ”, số từ đã nhớ hiện ngay trên từng chủ đề. Đã sửa lỗi chip chủ đề đang chọn bị tô sáng sai.
- **Bài học**: thêm dạng “Nghe rồi gõ lại” và “Sắp xếp thành câu” (dùng câu ví dụ). Dạng gõ chấp nhận gõ thiếu dấu (báo “Gần đúng” kèm đáp án có dấu).
- **Ngữ pháp** (`grammar.html`): 10 mẫu câu có công thức, ví dụ nghe được và một câu hỏi nhỏ; tính vào tiến độ trang chủ (`DLG_TOTAL` và số 10 của Ngữ pháp trong `home.js`: sửa khi thêm mới).
- **Hội thoại**: 10 đoạn (thêm gọi món, taxi, khách sạn, hiệu thuốc, hẹn bạn, gia đình, thời tiết); nút ẩn bản dịch và hiện tất cả các câu.
- **Trang chủ**: thẻ “Từ của ngày” (từ + câu ví dụ, nghe được).
- Có từ hoặc câu mới thì chạy lại `python tools/make_audio.py` để tạo mp3 còn thiếu.

## v12: Tra từ điển, Luyện nói (AI phát âm), nâng cấp Từ vựng
- **Tra từ điển** (`dictionary.html`, `js/pages/dictionary.js`): gõ từ tiếng Việt (không dấu cũng được) hoặc tiếng Anh. Hiện thanh điệu từng âm tiết, câu ví dụ, các từ cùng nghĩa trong app, định nghĩa từ Wiktionary tiếng Việt và tiếng Anh (cần Internet, không cần khóa API), liên kết VDict/Soha/Google Dịch, lịch sử tra và **Sổ từ** cá nhân (khóa `vn-nb`). Mở nhanh bằng `dictionary.html?q=<từ>`; mọi từ trong câu ví dụ ở thẻ từ vựng đều bấm để tra.
- **AI phát âm** (`js/pron.js`): bấm 🎤 để nói. Dùng micro + nhận dạng giọng nói của trình duyệt (`vi-VN`, Chrome/Edge/Safari, cần Internet), so khớp từng âm tiết bằng quy hoạch động rồi phân loại: đúng, **sai thanh** (ví dụ cà ↔ cá), gần đúng, sai âm, thiếu. Có điểm 0–100, gợi ý sửa, nghe lại giọng của mình và so với giọng mẫu. Điểm cao nhất mỗi mục lưu ở `ST.pron`.
- **Luyện nói** (`speak.html`): luyện theo chủ đề từ vựng, câu ví dụ, cặp thanh điệu hoặc câu tự nhập.
- **Từ vựng**: hiện thanh điệu mỗi âm tiết bằng màu, nút 🎤 Nói và 🔎 Từ điển ngay trên thẻ, danh sách tất cả từ trong chủ đề (nghe, đánh dấu đã nhớ), gợi ý tra từ điển khi tìm không thấy.
- **Giao diện**: hộp thoại dạng bottom-sheet trên điện thoại, viền focus rõ cho bàn phím, giảm chuyển động theo cài đặt hệ thống, màu thanh điệu hỗ trợ chế độ tối. CSS ở phần “v12”.
- Lưu ý: bộ nhận dạng của trình duyệt chấm theo mức máy “hiểu” được, nên điểm mang tính hướng dẫn, không thay giáo viên.

## v13: UX và trạng thái tương tác
- **Trang chủ cho người mới**: khi tiến độ dưới 30%, hiện khối “Bắt đầu từ đây” (3 bước, bước tiếp theo được đánh dấu), lối tắt Tra từ điển / Luyện nói, và gập danh sách đầy đủ các mục học vào “Xem tất cả mục học”. Banner “Tiếp tục học” kèm % lộ trình vẫn ở trên cùng.
- **Phản hồi khi bấm nghe**: `say()` đánh dấu nút vừa bấm bằng lớp `.speaking` (nút sáng lên, có sóng âm) ngay lập tức và gỡ khi phát xong (`busy()` trong `core.js`).
- **Hover/active** thống nhất cho nút, chip, thẻ, ô chữ cái, thẻ mục học (chỉ hover trên thiết bị có chuột); lưới chữ cái và danh sách có ô đều nhau, không tràn viền (đã kiểm tra 13 trang ở 375px và 1280px).

## v14
- **Nghe lại giọng mình**: sau khi chấm, hộp Luyện phát âm có trình phát (kéo/tua được), nút “Nghe bạn nói”, “So sánh: mẫu → bạn” (phát giọng mẫu rồi tới giọng mình) và tùy chọn tự phát lại. Đã sửa lỗi bấm mic lần hai để dừng thì không chấm điểm.
- **Cặp từ thanh điệu** (`tones.html`): chọn bằng thẻ lớn, chỉ chọn một lần; sau đó hiện nghĩa và thanh điệu của cả ba từ, thẻ đúng/sai có hiệu ứng, điểm đúng/tổng và chuỗi đúng, nghe lại/nghe chậm, chạm thẻ để nghe từng từ, nút “Nói thử” mở bộ ghi âm.

## v15: từ điển tích hợp (ngoại tuyến)
- `js/data/dict.js`: ~990 mục Việt→Anh (loại từ + nghĩa) cho từ thông dụng A0–A2: đại từ, động từ, tính từ, đồ ăn, nhà cửa, cơ thể, du lịch, thời gian, loại từ, trợ từ… Mỗi dòng `từ|loại|nghĩa`, thêm từ bằng cách viết thêm dòng. Gộp với 352 từ trong `vocab.js` (≈1.070 từ/cụm từ khác nhau).
- `dictionary.html` giờ tra được: từ không dấu; **tiếng Anh → tiếng Việt** (gõ `house`); **cả cụm/câu** (tách từng từ, ghép cụm dài nhất, hiện nghĩa từng từ); các từ cùng chữ khác dấu (ma/má/mà…); từ và cụm từ liên quan; gợi ý khi gõ. Wiktionary vẫn dùng làm nguồn mở rộng khi có Internet.
- `tools/make_audio.py` thu thập thêm từ trong `dict.js` (khoảng 2.300 mục) để tạo mp3.

## Tạo âm thanh không cần gõ lệnh
- **Windows**: bấm đúp `tao-am-thanh.bat`. **macOS/Linux**: bấm đúp (hoặc chạy) `tao-am-thanh.command`. Tự cài `edge-tts` rồi tạo các file mp3 còn thiếu (cần Internet, khoảng vài phút cho ~2.300 mục).
- **Tự động hoàn toàn**: đưa dự án lên GitHub; workflow `.github/workflows/audio.yml` tự tạo và commit mp3 mỗi khi `js/data/` hoặc `js/pages/` thay đổi (hoặc bấm “Run workflow” trong tab Actions).
- Khi chưa có mp3, app vẫn đọc từ mới bằng giọng AI trực tuyến (cần Internet), nên không có từ nào bị câm.

## v17: từ điển mở rộng ~30.000 từ, tra hai chiều Việt ↔ Anh
- `dict/` chứa **30.282 từ tiếng Việt** (loại từ, nhiều nghĩa tiếng Anh, câu ví dụ có dịch, độ thông dụng) và **30.111 thuật ngữ tiếng Anh → tiếng Việt**, chia thành ~50 file nhỏ (`dict/v/NN.js`, `dict/e/NN.js`) chỉ tải khi cần (mỗi lần tra tải 1–2 file, vài chục KB), nạp bằng thẻ `<script>` nên chạy được cả khi mở file trực tiếp và hoạt động ngoại tuyến.
- Nguồn: Wiktionary qua Kaikki.org và gói npm `which-dialect-vi`, giấy phép **CC BY-SA 4.0**; độ thông dụng từ wordfreq (CC BY-SA 4.0). Phần ghi nguồn hiện ở cuối trang Tra từ điển; `dict/LICENSE.txt` là bản giấy phép. Dữ liệu trong `dict/` phải giữ giấy phép này khi chia sẻ lại; mã của app và bộ từ cơ bản (`js/data/dict.js`) là phần riêng.
- Dựng lại: `npm pack which-dialect-vi && tar xzf which-dialect-vi-*.tgz && python tools/build_dict.py package/data` (`tools/build_dict.py`).
- Trang Tra từ điển: gõ tiếng Việt (có/không dấu) hoặc tiếng Anh đều được; gợi ý khi gõ; từ cơ bản hiện trước, “Nghĩa mở rộng” bên dưới; tra từng từ trong cả câu; từ liên quan; cùng chữ khác dấu; cụm tiếng Anh liên quan. Wiktionary trực tuyến chỉ còn là dự phòng.


## v18: số đến hàng tỷ, từ điển có Sổ từ học được, thêm từ vựng, chạy ngoại tuyến
- **Đọc số đến 999 tỷ** (`nv()` trong `js/core.js`, dùng chung cho Số đếm và Tra từ điển): nghìn · triệu · tỷ, “không trăm lẻ”, “mốt/lăm”, và cách nói thường ngày (`nvCasual()`: 1.500.000 → “một triệu rưỡi”, 1.200.000 → “một triệu hai”). Bản Python giống hệt là `number_words()` trong `tools/make_audio.py` (đã đối chiếu 3.000 số ngẫu nhiên, không lệch).
- **Trang Số đếm** (`numbers.html`): gõ số có dấu chấm/phẩy/khoảng trắng, xem cách đọc kèm tách từng hàng, nghe chậm, đọc như giá tiền; bảng 12 hàng quan trọng (bấm để thử); luyện nghe số với 7 mức: 0–20, 0–100, 0–999, 0–9.999, 0–999.999, hàng triệu, giá tiền (đọc kèm “đồng”). Mở nhanh bằng `numbers.html?n=1500000`.
- **Tra từ điển**: gõ một con số (vd. `1500000`) để xem cách đọc; nút ☆ trên **mọi** dòng kết quả để lưu vào Sổ từ; phím `/` để tìm nhanh, `Esc` để xóa; gợi ý khi gõ có độ trễ 90 ms cho đỡ giật.
- **Sổ từ của em** thành một chủ đề học thật (`syncMine()` trong `js/data/vocab.js`, đọc khóa `vn-nb`): có trong Từ vựng (thẻ ghi nhớ), Bài học, Ôn tập, Luyện nói. Nút “Học bằng thẻ / Làm bài / Sao chép / Xóa hết” ngay dưới sổ. Từ trong sổ (cờ `m:1`) không tính vào % lộ trình, nên thêm từ riêng không làm tụt tiến độ.
- **Từ vựng**: thêm 11 chủ đề (88 từ, mỗi từ có câu ví dụ trừ chủ đề “Nhờ giúp đỡ” vốn đã là câu): Số lớn & tiền, Ngân hàng, Công việc, Học tập, Nấu ăn & nhà bếp, Điện thoại & mạng xã hội, Tháng & năm, Thiên nhiên, Lễ hội & văn hóa, Việc hằng ngày, Nhờ giúp đỡ. Đã xếp vào các nhóm trong `GR`.
- **Ngoại tuyến**: `sw.js` (service worker) + `manifest.webmanifest` + `icon.svg`. Khi chạy qua http(s), trang và mã được lưu để dùng khi mất mạng, từ điển `dict/` và âm thanh `audio/` được lưu dần khi dùng; có thể “Thêm vào màn hình chính” trên điện thoại. Mở file trực tiếp (file://) thì bỏ qua phần này, app vẫn chạy như cũ. Đổi `VERSION` trong `sw.js` mỗi lần phát hành.
- **Âm thanh**: `make_audio.py` giờ cũng tạo mp3 cho khoảng 150 số tròn (1.000–900 triệu, 1 tỷ…), các giá “… nghìn đồng” từ 5.000 đến 200.000 và từ vựng mới (~2.500 mục). Số khác đọc bằng giọng trực tuyến/giọng thiết bị. `audio/manifest.json` đã làm mới; **chạy lại `python tools/make_audio.py` (hoặc bấm đúp `tao-am-thanh`) để tạo mp3 còn thiếu.**


## v19: ô nhập số tự ngăn cách hàng nghìn, thêm 13 đoạn hội thoại
- **Ô nhập số** (Số đếm → mục 1 và ô gõ đáp án ở mục 3): gõ `1500000` tự thành `1.500.000`, con trỏ giữ đúng chỗ, tối đa 12 chữ số; chữ to, số đều nhau cho dễ đọc. Dán số có dấu phẩy/khoảng trắng cũng được chuẩn hóa. Mã: `liveFmt()` trong `js/pages/numbers.js`, CSS ở phần “v19”.
- **Hội thoại**: từ 10 lên **23 đoạn** — thêm Giới thiệu nghề nghiệp, Hỏi giờ, Mua trái cây ở chợ, Đổi tiền ở ngân hàng, Đặt xe Grab, Khám bệnh, Mua vé xe, Thuê nhà, Mua sim điện thoại, Làm quen đồng nghiệp, Gọi cà phê mang về, Gọi điện cho bạn, Chúc mừng năm mới. Nhiều đoạn luyện số lớn và giá tiền (nghìn, triệu). Đoạn đã bấm hết các câu hiện dấu ✓ ngay trên nút chọn bài. `DLG_TOTAL` trong `home.js` đã sửa thành 23.
- Chạy lại `python tools/make_audio.py` để tạo mp3 cho các câu hội thoại mới (`audio/manifest.json` đã làm mới).

## v25: đoán chính tả, Câu cần thiết, giao diện mượt hơn
- **Gõ sai chính tả tiếng Anh vẫn ra kết quả** (`js/fuzzy.js`, `dict/ew.js`): `appel` → apple, `fone` → phone, `wher is the tolet` → where is the toilet. Dùng khoảng cách Damerau–Levenshtein (đảo hai chữ cái = 1 lỗi) cộng so khớp theo cách đọc, xếp theo độ phổ biến (wordfreq). Khi gõ có chip “Có phải · Did you mean”; khi bấm Tra mà không có kết quả thì tự hiện kết quả của từ đúng nhất kèm các từ khác. Danh sách từ nạp khi cần (~135 KB) và nằm trong bộ nhớ ngoại tuyến. Dựng lại: `python tools/build_ew.py` (cần `pip install wordfreq`, chạy sau `build_dict.py`).
- **Trang Câu cần thiết** (`phrasebook.html`, `js/data/phrases.js`, `js/pages/phrasebook.js`): 164 câu trong 11 tình huống. Bấm câu để nghe (🔊 thường, 🐢 chậm), 🎤 luyện nói, ☆ lưu câu hay dùng, 📲 “cho người Việt xem” (chữ lớn toàn màn hình). Ô tìm kiếm Anh → Việt (chịu lỗi chính tả nhẹ) và Việt → Anh (không dấu cũng được). Thêm câu: viết thêm một dòng `English|Tiếng Việt|ghi chú` trong `phrases.js`; `tools/make_audio.py` tự tạo file nghe.
- **Song ngữ gọn hơn**: nhãn “Việt · Anh” được tách thành hai phần; tiêu đề trang hiện tiếng Việt lớn, tiếng Anh nhỏ bên dưới; nút và chip trên điện thoại xếp hai dòng. Cài đặt có lựa chọn **Chỉ tiếng Việt** (ẩn mọi phần tiếng Anh hướng dẫn). Logic ở cuối `js/core.js`.
- **MacBook và màn rộng**: nội dung giới hạn 1180 px và nằm giữa, chữ lớn không còn phình theo cửa sổ; thanh bên tự gọn trên màn thấp (MacBook Air) để luôn thấy hết 14 mục.
- **Mượt hơn**: bỏ nền `background-attachment:fixed` (giật ở Safari/điện thoại), chuyển trang bằng View Transitions, nạp trước trang khi chạm/rê chuột, danh sách dài dùng `content-visibility`.
- **Điện thoại (Android + iPhone)**: bỏ hiệu ứng hover “dính” sau khi chạm, khóa cuộn nền khi mở menu, thanh danh mục vuốt ngang, meta cho màn hình chính iPhone, màu thanh trình duyệt sáng/tối.
- Service worker lên `hoc-viet-v25`.
