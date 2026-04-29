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

function ObArtPage({ bg, children }) {
  return (
    <div className="ob-art-page">
      <style>{`
        .ob-art-page {
          position: absolute;
          inset: 0;
          overflow: hidden;
          color: ${PX24.night};
          font-family: 'PingFang SC', system-ui, sans-serif;
          background: #0b6fc8;
        }
        .ob-art-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }
        .ob-art-page::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,0) 24%, rgba(0,80,34,.08) 100%);
          z-index: 1;
        }
        .ob-art-content {
          position: relative;
          z-index: 5;
        }
        .ob-art-card {
          background: rgba(255,255,255,.9) !important;
          border-color: rgba(6,29,59,.78) !important;
          border-radius: 22px !important;
          box-shadow: 0 10px 24px rgba(8,37,76,.18) !important;
          backdrop-filter: blur(5px);
        }
      `}</style>
      <img className="ob-art-bg" src={bg} alt="" />
      {children}
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

function ObLanguageChip({ children, color = PX24.gold2 }) {
  return (
    <div style={{
      padding: '5px 7px',
      background: 'rgba(255,248,231,0.96)',
      border: `2px solid ${PX24.night}`,
      boxShadow: `2px 2px 0 ${color}`,
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 7,
      color: PX24.night,
      whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}

function ObChatNode({ code, label, text, x, y, color = PX24.gold2, flip = false }) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexDirection: flip ? 'row-reverse' : 'row',
    }}>
      <div style={{
        width: 34,
        height: 34,
        background: PX24.cream,
        border: `2px solid ${PX24.night}`,
        boxShadow: `2px 2px 0 ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ObFlag code={code} size={22}/>
      </div>
      <div style={{
        minWidth: 74,
        background: PX24.cream2,
        border: `2px solid ${PX24.night}`,
        boxShadow: `2px 2px 0 ${PX24.night}`,
        padding: '5px 7px',
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 6,
          color,
          marginBottom: 3,
        }}>{label}</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 10,
          color: PX24.night,
          fontWeight: 800,
          lineHeight: 1.25,
        }}>{text}</div>
      </div>
    </div>
  );
}

function ObWorldSignalBoard() {
  const nodes = [
    { code: 'cn', label: 'ZH', text: '一起看球', x: '24%', y: '30%', color: PX24.red2 },
    { code: 'br', label: 'PT', text: 'Vamos!', x: '76%', y: '32%', color: PX24.green3, flip: true },
    { code: 'jp', label: 'JA', text: '応援しよう', x: '21%', y: '72%', color: PX24.blue3 },
    { code: 'es', label: 'ES', text: 'Golazo', x: '78%', y: '70%', color: PX24.orange2, flip: true },
  ];
  return (
    <div style={{
      position: 'relative',
      height: 246,
      marginTop: 10,
      background: `linear-gradient(180deg, ${PX24.night} 0%, #14254F 58%, #1B5E20 100%)`,
      border: `4px solid ${PX24.night}`,
      boxShadow: `5px 5px 0 ${PX24.red0}`,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.42,
        backgroundImage: `
          linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255,255,255,0.10) 1px, transparent 1px)
        `,
        backgroundSize: '18px 18px',
      }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '49%',
        transform: 'translate(-50%, -50%)',
        width: 182,
        height: 112,
      }}>
        <div style={{ position: 'absolute', left: 4, top: 18, width: 44, height: 28, background: PX24.green2, border: `2px solid ${PX24.night}` }} />
        <div style={{ position: 'absolute', left: 42, top: 34, width: 38, height: 34, background: PX24.green, border: `2px solid ${PX24.night}` }} />
        <div style={{ position: 'absolute', left: 75, top: 22, width: 24, height: 26, background: PX24.green3, border: `2px solid ${PX24.night}` }} />
        <div style={{ position: 'absolute', left: 102, top: 30, width: 50, height: 30, background: PX24.green2, border: `2px solid ${PX24.night}` }} />
        <div style={{ position: 'absolute', left: 142, top: 53, width: 22, height: 22, background: PX24.green, border: `2px solid ${PX24.night}` }} />
        <div style={{ position: 'absolute', left: 78, top: 72, width: 36, height: 24, background: PX24.green, border: `2px solid ${PX24.night}` }} />
      </div>
      <svg width="100%" height="100%" viewBox="0 0 320 246" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
        <path d="M160 126 L78 74 L70 178 L242 76 L246 172 Z"
          fill="none" stroke={PX24.gold2} strokeWidth="2" strokeDasharray="7 5" opacity="0.9"/>
        <path d="M160 126 L82 176 M160 126 L240 170"
          fill="none" stroke={PX24.blue3} strokeWidth="2" strokeDasharray="5 5" opacity="0.75"/>
      </svg>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '49%',
        transform: 'translate(-50%, -50%)',
        width: 76,
        height: 76,
        background: PX24.cream,
        border: `3px solid ${PX24.night}`,
        boxShadow: `4px 4px 0 ${PX24.gold2}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActIcon kind="speak" size={60}/>
      </div>
      {nodes.map((node) => <ObChatNode key={node.code} {...node}/>)}
      <div style={{
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        display: 'flex',
        gap: 5,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <ObLanguageChip color={PX24.red2}>EN</ObLanguageChip>
        <ObLanguageChip color={PX24.gold2}>中文</ObLanguageChip>
        <ObLanguageChip color={PX24.blue3}>ES</ObLanguageChip>
        <ObLanguageChip color={PX24.green3}>PT</ObLanguageChip>
        <ObLanguageChip color={PX24.orange2}>日本語</ObLanguageChip>
      </div>
    </div>
  );
}

function WcCss() {
  return (
    <style>{`
      .wc-html-splash {
        position: absolute;
        inset: 0;
        overflow: hidden;
        container-type: inline-size;
        background: #46b6ee;
        color: #061d3b;
        font-family: 'PingFang SC', system-ui, sans-serif;
        animation: wcSkyBreathe 9s ease-in-out infinite alternate;
        transform: translateZ(0);
      }
      .wc-html-splash::before {
        display: none;
      }
      .wc-html-splash::after {
        display: none;
      }
      .wc-bg-photo {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        opacity: 1;
        filter: saturate(1.02) brightness(1.01);
        animation: wcBgPhotoDrift 18s ease-in-out infinite alternate;
        pointer-events: none;
        z-index: 0;
      }
      .wc-stadium {
        display: none;
      }
      .wc-lights {
        display: none;
      }
      .wc-lights.left { left: -2%; top: 30%; transform: rotate(-16deg); }
      .wc-lights.right { right: -2%; top: 30%; transform: rotate(16deg); }
      .wc-ribbon {
        position: absolute;
        height: var(--h, 2.2%);
        border-radius: 999px;
        opacity: .92;
        background: var(--color);
        box-shadow:
          inset 0 2px 0 rgba(255,255,255,.28),
          inset 0 -3px 5px rgba(0,0,0,.12),
          0 7px 14px rgba(0,0,0,.16);
        transform-origin: center;
        animation: wcRibbonFloat var(--dur, 5.8s) ease-in-out infinite;
        animation-delay: var(--d, 0ms);
        z-index: 2;
      }
      .wc-ribbon::before {
        content: '';
        position: absolute;
        inset: 8% 5%;
        border-radius: inherit;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
        opacity: .55;
        transform: translateX(var(--shine, -18%));
        animation: wcRibbonShine 3.8s ease-in-out infinite;
        animation-delay: var(--d, 0ms);
      }
      .wc-ribbon.red-a { left: -19%; top: 8.5%; width: 42%; --h: 2.45%; --color: #ee3a43; --rot: 52deg; transform: rotate(var(--rot)); }
      .wc-ribbon.blue-a { left: 24%; top: 14.2%; width: 29%; --h: 2.6%; --color: #1678d6; --rot: -17deg; transform: rotate(var(--rot)); --d: -900ms; --dur: 6.4s; }
      .wc-ribbon.yellow-a { right: 16%; top: 17.1%; width: 30%; --h: 2.35%; --color: #ffd12d; --rot: 24deg; transform: rotate(var(--rot)); --d: -1500ms; --dur: 6.8s; }
      .wc-ribbon.red-b { right: -16%; top: 10.5%; width: 47%; --h: 2.65%; --color: #f05055; --rot: -22deg; transform: rotate(var(--rot)); --d: -400ms; --dur: 6.1s; }
      .wc-ribbon.yellow-c { right: -15%; top: 23.7%; width: 38%; --h: 2.25%; --color: #f1c42a; --rot: -21deg; transform: rotate(var(--rot)); --d: -1900ms; --dur: 7s; }
      .wc-ribbon.blue-c { left: -7%; top: 37.8%; width: 25%; --h: 1.8%; --color: #1491e8; --rot: -24deg; transform: rotate(var(--rot)); --d: -1300ms; --dur: 5.9s; }
      .wc-ribbon.red-c { left: -12%; top: 39.8%; width: 28%; --h: 2.15%; --color: #ec4755; --rot: -18deg; transform: rotate(var(--rot)); --d: -700ms; --dur: 6.7s; }
      .wc-ribbon.green-b { left: -13%; bottom: 11%; width: 43%; --h: 2.8%; --color: #67c957; --rot: 33deg; transform: rotate(var(--rot)); --d: -1800ms; --dur: 6.3s; z-index: 5; }
      .wc-ribbon.blue-b { left: -10%; bottom: 5.6%; width: 44%; --h: 3%; --color: #0d86e7; --rot: 39deg; transform: rotate(var(--rot)); --d: -1100ms; --dur: 6.6s; z-index: 6; }
      .wc-ribbon.red-d { right: -12%; bottom: 16%; width: 31%; --h: 2.5%; --color: #f14d5f; --rot: -45deg; transform: rotate(var(--rot)); --d: -600ms; --dur: 6.2s; z-index: 6; }
      .wc-ribbon.gold-b { right: -9%; bottom: 4.5%; width: 56%; --h: 2.8%; --color: #efbd28; --rot: -29deg; transform: rotate(var(--rot)); --d: -2300ms; --dur: 7.2s; z-index: 6; }
      .wc-ribbon.pink-b { right: -10%; bottom: 13.6%; width: 35%; --h: 2.3%; --color: #ffb9c7; --rot: -42deg; transform: rotate(var(--rot)); --d: -700ms; --dur: 6.9s; z-index: 6; }
      .wc-confetti {
        position: absolute;
        width: var(--w);
        height: var(--h);
        left: var(--x);
        top: var(--y);
        background: var(--c);
        transform: rotate(var(--r));
        border-radius: 1px;
        opacity: .88;
        animation: wcConfettiFall var(--dur, 7s) linear infinite;
        animation-delay: var(--d, 0s);
        z-index: 6;
      }
      .wc-logo {
        position: absolute;
        left: 5.2%;
        top: 3.75%;
        display: flex;
        align-items: center;
        gap: 2.2%;
        width: 42%;
        font-weight: 900;
        letter-spacing: -.03em;
        animation: wcDropIn 640ms cubic-bezier(.16,1,.3,1) both;
        z-index: 9;
      }
      .wc-logo-mark {
        width: 8.4%;
        aspect-ratio: 1;
        border-radius: 50%;
        background:
          radial-gradient(circle at 52% 55%, #ffd730 0 5%, transparent 6%),
          radial-gradient(circle at 35% 28%, #37a9ff 0 5%, transparent 6%),
          radial-gradient(circle at 67% 31%, #ef3554 0 5%, transparent 6%),
          radial-gradient(circle at 28% 66%, #18ba74 0 5%, transparent 6%),
          #081d39;
        box-shadow: inset 0 0 0 2px rgba(255,255,255,.75);
      }
      .wc-logo-text { font-size: 5.3cqw; line-height: 1; }
      .wc-logo-sep { width: 1px; height: 22px; background: rgba(6,29,59,.7); }
      .wc-cup-lockup { display: flex; align-items: center; gap: 5%; width: 36%; font-size: 1.75cqw; font-weight: 900; line-height: 1.05; }
      .wc-trophy-icon { font-size: 4.4cqw; line-height: 1; }
      .wc-skip {
        position: absolute;
        right: 5.1%;
        top: 3.18%;
        width: 14.3%;
        height: 4.55%;
        border: 2px solid rgba(255,255,255,.9);
        border-radius: 999px;
        background: rgba(255,255,255,.72);
        box-shadow: 0 6px 16px rgba(0,61,111,.18);
        color: #102744;
        font-size: 2.45cqw;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8%;
        cursor: pointer;
        animation: wcDropIn 700ms 90ms cubic-bezier(.16,1,.3,1) both, wcSkipPulse 2.8s ease-in-out 1.2s infinite;
        z-index: 10;
      }
      .wc-bubble {
        position: absolute;
        padding: 1.3% 2.4%;
        border-radius: 22px;
        border: 3px solid rgba(255,255,255,.88);
        color: #fff;
        font-size: 3.3cqw;
        font-weight: 900;
        box-shadow: 0 7px 18px rgba(0,68,126,.18);
        transform: rotate(var(--rot, 0deg));
        text-shadow: 0 2px 0 rgba(0,0,0,.08);
        animation: wcBubblePop 720ms cubic-bezier(.16,1,.3,1) both, wcBubbleFloat 4.5s ease-in-out 1s infinite;
        animation-delay: var(--d, 0ms), calc(var(--d, 0ms) + 900ms);
        z-index: 7;
      }
      .wc-bubble::after {
        content: '';
        position: absolute;
        left: 22%;
        bottom: -15%;
        width: 18%;
        height: 26%;
        background: inherit;
        border-left: 3px solid rgba(255,255,255,.88);
        border-bottom: 3px solid rgba(255,255,255,.88);
        transform: rotate(-28deg);
        border-bottom-left-radius: 9px;
      }
      .wc-hero-card {
        position: absolute;
        left: 4.3%;
        top: 16.7%;
        width: 91.4%;
        height: 25.2%;
        background:
          radial-gradient(ellipse at 50% 52%, rgba(255,255,255,.98) 0 46%, rgba(242,244,246,.98) 69%, rgba(255,255,255,.88) 100%);
        border-radius: 8% 8% 12% 12% / 18% 18% 16% 16%;
        box-shadow: 0 9px 24px rgba(14,74,118,.22);
        transform: rotate(-1.5deg);
        animation: wcBannerRise 760ms 160ms cubic-bezier(.16,1,.3,1) both, wcBannerSway 5s ease-in-out 1s infinite;
        z-index: 3;
      }
      .wc-hero-card::before,
      .wc-hero-card::after {
        content: '';
        position: absolute;
        left: 1.5%;
        right: 1.5%;
        height: 8%;
        border-radius: 50%;
        border-top: 2px solid rgba(193,203,215,.5);
      }
      .wc-hero-card::before { top: 2.2%; }
      .wc-hero-card::after { bottom: 2.2%; border-top: 0; border-bottom: 2px solid rgba(193,203,215,.55); }
      .wc-title-banner {
        position: absolute;
        left: -3.6%;
        top: 14.8%;
        width: 107.2%;
        height: auto;
        pointer-events: none;
        filter: drop-shadow(0 9px 18px rgba(14,74,118,.18));
        transform: rotate(-1.5deg);
        animation: wcBannerRise 760ms 160ms cubic-bezier(.16,1,.3,1) both, wcBannerSway 5s ease-in-out 1s infinite;
        z-index: 4;
      }
      .wc-title-hello {
        position: absolute;
        left: 27%;
        top: 19.4%;
        font-size: 7.6cqw;
        line-height: 1;
        font-weight: 950;
        letter-spacing: -.055em;
        color: #061d3b;
        transform: rotate(1deg);
        animation: wcTextReveal 700ms 300ms cubic-bezier(.16,1,.3,1) both;
        z-index: 4;
      }
      .wc-title-world {
        position: absolute;
        left: 17.5%;
        top: 25.1%;
        font-size: 11.4cqw;
        line-height: .93;
        font-weight: 950;
        letter-spacing: -.035em;
        color: #188a25;
        transform: rotate(1deg);
        text-shadow: 0 2px 0 rgba(255,255,255,.45);
        animation: wcTextReveal 760ms 390ms cubic-bezier(.16,1,.3,1) both, wcTitlePulse 2.6s ease-in-out 1.3s infinite;
        z-index: 4;
      }
      .wc-ball-title {
        position: absolute;
        right: 21.2%;
        top: 30.2%;
        width: 8.5%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #fff url('assets/welcome/ball.png') center / cover no-repeat;
        border: 2px solid rgba(0,0,0,.18);
        box-shadow: 0 4px 8px rgba(0,0,0,.18);
        animation: wcBallSpin 5s linear infinite;
        z-index: 5;
      }
      .wc-subtitle {
        position: absolute;
        left: 28%;
        top: 35.3%;
        color: #081d39;
        font-size: 4.1cqw;
        font-weight: 900;
        letter-spacing: .18em;
        transform: rotate(1deg);
        animation: wcTextReveal 680ms 480ms cubic-bezier(.16,1,.3,1) both;
        z-index: 4;
      }
      .wc-subtitle b { color: #158126; }
      .wc-countdown {
        position: absolute;
        left: 11%;
        top: 43.6%;
        width: 78%;
        height: 11.3%;
        border-radius: 28px;
        background: rgba(255,255,255,.94);
        box-shadow: 0 10px 26px rgba(18,86,43,.18);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: wcPanelLift 760ms 560ms cubic-bezier(.16,1,.3,1) both;
        z-index: 5;
      }
      .wc-count-title {
        display: flex;
        align-items: center;
        gap: 14px;
        color: #147d27;
        font-size: 4.2cqw;
        font-weight: 950;
        line-height: 1;
        margin-bottom: 3%;
      }
      .wc-burst {
        width: 15px;
        height: 15px;
        background:
          linear-gradient(90deg, transparent 40%, var(--c) 40% 60%, transparent 60%),
          linear-gradient(0deg, transparent 40%, var(--c) 40% 60%, transparent 60%);
        transform: rotate(28deg);
      }
      .wc-count-row {
        width: 80%;
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
        align-items: center;
        gap: 3.5%;
      }
      .wc-count-box {
        height: 100%;
        min-height: 58px;
        border: 1px solid rgba(6,29,59,.12);
        border-radius: 12px;
        background: linear-gradient(180deg, #fff, #f7fbfb);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .wc-count-num { color: #137322; font-size: 7.1cqw; font-weight: 950; line-height: 1; }
      .wc-count-label { margin-top: 4%; color: #071b36; font-size: 2.45cqw; font-weight: 800; }
      .wc-count-colon { color: #071b36; font-size: 5.3cqw; font-weight: 900; }
      .wc-field {
        position: absolute;
        left: -4%;
        right: -4%;
        bottom: 8.4%;
        height: 41.2%;
        background: transparent;
        border-radius: 50% 50% 0 0 / 18% 18% 0 0;
        overflow: hidden;
        box-shadow: none;
        animation: wcFieldLift 820ms 620ms cubic-bezier(.16,1,.3,1) both;
        z-index: 1;
      }
      .wc-field-photo {
        display: none;
      }
      .wc-field::before {
        display: none;
      }
      .wc-field::after {
        display: none;
      }
      .wc-world-map {
        display: none;
      }
      .wc-avatar {
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: 13.4%;
        aspect-ratio: 1;
        border: 3px solid rgba(255,255,255,.95);
        border-radius: 50%;
        background: var(--bg);
        box-shadow: 0 7px 18px rgba(5,42,35,.3);
        transform: translate(-50%, -50%);
        overflow: hidden;
        animation: wcFanFloat 4.2s ease-in-out infinite;
        animation-delay: var(--d, 0ms);
        z-index: 6;
      }
      .wc-avatar.has-photo::before,
      .wc-avatar.has-photo::after { display: none; }
      .wc-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .wc-avatar::before {
        content: '';
        position: absolute;
        left: 27%;
        top: 23%;
        width: 46%;
        height: 51%;
        border-radius: 50% 50% 45% 45%;
        background: var(--skin);
        box-shadow: inset 0 -6px 0 rgba(0,0,0,.06);
      }
      .wc-avatar::after {
        content: '';
        position: absolute;
        left: 23%;
        top: 17%;
        width: 54%;
        height: 28%;
        border-radius: 50% 50% 35% 35%;
        background: var(--hair);
      }
      .wc-shirt {
        position: absolute;
        left: 24%;
        right: 24%;
        bottom: 7%;
        height: 28%;
        border-radius: 999px 999px 12px 12px;
        background: var(--shirt);
      }
      .wc-flag-dot {
        position: absolute;
        right: -8%;
        bottom: -8%;
        width: 34%;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 3px solid #fff;
        background: var(--flag);
        box-shadow: 0 3px 8px rgba(0,0,0,.2);
      }
      .wc-chat {
        position: absolute;
        left: var(--cx);
        top: var(--cy);
        padding: 1.1% 2.1%;
        border-radius: 11px;
        background: rgba(255,255,255,.9);
        color: #162237;
        font-size: 2.15cqw;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(20,70,42,.13);
        animation: wcChatFloat 4s ease-in-out infinite;
        animation-delay: var(--d, 0ms);
        z-index: 7;
      }
      .wc-chat::after {
        content: '';
        position: absolute;
        left: 18%;
        bottom: -7px;
        border-width: 8px 7px 0 0;
        border-style: solid;
        border-color: rgba(255,255,255,.9) transparent transparent transparent;
      }
      .wc-dash {
        position: absolute;
        border-top: 2px dashed rgba(255,255,255,.82);
        transform-origin: left center;
        opacity: .95;
        animation: wcRoutePulse 2.6s ease-in-out infinite;
        animation-delay: var(--d, 0ms);
        z-index: 4;
      }
      .wc-cta {
        position: absolute;
        left: 22.5%;
        bottom: 12%;
        width: 55%;
        height: 6.95%;
        border: 5px solid #3e9d2f;
        border-radius: 999px;
        background: rgba(255,255,255,.96);
        box-shadow: 0 9px 24px rgba(9,72,23,.28), inset 0 0 0 2px rgba(255,255,255,.7);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3.3%;
        cursor: pointer;
        animation: wcCtaPop 760ms 900ms cubic-bezier(.16,1,.3,1) both, wcCtaBreathe 1.9s ease-in-out 1.7s infinite;
        z-index: 8;
      }
      .wc-cta:hover { transform: translateY(-2px) scale(1.015); }
      .wc-cta:active { transform: translateY(1px) scale(.985); }
      .wc-cta-ball {
        width: 15%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #fff url('assets/welcome/ball.png') center / cover no-repeat;
        box-shadow: 0 3px 8px rgba(0,0,0,.25);
        animation: wcBallSpin 3.2s linear infinite;
      }
      .wc-cta-text { color: #167b20; font-size: 6cqw; font-weight: 950; letter-spacing: .05em; }
      .wc-cta-arrow {
        width: 13%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #459f30;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7cqw;
        font-weight: 900;
      }
      .wc-feature-bar {
        position: absolute;
        left: 3.8%;
        right: 3.8%;
        bottom: 2.4%;
        height: 7.5%;
        border: 1px solid rgba(255,255,255,.25);
        border-radius: 22px;
        background: rgba(7,75,42,.5);
        backdrop-filter: blur(10px);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        overflow: hidden;
        animation: wcPanelLift 760ms 1040ms cubic-bezier(.16,1,.3,1) both;
        z-index: 8;
      }
      .wc-feature {
        display: grid;
        grid-template-columns: 28% 1fr;
        align-items: center;
        gap: 4%;
        padding: 0 9%;
        color: #fff;
        border-right: 1px solid rgba(255,255,255,.24);
        animation: wcFeatureIn 620ms cubic-bezier(.16,1,.3,1) both;
      }
      .wc-feature:nth-child(1) { animation-delay: 1120ms; }
      .wc-feature:nth-child(2) { animation-delay: 1240ms; }
      .wc-feature:nth-child(3) { animation-delay: 1360ms; }
      .wc-feature:last-child { border-right: 0; }
      .wc-feature-icon { font-size: 6.4cqw; line-height: 1; }
      .wc-feature-title { font-size: 2.7cqw; font-weight: 950; white-space: nowrap; }
      .wc-feature-copy { font-size: 1.85cqw; opacity: .88; margin-top: 3%; white-space: nowrap; }
      @media (max-height: 760px) {
        .wc-count-box { min-height: 46px; }
      }
      @keyframes wcSkyBreathe {
        from { filter: saturate(1) brightness(1); }
        to { filter: saturate(1.12) brightness(1.05); }
      }
      @keyframes wcSunSweep {
        from { transform: translateX(-4%) rotate(-18deg); opacity: .55; }
        to { transform: translateX(8%) rotate(-12deg); opacity: .78; }
      }
      @keyframes wcStadiumDrift {
        from { transform: translateX(-.8%) scale(1.01); }
        to { transform: translateX(.8%) scale(1.025); }
      }
      @keyframes wcBgPhotoDrift {
        from { transform: translate3d(-.35%, 0, 0) scale(1.006); }
        to { transform: translate3d(.35%, -.25%, 0) scale(1.012); }
      }
      @keyframes wcLightsPulse {
        from { opacity: .55; filter: blur(.2px) brightness(1); }
        to { opacity: .95; filter: blur(.2px) brightness(1.35); }
      }
      @keyframes wcRibbonFloat {
        0%, 100% { transform: translate3d(0,0,0) rotate(var(--rot)) skewX(-7deg); }
        35% { transform: translate3d(2.8%, -10%, 0) rotate(calc(var(--rot) + 2.2deg)) skewX(7deg); }
        70% { transform: translate3d(-1.2%, 4%, 0) rotate(calc(var(--rot) - 1deg)) skewX(-4deg); }
      }
      @keyframes wcRibbonShine {
        0%, 100% { transform: translateX(-36%); opacity: .28; }
        50% { transform: translateX(42%); opacity: .7; }
      }
      @keyframes wcConfettiFall {
        from { transform: translate3d(0, -8px, 0) rotate(var(--r)); }
        to { transform: translate3d(12px, 96px, 0) rotate(calc(var(--r) + 190deg)); }
      }
      @keyframes wcDropIn {
        from { transform: translate3d(0, -18px, 0) scale(.96); }
        to { transform: translate3d(0,0,0) scale(1); }
      }
      @keyframes wcSkipPulse {
        0%, 100% { box-shadow: 0 6px 16px rgba(0,61,111,.18); }
        50% { box-shadow: 0 10px 24px rgba(0,61,111,.3); }
      }
      @keyframes wcBubblePop {
        from { transform: translate3d(0, 14px, 0) scale(.7) rotate(var(--rot)); }
        to { transform: translate3d(0,0,0) scale(1) rotate(var(--rot)); }
      }
      @keyframes wcBubbleFloat {
        0%, 100% { translate: 0 0; }
        50% { translate: 0 -7px; }
      }
      @keyframes wcBannerRise {
        from { transform: translate3d(0, 24px, 0) rotate(-3deg) scale(.98); }
        to { transform: translate3d(0,0,0) rotate(-1.5deg) scale(1); }
      }
      @keyframes wcBannerSway {
        0%, 100% { rotate: -1.5deg; }
        50% { rotate: .6deg; }
      }
      @keyframes wcTextReveal {
        from { transform: translate3d(0, 16px, 0) rotate(1deg); }
        to { transform: translate3d(0,0,0) rotate(1deg); }
      }
      @keyframes wcTitlePulse {
        0%, 100% { text-shadow: 0 2px 0 rgba(255,255,255,.45); }
        50% { text-shadow: 0 2px 0 rgba(255,255,255,.45), 0 0 18px rgba(68,181,55,.36); }
      }
      @keyframes wcPanelLift {
        from { transform: translate3d(0, 18px, 0); }
        to { transform: translate3d(0,0,0); }
      }
      @keyframes wcFieldLift {
        from { transform: translate3d(0, 32px, 0) scale(1.03); }
        to { transform: translate3d(0,0,0) scale(1); }
      }
      @keyframes wcPitchPan {
        from { transform: scale(1.04) translateX(-1.5%); }
        to { transform: scale(1.08) translateX(1.5%); }
      }
      @keyframes wcFanFloat {
        0%, 100% { transform: translate(-50%, -50%) translate3d(0,0,0); }
        50% { transform: translate(-50%, -50%) translate3d(0, -8px, 0); }
      }
      @keyframes wcChatFloat {
        0%, 100% { transform: translate3d(0,0,0); }
        50% { transform: translate3d(0, -5px, 0); }
      }
      @keyframes wcRoutePulse {
        0%, 100% { opacity: .45; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
        50% { opacity: 1; filter: drop-shadow(0 0 5px rgba(255,255,255,.8)); }
      }
      @keyframes wcCtaPop {
        from { transform: translate3d(0, 22px, 0) scale(.96); }
        to { transform: translate3d(0,0,0) scale(1); }
      }
      @keyframes wcCtaBreathe {
        0%, 100% { box-shadow: 0 9px 24px rgba(9,72,23,.28), inset 0 0 0 2px rgba(255,255,255,.7); }
        50% { box-shadow: 0 14px 34px rgba(9,72,23,.38), inset 0 0 0 2px rgba(255,255,255,.9); }
      }
      @keyframes wcBallSpin {
        from { rotate: 0deg; }
        to { rotate: 360deg; }
      }
      @keyframes wcFeatureIn {
        from { transform: translateY(12px); }
        to { transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .wc-html-splash *,
        .wc-html-splash::before {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
        }
      }
    `}</style>
  );
}

const WC_ASSETS = {
  bgPlate: 'assets/welcome/background-plate.png',
  titleBanner: 'assets/welcome/title-banner.png',
  stepCountry: 'assets/welcome/step-country.png',
  stepGuide: 'assets/welcome/step-guide.png',
  stepHighlights: 'assets/welcome/step-highlights.png',
  stepActivate: 'assets/welcome/step-activate-v2.png',
  pitch: 'assets/welcome/pitch-generated.png',
  ball: 'assets/welcome/ball.png',
  fans: {
    br: 'assets/welcome/fan-br.png',
    jp: 'assets/welcome/fan-jp.png',
    fr: 'assets/welcome/fan-fr.png',
    es: 'assets/welcome/fan-es.png',
    mx: 'assets/welcome/fan-mx.png',
    kr: 'assets/welcome/fan-kr.png',
    de: 'assets/welcome/fan-de.png',
  },
};

const wcConfetti = [
  ['13%','7%','#f44336','18deg','5px','19px','6.2s','-1.2s'], ['36%','3%','#1565d8','27deg','5px','14px','7.1s','-.3s'],
  ['69%','3%','#ef6aa2','-15deg','19px','23px','6.8s','-2s'], ['82%','2%','#ffd54a','38deg','7px','16px','7.4s','-1s'],
  ['95%','5%','#57d8ff','-22deg','8px','22px','6.6s','-.7s'], ['23%','16%','#ffd32c','-31deg','16px','14px','7.7s','-1.9s'],
  ['63%','8%','#25aa42','35deg','4px','12px','6.9s','-2.8s'], ['76%','9%','#f44336','-12deg','5px','11px','7.2s','-.8s'],
  ['57%','14%','#32a3f5','24deg','5px','16px','7.9s','-1.6s'], ['6%','30%','#ffd54a','-31deg','6px','12px','6.5s','-2.2s'],
  ['92%','33%','#f44336','18deg','7px','15px','8s','-3.4s'], ['18%','52%','#ffd54a','12deg','6px','11px','7.5s','-1.5s'],
  ['5%','59%','#f44336','-25deg','5px','12px','7s','-2.5s'], ['87%','61%','#30a1ff','31deg','7px','12px','6.7s','-.4s'],
  ['13%','69%','#a25bea','-19deg','7px','13px','7.8s','-3s'], ['67%','71%','#f44336','18deg','5px','12px','6.4s','-1.1s'],
  ['78%','74%','#2eaef5','-22deg','7px','13px','7.3s','-2.1s'], ['92%','77%','#ffd54a','25deg','6px','15px','7.6s','-.9s'],
  ['6%','83%','#ff7ec5','-13deg','6px','10px','6.9s','-3.2s'], ['29%','86%','#30a1ff','25deg','7px','13px','8.2s','-2.7s'],
  ['76%','88%','#ffd54a','-28deg','8px','16px','7.1s','-1.4s'], ['88%','91%','#f44336','16deg','7px','12px','7.9s','-3.1s'],
];

function WcBubble({ text, x, y, color, rot, delay = '0ms' }) {
  return <div className="wc-bubble" style={{ left: x, top: y, background: color, '--rot': rot, '--d': delay }}>{text}</div>;
}

function WcCountdownBox({ value, label }) {
  return (
    <div className="wc-count-box">
      <div className="wc-count-num">{value}</div>
      <div className="wc-count-label">{label}</div>
    </div>
  );
}

function WcFan({ x, y, cx, cy, flag, text, bg, skin, hair, shirt, src, delay = '0ms' }) {
  return (
    <>
      <div className={`wc-avatar ${src ? 'has-photo' : ''}`} style={{ '--x': x, '--y': y, '--bg': bg, '--skin': skin, '--hair': hair, '--d': delay }}>
        {src ? <img className="wc-avatar-img" src={src} alt="" /> : <div className="wc-shirt" style={{ '--shirt': shirt }} />}
        <div className="wc-flag-dot" style={{ '--flag': flag }} />
      </div>
      <div className="wc-chat" style={{ '--cx': cx, '--cy': cy, '--d': delay }}>{text}</div>
    </>
  );
}

function WcFeature({ icon, title, copy }) {
  return (
    <div className="wc-feature">
      <div className="wc-feature-icon">{icon}</div>
      <div>
        <div className="wc-feature-title">{title}</div>
        <div className="wc-feature-copy">{copy}</div>
      </div>
    </div>
  );
}

// ── E1 Splash · HelloTalk 跨国交流欢迎页 ───────────────────────────
function ObSplash({ onNext, onSkip }) {
  const [t, setT] = React.useState({ d: 26, h: 17, m: 40, s: 48 });
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
    <div className="wc-html-splash">
      <WcCss />
      <img className="wc-bg-photo" src={WC_ASSETS.bgPlate} alt="" />
      <div className="wc-stadium" />
      <div className="wc-lights left" />
      <div className="wc-lights right" />
      {['red-a','blue-a','yellow-a','red-b','yellow-c','blue-c','red-c','green-b','blue-b','red-d','gold-b','pink-b'].map(c => <div key={c} className={`wc-ribbon ${c}`} />)}
      {wcConfetti.map((c, i) => (
        <span key={i} className="wc-confetti" style={{ '--x': c[0], '--y': c[1], '--c': c[2], '--r': c[3], '--w': c[4], '--h': c[5], '--dur': c[6], '--d': c[7] }} />
      ))}

      <div className="wc-logo">
        <div className="wc-logo-mark" />
        <div className="wc-logo-text">HelloTalk</div>
        <div className="wc-logo-sep" />
        <div className="wc-cup-lockup">
          <span className="wc-trophy-icon">♜</span>
          <span>WORLD CUP<br/>2026</span>
        </div>
      </div>
      <button type="button" className="wc-skip" onClick={onSkip}>跳过 <span>〉</span></button>

      <WcBubble text="Hello" x="18%" y="10%" color="#4b93ec" rot="-8deg" delay="120ms" />
      <WcBubble text="你好" x="54%" y="8.2%" color="#43b95a" rot="1deg" delay="220ms" />
      <WcBubble text="Hola" x="80%" y="14.8%" color="#ef6aa2" rot="7deg" delay="320ms" />
      <WcBubble text="Bonjour" x="2.1%" y="22.2%" color="#a66df0" rot="2deg" delay="420ms" />
      <WcBubble text="Olá" x="87%" y="30.4%" color="#f47c2b" rot="7deg" delay="520ms" />
      <WcBubble text="こんにちは" x="4.3%" y="34.8%" color="#4ec5eb" rot="2deg" delay="620ms" />
      <WcBubble text="안녕" x="86.5%" y="39.8%" color="#f5c545" rot="-5deg" delay="720ms" />

      <img className="wc-title-banner" src={WC_ASSETS.titleBanner} alt="HelloTalk 世界杯 用你的语言，为世界进球" />

      <div className="wc-countdown">
        <div className="wc-count-title"><span className="wc-burst" style={{ '--c': '#2a95e8' }} />距开幕<span className="wc-burst" style={{ '--c': '#ef3c48' }} /></div>
        <div className="wc-count-row">
          <WcCountdownBox value={String(t.d).padStart(2, '0')} label="天" />
          <span className="wc-count-colon">:</span>
          <WcCountdownBox value={String(t.h).padStart(2, '0')} label="时" />
          <span className="wc-count-colon">:</span>
          <WcCountdownBox value={String(t.m).padStart(2, '0')} label="分" />
          <span className="wc-count-colon">:</span>
          <WcCountdownBox value={String(t.s).padStart(2, '0')} label="秒" />
        </div>
      </div>

      <div className="wc-field">
        <img className="wc-field-photo" src={WC_ASSETS.pitch} alt="" />
        <div className="wc-world-map" />
      </div>
      <div className="wc-dash" style={{ left: '15%', top: '61.5%', width: '24%', transform: 'rotate(13deg)', '--d': '0ms' }} />
      <div className="wc-dash" style={{ left: '48%', top: '59.2%', width: '24%', transform: 'rotate(-17deg)', '--d': '-500ms' }} />
      <div className="wc-dash" style={{ left: '18%', top: '73%', width: '23%', transform: 'rotate(10deg)', '--d': '-900ms' }} />
      <div className="wc-dash" style={{ left: '40%', top: '72%', width: '23%', transform: 'rotate(-31deg)', '--d': '-1300ms' }} />
      <div className="wc-dash" style={{ left: '65%', top: '72.2%', width: '19%', transform: 'rotate(-13deg)', '--d': '-1700ms' }} />

      <WcFan x="14%" y="61.8%" cx="22%" cy="58.1%" text="¡Vamos! ⚽" src={WC_ASSETS.fans.es} delay="-400ms" bg="#f5c2a2" skin="#dca06c" hair="#252020" shirt="#f5f7f9" flag="linear-gradient(180deg,#c60b1e 0 25%,#ffc400 25% 75%,#c60b1e 75%)" />
      <WcFan x="52%" y="64.8%" cx="52%" cy="59.1%" text="Bora! ⚽" src={WC_ASSETS.fans.br} delay="-1200ms" bg="#bfe2e3" skin="#d29a72" hair="#4b261f" shirt="#e7fff4" flag="linear-gradient(135deg,#159947 0 42%,#ffd400 42% 68%,#1049a9 68%)" />
      <WcFan x="75%" y="59.7%" cx="81%" cy="62.2%" text="がんばれ!" src={WC_ASSETS.fans.jp} delay="-800ms" bg="#e2eef5" skin="#cf8b68" hair="#252020" shirt="#0b7845" flag="radial-gradient(circle,#d71920 0 38%,#fff 39%)" />
      <WcFan x="16%" y="72%" cx="20%" cy="70.7%" text="¡Gol! 🎉" src={WC_ASSETS.fans.mx} delay="-1600ms" bg="#d6e3ed" skin="#c98252" hair="#151a1f" shirt="#f3f4f8" flag="linear-gradient(90deg,#006847 0 33%,#fff 33% 66%,#ce1126 66%)" />
      <WcFan x="32%" y="80.4%" cx="41%" cy="78.3%" text="화이팅! 💪" src={WC_ASSETS.fans.kr} delay="-2200ms" bg="#bde5ef" skin="#e5b385" hair="#191514" shirt="#e9f4ff" flag="radial-gradient(circle,#cd2e3a 0 28%,#fff 29% 100%)" />
      <WcFan x="67%" y="78.8%" cx="76%" cy="75.2%" text="Allez!" src={WC_ASSETS.fans.de} delay="-1100ms" bg="#f2d8bd" skin="#e2aa77" hair="#d3a05d" shirt="#fff7ed" flag="linear-gradient(180deg,#000 0 33%,#dd0000 33% 66%,#ffce00 66%)" />
      <WcFan x="87%" y="69%" cx="72%" cy="68.3%" text="•••" src={WC_ASSETS.fans.fr} delay="-1900ms" bg="#caa27c" skin="#8f5a3d" hair="#1a1414" shirt="#f47c2b" flag="linear-gradient(90deg,#0055a4 0 33%,#fff 33% 66%,#ef4135 66%)" />

      <button type="button" className="wc-cta" onClick={onNext}>
        <span className="wc-cta-ball" />
        <span className="wc-cta-text">开始交流</span>
        <span className="wc-cta-arrow">›</span>
      </button>

      <div className="wc-feature-bar">
        <WcFeature icon="◎" title="150+ 语言" copy="和世界对话" />
        <WcFeature icon="☵" title="结交全球伙伴" copy="一起聊世界杯" />
        <WcFeature icon="◉" title="练口语" copy="为你的球队加油" />
      </div>
    </div>
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
    <ObArtPage bg={WC_ASSETS.stepCountry}>
      <ObTopBar step={1} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', height: '100%',
      }} className="ob-art-content">
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 13,
          color: PX24.red, letterSpacing: 1, lineHeight: 1.4,
          textShadow: `2px 2px 0 ${PX24.gold3}`,
        }}>SELECT YOUR COUNTRY</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
          color: PX24.night, marginTop: 4, fontWeight: 700,
        }}>选一个作为你的阵营（进入后可改）</div>

        <div className="ob-art-card" style={{
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

        <div className="h-scroll ob-art-card" style={{
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

        <div className="ob-art-card" style={{
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
    </ObArtPage>
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
    <ObArtPage bg={WC_ASSETS.stepGuide}>
      <ObTopBar step={2} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', gap: 10, height: '100%',
      }} className="ob-art-content">
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
          <div key={i} className="ob-art-card" style={{
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
    </ObArtPage>
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
    <ObArtPage bg={WC_ASSETS.stepHighlights}>
      <ObTopBar step={3} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 60, paddingLeft: 14, paddingRight: 14, paddingBottom: 8,
        display: 'flex', flexDirection: 'column', height: '100%',
      }} className="ob-art-content">
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
            <div key={i} className="ob-art-card" style={{
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
    </ObArtPage>
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
    <ObArtPage bg={WC_ASSETS.stepActivate}>
      <ObTopBar step={4} total={4} onBack={onBack} onSkip={onSkip}/>
      <div style={{
        paddingTop: 56, paddingLeft: 18, paddingRight: 18, paddingBottom: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        position: 'relative', height: '100%',
      }} className="ob-art-content">
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

        <div className="ob-art-card" style={{
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
    </ObArtPage>
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
        width: 'min(92vw, 460px, 41.75dvh)',
        height: 'auto',
        aspectRatio: '864 / 1821',
        background: 'transparent',
        border: 0,
        boxShadow: '0 16px 50px rgba(0,0,0,0.42)',
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
