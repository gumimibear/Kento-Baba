/* chapter.js — builds chapter.html?id=qut|workato|uni from content.js */
(function () {
  'use strict';
  var S = window.SITE, KB = window.KB;
  var t = KB.t, ui = KB.ui, esc = KB.esc, L = KB.L;
  var C = KB.chapter(KB.param('id')) || S.chapters[0];
  var idx = KB.chapterIndex(C.id);
  var tracks = KB.casesOf(C.id);
  var COLORS = ['91,63,217', '140,255,193', '70,86,220', '242,166,90', '236,92,170'];
  document.title = 'Kento Baba — ' + ui('chapter') + ' ' + C.num + ': ' + L(C.title);

  /* ---- header ---- */
  var stats = (C.stats || []).slice(0, 4).map(function (s) {
    var v = s.count != null
      ? '<span class="v" data-count="' + s.count + '" data-pre="' + esc(s.prefix || '') + '" data-suf="' + esc(s.suffix || '') + '">' + esc(s.value) + '</span>'
      : '<span class="v">' + t(s.value) + '</span>';
    return '<div>' + v + '<span class="l">' + t(s.label) + '</span></div>';
  }).join('');
  var hero =
    '<section class="dhero ch-hero">' +
      '<canvas id="head-cv" aria-hidden="true"></canvas>' +
      '<span class="bignum" aria-hidden="true">' + esc(C.num) + '</span>' +
      '<div class="in wrap-narrow">' +
        '<header class="topbar"><a class="logo" href="index.html#work"><b>kb</b><span class="sub-l">' + ui('allWork') + '</span></a>' +
          '<span style="display:flex;align-items:center;gap:16px"><span style="color:var(--soft)">EXP ' + KB.expLabel() + ' / 36</span>' + KB.langBtn() + '</span></header>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:32px 48px">' +
          '<div class="exit" style="display:flex;flex-direction:column;gap:16px;max-width:820px;min-width:0">' +
            '<span class="kick kick-a" style="letter-spacing:.14em">' + ui('chapter') + ' ' + esc(C.num) + ' — ' + t(C.dates) + '</span>' +
            '<h1 class="ch-title">' + t(C.title) + '</h1>' +
            '<span class="kick" style="letter-spacing:.14em;color:#D6D2EA">' + t(C.sub) + '</span>' +
            '<p class="ch-hook">' + t(C.hook) + '</p>' +
          '</div>' +
          (stats ? '<div class="statgrid exit">' + stats + '</div>' : '') +
        '</div>' +
      '</div>' +
    '</section>';

  /* ---- the tracks ---- */
  var list = tracks.map(function (c, i) {
    var href = KB.caseHref(c);
    var attrs = href ? 'href="' + esc(href) + '"' : 'tabindex="0" aria-disabled="true"';
    return '<li><a ' + attrs + ' data-i="' + i + '" class="' + (i === 0 ? 'is-sel' : '') + '">' +
      '<span class="code">' + esc(c.code || KB.pad(i + 1)) + '</span>' +
      '<span class="main"><span class="tt">' + t(c.title) + '</span><span class="cat">' + esc(KB.cat(c.category)) + '</span></span>' +
      '<span class="st">' + (href ? ui('statusReady') : ui('statusSoon')) + '</span></a></li>';
  }).join('');
  var side =
    '<section class="wrap-narrow" style="padding-top:96px;padding-bottom:104px">' +
      '<div class="sec-head dev" style="margin-bottom:36px"><div class="stack"><span class="kick">' + ui('sideA', { n: KB.pad(tracks.length) }) + '</span><h2 class="h2"><span class="mask"><span>' + ui('theWork') + '</span></span></h2></div><span class="micro">' + ui('hoverTrack') + '</span></div>' +
      '<div class="trk-wrap"><ol class="trk stag">' + list + '</ol>' +
        '<aside class="pv dev" aria-live="polite"><div class="art"><canvas id="pv-cv" aria-hidden="true"></canvas></div>' +
          '<span class="pk" id="pv-k"></span><span class="pt" id="pv-t"></span><span class="pl" id="pv-l"></span><a class="cta" id="pv-a"></a></aside>' +
      '</div>' +
    '</section>';

  /* ---- the year (light band) ---- */
  var T = C.timeline || { items: [] };
  var year =
    '<section class="light" id="year">' +
      '<div class="wrap-narrow" style="padding-top:88px;padding-bottom:64px">' +
        '<div class="sec-head dev" style="margin-bottom:48px"><div class="stack"><span class="kick kick-amber">' + t(T.kick) + '</span><h2 class="h2"><span class="mask"><span>' + t(T.head) + '</span></span></h2></div><span class="micro">' + t(T.side) + '</span></div>' +
        '<div class="tl"><div class="track" aria-hidden="true"></div><div class="fill" aria-hidden="true"></div>' +
          '<ol class="stag">' + T.items.map(function (m, i) {
            return '<li class="ms" style="--c:' + COLORS[i % COLORS.length] + '"><span class="dot"></span><div class="box"><span class="dt">' + t(m.date) + '</span><span class="tt">' + t(m.title) + '</span><span class="nt">' + t(m.note) + '</span></div></li>';
          }).join('') + '</ol>' +
        '</div>' +
      '</div>' +
      '<div class="dev" style="padding:24px 0 96px">' +
        '<div class="wrap-narrow" style="margin-bottom:32px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 40px"><span class="kick kick-amber">' + t(C.filmLabel) + '</span><span class="micro">' + ui('hoverPause') + '</span></div>' +
        KB.rollHTML(KB.frames(C.film, { count: 6 })) +
      '</div>' +
    '</section>';

  /* ---- reflection + where next ---- */
  var prev = idx > 0 ? S.chapters[idx - 1] : null;
  var next = idx < S.chapters.length - 1 ? S.chapters[idx + 1] : S.chapters[0];
  var nextKey = idx < S.chapters.length - 1 ? 'nextChapter' : 'loopChapter';
  var nav =
    '<nav class="wrap-narrow dev" aria-label="More work" style="position:relative;padding-top:24px;padding-bottom:24px">' +
      '<div class="pn">' +
        (prev ? '<a class="drow" href="' + KB.chapterHref(prev.id) + '"><span class="dk">' + ui('prevChapter', { n: prev.num }) + '</span><span class="dt">' + t(prev.cardTitle) + '</span></a>' : '') +
        (next && next !== C ? '<a class="drow next" href="' + KB.chapterHref(next.id) + '"><span class="dk">' + ui(nextKey, { n: next.num }) + '</span><span class="dt">' + t(next.cardTitle) + '</span></a>' : '') +
      '</div>' +
      '<a class="drow flat" href="index.html#work"><span class="dk">' + ui('back') + '</span><span class="dt">' + ui('allWorkT') + '</span></a>' +
    '</nav>';
  var end =
    '<section class="dark-band" style="overflow:hidden">' +
      '<div aria-hidden="true" style="position:absolute;width:900px;height:600px;left:-200px;top:-120px;border-radius:50%;background:radial-gradient(closest-side,rgba(98,120,255,.28),rgba(176,124,255,.1),rgba(19,18,28,0));pointer-events:none"></div>' +
      '<blockquote class="bq dev"><span class="kick">' + ui('reflection') + '</span><p><span class="qm">“</span>' + t(C.quote) + '<span class="qm">”</span></p><cite class="micro" style="font-style:normal">' + t(C.cite) + '</cite></blockquote>' +
      nav +
      '<div class="wrap-narrow" style="position:relative;padding-top:24px;padding-bottom:40px">' + KB.footer() + '</div>' +
    '</section>';

  document.getElementById('app').innerHTML = hero + side + year + end;
  KB.furniture();
  KB.pageByHash();
  KB.shootOnce();
  KB.reveal();
  KB.countUp();

  /* ---- motion ---- */
  var heroEl = document.querySelector('.dhero');
  KB.heroScroll(heroEl);
  var yearEl = document.getElementById('year');
  KB.onScroll(function (y, vh) {
    var r = yearEl.getBoundingClientRect();
    yearEl.style.setProperty('--yp', Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height * 0.6))).toFixed(3));
  });
  var make = KB.vis[C.visual] || KB.vis['network-sun'];
  KB.canvas(document.getElementById('head-cv'), make());

  // preview panel follows the hovered track
  var art = KB.vis.ascii(tracks[0] ? tracks[0].word || tracks[0].code : C.word, 1);
  art.hvT = 1; if (KB.reduce) art.hv = 1;
  var pvSt = KB.canvas(document.getElementById('pv-cv'), art);
  var pk = document.getElementById('pv-k'), pt = document.getElementById('pv-t'), pl = document.getElementById('pv-l'), pa = document.getElementById('pv-a');
  function pick(i) {
    var c = tracks[i];
    if (!c) return;
    var href = KB.caseHref(c);
    pk.textContent = (c.code || KB.pad(i + 1)) + ' — ' + KB.cat(c.category);
    pt.textContent = L(c.title);
    pl.textContent = L(c.line);
    pa.innerHTML = href ? ui('ctaReady') : ui('ctaSoon');
    if (href) pa.setAttribute('href', href); else pa.removeAttribute('href');
    document.querySelectorAll('.trk a').forEach(function (a) { a.classList.toggle('is-sel', a.getAttribute('data-i') === String(i)); });
    if (pvSt) art.setWord(pvSt, c.word || c.code || '');
  }
  pick(0);
  document.querySelectorAll('.trk a').forEach(function (a) {
    var i = +a.getAttribute('data-i');
    a.addEventListener('pointerenter', function () { pick(i); });
    a.addEventListener('focus', function () { pick(i); });
  });
})();
