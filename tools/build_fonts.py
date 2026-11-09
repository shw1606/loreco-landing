"""글꼴 서브셋 생성. index.html에 실제로 쓰인 글자 + ASCII + 한글 문장부호만 남긴다.
brotli가 없어 woff2 대신 woff로 만든다. 실행: python3 tools/build_fonts.py (레포 루트에서) 또는 tools 폴더에서 python3 build_fonts.py
원본: Pretendard Variable 1.309 (SIL OFL, fonts-src/PretendardVariable.ttf),
      Geist Mono (OFL, fonts-src), Newsreader (OFL, fonts-src)
"""
import pathlib, re, subprocess, shutil, html as htmlmod

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parent / "site"
SHARED = HERE / "fonts-src"
OUT = SITE / "fonts"
OUT.mkdir(exist_ok=True)

src = (SITE / "index.html").read_text(encoding="utf-8")
text = re.sub(r"<script.*?</script>", "", src, flags=re.S)
text = re.sub(r"<[^>]+>", " ", text)
text = htmlmod.unescape(text)
# 속성값(aria-label 등)도 포함되도록 원본에서 한글을 다시 모은다
text += "".join(re.findall(r"[가-힣]", htmlmod.unescape(src)))
# JS 안의 mailto 본문 문자열도 (화면엔 안 나오지만 혹시 몰라) 포함
text += (SITE / "main.js").read_text(encoding="utf-8")
chars = sorted(set(ch for ch in text if ord(ch) > 0x20))
(HERE / "chars.txt").write_text("".join(chars), encoding="utf-8")

COMMON = "U+0020-007E,U+00A0,U+00A9,U+00B7,U+2013,U+2014,U+2018-201D,U+2026,U+2039,U+203A,U+20A9,U+25CF,U+223C,U+FF5E,U+3131-318E,U+00D7"

def sub(src, out, unicodes, extra=()):
    cmd = ["pyftsubset", str(src), f"--text-file={HERE/'chars.txt'}", f"--unicodes={unicodes}",
           "--flavor=woff", f"--output-file={out}", "--layout-features=*", "--no-hinting",
           "--notdef-outline", "--name-IDs=*", *extra]
    subprocess.run(cmd, check=True)
    print(out.name, out.stat().st_size // 1024, "KB")

sub(SHARED / "PretendardVariable.ttf", OUT / "pretendard-sub.woff", COMMON)
# Geist Mono는 띄어쓰기(U+0020)를 뺀다. 한글이 섞인 라벨에서 모노 폭 공백이 너무 넓어, 공백은 Pretendard 것을 쓰게 한다.
subprocess.run(["pyftsubset", str(SHARED / "geistmono-GeistMono[wght].ttf"),
                "--unicodes=U+0021-007E,U+00A0,U+00B7,U+2013,U+2014,U+2026,U+2039,U+203A,U+20A9,U+25CF,U+223C",
                "--flavor=woff", f"--output-file={OUT/'geistmono-sub.woff'}", "--layout-features=*", "--no-hinting",
                "--notdef-outline", "--name-IDs=*"], check=True)
print("geistmono-sub.woff", (OUT/'geistmono-sub.woff').stat().st_size // 1024, "KB")
sub(SHARED / "Newsreader-Regular.ttf", OUT / "newsreader-sub.woff", "U+0020-007E")

for lic in ["Pretendard-LICENSE.txt", "geist-OFL.txt", "newsreader-OFL.txt"]:
    shutil.copy(SHARED / lic, OUT / lic)
