// P10.1 学习中心 · P10.2 任务详情 · P10.3 付费商店

function P101Page({ onBack, toast }) {
  const [flip, setFlip] = React.useState(false);
  return (
    <PageShell title="LEARNING HUB" subtitle="P10.1 · 学习中心" onBack={onBack} darkHeader>
      {/* 词汇盲盒 */}
      <SecHead title="WORD GACHA" sub="每日足球词汇盲盒"/>
      <Card bg={PX.night} style={{ textAlign: 'center', padding: 16 }}>
        <div onClick={() => {
          setFlip(true);
          if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'card_flip',at:0},{name:'correct_ding',at:420}]); }
          setTimeout(() => setFlip(false), 1800);
        }}
          className="pixel-btn"
          style={{
            display: 'inline-block', width: 120, height: 160, cursor: 'pointer',
            perspective: 600,
          }}>
          <div className={flip ? 'card-flip' : ''} style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d',
          }}>
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: `linear-gradient(135deg, ${PX.red}, ${PX.sunYellow})`,
              border: `4px solid ${PX.sunYellow}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 48,
            }}>?</div>
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: PX.cream, border: `4px solid ${PX.sunYellow}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: 8,
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.red }}>HAT-TRICK</div>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, marginTop: 6, color: PX.night, textAlign: 'center' }}>帽子戏法<br/>单场三球</div>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.sunYellow, marginTop: 10 }}>TAP TO FLIP · 今日 1/3</div>
      </Card>

      {/* 跟读挑战 */}
      <SecHead title="READ ALONG" sub="AI 评分 + 排行"/>
      <Card>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, color: PX.night, fontWeight: 700 }}>📣 "GOOOAL! ARGENTINA scores!"</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>原声 · 听力难度 ⭐⭐⭐</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}>
          <div onClick={() => {
            if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.play('whistle_tweet'); }
            toast('录音中...');
          }} className="pixel-btn" style={{
            width: 50, height: 50, borderRadius: '50%',
            background: PX.red, border: `4px solid ${PX.night}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, cursor: 'pointer', color: '#fff',
          }}>●</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed }}>AI SCORE</div>
            <div style={{ display: 'flex', gap: 2, marginTop: 4, alignItems: 'end', height: 24 }}>
              {[6,14,10,22,18,14,8,20,12,6].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h, background: PX.grassGreen, border: `1px solid ${PX.night}` }}/>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: PX.gold }}>92</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888' }}>PTS</div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: 8, background: PX.cream, border: `2px solid ${PX.night}` }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night, marginBottom: 4 }}>TOP THIS WEEK</div>
          {[
            { n: 'Diego', v: 98, flag: 'ar' },
            { n: 'Hans', v: 95, flag: 'de' },
            { n: 'Me',   v: 92, flag: 'cn', me: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0',
              background: r.me ? PX.sunYellow : 'transparent', paddingLeft: r.me ? 4 : 0 }}>
              <div style={{ width: 14, fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.red }}>{i+1}</div>
              <PixelFlag code={r.flag} px={2}/>
              <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{r.n}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed }}>{r.v}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 语伴匹配 */}
      <SecHead title="PARTNER MATCH" sub="语言对练"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { n: 'Maria', flag: 'ar', lang: 'ES→ZH', lvl: 'B1' },
          { n: 'Hans',  flag: 'de', lang: 'DE→EN', lvl: 'C1' },
          { n: 'Luiza', flag: 'br', lang: 'PT→EN', lvl: 'B2' },
          { n: 'Aki',   flag: 'jp', lang: 'JP→ZH', lvl: 'A2' },
        ].map((p, i) => (
          <Card key={i} onClick={() => toast(`匹配 ${p.n}`)} style={{ padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 30, height: 30, background: PX.sunYellow,
                border: `2px solid ${PX.night}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Press Start 2P', monospace", fontSize: 11,
              }}>{p.n[0]}</div>
              <PixelFlag code={p.flag} px={3}/>
            </div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 6 }}>{p.n}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 3 }}>{p.lang} · {p.lvl}</div>
          </Card>
        ))}
      </div>

      {/* 进球解说录制 */}
      <SecHead title="CAST GOAL" sub="录制你的进球解说"/>
      <Card bg={PX.red} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🎙</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.sunYellow, marginTop: 6 }}>RECORD · 30S · +80 HEAT</div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, color: '#fff', marginTop: 4 }}>用你的母语为进球瞬间解说</div>
      </Card>

      {/* 课包 */}
      <SecHead title="COURSE PACK" sub="世界杯外语课"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { t: '西班牙语 · 足球', free: true, ic: '⚽' },
          { t: '葡语 · 桑巴口号', free: false, ic: '🥁' },
          { t: '英语 · 解说大师', free: false, ic: '🎙' },
          { t: '日语 · 应援文化', free: true, ic: '🏮' },
        ].map((c, i) => (
          <Card key={i} onClick={() => toast(c.t)} style={{ padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ fontSize: 24 }}>{c.ic}</div>
              <Tag color={c.free ? PX.grassGreen : PX.gold}>{c.free ? 'FREE' : 'PRO'}</Tag>
            </div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 6 }}>{c.t}</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

function P102Page({ onBack, toast }) {
  return (
    <PageShell title="TASK DETAIL" subtitle="P10.2 · 任务详情" onBack={onBack}>
      <Card style={{ textAlign: 'center', padding: 18 }}>
        <div style={{ fontSize: 52 }}>📖</div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 15, fontWeight: 700, marginTop: 8 }}>每日足球单词打卡</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#888', marginTop: 6 }}>DAILY · WORLD CUP VOCAB</div>
      </Card>
      <SecHead title="DESCRIPTION" sub="任务描述"/>
      <Card>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, color: PX.night, lineHeight: 1.6 }}>
          每天学习 10 个世界杯相关英语/西语词汇，连续打卡解锁限定"单词大师"徽章。打卡中断后次日重置进度。
        </div>
      </Card>
      <SecHead title="REWARDS" sub="奖励预览"/>
      <Card bg={PX.sunYellow}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 28 }}>🔥</div>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.red }}>+10 HEAT</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, color: PX.night, marginTop: 3 }}>完成后立即到账</div>
          </div>
          <div style={{ width: 2, background: PX.night, alignSelf: 'stretch' }}/>
          <div style={{ fontSize: 28 }}>🎖</div>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.night }}>7-DAY BADGE</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 9, color: '#555', marginTop: 3 }}>连续 7 天解锁</div>
          </div>
        </div>
      </Card>
      <SecHead title="PROGRESS" sub="完成进度"/>
      <Card>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.darkRed, marginBottom: 6 }}>6 / 10 WORDS</div>
        <ProgressBar value={6} max={10}/>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, color: '#888', marginTop: 6 }}>今日已学 6 词 · 还差 4 词</div>
      </Card>
      <div onClick={() => toast('前往打卡')} className="pixel-btn" style={{
        marginTop: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 12,
      }}>立即前往 →</div>
    </PageShell>
  );
}

function P103Page({ onBack, toast }) {
  const items = [
    { ic: '📦', t: '国家应援包 S', p: 19,  r: '+100',  hot: false },
    { ic: '📦', t: '国家应援包 M', p: 99,  r: '+500',  hot: true },
    { ic: '📦', t: '国家应援包 L', p: 199, r: '+1200', hot: false },
    { ic: '⚡', t: '双倍热力卡',  p: 39,  r: '当日×2', limit: true },
    { ic: '🎖', t: '代言徽章',    p: 199, r: '+500',  limit: true },
    { ic: '👑', t: 'VIP 赛事版',  p: 399, r: '+2000', hot: true },
    { ic: '🏆', t: '大力神杯礼物',p: 1888,r: '×2 贡献' },
    { ic: '🎁', t: '语聊房礼包',  p: 59,  r: '房间扶持' },
  ];
  return (
    <PageShell title="BOOST STORE" subtitle="P10.3 · 付费商店" onBack={onBack} darkHeader>
      <div style={{
        padding: 10, background: PX.sunYellow, border: `3px solid ${PX.night}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontSize: 24 }}>💰</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.night }}>BALANCE</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.darkRed, marginTop: 3 }}>2,580 HT 币</div>
        </div>
        <div onClick={() => toast('充值')} className="pixel-btn" style={{
          padding: '6px 8px', background: PX.red, color: '#fff',
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          border: `2px solid ${PX.night}`, cursor: 'pointer',
        }}>充值</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
        {items.map((x, i) => (
          <Card key={i} onClick={() => toast(`购买 ${x.t}`)} style={{ padding: 8, position: 'relative' }}>
            {x.hot && <div style={{ position: 'absolute', top: -8, left: -6 }}><Tag color={PX.red} textColor="#fff">HOT</Tag></div>}
            {x.limit && <div style={{ position: 'absolute', top: -8, right: -6 }}><Tag color={PX.gold}>LIMIT</Tag></div>}
            <div style={{ fontSize: 30, textAlign: 'center' }}>{x.ic}</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 4 }}>{x.t}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.grassGreen, marginTop: 3 }}>{x.r}</div>
            <div style={{
              marginTop: 6, padding: '5px 0', textAlign: 'center',
              background: PX.night, color: PX.sunYellow,
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            }}>{x.p} 币</div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

Object.assign(window, { P101Page, P102Page, P103Page });
