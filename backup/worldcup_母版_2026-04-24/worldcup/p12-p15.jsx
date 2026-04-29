// P12 国家礼物大厅 · P13 陪看房间内 · P13.1 进球解说录制 · P14 圈子广场 · P15 文化专区
// 这 5 页是从原 P4/P5/P5.1/P8/P9 挪过来的，内容保持不变，只是页码整理。

function P12Page({ onBack, toast, nav }) {
  const [country, setCountry] = React.useState('ar');
  const [tab, setTab] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const gifts = [
    { ic: '🎁', n: '国家贴纸', p: 1, r: '+2 热力' },
    { ic: '🌹', n: '国花', p: 9, r: '+20 热力' },
    { ic: '🧣', n: '围巾', p: 19, r: '+50 · 助攻 +1' },
    { ic: '🎯', n: '精准瞄准', p: 39, r: '射门 +1' },
    { ic: '🎆', n: '烟花', p: 99, r: '半场特效' },
    { ic: '👑', n: '王冠', p: 199, r: '+500 热力' },
    { ic: '⚽', n: '黄金足球', p: 299, r: '进球 +1 · GOAL' },
    { ic: '🏆', n: '大力神杯', p: 1888, r: '全屏 · ×2 贡献' },
    { ic: '🧨', n: '鞭炮', p: 6, r: '+10' },
    { ic: '🥁', n: '战鼓', p: 29, r: '屏震' },
    { ic: '📣', n: '呜呜祖拉', p: 15, r: '音效' },
    { ic: '🎺', n: '军号', p: 69, r: '+100' },
    { n: '黄牌', p: 5, r: '裁判手势 · +8', kind: 'card' },
    { n: '冠军金戒', p: 3888, r: '×3 贡献 · 专属金光', kind: 'ring' },
    { n: '世界杯全家福', p: 6666, r: '10s 动画 · 世界喝彩', kind: 'family' },
    { n: '冠军之光', p: 9999, r: '限定 · 荣誉榜上墙', kind: 'glory' },
  ];

  function renderGiftIcon(g) {
    if (g.kind === 'card') {
      return (
        <div style={{
          width: 10, height: 14, margin: '0 auto',
          background: PX.sunYellow,
          border: `2px solid ${PX.night}`,
          boxShadow: `2px 2px 0 ${PX.night}`,
        }} />
      );
    }
    if (g.kind === 'ring') {
      return (
        <div style={{
          width: 16, height: 16, margin: '0 auto',
          borderRadius: '50%',
          border: `4px solid ${PX.gold}`,
          boxShadow: `0 0 0 2px ${PX.night}`,
          background: 'transparent',
        }} />
      );
    }
    if (g.kind === 'family') {
      return (
        <div style={{
          width: 28, height: 18, margin: '0 auto',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}><PixelBall size={8} /></div>
          <div style={{ position: 'absolute', left: 10, top: 0 }}><PixelBall size={8} /></div>
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}><PixelBall size={8} /></div>
        </div>
      );
    }
    if (g.kind === 'glory') {
      return (
        <div className="halo-pulse" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 34,
          height: 34,
        }}>
          <PixelTrophy size={28} />
        </div>
      );
    }
    return <div style={{ fontSize: 26 }}>{g.ic}</div>;
  }

  return (
    <PageShell title="GIFT HALL" subtitle="P12 · 国家礼物大厅" onBack={onBack} darkHeader>
      <SecHead title="PICK COUNTRY" sub="为哪个国家送礼"/>
      <FlagRow codes={ALL_CODES} selected={country} onPick={setCountry}/>
      <div style={{ marginTop: 10 }}>
        <TabBar tabs={['国家礼物','公共礼物','限定礼物']} active={tab} onChange={setTab} size="sm"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 10 }}>
        {gifts.map((g, i) => (
          <div key={i} onClick={() => setPick(i)} className="pixel-btn" style={{
            padding: 8, background: pick === i ? PX.sunYellow : '#fff',
            border: `3px solid ${pick === i ? PX.red : PX.night}`,
            boxShadow: pick === i ? `3px 3px 0 ${PX.red}` : `3px 3px 0 ${PX.night}`,
            cursor: 'pointer', textAlign: 'center', position: 'relative',
          }}>
            {g.p >= 99 && <div style={{ position: 'absolute', top: -6, right: -4 }}><Tag color={PX.red} textColor="#fff" size={6}>HOT</Tag></div>}
            {renderGiftIcon(g)}
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 9, fontWeight: 700, marginTop: 3 }}>{g.n}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed, marginTop: 3 }}>{g.p}币</div>
          </div>
        ))}
      </div>
      {pick !== null && (
        <Card style={{ marginTop: 12, background: PX.cream }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'scale(1.4)', transformOrigin: 'center',
            }}>{renderGiftIcon(gifts[pick])}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700 }}>{gifts[pick].n}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.grassGreen, marginTop: 4 }}>{gifts[pick].r}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {[1, 10, 52, 99, 520].map(n => (
              <div key={n} onClick={() => {
                if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.giftByPrice(gifts[pick].p * n); }
                toast(`送出 ${n} 个 ${gifts[pick].n}`);
              }} className="pixel-btn" style={{
                flex: 1, padding: 6, textAlign: 'center', background: '#fff',
                border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`, cursor: 'pointer',
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              }}>×{n}</div>
            ))}
          </div>
        </Card>
      )}
      <SecHead title="COUNTRY PACK" sub="应援包"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {[{p:19,s:'S'},{p:99,s:'M'},{p:199,s:'L'}].map(x => (
          <Card key={x.s} onClick={() => nav('P10.3')} style={{ padding: 10, textAlign: 'center', background: PX.night }}>
            <div style={{ fontSize: 26 }}>📦</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.sunYellow, marginTop: 4 }}>{x.s} 包</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#fff', marginTop: 3 }}>{x.p}币</div>
          </Card>
        ))}
      </div>
      <SecHead title="MATCH CONTRIB" sub="本场赛事贡献榜"/>
      <Card>
        {['Maria','Diego','Juan','Lio'].map((n, i) => (
          <div key={n} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '5px 0', borderBottom: i < 3 ? `1px dashed #ddd` : 'none' }}>
            <div style={{ width: 18, fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.gold }}>{i+1}</div>
            <PixelFlag code={country} px={2}/>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{n}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed }}>{(4500 - i*820).toLocaleString()}</div>
          </div>
        ))}
      </Card>
    </PageShell>
  );
}

function P13Page({ onBack, toast, nav }) {
  return (
    <PageShell title="WATCH ROOM" subtitle="P13 · 陪看房间内" onBack={onBack} darkHeader bg={PX.night}>
      <div style={{ background: '#000', border: `3px solid ${PX.sunYellow}`, padding: 0, position: 'relative' }}>
        <div style={{ height: 180, background: `linear-gradient(180deg, ${PX.grassGreen}, #2d7a32)`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 8, left: 8 }}><LiveDot/></div>
          <div style={{ position: 'absolute', top: 8, right: 8, background: PX.night, color: PX.sunYellow, padding: '3px 6px', fontFamily: "'Press Start 2P', monospace", fontSize: 8 }}>👁 3.2k</div>
          <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Press Start 2P', monospace", fontSize: 20, color: '#fff', textShadow: `2px 2px 0 ${PX.night}` }}>AR 2 - 1 EN</div>
          <div style={{ position: 'absolute', bottom: 50, left: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 14 }}>👤</div>
            <div style={{ width: 10, height: 6, background: KITS.ar.primary, border: `1px solid ${PX.night}` }}/>
          </div>
          <div style={{ position: 'absolute', bottom: 40, right: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 14 }}>👤</div>
            <div style={{ width: 10, height: 6, background: '#fff', border: `1px solid ${PX.night}` }}/>
          </div>
          <div className="ball-wobble" style={{ position: 'absolute', bottom: 45, left: '50%' }}><PixelBall size={10}/></div>
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: PX.red, color: '#fff', padding: '2px 5px', fontFamily: "'Press Start 2P', monospace", fontSize: 7 }}>78'</div>
        </div>
      </div>
      {/* 主播席 */}
      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
        {['主播','嘉宾','嘉宾','嘉宾'].map((t, i) => (
          <div key={i} style={{ flex: 1, background: PX.cream, border: `2px solid ${PX.sunYellow}`, padding: 6, textAlign: 'center' }}>
            <div style={{ width: 30, height: 30, background: PX.sunYellow, border: `2px solid ${PX.night}`, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 10 }}>{i === 0 ? '♛' : t[0]}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: PX.night, marginTop: 4 }}>{t}</div>
          </div>
        ))}
      </div>
      {/* 飞屏弹幕 */}
      <div style={{ marginTop: 10, height: 90, background: '#0a0a2e', border: `2px solid ${PX.sunYellow}`, padding: 6, overflow: 'hidden', position: 'relative' }}>
        {['🔥 Vamos ARG!','⚽ 漂亮的任意球','🇦🇷 来自智利的应援','Hans: great save!','🎁 送出大力神杯 ×1'].map((m, i) => (
          <div key={i} style={{
            fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
            color: ['#FFD700','#fff','#87CEEB','#7FFF7F','#FF69B4'][i],
            padding: '2px 0',
          }}>{m}</div>
        ))}
      </div>
      {/* Gift ticker */}
      <div className="live-blink" style={{
        marginTop: 8, padding: 6, background: PX.red, color: '#fff',
        fontFamily: "'Press Start 2P', monospace", fontSize: 8, border: `2px solid ${PX.sunYellow}`,
      }}>🎁 Diego 送出 🏆×10 · 阿根廷 +5000 热力!</div>
      {/* 快捷动作 */}
      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
        <PixelButton onClick={() => nav('P12')} color={PX.red}>🎁 送礼</PixelButton>
        <PixelButton onClick={() => nav('P13.1')} color={PX.grassGreen}>🎙 开播</PixelButton>
        <PixelButton onClick={() => toast('连麦申请')} color={PX.sunYellow} textColor={PX.night}>🎤 连麦</PixelButton>
      </div>
      {/* 在线房 */}
      <SecHead title="OTHER ROOMS" sub="同赛事陪看房"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['西语房','中立房','欢乐房','解说房','深夜房'].map((t, i) => (
          <Card key={i} onClick={() => toast(`切换到 ${t}`)} style={{ flex: '0 0 100px', padding: 6 }}>
            <div style={{ height: 50, background: ['#FF4444','#4CAF50','#FFC107','#87CEEB','#9C27B0'][i], border: `2px solid ${PX.night}`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, right: 2 }}><LiveDot/></div>
            </div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700, marginTop: 4 }}>{t}</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

function P131Page({ onBack, toast }) {
  return (
    <PageShell title="CASTING" subtitle="P13.1 · 进球解说录制" onBack={onBack} darkHeader>
      <Card bg="#000" style={{ textAlign: 'center', padding: 14 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.sunYellow }}>SCENE: GOAL</div>
        <div style={{ marginTop: 10, height: 140, background: PX.grassGreen, position: 'relative', border: `3px solid ${PX.sunYellow}` }}>
          <PixelGoal width={100} height={60}/>
          <div className="ball-wobble" style={{ position: 'absolute', top: 60, left: '45%' }}><PixelBall size={18}/></div>
        </div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#fff', marginTop: 10 }}>梅西单刀破门 · 点击录制你的解说</div>
      </Card>
      <SecHead title="RECORD" sub="30 秒 · 可选择语言"/>
      <Card style={{ textAlign: 'center', padding: 16 }}>
        <div onClick={() => {
          if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.play('whistle_tweet'); }
          toast('开始录制');
        }} className="pixel-btn" style={{
          width: 70, height: 70, borderRadius: '50%',
          background: PX.red, border: `4px solid ${PX.night}`, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, cursor: 'pointer', color: '#fff',
        }}>●</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#888', marginTop: 8 }}>TAP TO RECORD</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'center' }}>
          {['ZH','EN','ES','PT'].map(l => (
            <Tag key={l} color={PX.cream}>{l}</Tag>
          ))}
        </div>
      </Card>
      <SecHead title="TOP CASTS" sub="热门解说"/>
      {['Diego · 30k 播放','Hans · 22k 播放','Luiza · 18k 播放'].map((s, i) => (
        <Card key={i} onClick={() => toast(s)} style={{ marginBottom: 6, display: 'flex', gap: 8, padding: 6, alignItems: 'center' }}>
          <div style={{ width: 40, height: 30, background: PX.red, border: `2px solid ${PX.night}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>▶</div>
          <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{s}</div>
          <Tag color={PX.gold}>热门</Tag>
        </Card>
      ))}
    </PageShell>
  );
}

function P14Page({ onBack, toast }) {
  const [tab, setTab] = React.useState(0);
  const [voteSide, setVoteSide] = React.useState(null);
  const [tipSent, setTipSent] = React.useState(false);
  const voteRed = 2384, voteBlue = 1956;
  const voteTotal = voteRed + voteBlue + (voteSide === 'red' ? 1 : voteSide === 'blue' ? 1 : 0);
  const redPct = Math.round(((voteRed + (voteSide === 'red' ? 1 : 0)) / voteTotal) * 100);
  const bluePct = 100 - redPct;
  const tipAmount = 1280 + (tipSent ? 99 : 0);
  const topicCodes = ['ar','br','de','en','fr','es','pt','nl','jp','kr','cn','it','mx','us','ma','sn','be','hr'];
  const challengeCards = [
    { title: '晒 48 国球衣 · 赢金球徽章', joins: '4,820' },
    { title: '拍家乡看球现场 · 送大力神杯', joins: '7,140' },
    { title: '用 3 种语言喊加油 · 解锁徽章', joins: '2,660' },
  ];
  const hotEdits = [
    { title: '梅西独家专访 · 生涯回顾长图', author: 'Mauro', reads: '82.4k', comments: '1.2k' },
    { title: '桑巴之夜全记录 · 48 小时长图文', author: 'Luiza', reads: '64.8k', comments: '960' },
    { title: '德法宿敌全拆解 · 战术板复盘', author: 'Hans', reads: '49.1k', comments: '708' },
  ];
  return (
    <PageShell title="CIRCLE" subtitle="P14 · 赛事圈子广场" onBack={onBack}>
      <TabBar tabs={['推荐','关注','我的国家','文化']} active={tab} onChange={setTab}/>

      {/* ── 投票贴 · 阵营选边 ───────────────────────────── */}
      <SecHead title="VOTE" sub="投票贴 · 红蓝二选一"/>
      <Card style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 28, height: 28, background: PX.sunYellow,
            border: `2px solid ${PX.night}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 11,
          }}>M</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>Mark · 世界杯官方</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 2 }}>1h ago</div>
          </div>
          <Tag color={PX.gold}>📊 投票</Tag>
        </div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700,
          marginTop: 8, lineHeight: 1.4,
        }}>阿根廷夺冠靠梅西还是靠防守体系？</div>
        {/* 两个选项 */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <div onClick={() => { if (!voteSide) { setVoteSide('red'); if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'select',at:0},{name:'confirm',at:300}]); } } }} className={voteSide ? '' : 'pixel-btn'} style={{
            flex: 1, padding: 10, textAlign: 'center',
            cursor: voteSide ? 'default' : 'pointer',
            background: voteSide === 'red' ? PX.red : (voteSide ? PX.cream : PX.red),
            opacity: voteSide && voteSide !== 'red' ? 0.75 : 1,
            color: voteSide === 'red' || !voteSide ? '#fff' : PX.night,
            border: `3px solid ${PX.night}`,
            boxShadow: voteSide ? 'none' : `3px 3px 0 ${PX.night}`,
          }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>梅西决定一切</div>
            {voteSide && (
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, marginTop: 4 }}>
                {redPct}% · {(voteRed + (voteSide === 'red' ? 1 : 0)).toLocaleString()}
              </div>
            )}
          </div>
          <div onClick={() => { if (!voteSide) { setVoteSide('blue'); if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'select',at:0},{name:'confirm',at:300}]); } } }} className={voteSide ? '' : 'pixel-btn'} style={{
            flex: 1, padding: 10, textAlign: 'center',
            cursor: voteSide ? 'default' : 'pointer',
            background: voteSide === 'blue' ? '#3F51B5' : (voteSide ? PX.cream : '#3F51B5'),
            opacity: voteSide && voteSide !== 'blue' ? 0.75 : 1,
            color: voteSide === 'blue' || !voteSide ? '#fff' : PX.night,
            border: `3px solid ${PX.night}`,
            boxShadow: voteSide ? 'none' : `3px 3px 0 ${PX.night}`,
          }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>防守体系更硬</div>
            {voteSide && (
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, marginTop: 4 }}>
                {bluePct}% · {(voteBlue + (voteSide === 'blue' ? 1 : 0)).toLocaleString()}
              </div>
            )}
          </div>
        </div>
        {/* 实时占比条 */}
        {voteSide && (
          <div style={{
            marginTop: 10, height: 10,
            border: `2px solid ${PX.night}`, display: 'flex', overflow: 'hidden',
          }}>
            <div style={{ width: redPct + '%', background: PX.red }}/>
            <div style={{ width: bluePct + '%', background: '#3F51B5' }}/>
          </div>
        )}
        <div style={{
          marginTop: 8, display: 'flex', gap: 12,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888',
        }}>
          <div>已 {voteTotal.toLocaleString()} 人投票</div>
          <div>命中者得限定徽章</div>
          {voteSide && <div style={{ color: PX.grassGreen }}>✓ 已投票</div>}
        </div>
      </Card>

      {/* ── 打赏贴 · 金贴榜 ──────────────────────────── */}
      <SecHead title="TIP JAR" sub="打赏贴 · 金贴榜"/>
      <Card style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 28, height: 28, background: PX.sunYellow,
            border: `2px solid ${PX.night}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 11,
          }}>D</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>Diego</div>
              <PixelFlag code="ar" px={2}/>
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 2 }}>3h ago</div>
          </div>
          <Tag color={PX.gold}>🎁 打赏</Tag>
        </div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700,
          marginTop: 8, lineHeight: 1.4,
        }}>你记得 2014 年德国 7:1 巴西那晚在哪里？</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 11, marginTop: 6,
          color: '#555', lineHeight: 1.5,
        }}>那年我在圣保罗街头，全城熄灯……评论区最高赞打赏上墙。</div>
        {/* 金贴榜阶梯 */}
        <div style={{
          marginTop: 10, padding: 8, background: PX.cream,
          border: `2px solid ${PX.night}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 22 }}>💰</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: PX.darkRed,
              }}>{tipAmount} 币</div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3,
              }}>距金贴榜 {Math.max(0, 2000 - tipAmount)} 币 · 满 10000 全站推送</div>
            </div>
          </div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={tipAmount} max={10000} color={PX.red} height={8}/>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 6, fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888',
          }}>
            <span>500 · 精选</span>
            <span style={{ color: tipAmount >= 2000 ? PX.gold : '#888' }}>2000 · 金贴榜 {tipAmount >= 2000 ? '✓' : ''}</span>
            <span>10000 · 全站推</span>
          </div>
        </div>
        {/* 打赏者头像 */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center' }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888' }}>打赏者:</div>
          {['M','H','L','A','C','S'].map((n, i) => (
            <div key={i} style={{
              width: 18, height: 18, background: ['#FFD700','#4CAF50','#87CEEB','#FF4444','#9C27B0','#FFC107'][i],
              border: `1.5px solid ${PX.night}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            }}>{n}</div>
          ))}
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed }}>+24 人</div>
        </div>
        {/* 打赏按钮 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {[9, 99, 999].map(n => (
            <div key={n} onClick={() => {
              setTipSent(true);
              if (window.sfx) {
                window.sfx.suppressNextClick();
                window.sfx.giftByPrice(n);
              }
              toast(`打赏 ${n} 币 · ${n >= 99 ? '金贴榜 +1' : ''}`);
            }} className="pixel-btn" style={{
              flex: 1, padding: '7px 0', textAlign: 'center', cursor: 'pointer',
              background: n === 99 ? PX.red : PX.cream,
              color: n === 99 ? '#fff' : PX.night,
              border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            }}>{n} 币</div>
          ))}
        </div>
      </Card>

      <SecHead title="DISCUSSIONS" sub="圈子热帖"/>
      <div style={{ marginTop: 4 }}>
        {[
          { u: 'Diego', c: 'ar', t: '阿根廷永不言弃! 🇦🇷⚽', img: PX.red, hot: true },
          { u: 'Maria', c: 'br', t: '桑巴狂欢节开始了! 分享我家乡的派对视频', img: PX.sunYellow },
          { u: 'Hans',  c: 'de', t: '这个战术分析 10/10 '  , img: PX.grassGreen },
          { u: 'Aki',   c: 'jp', t: '日本队加油! がんばれ!', img: '#87CEEB' },
        ].map((p, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, background: PX.sunYellow, border: `2px solid ${PX.night}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 12 }}>{p.u[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{p.u}</div>
                  <PixelFlag code={p.c} px={2}/>
                </div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 2 }}>2h ago</div>
              </div>
              {p.hot && <Tag color={PX.red} textColor="#fff">🔥 热帖</Tag>}
            </div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>{p.t}</div>
            <div style={{ height: 80, background: p.img, border: `2px solid ${PX.night}`, marginTop: 8, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, opacity: 0.4 }}>{['⚽','🎉','🏆','🇯🇵'][i]}</div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 8, fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#666' }}>
              <div>♥ {1240 - i*200}</div>
              <div>💬 {128 - i*20}</div>
              <div>🔁 {58 - i*10}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <span onClick={() => toast('纠错')} style={{ cursor: 'pointer', color: PX.darkRed }}>✏ 纠错 +20</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <SecHead title="COUNTRY TOPICS" sub={<span style={{ color: PX.night }}>48 国子话题</span>}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginTop: 6 }}>
        {topicCodes.map((code) => (
          <Card
            key={code}
            onClick={() => {
              if (window.sfx) {
                window.sfx.suppressNextClick();
                window.sfx.play('select');
              }
              toast(`进入 ${code.toUpperCase()} 子话题`);
            }}
            style={{ padding: 8, textAlign: 'center' }}
          >
            <PixelFlag code={code} px={3}/>
            <div style={{
              marginTop: 6,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: PX.night,
            }}>{code.toUpperCase()} 讨论</div>
          </Card>
        ))}
      </div>
      <SecHead title="CHALLENGE" sub={<span style={{ color: PX.night }}># 我的世界杯 # 挑战</span>}/>
      <div className="h-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 6, paddingBottom: 4 }}>
        {challengeCards.map((item) => (
          <Card
            key={item.title}
            onClick={() => {
              if (window.sfx) {
                window.sfx.suppressNextClick();
                window.sfx.play('achievement');
              }
              toast('参与挑战');
            }}
            style={{ padding: 10, width: 200, flex: '0 0 200px' }}
          >
            <Tag color={PX.red} textColor="#fff">CHALLENGE</Tag>
            <div style={{
              marginTop: 10,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: PX.night,
              lineHeight: 1.5,
            }}>{item.title}</div>
            <div style={{
              marginTop: 12,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: '#888',
            }}>已 {item.joins} 参与</div>
          </Card>
        ))}
      </div>
      <SecHead title="HOT EDITS" sub={<span style={{ color: PX.night }}>世界杯精华 · 置顶 24h</span>}/>
      <div style={{ marginTop: 6, display: 'grid', gap: 8 }}>
        {hotEdits.map((item) => (
          <Card
            key={item.title}
            onClick={() => {
              if (window.sfx) {
                window.sfx.suppressNextClick();
                window.sfx.play('page_in');
              }
              toast('打开精华贴');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ flex: 1 }}>
              <Tag color={PX.gold} textColor={PX.night}>世界杯精华</Tag>
              <div style={{
                marginTop: 8,
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: PX.night,
                lineHeight: 1.5,
              }}>{item.title}</div>
              <div style={{
                marginTop: 10,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: '#888',
                lineHeight: 1.5,
              }}>{item.author} · READ {item.reads} · TALK {item.comments}</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <PixelTrophy size={20} />
            </div>
          </Card>
        ))}
      </div>
      <div onClick={() => toast('发贴')} style={{
        position: 'fixed', bottom: 80, right: 24, zIndex: 40,
        width: 54, height: 54, background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace", fontSize: 22, cursor: 'pointer',
      }} className="pixel-btn">+</div>
    </PageShell>
  );
}

function P15Page({ onBack, toast }) {
  return (
    <PageShell title="CULTURE" subtitle="P15 · 国家文化专区" onBack={onBack}>
      <SecHead title="TODAY" sub="今日文化日"/>
      <Card bg={PX.red} style={{ padding: 14, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 40 }}>🏮</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.sunYellow }}>CHINA DAY</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 4 }}>中国文化日 · 春节特别专场</div>
          </div>
          <Tag color={PX.sunYellow}>LIVE</Tag>
        </div>
      </Card>

      <SecHead title="48 COUNTRIES" sub="选择国家 · 探索文化"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {ALL_CODES.map(c => (
          <Card key={c} onClick={() => toast(c)} style={{ padding: 6, textAlign: 'center' }}>
            <PixelFlag code={c} px={3}/>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: PX.night, marginTop: 4 }}>{c.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      <SecHead title="QUIZ" sub="国家文化小测"/>
      <Card bg={PX.cream}>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>🇦🇷 阿根廷国花是？</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}>
          {['玫瑰','象牙红','樱花','郁金香'].map((o, i) => (
            <div key={i} onClick={() => {
              const right = i === 1;
              if (window.sfx) {
                window.sfx.suppressNextClick();
                window.sfx.play(right ? 'correct_ding' : 'error');
                if (right) setTimeout(() => window.sfx.play('coin'), 260);
              }
              toast(right ? '答对! +20' : '再试试');
            }} className="pixel-btn" style={{
              padding: 8, background: '#fff', border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
              cursor: 'pointer', textAlign: 'center',
            }}>{o}</div>
          ))}
        </div>
      </Card>

      <SecHead title="FOLK STORIES" sub="民俗故事"/>
      {[
        { f: 'br', t: '桑巴狂欢节的百年故事', d: '5 分钟阅读' },
        { f: 'ar', t: '探戈与布宜诺斯艾利斯',   d: '3 分钟阅读' },
        { f: 'jp', t: '日本应援文化与樱花',     d: '4 分钟阅读' },
      ].map((x, i) => (
        <Card key={i} onClick={() => toast(x.t)} style={{ marginBottom: 6, display: 'flex', gap: 10, alignItems: 'center' }}>
          <PixelFlag code={x.f} px={4}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{x.t}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>{x.d}</div>
          </div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14 }}>›</div>
        </Card>
      ))}

      <SecHead title="COSPLAY" sub="文化穿搭挑战"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['🇨🇳','🇧🇷','🇦🇷','🇯🇵','🇲🇽'].map((f, i) => (
          <div key={i} style={{ flex: '0 0 90px', padding: 10, background: '#fff', border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>{f}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed, marginTop: 6 }}>+50 热力</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

Object.assign(window, { P12Page, P13Page, P131Page, P14Page, P15Page });
