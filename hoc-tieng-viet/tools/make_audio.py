#!/usr/bin/env python3
"""Tạo file nghe (mp3) cho app "Học tiếng Việt".

Chạy MỘT LẦN trên máy tính của bạn (cần Internet), rồi đưa cả thư mục audio/ lên web cùng app.
Điện thoại sẽ phát thẳng file mp3 nên không cần cài giọng đọc nào.

    pip install edge-tts
    python tools/make_audio.py                 # giọng nữ HoaiMy (mặc định)
    python tools/make_audio.py --voice vi-VN-NamMinhNeural   # giọng nam
    python tools/make_audio.py --dry-run       # chỉ liệt kê, không tạo file

Thêm từ mới vào vocab.js rồi chạy lại: chỉ những từ chưa có file mới được tạo.
Tên file = audio/<mã>.mp3, mã tính bằng đúng công thức akey() trong js/core.js.
"""
import argparse, asyncio, json, re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def akey(text: str) -> str:
    """Giống hệt akey() trong js/core.js (FNV-1a 32-bit trên mã UTF-16)."""
    t = re.sub(r"\s+", " ", unicodedata.normalize("NFC", text).lower()).strip()
    units = t.encode("utf-16-le")
    h = 2166136261
    for i in range(0, len(units), 2):
        h = ((h ^ (units[i] | (units[i + 1] << 8))) * 16777619) & 0xFFFFFFFF
    return f"{h:08x}"


def speech_text(text: str) -> str:
    """Làm sạch chữ trước khi đưa cho giọng đọc."""
    t = text.replace(" / ", ", ").replace("-", " ")
    return re.sub(r"\s+", " ", t).strip()


def read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


NUMD = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
NUMMAX = 999_999_999_999


def _tens(r: int) -> str:
    t, u = divmod(r, 10)
    if t == 1:
        return "mười" + (" " + ("lăm" if u == 5 else NUMD[u]) if u else "")
    return NUMD[t] + " mươi" + (" " + ("mốt" if u == 1 else "lăm" if u == 5 else NUMD[u]) if u else "")


def _group(g: int, full: bool) -> str:
    h, r = divmod(g, 100)
    s = NUMD[h] + " trăm" if (h > 0 or full) else ""
    if r == 0:
        return s
    if h > 0 or full:
        return s + " " + ("lẻ " + NUMD[r] if r < 10 else _tens(r))
    return NUMD[r] if r < 10 else _tens(r)


def number_words(n: int) -> str:
    """Giống hệt nv() trong js/core.js (đọc số 0 – 999.999.999.999)."""
    if n <= 0:
        return NUMD[0]
    n = min(n, NUMMAX)
    units = ["tỷ", "triệu", "nghìn", ""]
    groups = [(n // 10**9) % 1000, (n // 10**6) % 1000, (n // 10**3) % 1000, n % 1000]
    out, started = [], False
    for g, u in zip(groups, units):
        if g:
            out.append(_group(g, started) + (" " + u if u else ""))
            started = True
    return " ".join(out)


def extra_numbers() -> list[int]:
    """Các số tròn và số thường gặp từ 1.000 đến hàng tỷ (số khác sẽ đọc bằng giọng trực tuyến)."""
    s = set()
    for e in (3, 4, 5, 6, 7, 8):
        for d in range(1, 10):
            s.add(d * 10**e)
    for n in (1500, 2500, 15000, 25000, 150000, 250000, 1500000, 2500000, 12000, 20500, 1_000_000_000, 2_000_000_000, 5_000_000_000, 1_500_000_000):
        s.add(n)
    s.update(range(1000, 10000, 100))            # 1.100 ... 9.900
    s.update(range(10000, 100000, 5000))         # giá tiền hay gặp
    s.update(range(100000, 1000000, 50000))
    return sorted(s)


def collect() -> list[str]:
    out: list[str] = []

    # Từ vựng: P('Chủ đề','từ=nghĩa;từ=nghĩa')
    for m in re.finditer(r"P\('([^']*)','([^']*)'\)", read("js/data/vocab.js")):
        for item in m.group(2).split(";"):
            out.append(item.split("=")[0])

    # Bảng chữ cái: tên chữ cái (cột 2) và từ ví dụ (cột 4)
    a = read("js/pages/alphabet.js")
    body = a[a.index("const AB='") + len("const AB='"): a.index("'.split(';')")]
    for row in body.split(";"):
        c = row.split("|")
        if len(c) >= 4:
            out += [c[1], c[3]]

    # Thanh điệu: 6 từ mẫu, 6 chữ a/à/á.., các cặp từ
    t = read("js/pages/tones.js")
    out += re.findall(r"\bw:'([^']*)'", t)
    mk = re.search(r"const MK=\[([^\]]*)\]", t)
    if mk:
        out += re.findall(r"'([^']*)'", mk.group(1))
    ps = re.search(r"const PS=\[(.*?)\];", t, re.S)
    if ps:
        out += [x.split("=")[0] for x in re.findall(r"'([^']*=[^']*)'", ps.group(1))]

    # Hội thoại
    for m in re.finditer(r"\[[01],'([^']*)','[^']*'\]", read("js/pages/dialogues.js")):
        out.append(m.group(1))

    # Câu ví dụ của từ vựng: dòng "từ|câu tiếng Việt|nghĩa" trong js/data/examples.js
    for m in re.finditer(r"^[^|\n`]+\|([^|\n]+)\|[^|\n]+$", read("js/data/examples.js"), re.M):
        out.append(m.group(1))

    # Từ điển tích hợp: dòng "từ|loại|nghĩa" trong js/data/dict.js
    for m in re.finditer(r"^([^|\n`]+)\|[a-z]+\|[^|\n]+$", read("js/data/dict.js"), re.M):
        out.append(m.group(1))

    # Ngữ pháp: X('câu','nghĩa'), dấu * quanh từ nhấn mạnh thì bỏ đi
    out += [x.replace("*", "") for x in re.findall(r"X\('([^']*)'", read("js/pages/grammar.js"))]

    # Số 0–999, các số tròn lớn hơn (nghìn, triệu, tỷ) và câu thử giọng
    out += [number_words(n) for n in range(1000)]
    out += [number_words(n) for n in extra_numbers()]
    out += [number_words(n) + " đồng" for n in range(5000, 205000, 5000)]
    out.append("Xin chào! Tôi tên là An.")

    seen, uniq = set(), []
    for x in out:
        x = re.sub(r"\s+", " ", x).strip()
        if x and akey(x) not in seen:
            seen.add(akey(x))
            uniq.append(x)
    return uniq


async def synth(items, voice, rate, outdir, force, jobs):
    try:
        import edge_tts
    except ImportError:
        sys.exit("Thiếu thư viện. Chạy:  pip install edge-tts")
    sem = asyncio.Semaphore(jobs)
    todo = [(t, outdir / f"{akey(t)}.mp3") for t in items]
    todo = [(t, p) for t, p in todo if force or not p.exists()]
    print(f"Cần tạo {len(todo)} / {len(items)} file.")
    done = 0
    failed = []

    async def one(text, path):
        nonlocal done
        async with sem:
            for attempt in range(4):
                try:
                    tmp = path.with_suffix(".part")
                    await edge_tts.Communicate(speech_text(text), voice, rate=rate).save(str(tmp))
                    if tmp.stat().st_size < 500:
                        raise RuntimeError("file rỗng")
                    tmp.replace(path)
                    break
                except Exception as e:  # thử lại
                    if attempt == 3:
                        failed.append((text, str(e)))
                    await asyncio.sleep(1.5 * (attempt + 1))
            done += 1
            if done % 50 == 0 or done == len(todo):
                print(f"  {done}/{len(todo)}")

    await asyncio.gather(*(one(t, p) for t, p in todo))
    if failed:
        print(f"\n{len(failed)} file lỗi (chạy lại lệnh để thử tiếp):")
        for t, e in failed[:10]:
            print("  -", t, "·", e)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--voice", default="vi-VN-HoaiMyNeural", help="vi-VN-HoaiMyNeural (nữ) hoặc vi-VN-NamMinhNeural (nam)")
    ap.add_argument("--rate", default="-10%", help="tốc độ đọc, ví dụ -10%% cho chậm hơn một chút")
    ap.add_argument("--jobs", type=int, default=4, help="số file tạo song song")
    ap.add_argument("--force", action="store_true", help="tạo lại cả file đã có")
    ap.add_argument("--dry-run", action="store_true", help="chỉ liệt kê, không tạo file")
    args = ap.parse_args()

    items = collect()
    outdir = ROOT / "audio"
    outdir.mkdir(exist_ok=True)
    manifest = {akey(t): t for t in items}
    (outdir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"Thu thập được {len(items)} câu/từ cần đọc.")
    if args.dry_run:
        for t in items[:15]:
            print(f"  {akey(t)}  {t}")
        print("  ...")
        return
    asyncio.run(synth(items, args.voice, args.rate, outdir, args.force, args.jobs))
    print("Xong. Đưa cả thư mục audio/ lên cùng app.")


if __name__ == "__main__":
    main()
