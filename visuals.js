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
})();
