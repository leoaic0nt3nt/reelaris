// Deterministic scene examples. Each frame is restored from its requested time.
(() => {
  const ctx = document.getElementById('art').getContext('2d');
  const styles = [
    ['pixelart', 'Пиксель-арт', '#181b40', '#a49aff'],
    ['chalkboard', 'Меловая графика', '#193c37', '#f2edce'],
    ['glowsketch', 'Светящиеся контуры', '#171331', '#c2a2ff'],
    ['ps2', 'Ретро low-poly', '#4c333e', '#ffc197'],
    ['comicart', 'Комикс', '#ffd669', '#261c42'],
    ['flatvector', 'Векторная анимация', '#b5d1ff', '#28458b'],
    ['dankoe', 'Минималистичные линии', '#1b202a', '#f1f3ef'],
    ['cgimotion', 'Объём и материалы', '#182a40', '#7bded0'],
    ['legostyle', 'Игрушечные кирпичики', '#ecdfbd', '#4c6a84'],
    ['zackdfilms', 'Объёмная схема', '#2a405e', '#ffc67e'],
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
  function text(value, x, y, size, fill, weight = 600, font = 'sans-serif') {
    ctx.font = weight + ' ' + size + 'px ' + font;
    ctx.fillStyle = fill;
    ctx.fillText(value, x, y);
  }
  function star(x, y, fill) {
    rect(x - 3, y, 9, 3, fill);
    rect(x, y - 3, 3, 9, fill);
  }
  function brick(x, y, fill, top) {
    rect(x, y, 44, 25, fill);
    path([[x, y], [x + 12, y - 10], [x + 56, y - 10], [x + 44, y]], top);
    path([[x + 44, y], [x + 56, y - 10], [x + 56, y + 15], [x + 44, y + 25]], '#344964');
    ctx.save();
    ctx.translate(x + 25, y - 7);
    ctx.scale(1, .4);
    circle(0, 0, 8, top, '#435c79');
    ctx.restore();
  }
  function gear(x, y, radius, angle, fill) {
    const points = [];
    for (let i = 0; i < 48; i++) {
      const a = angle + i * Math.PI / 24;
      const r = i % 4 < 2 ? radius : radius * .84;
      points.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
    }
    path(points, fill, '#ffe1b1');
    circle(x, y, radius * .45, '#20334b', '#ffe1b1');
    circle(x, y, 6, '#aec8d9');
  }

  const painters = [
    function pixel(p) {
      for (let i = 0; i < 28; i++) {
        const x = ((i * 47 + p * 96) % 430) - 215;
        const y = (i * 71 % 254) - 132;
        star(x, y, i % 3 ? '#615b9e' : '#d9cff9');
      }
      ctx.translate(-37 + p * 68, 36 - p * 72);
      rect(-23, -54, 46, 87, '#e8e5fb');
      rect(-14, -70, 28, 16, '#b5aaff');
      rect(-6, -80, 12, 10, '#b5aaff');
      rect(-38, 9, 15, 45, '#ff9e79');
      rect(23, 9, 15, 45, '#ff9e79');
      rect(-12, -36, 24, 24, '#242755');
      rect(-6, -30, 12, 12, '#83dcfa');
      rect(-15, 33, 30, 19 + Math.floor(p * 4) * 5, '#ffbf69');
      rect(-6, 51, 12, 15 + Math.floor(p * 3) * 7, '#fff0af');
    },
    function chalk(p, color) {
      for (let i = 0; i < 130; i++) rect((i * 43 % 420) - 210, (i * 29 % 245) - 122, 5, 1, '#2c5147');
      ctx.lineWidth = 2;
      path([[-150, -94], [-150, 83], [161, 83]], null, color);
      for (let i = 0; i < 5; i++) path([[-157, 63 - i * 37], [160, 63 - i * 37]], null, '#41685c');
      const values = [20, 45, 38, 92, 85, 148, 168];
      const count = Math.max(2, Math.floor(p * values.length));
      const points = values.slice(0, count).map((v, i) => [-132 + i * 43, 60 - v * .75]);
      ctx.lineWidth = 4;
      path(points, null, color);
      for (const [x, y] of points) circle(x, y, 4, color);
      text('ИДЕЯ', -126, 109, 14, color, 500);
      text('РЕЗУЛЬТАТ', 54, 109, 14, color, 500);
    },
    function glow(p, color) {
      for (let i = -5; i <= 5; i++) path([[i * 35, -130], [i * 35, 130]], null, '#302546');
      const nodes = [[-130, -62], [-117, 71], [0, -84], [2, 46], [131, -30], [133, 91]];
      ctx.lineWidth = 2;
      ctx.shadowBlur = 14;
      ctx.shadowColor = color;
      for (const [a, b] of [[0,2],[0,3],[1,3],[2,4],[3,4],[3,5],[4,5]]) {
        const x = nodes[a], y = nodes[b];
        path([x,y], null, '#7862bc');
        circle(x[0] + (y[0]-x[0])*p, x[1] + (y[1]-x[1])*p, 3, '#e6d3ff');
      }
      for (let i = 0; i < nodes.length; i++) {
        circle(...nodes[i], 16 + 2 * Math.sin(p * 6 + i), '#302454', color);
        circle(...nodes[i], 5, '#f8dcff');
      }
      ctx.shadowBlur = 0;
    },
    function lowpoly(p) {
      ctx.translate(0, 9);
      ctx.rotate(-.08 + .16 * p);
      path([[-178, 70], [0, 113], [177, 35], [4, -7]], '#30232e');
      path([[-104, -63], [-7, -94], [81, -57], [-17, -22]], '#edb89c');
      path([[-104, -63], [-17, -22], [-17, 77], [-104, 34]], '#d3917c');
      path([[-17, -22], [81, -57], [81, 40], [-17, 77]], '#9a5c6b');
      for (let i = 0; i < 3; i++) {
        path([[-88, -32 + 25*i], [-34, -7 + 25*i], [-34, 6 + 25*i], [-88, -19 + 25*i]], '#ffdfb3');
        path([[0, -6 + 25*i], [61, -27 + 25*i], [61, -13 + 25*i], [0, 8 + 25*i]], i < Math.ceil(p*3) ? '#f6cd7c' : '#4d3f5b');
      }
    },
    function comic(p) {
      const ink='#261c42';
      for(let i=0;i<26;i++) for(let j=0;j<13;j++) circle(-215+i*18,-124+j*19,1.2,'#b47a45');
      ctx.lineWidth=4;
      ctx.save();
      ctx.rotate(-.1);
      round(-158,-79,240,147,4,'#fff4d5',ink);
      path([[-158,60],[75,-73],[75,67]],'#ff8f75');
      circle(-66,-8,29,'#ffbd77',ink);
      path([[-114,63],[-99,27],[-29,27],[-14,63]],'#6763a0',ink);
      ctx.restore();
      ctx.translate(45+p*30,-40);
      round(-8,-47,148,71,15,'#fcf8e9',ink);
      path([[6,23],[-2,45],[40,23]],'#fcf8e9',ink);
      text('В КАДРЕ!',7,-21,19,ink,800);
    },
    function vector(p) {
      circle(-102,-57,75,'#cedfff');
      circle(123,51,83,'#a0bbef');
      for(let i=0;i<3;i++) {
        const lift=Math.max(0,(i+1)/3-p)*72;
        round(-144+i*93,-64+lift,83,123,14,i===1?'#3657a0':'#eff5ff');
        round(-130+i*93,-47+lift,55,42,7,['#f4b184','#90d6b8','#c0aff2'][i]);
        rect(-130+i*93,9+lift,47,5,i===1?'#c7dcff':'#7792c3');
        rect(-130+i*93,23+lift,33,4,i===1?'#c7dcff':'#a5b8dd');
      }
    },
    function lines(p,color) {
      ctx.lineWidth=1.8;
      circle(-109,0,30,null,color);
      circle(1,0,30,null,color);
      circle(111,0,30,null,color);
      path([[-68,0],[-42,0]],null,color);
      path([[42,0],[69,0]],null,color);
      path([[-48,-5],[-42,0],[-48,5]],null,color);
      path([[63,-5],[69,0],[63,5]],null,color);
      circle(-109+220*p,0,8,'#fff3b5');
      text('01',-119,64,15,color,500,'monospace');
      text('02',-9,64,15,color,500,'monospace');
      text('03',101,64,15,color,500,'monospace');
      path([[-164,-67],[164,-67]],null,'#4c5967');
      path([[-164,91],[164,91]],null,'#4c5967');
    },
    function cgi(p) {
      const back=ctx.createRadialGradient(35,-25,4,35,-25,210);
      back.addColorStop(0,'#365a6b'); back.addColorStop(1,'#182a40');
      rect(-217,-150,434,295,back);
      ctx.translate(0,7);
      ctx.save(); ctx.scale(1,.31);
      circle(0,152,103,'#102039');
      ctx.restore();
      const ball=ctx.createRadialGradient(-26,-41,4,3,0,76);
      ball.addColorStop(0,'#e6fff3'); ball.addColorStop(.35,'#8adbcf'); ball.addColorStop(1,'#1a667c');
      circle(0,-9,66,ball);
      ctx.save(); ctx.rotate(-.45+p*.9); ctx.scale(1,.35);
      ctx.lineWidth=13;
      circle(0,0,114,null,'#cebdff');
      ctx.restore();
      circle(-89+178*p,-44,6,'#ffe1a1');
    },
    function bricks(p) {
      for(let x=-180;x<210;x+=55) for(let y=-103;y<120;y+=50) circle(x,y,3,'#d4c79f');
      for(let i=0;i<9;i++) {
        const row=Math.floor(i/3),col=i%3;
        const height=Math.max(0,(i+1)/9-p)*220;
        brick(-83+col*46,65-row*34-height,['#5786ae','#dc9575','#84a586'][row],['#a0c7de','#f4bf95','#b6d2a4'][row]);
      }
    },
    function gears(p) {
      path([[-174,74],[-128,109],[172,49],[125,14]],'#1d304b');
      ctx.lineWidth=2;
      path([[-171,-90],[-171,74],[125,14],[125,-115]],null,'#6a8ca8');
      ctx.save(); ctx.translate(-39,0); ctx.scale(1,.84);
      gear(0,0,79,p*1.7,'#c9895b');
      ctx.restore();
      ctx.save(); ctx.translate(85,-48); ctx.scale(1,.84);
      gear(0,0,48,-p*2.8,'#e7b777');
      ctx.restore();
      path([[-48,-62],[-68,-104],[-139,-104]],null,'#bdd6e5');
      text('МЕХАНИЗМ',-164,-110,12,'#dfe8ed',600,'monospace');
    },
  ];
  function panel(x,index,p) {
    const [command,title,background,accent]=styles[index];
    ctx.save();
    round(x,113,434,330,18,background);
    ctx.clip();
    ctx.save();
    ctx.translate(x+217,274);
    painters[index](p,accent);
    ctx.restore();
    rect(x+22,418,390,2,'#10172255');
    rect(x+22,418,390*p,2,accent);
    ctx.restore();
    text(title,x,479,23,'#f5f1e8',700);
    text('/'+command,x,506,15,'#b4b9ff',600,'monospace');
  }
  window.drawStyles=(seconds)=>{
    const pair=Math.min(4,Math.floor(seconds/2));
    const fraction=Math.max(0,Math.min(1,(seconds-pair*2)/2));
    const p=.12+.88*fraction*fraction*(3-2*fraction);
    rect(0,0,960,540,'#10131b');
    text('REELARIS / ANIMATION',33,36,15,'#b8bdff',700,'monospace');
    text('Десять стилей движения',32,81,33,'#f5f1e8',750);
    text('0'+(pair+1)+' / 05',834,36,15,'#aeb5c2',600,'monospace');
    panel(32,pair*2,p);
    panel(494,pair*2+1,p);
  };
})();
