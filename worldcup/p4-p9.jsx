// P4 官频开播专区列表 · P5 短视频分类列表 · P5.1 视频播放页
// P6 竞猜 · P7 个人战绩/奖励 · P8 规则说明 · P9 分享邀请
//
// 说明：P4/P5/P5.1/P8/P9 为本次新增页面；P6/P7 为补完版本。
// 原来占用这些页码的"礼物大厅 / 陪看房内 / 进球解说 / 圈子 / 文化"已经挪到 P12–P15（见 p12-p15.jsx）。

// ─────────────────────────────────────────────────────────────
// P4 · 官频开播专区列表
// ─────────────────────────────────────────────────────────────
function P4Page({ onBack, toast, nav }) {
  const [tab, setTab] = React.useState(1);
  const [filter, setFilter] = React.useState('全部');
  const featured = [
    { n: '官方 · 决赛陪看', host: 'FIFA OFFICIAL', flag: 'br', viewers: '32.1k', color: PX.red },
    { n: 'VR-Live · 现场视角', host: 'HT STUDIO',   flag: 'ar', viewers: '18.4k', color: PX.grassGreen },
    { n: '多语种神解说房',    host: 'MULTI-LANG',   flag: 'fr', viewers: '12.7k', color: '#3F51B5' },
  ];
  const rooms = [
    { n: '阿根廷 vs 英格兰 全程陪看', host: 'Diego',  flag: 'ar', viewers: '12.3k', tag: '陪看', pk: false },
    { n: '🌏 多语言神解说',           host: 'Aki',    flag: 'fr', viewers: '8.7k',  tag: '解说', pk: true  },
    { n: '德意志战车冲鸭!',           host: 'Hans',   flag: 'de', viewers: '6.1k',  tag: '陪看', pk: false },
    { n: '巴西桑巴狂欢夜',            host: 'Luiza',  flag: 'br', viewers: '9.4k',  tag: 'PK',   pk: true  },
    { n: 'ESP vs ITA 预演',           host: 'Carlos', flag: 'es', viewers: '4.2k',  tag: '陪看', pk: false },
    { n: '深夜加时解说',              host: 'Sam',    flag: 'en', viewers: '3.8k',  tag: '陪看', pk: false },
  ];
  return (
    <PageShell title="CHANNEL" subtitle="P4 · 官频开播专区" onBack={onBack} darkHeader>
      {/* 搜索框 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: 8,
        background: PX.cream, border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`,
      }}>
        <div style={{ fontSize: 18 }}>🔍</div>
        <input
          placeholder="搜索主播 / 房间名 / 国家"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 600,
          }}
        />
        <Tag color={PX.sunYellow}>搜索</Tag>
      </div>

      <div style={{ marginTop: 10 }}>
        <TabBar tabs={['我关注','热门','新开播']} active={tab} onChange={setTab} size="sm"/>
      </div>

      {/* 筛选栏 */}
      <div className="h-scroll" style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {['全部','国家','语言','VR-Live','陪看','解说','PK 房'].map(f => (
          <div key={f} onClick={() => setFilter(f)} style={{
            flex: '0 0 auto', padding: '5px 9px', cursor: 'pointer',
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            background: filter === f ? PX.red : '#fff', color: filter === f ? '#fff' : PX.night,
            border: `2px solid ${PX.night}`,
            boxShadow: filter === f ? 'none' : `2px 2px 0 ${PX.night}`,
          }}>{f}</div>
        ))}
      </div>

      {/* 精选/官方房 */}
      <SecHead title="FEATURED" sub="官方推荐 · 精选陪看"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {featured.map((f, i) => (
          <div key={i} onClick={() => nav('P13')} className="pixel-btn" style={{
            flex: '0 0 220px', cursor: 'pointer',
            border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
            background: PX.cream,
          }}>
            <div style={{
              height: 110, background: f.color, position: 'relative', overflow: 'hidden',
              borderBottom: `2px solid ${PX.night}`,
            }}>
              {/* scanlines */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 4px)',
              }}/>
              <div style={{ position: 'absolute', top: 6, left: 6 }}><PixelFlag code={f.flag} px={4}/></div>
              <div style={{ position: 'absolute', top: 6, right: 6 }}><LiveDot/></div>
              <div style={{
                position: 'absolute', bottom: 6, left: 6,
                background: PX.gold, color: PX.night, padding: '2px 5px',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                border: `2px solid ${PX.night}`,
              }}>★ 官方推荐</div>
              <div style={{
                position: 'absolute', bottom: 6, right: 6,
                background: PX.night, color: PX.sunYellow, padding: '2px 5px',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              }}>👁 {f.viewers}</div>
            </div>
            <div style={{ padding: 8 }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700, color: PX.night }}>{f.n}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>{f.host}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 房间列表 */}
      <SecHead title="ALL ROOMS" sub="全部直播房"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rooms.map((r, i) => (
          <Card key={i} onClick={() => nav('P13')} style={{ padding: 8, display: 'flex', gap: 10 }}>
            {/* cover */}
            <div style={{
              width: 110, height: 72, flexShrink: 0,
              background: ['#FF4444','#4CAF50','#FFC107','#3F51B5','#87CEEB','#C62828'][i],
              border: `2px solid ${PX.night}`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 4px)',
              }}/>
              <div style={{ position: 'absolute', top: 3, left: 3 }}><PixelFlag code={r.flag} px={3}/></div>
              <div style={{ position: 'absolute', top: 3, right: 3 }}><LiveDot/></div>
              {r.pk && (
                <div style={{
                  position: 'absolute', bottom: 3, left: 3,
                  background: PX.sunYellow, color: PX.night,
                  fontFamily: "'Press Start 2P', monospace", fontSize: 6,
                  padding: '1px 3px', border: `1.5px solid ${PX.night}`,
                }}>⚔ PK</div>
              )}
              <div style={{
                position: 'absolute', bottom: 3, right: 3,
                background: PX.night, color: PX.sunYellow,
                fontFamily: "'Press Start 2P', monospace", fontSize: 6,
                padding: '1px 3px',
              }}>👁 {r.viewers}</div>
            </div>
            {/* meta */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
              <div>
                <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700, color: PX.night, lineHeight: 1.3 }}>{r.n}</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>@{r.host}</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Tag color={PX.grassGreen} textColor="#fff">{r.tag}</Tag>
                <Tag>阿 vs 英</Tag>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P5 · 短视频分类列表页
// ─────────────────────────────────────────────────────────────
function P5Page({ onBack, toast, nav }) {
  const [cat, setCat] = React.useState(0);
  const [country, setCountry] = React.useState('all');
  const categories = ['全部','球迷现场','跨国 PK','解说','房间名场面','多语言看球'];
  const videos = [
    { t: '阿根廷球迷唱跳应援 · 纽约街头',     d: '00:48', likes: '12.3k', src: '@maria',  flag: 'ar', color: '#4CAF50' },
    { t: '德国小哥学中文口号: 冲鸭!',         d: '01:12', likes: '8.4k',  src: '@hans',   flag: 'de', color: '#FFC107' },
    { t: '巴西桑巴庆祝神进球 · 球馆外',       d: '00:36', likes: '15.1k', src: '@lu',     flag: 'br', color: '#FF4444' },
    { t: '房间名场面: 西语 vs 英语互怼',      d: '02:05', likes: '6.9k',  src: '@carlos', flag: 'es', color: '#87CEEB' },
    { t: 'FR vs BR · 主播用四种语言解说',     d: '01:48', likes: '9.2k',  src: '@aki',    flag: 'fr', color: '#3F51B5' },
    { t: '日本球迷赛后捡垃圾又上热搜',        d: '00:58', likes: '11.6k', src: '@yuki',   flag: 'jp', color: '#9C27B0' },
  ];
  return (
    <PageShell title="SHORTS" subtitle="P5 · 短视频专区" onBack={onBack} darkHeader>
      {/* 分类 Tab */}
      <div className="h-scroll" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map((c, i) => (
          <div key={c} onClick={() => setCat(i)} style={{
            flex: '0 0 auto', padding: '7px 10px', cursor: 'pointer',
            fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
            background: cat === i ? PX.night : PX.cream,
            color: cat === i ? PX.sunYellow : PX.night,
            border: `2px solid ${PX.night}`,
            boxShadow: cat === i ? 'none' : `2px 2px 0 ${PX.night}`,
          }}>{c}</div>
        ))}
      </div>

      {/* 筛选 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night }}>FILTER:</div>
        <div className="h-scroll" style={{ display: 'flex', gap: 4, overflowX: 'auto', flex: 1 }}>
          {[{k:'all',l:'全部'},{k:'ar',l:'🇦🇷'},{k:'br',l:'🇧🇷'},{k:'de',l:'🇩🇪'},{k:'fr',l:'🇫🇷'},{k:'jp',l:'🇯🇵'},{k:'cn',l:'🇨🇳'}].map(o => (
            <div key={o.k} onClick={() => setCountry(o.k)} style={{
              flex: '0 0 auto', padding: '3px 7px', cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
              background: country === o.k ? PX.sunYellow : '#fff', color: PX.night,
              border: `2px solid ${PX.night}`,
            }}>{o.l}</div>
          ))}
        </div>
        <Tag color={PX.cream}>今日</Tag>
      </div>

      {/* 单列竖排视频卡 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        {videos.map((v, i) => (
          <Card key={i} onClick={() => nav('P5.1')} style={{ padding: 8, display: 'flex', gap: 10 }}>
            {/* cover */}
            <div style={{
              width: 120, height: 80, flexShrink: 0,
              background: v.color, border: `2px solid ${PX.night}`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 4px)',
              }}/>
              {/* play triangle */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 0, height: 0,
                borderLeft: `16px solid ${PX.cream}`,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                filter: `drop-shadow(1px 1px 0 ${PX.night})`,
              }}/>
              <div style={{ position: 'absolute', top: 3, left: 3 }}><PixelFlag code={v.flag} px={3}/></div>
              <div style={{
                position: 'absolute', bottom: 3, right: 3,
                background: PX.night, color: PX.sunYellow,
                padding: '1px 4px', fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              }}>{v.d}</div>
            </div>
            {/* meta */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700, color: PX.night, lineHeight: 1.3 }}>{v.t}</div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888',
              }}>
                <span>{v.src}</span>
                <span style={{ color: PX.darkRed }}>♥ {v.likes}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P5.1 · 视频播放页
// ─────────────────────────────────────────────────────────────
function P51Page({ onBack, toast, nav }) {
  const [liked, setLiked] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const comments = [
    { u: 'Diego',  c: 'ar', t: 'Vamos ARG! 🇦🇷🔥',                 t2: '3 min ago' },
    { u: 'Hans',   c: 'de', t: 'What a goal!! 这脚射得干净',        t2: '5 min ago' },
    { u: 'Luiza',  c: 'br', t: '桑巴老家也在欢呼',                  t2: '7 min ago' },
    { u: 'Aki',    c: 'jp', t: 'メッシすごい!',                      t2: '12 min ago' },
    { u: 'Carlos', c: 'es', t: 'Vale vale, un partido increíble',   t2: '18 min ago' },
  ];
  return (
    <PageShell title="PLAY" subtitle="P5.1 · 视频播放" onBack={onBack} darkHeader bg={PX.night}>
      {/* 视频播放器占位 */}
      <div style={{
        background: '#000', border: `3px solid ${PX.sunYellow}`,
        position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9',
      }}>
        {/* scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 4px)',
        }}/>
        {/* 球场伪画面 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${PX.grassGreen}, #2d7a32)`,
          opacity: 0.85,
        }}/>
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }}>
          <PixelGoal width={90} height={56}/>
        </div>
        <div className="ball-wobble" style={{ position: 'absolute', top: 74, left: '48%' }}>
          <PixelBall size={16}/>
        </div>
        {/* 中央大播放按钮 */}
        <div onClick={() => toast('▶ 播放')} className="pixel-btn" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 62, height: 62, background: 'rgba(0,0,0,0.6)',
          border: `3px solid ${PX.sunYellow}`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 0, height: 0,
            borderLeft: `20px solid ${PX.sunYellow}`,
            borderTop: '14px solid transparent',
            borderBottom: '14px solid transparent',
            marginLeft: 4,
          }}/>
        </div>
        {/* 进度条 */}
        <div style={{
          position: 'absolute', bottom: 8, left: 10, right: 10,
          height: 6, background: 'rgba(255,255,255,0.2)',
          border: `1px solid ${PX.sunYellow}`,
        }}>
          <div style={{ width: '38%', height: '100%', background: PX.red }}/>
        </div>
        <div style={{
          position: 'absolute', bottom: 18, right: 10,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: PX.sunYellow,
        }}>00:18 / 00:48</div>
      </div>

      {/* 视频信息 */}
      <Card style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            width: 34, height: 34, background: PX.sunYellow,
            border: `2px solid ${PX.night}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 12,
          }}>M</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>@maria</div>
              <PixelFlag code="ar" px={2}/>
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 3 }}>来自陪看房 · 阿根廷 vs 英格兰</div>
          </div>
          <PixelButton color={PX.red} onClick={() => toast('已关注')}>+关注</PixelButton>
        </div>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700, marginTop: 10, lineHeight: 1.4 }}>
          阿根廷球迷唱跳应援 · 纽约街头
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 6 }}>
          #阿根廷 #纽约 #球迷现场 · 12.3k 播放
        </div>
      </Card>

      {/* 点赞评论分享 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <div onClick={() => setLiked(l => !l)} className="pixel-btn" style={{
          flex: 1, padding: '10px 0', cursor: 'pointer', textAlign: 'center',
          background: liked ? PX.red : PX.cream, color: liked ? '#fff' : PX.night,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        }}>{liked ? '♥' : '♡'} {liked ? '12.4k' : '12.3k'}</div>
        <div onClick={() => setExpand(e => !e)} className="pixel-btn" style={{
          flex: 1, padding: '10px 0', cursor: 'pointer', textAlign: 'center',
          background: PX.cream, color: PX.night,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        }}>💬 {comments.length}</div>
        <div onClick={() => nav('P9')} className="pixel-btn" style={{
          flex: 1, padding: '10px 0', cursor: 'pointer', textAlign: 'center',
          background: PX.sunYellow, color: PX.night,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: 10,
        }}>↗ 分享</div>
      </div>

      {/* 评论区 */}
      <SecHead title="COMMENTS" sub={`${comments.length} 条评论`} action={expand ? '收起' : '展开'} onAction={() => setExpand(e => !e)}/>
      <Card>
        {(expand ? comments : comments.slice(0, 3)).map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < (expand ? comments.length : 3) - 1 ? `1px dashed #ddd` : 'none' }}>
            <div style={{
              width: 26, height: 26, flexShrink: 0,
              background: PX.sunYellow, border: `2px solid ${PX.night}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            }}>{c.u[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{c.u}</div>
                <PixelFlag code={c.c} px={2}/>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888' }}>· {c.t2}</div>
              </div>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, marginTop: 3, lineHeight: 1.4 }}>{c.t}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* 跳转来源房间 */}
      <div onClick={() => nav('P13')} className="pixel-btn" style={{
        marginTop: 14, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.grassGreen, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
      }}>📺 跳转来源房间 →</div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P6 · 竞猜
// ─────────────────────────────────────────────────────────────
function P6Page({ onBack, toast, nav }) {
  const [outer, setOuter] = React.useState(0);   // 0=全部场次 1=我的竞猜
  const [inner, setInner] = React.useState(0);   // 0=进行中 1=已结算 2=历史
  const [mTab, setMTab] = React.useState(0);     // 单场详情三 Tab: 胜平负/比分/首球
  const [pick, setPick] = React.useState({});

  const todayMatches = [
    { a: 'ar', b: 'en', t: '22:00', id: 'm1', pool: 128400, count: '00:42:18', odds: ['1.82','3.40','4.50'] },
    { a: 'br', b: 'de', t: '04:00', id: 'm2', pool:  94200, count: '06:42:18', odds: ['2.10','3.20','3.50'] },
    { a: 'fr', b: 'es', t: '15:00', id: 'm3', pool:  62300, count: '17:42:18', odds: ['2.40','3.00','2.90'] },
  ];
  const myOngoing = [
    { m: 'AR vs EN', pick: '2:1', bet: 500, status: '等待开赛', win: null },
    { m: 'BR vs DE', pick: '主胜', bet: 200, status: '比赛中',   win: null },
  ];
  const mySettled = [
    { m: 'BR vs DE (05-18)', pick: '2:1', real: '2:1', win: true,  r: '+480' },
    { m: 'FR vs ES (05-17)', pick: '1:0', real: '1:2', win: false, r: '—'    },
    { m: 'JP vs KR (05-16)', pick: '平局', real: '1:1', win: true,  r: '+320' },
  ];

  return (
    <PageShell title="PREDICT" subtitle="P6 · 比分竞猜" onBack={onBack} darkHeader>
      {/* 外层 Tab */}
      <TabBar tabs={['全部场次','我的竞猜']} active={outer} onChange={setOuter}/>

      {/* 排行榜入口（固定顶部） */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <Card onClick={() => toast('命中率榜')} style={{ flex: 1, padding: 8, textAlign: 'center', background: PX.sunYellow }}>
          <div style={{ fontSize: 22 }}>🎯</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginTop: 4, color: PX.night }}>HIT RATE</div>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700, marginTop: 3 }}>命中率榜</div>
        </Card>
        <Card onClick={() => toast('奖金榜')} style={{ flex: 1, padding: 8, textAlign: 'center', background: PX.red }}>
          <div style={{ fontSize: 22 }}>💰</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginTop: 4, color: PX.sunYellow }}>PRIZE</div>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700, marginTop: 3, color: '#fff' }}>奖金榜</div>
        </Card>
      </div>

      {outer === 0 && (
        <>
          <SecHead title="TODAY · 3 MATCHES" sub="今日 3 场"/>
          {todayMatches.map(m => (
            <Card key={m.id} style={{ marginBottom: 12 }}>
              {/* 对阵条 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <PixelFlag code={m.a} px={5}/>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginTop: 4 }}>{m.a.toUpperCase()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.darkRed }}>{m.t}</div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 4 }}>⏱ {m.count}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <PixelFlag code={m.b} px={5}/>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginTop: 4 }}>{m.b.toUpperCase()}</div>
                </div>
              </div>

              {/* 三 Tab */}
              <div style={{ marginTop: 10 }}>
                <TabBar tabs={['胜平负','比分','首球']} active={mTab} onChange={setMTab} size="sm"/>
              </div>

              {mTab === 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {[{l:`${m.a.toUpperCase()} 胜`,o:m.odds[0]},{l:'平局',o:m.odds[1]},{l:`${m.b.toUpperCase()} 胜`,o:m.odds[2]}].map((b, i) => (
                    <div key={i} onClick={() => setPick(p => ({...p, [m.id]: `${mTab}-${i}`}))} className="pixel-btn" style={{
                      flex: 1, padding: 7, textAlign: 'center', cursor: 'pointer',
                      background: pick[m.id] === `${mTab}-${i}` ? PX.sunYellow : PX.cream,
                      border: `2px solid ${PX.night}`, boxShadow: pick[m.id] === `${mTab}-${i}` ? 'none' : `2px 2px 0 ${PX.night}`,
                    }}>
                      <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>{b.l}</div>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed, marginTop: 4 }}>{b.o}</div>
                    </div>
                  ))}
                </div>
              )}
              {mTab === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginTop: 8 }}>
                  {['1:0','2:0','2:1','1:1','0:1','0:2','1:2','3:1','3:2','其他'].map((s, i) => (
                    <div key={s} onClick={() => setPick(p => ({...p, [m.id]: `${mTab}-${i}`}))} className="pixel-btn" style={{
                      padding: 6, textAlign: 'center', cursor: 'pointer',
                      background: pick[m.id] === `${mTab}-${i}` ? PX.sunYellow : PX.cream,
                      border: `2px solid ${PX.night}`, boxShadow: pick[m.id] === `${mTab}-${i}` ? 'none' : `2px 2px 0 ${PX.night}`,
                      fontFamily: "'Press Start 2P', monospace", fontSize: 8,
                    }}>{s}</div>
                  ))}
                </div>
              )}
              {mTab === 2 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {[{l:`${m.a.toUpperCase()} 首球`,o:'1.65'},{l:`${m.b.toUpperCase()} 首球`,o:'2.10'},{l:'无进球',o:'8.50'}].map((b, i) => (
                    <div key={i} onClick={() => setPick(p => ({...p, [m.id]: `${mTab}-${i}`}))} className="pixel-btn" style={{
                      flex: 1, padding: 7, textAlign: 'center', cursor: 'pointer',
                      background: pick[m.id] === `${mTab}-${i}` ? PX.sunYellow : PX.cream,
                      border: `2px solid ${PX.night}`, boxShadow: pick[m.id] === `${mTab}-${i}` ? 'none' : `2px 2px 0 ${PX.night}`,
                    }}>
                      <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700 }}>{b.l}</div>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed, marginTop: 4 }}>{b.o}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 累计下注池 */}
              <div style={{
                marginTop: 10, padding: 8, background: PX.night,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.sunYellow }}>POOL</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: PX.sunYellow, textShadow: `2px 2px 0 ${PX.red}` }}>{m.pool.toLocaleString()}</div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#fff' }}>HT 币</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                <input type="number" placeholder="下注金额" style={{
                  flex: 1, padding: 8, border: `2px solid ${PX.night}`,
                  fontFamily: "'Press Start 2P', monospace", fontSize: 10,
                }}/>
                <PixelButton color={PX.red} onClick={() => {
                  const ok = !!pick[m.id];
                  if (window.sfx) {
                    window.sfx.suppressNextClick();
                    if (ok) window.sfx.seq([{ name:'coin', at:0 }, { name:'confirm', at:160 }]);
                    else window.sfx.play('error');
                  }
                  toast(ok ? '确认下注' : '请先选择');
                }}>下注</PixelButton>
              </div>
            </Card>
          ))}
        </>
      )}

      {outer === 1 && (
        <>
          <div style={{ marginTop: 10 }}>
            <TabBar tabs={['进行中','已结算','历史']} active={inner} onChange={setInner} size="sm"/>
          </div>
          {inner === 0 && (
            <Card style={{ marginTop: 8 }}>
              {myOngoing.map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '8px 2px', borderBottom: i < myOngoing.length - 1 ? `1px dashed #ddd` : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{x.m}</div>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>下注 <span style={{ color: PX.darkRed }}>{x.bet}</span> 币</div>
                  </div>
                  <Tag>{x.pick}</Tag>
                  <Tag color={PX.sunYellow}>{x.status}</Tag>
                </div>
              ))}
            </Card>
          )}
          {inner === 1 && (
            <Card style={{ marginTop: 8 }}>
              {mySettled.map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '8px 2px', borderBottom: i < mySettled.length - 1 ? `1px dashed #ddd` : 'none' }}>
                  <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{x.m}</div>
                  <Tag>{x.pick}</Tag>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#888' }}>→{x.real}</div>
                  <Tag color={x.win ? PX.grassGreen : '#999'} textColor={x.win ? '#fff' : PX.night}>{x.win ? '中' : '未中'}</Tag>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, width: 34, textAlign: 'right' }}>{x.r}</div>
                </div>
              ))}
            </Card>
          )}
          {inner === 2 && (
            <Card style={{ marginTop: 8, textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 36 }}>📜</div>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#666', marginTop: 8 }}>活动前的历史竞猜记录为空</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 8 }}>总计 0 条 · 胜率 —</div>
            </Card>
          )}
        </>
      )}
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P7 · 个人战绩 / 奖励
// ─────────────────────────────────────────────────────────────
function P7Page({ onBack, toast, nav }) {
  const [rwTab, setRwTab] = React.useState(0);
  const unclaimed = [
    { ic: '🥇', n: '阿根廷胜场应援',  src: '焦点赛奖励',  amt: '+200 热力' },
    { ic: '🎖', n: '连胜 3 天徽章',   src: '每日签到',    amt: '1 枚徽章' },
  ];
  const claimed = [
    { ic: '⚽', n: '首次射门奖励',    src: '射门玩法',    amt: '+50 已领' },
    { ic: '🔥', n: '活动热度基础包', src: '活动开启',    amt: '+100 已领' },
  ];
  return (
    <PageShell title="MY PROFILE" subtitle="P7 · 战绩 & 奖励" onBack={onBack} darkHeader>
      {/* 用户卡 */}
      <div style={{
        padding: 14, background: `linear-gradient(135deg, ${PX.red}, ${PX.sunYellow})`,
        border: `3px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.night}`,
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 60, height: 60, background: '#fff',
            border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 22,
          }}>阿</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', textShadow: `2px 2px 0 ${PX.night}` }}>阿齐兹</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              <PixelFlag code="cn" px={3}/>
              <Tag color={PX.night} textColor={PX.sunYellow}>VIP 12</Tag>
              <Tag color={PX.gold}>🏆 冠军</Tag>
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#fff', marginTop: 6 }}>JOINED · DAY 14</div>
          </div>
        </div>
      </div>

      {/* 贡献数据仪表盘 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 10 }}>
        {[
          { l: 'HEAT',  v: '12,580', ic: '🔥' },
          { l: 'GIFTS', v: '2,480',  ic: '🎁' },
          { l: 'GOALS', v: '156',    ic: '⚽' },
          { l: 'HITS',  v: '38',     ic: '🎯' },
        ].map(x => (
          <Card key={x.l} style={{ padding: 6, textAlign: 'center' }}>
            <div style={{ fontSize: 18 }}>{x.ic}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.darkRed, marginTop: 4 }}>{x.v}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#888', marginTop: 3 }}>{x.l}</div>
          </Card>
        ))}
      </div>

      {/* 国家内个人排名卡 */}
      <SecHead title="COUNTRY RANK" sub="国家内个人排名"/>
      <Card bg={PX.night} style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PixelFlag code="cn" px={5}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700, color: '#fff' }}>中国 · 国内排名</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>TOP 2% · 超越 98% 国人</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: PX.sunYellow, textShadow: `2px 2px 0 ${PX.red}` }}>#128</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#fff', marginTop: 2 }}>/ 64,280</div>
          </div>
        </div>
      </Card>

      {/* 奖励领取区 */}
      <SecHead title="REWARDS" sub="奖励领取"/>
      <div style={{ marginBottom: 8 }}>
        <TabBar tabs={[`未领取 · ${unclaimed.length}`,'已领取']} active={rwTab} onChange={setRwTab} size="sm"/>
      </div>
      <Card>
        {(rwTab === 0 ? unclaimed : claimed).map((r, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 2px', position: 'relative',
            borderBottom: i < arr.length - 1 ? `1px dashed #ddd` : 'none',
          }}>
            {rwTab === 0 && <div className="live-blink" style={{ position: 'absolute', top: 4, left: -2, width: 6, height: 6, background: PX.red, border: `1px solid ${PX.night}` }}/>}
            <div style={{ fontSize: 24 }}>{r.ic}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{r.n}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>{r.src}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed, marginBottom: 4 }}>{r.amt}</div>
              {rwTab === 0 && <PixelButton color={PX.red} onClick={() => {
                if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'coin',at:0},{name:'unlock',at:220}]); }
                toast(`领取 ${r.n}`);
              }}>领取</PixelButton>}
              {rwTab === 1 && <Tag color={PX.grassGreen} textColor="#fff">已领</Tag>}
            </div>
          </div>
        ))}
      </Card>

      {/* 徽章墙 */}
      <SecHead title="BADGES" sub="徽章墙 · 6 / 10"/>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
          {['🥇','⚽','🎙','🎖','📣','👑','🌍','🔥','⭐','🏆'].map((b, i) => (
            <div key={i} style={{
              aspectRatio: '1', background: i < 6 ? PX.sunYellow : '#ddd',
              border: `2px solid ${PX.night}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, opacity: i < 6 ? 1 : 0.4,
            }}>{i < 6 ? b : '🔒'}</div>
          ))}
        </div>
      </Card>

      {/* 签到记录 + 竞猜入口 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
        <Card onClick={() => toast('连胜日历 · 已签到 12 天')} style={{ padding: 10, textAlign: 'center', background: PX.sunYellow }}>
          <div style={{ fontSize: 22 }}>📅</div>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 4 }}>签到记录</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed, marginTop: 3 }}>连续 12 天</div>
        </Card>
        <Card onClick={() => nav('P6')} style={{ padding: 10, textAlign: 'center', background: PX.cream }}>
          <div style={{ fontSize: 22 }}>🎯</div>
          <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700, marginTop: 4 }}>我的竞猜</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', marginTop: 3 }}>进行中 2 场</div>
        </Card>
      </div>

      {/* 贡献树 */}
      <SecHead title="CONTRIB TREE" sub="贡献树"/>
      <Card bg={PX.cream}>
        {[
          { c: 'cn', n: '中国',   v: 8920, pct: 72 },
          { c: 'ar', n: '阿根廷', v: 2340, pct: 19 },
          { c: 'br', n: '巴西',   v: 1120, pct: 9 },
        ].map(x => (
          <div key={x.c} style={{ padding: '5px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <PixelFlag code={x.c} px={2}/>
              <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{x.n}</div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed }}>{x.v}</div>
            </div>
            <ProgressBar value={x.pct} max={100} height={6} color={PX.red}/>
          </div>
        ))}
      </Card>

      {/* 分享战绩 CTA */}
      <div onClick={() => nav('P9')} className="pixel-btn" style={{
        marginTop: 14, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 12,
      }}>🚀 分享我的战绩 →</div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P8 · 规则说明（11 节折叠）
// ─────────────────────────────────────────────────────────────
function P8Page({ onBack, toast }) {
  const [open, setOpen] = React.useState(0); // 默认第一节展开
  const sections = [
    { t: '活动总览',     c: '2026 FIFA 世界杯期间，HelloTalk 联动 48 支参赛国家，推出"HelloTalk 世界杯 · 语言应援赛季"主题活动，覆盖跨文化交流、国家阵营竞争、赛事陪伴、赛季通行证等完整玩法。活动贯穿小组赛 → 淘汰赛 → 决赛，共 40 天。' },
    { t: '射门玩法规则', c: '送礼即助攻：低价礼物 = 传球，中价 = 过人，高价 = 射门，爆款 = 进球。每进 1 球记录为个人"进球数"，累计进球解锁金靴、银靴、铜靴徽章。' },
    { t: '48 国榜规则',  c: '综合分 = 送礼 × 0.5 + 时长 × 0.3 + 进球 × 0.2。榜单每小时刷新一次。Top 3 国家获得金/银/铜领奖台展示与专属皮肤。' },
    { t: '宝箱 / 福袋规则', c: '进入任意陪看房或官方房即可参与开箱。每日首次开箱必中限定贴纸；后续开箱按阶梯概率发放应援包、双倍卡、徽章等。' },
    { t: '竞猜规则',     c: '支持胜平负 / 比分 / 首球队三种玩法。单场竞猜截止于开赛前 5 分钟。中奖金额 = 下注 × 实时赔率。官方抽取奖池 3% 作为服务费。' },
    { t: '组队对战规则', c: '48 国两两配对进入 1v1 语聊房对决。房内送礼即对国家加分，战斗结束后按双方总热力判定 MVP 与胜方国家。' },
    { t: 'Speak to Score 规则', c: '完成学习 / 社交 / 付费 / 赛事四类任务获得热力值。热力值每日 0 点结算，所有国民贡献汇总为国家热力。' },
    { t: '奖励规则',     c: '奖励分三类：国家奖励（Top 3）、个人奖励（徽章、热力）、限定奖励（大力神杯礼物、VR 座席券）。未领取奖励有效期 7 天。' },
    { t: '违规处罚',     c: '禁止刷榜、账号互刷、使用脚本。一经发现永久取消赛事资格并冻结相关奖励。恶意言论按 HelloTalk 社区公约处理。' },
    { t: 'FAQ 常见问题', c: 'Q: 可以更换应援国家吗？A: 每用户赛事期内有 2 次更换机会。Q: 大力神杯礼物是什么？A: 限定全屏特效礼物，×2 贡献计算。' },
    { t: '用户协议',     c: '参与本活动即视为同意《HelloTalk 世界杯活动规则》及《HelloTalk 用户协议》。最终解释权归 HelloTalk 所有。' },
  ];
  return (
    <PageShell title="RULES" subtitle="P8 · 活动规则说明" onBack={onBack} darkHeader>
      <Card bg={PX.cream} style={{ padding: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 28 }}>📜</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.night }}>OFFICIAL</div>
            <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#555', marginTop: 3 }}>HelloTalk × 2026 FIFA World Cup</div>
          </div>
          <Tag color={PX.gold}>v1.0</Tag>
        </div>
      </Card>

      {/* 折叠列表 */}
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sections.map((s, i) => {
          const active = open === i;
          return (
            <div key={i} style={{
              background: active ? PX.cream : '#fff',
              border: `3px solid ${PX.night}`,
              boxShadow: active ? `3px 3px 0 ${PX.sunYellow}` : `3px 3px 0 ${PX.night}`,
            }}>
              <div onClick={() => setOpen(active ? -1 : i)} className="pixel-btn" style={{
                padding: '10px 10px', display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 22, height: 22, background: active ? PX.red : PX.sunYellow,
                  border: `2px solid ${PX.night}`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                  color: active ? '#fff' : PX.night,
                }}>{i + 1}</div>
                <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700 }}>{s.t}</div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace", fontSize: 14,
                  color: PX.night, transform: active ? 'rotate(90deg)' : 'none',
                  transition: 'transform 120ms steps(2, end)',
                }}>▸</div>
              </div>
              {active && (
                <div style={{
                  padding: '4px 12px 12px', borderTop: `2px dashed ${PX.night}`,
                  fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
                  color: '#444', lineHeight: 1.7,
                }}>{s.c}</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 14, padding: 8, background: PX.night, textAlign: 'center',
        border: `2px solid ${PX.sunYellow}`,
      }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.sunYellow }}>
          LAST UPDATE · 2026-06-10
        </div>
      </div>
    </PageShell>
  );
}

// ─────────────────────────────────────────────────────────────
// P9 · 分享邀请
// ─────────────────────────────────────────────────────────────
function P9Page({ onBack, toast }) {
  const [pickMat, setPickMat] = React.useState(0);
  const materials = [
    { t: '我的战绩卡', c: '#FF4444', ic: '🏆' },
    { t: '国家应援卡', c: '#4CAF50', ic: '🇨🇳' },
    { t: '活动主海报', c: '#FFD700', ic: '⚽' },
    { t: '焦点赛海报', c: '#3F51B5', ic: '📺' },
  ];
  const channels = [
    { k: 'save',  l: '保存图片', ic: '📥', color: PX.sunYellow },
    { k: 'copy',  l: '复制链接', ic: '🔗', color: PX.cream },
    { k: 'wx',    l: '微信',     ic: '💬', color: '#07C160' },
    { k: 'tt',    l: 'TikTok',   ic: '🎵', color: PX.night },
    { k: 'ig',    l: 'IG',       ic: '📸', color: '#E1306C' },
    { k: 'x',     l: 'X',        ic: '✖',  color: '#111' },
  ];
  const tiers = [
    { n: 1,  r: '+200 热力',    done: true  },
    { n: 3,  r: '限定贴纸包',   done: true  },
    { n: 5,  r: '双倍热力卡',   done: false },
    { n: 10, r: '金靴徽章',     done: false },
    { n: 20, r: '大力神杯礼物', done: false },
  ];
  const invited = [
    { n: 'Sofia', c: 'es', status: '已注册' },
    { n: 'Tom',   c: 'en', status: '已参与' },
    { n: 'Wei',   c: 'cn', status: '已邀请' },
  ];
  const myCount = 3;
  return (
    <PageShell title="SHARE" subtitle="P9 · 分享邀请" onBack={onBack} darkHeader>
      {/* 邀请码 */}
      <Card bg={PX.sunYellow} style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 34 }}>🎟</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.night }}>MY CODE</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: PX.darkRed, marginTop: 4, letterSpacing: 2 }}>HT-WC-7X92</div>
          </div>
          <PixelButton color={PX.red} onClick={() => {
            if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.play('copy_done'); }
            toast('邀请码已复制');
          }}>复制</PixelButton>
        </div>
      </Card>

      {/* 分享物料 */}
      <SecHead title="MATERIAL" sub="选择分享物料"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {materials.map((m, i) => (
          <div key={i} onClick={() => setPickMat(i)} className="pixel-btn" style={{
            flex: '0 0 150px', cursor: 'pointer',
            background: m.c, padding: 14,
            border: `3px solid ${pickMat === i ? PX.red : PX.night}`,
            boxShadow: pickMat === i ? `3px 3px 0 ${PX.red}` : `3px 3px 0 ${PX.night}`,
            textAlign: 'center', position: 'relative',
          }}>
            {pickMat === i && (
              <div style={{
                position: 'absolute', top: -8, right: -6,
                background: PX.sunYellow, color: PX.night,
                border: `2px solid ${PX.night}`, padding: '2px 5px',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              }}>✓ 已选</div>
            )}
            <div style={{ fontSize: 44 }}>{m.ic}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
              fontWeight: 700, marginTop: 10,
              color: m.c === PX.sunYellow ? PX.night : '#fff',
              textShadow: m.c === PX.sunYellow ? 'none' : `1px 1px 0 ${PX.night}`,
            }}>{m.t}</div>
          </div>
        ))}
      </div>

      {/* 分享渠道 */}
      <SecHead title="CHANNELS" sub="分享渠道"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {channels.map(ch => (
          <Card key={ch.k} onClick={() => toast(`分享到 ${ch.l}`)} style={{
            padding: 10, textAlign: 'center', background: ch.color,
          }}>
            <div style={{ fontSize: 26 }}>{ch.ic}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginTop: 6,
              color: ch.color === PX.cream || ch.color === PX.sunYellow ? PX.night : '#fff',
              textShadow: ch.color === PX.cream || ch.color === PX.sunYellow ? 'none' : `1px 1px 0 ${PX.night}`,
            }}>{ch.l}</div>
          </Card>
        ))}
      </div>

      {/* 邀请奖励阶梯 */}
      <SecHead title="INVITE REWARDS" sub={`已邀请 ${myCount} 人`}/>
      <Card>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 22, color: PX.red, textAlign: 'center' }}>{myCount}</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#888', textAlign: 'center', marginTop: 4 }}>FRIENDS INVITED</div>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={myCount} max={20} color={PX.red}/>
        </div>
        <div className="h-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 12, paddingBottom: 4 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              flex: '0 0 110px', padding: 8,
              background: t.done ? PX.sunYellow : '#fff',
              border: `3px solid ${t.done ? PX.gold : PX.night}`,
              boxShadow: t.done ? `3px 3px 0 ${PX.gold}` : `3px 3px 0 ${PX.night}`,
              textAlign: 'center', opacity: t.done ? 1 : 0.85, position: 'relative',
            }}>
              {t.done && (
                <div style={{
                  position: 'absolute', top: -7, left: -4,
                  background: PX.red, color: '#fff',
                  fontFamily: "'Press Start 2P', monospace", fontSize: 6,
                  padding: '2px 4px', border: `1.5px solid ${PX.night}`,
                }}>✓ 已达成</div>
              )}
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: PX.darkRed }}>{t.n} 人</div>
              <div style={{
                marginTop: 6, fontFamily: "'PingFang SC', sans-serif",
                fontSize: 10, fontWeight: 700, color: PX.night,
              }}>{t.r}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 邀请记录 */}
      <SecHead title="RECORDS" sub="邀请记录"/>
      <Card>
        {invited.map((x, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0', borderBottom: i < invited.length - 1 ? `1px dashed #ddd` : 'none' }}>
            <div style={{
              width: 28, height: 28, background: PX.sunYellow,
              border: `2px solid ${PX.night}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Press Start 2P', monospace", fontSize: 11,
            }}>{x.n[0]}</div>
            <PixelFlag code={x.c} px={2}/>
            <div style={{ flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>{x.n}</div>
            <Tag color={x.status === '已参与' ? PX.grassGreen : PX.cream} textColor={x.status === '已参与' ? '#fff' : PX.night}>{x.status}</Tag>
          </div>
        ))}
      </Card>
    </PageShell>
  );
}

Object.assign(window, { P4Page, P5Page, P51Page, P6Page, P7Page, P8Page, P9Page });
