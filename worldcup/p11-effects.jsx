// P11 — gift effect animations overlay

function FireworkBurst({ x, y, color = '#FFD700', delay = 0 }) {
  // simple expanding ring of 8 pixels
  return (
    <div className="fw-burst" style={{
      position: 'absolute', left: x, top: y, width: 2, height: 2,
      animationDelay: `${delay}ms`, pointerEvents: 'none',
    }}>
      {[...Array(12)].map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <div key={i} className="fw-particle" style={{
          position: 'absolute', width: 4, height: 4,
          background: [PX.sunYellow, PX.red, color, '#fff'][i % 4],
          left: 0, top: 0,
          ['--dx']: `${Math.cos(a) * 40}px`,
          ['--dy']: `${Math.sin(a) * 40}px`,
          animationDelay: `${delay}ms`,
        }} />;
      })}
    </div>
  );
}

function Fireworks({ side }) {
  // 3 bursts on specified half
  const left = side === 'ar' ? 20 : 70;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
      <FireworkBurst x={`${left}%`} y="30%" color={PX.sunYellow} delay={0}/>
      <FireworkBurst x={`${left+10}%`} y="50%" color={PX.red} delay={400}/>
      <FireworkBurst x={`${left-5}%`} y="70%" color="#87CEEB" delay={800}/>
      <FireworkBurst x={`${left+5}%`} y="40%" color="#FFC107" delay={1200}/>
      <FireworkBurst x={`${left-8}%`} y="55%" color="#fff" delay={1600}/>
    </div>
  );
}

function Confetti({ side }) {
  const left = side === 'ar' ? 10 : 55;
  return (
    <div style={{ position: 'absolute', top: 0, left: `${left}%`, width: '35%', height: '100%', pointerEvents: 'none', zIndex: 20 }}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="confetti-fall" style={{
          position: 'absolute', width: 4, height: 6,
          background: [PX.sunYellow, PX.red, '#87CEEB', '#fff', PX.grassGreen][i%5],
          left: `${(i * 7) % 95}%`, top: '-10%',
          animationDelay: `${i * 80}ms`,
          ['--dx']: `${(i % 2 ? 1 : -1) * (10 + (i%4)*5)}px`,
        }} />
      ))}
    </div>
  );
}

function Champagne({ side }) {
  const left = side === 'ar' ? 25 : 75;
  return (
    <div className="champ-spray" style={{
      position: 'absolute', left: `${left}%`, top: '35%',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <div style={{ fontSize: 24 }}>🍾</div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="champ-drop" style={{
          position: 'absolute', width: 3, height: 3, background: '#FFFBCC',
          top: 8, left: 12, animationDelay: `${i * 50}ms`,
          ['--dx']: `${(i-5) * 6}px`, ['--dy']: `${-10 - (i%3)*6}px`,
        }} />
      ))}
    </div>
  );
}

function Drum({ side }) {
  // screen shake + row of drum emojis
  return (
    <div className="drum-shake" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
      display: 'flex', alignItems: 'flex-start', justifyContent: side === 'ar' ? 'flex-start' : 'flex-end',
      padding: '10px 20px',
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        color: PX.sunYellow, background: PX.night, padding: '4px 6px',
        border: `2px solid ${PX.sunYellow}`,
      }}>🥁 BOOM BOOM</div>
    </div>
  );
}

// 💩 Poop — parabolic arc from sender side to opposite half
function PoopArc({ side }) {
  const from = side === 'ar' ? '20%' : '80%';
  const to   = side === 'ar' ? '78%' : '22%';
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 22 }}>
      <div className={side === 'ar' ? 'arc-ar' : 'arc-br'} style={{
        position: 'absolute', left: from, top: '50%', fontSize: 20,
        ['--to']: to,
      }}>💩</div>
      <div className="poop-smoke" style={{
        position: 'absolute', left: to, top: '48%', fontSize: 18,
      }}>💨</div>
    </div>
  );
}

function TomatoRain({ side }) {
  const left = side === 'ar' ? 55 : 10;
  return (
    <div style={{
      position: 'absolute', top: 0, left: `${left}%`, width: '35%', height: '100%',
      pointerEvents: 'none', zIndex: 22,
    }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="tomato-fall" style={{
          position: 'absolute', fontSize: 14, top: '-10%',
          left: `${(i * 11) % 95}%`,
          animationDelay: `${i * 80}ms`,
        }}>🍅</div>
      ))}
    </div>
  );
}

function EggSplat({ side }) {
  const left = side === 'ar' ? 70 : 25;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 22 }}>
      <div className={side === 'ar' ? 'arc-ar' : 'arc-br'} style={{
        position: 'absolute', left: side === 'ar' ? '22%' : '78%', top: '50%', fontSize: 18,
        ['--to']: `${left}%`,
      }}>🥚</div>
      <div className="egg-smoke" style={{
        position: 'absolute', left: `${left}%`, top: '48%',
        fontSize: 20, color: PX.grassGreen,
      }}>💨</div>
    </div>
  );
}

function ShoeFly({ side }) {
  const from = side === 'ar' ? '20%' : '80%';
  const to   = side === 'ar' ? '78%' : '22%';
  return (
    <div className="shoe-streak" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 22,
    }}>
      <div className={side === 'ar' ? 'shoe-ar' : 'shoe-br'} style={{
        position: 'absolute', left: from, top: '50%', fontSize: 18,
        ['--to']: to,
      }}>👟💨</div>
    </div>
  );
}

function Yellow({ side }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="ref-pop" style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 20,
        background: '#FFD700', color: PX.night, padding: '14px 20px',
        border: `4px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.shadow}`,
      }}>🟨 YELLOW CARD</div>
    </div>
  );
}

function Red({ side }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="ref-pop" style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 20,
        background: PX.red, color: '#fff', padding: '14px 20px',
        border: `4px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.shadow}`,
      }}>🟥 RED CARD OUT</div>
    </div>
  );
}

function VAR({ side }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40,
      background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="var-tv" style={{
        width: '80%', height: 160, background: '#000',
        border: `6px solid #888`, boxShadow: `6px 6px 0 ${PX.shadow}`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 4px)',
        }} />
        <div className="var-glitch" style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace", fontSize: 18,
          color: PX.red,
        }}>📺 VAR<br/>RECHECK</div>
      </div>
    </div>
  );
}

// ⚽ GOAL banner — full screen red band with flag-scroll edges
function GoalBanner({ side }) {
  const flagCode = side === 'ar' ? 'ar' : 'br';
  const FlagStrip = () => (
    <div style={{
      display: 'flex', gap: 2, height: 14, overflow: 'hidden',
      background: PX.night,
    }}>
      <div className="flag-scroll" style={{
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[...Array(20)].map((_, i) => <PixelFlag key={i} code={flagCode} px={2} />)}
      </div>
      <div className="flag-scroll" style={{
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[...Array(20)].map((_, i) => <PixelFlag key={`b${i}`} code={flagCode} px={2} />)}
      </div>
    </div>
  );
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="goal-slide" style={{
        width: '120%', background: PX.red,
        border: `4px solid ${PX.night}`,
        boxShadow: `0 6px 0 ${PX.shadow}`, transform: 'rotate(-4deg)',
      }}>
        <FlagStrip />
        <div className="goal-text live-blink" style={{
          textAlign: 'center', padding: '18px 0',
          fontFamily: "'Press Start 2P', monospace", fontSize: 36,
          color: PX.sunYellow, textShadow: `4px 4px 0 ${PX.night}`,
          letterSpacing: 2,
        }}>GOAL!!!</div>
        <FlagStrip />
      </div>
    </div>
  );
}

function StarDescend({ side }) {
  const left = side === 'ar' ? 25 : 70;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
      <div className="star-drop" style={{
        position: 'absolute', left: `${left}%`, top: 0, fontSize: 42,
        filter: `drop-shadow(0 0 10px ${PX.sunYellow})`,
      }}>🌟</div>
      <div style={{
        position: 'absolute', left: `${left}%`, top: '60%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Press Start 2P', monospace", fontSize: 9,
        color: PX.sunYellow, background: PX.night,
        padding: '4px 6px', border: `2px solid ${PX.sunYellow}`,
      }} className="live-blink">⭐ 附体</div>
    </div>
  );
}

// 🏆 Trophy — full-screen gold cup descend + gold particle rain
function TrophyDescent() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 80,
      background: 'radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(0,0,0,0.6) 70%)',
      overflow: 'hidden',
    }}>
      {/* gold particles */}
      {[...Array(40)].map((_, i) => (
        <div key={i} className="gold-sparkle" style={{
          position: 'absolute', width: 4, height: 4, background: PX.sunYellow,
          left: `${(i * 11) % 100}%`, top: `${(i * 17) % 100}%`,
          animationDelay: `${i * 40}ms`,
        }}/>
      ))}
      {/* Trophy descending + halo */}
      <div className="trophy-descend" style={{
        position: 'absolute', left: '50%', top: 0,
        transform: 'translateX(-50%)',
      }}>
        <div className="halo-pulse" style={{
          position: 'absolute', inset: -30,
          background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, transparent 70%)',
        }}/>
        <div style={{ position: 'relative' }}>
          <PixelTrophy size={140} />
        </div>
      </div>
    </div>
  );
}

function ChampionShow() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 75,
      background: 'rgba(0,0,0,0.35)', overflow: 'hidden',
    }}>
      {/* many firework bursts */}
      {[...Array(10)].map((_, i) => (
        <FireworkBurst key={i}
          x={`${10 + (i*9) % 80}%`}
          y={`${20 + (i*13) % 50}%`}
          color={[PX.sunYellow, PX.red, '#87CEEB', '#fff'][i%4]}
          delay={i * 300}/>
      ))}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Press Start 2P', monospace", fontSize: 16,
        color: PX.sunYellow, textShadow: `3px 3px 0 ${PX.night}`,
      }} className="live-blink">🎇 冠军烟花秀</div>
    </div>
  );
}

function ShirtWave({ side }) {
  const left = side === 'ar' ? 8 : 54;
  return (
    <div style={{
      position: 'absolute', top: 0, left: `${left}%`, width: '38%',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 4 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="shirt-wave" style={{
            fontSize: 14, animationDelay: `${i * 100}ms`,
          }}>👕</div>
        ))}
      </div>
    </div>
  );
}

function Vuvuzela({ side }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 30,
    }}>
      <div className="live-blink" style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
        color: '#fff', background: PX.grassGreen,
        padding: '6px 10px', border: `2px solid ${PX.night}`,
      }}>🎺 BZZZZZ 🎺</div>
    </div>
  );
}

function RefWhistle() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="whistle-pop" style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 14,
        color: '#fff', background: PX.night,
        padding: '10px 14px', border: `3px solid ${PX.sunYellow}`,
      }}>🧑‍⚖️ TWEET!</div>
    </div>
  );
}

function HatTrick({ side }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 90,
      background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="hat-bounce" style={{
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 60 }}>🎩⚽⚽⚽</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 22,
          color: PX.sunYellow, marginTop: 8,
          textShadow: `3px 3px 0 ${PX.red}`,
        }} className="live-blink">HAT-TRICK!</div>
      </div>
    </div>
  );
}

// Gift flight ticker (flies across top of pitch)
function GiftTicker({ items }) {
  return (
    <div style={{
      position: 'absolute', top: 4, left: 0, right: 0, zIndex: 40,
      pointerEvents: 'none',
    }}>
      {items.map((it, i) => (
        <div key={it.id} className="ticker-fly" style={{
          position: 'absolute', top: i * 16,
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          color: '#fff', background: it.side === 'ar' ? KITS.ar.accent : KITS.br.secondary,
          padding: '3px 6px', border: `1.5px solid ${PX.sunYellow}`,
          whiteSpace: 'nowrap',
        }}>{it.emoji} {it.user} 送给 {it.sideName} · ×{it.n}</div>
      ))}
    </div>
  );
}

const EFFECT_MAP = {
  firework: Fireworks,
  confetti: Confetti,
  champagne: Champagne,
  drum: Drum,
  poop: PoopArc,
  tomato: TomatoRain,
  egg: EggSplat,
  shoe: ShoeFly,
  yellow: Yellow,
  red: Red,
  var: VAR,
  goal: GoalBanner,
  star: StarDescend,
  trophy: TrophyDescent,
  champion: ChampionShow,
  shirt: ShirtWave,
  vuvu: Vuvuzela,
};

Object.assign(window, {
  EFFECT_MAP, FireworkBurst, Fireworks, Confetti, Champagne, Drum,
  PoopArc, TomatoRain, EggSplat, ShoeFly, Yellow, Red, VAR,
  GoalBanner, StarDescend, TrophyDescent, ChampionShow, ShirtWave,
  Vuvuzela, RefWhistle, HatTrick, GiftTicker,
});
