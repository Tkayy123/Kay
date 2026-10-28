#!/usr/bin/env python3
"""Dựng từ điển mở rộng (dict/) từ gói npm `which-dialect-vi` (dữ liệu Wiktionary, CC BY-SA 4.0).

    npm pack which-dialect-vi && tar xzf which-dialect-vi-*.tgz        # tạo thư mục package/
    python tools/build_dict.py package/data

Kết quả: dict/v/NN.js (từ tiếng Việt -> nghĩa), dict/e/NN.js (từ tiếng Anh -> từ tiếng Việt), dict/index.js (danh sách shard + bản đồ shard -> gói).
Khóa shard = 2 chữ cái đầu của chữ không dấu (đ->d), ký tự khác -> '_'. Phải khớp hàm sk() trong js/dictload.js.
"""
import glob, json, re, sys, unicodedata
from pathlib import Path
SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "package/data")
OUT = Path(__file__).resolve().parent.parent / "dict"
POS = {"noun": "n", "verb": "v", "adj": "adj", "adv": "adv", "name": "name", "phrase": "phrase", "intj": "int", "pron": "pron",
       "particle": "part", "conj": "conj", "classifier": "cl", "num": "num", "prep": "prep", "combining_form": "comb", "det": "det"}

def nf(s):
    s = unicodedata.normalize("NFD", s.lower()).replace("đ", "d")
    return "".join(c for c in s if unicodedata.category(c) != "Mn")

def sk(s):
    k = re.sub(r"[^a-z]", "_", nf(s))
    return (k + "__")[:2]

def cut(t, n):
    t = re.sub(r"\s+", " ", t).strip()
    return t if len(t) <= n else t[:n].rsplit(" ", 1)[0] + "…"

v, e = {}, {}
for f in glob.glob(str(SRC / "words" / "*.json")):
    for w, entries in json.load(open(f, encoding="utf-8")).items():
        groups, fq = [], 0
        for en in entries[:4]:
            gl, ex = [], 0
            for s in en.get("senses", []):
                for g in s.get("glosses", [])[:1]:
                    if g and len(gl) < 4: gl.append(cut(g, 110))
                if not ex:
                    for x in s.get("examples", []) or []:
                        if x.get("text") and x.get("translation"):
                            ex = [cut(x["text"], 110), cut(x["translation"], 110)]; break
            if gl: groups.append([POS.get(en.get("pos"), en.get("pos", "")), gl, ex])
            fq = max(fq, en.get("frequency", 0) or 0)
        if groups: v.setdefault(sk(w), {})[w] = {"f": round(fq, 1), "d": groups}
for f in glob.glob(str(SRC / "en" / "*.json")):
    for t, rows in json.load(open(f, encoding="utf-8")).items():
        rows = sorted(rows, key=lambda r: (not r.get("primary"), -(r.get("frequency") or 0)))[:8]
        e.setdefault(sk(t), {})[t] = [[r["word"], POS.get(r.get("pos"), r.get("pos", "")), round(r.get("frequency") or 0, 1), cut(r.get("gloss", ""), 80)] for r in rows]
for d in (OUT / "v", OUT / "e"): d.mkdir(parents=True, exist_ok=True)
# Gộp các shard liền kề thành gói ~350KB để chỉ còn ~25 file (upload GitHub gọn); DX.b ánh xạ shard -> gói
LIM, B = 350_000, {"v": {}, "e": {}}
for kind, data, fn in (("v", v, "sv"), ("e", e, "se")):
    cur, size, n = [], 0, 0
    def flush():
        global cur, size, n
        if not cur: return
        n += 1; name = "%02d" % n
        (OUT / kind / f"{name}.js").write_text("".join(f"DX.{fn}({json.dumps(k)},{json.dumps(data[k], ensure_ascii=False, separators=(',', ':'))});" for k in cur), encoding="utf-8")
        for k in cur: B[kind][k] = name
        cur, size = [], 0
    for k in sorted(data):
        s = len(json.dumps(data[k], ensure_ascii=False, separators=(',', ':')).encode("utf-8")) + 20
        if cur and size + s > LIM: flush()
        cur.append(k); size += s
    flush()
(OUT / "index.js").write_text("DX.keys=" + json.dumps({"v": sorted(v), "e": sorted(e)}, separators=(",", ":")) + ";DX.b=" + json.dumps(B, separators=(",", ":")) + ";DX.n=[%d,%d];" % (sum(len(x) for x in v.values()), sum(len(x) for x in e.values())), encoding="utf-8")
print("từ:", sum(len(x) for x in v.values()), "shard v:", len(v), "| thuật ngữ Anh:", sum(len(x) for x in e.values()), "shard e:", len(e))
