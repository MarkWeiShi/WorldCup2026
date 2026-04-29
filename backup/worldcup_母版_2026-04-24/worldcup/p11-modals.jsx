// P11 — pre-battle modal + MVP settlement

const MATCHUPS = [
  { a: 'ar', b: 'br', title: '南美德比',  sub: 'Argentina vs Brazil' },
  { a: 'de', b: 'fr', title: '欧洲豪门',  sub: 'Germany vs France' },
  { a: 'en', b: 'es', title: '大西洋对峙', sub: 'England vs Spain' },
  { a: 'pt', b: 'nl', title: 'C罗之战',   sub: 'Portugal vs Netherlands' },
  { a: 'jp', b: 'kr', title: '亚洲双雄',  sub: 'Japan vs Korea' },
  { a: 'be', b: 'hr', title: '黑马对决',  sub: 'Belgium vs Croatia' },
  { a: 'mx', b: 'us', title: '北美德比',  sub: 'Mexico vs USA' },
  { a: 'ma', b: 'sn', title: '非洲之光',  sub: 'Morocco vs Senegal' },
];

// supplementary flag patterns for extras
const EXTRA_FLAGS = {
  pt: [['r','r','g','g','g','g'],['r','r','g','g','g','g'],['r','r','g','y','g','g'],['r','r','g','y','g','g'],['r','r','g','g','g','g'],['r','r','g','g','g','g']],
  nl: [['r','r','r','r','r','r'],['r','r','r','r','r','r'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['b','b','b','b','b','b'],['b','b','b','b','b','b']],
  jp: [['w','w','w','w','w','w'],['w','w','r','r','w','w'],['w','r','r','r','r','w'],['w','r','r','r','r','w'],['w','w','r','r','w','w'],['w','w','w','w','w','w']],
  kr: [['w','w','w','w','w','w'],['w','r','r','w','k','k'],['w','b','r','w','k','w'],['k','w','b','b','w','k'],['k','k','w','b','b','w'],['w','w','w','w','w','w']],
  be: [['k','k','y','y','r','r'],['k','k','y','y','r','r'],['k','k','y','y','r','r'],['k','k','y','y','r','r'],['k','k','y','y','r','r'],['k','k','y','y','r','r']],
  hr: [['r','r','w','w','r','r'],['w','w','r','r','w','w'],['r','r','w','w','r','r'],['w','w','r','r','w','w'],['b','b','b','b','b','b'],['b','b','b','b','b','b']],
  mx: [['g','g','w','w','r','r'],['g','g','w','w','r','r'],['g','g','w','y','r','r'],['g','g','w','y','r','r'],['g','g','w','w','r','r'],['g','g','w','w','r','r']],
  us: [['r','r','w','w','w','w'],['b','b','y','w','w','w'],['b','b','w','w','w','w'],['r','r','w','w','w','w'],['w','w','w','w','w','w'],['r','r','r','r','r','r']],
  ma: [['r','r','r','r','r','r'],['r','r','g','g','r','r'],['r','g','g','g','g','r'],['r','g','g','g','g','r'],['r','r','g','g','r','r'],['r','r','r','r','r','r']],
  sn: [['g','g','y','y','r','r'],['g','g','y','y','r','r'],['g','g','y','g','r','r'],['g','g','y','y','r','r'],['g','g','y','y','r','r'],['g','g','y','y','r','r']],
};
Object.assign(FLAGS, EXTRA_FLAGS);

const SCHEDULE_TODAY = [
  { t: '20:00', a: 'ar', b: 'en', live: true,  name: '阿根廷 vs 英格兰', stage: '小组赛 A' },
  { t: '22:30', a: 'de', b: 'fr', live: false, name: '德国 vs 法国',     stage: '小组赛 D' },
  { t: '02:00', a: 'br', b: 'es', live: false, name: '巴西 vs 西班牙',   stage: '小组赛 H' },
];

function PreBattleModal({ onStart, onClose }) {
  const [tab, setTab] = React.useState(0);
  const [sel, setSel] = React.useState(0);
  const [pickA, setPickA] = React.useState('ar');
  const [pickB, setPickB] = React.useState('br');
  const [schedulePick, setSchedulePick] = React.useState(0);
  const allCodes = ['ar','br','en','de','fr','es','cn','pt','nl','jp','kr','be','hr','mx','us','ma','sn'];

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: PX.cream,
        border: `3px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.shadow}`,
      }}>
        <div style={{
          background: PX.night, color: PX.sunYellow, padding: '8px 10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        }}>
          <span>⚔ 开启国家对决</span>
          <span onClick={onClose} style={{ cursor: 'pointer', color: PX.red }}>✕</span>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `2px solid ${PX.night}` }}>
          {['经典对决', '自由选国', '跟随赛程'].map((t, i) => (
            <div key={i} onClick={() => setTab(i)} style={{
              flex: 1, padding: '8px 0', textAlign: 'center', cursor: 'pointer',
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
              background: tab === i ? PX.sunYellow : 'transparent',
              color: PX.night,
              borderRight: i < 2 ? `2px solid ${PX.night}` : 'none',
            }}>{t}</div>
          ))}
        </div>

        {/* content */}
        <div style={{ padding: 10, minHeight: 180 }}>
          {tab === 0 && (
            <div style={{
              display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0 10px',
            }} className="h-scroll">
              {MATCHUPS.map((m, i) => (
                <div key={i} onClick={() => setSel(i)}
                  className="pixel-btn"
                  style={{
                    flex: '0 0 140px', padding: 8, cursor: 'pointer',
                    background: sel === i ? PX.sunYellow : '#fff',
                    border: `3px solid ${PX.night}`,
                    boxShadow: sel === i ? `3px 3px 0 ${PX.red}` : `2px 2px 0 ${PX.night}`,
                  }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <PixelFlag code={m.a} px={4} />
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.red }}>VS</div>
                    <PixelFlag code={m.b} px={4} />
                  </div>
                  <div style={{
                    fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                    fontWeight: 700, marginTop: 6, textAlign: 'center',
                  }}>{m.title}</div>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: 6,
                    color: '#888', marginTop: 3, textAlign: 'center',
                  }}>{m.sub}</div>
                </div>
              ))}
            </div>
          )}
          {tab === 1 && (
            <div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX.night, marginBottom: 6, fontWeight: 700,
              }}>选择 A 队</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                {allCodes.map(c => (
                  <div key={c} onClick={() => setPickA(c)} style={{
                    padding: 3, cursor: 'pointer',
                    background: pickA === c ? PX.sunYellow : 'transparent',
                    border: `2px solid ${pickA === c ? PX.red : PX.night}`,
                  }}>
                    <PixelFlag code={c} px={3} />
                  </div>
                ))}
              </div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX.night, marginBottom: 6, fontWeight: 700,
              }}>选择 B 队</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {allCodes.map(c => (
                  <div key={c} onClick={() => setPickB(c)} style={{
                    padding: 3, cursor: 'pointer',
                    background: pickB === c ? PX.sunYellow : 'transparent',
                    border: `2px solid ${pickB === c ? PX.red : PX.night}`,
                  }}>
                    <PixelFlag code={c} px={3} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 2 && (
            <div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX.night, fontWeight: 700, marginBottom: 8,
              }}>选中今日赛程 · 房间时长自动同步比赛</div>
              {SCHEDULE_TODAY.map((m, i) => {
                const picked = schedulePick === i;
                return (
                  <div key={i} onClick={() => setSchedulePick(i)}
                    className="pixel-btn"
                    style={{
                      display: 'flex', alignItems: 'center', padding: '8px 6px',
                      gap: 10, marginBottom: 6, cursor: 'pointer',
                      background: picked ? PX.sunYellow : '#fff',
                      border: `2px solid ${PX.night}`,
                      boxShadow: picked ? `3px 3px 0 ${PX.red}` : `2px 2px 0 ${PX.night}`,
                    }}>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                      color: PX.red, width: 40,
                    }}>{m.t}</div>
                    <PixelFlag code={m.a} px={3}/>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.night }}>VS</div>
                    <PixelFlag code={m.b} px={3}/>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                      <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, color: PX.night, fontWeight: 700 }}>{m.stage}</div>
                      {m.live && <LiveDot/>}
                    </div>
                  </div>
                );
              })}
              <div style={{
                marginTop: 8, padding: '8px 10px',
                background: PX.grassGreen, color: '#fff',
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                fontWeight: 700, lineHeight: 1.5,
                border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
              }}>
                跟随本场比赛节奏 · 赛后自动结算开箱
              </div>
            </div>
          )}

          <div onClick={() => {
            const pair = tab === 0 ? MATCHUPS[sel] :
                         tab === 1 ? { a: pickA, b: pickB } :
                         { a: SCHEDULE_TODAY[schedulePick].a, b: SCHEDULE_TODAY[schedulePick].b };
            onStart(pair, 10);
          }} className="pixel-btn" style={{
            marginTop: 12, textAlign: 'center', padding: '12px 0', cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace", fontSize: 12,
            background: PX.grassGreen, color: '#fff',
            border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
          }}>⚔ 开始对战</div>
        </div>
      </div>
    </div>
  );
}

function WinnerChestRewards({ winnerScore, loserScore }) {
  const [opened, setOpened] = React.useState(false);
  const rebate = Math.round((winnerScore - loserScore) * 0.1);
  const confettiBits = [
    { left: '10%', color: PX.red, dx: '-18px', delay: '0s' },
    { left: '22%', color: PX.sunYellow, dx: '-10px', delay: '0.15s' },
    { left: '34%', color: PX.gold, dx: '6px', delay: '0.25s' },
    { left: '48%', color: '#fff', dx: '-4px', delay: '0.05s' },
    { left: '62%', color: PX.red, dx: '12px', delay: '0.2s' },
    { left: '76%', color: PX.sunYellow, dx: '18px', delay: '0.1s' },
    { left: '88%', color: PX.gold, dx: '10px', delay: '0.3s' },
  ];

  React.useEffect(() => {
    if (window.sfx) {
      window.sfx.seq([
        { name: 'gift_boom', at: 0 },
        { name: 'firework_pop', at: 400 },
        { name: 'firework_pop', at: 700 },
      ]);
    }
    const timer = setTimeout(() => setOpened(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PixelBox bg={PX.cream} style={{ marginTop: 14, overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', position: 'relative', minHeight: 126 }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          color: PX.night, letterSpacing: 0.4,
        }}>WINNER CHEST</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
          color: PX.darkRed, marginTop: 4, fontWeight: 700,
        }}>胜方开箱</div>

        <div style={{ position: 'relative', width: 86, height: 70, margin: '12px auto 0' }}>
          <div className="chest-shake" style={{
            position: 'absolute', left: '50%', top: 18,
            transform: 'translateX(-50%)',
            animationDuration: '2s',
            animationIterationCount: 1,
          }}>
            <PixelChest size={56} />
          </div>
          <div style={{
            position: 'absolute', left: '50%', top: 12,
            width: 46, height: 14,
            transform: 'translateX(-50%)',
            transformOrigin: 'left bottom',
            background: PX.sunYellow,
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.shadow}`,
            animation: 'chestOpen 520ms steps(6, end) 2s forwards',
          }}>
            <div style={{
              width: 10, height: 4, margin: '2px auto 0',
              background: PX.night,
            }} />
          </div>

          {opened && confettiBits.map((bit, idx) => (
            <div key={idx} className="confetti-fall" style={{
              position: 'absolute', top: 18, left: bit.left,
              width: 6, height: 8, background: bit.color,
              border: `2px solid ${PX.night}`,
              '--dx': bit.dx,
              animationDelay: bit.delay,
            }} />
          ))}
        </div>

        {opened && (
          <>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'end',
              gap: 10, marginTop: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'end' }}><PixelTrophy size={20} /></div>
              <div style={{ display: 'flex', alignItems: 'end' }}><PixelBall size={16} /></div>
              <div style={{ display: 'flex', alignItems: 'end' }}><PixelFlag code="cn" px={3} /></div>
            </div>
            <div style={{
              marginTop: 10,
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: PX.night, lineHeight: 1.6,
            }}>
              CHEST OPENED · 返还 {rebate} 币 · 稀有奖励解锁
            </div>
          </>
        )}
      </div>
    </PixelBox>
  );
}

function MVPSettlement({ arScore, brScore, onClose }) {
  const winner = arScore >= brScore ? 'ar' : 'br';
  const winName = winner === 'ar' ? '阿根廷' : '巴西';
  const winnerScore = Math.max(arScore, brScore);
  const loserScore = Math.min(arScore, brScore);
  const arMVP = [
    { name: 'Maria',  val: 5288 },
    { name: 'Juan',   val: 3102 },
    { name: 'Sofia',  val: 1980 },
  ];
  const brMVP = [
    { name: 'Luiza',  val: 4820 },
    { name: 'Pedro',  val: 2980 },
    { name: 'Caio',   val: 1540 },
  ];
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 120,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', padding: '60px 10px 50px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div className="halo-pulse" style={{
          display: 'inline-block', padding: 6,
        }}>
          <PixelFlag code={winner} px={8}/>
        </div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 18,
          color: PX.sunYellow, marginTop: 8,
          textShadow: `3px 3px 0 ${PX.red}`,
        }} className="live-blink">{winName} WINS!</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
          color: '#fff', marginTop: 6,
        }}>终场 · {arScore} : {brScore}</div>
      </div>

      <div style={{
        flex: 1, background: PX.cream, padding: 10, overflow: 'auto',
        border: `3px solid ${PX.sunYellow}`,
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
          color: PX.night, marginBottom: 8, textAlign: 'center',
        }}>MVP TOP 3 · 贡献榜</div>
        {['ar','br'].map(code => (
          <div key={code} style={{ marginBottom: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
              color: PX.night, fontWeight: 700, marginBottom: 4,
            }}>
              <PixelFlag code={code} px={3}/>
              {code === 'ar' ? '阿根廷方' : '巴西方'}
            </div>
            {(code === 'ar' ? arMVP : brMVP).map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '4px 6px', background: '#fff',
                border: `2px solid ${PX.night}`, marginBottom: 4,
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace", fontSize: 12,
                  color: [PX.gold, '#bbb', '#c68642'][i], width: 20,
                }}>{['🥇','🥈','🥉'][i]}</div>
                <div style={{
                  width: 22, height: 22, background: (code === 'ar' ? KITS.ar.primary : KITS.br.primary),
                  border: `2px solid ${PX.night}`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                }}>{m.name[0]}</div>
                <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.red }}>{m.val}</div>
              </div>
            ))}
          </div>
        ))}

        {/* chest reward */}
        <div style={{
          background: PX.night, padding: 10, marginTop: 6,
          border: `3px solid ${PX.sunYellow}`, textAlign: 'center',
        }}>
          <div className="chest-shake" style={{ display: 'inline-block' }}>
            <PixelChest size={48}/>
          </div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 9,
            color: PX.sunYellow, marginTop: 6,
          }} className="live-blink">TAP TO OPEN · 解锁奖励</div>
          <div style={{
            fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
            color: '#fff', marginTop: 4,
          }}>金杯徽章 × 1 · 热力 +500</div>
        </div>

        <WinnerChestRewards winnerScore={winnerScore} loserScore={loserScore} />
      </div>

      <div onClick={onClose} className="pixel-btn" style={{
        marginTop: 10, textAlign: 'center', padding: '12px 0', cursor: 'pointer',
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
        background: PX.red, color: '#fff',
        border: `3px solid ${PX.sunYellow}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
      }}>返回房间</div>
    </div>
  );
}

Object.assign(window, { MATCHUPS, PreBattleModal, MVPSettlement });
