// P11 — page composition

function PouchProgress({ value }) {
  return (
    <div style={{
      padding: '6px 10px',
      background: PX.night,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <PixelPouch size={18} />
        <div style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 8,
          color: PX.sunYellow,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>福袋累送 {value}/10000</div>
      </div>
      <div style={{ flex: 1 }}>
        <ProgressBar value={value} max={10000} height={8} color={PX.gold} />
      </div>
    </div>
  );
}

function PouchUnlockOverlay() {
  return (
    <div className="pouchUnlock-screen" style={{
      position: 'absolute',
      inset: 0,
      zIndex: 150,
      background: 'rgba(26,26,62,0.88)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pouchUnlock 2s steps(8, end) forwards',
      pointerEvents: 'none',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="pouch-glow" style={{ display: 'inline-block' }}>
          <PixelPouch size={76} />
        </div>
        <div style={{
          marginTop: 12,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10,
          color: PX.sunYellow,
          lineHeight: 1.6,
        }}>LUCKY POUCH UNLOCKED</div>
      </div>
    </div>
  );
}

function BattleStarsStrip() {
  const stars = [
    { key: 'messi', label: 'MESSI' },
    { key: 'ronaldo', label: 'RONALDO' },
    { key: 'neymar', label: 'NEYMAR' },
    { key: 'kane', label: 'KANE' },
  ];
  return (
    <div style={{ padding: '8px 10px 0' }}>
      <PixelBox bg={PX.cream}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          <div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              color: PX.night,
            }}>STAR PREVIEW</div>
            <div style={{
              marginTop: 4,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: PX.night,
            }}>本场球星</div>
          </div>
          <Tag color={PX.sunYellow}>4 STAR</Tag>
        </div>
        <div style={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          {stars.map((star) => (
            <div key={star.key} style={{ textAlign: 'center', flex: 1 }}>
              <PixelStar name={star.key} size={40} />
              <div style={{
                marginTop: 6,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: PX.night,
                lineHeight: 1.4,
              }}>{star.label}</div>
            </div>
          ))}
        </div>
      </PixelBox>
    </div>
  );
}

function P11Page({ onBack }) {
  const [phase, setPhase] = React.useState('pre'); // pre | live | settle
  const [arScore, setArScore] = React.useState(1280);
  const [brScore, setBrScore] = React.useState(980);
  const [timer, setTimer]     = React.useState({ m: 7, s: 23 });
  const [effects, setEffects] = React.useState([]); // {id, kind, side, ts}
  const [ticker, setTicker]   = React.useState([]); // flying gift announcements
  const [bump, setBump]       = React.useState(null);
  const [side, setSide]       = React.useState('ar');
  const [lastGift, setLastGift] = React.useState({ id: null, count: 0 });
  const [combo, setCombo]     = React.useState(0);
  const [whistle, setWhistle] = React.useState(false);
  const [hatTrick, setHatTrick] = React.useState(false);
  const [pouchSum, setPouchSum] = React.useState(0);
  const [pouchUnlocked, setPouchUnlocked] = React.useState(false);

  const [ball, setBall] = React.useState({ x: 50, y: 50 });
  const pouchSumRef = React.useRef(0);

  // players positions
  const [players] = React.useState({
    ar: [
      { x: 10, y: 50, name: 'GK'   },
      { x: 22, y: 25, name: 'Juan' },
      { x: 22, y: 75, name: 'Lio'  },
      { x: 35, y: 50, name: 'Maria'},
    ],
    br: [
      { x: 90, y: 50, name: 'GK'   },
      { x: 78, y: 25, name: 'Caio' },
      { x: 78, y: 75, name: 'Luiza'},
      { x: 65, y: 50, name: 'Pedro'},
    ],
  });

  // Ball wanders
  React.useEffect(() => {
    const id = setInterval(() => {
      setBall(b => ({
        x: Math.max(18, Math.min(82, b.x + (Math.random() - 0.5) * 8)),
        y: Math.max(25, Math.min(75, b.y + (Math.random() - 0.5) * 8)),
      }));
    }, 700);
    return () => clearInterval(id);
  }, []);

  // Countdown
  React.useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => {
      setTimer(t => {
        let { m, s } = t;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) {
          setPhase('settle');
          clearInterval(id);
          if (window.sfx) window.sfx.mvpBurst();
          return { m: 0, s: 0 };
        }
        return { m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Whistle visual on battle start（音效在 startBattle 里同步播，这里只管动画）
  React.useEffect(() => {
    if (phase === 'live') {
      setWhistle(true);
      const id = setTimeout(() => setWhistle(false), 1600);
      return () => clearTimeout(id);
    }
  }, [phase]);

  React.useEffect(() => {
    pouchSumRef.current = pouchSum;
  }, [pouchSum]);

  function triggerPouchUnlock() {
    setPouchUnlocked(true);
    if (window.sfx) {
      window.sfx.seq([
        { name: 'firework_pop', at: 0 },
        { name: 'firework_pop', at: 180 },
        { name: 'firework_pop', at: 360 },
      ]);
    }
    setTimeout(() => setPouchUnlocked(false), 2000);
  }

  function addToPouch(sumDelta) {
    const prev = pouchSumRef.current;
    const next = Math.min(10000, prev + sumDelta);
    if (window.sfx) {
      if (prev < 5000 && next >= 5000) window.sfx.play('coin');
      if (prev < 8000 && next >= 8000) setTimeout(() => window.sfx.play('coin'), 120);
    }
    if (next >= 10000) {
      pouchSumRef.current = 0;
      setPouchSum(0);
      triggerPouchUnlock();
      return;
    }
    pouchSumRef.current = next;
    setPouchSum(next);
  }

  function sendGift(gift, n) {
    const now = Date.now();
    const pouchGain = gift.coin * n;
    // score boost
    const pts = Math.max(5, Math.round(gift.coin * n * 0.3));
    if (side === 'ar') setArScore(s => s + pts); else setBrScore(s => s + pts);
    setBump(side);
    setTimeout(() => setBump(null), 400);

    // combo logic
    let nextCombo = 0;
    if (lastGift.id === gift.id && (now - (lastGift.ts || 0)) < 5000) {
      nextCombo = lastGift.count + 1;
    } else {
      nextCombo = 1;
    }
    setLastGift({ id: gift.id, count: nextCombo, ts: now });
    setCombo(nextCombo);

    // ── SFX · 按档位 + 道具类型精准匹配（单音效，不叠加）─────
    if (window.sfx) {
      window.sfx.suppressNextClick();
      const coin = gift.coin || 0;
      const byKind = {
        fireworks:  () => window.sfx.play('firework_pop'),
        champagne:  () => window.sfx.play('splat'),
        drums:      () => window.sfx.play('drum_hit'),
        shoeAR:     () => window.sfx.play('whoosh'),
        shoeBR:     () => window.sfx.play('whoosh'),
        arcAR:      () => setTimeout(() => window.sfx.play('splat'), 500),
        arcBR:      () => setTimeout(() => window.sfx.play('splat'), 500),
        tomato:     () => window.sfx.play('splat'),
        refCard:    () => window.sfx.play('card_snap'),
        varTV:      () => window.sfx.play('tv_static'),
        goal:       () => window.sfx.play('goal_fanfare'),  // 单曲不叠 burst
        shirt:      () => window.sfx.play('gift_mid'),
        trophy:     () => window.sfx.play('gift_high'),
        champion:   () => window.sfx.play('gift_boom'),
        star:       () => window.sfx.play('achievement'),
        hatTrick:   () => window.sfx.play('hattrick'),
      };
      if (byKind[gift.id]) byKind[gift.id]();
      else window.sfx.giftByPrice(coin);
    }

    addToPouch(pouchGain);

    // effect
    const eid = `e${now}_${Math.random()}`;
    setEffects(e => [...e, { id: eid, kind: gift.id, side, ts: now }]);
    // auto-remove after duration
    const dur = gift.id === 'trophy' ? 4500 :
                gift.id === 'champion' ? 5000 :
                gift.id === 'goal' ? 3000 :
                gift.id === 'var' ? 2200 :
                2000;
    setTimeout(() => setEffects(e => e.filter(x => x.id !== eid)), dur);

    // hat-trick combo
    if (gift.id === 'goal' && nextCombo >= 3) {
      setHatTrick(true);
      setTimeout(() => setHatTrick(false), 2800);
      if (window.sfx) setTimeout(() => window.sfx.hatTrickBurst(), 200);
    }

    // ticker
    const tid = `t${now}`;
    setTicker(t => [...t, {
      id: tid, emoji: gift.emoji, user: ['Maria','Juan','Luiza','Pedro','Sofia'][Math.floor(Math.random()*5)],
      sideName: side === 'ar' ? '阿根廷' : '巴西', n,
      side,
    }].slice(-4));
    setTimeout(() => setTicker(t => t.filter(x => x.id !== tid)), 3000);
  }

  function startBattle(pair, dur) {
    // 哨声同步在点击瞬间播，不在 useEffect 里延迟触发
    if (window.sfx) window.sfx.play('whistle_tweet');
    setTimer({ m: dur - 1, s: 59 });
    setArScore(0); setBrScore(0);
    setPhase('live');
  }

  const timerStr = `${String(timer.m).padStart(2,'0')}:${String(timer.s).padStart(2,'0')}`;

  // mic panel
  const arMics = [
    { name: 'Maria', val: '1.2k' }, { name: 'Juan', val: '820' }, { name: 'Sofia', val: '410' },
  ];
  const brMics = [
    { name: 'Luiza', val: '960' }, { name: 'Pedro', val: '612' }, { name: 'Caio', val: '205' },
  ];

  return (
    <div data-screen-label="02 P11 Battle" style={{ position: 'relative', minHeight: '100%', background: PX.night }}>
      <Scoreboard arScore={arScore} brScore={brScore} timer={timerStr} shake={bump} />
      <PouchProgress value={pouchSum} />

      {/* top crowd — split flags */}
      <SplitCrowdRow side="top" leftFlag="ar" rightFlag="br" count={22} />

      {/* pitch */}
      <div style={{ position: 'relative' }}>
        <Pitch players={players} ball={ball} effects={
          <>
            {effects.map(e => {
              const C = EFFECT_MAP[e.kind];
              return C ? <C key={e.id} side={e.side} /> : null;
            })}
          </>
        } />
        <GiftTicker items={ticker} />
      </div>

      {/* bottom crowd */}
      <SplitCrowdRow side="bottom" leftFlag="ar" rightFlag="br" count={22} />

      {/* Mic bar */}
      <MicPanel arMics={arMics} brMics={brMics} />
      <BattleStarsStrip />

      {/* Info row */}
      <div style={{
        padding: '8px 10px', background: PX.night, color: '#fff',
        fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 8, borderTop: `2px dashed ${PX.sunYellow}`,
      }}>
        <span style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          color: PX.sunYellow,
        }}>⚔ BATTLE MODE</span>
        <span>· 送礼即助攻</span>
        <span style={{ flex: 1 }}/>
        <span onClick={onBack} style={{
          color: PX.red, cursor: 'pointer', fontFamily: "'Press Start 2P', monospace", fontSize: 8,
        }}>← 返回 H0</span>
      </div>

      <GiftPanel onSend={sendGift} combo={combo > 1 ? combo : null} side={side} setSide={setSide} />

      {/* pre-battle modal */}
      {phase === 'pre' && <PreBattleModal onStart={startBattle} onClose={() => setPhase('live')} />}

      {/* referee whistle */}
      {whistle && <RefWhistle />}

      {/* hat trick overlay */}
      {hatTrick && <HatTrick side={side} />}

      {pouchUnlocked && <PouchUnlockOverlay />}

      {/* settlement */}
      {phase === 'settle' && <MVPSettlement arScore={arScore} brScore={brScore} onClose={onBack} />}
    </div>
  );
}

Object.assign(window, { P11Page });
