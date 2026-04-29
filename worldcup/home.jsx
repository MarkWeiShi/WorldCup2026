// H0 Home page composition

function Toast({ msg, onClose }) {
  React.useEffect(() => {
    if (!msg) return;
    const id = setTimeout(onClose, 1800);
    return () => clearTimeout(id);
  }, [msg]);
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
      background: PX.night, color: PX.sunYellow, padding: '10px 16px',
      fontFamily: "'Press Start 2P', monospace", fontSize: 10,
      border: `3px solid ${PX.sunYellow}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
      zIndex: 200, maxWidth: 300, textAlign: 'center', lineHeight: 1.5,
    }}>
      {msg}
    </div>
  );
}

function TopBar({ onNav }) {
  const IconPill = ({ icon, red, onClick, id }) => (
    <div id={id} onClick={onClick} className="pixel-btn" style={{
      position: 'relative', width: 36, height: 36, background: PX.cream,
      border: `2.5px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    }}>
      <PxIcon kind={icon} size={18} />
      {red && (
        <span className="live-blink" style={{
          position: 'absolute', top: -3, right: -3, width: 10, height: 10,
          background: PX.red, border: `2px solid ${PX.night}`,
        }} />
      )}
    </div>
  );
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'linear-gradient(#87CEEB, #7EC4E8)',
      borderBottom: `3px solid ${PX.night}`,
      padding: '58px 12px 10px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div onClick={() => onNav('back')} className="pixel-btn" style={{
        width: 36, height: 36, background: PX.cream,
        border: `2.5px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <PxIcon kind="back" size={18} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <IconPill icon="calendar" red onClick={() => onNav('checkin')} />
        <IconPill id="anchor-record" icon="trophy" red onClick={() => onNav('record')} />
        <IconPill id="anchor-rules" icon="info" onClick={() => onNav('rules')} />
        <IconPill id="anchor-share" icon="share" onClick={() => onNav('share')} />
      </div>
    </div>
  );
}

function TodayBannerStrip({ nav }) {
  return (
    <div onClick={() => nav && nav('P16')} className="pixel-btn"
      style={{
        cursor: 'pointer',
        background: `linear-gradient(90deg, ${PX.red}, #E53935)`,
        color: '#fff', borderBottom: `3px solid ${PX.night}`,
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
      <div className="ball-wobble" style={{ flexShrink: 0 }}><PixelBall size={18}/></div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: PX.sunYellow, marginBottom: 2, letterSpacing: 1,
        }}>TODAY · BROADCAST</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 11, fontWeight: 700,
        }}>🏟 巴西 vs 德国 · 22:00 · 文化日 = 巴西</div>
      </div>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 9,
        color: PX.sunYellow,
      }}>进入专区 ›</div>
    </div>
  );
}

function CheckInModule({ nav, toast }) {
  const streak = 11;
  return (
    <div id="anchor-checkin" style={{ padding: '0 12px' }}>
      <SectionTitle jp="STREAK · JUNE" cn="连胜打卡 · 六月"
        action="完整日历" onAction={() => nav && nav('P16')}/>
      <div onClick={() => nav && nav('P16')} className="pixel-btn" style={{
        marginTop: 8, background: PX.night, color: '#fff',
        border: `3px solid ${PX.night}`, boxShadow: `4px 4px 0 ${PX.night}`,
        padding: 12, display: 'flex', gap: 12, alignItems: 'center',
        cursor: 'pointer',
      }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 26,
            color: PX.sunYellow, textShadow: `2px 2px 0 ${PX.red}`, lineHeight: 1,
          }}>{streak}</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 6,
            color: '#fff', marginTop: 5,
          }}>STREAK</div>
        </div>
        <div style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)', gap: 3,
        }}>
          {[...Array(14)].map((_, i) => {
            const d = i + 1;
            const signed = d <= 11;
            const today = d === 14;
            return (
              <div key={i} style={{
                aspectRatio: '1',
                background: today ? PX.red : (signed ? PX.grassGreen : '#3a3a5a'),
                border: `1.5px solid ${today ? PX.sunYellow : PX.night}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: signed || today ? '#fff' : '#888',
              }}>{signed ? '✓' : d}</div>
            );
          })}
        </div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 14,
          color: PX.sunYellow, flexShrink: 0,
        }}>›</div>
      </div>
    </div>
  );
}

function Hero({ nav }) {
  return (
    <div style={{
      position: 'relative', background: 'linear-gradient(#87CEEB 0%, #9FDBF5 60%, #C8E8B8 100%)',
      padding: '20px 12px 24px', overflow: 'hidden', minHeight: 340,
    }}>
      <AmbientSky />
      <PixelStadium />

      {/* rolling ball */}
      <div className="ball-roll" style={{ position: 'absolute', bottom: 6, left: -30, zIndex: 4 }}>
        <PixelBall size={16} />
      </div>

      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
        {/* trophy with halo */}
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
          <div className="halo-pulse" style={{
            position: 'absolute', inset: -14, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,215,0,0.3) 40%, transparent 70%)',
            zIndex: 0,
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <PixelTrophy size={92} />
          </div>
        </div>

        <h1 style={{
          margin: '14px 0 6px', fontFamily: "'Press Start 2P', monospace",
          fontSize: 18, color: PX.night, lineHeight: 1.35,
          textShadow: `3px 3px 0 ${PX.sunYellow}`, letterSpacing: 1,
        }}>
          2026 FIFA<br/>WORLD CUP
        </h1>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 13,
          color: PX.night, marginBottom: 14, fontWeight: 700,
          background: PX.cream, display: 'inline-block',
          padding: '4px 10px', border: `2px solid ${PX.night}`,
          boxShadow: `2px 2px 0 ${PX.night}`,
        }}>
          48 国跨文化对抗 · HelloTalk 世界杯
        </div>

        {/* Countdown panel */}
        <div style={{
          background: 'rgba(26,26,62,0.92)', padding: '10px 10px 12px',
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
          marginTop: 4,
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX.sunYellow, marginBottom: 8, letterSpacing: 1,
          }}>
            ⏱ 距决赛还有
          </div>
          <Countdown />
        </div>

        <div onClick={() => nav && nav('P9')} className="pixel-btn" style={{
          margin: '10px auto 0',
          maxWidth: 180,
          background: PX.sunYellow,
          border: `2px solid ${PX.night}`,
          boxShadow: `2px 2px 0 ${PX.night}`,
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}>
          <PxIcon kind="share" size={14} />
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            color: PX.night,
            lineHeight: 1.4,
            textAlign: 'left',
          }}>SHARE · 分享给国家好友</div>
        </div>
      </div>
    </div>
  );
}

function FocusMatch({ toast, nav }) {
  return (
    <div style={{ padding: '14px 12px 0' }}>
      <SectionTitle jp="TODAY'S FOCUS" cn="今日焦点赛" />
      <PixelBox bg={PX.cream} style={{ marginTop: 8 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: PX.night, marginBottom: 10,
        }}>
          <span>小组赛 · GROUP D</span>
          <LiveDot />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <TeamSlot code="ar" name="阿根廷" />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 22,
              color: PX.night, background: PX.sunYellow,
              padding: '6px 10px', border: `2.5px solid ${PX.night}`,
              boxShadow: `2px 2px 0 ${PX.night}`,
              whiteSpace: 'nowrap',
            }}>2 : 1</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: PX.darkRed, marginTop: 6,
            }}>78'</div>
          </div>
          <TeamSlot code="en" name="英格兰" />
        </div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
          textAlign: 'center', marginTop: 10, color: '#555',
          borderTop: `2px dashed ${PX.night}`, paddingTop: 8,
        }}>
          🏟 纽约大都会球场 · 今晚 22:00
        </div>
        <div id="anchor-focus" style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <PixelButton color={PX.grassGreen} style={{ flex: 1 }}
            onClick={() => nav && nav('P1')}>进入陪看房</PixelButton>
          <PixelButton color={PX.gold} textColor={PX.night} style={{ flex: 1 }}
            onClick={() => nav && nav('P6')}>立即竞猜</PixelButton>
        </div>
      </PixelBox>
    </div>
  );
}

function TeamSlot({ code, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 78 }}>
      <PixelFlag code={code} px={8} />
      <div style={{
        fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
        color: PX.night, fontWeight: 700,
      }}>{name}</div>
    </div>
  );
}

function SectionTitle({ jp, cn, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 18 }}>
      <div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 11,
          color: PX.night, letterSpacing: 1,
        }}>{jp}</div>
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontSize: 13,
          color: '#666', marginTop: 3, fontWeight: 600,
        }}>{cn}</div>
      </div>
      {action && (
        <div onClick={onAction} style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          color: PX.darkRed, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>{action} <PxIcon kind="chev" size={10}/></div>
      )}
    </div>
  );
}

function SpeakToScore({ toast, nav }) {
  return (
    <div style={{ padding: '0 12px' }}>
      <SectionTitle jp="HELLOTALK WORLD CUP" cn="HelloTalk 世界杯 · 语言应援赛季" />
      <div id="anchor-speak" onClick={() => nav && nav('P10')}
        className="pixel-btn"
        style={{
          marginTop: 8, position: 'relative',
          background: `linear-gradient(135deg, ${PX.grassGreen} 0%, #66BB6A 100%)`,
          border: `3px solid ${PX.night}`, padding: 12,
          boxShadow: `4px 4px 0 ${PX.night}`, overflow: 'hidden',
          cursor: 'pointer',
        }}>
        {/* deco bubbles */}
        <div style={{
          position: 'absolute', right: 8, top: 6,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: 'rgba(255,255,255,0.4)', transform: 'rotate(8deg)',
        }}>¡GOL! · ゴール</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <PixelFlag code="cn" px={7} />
            <span style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
              color: '#fff', fontWeight: 700,
            }}>🇨🇳 中国</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 24,
              color: PX.sunYellow, lineHeight: 1,
              textShadow: `2px 2px 0 ${PX.night}`,
            }}>1280</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: '#fff', marginTop: 4, background: PX.night,
              display: 'inline-block', padding: '2px 6px',
            }}>RANK #3</div>
          </div>
          <div style={{ position: 'relative' }}>
            <PixelRing value={6} max={10} size={44} />
            <span className="live-blink" style={{
              position: 'absolute', top: -2, right: -4, width: 10, height: 10,
              background: PX.red, border: `2px solid ${PX.night}`,
            }}/>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              color: '#fff', textAlign: 'center', marginTop: 2,
            }}>4 TASKS</div>
          </div>
        </div>
        <div style={{
          marginTop: 10, background: PX.night, color: PX.sunYellow,
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          padding: '6px 8px', textAlign: 'center',
          border: `2px solid ${PX.sunYellow}`,
        }}>
          ▶ 立即前往应援 →
        </div>
      </div>
    </div>
  );
}

function Ranking({ toast, nav }) {
  const rows = [
    { rank: '🥇', code: 'br', name: '巴西',   v: 52340, up: true  },
    { rank: '🥈', code: 'ar', name: '阿根廷', v: 48920, up: true  },
    { rank: '🥉', code: 'de', name: '德国',   v: 45100, up: false },
    { rank: '4',  code: 'fr', name: '法国',   v: 42800, up: true  },
    { rank: '5',  code: 'es', name: '西班牙', v: 40500, up: false },
  ];
  return (
    <div style={{ padding: '0 12px' }}>
      <SectionTitle jp="HONOR BOARD" cn="48 国荣誉榜"
        action="完整榜单" onAction={() => nav && nav('P2')} />
      <div id="anchor-rank">
      <PixelBox bg={PX.cream} style={{ marginTop: 8 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 2px', borderBottom: i < rows.length-1 ? `2px dashed #ddd` : 'none',
          }}>
            <div style={{
              width: 28, textAlign: 'center',
              fontFamily: "'Press Start 2P', monospace", fontSize: 14,
              color: i < 3 ? PX.gold : PX.night,
            }}>{r.rank}</div>
            <PixelFlag code={r.code} px={5} />
            <div style={{
              flex: 1, fontFamily: "'PingFang SC', sans-serif",
              fontSize: 13, color: PX.night, fontWeight: 700,
            }}>{r.name}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              color: PX.darkRed,
            }}>{r.v.toLocaleString()}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              color: r.up ? PX.grassGreen : PX.red, width: 14,
            }}>{r.up ? '↑' : '↓'}</div>
          </div>
        ))}
        <div style={{
          marginTop: 6, background: PX.night, padding: '8px 10px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <PixelFlag code="cn" px={5} />
          <div style={{
            flex: 1, fontFamily: "'PingFang SC', sans-serif",
            fontSize: 12, color: '#fff', fontWeight: 700,
          }}>你的国家：中国</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            color: PX.sunYellow,
          }}>#7</div>
        </div>
      </PixelBox>
      </div>
    </div>
  );
}

function Shooting({ toast, nav }) {
  return (
    <div style={{ padding: '0 12px' }}>
      <SectionTitle jp="SHOOT CHALLENGE" cn="射门挑战" />
      <div id="anchor-shoot">
      <PixelBox bg={PX.lightCream} style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 110, height: 64 }}>
            <PixelGoal width={110} height={64}/>
            <div className="ball-wobble" style={{
              position: 'absolute', bottom: 4, left: 42,
            }}>
              <PixelBall size={18} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              color: PX.night, marginBottom: 6,
            }}>再进 3 球 → 金靴徽章</div>
            <div style={{
              height: 12, background: '#fff', border: `2px solid ${PX.night}`,
              display: 'flex', padding: 1,
            }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{
                  flex: 1, background: i < 7 ? PX.grassGreen : 'transparent',
                  marginRight: i < 9 ? 1 : 0,
                }} />
              ))}
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
              color: '#666', marginTop: 6,
            }}>今日已射门 <span style={{ color: PX.darkRed }}>12</span> 次</div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <PixelButton color={PX.red} onClick={() => nav && nav('P3')} style={{ width: '100%' }}>
            立即射门 →
          </PixelButton>
        </div>
      </PixelBox>
      </div>
    </div>
  );
}

function LiveRooms({ toast, nav }) {
  const rooms = [
    { title: '阿根廷 vs 英格兰 全程陪看', host: 'Diego', flag: 'ar', viewers: '12.3k', pk: false },
    { title: '🌏 多语言神解说', host: 'Aki', flag: 'fr', viewers: '8.7k', pk: true },
    { title: '德意志战车冲鸭!', host: 'Hans', flag: 'de', viewers: '6.1k', pk: false },
    { title: '巴西桑巴狂欢夜',   host: 'Luiza', flag: 'br', viewers: '9.4k', pk: true },
    { title: 'ESP vs ITA 预演',  host: 'Carlos', flag: 'es', viewers: '4.2k', pk: false },
    { title: '深夜加时解说',     host: 'Sam', flag: 'en', viewers: '3.8k', pk: false },
  ];
  const covers = ['#FF4444', '#4CAF50', '#FFC107', '#3F51B5', '#87CEEB', '#C62828'];
  return (
    <div id="anchor-channel" style={{ padding: '0 0 0' }}>
      <div style={{ padding: '0 12px' }}>
        <SectionTitle jp="ON AIR" cn="正在直播"
          action="全部" onAction={() => nav && nav('P4')} />
      </div>
      <div className="h-scroll" style={{
        display: 'flex', gap: 10, padding: '10px 12px 4px',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
      }}>
        {rooms.map((r, i) => (
          <div key={i} onClick={() => nav && nav('P13')}
            style={{
              flex: '0 0 140px', scrollSnapAlign: 'start',
              border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.night}`,
              background: PX.cream, cursor: 'pointer',
            }}>
            {/* cover */}
            <div style={{
              height: 88, background: covers[i],
              position: 'relative', overflow: 'hidden',
              borderBottom: `2px solid ${PX.night}`,
            }}>
              {/* scanlines */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 4px)',
              }}/>
              {/* host avatar */}
              <div style={{
                position: 'absolute', bottom: 4, left: 4,
                width: 28, height: 28, background: PX.cream,
                border: `2px solid ${PX.night}`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              }}>{r.host[0]}</div>
              <div style={{ position: 'absolute', top: 4, left: 4 }}>
                <PixelFlag code={r.flag} px={4} />
              </div>
              <div style={{ position: 'absolute', top: 4, right: 4 }}><LiveDot /></div>
              {r.pk && (
                <div style={{
                  position: 'absolute', bottom: 6, right: 4,
                  background: PX.sunYellow, color: PX.night,
                  fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                  padding: '2px 4px', border: `2px solid ${PX.night}`,
                }}>⚔ PK</div>
              )}
            </div>
            <div style={{ padding: 6 }}>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX.night, fontWeight: 700, lineHeight: 1.3,
                overflow: 'hidden', textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{r.title}</div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#888', marginTop: 4,
              }}>👁 {r.viewers}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EntryBars({ toast, nav }) {
  return (
    <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* chest/pouch bar */}
      <div id="anchor-room" onClick={() => nav && nav('P13')}
        className="pixel-btn"
        style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          background: `linear-gradient(90deg, ${PX.night} 0%, #2A2A5E 100%)`,
          border: `3px solid ${PX.night}`, boxShadow: `3px 3px 0 ${PX.shadow}`,
          cursor: 'pointer',
        }}>
        <div className="chest-shake"><PixelChest size={40} /></div>
        <div className="pouch-glow"><PixelPouch size={40} /></div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 9,
            color: PX.sunYellow, marginBottom: 3,
          }}>OPEN THE BOX</div>
          <div style={{
            fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
            color: '#fff', fontWeight: 600,
          }}>进房参与，开箱抽限定礼物</div>
        </div>
        <div style={{ color: PX.sunYellow, fontFamily: "'Press Start 2P', monospace", fontSize: 14 }}>›</div>
      </div>

      {/* betting bar */}
      <div id="anchor-predict" onClick={() => nav && nav('P6')}
        className="pixel-btn"
        style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          background: PX.sunYellow, border: `3px solid ${PX.night}`,
          boxShadow: `3px 3px 0 ${PX.night}`, cursor: 'pointer',
        }}>
        <div className="dice-roll"><PixelDice size={36} /></div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 9,
            color: PX.darkRed, marginBottom: 3,
          }}>TODAY · 5 MATCHES</div>
          <div style={{
            fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
            color: PX.night, fontWeight: 700,
          }}>累计奖池 <span style={{ color: PX.darkRed }}>88,888</span> HT币</div>
        </div>
        <div style={{ color: PX.night, fontFamily: "'Press Start 2P', monospace", fontSize: 14 }}>›</div>
      </div>
    </div>
  );
}

function Shorts({ toast, nav }) {
  const [tab, setTab] = React.useState(0);
  const tabs = ['全部', '球迷现场', '跨国 PK', '解说', '房间名场面'];
  const videos = [
    { t: '阿根廷球迷唱跳应援 · 纽约街头', d: '00:48', likes: '12.3k', src: '@maria · AR' },
    { t: '德国小哥学中文口号: 冲鸭!',     d: '01:12', likes: '8.4k',  src: '@hans · DE' },
    { t: '巴西桑巴庆祝神进球 · 球馆外',   d: '00:36', likes: '15.1k', src: '@lu · BR' },
    { t: '房间名场面: 西语 vs 英语互怼',  d: '02:05', likes: '6.9k',  src: '@carlos · ES' },
  ];
  const covers = ['#4CAF50', '#FFC107', '#87CEEB', '#FF4444'];
  return (
    <div id="anchor-shorts" style={{ padding: '0 12px' }}>
      <SectionTitle jp="HIGHLIGHTS" cn="精彩集锦"
        action="更多" onAction={() => nav && nav('P5')} />
      <div style={{
        display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto',
      }} className="h-scroll">
        {tabs.map((t, i) => (
          <div key={i} onClick={() => setTab(i)} style={{
            padding: '6px 10px', cursor: 'pointer', flex: '0 0 auto',
            fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
            fontWeight: 700,
            background: tab === i ? PX.night : PX.cream,
            color: tab === i ? PX.sunYellow : PX.night,
            border: `2px solid ${PX.night}`,
            boxShadow: tab === i ? 'none' : `2px 2px 0 ${PX.night}`,
          }}>{t}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
        {videos.map((v, i) => (
          <div key={i} onClick={() => nav && nav('P5.1')}
            className="pixel-btn"
            style={{
              display: 'flex', gap: 10, padding: 6, cursor: 'pointer',
              background: PX.cream, border: `3px solid ${PX.night}`,
              boxShadow: `3px 3px 0 ${PX.night}`,
            }}>
            <div style={{
              width: 92, height: 64, background: covers[i],
              position: 'relative', border: `2px solid ${PX.night}`,
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 4px)',
              }}/>
              {/* play triangle */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 0, height: 0,
                borderLeft: `14px solid ${PX.cream}`,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                filter: `drop-shadow(1px 1px 0 ${PX.night})`,
              }}/>
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                background: PX.night, color: PX.sunYellow,
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                padding: '1px 4px',
              }}>{v.d}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 12,
                color: PX.night, fontWeight: 700, lineHeight: 1.3,
              }}>{v.t}</div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#888',
              }}>
                <span>{v.src}</span>
                <span style={{ color: PX.darkRed }}>♥ {v.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomEntries({ toast, nav }) {
  const Entry = ({ emoji, label, sub, color, onClick, id }) => (
    <div id={id} onClick={onClick} className="pixel-btn" style={{
      flex: 1, background: color, border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`, padding: '10px 8px',
      cursor: 'pointer', textAlign: 'center',
    }}>
      <div style={{ fontSize: 22 }}>{emoji}</div>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 8,
        color: PX.night, marginTop: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: "'PingFang SC', sans-serif", fontSize: 9,
        color: '#444', marginTop: 2,
      }}>{sub}</div>
    </div>
  );
  return (
    <div style={{ padding: '0 12px', display: 'flex', gap: 10 }}>
      <Entry id="anchor-circle" emoji="🌍" label="CIRCLE" sub="世界杯圈子" color={PX.skyBlue}
        onClick={() => nav && nav('P14')} />
      <Entry id="anchor-meetup" emoji="🎉" label="MEETUP" sub="线下观赛" color={PX.gold}
        onClick={() => toast('线下观赛 Meetup')} />
    </div>
  );
}

function TreasureEntry({ nav }) {
  return (
    <div id="anchor-treasure" style={{ padding: '0 12px' }}>
      <SectionTitle jp="TREASURE BOX" cn={<span style={{ color: PX.night }}>宝箱 / 福袋</span>} />
      <Card
        bg={PX.night}
        onClick={() => {
          if (window.sfx) {
            window.sfx.suppressNextClick();
            window.sfx.play('unlock');
          }
          nav && nav('P19');
        }}
        style={{
          marginTop: 8,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div className="chest-shake" style={{ flexShrink: 0 }}>
          <PixelChest size={42} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 9,
            color: PX.sunYellow,
            lineHeight: 1.5,
          }}>CHEST · 送礼结算返还</div>
          <div style={{
            marginTop: 4,
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: '#fff',
          }}>福袋 1 万币累送解锁</div>
        </div>
        <div className="pouch-glow" style={{ flexShrink: 0 }}>
          <PixelPouch size={36} />
        </div>
      </Card>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      marginTop: 18, padding: '14px 12px 24px',
      background: PX.night, textAlign: 'center',
      borderTop: `3px solid ${PX.sunYellow}`,
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 8,
        color: PX.sunYellow, marginBottom: 6,
      }}>HELLOTALK × WORLD CUP 2026</div>
      <div style={{
        fontFamily: "'PingFang SC', sans-serif", fontSize: 10,
        color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
      }}>
        合作方 · 用户协议 · 活动规则<br/>
        © 2026 HelloTalk. 像素应援·跨国同频
      </div>
    </div>
  );
}

// Debug nav (bottom overlay)
function DebugNav({ onNav, current = 'H0' }) {
  const pages = [
    'H0',
    'P1', 'P2', 'P2.1', 'P3',
    'P4', 'P5', 'P5.1',
    'P6', 'P7', 'P8', 'P9',
    'P10', 'P10.1', 'P10.2', 'P10.3',
    'P11',
    'P12', 'P13', 'P13.1', 'P14', 'P15',
    'P16', 'P17', 'P18', 'P19',
  ];
  // 默认收起：NavPanel 已承载导航，DebugNav 仅留作紧急跳转
  const [open, setOpen] = React.useState(false);
  return (
    <div className="debug-nav-wrap" style={{
      position: 'fixed', bottom: 14, left: '50%', transform: 'translateX(-50%)',
      zIndex: 300, maxWidth: 420, pointerEvents: 'auto',
    }}>
      {open && (
        <div style={{
          background: PX.night, padding: 8,
          border: `3px solid ${PX.sunYellow}`,
          boxShadow: `3px 3px 0 ${PX.shadow}`,
          display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6,
          maxWidth: 360,
        }}>
          <div style={{
            width: '100%', fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX.sunYellow, marginBottom: 4,
          }}>🐛 DEBUG NAV</div>
          {pages.map(p => (
            <div key={p} onClick={() => onNav(p)} style={{
              padding: '4px 7px', cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              background: p === current ? PX.sunYellow : '#333',
              color: p === current ? PX.night : '#fff',
              border: `1.5px solid ${PX.sunYellow}`,
            }}>{p}</div>
          ))}
        </div>
      )}
      <div onClick={() => setOpen(!open)} style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 9,
        background: PX.sunYellow, color: PX.night,
        padding: '6px 10px', border: `2px solid ${PX.night}`,
        boxShadow: `2px 2px 0 ${PX.night}`, cursor: 'pointer',
        textAlign: 'center', width: 'fit-content', margin: '0 auto',
      }}>{open ? '▼ HIDE' : '▲ DEBUG'}</div>
    </div>
  );
}

function HomePage({ onNav }) {
  const [toastMsg, setToastMsg] = React.useState('');
  const toast = (m) => setToastMsg(m);
  const handleNav = (k) => {
    if (onNav && /^(H0|P(1|2|2\.1|3|4|5|5\.1|6|7|8|9|10|10\.1|10\.2|10\.3|11|12|13|13\.1|14|15|16|17|18|19))$/.test(k)) {
      onNav(k); return;
    }
    // TopBar 右侧 4 图标
    if (k === 'checkin' && onNav) { onNav('P16'); return; }
    if (k === 'record'  && onNav) { onNav('P7');  return; }
    if (k === 'rules'   && onNav) { onNav('P8');  return; }
    if (k === 'share'   && onNav) { onNav('P9');  return; }
    toast(`跳转 ${k}`);
  };

  return (
    <div data-screen-label="01 Home" style={{ position: 'relative', minHeight: '100%' }}>
      {window.HomeStadium ? React.createElement(window.HomeStadium, { onNav }) : null}
      <TopBar onNav={handleNav} />
      <TodayBannerStrip nav={onNav}/>
      <Hero nav={onNav} />
      <FocusMatch toast={toast} nav={onNav}/>
      <div style={{ height: 14 }} />
      <Shooting toast={toast} nav={onNav}/>
      <div style={{ height: 14 }} />
      {/* 比分竞猜入口（原 EntryBars 中的 betting bar，单独抽出） */}
      <div style={{ padding: '0 12px' }}>
        <div id="anchor-predict" onClick={() => onNav && onNav('P6')}
          className="pixel-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
            background: PX.sunYellow, border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`, cursor: 'pointer',
          }}>
          <div className="dice-roll"><PixelDice size={36} /></div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9,
              color: PX.darkRed, marginBottom: 3,
            }}>TODAY · 5 MATCHES</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
              color: PX.night, fontWeight: 700,
            }}>比分竞猜 · 累计奖池 <span style={{ color: PX.darkRed }}>88,888</span> HT币</div>
          </div>
          <div style={{ color: PX.night, fontFamily: "'Press Start 2P', monospace", fontSize: 14 }}>›</div>
        </div>
      </div>
      <div style={{ height: 14 }} />
      <SpeakToScore toast={toast} nav={onNav}/>
      <Ranking toast={toast} nav={onNav}/>
      <div style={{ height: 14 }} />
      <LiveRooms toast={toast} nav={onNav}/>
      <div style={{ height: 14 }} />
      <Shorts toast={toast} nav={onNav}/>
      <div style={{ height: 14 }} />
      <BottomEntries toast={toast} nav={onNav}/>
      <Footer />
      <div style={{ height: 60 }} />
      <Toast msg={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}

Object.assign(window, { HomePage, DebugNav, Toast });
