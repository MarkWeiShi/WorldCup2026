// P11 — pitch, players, stands, scoreboard

// Team kits
const KITS = {
  ar: { primary: '#74ACDF', secondary: '#ffffff', accent: '#0A3D8F', short: '#1a1a1a', name: '阿根廷', code: 'ar', color: '#74ACDF' },
  br: { primary: '#FFDF00', secondary: '#009739', accent: '#002776', short: '#002776', name: '巴西',   code: 'br', color: '#FFDF00' },
  de: { primary: '#000000', secondary: '#DD0000', accent: '#FAE042', short: '#111111', name: '德国', code: 'de', color: '#000000' },
  fr: { primary: '#002395', secondary: '#ED2939', accent: '#ffffff', short: '#002395', name: '法国', code: 'fr', color: '#002395' },
  es: { primary: '#AA151B', secondary: '#F1BF00', accent: '#AA151B', short: '#0F3B82', name: '西班牙', code: 'es', color: '#AA151B' },
  en: { primary: '#FFFFFF', secondary: '#CE1124', accent: '#CE1124', short: '#1A1A3E', name: '英格兰', code: 'en', color: '#FFFFFF' },
  pt: { primary: '#006600', secondary: '#FF0000', accent: '#F8D24A', short: '#8B0000', name: '葡萄牙', code: 'pt', color: '#006600' },
  nl: { primary: '#21468B', secondary: '#FF6E00', accent: '#ffffff', short: '#21468B', name: '荷兰', code: 'nl', color: '#21468B' },
  jp: { primary: '#FFFFFF', secondary: '#BC002D', accent: '#BC002D', short: '#1A1A3E', name: '日本', code: 'jp', color: '#FFFFFF' },
  kr: { primary: '#FFFFFF', secondary: '#0047A0', accent: '#C60C30', short: '#1A1A3E', name: '韩国', code: 'kr', color: '#FFFFFF' },
  mx: { primary: '#006847', secondary: '#CE1126', accent: '#ffffff', short: '#7A231A', name: '墨西哥', code: 'mx', color: '#006847' },
  us: { primary: '#002868', secondary: '#BF0A30', accent: '#ffffff', short: '#002868', name: '美国', code: 'us', color: '#002868' },
  be: { primary: '#000000', secondary: '#FAE042', accent: '#D60000', short: '#111111', name: '比利时', code: 'be', color: '#000000' },
  hr: { primary: '#FF0000', secondary: '#171796', accent: '#ffffff', short: '#171796', name: '克罗地亚', code: 'hr', color: '#FF0000' },
  ma: { primary: '#C1272D', secondary: '#006233', accent: '#F0E2A4', short: '#006233', name: '摩洛哥', code: 'ma', color: '#C1272D' },
  sn: { primary: '#00853F', secondary: '#FDEF42', accent: '#E31B23', short: '#00853F', name: '塞内加尔', code: 'sn', color: '#00853F' },
};

// Pixel player (sprite-like, ~16x24). Stripes for AR, solid for BR with green shorts.
function PixelPlayer({ kit, idle = true, size = 24, label, scoreTop }) {
  // 8 wide x 12 tall
  const g = { w: 8, h: 12 }, s = size / g.w;
  // Rows:
  // 0 helmet/hair, 1 head, 2-3 shirt, 4 shorts, 5-6 legs, 7 shoes
  // columns 0..7
  const skin = '#F5C9A8';
  const hair = '#2b1a0e';
  const shoe = '#1a1a1a';
  const stripe = kit.code === 'ar';
  // build matrix of colors per row
  const rows = [
    // hair top
    ['.', '.', hair, hair, hair, hair, '.', '.'],
    // face
    ['.', '.', skin, skin, skin, skin, '.', '.'],
    // jersey row 1
    stripe
      ? ['.', kit.primary, kit.secondary, kit.primary, kit.secondary, kit.primary, kit.secondary, '.']
      : ['.', kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, '.'],
    // jersey row 2
    stripe
      ? ['.', kit.primary, kit.secondary, kit.primary, kit.secondary, kit.primary, kit.secondary, '.']
      : ['.', kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, '.'],
    // arms+shirt row (thinner)
    stripe
      ? [kit.primary, kit.primary, kit.secondary, kit.primary, kit.secondary, kit.primary, kit.primary, kit.primary]
      : [kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, kit.primary, kit.primary],
    // shorts
    ['.', '.', kit.short, kit.short, kit.short, kit.short, '.', '.'],
    ['.', '.', kit.short, kit.short, kit.short, kit.short, '.', '.'],
    // legs
    ['.', '.', skin,   skin,   skin,   skin,   '.', '.'],
    ['.', '.', skin,   '.',    '.',    skin,   '.', '.'],
    ['.', '.', skin,   '.',    '.',    skin,   '.', '.'],
    // shoes
    ['.', '.', shoe, shoe, '.', shoe, shoe, '.'],
    ['.', '.', shoe, shoe, '.', shoe, shoe, '.'],
  ];
  return (
    <div className={idle ? 'player-idle' : ''} style={{ position: 'relative', width: size, height: size * 1.5 }}>
      {label && (
        <div style={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Press Start 2P', monospace", fontSize: 6,
          background: PX.night, color: '#fff', padding: '2px 4px',
          whiteSpace: 'nowrap', border: `1.5px solid ${kit.primary}`,
        }}>{label}{scoreTop ? ` ${scoreTop}` : ''}</div>
      )}
      <div style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${g.w}, ${s}px)`,
        gridTemplateRows: `repeat(${g.h}, ${s}px)`,
        lineHeight: 0,
      }}>
        {rows.flat().map((c, i) => (
          <div key={i} style={{ background: c === '.' ? 'transparent' : c }} />
        ))}
      </div>
    </div>
  );
}

// Crowd head (tiny 6x6 pixel head + flag overhead)
function CrowdHead({ flag, delay = 0 }) {
  const skinTones = ['#F5C9A8', '#D8A47F', '#8B5A3C', '#E6B89C', '#A0725B'];
  const hairs = ['#2b1a0e', '#111', '#5c3a1e', '#3a220f'];
  const sk = skinTones[Math.floor(Math.random() * skinTones.length)];
  const hr = hairs[Math.floor(Math.random() * hairs.length)];
  return (
    <div className="crowd-bounce" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      animationDelay: `${delay}ms`,
    }}>
      {/* tiny flag */}
      <div style={{ marginBottom: -2, position: 'relative' }}>
        <div style={{ width: 1, height: 4, background: PX.night, margin: '0 auto' }} />
        <div style={{ marginTop: -1 }}>
          <PixelFlag code={flag} px={2} />
        </div>
      </div>
      {/* head 6x5 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 2px)', gridTemplateRows: 'repeat(6, 2px)', lineHeight: 0 }}>
        {[
          '.hhhh.',
          'hhhhhh',
          'hssssh',
          '.ssss.',
          '.ssss.',
          '..ss..',
        ].flatMap(r => r.split('')).map((c, i) => (
          <div key={i} style={{ background: c === 'h' ? hr : c === 's' ? sk : 'transparent' }} />
        ))}
      </div>
    </div>
  );
}

function CrowdRow({ side = 'top', flag = 'ar', count = 18 }) {
  // one full row of crowd heads with their flags
  return (
    <div style={{
      display: 'flex', gap: 2, justifyContent: 'center',
      padding: '2px 0', background: side === 'top'
        ? 'linear-gradient(#3a3a52, #2a2a3e)'
        : 'linear-gradient(#2a2a3e, #3a3a52)',
      borderTop: side === 'bottom' ? `2px solid ${PX.night}` : 'none',
      borderBottom: side === 'top' ? `2px solid ${PX.night}` : 'none',
    }}>
      {[...Array(count)].map((_, i) => (
        <CrowdHead key={i} flag={flag} delay={(i * 80) % 1200} />
      ))}
    </div>
  );
}

function SplitCrowdRow({ side, leftFlag, rightFlag, count = 20 }) {
  return (
    <div style={{
      display: 'flex', background: side === 'top'
        ? 'linear-gradient(#3a3a52, #2a2a3e)'
        : 'linear-gradient(#2a2a3e, #3a3a52)',
      borderTop: side === 'bottom' ? `2px solid ${PX.night}` : 'none',
      borderBottom: side === 'top' ? `2px solid ${PX.night}` : 'none',
      padding: '2px 0',
    }}>
      <div style={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'center' }}>
        {[...Array(Math.floor(count/2))].map((_, i) => (
          <CrowdHead key={i} flag={leftFlag} delay={(i * 80) % 1200} />
        ))}
      </div>
      <div style={{ width: 1, background: PX.night }} />
      <div style={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'center' }}>
        {[...Array(Math.floor(count/2))].map((_, i) => (
          <CrowdHead key={i} flag={rightFlag} delay={(i * 80) % 1200} />
        ))}
      </div>
    </div>
  );
}

// Scrolling advertisement board (left/right sides)
function AdBoard({ side = 'left' }) {
  return (
    <div style={{
      position: 'absolute', top: 12, bottom: 12, width: 14,
      [side]: 0, background: PX.night, overflow: 'hidden',
      border: `1.5px solid ${PX.sunYellow}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className={side === 'left' ? 'ad-scroll-up' : 'ad-scroll-down'} style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        writingMode: 'vertical-rl',
        fontFamily: "'Press Start 2P', monospace", fontSize: 7,
        color: PX.sunYellow, whiteSpace: 'nowrap',
      }}>
        <span>HELLOTALK · VIP · 48 NATIONS · 2026 · WORLD CUP · HELLOTALK · VIP · LANGUAGE CUP · 2026 · WORLD CUP · HELLOTALK</span>
      </div>
    </div>
  );
}

// The pitch itself
function Pitch({ players, ball, effects }) {
  // pitch is ~380 x 220 with stripes + center circle
  return (
    <div style={{
      position: 'relative', height: 220, width: '100%',
      background: `repeating-linear-gradient(90deg, #3FA042 0 24px, #4CB550 24px 48px)`,
      overflow: 'hidden', borderTop: `2px solid ${PX.night}`, borderBottom: `2px solid ${PX.night}`,
    }}>
      {/* outer white pitch line */}
      <div style={{ position: 'absolute', inset: '6px 16px', border: '2px solid #fff' }} />
      {/* center line */}
      <div style={{ position: 'absolute', top: 6, bottom: 6, left: '50%', width: 2, background: '#fff' }} />
      {/* center circle */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: 50, height: 50,
        transform: 'translate(-50%, -50%)', border: '2px solid #fff', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: 6, height: 6,
        transform: 'translate(-50%, -50%)', background: '#fff', borderRadius: '50%',
      }} />
      {/* penalty boxes */}
      <div style={{ position: 'absolute', top: 40, bottom: 40, left: 16, width: 36, border: '2px solid #fff', borderLeft: 'none' }} />
      <div style={{ position: 'absolute', top: 40, bottom: 40, right: 16, width: 36, border: '2px solid #fff', borderRight: 'none' }} />
      {/* goals */}
      <div style={{ position: 'absolute', top: 78, bottom: 78, left: 6, width: 10, border: '2px solid #fff', borderLeft: 'none', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', top: 78, bottom: 78, right: 6, width: 10, border: '2px solid #fff', borderRight: 'none', background: 'rgba(255,255,255,0.08)' }} />

      {/* ad boards */}
      <AdBoard side="left" />
      <AdBoard side="right" />

      {/* players - left half (AR) */}
      {players.ar.map((p, i) => (
        <div key={`ar${i}`} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          transform: 'translate(-50%, -50%)', zIndex: 5,
        }}>
          <PixelPlayer kit={KITS.ar} size={18} label={p.name} />
        </div>
      ))}
      {/* players - right half (BR) */}
      {players.br.map((p, i) => (
        <div key={`br${i}`} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          transform: 'translate(-50%, -50%)', zIndex: 5,
        }}>
          <PixelPlayer kit={KITS.br} size={18} label={p.name} />
        </div>
      ))}

      {/* ball wandering */}
      <div className="pitch-ball" style={{
        position: 'absolute', zIndex: 6, left: ball.x + '%', top: ball.y + '%',
        transform: 'translate(-50%,-50%)',
      }}>
        <PixelBall size={10} />
      </div>

      {/* overlay effects (fireworks, poop, trophy, goal banner, etc) */}
      {effects}
    </div>
  );
}

// Scoreboard header for P11
function Scoreboard({ arScore, brScore, timer, shake }) {
  const total = arScore + brScore || 1;
  const arPct = arScore / total * 100;
  return (
    <div style={{
      padding: '52px 10px 10px', background: PX.night, color: '#fff',
      borderBottom: `3px solid ${PX.sunYellow}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <PixelFlag code="ar" px={4} />
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>阿根廷</div>
          </div>
          <div className={shake === 'ar' ? 'score-bump' : ''} style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 22,
            color: PX.sunYellow, marginTop: 4, textShadow: `2px 2px 0 ${PX.shadow}`,
          }}>{arScore}</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: 86 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 12,
            color: PX.red, marginBottom: 4,
          }}>VS</div>
          <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {timer.split('').map((ch, i) => (
              <div key={i} style={{
                width: ch === ':' ? 8 : 16, height: 22,
                background: ch === ':' ? 'transparent' : '#000',
                color: ch === ':' ? PX.sunYellow : PX.sunYellow,
                fontFamily: "'Press Start 2P', monospace", fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: ch === ':' ? 'none' : `1.5px solid ${PX.sunYellow}`,
              }}>{ch}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>巴西</div>
            <PixelFlag code="br" px={4} />
          </div>
          <div className={shake === 'br' ? 'score-bump' : ''} style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 22,
            color: PX.sunYellow, marginTop: 4, textShadow: `2px 2px 0 ${PX.shadow}`,
          }}>{brScore}</div>
        </div>
      </div>
      {/* tug-of-war bar */}
      <div className="tug-bar" style={{
        height: 12, marginTop: 10, border: `2px solid ${PX.sunYellow}`,
        background: 'linear-gradient(90deg, #FF4444, #FFC107 50%, #74ACDF 100%)',
        position: 'relative', display: 'flex',
      }}>
        <div style={{
          width: `${arPct}%`, background: '#FF4444',
          boxShadow: 'inset -2px 0 0 #fff',
        }} />
        <div style={{ flex: 1, background: '#74ACDF' }} />
        {/* center marker */}
        <div style={{
          position: 'absolute', top: -2, bottom: -2, left: `${arPct}%`,
          width: 2, background: '#fff', transform: 'translateX(-50%)',
        }}/>
      </div>
    </div>
  );
}

// Mic avatars panel (above pitch)
function MicPanel({ arMics, brMics }) {
  const Mic = ({ kit, name, val, flip }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4, flexDirection: flip ? 'row-reverse' : 'row',
    }}>
      <div style={{
        width: 30, height: 30, background: kit.primary,
        border: `2px solid ${PX.night}`, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.night,
      }}>
        {name[0]}
        <div style={{
          position: 'absolute', bottom: -4, [flip ? 'right' : 'left']: -4,
        }}>
          <PixelFlag code={kit.code} px={2} />
        </div>
      </div>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 7,
        color: PX.sunYellow, background: PX.night,
        padding: '2px 4px', border: `1px solid ${PX.sunYellow}`,
      }}>{val}</div>
    </div>
  );
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '6px 10px', background: PX.night,
      borderBottom: `1px solid ${PX.night}`, gap: 4,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {arMics.map((m, i) => <Mic key={i} kit={KITS.ar} name={m.name} val={m.val} />)}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {brMics.map((m, i) => <Mic key={i} kit={KITS.br} name={m.name} val={m.val} flip />)}
      </div>
    </div>
  );
}

Object.assign(window, {
  KITS, PixelPlayer, CrowdHead, CrowdRow, SplitCrowdRow, AdBoard,
  Pitch, Scoreboard, MicPanel,
});
