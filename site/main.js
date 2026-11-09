/* loreco.app: 점진적 향상. JS가 없으면 정적 배치로 내용이 전부 보인다. */
(function () {
  'use strict';

  // 도입 상담 폼: 입력값으로 바로 보낼 수 있는 메일 한 통을 써서 메일 앱으로 넘긴다(전송 서버 없음).
  // 보내는 사람 주소는 메일 앱 계정이 쓰이므로 묻지 않는다.
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var v = function (k) { return (fd.get(k) || '').toString().trim(); };
      var name = v('name'), company = v('company'), title = v('title'), pain = v('pain');
      var interests = fd.getAll('interest').map(String).filter(function (x) { return x && x !== '기타'; });
      var who = [company, title, name].filter(Boolean).join(' ');
      var out = [];
      out.push(who ? '안녕하세요, ' + who + '입니다.' : '안녕하세요.');
      out.push('');
      out.push(interests.length ? interests.join(', ') + ' 쪽으로 Loreco 도입 상담을 받고 싶습니다.' : 'Loreco 도입 상담을 받고 싶습니다.');
      if (pain) { out.push(''); out.push('요즘 손이 가장 많이 가는 일은 이렇습니다.'); out.push(pain); }
      out.push(''); out.push('편하실 때 회신 부탁드립니다.'); out.push('감사합니다.');
      if (name) { out.push(''); out.push(name + ' 드림'); }
      var subject = 'Loreco 도입 상담 요청' + (company ? ' (' + company + ')' : '');
      window.location.href = 'mailto:contact@loreco.app?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(out.join('\n'));
    });
  }

  var html = document.documentElement;
  var motion = html.classList.contains('motion') && window.gsap && window.ScrollTrigger && window.Lenis;
  if (!motion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Lenis + ScrollTrigger
  var lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);

  var TOP = 68;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') { e.preventDefault(); lenis.scrollTo(0); return; }
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -TOP + 1, duration: 1.1 });
    });
  });

  // ── 첫 화면: 점 숫자가 한 번 모이고, 초록 점 세 개가 마지막에 뜬다 (페이지 로드 한 번)
  var grey = gsap.utils.toArray('.glyph i:not(.on)');
  var on = gsap.utils.toArray('.glyph i.on');
  if (grey.length) {
    gsap.from(grey, { opacity: 0, scale: 0.3, duration: 0.7, ease: 'power3.out', stagger: { each: 0.0022, from: 'random' } });
  }
  if (on.length) {
    gsap.from(on, { scale: 0, duration: 0.6, ease: 'back.out(2.2)', delay: 1.0, stagger: 0.16 });
    gsap.fromTo(on, { boxShadow: '0 0 0 0 rgba(21,132,79,.45)' }, { boxShadow: '0 0 0 ' + (matchMedia('(max-width: 720px)').matches ? 6 : 16) + 'px rgba(21,132,79,0)', duration: 1.3, ease: 'power2.out', delay: 1.35, stagger: 0.16, onComplete: function () { gsap.set(on, { clearProps: 'boxShadow' }); } });
  }

  // ── 고정 장면: 스크롤 진행도 0→1을 타임라인에 매핑
  var mobileFlow = matchMedia('(max-width: 860px)').matches;

  document.querySelectorAll('.track').forEach(function (track) {
    var type = track.dataset.scene;
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: mobileFlow ? 'top 70%' : 'top top',
        end: mobileFlow ? 'bottom 60%' : 'bottom bottom',
        scrub: 0.5
      }
    });
    tl.to({}, { duration: 0.001 }, 1); // 전체 길이를 1로 고정

    var center = track.querySelector('.center');
    if (center) {
      tl.fromTo(center, { y: 36, scale: 0.965, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.16, ease: 'power2.out' }, 0.02);
    }

    track.querySelectorAll('.loose').forEach(function (el) {
      var at = parseFloat(el.dataset.at || '0.2');
      if (mobileFlow) {
        // 모바일은 흐림 없이 흐름 배치. 보이는 카드만 살짝 떠오른다.
        tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, Math.min(at, 0.5));
        return;
      }
      tl.to(el, { filter: 'blur(0px)', opacity: 1, duration: 0.1, ease: 'power2.out' }, at)
        .to(el, { filter: 'blur(6px)', opacity: 0.38, duration: 0.12, ease: 'power2.in' }, Math.min(at + 0.2, 0.95));
    });

    if (type === 'bars') {
      var spike = track.querySelector('.bars i.on');
      var afters = track.querySelectorAll('.bars i.after');
      tl.fromTo(spike, { scaleY: 0.22 }, { scaleY: 1, duration: 0.3, ease: 'power3.out' }, 0.1);
      afters.forEach(function (b, i) {
        tl.fromTo(b, { scaleY: 0.5 }, { scaleY: 1, duration: 0.16, ease: 'power2.out' }, 0.3 + i * 0.05);
      });
      tl.fromTo(track.querySelector('.spike-tag'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.36);
      tl.fromTo(track.querySelector('.spike-pill'), { opacity: 0, y: 10, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.12, ease: 'power2.out' }, 0.62);
    }

    if (type === 'split') {
      var node = track.querySelector('.node');
      tl.fromTo(node, { y: 20, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.12, ease: 'power2.out' }, 0.02);
      tl.fromTo(track.querySelector('.wire-l'), { scaleX: 0, transformOrigin: 'right center' }, { scaleX: 1, duration: 0.1 }, 0.12);
      tl.fromTo(track.querySelector('.wire-r'), { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.1 }, 0.22);
      track.querySelectorAll('.row').forEach(function (row) {
        var at = parseFloat(row.dataset.at || '0.3');
        var own = row.closest('.split-own');
        tl.fromTo(row, { opacity: 0, x: own ? -14 : 14 }, { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' }, at);
      });
    }
  });

  // ── 오른쪽 진행 눈금
  var rail = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
  document.querySelectorAll('[data-rail-target]').forEach(function (sec) {
    var key = sec.dataset.railTarget;
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: function (self) {
        if (!self.isActive) return;
        rail.forEach(function (a) { a.classList.toggle('is-on', a.dataset.rail === key); });
      }
    });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();


/* 도입 상담 버튼(콘셉트 B "spark"): 선을 버튼 실제 폭에 맞춰 그린다. 모양은 늘 같다.
   JS가 없으면 HTML에 적힌 180px 기준 정적 선이 가로로만 늘어난다. 첫 화면 버튼은 로드 때 한 번 그려지는 등장(.is-in)만 추가. */
(function () {
  'use strict';
  var H = 50, Y0 = 38, STEP = 7;
  // 선 하나 = 물결 + 상승. 물결은 왼쪽 끝에서 글자 시작점까지 서서히 나타나고, 상승과 끊김 없이 이어진다.
  // 물결은 진폭 1px, 주기 14px로 일정하고, 상승 직전 16px에서 잦아들어 수평으로 상승 곡선에 이어진다. ?line=flat 이면 평탄한 선.
  var MODE = /[?&]line=flat/.test(location.search) ? 'flat' : 'wave', A = 1.0, P = 14, T = 16;
  function wave(xs) {
    if (MODE === 'flat') return 'M-2 ' + Y0 + ' L' + xs + ' ' + Y0;
    var d = 'M-2 ' + Y0, x, e, y;
    for (x = -1; x <= xs; x++) {
      e = Math.min(1, Math.max(0, (xs - x) / T)); e = e * e * (3 - 2 * e);
      y = Y0 - A * e * Math.sin(2 * Math.PI * (x + 2) / P);
      d += ' L' + x + ' ' + y.toFixed(2);
    }
    return d;
  }
  function spike(W, xs, peakY) {
    return ' C' + (xs + 7) + ' ' + Y0 + ' ' + (W - 27) + ' ' + (peakY + 4) + ' ' + (W - 24) + ' ' + peakY;
  }
  function fit(btn) {
    var r = btn.getBoundingClientRect(), W = Math.round(r.width), svg = btn.querySelector('.sp-line');
    if (!svg || !W || btn.__spW === W) return;
    btn.__spW = W;
    var xs = W - 24 - 14, t = btn.querySelector('.sp-t'), lx = t ? Math.max(8, Math.round(t.getBoundingClientRect().left - r.left)) : 22;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var g = svg.querySelector('linearGradient'); g.setAttribute('x2', W);
    var st = g.querySelectorAll('stop'), off = [0, lx / W, (xs - 4) / W, (xs + 7) / W, (W - 24) / W];
    for (var i = 0; i < st.length; i++) st[i].setAttribute('offset', Math.min(1, off[i]).toFixed(3));
    var w = wave(xs);
    svg.querySelector('.sp-lo').setAttribute('d', w + spike(W, xs, 25));
    svg.querySelector('.sp-hi').setAttribute('d', w + spike(W, xs, 17));
  }
  var btns = Array.prototype.slice.call(document.querySelectorAll('.btn-sp'));
  if (!btns.length) return;
  btns.forEach(fit);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { btns.forEach(fit); });
    btns.forEach(function (b) { ro.observe(b); });
  } else {
    window.addEventListener('resize', function () { btns.forEach(fit); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { btns.forEach(fit); });

  // 첫 화면 버튼 등장 1회 (motion일 때만). hover나 focus가 먼저 오면 등장은 접는다.
  var hero = document.querySelector('.btn-sp-hero');
  if (!hero || !document.documentElement.classList.contains('motion')) return;
  hero.classList.add('is-in');
  var done = false;
  function end() { if (done) return; done = true; hero.classList.remove('is-in'); }
  hero.addEventListener('animationend', function (e) { if (e.animationName === 'sp-ping') end(); });
  hero.addEventListener('pointerenter', end);
  hero.addEventListener('focus', end);
  setTimeout(end, 3000);
})();
