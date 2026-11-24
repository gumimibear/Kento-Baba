/* case.js — builds case.html?id=… from content.js (layouts: research / event) */
(function () {
  'use strict';
  var S = window.SITE, KB = window.KB;
  var t = KB.t, ui = KB.ui, esc = KB.esc, L = KB.L;
  var K = KB.caseById(KB.param('id'));
  if (!K || !K.page) K = S.cases.filter(function (c) { return c.page; })[0];
  var P = K.page, C = KB.chapter(K.chapter);  // null for personal projects
  if ((P.layout === 'personal' || P.layout === 'photo') && KB.personal) { KB.personal(K); return; }
  var backHref = C ? KB.chapterHref(C.id) : 'index.html#archive';
  var tagLine = KB.L((S.chapterTags || {})[K.chapter]);
  // hover colours: blue, mint, violet, amber, pink (text colour on top of each)
  var TINT = [['70,86,220', '#FFFFFF'], ['140,255,193', '#13121C'], ['91,63,217', '#FFFFFF'], ['242,166,90', '#13121C'], ['236,92,170', '#13121C']];
  var STAT = [TINT[1], TINT[2], TINT[0], TINT[3]];
  var CARD = [TINT[1], TINT[2], TINT[0]];
  document.title = 'Kento Baba — ' + L(K.title);

  /* ---- header ---- */
  var hdr = P.header || {};
  var hero =
    '<section class="dhero cs-hero">' +
      '<canvas id="head-cv" aria-hidden="true"></canvas>' +
      '<div class="in wrap-read">' +
        '<header class="topbar"><span style="display:flex;gap:14px;align-items:baseline"><a class="logo" href="index.html" aria-label="kb — home"><b>kb</b></a>' +
          '<a href="' + backHref + '" style="text-decoration:none"><span class="sub-l">' + (C ? '← ' + esc(C.num) + ' · ' + esc(L(C.title).toUpperCase()) : ui('allWork')) + '</span></a></span>' +
          '<span style="display:flex;align-items:center;gap:16px"><span style="color:var(--soft)">EXP ' + KB.expLabel() + ' / 36</span>' + KB.langBtn() + '</span></header>' +
        '<div class="exit" style="max-width:600px;display:flex;flex-direction:column;gap:16px">' +
          (hdr.badge ? '<span class="cs-live"><i aria-hidden="true"></i>' + t(hdr.badge) + '</span>' : '') +
          '<span class="kick kick-a">' + (C ? ui('caseKick', { n: C.num, code: K.code || '', cat: KB.cat(K.category) }) : esc(tagLine)) + '</span>' +
          '<h1 class="cs-title">' + t(P.title || K.title) + '</h1>' +
          '<p class="cs-hook">' + t(P.hook || K.line) + '</p>' +
        '</div>' +
      '</div>' +
    '</section>';

  /* ---- optional ticker band under the header ---- */
  var tick = (P.ticker || []).length ? (function () {
    var row = P.ticker.map(function (x) { return '<span>' + t(x) + '</span><i>✦</i>'; }).join('');
    return '<section class="cs-tick" aria-hidden="true"><div class="mq">' + row + row + '</div></section>';
  })() : '';

  /* ---- facts + numbers ---- */
  var details = (P.details || []).length
    ? '<dl class="dl wrap-read dev">' + P.details.map(function (d) { return '<div><dt>' + t(d.label) + '</dt><dd>' + t(d.value) + '</dd></div>'; }).join('') + '</dl>' : '';
  var stats = (P.stats || []).length
    ? '<section class="wrap-read stats stag" aria-label="In numbers">' + P.stats.map(function (s, i) {
        var c = STAT[i % STAT.length];
        return '<div class="rec stat" style="--c:' + c[0] + ';--fg:' + c[1] + '"><span class="num">' + t(s.value) + '</span><span class="tag">' + t(s.label) + '</span></div>';
      }).join('') + '</section>' : '';

  /* ---- film roll ---- */
  var film = P.noFilm ? '' :
    '<section class="filmsec dev">' +
      '<div class="wrap-read" style="margin-bottom:36px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:8px 40px"><span class="kick kick-amber">' + t(P.filmLabel) + '</span>' + KB.rollHint() + '</div>' +
      KB.rollHTML(KB.frames(P.film, { count: 6, placeholders: P.filmPlaceholders })) +
    '</section>';

  /* ---- story sections ---- */
  var lbItems = [];
  function body(s) {
    switch (s.type) {
      case 'list':
        return '<ul>' + (s.items || []).map(function (x, i) { return '<li class="li"><span class="m">' + KB.pad(i + 1) + '</span>' + t(x) + '</li>'; }).join('') + '</ul>';
      case 'steps':
        return '<ol class="steps">' + (s.items || []).map(function (x, i) { return '<li class="li"><span class="m">' + KB.pad(i + 1) + '</span><span class="st">' + t(x.title) + '</span><span class="sx">' + t(x.text) + '</span></li>'; }).join('') + '</ol>';
      case 'cards':
        return '<div class="grid3">' + (s.cards || []).map(function (x, i) {
          var c = CARD[i % CARD.length];
          return '<div class="rec" style="--c:' + c[0] + ';--fg:' + c[1] + '"><span class="tag">' + t(x.tag) + '</span><span class="tx">' + t(x.text) + '</span></div>';
        }).join('') + '</div>';
      case 'reel':
        var lbl = '<span class="lb">' + t(s.label) + '</span><span class="rc">' + ui('rec') + '</span>';
        if (s.video) return '<div class="reel"><video controls playsinline preload="metadata" src="' + esc(s.video) + '"' + (s.poster ? ' poster="' + esc(s.poster) + '"' : '') + '></video></div>';
        return '<div class="reel" role="img" aria-label="' + t(s.label) + '"><span class="play"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EEEBF5" stroke-width="1.5" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>' + lbl + '</div>';
      case 'partners':
        return '<div class="pw">' + (s.partners || []).map(function (x, i) {
          var c = CARD[i % CARD.length];
          return '<div class="rec pt" style="--c:' + c[0] + ';--fg:' + c[1] + '">' + (x.logo ? '<img src="' + esc(x.logo) + '" alt="' + t(x.name) + '">' : '<span class="pn">' + t(x.name) + '</span>') + '<span class="tag">' + t(x.type) + '</span></div>';
        }).join('') + '</div>' + (s.note ? '<p class="pw-note">' + t(s.note) + '</p>' : '');
      case 'feed':
        var PLAYI = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="#fff"/></svg>';
        var avatar = esc(s.avatar || String(s.handle || '').replace('@', '').slice(0, 2).toUpperCase());
        return '<div class="ig"><div class="ig-top"><span class="ig-av">' + avatar + '</span><span class="ig-h">' + esc(s.handle || '') + '</span>' +
          (s.link ? '<a class="ig-link" href="' + esc(s.link) + '" target="_blank" rel="noopener">' + esc(KB.L({ en: 'VIEW ON INSTAGRAM', ja: 'Instagramで見る' })) + ' ↗</a>' : '') + '</div>' +
          '<div class="ig-grid">' + (s.posts || []).map(function (x, i) {
            var li = lbItems.length; lbItems.push({ src: x.src, video: x.video, cap: L(x.caption), stat: x.stat, reel: x.type === 'reel' });
            return '<button type="button" class="ig-tile' + (x.type === 'reel' ? ' is-reel' : '') + '" data-lb="' + li + '" style="--t:' + ['140,255,193', '176,124,255', '98,120,255', '242,166,90'][i % 4] + '" aria-label="' + esc(KB.L({ en: 'Open post ', ja: '投稿を開く ' }) + (i + 1)) + '">' +
              (x.src ? '<img src="' + esc(x.src) + '" alt="" loading="lazy">' : '<span class="ph">[ ' + (x.type === 'reel' ? 'REEL' : 'POST') + ' ' + KB.pad(i + 1) + ' ]</span>') +
              (x.type === 'reel' ? '<span class="ig-play">' + PLAYI + '</span>' : '') +
              '<span class="ig-stat">' + esc(x.stat || '') + '</span></button>';
          }).join('') + '</div></div>';
      case 'phones':
        return '<div class="phs">' + (s.reels || []).map(function (x, i) {
          return '<figure class="phn"><div class="phn-b"><div class="phn-s" style="--t:' + ['176,124,255', '140,255,193', '242,166,90'][i % 3] + '">' +
            (x.video ? '<video muted loop playsinline preload="metadata" src="' + esc(x.video) + '"' + (x.poster ? ' poster="' + esc(x.poster) + '"' : '') + '></video>' : '<span class="ph">[ REEL ' + KB.pad(i + 1) + ' ]</span>') +
            '<span class="phn-ui"><i>♥</i><i>●</i><i>➤</i></span></div></div>' +
            '<figcaption><span>' + t(x.caption) + '</span><span class="m">' + esc(x.stat || '') + '</span></figcaption></figure>';
        }).join('') + '</div>';
      case 'metric':
        var after = 100 + (+s.value || 0);
        return '<div class="mt"><div class="mt-big"><span class="mt-n" data-to="' + (+s.value || 0) + '" data-pre="' + esc(s.prefix || '') + '" data-suf="' + esc(s.suffix || '') + '">' + esc((s.prefix || '') + s.value + (s.suffix || '')) + '</span><span class="mt-l">' + t(s.label) + '</span></div>' +
          '<div class="mt-bars"><div class="mt-row"><span class="m">' + t(s.before) + '</span><span class="mt-bar"><i style="--w:' + (100 / after * 100).toFixed(1) + '%"></i></span><span class="m">100</span></div>' +
          '<div class="mt-row hi"><span class="m">' + t(s.after) + '</span><span class="mt-bar"><i style="--w:100%"></i></span><span class="m">' + after + '</span></div>' +
          '<span class="mt-note">' + (s.indexLabel ? t(s.indexLabel) : esc(KB.L({ en: 'ENGAGEMENT, INDEXED (BEFORE = 100)', ja: 'エンゲージメント指数（以前＝100）' }))) + (s.note ? ' · ' + t(s.note) : '') + '</span></div></div>';
      case 'team':
        var ld = s.lead || {};
        return '<div class="org"><div class="org-lead"><span class="tag">' + t(ld.role) + '</span><span class="nm">' + t(ld.name) + '</span></div><span class="org-line" aria-hidden="true"></span>' +
          '<div class="org-grid">' + (s.members || []).map(function (x, i) {
            var c = CARD[i % CARD.length];
            return '<div class="rec org-m" style="--c:' + c[0] + ';--fg:' + c[1] + '"><span class="tag">' + t(x.role) + '</span><span class="nm">' + t(x.name) + '</span></div>';
          }).join('') + '</div></div>' + (s.note ? '<p class="pw-note">' + t(s.note) + '</p>' : '');
      case 'works':
        var TT = ['140,255,193', '176,124,255', '98,120,255', '242,166,90'];
        return '<div class="wk">' + ((s.filters || []).length ? '<div class="wk-f" role="group" aria-label="Filter">' + s.filters.map(function (f, i) { return '<button type="button" class="wk-b' + (i ? '' : ' on') + '" data-f="' + esc(f.id) + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + t(f.label) + '</button>'; }).join('') + '</div>' : '') +
          '<div class="wk-g">' + (s.items || []).map(function (x, i) {
            var li = lbItems.length; lbItems.push({ src: x.src, cap: L(x.caption), stat: L(x.format), ph: L(x.format) });
            return '<button type="button" class="wk-t" data-lb="' + li + '" data-cat="' + esc(x.cat || '') + '" style="--t:' + TT[i % 4] + ';aspect-ratio:' + esc(x.ratio || '1/1') + '" aria-label="' + esc(L(x.format) + ' ' + (i + 1)) + '">' +
              (x.src ? '<img src="' + esc(x.src) + '" alt="" loading="lazy">' : '<span class="ph">[ ' + t(x.format) + ' ]</span>') +
              '<span class="wk-tag">' + t(x.format) + '</span></button>';
          }).join('') + '</div></div>';
      case 'localise':
        var card = function (c, cls) { return '<div class="lc ' + cls + '"><span class="tag">' + t(c.label) + '</span><span class="lc-h">' + t(c.head) + '</span><span class="lc-t">' + t(c.text) + '</span><span class="lc-cta">' + t(c.cta) + '</span></div>'; };
        return '<div class="loc">' + card(s.from, 'g') + '<span class="loc-arrow" aria-hidden="true"><i></i><b>' + t(s.arrow) + '</b></span>' + card(s.to, 'j') + '</div>' + (s.note ? '<p class="pw-note">' + t(s.note) + '</p>' : '');
      case 'terminal':
        return '<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>' + esc(s.title || '') + '</span></div>' +
          '<div class="term-b">' + (s.lines || []).map(function (x) {
            return '<div class="tl' + (x.muted ? ' mu' : '') + (x.p === '$' ? ' cmd' : x.p === '✓' ? ' ok' : '') + '"><span class="tp">' + esc(x.p || '›') + '</span><span class="tx" data-full="' + esc(L(x.text)) + '">' + t(x.text) + '</span></div>';
          }).join('') + '<div class="tl cur"><span class="tp">$</span><span class="caret"></span></div></div>' +
          ((s.chips || []).length ? '<div class="term-chips"><span class="m">' + t(s.chipsLabel) + '</span>' + s.chips.map(function (c) { return '<span class="chip">' + t(c) + '</span>'; }).join('') + '</div>' : '') +
          '</div>' + (s.note ? '<p class="pw-note">' + t(s.note) + '</p>' : '');
      case 'days':
        return '<div class="days"><span class="days-line" aria-hidden="true"><i></i></span>' + (s.phases || []).map(function (x, i) {
          var live = /^DAY|日目/.test(L(x.tag));
          return '<div class="day' + (live ? ' live' : '') + '" style="--d:' + i + '"><span class="dot" aria-hidden="true"></span><div class="day-h"><span class="tag">' + t(x.tag) + '</span><span class="dd">' + t(x.date) + '</span></div>' +
            '<span class="dti">' + t(x.title) + '</span><ul>' + (x.items || []).map(function (it) { return '<li><span class="m">' + esc(it.time || '—') + '</span><span>' + t(it.text) + '</span></li>'; }).join('') + '</ul></div>';
        }).join('') + '</div>';
      case 'outcome':
        return '<div style="display:flex;flex-direction:column;gap:24px"><p style="margin:0;font-size:17px;line-height:1.7;color:var(--p-body)">' + t(s.text) + (s.muted ? ' <span class="mut">' + t(s.muted) + '</span>' : '') + '</p>' +
          (s.quote ? '<blockquote class="oq"><p>' + t(s.quote) + '</p>' + (s.cite ? '<cite>' + t(s.cite) + '</cite>' : '') + '</blockquote>' : '') + '</div>';
      default:
        return '<div class="body">' + (s.paras || []).map(function (p) { return '<p' + (p.muted ? ' class="mut"' : '') + '>' + t(p) + '</p>'; }).join('') + '</div>';
    }
  }
  var secs = '<div class="wrap-read secs">' + (P.sections || []).map(function (s, i) {
    var c = TINT[i % TINT.length];
    var col = ['cards', 'reel', 'partners', 'feed', 'phones', 'metric', 'team', 'terminal', 'days', 'works', 'localise'].indexOf(s.type) > -1;
    return '<section class="csec dev' + (col ? ' col' : '') + '" style="--c:' + c[0] + ';--fg:' + c[1] + '"><div class="hd"><span class="fr">FR ' + KB.pad(i + 1) + '</span><h2>' + t(s.heading) + '</h2></div>' + body(s) + '</section>';
  }).join('') + '</div>';

  /* ---- where next ---- */
  var siblings = KB.casesOf(K.chapter), pos = siblings.indexOf(K), nxt = siblings[pos + 1] || null, nhref = nxt ? KB.caseHref(nxt) : null;
  var nextRow = '';
  if (nxt) {
    var inner = '<span class="dk">' + (C ? ui('nextInChapter', { code: nxt.code || '' }) : KB.t({ en: 'NEXT →', ja: '次へ →' })) + '</span><span class="dt">' + t(nxt.title) + (nhref ? '' : ui('soonSuffix')) + '</span>';
    nextRow = nhref ? '<a class="drow next" href="' + esc(nhref) + '">' + inner + '</a>' : '<div class="drow next soon">' + inner + '</div>';
  }
  var end =
    '<section class="dark-band">' +
      '<nav class="wrap-read dev" aria-label="More work" style="padding-top:56px;padding-bottom:24px">' +
        '<div class="pn">' + (C ? '<a class="drow" href="' + backHref + '"><span class="dk">' + ui('backToChapter', { n: C.num }) + '</span><span class="dt">' + t(C.cardTitle) + '</span></a>' : '') + nextRow + '</div>' +
        '<a class="drow flat" href="' + (C ? 'index.html#work' : backHref) + '"><span class="dk">' + ui('back') + '</span><span class="dt">' + ui('allWorkT') + '</span></a>' +
      '</nav>' +
      '<div class="wrap-read" style="padding-top:24px;padding-bottom:40px">' + KB.footer() + '</div>' +
    '</section>';

  var app = document.getElementById('app');
  app.className = 'paper';
  var lightbox = lbItems.length ? '<div class="pp-lb" id="pp-lb" hidden role="dialog" aria-modal="true" aria-label="Post"><button type="button" class="x" data-lbx aria-label="Close">✕</button>' +
    '<button type="button" class="nv p" data-lbp aria-label="Previous">←</button><figure><div class="ph ig-lbph" id="lb-ph"></div><figcaption><span id="lb-lab"></span><span id="lb-cap"></span></figcaption></figure>' +
    '<button type="button" class="nv n" data-lbn aria-label="Next">→</button></div>' : '';
  app.innerHTML = hero + tick + details + stats + film + secs + end + lightbox;
  document.body.style.background = 'var(--paper)';
  KB.furniture();
  KB.pageByHash();
  KB.shootOnce();
  KB.reveal();
  KB.rolls();
  KB.heroScroll(document.querySelector('.dhero'));
  var v = KB.vis[hdr.visual] ? KB.vis[hdr.visual](hdr.route) : KB.vis.bubbles(hdr.route);
  var headCv = document.getElementById('head-cv');
  var headSt = KB.canvas(headCv, v);
  // feed: open a post big
  var lb = document.getElementById('pp-lb');
  if (lb) {
    var li = 0, lastF = null;
    var show = function (i) {
      li = (i + lbItems.length) % lbItems.length;
      var it = lbItems[li];
      document.getElementById('lb-ph').innerHTML = it.video ? '<video src="' + esc(it.video) + '" controls autoplay playsinline></video>' : it.src ? '<img src="' + esc(it.src) + '" alt="' + esc(it.cap) + '">' : '<span>[ ' + (it.ph || (it.reel ? 'REEL' : 'POST')) + ' ' + KB.pad(li + 1) + ' ]</span>';
      document.getElementById('lb-lab').textContent = KB.pad(li + 1) + (it.stat ? ' · ' + it.stat : '');
      document.getElementById('lb-cap').textContent = it.cap || '';
    };
    var openLb = function (i) { lastF = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('[data-lbx]').focus(); };
    var closeLb = function () { lb.hidden = true; document.getElementById('lb-ph').innerHTML = ''; document.body.style.overflow = ''; if (lastF) lastF.focus(); };
    document.querySelectorAll('[data-lb]').forEach(function (b) { b.addEventListener('click', function () { openLb(+b.getAttribute('data-lb')); }); });
    lb.addEventListener('click', function (e) {
      if (e.target.closest('[data-lbx]') || e.target === lb) closeLb();
      else if (e.target.closest('[data-lbp]')) show(li - 1);
      else if (e.target.closest('[data-lbn]')) show(li + 1);
    });
    document.addEventListener('keydown', function (e) { if (lb.hidden) return; if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') show(li - 1); else if (e.key === 'ArrowRight') show(li + 1); });
  }
  // reels in phones: play (muted) only while on screen
  var vids = document.querySelectorAll('.phn video');
  if (vids.length && window.IntersectionObserver && !KB.reduce) {
    var vio = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { var p = x.target.play(); if (p && p.catch) p.catch(function () {}); } else x.target.pause(); }); }, { threshold: 0.5 });
    vids.forEach(function (vd) { vio.observe(vd); });
  }
  // the big number always fits its column
  var fitBig = function () { document.querySelectorAll('.mt-n').forEach(function (n) { KB.fitText(n, n.parentNode.clientWidth); }); };
  fitBig(); window.addEventListener('resize', fitBig);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBig);
  // the big number counts up when it scrolls in
  document.querySelectorAll('.mt').forEach(function (mt) {
    var n = mt.querySelector('.mt-n'), to = +n.getAttribute('data-to'), pre = n.getAttribute('data-pre'), suf = n.getAttribute('data-suf'), done = false;
    var run = function () {
      if (done) return; done = true; mt.classList.add('go');
      if (KB.reduce) return;
      var t0 = performance.now();
      var step = function (now) { var p = Math.min(1, (now - t0) / 1800), e = 1 - Math.pow(1 - p, 3); n.textContent = pre + Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    n.textContent = KB.reduce ? n.textContent : pre + '0' + suf;
    if (window.IntersectionObserver) new IntersectionObserver(function (en, o) { if (en[0].isIntersecting) { o.disconnect(); setTimeout(run, 450); } }, { threshold: 0.6 }).observe(mt); else run();
  });
  // works wall: filter by type
  document.querySelectorAll('.wk').forEach(function (wk) {
    wk.addEventListener('click', function (e) {
      var b = e.target.closest('.wk-b'); if (!b) return;
      var f = b.getAttribute('data-f');
      wk.querySelectorAll('.wk-b').forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      wk.querySelectorAll('.wk-t').forEach(function (x) { x.hidden = !(f === 'all' || x.getAttribute('data-cat') === f); });
    });
  });
  // terminal: lines type themselves out when it scrolls in
  document.querySelectorAll('.term').forEach(function (tm) {
    var lines = [].slice.call(tm.querySelectorAll('.tl:not(.cur)'));
    if (KB.reduce || !window.IntersectionObserver) { tm.classList.add('done'); return; }
    lines.forEach(function (ln) { ln.classList.add('wait'); ln.querySelector('.tx').textContent = ''; });
    var run = function () {
      var k = 0;
      var nextLine = function () {
        if (k >= lines.length) { tm.classList.add('done'); return; }
        var ln = lines[k++], tx = ln.querySelector('.tx'), full = tx.getAttribute('data-full'), cmd = ln.classList.contains('cmd'), c = 0;
        ln.classList.remove('wait');
        if (!cmd) { tx.textContent = full; setTimeout(nextLine, ln.classList.contains('mu') ? 260 : 180); return; }
        var type = function () { tx.textContent = full.slice(0, ++c); if (c < full.length) setTimeout(type, 38 + Math.random() * 40); else setTimeout(nextLine, 320); };
        type();
      };
      nextLine();
    };
    new IntersectionObserver(function (en, o) { if (en[0].isIntersecting) { o.disconnect(); setTimeout(run, 300); } }, { threshold: 0.5 }).observe(tm);
  });
  // days: the line draws across and each phase lights up in turn
  document.querySelectorAll('.days').forEach(function (d) {
    if (KB.reduce || !window.IntersectionObserver) { d.classList.add('go'); return; }
    new IntersectionObserver(function (en, o) { if (en[0].isIntersecting) { o.disconnect(); d.classList.add('go'); } }, { threshold: 0.35 }).observe(d);
  });
  if (v.click) {
    headCv.style.cursor = 'pointer';
    headCv.addEventListener('click', function (e) { var r = headCv.getBoundingClientRect(); v.click(headSt, e.clientX - r.left, e.clientY - r.top); });
  }
})();
