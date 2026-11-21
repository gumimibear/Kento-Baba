/* case.js — builds case.html?id=… from content.js (layouts: research / event) */
(function () {
  'use strict';
  var S = window.SITE, KB = window.KB;
  var t = KB.t, ui = KB.ui, esc = KB.esc, L = KB.L;
  var K = KB.caseById(KB.param('id'));
  if (!K || !K.page) K = S.cases.filter(function (c) { return c.page; })[0];
  var P = K.page, C = KB.chapter(K.chapter) || S.chapters[0];
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
          '<a href="' + KB.chapterHref(C.id) + '" style="text-decoration:none"><span class="sub-l">← ' + esc(C.num) + ' · ' + esc(L(C.title).toUpperCase()) + '</span></a></span>' +
          '<span style="display:flex;align-items:center;gap:16px"><span style="color:var(--soft)">EXP ' + KB.expLabel() + ' / 36</span>' + KB.langBtn() + '</span></header>' +
        '<div class="exit" style="max-width:600px;display:flex;flex-direction:column;gap:16px">' +
          '<span class="kick kick-a">' + ui('caseKick', { n: C.num, code: K.code || '', cat: KB.cat(K.category) }) + '</span>' +
          '<h1 class="cs-title">' + t(P.title || K.title) + '</h1>' +
          '<p class="cs-hook">' + t(P.hook || K.line) + '</p>' +
        '</div>' +
      '</div>' +
    '</section>';

  /* ---- facts + numbers ---- */
  var details = (P.details || []).length
    ? '<dl class="dl wrap-read dev">' + P.details.map(function (d) { return '<div><dt>' + t(d.label) + '</dt><dd>' + t(d.value) + '</dd></div>'; }).join('') + '</dl>' : '';
  var stats = (P.stats || []).length
    ? '<section class="wrap-read stats stag" aria-label="In numbers">' + P.stats.map(function (s, i) {
        var c = STAT[i % STAT.length];
        return '<div class="rec stat" style="--c:' + c[0] + ';--fg:' + c[1] + '"><span class="num">' + t(s.value) + '</span><span class="tag">' + t(s.label) + '</span></div>';
      }).join('') + '</section>' : '';

  /* ---- film roll ---- */
  var film =
    '<section class="filmsec dev">' +
      '<div class="wrap-read" style="margin-bottom:36px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:8px 40px"><span class="kick kick-amber">' + t(P.filmLabel) + '</span><span class="micro" style="color:var(--p-muted)">' + ui('hoverPause') + '</span></div>' +
      KB.rollHTML(KB.frames(P.film, { count: 6, placeholders: P.filmPlaceholders })) +
    '</section>';

  /* ---- story sections ---- */
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
      case 'outcome':
        return '<div style="display:flex;flex-direction:column;gap:24px"><p style="margin:0;font-size:17px;line-height:1.7;color:var(--p-body)">' + t(s.text) + (s.muted ? ' <span class="mut">' + t(s.muted) + '</span>' : '') + '</p>' +
          (s.quote ? '<blockquote class="oq"><p>' + t(s.quote) + '</p>' + (s.cite ? '<cite>' + t(s.cite) + '</cite>' : '') + '</blockquote>' : '') + '</div>';
      default:
        return '<div class="body">' + (s.paras || []).map(function (p) { return '<p' + (p.muted ? ' class="mut"' : '') + '>' + t(p) + '</p>'; }).join('') + '</div>';
    }
  }
  var secs = '<div class="wrap-read secs">' + (P.sections || []).map(function (s, i) {
    var c = TINT[i % TINT.length];
    var col = s.type === 'cards' || s.type === 'reel';
    return '<section class="csec dev' + (col ? ' col' : '') + '" style="--c:' + c[0] + ';--fg:' + c[1] + '"><div class="hd"><span class="fr">FR ' + KB.pad(i + 1) + '</span><h2>' + t(s.heading) + '</h2></div>' + body(s) + '</section>';
  }).join('') + '</div>';

  /* ---- where next ---- */
  var siblings = KB.casesOf(C.id), pos = siblings.indexOf(K), nxt = siblings[pos + 1] || null, nhref = nxt ? KB.caseHref(nxt) : null;
  var nextRow = '';
  if (nxt) {
    var inner = '<span class="dk">' + ui('nextInChapter', { code: nxt.code || '' }) + '</span><span class="dt">' + t(nxt.title) + (nhref ? '' : ui('soonSuffix')) + '</span>';
    nextRow = nhref ? '<a class="drow next" href="' + esc(nhref) + '">' + inner + '</a>' : '<div class="drow next soon">' + inner + '</div>';
  }
  var end =
    '<section class="dark-band">' +
      '<nav class="wrap-read dev" aria-label="More work" style="padding-top:56px;padding-bottom:24px">' +
        '<div class="pn"><a class="drow" href="' + KB.chapterHref(C.id) + '"><span class="dk">' + ui('backToChapter', { n: C.num }) + '</span><span class="dt">' + t(C.cardTitle) + '</span></a>' + nextRow + '</div>' +
        '<a class="drow flat" href="index.html#work"><span class="dk">' + ui('back') + '</span><span class="dt">' + ui('allWorkT') + '</span></a>' +
      '</nav>' +
      '<div class="wrap-read" style="padding-top:24px;padding-bottom:40px">' + KB.footer() + '</div>' +
    '</section>';

  var app = document.getElementById('app');
  app.className = 'paper';
  app.innerHTML = hero + details + stats + film + secs + end;
  document.body.style.background = 'var(--paper)';
  KB.furniture();
  KB.pageByHash();
  KB.shootOnce();
  KB.reveal();
  KB.heroScroll(document.querySelector('.dhero'));
  var v = hdr.visual === 'stage' ? KB.vis.stage() : KB.vis.bubbles(hdr.route);
  KB.canvas(document.getElementById('head-cv'), v);
})();
