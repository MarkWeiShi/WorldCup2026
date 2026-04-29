// P1 Match detail · P2 Ranking · P2.1 Country detail · P3 Shoot game

function P1Page({ onBack, toast, nav }) {
  const [side, setSide] = React.useState(null);
  const [tab, setTab] = React.useState(0);
  return (
    <PageShell title="MATCH FOCUS" subtitle="P1 · 焦点赛详情" onBack={onBack} darkHeader>
      {/* big VS */}
      <Card bg={PX.cream} style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <PixelFlag code="ar" px={10}/>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 6 }}>阿根廷</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>FIFA #1</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 26,
              background: PX.sunYellow, color: PX.night,
              padding: '8px 12px', border: `3px solid ${PX.night}`,
              boxShadow: `3px 3px 0 ${PX.shadow}`,
              whiteSpace: 'nowrap',
            }}>2 : 1</div>
            <div className="live-blink" style={{ marginTop: 6 }}><LiveDot/></div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginTop: 4 }}>78'</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <PixelFlag code="en" px={10}/>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 6 }}>英格兰</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>FIFA #5</div>
          </div>
        </div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, textAlign: 'center', marginTop: 10, color: '#555', borderTop: `2px dashed ${PX.night}`, paddingTop: 8 }}>
          🏟 纽约大都会球场 · 今晚 22:00 · 小组赛 D 组
        </div>
      </Card>

      {/* 站队 */}
      <SecHead title="PICK A SIDE" sub="为你支持的国家应援"/>
      <div style={{ display: 'flex', gap: 8 }}>
        <div onClick={() => setSide('ar')} className="pixel-btn" style={{
          flex: 1, padding: 12, cursor: 'pointer', textAlign: 'center',
          background: side === 'ar' ? KITS.ar.primary : PX.cream,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        }}>
          <PixelFlag code="ar" px={5}/>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 6 }}>为 🇦🇷 应援</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginTop: 3 }}>12,380 人</div>
        </div>
        <div onClick={() => setSide('en')} className="pixel-btn" style={{
          flex: 1, padding: 12, cursor: 'pointer', textAlign: 'center',
          background: side === 'en' ? '#E8E8E8' : PX.cream,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        }}>
          <PixelFlag code="en" px={5}/>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 6 }}>为 🏴 应援</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginTop: 3 }}>9,852 人</div>
        </div>
      </div>

      {/* 陪看房 */}
      <SecHead title="WATCH ROOMS" sub="陪看房 · 在线 5 场"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {['全程陪看','神解说','深夜加时','欢乐观赛','西语房'].map((t, i) => (
          <div key={i} onClick={() => toast(`进入 ${t}`)} style={{
            flex: '0 0 120px', background: '#fff',
            border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`, cursor: 'pointer',
          }}>
            <div style={{ height: 60, background: ['#FF4444','#4CAF50','#FFC107','#3F51B5','#87CEEB'][i], position: 'relative', borderBottom: `2px solid ${PX.night}` }}>
              <div style={{ position: 'absolute', top: 4, right: 4 }}><LiveDot/></div>
            </div>
            <div style={{ padding: 6 }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>{t}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 3 }}>👁 {(12 - i*2)}.{i}k</div>
            </div>
          </div>
        ))}
      </div>

      {/* 竞猜 */}
      <SecHead title="BETTING" sub="竞猜 · 赔率实时" action="更多" onAction={() => nav('P6')}/>
      <TabBar tabs={['胜平负', '比分', '首球']} active={tab} onChange={setTab} size="sm"/>
      <Card style={{ marginTop: 8 }}>
        {tab === 0 && (
          <div style={{ display: 'flex', gap: 6 }}>
            {[{l:'阿根廷胜',o:'1.82'},{l:'平局',o:'3.40'},{l:'英格兰胜',o:'4.50'}].map((b, i) => (
              <div key={i} onClick={() => toast(`下注 ${b.l}`)} className="pixel-btn" style={{
                flex: 1, padding: 8, textAlign: 'center', cursor: 'pointer',
                background: PX.cream, border: `2px solid ${PX.night}`,
                boxShadow: `2px 2px 0 ${PX.night}`,
              }}>
                <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>{b.l}</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed, marginTop: 4 }}>{b.o}</div>
              </div>
            ))}
          </div>
        )}
        {tab === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {['1:0','2:0','2:1','1:1','0:1','1:2'].map(s => (
              <div key={s} onClick={() => toast(`下注 ${s}`)} className="pixel-btn" style={{
                padding: 8, textAlign: 'center', cursor: 'pointer',
                background: PX.cream, border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
                fontFamily: "'Press Start 2P', monospace", fontSize: 11,
              }}>{s}</div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div style={{ display: 'flex', gap: 6 }}>
            <div className="pixel-btn" style={{ flex: 1, padding: 8, background: PX.cream, border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`, textAlign: 'center' }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>阿根廷首球</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed, marginTop: 4 }}>1.65</div>
            </div>
            <div className="pixel-btn" style={{ flex: 1, padding: 8, background: PX.cream, border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`, textAlign: 'center' }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>英格兰首球</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed, marginTop: 4 }}>2.10</div>
            </div>
          </div>
        )}
        <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="number" placeholder="下注金额" style={{
            flex: 1, padding: 8, border: `2px solid ${PX.night}`,
            fontFamily: "'Press Start 2P', monospace", fontSize: 10,
          }}/>
          <PixelButton color={PX.red} onClick={() => {
            if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{ name:'coin', at:0 }, { name:'confirm', at:160 }]); }
            toast('确认下注');
          }}>确认</PixelButton>
        </div>
      </Card>

      {/* 双方国家榜位 */}
      <SecHead title="COUNTRY RANK" sub="双方热力榜位"/>
      <div style={{ display: 'flex', gap: 8 }}>
        {[{c:'ar',n:'阿根廷',rk:2,v:48920},{c:'en',n:'英格兰',rk:8,v:28340}].map(x => (
          <Card key={x.c} onClick={() => nav('P2.1')} style={{ flex: 1, padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PixelFlag code={x.c} px={4}/>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{x.n}</div>
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.gold, marginTop: 6 }}>#{x.rk}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginTop: 3 }}>{x.v.toLocaleString()}</div>
          </Card>
        ))}
      </div>

      {/* 集锦 */}
      <SecHead title="HIGHLIGHTS" sub="集锦回顾"/>
      {[1,2,3].map(i => (
        <Card key={i} onClick={() => nav('P5.1')} style={{ padding: 6, marginBottom: 6, display: 'flex', gap: 8 }}>
          <div style={{ width: 80, height: 50, background: ['#FF4444','#4CAF50','#FFC107'][i-1], border: `2px solid ${PX.night}`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20 }}>▶</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{['梅西精彩任意球','凯恩远射','VAR 判罚回放'][i-1]}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>{['00:45','01:10','02:30'][i-1]} · ♥ {['12k','8k','5k'][i-1]}</div>
          </div>
        </Card>
      ))}

      <div onClick={() => toast('加入圈子讨论')} className="pixel-btn" style={{
        marginTop: 14, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.grassGreen, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
      }}>💬 加入讨论 →</div>
    </PageShell>
  );
}

function P2Page({ onBack, toast, nav }) {
  const [tab, setTab] = React.useState(0);
  const [period, setPeriod] = React.useState(1);
  const COUNTRIES = [
    'br','ar','de','fr','es','en','pt','nl','jp','kr',
    'be','hr','mx','us','ma','sn','cn',
  ];
  const names = {br:'巴西',ar:'阿根廷',de:'德国',fr:'法国',es:'西班牙',en:'英格兰',pt:'葡萄牙',nl:'荷兰',jp:'日本',kr:'韩国',be:'比利时',hr:'克罗地亚',mx:'墨西哥',us:'美国',ma:'摩洛哥',sn:'塞内加尔',cn:'中国'};
  return (
    <PageShell title="HONOR BOARD" subtitle="P2 · 48 国对抗总榜" onBack={onBack} darkHeader>
      <Card bg={PX.cream} style={{ padding: 10 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night, marginBottom: 6 }}>SCORING FORMULA</div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#444' }}>
          综合分 = 送礼 × 0.5 + 时长 × 0.3 + 进球 × 0.2
        </div>
      </Card>
      <div style={{ marginTop: 10 }}>
        <TabBar tabs={['综合','送礼','时长','进球']} active={tab} onChange={setTab} size="sm"/>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        {['今日','本周','总榜'].map((p, i) => (
          <div key={i} onClick={() => setPeriod(i)} style={{
            flex: 1, padding: 5, textAlign: 'center', cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace", fontSize: 9,
            background: period === i ? PX.sunYellow : PX.cream,
            color: PX.night, border: `2px solid ${PX.night}`,
          }}>{p}</div>
        ))}
      </div>

      {/* Top 3 podium */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 10 }}>
        {[
          { rk: 2, c: 'ar', h: 90, color: '#BBBBBB', medal: '🥈' },
          { rk: 1, c: 'br', h: 120, color: PX.sunYellow, medal: '🥇' },
          { rk: 3, c: 'de', h: 72, color: '#CD7F32', medal: '🥉' },
        ].map((p, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>
            {p.rk === 1 && <div className="halo-pulse" style={{ padding: 4 }}><PixelFlag code={p.c} px={7}/></div>}
            {p.rk !== 1 && <PixelFlag code={p.c} px={6}/>}
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 6 }}>{names[p.c]}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginTop: 3 }}>{(52340 - (p.rk-1)*3800).toLocaleString()}</div>
            <div style={{
              marginTop: 6, height: p.h, background: p.color,
              border: `3px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>{p.medal}</div>
          </div>
        ))}
      </div>

      {/* 我的国家锚点 */}
      <div style={{
        position: 'sticky', top: 84, zIndex: 20, marginTop: 14,
        background: PX.sunYellow, padding: 8, border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: PX.red }}>#7</div>
        <PixelFlag code="cn" px={4}/>
        <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>你的国家 · 中国</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.darkRed }}>38,210</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.grassGreen }}>↑2</div>
      </div>

      {/* 完整列表 */}
      <Card style={{ marginTop: 10 }}>
        {COUNTRIES.map((c, i) => (
          <div key={c} onClick={() => nav('P2.1')} className="pixel-btn" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 2px', borderBottom: i < COUNTRIES.length - 1 ? `1px dashed #ddd` : 'none',
            cursor: 'pointer',
          }}>
            <div style={{ width: 22, textAlign: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: i < 3 ? PX.gold : PX.night }}>{i+1}</div>
            <PixelFlag code={c} px={3}/>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{names[c]}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed }}>{(52340 - i*2800).toLocaleString()}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, width: 12, color: i % 3 ? PX.grassGreen : PX.red }}>{i % 3 ? '↑' : '↓'}</div>
          </div>
        ))}
      </Card>

      <div onClick={() => toast('更换应援国家')} style={{
        position: 'fixed', bottom: 80, right: 24, zIndex: 40,
        padding: '10px 12px', background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: 'pointer',
      }} className="pixel-btn">✏ 更换应援国家</div>
    </PageShell>
  );
}

function P21Page({ onBack, toast }) {
  return (
    <PageShell title="COUNTRY" subtitle="P2.1 · 国家详情 · 阿根廷" onBack={onBack} darkHeader>
      <div style={{
        padding: 20, background: KITS.ar.primary, border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`, textAlign: 'center', position: 'relative',
      }}>
        <div style={{ transform: 'scale(2)', display: 'inline-block', margin: '10px 0' }}>
          <PixelFlag code="ar" px={6}/>
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.night, marginTop: 10 }}>ARGENTINA</div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 4 }}>阿根廷 · 排名 #2</div>
      </div>
      <SecHead title="DATA" sub="数据仪表盘"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {[
          { l: 'TOTAL HEAT', v: '48,920', ic: '🔥' },
          { l: 'GIFTS',      v: '24,500', ic: '🎁' },
          { l: 'WATCH HR',   v: '12,800', ic: '⏱' },
          { l: 'GOALS',      v: '11,620', ic: '⚽' },
        ].map(x => (
          <Card key={x.l} style={{ padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>{x.ic}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.darkRed, marginTop: 6 }}>{x.v}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>{x.l}</div>
          </Card>
        ))}
      </div>
      <SecHead title="IN-COUNTRY TOP" sub="国内贡献榜"/>
      <Card>
        {['Diego','Maria','Juan','Sofia','Lio'].map((n, i) => (
          <div key={n} style={{ display: 'flex', gap: 6, padding: '5px 0', alignItems: 'center', borderBottom: i < 4 ? `1px dashed #ddd` : 'none' }}>
            <div style={{ width: 18, fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.gold }}>{i+1}</div>
            <div style={{ width: 24, height: 24, background: KITS.ar.primary, border: `2px solid ${PX.night}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 9 }}>{n[0]}</div>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{n}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.darkRed }}>{(8500 - i*1200).toLocaleString()}</div>
          </div>
        ))}
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 12 }}>
        {[
          { ic: '📻', t: '官频房' },
          { ic: '🎭', t: '文化日' },
          { ic: '💬', t: '圈子' },
        ].map(x => (
          <Card key={x.t} onClick={() => toast(x.t)} style={{ padding: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 22 }}>{x.ic}</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700, marginTop: 4 }}>{x.t}</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

function P3Page({ onBack, toast }) {
  const [result, setResult] = React.useState(null);
  const [goals, setGoals] = React.useState(12);
  const [country, setCountry] = React.useState('cn');
  const [stage, setStage] = React.useState('idle');
  const demoTimersRef = React.useRef([]);

  function clearDemoTimers() {
    demoTimersRef.current.forEach((timer) => clearTimeout(timer));
    demoTimersRef.current = [];
  }

  function setDemoStage(nextStage) {
    setStage(nextStage);
    if (!window.sfx) return;
    if (nextStage === 'pass') window.sfx.play('whoosh');
    if (nextStage === 'dribble') window.sfx.play('combo_tick');
    if (nextStage === 'shoot') window.sfx.play('kick');
    if (nextStage === 'goal') window.sfx.goalBurst();
  }

  function runDemo() {
    clearDemoTimers();
    [
      { stage: 'pass', at: 0 },
      { stage: 'dribble', at: 800 },
      { stage: 'shoot', at: 1600 },
      { stage: 'goal', at: 2400 },
      { stage: 'idle', at: 3200 },
    ].forEach((item) => {
      const timer = setTimeout(() => setDemoStage(item.stage), item.at);
      demoTimersRef.current.push(timer);
    });
  }

  React.useEffect(() => () => clearDemoTimers(), []);

  function shoot() {
    const win = Math.random() > 0.4;
    setResult(win ? 'goal' : 'miss');
    if (win) setGoals(g => g + 1);
    setTimeout(() => setResult(null), 1500);
    if (window.sfx) {
      window.sfx.suppressNextClick();
      window.sfx.play('kick');
      setTimeout(() => {
        if (win) window.sfx.goalBurst();
        else window.sfx.play('error');
      }, 350);
    }
  }

  return (
    <PageShell title="SHOOT GAME" subtitle="P3 · 射门玩法" onBack={onBack} darkHeader>
      <div style={{
        position: 'relative', background: PX.grassGreen,
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        padding: '20px 10px', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* stripes */}
        <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(90deg, #3FA042 0 20px, #4CB550 20px 40px)` }}/>
        <div style={{ position: 'relative', width: 200, margin: '0 auto' }}>
          <PixelGoal width={200} height={110}/>
          {stage === 'goal' && (
            <div className="net-shake" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}>
              <PixelGoal width={200} height={110}/>
            </div>
          )}
          {stage === 'pass' && (
            <div className="pass-trail" style={{
              position: 'absolute',
              left: 22,
              top: 84,
              width: 156,
              height: 8,
              border: `3px solid ${PX.night}`,
              boxShadow: `3px 3px 0 ${PX.shadow}`,
              background: `repeating-linear-gradient(90deg, ${PX.sunYellow} 0 14px, transparent 14px 24px)`,
              pointerEvents: 'none',
            }} />
          )}
          <div className="ball-wobble" style={{ marginTop: 10 }}>
            <PixelBall size={28}/>
          </div>
          {stage === 'dribble' && (
            <div className="ball-wobble" style={{
              position: 'absolute',
              left: '50%',
              top: 116,
              transform: 'translateX(-50%)',
              opacity: 0.85,
              pointerEvents: 'none',
            }}>
              <PixelBall size={28}/>
            </div>
          )}
          {stage === 'shoot' && (
            <div className="shoot-fly" style={{
              position: 'absolute',
              left: '50%',
              top: 116,
              width: 28,
              height: 28,
              marginLeft: -14,
              pointerEvents: 'none',
            }}>
              <PixelBall size={28}/>
            </div>
          )}
          {stage === 'goal' && (
            <div className="live-blink" style={{
              position: 'absolute',
              top: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              background: PX.red,
              color: PX.sunYellow,
              padding: '6px 12px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 18,
              border: `3px solid ${PX.sunYellow}`,
              textShadow: `2px 2px 0 ${PX.night}`,
              pointerEvents: 'none',
            }}>GOAL</div>
          )}
          {result === 'goal' && (
            <div className="live-blink" style={{
              position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
              background: PX.red, color: PX.sunYellow, padding: '6px 12px',
              fontFamily: "'Press Start 2P', monospace", fontSize: 18,
              border: `3px solid ${PX.sunYellow}`, textShadow: `2px 2px 0 ${PX.night}`,
            }}>GOAL!</div>
          )}
          {result === 'miss' && (
            <div style={{
              position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
              background: PX.night, color: '#fff', padding: '6px 10px',
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            }}>MISS · 😢</div>
          )}
        </div>
      </div>

      <div onClick={shoot} className="pixel-btn" style={{
        marginTop: 14, padding: '14px 0', cursor: 'pointer', textAlign: 'center',
        background: PX.red, color: '#fff',
        border: `4px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 16,
      }}>⚡ 射门 !</div>
      <div style={{ marginTop: 8 }}>
        <PixelButton
          onClick={runDemo}
          color={PX.sunYellow}
          textColor={PX.night}
          style={{ width: '100%', display: 'block' }}
        >
          DEMO · 传球→过人→射门→进球
        </PixelButton>
      </div>

      <SecHead title="PROGRESS" sub="进度 · 奖励"/>
      <Card>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: PX.red }}>{goals}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888' }}>TODAY</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginBottom: 4 }}>NEXT: 金靴徽章 ({goals}/15)</div>
            <ProgressBar value={goals} max={15}/>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.gold }}>240</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888' }}>TOTAL</div>
          </div>
        </div>
      </Card>

      {/* 奖励阶梯 */}
      <SecHead title="REWARDS" sub="阶梯奖励"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[5, 15, 50, 100, 500].map((th, i) => {
          const unlocked = goals >= th;
          return (
            <Card key={i} style={{
              flex: '0 0 90px', padding: 8, textAlign: 'center',
              borderColor: unlocked ? PX.gold : PX.night,
              boxShadow: unlocked ? `3px 3px 0 ${PX.gold}` : `3px 3px 0 ${PX.night}`,
              opacity: unlocked ? 1 : 0.7,
            }}>
              <div style={{ fontSize: 22 }}>{['🎁','🎖','⚽','👟','🏆'][i]}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.red, marginTop: 4 }}>{th} 球</div>
              {unlocked && <Tag color={PX.gold}>已解锁</Tag>}
            </Card>
          );
        })}
      </div>

      {/* 映射 */}
      <SecHead title="GIFT MAP" sub="4 档礼物映射"/>
      <Card>
        {[
          { g: '🎁 应援贴纸', act: '传球', r: '+1 助攻' },
          { g: '🌹 玫瑰花',   act: '过人', r: '+1 过人' },
          { g: '🎯 精准瞄准', act: '射门', r: '+1 射门' },
          { g: '🏆 大力神杯', act: '进球', r: '+1 进球 · 触发 GOAL 特效' },
        ].map((x, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', alignItems: 'center', borderBottom: i < 3 ? `1px dashed #ddd` : 'none' }}>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{x.g}</div>
            <Tag>{x.act}</Tag>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed }}>{x.r}</div>
          </div>
        ))}
      </Card>

      <SecHead title="PICK COUNTRY" sub="为谁射门"/>
      <FlagRow codes={ALL_CODES.slice(0,12)} selected={country} onPick={setCountry}/>

      <SecHead title="FRIENDS" sub="好友榜"/>
      <Card>
        {['Diego','Hans','Luiza'].map((n, i) => (
          <div key={n} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '5px 0', borderBottom: i < 2 ? `1px dashed #ddd` : 'none' }}>
            <div style={{ width: 18, fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.gold }}>{i+1}</div>
            <div style={{ width: 22, height: 22, background: PX.sunYellow, border: `2px solid ${PX.night}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 9 }}>{n[0]}</div>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{n}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.darkRed }}>{80 - i*15} 球</div>
          </div>
        ))}
      </Card>

      <div onClick={() => toast('送礼射门')} className="pixel-btn" style={{
        marginTop: 14, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.gold, color: PX.night,
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
      }}>🎁 送礼射门 →</div>
    </PageShell>
  );
}

Object.assign(window, { P1Page, P2Page, P21Page, P3Page });
