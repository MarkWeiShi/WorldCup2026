// H0 · 像素风世界杯主活动页（还原"FIFA WORLD CUP NORTH AMERICA"体育场视觉）
// 看台区 → P2（48国对抗总榜）
// 球场区 → P1（每日焦点赛）
// 颜色全部走 components.jsx 中定义的 PX

(function () {
  // ── 像素小工具 ────────────────────────────────────────
  const navy   = '#1B2A55';   // 看台底色
  const navy2  = '#243668';   // 看台亮色
  const navy3  = '#0F1A3A';   // 看台暗色
  const grass1 = '#3FA34D';
  const grass2 = '#2E8B40';
  const grass3 = '#56C25C';
  const lineW  = '#FFFFFF';
  const goldT  = '#FFD54A';
  const sky    = '#6FA8D6';

  // 一格观众 · 4 像素杂色 mosaic（CSS 多重 radial 渐变实现密集人头）
  const crowdBg = `
    radial-gradient(circle at 25% 25%, #E94B4B 1px, transparent 1.4px),
    radial-gradient(circle at 75% 25%, #3D7DD9 1px, transparent 1.4px),
    radial-gradient(circle at 25% 75%, #F0C24A 1px, transparent 1.4px),
    radial-gradient(circle at 75% 75%, #4CAF50 1px, transparent 1.4px),
    ${navy}
  `;
  const crowdSize = '6px 6px, 6px 6px, 6px 6px, 6px 6px, auto';

  // 国旗小色条（仅 2 段色 + 简化标识）
  const FLAGS = {
    BR: ['#009E3A', '#FFD400'],
    AR: ['#75AADB', '#FFFFFF'],
    DE: ['#000000', '#DD0000', '#FFCC00'],
    FR: ['#0055A4', '#FFFFFF', '#EF4135'],
    IT: ['#009246', '#FFFFFF', '#CE2B37'],
    ES: ['#AA151B', '#F1BF00'],
    PT: ['#006600', '#FF0000'],
    JP: ['#FFFFFF', '#BC002D'],
    KR: ['#FFFFFF', '#003478'],
    CN: ['#DE2910', '#FFDE00'],
    US: ['#B22234', '#FFFFFF', '#3C3B6E'],
    CA: ['#D52B1E', '#FFFFFF'],
    MX: ['#006847', '#FFFFFF', '#CE1126'],
    NL: ['#AE1C28', '#FFFFFF', '#21468B'],
    BE: ['#000000', '#FAE042', '#ED2939'],
    HR: ['#FF0000', '#FFFFFF', '#171796'],
    CH: ['#FF0000', '#FFFFFF'],
    SE: ['#005B99', '#FECB00'],
    DK: ['#C8102E', '#FFFFFF'],
    PL: ['#FFFFFF', '#DC143C'],
    UA: ['#0057B7', '#FFD700'],
    EG: ['#CE1126', '#FFFFFF', '#000000'],
    NG: ['#008751', '#FFFFFF'],
    KSA: ['#006C35', '#FFFFFF'],
    IR: ['#239F40', '#FFFFFF', '#DA0000'],
    AU: ['#012169', '#FFFFFF', '#E4002B'],
    NZ: ['#012169', '#FFFFFF'],
    GH: ['#CE1126', '#FCD116', '#006B3F'],
    SN: ['#00853F', '#FDEF42', '#E31B23'],
    MA: ['#C1272D', '#006233'],
    TN: ['#E70013', '#FFFFFF'],
    AT: ['#ED2939', '#FFFFFF'],
    GB: ['#012169', '#FFFFFF', '#C8102E'],
    SCT:['#0065BD', '#FFFFFF'],
    HU: ['#CE2939', '#FFFFFF', '#477050'],
    BG: ['#FFFFFF', '#00966E', '#D62612'],
    RO: ['#002B7F', '#FCD116', '#CE1126'],
    RS: ['#C6363C', '#0C4076', '#FFFFFF'],
    QA: ['#FFFFFF', '#8A1538'],
    CR: ['#002B7F', '#FFFFFF', '#CE1126'],
  };

  function FlagChip({ code, w = 22, h = 14 }) {
    const stripes = FLAGS[code] || ['#888', '#fff'];
    const horizontal = ['DE', 'NL', 'HU', 'BG', 'RU'].includes(code);
    return (
      <div style={{
        width: w, height: h, border: `1.5px solid ${navy3}`,
        display: 'flex', flexDirection: horizontal ? 'column' : 'row',
        boxShadow: `1px 1px 0 ${navy3}`, flexShrink: 0,
      }}>
        {stripes.map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>
    );
  }

  // 看台扇区（一行国旗 + 排名数字）
  function TribuneStrip({ items, height = 22 }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        background: crowdBg, backgroundSize: crowdSize,
        height, padding: '0 6px',
        borderTop: `2px solid ${navy3}`, borderBottom: `2px solid ${navy3}`,
        boxShadow: `inset 0 2px 0 ${navy2}, inset 0 -2px 0 ${navy3}`,
      }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <FlagChip code={it.code} w={16} h={11}/>
            {it.rank != null && (
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7, color: '#fff', textShadow: `1px 1px 0 ${navy3}`,
              }}>{it.rank}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 探照灯（floodlight tower）
  function Floodlight({ side = 'left' }) {
    const flip = side === 'right';
    return (
      <div style={{
        position: 'absolute', top: 8,
        [side]: 4,
        width: 28, height: 92, zIndex: 6,
        transform: flip ? 'scaleX(-1)' : 'none',
      }}>
        {/* 灯架 */}
        <div style={{
          position: 'absolute', left: 12, top: 28, width: 4, height: 64,
          background: '#9AA4B5', boxShadow: `1px 0 0 ${navy3}`,
        }} />
        {/* 灯板 */}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 28, height: 18,
          background: '#D8DDE6', border: `2px solid ${navy3}`,
          boxShadow: `2px 2px 0 ${navy3}`,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, padding: 1,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="live-blink" style={{
              background: '#FFF8B5', border: `1px solid ${goldT}`,
              animationDelay: `${(i % 4) * 120}ms`,
            }} />
          ))}
        </div>
        {/* 光晕 */}
        <div className="halo-pulse" style={{
          position: 'absolute', left: -8, top: 4,
          width: 44, height: 30,
          background: 'radial-gradient(ellipse at center, rgba(255,248,181,0.55), transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>
    );
  }

  // 球场草坪（带白线 / 中圈 / 半场弧 / 球门 + 11 像素球员）
  function PitchField({ onClick }) {
    const players = [
      // 主队（红）4-3-3
      { x: 50, y: 90, c: '#FFD500', goalkeeper: true },
      { x: 22, y: 78, c: '#E53935' }, { x: 38, y: 74, c: '#E53935' },
      { x: 62, y: 74, c: '#E53935' }, { x: 78, y: 78, c: '#E53935' },
      { x: 30, y: 60, c: '#E53935' }, { x: 50, y: 56, c: '#E53935' },
      { x: 70, y: 60, c: '#E53935' },
      { x: 25, y: 42, c: '#E53935' }, { x: 50, y: 38, c: '#E53935' },
      { x: 75, y: 42, c: '#E53935' },
      // 客队（蓝）4-4-2
      { x: 50, y: 10, c: '#FFD500', goalkeeper: true },
      { x: 22, y: 22, c: '#1E88E5' }, { x: 40, y: 26, c: '#1E88E5' },
      { x: 60, y: 26, c: '#1E88E5' }, { x: 78, y: 22, c: '#1E88E5' },
      { x: 50, y: 32, c: '#1E88E5' }, { x: 35, y: 34, c: '#1E88E5' },
      { x: 65, y: 34, c: '#1E88E5' },
    ];
    return (
      <div onClick={onClick} className="pixel-btn" style={{
        position: 'relative', width: '100%', height: '100%',
        cursor: 'pointer',
        background: `repeating-linear-gradient(0deg, ${grass1} 0 8px, ${grass2} 8px 16px)`,
        border: `3px solid ${navy3}`,
        boxShadow: `inset 0 0 0 2px ${grass3}, 3px 3px 0 ${navy3}`,
        overflow: 'hidden',
      }}>
        {/* 外边线 */}
        <div style={{ position: 'absolute', inset: 6, border: `2px solid ${lineW}` }} />
        {/* 中线 */}
        <div style={{
          position: 'absolute', left: 6, right: 6, top: '50%',
          height: 2, background: lineW, transform: 'translateY(-1px)',
        }} />
        {/* 中圈 */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 46, height: 46, marginLeft: -23, marginTop: -23,
          border: `2px solid ${lineW}`, borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 4, height: 4, marginLeft: -2, marginTop: -2,
          background: lineW,
        }} />
        {/* 上半场禁区 */}
        <div style={{
          position: 'absolute', left: '50%', top: 6,
          width: 90, height: 30, marginLeft: -45,
          borderLeft: `2px solid ${lineW}`, borderRight: `2px solid ${lineW}`,
          borderBottom: `2px solid ${lineW}`,
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 6,
          width: 50, height: 14, marginLeft: -25,
          borderLeft: `2px solid ${lineW}`, borderRight: `2px solid ${lineW}`,
          borderBottom: `2px solid ${lineW}`,
        }} />
        {/* 下半场禁区 */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 6,
          width: 90, height: 30, marginLeft: -45,
          borderLeft: `2px solid ${lineW}`, borderRight: `2px solid ${lineW}`,
          borderTop: `2px solid ${lineW}`,
        }} />
        <div style={{
          position: 'absolute', left: '50%', bottom: 6,
          width: 50, height: 14, marginLeft: -25,
          borderLeft: `2px solid ${lineW}`, borderRight: `2px solid ${lineW}`,
          borderTop: `2px solid ${lineW}`,
        }} />
        {/* 上球门 */}
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          width: 30, height: 6, marginLeft: -15,
          background: '#fff', border: `2px solid ${navy3}`,
        }} />
        {/* 下球门 */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 0,
          width: 30, height: 6, marginLeft: -15,
          background: '#fff', border: `2px solid ${navy3}`,
        }} />

        {/* 球员（像素小人） */}
        {players.map((p, i) => (
          <div key={i} className="player-idle" style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: 8, height: 8, marginLeft: -4, marginTop: -4,
            background: p.c, border: `1.5px solid ${navy3}`,
            boxShadow: p.goalkeeper ? `0 0 0 1px #fff` : 'none',
          }} />
        ))}

        {/* 球 */}
        <div className="ball-wobble" style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 6, height: 6, marginLeft: -3, marginTop: -3,
          background: '#fff', border: `1.5px solid ${navy3}`,
          borderRadius: '50%',
        }} />

        {/* CTA 提示 */}
        <div className="soft-pulse" style={{
          position: 'absolute', left: '50%', bottom: 38, transform: 'translateX(-50%)',
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: navy3, background: goldT,
          padding: '3px 6px', border: `2px solid ${navy3}`,
          boxShadow: `2px 2px 0 ${navy3}`, whiteSpace: 'nowrap',
        }}>TAP · 进入球场</div>
      </div>
    );
  }

  // ── 主页 ─────────────────────────────────────────────
  function HomeStadium({ onNav }) {
    const nav = (k) => onNav && onNav(k);
    const onEntry   = () => nav('P10'); // 1F 入场 · 赛季中枢
    const onTribune = () => nav('P2');  // 2F 看台 · 48 国对抗总榜
    const onPitch   = () => nav('P1');  // 3F 球场 · 焦点赛
    const onMedia   = () => nav('P5');  // 4F 媒体 · 短视频/解说
    const onShop    = () => nav('P19'); // 5F 商店 · 宝箱福袋

    const TABS = [
      { key: '1F', label: '入场', icon: '🎴', color: '#1F3864', onClick: onEntry },
      { key: '2F', label: '看台', icon: '👥', color: '#C62828', onClick: onTribune },
      { key: '3F', label: '球场', icon: '⚽', color: '#2E8B40', onClick: onPitch, active: true },
      { key: '4F', label: '媒体', icon: '📺', color: '#ED7D31', onClick: onMedia },
      { key: '5F', label: '商店', icon: '🎁', color: '#BF8F00', onClick: onShop },
    ];

    // 看台数据：从外环到内环（围一圈）
    // 外环 · 远端
    const tier4 = [
      { code: 'GB', rank: 1 }, { code: 'CA', rank: 2 }, { code: 'MX', rank: 3 },
      { code: 'AR', rank: 4 }, { code: 'US', rank: 1 },
    ];
    const tier3 = [
      { code: 'FR' }, { code: 'BE' }, { code: 'NL' }, { code: 'HR' },
      { code: 'GB' }, { code: 'PT' }, { code: 'MX' },
    ];
    const tier2 = [
      { code: 'AR' }, { code: 'FR' }, { code: 'NZ' },
      { code: 'CH' }, { code: 'AT' }, { code: 'NG' },
    ];
    // 内环 · 近端
    const tierN1 = [
      { code: 'SCT' }, { code: 'HR' }, { code: 'HU' }, { code: 'GB' }, { code: 'IR' },
    ];
    const tierN2 = [
      { code: 'DE', rank: 41 }, { code: 'AR', rank: 42 },
      { code: 'MX', rank: 43 }, { code: 'PT', rank: 48 },
    ];
    const tierN3 = [
      { code: 'CH' }, { code: 'RO' }, { code: 'MX' }, { code: 'IT' },
    ];

    // 侧边纵列国旗（左右各 5 个 vertical column）
    const sideLeft  = [
      { code: 'SE', rank: 31 }, { code: 'CA', rank: 39 }, { code: 'ES', rank: 27 },
      { code: 'BR', rank: 18 }, { code: 'CA', rank: 18 },
    ];
    const sideRight = [
      { code: 'ES', rank: 44 }, { code: 'RO', rank: 35 }, { code: 'MX', rank: 36 },
      { code: 'HR', rank: 36 }, { code: 'KR', rank: 38 },
    ];

    const SideColumn = ({ data, side }) => (
      <div style={{
        position: 'absolute', top: 110, [side]: 4, width: 36,
        display: 'flex', flexDirection: 'column', gap: 6, zIndex: 7,
      }}>
        {data.map((d, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            background: navy2, border: `2px solid ${navy3}`,
            boxShadow: `1px 1px 0 ${navy3}`, padding: '3px 1px',
          }}>
            <FlagChip code={d.code} w={20} h={13}/>
            <span style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
              color: '#fff',
            }}>{d.rank}</span>
          </div>
        ))}
      </div>
    );

    return (
      <div data-screen-label="01 Home · Stadium" style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${sky} 0%, #4F84B6 100%)`,
        paddingBottom: 16,
      }}>
        {/* ── 球场容器 ───────────────────────────────── */}
        <div style={{
          position: 'relative',
          margin: '12px 8px 0',
          background: navy,
          border: `3px solid ${navy3}`,
          boxShadow: `4px 4px 0 ${navy3}`,
          padding: '8px 8px 12px',
        }}>
          {/* 探照灯 */}
          <Floodlight side="left"/>
          <Floodlight side="right"/>

          {/* 远端看台（5 层）—— 整体可点 */}
          <div onClick={onTribune} className="pixel-btn" style={{
            cursor: 'pointer', position: 'relative',
            margin: '0 38px',
          }}>
            <TribuneStrip items={tier4} height={22}/>
            <TribuneStrip items={tier3} height={20}/>
            <TribuneStrip items={tier2} height={20}/>
            {/* 提示 */}
            <div className="soft-pulse" style={{
              position: 'absolute', top: 4, right: 4,
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              padding: '2px 4px', background: goldT, color: navy3,
              border: `1.5px solid ${navy3}`, boxShadow: `1px 1px 0 ${navy3}`,
            }}>TAP 看台</div>
          </div>

          {/* 中央：球场 + 两侧国旗纵列 */}
          <div style={{
            position: 'relative',
            margin: '4px 38px 4px',
            height: 320,
          }}>
            {/* 左侧看台纵列 */}
            <div onClick={onTribune} style={{
              position: 'absolute', top: 0, left: -34,
              width: 30, height: '100%', cursor: 'pointer',
              background: crowdBg, backgroundSize: crowdSize,
              border: `2px solid ${navy3}`, boxShadow: `2px 2px 0 ${navy3}`,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-around', alignItems: 'center',
              padding: '6px 0',
            }}>
              {sideLeft.map((d, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}>
                  <FlagChip code={d.code} w={20} h={13}/>
                  <span style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                    color: '#fff', textShadow: `1px 1px 0 ${navy3}`,
                  }}>{d.rank}</span>
                </div>
              ))}
            </div>

            {/* 球场 */}
            <PitchField onClick={onPitch}/>

            {/* 右侧看台纵列 */}
            <div onClick={onTribune} style={{
              position: 'absolute', top: 0, right: -34,
              width: 30, height: '100%', cursor: 'pointer',
              background: crowdBg, backgroundSize: crowdSize,
              border: `2px solid ${navy3}`, boxShadow: `2px 2px 0 ${navy3}`,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-around', alignItems: 'center',
              padding: '6px 0',
            }}>
              {sideRight.map((d, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}>
                  <FlagChip code={d.code} w={20} h={13}/>
                  <span style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                    color: '#fff', textShadow: `1px 1px 0 ${navy3}`,
                  }}>{d.rank}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4F 媒体席（球场与近端看台之间） ─────── */}
          <div onClick={onMedia} className="pixel-btn" style={{
            cursor: 'pointer', position: 'relative',
            margin: '4px 38px 6px',
            background: '#ED7D31',
            border: `2px solid ${navy3}`, boxShadow: `2px 2px 0 ${navy3}`,
            padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 6,
            overflow: 'hidden',
          }}>
            {/* 摄像机 + 媒体格 mosaic */}
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: '#fff', textShadow: `1px 1px 0 ${navy3}`,
              letterSpacing: 1, flexShrink: 0,
            }}>📺 PRESS</div>
            <div style={{
              flex: 1, height: 14, display: 'flex', gap: 2,
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1,
                  background: i % 3 === 0 ? '#FFF' : (i % 2 === 0 ? '#FFCC80' : '#7030A0'),
                  border: `1px solid ${navy3}`,
                }} />
              ))}
            </div>
            <div className="live-blink" style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              padding: '2px 4px', background: '#C00000', color: '#fff',
              border: `1.5px solid ${navy3}`, flexShrink: 0,
            }}>LIVE</div>
          </div>

          {/* 近端看台（3 层）—— 整体可点 */}
          <div onClick={onTribune} className="pixel-btn" style={{
            cursor: 'pointer', position: 'relative',
            margin: '0 38px',
          }}>
            <TribuneStrip items={tierN1} height={20}/>
            <TribuneStrip items={tierN2} height={22}/>
            <TribuneStrip items={tierN3} height={20}/>
            <div className="soft-pulse" style={{
              position: 'absolute', bottom: 4, right: 4,
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              padding: '2px 4px', background: goldT, color: navy3,
              border: `1.5px solid ${navy3}`, boxShadow: `1px 1px 0 ${navy3}`,
            }}>TAP 看台</div>
          </div>
        </div>

        {/* ── 入口操作行 ─────────────────────────────── */}
        <div style={{
          margin: '14px 12px 0',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <div onClick={onEntry} className="pixel-btn" style={{
            cursor: 'pointer',
            background: PX.cream, color: PX.night,
            border: `3px solid ${navy3}`, boxShadow: `3px 3px 0 ${navy3}`,
            padding: '10px 8px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, background: '#1F3864', border: `2px solid ${navy3}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: goldT, fontSize: 14 }}>🎴</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#1F3864', marginBottom: 2,
              }}>1F · ENTRY</div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>入场 · Fan ID</div>
            </div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: '#1F3864',
            }}>›</span>
          </div>

          <div onClick={onShop} className="pixel-btn" style={{
            cursor: 'pointer',
            background: PX.cream, color: PX.night,
            border: `3px solid ${navy3}`, boxShadow: `3px 3px 0 ${navy3}`,
            padding: '10px 8px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, background: '#BF8F00', border: `2px solid ${navy3}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 14 }}>🎁</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                color: '#BF8F00', marginBottom: 2,
              }}>5F · SHOP</div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>商店 · 宝箱福袋</div>
            </div>
            <span style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: '#BF8F00',
            }}>›</span>
          </div>
        </div>

        {/* 顶部小帮助提示 */}
        <div style={{
          margin: '12px 12px 0', padding: '8px 10px',
          background: 'rgba(255,255,255,0.85)',
          border: `2px dashed ${navy3}`,
          fontSize: 11, color: navy3, lineHeight: 1.5,
        }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX.darkRed, marginRight: 6,
          }}>TIP</span>
          点【看台/球场/媒体】下钻对应楼层 · 1F 入场 · 5F 商店
        </div>
      </div>
    );
  }

  window.HomeStadium = HomeStadium;

  // ── 悬浮 Tab Bar ──（始终在 PhoneFrame 顶部 sticky）
  // 楼层 → 页面映射
  const FLOOR_PAGES = {
    '1F': 'P10',
    '2F': 'P2',
    '3F': 'H0',  // 3F 球场对应主页（含焦点赛/球场视觉）
    '4F': 'P5',
    '5F': 'P19',
  };
  const FLOOR_DEF = [
    { key: '1F', label: '入场', icon: '🎴', color: '#1F3864' },
    { key: '2F', label: '看台', icon: '👥', color: '#C62828' },
    { key: '3F', label: '球场', icon: '⚽', color: '#2E8B40' },
    { key: '4F', label: '媒体', icon: '📺', color: '#ED7D31' },
    { key: '5F', label: '商店', icon: '🎁', color: '#BF8F00' },
  ];

  // ── 各楼层头图（hero）：滚动时随内容向上滚走，悬浮 Tab 保持顶部 ──
  function FloorHero({ kicker, title, subtitle, icon, bg, accent }) {
    return (
      <div style={{
        background: bg,
        borderBottom: `3px solid ${navy3}`,
        boxShadow: `0 3px 0 ${accent}`,
        padding: '12px 16px 14px',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* 像素方块装饰 */}
        <div style={{
          position: 'absolute', right: -8, top: -8, fontSize: 64, opacity: 0.18,
          transform: 'rotate(-12deg)',
        }}>{icon}</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          color: accent, letterSpacing: 1, marginBottom: 4,
        }}>{kicker}</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 14,
          color: '#fff', textShadow: `2px 2px 0 ${navy3}`, letterSpacing: 1,
        }}>{title}</div>
        <div style={{
          fontSize: 11, marginTop: 6, color: '#fff', opacity: 0.92,
        }}>{subtitle}</div>
      </div>
    );
  }
  const FLOOR_HEROES = {
    '1F': (
      <FloorHero
        kicker="1F · ENTRY"
        title="入场层 · Fan ID"
        subtitle="登记 Fan ID · 收集 48 国 Stamp · 高光时刻"
        icon="🎴"
        bg={`linear-gradient(180deg, #1F3864 0%, #0E1B33 100%)`}
        accent="#F0C24A"
      />
    ),
    '2F': (
      <FloorHero
        kicker="2F · TRIBUNE"
        title="看台层 · 48 国对抗"
        subtitle="主队排名 · GOOOL Wave · TIFO 共创"
        icon="👥"
        bg={`linear-gradient(180deg, #2E8B2E 0%, #1A5C1A 100%)`}
        accent="#FFE89A"
      />
    ),
    '3F': (
      <FloorHero
        kicker="3F · PITCH"
        title="2026 FIFA WORLD CUP"
        subtitle="· NORTH AMERICA · 焦点赛 / 射门 / 竞猜"
        icon="⚽"
        bg={`linear-gradient(180deg, #1A5C1A 0%, #0F3A0F 100%)`}
        accent="#FFD54A"
      />
    ),
    '4F': (
      <FloorHero
        kicker="4F · PRESS"
        title="媒体席 · 解说文化"
        subtitle="47 主播 LIVE · 文化日 · 短视频"
        icon="📺"
        bg={`linear-gradient(180deg, #ED7D31 0%, #B85C18 100%)`}
        accent="#7030A0"
      />
    ),
    '5F': (
      <FloorHero
        kicker="5F · SHOP"
        title="商店 · Fan Shop"
        subtitle="宝箱 / 福袋 / 装扮 / 票面"
        icon="🎁"
        bg={`linear-gradient(180deg, #BF8F00 0%, #7A5C00 100%)`}
        accent="#FFE89A"
      />
    ),
  };
  function FloatingTabBar({ currentPage, onNav }) {
    // 当前激活楼层：由 currentPage 反查
    const activeFloor =
      Object.keys(FLOOR_PAGES).find(k => FLOOR_PAGES[k] === currentPage) || '3F';
    const hero = FLOOR_HEROES[activeFloor];
    return (
      <React.Fragment>
        {/* 楼层头图（可滚动 · 始终在悬浮 Tab 上方） */}
        {hero ? (
          <div style={{ paddingTop: 52 }}>{hero}</div>
        ) : (
          <div style={{ height: 52 }} />
        )}
        {/* 悬浮 Tab —— 头图滚走后保持顶部粘性 */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 80,
          padding: '6px 8px 0',
          background: 'linear-gradient(180deg, rgba(15,26,58,0.96) 0%, rgba(15,26,58,0.85) 80%, rgba(15,26,58,0) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.96)',
            border: `3px solid ${navy3}`,
            boxShadow: `3px 3px 0 ${navy3}`,
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            padding: 4, gap: 4,
            marginBottom: 8,
          }}>
            {FLOOR_DEF.map(t => {
              const active = activeFloor === t.key;
              return (
                <div
                  key={t.key}
                  onClick={() => {
                    const target = FLOOR_PAGES[t.key];
                    if (onNav && target) onNav(target);
                  }}
                  className="pixel-btn"
                  style={{
                    cursor: 'pointer', textAlign: 'center', padding: '6px 2px',
                    background: active ? t.color : 'transparent',
                    color: active ? '#fff' : navy3,
                    border: `2px solid ${active ? navy3 : 'transparent'}`,
                    boxShadow: active ? `2px 2px 0 ${navy3}` : 'none',
                  }}
                >
                  <div style={{ fontSize: 16, lineHeight: 1 }}>{t.icon}</div>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                    marginTop: 4, color: active ? goldT : t.color, letterSpacing: 0.5,
                  }}>{t.key}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 800, marginTop: 2,
                    color: active ? '#fff' : navy3,
                  }}>{t.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
  window.FloatingTabBar = FloatingTabBar;
})();
