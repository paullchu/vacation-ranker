/*
  VACATION RANKER: SAMPLE AD CREATIVES
  ------------------------------------
  Placeholder "native" ads that rotate inside each ad card until a real ad
  network (AdSense on the web, AdMob in the iPhone app) supplies real ones.
  All brands below are invented. Each creative has:
    brand, headline, line (one sentence), cta (button text), art (picture)
*/
(function () {
  "use strict";
  var u = 0;
  function lg(id, stops, x2, y2) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (x2 == null ? 0 : x2) + '" y2="' + (y2 == null ? 1 : y2) + '">' +
      stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : "") + "/>"; }).join("") + "</linearGradient>";
  }
  function rg(id, stops, cx, cy, r) {
    return '<radialGradient id="' + id + '" cx="' + (cx || 0.5) + '" cy="' + (cy || 0.5) + '" r="' + (r || 0.5) + '">' +
      stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : "") + "/>"; }).join("") + "</radialGradient>";
  }
  function blur(id, d) { return '<filter id="' + id + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="' + d + '"/></filter>'; }
  function svg(defs, body) {
    return '<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' + defs + "</defs>" + body + "</svg>";
  }
  function mark(text, color, serif, x, y, size) {
    return '<text x="' + (x || 18) + '" y="' + (y || 28) + '" fill="' + color + '" font-size="' + (size || 13) + '" letter-spacing="3" font-weight="' + (serif ? 400 : 700) + '" font-family="' +
      (serif ? "Georgia, 'Times New Roman', serif" : "'Helvetica Neue', Arial, sans-serif") + '">' + text + "</text>";
  }
  function badge(text, x, y, bg, fg) {
    var w = text.length * 6.6 + 18;
    return '<rect x="' + (x - w) + '" y="' + y + '" width="' + w + '" height="22" rx="11" fill="' + bg + '"/>' +
      '<text x="' + (x - w / 2) + '" y="' + (y + 15) + '" text-anchor="middle" fill="' + fg + '" font-size="11.5" font-weight="700" font-family="\'Helvetica Neue\', Arial, sans-serif">' + text + "</text>";
  }

  var ART = {
    /* airliner wing above sunset clouds */
    wing: function () {
      var i = "a" + (u++);
      return svg(
        lg(i + "s", [[0, "#17244A"], [0.45, "#5B4A8B"], [0.75, "#E9875E"], [1, "#FFC47E"]]) +
        rg(i + "g", [[0, "#FFE7B0", 0.95], [1, "#FFE7B0", 0]], 0.75, 0.72, 0.35) +
        lg(i + "w", [[0, "#F1F4F8"], [0.55, "#AEB7C4"], [1, "#6E7787"]], 0, 1) +
        lg(i + "e", [[0, "#9AA3B1"], [1, "#4A5260"]]) + blur(i + "b", 7),
        '<rect width="400" height="200" fill="url(#' + i + 's)"/><rect width="400" height="200" fill="url(#' + i + 'g)"/>' +
        '<g filter="url(#' + i + 'b)" opacity=".85"><ellipse cx="80" cy="170" rx="120" ry="22" fill="#F4A982"/><ellipse cx="260" cy="182" rx="170" ry="24" fill="#F6B88E"/><ellipse cx="380" cy="160" rx="80" ry="16" fill="#E8977A"/><ellipse cx="170" cy="150" rx="70" ry="10" fill="#B9728A"/></g>' +
        '<path d="M-10 182 L318 112 L336 116 L40 210 L-10 210Z" fill="url(#' + i + 'w)"/>' +
        '<path d="M-10 182 L318 112 L320 115 L-10 186Z" fill="#FFFFFF" opacity=".7"/>' +
        '<path d="M318 112 L330 84 L340 88 L336 116Z" fill="#E2483D"/>' +
        '<rect x="118" y="168" width="64" height="20" rx="10" fill="url(#' + i + 'e)"/><ellipse cx="120" cy="178" rx="6" ry="10" fill="#2E333C"/>' +
        mark("ALTAVIA", "#FFFFFF") + badge("Fares from $89", 386, 14, "#FFFFFF", "#17244A"));
    },
    /* infinity pool at dusk */
    pool: function () {
      var i = "a" + (u++);
      return svg(
        lg(i + "s", [[0, "#26315F"], [0.55, "#C9718B"], [1, "#F7B680"]]) +
        lg(i + "o", [[0, "#5C6FA3"], [1, "#2E4677"]]) +
        lg(i + "p", [[0, "#5FE0E0"], [1, "#0E7C9A"]]) +
        lg(i + "d", [[0, "#D9C7AE"], [1, "#9C8670"]]) +
        rg(i + "l", [[0, "#FFD38A", 0.9], [1, "#FFD38A", 0]]) + blur(i + "b", 2),
        '<rect width="400" height="200" fill="url(#' + i + 's)"/><circle cx="250" cy="104" r="14" fill="#FFE2A8" opacity=".9"/>' +
        '<rect y="104" width="400" height="30" fill="url(#' + i + 'o)"/><path d="M220 108 h60 M232 114 h36 M240 120 h20" stroke="#FFD9A0" stroke-width="2" opacity=".7"/>' +
        '<path d="M0 132 L400 132 L400 168 L0 176Z" fill="url(#' + i + 'p)"/><path d="M0 132 L400 132 L400 135 L0 135Z" fill="#B8F3F2" opacity=".8"/>' +
        '<path d="M0 176 L400 168 L400 200 L0 200Z" fill="url(#' + i + 'd)"/>' +
        '<g fill="#14162B"><path d="M24 132 C26 90 30 70 34 50 L37 50 C34 80 32 100 31 132Z"/><path d="M35 52 c-20 -4 -34 4 -40 12 c14 -8 28 -8 40 -10 c-8 -10 -22 -14 -34 -12 c14 0 26 4 34 10 c2 -12 -4 -24 -12 -30 c8 10 12 18 12 30 c8 -10 20 -14 32 -12 c-12 2 -22 8 -28 14 c12 -2 26 2 34 10 c-12 -6 -24 -8 -38 -4Z"/>' +
        '<path d="M368 132 C366 96 362 80 358 64 L361 64 C364 82 368 100 372 132Z"/><path d="M359 66 c-18 -4 -30 2 -36 10 c12 -6 24 -6 36 -8 c-6 -8 -18 -12 -28 -10 c12 0 22 4 28 8 c10 -8 22 -10 32 -6 c-10 0 -20 4 -26 10 c10 0 20 4 26 10 c-10 -4 -20 -6 -32 -4Z"/></g>' +
        '<g fill="#F5EFE6"><path d="M90 186 l40 -6 l10 -12 l4 2 l-8 14 l-44 8Z"/><path d="M170 184 l40 -6 l10 -12 l4 2 l-8 14 l-44 8Z"/></g>' +
        '<g filter="url(#' + i + 'b)"><circle cx="70" cy="128" r="10" fill="url(#' + i + 'l)"/><circle cx="330" cy="128" r="10" fill="url(#' + i + 'l)"/></g>' +
        mark("HARBOR &amp; PINE", "#FFFFFF", true, 18, 30, 15) + badge("4th night free", 386, 14, "#FFFFFF", "#26315F"));
    },
    /* hard-shell suitcases on a studio backdrop */
    suitcase: function () {
      var i = "a" + (u++);
      var case_ = function (x, y, w, h, c1, c2, id) {
        var o = lg(i + id, [[0, c1], [1, c2]], 1, 0.2);
        var b = '<rect x="' + (x + w * 0.3) + '" y="' + (y - 34) + '" width="4" height="36" fill="#9AA1A8"/><rect x="' + (x + w * 0.7 - 4) + '" y="' + (y - 34) + '" width="4" height="36" fill="#9AA1A8"/><rect x="' + (x + w * 0.27) + '" y="' + (y - 40) + '" width="' + (w * 0.46) + '" height="9" rx="4.5" fill="#2A2E33"/>' +
          '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="url(#' + i + id + ')"/>';
        for (var k = 1; k < 5; k++) b += '<rect x="' + (x + k * w / 5 - 2) + '" y="' + (y + 10) + '" width="4" height="' + (h - 20) + '" rx="2" fill="#FFFFFF" opacity=".12"/>';
        b += '<rect x="' + (x + 6) + '" y="' + (y + 6) + '" width="' + (w * 0.28) + '" height="' + (h - 12) + '" rx="10" fill="#FFFFFF" opacity=".16"/>' +
          '<rect x="' + x + '" y="' + (y + h * 0.48) + '" width="' + w + '" height="4" fill="#000000" opacity=".18"/>' +
          '<circle cx="' + (x + 14) + '" cy="' + (y + h + 5) + '" r="6" fill="#1D2024"/><circle cx="' + (x + w - 14) + '" cy="' + (y + h + 5) + '" r="6" fill="#1D2024"/>';
        return [o, b];
      };
      var a = case_(150, 46, 96, 130, "#3E8C90", "#163F43", "c1"), b = case_(256, 86, 70, 92, "#E07A4F", "#8E3B1E", "c2");
      return svg(
        rg(i + "bg", [[0, "#F7F3EE"], [1, "#CFC5B8"]], 0.5, 0.4, 0.75) + a[0] + b[0] + blur(i + "b", 6),
        '<rect width="400" height="200" fill="url(#' + i + 'bg)"/><ellipse cx="240" cy="186" rx="120" ry="9" fill="#5B5248" opacity=".35" filter="url(#' + i + 'b)"/>' +
        a[1] + b[1] + mark("VOYAGER CO.", "#2C2C2C") + '<text x="18" y="48" fill="#6B6359" font-size="11" font-family="\'Helvetica Neue\', Arial, sans-serif">Lifetime warranty</text>');
    },
    /* red convertible on a coastal road at sunset */
    convertible: function () {
      var i = "a" + (u++);
      return svg(
        lg(i + "s", [[0, "#3B5A9A"], [0.6, "#F2A06B"], [1, "#FBD38D"]]) + lg(i + "o", [[0, "#3E77A8"], [1, "#1E4E7A"]]) +
        lg(i + "r", [[0, "#5D6168"], [1, "#2F3237"]]) + lg(i + "c", [[0, "#FF6B5E"], [0.5, "#D9342A"], [1, "#7E140F"]]) +
        rg(i + "w", [[0, "#C9CED6"], [0.6, "#7C838D"], [1, "#1E2125"]]) + blur(i + "b", 4),
        '<rect width="400" height="200" fill="url(#' + i + 's)"/><circle cx="300" cy="96" r="22" fill="#FFE6AE"/>' +
        '<rect y="100" width="400" height="60" fill="url(#' + i + 'o)"/><path d="M270 104 h60 M282 110 h36" stroke="#FFE1A8" stroke-width="2" opacity=".7"/>' +
        '<path d="M0 60 Q60 50 110 90 Q140 112 150 160 L0 160Z" fill="#2E3B33"/><path d="M0 80 Q50 74 90 104 Q110 120 116 160 L0 160Z" fill="#46564A"/>' +
        '<path d="M0 150 L400 132 L400 200 L0 200Z" fill="url(#' + i + 'r)"/><path d="M20 176 l40 -3 M110 169 l40 -3 M200 162 l40 -3 M290 155 l40 -3" stroke="#F1E3B0" stroke-width="3"/>' +
        '<ellipse cx="208" cy="176" rx="120" ry="7" fill="#000" opacity=".45" filter="url(#' + i + 'b)"/>' +
        '<path d="M96 168 Q98 148 124 142 L170 136 Q186 122 214 120 L236 120 L252 136 L300 140 Q322 144 324 162 L324 170 L96 170Z" fill="url(#' + i + 'c)"/>' +
        '<path d="M214 120 L236 120 L250 135 L222 135Z" fill="#9FD3F0" opacity=".55"/><path d="M120 146 Q200 136 318 146" stroke="#FFFFFF" stroke-width="2" opacity=".45" fill="none"/>' +
        '<circle cx="136" cy="170" r="15" fill="#15171A"/><circle cx="136" cy="170" r="9" fill="url(#' + i + 'w)"/><circle cx="290" cy="170" r="15" fill="#15171A"/><circle cx="290" cy="170" r="9" fill="url(#' + i + 'w)"/>' +
        '<ellipse cx="320" cy="152" rx="5" ry="3" fill="#FFF5D1"/>' + mark("OPENROAD", "#FFFFFF") + badge("From $39/day", 386, 14, "#FFFFFF", "#7E140F"));
    },
    /* mirrored aviator sunglasses on sand */
    aviators: function () {
      var i = "a" + (u++);
      var lens = "M112 84 Q112 70 134 70 L178 70 Q196 70 194 90 Q190 122 160 130 Q126 134 116 110 Q111 97 112 84Z";
      return svg(
        lg(i + "bg", [[0, "#F6E7CF"], [1, "#DDBE91"]]) +
        lg(i + "l", [[0, "#1B2F55"], [0.45, "#2B8C9A"], [0.62, "#F2C46B"], [0.78, "#E07A4F"], [1, "#1B2F55"]], 0.3, 1) + blur(i + "b", 6),
        '<rect width="400" height="200" fill="url(#' + i + 'bg)"/><path d="M0 150 Q100 140 200 150 T400 146 V200 H0Z" fill="#D2AE7E" opacity=".5"/>' +
        '<ellipse cx="200" cy="158" rx="110" ry="10" fill="#7A5A33" opacity=".35" filter="url(#' + i + 'b)"/>' +
        '<g><path d="' + lens + '" fill="url(#' + i + 'l)" stroke="#C9A24A" stroke-width="3"/><path d="M124 80 Q140 74 164 76" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".55" fill="none"/></g>' +
        '<g transform="translate(400 0) scale(-1 1)"><path d="' + lens + '" fill="url(#' + i + 'l)" stroke="#C9A24A" stroke-width="3"/><path d="M124 80 Q140 74 164 76" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".4" fill="none"/></g>' +
        '<path d="M194 78 Q200 72 206 78 M190 70 L210 70" stroke="#C9A24A" stroke-width="3" fill="none"/>' +
        '<path d="M112 80 L70 72 L40 92 M288 80 L330 72 L360 92" stroke="#B48E3C" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        mark("SOLACE", "#3A2E22", false, 18, 30, 14) + '<text x="18" y="48" fill="#6E5A40" font-size="11" font-family="\'Helvetica Neue\', Arial, sans-serif">Polarized · UV400</text>');
    },
    /* airplane window looking over an island */
    window: function () {
      var i = "a" + (u++);
      return svg(
        lg(i + "c", [[0, "#3A3F47"], [1, "#16191D"]]) + lg(i + "v", [[0, "#7FC3F0"], [0.6, "#D6EEFB"], [1, "#FFFFFF"]]) +
        lg(i + "f", [[0, "#E9EBEF"], [1, "#A9AEB7"]], 1, 1) + '<clipPath id="' + i + 'k"><rect x="146" y="28" width="108" height="144" rx="50"/></clipPath>' + blur(i + "b", 5),
        '<rect width="400" height="200" fill="url(#' + i + 'c)"/><rect x="132" y="14" width="136" height="172" rx="64" fill="url(#' + i + 'f)"/>' +
        '<g clip-path="url(#' + i + 'k)"><rect x="140" y="20" width="120" height="160" fill="url(#' + i + 'v)"/><rect x="140" y="118" width="120" height="62" fill="#1F7FB6"/>' +
        '<ellipse cx="206" cy="132" rx="26" ry="7" fill="#F5E2B5"/><ellipse cx="206" cy="130" rx="16" ry="4.5" fill="#4FA36E"/>' +
        '<g filter="url(#' + i + 'b)" fill="#FFFFFF"><ellipse cx="170" cy="112" rx="40" ry="8"/><ellipse cx="240" cy="104" rx="36" ry="7"/></g>' +
        '<path d="M140 156 L262 136 L262 146 L140 172Z" fill="#C7CDD6"/><rect x="140" y="20" width="120" height="22" fill="#D4D7DC"/></g>' +
        mark("NORTHWIND AIR", "#FFFFFF") + badge("Bags included", 386, 14, "#4FC3E8", "#0E2A3A"));
    },
    /* hotel suite with a night city view */
    suite: function () {
      var i = "a" + (u++), lights = "";
      for (var k = 0; k < 46; k++) lights += '<rect x="' + (226 + (k * 37) % 168) + '" y="' + (40 + (k * 23) % 80) + '" width="3" height="4" fill="#FFD27A" opacity="' + (0.5 + (k % 3) * 0.2) + '"/>';
      return svg(
        lg(i + "w", [[0, "#4A3A31"], [1, "#2A201B"]]) + lg(i + "n", [[0, "#0D1835"], [1, "#2A3F6E"]]) +
        lg(i + "d", [[0, "#FFFFFF"], [1, "#D8D2C9"]]) + rg(i + "g", [[0, "#FFD38A", 0.75], [1, "#FFD38A", 0]]),
        '<rect width="400" height="200" fill="url(#' + i + 'w)"/><rect x="216" y="20" width="184" height="120" fill="url(#' + i + 'n)"/>' +
        '<g fill="#1A2546"><rect x="222" y="70" width="24" height="70"/><rect x="250" y="50" width="20" height="90"/><rect x="276" y="80" width="30" height="60"/><rect x="312" y="40" width="22" height="100"/><rect x="340" y="66" width="26" height="74"/><rect x="372" y="56" width="28" height="84"/></g>' +
        lights + '<rect x="212" y="16" width="192" height="6" fill="#1D1612"/><rect x="212" y="136" width="192" height="6" fill="#1D1612"/>' +
        '<circle cx="64" cy="70" r="60" fill="url(#' + i + 'g)"/><path d="M52 56 L76 56 L70 40 L58 40Z" fill="#F3DEB0"/><rect x="62" y="56" width="4" height="40" fill="#8C6A4A"/>' +
        '<rect x="20" y="96" width="180" height="40" rx="6" fill="#3B2A20"/>' +
        '<path d="M10 150 Q10 128 40 126 L200 126 Q230 128 232 150 L232 200 L10 200Z" fill="url(#' + i + 'd)"/>' +
        '<rect x="40" y="110" width="58" height="26" rx="10" fill="#F4EFE8"/><rect x="104" y="110" width="58" height="26" rx="10" fill="#EDE6DC"/>' +
        '<path d="M10 168 L232 160 L232 176 L10 184Z" fill="#B88A52" opacity=".9"/>' +
        mark("LINDEN GRAND", "#F3E3C3", true, 18, 30, 15) + badge("Suites from $199", 386, 156, "#F3E3C3", "#2A201B"));
    },
    /* leather weekender duffel */
    duffel: function () {
      var i = "a" + (u++);
      return svg(
        rg(i + "bg", [[0, "#E8EEE4"], [1, "#B6C4B0"]], 0.5, 0.4, 0.8) + lg(i + "l", [[0, "#B5703F"], [0.6, "#7E4422"], [1, "#4F2A14"]]) + blur(i + "b", 6),
        '<rect width="400" height="200" fill="url(#' + i + 'bg)"/><ellipse cx="210" cy="172" rx="130" ry="9" fill="#3D4A36" opacity=".35" filter="url(#' + i + 'b)"/>' +
        '<path d="M160 82 Q210 30 260 82" stroke="#4A2812" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M172 82 Q210 44 248 82" stroke="#5E3418" stroke-width="5" fill="none"/>' +
        '<rect x="96" y="78" width="228" height="92" rx="44" fill="url(#' + i + 'l)"/>' +
        '<rect x="104" y="86" width="212" height="76" rx="38" fill="none" stroke="#E8C9A6" stroke-width="1.2" stroke-dasharray="4 4" opacity=".7"/>' +
        '<path d="M120 86 Q210 76 300 86" stroke="#D4D8DC" stroke-width="3" fill="none"/><rect x="292" y="80" width="10" height="14" rx="2" fill="#C9CDD2"/>' +
        '<rect x="150" y="78" width="12" height="92" fill="#4A2812" opacity=".8"/><rect x="258" y="78" width="12" height="92" fill="#4A2812" opacity=".8"/>' +
        '<path d="M120 96 Q140 90 170 92" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".18" fill="none"/>' +
        mark("FIELD &amp; FERN", "#2F3A2B", true, 18, 30, 15) + badge("20% off this week", 386, 14, "#2F3A2B", "#FFFFFF"));
    },
    /* SUV on a snowy mountain road */
    suv: function () {
      var i = "a" + (u++);
      return svg(
        lg(i + "s", [[0, "#5FA3DC"], [1, "#CFE6F6"]]) + lg(i + "m", [[0, "#FFFFFF"], [0.6, "#C9D9E6"], [1, "#7D96AC"]], 1, 1) +
        lg(i + "c", [[0, "#F4F6F8"], [0.55, "#B9C1CA"], [1, "#6B747F"]]) + lg(i + "g", [[0, "#2B3A4A"], [1, "#0E151C"]]) +
        rg(i + "w", [[0, "#C9CED6"], [0.6, "#7C838D"], [1, "#1E2125"]]) + blur(i + "b", 4),
        '<rect width="400" height="200" fill="url(#' + i + 's)"/>' +
        '<path d="M-20 130 L80 40 L130 80 L200 20 L290 96 L340 60 L420 130Z" fill="url(#' + i + 'm)"/><path d="M200 20 L218 50 L206 46 L196 60 L186 44 L176 50Z M80 40 L94 60 L84 56 L74 64 L66 54Z" fill="#FFFFFF"/>' +
        '<g fill="#1E4434">' + [10, 34, 58, 82, 300, 324, 348, 372, 396].map(function (x, k) { var h = 36 + (k % 3) * 8; return '<path d="M' + x + ' 150 L' + (x + 12) + " " + (150 - h) + " L" + (x + 24) + ' 150Z"/>'; }).join("") + "</g>" +
        '<path d="M0 150 L400 150 L400 200 L0 200Z" fill="#E9EEF2"/><path d="M60 200 L170 150 L240 150 L380 200Z" fill="#545A62"/>' +
        '<ellipse cx="206" cy="178" rx="92" ry="6" fill="#000" opacity=".4" filter="url(#' + i + 'b)"/>' +
        '<path d="M120 172 L122 140 Q124 128 136 126 L162 104 Q168 100 178 100 L262 100 Q272 100 276 108 L288 126 Q300 130 300 144 L300 172Z" fill="url(#' + i + 'c)"/>' +
        '<path d="M170 108 L210 108 L210 126 L150 126Z M216 108 L262 108 Q268 108 271 114 L278 126 L216 126Z" fill="url(#' + i + 'g)"/>' +
        '<rect x="170" y="94" width="96" height="4" rx="2" fill="#3A4048"/><path d="M126 146 L296 146" stroke="#FFFFFF" stroke-width="2" opacity=".5"/>' +
        '<circle cx="152" cy="172" r="15" fill="#15171A"/><circle cx="152" cy="172" r="9" fill="url(#' + i + 'w)"/><circle cx="270" cy="172" r="15" fill="#15171A"/><circle cx="270" cy="172" r="9" fill="url(#' + i + 'w)"/>' +
        mark("OPENROAD", "#0E2A3A") + badge("AWD + ski racks", 386, 14, "#0E2A3A", "#FFFFFF"));
    }
  };

  var CREATIVES = {
    altavia:  { brand: "Altavia Airways", headline: "Fly nonstop to 120+ cities", line: "Fares from $89 one way, with extra legroom on every flight.", cta: "Find flights", art: "wing" },
    harbor:   { brand: "Harbor & Pine Resorts", headline: "Stay 3 nights, the 4th is on us", line: "Oceanfront suites, infinity pools and sunset dining.", cta: "Book now", art: "pool" },
    voyager:  { brand: "Voyager Co.", headline: "The last suitcase you'll ever buy", line: "Featherweight hard shell with a lifetime warranty.", cta: "Shop luggage", art: "suitcase" },
    openroad: { brand: "OpenRoad Rentals", headline: "Convertibles from $39/day", line: "Unlimited miles and free cancellation at 900 airports.", cta: "Reserve a car", art: "convertible" },
    solace:   { brand: "Solace Eyewear", headline: "Polarized for every horizon", line: "Handmade aviators with full UV protection.", cta: "Shop sunglasses", art: "aviators" },
    northwind:{ brand: "Northwind Air", headline: "Your window seat to paradise", line: "Island getaways with bags included. Book by Friday.", cta: "See deals", art: "window" },
    linden:   { brand: "Linden Grand Hotels", headline: "Suites with a view, from $199", line: "Members save up to 20% in 40 cities worldwide.", cta: "View rooms", art: "suite" },
    fieldfern:{ brand: "Field & Fern", headline: "The weekender, reimagined", line: "Full-grain leather duffel, 20% off this week.", cta: "Shop bags", art: "duffel" },
    openroad2:{ brand: "OpenRoad Rentals", headline: "SUVs ready for the mountains", line: "All-wheel drive, ski racks and snow tires included.", cta: "Reserve a car", art: "suv" }
  };

  /* which three creatives rotate in each ad slot (home groups 0-4, results page) */
  var SLOTS = {
    home: [["altavia", "linden", "solace"], ["harbor", "openroad", "fieldfern"], ["openroad2", "voyager", "northwind"], ["solace", "altavia", "harbor"], ["northwind", "voyager", "linden"]],
    results: ["linden", "openroad", "solace"]
  };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function slot(ids, wide) {
    return '<div class="ad-card' + (wide ? " wide" : "") + '" role="complementary" aria-label="Sponsored" data-tick="0">' +
      ids.map(function (id, k) {
        var c = CREATIVES[id];
        return '<div class="ad-frame' + (k === 0 ? " on" : "") + '"' + (k === 0 ? "" : ' aria-hidden="true"') + '>' +
          '<div class="ad-media">' + ART[c.art]() + "</div>" +
          '<div class="ad-body"><span class="ad-tag">Sponsored · ' + esc(c.brand) + "</span><b>" + esc(c.headline) + '</b><span class="ad-line">' + esc(c.line) + '</span><span class="ad-cta">' + esc(c.cta) + "</span></div></div>";
      }).join("") + "</div>";
  }

  /* rotate every card to its next creative every 5 seconds, staggered so they don't all change at once */
  var t = 0, timer = null;
  function start() {
    if (timer) return;
    timer = setInterval(function () {
      if (document.hidden) return;
      t++;
      var cards = document.querySelectorAll(".ad-card");
      for (var n = 0; n < cards.length; n++) {
        if ((t + n * 2) % 5 !== 0) continue;
        var frames = cards[n].querySelectorAll(".ad-frame"), cur = 0;
        for (var f = 0; f < frames.length; f++) if (frames[f].classList.contains("on")) cur = f;
        frames[cur].classList.remove("on"); frames[cur].setAttribute("aria-hidden", "true");
        var nx = frames[(cur + 1) % frames.length]; nx.classList.add("on"); nx.removeAttribute("aria-hidden");
      }
    }, 1000);
  }

  window.VR_ADS = { slot: slot, slots: SLOTS, start: start, creatives: CREATIVES };
})();
