// pixel-v2.jsx — 第二代像素精灵库（onboarding 漏斗专用）
// 方案：内联 SVG + shape-rendering:crispEdges + 4 色分层（H 高光 / M 主色 / S 阴影 / O 描边）
// 每个精灵 = 二维字符数组 + 色表，PixelSprite 帮你渲染成 rects

function PixelSprite({ rows, palette, cell = 4, style = {}, className }) {
  const h = rows.length;
  const w = rows[0].length;
  const rects = [];
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    let x = 0;
    while (x < w) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') { x++; continue; }
      let span = 1;
      while (x + span < w && row[x + span] === ch) span++;
      rects.push(
        <rect key={`${x}-${y}-${span}`}
          x={x * cell} y={y * cell} width={span * cell} height={cell}
          fill={palette[ch] || 'transparent'} />
      );
      x += span;
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={w * cell} height={h * cell}
      viewBox={`0 0 ${w * cell} ${h * cell}`}
      shapeRendering="crispEdges"
      style={{ display: 'block', imageRendering: 'pixelated', ...style }}
      className={className}>
      {rects}
    </svg>
  );
}

// ── 1. 小房子 · 首页按钮专用 · 18×18 ─────────────────────────────
// O=描边 R=红主色 D=红阴影 H=红高光 W=白 G=玻璃蓝 B=棕门 Y=黄灯
function PixelHouseIcon({ size = 32 }) {
  const cell = Math.max(1, Math.round(size / 18));
  const rows = [
    '........OO........',
    '.......OHHO.......',
    '......OHRHO.......',
    '.....OHRRHO.......',
    '....OHRRRHO.......',
    '...OHRRRRRHO......',
    '..OHRRRRRRRHO.....',
    '.ORRRRRRRRRRRO....',
    'ORRRRRRRRRRRRRO...',
    'OOOOOOOOOOOOOOO...',
    'OWWGWOBBBBOWWWO...',
    'OWWGWOBYBBOWWWO...',
    'OWWWWOBBBBOWWWO...',
    'OWWWWOBBBBOWWWO...',
    'OOOOOOBBBBOOOOO...',
    '......OBBBBO......',
    '......OBBBBO......',
    '......OOOOOO......',
  ];
  const palette = {
    O: '#1A1A3E',
    R: '#D32F2F',  // 屋顶主色
    D: '#8B1F1F',  // 屋顶阴影
    H: '#F05454',  // 屋顶高光
    W: '#FFF8E7',  // 墙
    G: '#87CEEB',  // 窗户
    B: '#6B3E12',  // 门
    Y: '#FFD700',  // 门把手
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// ── 2. 球场全景 · Splash hero · 40×22 ────────────────────────────
// 地平线 + 两侧大灯柱 + 草地条纹 + 远处人墙 + 中圈 + 中线
function PixelStadiumHero({ scale = 8 }) {
  const rows = [
    'yy............yy.............yy.........yy',  // 灯柱+天空
    'yY............yY.............yY.........yY',
    'yY....ffffffffYYYYYYYYYYYYYYYYY...ffffff.yY',  // 看台灯光横条
    'yY...ffcccccccccccccccccccccccccccff.....yY',
    'yY..ffcmcmcmcmcmcmcmcmcmcmcmcmcmccff.....yY',  // 人群（m人头 c衣服）
    'yY.ffccccccccccccccccccccccccccccccff....yY',
    'yYfffffffffffffffffffffffffffffffffffff..yY',  // 围栏
    'yY.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL...yY',  // 广告板上沿
    'yYggggggggggggggggggggggggggggggggggggg..yY',  // 草地亮纹
    'yYGGGGGGGGGGGGGwwwwwwwwwGGGGGGGGGGGGGGG..yY',  // 草地中圈
    'yYggggggggggggg.w.....w.ggggggggggggggg..yY',
    'yYGGGGGGGGGGGGGww.....wwGGGGGGGGGGGGGGG..yY',
    'yYggggggggggggg.ww...ww.ggggggggggggggg..yY',
    'yYGGGGGGGGGGGGGGwwwwwwwwGGGGGGGGGGGGGGG..yY',
    'yYggggggggggggggggggggggggggggggggggggg..yY',
    'yYGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG..yY',
    'yYggggggggggggggggggggggggggggggggggggg..yY',
    'yYGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG..yY',
    'yYggggggggggggggggggggggggggggggggggggg..yY',
    'yYGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG..yY',
    'yOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOyO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  ];
  const palette = {
    y: '#1A1A3E',        // 夜空深蓝
    Y: '#2A3A60',        // 灯柱
    f: '#FFD700',        // 灯光暖黄
    c: '#455A64',        // 人群衣
    m: '#FFE0B2',        // 人脸
    L: '#E53935',        // 广告板
    g: '#4CAF50',        // 草亮
    G: '#388E3C',        // 草暗
    w: '#FFFFFF',        // 中圈白线
    O: '#1A1A3E',        // 底描边
  };
  return <PixelSprite rows={rows} palette={palette} cell={Math.round(scale)}/>;
}

// ── 3. 精细奖杯 · 24×24 · 4 色分层 ──────────────────────────────
function PixelTrophy2({ size = 96 }) {
  const cell = Math.max(1, Math.round(size / 24));
  const rows = [
    '........OOOOOOOO........',
    '.......OHHHHHHHHO.......',
    '......OHGGGGGGGGHO......',
    '.....OHGYYYYYYGGHO......',
    '....OHGYYYYYYYYYGGHO....',
    '...OHGYY....YYYYGGHO....',
    '..OHGYY......YYYGGHO....',
    '..OHGY........YYGGHO....',
    'OOOHGY........YYGGHOOO..',
    'HHHHGY........YYGGHHHH..',
    'HHHHGY........YYGGHHHH..',
    'OOOHGY........YYGGHOOO..',
    '..OHGY........YYGGHO....',
    '..OHGYY......YYYGGHO....',
    '...OHGYYY....YYYGGHO....',
    '....OHGYYYYYYYYYGGHO....',
    '.....OHGGYYYYYGGGHO.....',
    '......OHGGGGGGGHO.......',
    '........OHGGGHO.........',
    '........OHGGGHO.........',
    '........OGYYYGO.........',
    '.......OGYYYYYGO........',
    '......OGYYYYYYYGO.......',
    '.....OOOOOOOOOOOOO......',
  ];
  const palette = {
    O: '#1A1A3E',
    Y: '#FFE570',  // 高光金
    G: '#FFC107',  // 金主色
    H: '#FFF59D',  // 最亮金边
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// ── 4. 精细宝箱 · 24×20 · 4 色分层 ──────────────────────────────
function PixelChest2({ size = 96, open = false }) {
  const cell = Math.max(1, Math.round(size / 24));
  const lidClosed = [
    '..OOOOOOOOOOOOOOOOOOOO..',
    '.OWWWWWWWWWWWWWWWWWWWWO.',
    'OWSSSSSSSSSSSSSSSSSSSSSO',
    'OWSBBBBBBBBBBBBBBBBBBSSO',
    'OWSBbbbbbbbbbbbbbbbbbBSO',
    'OWSBbGGGGGGGGGGGGGGGbBSO',
    'OWSBbGYYYYYYYYYYYYYGbBSO',
    'OWSBbGYLLLLLLLLLLLYGbBSO',
    'OWSBbGGGGGGGGGGGGGGGbBSO',
    'OWSBbbbbbbbbbbbbbbbbbBSO',
    'OWSBBBBBBBBBBBBBBBBBBSSO',
    'OWSSSSSSSSSSSSSSSSSSSSSO',
  ];
  const lidOpen = [
    '...OOOOOOOOOOOOOOOOOO...',
    '..OWWWWWWWWWWWWWWWWWWO..',
    '.OWSSSSSSSSSSSSSSSSSSSO.',
    'OWBBBBBBBBBBBBBBBBBBBBO.',
    'OWbbbbbbbbbbbbbbbbbbbBO.',
    'OBbGGGGGGGGGGGGGGGGbBO..',
    'OBbGfffffffffffffffGBO..',
    'OBbGfffffffffffffffGBO..',
    'OBGGGGGGGGGGGGGGGGGGBO..',
    'OOOOOOOOOOOOOOOOOOOOOO..',
    '........................',
    '........................',
  ];
  const body = [
    'OBBBBBBBBBBBBBBBBBBBBBBO',
    'OBbbbbbbbbbbbbbbbbbbbbBO',
    'OBbBBBBBBBBBBBBBBBBBBbBO',
    'OBbBYYYYYYYYYYYYYYYYBbBO',
    'OBbBYGGGGGGGGGGGGGGYBbBO',
    'OBbBYGLLLLLLLLLLLLGYBbBO',
    'OBbBYGGGGGGGGGGGGGGYBbBO',
    'OBbBYYYYYYYYYYYYYYYYBbBO',
    'OBbBBBBBBBBBBBBBBBBBBbBO',
    'OBbbbbbbbbbbbbbbbbbbbbBO',
    'OBBBBBBBBBBBBBBBBBBBBBBO',
    'OOOOOOOOOOOOOOOOOOOOOOOO',
  ];
  const rows = (open ? lidOpen : lidClosed).concat(body);
  const palette = {
    O: '#1A1A3E',
    B: '#6B3E12',   // 木深
    b: '#8B5A2B',   // 木主色
    W: '#A0732A',   // 木高光边
    S: '#5A2F0C',   // 木更深阴影
    G: '#FFC107',   // 金色装饰主
    Y: '#FFE570',   // 金高光
    L: '#1A1A3E',   // 锁芯
    f: '#FFF8E7',   // 开箱露出的金光
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// ── 5. 通行证本 · 20×28 像素 ────────────────────────────────────
function PixelPassport({ size = 84 }) {
  const cell = Math.max(1, Math.round(size / 20));
  const rows = [
    '....OOOOOOOOOOOO....',
    '...ORRRRRRRRRRRRO...',
    '..ORrRRRRRRRRRRRRo..',
    '.ORrRRRRRRRRRRRRRRo.',
    'ORrRRRRRRRRRRRRRRRRo',
    'ORrRRRRRRRRRRRRRRRRo',
    'ORrRRR..YYYY...RRRRo',
    'ORrRR..YYYYYY..RRRRo',
    'ORrRR.YY.YY.YY.RRRRo',
    'ORrRR.YYYYYYYY.RRRRo',
    'ORrRR..YYYYYY..RRRRo',
    'ORrRRR..YYYY...RRRRo',
    'ORrRRRRRRRRRRRRRRRRo',
    'ORrRRRR..........Rro',
    'ORrRRR.GGGGGGGGGG.ro',
    'ORrRR..GGGGGGGGGG..o',
    'ORrRR.GGGGGGGGGGGG.o',
    'ORrRR..............o',
    'ORrRRRRRRRRRRRRRRRRo',
    '.OOOOOOOOOOOOOOOOOO.',
  ];
  const palette = {
    O: '#1A1A3E',
    R: '#C62828',   // 封面深红
    r: '#F44336',   // 边高光
    o: '#8B1F1F',   // 右下暗边
    Y: '#FFD700',   // 金徽/字
    G: '#FFE570',   // 金条
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// ── 6. 足球小人 mascot · 20×24 ──────────────────────────────────
function PixelMascot({ size = 72, wave = false }) {
  const cell = Math.max(1, Math.round(size / 20));
  const rows = [
    '......OOOOOOOO......',
    '....OOWWWWWWWWOO....',
    '...OWWKKWWWWKKWWO...',
    '..OWKKWWWWWWWWKKWO..',
    '..OWWWWWKKWWWWWWWO..',
    '..OWKKWWKKWWKKWWKO..',
    '..OWWKWWWWWWWWKWWO..',
    '..OWWWKKWWWWKKWWWO..',
    '...OWWWWKKKKWWWWO...',
    '....OOWWWWWWWWOO....',
    '......OOOOOOOO......',
    '.......OSSSSO.......',   // 脖子
    '......OSSRRSSO......',   // 身体
    '.....OSSRRRRSSO.....',
    'OOOOOSSRRRRRRSSOOOOO',   // 球衣+手
    'ORRROSSSSSSSSSORRRO',
    '.OROOSSSSSSSSOOROO.',
    '..OOOSSSSSSSSOOO....',
    '....OSPPOOOPPSO.....',   // 腿
    '....OOPPOOOPPO......',
  ];
  const palette = {
    O: '#1A1A3E',
    W: '#FFFFFF',  // 球白
    K: '#1A1A3E',  // 球黑五边
    S: '#FFE0B2',  // 肤色
    R: '#FF4444',  // 球衣红
    P: '#212121',  // 鞋
  };
  return (
    <div style={{ display: 'inline-block', animation: wave ? 'idleSway 1.2s steps(2, end) infinite' : 'none' }}>
      <PixelSprite rows={rows} palette={palette} cell={cell}/>
    </div>
  );
}

// ── 7. 星星爆发 ornament · 16×16 ────────────────────────────────
function PixelStarBurst({ size = 48 }) {
  const cell = Math.max(1, Math.round(size / 16));
  const rows = [
    '.......OO.......',
    '......OYYO......',
    '......OYYO......',
    '...O..OYYO..O...',
    '..OYO.OYYO.OYO..',
    '..OYO.OYYO.OYO..',
    '...OYOOYYOOYO...',
    'OOOOOYYYYYYYYOOO',
    'OYYYYYYYYYYYYYYO',
    'OOOOOYYYYYYYYOOO',
    '...OYOOYYOOYO...',
    '..OYO.OYYO.OYO..',
    '..OYO.OYYO.OYO..',
    '...O..OYYO..O...',
    '......OYYO......',
    '.......OO.......',
  ];
  const palette = { O: '#1A1A3E', Y: '#FFE570' };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// ── 8. 看 / 玩 / 送 三个 32×32 大像素图 ──────────────────────────
// 看 · 电视屏 + 弹幕
function PixelWatchIcon({ size = 72 }) {
  const cell = Math.max(1, Math.round(size / 20));
  const rowsFixed = [
    '.OOOOOOOOOOOOOOOOOO.',
    'ORRRRRRRRRRRRRRRRRRO',
    'ORWWWWWWWWWWWWWWWWRO',
    'ORWBBBBBBBBBBBBBBWRO',
    'ORWBbbbgggggggbbbBWO',
    'ORWBbgggWggggggbbBWO',
    'ORWBbggggggggWggbBWO',
    'ORWBbgWgggggggggbBWO',
    'ORWBbgggWgggggWggBWO',
    'ORWBBBBBBBBBBBBBBWRO',
    'ORWWWWWWWWWWWWWWWWRO',
    'ORRRRRRRRRRRRRRRRRRO',
    '.OOOOYYYYYYYYYOOOO..',
    '....OYYYYYYYYYO.....',
    '...OOOOOOOOOOOOO....',
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
  ];
  const palette = {
    O: '#1A1A3E',
    R: '#2196F3',   // TV 外框蓝
    W: '#FFFFFF',   // 屏边白
    B: '#0D47A1',   // 屏内深
    b: '#1976D2',   // 屏内中
    g: '#4CAF50',   // 场地
    Y: '#6B3E12',   // 底座棕
  };
  return <PixelSprite rows={rowsFixed} palette={palette} cell={cell}/>;
}

// 玩 · 手柄
function PixelPlayIcon({ size = 72 }) {
  const cell = Math.max(1, Math.round(size / 20));
  const rows = [
    '....................',
    '....................',
    '...OOOOOOOOOOOOOO...',
    '..OYYYYYYYYYYYYYYO..',
    '.OYYBBYYYYYYYYRRYYO.',
    'OYBWBYYYYYYYYYRRRRYO',
    'OYBBBYYYYYYYYYYRRYYO',
    'OYYYYYYYYYYYYYYYYYYO',
    'OYYYYYGGYYYYYYYYYYYO',   // 中间有个小按键
    'OYYYYGGGGYYYYYPPPYYO',
    'OYYYYYGGYYYYYYPWPYYO',
    'OYYYYYYYYYYYYYPPPYYO',
    'OYYYYYYYYYYYYYYYYYYO',
    'OYYYYYYYYYYYYYYYYYYO',
    '.OYYYYYYYYYYYYYYYYO.',
    '..OYYOOYYYYYYOOYYO..',
    '...OOO..........OO..',
    '....................',
    '....................',
    '....................',
  ];
  const palette = {
    O: '#1A1A3E',
    Y: '#FFC107',   // 手柄黄
    B: '#1A1A3E',   // 方向键
    W: '#FFFFFF',
    R: '#FF4444',   // 红 A 按钮
    G: '#4CAF50',   // 摇杆
    P: '#8B1F1F',
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

// 送 · 礼盒
function PixelGiftIcon({ size = 72 }) {
  const cell = Math.max(1, Math.round(size / 20));
  const rows = [
    '....................',
    '........OO..OO......',
    '.......OYYOOYYO.....',
    '......OYYYYYYYO.....',
    '......OYYOOYYYO.....',
    '.......OYOYOYO......',
    '.....OOOOYYOOOOO....',
    '....OHHHHYYHHHHO....',
    '....OHHHHYYHHHHO....',
    '...OOOOOOOOOOOOOO...',
    '..ORRRRRRYYRRRRRRO..',
    '..ORRRRRRYYRRRRRRO..',
    '..OrrrrrrYYrrrrrrO..',
    '..OrrrrrrYYrrrrrrO..',
    '..ORRRRRRYYRRRRRRO..',
    '..ORRRRRRYYRRRRRRO..',
    '..OOOOOOOOOOOOOOOO..',
    '....................',
    '....................',
    '....................',
  ];
  const palette = {
    O: '#1A1A3E',
    Y: '#FFD700',   // 丝带
    R: '#D32F2F',   // 盒红
    r: '#8B1F1F',
    H: '#FFC107',   // 盒盖顶色
  };
  return <PixelSprite rows={rows} palette={palette} cell={cell}/>;
}

Object.assign(window, {
  PixelSprite,
  PixelHouseIcon,
  PixelStadiumHero,
  PixelTrophy2,
  PixelChest2,
  PixelPassport,
  PixelMascot,
  PixelStarBurst,
  PixelWatchIcon,
  PixelPlayIcon,
  PixelGiftIcon,
});
