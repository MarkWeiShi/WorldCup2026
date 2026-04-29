// onboarding.jsx — 入场漏斗 5 屏
// E1 Splash → E2 选国 → E3 看/玩/送 → E4 活动亮点 → E5 球迷证登记 → H0
// 视觉：24 色扩展板 + Kenney Pixel Platformer 真实像素素材 + OpenGameArt 真实球场图

// 24 色扩展色板（PX24 · 每个主色 3~4 层）
const PX24 = {
  // 深→浅 4 层
  night0:  '#0A0A1F',
  night:   '#1A1A3E',   // = PX.night
  night2:  '#3B3B5C',
  night3:  '#5C5C7A',

  red0:    '#8B1F1F',
  red:     '#D32F2F',   // 比 PX.red 更饱和
  red2:    '#FF4444',   // = PX.red
  red3:    '#FF8A80',

  gold0:   '#F57F17',
  gold:    '#FBC02D',
  gold2:   '#FFD700',   // = PX.sunYellow
  gold3:   '#FFF59D',

  green0:  '#1B5E20',
  green:   '#2E7D32',
  green2:  '#4CAF50',   // = PX.grassGreen
  green3:  '#81C784',

  blue0:   '#0D47A1',
  blue:    '#1976D2',
  blue2:   '#2196F3',
  blue3:   '#87CEEB',   // = PX.skyBlue

  cream0:  '#E6DFC8',
  cream:   '#FFF8E7',   // = PX.cream
  cream2:  '#FFFBF0',

  // 装饰色
  purple:  '#7B1FA2',
  purple2: '#BA68C8',
  orange:  '#F57C00',
  orange2: '#FFB74D',
  brown:   '#6B3E12',
  brown2:  '#8B5A2B',
  teal:    '#00897B',
  pink:    '#E91E63',
};

const OB_COUNTRY_POOL = [
  'cn','br','ar','de','fr','es','pt','en','nl','jp',
  'kr','it','us','mx','ca','au','be','hr','dk','ec',
  'eg','gh','ir','ma','pl','sa','sn','ch','tn','ur',
  'qa','ng','no','se','tr','ua','at','cz','pe','co',
  'rs','ro','bo','cl','gr','hk','my','th',
];
const OB_COUNTRY_META = {
  cn: '中国', br: '巴西', ar: '阿根廷', de: '德国', fr: '法国',
  es: '西班牙', pt: '葡萄牙', en: '英格兰', nl: '荷兰', jp: '日本',
  kr: '韩国', it: '意大利', us: '美国', mx: '墨西哥', ca: '加拿大',
  au: '澳大利亚', be: '比利时', hr: '克罗地亚', dk: '丹麦', ec: '厄瓜多尔',
  eg: '埃及', gh: '加纳', ir: '伊朗', ma: '摩洛哥', pl: '波兰',
  sa: '沙特', sn: '塞内加尔', ch: '瑞士', tn: '突尼斯', ur: '乌拉圭',
  qa: '卡塔尔', ng: '尼日利亚', no: '挪威', se: '瑞典', tr: '土耳其',
  ua: '乌克兰', at: '奥地利', cz: '捷克', pe: '秘鲁', co: '哥伦比亚',
  rs: '塞尔维亚', ro: '罗马尼亚', bo: '玻利维亚', cl: '智利', gr: '希腊',
  hk: '中国香港', my: '马来西亚', th: '泰国',
};
const OB_FALLBACK_COLORS = {
  kr: ['#003478','#FFFFFF','#CD2E3A'], it: ['#008C45','#F4F9FF','#CD212A'],
  us: ['#002868','#BF0A30','#FFFFFF'], mx: ['#006847','#FFFFFF','#CE1126'],
  ca: ['#FF0000','#FFFFFF','#FF0000'], au: ['#012169','#FFFFFF','#E4002B'],
  be: ['#000000','#FAE042','#ED2939'], hr: ['#FF0000','#FFFFFF','#171796'],
  dk: ['#C60C30','#FFFFFF','#C60C30'], ec: ['#FFCE00','#003893','#CE1126'],
  eg: ['#CE1126','#FFFFFF','#000000'], gh: ['#CE1126','#FFD700','#006B3F'],
  ir: ['#239F40','#FFFFFF','#DA0000'], ma: ['#C1272D','#FFFFFF','#006233'],
  pl: ['#FFFFFF','#DC143C','#FFFFFF'], sa: ['#006C35','#FFFFFF','#006C35'],
  sn: ['#00853F','#FDEF42','#E31B23'], ch: ['#FF0000','#FFFFFF','#FF0000'],
  tn: ['#E70013','#FFFFFF','#E70013'], ur: ['#7B3F00','#FFFFFF','#0038A8'],
  qa: ['#8A1538','#FFFFFF','#8A1538'], ng: ['#008751','#FFFFFF','#008751'],
  no: ['#BA0C2F','#FFFFFF','#00205B'], se: ['#006AA7','#FECC00','#006AA7'],
  tr: ['#E30A17','#FFFFFF','#E30A17'], ua: ['#0057B7','#FFD700','#0057B7'],
  at: ['#ED2939','#FFFFFF','#ED2939'], cz: ['#11457E','#FFFFFF','#D7141A'],
  pe: ['#D91023','#FFFFFF','#D91023'], co: ['#FCD116','#003893','#CE1126'],
  rs: ['#C6363C','#FFFFFF','#0C4076'], ro: ['#002B7F','#FCD116','#CE1126'],
  bo: ['#DA291C','#F4E400','#007934'], cl: ['#FFFFFF','#D52B1E','#0039A6'],
  gr: ['#0D5EAF','#FFFFFF','#0D5EAF'], hk: ['#BA0C2F','#FFFFFF','#BA0C2F'],
  my: ['#CC0001','#FFFFFF','#010066'], th: ['#ED1C24','#FFFFFF','#241D4F'],
};

function ObFlag({ code, size = 36, selected = false }) {
  const hasPixel = window.PixelFlag && window.FLAGS && window.FLAGS[code];
  const palette = OB_FALLBACK_COLORS[code];
  if (hasPixel) {
    return (
      <div style={{
        padding: 3,
        background: selected ? PX24.gold2 : 'transparent',
        border: `2px solid ${selected ? PX24.red2 : 'transparent'}`,
      }}>
        <PixelFlag code={code} px={Math.max(3, Math.floor(size / 6))}/>
      </div>
    );
  }
  const colors = palette || [PX24.night, PX24.night2, PX24.night];
  return (
    <div style={{
      padding: 3,
      background: selected ? PX24.gold2 : 'transparent',
      border: `2px solid ${selected ? PX24.red2 : 'transparent'}`,
    }}>
      <div style={{
        width: size, height: size,
        border: `2px solid ${PX24.night}`,
        boxShadow: `2px 2px 0 ${PX24.night}`,
        position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {colors.map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }}/>
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace", fontSize: Math.max(6, Math.floor(size / 4)),
          color: PX24.night,
          textShadow: '1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff',
          letterSpacing: 1,
        }}>{code.toUpperCase()}</div>
      </div>
    </div>
  );
}

// 像素贴片 — 真实 PNG
function PxAsset({ src, size = 32, style = {}, className }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{
        imageRendering: 'pixelated',
        display: 'block',
        ...style,
      }}
      className={className}
    />
  );
}

// 内联 SVG 精灵生成器（用于 8 活动图标）
function ObSprite({ rows, palette, cell = 3, style = {} }) {
  const h = rows.length, w = rows[0].length;
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
      style={{ display: 'block', imageRendering: 'pixelated', ...style }}>
      {rects}
    </svg>
  );
}

// ── 8 活动图标 · 24×24 多色分层 ────────────────────────────────
const ACT_ICONS = {
  channel: { // 官频开播 · 摄像机
    rows: [
      '........OOOOOOOOOOOO....',
      '.......OOWWWWWWWWWWOO...',
      '......OOWRRRRRRRRRRWOO..',
      '.....OOWRKKKKKKKKKKRWOO.',
      '....OOWRKSSSSSSSSSSKRWOO',
      '...OOWRKSSsssssssssSKRWO',
      '...OWRKSssssssssssssKRWO',
      '...OWRKSssssllssssssKRWO',
      '...OWRKSsssll..llssssRWO',
      '...OWRKSssl..OO..llssRWO',
      '...OWRKSssl.OOOO.llssRWO',
      '...OWRKSsss...O..llssRWO',   // record dot (red light)
      '...OWRKSsssss..ssssssRWO',
      '...OWRKSsssRRRRRRssssRWO',   // REC band
      '...OWRKSsRRssssssRRssRWO',
      '...OWRKSRRssssssssRRsRWO',
      '...OWRKSsRRssssssRRssRWO',
      '...OWRKSssssRRRRsssssRWO',
      '...OOWRRRRRRRRRRRRRRWOO.',
      '....OOOWWWWWWWWWWWWOO...',
      '.......OOOOOOOOOOOO.....',
      '.........OOOOOOOO.......',
      '.........OWWWWWWO.......',
      '.........OOOOOOOO.......',
    ],
    palette: {
      O: PX24.night,
      W: PX24.cream,
      R: PX24.red,
      K: PX24.night,
      S: PX24.night2,
      s: PX24.night3,
      l: PX24.gold2,
    },
  },
  room: { // 陪看房 · 电视 + 沙发
    rows: [
      '........................',
      '..OOOOOOOOOOOOOOOOOOOO..',
      '..OWWWWWWWWWWWWWWWWWWO..',
      '..OWBBBBBBBBBBBBBBBBWO..',
      '..OWBbbbbbbbbbbbbbbbBWO.',
      '..OWBbGGGGGGGGGGGGGbBWO.',
      '..OWBbGRGGgggggGGGGbBWO.',
      '..OWBbGGGGgggggGGGGbBWO.',
      '..OWBbGGGGggWggGGGGbBWO.',
      '..OWBbGGggGGGGGGgGGbBWO.',
      '..OWBbGGGGGGGGGGGGGbBWO.',
      '..OWBbbbbbbbbbbbbbbbBWO.',
      '..OWBBBBBBBBBBBBBBBBWO..',
      '..OOOOOOOOOOOOOOOOOOOO..',
      '........................',
      '.....OOOOOOOOOOOOOO.....',
      '....OSSSSSSSSSSSSSSO....',
      '....OSssssssssssssSO....',
      '...OSsOOOOOOOOOOOOsSO...',
      '...OSsO..........OsSO...',
      '...OSsO..........OsSO...',
      '...OSsOOOOOOOOOOOOsSO...',
      '....OOssssssssssssOO....',
      '.....OOOOOOOOOOOOOO.....',
    ],
    palette: {
      O: PX24.night,
      W: PX24.night3,
      B: PX24.night0,
      b: PX24.blue0,
      G: PX24.green,
      g: PX24.green3,
      R: PX24.red,
      S: PX24.brown,
      s: PX24.brown2,
    },
  },
  rank: { // 48 国总榜 · 金杯
    rows: [
      '........................',
      '....OOOOOOOOOOOOOOOO....',
      '...OHHHHHHHHHHHHHHHHO...',
      '..OHGGGGGGGGGGGGGGGGHO..',
      '.OHGYYYYYYYYYYYYYYYYGHO.',
      'OHGYKYYYYYYYYYYYYYYKYGHO',
      'OHGYYYYYYYYYYYYYYYYYYGHO',
      'OHGYY48YYYYYYYYYYYKKYGHO',
      'OHGYYYYYYYYYYYYYYYYYYGHO',
      'OOHGYYYYYYYYYYYYYYYYGHOO',
      '.OHGYYYYYYYYYYYYYYYYGHO.',
      '..OHGYYYYYYYYYYYYYYGHO..',
      '...OHGYYYYYYYYYYYYGHO...',
      '....OHGGGGGYYYYGGGHO....',
      '......OHGGGGGGGHO.......',
      '........OHGGGHO.........',
      '.........OHGHO..........',
      '........OHYYYHO.........',
      '.......OHYYYYYHO........',
      '......OHYYYYYYYHO.......',
      '.....OOOOOOOOOOOOO......',
      '....OBBBBBBBBBBBBBO.....',
      '....OBBBBBBBBBBBBBO.....',
      '....OOOOOOOOOOOOOOO.....',
    ],
    palette: {
      O: PX24.night,
      H: PX24.gold3,
      G: PX24.gold,
      Y: PX24.gold2,
      K: PX24.red,
      B: PX24.brown,
    },
  },
  shoot: { // 射门 · 足球 + 网
    rows: [
      '.OOOOOOOOOOOOOOOOOOOOOO.',
      'OWWWWWWWWWWWWWWWWWWWWWWO',
      'OWNNNNNNNNNNNNNNNNNNNNWO',
      'OWNwNwNwNwNwNwNwNwNwNNWO',
      'OWNNNNNNNNNNNNNNNNNNNNWO',
      'OWNwNwNwNwNwNwNwNwNwNNWO',
      'OWNNNNNNNNNNNNNNNNNNNNWO',
      'OWNwNwNwNwNwNwNwNwNwNNWO',
      'OWNNNNNN.....NNNNNNNNNWO',
      'OWNNNNN.KKKKK.NNNNNNNNWO',
      'OWNNNN.WWKKKKW.NNNNNNNWO',
      'OWNwN.WWWWKWWWW.NwNwNNWO',
      'OWNNN.WKKWWKKKW.NNNNNNWO',
      'OWNNN.WKWWWWWKW.NNNNNNWO',
      'OWNNNN.WWKKWKW.NNNNNNNWO',
      'OWNwNNN.WWWWW.NwNwNwNNWO',
      'OWNNNNNN.....NNNNNNNNNWO',
      'OWNNNNNNNNNNNNNNNNNNNNWO',
      'OWNwNwNwNwNwNwNwNwNwNNWO',
      'OWNNNNNNNNNNNNNNNNNNNNWO',
      'OWWWWWWWWWWWWWWWWWWWWWWO',
      'OOOOOOOOOOOOOOOOOOOOOOOO',
      '........................',
      '........................',
    ],
    palette: {
      O: PX24.night,
      W: PX24.cream,
      N: PX24.night2,
      w: PX24.night3,
      K: PX24.night,
    },
  },
  battle: { // 组队对战 · 双拳交锋
    rows: [
      '........................',
      '........................',
      '...OOOOOO......OOOOOO...',
      '..ORRRRRRO....OBBBBBBO..',
      '.ORRhhhhRRO..OBBhhhhBBO.',
      'ORhhhhhhhRROOBBhhhhhhhBO',
      'ORhKKKhhhhRBBhhhhKKKhhBO',
      'ORhKKKhhhhRBBhhhhKKKhhBO',
      'ORhhhhhhhhRBBhhhhhhhhhBO',
      'ORhhhhhhhhRBBhhhhhhhhhBO',
      'OORhhhhhhhRBBhhhhhhhhBOO',
      '.OORRRRRRRR..BBBBBBBBBO.',
      '..OOR>>>>>>VS<<<<<<<BOO.',
      '...OOVVVVVVVVVVVVVVOO...',
      '....OOvvvvvvvvvvvvOO....',
      '.....OOsssssssssOO......',
      '......OOsssssssOO.......',
      '.......OOsssssOO........',
      '........OOsssOO.........',
      '.........OOsOO..........',
      '..........OOO...........',
      '........................',
      '........................',
      '........................',
    ],
    palette: {
      O: PX24.night,
      R: PX24.red,
      B: PX24.blue,
      h: PX24.cream,
      K: PX24.night,
      V: PX24.gold2,
      '>': PX24.gold3,
      '<': PX24.gold3,
      v: PX24.gold,
      s: PX24.gold0,
    },
  },
  chest: { // 宝箱（闭）· 8 色 · 盖 + 箱身 + 铜锁
    rows: [
      '........................',
      '........................',
      '.......ssss..ssss.......',
      '........ss....ss........',
      '...OOOOOOOOOOOOOOOOOO...',
      '..OBBBBBBBBBBBBBBBBBBO..',
      '..OBWWWWWWWWWWWWWWWWBO..',
      '..OBWbbbbbbbbbbbbbbWBO..',
      '..OBWbGGGGGGGGGGGGbWBO..',
      '..OBWbGyyyyyyyyyyGbWBO..',
      '..OBWbGyGGGGGGGGyGbWBO..',
      '..OBWbGGGGGGGGGGGGbWBO..',
      '..OBWbbbbbbbbbbbbbbWBO..',
      '..OOOOOOOOOOOOOOOOOOOO..',
      '..OBBBBBBBBBBBBBBBBBBO..',
      '..OBWbbbbbbLLLLbbbbbWBO.',
      '..OBWbBBBBBLLLLBBBBbWBO.',
      '..OBWbBGGGBBLLBBBGGBbWBO',
      '..OBWbBGyyGBLLBBGyyGBbWO',
      '..OBWbBGGGBBLLBBBGGBbWBO',
      '..OBWbBBBBBBLLBBBBBBbWBO',
      '..OBWbbbbbbbLLbbbbbbWBO.',
      '..OOOOOOOOOOOOOOOOOOOO..',
      '........................',
    ],
    palette: {
      O: PX24.night,
      B: PX24.brown,        // 外层深木
      b: PX24.brown2,       // 木主色
      W: '#A0732A',         // 木高光
      G: PX24.gold,         // 金饰
      y: PX24.gold3,        // 金高光
      L: PX24.gold2,        // 锁身金黄
      s: PX24.gold3,        // sparkle
    },
  },
  chest_open: { // 宝箱（开）· 盖翻起 · 内透金光
    rows: [
      '.....ssss....ssss.....ss',
      '....sss......ss.......s.',
      '.....s..ssss..ssss......',
      '.........s....ss........',
      '..OOOOOOOOOOOOOOOOOOOO..',  // 盖翻起后的轮廓
      '..OBbbbbbbbbbbbbbbbbbBO.',
      '..OBWWWWWWWWWWWWWWWWWBO.',
      '..OBWbbbbbbbbbbbbbbbbBO.',
      '..OBWbGGGGGGGGGGGGGGbBO.',
      '..OBWbGyyyyyyyyyyyyyGbO.',
      '..OBBBBBBBBBBBBBBBBBBO..',
      '........................',
      '..OOOOOOOOOOOOOOOOOOOO..',
      '..OBBBBBBBBBBBBBBBBBBO..',
      '..OBWbYYYYYYYYYYYYYbWBO.',   // 内部金光
      '..OBWbYffffffffffffYbWBO',
      '..OBWbYfYYYYYYYYYYfYbWBO',
      '..OBWbYfYGGGGGGGGYfYbWBO',
      '..OBWbYfYGyyyyyyGYfYbWBO',
      '..OBWbYfYGGGGGGGGYfYbWBO',
      '..OBWbYfYYYYYYYYYYfYbWBO',
      '..OBWbYYYYYYYYYYYYYbWBO.',
      '..OBWbbbbbbbbbbbbbbWBO..',
      '..OOOOOOOOOOOOOOOOOOOO..',
    ],
    palette: {
      O: PX24.night,
      B: PX24.brown,
      b: PX24.brown2,
      W: '#A0732A',
      G: PX24.gold,
      Y: PX24.gold2,
      y: PX24.gold3,
      f: PX24.cream,       // 最亮的金光
      s: PX24.gold3,       // sparkle
    },
  },
  predict: { // 比分竞猜 · 骰子 + 问号
    rows: [
      '........................',
      '....OOOOOOOOOOOOOOOO....',
      '...OHHHHHHHHHHHHHHHHO...',
      '..OHWWWWWWWWWWWWWWWWHO..',
      '.OHWWWWWWWWWWWWWWWWWWHO.',
      'OHWWWOOOOOWWWWWWOOOOOWHO',
      'OHWWOQQQQQOWWWWOQQQQQOHO',
      'OHWWOQQqQQOWWWWOQQqQQOHO',
      'OHWWOOOOOOOWWWWOOOOOOOHO',
      'OHWWWWWWWWWWWWWWWWWWWWHO',
      'OHWWWWWWWWWWWWWWWWWWWWHO',
      'OHWWWWWWWWWWQQQWWWWWWWHO',
      'OHWWWWWWWWWQQQQQWWWWWWHO',
      'OHWWWWWWWWWQQQQQWWWWWWHO',
      'OHWWWWWWWWWQQQQQWWWWWWHO',
      'OHWWOOOOOWWWWWWWQQQWWWHO',
      'OHWWOQQQQQOWWWWWQQWWWWHO',
      'OHWWOQQqQQOWWWWQQQWWWWHO',
      'OHWWOOOOOOOWWWWWWWWWWWHO',
      'OHWWWWWWWWWWWWWWWWWWWWHO',
      '.OHHHHHHHHHHHHHHHHHHHHHO',
      '..OHHHHHHHHHHHHHHHHHHHO.',
      '...OOOOOOOOOOOOOOOOOOO..',
      '........................',
    ],
    palette: {
      O: PX24.night,
      H: PX24.cream0,
      W: PX24.cream,
      Q: PX24.red,
      q: PX24.red0,
    },
  },
  speak: { // HelloTalk 世界杯 · 对话气泡 + 地球
    rows: [
      '........................',
      '.....OOOOOOOOOOOOOO.....',
      '....OBBBBBBBBBBBBBBO....',
      '...OBGGGGGGGGGGGGGGBO...',
      '..OBGBBBBBBBBBBBBBBGBO..',
      '..OBGBWWWWWWWWWWWWBGBO..',
      '..OBGBWWggWWWWWWggWBGBO.',
      '..OBGBWggRRgggRRggRWBGBO',
      '..OBGBWgRRRRgggRRRRWBGBO',
      '..OBGBWWggRRRRRggRWWBGBO',
      '..OBGBWWWggggggggWWWBGBO',
      '..OBGBWWWWWggggWWWWWBGBO',
      '..OBGBWWWWWWWWWWWWWWBGBO',
      '..OBGBBBBBBBBBBBBBBBGBO.',
      '..OBGGGGGGGGGGGGGGGGBO..',
      '..OBBBBBBBBBBBBBBBBBBO..',
      '...OO.....OOOOO.....OO..',
      '....OO..OOOO...OOOOOO...',   // 对话气泡尾巴
      '.....OOOO.........OO....',
      '........................',
      '........................',
      '........................',
      '........................',
      '........................',
    ],
    palette: {
      O: PX24.night,
      B: PX24.red,
      G: PX24.gold2,
      W: PX24.cream,
      g: PX24.blue2,
      R: PX24.green2,
    },
  },
};

function ActIcon({ kind, size = 60 }) {
  const def = ACT_ICONS[kind];
  if (!def) return <div style={{ width: size, height: size, background: PX24.cream0 }}/>;
  const cell = Math.max(1, Math.round(size / 24));
  return <ObSprite rows={def.rows} palette={def.palette} cell={cell}/>;
}

// 公共：顶部栏 · 浅底配色
function ObTopBar({ step, total, onBack, onSkip }) {
  return (
    <div style={{
      position: 'absolute', top: 18, left: 0, right: 0,
      padding: '0 18px',
      display: 'flex', alignItems: 'center', gap: 10,
      zIndex: 12,
    }}>
      {onBack ? (
        <div onClick={onBack} className="pixel-btn" style={{
          width: 30, height: 30, background: PX24.cream,
          border: `2px solid ${PX24.night}`, boxShadow: `2px 2px 0 ${PX24.red}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <PxIcon kind="back" size={14}/>
        </div>
      ) : <div style={{ width: 30 }}/>}
      <div style={{ flex: 1, display: 'flex', gap: 5 }}>
        {[...Array(total)].map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6,
            background: i < step ? PX24.red : 'rgba(26,26,62,0.15)',
            border: `1.5px solid ${i < step ? PX24.night : 'rgba(26,26,62,0.3)'}`,
          }}/>
        ))}
      </div>
      <div onClick={onSkip} className="pixel-btn" style={{
        background: PX24.cream, border: `2px solid ${PX24.night}`,
        color: PX24.night, padding: '6px 10px',
        boxShadow: `2px 2px 0 ${PX24.red}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 8,
        cursor: 'pointer', letterSpacing: 1,
      }}>SKIP ›</div>
    </div>
  );
}

function ObPrimaryBtn({ children, onClick, color = PX24.red, rainbow = false }) {
  // 彩虹硬阴影：淡粉→淡黄→淡绿→淡蓝→夜蓝 逐层 2px 堆叠
  const shadow = rainbow
    ? `2px 2px 0 #FFCDD2, 4px 4px 0 #FFF59D, 6px 6px 0 #C8E6C9, 8px 8px 0 #BBDEFB, 10px 10px 0 ${PX24.night}`
    : `4px 4px 0 ${PX24.night}`;
  return (
    <button onClick={onClick} className="pixel-btn" style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 12, color: '#fff', background: color,
      border: `3px solid ${PX24.night}`, padding: '14px 22px',
      boxShadow: shadow, cursor: 'pointer',
      letterSpacing: 1, textTransform: 'uppercase',
      minWidth: 180,
    }}>{children}</button>
  );
}

// ── E1 Splash · 全屏 splash.png 背景 · 中间留白区叠倒计时 + START ──
function ObSplash({ onNext, onSkip }) {
  const [t, setT] = React.useState({ d: 26, h: 18, m: 34, s: 12 });
  React.useEffect(() => {
    const id = setInterval(() => {
      setT(v => {
        let s = v.s - 1, m = v.m, h = v.h, d = v.d;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {/* 全屏背景图 · 奶白底像素插画（带 FIFA WORLD CUP 2026 logo / 国旗串 / 金杯 / 球员 / CHAMPIONS） */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('assets/onb/splash.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}/>

      {/* 内容层 · 叠在中间留白区（避开顶部 logo + flags 和底部 trophy + players） */}
      <div style={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 280, paddingBottom: 10,
        zIndex: 5,
      }}>
        {/* 倒计时卡 · 深底在浅图上高对比 */}
        <div style={{
          padding: '10px 14px',
          background: PX24.night, border: `3px solid ${PX24.gold2}`,
          boxShadow: `3px 3px 0 ${PX24.red}, 5px 5px 0 ${PX24.night}`,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX24.gold2, writingMode: 'vertical-rl', letterSpacing: 1,
          }}>距开幕</div>
          {[
            { v: String(t.d).padStart(2, '0'), l: 'DAY' },
            { v: String(t.h).padStart(2, '0'), l: 'HR' },
            { v: String(t.m).padStart(2, '0'), l: 'MIN' },
            { v: String(t.s).padStart(2, '0'), l: 'SEC' },
          ].map((x, i) => (
            <div key={i} style={{
              background: PX24.cream, color: PX24.night,
              padding: '6px 7px', minWidth: 36, textAlign: 'center',
              border: `2px solid ${PX24.gold2}`,
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13 }}>{x.v}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, marginTop: 2, opacity: 0.75 }}>{x.l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <ObPrimaryBtn color={PX24.red} rainbow onClick={onNext}>START · 入场</ObPrimaryBtn>
        </div>

        <div style={{
          marginTop: 14,
          padding: '4px 10px',
          background: PX24.gold3,
          border: `2px solid ${PX24.night}`,
          boxShadow: `2px 2px 0 ${PX24.red}`,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 11, color: PX24.night, fontWeight: 700,
          letterSpacing: 0.5,
        }}>本次入场约 30 秒 · 1/5 开场仪式</div>
      </div>

      {/* SKIP 右上角 · 浅底用深边 */}
      <div style={{
        position: 'absolute', top: 14, right: 18, zIndex: 12,
      }}>
        <div onClick={onSkip} className="pixel-btn" style={{
          background: PX24.cream, border: `2px solid ${PX24.night}`,
          color: PX24.night, padding: '6px 10px',
          boxShadow: `2px 2px 0 ${PX24.red}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          cursor: 'pointer', letterSpacing: 1,
        }}>SKIP ›</div>
      </div>
    </>
  );
}

// ── E2 选国 ──────────────────────────────────────────────────────
function ObCountry({ onBack, onNext, onSkip, country, setCountry }) {
  const [search, setSearch] = React.useState('');
  const filtered = OB_COUNTRY_POOL.filter(c => {
    const name = (OB_COUNTRY_META[c] || '').toLowerCase();
    return !search || c.includes(search.toLowerCase()) || name.includes(search.toLowerCase());
  });
  return (
    <>
      <ObTopBar step={1} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', height: '100%',
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 13,
          color: PX24.red, letterSpacing: 1, lineHeight: 1.4,
          textShadow: `2px 2px 0 ${PX24.gold3}`,
        }}>SELECT YOUR COUNTRY</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
          color: PX24.night, marginTop: 4, fontWeight: 700,
        }}>选一个作为你的阵营（进入后可改）</div>

        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
          background: '#fff', border: `3px solid ${PX24.night}`,
          boxShadow: `3px 3px 0 ${PX24.red}`, padding: '6px 10px',
        }}>
          <PxIcon kind="info" size={14}/>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="国家名 / 缩写"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: "'PingFang SC', sans-serif", fontSize: 13, color: PX24.night,
              fontWeight: 700,
            }}/>
        </div>

        <div style={{
          marginTop: 10, flex: 1, overflowY: 'auto',
          background: PX24.cream2,
          border: `2px solid ${PX24.night}`,
          boxShadow: `2px 2px 0 ${PX24.gold2}`,
          padding: 10,
        }} className="h-scroll">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6,
          }}>
            {filtered.map(c => (
              <div key={c} onClick={() => {
                setCountry(c);
                if (window.sfx) window.sfx.play('click_soft');
              }} style={{
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              }}>
                <ObFlag code={c} size={30} selected={country === c}/>
                <div style={{
                  fontFamily: "'PingFang SC', sans-serif", fontSize: 9,
                  color: country === c ? PX24.red : PX24.night,
                  fontWeight: country === c ? 800 : 700,
                }}>{OB_COUNTRY_META[c] || c.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 8, padding: '8px 10px',
          background: PX24.night, border: `2px solid ${PX24.gold2}`,
          boxShadow: `2px 2px 0 ${PX24.red}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <ObFlag code={country} size={28}/>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              color: PX24.gold2,
            }}>CURRENT TEAM</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 14,
              color: '#fff', fontWeight: 800, marginTop: 2,
            }}>{OB_COUNTRY_META[country] || country.toUpperCase()}</div>
          </div>
        </div>

        <div style={{
          marginTop: 6,
          fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
          color: '#555', lineHeight: 1.55, fontWeight: 600,
        }}>
          · 组队对战默认站队 · 礼物大厅默认国 · HelloTalk 头像国旗
        </div>

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
          <ObPrimaryBtn color={PX24.red} onClick={onNext}>下一步 →</ObPrimaryBtn>
        </div>
      </div>
    </>
  );
}

// ── E3 看/玩/送 ──────────────────────────────────────────────────
function ObGuide({ onBack, onNext, onSkip }) {
  const cards = [
    {
      kind: 'room',
      title: '看 · 聊',
      en: 'WATCH & TALK',
      items: ['每日焦点赛 · 陪看房', '官频开播 · 短视频'],
      color: PX24.blue2,
    },
    {
      kind: 'battle',
      title: '玩 · 冲榜',
      en: 'PLAY & RANK',
      items: ['射门玩法 · 48 国总榜', '组队对战 · 比分竞猜'],
      color: PX24.gold,
    },
    {
      kind: 'chest',
      title: '送 · 开箱',
      en: 'GIFT & CHEST',
      items: ['国家礼物大厅', '宝箱 · 福袋 · 结算开箱'],
      color: PX24.red,
    },
  ];
  return (
    <>
      <ObTopBar step={2} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', gap: 10, height: '100%',
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 13,
          color: PX24.red, letterSpacing: 1, lineHeight: 1.4,
          textShadow: `2px 2px 0 ${PX24.gold3}`,
        }}>THREE WAYS TO PLAY</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
          color: PX24.night, fontWeight: 700,
        }}>世界杯期间三条玩法线同时开放，不用选</div>

        {cards.map((c, i) => (
          <div key={i} style={{
            background: '#fff', border: `3px solid ${PX24.night}`,
            boxShadow: `4px 4px 0 ${c.color}`, padding: 10,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              flex: '0 0 auto',
              border: `2px solid ${PX24.night}`,
              background: PX24.cream, padding: 4,
            }}>
              <ActIcon kind={c.kind} size={56}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                color: c.color, letterSpacing: 1,
              }}>{c.en}</div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 17,
                fontWeight: 800, color: PX24.night, marginTop: 3,
              }}>{c.title}</div>
              <ul style={{
                margin: '5px 0 0 0', paddingLeft: 14,
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX24.night, fontWeight: 600, lineHeight: 1.5,
              }}>
                {c.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          </div>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
          <ObPrimaryBtn color={PX24.red} onClick={onNext}>看具体活动 →</ObPrimaryBtn>
        </div>
      </div>
    </>
  );
}

// ── E4 活动亮点 · 8 张卡 · 2×4 网格 ─────────────────────────────
function ObHighlights({ onBack, onNext, onSkip }) {
  const cards = [
    { kind: 'channel', label: '官频开播',       desc: '顶流嘉宾直播间',     color: PX24.green2 },
    { kind: 'room',    label: '陪看房',         desc: '多人看球聊球',       color: PX24.green },
    { kind: 'rank',    label: '48 国对抗总榜',  desc: '国家阵营实时',       color: PX24.gold },
    { kind: 'shoot',   label: '射门玩法',       desc: '4 阶段演示',          color: PX24.blue2 },
    { kind: 'battle',  label: '组队对战',       desc: '实时 PK 大场',       color: PX24.red },
    { kind: 'chest',   label: '宝箱 · 福袋',    desc: '结算大奖',            color: PX24.red0 },
    { kind: 'predict', label: '比分竞猜',       desc: '每日一猜',            color: PX24.orange },
    { kind: 'speak',   label: 'HelloTalk 赛季', desc: '语伴 + 任务链',       color: PX24.purple },
  ];
  return (
    <>
      <ObTopBar step={3} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 14, paddingRight: 14, paddingBottom: 8,
        display: 'flex', flexDirection: 'column', height: '100%',
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 12,
          color: PX24.red, letterSpacing: 1, lineHeight: 1.3,
          textShadow: `2px 2px 0 ${PX24.gold3}`,
        }}>WORLD CUP HIGHLIGHTS</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
          color: PX24.night, marginTop: 4, fontWeight: 700,
        }}>这次世界杯你能玩这些</div>

        <div style={{
          marginTop: 10, flex: 1, overflowY: 'auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
          alignContent: 'start',
        }} className="h-scroll">
          {cards.map((c, i) => (
            <div key={i} style={{
              background: PX24.cream,
              border: `3px solid ${PX24.night}`,
              boxShadow: `inset 4px 0 0 ${c.color}, 3px 3px 0 ${PX24.night0}`,
              padding: '10px 8px 8px 12px',
              display: 'flex', flexDirection: 'column', gap: 4,
              minHeight: 118,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: `2px solid ${PX24.night}`,
                padding: 3, alignSelf: 'center',
              }}>
                <ActIcon kind={c.kind} size={52}/>
              </div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
                fontWeight: 800, color: PX24.night,
                marginTop: 2, textAlign: 'center',
                lineHeight: 1.2,
              }}>{c.label}</div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 9,
                color: '#666', fontWeight: 600, textAlign: 'center',
                lineHeight: 1.3,
              }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 8, display: 'flex', justifyContent: 'center',
        }}>
          <ObPrimaryBtn color={PX24.red} onClick={onNext}>领取球迷证 →</ObPrimaryBtn>
        </div>
      </div>
    </>
  );
}

// ── E5 球迷证登记 ────────────────────────────────────────────────
function ObActivate({ onBack, onSkip, onDone, country }) {
  const [opened, setOpened] = React.useState(false);
  React.useEffect(() => {
    if (window.sfx && window.sfx.seq) {
      window.sfx.seq([
        { name: 'gift_boom', at: 0 },
        { name: 'firework_pop', at: 400 },
        { name: 'firework_pop', at: 700 },
      ]);
    }
    const id = setTimeout(() => setOpened(true), 1100);
    return () => clearTimeout(id);
  }, []);
  const name = OB_COUNTRY_META[country] || country.toUpperCase();
  return (
    <>
      <ObTopBar step={4} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 56, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        position: 'relative', height: '100%',
      }}>
        {/* 富色宝箱（24×24 SVG · 8 色分层 · 闭/开两态） */}
        <div style={{
          position: 'relative', marginTop: 4, width: 144, height: 144,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: opened ? 'none' : 'chestShake 1s steps(6, end) infinite',
        }}>
          <ActIcon kind={opened ? 'chest_open' : 'chest'} size={140}/>
          {opened && (
            <div style={{
              position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: 80, height: 30,
                background: 'radial-gradient(ellipse at center, rgba(255,245,157,0.95) 0%, rgba(255,215,0,0.6) 40%, transparent 70%)',
                filter: 'blur(1px)',
              }}/>
            </div>
          )}
        </div>

        {/* 彩色碎屑 */}
        {opened && (
          <div style={{
            position: 'absolute', top: 60, left: 0, right: 0, height: 140,
            pointerEvents: 'none', overflow: 'visible',
          }}>
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 30 + (i * 37) % 80;
              const dx = ((i * 17) % 200) - 100;
              const colors = [PX24.gold2, PX24.red2, PX24.green2, PX24.blue2, PX24.purple2, PX24.orange2, PX24.pink];
              const color = colors[i % colors.length];
              const delay = (i * 80) + 'ms';
              return (
                <div key={i} className="confetti-fall" style={{
                  position: 'absolute', top: 0, left: `${x}%`,
                  width: 6, height: 6, background: color,
                  border: `1px solid ${PX24.night}`,
                  '--dx': `${dx}px`, animationDelay: delay,
                }}/>
              );
            })}
          </div>
        )}

        {/* 球迷证本 */}
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center', marginTop: 6,
        }}>
          <div style={{
            width: 84, height: 108,
            background: `linear-gradient(${PX24.red}, ${PX24.red0})`,
            border: `3px solid ${PX24.night}`,
            boxShadow: `3px 3px 0 ${PX24.gold2}`,
            padding: 6, position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              color: PX24.gold2, marginTop: 2, letterSpacing: 1,
            }}>FAN PASS</div>
            <div style={{ marginTop: 4 }}>
              <ObFlag code={country} size={36}/>
            </div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              color: '#fff', fontWeight: 800, marginTop: 6,
            }}>{name}</div>
            <div style={{
              marginTop: 'auto', width: '100%', height: 6,
              background: PX24.gold2, borderTop: `1px solid ${PX24.night}`,
            }}/>
          </div>
          <div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 11,
              color: PX24.red, letterSpacing: 1,
              textShadow: `2px 2px 0 ${PX24.gold3}`,
            }}>FAN PASS · REGISTERED</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 17,
              fontWeight: 800, color: PX24.night, marginTop: 4,
            }}>球迷证已登记</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              color: '#666', marginTop: 3, fontWeight: 600,
            }}>付费通行证在 P10 内另行开通</div>
          </div>
        </div>

        <div style={{
          marginTop: 4, width: '100%', background: PX24.cream,
          border: `3px solid ${PX24.night}`, boxShadow: `3px 3px 0 ${PX24.gold2}`,
          padding: 12,
        }}>
          {[
            { k: '玩法', v: '全线开放（看/玩/送）' },
            { k: '首登礼包', v: '100 积分' },
            { k: '首日加成', v: '×3 贡献（24 小时）' },
            { k: '可进入', v: 'HelloTalk 世界杯赛季中枢' },
            { k: '付费通行证', v: 'P10 内可选购' },
          ].map((r, i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '5px 0',
              borderBottom: i < arr.length - 1 ? `1px dashed rgba(26,26,62,0.15)` : 'none',
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
              fontWeight: 700, color: PX24.night,
            }}>
              <span style={{ color: '#666', fontWeight: 600 }}>{r.k}</span>
              <span>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 6 }}>
          <ObPrimaryBtn color={PX24.red} onClick={onDone}>进入世界杯主会场 →</ObPrimaryBtn>
        </div>
      </div>
    </>
  );
}

// ── 主 Onboarding 组件（5 屏路由） ───────────────────────────────
function Onboarding({ onClose }) {
  const [step, setStep] = React.useState(0);
  const [country, setCountry] = React.useState(() => {
    try { return localStorage.getItem('wc_country') || 'cn'; } catch (e) { return 'cn'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('wc_country', country); } catch (e) {}
  }, [country]);

  const next = () => {
    if (window.sfx) window.sfx.play('click_soft');
    setStep(s => s + 1);
  };
  const back = () => {
    if (window.sfx) window.sfx.play('click_soft');
    setStep(s => Math.max(0, s - 1));
  };
  const skip = () => {
    if (window.sfx) window.sfx.play('click_soft');
    onClose();
  };
  const done = () => {
    if (window.sfx) window.sfx.play('page_in');
    try { localStorage.setItem('wc_onboarded', '1'); } catch (e) {}
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: `
        radial-gradient(circle at 20% 20%, #2a1550 0%, transparent 55%),
        radial-gradient(circle at 80% 70%, #3b0d2a 0%, transparent 55%),
        #0a0a1a
      `,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'modalSlideUp 380ms steps(8, end)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(1.5px 1.5px at 10% 20%, #fff9 0 1.5px, transparent 2px),
          radial-gradient(1.5px 1.5px at 80% 10%, #fff7 0 1.5px, transparent 2px),
          radial-gradient(1.5px 1.5px at 40% 80%, #fff6 0 1.5px, transparent 2px),
          radial-gradient(1.5px 1.5px at 65% 40%, #fff8 0 1.5px, transparent 2px),
          radial-gradient(1.5px 1.5px at 20% 60%, #fff5 0 1.5px, transparent 2px),
          radial-gradient(1.5px 1.5px at 90% 55%, #fff6 0 1.5px, transparent 2px)
        `,
        backgroundSize: '260px 260px',
        animation: 'blink 2.4s steps(2, end) infinite',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'relative',
        width: 'min(92vw, 460px)',
        height: 'min(88dvh, 700px)',
        background: `linear-gradient(${PX24.cream2} 0%, ${PX24.cream} 50%, ${PX24.cream0} 100%)`,
        border: `4px solid ${PX24.gold2}`,
        boxShadow: `6px 6px 0 ${PX24.red}, 10px 10px 0 rgba(0,0,0,0.6)`,
        overflow: 'hidden',
        color: PX24.night,
      }}>
        {step === 0 && <ObSplash onNext={next} onSkip={skip}/>}
        {step === 1 && <ObCountry onBack={back} onNext={next} onSkip={skip}
                                   country={country} setCountry={setCountry}/>}
        {step === 2 && <ObGuide onBack={back} onNext={next} onSkip={skip}/>}
        {step === 3 && <ObHighlights onBack={back} onNext={next} onSkip={skip}/>}
        {step === 4 && <ObActivate onBack={back} onSkip={skip} onDone={done} country={country}/>}
      </div>
    </div>
  );
}

Object.assign(window, { Onboarding });
