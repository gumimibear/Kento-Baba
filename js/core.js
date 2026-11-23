/* =========================================================
   core.js — shared helpers for every page.
   You shouldn't need to edit this file. Text lives in content.js.
   ========================================================= */
(function () {
  'use strict';
  var S = window.SITE;
  var KB = window.KB = {};
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  };
  KB.store = store;

  /* ---------- language ---------- */
  KB.lang = store.get('kb-lang') === 'ja' ? 'ja' : 'en';
  document.documentElement.lang = KB.lang;
  document.documentElement.classList.add('js');
  KB.ja = KB.lang === 'ja';

  // Pick the right language from { en, ja } (plain strings pass through).
  KB.L = function (v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v;
    return v[KB.lang] != null ? v[KB.lang] : (v.en != null ? v.en : '');
  };
  KB.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  // Escaped text in the current language.
  KB.t = function (v) { return KB.esc(KB.L(v)); };
  // Interface words, with {n} {code} {cat} filled in.
  KB.ui = function (key, vars) {
    var dict = (S.ui && S.ui[KB.lang]) || {};
    var s = dict[key] != null ? dict[key] : ((S.ui && S.ui.en && S.ui.en[key]) || key);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return KB.esc(s);
  };
  KB.setLang = function (l) {
    store.set('kb-lang', l);
    window.location.reload();
  };
  KB.langBtn = function () {
    return '<button type="button" class="lang-btn" data-lang-toggle aria-label="' + (KB.ja ? 'Switch to English' : '日本語に切り替え') + '">' + (KB.ja ? 'EN' : '日本語') + '</button>';
  };

  /* ---------- data lookups ---------- */
  // Pages are addressed as chapter.html#qut or case.html#bundaberg
  // (chapter.html?id=qut also works).
  KB.param = function (k) {
    var m = new RegExp('[?&]' + k + '=([^&#]*)').exec(window.location.search);
    if (m) return decodeURIComponent(m[1]);
    var h = window.location.hash.replace(/^#/, '');
    return h ? decodeURIComponent(h) : null;
  };
  KB.pageByHash = function () {
    // Going from one chapter/case to another: open the new one at the top.
    window.addEventListener('hashchange', function () {
      try { window.history.scrollRestoration = 'manual'; } catch (e) {}
      window.scrollTo(0, 0);
      window.location.reload();
    });
  };
  KB.chapter = function (id) { return S.chapters.filter(function (c) { return c.id === id; })[0] || null; };
  KB.chapterIndex = function (id) { for (var i = 0; i < S.chapters.length; i++) if (S.chapters[i].id === id) return i; return -1; };
  KB.casesOf = function (id) { return S.cases.filter(function (c) { return c.chapter === id; }); };
  KB.caseById = function (id) { return S.cases.filter(function (c) { return c.id === id; })[0] || null; };
  KB.cat = function (id) {
    var c = S.categories.filter(function (x) { return x.id === id; })[0];
    return c ? c[KB.lang] || c.en : String(id || '').toUpperCase();
  };
  KB.chapterHref = function (id) { return 'chapter.html#' + encodeURIComponent(id); };
  KB.caseHref = function (c) {
    if (!c) return null;
    if (c.link) return c.link;
    if (c.page) return 'case.html#' + encodeURIComponent(c.id);
    return null;
  };
  KB.pad = function (n) { return String(n).padStart(2, '0'); };

  /* ---------- motion preference ---------- */
  KB.reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Phones and tablets (no mouse): no hover effects, lighter animation.
  KB.touch = !!(window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches);

  /* ---------- the 36-exposure roll ----------
     Each new page you open is one "shot". Clicking the landing hero is one too.
     Reloading the same page (e.g. switching language) doesn't count twice. */
  var expListeners = [];
  KB.exp = Math.min(36, parseInt(store.get('kb-exp') || '0', 10) || 0);
  KB.setExp = function (n) {
    KB.exp = n;
    store.set('kb-exp', String(n));
    expListeners.forEach(function (fn) { fn(n); });
  };
  KB.shoot = function () { KB.setExp(KB.exp >= 36 ? 1 : KB.exp + 1); };
  KB.onExp = function (fn) { expListeners.push(fn); fn(KB.exp); };
  KB.shootOnce = function () {
    var key = 'kb-shot:' + window.location.pathname + window.location.search + window.location.hash;
    var seen = null;
    try { seen = window.sessionStorage.getItem(key); } catch (e) {}
    if (seen) return;
    try { window.sessionStorage.setItem(key, '1'); } catch (e) {}
    KB.shoot();
  };
  KB.expLabel = function () { return '<span data-exp>' + KB.pad(KB.exp) + '</span>'; };

  /* ---------- page furniture: grain, shutter, roll-complete toast ---------- */
  KB.furniture = function (opts) {
    opts = opts || {};
    var b = document.body;
    var grain = '<svg class="grain" aria-hidden="true"><filter id="kb-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"></feTurbulence></filter><rect width="100%" height="100%" filter="url(#kb-grain)"></rect></svg>';
    var shutter = '<div class="shutter" aria-hidden="true"><i class="t"></i><i class="b"></i><i class="s"></i></div>';
    b.insertAdjacentHTML('beforeend', grain + shutter);
    var toast = null;
    KB.onExp(function (n) {
      document.querySelectorAll('[data-exp]').forEach(function (el) { el.textContent = KB.pad(n); });
      if (n === 36 && !toast) {
        b.insertAdjacentHTML('beforeend', '<a class="toast" href="' + (opts.contactHref || 'index.html#contact') + '"><span class="micro kick-a">' + KB.ui('rollDone') + '</span><span style="font-size:16px">' + KB.ui('rollLine') + '</span></a>');
        toast = b.lastElementChild;
      } else if (n !== 36 && toast) { toast.remove(); toast = null; }
    });
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-lang-toggle]');
      if (btn) KB.setLang(KB.ja ? 'en' : 'ja');
      var top = e.target.closest && e.target.closest('[data-top]');
      if (top) {
        e.preventDefault();
        try { window.scrollTo({ top: 0, behavior: KB.reduce ? 'auto' : 'smooth' }); } catch (err) { window.scrollTo(0, 0); }
      }
    });
  };

  /* ---------- scroll-in reveals ---------- */
  KB.reveal = function () {
    var els = document.querySelectorAll('.dev, .stag, .mask.solo');
    if (KB.reduce || !window.IntersectionObserver) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ---------- one throttled scroll handler ---------- */
  var scrollFns = [], sTick = 0;
  function runScroll() {
    sTick = 0;
    scrollFns.forEach(function (fn) { fn(window.scrollY || 0, window.innerHeight || 800); });
  }
  KB.onScroll = function (fn) {
    if (!scrollFns.length) {
      window.addEventListener('scroll', function () { if (!sTick) sTick = requestAnimationFrame(runScroll); }, { passive: true });
      window.addEventListener('resize', function () { if (!sTick) sTick = requestAnimationFrame(runScroll); });
    }
    scrollFns.push(fn);
    fn(window.scrollY || 0, window.innerHeight || 800);
  };
  // Header parallax (--sy)
  KB.heroScroll = function (el) {
    if (!el) return;
    KB.onScroll(function (y) { el.style.setProperty('--sy', String(Math.max(0, Math.min(700, y)))); });
  };

  /* ---------- live clock ---------- */
  KB.clock = function () {
    var run = function () {
      var s = '--:--';
      try { s = new Date().toLocaleTimeString('en-GB', { timeZone: S.person.clockZone || 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }); } catch (e) {}
      document.querySelectorAll('[data-clock]').forEach(function (el) { el.textContent = s; });
    };
    run();
    setInterval(run, 15000);
  };

  /* ---------- count-up numbers ---------- */
  KB.countUp = function () {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var draw = function (p) {
      els.forEach(function (el) {
        var n = Math.round(parseFloat(el.getAttribute('data-count')) * p);
        el.textContent = (el.getAttribute('data-pre') || '') + n + (el.getAttribute('data-suf') || '');
      });
    };
    if (KB.reduce) { draw(1); return; }
    draw(0);
    var t0 = performance.now();
    var step = function (now) {
      var p = Math.min(1, (now - t0 - 500) / 1400);
      if (p > 0) draw(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- small shared markup ---------- */
  KB.footer = function () {
    var p = S.person;
    return '<footer class="foot"><span>© ' + new Date().getFullYear() + ' ' + KB.esc(p.name.toUpperCase()) + ' · <span lang="ja">' + KB.esc(p.nameJa) + '</span> · ' + KB.t(p.place) + '</span><span>' + KB.t(p.fuel) + '</span></footer>';
  };
  // Film frames: real photos if given, otherwise numbered placeholders.
  KB.frames = function (photos, opts) {
    opts = opts || {};
    var list = (photos || []).slice();
    var out = [];
    if (list.length) {
      list.forEach(function (ph, i) {
        out.push({ img: ph.src, alt: KB.L(ph.alt || ph.caption) || '', cap: KB.L(ph.caption) || [ph.place, ph.year].filter(Boolean).join(' · '), n: KB.pad(i + 1) });
      });
    } else {
      var labels = opts.placeholders || null;
      for (var i = 0; i < (opts.count || 6); i++) out.push({ label: labels ? labels[i % labels.length] : KB.L({ en: 'PHOTO', ja: 'PHOTO' }), n: KB.pad(i + 1) });
    }
    return out;
  };
  KB.frameHTML = function (f, extraCap) {
    var pic = f.img
      ? '<div class="photo"><img src="' + KB.esc(f.img) + '" alt="' + KB.esc(f.alt) + '" loading="lazy"></div>'
      : '<div class="photo">[ ' + KB.esc(f.label) + ' ]</div>';
    var cap = f.img ? KB.esc(f.cap || '') : (extraCap != null ? extraCap : KB.ui('caption'));
    return '<figure class="frame">' + pic + '<figcaption class="cap"><span>▸ ' + f.n + 'A</span><span>' + cap + '</span></figcaption></figure>';
  };
  // Rolling strip (duplicates frames so the loop is seamless).
  KB.rollHTML = function (frames) {
    var html = frames.map(function (f) { return KB.frameHTML(f); }).join('');
    var reps = frames.length < 6 ? Math.ceil(6 / Math.max(1, frames.length)) : 1;
    var one = '';
    for (var i = 0; i < reps; i++) one += html;
    return '<div class="rollwrap sprockets"><div class="roll">' + one + one + '</div></div>';
  };

  KB.rollHint = function () {
    return '<span class="micro roll-hint"><span class="mouse">' + KB.ui('rollMouse') + '</span><span class="touch">' + KB.ui('rollTouch') + '</span></span>';
  };

  /* ---------- film rolls: run by themselves; drag, swipe or scroll to move ---------- */
  KB.rolls = function () {
    document.querySelectorAll('.rollwrap').forEach(function (wrap) {
      var roll = wrap.querySelector('.roll');
      if (!roll) return;
      var pos = 0, half = 0, speed = 50, hover = false, drag = null, idleUntil = 0, vis = true, fling = 0, lastT = 0;
      var measure = function () { half = roll.scrollWidth / 2; };
      var clamp = function () { if (half > 0) pos = ((pos % half) + half) % half; };
      var apply = function () { roll.style.transform = 'translate3d(' + (-pos).toFixed(1) + 'px,0,0)'; };
      measure();
      if (window.ResizeObserver) new ResizeObserver(measure).observe(roll);
      if (window.IntersectionObserver) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(wrap);
      wrap.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hover = true; });
      wrap.addEventListener('pointerleave', function () { hover = false; });
      wrap.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        drag = { x: e.clientX, y: e.clientY, p: pos, id: e.pointerId, moved: false, lx: e.clientX, lt: performance.now(), v: 0 };
        fling = 0;
      });
      wrap.addEventListener('pointermove', function (e) {
        if (!drag || e.pointerId !== drag.id) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now();
        if (!drag.moved) {
          if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
            drag.moved = true;
            try { wrap.setPointerCapture(e.pointerId); } catch (err) {}
            wrap.classList.add('is-drag');
          } else if (Math.abs(dy) > 10) { drag = null; return; }
          else return;
        }
        var dt = Math.max(1, now - drag.lt);
        drag.v = 0.7 * drag.v + 0.3 * ((e.clientX - drag.lx) / dt);
        drag.lx = e.clientX; drag.lt = now;
        pos = drag.p - dx; clamp(); apply();
      });
      var end = function () {
        if (drag && drag.moved) fling = -drag.v * 1000;
        drag = null;
        wrap.classList.remove('is-drag');
        idleUntil = performance.now() + 1800;
      };
      wrap.addEventListener('pointerup', end);
      wrap.addEventListener('pointercancel', end);
      wrap.addEventListener('dragstart', function (e) { e.preventDefault(); });
      wrap.addEventListener('wheel', function (e) {
        var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
        if (!d) return;
        e.preventDefault();
        fling = 0; pos += d; clamp(); apply();
        idleUntil = performance.now() + 1500;
      }, { passive: false });
      var tick = function (ts) {
        var dt = lastT ? Math.min(0.05, (ts - lastT) / 1000) : 0;
        lastT = ts;
        if (vis && !drag) {
          if (fling) {
            pos += fling * dt;
            fling *= Math.pow(0.04, dt);
            if (Math.abs(fling) < 8) fling = 0;
          } else if (!hover && !KB.reduce && ts > idleUntil) pos += speed * dt;
          clamp(); apply();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  // Shrink a big headline so it always fits on one line.
  KB.fitText = function (el, avail) {
    if (!el || !avail) return;
    el.style.fontSize = '';
    var fs = parseFloat(window.getComputedStyle(el).fontSize), w = el.scrollWidth;
    if (w > avail && w > 0) el.style.fontSize = Math.floor(fs * avail / w) + 'px';
  };

  /* ---------- canvas helpers ---------- */
  KB.rgb = function (hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    var v = parseInt(m ? m[1] : '8CFFC1', 16);
    return ((v >> 16) & 255) + ',' + ((v >> 8) & 255) + ',' + (v & 255);
  };
  KB.A = '140,255,193';  // mint
  KB.B = '176,124,255';  // violet
  KB.fit = function (el) {
    if (!el) return null;
    var w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return null;
    var dpr = Math.min(window.devicePixelRatio || 1, KB.touch ? 1.5 : 2);
    el.width = Math.round(w * dpr);
    el.height = Math.round(h * dpr);
    var ctx = el.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  };
  // A soft white-on-black text mask, used by the ASCII art.
  KB.makeMask = function (w, h, word, wFrac, hFrac) {
    var mw = Math.max(1, Math.round(w)), mh = Math.max(1, Math.round(h));
    var off = document.createElement('canvas');
    off.width = mw; off.height = mh;
    var o = off.getContext('2d');
    o.fillStyle = '#000'; o.fillRect(0, 0, mw, mh);
    var fam = 'Syne, "Arial Black", sans-serif';
    o.font = '800 100px ' + fam;
    var s = Math.max(10, Math.min(100 * (mw * (wFrac || 0.62)) / Math.max(1, o.measureText(word).width), mh * (hFrac || 0.62)));
    o.font = '800 ' + s + 'px ' + fam;
    o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillStyle = '#fff';
    var blur = Math.max(1, Math.round(s * 0.02));
    if ('filter' in o) o.filter = 'blur(' + blur + 'px)';
    else { o.shadowColor = '#fff'; o.shadowBlur = blur * 2; }
    o.fillText(word, mw / 2, mh / 2 + s * 0.04);
    var d = o.getImageData(0, 0, mw, mh).data;
    var mask = new Float32Array(mw * mh);
    for (var i = 0; i < mask.length; i++) mask[i] = d[i * 4] / 255;
    return { mask: mask, mw: mw, mh: mh };
  };

  /* ---------- canvas engine ----------
     KB.canvas(el, impl) sizes the canvas, tracks the pointer, pauses when
     off-screen, and calls impl.draw(st, t) every frame.                   */
  var stages = [], frameNo = 0, running = false;
  function loop(ts) {
    frameNo++;
    for (var i = 0; i < stages.length; i++) {
      var st = stages[i];
      if (!st.ctx) continue;
      var m = st.m;
      m.a += ((KB.reduce ? 0 : m.on) - m.a) * (st.impl.ease || 0.08);
      if ((KB.reduce || st.impl.still) && !st.dirty) continue;
      if (!st.vis && !st.dirty) continue;
      var every = st.impl.every || (KB.touch ? 2 : 0);
      if (every && frameNo % every && !st.dirty) continue;
      if (st.t0 === null) st.t0 = ts;
      st.age = KB.reduce ? 99 : (ts - st.t0) * 0.001;
      st.dirty = false;
      st.impl.draw(st, KB.reduce ? 0 : ts * 0.001, ts);
    }
    requestAnimationFrame(loop);
  }
  KB.canvas = function (el, impl) {
    if (!el) return null;
    var st = { el: el, impl: impl, m: { x: 0, y: 0, on: 0, a: 0 }, vis: true, dirty: true, t0: null, age: 0 };
    st.layout = function () {
      var f = KB.fit(el);
      if (!f) return;
      st.ctx = f.ctx; st.w = f.w; st.h = f.h;
      if (impl.layout) impl.layout(st);
      st.dirty = true;
    };
    if (impl.pointer !== false) {
      var target = impl.pointerTarget || el;
      var move = function (e) {
        var r = el.getBoundingClientRect();
        st.m.x = e.clientX - r.left; st.m.y = e.clientY - r.top; st.m.on = 1;
        if (KB.reduce) st.dirty = true;
      };
      target.addEventListener('pointermove', move);
      target.addEventListener('pointerdown', move);
      target.addEventListener('pointerleave', function () { st.m.on = 0; if (KB.reduce) st.dirty = true; });
    }
    if (window.ResizeObserver) new ResizeObserver(function () { st.layout(); }).observe(el);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (en) {
        en.forEach(function (x) { st.vis = x.isIntersecting; if (st.vis) st.dirty = true; });
      }).observe(el);
    }
    st.layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(st.layout);
    setTimeout(st.layout, 1500);
    stages.push(st);
    if (!running) { running = true; requestAnimationFrame(loop); }
    return st;
  };
})();
