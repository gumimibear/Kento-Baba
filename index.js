/* index.js — builds the landing page from content.js */
(function () {
  'use strict';
  var S = window.SITE, KB = window.KB, P = S.person, H = S.home;
  var t = KB.t, ui = KB.ui, esc = KB.esc, L = KB.L;
  document.title = 'Kento Baba — ' + (KB.ja ? 'マーケティング' : 'Marketing');

  var navs = [['#work', 'work', 'navWork'], ['#sets', 'sets', 'navExp'], ['#lens', 'lens', 'navFilm'], ['#toolkit', 'toolkit', 'navTools'], ['#contact', 'contact', 'navContact']];
  var logo = '<a class="logo" href="#top" data-top aria-label="kb — back to top"><b>kb</b><span class="sub-l">NO. ' + esc(P.number) + '</span></a>';

  /* ---- hero ---- */
  var nameLines = esc(P.name).split(' ').join('<br>');
  var hero =
    '<section class="hero" id="top">' +
      '<canvas id="hero-cv" aria-label="' + ui('shootHint') + '"></canvas>' +
      '<div class="in wrap">' +
        '<header class="topbar">' + logo +
          '<nav class="nav" aria-label="Main">' + navs.map(function (n) { return '<a href="' + n[0] + '">' + ui(n[2]) + '</a>'; }).join('') + KB.langBtn() + '</nav>' +
        '</header>' +
        '<div class="hero-name">' +
          '<div style="display:flex;flex-direction:column;gap:14px;max-width:560px">' +
            '<span class="micro" style="color:#D6D2EA;letter-spacing:.14em">' + t(H.role) + '</span>' +
            '<div style="display:flex;align-items:flex-end;gap:18px"><h1>' + nameLines + '</h1><span class="seal" lang="ja">' + esc(P.nameJa) + '</span></div>' +
            '<p class="keywords" aria-hidden="true">' + t(H.keywords) + '</p>' +
          '</div>' +
          '<div class="hero-meta" aria-hidden="true"><div class="col"><span>' + t(P.place) + ' <span data-clock>--:--</span> ' + esc(P.clockLabel || 'JST') + '</span><span>EXP ' + KB.expLabel() + ' / 36</span><span>' + ui('shootHint') + '</span></div>' +
            '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#EEEBF5" stroke-width="1"><rect x="0.5" y="0.5" width="43" height="43"/><rect x="7.5" y="7.5" width="29" height="29"/><rect x="14.5" y="14.5" width="15" height="15"/><rect x="20" y="20" width="4" height="4" fill="#EEEBF5"/></svg></div>' +
        '</div>' +
      '</div>' +
      '<span class="side-v" aria-hidden="true">PORTFOLIO ' + new Date().getFullYear() + ' — No. ' + esc(P.number) + '</span>' +
    '</section>';

  /* ---- sticky nav ---- */
  var sticky =
    '<header class="sticky" aria-label="Site"><div class="in wrap">' + logo +
      '<nav class="snav" aria-label="Sections">' + navs.map(function (n) { return '<a class="nl" data-sec="' + n[1] + '" href="' + n[0] + '">' + ui(n[2]) + '</a>'; }).join('') + '</nav>' +
      '<span class="roll-count">EXP ' + KB.expLabel() + '/36</span>' + KB.langBtn() +
    '</div></header>';

  /* ---- intro ---- */
  var intro =
    '<section class="intro wrap dev">' +
      '<p class="tagline jt"><span class="mask"><span>' + t(H.tagline) + '</span></span></p>' +
      '<div style="display:flex;flex-direction:column;gap:28px"><p class="lead">' + t(H.intro) + '</p>' +
        '<div class="btns"><a class="btn btn-primary" href="#work">' + ui('viewWork') + ' <span class="arr" aria-hidden="true">→</span></a>' +
        '<a class="btn btn-ghost" href="' + esc(P.resume) + '" download>' + ui('resume') + ' <span class="arr-d" aria-hidden="true">↓</span></a></div>' +
      '</div>' +
    '</section>';

  /* ---- chapter cards ---- */
  var vfSvg = '<svg width="84" height="56" viewBox="0 0 84 56" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1 13V1h12M71 1h12v12M83 43v12H71M13 55H1V43"/><circle cx="42" cy="28" r="1.8" fill="currentColor" stroke="none"/></svg>';
  var cards = S.chapters.map(function (c, i) {
    return '<a class="card" href="' + KB.chapterHref(c.id) + '" data-card="' + i + '">' +
      '<div class="art"><canvas aria-hidden="true"></canvas></div>' +
      '<span class="kicker">' + esc(c.num) + ' — ' + ui('chapter') + ' · ' + esc(c.cardYears) + '</span>' +
      '<span class="t jt">' + t(c.cardTitle) + '</span>' +
      '<span class="d">' + t(c.cardDesc) + '</span>' +
      '<span class="chips">' + L(c.chips).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</span>' +
      '<span class="vf" aria-hidden="true">' + vfSvg + '<span>f/2.8 · 1/125 · ISO 400</span></span>' +
    '</a>';
  }).join('');
  var work =
    '<section id="work" class="sec wrap">' +
      '<div class="glow" aria-hidden="true" style="width:700px;height:500px;left:10%;top:120px;background:var(--b);opacity:.12"></div>' +
      '<div class="sec-head dev" style="position:relative;z-index:1"><div class="stack"><span class="kick">' + ui('workKick') + '</span><h2 class="h2"><span class="mask"><span>' + ui('workHead') + '</span></span></h2></div><span class="kick mouse-only">' + ui('workHint') + '</span></div>' +
      '<div class="cards stag">' + cards + '</div>' +
    '</section>';

  /* ---- archive ---- */
  var cats = [{ id: 'all', en: S.ui.en.all, ja: S.ui.ja.all }].concat(S.categories);
  var archive =
    '<section id="archive" class="sec wrap">' +
      '<div class="dev"><div class="stack" style="margin-bottom:28px"><span class="kick">' + ui('archKick') + '</span><h2 class="h2"><span class="mask"><span>' + ui('archHead') + '</span></span></h2></div>' +
        '<div class="filters" role="group" aria-label="Filter by category">' + cats.map(function (c) {
          return '<button type="button" class="filter" data-cat="' + esc(c.id) + '" aria-pressed="' + (c.id === 'all') + '">' + esc(c[KB.lang] || c.en) + '</button>';
        }).join('') + '</div></div>' +
      '<div class="rows stag" id="rows"></div>' +
      '<div class="more-wrap" id="more-wrap"></div>' +
    '</section>';

  /* ---- experience ---- */
  var sets =
    '<section id="sets" class="sec wrap split">' +
      '<div class="stack dev"><span class="kick">' + ui('expKick') + '</span><h2 class="h2"><span class="mask"><span>' + ui('expHead') + '</span></span></h2></div>' +
      '<ol class="xp stag" id="xp"><span class="fill" aria-hidden="true"></span>' + S.experience.map(function (r) {
        return '<li><span class="dot" aria-hidden="true"></span><span class="dt">' + t(r.date) + (r.current ? '<span class="now">' + ui('now') + '</span>' : '') + '</span>' +
          '<span class="tt jt">' + t(r.title) + '</span><span class="tx">' + t(r.text) + '</span></li>';
      }).join('') + '</ol>' +
    '</section>';

  /* ---- film ---- */
  var shots = S.film && S.film.length ? S.film : null;
  var frames = '';
  for (var i = 0; i < (shots ? shots.length : 10); i++) {
    var ph = shots ? shots[i] : null, n = String(12 + i);
    frames += '<figure class="frame">' +
      (ph ? '<div class="photo"><img src="' + esc(ph.src) + '" alt="' + esc(L(ph.alt) || [ph.place, ph.year].filter(Boolean).join(' ')) + '" loading="lazy"></div>' : '<div class="photo">[ PHOTO ' + n + ' ]</div>') +
      '<figcaption class="cap"><span>▸ ' + n + 'A</span><span>35MM · ISO 400</span><span>' + (ph ? esc([L(ph.place), ph.year].filter(Boolean).join(' · ').toUpperCase()) : ui('placeYear')) + '</span></figcaption></figure>';
  }
  var lens =
    '<section id="lens" class="sec" style="padding-left:0;padding-right:0">' +
      '<div class="wrap sec-head dev" style="gap:16px 48px"><div class="stack"><span class="kick">' + ui('lensKick') + ' · ' + esc(P.camera) + '</span><h2 class="h2"><span class="mask"><span>' + ui('lensHead') + '</span></span></h2></div>' +
        '<p style="margin:0;max-width:440px;font-size:16px;line-height:1.7;color:var(--muted)">' + t(H.filmLine) + '</p></div>' +
      '<div class="strip-scroll dev"><div class="strip sprockets">' + frames + '</div></div>' +
      '<p class="wrap micro" aria-hidden="true" style="margin-top:8px;text-align:right">' + ui('scroll') + '</p>' +
    '</section>';

  /* ---- toolkit ---- */
  var tools =
    '<section id="toolkit" class="sec wrap">' +
      '<div class="stack dev" style="margin-bottom:36px"><span class="kick">' + ui('toolKick') + '</span><h2 class="h2"><span class="mask"><span>' + ui('toolHead') + '</span></span></h2></div>' +
      '<div class="tools stag">' + S.tools.map(function (g) {
        return '<div><span class="micro lbl">' + t(g.label) + '</span><div style="display:flex;flex-wrap:wrap;gap:8px">' + g.items.map(function (x) { return '<span class="chip">' + t(x) + '</span>'; }).join('') + '</div></div>';
      }).join('') + '</div>' +
    '</section>';

  /* ---- contact ---- */
  var bars = '';
  for (var b = 0; b < 120; b++) {
    var hgt = 10 + Math.round(78 * Math.abs(Math.sin(b * 0.43) * Math.cos(b * 0.17)));
    bars += '<i style="height:' + hgt + 'px;opacity:' + (0.25 + 0.75 * (hgt / 88)).toFixed(2) + ';animation-delay:' + (((b * 29) % 100) / 100).toFixed(2) + 's"></i>';
  }
  var contact =
    '<section id="contact" class="wrap dev" style="padding-top:96px;padding-bottom:40px;display:flex;flex-direction:column;gap:28px">' +
      '<div class="bars" aria-hidden="true">' + bars + '</div>' +
      '<h2 class="hello jt"><span class="mask"><span>' + ui('hello') + '<span style="color:var(--a)">' + ui('helloDot') + '</span></span></span></h2>' +
      '<p style="margin:0;font-size:18px;color:var(--muted)">' + ui('helloLine') + '</p>' +
      '<div class="links"><a href="mailto:' + esc(P.email) + '">' + esc(P.email.toUpperCase()) + '</a><a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">LINKEDIN</a><a href="' + esc(P.resume) + '" download>' + ui('resumePdf') + '</a></div>' +
      '<div style="margin-top:48px">' + KB.footer() + '</div>' +
    '</section>';

  document.getElementById('app').innerHTML = sticky + hero + intro + work + archive + sets + lens + tools + contact;
  KB.furniture({ contactHref: '#contact' });

  /* ---- archive behaviour ---- */
  var state = { cat: 'all', more: false };
  var rowsEl = document.getElementById('rows'), moreEl = document.getElementById('more-wrap');
  function renderRows() {
    var list = S.cases.filter(function (c) { return state.cat === 'all' || c.category === state.cat; });
    var shown = state.more ? list : list.slice(0, 6);
    var html = shown.map(function (c, k) {
      var href = KB.caseHref(c) || (KB.chapter(c.chapter) ? KB.chapterHref(c.chapter) : null);
      var tag = href ? KB.L((S.chapterTags || {})[c.chapter]) + ' · ' + KB.cat(c.category) : KB.cat(c.category) + ' · ' + KB.L({ en: 'SOON', ja: '準備中' });
      var inner = '<span class="n m">' + KB.pad(k + 1) + '</span><span class="main"><span class="tt jt">' + t(c.title) + '</span><span class="ln m">' + t(c.line) + '</span></span><span class="tag hi">' + esc(tag) + '</span>';
      return href ? '<a class="row" href="' + esc(href) + '">' + inner + '</a>' : '<div class="row is-soon">' + inner + '</div>';
    }).join('');
    if (!list.length) {
      var catName = KB.cat(state.cat);
      html = '<div class="empty"><span class="kick kick-a">' + ui('inProgress') + '</span><span style="font-size:18px;color:#C2BDD6">' + ui('emptyLine', { cat: KB.ja ? catName : catName.toLowerCase() }) + '</span></div>';
    }
    rowsEl.innerHTML = html;
    moreEl.innerHTML = list.length > 6 ? '<button type="button" class="more" aria-expanded="' + state.more + '" aria-controls="rows">' + (state.more ? ui('showLess') + ' ↑' : ui('showAll') + ' (' + list.length + ') ↓') + '</button>' : '';
  }
  renderRows();
  document.querySelectorAll('.filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.cat = btn.getAttribute('data-cat'); state.more = false;
      document.querySelectorAll('.filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === btn)); });
      renderRows();
    });
  });
  moreEl.addEventListener('click', function (e) {
    if (!e.target.closest('.more')) return;
    state.more = !state.more;
    renderRows();
    if (!state.more) {
      var el = document.getElementById('archive');
      if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start', behavior: KB.reduce ? 'auto' : 'smooth' });
    }
  });

  /* ---- motion ---- */
  KB.reveal();
  KB.clock();
  var xpEl = document.getElementById('xp');
  var heroEl = document.querySelector('.hero'), lensEl = document.getElementById('lens'), stickyEl = document.querySelector('.sticky');
  KB.heroScroll(heroEl);
  KB.onScroll(function (y, vh) {
    var r = lensEl.getBoundingClientRect();
    lensEl.style.setProperty('--fp', Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height))).toFixed(3));
    stickyEl.classList.toggle('is-on', y > heroEl.offsetHeight * 0.7);
    var act = '';
    ['work', 'archive', 'sets', 'lens', 'toolkit', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < vh * 0.4) act = id === 'archive' ? 'work' : id;
    });
    stickyEl.querySelectorAll('.nl').forEach(function (a) { a.classList.toggle('is-act', a.getAttribute('data-sec') === act); });
    // experience timeline fills as you scroll; each dot lights up as the line reaches it
    var xr = xpEl.getBoundingClientRect(), xp = Math.max(0, Math.min(1, (vh * 0.6 - xr.top) / Math.max(1, xr.height)));
    xpEl.style.setProperty('--xp', xp.toFixed(3));
    xpEl.querySelectorAll('li').forEach(function (li) { li.classList.toggle('on', li.getBoundingClientRect().top + 10 < vh * 0.6); });
  });

  // hero: liquid + click to take a shot
  var heroCv = document.getElementById('hero-cv');
  var liquid = KB.vis.liquid();
  var heroSt = KB.canvas(heroCv, liquid);
  heroCv.addEventListener('click', function () { liquid.shoot(heroSt); KB.shoot(); });

  // chapter cards: ASCII word tunes in on hover; viewfinder follows the pointer
  document.querySelectorAll('.card').forEach(function (card, i) {
    var art = KB.vis.ascii(S.chapters[i].word, i);
    var st = KB.canvas(card.querySelector('canvas'), art);
    var on = function () { art.hover(st, true); }, off = function () { art.hover(st, false); };
    card.addEventListener('pointerenter', on); card.addEventListener('pointerleave', off);
    card.addEventListener('focus', on); card.addEventListener('blur', off);
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--vx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--vy', (e.clientY - r.top) + 'px');
    });
  });
})();
