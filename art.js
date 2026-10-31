/*
  VACATION RANKER: LANDMARK POSTERS
  ---------------------------------
  Draws a flat travel-poster illustration for each place:
  pale sky, big sun, clouds, a layered background (city, beach, snow...),
  the place name, and a landmark in front.

  Each entry in MOTIFS has:
    bg    background scene: city, beach, water, mountain, snow, desert, green, savanna
    back  (optional) drawn behind the middle layer, e.g. Mount Fuji
    draw  the landmark, drawn around x=0, ground at y=0, "up" is negative y
*/
(function () {
  "use strict";

  var K = {
    sky0: "#EEF8F6", sky1: "#C6E7E3", sun: "#F26B3A", sunY: "#F7C548", cloud: "#F9B9A2",
    far: "#A9D8D4", mid: "#62B4B0", deep: "#2F8C8A", slate: "#1F3B45",
    coral: "#F26B3A", orange: "#F39A57", yellow: "#F7CF5E", gold: "#E9B949", cream: "#FBE8BF",
    white: "#FFFFFF", grey: "#B3C3C5", stone: "#E2CCA0", sea: "#3DB2BB", sea2: "#2C9AA5",
    sand: "#F5DEAA", red: "#D9533B", green: "#6DB585", green2: "#3F9163", wood: "#A8754F",
    rock: "#D9774A", blue: "#2F6FB5", pink: "#F5A99F", snow: "#F4FAFB", snowS: "#D6E7EC"
  };

  /* ---------- drawing helpers ---------- */
  function n(v) { return Math.round(v * 10) / 10; }
  function R(x, y, w, h, f, rx) { return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(w) + '" height="' + n(h) + '" fill="' + f + '"' + (rx ? ' rx="' + rx + '"' : "") + "/>"; }
  function P(d, f, op) { return '<path d="' + d + '" fill="' + f + '"' + (op ? ' fill-opacity="' + op + '"' : "") + "/>"; }
  function C(x, y, r, f, op) { return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="' + f + '"' + (op ? ' fill-opacity="' + op + '"' : "") + "/>"; }
  function E(x, y, rx, ry, f) { return '<ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + n(rx) + '" ry="' + n(ry) + '" fill="' + f + '"/>'; }
  function L(d, s, w, op) { return '<path d="' + d + '" fill="none" stroke="' + s + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' stroke-opacity="' + op + '"' : "") + "/>"; }
  function T(x, y, s, size, f) { return '<text x="' + x + '" y="' + y + '" font-family="Archivo, Arial, sans-serif" font-weight="900" font-size="' + size + '" fill="' + f + '" text-anchor="middle">' + s + "</text>"; }
  function win(x, y, w, h, cols, rows, f, sz) {
    var o = "", s = sz || 3, dx = w / cols, dy = h / rows;
    for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) o += R(x + i * dx + (dx - s) / 2, y + j * dy + (dy - s * 1.4) / 2, s, s * 1.4, f);
    return o;
  }
  function tri(x, base, w, h, f) { return P("M" + n(x - w / 2) + " " + base + " L" + n(x) + " " + n(base - h) + " L" + n(x + w / 2) + " " + base + "Z", f); }
  function peak(x, base, w, h, f, capF) {
    var o = tri(x, base, w, h, f);
    if (capF) {
      var t = base - h, k = 0.3;
      o += P("M" + n(x - w / 2 * k) + " " + n(t + h * k) + " L" + n(x) + " " + n(t) + " L" + n(x + w / 2 * k) + " " + n(t + h * k) +
        " L" + n(x + w * 0.06) + " " + n(t + h * k * 0.75) + " L" + n(x) + " " + n(t + h * k * 1.05) + " L" + n(x - w * 0.07) + " " + n(t + h * k * 0.8) + "Z", capF);
    }
    return o;
  }
  function pine(x, base, h, f) {
    return R(x - 1.5, base - h * 0.2, 3, h * 0.2, K.wood) + tri(x, base - h * 0.15, h * 0.55, h * 0.6, f) + tri(x, base - h * 0.45, h * 0.42, h * 0.55, f);
  }
  function snowpine(x, base, h) { return pine(x, base, h, K.deep) + tri(x, base - h * 0.75, h * 0.18, h * 0.25, K.white); }
  function palm(x, h, lean, base) {
    base = base || 0;
    var tx = x + lean, ty = base - h, o = L("M" + x + " " + base + " Q" + n(x + lean * 0.2) + " " + n(base - h * 0.55) + " " + n(tx) + " " + n(ty), K.wood, 5);
    var leaves = [[-34, 10], [-28, -10], [-8, -20], [14, -18], [32, -6], [34, 12], [-16, 16], [16, 16]];
    leaves.forEach(function (l) {
      var ex = tx + l[0], ey = ty + l[1], mx = tx + l[0] * 0.5, my = ty + l[1] * 0.5;
      o += P("M" + n(tx) + " " + n(ty) + " Q" + n(mx - l[1] * 0.25) + " " + n(my - 9) + " " + n(ex) + " " + n(ey) + " Q" + n(mx + l[1] * 0.1) + " " + n(my + 2) + " " + n(tx) + " " + n(ty) + "Z", K.green2);
    });
    return o + C(tx - 2, ty + 3, 3, "#7A5236") + C(tx + 3, ty + 4, 3, "#7A5236");
  }
  function umbrella(x, base) {
    return L("M" + x + " " + base + " L" + (x + 4) + " " + (base - 40), K.slate, 2) +
      P("M" + (x - 20) + " " + (base - 36) + " Q" + (x + 4) + " " + (base - 62) + " " + (x + 28) + " " + (base - 36) + "Z", K.coral) +
      P("M" + (x - 4) + " " + (base - 36) + " Q" + (x + 4) + " " + (base - 62) + " " + (x + 12) + " " + (base - 36) + "Z", K.white);
  }
  function sailboat(x, y, s, col) {
    s = s || 1;
    return P("M" + n(x - 16 * s) + " " + y + " L" + n(x + 16 * s) + " " + y + " L" + n(x + 11 * s) + " " + n(y + 7 * s) + " L" + n(x - 11 * s) + " " + n(y + 7 * s) + "Z", K.slate) +
      P("M" + n(x + 1) + " " + n(y - 2) + " L" + n(x + 1) + " " + n(y - 34 * s) + " L" + n(x + 15 * s) + " " + n(y - 2) + "Z", col || K.white) +
      P("M" + n(x - 1) + " " + n(y - 2) + " L" + n(x - 1) + " " + n(y - 26 * s) + " L" + n(x - 11 * s) + " " + n(y - 2) + "Z", K.cream);
  }
  function chalet(x, base, w, body) {
    var h = w * 0.55;
    return R(x - w / 2, base - h, w, h, body || "#C98B5E") + win(x - w / 2 + 4, base - h + 4, w - 8, h - 10, 3, 1, K.yellow, 4) +
      P("M" + n(x - w / 2 - 5) + " " + n(base - h) + " L" + x + " " + n(base - h - w * 0.4) + " L" + n(x + w / 2 + 5) + " " + n(base - h) + "Z", K.slate) +
      P("M" + n(x - w / 2 - 5) + " " + n(base - h) + " L" + x + " " + n(base - h - w * 0.4) + " L" + n(x + w / 2 + 5) + " " + n(base - h) + " L" + n(x + w / 2) + " " + n(base - h - 4) + " L" + x + " " + n(base - h - w * 0.4 + 6) + " L" + n(x - w / 2) + " " + n(base - h - 4) + "Z", K.white);
  }
  function lift(x1, y1, x2, y2, nChairs, col) {
    var o = L("M" + x1 + " " + y1 + " L" + x2 + " " + y2, K.slate, 1.5);
    for (var i = 1; i <= nChairs; i++) {
      var t = i / (nChairs + 1), cx = x1 + (x2 - x1) * t, cy = y1 + (y2 - y1) * t;
      o += L("M" + n(cx) + " " + n(cy) + " v8", K.slate, 1.2) + R(cx - 5, cy + 8, 10, col ? 8 : 3, col || K.slate, 1.5);
    }
    return o;
  }
  function house(x, base, w, h, body, roof) {
    return R(x, base - h, w, h, body) + win(x + 3, base - h + 4, w - 6, h - 8, Math.max(1, Math.round(w / 9)), Math.max(1, Math.round(h / 14)), K.slate, 2.5) +
      P("M" + n(x - 2) + " " + n(base - h) + " L" + n(x + w / 2) + " " + n(base - h - w * 0.4) + " L" + n(x + w + 2) + " " + n(base - h) + "Z", roof || K.coral);
  }
  function karst(x, base, w, h, f) {
    return P("M" + n(x - w / 2) + " " + base + " Q" + n(x - w / 2 - 4) + " " + n(base - h * 0.7) + " " + n(x - w * 0.15) + " " + n(base - h) + " Q" + n(x + w * 0.35) + " " + n(base - h * 1.02) + " " + n(x + w / 2) + " " + n(base - h * 0.6) + " L" + n(x + w / 2 + 3) + " " + base + "Z", f);
  }
  function junk(x, y, col) {
    return P("M" + (x - 30) + " " + y + " L" + (x + 30) + " " + y + " L" + (x + 22) + " " + (y + 8) + " L" + (x - 24) + " " + (y + 8) + "Z", "#7A4A30") +
      P("M" + (x - 14) + " " + (y - 2) + " L" + (x - 18) + " " + (y - 38) + " L" + (x - 2) + " " + (y - 40) + " L" + x + " " + (y - 2) + "Z", col || K.coral) +
      P("M" + (x + 4) + " " + (y - 2) + " L" + (x + 2) + " " + (y - 30) + " L" + (x + 18) + " " + (y - 32) + " L" + (x + 20) + " " + (y - 2) + "Z", col || K.coral) +
      L("M" + (x - 17) + " " + (y - 28) + " h15 M" + (x - 16) + " " + (y - 16) + " h15 M" + (x + 3) + " " + (y - 20) + " h15", "#B74A2A", 1.2);
  }
  function stripes(x, y, w, h, nn, f) { var o = ""; for (var i = 0; i < nn; i++) o += R(x + i * (w / nn) + w / nn * 0.3, y, w / nn * 0.4, h, f); return o; }
  function onion(x, y, r, f) { return P("M" + (x - r) + " " + y + " Q" + (x - r) + " " + (y - r * 1.2) + " " + x + " " + (y - r * 2.2) + " Q" + (x + r) + " " + (y - r * 1.2) + " " + (x + r) + " " + y + "Z", f); }
  function domeP(x, y, r, f) { return P("M" + (x - r) + " " + y + " A" + r + " " + r + " 0 0 1 " + (x + r) + " " + y + "Z", f); }

  /* ---------- the landmarks ---------- */
  var M = {
    /* Europe */
    eiffel: { bg: "city", draw: function () {
      return E(-90, 0, 40, 14, K.green2) + E(90, 0, 40, 14, K.green2) +
        P("M-34 0 L-7 -150 L7 -150 L34 0 L21 0 Q0 -48 -21 0Z", K.slate) +
        L("M-25 -50 L-11 -100 M25 -50 L11 -100 M-24 -54 L16 -98 M24 -54 L-16 -98 M-9 -108 L5 -146 M9 -108 L-5 -146", K.sky1, 1.2, 0.6) +
        R(-27, -58, 54, 6, K.slate) + R(-16, -104, 32, 5, K.slate) + R(-2, -182, 4, 34, K.slate) + C(0, -150, 4.5, K.slate);
    } },
    bigben: { bg: "city", back: function () {
      var o = L("M80 -10 L60 40 M80 -10 L100 40", K.grey, 3) + '<circle cx="80" cy="-62" r="52" fill="none" stroke="' + K.grey + '" stroke-width="3"/>';
      for (var a = 0; a < 12; a++) { var ang = a * Math.PI / 6; o += L("M80 -62 L" + n(80 + 52 * Math.cos(ang)) + " " + n(-62 + 52 * Math.sin(ang)), K.grey, 1) + C(80 + 52 * Math.cos(ang), -62 + 52 * Math.sin(ang), 4, K.white); }
      return "<g transform=\"translate(0,0)\">" + o + "</g>";
    }, draw: function () {
      var o = R(-125, -55, 100, 55, K.cream) + win(-120, -48, 92, 42, 9, 3, K.deep, 3);
      for (var x = -124; x < -28; x += 16) o += R(x, -66, 5, 11, K.cream) + tri(x + 2.5, -66, 7, 9, K.slate);
      return o + R(-17, -140, 34, 140, "#F2D79A") + R(-11, -100, 4, 92, K.gold) + R(7, -100, 4, 92, K.gold) +
        R(-20, -144, 40, 8, K.slate) + C(0, -118, 12, K.white) + '<circle cx="0" cy="-118" r="12" fill="none" stroke="' + K.slate + '" stroke-width="2.5"/>' +
        L("M0 -118 V-126 M0 -118 H6", K.slate, 2) + P("M-17 -144 L0 -186 L17 -144Z", K.slate) + R(-1, -196, 2, 12, K.gold);
    } },
    colosseum: { bg: "city", draw: function () {
      var o = P("M-118 0 V-80 Q-60 -98 0 -100 Q45 -99 70 -95 L86 -72 L104 -66 L118 -52 V0Z", "#F2C48D");
      [[-14, 20], [-44, 18], [-72, 15]].forEach(function (row, ri) {
        for (var x = -110; x < 108; x += 17) {
          if (ri === 2 && x > 62) continue;
          if (ri === 1 && x > 92) continue;
          o += P("M" + x + " " + row[0] + " v" + -(row[1] - 5) + " a5 5 0 0 1 10 0 v" + (row[1] - 5) + "z", "#C98450");
        }
      });
      return o + R(-118, -30, 236, 3, "#E3A96E") + R(-118, -58, 210, 3, "#E3A96E");
    } },
    sagrada: { bg: "city", draw: function () {
      var o = R(-58, -52, 116, 52, "#E6C08C") + P("M-12 0 V-28 a12 12 0 0 1 24 0 V0Z", "#B98A55");
      [[-44, -128], [-26, -162], [-9, -184], [9, -184], [26, -162], [44, -128]].forEach(function (s, i) {
        var x = s[0], h = s[1];
        o += P("M" + (x - 8) + " -48 L" + (x - 8) + " " + (h + 40) + " Q" + x + " " + (h - 8) + " " + (x + 8) + " " + (h + 40) + " L" + (x + 8) + " -48Z", "#EECC98");
        for (var j = 0; j < 5; j++) o += C(x, h + 50 + j * 16, 1.6, "#B98A55");
        o += C(x, h - 6, 4, i % 2 ? K.coral : K.yellow);
      });
      return o + L("M86 0 V-150 M66 -150 H122 M112 -150 V-124", K.slate, 2.5) + R(108, -124, 8, 6, K.yellow);
    } },
    brandenburg: { bg: "city", draw: function () {
      var o = R(-118, -190, 5, 190, K.grey) + C(-115.5, -140, 15, "#C8D3D5") + R(-131, -141, 31, 3, K.slate) + R(-117, -205, 2, 16, K.red);
      for (var i = 0; i < 6; i++) o += R(-66 + i * 24.4, -62, 10, 62, K.cream) + R(-64 + i * 24.4, -62, 2, 62, "#E7D09E");
      return o + R(-76, -74, 152, 12, K.cream) + R(-70, -64, 140, 3, "#E7D09E") + R(-40, -92, 80, 18, K.cream) +
        R(-12, -104, 24, 12, K.slate) + tri(-14, -98, 8, 14, K.slate) + tri(14, -98, 8, 14, K.slate) + R(-78, -4, 156, 4, "#E7D09E");
    } },
    tyn: { bg: "city", draw: function () {
      var o = R(-46, -80, 92, 80, K.cream) + P("M-46 -80 L0 -112 L46 -80Z", K.slate);
      [-33, 33].forEach(function (x) {
        o += R(x - 13, -126, 26, 126, "#F0DCAE") + P("M" + (x - 15) + " -126 L" + x + " -196 L" + (x + 15) + " -126Z", K.slate) +
          tri(x - 13, -126, 8, 26, K.slate) + tri(x + 13, -126, 8, 26, K.slate) + tri(x - 7, -150, 6, 18, K.slate) + tri(x + 7, -150, 6, 18, K.slate) +
          C(x, -198, 2.5, K.gold) + P("M" + (x - 3) + " -96 v-10 a3 3 0 0 1 6 0 v10z", K.slate);
      });
      var cols = [K.cream, K.pink, K.yellow, "#F6D2A8"];
      for (var x = -150, k = 0; x < 125; x += 27, k++) { if (x > -75 && x < 50) continue; o += house(x, 0, 24, 36, cols[k % 4], K.coral); }
      return o;
    } },
    canalhouses: { bg: "city", draw: function () {
      var cols = [K.coral, K.yellow, K.deep, K.cream, K.orange], hs = [110, 128, 102, 134, 116], o = "";
      for (var i = 0; i < 5; i++) {
        var x0 = -128 + i * 50, w = 46, h = hs[i];
        o += R(x0, -h, w, h, cols[i]);
        if (i % 2) o += P("M" + x0 + " " + -h + " L" + x0 + " " + (-h - 8) + " L" + (x0 + 8) + " " + (-h - 8) + " L" + (x0 + 8) + " " + (-h - 16) + " L" + (x0 + 16) + " " + (-h - 16) + " L" + (x0 + 16) + " " + (-h - 24) + " L" + (x0 + 30) + " " + (-h - 24) + " L" + (x0 + 30) + " " + (-h - 16) + " L" + (x0 + 38) + " " + (-h - 16) + " L" + (x0 + 38) + " " + (-h - 8) + " L" + (x0 + w) + " " + (-h - 8) + " L" + (x0 + w) + " " + -h + "Z", cols[i]);
        else o += P("M" + x0 + " " + -h + " Q" + (x0 + 6) + " " + (-h - 4) + " " + (x0 + 12) + " " + (-h - 16) + " Q" + (x0 + 23) + " " + (-h - 30) + " " + (x0 + 34) + " " + (-h - 16) + " Q" + (x0 + 40) + " " + (-h - 4) + " " + (x0 + w) + " " + -h + "Z", cols[i]);
        o += win(x0 + 7, -h + 6, w - 14, h - 28, 3, 4, K.white, 5) + R(x0 + w / 2 - 5, -18, 10, 18, K.slate) + R(x0 + w / 2 - 1, -h - 20, 2, 6, K.slate);
      }
      return o + R(-275, 4, 400, 40, K.sea2) + L("M-150 16 h30 M-40 22 h40 M60 14 h30", K.white, 2, 0.6);
    } },
    santorini: { bg: "water", draw: function () {
      var o = P("M-275 35 L-275 -66 Q-150 -92 -40 -62 Q30 -40 70 -6 L100 35Z", "#C98A63");
      [[-200, -84, 22, 18], [-176, -90, 24, 22], [-150, -80, 20, 16], [-128, -92, 26, 22], [-100, -76, 22, 18], [-34, -62, 24, 18], [-8, -50, 22, 16], [16, -40, 24, 18],
        [-210, -66, 26, 16], [-180, -68, 22, 14], [-140, -62, 24, 16], [-110, -58, 20, 14], [-70, -58, 28, 18], [-40, -44, 22, 14], [40, -24, 22, 16], [-20, -30, 24, 14]].forEach(function (b) { o += R(b[0], b[1], b[2], b[3], K.white) + R(b[0] + 6, b[1] + 5, 4, 6, K.blue); });
      return o + R(-84, -100, 30, 26, K.white) + domeP(-69, -100, 15, K.blue) + R(-70, -122, 2, 8, K.white) + R(-73, -119, 8, 2, K.white) +
        R(-48, -128, 22, 52, K.white) + P("M-44 -112 v-8 a3 3 0 0 1 6 0 v8z", K.sky1) + P("M-34 -112 v-8 a3 3 0 0 1 6 0 v8z", K.sky1) + domeP(-37, -128, 8, K.blue) + sailboat(90, 20, 0.8);
    } },
    dubrovnik: { bg: "water", draw: function () {
      var o = "";
      var cols = [K.cream, "#F6D2A8", K.white];
      for (var x = -100, k = 0; x < 120; x += 22, k++) o += R(x, -82, 20, 34, cols[k % 3]) + P("M" + (x - 2) + " -82 L" + (x + 10) + " -94 L" + (x + 22) + " -82Z", K.coral);
      o += R(54, -128, 14, 80, K.cream) + P("M53 -128 L61 -146 L69 -128Z", K.coral) + C(10, -92, 12, "#E2CC9C");
      o += P("M-160 12 V-50 H125 V12Z", K.stone);
      for (var c = -160; c < 125; c += 12) o += R(c, -56, 7, 6, K.stone);
      return o + R(-150, -116, 44, 116, "#DDBF8E") + R(-153, -124, 50, 9, "#DDBF8E") + R(-153, -130, 8, 6, "#DDBF8E") + R(-136, -130, 8, 6, "#DDBF8E") + R(-119, -130, 8, 6, "#DDBF8E") +
        R(-132, -90, 6, 12, K.slate) + R(-160, 8, 285, 40, K.sea);
    } },
    tram: { bg: "city", draw: function () {
      var o = "", cols = [K.deep, K.yellow, K.cream, K.pink, "#8CCBC5"];
      for (var x = -150, k = 0; x < 125; x += 46, k++) o += R(x, -110 + (k % 2) * 14, 44, 110, cols[k % 5]) + win(x + 5, -102 + (k % 2) * 14, 34, 70, 3, 4, K.white, 5);
      o += R(-275, -6, 400, 42, K.grey) + L("M-275 -126 H125", K.slate, 1.2);
      return o + R(-72, -66, 144, 52, "#F6C343", 8) + R(-68, -72, 136, 8, K.white, 4) + R(-72, -36, 144, 4, K.white) +
        R(-64, -60, 16, 18, K.slate, 2) + R(-42, -60, 16, 18, K.slate, 2) + R(-20, -60, 16, 18, K.slate, 2) + R(2, -60, 16, 18, K.slate, 2) + R(24, -60, 16, 18, K.slate, 2) + R(46, -60, 18, 18, K.slate, 2) +
        C(-44, -12, 7, K.slate) + C(44, -12, 7, K.slate) + L("M0 -72 L28 -126", K.slate, 2) + R(-66, -30, 20, 11, K.slate, 2) + T(-56, -21.5, "28", 9, "#F6C343");
    } },
    amalfi: { bg: "water", draw: function () {
      var o = P("M-275 35 V-50 Q-210 -140 -110 -96 Q-50 -66 -10 35Z", K.green2), cols = [K.yellow, K.pink, K.cream, K.orange, K.white];
      [[-230, -60], [-205, -76], [-180, -88], [-156, -96], [-132, -90], [-110, -80], [-88, -66], [-66, -52], [-46, -36], [-220, -36], [-194, -50], [-168, -62], [-144, -66], [-120, -58], [-96, -44], [-74, -28], [-200, -20], [-150, -34], [-124, -26]].forEach(function (p, i) { o += R(p[0], p[1], 20, 16, cols[i % 5]) + R(p[0] + 7, p[1] + 5, 5, 6, K.slate); });
      o += R(-142, -142, 14, 48, K.cream) + onion(-135, -142, 8, K.yellow) + C(-135, -160, 1.5, K.slate);
      o += R(78, -48, 4, 48, K.wood) + C(80, -66, 28, K.green2);
      [[66, -74], [86, -80], [94, -60], [72, -56], [80, -88], [60, -62]].forEach(function (l) { o += C(l[0], l[1], 3.5, K.yellow); });
      return o + sailboat(30, 22, 0.9, K.coral);
    } },
    aurora: { bg: "mountain", draw: function () {
      var o = L("M-275 -170 Q-180 -205 -90 -170 T90 -175 T200 -165", "#7EE0B5", 12, 0.55) + L("M-260 -145 Q-170 -180 -60 -150 T120 -150", "#9FE8C8", 8, 0.45) + L("M-200 -190 Q-120 -215 -20 -195 T120 -200", "#B9A6F0", 6, 0.35);
      o += R(-14, -150, 28, 150, "#E6ECEE") + tri(0, -150, 28, 34, "#E6ECEE") + R(-3, -196, 6, 16, "#E6ECEE");
      for (var k = 1; k <= 5; k++) o += R(-14 - k * 9, -150 + k * 24, 9, 150 - k * 24, "#D3DCDF") + R(14 + (k - 1) * 9, -150 + k * 24, 9, 150 - k * 24, "#D3DCDF");
      return o + R(-4, -120, 8, 12, K.slate) + house(-130, 0, 30, 26, K.white, K.red) + house(80, 0, 30, 26, K.yellow, K.slate);
    } },

    /* Beaches & islands */
    maui: { bg: "beach", back: function () { return P("M-275 -20 Q-170 -120 -60 -64 Q20 -30 125 -56 V0 H-275Z", "#7CC3A0"); }, draw: function () {
      return palm(-10, 128, 22, 4) + palm(44, 98, -16, 6) + E(-70, -20, 7, 28, K.yellow) + R(-71, -46, 2, 50, K.coral) + umbrella(80, 14);
    } },
    overwater: { bg: "water", draw: function () { return bungalows(); } },
    borabora: { bg: "water", back: function () { return P("M-230 -34 Q-170 -58 -128 -140 L-104 -160 Q-86 -132 -70 -86 Q-10 -46 60 -34Z", K.green2) + P("M-230 -34 Q-170 -58 -128 -140 L-116 -150 Q-120 -90 -150 -40Z", "#5AA676"); }, draw: function () { return bungalows(); } },
    bali: { bg: "green", draw: function () {
      var o = "", g = ["#8CCB7A", "#74BB6A", "#5FAB5E", "#4C9A54"];
      for (var i = 0; i < 4; i++) o += P("M-275 " + (-16 * i) + " Q-180 " + (-16 * i - 22) + " -90 " + (-16 * i - 4) + " L-90 " + (-16 * i + 16) + " Q-180 " + (-16 * i - 6) + " -275 " + (-16 * i + 16) + "Z", g[i]);
      var gate = function (s) { var x = s > 0 ? 10 : -10; return P("M" + x + " 0 V-150 " + "H" + (x + s * 8) + " V-130 H" + (x + s * 18) + " V-104 H" + (x + s * 30) + " V-76 H" + (x + s * 42) + " V-40 H" + (x + s * 56) + " V0Z", "#B5654A") + P("M" + x + " -150 V-162 H" + (x + s * 4) + " V-150Z", "#8E4A36"); };
      return o + gate(-1) + gate(1) + R(-14, -6, 28, 6, "#8E4A36") + L("M-40 -60 h30 M10 -60 h30 M-30 -110 h20 M10 -110 h20", "#8E4A36", 2) + palm(96, 110, -8);
    } },
    granite: { bg: "beach", draw: function () {
      return E(-90, -36, 60, 44, "#C9A99A") + E(-30, -22, 40, 30, "#D8B9AA") + E(-140, -14, 38, 24, "#BE9C8D") + E(40, -10, 26, 16, "#D2B2A2") +
        L("M-110 -60 q20 -6 40 4 M-60 -30 q14 -4 28 4", "#A98778", 2) + palm(70, 120, -30, 10);
    } },
    tulum: { bg: "beach", draw: function () {
      return P("M-275 4 L-275 -60 Q-150 -76 -40 -56 L24 4Z", "#D9C08F") + R(-130, -94, 76, 34, "#CDBA93") + R(-120, -110, 56, 16, "#C2AE88") +
        R(-112, -86, 9, 16, K.slate) + R(-97, -86, 9, 16, K.slate) + R(-82, -86, 9, 16, K.slate) + R(-108, -106, 32, 4, "#B19D78") + palm(66, 116, -14, 12);
    } },
    whitehaven: { bg: "water", back: function () { return P("M-275 -10 Q-220 -80 -150 -40 Q-120 -20 -80 -12 V0 H-275Z", K.green2); }, draw: function () {
      return P("M-275 4 Q-150 -40 -40 -10 T125 -24 V2 Q20 30 -100 16 T-275 26Z", K.white) + P("M-200 26 Q-120 6 -20 22 T125 14 V40 H-200Z", "#F7EED8") + sailboat(60, -30, 0.7);
    } },
    navagio: { bg: "water", draw: function () {
      return P("M-275 35 V-176 Q-190 -130 -150 -60 Q-126 -10 -106 35Z", "#E5DED0") + P("M125 35 V-160 Q90 -116 70 -54 Q60 -12 50 35Z", "#E5DED0") +
        L("M-250 -150 q20 30 30 80 M100 -130 q-14 30 -20 70", "#CFC6B5", 3) + P("M-120 35 Q-30 -6 60 35Z", K.sand) +
        P("M-44 4 L28 -6 L22 8 L-40 14Z", "#B5654A") + R(-14, -16, 18, 12, "#9A4F38") + R(-4, -30, 3, 16, K.slate);
    } },
    rio: { bg: "beach", back: function () { return P("M-275 0 Q-250 -112 -212 -104 Q-186 -66 -164 0Z", K.deep) + L("M-212 -100 L-120 -60", K.slate, 1); }, draw: function () {
      return P("M-90 0 Q-44 -110 0 -126 Q36 -110 96 0Z", K.green2) + R(-2, -162, 4, 34, K.white) + R(-17, -153, 34, 4, K.white) + C(0, -165, 3.5, K.white) + R(-5, -130, 10, 5, K.white) +
        umbrella(60, 14) + umbrella(-140, 16);
    } },
    gracebay: { bg: "beach", draw: function () {
      return palm(-40, 120, 18, 6) + palm(10, 96, -10, 8) + umbrella(70, 16) + R(30, 8, 26, 4, K.white, 2) + R(84, 10, 26, 4, K.white, 2) + sailboat(-170, -30, 0.7);
    } },
    aruba: { bg: "beach", draw: function () {
      return L("M-60 8 Q-50 -40 0 -66", K.wood, 7) + P("M-20 -70 Q20 -100 90 -76 Q60 -60 10 -54 Q-10 -56 -20 -70Z", K.green2) +
        P("M-150 6 L-144 -110 L-128 -110 L-122 6Z", "#EADCC4") + R(-147, -122, 22, 12, K.slate) + domeP(-136, -122, 11, K.coral) + umbrella(80, 16);
    } },
    pitons: { bg: "water", draw: function () {
      return P("M-230 -6 Q-190 -40 -170 -160 Q-146 -40 -100 -6Z", K.green2) + P("M-120 -6 Q-80 -34 -62 -128 Q-40 -34 0 -6Z", "#4E9B6B") +
        P("M-250 4 Q-150 -20 20 4Z", "#3A7E57") + sailboat(70, 10, 1, K.yellow);
    } },
    negril: { bg: "water", draw: function () {
      return P("M-275 35 V-70 Q-200 -86 -110 -66 Q-90 -30 -80 35Z", "#C2A27A") + R(-170, -146, 16, 76, K.white) + R(-173, -156, 22, 10, K.coral) + domeP(-162, -156, 9, K.slate) +
        palm(-210, 80, 14, -66) + P("M20 12 L92 12 L84 22 L28 22Z", K.green2) + R(28, 12, 56, 3, K.yellow) + R(30, 16, 52, 3, K.red);
    } },
    pigs: { bg: "water", draw: function () {
      var pig = function (x, y) { return E(x, y, 15, 11, "#F5B7B1") + tri(x - 8, y - 8, 7, 9, "#EE9A93") + tri(x + 8, y - 8, 7, 9, "#EE9A93") + E(x, y + 3, 6, 4, "#EE9A93") + C(x - 5, y - 3, 1.6, K.slate) + C(x + 5, y - 3, 1.6, K.slate) + C(x - 2, y + 3, 1, K.slate) + C(x + 2, y + 3, 1, K.slate); };
      return P("M-200 -2 Q-110 -26 -20 -2Z", K.sand) + palm(-120, 96, 14, -8) + pig(10, 14) + pig(60, 6) + L("M-10 24 q20 -6 40 0 M40 16 q20 -6 40 0", K.white, 2, 0.7) + sailboat(-220, 10, 0.6);
    } },
    chattel: { bg: "beach", draw: function () {
      var h = function (x, c) { return R(x, -40, 46, 40, c) + P("M" + (x - 4) + " -40 L" + (x + 23) + " -62 L" + (x + 50) + " -40Z", K.white) + R(x + 6, -30, 10, 14, K.slate) + R(x + 30, -30, 10, 14, K.slate) + R(x + 18, -26, 10, 26, K.cream); };
      return h(-150, "#7FCFC6") + h(-90, K.pink) + h(-30, K.yellow) + palm(50, 110, -12, 4) + palm(100, 84, 10, 6);
    } },
    elmorro: { bg: "water", draw: function () {
      return P("M-275 12 L-275 -40 L125 -60 L125 12Z", "#D8C29A") + L("M-275 -30 L125 -50", "#C4AC82", 2) +
        R(-24, -110, 28, 48, "#E9D8B4") + domeP(-10, -110, 14, "#E9D8B4") + R(-11, -130, 2, 8, K.slate) + R(-14, -96, 3, 10, K.slate) + R(-4, -96, 3, 10, K.slate) +
        P("M-40 -62 L20 -64 L18 -56 L-38 -54Z", "#C4AC82") + sailboat(80, 24, 0.8);
    } },
    cayman: { bg: "beach", draw: function () {
      return P("M-60 26 L-40 16 L-20 26 L-40 34Z M-40 34 Q-36 44 -28 50", "#6F98A0") + umbrella(30, 14) + umbrella(90, 16) + palm(-130, 110, 16, 6) + sailboat(-200, -30, 0.6);
    } },
    stbarts: { bg: "water", back: function () { return P("M-275 -10 Q-200 -90 -120 -60 Q-40 -30 20 -70 Q80 -96 125 -50 V0 H-275Z", "#6FB688"); }, draw: function () {
      var v = function (x, y) { return R(x, y, 22, 14, K.white) + P("M" + (x - 2) + " " + y + " L" + (x + 11) + " " + (y - 8) + " L" + (x + 24) + " " + y + "Z", K.red); };
      return v(-220, -50) + v(-160, -62) + v(-100, -44) + v(10, -60) + v(70, -72) +
        P("M-80 6 L60 6 L48 20 L-70 20Z", K.white) + R(-50, -6, 70, 12, K.white, 3) + R(-40, -2, 50, 4, K.slate) + R(-20, -16, 26, 10, K.white, 2) + R(-14, -14, 14, 3, K.slate);
    } },
    stjohn: { bg: "water", back: function () { return P("M-275 -10 Q-180 -100 -80 -50 Q0 -20 60 -60 Q100 -84 125 -60 V0 H-275Z", "#5EAE7C"); }, draw: function () {
      return R(-100, -96, 32, 86, "#C9A57E") + R(-102, -100, 36, 6, "#B48E66") + R(-90, -70, 8, 12, K.slate) + R(-90, -40, 8, 12, K.slate) + sailboat(50, 14, 1.1, K.white);
    } },
    fiji: { bg: "beach", draw: function () {
      return R(-40, -32, 80, 32, "#D8B887") + P("M-52 -30 L0 -88 L52 -30Z", "#B5895A") + L("M-30 -42 L0 -76 M30 -42 L0 -76 M-14 -36 L0 -60 M14 -36 L0 -60", "#94693F", 1.5) + R(-8, -20, 16, 20, "#7A5236") +
        palm(-110, 116, 20, 8) + palm(90, 104, -18, 8);
    } },
    longtail: { bg: "water", draw: function () {
      return karst(-180, 4, 80, 150, K.green2) + karst(-90, 4, 50, 100, "#5DA57E") + karst(90, 4, 60, 120, "#4E9B6B") +
        P("M-60 14 L50 14 Q70 10 76 -18 L66 -12 Q60 4 44 4 L-58 4Z", K.wood) + L("M70 -16 l6 -6 M72 -14 l8 -2 M70 -12 l6 4", K.coral, 2) + L("M73 -18 l3 -8", K.yellow, 2) +
        R(-30, -12, 50, 4, "#3E6E6B") + L("M-28 -8 v12 M18 -8 v12", K.slate, 1.5);
    } },
    lemorne: { bg: "water", draw: function () {
      return P("M-260 0 L-212 -76 Q-186 -122 -140 -120 Q-108 -114 -82 -62 L-20 0Z", K.green2) + P("M-260 0 L-212 -76 Q-200 -98 -186 -110 L-200 0Z", "#2F7A52") +
        R(-275, 0, 400, 10, "#6FD1CF") + umbrella(40, 22) + palm(90, 100, -12, 20);
    } },
    palawan: { bg: "water", draw: function () {
      return karst(-210, 4, 70, 170, "#4E9B6B") + karst(-150, 4, 50, 120, K.green2) + karst(70, 4, 80, 160, K.green2) + karst(10, 4, 40, 80, "#5DA57E") +
        P("M-60 14 L30 14 L20 24 L-50 24Z", K.white) + R(-56, 18, 84, 3, K.blue) + L("M-80 26 H50 M-40 14 v12 M10 14 v12", K.slate, 1.5) + R(-40, 2, 40, 10, K.coral, 2);
    } },
    dhow: { bg: "water", draw: function () {
      return palm(-200, 110, 18, 0) + P("M-60 16 L60 16 L44 30 L-50 30Z", "#8B5A3C") + L("M0 16 L0 -110", K.wood, 3) + P("M-70 -40 L40 -120 L10 10 Z", K.white) + P("M-70 -40 L40 -120 L-10 -40Z", K.cream);
    } },

    /* Cities */
    tokyo: { bg: "city", back: function () {
      return P("M-260 -30 L-110 -170 Q-80 -180 -50 -170 L100 -30Z", "#9FD0CC") + P("M-152 -131 L-110 -170 Q-80 -180 -50 -170 L-8 -131 L-30 -138 L-50 -126 L-70 -140 L-90 -126 L-110 -140 L-132 -126Z", K.white);
    }, draw: function () {
      var o = R(-24, -120, 30, 120, K.slate) + win(-20, -114, 22, 108, 3, 10, "#8DD3CF", 3) + R(12, -98, 26, 98, "#E5ECEC") + stripes(12, -96, 26, 96, 4, "#B9CACC");
      [[96, 0], [76, -34], [58, -62]].forEach(function (t) { var w = t[0], y = t[1], cx = -96; o += R(cx - w / 2 + 8, y - 24, w - 16, 24, K.yellow) + win(cx - w / 2 + 12, y - 20, w - 24, 14, 5, 1, K.slate, 3) + P("M" + (cx - w / 2 - 6) + " " + (y - 22) + " L" + (cx + w / 2 + 6) + " " + (y - 22) + " L" + (cx + w / 2 - 8) + " " + (y - 36) + " L" + (cx - w / 2 + 8) + " " + (y - 36) + "Z", K.coral); });
      o += R(-98, -112, 4, 18, K.slate);
      return o + P("M60 0 L67 -150 L65 -196 L67 -226 L71 -226 L73 -196 L71 -150 L78 0Z", "#3E6E73") + R(60, -152, 18, 8, "#2F5A60") + R(62, -198, 14, 6, "#2F5A60") +
        L("M62 -20 L74 -60 M76 -20 L64 -60 M64 -70 L73 -110 M74 -70 L65 -110 M66 -116 L71 -146", K.sky1, 1, 0.6);
    } },
    torii: { bg: "green", draw: function () {
      var o = "";
      for (var k = 0; k < 5; k++) { var y = -k * 30, w = 64 - k * 8; o += R(-128 - w / 2 + 10, y - 22, w - 20, 22, K.slate) + P("M" + (-128 - w / 2) + " " + (y - 20) + " L" + (-128 + w / 2) + " " + (y - 20) + " L" + (-128 + w / 2 - 8) + " " + (y - 30) + " L" + (-128 - w / 2 + 8) + " " + (y - 30) + "Z", "#2C4F58"); }
      o += R(-129, -180, 2, 30, K.slate);
      var gate = function (x, s, op) { return '<g opacity="' + op + '">' + R(x - 40 * s, -110 * s, 10 * s, 110 * s, K.coral) + R(x + 30 * s, -110 * s, 10 * s, 110 * s, K.coral) + R(x - 50 * s, -96 * s, 100 * s, 7 * s, K.coral) + R(x - 54 * s, -118 * s, 108 * s, 7 * s, K.coral) + P("M" + (x - 62 * s) + " " + (-124 * s) + " Q" + x + " " + (-134 * s) + " " + (x + 62 * s) + " " + (-124 * s) + " L" + (x + 66 * s) + " " + (-134 * s) + " Q" + x + " " + (-146 * s) + " " + (x - 66 * s) + " " + (-134 * s) + "Z", K.slate) + R(x - 3 * s, -114 * s, 6 * s, 16 * s, K.slate) + "</g>"; };
      return o + gate(40, 0.7, 0.5) + gate(20, 1, 1);
    } },
    empire: { bg: "city", draw: function () {
      return R(-110, -90, 34, 90, K.slate) + win(-106, -84, 26, 80, 3, 9, "#8DD3CF", 2.5) + R(-28, -120, 56, 120, "#E6E1D6") + R(-20, -150, 40, 30, "#E6E1D6") + R(-13, -170, 26, 20, "#E6E1D6") + R(-7, -186, 14, 16, "#D8D2C5") + R(-2, -214, 4, 30, K.slate) +
        stripes(-26, -118, 52, 116, 7, "#C7C0B2") + stripes(-18, -148, 36, 28, 5, "#C7C0B2") + R(56, -112, 30, 112, "#D9D2C5") + P("M56 -112 Q71 -150 86 -112Z", "#C7C0B2") + R(70, -160, 2, 40, K.slate) + win(60, -104, 22, 100, 3, 9, K.slate, 2.5);
    } },
    burj: { bg: "city", draw: function () {
      return R(-110, -70, 30, 70, "#D9E2E3") + R(60, -96, 26, 96, "#B9CBCE") + P("M-30 0 L-30 -60 L-22 -60 L-22 -110 L-14 -110 L-14 -158 L-8 -158 L-8 -194 L-3 -194 L0 -216 L3 -194 L8 -194 L8 -148 L14 -148 L14 -100 L22 -100 L22 -50 L30 -50 L30 0Z", "#C9D6D8") +
        P("M0 0 L0 -216 L3 -194 L8 -194 L8 -148 L14 -148 L14 -100 L22 -100 L22 -50 L30 -50 L30 0Z", "#A9BEC1");
    } },
    opera: { bg: "water", back: function () { return L("M-260 -40 Q-150 -150 -40 -40", K.grey, 5) + R(-275, -44, 260, 5, K.grey) + R(-262, -64, 10, 24, K.grey) + R(-48, -64, 10, 24, K.grey); }, draw: function () {
      var sail = function (x, h, f) { return P("M" + x + " 0 Q" + (x + 4) + " " + -h + " " + (x + 42) + " " + (-h - 6) + " Q" + (x + 30) + " " + (-h * 0.5) + " " + (x + 46) + " 0Z", f); };
      return R(-40, -8, 170, 12, "#E4D2B4") + sail(-30, 70, "#F4F1EA") + sail(0, 90, K.white) + sail(34, 76, "#F4F1EA") + sail(66, 56, K.white) + sail(90, 40, "#F4F1EA") + L("M-14 -10 l10 -40 M18 -10 l10 -50 M50 -10 l10 -40", "#D9D2C4", 1.2);
    } },
    mbs: { bg: "water", draw: function () {
      var o = "";
      [-70, -30, 10].forEach(function (x) { o += P("M" + x + " 0 L" + (x + 2) + " -122 L" + (x + 22) + " -122 L" + (x + 24) + " 0Z", "#D9E2E3") + stripes(x + 2, -118, 20, 114, 3, "#BFCDCF"); });
      o += P("M-86 -122 L52 -122 Q64 -124 72 -132 L70 -120 L-86 -116Z", "#5E8D90");
      var tree = function (x, h) { return P("M" + (x - 3) + " 0 L" + (x - 2) + " " + -h + " L" + (x + 2) + " " + -h + " L" + (x + 3) + " 0Z", "#7D6B8F") + P("M" + (x - 16) + " " + -h + " L" + (x + 16) + " " + -h + " L" + (x + 4) + " " + (-h + 12) + " L" + (x - 4) + " " + (-h + 12) + "Z", "#9C7FB5"); };
      return o + tree(-150, 70) + tree(-124, 90) + tree(-100, 60) + P("M60 -2 Q66 -30 74 -2 Q82 -36 90 -2 Q98 -26 104 -2Z", K.white);
    } },
    mosque: { bg: "city", draw: function () {
      var o = R(-80, -46, 160, 46, "#DCE5E6") + domeP(0, -46, 50, "#B8C9CC") + domeP(-54, -46, 22, "#C8D6D8") + domeP(54, -46, 22, "#C8D6D8") + R(-1.5, -112, 3, 16, K.gold) + C(0, -112, 3, K.gold);
      [-112, -92, 92, 112].forEach(function (x, i) { var h = i === 1 || i === 2 ? 130 : 150; o += R(x - 3.5, -h, 7, h, "#E8EEEE") + R(x - 5, -h * 0.66, 10, 3, "#C8D6D8") + R(x - 5, -h * 0.4, 10, 3, "#C8D6D8") + tri(x, -h, 8, 22, "#7096A8"); });
      return o + win(-74, -30, 148, 20, 12, 1, "#7096A8", 3);
    } },
    goldengate: { bg: "water", back: function () { return P("M-275 -40 Q-240 -110 -170 -80 Q-130 -60 -100 -40Z", K.green2); }, draw: function () {
      var tower = function (x) { return R(x - 10, -150, 6, 150, K.coral) + R(x + 4, -150, 6, 150, K.coral) + R(x - 10, -146, 20, 4, K.coral) + R(x - 10, -110, 20, 4, K.coral) + R(x - 10, -76, 20, 4, K.coral); };
      var o = tower(-150) + tower(30) + R(-275, -44, 400, 6, K.coral) + L("M-275 -70 Q-215 -100 -150 -148 Q-60 -14 30 -148 Q80 -104 125 -84", K.coral, 2.5);
      for (var x = -130; x < 20; x += 12) { var t = (x + 150) / 180, y = -148 + 4 * 98 * t * (1 - t) + 0; o += L("M" + x + " " + n(y) + " V-44", K.coral, 0.8); }
      return o + E(-150, -20, 40, 10, K.white) + E(-100, -14, 36, 8, K.white);
    } },
    willis: { bg: "city", draw: function () {
      return R(-110, -76, 34, 76, "#B9CBCE") + R(-30, -112, 60, 112, K.slate) + R(-30, -152, 40, 40, K.slate) + R(-10, -182, 20, 30, K.slate) + R(-7, -210, 2, 28, K.slate) + R(4, -204, 2, 22, K.slate) +
        win(-26, -108, 52, 104, 6, 12, "#4A6670", 3) + win(-26, -148, 32, 34, 4, 4, "#4A6670", 3) + R(56, -92, 30, 92, "#D9E2E3") + E(80, -12, 26, 12, "#C5D3D6") + E(74, -16, 10, 4, K.white);
    } },
    frenchquarter: { bg: "city", draw: function () {
      var b = function (x, c) { return R(x, -104, 66, 104, c) + R(x + 8, -96, 10, 22, "#2E6B5E") + R(x + 28, -96, 10, 22, "#2E6B5E") + R(x + 48, -96, 10, 22, "#2E6B5E") + R(x + 8, -44, 10, 26, "#2E6B5E") + R(x + 28, -44, 10, 26, "#2E6B5E") + R(x + 48, -44, 10, 26, "#2E6B5E") +
        R(x - 4, -56, 74, 3, K.slate) + L("M" + (x - 2) + " -56 v-12 M" + (x + 68) + " -56 v-12 M" + (x - 2) + " -68 H" + (x + 68) + " M" + x + " -60 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6", K.slate, 1.2) + R(x - 4, -108, 74, 4, K.slate); };
      return b(-150, K.yellow) + b(-80, "#8CCBC5") + b(-10, K.pink) + L("M76 0 V-60", K.slate, 2) + R(70, -72, 12, 12, K.yellow) + R(68, -74, 16, 3, K.slate);
    } },
    vegas: { bg: "city", draw: function () {
      var star = "M40 -168 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1Z";
      return R(-124, -180, 8, 180, "#D4DCDD") + E(-120, -182, 16, 8, "#B9CBCE") + R(-121, -204, 2, 16, K.slate) + R(-90, -80, 40, 80, K.pink) + R(-40, -100, 30, 100, K.yellow) + win(-86, -74, 32, 60, 4, 6, K.white, 3) +
        R(37, -76, 6, 76, K.grey) + P("M40 -152 L88 -114 L40 -76 L-8 -114Z", K.white) + '<path d="M40 -152 L88 -114 L40 -76 L-8 -114Z" fill="none" stroke="' + K.coral + '" stroke-width="3"/>' +
        T(40, -108, "VEGAS", 15, K.coral) + T(40, -124, "WELCOME", 7, K.deep) + P(star, K.yellow);
    } },
    artdeco: { bg: "beach", draw: function () {
      return R(-60, -110, 120, 110, "#F7B5A8") + R(-18, -140, 36, 30, "#F7B5A8") + R(-8, -152, 16, 12, "#F7B5A8") + R(-60, -82, 120, 4, K.white) + R(-60, -50, 120, 4, K.white) +
        stripes(-16, -138, 32, 28, 3, "#4FB3AE") + win(-54, -76, 108, 24, 7, 1, K.slate, 4) + win(-54, -44, 108, 24, 7, 1, K.slate, 4) + R(-62, -112, 124, 4, "#4FB3AE") + palm(-100, 110, 10) + palm(100, 96, -10);
    } },
    nashville: { bg: "city", draw: function () {
      return R(-25, -130, 50, 130, "#9DB4BA") + P("M-25 -130 L-21 -178 L-13 -130Z", "#9DB4BA") + P("M25 -130 L21 -178 L13 -130Z", "#9DB4BA") + R(-13, -150, 26, 20, "#8AA3AA") + C(0, -140, 6, K.white) + win(-20, -124, 40, 118, 4, 12, "#E6EEF0", 3) +
        E(-110, -26, 18, 22, "#D98C4F") + E(-110, -48, 13, 15, "#D98C4F") + C(-110, -34, 5, K.slate) + R(-112, -110, 4, 64, "#7A4A30") + R(-114, -114, 8, 8, "#5C3420") +
        R(50, -70, 40, 70, K.coral) + R(54, -66, 32, 12, K.yellow) + R(90, -56, 34, 56, K.deep);
    } },
    capitol: { bg: "city", draw: function () {
      return R(-118, -46, 236, 46, "#F1C9B4") + win(-112, -40, 224, 34, 18, 2, K.slate, 3) + R(-34, -86, 68, 40, "#F1C9B4") + win(-30, -80, 60, 28, 7, 1, K.slate, 3) + domeP(0, -86, 30, "#EBB9A1") + R(-6, -128, 12, 14, "#F1C9B4") + P("M0 -144 l3 7 8 0 -6 5 2 7 -7 -4 -7 4 2 -7 -6 -5 8 0Z", K.gold) + R(-20, -10, 40, 10, "#E0B29C");
    } },
    needle: { bg: "city", back: function () { return P("M-260 -40 L-160 -132 Q-140 -142 -120 -132 L-20 -40Z", "#A5D1CE") + P("M-188 -106 L-160 -132 Q-140 -142 -120 -132 L-92 -106 L-110 -112 L-128 -102 L-146 -114 L-166 -102Z", K.white); }, draw: function () {
      return P("M4 0 Q22 -60 16 -124 L24 -124 Q18 -60 36 0Z", "#E6ECEC") + E(20, -130, 32, 7, "#E6ECEC") + P("M-6 -134 Q20 -148 46 -134Z", "#D3DDDE") + R(19, -166, 2, 30, K.slate) + R(-6, -131, 52, 2, K.coral) +
        R(-80, -70, 30, 70, K.slate) + R(70, -90, 32, 90, "#B9CBCE") + win(-76, -64, 22, 58, 3, 6, "#8DD3CF", 2.5);
    } },
    dccapitol: { bg: "city", draw: function () {
      return P("M88 0 L92 -170 L96 -180 L100 -170 L104 0Z", "#EEF0EE") + R(-110, -40, 180, 40, K.white) + win(-104, -34, 168, 26, 16, 2, "#9FB5BA", 3) + R(-40, -72, 80, 32, K.white) + stripes(-38, -70, 76, 28, 10, "#D7DFE0") +
        P("M-34 -72 Q-34 -116 0 -120 Q34 -116 34 -72Z", K.white) + R(-6, -136, 12, 16, K.white) + R(-1.5, -146, 3, 10, K.slate) + L("M-30 -96 h60", "#D7DFE0", 1.5);
    } },
    angel: { bg: "city", draw: function () {
      var o = L("M-275 -196 Q-120 -176 125 -200", K.slate, 1);
      var cols = [K.coral, K.yellow, K.deep, K.pink, K.orange];
      for (var i = 0, x = -260; x < 120; x += 22, i++) { var y = -196 + 20 * Math.sin((x + 275) / 400 * Math.PI) * -0.4 + (x + 260) * -0.01; o += P("M" + x + " " + n(y) + " h14 v14 l-3 -3 -4 3 -4 -3 -3 3Z", cols[i % 5]); }
      return o + R(-34, -24, 68, 24, "#E6D9C0") + R(-26, -36, 52, 12, "#E6D9C0") + R(-6, -140, 12, 104, "#EFE4CC") + R(-9, -146, 18, 8, K.gold) +
        P("M0 -146 L-4 -164 L4 -164Z", K.gold) + P("M-2 -160 L-22 -176 L-6 -158Z", K.gold) + P("M2 -160 L22 -176 L6 -158Z", K.gold) + C(0, -168, 3.5, K.gold) + R(-100, -70, 40, 70, K.coral) + R(70, -60, 36, 60, K.yellow);
    } },
    lima: { bg: "city", draw: function () {
      var t = function (x) { return R(x, -116, 28, 116, K.yellow) + R(x - 2, -120, 32, 6, "#E9B949") + R(x + 4, -142, 20, 22, K.yellow) + domeP(x + 14, -142, 10, "#E9B949") + R(x + 9, -110, 10, 16, K.slate) + C(x + 14, -128, 3, K.slate); };
      return t(-64) + t(36) + R(-36, -84, 72, 84, "#F3D9A0") + P("M-12 0 V-30 a12 12 0 0 1 24 0 V0Z", K.slate) + R(-30, -70, 60, 4, "#E9B949") + R(-110, -56, 34, 26, "#6B3F2A") + win(-108, -54, 30, 22, 4, 2, "#8B5A3C", 4) + R(-112, -30, 38, 30, K.cream);
    } },
    seoul: { bg: "city", draw: function () {
      return P("M-210 0 Q-150 -76 -90 -66 Q-50 -56 -10 0Z", K.green2) + R(-118, -178, 6, 112, K.white) + R(-126, -172, 22, 16, "#D4DDDE") + R(-116, -204, 2, 26, K.slate) +
        R(-10, -30, 120, 30, "#CBBFA6") + P("M14 0 V-16 a8 8 0 0 1 16 0 V0Z", K.slate) + P("M42 0 V-18 a8 8 0 0 1 16 0 V0Z", K.slate) + P("M70 0 V-16 a8 8 0 0 1 16 0 V0Z", K.slate) +
        R(4, -56, 92, 26, "#F0E3C8") + stripes(4, -56, 92, 26, 8, K.coral) + P("M-18 -56 Q-4 -60 4 -76 L96 -76 Q104 -60 118 -56 L110 -54 L-10 -54Z", "#3E6E6B");
    } },
    watarun: { bg: "water", draw: function () {
      var prang = function (x, h, s) { return P("M" + (x - 30 * s) + " 0 L" + (x - 22 * s) + " " + (-h * 0.3) + " L" + (x - 14 * s) + " " + (-h * 0.55) + " L" + (x - 8 * s) + " " + (-h * 0.75) + " L" + (x - 3 * s) + " " + (-h * 0.9) + " L" + x + " " + -h + " L" + (x + 3 * s) + " " + (-h * 0.9) + " L" + (x + 8 * s) + " " + (-h * 0.75) + " L" + (x + 14 * s) + " " + (-h * 0.55) + " L" + (x + 22 * s) + " " + (-h * 0.3) + " L" + (x + 30 * s) + " 0Z", "#EADFC8") +
        R(x - 25 * s, -h * 0.22, 50 * s, 3, K.coral) + R(x - 17 * s, -h * 0.45, 34 * s, 3, "#4FB3AE") + R(x - 11 * s, -h * 0.65, 22 * s, 3, K.coral) + R(x - 6 * s, -h * 0.82, 12 * s, 2, "#4FB3AE"); };
      return prang(-70, 100, 0.6) + prang(70, 100, 0.6) + prang(0, 196, 1) + R(-120, -6, 240, 8, "#D9CBB0") +
        P("M-200 20 L-120 20 Q-106 18 -100 4 L-108 8 Q-112 14 -124 14 L-198 14Z", K.wood) + R(-180, 6, 40, 6, K.coral);
    } },
    hongkong: { bg: "water", draw: function () {
      var o = R(-200, -110, 26, 110, "#B9CBCE") + R(-170, -80, 24, 80, K.slate) + R(-140, -150, 30, 150, "#D9E2E3") + R(-104, -96, 22, 96, "#8FC1BD") + R(60, -100, 26, 100, K.slate) + R(90, -70, 30, 70, "#B9CBCE");
      o += P("M-70 0 L-70 -130 L-40 -170 L-10 -150 L-10 0Z", "#8EA9B0") + L("M-70 -130 L-10 0 M-10 -130 L-70 0 M-70 -60 L-10 -60 M-40 -170 L-40 0", "#D7E3E6", 1.2);
      o += R(10, -180, 30, 180, "#C9D6D8") + R(16, -196, 18, 16, "#C9D6D8") + R(22, -206, 6, 10, "#C9D6D8");
      return o + R(-275, -2, 400, 40, K.sea2) + junk(-40, 18, K.red);
    } },
    halong: { bg: "water", draw: function () {
      return karst(-210, 4, 60, 130, "#4E9B6B") + karst(-150, 4, 46, 90, "#5DA57E") + karst(-60, 4, 70, 160, K.green2) + karst(40, 4, 40, 80, "#5DA57E") + karst(100, 4, 50, 120, "#4E9B6B") + junk(-10, 18, K.orange) + junk(80, 22, K.coral);
    } },
    angkor: { bg: "water", draw: function () {
      var tw = function (x, h, f) { return P("M" + (x - 15) + " 0 L" + (x - 15) + " " + (-h * 0.45) + " Q" + (x - 15) + " " + -h + " " + x + " " + (-h - 12) + " Q" + (x + 15) + " " + -h + " " + (x + 15) + " " + (-h * 0.45) + " L" + (x + 15) + " 0Z", f) + L("M" + (x - 13) + " " + (-h * 0.55) + " h26 M" + (x - 12) + " " + (-h * 0.72) + " h24 M" + (x - 9) + " " + (-h * 0.88) + " h18", "#A9967A", 1.5); };
      var o = R(-120, -40, 240, 40, "#BFAD90") + tw(-80, 90, "#C9B79C") + tw(80, 90, "#C9B79C") + tw(-40, 110, "#D1C0A5") + tw(40, 110, "#D1C0A5") + tw(0, 150, "#D9C9AE") + win(-114, -30, 228, 20, 16, 1, "#7E6D55", 4);
      return o + '<g opacity="0.25" transform="translate(0,4) scale(1,-0.35)">' + tw(0, 150, "#D9C9AE") + tw(-40, 110, "#D1C0A5") + tw(40, 110, "#D1C0A5") + "</g>";
    } },
    taipei101: { bg: "city", back: function () { return P("M-275 -30 Q-180 -110 -80 -70 Q0 -40 60 -90 Q100 -110 125 -80 V0 H-275Z", "#7CC3A0"); }, draw: function () {
      var o = R(-24, -40, 48, 40, "#8FC1BD");
      for (var k = 0; k < 8; k++) { var y0 = -40 - k * 18; o += P("M-15 " + y0 + " L-20 " + (y0 - 18) + " L20 " + (y0 - 18) + " L15 " + y0 + "Z", k % 2 ? "#8FC1BD" : "#7DB3AF"); }
      return o + R(-8, -192, 16, 8, "#7DB3AF") + R(-1, -216, 2, 24, K.slate) + R(-100, -60, 30, 60, K.slate) + R(60, -80, 30, 80, "#D9E2E3");
    } },

    /* Ski & mountains */
    matterhorn: { bg: "snow", back: function () {
      return P("M-180 -30 L-96 -150 L-74 -206 L-62 -200 L-40 -150 L36 -60 L80 -30Z", "#7FA7AD") + P("M-74 -206 L-62 -200 L-40 -150 L36 -60 L80 -30 L-30 -30 L-60 -140Z", "#A9C8CC") +
        P("M-96 -150 L-74 -206 L-62 -200 L-52 -170 L-66 -176 L-76 -160 L-86 -166Z", K.white) + L("M-50 -150 l14 20 M-30 -120 l20 26 M-90 -120 l-10 30", K.white, 2.5);
    }, draw: function () { return chalet(10, 0, 50) + chalet(70, 4, 40, "#B97A4E") + snowpine(-30, 2, 46) + snowpine(110, 4, 40) + snowpine(-60, 0, 34); } },
    whistler: { bg: "snow", draw: function () {
      var o = L("M-275 -170 L125 -70", K.slate, 1.5);
      [[-200, -151], [-100, -126], [0, -101], [90, -79]].forEach(function (g) { o += L("M" + g[0] + " " + g[1] + " v8", K.slate, 1.2) + R(g[0] - 8, g[1] + 8, 16, 14, K.red, 3) + R(g[0] - 5, g[1] + 11, 10, 5, K.sky1); });
      return o + R(-56, -12, 10, 12, "#9AA8AB") + R(-34, -12, 10, 12, "#9AA8AB") + R(-60, -26, 40, 14, "#B3C0C3") + R(-80, -36, 80, 10, "#9AA8AB") + R(-48, -54, 16, 18, "#B3C0C3") + snowpine(50, 4, 50) + snowpine(80, 2, 40) + snowpine(-120, 4, 44);
    } },
    aspen: { bg: "snow", draw: function () {
      var tree = function (x, h) { return R(x - 2.5, -h, 5, h, K.white) + L("M" + (x - 2) + " " + (-h * 0.3) + " h3 M" + (x) + " " + (-h * 0.5) + " h3 M" + (x - 2) + " " + (-h * 0.7) + " h3", K.slate, 1.5) + E(x, -h - 6, 14, 20, K.gold) + E(x + 8, -h + 4, 9, 12, K.yellow); };
      return lift(-275, -150, 125, -60, 5) + tree(-70, 70) + tree(-40, 90) + tree(-10, 76) + tree(20, 96) + tree(50, 70) + chalet(100, 4, 40);
    } },
    vail: { bg: "snow", draw: function () {
      var tb = function (x, c) { return R(x, -54, 44, 54, c) + L("M" + x + " -36 h44 M" + (x + 22) + " -54 v54 M" + x + " -54 l22 18 l22 -18", "#7A4A30", 2) + P("M" + (x - 5) + " -54 L" + (x + 22) + " -82 L" + (x + 49) + " -54Z", K.slate) + P("M" + (x - 5) + " -54 L" + (x + 22) + " -82 L" + (x + 49) + " -54 L" + (x + 44) + " -58 L" + (x + 22) + " -76 L" + x + " -58Z", K.white); };
      return lift(-275, -170, 125, -90, 5) + tb(-120, K.cream) + tb(-60, "#F6D2A8") + R(4, -110, 20, 110, K.cream) + onion(14, -110, 10, "#3E8F86") + C(14, -90, 6, K.white) + tb(40, K.cream);
    } },
    chamonix: { bg: "snow", back: function () {
      return P("M-275 -40 Q-200 -150 -120 -140 Q-60 -120 -20 -40Z", K.white) + P("M-20 -40 L10 -170 L22 -130 L34 -196 L46 -140 L60 -176 L80 -40Z", "#8EAAB0") + P("M28 -170 L34 -196 L40 -166Z M6 -150 L10 -170 L14 -150Z M56 -160 L60 -176 L64 -158Z", K.white);
    }, draw: function () { return L("M-200 -10 L34 -192", K.slate, 1.2) + R(-74, -112, 18, 14, K.red, 3) + L("M-65 -112 v-0", K.slate, 1) + chalet(-130, 2, 46) + chalet(60, 4, 44, "#B97A4E") + snowpine(-30, 4, 46) + snowpine(0, 2, 36); } },
    stanton: { bg: "snow", draw: function () {
      return R(-12, -120, 24, 120, K.white) + onion(0, -120, 14, "#3E8F86") + R(-1, -158, 2, 10, K.gold) + C(0, -100, 7, K.slate) + C(0, -100, 5, K.white) + R(-40, -50, 40, 50, K.white) + P("M-44 -50 L-20 -70 L4 -50Z", K.coral) +
        chalet(-100, 2, 50) + chalet(70, 4, 50, "#B97A4E") + snowpine(110, 4, 40);
    } },
    niseko: { bg: "snow", back: function () { return P("M-260 -40 L-130 -150 Q-110 -158 -90 -150 L40 -40Z", "#A9C8CC") + P("M-170 -116 L-130 -150 Q-110 -158 -90 -150 L-50 -116 L-70 -122 L-90 -110 L-110 -124 L-130 -110 L-150 -122Z", K.white); }, draw: function () {
      var st = function (x, h) { return R(x - 2, -h * 0.25, 4, h * 0.25, K.wood) + E(x, -h * 0.55, h * 0.22, h * 0.32, K.white) + E(x, -h * 0.9, h * 0.15, h * 0.2, K.white); };
      return st(-60, 70) + st(-30, 54) + st(90, 64) + R(10, -64, 7, 64, K.red) + R(43, -64, 7, 64, K.red) + R(4, -70, 52, 6, K.slate) + R(8, -58, 44, 4, K.red) +
        E(30, 4, 40, 8, "#8DD3CF") + L("M20 -6 q-4 -10 0 -18 M34 -6 q4 -10 0 -18", K.white, 2, 0.8);
    } },
    parkcity: { bg: "snow", draw: function () {
      return L("M-40 0 L-20 -110 L0 0 M-34 -30 h28 M-30 -60 h20 M-26 -88 h12", "#7A4A30", 4) + C(-20, -110, 9, "#5C3420") + C(-20, -110, 4, K.cream) + R(-80, -40, 50, 40, "#9A6B4F") + P("M-84 -40 L-55 -62 L-26 -40Z", K.white) +
        lift(-275, -160, 125, -80, 5) + chalet(70, 4, 50) + snowpine(-130, 4, 44);
    } },
    tetons: { bg: "snow", back: function () {
      return P("M-275 -40 L-200 -120 L-170 -100 L-120 -186 L-90 -130 L-60 -160 L-20 -80 L40 -120 L100 -60 L125 -70 V-40Z", "#7FA0A8") + P("M-130 -168 L-120 -186 L-110 -168 L-118 -172Z M-66 -150 L-60 -160 L-54 -150Z M-206 -112 L-200 -120 L-194 -112Z M34 -112 L40 -120 L46 -112Z", K.white);
    }, draw: function () { return L("M-200 -30 L60 -150", K.slate, 1.2) + R(-20, -86, 24, 18, K.red, 3) + R(-16, -82, 16, 6, K.sky1) + L("M-275 -6 H125 M-260 -18 V0 M-220 -18 V0 M-180 -18 V0 M-140 -18 V0", "#7A4A30", 2.5) + chalet(80, 0, 46); } },
    dolomites: { bg: "snow", back: function () {
      return P("M-275 -40 L-240 -150 L-226 -120 L-200 -190 L-180 -130 L-160 -170 L-140 -110 L-110 -160 L-80 -90 L-40 -40Z", "#E8B4A0") + P("M-200 -190 L-180 -130 L-160 -170 L-140 -110 L-110 -160 L-80 -90 L-40 -40 L-180 -40Z", "#D9A08B") + P("M-206 -170 L-200 -190 L-194 -172Z M-164 -158 L-160 -170 L-156 -158Z", K.white);
    }, draw: function () { return R(-6, -150, 18, 150, K.cream) + tri(3, -150, 20, 30, K.coral) + R(-2, -130, 10, 14, K.slate) + chalet(-60, 2, 48) + chalet(70, 4, 46, "#B97A4E") + snowpine(110, 4, 40); } },
    hallstatt: { bg: "water", back: function () { return P("M-275 -20 L-220 -170 L-160 -100 L-100 -190 L-30 -80 L40 -150 L125 -40 V-20Z", "#5E8F7E") + P("M-104 -180 L-100 -190 L-92 -176Z M36 -140 L40 -150 L46 -140Z", K.white); }, draw: function () {
      var cols = [K.cream, K.yellow, K.white, K.pink, "#F6D2A8"], o = "";
      for (var x = -220, k = 0; x < 110; x += 30, k++) { if (x > -40 && x < 0) continue; o += house(x, -4, 26, 34 + (k % 3) * 8, cols[k % 5], k % 2 ? K.slate : "#7A4A30"); }
      return o + R(-30, -90, 20, 86, K.white) + P("M-32 -90 L-20 -150 L-8 -90Z", K.slate) + R(-24, -74, 8, 10, K.slate) + L("M-200 20 h40 M-40 26 h60 M60 18 h30", K.white, 2, 0.6);
    } },
    queenstown: { bg: "water", back: function () { return P("M-275 -20 L-240 -110 L-210 -90 L-180 -150 L-150 -100 L-120 -140 L-80 -60 L-40 -100 L0 -40 L60 -120 L125 -30 V-20Z", "#7FA0A8") + P("M-184 -142 L-180 -150 L-174 -140Z M-124 -132 L-120 -140 L-114 -132Z M56 -112 L60 -120 L66 -112Z", K.white); }, draw: function () {
      return L("M125 -120 L20 -10", K.slate, 1.2) + R(84, -76, 12, 10, K.red, 2) + R(48, -40, 12, 10, K.red, 2) +
        P("M-120 16 L20 16 L8 30 L-108 30Z", K.slate) + R(-110, 2, 120, 14, K.white) + win(-104, 5, 110, 7, 12, 1, K.slate, 3) + R(-60, -24, 10, 26, K.red) + R(-60, -24, 10, 4, K.slate);
    } },
    interlaken: { bg: "mountain", back: function () { return P("M-275 -30 L-200 -160 L-160 -120 L-110 -196 L-60 -120 L0 -150 L80 -40 V-30Z", "#9ABFC4") + P("M-120 -180 L-110 -196 L-96 -176 L-104 -172 L-112 -180Z M-206 -150 L-200 -160 L-190 -150Z M-6 -140 L0 -150 L8 -140Z", K.white); }, draw: function () {
      return P("M-60 -180 Q20 -214 100 -180 L94 -172 Q20 -200 -54 -172Z", K.coral) + P("M-20 -196 Q20 -206 60 -196 L58 -188 Q20 -198 -18 -188Z", K.yellow) +
        L("M-54 -172 L20 -120 M94 -172 L22 -120 M0 -190 L21 -120 M40 -190 L21 -120", K.slate, 0.8) + C(21, -118, 3, K.slate) + R(19, -116, 4, 8, K.blue) + chalet(-80, 2, 48) + chalet(80, 4, 44, "#B97A4E") + pine(-130, 4, 40, K.green2);
    } },
    telluride: { bg: "mountain", back: function () { return P("M-275 -30 L-275 -170 Q-200 -190 -150 -150 L-100 -170 L-40 -130 L20 -160 L80 -140 L125 -180 V-30Z", "#8EA6A8") + L("M-60 -130 Q-58 -90 -62 -40", K.white, 4) + P("M-275 -170 Q-200 -190 -150 -150 L-160 -160 Q-210 -178 -275 -160Z", K.white); }, draw: function () {
      var sf = function (x, c, h) { return R(x, -h, 40, h, c) + R(x - 2, -h - 6, 44, 6, c) + R(x + 6, -h + 10, 10, 16, K.slate) + R(x + 24, -h + 10, 10, 16, K.slate) + R(x + 12, -24, 16, 24, K.slate) + R(x - 2, -30, 44, 3, K.white); };
      return sf(-160, K.coral, 70) + sf(-116, K.yellow, 60) + sf(-72, "#8CCBC5", 76) + sf(-28, K.cream, 64) + sf(16, K.pink, 72) + sf(60, "#C98B5E", 60);
    } },
    sedona: { bg: "desert", draw: function () {
      return P("M-275 0 L-260 -80 L-230 -90 L-220 -60 L-160 -70 L-150 0Z", "#E08A58") + P("M-100 0 L-90 -90 L-76 -150 L-64 -110 L-50 -170 L-36 -120 L-20 -140 L-6 -80 L20 -60 L30 0Z", K.rock) +
        P("M-76 -150 L-64 -110 L-50 -170 L-36 -120 L-20 -140 L-6 -80 L-40 -80Z", "#C7613A") + L("M-90 -50 h110 M-84 -80 h80", "#B85A36", 2) + P("M60 0 L70 -60 L120 -64 L125 0Z", "#E08A58") + E(-140, -6, 18, 10, K.green2) + E(40, -4, 14, 8, K.green2);
    } },

    /* National parks */
    halfdome: { bg: "green", back: function () { return P("M-230 -30 Q-224 -170 -120 -180 L-110 -180 L-110 -30Z", "#B9C6C6") + P("M-120 -180 L-110 -180 L-110 -30 L-130 -30Z", "#9FAFB0") + P("M20 -30 L40 -150 Q70 -166 125 -160 V-30Z", "#A9B8B8") + L("M-40 -150 Q-38 -100 -42 -40", K.white, 5) + P("M-80 -30 L-60 -160 L-20 -160 L0 -30Z", "#C3CFCF"); }, draw: function () {
      return pine(-180, 4, 70, "#2F6B4E") + pine(-150, 2, 56, K.green2) + pine(70, 4, 66, "#2F6B4E") + pine(100, 2, 50, K.green2) + pine(-20, 4, 44, K.green2) + E(30, 10, 60, 8, "#8DD3CF");
    } },
    geyser: { bg: "green", draw: function () {
      var o = "";
      [[-40, -20, 18], [-44, -50, 22], [-36, -84, 26], [-42, -120, 28], [-30, -150, 24], [-50, -150, 20], [-36, -176, 18]].forEach(function (c) { o += C(c[0], c[1], c[2], K.white, 0.9); });
      o += R(-44, -40, 8, 40, K.white);
      o += E(70, 6, 54, 12, K.orange) + E(70, 6, 42, 9, K.yellow) + E(70, 6, 30, 6, "#4FB3AE") + E(70, 6, 18, 4, K.blue);
      return o + P("M-180 0 Q-182 -26 -164 -34 Q-150 -46 -132 -34 L-110 -32 Q-100 -22 -104 0 L-110 0 L-112 -14 L-150 -14 L-154 0Z", "#5C3D2E") + E(-164, -36, 12, 10, "#4A3024");
    } },
    canyon: { bg: "desert", draw: function () {
      var o = "", bands = [["#F2C38D", -150], ["#E9A66B", -116], ["#D9774A", -82], ["#B85C3C", -48]];
      bands.forEach(function (b, i) { o += P("M-275 35 L-275 " + b[1] + " L-200 " + (b[1] - 6) + " L-180 " + (b[1] + 8) + " L-120 " + (b[1] + 4) + " L-100 " + (b[1] + 20) + " L-40 " + (b[1] + 14) + " L0 " + (b[1] - 4) + " L60 " + (b[1] + 2) + " L80 " + (b[1] + 18) + " L125 " + (b[1] + 12) + " V35Z", b[0]); o += L("M-275 " + (b[1] + 18) + " L-200 " + (b[1] + 12) + " L-140 " + (b[1] + 20) + " L-40 " + (b[1] + 30) + " L60 " + (b[1] + 20) + " L125 " + (b[1] + 28), "#C87046", 1, 0.5); });
      return o + L("M-180 30 Q-120 10 -60 22 T60 12 T125 18", "#3DB2BB", 5);
    } },
    zion: { bg: "desert", draw: function () {
      return P("M-275 35 L-275 -170 Q-230 -190 -190 -160 L-160 -80 L-120 35Z", K.rock) + P("M125 35 L125 -180 Q80 -196 50 -150 L20 -60 L-10 35Z", "#C7613A") +
        L("M-260 -120 h80 M-250 -80 h90 M110 -140 h-60 M110 -100 h-80", "#B85A36", 2) + P("M-120 35 Q-60 -10 -10 35Z", K.green) + L("M-90 30 Q-60 10 -30 30", "#3DB2BB", 4) + pine(-80, 10, 40, K.green2) + pine(-40, 14, 34, K.green2);
    } },
    moraine: { bg: "mountain", back: function () {
      var o = "";
      [[-240, 120], [-190, 160], [-140, 130], [-90, 176], [-40, 140], [10, 166], [60, 130], [110, 150]].forEach(function (p) { o += peak(p[0], -30, 70, p[1], "#8A9FA6", K.white); });
      return o;
    }, draw: function () { return R(-275, -30, 400, 60, "#3CC4C9") + P("M-30 4 L40 4 Q34 12 -24 12Z", K.red) + L("M0 2 l10 -10", K.slate, 1.5) + pine(-200, 4, 80, "#2F6B4E") + pine(-170, 6, 64, "#2F6B4E") + pine(100, 4, 70, "#2F6B4E"); } },
    torres: { bg: "mountain", back: function () {
      var t = function (x, h, w) { return P("M" + (x - w) + " -40 L" + (x - w * 0.6) + " " + -h + " Q" + x + " " + (-h - 14) + " " + (x + w * 0.6) + " " + -h + " L" + (x + w) + " -40Z", "#8F9DA3") + P("M" + (x - w * 0.6) + " " + -h + " Q" + x + " " + (-h - 14) + " " + (x + w * 0.6) + " " + -h + " L" + (x + w * 0.4) + " " + (-h + 10) + " L" + (x - w * 0.5) + " " + (-h + 12) + "Z", K.white); };
      return P("M-275 -40 L-200 -90 L-120 -60 L-60 -110 L40 -70 L125 -100 V-40Z", "#A7B6BA") + t(-120, 170, 20) + t(-70, 196, 22) + t(-20, 176, 20);
    }, draw: function () { return R(-275, -40, 400, 30, "#5BB8D9") + P("M-275 -10 Q-150 -30 0 -14 T125 -16 V0 H-275Z", "#9C9A5E") + E(-160, -4, 20, 8, "#7B8A4E") + E(60, -2, 24, 8, "#7B8A4E"); } },
    serengeti: { bg: "savanna", draw: function () {
      return R(-102, -86, 6, 86, "#5C3D2E") + L("M-99 -60 L-130 -84 M-99 -70 L-70 -92", "#5C3D2E", 4) + P("M-170 -90 Q-100 -118 -30 -90 Q-100 -80 -170 -90Z", "#4E7A3E") +
        P("M40 0 L44 -40 L36 -40 L40 -76 L60 -110 L66 -104 L48 -72 L54 -40 L70 -40 L74 0 L68 0 L64 -30 L50 -30 L46 0Z", "#C98A4F") + C(52, -60, 2.5, "#8C5A30") + C(60, -40, 3, "#8C5A30") + C(46, -24, 2.5, "#8C5A30") +
        L("M-260 -8 h4 M-240 -6 h4 M-220 -9 h3 M-200 -6 h4", K.slate, 3);
    } },
    plitvice: { bg: "green", draw: function () {
      var o = "", c = ["#7FD3CF", "#5CC3C3", "#3DB2BB", "#2C9AA5"];
      for (var i = 0; i < 4; i++) o += P("M-275 " + (-90 + i * 30) + " Q-150 " + (-100 + i * 30) + " 0 " + (-86 + i * 30) + " T125 " + (-90 + i * 30) + " V35 H-275Z", c[i]);
      o += L("M-160 -96 v28 M-150 -96 v28 M-60 -66 v28 M-50 -66 v28 M-46 -66 v28 M40 -36 v28 M50 -36 v28", K.white, 3);
      return o + L("M-275 6 L-140 -10 L-20 6 L125 -6", "#A8754F", 3) + pine(-230, -90, 60, K.green2) + pine(100, -86, 54, K.green2) + pine(-90, -120, 50, "#2F6B4E");
    } },
    milford: { bg: "water", draw: function () {
      return P("M-275 4 L-275 -130 Q-240 -150 -200 -100 L-170 4Z", "#3E6E5E") + P("M125 4 L125 -150 Q90 -150 60 -90 L30 4Z", "#3E6E5E") +
        P("M-150 4 L-70 -196 L-50 -190 L20 4Z", "#2F5C4E") + P("M-76 -180 L-70 -196 L-50 -190 L-56 -176 L-66 -182Z", K.white) + L("M90 -120 Q88 -70 92 -10", K.white, 3) + P("M-30 14 L50 14 L40 24 L-20 24Z", K.white) + R(-14, 4, 40, 10, K.white) + R(-8, 6, 28, 3, K.slate);
    } },
    glacier: { bg: "mountain", back: function () { var o = ""; [[-220, 130], [-150, 170], [-80, 140], [-10, 180], [70, 150]].forEach(function (p) { o += peak(p[0], -30, 100, p[1], "#7F9AA2", K.white); }); return o; }, draw: function () {
      return R(-275, -10, 400, 46, "#8A9A9C") + L("M-275 12 H125", K.yellow, 2) + R(-70, -46, 110, 38, K.red, 10) + R(-66, -52, 102, 10, "#E7D9C0", 4) + win(-62, -42, 96, 14, 6, 1, K.sky1, 9) + C(-44, -6, 9, K.slate) + C(20, -6, 9, K.slate) + R(-78, -16, 12, 8, K.slate, 2) + pine(-150, -10, 50, K.green2) + pine(90, -10, 46, K.green2);
    } },

    /* Wonders */
    machupicchu: { bg: "green", back: function () { return P("M-80 -40 Q-20 -186 20 -200 Q60 -186 120 -40Z", K.green2) + P("M-275 -40 Q-200 -110 -120 -60 L-80 -40Z", "#5A9E78"); }, draw: function () {
      var o = "";
      for (var i = 0; i < 5; i++) o += R(-275 + i * 18, -14 * i - 14, 280 - i * 36, 14, i % 2 ? "#8CBF7A" : "#7AB26A") + R(-275 + i * 18, -14 * i - 14, 280 - i * 36, 2, "#A99C84");
      var ru = function (x, y) { return R(x, y - 18, 26, 18, "#A99C84") + P("M" + x + " " + (y - 18) + " L" + (x + 13) + " " + (y - 32) + " L" + (x + 26) + " " + (y - 18) + "Z", "#A99C84") + R(x + 9, y - 12, 7, 9, "#6E6450"); };
      o += ru(-120, -70) + ru(-90, -70) + ru(-60, -56) + ru(-150, -56);
      return o + P("M60 0 L62 -26 Q60 -38 66 -44 L70 -44 L70 -34 L90 -32 Q98 -30 98 -20 L98 0 L94 0 L92 -14 L70 -14 L68 0Z", K.cream) + C(68, -44, 3, K.cream);
    } },
    petra: { bg: "desert", draw: function () {
      var o = P("M-275 35 L-275 -200 L125 -200 L125 35Z", "#E0957A") + L("M-260 -180 q30 20 20 60 M-230 -60 q20 -30 50 -20 M80 -170 q20 30 0 70 M100 -60 q-10 -30 10 -50", "#C97D62", 3);
      o += R(-80, -70, 160, 70, "#EDB298") + R(-84, -76, 168, 8, "#E3A285");
      for (var i = 0; i < 6; i++) o += R(-74 + i * 28, -68, 8, 68, "#F3C4AC");
      o += P("M-84 -76 L0 -100 L84 -76Z", "#E3A285") + R(-26, -150, 52, 50, "#EDB298") + domeP(0, -150, 18, "#E3A285") + R(-2, -176, 4, 10, "#E3A285");
      for (var j = 0; j < 4; j++) o += R(-22 + j * 14, -146, 5, 44, "#F3C4AC");
      return o + R(-12, -40, 24, 40, "#7E4A3A") + P("M-200 0 Q-200 -24 -188 -26 L-180 -40 L-174 -26 Q-160 -30 -156 -16 L-150 -36 L-144 -14 L-148 0 L-152 0 L-156 -10 L-186 -10 L-190 0Z", "#B07A52");
    } },
    greatwall: { bg: "green", back: function () { return P("M-275 -40 Q-200 -140 -120 -90 Q-60 -50 0 -120 Q60 -170 125 -100 V-40Z", "#7CB894"); }, draw: function () {
      var o = P("M-275 30 Q-200 -60 -120 -40 Q-60 -26 0 -90 Q60 -150 125 -80 V35 H-275Z", "#5A9E78");
      o += L("M-275 20 Q-200 -70 -120 -50 Q-60 -36 0 -100 Q60 -160 125 -90", "#D8C8A8", 10);
      [[-200, -36], [-120, -52], [0, -102], [90, -116]].forEach(function (t) { o += R(t[0] - 10, t[1] - 22, 20, 22, "#CBB894") + R(t[0] - 12, t[1] - 26, 24, 5, "#B9A47E") + R(t[0] - 3, t[1] - 14, 6, 8, K.slate); });
      return o;
    } },
    taj: { bg: "water", draw: function () {
      var o = R(-112, -22, 224, 22, K.white) + R(-56, -84, 112, 62, K.white) + P("M-18 -22 V-64 Q0 -84 18 -64 V-22Z", "#D5E0E2") + onion(0, -84, 30, K.white) + R(-1.5, -158, 3, 12, K.gold);
      [-44, 44].forEach(function (x) { o += R(x - 8, -98, 16, 14, K.white) + onion(x, -98, 8, K.white); });
      [-100, 100].forEach(function (x) { o += P("M" + (x - 5) + " -22 L" + (x - 4) + " -120 L" + (x + 4) + " -120 L" + (x + 5) + " -22Z", "#F2F5F4") + R(x - 6, -86, 12, 3, "#D5E0E2") + R(x - 6, -56, 12, 3, "#D5E0E2") + onion(x, -120, 6, K.white); });
      return o + R(-14, 0, 28, 35, "#7FD3CF");
    } },
    pyramids: { bg: "desert", draw: function () {
      var py = function (x, w, h) { return P("M" + (x - w / 2) + " 0 L" + x + " " + -h + " L" + (x + w / 2) + " 0Z", "#F2CC8F") + P("M" + x + " " + -h + " L" + (x + w / 2) + " 0 L" + (x + w * 0.1) + " 0Z", "#D9A86A"); };
      return py(-160, 150, 110) + py(-30, 200, 150) + py(80, 110, 80) +
        P("M-250 0 L-250 -14 L-236 -24 L-226 -14 L-196 -14 L-196 0Z", "#D9A86A") + P("M60 0 Q60 -24 72 -26 L80 -40 L86 -26 Q100 -30 104 -16 L110 -36 L116 -14 L112 0 L108 0 L104 -10 L74 -10 L70 0Z", "#B07A52");
    } },
    chichen: { bg: "green", draw: function () {
      var o = "";
      for (var k = 0; k < 9; k++) o += R(-90 + k * 8, -k * 14 - 14, 180 - k * 16, 14, k % 2 ? "#D8C8A0" : "#CDBC92");
      return o + R(-14, -126, 28, 126, "#BFA97E") + L("M-14 -20 h28 M-14 -40 h28 M-14 -60 h28 M-14 -80 h28 M-14 -100 h28", "#A99468", 1.5) + R(-24, -150, 48, 24, "#CDBC92") + R(-8, -144, 16, 18, K.slate) + R(-26, -154, 52, 5, "#BFA97E") + pine(-150, 4, 50, K.green2) + pine(110, 4, 44, K.green2);
    } }
  };

  function bungalows() {
    var o = R(-275, -18, 400, 4, "#B5835A");
    for (var x = -250; x < 125; x += 30) o += R(x, -18, 2, 22, "#8C6446");
    [-190, -120, -50, 20, 90].forEach(function (x) {
      o += R(x - 14, -18, 2, 20, "#8C6446") + R(x + 12, -18, 2, 20, "#8C6446") + R(x - 16, -38, 32, 20, "#E7C590") + R(x - 4, -32, 8, 14, "#8C6446") +
        P("M" + (x - 24) + " -38 L" + x + " -60 L" + (x + 24) + " -38Z", "#B98552") + L("M" + (x - 14) + " -42 L" + x + " -56 L" + (x + 14) + " -42", "#9A6B3F", 1.2);
    });
    return o + L("M-200 12 h30 M-60 18 h40 M50 10 h30", K.white, 2, 0.6);
  }

  /* ---------- backgrounds ---------- */
  function rng(seed) {
    var s = 7; for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cloud(x, y, s, f) { return C(x, y, 9 * s, f) + C(x + 12 * s, y - 5 * s, 11 * s, f) + C(x + 25 * s, y, 8 * s, f) + R(x, y - 2 * s, 25 * s, 10 * s, f); }
  function skyline(r, base, minH, maxH, fill, wins) {
    var o = "", w;
    for (var x = -5; x < 405; x += w) {
      w = 16 + r() * 24; var h = minH + r() * (maxH - minH);
      o += R(x, base - h, w - 3, h + 50, fill);
      if (wins) o += win(x + 3, base - h + 5, w - 9, h - 10, Math.max(1, Math.floor((w - 9) / 6)), Math.max(1, Math.floor(h / 12)), wins, 2);
    }
    return o;
  }
  function background(bg, r) {
    var o = "", g = 215;
    if (bg === "city") return { far: skyline(r, g, 40, 95, K.far), mid: skyline(r, g, 20, 60, K.mid, "#9FDCD7") + R(0, g, 400, 40, K.deep) };
    if (bg === "beach") return { far: R(0, 150, 400, 100, K.sea) + R(0, 150, 400, 3, "#7FD3D8"), mid: L("M30 170 q10 -4 20 0 M120 180 q10 -4 20 0 M250 168 q10 -4 20 0 M330 178 q10 -4 20 0", K.white, 2, 0.6) + P("M0 205 Q100 192 200 200 T400 196 V250 H0Z", K.sand) };
    if (bg === "water") return { far: R(0, 160, 400, 90, K.sea) + R(0, 160, 400, 3, "#7FD3D8"), mid: L("M40 185 q10 -4 20 0 M140 200 q10 -4 20 0 M260 190 q10 -4 20 0 M340 205 q10 -4 20 0", K.white, 2, 0.6) };
    if (bg === "snow") return { far: peak(60, 190, 200, 120, K.far, K.white) + peak(330, 190, 220, 130, K.far, K.white), mid: P("M0 200 Q120 170 220 190 T400 180 V250 H0Z", K.snow) + P("M0 230 Q150 205 300 222 T400 214 V250 H0Z", K.snowS) };
    if (bg === "mountain") return { far: peak(70, 190, 220, 120, K.far, K.white) + peak(320, 190, 240, 135, K.far, K.white), mid: P("M0 200 Q120 176 220 192 T400 184 V250 H0Z", K.mid) + R(0, g, 400, 40, K.deep) };
    if (bg === "desert") return { far: P("M0 180 L40 180 L50 150 L110 150 L120 180 L260 180 L270 160 L330 160 L340 180 L400 180 V250 H0Z", "#F5C79B"), mid: P("M0 205 Q120 192 220 200 T400 196 V250 H0Z", "#EBC08A") };
    if (bg === "savanna") return { far: P("M0 185 Q100 170 200 182 T400 176 V250 H0Z", "#F3D58F"), mid: R(0, g - 5, 400, 50, "#E4BD62") };
    /* green */
    var t = ""; for (var x = 0; x < 400; x += 18) t += pine(x + r() * 8, 205, 26 + r() * 18, K.mid);
    return { far: P("M0 190 Q100 150 200 176 T400 160 V250 H0Z", K.far), mid: t + R(0, 205, 400, 45, K.green) };
  }

  /* ---------- poster ---------- */
  var uid = 0;
  function render(id, place, opts) {
    opts = opts || {};
    var m = M[place.art] || { bg: "city", draw: function () { return ""; } };
    var r = rng(id), gid = "vs" + (uid++), o = [];
    var sunX = 100 + r() * 30, sunY = 92, sunC = r() < 0.75 ? K.sun : K.sunY;
    var bg = background(m.bg, r);
    o.push('<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + place.name + '">');
    o.push('<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + K.sky0 + '"/><stop offset="1" stop-color="' + K.sky1 + '"/></linearGradient></defs>');
    o.push(R(0, 0, 400, 250, "url(#" + gid + ")"));
    o.push(C(sunX, sunY, 64, sunC));
    o.push(cloud(sunX - 40 + r() * 20, sunY - 34, 0.9, K.cloud) + cloud(sunX + 30, sunY + 30, 1.1, K.cloud) + cloud(300 + r() * 60, 34 + r() * 20, 1, K.white));
    o.push(bg.far);
    if (m.back) o.push('<g transform="translate(275,215)">' + m.back() + "</g>");
    o.push(bg.mid);
    o.push('<g transform="translate(275,215)">' + m.draw() + "</g>");
    if (opts.name !== false) o.push(nameText(place.name));
    o.push("</svg>");
    return o.join("");
  }
  function nameText(name) {
    var words = name.toUpperCase().split(" "), lines = [name.toUpperCase()];
    if (name.length > 11 && words.length > 1) {
      var best = 1, diff = 1e9;
      for (var i = 1; i < words.length; i++) { var a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), d = Math.abs(a.length - b.length); if (d < diff) { diff = d; best = i; } }
      lines = [words.slice(0, best).join(" "), words.slice(best).join(" ")];
    }
    var longest = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    var size = Math.min(58, Math.floor(250 / (longest * 0.6)));
    var top = lines.length === 1 ? 92 + size * 0.35 : 92 - size * 0.12;
    return lines.map(function (l, i) {
      return '<text class="poster-name" x="18" y="' + n(top + i * size * 0.95) + '" font-size="' + size + '" data-max="250" stroke="#F4FBFA" stroke-width="' + Math.max(4, Math.round(size / 8)) + '" stroke-linejoin="round" paint-order="stroke">' + l.replace(/&/g, "&amp;") + "</text>";
    }).join("");
  }
  /* shrink any name that renders wider than its space (fonts vary by device) */
  function fit(root) {
    var els = (root || document).querySelectorAll(".poster-name");
    for (var i = 0; i < els.length; i++) {
      var t = els[i];
      try {
        t.removeAttribute("textLength"); t.removeAttribute("lengthAdjust");
        var max = +t.getAttribute("data-max");
        if (t.getComputedTextLength() > max) { t.setAttribute("textLength", max); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
      } catch (e) {}
    }
  }

  window.VR_ART = { render: render, fit: fit, motifs: M };
})();
