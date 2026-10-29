#!/usr/bin/env python3
"""Dựng dict/ew.js: danh sách từ tiếng Anh (có trong dict/e/) kèm độ phổ biến, dùng để gợi ý khi người học gõ sai chính tả.

    pip install wordfreq
    python tools/build_ew.py          # chạy sau tools/build_dict.py

Định dạng: DX.ew="từ<độ phổ biến×10>|từ<..>|..." — chỉ giữ từ đơn có trong từ điển Anh→Việt và đủ thông dụng."""
import glob, json, re
from pathlib import Path
from wordfreq import zipf_frequency
ROOT = Path(__file__).resolve().parent.parent
dec, words = json.JSONDecoder(), set()
for f in glob.glob(str(ROOT / "dict" / "e" / "*.js")):
    s, i = Path(f).read_text(encoding="utf-8"), 0
    while True:
        i = s.find("DX.se(", i)
        if i < 0: break
        j = s.index(",", i); obj, end = dec.raw_decode(s, j + 1); i = end
        words.update(k for k in obj if re.fullmatch(r"[a-z][a-z'-]{1,23}", k))
out = []
for w in sorted(words):
    z = zipf_frequency(w, "en")
    if z >= 2.2: out.append(f"{w}{round(z * 10)}")
(ROOT / "dict" / "ew.js").write_text('DX.ew="' + "|".join(out) + '";', encoding="utf-8")
print("từ:", len(out), "| byte:", (ROOT / "dict" / "ew.js").stat().st_size)
