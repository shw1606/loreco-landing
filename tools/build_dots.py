"""첫 화면 점 숫자(7,476,768)와 일별 조회 막대 30개를 index.html의 자리표시자에 채운다.
실행: python3 build_dots.py  (같은 폴더의 index.html을 제자리에서 고친다)
자리표시자: <!--DOTS--> , <!--BARS-->  — 이미 채워져 있으면 생성 블록을 다시 바꾼다.
"""
import pathlib, random, re

HERE = pathlib.Path(__file__).resolve().parent
html_path = HERE.parent / "site" / "index.html"

# 8×12 비트맵 (2점 굵기)
ZERO = [
    "..XXXX..",
    ".XXXXXX.",
    "XXX..XXX",
    "XX....XX",
    "XX....XX",
    "XX....XX",
    "XX....XX",
    "XX....XX",
    "XX....XX",
    "XXX..XXX",
    ".XXXXXX.",
    "..XXXX..",
]
SEVEN = [
    "XXXXXXXX",
    "XXXXXXXX",
    "......XX",
    ".....XX.",
    ".....XX.",
    "....XX..",
    "....XX..",
    "...XX...",
    "...XX...",
    "..XX....",
    "..XX....",
    "..XX....",
]
COMMA = [
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    ".XX",
    ".XX",
    "XX.",
]
FOUR = [
    ".....XX.",
    "....XXX.",
    "...XXXX.",
    "..XX.XX.",
    ".XX..XX.",
    "XX...XX.",
    "XXXXXXXX",
    "XXXXXXXX",
    ".....XX.",
    ".....XX.",
    ".....XX.",
    ".....XX.",
]
SIX = [
    "..XXXX..",
    ".XXXXXX.",
    "XXX.....",
    "XX......",
    "XX.XXX..",
    "XXXXXXX.",
    "XXX..XXX",
    "XX....XX",
    "XX....XX",
    "XXX..XXX",
    ".XXXXXX.",
    "..XXXX..",
]
EIGHT = [
    "..XXXX..",
    ".XXXXXX.",
    "XXX..XXX",
    "XX....XX",
    "XXX..XXX",
    ".XXXXXX.",
    ".XXXXXX.",
    "XXX..XXX",
    "XX....XX",
    "XXX..XXX",
    ".XXXXXX.",
    "..XXXX..",
]
GLYPHS = {"0": ZERO, "4": FOUR, "6": SIX, "7": SEVEN, "8": EIGHT, ",": COMMA}
# 실제 값: 같은 채널의 2026년 7~9월 쇼츠 4편 조회 합계(YouTube Data API, 2026-11-08 18:39 KST)
TEXT = "7,476,768"
# 강조할 점 (글리프 순서, 행, 열) — 쇼츠 3편. 비트맵에 실제로 점이 있는 자리여야 한다.
ACCENT = {(0, 2, 7), (2, 7, 3), (4, 6, 1), (8, 10, 6)}  # 쇼츠 4편


def dots_markup():
    out = []
    for gi, ch in enumerate(TEXT):
        bm = GLYPHS[ch]
        w = len(bm[0])
        cells = []
        for r, line in enumerate(bm, start=1):
            for c, px in enumerate(line, start=1):
                if px != "X":
                    continue
                cls = ' class="on"' if (gi, r, c) in ACCENT else ""
                cells.append(f'<i{cls} style="--c:{c};--r:{r}"></i>')
        out.append(f'<span class="glyph" style="--w:{w}">' + "".join(cells) + "</span>")
    n = sum(1 for gi, ch in enumerate(TEXT) for line in GLYPHS[ch] for px in line if px == "X")
    return "\n".join(out), n


def bars_markup():
    rnd = random.Random(20261103)
    vals = []
    for i in range(30):
        base = rnd.randint(14, 34)
        vals.append(base)
    vals[26] = 100           # 11월 3일, 튄 하루
    vals[27], vals[28], vals[29] = 58, 44, 38
    out = []
    for i, v in enumerate(vals):
        cls = ""
        if i == 26:
            cls = ' class="on"'
        elif i > 26:
            cls = ' class="after"'
        out.append(f'<i{cls} style="--h:{v}%"></i>')
    return "".join(out)


html = html_path.read_text(encoding="utf-8")
dots, n = dots_markup()
bars = bars_markup()
block_d = f"<!--DOTS-->\n{dots}\n<!--/DOTS-->"
block_b = f"<!--BARS-->\n{bars}\n<!--/BARS-->"
if "<!--/DOTS-->" in html:
    html = re.sub(r"<!--DOTS-->.*?<!--/DOTS-->", lambda m: block_d, html, flags=re.S)
else:
    html = html.replace("<!--DOTS-->", block_d)
if "<!--/BARS-->" in html:
    html = re.sub(r"<!--BARS-->.*?<!--/BARS-->", lambda m: block_b, html, flags=re.S)
else:
    html = html.replace("<!--BARS-->", block_b)
html_path.write_text(html, encoding="utf-8")
print("dots:", n, "accent:", len(ACCENT))
