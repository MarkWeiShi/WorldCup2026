// P16 · 连胜打卡 · 世界杯文化日历
// 对齐《2026 世界杯大活动系统方案》七章：顶部公告栏 Banner + 日历页 + 半弹窗活动集合页三层触达

const CULTURE_DAYS_P16 = {
  12: { c: 'mx', name: '墨西哥', title: '墨西哥开幕文化日' },
  13: { c: 'ar', name: '阿根廷', title: '阿根廷探戈 & 梅西传奇' },
  14: { c: 'br', name: '巴西',   title: '巴西桑巴狂欢日' },
  15: { c: 'de', name: '德国',   title: '德国啤酒节 × 足球文化' },
  16: { c: 'en', name: '英格兰', title: '英格兰三狮精神' },
  17: { c: 'fr', name: '法国',   title: '法国艺术足球' },
  18: { c: 'jp', name: '日本',   title: '日本武士蓝' },
  19: { c: 'kr', name: '韩国',   title: '韩国红魔' },
  20: { c: 'pt', name: '葡萄牙', title: '葡萄牙航海精神' },
  21: { c: 'es', name: '西班牙', title: '西班牙斗牛士' },
  22: { c: 'nl', name: '荷兰',   title: '荷兰全攻全守' },
  24: { c: 'be', name: '比利时', title: '比利时欧洲红魔' },
  25: { c: 'hr', name: '克罗地亚', title: '克罗地亚格子军团' },
  26: { c: 'ma', name: '摩洛哥', title: '摩洛哥非洲之光' },
  27: { c: 'sn', name: '塞内加尔', title: '塞内加尔特兰加之狮' },
};
const MATCH_DAYS_P16 = new Set([12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
const SIGNED_DAYS_P16 = new Set([3,4,5,6,7,8,9,10,11,12,13]);
const TODAY_P16 = 14;
const STREAK_P16 = 11;
const COLOR_CULTURE = '#9C27B0';   // 紫 = 文化日
const COLOR_MATCH   = PX.gold;     // 橘 = 赛程周期
const COLOR_FESTIVAL = '#2196F3';  // 蓝 = 常规节日

// ─── 顶部公告栏 Banner ────────────────────────────────────────
function P16Banner() {
  return (
    <div id="anchor-checkin-banner" style={{
      background: `linear-gradient(90deg, ${PX.red}, #E53935)`,
      border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
      padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="ball-wobble" style={{ flexShrink: 0 }}><PixelBall size={20}/></div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: PX.sunYellow, marginBottom: 3,
        }}>BROADCAST · 2026-06-14</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
          fontWeight: 700, color: '#fff',
        }}>今日焦点：🇧🇷 巴西 vs 🇩🇪 德国 · 22:00</div>
      </div>
      <Tag color={PX.sunYellow} textColor={PX.night}>LIVE 倒计时</Tag>
    </div>
  );
}

// ─── 签到状态大卡 ─────────────────────────────────────────────
function P16CheckIn({ streak, checked, onCheckIn }) {
  const milestones = [7, 14, 21, 30];
  const nextMile = milestones.find(m => m > streak) || milestones[milestones.length - 1];
  return (
    <Card bg={PX.night} style={{ padding: 12, marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 36,
            color: PX.sunYellow, textShadow: `3px 3px 0 ${PX.red}`, lineHeight: 1,
          }}>{streak}</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 6,
            color: '#fff', marginTop: 6,
          }}>STREAK · 连胜</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX.sunYellow, marginBottom: 6,
          }}>NEXT · {nextMile} 天徽章 · 差 {nextMile - streak} 天</div>
          <ProgressBar value={streak} max={nextMile} color={PX.sunYellow} height={8}/>
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {milestones.map(m => (
              <Tag key={m}
                color={streak >= m ? PX.grassGreen : '#3a3a5a'}
                textColor={streak >= m ? '#fff' : '#888'}
                size={7}>
                {m}天 {streak >= m ? '✓' : ''}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div onClick={checked ? undefined : onCheckIn}
        className={checked ? '' : 'pixel-btn'}
        style={{
          marginTop: 10, padding: '10px 0', textAlign: 'center',
          cursor: checked ? 'default' : 'pointer',
          background: checked ? '#444' : PX.red, color: '#fff',
          border: `3px solid ${checked ? '#666' : PX.sunYellow}`,
          boxShadow: checked ? 'none' : `3px 3px 0 ${PX.sunYellow}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: 11,
        }}>
        {checked ? '✓ 今日已签到' : '🔥 今日签到 · +20 热力'}
      </div>
    </Card>
  );
}

// ─── 色标图例 ─────────────────────────────────────────────────
function P16Legend() {
  const legend = [
    { color: COLOR_CULTURE,    label: '文化日' },
    { color: COLOR_MATCH,      label: '赛程日' },
    { color: COLOR_FESTIVAL,   label: '节日' },
    { color: PX.grassGreen,    label: '已签到' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap',
      padding: '6px 8px', background: PX.cream,
      border: `2px solid ${PX.night}`,
    }}>
      {legend.map(x => (
        <div key={x.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            width: 12, height: 12, background: x.color,
            border: `1.5px solid ${PX.night}`,
          }}/>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night }}>{x.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── 月历网格 ────────────────────────────────────────────────
function P16Calendar({ onOpenDay }) {
  const daysInMonth = 30;
  const firstDayOffset = 0;   // 2026-06-01 是周一
  const weekDays = ['一','二','三','四','五','六','日'];
  const cells = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  return (
    <div style={{
      marginTop: 10, background: PX.cream,
      border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
      padding: 8,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2, marginBottom: 4,
      }}>
        {weekDays.map(w => (
          <div key={w} style={{
            textAlign: 'center', fontFamily: "'Press Start 2P', monospace",
            fontSize: 8, color: PX.darkRed, padding: '4px 0',
          }}>{w}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i}/>;
          const culture = CULTURE_DAYS_P16[d];
          const isMatch = MATCH_DAYS_P16.has(d);
          const signed = SIGNED_DAYS_P16.has(d);
          const isToday = d === TODAY_P16;
          const clickable = culture || isMatch;
          let bg = '#fff';
          if (culture) bg = COLOR_CULTURE;
          else if (isMatch) bg = COLOR_MATCH;
          return (
            <div key={i}
              onClick={() => clickable && onOpenDay(d)}
              className={clickable ? 'pixel-btn' : ''}
              style={{
                aspectRatio: '1',
                background: bg,
                border: `${isToday ? 3 : 2}px solid ${isToday ? PX.red : PX.night}`,
                boxShadow: isToday ? `2px 2px 0 ${PX.red}` : 'none',
                cursor: clickable ? 'pointer' : 'default',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 2, minHeight: 36,
              }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                color: culture ? '#fff' : PX.night,
                textShadow: culture ? `1px 1px 0 ${PX.night}` : 'none',
              }}>{d}</div>
              {culture && (
                <div style={{
                  marginTop: 1, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ transform: 'scale(0.45)', transformOrigin: 'center', height: 10 }}>
                    <PixelFlag code={culture.c} px={2}/>
                  </div>
                </div>
              )}
              {isMatch && !culture && (
                <div style={{ fontSize: 10, lineHeight: 1 }}>⚽</div>
              )}
              {signed && (
                <div style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 12, height: 12, background: PX.grassGreen,
                  border: `1.5px solid ${PX.night}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, color: '#fff', fontWeight: 900,
                }}>✓</div>
              )}
              {isToday && (
                <div className="live-blink" style={{
                  position: 'absolute', bottom: -3, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 8, height: 8, background: PX.red,
                  border: `1.5px solid ${PX.night}`,
                }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 48 国文化日横滑 ─────────────────────────────────────────
function P16CultureDayScroll({ onOpenDay }) {
  const days = Object.keys(CULTURE_DAYS_P16).map(Number).sort((a, b) => a - b);
  return (
    <div className="h-scroll" style={{
      display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
    }}>
      {days.map(d => {
        const c = CULTURE_DAYS_P16[d];
        const isToday = d === TODAY_P16;
        return (
          <div key={d} onClick={() => onOpenDay(d)} className="pixel-btn" style={{
            flex: '0 0 138px', padding: 8, cursor: 'pointer',
            background: isToday ? PX.sunYellow : PX.cream,
            border: `3px solid ${isToday ? PX.red : PX.night}`,
            boxShadow: isToday ? `3px 3px 0 ${PX.red}` : `3px 3px 0 ${PX.night}`,
            position: 'relative',
          }}>
            {isToday && (
              <div style={{ position: 'absolute', top: -8, right: -4 }}>
                <Tag color={PX.red} textColor="#fff" size={7}>今日</Tag>
              </div>
            )}
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              color: PX.darkRed,
            }}>06-{String(d).padStart(2,'0')}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <PixelFlag code={c.c} px={3}/>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
              }}>{c.name}</div>
            </div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              color: '#555', marginTop: 4, lineHeight: 1.3,
            }}>{c.title}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 消息提示开关 ────────────────────────────────────────────
function P16NotifyToggle() {
  const [on, setOn] = React.useState(true);
  return (
    <div style={{
      marginTop: 14, padding: '10px 12px',
      background: PX.cream, border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ fontSize: 22 }}>🔔</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700 }}>
          每日文化日推送
        </div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: '#888', marginTop: 3,
        }}>09:00 提醒 · 比赛前 1h 再推一次</div>
      </div>
      <div onClick={() => setOn(!on)} className="pixel-btn" style={{
        width: 44, height: 22, background: on ? PX.grassGreen : '#aaa',
        border: `2px solid ${PX.night}`, position: 'relative', cursor: 'pointer',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 1, left: on ? 22 : 1,
          width: 16, height: 16, background: '#fff',
          border: `1.5px solid ${PX.night}`,
          transition: 'left 120ms steps(3, end)',
        }}/>
      </div>
    </div>
  );
}

// ─── 半弹窗集合页（4 模块 Tab） ────────────────────────────────
function P16CollectionModal({ date, onClose, toast, nav }) {
  const info = CULTURE_DAYS_P16[date];
  const isMatchOnly = !info && MATCH_DAYS_P16.has(date);
  const [tab, setTab] = React.useState(0);

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 400,
      background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxHeight: '82%', overflowY: 'auto',
        background: PX.night, borderTop: `4px solid ${PX.sunYellow}`,
        padding: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            flex: 1, fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            color: PX.sunYellow,
          }}>
            06-{String(date).padStart(2,'0')} · {info ? info.name + '文化日' : '比赛日'}
          </div>
          <div onClick={onClose} className="pixel-btn" style={{
            width: 26, height: 26, background: PX.red, color: '#fff',
            border: `2px solid ${PX.sunYellow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace", fontSize: 12, cursor: 'pointer',
          }}>✕</div>
        </div>

        {info && (
          <div style={{
            padding: 12, background: COLOR_CULTURE,
            border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
            color: '#fff', textAlign: 'center',
          }}>
            <div style={{
              transform: 'scale(1.6)', display: 'inline-block', margin: '6px 0',
            }}>
              <PixelFlag code={info.c} px={4}/>
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              color: PX.sunYellow, marginTop: 12, letterSpacing: 1,
            }}>{info.c.toUpperCase()} CULTURE DAY</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
              fontWeight: 700, marginTop: 6,
            }}>{info.title}</div>
          </div>
        )}

        {isMatchOnly && (
          <Card bg={PX.cream} style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 30 }}>⚽</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
              fontWeight: 700, marginTop: 8,
            }}>今日有比赛进行中</div>
            <PixelButton color={PX.red} onClick={() => { onClose(); nav('P1'); }}
              style={{ width: '100%', marginTop: 12 }}>进入焦点赛详情 →</PixelButton>
          </Card>
        )}

        {info && (
          <>
            <div style={{ marginTop: 12 }}>
              <TabBar tabs={['信息流贴','直播官频','课程','奖励']} active={tab} onChange={setTab} size="sm"/>
            </div>

            <div style={{ marginTop: 10 }}>
              {tab === 0 && (
                <Card>
                  {[
                    { u: 'Diego', t: `${info.name} 加油！${info.title} 开始了 🔥`, hot: true },
                    { u: 'Maria', t: '分享我家乡派对视频，想一起看的来房间' },
                    { u: 'Luiza', t: '今晚线下聚会同看，圣保罗有人吗？' },
                  ].map((p, i, arr) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, padding: '6px 0', alignItems: 'center',
                      borderBottom: i < arr.length-1 ? `1px dashed #ddd` : 'none',
                    }}>
                      <div style={{
                        width: 26, height: 26, flexShrink: 0,
                        background: PX.sunYellow, border: `2px solid ${PX.night}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Press Start 2P', monospace", fontSize: 10,
                      }}>{p.u[0]}</div>
                      <div style={{
                        flex: 1, fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                      }}>{p.t}</div>
                      {p.hot && <Tag color={PX.red} textColor="#fff" size={7}>热</Tag>}
                    </div>
                  ))}
                  <div onClick={() => { onClose(); nav('P14'); }} className="pixel-btn" style={{
                    marginTop: 10, padding: '8px 0', textAlign: 'center',
                    background: PX.sunYellow, color: PX.night, cursor: 'pointer',
                    border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
                    fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                  }}>进入圈子讨论 →</div>
                </Card>
              )}
              {tab === 1 && (
                <Card>
                  {[
                    { t: `${info.name} 主队官频房`, v: '12.3k', c: '#FF4444' },
                    { t: '多语言解说房',            v: '8.7k',  c: '#4CAF50' },
                    { t: '球迷连麦房',              v: '5.1k',  c: '#FFC107' },
                  ].map((r, i, arr) => (
                    <div key={i} style={{
                      display: 'flex', gap: 8, padding: '7px 0', alignItems: 'center',
                      borderBottom: i < arr.length-1 ? `1px dashed #ddd` : 'none',
                    }}>
                      <div style={{
                        width: 44, height: 32, flexShrink: 0,
                        background: r.c, border: `2px solid ${PX.night}`, position: 'relative',
                      }}>
                        <div style={{ position: 'absolute', top: 2, right: 2 }}><LiveDot/></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
                        }}>{r.t}</div>
                        <div style={{
                          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                          color: '#888', marginTop: 3,
                        }}>👁 {r.v}</div>
                      </div>
                      <Tag color={PX.grassGreen} textColor="#fff">进房</Tag>
                    </div>
                  ))}
                  <div onClick={() => { onClose(); nav('P4'); }} className="pixel-btn" style={{
                    marginTop: 10, padding: '8px 0', textAlign: 'center',
                    background: PX.sunYellow, color: PX.night, cursor: 'pointer',
                    border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
                    fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                  }}>全部官频 →</div>
                </Card>
              )}
              {tab === 2 && (
                <Card>
                  {[
                    { ic: '📚', n: `${info.name}语 · 足球用语速成`, p: '免费', free: true },
                    { ic: '🎙', n: `${info.name} 解说名场面`,       p: '199 币' },
                    { ic: '🏆', n: `${info.name} 足球历史`,         p: '99 币' },
                  ].map((c, i, arr) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, padding: '7px 0', alignItems: 'center',
                      borderBottom: i < arr.length-1 ? `1px dashed #ddd` : 'none',
                    }}>
                      <div style={{ fontSize: 24 }}>{c.ic}</div>
                      <div style={{
                        flex: 1, fontFamily: "'PingFang SC', sans-serif",
                        fontSize: 11, fontWeight: 700,
                      }}>{c.n}</div>
                      <Tag color={c.free ? PX.grassGreen : PX.gold}
                        textColor={c.free ? '#fff' : PX.night}>{c.p}</Tag>
                    </div>
                  ))}
                </Card>
              )}
              {tab === 3 && (
                <Card bg={PX.sunYellow} style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ fontSize: 40 }}>🎁</div>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: 16,
                    color: PX.darkRed, marginTop: 8,
                  }}>+50 热力</div>
                  <div style={{
                    fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                    color: PX.night, marginTop: 6,
                  }}>{info.name}文化日参与奖励</div>
                  <div onClick={() => {
                    if (window.sfx) { window.sfx.suppressNextClick(); window.sfx.seq([{name:'coin',at:0},{name:'unlock',at:200}]); }
                    toast('奖励已领取 · +50 热力');
                    onClose();
                  }}
                    className="pixel-btn"
                    style={{
                      marginTop: 12, padding: '10px 24px', display: 'inline-block',
                      background: PX.red, color: '#fff',
                      border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
                      fontFamily: "'Press Start 2P', monospace", fontSize: 10, cursor: 'pointer',
                    }}>立即领取</div>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── 主页面 ──────────────────────────────────────────────────
function P16Page({ onBack, toast, nav }) {
  const [modalDate, setModalDate] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  return (
    <PageShell title="CALENDAR" subtitle="P16 · 连胜打卡日历" onBack={onBack} darkHeader>
      <P16Banner/>
      <P16CheckIn
        streak={STREAK_P16 + (checked ? 1 : 0)}
        checked={checked}
        onCheckIn={() => {
          setChecked(true);
          if (window.sfx) {
            window.sfx.suppressNextClick();
            window.sfx.seq([
              { name: 'coin',        at: 0 },
              { name: 'achievement', at: 260 },
            ]);
          }
          toast('签到成功 · +20 热力');
        }}
      />
      <P16Legend/>
      <SecHead title="JUNE 2026" sub="六月 · 小组赛期" action="其他月份" onAction={() => toast('翻到 7 月')}/>
      <P16Calendar onOpenDay={(d) => { if (window.sfx) window.sfx.play('modal_open'); setModalDate(d); }}/>
      <SecHead title="CULTURE DAYS" sub="48 国文化日排期" action="全部 32 天" onAction={() => toast('展开完整排期')}/>
      <P16CultureDayScroll onOpenDay={(d) => { if (window.sfx) window.sfx.play('modal_open'); setModalDate(d); }}/>
      <P16NotifyToggle/>

      {modalDate !== null && (
        <P16CollectionModal
          date={modalDate}
          onClose={() => setModalDate(null)}
          toast={toast}
          nav={nav}
        />
      )}
    </PageShell>
  );
}

Object.assign(window, { P16Page });
