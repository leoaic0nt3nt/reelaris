// One story, ten visual treatments. The frame depends only on the requested time.
(() => {
  const canvas = document.getElementById('art');
  const ctx = canvas.getContext('2d');
  const styles = [
    ['pixelart', 'Пиксель-арт', '#24254b', '#9be591'],
    ['chalkboard', 'Меловая доска', '#193b33', '#eee8be'],
    ['glowsketch', 'Светящиеся контуры', '#1b163c', '#d29bff'],
    ['ps2', 'Ретро low-poly', '#573a35', '#fcba85'],
    ['comicart', 'Комикс', '#ffce54', '#221b3a'],
    ['flatvector', 'Плоский вектор', '#a8c7ff', '#233879'],
    ['dankoe', 'Белые линии', '#20242a', '#f7f5ed'],
    ['cgimotion', 'Предметное CGI', '#152536', '#70dacf'],
    ['legostyle', 'Кирпичики', '#e8dbab', '#4b3854'],
    ['zackdfilms', 'Объёмный разрез', '#30435e', '#ffce7e'],
  ];

  function rect(x, y, w, h, fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
  }

  function round(x, y, w, h, radius, fill, stroke) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function path(points, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (const point of points.slice(1)) ctx.lineTo(...point);
    if (fill) { ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function circle(x, y, radius, fill, stroke) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function text(content, x, y, size, color, weight = 600, font = 'sans-serif') {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(content, x, y);
  }

  function bolt(x, y, scale, fill, stroke) {
    const shape = [[4, -29], [-17, 4], [-3, 4], [-8, 29], [18, -7], [3, -7]];
    path(shape.map(([a, b]) => [x + a * scale, y + b * scale]), fill, stroke);
  }

  function brick(x, y, w, color, top, side) {
    rect(x, y, w, 32, color);
    path([[x, y], [x + 13, y - 12], [x + w + 13, y - 12], [x + w, y]], top);
    path([[x + w, y], [x + w + 13, y - 12], [x + w + 13, y + 19], [x + w, y + 32]], side);
    for (let cx = x + 18; cx < x + w; cx += 24) {
      ctx.save();
      ctx.translate(cx, y - 8);
      ctx.scale(1, .45);
      circle(0, 0, 8, side);
      circle(0, -5, 8, top);
      ctx.restore();
    }
  }

  const painters = [
    function pixel(progress, accent) {
      ctx.translate(-112, -58);
      for (let i = 0; i < 16; i++) {
        const x = (i * 73) % 332 - 45;
        const y = (i * 43) % 170 - 24;
        rect(x, y, i % 3 === 0 ? 8 : 4, 4, '#494a77');
      }
      rect(8, 112, 224, 12, '#161a36');
      rect(216, 36, 32, 40, '#a8aad2');
      rect(0, 0, 224, 112, '#f8efde');
      rect(8, 8, 208, 96, '#171936');
      const bars = Math.floor(progress * 6);
      for (let i = 0; i < 6; i++) {
        rect(18 + i * 32, 22, 26, 68, i < bars ? accent : '#36385c');
        if (i < bars) rect(18 + i * 32, 22, 26, 8, '#e2ffbb');
      }
    },
    function chalk(progress, accent) {
      ctx.lineCap = 'round';
      for (let i = 0; i < 130; i++) {
        const x = (i * 61) % 410 - 206;
        const y = (i * 37) % 226 - 116;
        rect(x, y, 3 + i % 6, 1, i % 4 ? '#284941' : '#35554a');
      }
      ctx.lineWidth = 2;
      for (const offset of [-2, 0, 2]) {
        ctx.globalAlpha = offset ? .38 : 1;
        path([[-117 + offset, -52], [102, -49 + offset], [104, -22], [126, -21],
              [127, 20], [102, 21], [101, 54], [-120, 52 + offset], [-117 + offset, -52]], null, accent);
      }
      ctx.globalAlpha = 1;
      for (let i = 0; i < Math.floor(25 * progress); i++) {
        const x = -107 + i * 8;
        path([[x, 40], [x + 11, -37 + Math.sin(i * 2) * 5]], null, accent);
      }
      path([[-170, -49], [-142, -49], [-145, -62]], null, accent);
      path([[142, 41], [164, 20], [172, 21]], null, accent);
    },
    function glow(progress, accent) {
      ctx.lineWidth = 1;
      for (let x = -210; x <= 210; x += 22) path([[x, -123], [x, 123]], null, '#322852');
      for (let y = -121; y <= 121; y += 22) path([[-210, y], [210, y]], null, '#322852');
      ctx.lineWidth = 3;
      ctx.shadowBlur = 19;
      ctx.shadowColor = accent;
      round(-110, -55, 216, 110, 16, '#22194a', accent);
      round(108, -18, 14, 36, 5, accent);
      round(-97, 39 - 78 * progress, 190, 78 * progress, 8, '#5a3d8c');
      bolt(0, 0, 1.18, '#f5d6ff');
      ctx.shadowBlur = 0;
      circle(-158, -49 + progress * 90, 4, accent);
      circle(152, 41 - progress * 90, 4, accent);
    },
    function lowpoly(progress) {
      ctx.translate(0, Math.sin(progress * 4) * 9);
      path([[-146, 65], [72, 80], [140, 37], [-78, 23]], '#402728');
      path([[-118, -31], [74, -57], [127, -89], [-62, -65]], '#f4b98b');
      path([[74, -57], [127, -89], [125, 6], [72, 49]], '#a35b59');
      path([[-118, -31], [74, -57], [72, 49], [-118, 65]], '#d99175');
      path([[80, -32], [133, -62], [146, -55], [145, -20], [79, 18]], '#ecc5ad');
      path([[-105, -17], [61, -40], [61, 32], [-105, 47]], '#60414d');
      const edge = -105 + 166 * progress;
      path([[-105, -17], [edge, -17 - 23 * progress], [edge, 47 - 15 * progress], [-105, 47]], '#fbc967');
    },
    function comic(progress) {
      const ink = '#211a30';
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 12; j++) {
          const r = 0.5 + Math.max(0, (i + j - 17) / 7);
          circle(-214 + i * 19, -119 + j * 20, r, '#b76545');
        }
      }
      const burst = Array.from({length: 28}, (_, i) => {
        const a = i * Math.PI / 14;
        const r = i % 2 ? 0.69 : 1;
        return [Math.cos(a) * 194 * r, Math.sin(a) * 109 * r];
      });
      ctx.lineWidth = 4;
      path(burst, '#fff4d6', ink);
      ctx.rotate(-.12 + .12 * progress);
      round(107, -20, 25, 40, 3, ink);
      round(-113, -51, 225, 102, 6, '#fd7658', ink);
      rect(-100, -37, 197 * progress, 74, '#fce76c');
      bolt(-7, 0, 1.1, ink);
    },
    function vector(progress) {
      circle(-58, 11, 91, '#bfd4ff');
      circle(86, -38, 55, '#91adf8');
      circle(147, 65, 21, '#d7e3ff');
      round(106, -24, 27, 48, 9, '#4d66b7');
      round(-121, -63, 237, 126, 27, '#263b82');
      round(-106, -48, 206, 96, 16, '#dce8ff');
      round(-98, -40, 190 * progress, 80, 12, '#68cfa7');
      bolt(-8, 0, .9, '#263b82');
    },
    function lines(progress, accent) {
      ctx.lineWidth = 1.6;
      round(-103, -54, 206, 108, 12, null, accent);
      round(109, -14, 12, 28, 3, null, '#a5a9a5');
      round(-92, -43, 184 * progress, 86, 7, '#eae6d9');
      const x = -92 + 184 * progress;
      path([[x, -43], [x, -84], [x + 29, -84]], null, accent);
      circle(x + 32, -84, 2.8, accent);
      path([[-147, 0], [-124, 0]], null, '#92978f');
      path([[135, 0], [159, 0]], null, '#92978f');
      text(`${Math.round(progress * 100)}%`, -103, 90, 15, accent, 500, 'monospace');
    },
    function cgi(progress) {
      const glow = ctx.createRadialGradient(30, -39, 0, 30, -39, 215);
      glow.addColorStop(0, '#32606c');
      glow.addColorStop(1, '#152536');
      rect(-219, -145, 438, 280, glow);
      ctx.translate(0, -3);
      ctx.rotate(-.24 + progress * .2);
      const metal = ctx.createLinearGradient(0, -62, 0, 62);
      metal.addColorStop(0, '#f4fff0');
      metal.addColorStop(.19, '#8fafb5');
      metal.addColorStop(.48, '#354e5a');
      metal.addColorStop(.83, '#577583');
      metal.addColorStop(1, '#1c3345');
      ctx.shadowColor = '#09141d';
      ctx.shadowBlur = 27;
      ctx.shadowOffsetY = 18;
      round(-115, -62, 230, 124, 30, metal);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      round(115, -24, 19, 48, 7, metal);
      round(-104, -48, 205, 96, 20, '#132d37');
      const charge = ctx.createLinearGradient(-97, 20, 105, -44);
      charge.addColorStop(0, '#209a8f');
      charge.addColorStop(1, '#d5fff5');
      round(-97, -41, 190 * progress, 82, 15, charge);
      round(-98, -48, 183, 5, 2, '#93c3bd');
    },
    function bricks(progress) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) circle(-183 + i * 60, -95 + j * 63, 5, '#d7c89c');
      }
      brick(-118, 42, 216, '#495478', '#7788ab', '#343958');
      brick(98, 22, 28, '#d58249', '#f3b775', '#b36953');
      for (let i = 0; i < 5; i++) {
        const lift = Math.max(0, (i + 1) / 5 - progress) * 142;
        brick(-116 + i * 43, 7 - lift, 41, '#5baa77', '#9add9a', '#3b805e');
      }
      brick(-118, -29, 216, '#55608a', '#899ac0', '#3e4668');
    },
    function exploded(progress) {
      const spread = Math.sin(progress * Math.PI) * 52 + 15;
      ctx.lineWidth = 1.4;
      path([[-190, 0], [191, 0]], null, '#7797b2');
      for (let i = 0; i < 4; i++) {
        const x = -74 + i * 45;
        round(x, -48, 36, 96, 6, '#f2a857', '#ffd49a');
        rect(x + 3, 10 - 52 * progress, 30, 38 + 52 * progress, '#f9d583');
      }
      ctx.globalAlpha = .93;
      path([[-112 - spread, -58], [-88 - spread, -70], [-88 - spread, 50],
            [-112 - spread, 63], [-128 - spread, 43], [-128 - spread, -44]], '#7594a8', '#b4d2de');
      path([[92 + spread, -58], [118 + spread, -72], [131 + spread, -52],
            [131 + spread, 38], [118 + spread, 56], [92 + spread, 66]], '#6e89a2', '#bad6df');
      ctx.globalAlpha = 1;
      path([[-50, -49], [-68, -87], [-112, -87]], null, '#c4d4e1');
      text('ЯЧЕЙКИ', -164, -82, 12, '#f4e7cf', 700, 'monospace');
    },
  ];

  function panel(x, index, progress) {
    const [command, title, background, accent] = styles[index];
    ctx.save();
    round(x, 113, 434, 330, 18, background);
    ctx.clip();
    ctx.save();
    ctx.translate(x + 217, 270);
    painters[index](progress, accent);
    ctx.restore();
    rect(x + 22, 418, 390, 2, '#14182166');
    rect(x + 22, 418, 390 * progress, 2, accent);
    ctx.restore();
    text(title, x, 479, 23, '#f5f1e8', 700);
    text('/' + command, x, 506, 15, '#c7fb6f', 600, 'monospace');
  }

  window.drawStyles = (seconds) => {
    const pair = Math.min(4, Math.floor(seconds / 2));
    const fraction = Math.max(0, Math.min(1, (seconds - pair * 2) / 2));
    const progress = .12 + .88 * (fraction * fraction * (3 - 2 * fraction));
    rect(0, 0, 960, 540, '#10131b');
    text('CODEX / ANIMATION STUDIO', 33, 36, 15, '#c7fb6f', 700, 'monospace');
    text('Заряд батареи в десяти стилях', 32, 81, 33, '#f5f1e8', 750);
    text(`0${pair + 1} / 05`, 834, 36, 15, '#aeb5c2', 600, 'monospace');
    panel(32, pair * 2, progress);
    panel(494, pair * 2 + 1, progress);
  };
})();
