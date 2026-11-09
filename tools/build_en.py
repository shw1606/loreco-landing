"""영어판 생성: python3 tools/build_en.py → site/en/index.html
한국어판(site/index.html)을 원본으로 문구만 바꾼다. 한국어판을 고치면 이 스크립트를 다시 돌리고, 새 문구는 아래 표에 더한다."""
import pathlib, re, sys
SITE = pathlib.Path(__file__).resolve().parent.parent / "site"
s = (SITE / "index.html").read_text(encoding="utf-8")

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count:
        sys.exit(f"[{n}≠{count}] {old[:90]}")
    s = s.replace(old, new)

# 머리
rep('<html lang="ko">', '<html lang="en">')
rep('<title>Loreco | 엔터 회사의 반복 업무를 AI로 옮기는 AX</title>', '<title>Loreco | Bringing intelligence to how entertainment runs</title>')
s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="AI for the repetitive work at OST producers and music distributors: settlement reports, artist signal alerts and track review. We move the steps people do by hand to AI, on site.">', s, count=1)
# 영어판은 /en 아래에 있으므로 자산 경로를 루트 기준으로
s = re.sub(r'(href|src)="(?!https?:|#|/|mailto:)(vendor/|logo/|fonts/|style\.css|main\.js)', r'\1="/\2', s)
# 언어 전환: 영어판에서는 EN이 현재
rep('<a href="/" aria-current="page" lang="ko">KO</a><a href="/en" lang="en">EN</a>', '<a href="/" lang="ko">KO</a><a href="/en" aria-current="page" lang="en">EN</a>')
rep('<div class="lang" aria-label="언어">', '<div class="lang" aria-label="Language">')

T = [
 # GNB, 진행 눈금
 ('aria-label="Loreco 처음으로"', 'aria-label="Loreco home"'),
 ('<nav class="top-nav" aria-label="섹션">', '<nav class="top-nav" aria-label="Sections">'),
 ('<a href="#signal">신호 알림</a>', '<a href="#signal">Signals</a>'),
 ('<a href="#settle">정산</a>', '<a href="#settle">Settlement</a>'),
 ('<a href="#review">검수</a>', '<a href="#review">Review</a>'),
 ('<a href="#how">일하는 방식</a>', '<a href="#how">How we work</a>'),
 ('rel="noopener">가사 검색<svg', 'rel="noopener">Lyrics search<svg'),
 ('<a class="btn btn-ink btn-top" href="#contact">도입 상담</a>', '<a class="btn btn-ink btn-top" href="#contact">Book a demo</a>'),
 ('<nav class="rail" aria-label="페이지 위치">', '<nav class="rail" aria-label="Page position">'),
 ('<span class="vh">처음</span>', '<span class="vh">Top</span>'),
 ('<span class="vh">튄 하루</span>', '<span class="vh">The spike</span>'),
 ('<span class="vh">알림 카드</span>', '<span class="vh">Alert</span>'),
 ('<span class="vh">직접 집행과 바깥 반응</span>', '<span class="vh">Paid and organic</span>'),
 ('<span class="vh">정산</span>', '<span class="vh">Settlement</span>'),
 ('<span class="vh">검수</span>', '<span class="vh">Review</span>'),
 ('<span class="vh">일하는 방식</span>', '<span class="vh">How we work</span>'),
 ('<span class="vh">도입 상담</span>', '<span class="vh">Book a demo</span>'),
 # 첫 화면
 ('<span class="h1-thin">매일 쌓이기만 하는 조회수</span>', '<span class="h1-thin">Views that just pile up every day</span>'),
 ('<span class="h1-ink">튀기 시작하면 가장 먼저 알 수 있도록</span>', '<span class="h1-ink">Know the moment a track starts to spike</span>'),
 ('<p class="hero-p">유통하는 곡을 매일 유튜브와 쇼츠 공개 데이터로 보고, 평소보다 크게 튄 곡을 대시보드에서 바로 확인할 수 있어요. 정산 리포트 맞추기와 음원 검수도 같은 방식으로, 사람이 손대던 단계를 하나씩 AI로 옮겨요.</p>',
  '<p class="hero-p">We watch the tracks you distribute every day across public YouTube and Shorts data, so a track spiking well above normal shows up on your dashboard right away. Settlement reports and track review work the same way, moving the steps people do by hand to AI, one at a time.</p>'),
 ('<span class="sp-t">도입 상담 신청</span>', '<span class="sp-t">Book a demo</span>', 2),
 ('<p class="small hero-note">지금 먼저 보이는 문제에서 바로 시작</p>', '<p class="small hero-note">Start with the problem you see first</p>'),
 ('aria-label="점으로 만든 숫자 7,476,768. 회색 점 사이에 초록 점 네 개가 있다"', 'aria-label="The number 7,476,768 drawn in dots, with four green dots among the gray ones"'),
 ('<p>공개 YouTube 데이터로 직접 확인한 사례예요. 10년도 더 된 드라마 OST 한 곡을 구독자 16,700명인 채널 한 곳이 2026년 7~9월에 쇼츠 4편의 배경음악으로 썼고, 네 편 조회수를 합치면 7,476,768회예요. 같은 곡의 공식 음원 영상 조회수는 1,719,466회예요. 2026년 11월 8일 기준이에요.</p>',
  '<p>A real case from public YouTube data. A channel with 16,700 subscribers used a drama OST released more than ten years ago as background music in four Shorts between July and September 2026, and those four Shorts drew 7,476,768 views in total. The official audio video of the same track has 1,719,466 views. As of November&nbsp;8,&nbsp;2026.</p>'),
 ('</i>색이 있는 점 네 개가 그 쇼츠 네 편</p>', '</i>The four colored dots are those four Shorts</p>'),
 # 신호 1
 ('<h2 class="h2">차트 상위에는 아직 없는 곡,<br>그 곡이 크게 튄 하루 하나</h2>', '<h2 class="h2">A track not yet on the charts,<br>and the one day it spiked</h2>'),
 ('<p class="lead">차트는 상위만 보여요. 그 아래에서 뜨기 시작하는 곡은 늦게 알게 되고, 반응은 쇼츠와 릴스에서 먼저 생기는 경우가 많아요.</p>', '<p class="lead">Charts only show the top. Tracks starting to climb below that get noticed late, and the reaction often shows up first on Shorts and Reels.</p>'),
 ('aria-label="한 곡의 최근 30일 일별 조회 막대그래프. 11월 3일 막대 하나만 평소보다 훨씬 높다"', 'aria-label="Daily views for one track over the last 30 days. Only the November 3 bar is far above normal"'),
 ('곡 ‹●●●● (Drama OST Part 2)›', 'Track ‹●●●● (Drama OST Part 2)›', 3),
 ('<span class="small chart-sub">최근 30일 일별 조회</span>', '<span class="small chart-sub">Daily views, last 30 days</span>'),
 ('<span>10월 5일</span><span>10월 19일</span><span>11월 4일</span>', '<span>Oct 5</span><span>Oct 19</span><span>Nov 4</span>'),
 ('<p class="spike-date mono">11월 3일 (화)</p>', '<p class="spike-date mono">Tue, Nov 3</p>'),
 ('하루 조회 평소의 3.4배', '3.4× a normal day', 2),
 ('<span>대시보드에 바로 표시</span>', '<span>Shown on the dashboard</span>'),
 ('<li>2026년 11월 4일부터 공개 YouTube 데이터로 시험 운영</li>', '<li>Pilot on public YouTube data since November&nbsp;4,&nbsp;2026</li>'),
 ('<li>매일 09:10 스냅샷</li>', '<li>Daily snapshot at 09:10 KST</li>'),
 ('<li>매주 월요일 06:00 쇼츠 스캔</li>', '<li>Shorts scan every Monday at 06:00 KST</li>'),
 ('<p class="body">그래서 유통하는 아티스트와 곡을 매일 유튜브와 쇼츠 공개 데이터로 봐요. 평소보다 크게 튄 곡과 그 곡을 새로 쓴 쇼츠를 찾아 두고, 지난 곡(구작)도 출시 직후와 같은 기준으로 매일 봐요.</p>',
  '<p class="body">So we check your artists and tracks every day on public YouTube and Shorts data. We catch tracks that spike well above normal and the Shorts that newly use them, and hold older catalog to the same daily bar as new releases.</p>'),
 # 신호 2
 ('<h2 class="h2">대시보드에서 바로 보는<br>알림 한 장</h2>', '<h2 class="h2">One alert,<br>right on your dashboard</h2>'),
 ('<p class="lead">평소보다 크게 튄 곡과 그 곡을 새로 쓴 쇼츠가 대시보드에 바로 올라와요. 어떤 쇼츠에서 반응이 났는지도 같은 화면에서 확인할 수 있어요.</p>', '<p class="lead">Tracks that spike above normal, and the Shorts that newly use them, land on your dashboard right away. You can see which Shorts drove the reaction on the same screen.</p>'),
 ('<span>어제</span>', '<span>Yesterday</span>', 7), ('<span>2일 전</span>', '<span>2 days ago</span>', 2), ('<span>3일 전</span>', '<span>3 days ago</span>', 1),
 ('조회 41.2만', '412K views', 2), ('조회 12.8만', '128K views', 2), ('조회 9.1만', '91K views', 2), ('조회 203만', '2.03M views', 2),
 ('조회 6.4만', '64K views', 1), ('조회 2.2만', '22K views', 1), ('조회 3.1만', '31K views', 1), ('조회 1.7만', '17K views', 1),
 ('aria-label="알림 카드"', 'aria-label="Alert card"'),
 ('<span>알림</span><span>11월 3일 (화) 09:12</span>', '<span>Alert</span><span>Tue, Nov 3, 09:12</span>'),
 ('<span>가창자 ●●●</span><span>2019년 발매</span>', '<span>Vocalist ●●●</span><span>Released 2019</span>'),
 ('<p class="alert-main">어제 이 곡을 쓴 쇼츠 12편이 새로 올라왔어요</p>', '<p class="alert-main">12 new Shorts used this track yesterday</p>'),
 ('<span class="nw">직접 집행 0편</span><span class="nw">바깥 반응 12편</span>', '<span class="nw">0 paid</span><span class="nw">12 organic</span>'),
 ('<span>09:12 감지</span>', '<span>Detected 09:12</span>'), ('<span>대시보드에 표시</span>', '<span>Shown on dashboard</span>'),
 ('>쇼츠 12편 보기</a>', '>View 12 Shorts</a>'),
 # 신호 3
 ('<h2 class="h2">직접 집행한 반응과<br>바깥에서 생긴 반응은 따로</h2>', '<h2 class="h2">Paid and organic reactions,<br>kept apart</h2>'),
 ('<p class="lead">회사가 집행한 채널과 바깥 채널을 나눠서 보여요. 둘을 구분해야 판단에 쓸 수 있어요.</p>', '<p class="lead">Channels you paid for and outside channels are shown separately. You need to tell them apart before you can act on it.</p>'),
 ('직접 집행<span class="small split-n">2편</span>', 'Paid<span class="small split-n">2</span>'),
 ('바깥 반응<span class="small split-n">12편</span>', 'Organic<span class="small split-n">12</span>'),
 ('<span class="thumb-s own">공식</span>', '<span class="thumb-s own">OF</span>'), ('<span class="thumb-s own">광고</span>', '<span class="thumb-s own">AD</span>'),
 ('<span class="row-t">공식 채널 쇼츠</span>', '<span class="row-t">Official channel Short</span>'), ('<span class="row-t">광고 집행 릴스</span>', '<span class="row-t">Paid Reel</span>'),
 ('<span>10월 28일</span>', '<span>Oct 28</span>'), ('<span>10월 30일</span>', '<span>Oct 30</span>'),
 ('<p class="small node-sub">어제 새로 쓴 쇼츠 12편</p>', '<p class="small node-sub">12 new Shorts yesterday</p>'),
 ('<span class="row-sub">외 8편</span>', '<span class="row-sub">+8 more</span>'),
 # 정산
 ('<h2 class="h2">형식이 제각각인 정산 리포트,<br>표 하나로</h2>', '<h2 class="h2">Settlement reports in any format,<br>lined up in one table</h2>'),
 ('<p class="lead">플랫폼마다 정산 리포트 형식이 달라서 그대로는 못 쓰고 사람이 손을 봐야 해요. 정산 데이터는 익일이나 익월에 들어오고, 정확한 매출은 1~2개월 뒤에야 나와요.</p>', '<p class="lead">Every platform formats its settlement report differently, so someone has to rework it by hand. The data arrives the next day or the next month, and exact revenue only lands one to two months later.</p>'),
 ('<p class="small rep-name">표기가 달라도 같은 곡으로</p>', '<p class="small rep-name">Different spellings, same track</p>'),
 ('<p class="match-res">한 곡으로 묶임</p>', '<p class="match-res">Merged into one track</p>'),
 ('aria-label="플랫폼 3곳을 합친 정산 표"', 'aria-label="Settlement table merged from three platforms"'),
 ('<span>2026년 10월</span><span>플랫폼 3곳 합침</span>', '<span>October 2026</span><span>3 platforms merged</span>'),
 ('<th>곡</th><th>아티스트</th><th class="col-pf">플랫폼</th><th class="num col-plays">재생</th><th class="num">정산금</th>', '<th>Track</th><th>Artist</th><th class="col-pf">Platforms</th><th class="num col-plays">Plays</th><th class="num">Payout</th>'),
 ('<td>가창자 A</td><td class="col-pf">', '<td>Vocalist A</td><td class="col-pf">', 2), ('<td>가창자 B</td><td class="col-pf">', '<td>Vocalist B</td><td class="col-pf">'), ('<td>가창자 C</td><td class="col-pf">', '<td>Vocalist C</td><td class="col-pf">'),
 ('<span class="chip">예외</span>', '<span class="chip">Exception</span>'),
 ('<span>합계 대사 일치</span>', '<span>Totals reconciled</span>'), ('<span>사람 결과와 차이 0건</span>', '<span>0 differences from manual</span>'), ('<span>예외 1건 확인 요청</span>', '<span>1 exception sent for review</span>'),
 ('<p class="body">플랫폼별 리포트를 받아 형식 맞추기, 곡과 아티스트 맞추기, 합계 대사를 자동으로 돌려요. 처음에는 사람 결과와 나란히 놓고 차이를 보여 드려요. 규칙으로 되는 건 규칙으로 처리하고, AI는 예외에만 써요.</p>',
  '<p class="body">We take each platform\'s report and automatically normalize the format, match tracks and artists, and reconcile the totals. At first we show the results side by side with your team\'s numbers. Rules handle what rules can, and AI handles only the exceptions.</p>'),
 # 검수
 ('<h2 class="h2">검수 대기열은<br>사람이 볼 순서대로</h2>', '<h2 class="h2">A review queue,<br>in the order people should check</h2>'),
 ('<p class="lead">유통사에서는 정산보다 검수 업무량이 훨씬 많아요. 음원을 등록할 때 메타데이터, 가사, 길이, 출처, 19금 여부를 사람이 보고, AI로 만든 음원이 들어오면서 기준이 더 늘었어요.</p>', '<p class="lead">At distributors, review takes far more work than settlement. People check metadata, lyrics, length, source and explicit flags on every upload, and AI-generated tracks have added more criteria.</p>'),
 ('<span>등록 요청</span>', '<span>Upload request</span>', 4),
 ('<span class="chip warn">1분 미만 (0:48)</span>', '<span class="chip warn">Under 1 min (0:48)</span>'), ('<span class="chip warn">출처 미기재</span>', '<span class="chip warn">No source listed</span>'),
 ('<span class="chip warn">가사 없음</span>', '<span class="chip warn">No lyrics</span>'), ('<span class="chip warn">19금 표기 확인</span>', '<span class="chip warn">Check explicit flag</span>'),
 ('<span class="chip warn">AI 생성 의심</span>', '<span class="chip warn">Likely AI-generated</span>'),
 ('<span class="chip">메타데이터</span><span class="chip">가사</span><span class="chip">길이</span><span class="chip">통과</span>', '<span class="chip">Metadata</span><span class="chip">Lyrics</span><span class="chip">Length</span><span class="chip">Passed</span>'),
 ('aria-label="검수 대기열"', 'aria-label="Review queue"'), ('<span>검수 대기열</span><span>오늘 14건</span>', '<span>Review queue</span><span>14 today</span>'),
 ('<span class="q-st">사람 확인</span>', '<span class="q-st">Check</span>', 3), ('<span class="q-st">통과</span>', '<span class="q-st">Passed</span>', 2),
 ('<span class="q-why small">1분 미만, 출처 미기재</span>', '<span class="q-why small">Under 1 min, no source</span>'), ('<span class="q-why small">가사 없음, 19금 표기</span>', '<span class="q-why small">No lyrics, explicit flag</span>'),
 ('<span class="q-why small">AI 생성 가능성, 활동 이력 없음</span>', '<span class="q-why small">Likely AI, no artist history</span>'), ('<span class="q-why small">메타데이터, 가사, 길이, 출처</span>', '<span class="q-why small">Metadata, lyrics, length, source</span>', 2),
 ('<span>규칙으로 먼저 거름</span>', '<span>Rules filter first</span>'), ('<span>사람 확인 3건이 맨 위</span>', '<span>3 to check, on top</span>'),
 ('<p class="body">회사가 이미 쓰는 기준을 규칙으로 옮겨 먼저 걸러 내고, AI로 만든 것으로 보이는 음원까지 사람이 볼 순서대로 올려요.</p>', '<p class="body">We turn the criteria you already use into rules that filter first, and move tracks that look AI-generated up the queue for people to check.</p>'),
 # 다음 단계
 ('<h2 class="h3" id="next-h">다음 단계로 준비하는<br>아티스트와 OST 가창자 발굴</h2>', '<h2 class="h3" id="next-h">Next, finding new artists<br>and OST vocalists</h2>'),
 ('<p class="body">신인과 OST 가창자 발굴은 지금 사람이 해요. 인스타그램 DM, 광고, 공연장 방문으로요. 성공한 아티스트의 초기 신호와 비슷하게 움직이는 아티스트를 먼저 찾는 쪽으로 넓혀 가요.</p>', '<p class="body">Finding new artists and OST vocalists is still done by hand, through Instagram DMs, ads and live shows. We are extending to spot artists whose early signals move like those of artists who made it.</p>'),
 # 일하는 방식
 ('<h2 class="h2">담당자 옆에서,<br>지난달 실제 자료로</h2>', '<h2 class="h2">Next to your team,<br>on last month\'s real data</h2>'),
 ('<p class="lead">회사 안에 깊이 들어가서, 거기서 생긴 문제를 직접 푸는 방식(FDE)이에요.</p>', '<p class="lead">We work deep inside your company and fix the problems we find there, hands-on. This is forward deployed engineering (FDE).</p>'),
 ('<h3 class="step-h">실무 흐름을 바닥까지 봐요</h3>', '<h3 class="step-h">See the workflow down to the detail</h3>'), ('<p>담당자 옆에서 실제 파일과 화면으로 봐요.</p>', '<p>We sit with your team and look at the actual files and screens.</p>'),
 ('<h3 class="step-h">사람이 손대던 단계 하나를 골라요</h3>', '<h3 class="step-h">Pick one manual step</h3>'), ('<p>고르는 건 회사예요.</p>', '<p>You choose which one.</p>'),
 ('<h3 class="step-h">지난달 실제 자료로 돌려 봐요</h3>', '<h3 class="step-h">Run it on last month\'s real data</h3>'), ('<p>사람 결과와 나란히 놓고 비교해요.</p>', '<p>We compare it side by side with your team\'s results.</p>'),
 ('<h3 class="step-h">효과가 확인되면 다음 업무로 넓혀요</h3>', '<h3 class="step-h">Once it works, move to the next task</h3>'), ('<p>정산에서 시작했으면 검수로, 검수에서 시작했으면 신호 알림으로요.</p>', '<p>From settlement to review, or from review to signal alerts.</p>'),
 ('<p class="small nda-h">자료 원칙</p>', '<p class="small nda-h">Data policy</p>'),
 ('<p>자료를 보기 전에 NDA를 먼저 맺어요. 받은 자료는 외부 저장소에 올리지 않고, 끝나면 파기해요.</p>', '<p>We sign an NDA before we see any data. Nothing goes to outside storage, and everything is deleted when we are done.</p>'),
 # 도입 상담
 ('<h2 class="h2">도입 상담</h2>', '<h2 class="h2">Book a demo</h2>'),
 ('<span>이름</span><input', '<span>Name</span><input'), ('<span>회사</span><input', '<span>Company</span><input'), ('<span>직책</span><input', '<span>Title</span><input'),
 ('<legend>관심 업무</legend>', '<legend>Areas of interest</legend>'),
 ('value="정산 업무 자동화"><span>정산 업무 자동화</span>', 'value="Settlement automation"><span>Settlement automation</span>'),
 ('value="아티스트 신호 알림"><span>아티스트 신호 알림</span>', 'value="Artist signal alerts"><span>Artist signal alerts</span>'),
 ('value="음원 검수"><span>음원 검수</span>', 'value="Track review"><span>Track review</span>'),
 ('value="아티스트 발굴"><span>아티스트 발굴</span>', 'value="Artist discovery"><span>Artist discovery</span>'),
 ('value="기타"><span>기타</span>', 'value="Other"><span>Other</span>'),
 ('<span>지금 손이 가장 많이 가는 업무</span>', '<span>What takes the most manual work right now</span>'),
 ('placeholder="예: 매달 플랫폼 3곳 정산 파일 맞추기"', 'placeholder="e.g. reconciling monthly reports from 3 platforms"'),
 # 푸터
 ('<span class="foot-grey">매일 쌓이기만 하는 조회수</span><br><span>튀기 시작하면 가장 먼저 알 수 있도록</span>', '<span class="foot-grey">Views that just pile up every day</span><br><span>Know the moment a track starts to spike</span>'),
 ('<p class="small foot-h">연락</p>', '<p class="small foot-h">Contact</p>'), ('<p class="small foot-h">서비스</p>', '<p class="small foot-h">Service</p>'), ('<p class="small foot-h">문서</p>', '<p class="small foot-h">Legal</p>'),
 ('rel="noopener">가사 검색</a>', 'rel="noopener">Lyrics search</a>'),
 ('>개인정보처리방침</a>', '>Privacy policy</a>'), ('>이용약관</a>', '>Terms</a>'),
]
for t in T:
    rep(*t)
# 주석
for k, e in {"첫 화면": "Hero", "신호 1 튄 하루": "Signal 1: the spike", "신호 2 알림 카드": "Signal 2: alert", "주변: 그 곡을 쓴 쇼츠들": "Around: Shorts using the track", "가운데: 알림 카드": "Center: alert card", "신호 3 두 갈래": "Signal 3: paid and organic", "정산": "Settlement", "검수": "Review", "다음 단계": "Next", "일하는 방식": "How we work", "도입 상담": "Book a demo"}.items():
    s = s.replace(f"<!-- {k} -->", f"<!-- {e} -->")
(SITE / "en").mkdir(exist_ok=True)
(SITE / "en" / "index.html").write_text(s, encoding="utf-8")
# 남은 한글: 한국 플랫폼 정산 리포트 카드(일부러 한국어)만 남아야 한다
body = re.sub(r"<!--.*?-->", "", s, flags=re.S)
left = sorted(set(re.findall(r"[가-힣][가-힣0-9 _.,()]*", re.sub(r"<[^>]+>", "\n", body))))
print("remaining Korean:", left)
