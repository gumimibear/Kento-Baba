/* personal.js — the creative "Off duty" pages.
   layout 'personal' (style: bold / editorial / art) and layout 'photo'.
   Everything here is built from content.js. */
(function () {
  'use strict';
  var S = window.SITE, KB = window.KB;
  var t = KB.t, ui = KB.ui, esc = KB.esc, L = KB.L, pad = KB.pad;
  var J = function (o) { return KB.t(o); };
  var PLAY = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>';
  var PAUSE = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z" fill="currentColor"/></svg>';
  var PREV = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2.5v14H6zM20 5v14L9 12z" fill="currentColor"/></svg>';
  var NEXT = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5H18v14h-2.5zM4 5v14l11-7z" fill="currentColor"/></svg>';

  function words(text, fn, joiner) {
    var tok = KB.ja ? (text.match(/[^、。]+[、。]?/g) || [text]) : text.split(/\s+/);
    return tok.map(fn).join(KB.ja ? '' : (joiner == null ? ' ' : joiner));
  }
  function secs(len) {
    var m = /(\d+):(\d{2})/.exec(String(len || ''));
    return m ? (+m[1]) * 60 + (+m[2]) : 210;
  }
  function clock(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + pad(s % 60); }

  KB.personal = function (K) {
    var P = K.page, photo = P.layout === 'photo', style = photo ? 'photo' : (P.style || 'bold');
    var mates = S.cases.filter(function (c) { return c.chapter === K.chapter && c.page; });
    var idx = mates.indexOf(K), next = mates.length > 1 ? mates[(idx + 1) % mates.length] : null;
    var word = (P.word || L(P.title) || '').toUpperCase();
    var FR = 0, fr = function () { FR++; return 'FR ' + pad(FR) + ' — '; };
    document.title = 'Kento Baba — ' + L(P.title || K.title);
    document.body.classList.add('pp-body', 'pp-' + style);

    /* ================= header (same format on every page) ================= */
    var credits = (P.details || []).map(function (d) { return '<div><dt>' + t(d.label) + '</dt><dd>' + t(d.value) + '</dd></div>'; }).join('');
    var sideLabel = style === 'editorial' ? KB.L({ en: 'ISSUE', ja: '号' }) + ' ' + pad(idx + 1) + ' — ' + KB.L({ en: 'OFF DUTY', ja: 'オフの時間' })
      : KB.L({ en: 'OFF DUTY', ja: 'オフの時間' }) + ' — ' + pad(idx + 1) + ' / ' + pad(mates.length);
    var hero =
      '<section class="pp-hero" id="pp-hero">' +
        '<canvas id="pp-cv" aria-hidden="true"></canvas>' +
        '<header class="pp-top"><a class="logo" href="index.html#archive"><b>kb</b><span class="sub-l">' + ui('allWork') + '</span></a>' +
          '<span class="tr"><span>EXP ' + KB.expLabel() + ' / 36</span>' + KB.langBtn() + '</span></header>' +
        '<span class="pp-side micro">' + esc(sideLabel) + '</span>' +
        (P.jp ? '<span class="pp-jp" lang="ja" aria-hidden="true">' + esc(P.jp) + '</span>' : '') +
        '<h1 class="sr-only">' + t(P.title || K.title) + '</h1>' +
        '<div class="pp-word" id="pp-word" aria-hidden="true"><span class="o">' + esc(style === 'editorial' ? L(P.title) : word) + '</span><span class="f">' + esc(style === 'editorial' ? L(P.title) : word) + '</span></div>' +
        '<div class="pp-foot"><p class="pp-hook">' + t(P.hook) + '</p>' + (credits ? '<dl class="pp-credits">' + credits + '</dl>' : '') + '</div>' +
        '<span class="pp-cue micro" aria-hidden="true">SCROLL ↓</span>' +
      '</section>';

    /* ================= building blocks ================= */
    var items = (P.marquee && P.marquee.length ? P.marquee : [P.title]).map(function (x) { return L(x); });
    function marqueeBold() {
      var row = function (star) { var h = ''; for (var r = 0; r < 3; r++) items.forEach(function (x) { h += '<span>' + esc(x) + '</span><i>' + star + '</i>'; }); return h; };
      return '<section class="pp-marq" aria-hidden="true"><div class="pp-band b1"><div class="mq" id="pp-m1">' + row('✶') + row('✶') + '</div></div>' +
        '<div class="pp-band b2"><div class="mq" id="pp-m2">' + row('●') + row('●') + '</div></div></section>';
    }
    function tickerEditorial() {
      var row = ''; for (var r = 0; r < 4; r++) items.forEach(function (x) { row += '<span>' + esc(x) + '</span><i>·</i>'; });
      return '<section class="pp-tick" aria-hidden="true"><div class="mq" id="pp-m1">' + row + row + '</div></section>';
    }
    function marqueeArt() {
      var shapes = ['<b class="sh c"></b>', '<b class="sh s"></b>', '<b class="sh t"></b>', '<b class="sh h"></b>'];
      var row = '', n = 0;
      for (var r = 0; r < 3; r++) items.forEach(function (x) { row += '<span class="a' + (n % 4) + '">' + esc(x) + '</span>' + shapes[n % 4]; n++; });
      var chips = '', cols = ['m', 'v', 'b', 'a', 'p'];
      for (var r2 = 0; r2 < 3; r2++) items.forEach(function (x, k) { chips += '<span class="chipc ' + cols[(k + r2) % 5] + '">' + esc(x) + '</span>'; });
      return '<section class="pp-marq art" aria-hidden="true"><div class="pp-band b1"><div class="mq" id="pp-m1">' + row + row + '</div></div>' +
        '<div class="pp-band b3"><div class="mq" id="pp-m2">' + chips + chips + '</div></div></section>';
    }
    function manifesto() {
      var text = L(P.manifesto) || '';
      return '<section class="pp-mani" id="pp-mani"><div class="pin">' +
        '<span class="kick kick-a">' + fr() + t(P.manifestoHead) + '</span>' +
        (style === 'editorial' ? '<span class="pp-quote" aria-hidden="true">“</span>' : '') +
        '<p class="pp-mtext">' + words(text, function (w, k) { return '<span data-k="' + k + '">' + esc(w) + '</span>'; }) + '</p></div></section>';
    }
    function gallerySideways() {
      var shapes = [['3 / 4', 62, 'up'], ['3 / 2', 44, 'down'], ['1 / 1', 52, ''], ['3 / 2', 46, 'up'], ['3 / 4', 60, 'down'], ['4 / 5', 54, '']];
      var photos = P.film && P.film.length ? P.film : null, n = photos ? photos.length : 6, frames = '';
      for (var i = 0; i < n; i++) {
        var sh = shapes[i % shapes.length], ph = photos ? photos[i] : null;
        frames += '<figure class="pp-frame ' + sh[2] + '"><span class="num" aria-hidden="true">' + pad(i + 1) + '</span>' +
          '<div class="ph" style="--ar:' + sh[0] + ';--h:' + sh[1] + 'vh">' + (ph ? '<img src="' + esc(ph.src) + '" alt="' + esc(L(ph.alt || ph.caption) || '') + '" loading="lazy">' : '[ PHOTO ]') + '</div>' +
          '<figcaption><span>▸ ' + pad(i + 1) + 'A</span><span>' + (ph && ph.caption ? esc(L(ph.caption)) : ui('caption')) + '</span></figcaption></figure>';
      }
      return '<section class="pp-gal" id="pp-gal"><div class="pin">' +
        '<div class="pp-galhead"><span class="kick kick-amber">' + fr() + t(P.filmLabel) + '</span><span class="micro">' + pad(n) + ' ' + esc(KB.L({ en: 'FRAMES', ja: 'コマ' })) + '</span></div>' +
        '<div class="pp-track" id="pp-track">' + frames + '</div></div></section>';
    }
    function lookbook() {
      var photos = P.film && P.film.length ? P.film : null, n = photos ? photos.length : 6, looks = '';
      var speeds = [0.06, -0.08, 0.1, -0.05, 0.08, -0.1];
      for (var i = 0; i < n; i++) {
        var ph = photos ? photos[i] : null;
        looks += '<figure class="lk l' + ((i % 6) + 1) + '" data-speed="' + speeds[i % 6] + '"><div class="ph">' +
          (ph ? '<img src="' + esc(ph.src) + '" alt="' + esc(L(ph.alt || ph.caption) || '') + '" loading="lazy">' : '[ LOOK ' + pad(i + 1) + ' ]') + '</div>' +
          '<figcaption><span class="lt">' + esc(KB.L({ en: 'Look', ja: 'ルック' })) + ' ' + pad(i + 1) + '</span><span class="micro">' + (ph && ph.caption ? esc(L(ph.caption)) : esc(KB.L({ en: '[PLACE · YEAR]', ja: '［場所・年］' }))) + '</span></figcaption></figure>';
      }
      return '<section class="pp-look wrap"><div class="pp-lhead"><span class="kick">' + fr() + t(P.filmLabel) + '</span><span class="micro">' + pad(n) + ' ' + esc(KB.L({ en: 'LOOKS', ja: 'ルック' })) + '</span></div>' +
        '<div class="pp-lgrid">' + looks + '</div></section>';
    }
    function wall() {
      var photos = P.film && P.film.length ? P.film : null, n = photos ? photos.length : 7, out = '';
      var spots = [[3, 6, 22, -4], [30, 2, 17, 3], [52, 10, 24, -2], [80, 4, 15, 6], [10, 52, 19, 4], [36, 46, 26, -5], [70, 50, 20, 3], [56, 78, 16, -6], [18, 84, 14, 2]];
      for (var i = 0; i < n; i++) {
        var sp = spots[i % spots.length], ph = photos ? photos[i] : null, ar = ['3 / 4', '4 / 5', '1 / 1.3', '3 / 4', '1 / 1', '4 / 3', '3 / 4'][i % 7];
        out += '<figure class="pc" style="left:' + sp[0] + '%;top:' + sp[1] + '%;--w:' + sp[2] + 'vw;--r:' + sp[3] + 'deg"><i class="tape"></i>' +
          '<div class="ph" style="aspect-ratio:' + ar + '">' + (ph ? '<img src="' + esc(ph.src) + '" alt="' + esc(L(ph.alt || ph.caption) || '') + '" loading="lazy">' : '[ POSTER ' + pad(i + 1) + ' ]') + '</div>' +
          '<figcaption>' + pad(i + 1) + (ph && ph.caption ? ' — ' + esc(L(ph.caption)) : '') + '</figcaption></figure>';
      }
      out += '<span class="pc deco c1" style="left:47%;top:34%;--r:0deg" aria-hidden="true"></span>' +
        '<span class="pc deco c2" style="left:88%;top:40%;--r:12deg" aria-hidden="true"></span>' +
        '<span class="pc deco c3" style="left:2%;top:40%;--r:-8deg" aria-hidden="true">kb</span>' +
        '<svg class="pc deco c4" style="left:62%;top:36%;--r:0deg" width="160" height="40" viewBox="0 0 160 40" aria-hidden="true"><path d="M2 20 Q 22 2 42 20 T 82 20 T 122 20 T 158 20" fill="none" stroke="#8CFFC1" stroke-width="3"/></svg>';
      return '<section class="pp-wall"><div class="wrap pp-whead"><span class="kick kick-a">' + fr() + t(P.filmLabel) + '</span><span class="micro mouse-only">' + esc(KB.L({ en: 'DRAG THINGS AROUND', ja: 'ドラッグして動かせます' })) + '</span></div>' +
        '<div class="pp-board" id="pp-board">' + out + '</div></section>';
    }
    function player() {
      var tr = P.tracks || [];
      var list = tr.map(function (x, i) {
        return '<li><button type="button" class="pp-tr" data-i="' + i + '"><span class="no"><span class="num">' + pad(i + 1) + '</span><span class="eqm" aria-hidden="true"><i></i><i></i><i></i></span></span>' +
          '<span class="tt">' + t(x.title) + '<span class="ar">' + esc(x.artist || '') + '</span></span><span class="ln">' + esc(String(x.length || '').replace(/[\[\]]/g, '')) + '</span></button></li>';
      }).join('');
      var total = tr.reduce(function (a, x) { return a + secs(x.length); }, 0);
      var bars = ''; for (var b = 0; b < 16; b++) bars += '<i style="animation-delay:' + (-((b * 37) % 100) / 100).toFixed(2) + 's"></i>';
      return '<section class="pp-player wrap" id="pp-player">' +
        '<div class="pp-plhead"><span class="kick kick-a">' + fr() + t(P.favouritesHead) + '</span><span class="micro">' + esc(KB.L({ en: 'PLAYLIST', ja: 'プレイリスト' })) + ' · ' + pad(tr.length) + ' ' + esc(KB.L({ en: 'TRACKS', ja: '曲' })) + ' · ' + Math.round(total / 60) + ' MIN</span></div>' +
        '<div class="pp-deck">' +
          '<div class="pp-now">' +
            '<div class="pp-sleeve"><span class="disc" aria-hidden="true"><b></b></span><div class="pp-cover" id="pl-cover"></div></div>' +
            '<div class="pp-meta"><span class="micro kick-a" id="pl-state"></span><span class="pp-ntt" id="pl-title"></span><span class="pp-nar" id="pl-artist"></span></div>' +
            '<div class="pp-eq" aria-hidden="true">' + bars + '</div>' +
            '<div class="pp-bar"><span id="pl-cur">0:00</span><div class="tr" id="pl-track"><i id="pl-fill"></i></div><span id="pl-len">0:00</span></div>' +
            '<div class="pp-ctrl"><button type="button" class="sk" id="pl-prev" aria-label="Previous">' + PREV + '</button>' +
              '<button type="button" class="play" id="pl-play" aria-label="Play">' + PLAY + '</button>' +
              '<button type="button" class="sk" id="pl-next" aria-label="Next">' + NEXT + '</button>' +
              '<a class="pp-listen" id="pl-link" target="_blank" rel="noopener">' + esc(KB.L({ en: 'LISTEN', ja: '聴く' })) + ' ↗</a></div>' +
          '</div>' +
          '<ol class="pp-tracks">' + list + '</ol>' +
        '</div><audio id="pl-audio" preload="none"></audio></section>';
    }
    function favLines() {
      var favs = (P.favourites || []).map(function (f, k) {
        return '<li class="pp-fi"' + (f.src ? ' data-src="' + esc(f.src) + '"' : '') + '><span class="n">' + pad(k + 1) + '</span><span class="ti">' + t(f.title) + '</span><span class="no">' + t(f.note) + '</span></li>';
      }).join('');
      return favs ? '<section class="pp-fav wrap"><span class="kick kick-a">' + fr() + t(P.favouritesHead) + '</span><ol class="stag">' + favs + '</ol></section>' : '';
    }
    function favLabels() {
      var favs = (P.favourites || []).map(function (f, k) {
        return '<article class="pp-label" style="--r:' + [-2, 1.5, -1, 2][k % 4] + 'deg"' + (f.src ? ' data-src="' + esc(f.src) + '"' : '') + '>' +
          '<div class="ph">' + (f.src ? '<img src="' + esc(f.src) + '" alt="" loading="lazy">' : '[ ' + pad(k + 1) + ' ]') + '</div>' +
          '<span class="n">' + pad(k + 1) + '</span><h3>' + t(f.title) + '</h3><p class="md">' + esc(KB.L({ en: '[Medium — e.g. poster, digital]', ja: '［種類 — ポスター、デジタルなど］' })) + '</p><p>' + t(f.note) + '</p></article>';
      }).join('');
      return favs ? '<section class="pp-labels wrap"><span class="kick kick-a">' + fr() + t(P.favouritesHead) + '</span><div class="pp-lgrid2 dev">' + favs + '</div></section>' : '';
    }
    function camera() {
      var parts = String(P.camera || '').split(' ');
      var specs = (P.specs || []).map(function (d) { return '<div><dt>' + t(d.label) + '</dt><dd>' + t(d.value) + '</dd></div>'; }).join('');
      return '<section class="pp-cam wrap"><span class="kick kick-amber">' + fr() + t(P.cameraHead) + '</span>' +
        '<div class="pp-camgrid"><div class="pp-camname dev">' + parts.map(function (p, i) { return '<span class="' + (i % 2 ? 'o' : '') + '">' + esc(p) + '</span>'; }).join('') + '</div>' +
        '<dl class="pp-specs stag">' + specs + '</dl></div></section>';
    }
    var lbItems = [], openLb = null;
    function sheets() {
      var html = (P.rolls || []).map(function (roll, ri) {
        var photos = roll.photos && roll.photos.length ? roll.photos : null, n = photos ? photos.length : 12, strips = '', row = '';
        for (var i = 0; i < n; i++) {
          var ph = photos ? photos[i] : null, li = lbItems.length;
          lbItems.push({ src: ph ? ph.src : '', cap: ph && ph.caption ? L(ph.caption) : '', label: L(roll.name) + ' · ' + pad(i + 1) + 'A' });
          row += '<button type="button" class="fx" data-lb="' + li + '" aria-label="' + esc(L(roll.name) + ' frame ' + (i + 1)) + '"><span class="ph">' + (ph ? '<img src="' + esc(ph.src) + '" alt="" loading="lazy">' : '') + '</span><span class="ed">▸ ' + pad(i + 1) + 'A</span>' +
            '<svg class="gp" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true"><path d="M8 38 C 6 12, 60 2, 88 16 C 104 26, 92 62, 50 64 C 18 66, 4 52, 12 30" fill="none" stroke="#F2A65A" stroke-width="2.4" stroke-linecap="round"/></svg></button>';
          if ((i + 1) % 6 === 0 || i === n - 1) { strips += '<div class="cstrip sprockets">' + row + '</div>'; row = ''; }
        }
        return '<div class="pp-roll dev"><div class="pp-rhead"><span class="nm">' + t(roll.name) + '</span><span class="micro">' + [L(roll.place), roll.stock, roll.year].filter(Boolean).map(esc).join(' · ') + ' · ' + pad(n) + ' ' + esc(KB.L({ en: 'FRAMES', ja: 'コマ' })) + '</span></div>' +
          '<div class="pp-sheet">' + strips + '</div></div>';
      }).join('');
      return '<section class="pp-sheets wrap"><div class="pp-shead"><span class="kick kick-amber">' + fr() + t(P.rollsHead) + '</span><span class="micro">' + esc(KB.L({ en: 'CLICK A FRAME TO SEE IT BIG', ja: 'コマをクリックで拡大' })) + '</span></div>' + html + '</section>';
    }
    // PHOTOGRAPHY header: a living film camera. Scroll (or click the lens) to zoom through it into
    // a viewfinder gallery with filters; an ✕ (or scrolling on) zooms back out to the camera.
    var phAll = [], phFilters = P.photoFilters || [];
    (function () {
      var list = P.photos && P.photos.length ? P.photos : null;
      var n = list ? list.length : 10;
      for (var i = 0; i < n; i++) {
        var ph = list ? list[i] : null;
        phAll.push({ src: ph ? ph.src : '', cap: ph && ph.caption ? L(ph.caption) : '', cat: ph ? ph.category : (phFilters.length ? phFilters[i % phFilters.length].id : ''), n: i + 1 });
      }
    })();
    function photoHero() {
      var spec = function (k) { var d = (P.specs || [])[k]; return d ? esc(L(d.label)) + ' — ' + esc(L(d.value)) : ''; };
      var det = function (k) { var d = (P.details || [])[k]; return d ? esc(L(d.label)) + ' — ' + esc(L(d.value)) : ''; };
      var chips = '<button type="button" class="ph-chip" data-f="all" aria-pressed="true">' + ui('all') + '</button>' +
        phFilters.map(function (f) { return '<button type="button" class="ph-chip" data-f="' + esc(f.id) + '" aria-pressed="false">' + esc(f[KB.lang] || f.en) + '</button>'; }).join('');
      var cam =
        '<svg class="ph-svg" id="ph-svg" viewBox="0 0 1000 560" aria-hidden="true">' +
          '<defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2738"/><stop offset="1" stop-color="#14121C"/></linearGradient>' +
          '<linearGradient id="cp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34304A"/><stop offset="1" stop-color="#1C1A28"/></linearGradient>' +
          '<pattern id="kn" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#1A1824"/><rect width="3" height="6" fill="#23202F"/></pattern>' +
          '<path id="lensTxt" d="M 500 452 m -132 0 a 132 132 0 1 1 264 0 a 132 132 0 1 1 -264 0"/></defs>' +
          '<path d="M408 170 L432 92 Q436 82 448 82 L552 82 Q564 82 568 92 L592 170 Z" fill="url(#cp)" stroke="rgba(238,235,245,.22)"/>' +
          '<rect x="462" y="66" width="76" height="16" rx="3" fill="#2A2738" stroke="rgba(238,235,245,.2)"/>' +
          '<g id="ph-dial"><rect x="214" y="146" width="96" height="26" rx="8" fill="#22202E" stroke="rgba(238,235,245,.2)"/><ellipse cx="262" cy="146" rx="44" ry="9" fill="#2C2940" stroke="rgba(238,235,245,.25)"/></g>' +
          '<g id="ph-lever"><rect x="600" y="150" width="70" height="8" rx="4" fill="#3A3650" stroke="rgba(238,235,245,.25)"/></g>' +
          '<rect x="676" y="150" width="58" height="22" rx="7" fill="#22202E" stroke="rgba(238,235,245,.2)"/><ellipse id="ph-btn" cx="705" cy="150" rx="26" ry="7" fill="#F2A65A" opacity=".95"/>' +
          '<rect x="180" y="168" width="640" height="300" rx="34" fill="url(#cb)" stroke="rgba(238,235,245,.25)"/>' +
          '<rect x="180" y="214" width="640" height="210" fill="url(#kn)" opacity=".55"/>' +
          '<rect x="716" y="168" width="104" height="300" rx="34" fill="#1E1C2A" stroke="rgba(238,235,245,.18)"/>' +
          '<rect x="726" y="214" width="84" height="210" rx="18" fill="url(#kn)"/>' +
          '<text x="214" y="200" fill="rgba(238,235,245,.55)" font-family="JetBrains Mono, monospace" font-size="15" letter-spacing="3">kb · 35MM</text>' +
          '<circle id="ph-led" cx="676" cy="196" r="7" fill="#F2A65A"/><circle cx="676" cy="196" r="14" fill="none" stroke="rgba(242,166,90,.35)"/>' +
          '<circle cx="500" cy="318" r="176" fill="#0E0D15" stroke="rgba(238,235,245,.3)" stroke-width="1.5"/>' +
          '<g id="ph-ring"><circle cx="500" cy="318" r="160" fill="none" stroke="#2B2840" stroke-width="18" stroke-dasharray="3 5"/>' +
            '</g>' +
          '<circle cx="500" cy="318" r="146" fill="none" stroke="rgba(238,235,245,.25)"/>' +
          '<circle cx="500" cy="318" r="134" fill="none" stroke="#1C1A28" stroke-width="16"/>' +
          '<circle cx="500" cy="318" r="112" fill="none" stroke="rgba(238,235,245,.45)" stroke-width="1.5"/>' +
          '<path id="ph-glint" d="M 430 250 A 100 100 0 0 1 560 236" fill="none" stroke="rgba(214,222,255,.5)" stroke-width="5" stroke-linecap="round"/>' +
          '<circle id="ph-pulse" cx="500" cy="318" r="118" fill="none" stroke="rgba(242,166,90,.8)" stroke-width="1.5"/>' +
          '<g class="ph-call" font-family="JetBrains Mono, monospace" font-size="13" letter-spacing="1.5">' +
            '<path d="M500 82 L500 40 L640 40" stroke="rgba(242,166,90,.8)" fill="none"/><circle cx="500" cy="82" r="3" fill="#F2A65A"/><text x="648" y="44" fill="#EEEBF5">' + esc(P.camera || '') + '</text>' +
            '<path d="M640 230 L860 120 L900 120" stroke="rgba(242,166,90,.8)" fill="none"/><circle cx="640" cy="230" r="3" fill="#F2A65A"/><text x="860" y="108" fill="#EEEBF5">' + spec(1) + '</text>' +
            '<path d="M200 330 L90 330 L60 300" stroke="rgba(242,166,90,.8)" fill="none"/><circle cx="200" cy="330" r="3" fill="#F2A65A"/><text x="40" y="288" fill="#EEEBF5">' + spec(2) + '</text>' +
            '<path d="M760 468 L760 520 L900 520" stroke="rgba(242,166,90,.8)" fill="none"/><circle cx="760" cy="468" r="3" fill="#F2A65A"/><text x="760" y="545" fill="#EEEBF5">' + det(2) + '</text>' +
            '<text x="500" y="530" fill="#F2A65A" text-anchor="middle" letter-spacing="3" class="ph-look">' + esc(KB.L({ en: 'CLICK THE LENS TO LOOK THROUGH', ja: 'レンズをクリックしてのぞく' })) + '</text>' +
          '</g></svg>';
      return '<section class="ph-hero" id="ph-hero"><div class="ph-stage" id="ph-stage">' +
        '<div class="ph-reel"><div class="ph-strip sprockets" id="ph-strip"></div></div>' +
        '<div class="ph-vf" id="ph-vf"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><i class="ring"></i>' +
          '<div class="ph-vtop"><div class="ph-chips" role="group" aria-label="Filter photos">' + chips + '</div>' +
            '<button type="button" class="ph-x" id="ph-x">' + esc(KB.L({ en: 'EXIT', ja: '閉じる' })) + ' ✕</button></div>' +
          '<span class="rd">1/125&nbsp;&nbsp;F2.8&nbsp;&nbsp;ISO 400&nbsp;&nbsp;▸ <b id="ph-count">01</b> / <b id="ph-total">01</b>&nbsp;&nbsp;·&nbsp;&nbsp;' + esc(KB.L({ en: 'CLICK A PHOTO TO VIEW · SCROLL TO ADVANCE', ja: 'クリックで表示 · スクロールで次へ' })) + '</span></div>' +
        '<div class="ph-cam" id="ph-cam"><div class="ph-tilt" id="ph-tilt">' + cam + '</div><button type="button" class="ph-lensbtn" id="ph-lensbtn" aria-label="' + esc(KB.L({ en: 'Look through the camera', ja: 'カメラをのぞく' })) + '"></button></div>' +
        '<header class="pp-top"><a class="logo" href="index.html#archive"><b>kb</b><span class="sub-l">' + ui('allWork') + '</span></a>' +
          '<span class="tr"><span>EXP ' + KB.expLabel() + ' / 36</span>' + KB.langBtn() + '</span></header>' +
        '<div class="ph-title" id="ph-title"><span class="pp-side micro" style="position:static">' + esc(sideLabel) + '</span>' +
          '<h1 class="ph-h1">' + t(P.title || K.title) + '</h1><p class="pp-hook">' + t(P.hook) + '</p>' +
          (credits ? '<dl class="pp-credits">' + credits + '</dl>' : '') + '</div>' +
        '<span class="pp-cue micro" id="ph-cue" aria-hidden="true">' + esc(KB.L({ en: 'SCROLL TO LOOK THROUGH ↓', ja: 'スクロールでのぞく ↓' })) + '</span>' +
      '</div></section>';
    }
    // Favourite frame: zoom in and move around like a map; the side bar shows where you are.
    function zoomFeature() {
      var F = P.feature || {};
      var pic = F.src ? '<img src="' + esc(F.src) + '" alt="' + t(F.title) + '" draggable="false">' : '<span class="ph-ph">[ ' + esc(KB.L({ en: 'YOUR FAVOURITE PHOTO', ja: 'お気に入りの写真' })) + ' ]</span>';
      return '<section class="ph-feat wrap"><div class="pp-shead"><span class="kick kick-amber">' + fr() + t(P.featureHead) + '</span><span class="micro">' + esc(KB.L({ en: 'ZOOM IN — LOOK CLOSER', ja: 'ズームして近くで見る' })) + '</span></div>' +
        '<div class="ph-mapgrid">' +
          '<div class="ph-view" id="mv"><div class="ph-img" id="mv-img">' + pic + '</div>' +
            '<div class="ph-zctl"><button type="button" data-z="1.6" aria-label="Zoom in">+</button><button type="button" data-z="0.625" aria-label="Zoom out">−</button><button type="button" data-z="0" aria-label="Reset">⟲</button></div>' +
            '<span class="ph-zhint micro">' + esc(KB.L({ en: KB.touch ? 'PINCH OR + TO ZOOM · DRAG TO MOVE' : 'DOUBLE-CLICK OR + TO ZOOM · DRAG TO MOVE', ja: KB.touch ? 'ピンチか＋でズーム · ドラッグで移動' : 'ダブルクリックか＋でズーム · ドラッグで移動' })) + '</span></div>' +
          '<aside class="ph-side"><div class="ph-mini" id="mm"><div class="mi">' + (F.src ? '<img src="' + esc(F.src) + '" alt="" draggable="false">' : '<span class="ph-ph"></span>') + '</div><i class="box" id="mm-box"></i></div>' +
            '<span class="ph-zv micro" id="mm-z">ZOOM 1.0×</span>' +
            '<span class="micro">' + t(F.title) + '</span><p>' + t(F.story) + '</p></aside>' +
        '</div></section>';
    }
    function feature() {
      var F = P.feature || {};
      return '<section class="pp-feat wrap"><span class="kick kick-amber">' + fr() + t(P.featureHead) + '</span><div class="pp-fgrid">' +
        '<figure class="dev"><div class="ph">' + (F.src ? '<img src="' + esc(F.src) + '" alt="' + t(F.title) + '" loading="lazy">' : '[ PHOTO ]') + '</div></figure>' +
        '<div class="pp-ftext dev"><span class="micro">' + t(F.title) + '</span><p>' + t(F.story) + '</p></div></div></section>';
    }
    function closing() {
      return '<section class="pp-end"><span class="ln dev" aria-hidden="true"><i></i></span><span class="kick">' + fr() + t(P.closingHead) + '</span>' +
        '<p class="pp-etext dev">' + t(P.closing) + '</p><span class="sig dev">— ' + esc(S.person.name) + ' · <span lang="ja">' + esc(S.person.nameJa) + '</span></span></section>';
    }
    function nextLink() {
      if (!next) return '';
      var nw = (next.page.word || L(next.page.title)).toUpperCase();
      return '<a class="pp-next" href="' + KB.caseHref(next) + '"><span class="k">' + esc(KB.L({ en: 'NEXT', ja: '次へ' })) + ' — ' + pad(mates.indexOf(next) + 1) + ' / ' + pad(mates.length) + ' →</span><span class="big" data-text="' + esc(nw) + '">' + esc(nw) + '</span></a>';
    }
    var end = '<div class="wrap pp-tail"><a class="drow flat" href="index.html#archive"><span class="dk">' + ui('back') + '</span><span class="dt">' + ui('allWorkT') + '</span></a><div style="margin-top:32px">' + KB.footer() + '</div></div>';
    var floatEl = '<div class="pp-float" id="pp-float" aria-hidden="true">[ PHOTO ]</div>';
    var lightbox = '<div class="pp-lb" id="pp-lb" hidden role="dialog" aria-modal="true" aria-label="Photo"><button type="button" class="x" data-lbx aria-label="Close">✕</button>' +
      '<button type="button" class="nv p" data-lbp aria-label="Previous">←</button><figure><div class="ph" id="lb-ph"></div><figcaption><span id="lb-lab"></span><span id="lb-cap"></span></figcaption></figure>' +
      '<button type="button" class="nv n" data-lbn aria-label="Next">→</button></div>';

    var body;
    if (style === 'photo') { hero = photoHero(); body = manifesto() + zoomFeature() + closing() + nextLink() + lightbox; }
    else if (style === 'editorial') body = tickerEditorial() + manifesto() + lookbook() + favLines() + closing() + nextLink() + floatEl;
    else if (style === 'art') body = marqueeArt() + manifesto() + wall() + favLabels() + closing() + nextLink();
    else body = marqueeBold() + manifesto() + gallerySideways() + player() + closing() + nextLink();

    document.getElementById('app').innerHTML = hero + body + end;
    KB.furniture();
    KB.pageByHash();
    KB.shootOnce();
    KB.reveal();

    /* ================= motion ================= */
    var nextBig = document.querySelector('.pp-next .big');
    var fitNext = function () { if (nextBig) KB.fitText(nextBig, nextBig.parentNode.clientWidth - 2 * parseFloat(getComputedStyle(nextBig.parentNode).paddingLeft)); };
    fitNext();
    window.addEventListener('resize', fitNext);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNext);
    var heroEl = document.getElementById('pp-hero');
    var art = {};
    if (!photo) {
    KB.heroScroll(heroEl);

    // giant word always fits (with room for the vertical Japanese on the right)
    var wordFit = document.getElementById('pp-word'), jpEl = heroEl.querySelector('.pp-jp');
    var fitWord = function () {
      var w = heroEl.clientWidth, left = wordFit.offsetLeft, narrow = w <= 720;
      var right = (!narrow && jpEl) ? jpEl.offsetWidth + (w - jpEl.offsetLeft - jpEl.offsetWidth) + 24 : left;
      KB.fitText(wordFit, w - left - right);
    };
    fitWord();

    // header artwork
    art = (KB.vis[P.theme] || KB.vis.vinyl)();
    art.limitY = function () { return wordFit.offsetTop - 28; };
    var cv = document.getElementById('pp-cv');
    var st = KB.canvas(cv, Object.assign(art, { pointerTarget: heroEl }));
    var refit = function () { fitWord(); if (st) st.layout(); };
    window.addEventListener('resize', refit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
    if (art.down) {
      cv.addEventListener('pointerdown', function (e) {
        var r = cv.getBoundingClientRect();
        if (art.down(st, e.clientX - r.left, e.clientY - r.top)) { try { cv.setPointerCapture(e.pointerId); } catch (err) {} cv.style.cursor = 'grabbing'; }
      });
      cv.addEventListener('pointermove', function (e) {
        var r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        art.move(st, x, y);
        if (!art.grab && st.g) { var dx = x - st.g.cx, dy = y - st.g.cy; cv.style.cursor = dx * dx + dy * dy < st.g.R * st.g.R ? 'grab' : ''; }
      });
      var up = function () { art.up(); cv.style.cursor = ''; };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    }
    if (art.shuffle || art.shoot) {
      cv.style.cursor = art.shoot ? 'crosshair' : 'pointer';
      cv.addEventListener('click', function (e) {
        var r = cv.getBoundingClientRect();
        if (art.shuffle) art.shuffle(st, e.clientX - r.left, e.clientY - r.top);
        if (art.shoot) { art.shoot(st); KB.shoot(); }
      });
    }

    // giant word: a spotlight of colour follows the pointer (drifts by itself on phones)
    var wordEl = document.getElementById('pp-word');
    if (KB.touch || KB.reduce) {
      wordEl.style.setProperty('--r', KB.reduce ? '220px' : '140px');
      if (!KB.reduce) {
        var drift = function (ts) {
          var s = ts / 1000, wr = wordEl.getBoundingClientRect();
          wordEl.style.setProperty('--mx', (wr.width * (0.5 + 0.42 * Math.sin(s * 0.55))).toFixed(0) + 'px');
          wordEl.style.setProperty('--my', (wr.height * (0.5 + 0.3 * Math.sin(s * 0.9))).toFixed(0) + 'px');
          requestAnimationFrame(drift);
        };
        requestAnimationFrame(drift);
      }
    } else {
      heroEl.addEventListener('pointermove', function (e) {
        var wr = wordEl.getBoundingClientRect();
        wordEl.style.setProperty('--mx', (e.clientX - wr.left).toFixed(0) + 'px');
        wordEl.style.setProperty('--my', (e.clientY - wr.top).toFixed(0) + 'px');
        wordEl.style.setProperty('--r', '190px');
      });
      heroEl.addEventListener('pointerleave', function () { wordEl.style.setProperty('--r', '0px'); });
    }
    }  // end: shared header

    // PHOTOGRAPHY header behaviour
    var phHero = document.getElementById('ph-hero');
    if (phHero) {
      var cam = document.getElementById('ph-cam'), tilt = document.getElementById('ph-tilt'), svg = document.getElementById('ph-svg'), strip = document.getElementById('ph-strip');
      var vf = document.getElementById('ph-vf'), ttl = document.getElementById('ph-title'), cue = document.getElementById('ph-cue'), cnt = document.getElementById('ph-count'), tot = document.getElementById('ph-total');
      var ring = document.getElementById('ph-ring'), glint = document.getElementById('ph-glint'), led = document.getElementById('ph-led'), pulse = document.getElementById('ph-pulse');
      var calls = svg.querySelector('.ph-call'), lensBtn = document.getElementById('ph-lensbtn');
      var phTop = phHero.querySelector('.pp-top');
      var still = KB.reduce, geo = {}, frs = [], shown = [], lastP = 0, mx = 0, my = 0, tx = 0, ty = 0;
      // timeline (share of the pinned scroll): zoom in → photos → zoom back out to the camera
      var Z0 = 0.04, Z1 = 0.24, F0 = 0.3, F1 = 0.82, O0 = 0.86, O1 = 0.98;
      var build = function (filter) {
        shown = phAll.filter(function (x) { return filter === 'all' || x.cat === filter; });
        if (!shown.length) shown = phAll.slice();
        lbItems.length = 0;
        strip.innerHTML = shown.map(function (x, i) {
          lbItems.push({ src: x.src, cap: x.cap, label: pad(x.n) + 'A' + (x.cat ? ' · ' + x.cat.toUpperCase() : '') });
          var tints = ['98,120,255', '242,166,90', '176,124,255', '140,255,193', '255,214,170'];
          return '<button type="button" class="ph-fr" data-lb="' + i + '" style="--t:' + tints[(x.n - 1) % 5] + '" aria-label="' + esc(KB.L({ en: 'View photo ', ja: '写真を見る ' }) + x.n) + '">' +
            (x.src ? '<img src="' + esc(x.src) + '" alt="' + esc(x.cap) + '" loading="' + (i < 2 ? 'eager' : 'lazy') + '">' : '<span>[ PHOTO ' + pad(x.n) + ' ]</span>') +
            '<span class="ed">▸ ' + pad(x.n) + 'A' + (x.cat ? ' · ' + esc(x.cat.toUpperCase()) : '') + '</span></button>';
        }).join('');
        frs = strip.querySelectorAll('.ph-fr');
        tot.textContent = pad(shown.length);
        strip.querySelectorAll('img').forEach(function (im) { im.addEventListener('load', measure); });
      };
      var measure = function () {
        var vh = window.innerHeight, vw = window.innerWidth;
        // measure the camera at rest — never while it's zoomed or tilted (that was the glitch)
        cam.style.transform = 'none'; tilt.style.transform = 'none';
        phHero.style.height = still ? '' : (vh * (2.6 + shown.length * 0.45)) + 'px';
        phHero.classList.toggle('static', still);
        // where the lens really is on screen (the drawing can be letterboxed inside its box)
        var sr = cam.getBoundingClientRect(), M = svg.getScreenCTM();
        var pt = svg.createSVGPoint(); pt.x = 500; pt.y = 318; pt = pt.matrixTransform(M);
        var k = Math.hypot(M.a, M.b);
        geo.vx = pt.x; geo.vy = pt.y; geo.r = 112 * k;
        geo.cx = pt.x - sr.left; geo.cy = pt.y - sr.top;
        geo.max = Math.hypot(Math.max(geo.vx, vw - geo.vx), Math.max(geo.vy, vh - geo.vy)) / geo.r * 1.1;
        cam.style.transformOrigin = geo.cx + 'px ' + geo.cy + 'px';
        var m = 'radial-gradient(circle at ' + geo.cx.toFixed(1) + 'px ' + geo.cy.toFixed(1) + 'px, transparent ' + geo.r.toFixed(1) + 'px, #000 ' + (geo.r + 1).toFixed(1) + 'px)';
        cam.style.webkitMaskImage = m; cam.style.maskImage = m;
        window.__phGeo = geo;
        lensBtn.style.left = (geo.cx - geo.r) + 'px'; lensBtn.style.top = (geo.cy - geo.r) + 'px'; lensBtn.style.width = lensBtn.style.height = (geo.r * 2) + 'px';
        if (frs.length) { var f0 = frs[0].getBoundingClientRect(); geo.fw = f0.width; geo.gap = frs.length > 1 ? frs[1].getBoundingClientRect().left - f0.left : f0.width; }
        update();
      };
      var ease = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x); };
      var progress = function () { var r = phHero.getBoundingClientRect(); return Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - window.innerHeight))); };
      var scrollToP = function (p) {
        var top = phHero.getBoundingClientRect().top + window.scrollY, span = phHero.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + span * p, behavior: KB.reduce ? 'auto' : 'smooth' });
      };
      var update = function () {
        if (still || !geo.fw) return;
        var vh = window.innerHeight, vw = window.innerWidth, p = progress(); lastP = p;
        var zin = ease((p - Z0) / (Z1 - Z0)), zout = ease((p - O0) / (O1 - O0));
        var z = zin * (1 - zout);
        var s = 1 + Math.pow(z, 2.2) * (geo.max - 1);
        var calm = 1 - z;
        // tilt the whole layer (camera + lens opening together) so the glass and photo always line up
        cam.style.transform = 'perspective(1600px) rotateX(' + (ty * calm).toFixed(2) + 'deg) rotateY(' + (tx * calm).toFixed(2) + 'deg) scale(' + s.toFixed(3) + ')';
        var inside = z > 0.97;
        cam.style.opacity = String(inside ? 0 : 1);
        cam.style.visibility = inside ? 'hidden' : 'visible';
        var outside = 1 - ease(z / 0.25);
        ttl.style.opacity = String(outside); cue.style.opacity = String(p < 0.5 ? outside : 0);
        calls.style.opacity = String(outside);
        phTop.style.opacity = String(1 - ease((z - 0.6) / 0.3)); phTop.style.pointerEvents = z > 0.8 ? 'none' : '';
        vf.style.opacity = String(ease((z - 0.85) / 0.15));
        vf.classList.toggle('on', z > 0.95);
        ring.setAttribute('transform', 'rotate(' + (p * 540).toFixed(1) + ' 500 318)');
        var q = ease((p - F0) / (F1 - F0)) * (shown.length - 1);
        var x = vw / 2 - geo.fw / 2 - q * geo.gap;
        var lift = 1 - ease(z / 0.6);
        var y = lift * (geo.vy - vh / 2);
        strip.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
        var cur = Math.round(q);
        cnt.textContent = pad(cur + 1);
        frs.forEach(function (f, i) { f.classList.toggle('cur', i === cur); f.tabIndex = z > 0.95 ? 0 : -1; });
      };
      // a camera that feels alive: it leans toward the pointer, the LED blinks, light glints on the glass
      var idle = function (ts) {
        if (!still && lastP < Z1) {
          tx += (mx * 4 - tx) * 0.08; ty += (-my * 3 - ty) * 0.08;
          var s2 = ts / 1000;
          led.setAttribute('opacity', (0.45 + 0.55 * (Math.sin(s2 * 3) > 0.2 ? 1 : 0)).toFixed(2));
          glint.setAttribute('transform', 'rotate(' + (mx * 40 + Math.sin(s2 * 0.6) * 8).toFixed(1) + ' 500 318)');
          var pr = (s2 % 2.2) / 2.2;
          pulse.setAttribute('r', (118 + pr * 70).toFixed(1)); pulse.setAttribute('opacity', (0.8 * (1 - pr)).toFixed(2));
          if (lastP < 0.01) ring.setAttribute('transform', 'rotate(' + (Math.sin(s2 * 0.5) * 6).toFixed(1) + ' 500 318)');
          update();
        }
        requestAnimationFrame(idle);
      };
      phHero.addEventListener('pointermove', function (e) { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; });
      phHero.addEventListener('pointerleave', function () { mx = 0; my = 0; });
      // click the lens → zoom in; click the body → take a shot
      lensBtn.addEventListener('click', function () { scrollToP(F0 + 0.002); });
      cam.addEventListener('click', function (e) {
        if (e.target === lensBtn) return;
        cam.classList.remove('flash'); void cam.offsetWidth; cam.classList.add('flash');
        KB.shoot();
      });
      document.getElementById('ph-x').addEventListener('click', function () { scrollToP(1); });
      vf.querySelectorAll('.ph-chip').forEach(function (c) {
        c.addEventListener('click', function () {
          vf.querySelectorAll('.ph-chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
          build(c.getAttribute('data-f')); measure();
          window.scrollTo({ top: phHero.getBoundingClientRect().top + window.scrollY + (phHero.offsetHeight - window.innerHeight) * F0 + 2, behavior: 'auto' });
          update();
        });
      });
      strip.addEventListener('click', function (e) { var b = e.target.closest('[data-lb]'); if (b && openLb) openLb(+b.getAttribute('data-lb')); });
      build('all');
      measure();
      window.addEventListener('resize', measure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      KB.onScroll(update);
      requestAnimationFrame(idle);
    }
    // favourite frame: zoom + pan like a map
    var mv = document.getElementById('mv');
    if (mv) {
      var img = document.getElementById('mv-img'), box = document.getElementById('mm-box'), zl = document.getElementById('mm-z'), mm = document.getElementById('mm');
      var Z = { s: 1, x: 0, y: 0 };
      var clampZ = function () {
        var w = mv.clientWidth, h = mv.clientHeight;
        Z.s = Math.max(1, Math.min(6, Z.s));
        Z.x = Math.min(0, Math.max(w - w * Z.s, Z.x)); Z.y = Math.min(0, Math.max(h - h * Z.s, Z.y));
      };
      var draw = function (anim) {
        clampZ();
        img.style.transition = anim ? 'transform .35s cubic-bezier(.2,.8,.2,1)' : 'none';
        img.style.transform = 'translate(' + Z.x.toFixed(1) + 'px,' + Z.y.toFixed(1) + 'px) scale(' + Z.s.toFixed(3) + ')';
        var w = mv.clientWidth, h = mv.clientHeight;
        box.style.left = (-Z.x / (w * Z.s) * 100) + '%'; box.style.top = (-Z.y / (h * Z.s) * 100) + '%';
        box.style.width = (100 / Z.s) + '%'; box.style.height = (100 / Z.s) + '%';
        zl.textContent = 'ZOOM ' + Z.s.toFixed(1) + '×';
        mv.classList.toggle('zoomed', Z.s > 1.01);
      };
      var zoomAt = function (f, cx, cy, anim) {
        if (f === 0) { Z.s = 1; Z.x = 0; Z.y = 0; draw(true); return; }
        var ns = Math.max(1, Math.min(6, Z.s * f)), k = ns / Z.s;
        Z.x = cx - (cx - Z.x) * k; Z.y = cy - (cy - Z.y) * k; Z.s = ns; draw(anim);
      };
      mv.querySelectorAll('[data-z]').forEach(function (b) {
        b.addEventListener('click', function () { zoomAt(parseFloat(b.getAttribute('data-z')), mv.clientWidth / 2, mv.clientHeight / 2, true); });
      });
      mv.addEventListener('dblclick', function (e) { var r = mv.getBoundingClientRect(); zoomAt(Z.s > 3.5 ? 0 : 2, e.clientX - r.left, e.clientY - r.top, true); });
      mv.addEventListener('wheel', function (e) {
        if (!e.ctrlKey && Z.s <= 1.01) return;          // let the page scroll unless you're zooming
        e.preventDefault();
        var r = mv.getBoundingClientRect();
        if (e.ctrlKey) zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top, false);
        else { Z.x -= e.deltaX; Z.y -= e.deltaY; draw(false); }
      }, { passive: false });
      var ptrs = {}, start = null;
      mv.addEventListener('pointerdown', function (e) {
        if (e.target.closest('button')) return;
        ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
        try { mv.setPointerCapture(e.pointerId); } catch (err) {}
        start = null;
      });
      mv.addEventListener('pointermove', function (e) {
        if (!ptrs[e.pointerId]) return;
        var prev = ptrs[e.pointerId]; ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
        var ids = Object.keys(ptrs), r = mv.getBoundingClientRect();
        if (ids.length === 2) {
          var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (start) zoomAt(d / start, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, false);
          start = d;
        } else if (ids.length === 1 && Z.s > 1.01) {
          Z.x += e.clientX - prev.x; Z.y += e.clientY - prev.y; draw(false);
        }
      });
      var lift = function (e) { delete ptrs[e.pointerId]; start = null; };
      mv.addEventListener('pointerup', lift); mv.addEventListener('pointercancel', lift);
      mm.addEventListener('click', function (e) {
        var r = mm.getBoundingClientRect(), w = mv.clientWidth, h = mv.clientHeight;
        if (Z.s <= 1.01) Z.s = 2.5;
        Z.x = -((e.clientX - r.left) / r.width * w * Z.s - w / 2); Z.y = -((e.clientY - r.top) / r.height * h * Z.s - h / 2); draw(true);
      });
      window.addEventListener('resize', function () { draw(false); });
      draw(false);
    }

    // marquees (faster when you scroll; the editorial one stays calm)
    var m1 = document.getElementById('pp-m1'), m2 = document.getElementById('pp-m2');
    var p1 = 0, p2 = 0, vel = 0, lastY = window.scrollY, lastT = 0, playing = false;
    var spin = function (ts) {
      var dt = lastT ? Math.min(0.05, (ts - lastT) / 1000) : 0; lastT = ts;
      var y = window.scrollY, dy = y - lastY; lastY = y;
      vel = vel * 0.9 + dy * 0.1;
      if (art.kick && Math.abs(dy) > 2) art.kick(Math.abs(dy) * 0.01);
      if (art.kick && playing) art.kick(0.04);
      if (!KB.reduce && m1) {
        var calm = style === 'editorial';
        var sp = calm ? 28 : 70 + Math.min(900, Math.abs(vel) * 40);
        var h1 = m1.scrollWidth / 2;
        p1 = (p1 + sp * dt) % h1;
        m1.style.transform = 'translate3d(' + (-p1).toFixed(1) + 'px,0,0)';
        if (m2) { var h2 = m2.scrollWidth / 2; p2 = (p2 + sp * 0.8 * dt) % h2; m2.style.transform = 'translate3d(' + (p2 - h2).toFixed(1) + 'px,0,0)'; }
      }
      requestAnimationFrame(spin);
    };
    requestAnimationFrame(spin);

    // manifesto: words light up as you scroll
    var maniEl = document.getElementById('pp-mani'), mw = maniEl ? maniEl.querySelectorAll('.pp-mtext span') : [], lit = -1;
    var ART = ['w1', 'w2', 'w3', 'w4', '', 'w1', '', 'w2', 'w5', '', 'w3', ''];
    if (style === 'art') mw.forEach(function (w, k) { var c = ART[(k * 7 + 3) % ART.length]; if (c) w.classList.add(c); });

    // sideways gallery (music)
    var galEl = document.getElementById('pp-gal'), track = document.getElementById('pp-track');
    var pinGallery = !!galEl && !KB.touch && !KB.reduce && window.innerWidth > 720;
    var sizeGallery = function () {
      if (!galEl) return;
      if (!pinGallery) { galEl.classList.add('native'); galEl.style.height = ''; return; }
      galEl.style.height = (window.innerHeight + Math.max(0, track.scrollWidth - window.innerWidth)) + 'px';
    };
    sizeGallery();
    window.addEventListener('resize', sizeGallery);
    if (track) track.querySelectorAll('img').forEach(function (im) { im.addEventListener('load', sizeGallery); });

    // lookbook parallax (fashion)
    var looks = document.querySelectorAll('.lk[data-speed]');
    KB.onScroll(function (y, vh) {
      if (maniEl && !KB.reduce) {
        var r = maniEl.getBoundingClientRect();
        var pr = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh) * 1.15));
        var n2 = Math.round(pr * mw.length);
        if (n2 !== lit) { lit = n2; mw.forEach(function (w, k) { w.classList.toggle('on', k < n2); w.classList.toggle('hot', k === n2 - 1); }); }
      }
      if (pinGallery) {
        var g = galEl.getBoundingClientRect(), extra = Math.max(0, track.scrollWidth - window.innerWidth);
        var gp = Math.max(0, Math.min(1, -g.top / Math.max(1, g.height - vh)));
        track.style.transform = 'translate3d(' + (-gp * extra).toFixed(1) + 'px,0,0)';
      }
      if (looks.length && !KB.reduce && !KB.touch) {
        looks.forEach(function (el) {
          var r2 = el.getBoundingClientRect(), c = r2.top + r2.height / 2 - vh / 2;
          el.style.transform = 'translate3d(0,' + (c * parseFloat(el.getAttribute('data-speed'))).toFixed(1) + 'px,0)';
        });
      }
    });

    // a photo frame that follows the cursor (fashion favourites)
    var fl = document.getElementById('pp-float');
    if (fl && !KB.touch) {
      document.querySelectorAll('.pp-fi').forEach(function (li) {
        li.addEventListener('pointerenter', function () { var src = li.getAttribute('data-src'); fl.innerHTML = src ? '<img src="' + esc(src) + '" alt="">' : '[ PHOTO ]'; fl.classList.add('on'); });
        li.addEventListener('pointerleave', function () { fl.classList.remove('on'); });
        li.addEventListener('pointermove', function (e) { fl.style.left = e.clientX + 'px'; fl.style.top = e.clientY + 'px'; });
      });
    }

    // the wall: drag pieces around (mouse / pen)
    var board = document.getElementById('pp-board');
    if (board && !KB.touch) {
      var zTop = 10;
      board.querySelectorAll('.pc').forEach(function (pc) {
        pc.addEventListener('pointerdown', function (e) {
          if (e.button !== 0) return;
          e.preventDefault();
          var br = board.getBoundingClientRect(), sx = e.clientX, sy = e.clientY;
          var l0 = pc.offsetLeft, t0 = pc.offsetTop;
          pc.style.zIndex = ++zTop; pc.classList.add('drag');
          try { pc.setPointerCapture(e.pointerId); } catch (err) {}
          var mv = function (ev) {
            pc.style.left = ((l0 + ev.clientX - sx) / br.width * 100).toFixed(2) + '%';
            pc.style.top = ((t0 + ev.clientY - sy) / br.height * 100).toFixed(2) + '%';
          };
          var upf = function () { pc.classList.remove('drag'); pc.removeEventListener('pointermove', mv); pc.removeEventListener('pointerup', upf); pc.removeEventListener('pointercancel', upf); };
          pc.addEventListener('pointermove', mv); pc.addEventListener('pointerup', upf); pc.addEventListener('pointercancel', upf);
        });
      });
    }

    // the "On repeat" player (music)
    var pl = document.getElementById('pp-player');
    if (pl) {
      var tracks = P.tracks || [], cur = 0, pos = 0, lastP = 0, audio = document.getElementById('pl-audio');
      var $ = function (id) { return document.getElementById(id); };
      var cover = function (x, i) {
        if (x.cover) return '<img src="' + esc(x.cover) + '" alt="">';
        return '<span class="cn">' + pad(i + 1) + '</span><span class="cl">kb<br>B-SIDE</span><span class="cg" aria-hidden="true"></span>';
      };
      var load = function (i) {
        cur = (i + tracks.length) % tracks.length; pos = 0;
        var x = tracks[cur];
        $('pl-cover').innerHTML = cover(x, cur);
        pl.style.setProperty('--hue', ['140,255,193', '176,124,255', '98,120,255', '242,166,90'][cur % 4]);
        $('pl-title').textContent = L(x.title); $('pl-artist').textContent = x.artist || '';
        $('pl-len').textContent = clock(secs(x.length));
        var ln = $('pl-link'); if (x.link) { ln.href = x.link; ln.style.display = ''; } else { ln.removeAttribute('href'); ln.style.display = 'none'; }
        pl.querySelectorAll('.pp-tr').forEach(function (b) { b.classList.toggle('cur', +b.getAttribute('data-i') === cur); });
        if (x.audio) { audio.src = x.audio; } else { audio.removeAttribute('src'); }
        paint();
      };
      var paint = function () {
        var len = secs(tracks[cur].length);
        $('pl-fill').style.transform = 'scaleX(' + Math.min(1, pos / len).toFixed(4) + ')';
        $('pl-cur').textContent = clock(pos);
        $('pl-state').textContent = playing ? KB.L({ en: '▶ NOW PLAYING', ja: '▶ 再生中' }) : KB.L({ en: 'PAUSED', ja: '一時停止中' });
        $('pl-play').innerHTML = playing ? PAUSE : PLAY;
        $('pl-play').setAttribute('aria-label', playing ? 'Pause' : 'Play');
        pl.classList.toggle('is-playing', playing);
      };
      var play = function (on) {
        playing = on;
        var x = tracks[cur];
        if (x.audio) { if (on) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); } else audio.pause(); }
        paint();
      };
      var tick = function (ts) {
        var dt = lastP ? Math.min(0.1, (ts - lastP) / 1000) : 0; lastP = ts;
        if (playing) {
          var x = tracks[cur];
          pos = x.audio && audio.src ? audio.currentTime : pos + dt;
          if (pos >= secs(x.length) || (x.audio && audio.ended)) { load(cur + 1); play(true); }
          else paint();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      $('pl-play').addEventListener('click', function () { play(!playing); });
      $('pl-prev').addEventListener('click', function () { var was = playing; load(pos > 3 ? cur : cur - 1); play(was); });
      $('pl-next').addEventListener('click', function () { var was = playing; load(cur + 1); play(was); });
      pl.querySelectorAll('.pp-tr').forEach(function (b) {
        b.addEventListener('click', function () { var i = +b.getAttribute('data-i'); if (i === cur) play(!playing); else { load(i); play(true); } });
      });
      $('pl-track').addEventListener('click', function (e) {
        var r = this.getBoundingClientRect(), f = (e.clientX - r.left) / r.width, len = secs(tracks[cur].length);
        pos = Math.max(0, Math.min(len - 1, f * len)); if (tracks[cur].audio) audio.currentTime = pos; paint();
      });
      if (tracks.length) load(0);
    }

    // contact sheets → lightbox (photography)
    var lb = document.getElementById('pp-lb');
    if (lb) {
      var li = 0, lastFocus = null;
      var show = function (i) {
        li = (i + lbItems.length) % lbItems.length;
        var it = lbItems[li];
        document.getElementById('lb-ph').innerHTML = it.src ? '<img src="' + esc(it.src) + '" alt="' + esc(it.cap) + '">' : '<span>[ PHOTO ]</span>';
        document.getElementById('lb-lab').textContent = it.label;
        document.getElementById('lb-cap').textContent = it.cap || KB.L({ en: '[Caption]', ja: '［キャプション］' });
      };
      var open = function (i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('[data-lbx]').focus(); };
      openLb = open;
      var close = function () { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
      document.querySelectorAll('[data-lb]').forEach(function (b) { if (!b.closest('#ph-strip')) b.addEventListener('click', function () { open(+b.getAttribute('data-lb')); }); });
      lb.addEventListener('click', function (e) {
        if (e.target.closest('[data-lbx]') || e.target === lb) close();
        else if (e.target.closest('[data-lbp]')) show(li - 1);
        else if (e.target.closest('[data-lbn]')) show(li + 1);
      });
      document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(li - 1); else if (e.key === 'ArrowRight') show(li + 1);
      });
      var tx0 = null;
      lb.addEventListener('touchstart', function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) { if (tx0 == null) return; var d = e.changedTouches[0].clientX - tx0; if (Math.abs(d) > 50) show(li + (d < 0 ? 1 : -1)); tx0 = null; });
    }
  };
})();
