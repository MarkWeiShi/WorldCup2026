// World Cup 2026 H5 — pixel art homepage
// iPhone 17 Pro Max frame: 440 x 956, Dynamic Island width ~126

const PX = {
  grassGreen: '#4CAF50',
  skyBlue: '#87CEEB',
  sunYellow: '#FFD700',
  red: '#FF4444',
  gold: '#FFC107',
  cream: '#FFF8E7',
  night: '#1A1A3E',
  // derived
  darkGreen: '#2E7D32',
  darkRed: '#C62828',
  deepBlue: '#3F51B5',
  lightCream: '#FFFBEF',
  outline: '#1A1A3E',
  shadow: '#3B2A1F',
};

// ─── Pixel iPhone frame (尺寸走 CSS var，兼容小屏) ──────────
function PhoneFrame({ children }) {
  return (
    <div className="phone-frame" style={{
      borderRadius: 48, position: 'relative',
      background: '#0a0a0a', padding: 8, boxSizing: 'border-box',
      boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 2px #1a1a1a, 0 0 0 3px #333',
      flexShrink: 0,
    }}>
      {/* inner screen */}
      <div style={{
        width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden',
        position: 'relative', background: PX.cream,
      }}>
        {/* Status bar (time + icons) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 34px 0 36px', boxSizing: 'border-box',
          fontFamily: "'Press Start 2P', monospace",
        }}>
          <div style={{ fontSize: 13, color: PX.night, paddingTop: 20, letterSpacing: 0 }}>9:41</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 20 }}>
            {/* signal bars */}
            <div style={{ display: 'flex', alignItems: 'end', gap: 2, height: 11 }}>
              {[4, 6, 8, 11].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: PX.night }} />
              ))}
            </div>
            {/* wifi pixel */}
            <svg width="16" height="11" viewBox="0 0 16 11" style={{ imageRendering: 'pixelated' }}>
              <rect x="0" y="3" width="2" height="2" fill={PX.night}/>
              <rect x="2" y="1" width="2" height="2" fill={PX.night}/>
              <rect x="4" y="0" width="8" height="2" fill={PX.night}/>
              <rect x="12" y="1" width="2" height="2" fill={PX.night}/>
              <rect x="14" y="3" width="2" height="2" fill={PX.night}/>
              <rect x="3" y="5" width="2" height="2" fill={PX.night}/>
              <rect x="5" y="4" width="6" height="2" fill={PX.night}/>
              <rect x="11" y="5" width="2" height="2" fill={PX.night}/>
              <rect x="6" y="7" width="4" height="2" fill={PX.night}/>
              <rect x="7" y="9" width="2" height="2" fill={PX.night}/>
            </svg>
            {/* battery pixel */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 22, height: 11, border: `1.5px solid ${PX.night}`,
                padding: 1, boxSizing: 'border-box',
              }}>
                <div style={{ width: '85%', height: '100%', background: PX.grassGreen }} />
              </div>
              <div style={{ width: 2, height: 5, background: PX.night, marginLeft: 1 }} />
            </div>
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 108, height: 32, borderRadius: 20, background: '#000', zIndex: 60,
          boxShadow: 'inset 0 0 0 1px #222',
        }} />

        {/* Scrollable content */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'auto', overscrollBehavior: 'contain',
        }} className="phone-scroll">
          {children}
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 34, zIndex: 50,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 8,
          pointerEvents: 'none',
        }}>
          <div style={{ width: 118, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.35)' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Pixel utilities ────────────────────────────────────────
// A stepped-corner box using layered pseudo shapes via SVG-free pure CSS trick.
function PixelBox({ children, bg = PX.cream, border = PX.night, style = {}, inset = 4, shadow = true, onClick }) {
  // simulate chunky 4px pixel corners by layering two rects (outer - corners) via clip-path
  const clip = `polygon(
    0 ${inset}px, ${inset}px ${inset}px, ${inset}px 0,
    calc(100% - ${inset}px) 0, calc(100% - ${inset}px) ${inset}px, 100% ${inset}px,
    100% calc(100% - ${inset}px), calc(100% - ${inset}px) calc(100% - ${inset}px),
    calc(100% - ${inset}px) 100%, ${inset}px 100%, ${inset}px calc(100% - ${inset}px),
    0 calc(100% - ${inset}px)
  )`;
  return (
    <div onClick={onClick} style={{
      position: 'relative', background: border, clipPath: clip, padding: 3,
      filter: shadow ? `drop-shadow(3px 3px 0 ${PX.night})` : 'none',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      <div style={{ background: bg, clipPath: clip, padding: 8, height: '100%', boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
}

function PixelButton({ children, color = PX.red, textColor = '#fff', onClick, style = {}, size = 'md' }) {
  const pad = size === 'sm' ? '8px 12px' : size === 'lg' ? '14px 20px' : '10px 16px';
  const fs  = size === 'sm' ? 9 : size === 'lg' ? 12 : 10;
  return (
    <button onClick={onClick} className="pixel-btn" style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: fs, color: textColor, background: color,
      border: `3px solid ${PX.night}`, padding: pad, cursor: 'pointer',
      boxShadow: `3px 3px 0 ${PX.night}`, letterSpacing: 0,
      imageRendering: 'pixelated', textTransform: 'uppercase',
      ...style,
    }}>
      {children}
    </button>
  );
}

// A pixel flag built from colored rects — for a handful of teams
const FLAGS = {
  ar: [ // Argentina: light blue / white / light blue with sun
    ['a','a','a','a','a','a'],
    ['a','a','a','a','a','a'],
    ['w','w','s','s','w','w'],
    ['w','w','s','s','w','w'],
    ['a','a','a','a','a','a'],
    ['a','a','a','a','a','a'],
  ],
  en: [ // England: white + red cross
    ['w','w','r','r','w','w'],
    ['w','w','r','r','w','w'],
    ['r','r','r','r','r','r'],
    ['r','r','r','r','r','r'],
    ['w','w','r','r','w','w'],
    ['w','w','r','r','w','w'],
  ],
  br: [ // Brazil: green + yellow diamond + blue dot
    ['g','g','g','g','g','g'],
    ['g','y','y','y','y','g'],
    ['y','y','b','b','y','y'],
    ['y','y','b','b','y','y'],
    ['g','y','y','y','y','g'],
    ['g','g','g','g','g','g'],
  ],
  de: [ // Germany: black / red / yellow stripes
    ['k','k','k','k','k','k'],
    ['k','k','k','k','k','k'],
    ['r','r','r','r','r','r'],
    ['r','r','r','r','r','r'],
    ['y','y','y','y','y','y'],
    ['y','y','y','y','y','y'],
  ],
  fr: [ // France: blue white red
    ['b','b','w','w','r','r'],
    ['b','b','w','w','r','r'],
    ['b','b','w','w','r','r'],
    ['b','b','w','w','r','r'],
    ['b','b','w','w','r','r'],
    ['b','b','w','w','r','r'],
  ],
  es: [ // Spain: red yellow red
    ['r','r','r','r','r','r'],
    ['y','y','y','y','y','y'],
    ['y','y','y','y','y','y'],
    ['y','y','y','y','y','y'],
    ['y','y','y','y','y','y'],
    ['r','r','r','r','r','r'],
  ],
  cn: [ // China: red + yellow stars corner
    ['r','y','r','r','r','r'],
    ['r','r','y','r','r','r'],
    ['r','y','r','r','r','r'],
    ['r','r','r','r','r','r'],
    ['r','r','r','r','r','r'],
    ['r','r','r','r','r','r'],
  ],
  pt: [ // Portugal: left green + right red
    ['g','g','r','r','r','r'],
    ['g','g','r','r','r','r'],
    ['g','g','r','r','r','r'],
    ['g','g','r','r','r','r'],
    ['g','g','r','r','r','r'],
    ['g','g','r','r','r','r'],
  ],
  nl: [ // Netherlands: red white blue
    ['r','r','r','r','r','r'],
    ['r','r','r','r','r','r'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['b','b','b','b','b','b'],
    ['b','b','b','b','b','b'],
  ],
  jp: [ // Japan: white + red center
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','r','r','w','w'],
    ['w','w','r','r','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
  ],
};
const FLAG_COLORS = {
  r: '#D52B1E', w: '#ffffff', g: '#009739', y: '#FFDF00', b: '#0055A4',
  k: '#111111', a: '#74ACDF', s: '#FFC107', o: '#FF7F00',
};
function PixelFlag({ code = 'cn', size = 24, px }) {
  const data = FLAGS[code] || FLAGS.cn;
  const cell = (px ? px : Math.floor(size / 6));
  return (
    <div style={{
      display: 'inline-grid',
      gridTemplateColumns: `repeat(6, ${cell}px)`,
      gridTemplateRows: `repeat(6, ${cell}px)`,
      border: `2px solid ${PX.night}`,
      boxShadow: `2px 2px 0 ${PX.night}`,
      lineHeight: 0,
    }}>
      {data.flat().map((c, i) => (
        <div key={i} style={{ background: FLAG_COLORS[c] || '#fff' }} />
      ))}
    </div>
  );
}

// A pixel trophy (Jules Rimet-ish generic cup — not copying any branded asset)
function PixelTrophy({ size = 96 }) {
  // 16x16 grid, scaled
  const g = 16, s = size / g;
  const M = [
    '................',
    '..yyyyyyyyyyyy..',
    '..yggggggggggy..',
    '..yg........gy..',
    '..yg.yyyyyy.gy..',
    '..yg.y....y.gy..',
    '..yg.y.yy.y.gy..',
    '..yg.y.yy.y.gy..',
    '..yg.yyyyyy.gy..',
    '..yggggggggggy..',
    '...yggggggggy...',
    '....ygggggggy...',
    '......yyyy......',
    '.....yyyyyy.....',
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
  ];
  const col = { y: PX.sunYellow, g: PX.gold, k: PX.shadow, '.': 'transparent' };
  return (
    <div style={{
      position: 'relative', width: size, height: size,
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Pixel cloud
function PixelCloud({ size = 48, style = {} }) {
  const g = 8, s = size / g;
  const M = [
    '...ww...',
    '..wwww..',
    '.wwwwww.',
    'wwwwwwww',
    'wwwwwwww',
    '.wwwwww.',
    '........',
    '........',
  ];
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0, ...style,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: c === 'w' ? '#ffffff' : 'transparent' }} />
      ))}
    </div>
  );
}

// Pixel football
function PixelBall({ size = 20, style = {} }) {
  const g = 8, s = size / g;
  const M = [
    '..wwww..',
    '.wkwwkw.',
    'wwwkkwww',
    'wkkwwkkw',
    'wkkwwkkw',
    'wwwkkwww',
    '.wkwwkw.',
    '..wwww..',
  ];
  const col = { w: '#fff', k: '#111', '.': 'transparent' };
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0, ...style,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Pixel goal net
function PixelGoal({ width = 120, height = 64 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 32" style={{ imageRendering: 'pixelated' }}>
      {/* posts */}
      <rect x="2" y="2" width="2" height="26" fill={PX.night}/>
      <rect x="56" y="2" width="2" height="26" fill={PX.night}/>
      <rect x="2" y="2" width="56" height="2" fill={PX.night}/>
      {/* net grid */}
      {[...Array(12)].map((_, i) => (
        <rect key={`v${i}`} x={4 + i*4 + 2} y="4" width="1" height="24" fill="#bbb"/>
      ))}
      {[...Array(5)].map((_, i) => (
        <rect key={`h${i}`} x="4" y={6 + i*5} width="52" height="1" fill="#bbb"/>
      ))}
      {/* ground */}
      <rect x="0" y="28" width="60" height="4" fill={PX.grassGreen}/>
      <rect x="0" y="28" width="60" height="1" fill={PX.darkGreen}/>
    </svg>
  );
}

// Pixel chest
function PixelChest({ size = 40 }) {
  const g = 10, s = size / g;
  const M = [
    '..........',
    '.wwwwwwww.',
    '.wyyyyyyw.',
    '.wykkkkyw.',
    '.wykggkyw.',
    '.bbbbbbbb.',
    '.byyyyyyb.',
    '.byykkyyb.',
    '.bbbbbbbb.',
    '..........',
  ];
  const col = { w: '#8B4513', y: PX.sunYellow, k: '#5a2d0a', g: '#ffeb8a', b: '#6B3410', '.': 'transparent' };
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Pixel pouch
function PixelPouch({ size = 40 }) {
  const g = 10, s = size / g;
  const M = [
    '...rrrr...',
    '...rggr...',
    '..rrrrrr..',
    '.rrrrrrrr.',
    'rrryyyyrrr',
    'rryyggyyrr',
    'rryygoyyrr',
    'rrryyyyrrr',
    '.rrrrrrrr.',
    '..rrrrrr..',
  ];
  const col = { r: '#C62828', y: '#FFC107', g: '#ffeb8a', o: '#FF8C00', '.': 'transparent' };
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Pixel dice
function PixelDice({ size = 32 }) {
  const g = 8, s = size / g;
  const M = [
    'wwwwwwww',
    'wkwwwwkw',
    'wwwwwwww',
    'wwwwkwww',
    'wwwkwwww',
    'wwwwwwww',
    'wkwwwwkw',
    'wwwwwwww',
  ];
  const col = { w: '#fff', k: '#111' };
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0,
      border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
    }}>
      {M.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Pixel icon set (ASCII-grid)
function PxIcon({ kind, size = 20 }) {
  const icons = {
    back: [
      '........',
      '...kk...',
      '..kkk...',
      '.kkkkkkk',
      '.kkkkkkk',
      '..kkk...',
      '...kk...',
      '........',
    ],
    calendar: [
      'kkkkkkkk',
      'kwwwwwwk',
      'kwrwrwrk',
      'kwwwwwwk',
      'kwrwrwrk',
      'kwwwwwwk',
      'kwrwrwrk',
      'kkkkkkkk',
    ],
    trophy: [
      '.yyyyyy.',
      '.ygggggy',
      'yygggggy',
      '.ygggggy',
      '..yyyy..',
      '..yyyy..',
      '.kkkkkk.',
      'kkkkkkkk',
    ],
    info: [
      '..kkkk..',
      '.kwwwwk.',
      'kwwkkwwk',
      'kwwwwwwk',
      'kwwkkwwk',
      'kwwkkwwk',
      '.kwwwwk.',
      '..kkkk..',
    ],
    share: [
      '....kk..',
      '...kkk..',
      '..kkkkkk',
      '.k..kkkk',
      'k...kkkk',
      '....kkkk',
      '....kkkk',
      '....kkkk',
    ],
    chev: [
      '........',
      '....k...',
      '....kk..',
      '....kkk.',
      '....kk..',
      '....k...',
      '........',
      '........',
    ],
    frame: [
      'kkkkkkkk',
      'kkkkkkkk',
      'kk....kk',
      'kk....kk',
      'kk....kk',
      'kk....kk',
      'kkkkkkkk',
      'kkkkkkkk',
    ],
    bubble: [
      '..kkkk..',
      '.kwwwwk.',
      'kwwwwwwk',
      'kwwwwwwk',
      'kwwwwwwk',
      '.kwwwwk.',
      '..kkk...',
      '..kk....',
    ],
    scene: [
      '......yy',
      '......yy',
      '.....k..',
      '....kkk.',
      '...kkkkk',
      '..kkkkkk',
      '.kkkkkkk',
      'kkkkkkkk',
    ],
    bolt: [
      '..yyyy..',
      '....yy..',
      '...yy...',
      '..yy....',
      '.yy.....',
      'yy......',
      'yyyyyy..',
      '........',
    ],
    ticket: [
      '.kkkkkk.',
      'kkwwwwkk',
      'kwwwwwwk',
      'kwrrwwww',
      'kwrrwwww',
      'kwwwwwwk',
      'kkwwwwkk',
      '.kkkkkk.',
    ],
  };
  const m = icons[kind] || icons.info;
  const g = 8, s = size / g;
  const col = { k: PX.night, w: '#fff', r: PX.red, y: PX.sunYellow, g: PX.gold, '.': 'transparent' };
  return (
    <div style={{
      display: 'inline-grid', gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`, lineHeight: 0,
    }}>
      {m.flatMap(r => r.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c] }} />
      ))}
    </div>
  );
}

// Progress ring (pixel-ish)
function PixelRing({ value = 20, max = 100, size = 40 }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = size / 2 - 4;
  const C = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#ddd" strokeWidth="4" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={PX.red} strokeWidth="4" fill="none"
        strokeDasharray={`${C*pct} ${C}`} transform={`rotate(-90 ${size/2} ${size/2})`}/>
    </svg>
  );
}

// LIVE pulse
function LiveDot() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: PX.red, color: '#fff', padding: '2px 6px',
      fontFamily: "'Press Start 2P', monospace", fontSize: 8,
      border: `2px solid ${PX.night}`,
    }}>
      <span className="live-blink" style={{
        width: 6, height: 6, background: '#fff', display: 'inline-block',
      }} />
      LIVE
    </span>
  );
}

// Flip-digit (pixel)
function FlipDigit({ value }) {
  return (
    <div style={{
      width: 28, height: 40, background: PX.night, color: PX.sunYellow,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Press Start 2P', monospace", fontSize: 20,
      border: `2px solid #000`, boxShadow: `2px 2px 0 ${PX.shadow}`,
      position: 'relative',
    }}>
      {value}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%', height: 1,
        background: 'rgba(0,0,0,0.5)',
      }}/>
    </div>
  );
}

function Countdown() {
  const [t, setT] = React.useState(() => target());
  function target() {
    // fake: 76 days 14h 23m from a fixed base; tick minutes
    return { d: 76, h: 14, m: 23, s: 45 };
  }
  React.useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { d, h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  const segs = [
    { label: 'DAYS', v: pad(t.d) },
    { label: 'HRS',  v: pad(t.h) },
    { label: 'MIN',  v: pad(t.m) },
    { label: 'SEC',  v: pad(t.s) },
  ];
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {segs.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {s.v.split('').map((ch, j) => <FlipDigit key={j} value={ch} />)}
          </div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 7,
            color: '#fff',
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// Drifting pixel clouds + occasional ball
function AmbientSky() {
  return (
    <>
      <div className="cloud-drift" style={{ position: 'absolute', top: 14, left: -60, zIndex: 2, animationDelay: '0s' }}>
        <PixelCloud size={40} />
      </div>
      <div className="cloud-drift-slow" style={{ position: 'absolute', top: 52, left: -80, zIndex: 2, animationDelay: '-6s' }}>
        <PixelCloud size={56} />
      </div>
      <div className="cloud-drift" style={{ position: 'absolute', top: 94, left: -40, zIndex: 2, animationDelay: '-3s' }}>
        <PixelCloud size={32} />
      </div>
    </>
  );
}

// Pixel stadium silhouette (behind hero)
function PixelStadium() {
  return (
    <svg width="100%" height="100" viewBox="0 0 200 60" preserveAspectRatio="none" style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, display: 'block',
      imageRendering: 'pixelated',
    }}>
      {/* stadium stepped ring */}
      <polygon points="0,60 0,40 10,30 30,22 60,18 100,16 140,18 170,22 190,30 200,40 200,60"
               fill="#6BBE6B" stroke={PX.darkGreen} strokeWidth="1.5"/>
      <polygon points="0,60 0,46 12,38 34,32 66,29 100,28 134,29 166,32 188,38 200,46 200,60"
               fill={PX.grassGreen} stroke={PX.darkGreen} strokeWidth="1"/>
      {/* pitch */}
      <rect x="50" y="42" width="100" height="18" fill="#4CAF50"/>
      <rect x="50" y="42" width="100" height="1" fill="#fff"/>
      <line x1="100" y1="42" x2="100" y2="60" stroke="#fff" strokeWidth="0.8"/>
      <circle cx="100" cy="51" r="4" stroke="#fff" strokeWidth="0.8" fill="none"/>
      {/* floodlights */}
      {[14, 100, 186].map((x, i) => (
        <g key={i}>
          <rect x={x-1} y="8" width="2" height="20" fill="#333"/>
          <rect x={x-5} y="4" width="10" height="5" fill={PX.sunYellow}/>
          <rect x={x-5} y="4" width="10" height="1" fill={PX.gold}/>
        </g>
      ))}
    </svg>
  );
}

function PixelStar({ name, size = 40 }) {
  const g = 16;
  const s = size / g;
  const maps = {
    messi: [
      '................',
      '....hhhhhhhh....',
      '...hhhhhhhhhh...',
      '...hhsssssshh...',
      '..hhsssssssshh..',
      '..hssssssssssh..',
      '..hssssssssssh..',
      '..hbbbbbbbbbbh..',
      '...bbbbbbbbbb...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '.tt..tt..tt..tt.',
      '..k..kk..kk..k..',
      '................',
    ],
    ronaldo: [
      '................',
      '.....hhhhhh.....',
      '....hhhhhhhh....',
      '...hhsssssshh...',
      '...hsssssssssh...',
      '..hhsssssssshh..',
      '..hssssssssssh..',
      '..hhsssssssshh..',
      '...hsssssssssh...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '..tt..tt..tt....',
      '..k...kk..kk....',
      '................',
    ],
    neymar: [
      '................',
      '....aaaaaa......',
      '...aaaaaaaa.....',
      '...aassssssaa...',
      '..aassssssssaa..',
      '..hssssssssssh..',
      '..hssssssssssh..',
      '..hhsssssssshh..',
      '...hhsssssshh...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '..tt..tt..tt....',
      '..k...kk..kk....',
      '................',
    ],
    kane: [
      '................',
      '....hhhhhhhh....',
      '...hhhhhhhhhh...',
      '...hhsssssshh...',
      '..hhsssssssshh..',
      '..hssssssssssh..',
      '..hssssssssssh..',
      '..hhsssssssshh..',
      '...hhsssssshh...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '..tt..tt..tt....',
      '..k...kk..kk....',
      '................',
    ],
    mbappe: [
      '................',
      '.....hhhhhh.....',
      '....hhhhhhhh....',
      '...hhsssssshh...',
      '..hhsssssssshh..',
      '..hssssssssssh..',
      '..hssssssssssh..',
      '..hhsssssssshh..',
      '...hhsssssshh...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '..tt..tt..tt....',
      '..k...kk..kk....',
      '................',
    ],
    haaland: [
      '................',
      '....aaaaaaaa....',
      '...aaaaaaaaaa...',
      '...aassssssaa...',
      '..aassssssssaa..',
      '..hssssssssssh..',
      '..hssssssssssh..',
      '..hhsssssssshh..',
      '...hhsssssshh...',
      '..tttttttttttt..',
      '..tttttttttttt..',
      '.tttttttttttttt.',
      '.tttttttttttttt.',
      '..tt..tt..tt....',
      '..k...kk..kk....',
      '................',
    ],
  };
  const presets = {
    messi:   { skin: '#E8A86B', shirt: '#75AADB', hair: '#111111', accentHair: '#111111', beard: '#33251B', boot: '#1A1A3E', outline: PX.night },
    ronaldo: { skin: '#EDB891', shirt: '#CE1126', hair: '#2A1A12', accentHair: '#2A1A12', beard: '#EDB891', boot: '#1A1A3E', outline: PX.night },
    neymar:  { skin: '#C68660', shirt: '#FFDF00', hair: '#5A3317', accentHair: '#D9A441', beard: '#C68660', boot: '#1A1A3E', outline: PX.night },
    kane:    { skin: '#F2D5AE', shirt: '#FFFFFF', hair: '#4A3829', accentHair: '#4A3829', beard: '#F2D5AE', boot: '#1A1A3E', outline: PX.night },
    mbappe:  { skin: '#6D4B30', shirt: '#002395', hair: '#111111', accentHair: '#111111', beard: '#6D4B30', boot: '#FFFFFF', outline: PX.night },
    haaland: { skin: '#E8B887', shirt: '#C8102E', hair: '#B67C27', accentHair: '#F2CF63', beard: '#E8B887', boot: '#1A1A3E', outline: PX.night },
  };
  const preset = presets[name] || presets.messi;
  const sprite = maps[name] || maps.messi;
  const col = {
    '.': 'transparent',
    h: preset.hair,
    a: preset.accentHair,
    s: preset.skin,
    b: preset.beard,
    t: preset.shirt,
    k: preset.boot,
  };
  return (
    <div style={{
      width: size,
      height: size,
      padding: Math.max(2, Math.floor(size / 16)),
      background: '#ffffff',
      border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.shadow}`,
      clipPath: 'polygon(0 18%, 12% 18%, 12% 0, 88% 0, 88% 18%, 100% 18%, 100% 82%, 88% 82%, 88% 100%, 12% 100%, 12% 82%, 0 82%)',
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${g}, ${s}px)`,
      gridTemplateRows: `repeat(${g}, ${s}px)`,
      lineHeight: 0,
      overflow: 'hidden',
    }}>
      {sprite.flatMap((row) => row.split('')).map((c, i) => (
        <div key={i} style={{ background: col[c], boxShadow: c === '.' ? 'none' : `inset 0 0 0 1px ${preset.outline}` }} />
      ))}
    </div>
  );
}

Object.assign(window, {
  PX, PhoneFrame, PixelBox, PixelButton, PixelFlag, PixelTrophy, PixelCloud,
  PixelBall, PixelGoal, PixelChest, PixelPouch, PixelDice, PxIcon, PixelRing,
  PixelStar,
  LiveDot, Countdown, AmbientSky, PixelStadium,
});

function PixelCommentator({ size = 24 }) {
  const grid = 8;
  const cell = size / grid;
  const matrix = [
    '...hhhh.',
    '..hhhhh.',
    '.hhssshh',
    'bhsssssh',
    'bhssssmh',
    '.hjjjjj.',
    '..j..m..',
    '...r....',
  ];
  const colors = {
    '.': 'transparent',
    h: '#4B2E2A',
    s: '#F5DEB3',
    b: '#111111',
    j: '#2F3648',
    m: '#9A9A9A',
    r: PX.red,
  };
  return (
    <div style={{
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${grid}, ${cell}px)`,
      gridTemplateRows: `repeat(${grid}, ${cell}px)`,
      width: size,
      height: size,
      border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      background: PX.cream,
      overflow: 'hidden',
      imageRendering: 'pixelated',
      lineHeight: 0,
      flexShrink: 0,
    }}>
      {matrix.flatMap((row) => row.split('')).map((pixel, index) => (
        <div key={index} style={{ background: colors[pixel] }} />
      ))}
    </div>
  );
}

function PixelFan({
  color = PX.red,
  size = 12,
  style = {},
  className = '',
  innerClassName = '',
  innerStyle = {},
}) {
  const unit = Math.max(1, Math.floor(size / 6));
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: unit * 6,
        height: unit * 8,
        display: 'inline-block',
        imageRendering: 'pixelated',
        ...style,
      }}
    >
      <div
        className={innerClassName}
        style={{
          position: 'absolute',
          inset: 0,
          ...innerStyle,
        }}
      >
        <div style={{
          position: 'absolute',
          left: unit,
          top: 0,
          width: unit * 4,
          height: unit,
          background: PX.sunYellow,
        }} />
        <div style={{
          position: 'absolute',
          left: unit * 2,
          top: unit,
          width: unit * 2,
          height: unit * 2,
          background: '#F5DEB3',
        }} />
        <div style={{
          position: 'absolute',
          left: unit,
          top: unit * 3,
          width: unit * 4,
          height: unit * 3,
          background: color,
        }} />
        <div style={{
          position: 'absolute',
          left: unit * 2,
          bottom: 0,
          width: unit,
          height: unit * 2,
          background: PX.night,
        }} />
        <div style={{
          position: 'absolute',
          left: unit * 3,
          bottom: 0,
          width: unit,
          height: unit * 2,
          background: PX.night,
        }} />
      </div>
    </div>
  );
}

Object.assign(window, { PixelCommentator, PixelFan });

function PitchLine() {
  return (
    <div style={{
      height: 4,
      background: '#fff',
      border: `2px solid ${PX.night}`,
      boxShadow: `2px 2px 0 rgba(0,0,0,0.4)`,
      margin: '8px 0',
    }} />
  );
}

function PixelWorldMapBanner() {
  const palette = Array.from(new Set([
    ...Object.values(FLAG_COLORS),
    PX.red,
    PX.grassGreen,
    PX.skyBlue,
    PX.sunYellow,
  ]));
  const cells = Array.from({ length: 48 }, (_, index) => ({
    color: palette[index % palette.length],
    delay: `${index * 97}ms`,
  }));

  return (
    <div style={{
      height: 64,
      margin: '-12px -12px 12px -12px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '3px solid #fff',
      boxShadow: `3px 3px 0 ${PX.night}`,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        background: PX.night,
      }}>
        {cells.map((cell, index) => (
          <div
            key={`map-${index}`}
            className="map-flash"
            style={{
              background: cell.color,
              animationDelay: cell.delay,
              borderRight: index % 8 === 7 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              borderBottom: index >= 40 ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(26,26,62,0.35)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div
          className="soft-pulse"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 12,
            color: PX.sunYellow,
            textShadow: `2px 2px 0 ${PX.night}`,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          48 · WORLD · CUP
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PitchLine, PixelWorldMapBanner });
