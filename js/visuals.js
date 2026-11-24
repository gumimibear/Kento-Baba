/* =========================================================
   visuals.js — the coded, moving artwork (no images, no AI).
   Each function returns a "drawer" for KB.canvas(el, drawer).
   ========================================================= */
(function () {
  'use strict';
  var KB = window.KB;
  var V = KB.vis = {};
  var TAU = Math.PI * 2;
  var A = KB.A, B = KB.B;
  var MONO = '500 10px "JetBrains Mono", ui-monospace, monospace';

  function blob(ctx, w, h, x, y, r, stops) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    stops.forEach(function (s) { g.addColorStop(s[0], s[1]); });
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  // The shared dark backdrop: deep ink, blue glow, violet corner, a hint of mint.
  function backdrop(ctx, w, h, t, o) {
    o = o || {};
    var big = Math.max(w, h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#13121C';
    ctx.fillRect(0, 0, w, h);
    blob(ctx, w, h, w * (o.gx || 0.7) + Math.sin(t * 0.15) * w * 0.03, h * (o.gy || 0.36), big * (o.gr || 0.55), [[0, 'rgba(98,120,255,' + (o.ga || 0.6) + ')'], [0.45, 'rgba(76,68,214,' + ((o.ga || 0.6) * 0.42).toFixed(3) + ')'], [1, 'rgba(19,18,28,0)']]);
    blob(ctx, w, h, w * 0.98, h * 0.95, big * 0.36, [[0, 'rgba(' + B + ',' + (o.va || 0.45) + ')'], [1, 'rgba(' + B + ',0)']]);
    if (o.mint !== false) blob(ctx, w, h, w * 0.06, h * 1.02, big * 0.22, [[0, 'rgba(' + A + ',0.12)'], [1, 'rgba(' + A + ',0)']]);
  }
  // Darken the left (where the text sits) and the bottom edge.
  function veil(ctx, w, h, strength, fadeBottom) {
    ctx.globalCompositeOperation = 'source-over';
    var g = ctx.createLinearGradient(0, 0, w * (w < 760 ? 1 : 0.62), 0);
    g.addColorStop(0, 'rgba(19,18,28,' + (strength || 0.82) + ')');
    g.addColorStop(1, 'rgba(19,18,28,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    if (fadeBottom !== false) {
      var f = ctx.createLinearGradient(0, h * 0.62, 0, h);
      f.addColorStop(0, 'rgba(19,18,28,0)');
      f.addColorStop(1, 'rgba(19,18,28,0.85)');
      ctx.fillStyle = f;
      ctx.fillRect(0, 0, w, h);
    }
  }
  function cursorGlow(ctx, m, r) {
    if (m.a <= 0.02) return;
    var g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r);
    g.addColorStop(0, 'rgba(' + A + ',' + (0.7 * m.a).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + A + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(m.x, m.y, r, 0, TAU); ctx.fill();
  }

  /* ---------- Landing hero: liquid metaballs + click-to-shoot viewfinder ---------- */
  V.liquid = function () {
    var balls = [
      { ax: 0.9, ay: 0.5, s: 0.31, p: 0.0, k: 1.0 },
      { ax: 0.6, ay: 0.8, s: 0.23, p: 2.1, k: 0.8 },
      { ax: 1.1, ay: 0.4, s: 0.19, p: 4.2, k: 0.7 },
      { ax: 0.4, ay: 0.6, s: 0.37, p: 1.3, k: 0.55 }
    ];
    var self = {
      flash: 0,
      layout: function (st) {
        var fw = Math.max(1, Math.ceil(st.w / 4)), fh = Math.max(1, Math.ceil(st.h / 4));
        var f = document.createElement('canvas'); f.width = fw; f.height = fh;
        var g = document.createElement('canvas'); g.width = Math.max(1, Math.ceil(fw / 4)); g.height = Math.max(1, Math.ceil(fh / 4));
        var fctx = f.getContext('2d');
        st.field = { c: f, ctx: fctx, img: fctx.createImageData(fw, fh), fw: fw, fh: fh, g: g, gctx: g.getContext('2d') };
        if (!st.cur) st.cur = { x: st.w * 0.7, y: st.h * 0.4 };
      },
      shoot: function (st) { self.flash = KB.reduce ? 0 : 1; st.dirty = true; },
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m;
        var narrow = w < 720;
        var cx = narrow ? w * 0.52 : w * 0.66, cy = narrow ? h * 0.34 : h * 0.44;
        var base = Math.min(w, h) * (narrow ? 0.13 : 0.12);
        var big = Math.max(w, h);
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.fillStyle = '#16142C'; ctx.fillRect(0, 0, w, h);
        blob(ctx, w, h, cx + Math.sin(t * 0.17) * w * 0.04, cy - h * 0.1, big * 0.62, [[0, 'rgba(98,120,255,0.92)'], [0.42, 'rgba(76,68,214,0.45)'], [1, 'rgba(22,20,44,0)']]);
        blob(ctx, w, h, w * 0.9 + Math.cos(t * 0.13) * w * 0.03, h * 0.86, big * 0.42, [[0, 'rgba(' + B + ',0.6)'], [1, 'rgba(' + B + ',0)']]);
        blob(ctx, w, h, cx - w * 0.05 + Math.cos(t * 0.11) * w * 0.02, h * 0.06, big * 0.26, [[0, 'rgba(216,224,255,0.55)'], [1, 'rgba(216,224,255,0)']]);
        blob(ctx, w, h, w * 0.18, h * 0.92, big * 0.22, [[0, 'rgba(' + A + ',0.16)'], [1, 'rgba(' + A + ',0)']]);
        var lg;
        if (!narrow) {
          lg = ctx.createLinearGradient(0, 0, w * 0.55, 0);
          lg.addColorStop(0, 'rgba(22,20,44,0.7)'); lg.addColorStop(1, 'rgba(22,20,44,0)');
          ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h);
        }
        lg = ctx.createLinearGradient(0, h * (narrow ? 0.5 : 0.62), 0, h);
        lg.addColorStop(0, 'rgba(19,18,28,0)'); lg.addColorStop(1, 'rgba(19,18,28,0.92)');
        ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h);

        // liquid
        var pts = balls.map(function (b) {
          return { x: cx + Math.sin(t * b.s + b.p) * base * b.ax * 1.3, y: cy + Math.cos(t * b.s * 0.8 + b.p * 1.3) * base * b.ay * 1.3, r: base * b.k };
        });
        var live = m.on && !KB.reduce;
        var tx = live ? m.x : cx + base * 1.1, ty = live ? m.y : cy - base * 0.6;
        if (KB.reduce) { st.cur.x = tx; st.cur.y = ty; }
        else { st.cur.x += (tx - st.cur.x) * 0.05; st.cur.y += (ty - st.cur.y) * 0.05; }
        pts.push({ x: st.cur.x, y: st.cur.y, r: base * 0.5 });
        field(st, pts);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(236,240,255,0.5)';
        for (var k = 0; k < 3; k++) {
          var R = base * (2.0 + k * 0.85);
          var rot = t * 0.04 * (k % 2 ? 1 : -1) + k * 0.9 - 0.3;
          var ratio = 0.34 + k * 0.06;
          ctx.beginPath();
          for (var j = 0; j <= 140; j++) {
            var th = (j / 140) * TAU;
            var rr = R * (1 + 0.07 * Math.sin(3 * th + t * 0.5 + k * 2));
            var ex = Math.cos(th) * rr, ey = Math.sin(th) * rr * ratio;
            var X = cx + ex * Math.cos(rot) - ey * Math.sin(rot), Y = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
            if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
          }
          ctx.stroke();
        }
        // viewfinder
        if (live) {
          var bw = 84, bh = 56, L = 12;
          ctx.save();
          ctx.strokeStyle = 'rgba(' + A + ',0.95)'; ctx.lineWidth = 1.2;
          ctx.beginPath();
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
            var px = m.x + c[0] * bw / 2, py = m.y + c[1] * bh / 2;
            ctx.moveTo(px - c[0] * L, py); ctx.lineTo(px, py); ctx.lineTo(px, py - c[1] * L);
          });
          ctx.stroke();
          ctx.fillStyle = 'rgba(' + A + ',0.95)';
          ctx.beginPath(); ctx.arc(m.x, m.y, 1.6, 0, TAU); ctx.fill();
          ctx.font = MONO; ctx.textAlign = 'center';
          ctx.fillText('f/2.8  1/125  ISO 400', m.x, m.y + bh / 2 + 16);
          ctx.textAlign = 'start';
          ctx.restore();
        }
        if (self.flash > 0.01) {
          ctx.fillStyle = 'rgba(255,255,255,' + (self.flash * 0.6).toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
          self.flash *= 0.86;
          st.dirty = true;
        } else self.flash = 0;
      }
    };
    return self;
  };
  function field(st, pts) {
    var ctx = st.ctx, w = st.w, h = st.h, F = st.field;
    var data = F.img.data, fw = F.fw, fh = F.fh, sx = w / fw, sy = h / fh;
    var n = pts.length, px = [], py = [], pr = [];
    for (var k = 0; k < n; k++) { px.push(pts[k].x / sx); py.push(pts[k].y / sy); var rr = pts[k].r / sx; pr.push(rr * rr); }
    var ss = function (a, b, x) { var u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
    var o = 0;
    for (var y = 0; y < fh; y++) {
      for (var x = 0; x < fw; x++) {
        var f = 0;
        for (k = 0; k < n; k++) { var dx = x - px[k], dy = y - py[k]; f += pr[k] / (dx * dx + dy * dy + 1); }
        var core = ss(0.95, 1.2, f), halo = ss(0.3, 1.0, f) * 0.5;
        data[o] = 176 + 79 * core; data[o + 1] = 190 + 65 * core; data[o + 2] = 255;
        data[o + 3] = Math.max(core, halo) * 255;
        o += 4;
      }
    }
    F.ctx.putImageData(F.img, 0, 0);
    F.gctx.clearRect(0, 0, F.g.width, F.g.height);
    F.gctx.drawImage(F.c, 0, 0, F.g.width, F.g.height);
    ctx.imageSmoothingEnabled = true;
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.7;
    ctx.drawImage(F.g, 0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.drawImage(F.c, 0, 0, w, h);
  }

  /* ---------- ASCII word (chapter cards + track preview) ----------
     Noise "tunes in" to the word on hover (hvT = 1).                      */
  V.ascii = function (word, seed) {
    var self = {
      every: 2, pointer: false, word: String(word || ''), hv: KB.touch ? 1 : 0, hvT: KB.touch ? 1 : 0, still: KB.touch,
      layout: function (st) { st.mask = KB.makeMask(st.w, st.h, self.word); },
      setWord: function (st, w) {
        if (w === self.word) return;
        self.word = String(w || '');
        if (st.w) st.mask = KB.makeMask(st.w, st.h, self.word);
        self.hv = (KB.reduce || KB.touch) ? 1 : 0; self.hvT = 1; st.dirty = true;
      },
      hover: function (st, on) { if (KB.touch) return; self.hvT = on ? 1 : 0; if (KB.reduce) self.hv = self.hvT; st.dirty = true; },
      draw: function (st, t) {
        var ctx = st.ctx, M = st.mask;
        if (!M) return;
        if (!KB.reduce) { self.hv += (self.hvT - self.hv) * 0.15; if (Math.abs(self.hvT - self.hv) > 0.01) st.dirty = true; }
        var hv = self.hv;
        ctx.clearRect(0, 0, st.w, st.h);
        var ramp = ' .:-=+*#%@', L = ramp.length - 1, cw = 8, ch = 13;
        var cols = Math.ceil(st.w / cw), rows = Math.ceil(st.h / ch), tick = Math.floor(t * 10), sd = seed || 0;
        var lit = 'rgba(' + A + ',' + (0.4 + 0.6 * hv).toFixed(3) + ')';
        var dim = 'rgba(166,161,188,' + (0.42 - 0.24 * hv).toFixed(3) + ')';
        ctx.font = '500 12px "JetBrains Mono", ui-monospace, monospace';
        ctx.textBaseline = 'top';
        for (var r = 0; r < rows; r++) {
          var py = Math.min(M.mh - 1, (r * ch + ch / 2) | 0);
          for (var q = 0; q < cols; q++) {
            var px = Math.min(M.mw - 1, (q * cw + cw / 2) | 0);
            var v = M.mask[py * M.mw + px];
            var s = Math.sin(q * 12.9898 + r * 78.233 + tick * 0.37 + sd * 11.7) * 43758.5453;
            var n = s - Math.floor(s);
            var wave = 0.5 + 0.5 * Math.sin(q * 0.35 + r * 0.6 + t * 2 + sd);
            var val = v * (0.35 + 0.65 * hv) + (n * 0.55 + wave * 0.25) * (0.55 - 0.45 * hv);
            var idx = Math.max(0, Math.min(L, Math.floor(val * L)));
            if (!idx) continue;
            ctx.fillStyle = v > 0.45 ? lit : dim;
            ctx.fillText(ramp[idx], q * cw, r * ch);
          }
        }
      }
    };
    return self;
  };

  /* ---------- Chapter 01: network + rising sun (QUT Japan) ---------- */
  V['network-sun'] = function () {
    var SUN = KB.rgb('#F0645A');
    return {
      layout: function (st) {
        var w = st.w, h = st.h, narrow = w < 760;
        var n = Math.max(70, Math.min(170, Math.round((w * h) / 6000)));
        st.disc = { x: narrow ? w * 0.6 : w * 0.68, y: h * (narrow ? 0.3 : 0.4), r: Math.min(w, h) * (narrow ? 0.24 : 0.27) };
        var nd = Math.round(n * 0.62);
        st.nodes = [];
        for (var i = 0; i < n; i++) {
          if (i < nd) {
            var a = Math.random() * TAU, rr = Math.sqrt(Math.random()) * st.disc.r;
            var hx = st.disc.x + Math.cos(a) * rr, hy = st.disc.y + Math.sin(a) * rr;
            st.nodes.push({ disc: true, hx: hx, hy: hy, x: hx, y: hy, ph: Math.random() * TAU, r: 1.3 + Math.random() * 1.9, born: 0.05 + (rr / st.disc.r) * 0.9 + Math.random() * 0.25 });
          } else {
            st.nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1.2 + Math.random() * 2, born: Math.random() * 1.4, mint: Math.random() < 0.14 });
          }
        }
        // start the sunrise once (re-sizing later doesn't restart it)
        if (!st.sunStarted) { st.sunStarted = true; st.t0 = null; }
      },
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m, age = st.age, R = KB.reduce;
        backdrop(ctx, w, h, t, { gy: 0.34, ga: 0.62 });
        var grow = Math.min(1, age / 1.2), D0 = st.disc, breathe = R ? 1 : 1 + 0.03 * Math.sin(t * 0.8);
        var sg = ctx.createRadialGradient(D0.x, D0.y, 0, D0.x, D0.y, D0.r * 1.55 * breathe);
        sg.addColorStop(0, 'rgba(' + SUN + ',' + (0.42 * grow).toFixed(3) + ')');
        sg.addColorStop(0.6, 'rgba(' + SUN + ',' + (0.16 * grow).toFixed(3) + ')');
        sg.addColorStop(1, 'rgba(' + SUN + ',0)');
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(D0.x, D0.y, D0.r * 1.55 * breathe, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(' + SUN + ',' + (0.35 * grow).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(D0.x, D0.y, D0.r * 1.08, 0, TAU * grow); ctx.stroke();
        var D = Math.max(80, Math.min(130, w * 0.085)), live = [], i, j, p;
        for (i = 0; i < st.nodes.length; i++) {
          p = st.nodes[i];
          var vis = Math.max(0, Math.min(1, (age - p.born) / 0.5));
          if (vis <= 0) continue;
          var dx, dy, d2;
          if (p.disc) {
            p.x = p.hx + (R ? 0 : Math.sin(t * 0.6 + p.ph) * 3.5);
            p.y = p.hy + (R ? 0 : Math.cos(t * 0.5 + p.ph) * 3.5);
            if (m.a > 0.05) {
              dx = m.x - p.x; dy = m.y - p.y; d2 = dx * dx + dy * dy;
              if (d2 < 22500) { var dd = Math.sqrt(d2) || 1, f = (1 - dd / 150) * 10 * m.a; p.x -= dx / dd * f; p.y -= dy / dd * f; }
            }
          } else if (!R) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
            if (m.a > 0.05) { dx = m.x - p.x; dy = m.y - p.y; d2 = dx * dx + dy * dy; if (d2 < 40000 && d2 > 1) { p.x += dx * 0.001 * m.a; p.y += dy * 0.001 * m.a; } }
          }
          live.push([p, vis]);
        }
        for (i = 0; i < live.length; i++) {
          var a = live[i][0];
          for (j = i + 1; j < live.length; j++) {
            var b = live[j][0], ex = a.x - b.x, ey = a.y - b.y, d = Math.sqrt(ex * ex + ey * ey);
            var both = a.disc && b.disc, lim = both ? D * 0.62 : D;
            if (d < lim) {
              var al = (1 - d / lim) * (both ? 0.42 : 0.28) * Math.min(live[i][1], live[j][1]);
              ctx.strokeStyle = both ? 'rgba(' + SUN + ',' + al.toFixed(3) + ')' : 'rgba(170,182,255,' + al.toFixed(3) + ')';
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        if (m.a > 0.02) {
          for (i = 0; i < live.length; i++) {
            p = live[i][0];
            var qx = p.x - m.x, qy = p.y - m.y, qd = Math.sqrt(qx * qx + qy * qy);
            if (qd < 180) {
              ctx.strokeStyle = 'rgba(' + A + ',' + ((1 - qd / 180) * 0.6 * m.a).toFixed(3) + ')';
              ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(p.x, p.y); ctx.stroke();
            }
          }
          cursorGlow(ctx, m, 28);
        }
        for (i = 0; i < live.length; i++) {
          p = live[i][0];
          var v2 = live[i][1], pulse = 1 + 0.25 * Math.sin(t * 1.4 + i);
          ctx.fillStyle = p.disc ? 'rgba(' + SUN + ',' + (0.95 * v2).toFixed(3) + ')' : p.mint ? 'rgba(' + A + ',' + (0.95 * v2).toFixed(3) + ')' : 'rgba(226,232,255,' + (0.85 * v2).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * pulse, 0, TAU); ctx.fill();
        }
        veil(ctx, w, h);
        if (!R && age < 2.5) st.dirty = true;
      }
    };
  };

  /* ---------- Chapter 02: broadcast from Tokyo (Workato) ---------- */
  V.broadcast = function () {
    return {
      layout: function (st) {
        var w = st.w, h = st.h, narrow = w < 760;
        var ox = narrow ? w * 0.68 : w * 0.7, oy = h * (narrow ? 0.3 : 0.4), dests = [], stars = [], n = 9;
        for (var i = 0; i < n; i++) {
          var a = -Math.PI * 0.95 + (i / (n - 1)) * Math.PI * 1.9 + (Math.random() - 0.5) * 0.2;
          var r = Math.min(w, h) * (0.32 + Math.random() * 0.22);
          dests.push({ x: ox + Math.cos(a) * r * 1.5, y: oy + Math.sin(a) * r * 0.75, ph: Math.random(), sp: 0.18 + Math.random() * 0.12 });
        }
        for (i = 0; i < 160; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, a: 0.1 + Math.random() * 0.35 });
        st.vs = { ox: ox, oy: oy, dests: dests, stars: stars };
      },
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m, S = st.vs, i;
        backdrop(ctx, w, h, t);
        for (i = 0; i < S.stars.length; i++) {
          var s = S.stars[i];
          ctx.fillStyle = 'rgba(226,232,255,' + (s.a * (0.7 + 0.3 * Math.sin(t * 1.2 + i))).toFixed(3) + ')';
          ctx.fillRect(s.x, s.y, 1.3, 1.3);
        }
        ctx.lineWidth = 1;
        for (var k = 0; k < 4; k++) {
          var rr = (t * 46 + k * 110) % 440, al = Math.max(0, 1 - rr / 440) * 0.4;
          ctx.strokeStyle = 'rgba(' + A + ',' + al.toFixed(3) + ')';
          ctx.beginPath(); ctx.ellipse(S.ox, S.oy, rr, rr * 0.62, 0, 0, TAU); ctx.stroke();
        }
        var arc = function (x0, y0, x1, y1, lift) {
          var cx = (x0 + x1) / 2, cy = Math.min(y0, y1) - lift;
          return { cx: cx, cy: cy, at: function (u) { return [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * y1]; } };
        };
        ctx.globalCompositeOperation = 'lighter';
        for (i = 0; i < S.dests.length; i++) {
          var d = S.dests[i], c = arc(S.ox, S.oy, d.x, d.y, Math.hypot(d.x - S.ox, d.y - S.oy) * 0.35);
          ctx.strokeStyle = 'rgba(170,182,255,0.26)';
          ctx.beginPath(); ctx.moveTo(S.ox, S.oy); ctx.quadraticCurveTo(c.cx, c.cy, d.x, d.y); ctx.stroke();
          var p = c.at(KB.reduce ? 0.6 : (t * d.sp + d.ph) % 1);
          var g = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 14);
          g.addColorStop(0, 'rgba(' + A + ',0.85)'); g.addColorStop(1, 'rgba(' + A + ',0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], 14, 0, TAU); ctx.fill();
          ctx.fillStyle = 'rgba(226,232,255,0.9)'; ctx.beginPath(); ctx.arc(d.x, d.y, 2.2, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(226,232,255,0.35)'; ctx.beginPath(); ctx.arc(d.x, d.y, 6, 0, TAU); ctx.stroke();
        }
        if (m.a > 0.02) {
          var mc = arc(S.ox, S.oy, m.x, m.y, Math.hypot(m.x - S.ox, m.y - S.oy) * 0.35);
          ctx.strokeStyle = 'rgba(' + A + ',' + (0.75 * m.a).toFixed(3) + ')';
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(S.ox, S.oy); ctx.quadraticCurveTo(mc.cx, mc.cy, m.x, m.y); ctx.stroke();
          ctx.lineWidth = 1;
          cursorGlow(ctx, m, 24);
        }
        var tg = ctx.createRadialGradient(S.ox, S.oy, 0, S.ox, S.oy, 40);
        tg.addColorStop(0, 'rgba(' + A + ',0.9)'); tg.addColorStop(1, 'rgba(' + A + ',0)');
        ctx.fillStyle = tg; ctx.beginPath(); ctx.arc(S.ox, S.oy, 40, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(S.ox, S.oy, 3.5, 0, TAU); ctx.fill();
        ctx.font = MONO; ctx.fillStyle = 'rgba(236,240,255,0.85)';
        ctx.fillText('TOKYO · 35.7°N', S.ox + 14, S.oy + 22);
        veil(ctx, w, h);
      }
    };
  };

  /* ---------- Chapter 03: data grid with a scan line (University) ---------- */
  V.datagrid = function () {
    return {
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m;
        backdrop(ctx, w, h, t);
        var sp = Math.max(18, Math.min(26, w / 58));
        var cols = Math.ceil(w / sp) + 1, rows = Math.ceil(h / sp) + 1;
        var scan = KB.reduce ? w * 0.7 : ((t * 110) % (w + 300)) - 150, R2 = 2 * 130 * 130;
        for (var r = 0; r < rows; r++) {
          var y = r * sp;
          for (var q = 0; q < cols; q++) {
            var x = q * sp;
            var v = 0.5 + 0.5 * Math.sin(x * 0.011 + t * 0.7) * Math.cos(y * 0.016 - t * 0.45);
            var bump = 0;
            if (m.a > 0.02) { var dx = x - m.x, dy = y - m.y; bump = m.a * Math.exp(-(dx * dx + dy * dy) / R2); }
            var sc = Math.max(0, 1 - Math.abs(x - scan) / 60);
            var s = 0.8 + v * 1.8 + bump * 3 + sc * 1.5;
            var hot = bump > 0.25 || sc > 0.5;
            var al = Math.min(1, 0.1 + v * 0.32 + bump * 0.7 + sc * 0.5);
            ctx.fillStyle = hot ? 'rgba(' + A + ',' + al.toFixed(3) + ')' : 'rgba(190,200,255,' + al.toFixed(3) + ')';
            ctx.fillRect(x - s / 2, y - s / 2, s, s);
          }
        }
        var g = ctx.createLinearGradient(scan - 50, 0, scan + 50, 0);
        g.addColorStop(0, 'rgba(' + A + ',0)'); g.addColorStop(0.5, 'rgba(' + A + ',0.16)'); g.addColorStop(1, 'rgba(' + A + ',0)');
        ctx.fillStyle = g; ctx.fillRect(scan - 50, 0, 100, h);
        ctx.fillStyle = 'rgba(' + A + ',0.55)'; ctx.fillRect(scan, 0, 1, h);
        veil(ctx, w, h);
      }
    };
  };

  /* ---------- Research case: fizz bubbles + a route between two places ---------- */
  V.bubbles = function (route) {
    var rings = [];
    function spawn(st, b, initial) {
      b.r = 3 + Math.pow(Math.random(), 2.2) * 26;
      b.x = Math.random() * st.w;
      b.y = initial ? Math.random() * st.h : st.h + b.r + Math.random() * 60;
      b.v = 0.25 + (32 - b.r) * 0.025 + Math.random() * 0.2;
      b.ph = Math.random() * TAU;
      b.a = 0.35 + Math.random() * 0.5;
      return b;
    }
    return {
      layout: function (st) {
        var count = Math.max(24, Math.round(st.w / 24));
        st.bubbles = [];
        for (var i = 0; i < count; i++) st.bubbles.push(spawn(st, {}, true));
      },
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m, narrow = w < 760;
        var big = Math.max(w, h);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#13121C'; ctx.fillRect(0, 0, w, h);
        blob(ctx, w, h, w * 0.74 + Math.sin(t * 0.15) * w * 0.03, h * 0.38, big * 0.48, [[0, 'rgba(98,120,255,0.7)'], [0.45, 'rgba(76,68,214,0.3)'], [1, 'rgba(19,18,28,0)']]);
        blob(ctx, w, h, w * 0.98, h * 0.95, big * 0.35, [[0, 'rgba(' + B + ',0.5)'], [1, 'rgba(' + B + ',0)']]);
        blob(ctx, w, h, w * 0.08, h * 1.02, big * 0.22, [[0, 'rgba(' + A + ',0.14)'], [1, 'rgba(' + A + ',0)']]);
        veil(ctx, w, h, 0.78, false);
        if (!narrow && route && route.length === 2) {
          var p0 = [w * 0.6, h * 0.8], p1 = [w * 0.88, h * 0.26], c = [w * 0.64, h * 0.12];
          ctx.save(); ctx.setLineDash([4, 7]); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(236,240,255,0.45)';
          ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.quadraticCurveTo(c[0], c[1], p1[0], p1[1]); ctx.stroke(); ctx.restore();
          var u = KB.reduce ? 0.6 : (t * 0.11) % 1;
          var q = function (k) { return (1 - u) * (1 - u) * p0[k] + 2 * (1 - u) * u * c[k] + u * u * p1[k]; };
          var tx = q(0), ty = q(1);
          var g = ctx.createRadialGradient(tx, ty, 0, tx, ty, 26);
          g.addColorStop(0, 'rgba(' + A + ',0.9)'); g.addColorStop(1, 'rgba(' + A + ',0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(tx, ty, 26, 0, TAU); ctx.fill();
          ctx.fillStyle = 'rgba(' + A + ',1)'; ctx.beginPath(); ctx.arc(tx, ty, 3, 0, TAU); ctx.fill();
          [[p0, route[0], 1], [p1, route[1], -1]].forEach(function (pt) {
            var p = pt[0];
            ctx.strokeStyle = 'rgba(236,240,255,0.85)'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, TAU); ctx.stroke();
            ctx.fillStyle = 'rgba(236,240,255,0.95)'; ctx.beginPath(); ctx.arc(p[0], p[1], 2, 0, TAU); ctx.fill();
            ctx.font = MONO; ctx.fillStyle = 'rgba(236,240,255,0.8)';
            ctx.fillText(pt[1], p[0] + 14, p[1] + (pt[2] > 0 ? 22 : -14));
          });
        }
        for (var i = 0; i < st.bubbles.length; i++) {
          var b = st.bubbles[i];
          if (!KB.reduce) {
            b.y -= b.v; b.x += Math.sin(t * 1.3 + b.ph) * 0.35;
            if (b.y < -b.r - 4) spawn(st, b, false);
            if (m.on) {
              var dx = b.x - m.x, dy = b.y - m.y;
              if (dx * dx + dy * dy < (b.r + 16) * (b.r + 16)) { rings.push({ x: b.x, y: b.y, r: b.r, life: 1 }); spawn(st, b, false); continue; }
            }
          }
          var bg = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
          bg.addColorStop(0, 'rgba(220,228,255,' + (b.a * 0.18).toFixed(3) + ')');
          bg.addColorStop(1, 'rgba(220,228,255,' + (b.a * 0.04).toFixed(3) + ')');
          ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(226,232,255,' + (b.a * 0.75).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,' + (b.a * 0.85).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(b.x - b.r * 0.38, b.y - b.r * 0.38, Math.max(0.8, b.r * 0.16), 0, TAU); ctx.fill();
        }
        for (var k = rings.length - 1; k >= 0; k--) {
          var rg = rings[k];
          rg.r += 1.8; rg.life -= 0.05;
          if (rg.life <= 0) { rings.splice(k, 1); continue; }
          ctx.strokeStyle = 'rgba(' + A + ',' + rg.life.toFixed(3) + ')'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(rg.x, rg.y, rg.r, 0, TAU); ctx.stroke();
        }
      }
    };
  };

  /* ---------- Event case: stage beams over a crowd ---------- */
  V.stage = function () {
    return {
      ease: 0.06,
      layout: function (st) {
        var w = st.w, h = st.h, scale = w < 760 ? 0.72 : 1;
        st.crowd = [];
        for (var row = 0; row < 2; row++) {
          var x = (w < 760 ? -20 : w * 0.44) + Math.random() * 20;
          while (x < w + 30) {
            st.crowd.push({ x: x, row: row, s: (row ? 0.78 : 1) * scale * (0.85 + Math.random() * 0.35), arm: Math.random() < (row ? 0.1 : 0.16), side: Math.random() < 0.5 ? -1 : 1, ph: Math.random() * TAU });
            x += (row ? 22 : 30) * scale + Math.random() * 20 * scale;
          }
        }
        st.crowd.sort(function (p, q) { return q.row - p.row; });
        st.haze = [];
        for (var i = 0; i < 90; i++) st.haze.push({ x: Math.random() * w, y: Math.random() * h, v: 0.1 + Math.random() * 0.25, a: 0.15 + Math.random() * 0.5 });
      },
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m, R = KB.reduce, i;
        var beat = R ? 1 : 0.86 + 0.14 * Math.max(0, Math.sin(t * TAU * 2.133));
        backdrop(ctx, w, h, t, { gx: 0.72, gy: 0.3, gr: 0.5, ga: 0.55, va: 0.4, mint: false });
        var cols = ['152,166,255', B, A, '210,220,255', B];
        ctx.globalCompositeOperation = 'lighter';
        for (i = 0; i < 5; i++) {
          var sx = w * (0.1 + 0.2 * i), sy = -16;
          var ang = Math.PI / 2 + Math.sin(t * 0.4 * (0.7 + i * 0.15) + i * 1.7) * 0.5;
          if (m.a > 0.01) ang = ang + (Math.atan2(m.y - sy, m.x - sx) - ang) * m.a * 0.85;
          var L = h * 1.5, ex = sx + Math.cos(ang) * L, ey = sy + Math.sin(ang) * L;
          [[0.085, 0.26], [0.028, 0.26]].forEach(function (cone) {
            var g = ctx.createLinearGradient(sx, sy, ex, ey);
            g.addColorStop(0, 'rgba(' + cols[i] + ',' + (cone[1] * beat).toFixed(3) + ')');
            g.addColorStop(0.55, 'rgba(' + cols[i] + ',' + (cone[1] * 0.2 * beat).toFixed(3) + ')');
            g.addColorStop(1, 'rgba(' + cols[i] + ',0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(sx, sy);
            ctx.lineTo(sx + Math.cos(ang - cone[0]) * L, sy + Math.sin(ang - cone[0]) * L);
            ctx.lineTo(sx + Math.cos(ang + cone[0]) * L, sy + Math.sin(ang + cone[0]) * L);
            ctx.closePath(); ctx.fill();
          });
          var sg = ctx.createRadialGradient(sx, 0, 0, sx, 0, 40);
          sg.addColorStop(0, 'rgba(' + cols[i] + ',0.6)'); sg.addColorStop(1, 'rgba(' + cols[i] + ',0)');
          ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, 0, 40, 0, TAU); ctx.fill();
        }
        for (i = 0; i < st.haze.length; i++) {
          var p = st.haze[i];
          if (!R) { p.y -= p.v; p.x += Math.sin(t * 0.6 + i) * 0.15; if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; } }
          ctx.fillStyle = 'rgba(255,255,255,' + (p.a * 0.28).toFixed(3) + ')';
          ctx.fillRect(p.x, p.y, 1.4, 1.4);
        }
        veil(ctx, w, h, 0.78, false);
        var bpm = t * TAU * 2.133;
        for (i = 0; i < st.crowd.length; i++) {
          var c = st.crowd[i], sc = c.s;
          var bob = R ? 0 : Math.sin(bpm + c.ph) * 2 * sc;
          var baseY = h - (c.row ? 30 : 0), headR = 9 * sc, hy = baseY - 62 * sc + bob;
          ctx.fillStyle = c.row ? '#100E1A' : '#0A0912';
          ctx.strokeStyle = ctx.fillStyle;
          ctx.beginPath(); ctx.arc(c.x, hy, headR, 0, TAU); ctx.fill();
          ctx.beginPath(); ctx.ellipse(c.x, hy + headR + 38 * sc, 20 * sc, 42 * sc, 0, 0, TAU); ctx.fill();
          if (c.arm) {
            ctx.lineCap = 'round'; ctx.lineWidth = 6 * sc;
            ctx.beginPath();
            ctx.moveTo(c.x + c.side * 12 * sc, hy + headR + 10 * sc);
            ctx.lineTo(c.x + c.side * 22 * sc, hy - 30 * sc + bob * 1.5);
            ctx.stroke();
          }
        }
      }
    };
  };

  /* ---------- Personal pages: flowing lines (sound / fabric), lift toward the pointer ---------- */
  V.waves = function () {
    return {
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m;
        backdrop(ctx, w, h, t);
        var lines = w < 760 ? 18 : 26, x0 = w < 760 ? 0 : w * 0.34, step = 6;
        ctx.lineWidth = 1;
        for (var i = 0; i < lines; i++) {
          var k = i / (lines - 1), baseY = h * (0.16 + k * 0.7);
          var hot = Math.abs(k - 0.5) < 0.08;
          ctx.strokeStyle = hot ? 'rgba(' + A + ',0.75)' : 'rgba(190,200,255,' + (0.16 + 0.3 * Math.sin(k * Math.PI)).toFixed(3) + ')';
          ctx.beginPath();
          for (var x = x0; x <= w + step; x += step) {
            var u = (x - x0) / Math.max(1, w - x0);
            var amp = h * 0.05 * Math.sin(u * Math.PI);
            var y = baseY + Math.sin(u * 9 + t * 0.9 + i * 0.45) * amp + Math.sin(u * 23 - t * 1.6 + i) * amp * 0.25;
            if (m.a > 0.02) { var dx = x - m.x, dy = y - m.y, d2 = dx * dx + dy * dy; y -= m.a * 46 * Math.exp(-d2 / 9000) * (dy < 0 ? -1 : 1); }
            if (x === x0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        cursorGlow(ctx, m, 26);
        veil(ctx, w, h, 0.82, false);
      }
    };
  };

  /* =========================================================
     Personal headers: vinyl (music), cloth (fashion), poster (design)
     ========================================================= */
  function ppGeo(w, h) {
    var narrow = w < 760;
    return narrow ? { narrow: true, cx: w * 0.5, cy: h * 0.33, R: Math.min(w * 0.44, h * 0.26) }
                  : { narrow: false, cx: w * 0.64, cy: h * 0.46, R: Math.min(h * 0.37, w * 0.27) };
  }
  function ppBack(ctx, w, h, g, t) {
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.fillStyle = '#0E0D15'; ctx.fillRect(0, 0, w, h);
    var big = Math.max(w, h);
    blob(ctx, w, h, g.cx + Math.sin(t * 0.2) * 20, g.cy, g.R * 2.4, [[0, 'rgba(98,120,255,0.55)'], [0.5, 'rgba(76,68,214,0.2)'], [1, 'rgba(14,13,21,0)']]);
    blob(ctx, w, h, w * 0.96, h * 1.0, big * 0.4, [[0, 'rgba(' + B + ',0.42)'], [1, 'rgba(' + B + ',0)']]);
    blob(ctx, w, h, w * 0.04, h * 0.0, big * 0.28, [[0, 'rgba(' + A + ',0.1)'], [1, 'rgba(' + A + ',0)']]);
  }
  function ppFade(ctx, w, h) {
    var f = ctx.createLinearGradient(0, h * 0.55, 0, h);
    f.addColorStop(0, 'rgba(14,13,21,0)'); f.addColorStop(1, 'rgba(14,13,21,0.92)');
    ctx.fillStyle = f; ctx.fillRect(0, 0, w, h);
  }

  /* ---- MUSIC: a spinning record. Drag it to scratch; scrolling spins it faster. ---- */
  V.vinyl = function () {
    var self = { ang: 0, boost: 0, grab: null, last: 0, label: 'KENTO BABA ✶ B-SIDE ✶ NO. 04 ✶ OFF DUTY ✶ ' };
    self.layout = function (st) {
      var g = st.g = ppGeo(st.w, st.h), R = g.R, size = Math.ceil(R * 2 + 4);
      var dpr = Math.min(window.devicePixelRatio || 1, KB.touch ? 1.5 : 2);
      var c = document.createElement('canvas'); c.width = size * dpr; c.height = size * dpr;
      var o = c.getContext('2d'); o.setTransform(dpr, 0, 0, dpr, 0, 0);
      var m = size / 2;
      o.fillStyle = '#09080E'; o.beginPath(); o.arc(m, m, R, 0, TAU); o.fill();
      for (var r = R * 0.37; r < R * 0.985; r += 1.6) {
        var n = 0.5 + 0.5 * Math.sin(r * 0.9) * Math.sin(r * 0.13);
        o.strokeStyle = 'rgba(200,205,255,' + (0.03 + 0.05 * n).toFixed(3) + ')';
        o.lineWidth = 0.7; o.beginPath(); o.arc(m, m, r, 0, TAU); o.stroke();
      }
      [0.55, 0.72, 0.86].forEach(function (k) { o.strokeStyle = 'rgba(9,8,14,0.9)'; o.lineWidth = 2.2; o.beginPath(); o.arc(m, m, R * k, 0, TAU); o.stroke(); });
      o.strokeStyle = 'rgba(238,235,245,0.25)'; o.lineWidth = 1; o.beginPath(); o.arc(m, m, R - 0.5, 0, TAU); o.stroke();
      st.disc = c; st.discSize = size;
    };
    self.down = function (st, x, y) {
      var g = st.g, dx = x - g.cx, dy = y - g.cy;
      if (dx * dx + dy * dy > g.R * g.R) return false;
      self.grab = { a: Math.atan2(dy, dx), ang: self.ang, v: 0, lt: performance.now(), la: Math.atan2(dy, dx) };
      return true;
    };
    self.move = function (st, x, y) {
      if (!self.grab) return;
      var g = st.g, a = Math.atan2(y - g.cy, x - g.cx), now = performance.now();
      var d = a - self.grab.la; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU;
      self.ang += d;
      self.grab.v = 0.6 * self.grab.v + 0.4 * (d / Math.max(0.008, (now - self.grab.lt) / 1000));
      self.grab.la = a; self.grab.lt = now;
      st.dirty = true;
    };
    self.up = function () { if (self.grab) { self.boost = Math.max(-14, Math.min(14, self.grab.v - 1.6)); self.grab = null; } };
    self.kick = function (v) { self.boost = Math.min(10, self.boost + v); };
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, g = st.g, m = st.m, R = g.R;
      var dt = self.last ? Math.min(0.05, (ts - self.last) / 1000) : 0; self.last = ts;
      if (!self.grab && !KB.reduce) { self.ang += (1.6 + self.boost) * dt; self.boost *= Math.pow(0.25, dt); }
      ppBack(ctx, w, h, g, t);
      // shadow + disc (grooves are pre-drawn; they look the same at any rotation)
      var sh = ctx.createRadialGradient(g.cx, g.cy + R * 0.08, R * 0.8, g.cx, g.cy + R * 0.08, R * 1.25);
      sh.addColorStop(0, 'rgba(0,0,0,0.55)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(g.cx, g.cy + R * 0.08, R * 1.25, 0, TAU); ctx.fill();
      ctx.drawImage(st.disc, g.cx - st.discSize / 2, g.cy - st.discSize / 2, st.discSize, st.discSize);
      // light sheen: follows the pointer like a lamp over the record
      var la = m.a > 0.02 ? Math.atan2(m.y - g.cy, m.x - g.cx) : -0.8 + Math.sin(t * 0.3) * 0.25;
      if (ctx.createConicGradient) {
        ctx.save(); ctx.beginPath(); ctx.arc(g.cx, g.cy, R * 0.985, 0, TAU); ctx.arc(g.cx, g.cy, R * 0.36, 0, TAU, true); ctx.clip();
        var cg = ctx.createConicGradient(la - 0.5, g.cx, g.cy);
        var hl = 'rgba(214,222,255,0.2)', ml = 'rgba(' + A + ',0.12)', z = 'rgba(214,222,255,0)';
        cg.addColorStop(0, z); cg.addColorStop(0.07, hl); cg.addColorStop(0.1, ml); cg.addColorStop(0.16, z);
        cg.addColorStop(0.5, z); cg.addColorStop(0.57, hl); cg.addColorStop(0.6, 'rgba(' + B + ',0.12)'); cg.addColorStop(0.66, z); cg.addColorStop(1, z);
        ctx.fillStyle = cg; ctx.fillRect(g.cx - R, g.cy - R, R * 2, R * 2);
        ctx.restore();
      }
      // label (rotates)
      var LR = R * 0.34;
      ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(self.ang);
      var lg = ctx.createRadialGradient(-LR * 0.3, -LR * 0.3, 0, 0, 0, LR);
      lg.addColorStop(0, '#B8FFD9'); lg.addColorStop(1, '#6FE8A8');
      ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(0, 0, LR, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(14,13,21,0.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, LR * 0.92, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#0E0D15';
      ctx.font = '500 ' + Math.max(8, LR * 0.105).toFixed(1) + 'px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var txt = self.label, step = TAU / txt.length;
      for (var i = 0; i < txt.length; i++) {
        ctx.save(); ctx.rotate(i * step); ctx.translate(0, -LR * 0.76); ctx.fillText(txt[i], 0, 0); ctx.restore();
      }
      ctx.font = '800 ' + (LR * 0.5).toFixed(1) + 'px Syne, "Arial Black", sans-serif';
      ctx.fillText('kb', 0, -LR * 0.04);
      ctx.font = '500 ' + Math.max(7, LR * 0.09).toFixed(1) + 'px "JetBrains Mono", monospace';
      ctx.fillText('33⅓ RPM', 0, LR * 0.36);
      ctx.restore();
      ctx.fillStyle = '#0E0D15'; ctx.beginPath(); ctx.arc(g.cx, g.cy, Math.max(3, R * 0.022), 0, TAU); ctx.fill();
      // tone arm
      if (!g.narrow) {
        var px = g.cx + R * 1.12, py = g.cy - R * 0.92, nx = g.cx + R * 0.62, ny = g.cy - R * 0.36;
        ctx.strokeStyle = 'rgba(226,230,255,0.75)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - R * 0.06, py + R * 0.35); ctx.lineTo(nx, ny); ctx.stroke();
        ctx.fillStyle = 'rgba(226,230,255,0.85)'; ctx.beginPath(); ctx.arc(px, py, R * 0.06, 0, TAU); ctx.fill();
        ctx.fillStyle = '#0E0D15'; ctx.beginPath(); ctx.arc(px, py, R * 0.025, 0, TAU); ctx.fill();
        ctx.save(); ctx.translate(nx, ny); ctx.rotate(Math.atan2(ny - (py + R * 0.35), nx - (px - R * 0.06)));
        ctx.fillStyle = 'rgba(' + A + ',0.95)'; ctx.fillRect(-4, -7, 22, 14); ctx.restore();
      }
      if (self.grab) { ctx.strokeStyle = 'rgba(' + A + ',0.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.cx, g.cy, R + 8, 0, TAU); ctx.stroke(); }
      ppFade(ctx, w, h);
    };
    return self;
  };

  /* ---- FASHION: an abstract printed pattern — halftone ribbons, slightly
     off-register like an old print magazine. The pointer works like a magnifier. ---- */
  V.halftone = function () {
    var INK = '#17152A', VIO = 'rgba(91,63,217,0.55)';
    function ss(a, b, x) { var u = Math.max(0, Math.min(1, (x - a) / (b - a))); return u * u * (3 - 2 * u); }
    return {
      draw: function (st, t) {
        var ctx = st.ctx, w = st.w, h = st.h, m = st.m, narrow = w < 760;
        var sp = narrow ? 10 : 13, R = sp * 0.56, T = KB.reduce ? 0 : t;
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.fillStyle = '#F1EFF6'; ctx.fillRect(0, 0, w, h);
        var x0 = narrow ? 0 : w * 0.3, y0 = narrow ? h * 0.1 : 0, y1 = narrow ? h * 0.6 : h;
        var lensR = 150, lens = m.a > 0.02;
        function field(x, y, k) {
          var u = x / w;
          var yc = h * (narrow ? 0.34 : 0.44) + Math.sin(u * 5.2 + T * 0.22 + k) * h * 0.17 + Math.sin(u * 13 - T * 0.35 + k * 2) * h * 0.04;
          var th = h * (0.1 + 0.06 * Math.sin(u * 7 + T * 0.3 + k));
          var v = 1 - Math.abs(y - yc) / th;
          var yc2 = h * (narrow ? 0.22 : 0.2) + Math.sin(u * 3.4 - T * 0.18 + k) * h * 0.12;
          var v2 = 1 - Math.abs(y - yc2) / (h * 0.05);
          return Math.max(v, v2 * 0.8);
        }
        [[INK, 0, 0, 0], [VIO, 3, 2, 0.35]].forEach(function (L) {
          ctx.fillStyle = L[0];
          ctx.beginPath();
          for (var y = y0 + sp / 2; y < y1; y += sp) {
            for (var x = x0 + sp / 2; x < w; x += sp) {
              var v = field(x, y, L[3]);
              if (!narrow) v *= ss(x0, x0 + w * 0.22, x);
              if (narrow) v *= ss(y1, y1 - h * 0.12, y);
              if (v <= 0.02) continue;
              var r = R * Math.pow(Math.min(1, v), 0.75);
              if (lens) { var dx = x - m.x, dy = y - m.y, d2 = dx * dx + dy * dy; if (d2 < lensR * lensR) r *= 1 + 0.7 * m.a * (1 - Math.sqrt(d2) / lensR); }
              var cx = x + L[1], cy = y + L[2];
              ctx.moveTo(cx + r, cy); ctx.arc(cx, cy, r, 0, TAU);
            }
          }
          ctx.fill();
        });
        if (lens) {
          ctx.strokeStyle = 'rgba(23,21,42,' + (0.5 * m.a).toFixed(3) + ')'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(m.x, m.y, lensR, 0, TAU); ctx.stroke();
        }
        // printer's crop marks
        ctx.strokeStyle = 'rgba(23,21,42,0.45)'; ctx.lineWidth = 1;
        var c = 18, L2 = 14;
        [[c, c, 1, 1], [w - c, c, -1, 1], [c, h - c, 1, -1], [w - c, h - c, -1, -1]].forEach(function (q) {
          ctx.beginPath(); ctx.moveTo(q[0], q[1] + q[3] * 6); ctx.lineTo(q[0], q[1] + q[3] * (6 + L2)); ctx.moveTo(q[0] + q[2] * 6, q[1]); ctx.lineTo(q[0] + q[2] * (6 + L2), q[1]); ctx.stroke();
        });
        var f = ctx.createLinearGradient(0, h * 0.62, 0, h);
        f.addColorStop(0, 'rgba(241,239,246,0)'); f.addColorStop(1, 'rgba(241,239,246,0.94)');
        ctx.fillStyle = f; ctx.fillRect(0, 0, w, h);
      }
    };
  };

  /* ---- DESIGN: a living Bauhaus poster. Shapes swap by themselves; click to reshuffle. ---- */
  V.poster = function () {
    var SH = ['circle', 'half', 'quarter', 'square', 'ring', 'dot', 'none', 'none', 'circle', 'half', 'stripes'];
    var COL = ['140,255,193', '176,124,255', '98,120,255', '241,239,246', '242,166,90', '14,13,21'];
    var BG = ['#16142A', '#1D1A36', '#0E0D15', '#232046'];
    function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
    function fresh(cell) {
      cell.shape = pick(SH); cell.col = pick(COL); cell.bg = pick(BG); cell.rot = Math.floor(Math.random() * 4) * Math.PI / 2;
      if (cell.col === '14,13,21' && cell.bg === '#0E0D15') cell.bg = '#232046';
    }
    var self = { next: 0 };
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      var cols = narrow ? 4 : 5, x0 = narrow ? w * 0.08 : w * 0.56, x1 = narrow ? w * 0.92 : w * 0.9;
      var y0 = narrow ? h * 0.12 : h * 0.11, avail = narrow ? h * 0.42 : h * 0.44;
      var lim = self.limitY ? self.limitY() : 0;          // keep clear of the big word
      if (lim > 0) avail = Math.min(avail, lim - y0);
      var cs = (x1 - x0) / cols, rows = Math.max(2, Math.min(4, Math.floor(avail / cs)));
      if (rows * cs > avail) cs = Math.max(24, avail / rows);
      x0 = x1 - cols * cs;
      var old = st.pc && st.pc.cells;
      var cells = [];
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        var cell = old && old[cells.length] ? old[cells.length] : { s: 1, phase: 0, at: 0, ar: 0 };
        cell.x = x0 + c * cs; cell.y = y0 + r * cs; cell.r = r; cell.c = c;
        if (!cell.shape) fresh(cell);
        cell.ar = cell.ar || cell.rot;
        cells.push(cell);
      }
      st.pc = { cells: cells, cs: cs };
    };
    self.shuffle = function (st, x, y) {
      var now = performance.now(), cs = st.pc.cs;
      st.pc.cells.forEach(function (c) {
        var d = Math.hypot(c.x + cs / 2 - x, c.y + cs / 2 - y);
        c.phase = 1; c.at = now + d * 1.6;
      });
      st.dirty = true;
    };
    function shape(ctx, c, cs, k) {
      var s = cs * 0.5 * k, col = 'rgb(' + c.col + ')';
      ctx.fillStyle = col; ctx.strokeStyle = col;
      switch (c.shape) {
        case 'circle': ctx.beginPath(); ctx.arc(0, 0, s * 0.86, 0, TAU); ctx.fill(); break;
        case 'half': ctx.beginPath(); ctx.arc(0, s, s * 0.98, Math.PI, TAU); ctx.fill(); break;
        case 'quarter': ctx.beginPath(); ctx.moveTo(-s, s); ctx.arc(-s, s, s * 1.98, -Math.PI / 2, 0); ctx.closePath(); ctx.fill(); break;
        case 'square': ctx.fillRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24); break;
        case 'stripes': for (var i = -3; i <= 3; i++) ctx.fillRect(-s, i * s * 0.28 - s * 0.07, s * 2, s * 0.14); break;
        case 'ring': ctx.lineWidth = s * 0.22; ctx.beginPath(); ctx.arc(0, 0, s * 0.66, 0, TAU); ctx.stroke(); break;
        case 'dot': ctx.beginPath(); ctx.arc(0, 0, s * 0.3, 0, TAU); ctx.fill(); break;
        case 'tri': ctx.beginPath(); ctx.moveTo(-s, s); ctx.lineTo(s, s); ctx.lineTo(-s, -s); ctx.closePath(); ctx.fill(); break;
      }
    }
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, P = st.pc, cs = P.cs, now = performance.now();
      ppBack(ctx, w, h, { cx: w * 0.7, cy: h * 0.45, R: Math.min(w, h) * 0.3 }, t);
      if (!KB.reduce && ts > self.next) {
        var c0 = pick(P.cells); if (!c0.phase) { c0.phase = 1; c0.at = now; }
        self.next = ts + 2200;
      }
      var busy = false;
      P.cells.forEach(function (c) {
        if (c.phase && now >= c.at) {
          if (c.phase === 1) { c.s -= 0.12; if (c.s <= 0) { c.s = 0; fresh(c); c.phase = 2; } }
          else { c.s += 0.08; if (c.s >= 1) { c.s = 1; c.phase = 0; } }
        }
        if (c.phase) busy = true;
        var over = m.a > 0.2 && m.x >= c.x && m.x < c.x + cs && m.y >= c.y && m.y < c.y + cs;
        if (over && !c.hov) { c.rot += Math.PI / 2; c.hov = true; } else if (!over) c.hov = false;
        c.ar += (c.rot - c.ar) * (KB.reduce ? 1 : 0.14);
        if (Math.abs(c.rot - c.ar) > 0.01) busy = true;
        ctx.fillStyle = c.bg; ctx.fillRect(c.x, c.y, cs + 0.5, cs + 0.5);
        if (c.shape !== 'none' && c.s > 0) {
          ctx.save(); ctx.beginPath(); ctx.rect(c.x, c.y, cs, cs); ctx.clip();
          ctx.translate(c.x + cs / 2, c.y + cs / 2); ctx.rotate(c.ar);
          var e = 1 - Math.pow(1 - c.s, 3);
          shape(ctx, c, cs, e);
          ctx.restore();
        }
      });
      ctx.strokeStyle = 'rgba(14,13,21,1)'; ctx.lineWidth = 2;
      var cl = P.cells[0], last = P.cells[P.cells.length - 1];
      for (var gx = cl.x; gx <= last.x + cs + 1; gx += cs) { ctx.beginPath(); ctx.moveTo(gx, cl.y); ctx.lineTo(gx, last.y + cs); ctx.stroke(); }
      for (var gy = cl.y; gy <= last.y + cs + 1; gy += cs) { ctx.beginPath(); ctx.moveTo(cl.x, gy); ctx.lineTo(last.x + cs, gy); ctx.stroke(); }
      ctx.font = MONO; ctx.fillStyle = 'rgba(238,235,245,0.6)';
      ctx.fillText('KB — POSTER NO. 04 · ' + (KB.touch ? 'TAP' : 'CLICK') + ' TO REMIX', cl.x, last.y + cs + 22);
      if (KB.reduce && busy) st.dirty = true;
      if (w < 760) ppFade(ctx, w, h);
    };
    return self;
  };

  /* ---- PHOTOGRAPHY: looking through a camera. City lights out of focus;
     the split-prism circle follows the pointer and sharpens them. Click to shoot. ---- */
  V.focus = function () {
    var COLS = ['242,166,90', '255,214,170', '176,124,255', '98,120,255', '255,236,214', '140,255,193'];
    var self = { flash: 0, last: 0, fx: 0, fy: 0, split: 0 };
    self.layout = function (st) {
      var w = st.w, h = st.h, n = Math.round(Math.max(36, Math.min(80, w * h / 16000)));
      st.lights = [];
      for (var i = 0; i < n; i++) st.lights.push({ x: Math.random() * w, y: h * (0.15 + Math.random() * 0.7), r: 10 + Math.pow(Math.random(), 1.6) * 46, c: COLS[i % 7 === 6 ? 5 : Math.floor(Math.random() * 5)], ph: Math.random() * TAU, vx: (Math.random() - 0.5) * 6 });
      if (!self.fx) { self.fx = w * 0.62; self.fy = h * 0.45; }
    };
    self.shoot = function (st) { self.flash = KB.reduce ? 0 : 1; st.dirty = true; };
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, R = KB.reduce, i, L;
      var dt = self.last ? Math.min(0.05, (ts - self.last) / 1000) : 0; self.last = ts;
      var narrow = w < 760, FR = Math.min(w, h) * (narrow ? 0.2 : 0.15);
      var tx = m.a > 0.05 ? m.x : w * (narrow ? 0.5 : 0.62) + Math.sin(t * 0.25) * w * 0.12, ty = m.a > 0.05 ? m.y : h * (narrow ? 0.32 : 0.42) + Math.cos(t * 0.31) * h * 0.08;
      var ox = self.fx, oy = self.fy;
      self.fx += (tx - self.fx) * (R ? 1 : 0.12); self.fy += (ty - self.fy) * (R ? 1 : 0.12);
      var speed = Math.hypot(self.fx - ox, self.fy - oy);
      self.split += (Math.min(14, speed * 1.6) - self.split) * 0.2;
      var fx = self.fx, fy = self.fy;
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      ctx.fillStyle = '#0B0A10'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, w * 0.6, h * 0.5, Math.max(w, h) * 0.6, [[0, 'rgba(98,120,255,0.18)'], [1, 'rgba(11,10,16,0)']]);
      blob(ctx, w, h, w * 0.85, h * 0.9, Math.max(w, h) * 0.4, [[0, 'rgba(242,166,90,0.14)'], [1, 'rgba(242,166,90,0)']]);
      for (i = 0; i < st.lights.length; i++) { L = st.lights[i]; if (!R) { L.x += L.vx * dt; if (L.x < -60) L.x = w + 60; if (L.x > w + 60) L.x = -60; } }
      // out of focus: soft discs with a bright rim (outside the circle)
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.arc(fx, fy, FR, 0, TAU, true); ctx.clip('evenodd');
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < st.lights.length; i++) {
        L = st.lights[i];
        var a = 0.16 + 0.06 * Math.sin(t * 0.8 + L.ph);
        ctx.fillStyle = 'rgba(' + L.c + ',' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(L.x, L.y, L.r, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(' + L.c + ',' + (a * 1.4).toFixed(3) + ')'; ctx.lineWidth = 1.2; ctx.stroke();
      }
      ctx.restore();
      // in focus: sharp points, split in two halves (the split-prism)
      for (var half = 0; half < 2; half++) {
        ctx.save(); ctx.beginPath();
        if (half === 0) ctx.rect(fx - FR, fy - FR, FR * 2, FR); else ctx.rect(fx - FR, fy, FR * 2, FR);
        ctx.clip(); ctx.beginPath(); ctx.arc(fx, fy, FR, 0, TAU); ctx.clip();
        ctx.fillStyle = '#0D0C14'; ctx.fillRect(fx - FR, fy - FR, FR * 2, FR * 2);
        ctx.globalCompositeOperation = 'lighter';
        var off = (half ? -1 : 1) * self.split;
        for (i = 0; i < st.lights.length; i++) {
          L = st.lights[i];
          var px = L.x + off;
          if (Math.abs(px - fx) > FR + 12 || Math.abs(L.y - fy) > FR + 12) continue;
          var g = ctx.createRadialGradient(px, L.y, 0, px, L.y, 9);
          g.addColorStop(0, 'rgba(' + L.c + ',0.95)'); g.addColorStop(1, 'rgba(' + L.c + ',0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, L.y, 9, 0, TAU); ctx.fill();
          ctx.fillStyle = 'rgba(255,250,240,0.95)'; ctx.beginPath(); ctx.arc(px, L.y, 1.8, 0, TAU); ctx.fill();
        }
        ctx.restore();
      }
      // focusing screen
      ctx.strokeStyle = 'rgba(255,240,225,0.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(fx, fy, FR, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx - FR, fy); ctx.lineTo(fx + FR, fy); ctx.strokeStyle = 'rgba(255,240,225,0.25)'; ctx.stroke();
      ctx.setLineDash([1, 4]); ctx.strokeStyle = 'rgba(255,240,225,0.35)';
      ctx.beginPath(); ctx.arc(fx, fy, FR * 1.45, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      // viewfinder frame + readout
      var ix = w * 0.05, iy = h * 0.09, iw = w - ix * 2, ih = h * 0.7, k = 22;
      ctx.strokeStyle = 'rgba(255,240,225,0.55)'; ctx.lineWidth = 1.2; ctx.beginPath();
      [[ix, iy, 1, 1], [ix + iw, iy, -1, 1], [ix, iy + ih, 1, -1], [ix + iw, iy + ih, -1, -1]].forEach(function (q) { ctx.moveTo(q[0] + q[2] * k, q[1]); ctx.lineTo(q[0], q[1]); ctx.lineTo(q[0], q[1] + q[3] * k); });
      ctx.stroke();
      ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace'; ctx.fillStyle = 'rgba(242,166,90,0.95)';
      var focused = self.split < 1.2;
      ctx.fillText('1/125   F2.8   ISO 400   ' + (focused ? '●' : '○') + '   ' + KB.pad(KB.exp) + '/36', ix, iy + ih + 22);
      if (self.flash > 0.01) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, self.flash * 1.3).toFixed(3) + ')'; ctx.fillRect(0, 0, w, h);
        self.flash *= 0.84; st.dirty = true;
      } else self.flash = 0;
      ctx.globalCompositeOperation = 'source-over';
      var fd = ctx.createLinearGradient(0, h * 0.6, 0, h);
      fd.addColorStop(0, 'rgba(11,10,16,0)'); fd.addColorStop(1, 'rgba(11,10,16,0.92)');
      ctx.fillStyle = fd; ctx.fillRect(0, 0, w, h);
    };
    return self;
  };

  /* ---------- Welcome Party: a summer-festival night — swaying paper lanterns and fireworks (click to launch one) ---------- */
  V.matsuri = function () {
    var FW = ['140,255,193', '176,124,255', '242,166,90', '255,236,214', '130,148,255'];
    var self = { parts: [], next: 0, last: 0 };
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      var strings = narrow ? 2 : 3, L = [];
      for (var s = 0; s < strings; s++) {
        var x0 = narrow ? -20 : w * (0.28 + s * 0.04), x1 = w + 20, y0 = h * (0.06 + s * 0.11), sag = h * (0.08 + s * 0.03);
        var n = Math.max(5, Math.round((x1 - x0) / (narrow ? 70 : 120)));
        for (var i = 1; i < n; i++) {
          var u = i / n, x = x0 + (x1 - x0) * u, y = y0 + Math.sin(u * Math.PI) * sag;
          var big = 0.8 + Math.random() * 0.45;
          L.push({ s: s, x: x, y: y, w: (narrow ? 22 : 30) * big, h: (narrow ? 30 : 42) * big, ph: Math.random() * 6.28, warm: Math.random() < 0.8, kanji: Math.random() < 0.3 ? (Math.random() < 0.5 ? '祭' : '歓') : '' });
        }
        L.push({ line: true, s: s, x0: x0, x1: x1, y0: y0, sag: sag });
      }
      st.lan = L;
    };
    self.click = function (st, x, y) { burst(x, y, 1.3); st.dirty = true; };
    function burst(x, y, k) {
      var c = FW[Math.floor(Math.random() * FW.length)], c2 = FW[Math.floor(Math.random() * FW.length)], n = Math.round(54 * (k || 1));
      if (self.parts.length > 480) self.parts.splice(0, n);
      for (var i = 0; i < n; i++) {
        var a = (i / n) * TAU + Math.random() * 0.1, v = (1.6 + Math.random() * 1.8) * (k || 1);
        self.parts.push({ x: x, y: y, px: x, py: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, c: i % 3 ? c : c2 });
      }
    }
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, R = KB.reduce, i;
      backdrop(ctx, w, h, t, { gx: 0.7, gy: 0.25, gr: 0.55, ga: 0.45, va: 0.42 });
      // fireworks (behind the lanterns)
      if (!R && ts > self.next) { burst(w * (0.45 + Math.random() * 0.5), h * (0.18 + Math.random() * 0.35), 0.8 + Math.random() * 0.5); self.next = ts + 1300 + Math.random() * 1500; }
      ctx.globalCompositeOperation = 'lighter';
      for (i = self.parts.length - 1; i >= 0; i--) {
        var p = self.parts[i];
        if (!R) { p.px = p.x; p.py = p.y; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.035; p.x += p.vx; p.y += p.vy; p.life -= 0.0115; }
        if (p.life <= 0) { self.parts.splice(i, 1); continue; }
        ctx.strokeStyle = 'rgba(' + p.c + ',' + (p.life * 0.9).toFixed(3) + ')'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(p.px - p.vx * 2, p.py - p.vy * 2); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      // lantern strings + lanterns
      var wind = m.a > 0.02 ? (m.x / w - 0.5) * 0.5 * m.a : 0;
      st.lan.forEach(function (o) {
        if (!o.line) return;
        ctx.strokeStyle = 'rgba(238,235,245,0.35)'; ctx.lineWidth = 1; ctx.beginPath();
        for (var k = 0; k <= 30; k++) { var u = k / 30, x = o.x0 + (o.x1 - o.x0) * u, y = o.y0 + Math.sin(u * Math.PI) * o.sag; if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.stroke();
      });
      st.lan.forEach(function (o, idx) {
        if (o.line) return;
        var near = 0;
        if (m.a > 0.02) { var dx = o.x - m.x, dy = o.y - m.y; near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 160) * m.a; }
        var ang = (R ? 0 : Math.sin(t * 1.1 + o.ph) * 0.07) + wind * 0.3 + near * 0.25 * Math.sign(o.x - m.x || 1);
        var glowA = 0.32 + 0.12 * Math.sin(t * 2 + o.ph) + near * 0.4;
        var col = o.warm ? '242,166,90' : '176,124,255';
        ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(ang);
        var cy = 10 + o.h / 2;
        var g = ctx.createRadialGradient(0, cy, 0, 0, cy, o.h * 1.5);
        g.addColorStop(0, 'rgba(' + col + ',' + glowA.toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, cy, o.h * 1.5, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(238,235,245,0.4)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 8); ctx.stroke();
        var body = ctx.createLinearGradient(-o.w / 2, 0, o.w / 2, 0);
        body.addColorStop(0, o.warm ? '#C9772F' : '#6B4FC9'); body.addColorStop(0.5, o.warm ? '#FFD9B0' : '#D9C9FF'); body.addColorStop(1, o.warm ? '#C9772F' : '#6B4FC9');
        ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, cy, o.w / 2, o.h / 2, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(14,13,21,0.25)'; ctx.lineWidth = 1;
        for (var r = -2; r <= 2; r++) { var yy = cy + r * o.h * 0.17, hw = o.w / 2 * Math.sqrt(Math.max(0, 1 - Math.pow((yy - cy) / (o.h / 2), 2))); ctx.beginPath(); ctx.moveTo(-hw, yy); ctx.lineTo(hw, yy); ctx.stroke(); }
        ctx.fillStyle = '#17152A'; ctx.fillRect(-o.w * 0.28, cy - o.h / 2 - 3, o.w * 0.56, 6); ctx.fillRect(-o.w * 0.28, cy + o.h / 2 - 3, o.w * 0.56, 6);
        if (o.kanji) { ctx.fillStyle = 'rgba(23,21,42,0.75)'; ctx.font = '700 ' + Math.round(o.h * 0.38) + 'px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.kanji, 0, cy + 1); ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic'; }
        ctx.restore();
      });
      veil(ctx, w, h, 0.8, false);
    };
    return self;
  };

  /* ---------- Partnerships: QUT Japan at the centre, partners orbiting around it ---------- */
  V.orbit = function () {
    var TYPES = ['RESTAURANT', 'SUPERMARKET', 'CLUB', 'PARTNER', 'RESTAURANT', 'CLUB', 'SPONSOR', 'RESTAURANT', 'PARTNER', 'CLUB', 'SHOP', 'SPONSOR'];
    var COL = [A, B, '242,166,90', '130,148,255'];
    var self = {};
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      st.oc = { x: narrow ? w * 0.55 : w * 0.7, y: h * (narrow ? 0.3 : 0.45), R: Math.min(w * (narrow ? 0.42 : 0.26), h * (narrow ? 0.24 : 0.38)) };
      st.nodes = [];
      var rings = [0.45, 0.72, 1.0];
      for (var i = 0; i < TYPES.length; i++) {
        var ring = i % 3;
        st.nodes.push({ ring: ring, r: rings[ring], a: (i / TYPES.length) * TAU * 2.3 + ring, sp: (0.05 + 0.03 * (2 - ring)) * (ring % 2 ? -1 : 1), label: TYPES[i], c: COL[i % COL.length], size: 3 + (i % 3) });
      }
    };
    self.draw = function (st, t) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, O = st.oc, i, n;
      backdrop(ctx, w, h, t, { gx: O.x / w, gy: O.y / h, gr: 0.5, ga: 0.55 });
      var tilt = 0.42;
      // orbits
      [0.45, 0.72, 1.0].forEach(function (k) {
        ctx.strokeStyle = 'rgba(190,200,255,0.16)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(O.x, O.y, O.R * k * 1.35, O.R * k * 1.35 * tilt, -0.18, 0, TAU); ctx.stroke();
      });
      // node positions
      var pts = st.nodes.map(function (n) {
        var a = n.a + (KB.reduce ? 0 : t * n.sp), rx = O.R * n.r * 1.35, ry = rx * tilt;
        var x = Math.cos(a) * rx, y = Math.sin(a) * ry, ca = Math.cos(-0.18), sa = Math.sin(-0.18);
        var px = O.x + x * ca - y * sa, py = O.y + x * sa + y * ca;
        var near = 0;
        if (m.a > 0.02) { var dx = px - m.x, dy = py - m.y; near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 170) * m.a; }
        return { n: n, x: px, y: py, front: Math.sin(a) > 0, near: near };
      });
      // links: centre → partners (brighter near the pointer), and between neighbours
      pts.forEach(function (p) {
        var al = 0.08 + p.near * 0.6;
        ctx.strokeStyle = 'rgba(' + (p.near > 0.05 ? A : '190,200,255') + ',' + al.toFixed(3) + ')'; ctx.lineWidth = 1 + p.near;
        ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      });
      for (i = 0; i < pts.length; i++) for (var j = i + 1; j < pts.length; j++) {
        var a2 = pts[i], b2 = pts[j], d = Math.hypot(a2.x - b2.x, a2.y - b2.y);
        if (d < O.R * 0.55) { ctx.strokeStyle = 'rgba(176,124,255,' + ((1 - d / (O.R * 0.55)) * 0.3).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a2.x, a2.y); ctx.lineTo(b2.x, b2.y); ctx.stroke(); }
      }
      // centre: QUT Japan
      var g = ctx.createRadialGradient(O.x, O.y, 0, O.x, O.y, O.R * 0.32);
      g.addColorStop(0, 'rgba(' + A + ',0.55)'); g.addColorStop(1, 'rgba(' + A + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(O.x, O.y, O.R * 0.32, 0, TAU); ctx.fill();
      ctx.fillStyle = '#0E0D15'; ctx.beginPath(); ctx.arc(O.x, O.y, 30, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(' + A + ',0.9)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(O.x, O.y, 30, 0, TAU); ctx.stroke();
      var pr = KB.reduce ? 0 : (t % 2.4) / 2.4;
      ctx.strokeStyle = 'rgba(' + A + ',' + (0.6 * (1 - pr)).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(O.x, O.y, 30 + pr * 60, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#EEEBF5'; ctx.font = '600 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText('QUT', O.x, O.y - 2); ctx.fillText('JAPAN', O.x, O.y + 10);
      // partners
      pts.sort(function (p, q) { return p.y - q.y; }).forEach(function (p) {
        var r = p.n.size + (p.front ? 2 : 0) + p.near * 4, alpha = p.front ? 1 : 0.55;
        var gg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        gg.addColorStop(0, 'rgba(' + p.n.c + ',' + (0.45 * alpha).toFixed(3) + ')'); gg.addColorStop(1, 'rgba(' + p.n.c + ',0)');
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(' + p.n.c + ',' + alpha + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill();
        if (p.front || p.near > 0.1) {
          ctx.fillStyle = 'rgba(238,235,245,' + (0.55 + p.near * 0.45).toFixed(3) + ')'; ctx.font = '500 9px "JetBrains Mono", monospace';
          ctx.fillText(p.n.label, p.x, p.y + r + 14);
        }
      });
      ctx.textAlign = 'start';
      cursorGlow(ctx, m, 22);
      veil(ctx, w, h, 0.8, false);
    };
    return self;
  };

  /* ---------- Social content: a feed scrolling by, with notifications popping up ---------- */
  V.feed = function () {
    var COL = [A, B, '98,120,255', '242,166,90'];
    var NOTE = ['♥ 248', '+1 FOLLOWER', '● NEW COMMENT', '▶ 1.2K VIEWS', '♥ 96', '↗ 14 SHARES', '+3 FOLLOWERS', '▶ 3.4K VIEWS'];
    var self = { pops: [], next: 0 };
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      var cols = narrow ? 3 : 4, x0 = narrow ? w * 0.06 : w * 0.5, x1 = narrow ? w * 0.94 : w * 0.94, gap = 8;
      var cw = (x1 - x0 - gap * (cols - 1)) / cols, ch = cw * 1.25;
      st.fd = { cols: cols, x0: x0, cw: cw, ch: ch, gap: gap, h: h, tiles: [] };
      var rows = Math.ceil(h / (ch + gap)) + 2;
      for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) st.fd.tiles.push({ c: c, r: r, col: COL[(c * 3 + r) % COL.length], reel: (c + r) % 3 !== 1, ph: Math.random() * 6 });
    };
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, F = st.fd, i;
      backdrop(ctx, w, h, t, { gx: 0.72, gy: 0.4, ga: 0.5 });
      var rowH = F.ch + F.gap, total = Math.ceil(h / rowH + 2) * rowH;
      for (i = 0; i < F.tiles.length; i++) {
        var T = F.tiles[i], speed = 18 + (T.c % 2) * 10;
        var y = ((T.r * rowH - (KB.reduce ? 0 : t * speed)) % total + total) % total - rowH;
        var x = F.x0 + T.c * (F.cw + F.gap);
        var over = m.a > 0.05 && m.x > x && m.x < x + F.cw && m.y > y && m.y < y + F.ch;
        var g = ctx.createLinearGradient(x, y, x + F.cw, y + F.ch);
        g.addColorStop(0, 'rgba(' + T.col + ',' + (over ? 0.75 : 0.42) + ')'); g.addColorStop(1, 'rgba(28,26,43,0.9)');
        ctx.fillStyle = g; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, F.cw, F.ch, 6); else ctx.rect(x, y, F.cw, F.ch); ctx.fill();
        ctx.fillStyle = 'rgba(238,235,245,0.16)'; ctx.fillRect(x + 10, y + F.ch - 22, F.cw * 0.5, 4); ctx.fillRect(x + 10, y + F.ch - 13, F.cw * 0.3, 4);
        if (T.reel) { ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.moveTo(x + F.cw - 20, y + 10); ctx.lineTo(x + F.cw - 10, y + 15); ctx.lineTo(x + F.cw - 20, y + 20); ctx.closePath(); ctx.fill(); }
        if (over && !T.popped) { T.popped = true; pop(x + F.cw / 2, y + F.ch * 0.4); }
        if (!over) T.popped = false;
      }
      if (!KB.reduce && ts > self.next) { var tt = F.tiles[Math.floor(Math.random() * F.tiles.length)]; pop(F.x0 + tt.c * (F.cw + F.gap) + F.cw / 2, h * (0.2 + Math.random() * 0.6)); self.next = ts + 1100 + Math.random() * 900; }
      ctx.font = '600 11px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      for (i = self.pops.length - 1; i >= 0; i--) {
        var p = self.pops[i];
        if (!KB.reduce) { p.y -= 0.5; p.life -= 0.012; }
        if (p.life <= 0) { self.pops.splice(i, 1); continue; }
        var a = Math.min(1, p.life * 2), tw = ctx.measureText(p.txt).width + 22;
        ctx.fillStyle = 'rgba(14,13,21,' + (0.85 * a).toFixed(3) + ')'; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(p.x - tw / 2, p.y - 13, tw, 26, 13); else ctx.rect(p.x - tw / 2, p.y - 13, tw, 26); ctx.fill();
        ctx.strokeStyle = 'rgba(' + A + ',' + (0.8 * a).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = 'rgba(' + A + ',' + a.toFixed(3) + ')'; ctx.fillText(p.txt, p.x, p.y + 4);
      }
      ctx.textAlign = 'start';
      veil(ctx, w, h, 0.85, false);
    };
    function pop(x, y) { if (self.pops.length > 8) self.pops.shift(); self.pops.push({ x: x, y: y, life: 1, txt: NOTE[Math.floor(Math.random() * NOTE.length)] }); }
    return self;
  };

  /* ---------- Leadership: a team moving together behind its leader (the pointer leads) ---------- */
  V.flock = function () {
    var self = { lx: 0, ly: 0 };
    self.layout = function (st) {
      var w = st.w, h = st.h, n = w < 760 ? 26 : 44;
      if (!self.lx) { self.lx = w * 0.7; self.ly = h * 0.45; }
      st.bo = [];
      for (var i = 0; i < n; i++) st.bo.push({ x: w * (0.5 + Math.random() * 0.45), y: h * (0.15 + Math.random() * 0.7), vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, c: i % 7 === 0 ? B : '226,232,255' });
    };
    self.draw = function (st, t) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, R = KB.reduce, i, j, b;
      backdrop(ctx, w, h, t, { gx: 0.7, gy: 0.4, ga: 0.5 });
      var narrow = w < 760;
      var tx = m.a > 0.05 ? m.x : w * (narrow ? 0.55 : 0.7) + Math.cos(t * 0.35) * w * (narrow ? 0.25 : 0.17), ty = m.a > 0.05 ? m.y : h * (narrow ? 0.3 : 0.45) + Math.sin(t * 0.5) * h * 0.18;
      if (R) { self.lx = tx; self.ly = ty; } else { self.lx += (tx - self.lx) * 0.05; self.ly += (ty - self.ly) * 0.05; }
      var B2 = st.bo;
      if (!R) for (i = 0; i < B2.length; i++) {
        b = B2[i];
        var ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;
        for (j = 0; j < B2.length; j++) {
          if (i === j) continue;
          var o = B2[j], dx = o.x - b.x, dy = o.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 7000) { ax += o.vx; ay += o.vy; cx += o.x; cy += o.y; n++; if (d2 < 600) { sx -= dx; sy -= dy; } }
        }
        if (n) { b.vx += (ax / n - b.vx) * 0.04 + (cx / n - b.x) * 0.002; b.vy += (ay / n - b.vy) * 0.04 + (cy / n - b.y) * 0.002; }
        b.vx += sx * 0.012 + (self.lx - b.x) * 0.0012; b.vy += sy * 0.012 + (self.ly - b.y) * 0.0012;
        var sp = Math.hypot(b.vx, b.vy), mx = 2.6;
        if (sp > mx) { b.vx *= mx / sp; b.vy *= mx / sp; }
        b.x += b.vx; b.y += b.vy;
      }
      // links to nearby teammates
      ctx.lineWidth = 1;
      for (i = 0; i < B2.length; i++) for (j = i + 1; j < B2.length; j++) {
        var p = B2[i], q = B2[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 70) { ctx.strokeStyle = 'rgba(170,182,255,' + ((1 - d / 70) * 0.28).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      // the team: little arrows pointing the way they move
      for (i = 0; i < B2.length; i++) {
        b = B2[i]; var a = Math.atan2(b.vy, b.vx);
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(a);
        ctx.fillStyle = 'rgba(' + b.c + ',0.85)'; ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(-5, 4); ctx.lineTo(-3, 0); ctx.lineTo(-5, -4); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      // the leader
      var g = ctx.createRadialGradient(self.lx, self.ly, 0, self.lx, self.ly, 46);
      g.addColorStop(0, 'rgba(' + A + ',0.6)'); g.addColorStop(1, 'rgba(' + A + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(self.lx, self.ly, 46, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(' + A + ',1)'; ctx.beginPath(); ctx.arc(self.lx, self.ly, 6, 0, TAU); ctx.fill();
      var pr = R ? 0 : (t % 1.8) / 1.8;
      ctx.strokeStyle = 'rgba(' + A + ',' + (0.7 * (1 - pr)).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(self.lx, self.ly, 8 + pr * 34, 0, TAU); ctx.stroke();
      veil(ctx, w, h, 0.82, false);
    };
    return self;
  };

  /* ---------- Leadership: a growth chart drawing itself upward — milestones light up as it climbs ---------- */
  V.growth = function () {
    var MS = [[0.2, 'EVENTS'], [0.45, 'PARTNERS'], [0.7, 'MEMBERS'], [0.92, 'COMMUNITY']];
    var self = {};
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      st.gr = narrow ? { x0: w * 0.06, x1: w * 0.94, y0: h * 0.12, y1: h * 0.5 } : { x0: w * 0.46, x1: w * 0.93, y0: h * 0.14, y1: h * 0.8 };
      st.gp = [];
      var n = 60, seed = 0;
      for (var i = 0; i <= n; i++) { var u = i / n; seed += 0.6; st.gp.push({ u: u, v: Math.pow(u, 1.45) * 0.86 + 0.06 + Math.sin(u * 11 + 1.3) * 0.035 * (1 - u * 0.4) + Math.sin(seed * 2.7) * 0.012 }); }
      st.bars = [];
      for (var b = 0; b < 12; b++) st.bars.push({ u: (b + 0.5) / 12, v: 0.12 + Math.pow((b + 1) / 12, 1.3) * 0.62 + (b % 3) * 0.03 });
    };
    self.draw = function (st, t) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, G = st.gr, R = KB.reduce, i;
      backdrop(ctx, w, h, t, { gx: 0.72, gy: 0.35, ga: 0.5 });
      var X = function (u) { return G.x0 + (G.x1 - G.x0) * u; }, Y = function (v) { return G.y1 - (G.y1 - G.y0) * v; };
      var prog = R ? 1 : Math.min(1, st.age / 2.4), ep = 1 - Math.pow(1 - prog, 3);
      // grid
      ctx.lineWidth = 1;
      for (i = 0; i <= 4; i++) { var gy = Y(i / 4); ctx.strokeStyle = 'rgba(190,200,255,' + (i ? 0.08 : 0.25) + ')'; ctx.beginPath(); ctx.moveTo(G.x0, gy); ctx.lineTo(G.x1, gy); ctx.stroke(); }
      // bars rising behind
      var bw = (G.x1 - G.x0) / 12 * 0.5;
      st.bars.forEach(function (b, k) {
        var grow = Math.max(0, Math.min(1, (ep * 14.5 - k) / 2.5)), live = R ? 0 : Math.sin(t * 1.4 + k) * 0.012;
        var top = Y((b.v + live) * grow);
        var g = ctx.createLinearGradient(0, top, 0, G.y1);
        g.addColorStop(0, 'rgba(176,124,255,0.45)'); g.addColorStop(1, 'rgba(176,124,255,0.04)');
        ctx.fillStyle = g; ctx.fillRect(X(b.u) - bw / 2, top, bw, G.y1 - top);
      });
      // the line + area, drawn left to right
      var pts = st.gp.filter(function (p) { return p.u <= ep; }).map(function (p) { var live = R ? 0 : Math.sin(t * 0.9 + p.u * 8) * 0.008; return [X(p.u), Y(p.v + live)]; });
      if (pts.length > 1) {
        var last = pts[pts.length - 1];
        var ag = ctx.createLinearGradient(0, G.y0, 0, G.y1);
        ag.addColorStop(0, 'rgba(' + A + ',0.32)'); ag.addColorStop(1, 'rgba(' + A + ',0)');
        ctx.fillStyle = ag; ctx.beginPath(); ctx.moveTo(pts[0][0], G.y1);
        pts.forEach(function (p) { ctx.lineTo(p[0], p[1]); }); ctx.lineTo(last[0], G.y1); ctx.closePath(); ctx.fill();
        ctx.save(); ctx.shadowColor = 'rgba(' + A + ',0.9)'; ctx.shadowBlur = 14; ctx.strokeStyle = 'rgba(' + A + ',1)'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
        ctx.beginPath(); pts.forEach(function (p, k) { if (k) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.stroke(); ctx.restore();
        // milestones
        ctx.font = '500 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
        MS.forEach(function (ms) {
          if (ms[0] > ep) return;
          var p = st.gp[Math.round(ms[0] * (st.gp.length - 1))], x = X(p.u), y = Y(p.v);
          var a = Math.min(1, (ep - ms[0]) / 0.06);
          ctx.strokeStyle = 'rgba(238,235,245,' + (0.25 * a).toFixed(3) + ')'; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y - 34); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = 'rgba(14,13,21,' + (0.9 * a).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(' + A + ',' + a.toFixed(3) + ')'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
          ctx.fillStyle = 'rgba(238,235,245,' + (0.85 * a).toFixed(3) + ')'; ctx.fillText(ms[1], x, y - 42);
        });
        // the head of the line: an arrow pointing up and on
        var pr = R ? 0 : (t % 1.6) / 1.6;
        ctx.strokeStyle = 'rgba(' + A + ',' + (0.7 * (1 - pr)).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(last[0], last[1], 7 + pr * 22, 0, TAU); ctx.stroke();
        ctx.fillStyle = 'rgba(' + A + ',1)'; ctx.beginPath(); ctx.arc(last[0], last[1], 5, 0, TAU); ctx.fill();
        if (prog >= 1) { ctx.fillStyle = 'rgba(' + A + ',0.95)'; ctx.font = '600 16px "JetBrains Mono", monospace'; ctx.fillText('↑', last[0], last[1] - 18); }
        ctx.textAlign = 'start';
      }
      // pointer: a crosshair that rides the line
      if (m.a > 0.05 && m.x > G.x0 && m.x < X(ep)) {
        var u = (m.x - G.x0) / (G.x1 - G.x0), k2 = Math.min(st.gp.length - 1, Math.round(u * (st.gp.length - 1))), py = Y(st.gp[k2].v);
        ctx.strokeStyle = 'rgba(238,235,245,' + (0.35 * m.a).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(m.x, G.y0); ctx.lineTo(m.x, G.y1); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,' + m.a.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(m.x, py, 4, 0, TAU); ctx.fill();
      }
      veil(ctx, w, h, 0.82, false);
      if (!R && prog < 1) st.dirty = true;
    };
    return self;
  };

  /* ---------- WOW Tokyo: an AI agent at the centre, orchestrating apps — tasks flow through it, over a Tokyo skyline.
     Hover a node to send work from it; click to fire the agent at every app. ---------- */
  V.agents = function () {
    var LAB = ['CRM', 'ERP', 'HR', 'IT', 'DATA', 'LLM', 'FINANCE', 'SUPPORT', 'SALES', 'MARKETING', 'SECURITY', 'CHAT'];
    var LOG = ['agent › plan task', 'agent › read CRM', 'agent › ask LLM', 'agent › update ERP', '✓ done · 0.8s', 'agent › route ticket → IT', 'agent › sync DATA', '✓ approved', 'agent › draft reply', 'agent › notify CHAT', '✓ done · 1.2s', 'agent › check SECURITY'];
    var COL = [A, B, '242,166,90'];
    var self = { pk: [], rings: [], next: 0, last: 0, log: [], logN: 0, logT: 0 };
    function lcg(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
    function bez(x0, y0, cx, cy, x1, y1, u) { var v = 1 - u; return [v * v * x0 + 2 * v * u * cx + u * u * x1, v * v * y0 + 2 * v * u * cy + u * u * y1]; }
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760, r = lcg(11);
      var C = st.ag = narrow ? { x: w * 0.5, y: h * 0.25, rx: w * 0.42, ry: h * 0.115, narrow: true } : { x: w * 0.71, y: h * 0.43, rx: Math.min(w * 0.22, 340), ry: Math.min(h * 0.31, 250) };
      var labs = narrow ? ['CRM', 'ERP', 'IT', 'DATA', 'LLM', 'SALES', 'HR', 'CHAT'] : LAB;
      st.nodes = labs.map(function (l, i) {
        var a = narrow ? [-150, -110, -70, -30, 30, 70, 110, 150][i] * Math.PI / 180 : (i / labs.length) * TAU - TAU / 4 + (i % 2 ? 0.14 : -0.06), k = narrow ? 1 : (i % 2 ? 1 : 0.7);
        var x = C.x + Math.cos(a) * C.rx * k, y = C.y + Math.sin(a) * C.ry * k;
        var mx = (x + C.x) / 2, my = (y + C.y) / 2, dx = C.x - x, dy = C.y - y, s = (i % 2 ? 0.2 : -0.2);
        return { l: l, x: x, y: y, cx: mx - dy * s, cy: my + dx * s, c: COL[i % 3], hit: 0, nx: 0 };
      });
      // a Tokyo skyline along the bottom (with a lattice tower)
      st.sky = []; st.win = [];
      var x = -4, top = h * (narrow ? 0.9 : 0.86);
      while (x < w + 10) {
        var bw = 16 + r() * 46, bh = (h - top) * (0.35 + r() * 0.65) + (r() < 0.18 ? h * 0.05 : 0);
        st.sky.push([x, h - bh, bw, bh]);
        for (var wy = h - bh + 6; wy < h - 4; wy += 7) for (var wx = x + 4; wx < x + bw - 4; wx += 6) if (r() < 0.16) st.win.push([wx, wy, r() * 6, r() < 0.25 ? '242,166,90' : r() < 0.5 ? A : '190,200,255']);
        x += bw + 2 + r() * 6;
      }
      st.tower = { x: narrow ? w * 0.86 : w * 0.655, h: h * (narrow ? 0.12 : 0.22) };
    };
    function spawn(st, from, to, at) {
      if (self.pk.length > 46) self.pk.shift();
      var N = st.nodes;
      if (from == null) from = Math.floor(Math.random() * N.length);
      if (to == null) { to = Math.floor(Math.random() * (N.length - 1)); if (to >= from) to++; }
      self.pk.push({ a: N[from], b: N[to], u: at || 0, sp: 0.55 + Math.random() * 0.35, col: Math.random() < 0.6 ? A : Math.random() < 0.7 ? B : '242,166,90' });
    }
    self.click = function (st) {
      if (KB.reduce) return;
      st.nodes.forEach(function (n, i) { spawn(st, i, i, 1); });
      self.rings.push({ r: 0, life: 1 });
    };
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, C = st.ag, N = st.nodes, R = KB.reduce, i;
      var dt = Math.min(0.05, self.last ? (ts - self.last) / 1000 : 0.016); self.last = ts;
      backdrop(ctx, w, h, t, { gx: C.x / w, gy: C.y / h, gr: 0.5, ga: 0.55 });
      // skyline
      ctx.fillStyle = 'rgba(10,9,17,0.92)';
      st.sky.forEach(function (b) { ctx.fillRect(b[0], b[1], b[2], b[3]); });
      ctx.strokeStyle = 'rgba(176,124,255,0.22)'; ctx.lineWidth = 1;
      st.sky.forEach(function (b) { ctx.beginPath(); ctx.moveTo(b[0], b[1] + 0.5); ctx.lineTo(b[0] + b[2], b[1] + 0.5); ctx.stroke(); });
      st.win.forEach(function (q) { var on = R ? 0.5 : 0.35 + 0.65 * Math.max(0, Math.sin(t * 0.7 + q[2] * 3)); ctx.fillStyle = 'rgba(' + q[3] + ',' + (0.12 + on * 0.5).toFixed(3) + ')'; ctx.fillRect(q[0], q[1], 2, 3); });
      var T = st.tower, tb = h, tt = h - T.h, tw = T.h * 0.17;
      ctx.strokeStyle = 'rgba(242,166,90,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(T.x - tw, tb); ctx.lineTo(T.x - 1, tt); ctx.moveTo(T.x + tw, tb); ctx.lineTo(T.x + 1, tt); ctx.stroke();
      for (i = 1; i < 9; i++) { var yy = tb - T.h * i / 9, hw = tw * (1 - i / 9) + 1, yn = tb - T.h * (i - 1) / 9, hn = tw * (1 - (i - 1) / 9) + 1; ctx.beginPath(); ctx.moveTo(T.x - hw, yy); ctx.lineTo(T.x + hw, yy); ctx.moveTo(T.x - hn, yn); ctx.lineTo(T.x + hw, yy); ctx.moveTo(T.x + hn, yn); ctx.lineTo(T.x - hw, yy); ctx.stroke(); }
      ctx.fillStyle = 'rgba(242,166,90,' + (R ? 0.9 : (0.5 + 0.5 * Math.sin(t * 3)).toFixed(3)) + ')'; ctx.beginPath(); ctx.arc(T.x, tt - 3, 2.2, 0, TAU); ctx.fill();
      // which app is the pointer on?
      var hov = null, best = 80;
      if (m.a > 0.05) N.forEach(function (n) { var d = Math.hypot(n.x - m.x, n.y - m.y); if (d < best) { best = d; hov = n; } });
      // links: app ↔ agent, and a faint ring of app ↔ app
      ctx.lineWidth = 1;
      for (i = 0; i < N.length; i++) { var p = N[i], q = N[(i + 2) % N.length]; ctx.strokeStyle = 'rgba(190,200,255,0.06)'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      N.forEach(function (n) {
        var on = n === hov ? 1 : n.hit;
        ctx.strokeStyle = on > 0.02 ? 'rgba(' + A + ',' + (0.14 + on * 0.6).toFixed(3) + ')' : 'rgba(190,200,255,0.14)';
        ctx.lineWidth = 1 + on;
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.quadraticCurveTo(n.cx, n.cy, C.x, C.y); ctx.stroke();
      });
      // new work arriving
      if (!R) {
        if (ts > self.next) { spawn(st); self.next = ts + 240 + Math.random() * 260; }
        if (hov && ts > hov.nx) { spawn(st, N.indexOf(hov)); hov.nx = ts + 220; }
      }
      // tasks travelling app → agent → app
      ctx.lineCap = 'round';
      for (i = self.pk.length - 1; i >= 0; i--) {
        var k = self.pk[i];
        if (!R) k.u += dt * k.sp;
        if (k.u >= 2) { k.b.hit = 1; self.pk.splice(i, 1); continue; }
        var pos = function (u) { return u < 1 ? bez(k.a.x, k.a.y, k.a.cx, k.a.cy, C.x, C.y, u) : bez(C.x, C.y, k.b.cx, k.b.cy, k.b.x, k.b.y, u - 1); };
        var u0 = Math.max(k.u < 1 ? 0 : 1, k.u - 0.14), hd = pos(k.u), tl = pos(u0);
        var lg = ctx.createLinearGradient(tl[0], tl[1], hd[0], hd[1]);
        lg.addColorStop(0, 'rgba(' + k.col + ',0)'); lg.addColorStop(1, 'rgba(' + k.col + ',0.9)');
        ctx.strokeStyle = lg; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(tl[0], tl[1]);
        for (var s = 1; s <= 5; s++) { var pp = pos(u0 + (k.u - u0) * s / 5); ctx.lineTo(pp[0], pp[1]); }
        ctx.stroke();
        ctx.fillStyle = 'rgba(' + k.col + ',1)'; ctx.beginPath(); ctx.arc(hd[0], hd[1], 2.4, 0, TAU); ctx.fill();
      }
      ctx.lineCap = 'butt';
      // the apps
      ctx.font = '500 9px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      N.forEach(function (n) {
        var on = Math.max(n.hit, n === hov ? 1 : 0);
        if (!R) n.hit = Math.max(0, n.hit - dt * 1.6);
        if (on > 0.02) { var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26); g.addColorStop(0, 'rgba(' + n.c + ',' + (0.5 * on).toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + n.c + ',0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, 26, 0, TAU); ctx.fill(); }
        var sz = 9 + on * 2;
        ctx.fillStyle = 'rgba(14,13,21,0.92)'; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(n.x - sz, n.y - sz, sz * 2, sz * 2, 4); else ctx.rect(n.x - sz, n.y - sz, sz * 2, sz * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(' + n.c + ',' + (0.55 + on * 0.45).toFixed(3) + ')'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.fillStyle = 'rgba(' + n.c + ',' + (0.6 + on * 0.4).toFixed(3) + ')'; ctx.fillRect(n.x - 2.5, n.y - 2.5, 5, 5);
        ctx.fillStyle = 'rgba(238,235,245,' + (0.5 + on * 0.5).toFixed(3) + ')';
        ctx.fillText(n.l, n.x, n.y + sz + 13);
      });
      // the agent at the centre: a thinking ring, and pulses when it fires
      var cr = C.narrow ? 26 : 34, spin = R ? 0 : t * 0.9;
      var cg = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, cr * 3.2);
      cg.addColorStop(0, 'rgba(' + B + ',0.5)'); cg.addColorStop(0.5, 'rgba(' + A + ',0.12)'); cg.addColorStop(1, 'rgba(' + A + ',0)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(C.x, C.y, cr * 3.2, 0, TAU); ctx.fill();
      ctx.fillStyle = '#0E0D15'; ctx.beginPath(); ctx.arc(C.x, C.y, cr, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(' + A + ',0.95)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(C.x, C.y, cr, 0, TAU); ctx.stroke();
      ctx.strokeStyle = 'rgba(' + B + ',0.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(C.x, C.y, cr + 8, spin, spin + 1.3); ctx.stroke(); ctx.beginPath(); ctx.arc(C.x, C.y, cr + 8, spin + Math.PI, spin + Math.PI + 0.7); ctx.stroke();
      ctx.setLineDash([2, 6]); ctx.strokeStyle = 'rgba(190,200,255,0.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(C.x, C.y, cr + 16, -spin * 0.6, -spin * 0.6 + TAU); ctx.stroke(); ctx.setLineDash([]);
      for (i = self.rings.length - 1; i >= 0; i--) {
        var rg = self.rings[i]; rg.r += dt * 260; rg.life -= dt * 0.9;
        if (rg.life <= 0) { self.rings.splice(i, 1); continue; }
        ctx.strokeStyle = 'rgba(' + A + ',' + (0.7 * rg.life).toFixed(3) + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(C.x, C.y, cr + rg.r, 0, TAU); ctx.stroke();
      }
      ctx.fillStyle = '#EEEBF5'; ctx.font = '700 ' + (C.narrow ? 13 : 16) + 'px "JetBrains Mono", monospace'; ctx.fillText('AI', C.x, C.y + 1);
      ctx.fillStyle = 'rgba(' + A + ',0.9)'; ctx.font = '500 8px "JetBrains Mono", monospace'; ctx.fillText('AGENT', C.x, C.y + (C.narrow ? 12 : 14));
      // the agent's log, typing itself out (desktop)
      if (!C.narrow) {
        if (!R && ts > self.logT) { self.log.push({ s: LOG[self.logN++ % LOG.length], t: ts }); if (self.log.length > 4) self.log.shift(); self.logT = ts + 1400; }
        var lx = C.x + C.rx * 0.55, ly = h * 0.8;
        ctx.textAlign = 'start'; ctx.font = '500 10px "JetBrains Mono", monospace';
        self.log.forEach(function (ln, j) {
          var n2 = R ? ln.s.length : Math.min(ln.s.length, Math.floor((ts - ln.t) / 28)), a = 0.3 + 0.6 * (j + 1) / self.log.length;
          ctx.fillStyle = ln.s.charAt(0) === '✓' ? 'rgba(' + A + ',' + a.toFixed(3) + ')' : 'rgba(238,235,245,' + (a * 0.8).toFixed(3) + ')';
          ctx.fillText(ln.s.slice(0, n2) + (j === self.log.length - 1 && !R && Math.floor(ts / 400) % 2 ? '▌' : ''), Math.min(lx, w - 190), ly - (self.log.length - 1 - j) * 15);
        });
      }
      ctx.textAlign = 'start';
      cursorGlow(ctx, m, 22);
      veil(ctx, w, h, 0.82, false);
    };
    return self;
  };

  /* ---------- Field marketing: a design canvas recomposing itself — post, banner, story, email header.
     Hover a block to select it; click to jump to the next format. ---------- */
  V.compose = function () {
    var L8 = [
      { name: 'LINKEDIN POST', dim: '1080 × 1080', a: 1, c: A, b: [[0.06, 0.06, 0.88, 0.5], [0.06, 0.62, 0.62, 0.075], [0.06, 0.71, 0.44, 0.075], [0.06, 0.83, 0.56, 0.028], [0.06, 0.88, 0.38, 0.028], [0.68, 0.83, 0.26, 0.08], [0.82, 0.62, 0.12, 0.12]] },
      { name: 'EVENT BANNER', dim: '1920 × 1080', a: 16 / 9, c: B, b: [[0.52, 0, 0.48, 1], [0.06, 0.24, 0.38, 0.1], [0.06, 0.37, 0.28, 0.1], [0.06, 0.56, 0.36, 0.035], [0.06, 0.62, 0.26, 0.035], [0.06, 0.74, 0.17, 0.1], [0.06, 0.07, 0.06, 0.1]] },
      { name: 'STORY', dim: '1080 × 1920', a: 9 / 16, c: '242,166,90', b: [[0, 0, 1, 0.54], [0.08, 0.6, 0.8, 0.055], [0.08, 0.67, 0.56, 0.055], [0.08, 0.77, 0.8, 0.018], [0.08, 0.8, 0.6, 0.018], [0.08, 0.87, 0.84, 0.06], [0.08, 0.04, 0.14, 0.08]] },
      { name: 'EMAIL HEADER', dim: '1200 × 400', a: 3, c: '98,120,255', b: [[0.66, 0.1, 0.3, 0.8], [0.05, 0.3, 0.46, 0.15], [0.05, 0.5, 0.32, 0.15], [0.05, 0.74, 0.3, 0.06], [0.05, 0.84, 0.2, 0.06], [0.42, 0.72, 0.17, 0.17], [0.05, 0.07, 0.05, 0.14]] }
    ];
    var self = { cur: 0, from: 0, tt: -1e9, next: 0, sel: 1 };
    var ease = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
    var mix = function (p, q, k) { return p + (q - p) * k; };
    self.layout = function (st) {
      var w = st.w, h = st.h, narrow = w < 760;
      st.cp = narrow ? { x: w * 0.1, y: h * 0.15, w: w * 0.8, h: h * 0.21, narrow: true } : { x: w * 0.5, y: h * 0.15, w: w * 0.42, h: h * 0.6 };
    };
    function go(ts, to) { self.from = self.cur; self.cur = to; self.tt = ts; self.next = ts + 3400; self.sel = 1 + Math.floor(Math.random() * 6); }
    self.click = function (st) { if (!KB.reduce) go(performance.now(), (self.cur + 1) % L8.length); };
    self.draw = function (st, t, ts) {
      var ctx = st.ctx, w = st.w, h = st.h, m = st.m, R = KB.reduce, G = st.cp, i;
      if (!R && !self.next) self.next = ts + 2600;
      if (!R && ts > self.next) go(ts, (self.cur + 1) % L8.length);
      var k = R ? 1 : ease(Math.min(1, (ts - self.tt) / 750)), P = L8[self.from], Q = L8[self.cur];
      backdrop(ctx, w, h, t, { gx: (G.x + G.w / 2) / w, gy: (G.y + G.h / 2) / h, gr: 0.5, ga: 0.5 });
      // layout guides: a 12-column grid behind the canvas
      ctx.lineWidth = 1;
      for (i = 0; i <= 12; i++) { var gx = G.x + G.w * i / 12; ctx.strokeStyle = 'rgba(190,200,255,' + (i % 6 ? 0.05 : 0.12) + ')'; ctx.beginPath(); ctx.moveTo(gx, G.y - 30); ctx.lineTo(gx, G.y + G.h + 30); ctx.stroke(); }
      // the frame, morphing between formats
      var fit = function (L) { var fw = Math.min(G.w, G.h * L.a), fh = fw / L.a; return [G.x + (G.w - fw) / 2, G.y + (G.h - fh) / 2, fw, fh]; };
      var f0 = fit(P), f1 = fit(Q), F = [0, 1, 2, 3].map(function (j) { return mix(f0[j], f1[j], k); });
      var tx = m.a > 0.05 ? (m.x / w - 0.5) * 8 * m.a : 0, ty = m.a > 0.05 ? (m.y / h - 0.5) * 6 * m.a : 0;
      F[0] += tx; F[1] += ty;
      ctx.save(); ctx.shadowColor = 'rgba(' + Q.c + ',0.35)'; ctx.shadowBlur = 50; ctx.fillStyle = '#F1EFF6'; ctx.fillRect(F[0], F[1], F[2], F[3]); ctx.restore();
      // crop marks
      ctx.strokeStyle = 'rgba(238,235,245,0.55)'; ctx.lineWidth = 1;
      [[F[0], F[1], -1, -1], [F[0] + F[2], F[1], 1, -1], [F[0], F[1] + F[3], -1, 1], [F[0] + F[2], F[1] + F[3], 1, 1]].forEach(function (c) {
        ctx.beginPath(); ctx.moveTo(c[0] + c[2] * 6, c[1]); ctx.lineTo(c[0] + c[2] * 18, c[1]); ctx.moveTo(c[0], c[1] + c[3] * 6); ctx.lineTo(c[0], c[1] + c[3] * 18); ctx.stroke();
      });
      // blocks
      var col = k < 0.5 ? P.c : Q.c, hov = -1, rects = [];
      for (i = 0; i < 7; i++) {
        var b0 = P.b[i], b1 = Q.b[i];
        var r = [F[0] + F[2] * mix(b0[0], b1[0], k), F[1] + F[3] * mix(b0[1], b1[1], k), F[2] * mix(b0[2], b1[2], k), F[3] * mix(b0[3], b1[3], k)];
        rects.push(r);
        if (m.a > 0.05 && m.x > r[0] && m.x < r[0] + r[2] && m.y > r[1] && m.y < r[1] + r[3]) hov = i;
      }
      rects.forEach(function (r, j) {
        if (j === 0) {
          var g = ctx.createLinearGradient(r[0], r[1], r[0] + r[2], r[1] + r[3]);
          g.addColorStop(0, 'rgba(' + col + ',0.95)'); g.addColorStop(1, 'rgba(91,63,217,0.9)');
          ctx.fillStyle = g; ctx.fillRect(r[0], r[1], r[2], r[3]);
          ctx.save(); ctx.beginPath(); ctx.rect(r[0], r[1], r[2], r[3]); ctx.clip();
          var cr = Math.min(r[2], r[3]) * 0.32, cx = r[0] + r[2] * 0.68 + (R ? 0 : Math.sin(t * 0.6) * 6), cy = r[1] + r[3] * 0.42;
          ctx.fillStyle = 'rgba(241,239,246,0.85)'; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(19,18,28,0.25)'; ctx.lineWidth = 1;
          for (var s = -r[3]; s < r[2]; s += 9) { ctx.beginPath(); ctx.moveTo(r[0] + s, r[1] + r[3]); ctx.lineTo(r[0] + s + r[3], r[1]); ctx.stroke(); }
          ctx.restore();
        } else if (j <= 2) { ctx.fillStyle = '#17152A'; ctx.fillRect(r[0], r[1], r[2], r[3]); }
        else if (j <= 4) { ctx.fillStyle = 'rgba(23,21,42,0.28)'; ctx.fillRect(r[0], r[1], r[2], r[3]); }
        else if (j === 5) { ctx.fillStyle = 'rgba(' + col + ',1)'; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(r[0], r[1], r[2], r[3], Math.min(r[3], r[2]) / 2); else ctx.rect(r[0], r[1], r[2], r[3]); ctx.fill(); }
        else { ctx.fillStyle = '#17152A'; ctx.fillRect(r[0], r[1], r[2], r[3]); ctx.fillStyle = 'rgba(' + col + ',1)'; ctx.fillRect(r[0] + r[2] * 0.3, r[1] + r[3] * 0.3, r[2] * 0.4, r[3] * 0.4); }
      });
      // selection box, like a design tool (follows the pointer, otherwise wanders)
      var si = hov > -1 ? hov : (k >= 1 ? self.sel : -1);
      if (si > -1) {
        var q = rects[si], pd = 3;
        ctx.strokeStyle = 'rgba(' + A + ',1)'; ctx.lineWidth = 1.5; ctx.strokeRect(q[0] - pd, q[1] - pd, q[2] + pd * 2, q[3] + pd * 2);
        ctx.fillStyle = '#F1EFF6';
        [[q[0] - pd, q[1] - pd], [q[0] + q[2] + pd, q[1] - pd], [q[0] - pd, q[1] + q[3] + pd], [q[0] + q[2] + pd, q[1] + q[3] + pd]].forEach(function (c) { ctx.fillRect(c[0] - 3, c[1] - 3, 6, 6); ctx.strokeRect(c[0] - 3, c[1] - 3, 6, 6); });
        var lab = ['IMAGE', 'HEADLINE', 'HEADLINE', 'BODY', 'BODY', 'CTA', 'LOGO'][si];
        ctx.font = '600 9px "JetBrains Mono", monospace'; var lw = ctx.measureText(lab).width + 10;
        ctx.fillStyle = 'rgba(' + A + ',1)'; ctx.fillRect(q[0] - pd, q[1] - pd - 16, lw, 14);
        ctx.fillStyle = '#13121C'; ctx.fillText(lab, q[0] - pd + 5, q[1] - pd - 6);
      }
      // format labels
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(238,235,245,0.6)'; ctx.textAlign = 'center';
      if (!G.narrow) ctx.fillText(Q.dim, F[0] + F[2] / 2, F[1] - 12);
      ctx.fillStyle = 'rgba(' + A + ',0.95)'; ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(Q.name, F[0] + F[2] / 2, F[1] + F[3] + (G.narrow ? 18 : 24));
      // format picker dots
      if (!G.narrow) for (i = 0; i < L8.length; i++) { ctx.fillStyle = i === self.cur ? 'rgba(' + A + ',1)' : 'rgba(238,235,245,0.25)'; ctx.beginPath(); ctx.arc(F[0] + F[2] / 2 + (i - 1.5) * 12, F[1] + F[3] + 38, 2.5, 0, TAU); ctx.fill(); }
      ctx.textAlign = 'start';
      // palette swatches (desktop)
      if (!G.narrow) {
        var sw = [['8CFFC1', A], ['B07CFF', B], ['6278FF', '98,120,255'], ['F2A65A', '242,166,90']];
        sw.forEach(function (c, j) {
          var sx = G.x + j * 74, sy = h * 0.88;
          ctx.fillStyle = 'rgba(' + c[1] + ',1)'; ctx.fillRect(sx, sy, 18, 18);
          ctx.fillStyle = 'rgba(238,235,245,0.5)'; ctx.font = '500 9px "JetBrains Mono", monospace'; ctx.fillText('#' + c[0], sx + 24, sy + 13);
        });
      }
      cursorGlow(ctx, m, 18);
      veil(ctx, w, h, 0.82, false);
    };
    return self;
  };
})();
