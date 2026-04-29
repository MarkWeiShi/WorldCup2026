// P17 线下 Meetup 观赛派对 · P18 私聊话题包 · P19 宝箱福袋详情
// 对齐《2026 世界杯大活动系统方案》九章、三章中顶层（宝箱/福袋）

// ────────────────────────────────────────────────────────────
// P17 · 线下 Meetup
// ────────────────────────────────────────────────────────────
const MEETUP_CITIES = [
  { tier: 'S', city: '北京',       sessions: 3, next: '06-14', flag: 'cn', venue: 'HelloTalk Club 朝阳' },
  { tier: 'S', city: '上海',       sessions: 3, next: '06-14', flag: 'cn', venue: 'Tipsy Wagon 静安' },
  { tier: 'S', city: '广州',       sessions: 3, next: '06-15', flag: 'cn', venue: 'Perry\'s Pub 珠江新城' },
  { tier: 'S', city: '深圳',       sessions: 3, next: '06-15', flag: 'cn', venue: 'Rooftop Club 福田' },
  { tier: 'S', city: '东京',       sessions: 3, next: '06-18', flag: 'jp', venue: 'HUB 渋谷' },
  { tier: 'S', city: '首尔',       sessions: 3, next: '06-19', flag: 'kr', venue: 'KPop Sports Bar' },
  { tier: 'A', city: '成都',       sessions: 3, next: '06-16', flag: 'cn', venue: 'Jing Club 锦江' },
  { tier: 'A', city: '杭州',       sessions: 2, next: '06-17', flag: 'cn', venue: '云栖足球酒馆' },
  { tier: 'A', city: '武汉',       sessions: 2, next: '06-18', flag: 'cn', venue: '光谷球迷基地' },
  { tier: 'A', city: '曼谷',       sessions: 3, next: '06-20', flag: 'ma', venue: 'Sukhumvit Bar' },
  { tier: 'A', city: '伊斯坦布尔', sessions: 2, next: '06-22', flag: 'ma', venue: 'Beyoğlu Fan Zone' },
  { tier: 'A', city: '胡志明',     sessions: 2, next: '06-24', flag: 'ma', venue: 'District 1 Pub' },
];

const MEETUP_UPCOMING = [
  { city: '上海', date: '06-14', match: '🇦🇷 vs 🇬🇧', signed: 78, cap: 100 },
  { city: '北京', date: '06-14', match: '🇦🇷 vs 🇬🇧', signed: 66, cap: 80 },
  { city: '东京', date: '06-18', match: '🇯🇵 vs 🇧🇷', signed: 92, cap: 120 },
  { city: '首尔', date: '06-19', match: '🇰🇷 vs 🇩🇪', signed: 88, cap: 100 },
  { city: '成都', date: '06-16', match: '🇲🇽 vs 🇺🇸', signed: 42, cap: 60 },
];

const MEETUP_SOP = [
  { t: 'T-14 天', act: '招募', d: '圈子 + 信息流发布活动贴，报名链接',      kpi: '报名 ≥ 50 人' },
  { t: 'T-7 天',  act: '物料', d: '快递球衣 / 国旗 / 气球 / HelloTalk 周边',  kpi: '物料到场' },
  { t: 'T-1 天',  act: '彩排', d: '确认场地 / 连麦设备 / 摄影',               kpi: 'Checklist 签字' },
  { t: 'T 日 18:00', act: '签到', d: '二维码签到 + 领应援物料',                kpi: '到场率 ≥ 70%' },
  { t: 'T 日 19:00', act: '暖场', d: '主持人开场 + 国家阵营分组',              kpi: '组队对战发起' },
  { t: 'T 日 20:00', act: '观赛', d: '同步看球 + 连麦官频房',                   kpi: '全场视频素材' },
  { t: 'T 日 23:00', act: '收官', d: '合影 + 礼物互送 + 私域拉群',             kpi: '次日视频 ≥ 5 条' },
  { t: 'T+1 天',   act: '反哺', d: '视频 / 图文上传圈子、信息流、短视频平台',  kpi: 'UGC 50+ 条' },
];

function P17Page({ onBack, toast }) {
  const [tier, setTier] = React.useState(0);   // 0=All 1=S 2=A
  const [sopOpen, setSopOpen] = React.useState(-1);

  const filtered = tier === 0 ? MEETUP_CITIES
    : (tier === 1 ? MEETUP_CITIES.filter(c => c.tier === 'S')
                  : MEETUP_CITIES.filter(c => c.tier === 'A'));

  return (
    <PageShell title="MEETUP" subtitle="P17 · 线下观赛派对" onBack={onBack} darkHeader>
      {/* 头图 */}
      <div style={{
        position: 'relative', padding: '16px 12px',
        background: `linear-gradient(135deg, ${PX.grassGreen}, #2d7a32)`,
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 12px, transparent 12px 24px)',
        }}/>
        <div className="cloud-drift-slow" style={{ position: 'absolute', top: 6, left: -60, zIndex: 2 }}>
          <PixelCloud size={36}/>
        </div>
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 14,
            color: '#fff', textShadow: `2px 2px 0 ${PX.night}`, letterSpacing: 1,
          }}>OFFLINE MEETUP</div>
          <div style={{
            fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
            color: PX.sunYellow, fontWeight: 700, marginTop: 6,
          }}>HelloTalk × 世界杯 · 线下观赛派对</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: '#fff', marginTop: 8, letterSpacing: 1,
          }}>12 CITIES · 32 PARTIES · 5,000+ FANS</div>
        </div>
      </div>

      {/* 城市 Tab */}
      <div style={{ marginTop: 12 }}>
        <TabBar tabs={['全部 12','S 级 6','A 级 6']} active={tier} onChange={setTier}/>
      </div>

      {/* 城市网格 */}
      <SecHead title="CITIES" sub="合作城市"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filtered.map(c => (
          <Card key={c.city} onClick={() => toast(`${c.city} · ${c.venue}`)} style={{ padding: 10, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -6, right: -4 }}>
              <Tag color={c.tier === 'S' ? PX.red : PX.gold} textColor={c.tier === 'S' ? '#fff' : PX.night} size={7}>
                {c.tier} 级
              </Tag>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PixelFlag code={c.flag} px={3}/>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700,
              }}>{c.city}</div>
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: '#888', marginTop: 5,
            }}>{c.venue}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
              <Tag color={PX.cream}>{c.sessions} 场</Tag>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: PX.darkRed,
              }}>下场 {c.next}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* 近期派对横滑 */}
      <SecHead title="UPCOMING" sub="近期派对 · 热招中"/>
      <div className="h-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {MEETUP_UPCOMING.map((p, i) => {
          const pct = Math.round((p.signed / p.cap) * 100);
          return (
            <Card key={i} onClick={() => toast(`立即报名 · ${p.city} ${p.date}`)} style={{
              flex: '0 0 170px', padding: 10, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: PX.darkRed,
                }}>{p.date}</div>
                <Tag color={pct >= 80 ? PX.red : PX.gold} textColor={pct >= 80 ? '#fff' : PX.night} size={7}>
                  {pct >= 80 ? '即将满员' : '招募中'}
                </Tag>
              </div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 13,
                fontWeight: 700, marginTop: 6,
              }}>{p.city}</div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                marginTop: 4,
              }}>{p.match}</div>
              <div style={{ marginTop: 8 }}>
                <ProgressBar value={p.signed} max={p.cap} color={PX.red} height={8}/>
              </div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#888', marginTop: 4,
              }}>{p.signed} / {p.cap} 人</div>
            </Card>
          );
        })}
      </div>

      {/* 执行 SOP */}
      <SecHead title="SOP" sub="单场标准流程"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {MEETUP_SOP.map((s, i) => {
          const open = sopOpen === i;
          return (
            <div key={i} style={{
              background: open ? PX.cream : '#fff',
              border: `2.5px solid ${PX.night}`,
              boxShadow: open ? `3px 3px 0 ${PX.sunYellow}` : `2px 2px 0 ${PX.night}`,
            }}>
              <div onClick={() => setSopOpen(open ? -1 : i)} className="pixel-btn" style={{
                padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              }}>
                <div style={{
                  minWidth: 78, fontFamily: "'Press Start 2P', monospace", fontSize: 8,
                  color: PX.darkRed,
                }}>{s.t}</div>
                <div style={{
                  flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700,
                }}>{s.act}</div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace", fontSize: 13,
                  transform: open ? 'rotate(90deg)' : 'none',
                  transition: 'transform 120ms steps(2, end)',
                }}>▸</div>
              </div>
              {open && (
                <div style={{
                  padding: '4px 12px 10px', borderTop: `1.5px dashed ${PX.night}`,
                }}>
                  <div style={{
                    fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                    color: '#444', lineHeight: 1.6, marginTop: 6,
                  }}>{s.d}</div>
                  <div style={{
                    marginTop: 6, fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                    color: PX.grassGreen,
                  }}>KPI · {s.kpi}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 参与奖励 */}
      <SecHead title="REWARDS" sub="到场福利"/>
      <Card bg={PX.sunYellow}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { ic: '👕', t: '限定球衣' },
            { ic: '🧣', t: '国家围巾' },
            { ic: '🎖', t: '到场徽章' },
            { ic: '💬', t: '私域社群' },
          ].map(r => (
            <div key={r.t} style={{
              textAlign: 'center', padding: 6, background: '#fff',
              border: `2px solid ${PX.night}`,
            }}>
              <div style={{ fontSize: 24 }}>{r.ic}</div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
                fontWeight: 700, marginTop: 4,
              }}>{r.t}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 10, fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
          color: PX.night, textAlign: 'center', fontWeight: 700,
        }}>签到即领 4 件礼包 · 限量发放</div>
      </Card>

      {/* 报名 CTA */}
      <div onClick={() => {
        if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'confirm',at:0},{name:'achievement',at:200}]); }
        toast('报名链接已复制');
      }} className="pixel-btn" style={{
        marginTop: 14, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 12,
      }}>🎉 立即报名参加</div>
    </PageShell>
  );
}

// ────────────────────────────────────────────────────────────
// P18 · 私聊话题包
// ────────────────────────────────────────────────────────────
const TOPIC_PACKS = {
  ice: [
    { t: '你支持哪支球队？为什么？',  extra: '🇦🇷 🇧🇷 🇩🇪 附国旗贴纸' },
    { t: '最让你感动的世界杯瞬间？',  extra: '👀 求回忆' },
    { t: '你会看今晚 22:00 那场吗？', extra: '🎫 一键邀请陪看' },
  ],
  culture: [
    { t: '讲一个你家乡的足球故事',    extra: '🎙 语音 5 分钟' },
    { t: '你最爱 2026 哪件球衣？',    extra: '👕 图片投票' },
    { t: '你们国家怎么庆祝进球？',    extra: '🏮 文化卡' },
  ],
  lang: [
    { t: '用目标语言说一句加油',      extra: '🔊 跟读评分' },
    { t: '翻译这句球迷口号',           extra: '📝 学习任务 +20' },
    { t: '3 个词描述你支持的国家',     extra: '💬 对话启动' },
  ],
  predict: [
    { t: '今晚这场你预测多少比分？',   extra: '🎯 竞猜投票卡' },
    { t: '黑马是谁？',                 extra: '🐎 打赏贴' },
    { t: '你押哪个队夺冠？',           extra: '🏆 长赛季竞猜' },
  ],
  invite: [
    { t: '一起进这个房陪看？',         extra: '📺 陪看邀请卡' },
    { t: '线下 Meetup 一起去？',       extra: '📍 同城派对卡' },
    { t: '组队对战需要一个 MVP',       extra: '⚔ 1v1 邀请' },
  ],
};
const TOPIC_TABS = [
  { k: 'ice',     label: '破冰', ic: '🧊' },
  { k: 'culture', label: '文化', ic: '🎭' },
  { k: 'lang',    label: '语言', ic: '🗣' },
  { k: 'predict', label: '竞猜', ic: '🎯' },
  { k: 'invite',  label: '约房', ic: '📺' },
];

function P18Page({ onBack, toast }) {
  const [tab, setTab] = React.useState(0);
  const key = TOPIC_TABS[tab].k;
  return (
    <PageShell title="TOPIC PACKS" subtitle="P18 · 私聊话题包" onBack={onBack} darkHeader>
      <Card bg={PX.cream} style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 28 }}>⚽</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.night,
            }}>WORLD CUP PACK</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#555', marginTop: 3,
            }}>私聊输入框 足球图标 → 一键发送话题卡</div>
          </div>
          <Tag color={PX.gold}>每日 3–5 条</Tag>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
        {TOPIC_TABS.map((t, i) => (
          <div key={t.k} onClick={() => setTab(i)} style={{
            flex: '1 1 60px', padding: '8px 4px', textAlign: 'center',
            cursor: 'pointer',
            background: tab === i ? PX.night : PX.cream,
            color: tab === i ? PX.sunYellow : PX.night,
            border: `2px solid ${PX.night}`,
            boxShadow: tab === i ? 'none' : `2px 2px 0 ${PX.night}`,
          }}>
            <div style={{ fontSize: 16 }}>{t.ic}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              fontWeight: 700, marginTop: 3,
            }}>{t.label}</div>
          </div>
        ))}
      </div>

      <SecHead title={TOPIC_TABS[tab].label.toUpperCase()} sub={`共 ${TOPIC_PACKS[key].length} 条话题`}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TOPIC_PACKS[key].map((p, i) => (
          <Card key={i} style={{ padding: 10 }}>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12, fontWeight: 700,
              lineHeight: 1.4,
            }}>{p.t}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: '#888', marginTop: 6,
            }}>{p.extra}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <div onClick={() => toast(`已发送 · ${p.t}`)} className="pixel-btn" style={{
                flex: 1, padding: '7px 0', textAlign: 'center', cursor: 'pointer',
                background: PX.red, color: '#fff',
                border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              }}>发送</div>
              <div onClick={() => toast('话题卡预览')} className="pixel-btn" style={{
                flex: 1, padding: '7px 0', textAlign: 'center', cursor: 'pointer',
                background: PX.cream, color: PX.night,
                border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              }}>预览</div>
            </div>
          </Card>
        ))}
      </div>

      <SecHead title="DAILY HOT" sub="今日 3 条热门话题"/>
      <Card bg={PX.night} style={{ padding: 10 }}>
        {[
          '🇧🇷 vs 🇩🇪 · 你押几比几？',
          '梅西能否夺冠？',
          '哪件世界杯球衣最帅？',
        ].map((q, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 0', borderBottom: i < arr.length - 1 ? `1px dashed rgba(255,215,0,0.3)` : 'none',
          }}>
            <div style={{
              width: 20, textAlign: 'center',
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              color: PX.gold,
            }}>{i + 1}</div>
            <div style={{
              flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
              color: '#fff',
            }}>{q}</div>
            <Tag color={PX.red} textColor="#fff" size={7}>🔥 热</Tag>
          </div>
        ))}
      </Card>
    </PageShell>
  );
}

// ────────────────────────────────────────────────────────────
// P19 · 宝箱 + 福袋详情
// ────────────────────────────────────────────────────────────
const CHEST_TIERS = [
  { t: '小宝箱', cost: 100,  icon: '📦', reward: '国旗贴纸 · +10 热力', rate: '必中' },
  { t: '中宝箱', cost: 500,  icon: '🎁', reward: '球衣挂件 · +50 热力', rate: '70%' },
  { t: '大宝箱', cost: 2000, icon: '💎', reward: '球星卡 · +200 热力',   rate: '30%' },
];
const POUCH_REWARDS = [
  { ic: '🏁', n: '国旗徽章',   r: '保底' },
  { ic: '⚽', n: '金色足球',   r: '10%' },
  { ic: '🎺', n: '呜呜祖拉',   r: '30%' },
  { ic: '👑', n: '球星签名卡', r: '5%'  },
  { ic: '🏆', n: '大力神杯微缩', r: '0.5%'},
  { ic: '🎆', n: '烟花礼',     r: '20%' },
];

function P19Page({ onBack, toast, nav }) {
  const [selChest, setSelChest] = React.useState(1);
  const pouchProgress = 6800;   // 当前房累送
  const pouchTarget = 10000;

  return (
    <PageShell title="TREASURE" subtitle="P19 · 宝箱 + 福袋" onBack={onBack} darkHeader>
      {/* 宝箱入口大卡 */}
      <Card bg={PX.night} style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="chest-shake"><PixelChest size={48}/></div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              color: PX.sunYellow,
            }}>BATTLE CHEST</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
              color: '#fff', marginTop: 4, lineHeight: 1.4,
            }}>组队对战结算触发 · 阵营消耗 10% 入池</div>
          </div>
          <div className="pouch-glow"><PixelPouch size={42}/></div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <Tag color={PX.red} textColor="#fff" size={8}>可开 2 次</Tag>
          <Tag color={PX.sunYellow} size={8}>输方保底</Tag>
          <Tag color={PX.grassGreen} textColor="#fff" size={8}>稀有球星</Tag>
        </div>
      </Card>

      {/* 3 档宝箱 */}
      <SecHead title="CHEST TIERS" sub="三档阶梯"/>
      <div style={{ display: 'flex', gap: 8 }}>
        {CHEST_TIERS.map((c, i) => (
          <div key={i} onClick={() => setSelChest(i)} className="pixel-btn" style={{
            flex: 1, padding: 10, cursor: 'pointer', textAlign: 'center',
            background: selChest === i ? PX.sunYellow : '#fff',
            border: `3px solid ${selChest === i ? PX.red : PX.night}`,
            boxShadow: selChest === i ? `3px 3px 0 ${PX.red}` : `3px 3px 0 ${PX.night}`,
          }}>
            <div style={{ fontSize: 30 }}>{c.icon}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
              fontWeight: 700, marginTop: 6,
            }}>{c.t}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: PX.darkRed, marginTop: 4,
            }}>{c.cost} 币门槛</div>
          </div>
        ))}
      </div>

      <Card style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 30 }}>{CHEST_TIERS[selChest].icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700,
            }}>{CHEST_TIERS[selChest].t} · 主奖品</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: PX.grassGreen, marginTop: 4,
            }}>{CHEST_TIERS[selChest].reward}</div>
          </div>
          <Tag color={PX.gold}>{CHEST_TIERS[selChest].rate}</Tag>
        </div>
      </Card>

      {/* 福袋进度 */}
      <SecHead title="LUCKY POUCH" sub="单房累送解锁限定福袋"/>
      <Card bg={PX.cream}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="pouch-glow"><PixelPouch size={44}/></div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
              color: PX.darkRed, marginBottom: 4,
            }}>CURRENT HOUSE · 累送 {pouchProgress.toLocaleString()} / {pouchTarget.toLocaleString()} 币</div>
            <ProgressBar value={pouchProgress} max={pouchTarget} color={PX.red} height={10}/>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: '#555', marginTop: 6,
            }}>差 {(pouchTarget - pouchProgress).toLocaleString()} 币触发 · 今日剩 4 次 · 每次 5 分钟</div>
          </div>
        </div>
      </Card>

      {/* 福袋奖品预览 */}
      <SecHead title="POUCH REWARDS" sub="福袋掉落"/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {POUCH_REWARDS.map(r => (
          <Card key={r.n} style={{ padding: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{r.ic}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              fontWeight: 700, marginTop: 4,
            }}>{r.n}</div>
            <Tag color={r.r === '保底' ? PX.grassGreen : (r.r === '0.5%' ? PX.red : PX.gold)}
              textColor={r.r === '保底' || r.r === '0.5%' ? '#fff' : PX.night}
              size={7}>{r.r}</Tag>
          </Card>
        ))}
      </div>

      {/* 赛事阶段爆率 */}
      <SecHead title="RATE BY STAGE" sub="赛事阶段动态爆率"/>
      <Card>
        {[
          { stage: '小组赛', chest: '国家队徽', pouch: '常规礼物', skin: '48 国球衣/国旗任选' },
          { stage: '进球瞬间', chest: '爆率 +30%', pouch: '爆款 ×2', skin: '庆祝动效' },
          { stage: '淘汰赛', chest: '稀有球星', pouch: '金球福袋', skin: '对阵队徽' },
          { stage: '决赛', chest: '冠军纪念款', pouch: '大力神杯福袋', skin: '冠军金光' },
        ].map((r, i, arr) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr', gap: 6,
            padding: '7px 0', alignItems: 'center',
            borderBottom: i < arr.length - 1 ? `1px dashed #ddd` : 'none',
          }}>
            <Tag color={['#E0E0E0', PX.red, PX.gold, PX.sunYellow][i]} textColor={i === 1 ? '#fff' : PX.night} size={8}>
              {r.stage}
            </Tag>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.darkRed,
            }}>{r.chest}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.grassGreen,
            }}>{r.pouch}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#666',
            }}>{r.skin}</div>
          </div>
        ))}
      </Card>

      {/* 触发入口 */}
      <div onClick={() => nav('P11')} className="pixel-btn" style={{
        marginTop: 14, padding: '12px 0', textAlign: 'center', cursor: 'pointer',
        background: PX.red, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
      }}>⚔ 进组队对战触发 →</div>
    </PageShell>
  );
}

Object.assign(window, { P17Page, P18Page, P19Page });
