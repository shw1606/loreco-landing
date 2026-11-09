# loreco.app

엔터 회사(OST 제작사, 음원 유통사)의 반복 업무를 AI로 옮기는 Loreco의 랜딩 페이지. 정적 HTML/CSS/JS 한 페이지다.

## 구조

| 경로 | 내용 |
|---|---|
| `site/` | 배포되는 파일 전부. `index.html`, `style.css`, `main.js`, `fonts/`(서브셋 글꼴과 라이선스), `vendor/`(GSAP 3.15.1 Standard no-charge, Lenis 1.3.27 MIT), `logo/` |
| `tools/build_fonts.py` | `site/index.html`·`main.js`에 쓰인 글자만 남겨 글꼴 서브셋을 만든다(pyftsubset). 문구를 바꾸면 다시 돌린다 |
| `tools/build_dots.py` | 첫 화면 점 숫자와 일별 조회 막대를 `site/index.html` 자리표시자에 채운다 |
| `tools/fonts-src/` | 원본 글꼴: Pretendard Variable, Geist Mono, Newsreader (모두 SIL OFL) |
| `tools/serve.py` | 캐시를 막는 로컬 미리보기 서버: `python3 tools/serve.py 8780 site` |
| `BRAND.md` | 로고 규칙 |

## 배포

Vercel 프로젝트 `miai-landing`(도메인 loreco.app). GitHub와 연결돼 있지 않아 푸시로는 배포되지 않는다. 레포 루트에서 `vercel --prod`. 설정은 `vercel.json`(빌드 없음, `site/`를 그대로 올림).
