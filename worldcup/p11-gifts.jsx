// P11 gift catalog + gift panel UI + animations

const GIFT_CATS = [
  { key: 'cele', label: '🎉 庆祝' },
  { key: 'atk',  label: '💩 攻击' },
  { key: 'ref',  label: '🟨 裁判' },
  { key: 'hero', label: '🏆 爆款' },
  { key: 'fans', label: '👕 观众' },
];

const GIFTS = [
  { id: 'firework',  cat: 'cele', emoji: '🎆', name: '烟花',         coin: 19,   sub: '己方绽放' },
  { id: 'confetti',  cat: 'cele', emoji: '🎉', name: '彩带炮',       coin: 9,    sub: '彩带瀑布' },
  { id: 'champagne', cat: 'cele', emoji: '🍾', name: '香槟喷射',     coin: 29,   sub: '球员喷酒' },
  { id: 'drum',      cat: 'cele', emoji: '🥁', name: '战鼓助威',     coin: 59,   sub: '观众跳动' },

  { id: 'poop',      cat: 'atk',  emoji: '💩', name: '投掷大便',     coin: 5,    sub: '抛物线命中' },
  { id: 'tomato',    cat: 'atk',  emoji: '🍅', name: '番茄雨',       coin: 9,    sub: '一排砸下' },
  { id: 'egg',       cat: 'atk',  emoji: '🥚', name: '臭鸡蛋',       coin: 19,   sub: '爆绿烟' },
  { id: 'shoe',      cat: 'atk',  emoji: '👟', name: '飞鞋',         coin: 29,   sub: '高速飞出' },

  { id: 'yellow',    cat: 'ref',  emoji: '🟨', name: '黄牌',         coin: 39,   sub: '裁判警告' },
  { id: 'red',       cat: 'ref',  emoji: '🟥', name: '红牌',         coin: 99,   sub: '罚下一人' },
  { id: 'var',       cat: 'ref',  emoji: '📺', name: 'VAR 回放',     coin: 59,   sub: '全屏回放' },

  { id: 'goal',      cat: 'hero', emoji: '⚽', name: 'GOAL!!!',      coin: 199,  sub: '横幅贯屏' },
  { id: 'star',      cat: 'hero', emoji: '🌟', name: '球星附体',     coin: 888,  sub: '剪影降临' },
  { id: 'trophy',    cat: 'hero', emoji: '🏆', name: '大力神杯',     coin: 1888, sub: '金杯降落' },
  { id: 'champion',  cat: 'hero', emoji: '🎇', name: '冠军烟花秀',   coin: 3888, sub: '10 秒连放' },

  { id: 'shirt',     cat: 'fans', emoji: '👕', name: '脱衣庆祝',     coin: 49,   sub: '观众挥舞' },
  { id: 'vuvu',      cat: 'fans', emoji: '🎺', name: '呜呜祖拉',     coin: 39,   sub: '喇叭齐鸣' },
];

function GiftPanel({ onSend, combo, side, setSide }) {
  const [cat, setCat] = React.useState('hero');
  const [picker, setPicker] = React.useState(null);
  const items = GIFTS.filter(g => g.cat === cat);
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: PX.night, borderTop: `3px solid ${PX.sunYellow}`,
      paddingBottom: 38,
    }}>
      {/* Side toggle */}
      <div style={{
        display: 'flex', padding: '6px 10px 0', gap: 6, alignItems: 'center',
        borderBottom: `1px solid rgba(255,255,255,0.15)`,
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#fff',
        }}>送给</div>
        <div onClick={() => setSide('ar')} style={{
          padding: '4px 8px', cursor: 'pointer',
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          background: side === 'ar' ? KITS.ar.primary : '#333',
          color: side === 'ar' ? PX.night : '#fff',
          border: `1.5px solid ${PX.sunYellow}`,
        }}>🇦🇷 ARG</div>
        <div onClick={() => setSide('br')} style={{
          padding: '4px 8px', cursor: 'pointer',
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          background: side === 'br' ? KITS.br.primary : '#333',
          color: side === 'br' ? PX.night : '#fff',
          border: `1.5px solid ${PX.sunYellow}`,
        }}>🇧🇷 BRA</div>
        <div style={{ flex: 1 }} />
        {combo && (
          <div className="live-blink" style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: PX.sunYellow, background: PX.red,
            padding: '3px 5px', border: `1.5px solid #fff`,
          }}>×{combo} COMBO</div>
        )}
      </div>
      {/* category tabs */}
      <div style={{ display: 'flex', padding: '6px 10px 4px', gap: 4, overflowX: 'auto' }} className="h-scroll">
        {GIFT_CATS.map(c => (
          <div key={c.key} onClick={() => setCat(c.key)} style={{
            padding: '5px 8px', flex: '0 0 auto', cursor: 'pointer',
            fontFamily: "'PingFang SC', sans-serif", fontSize: 10, fontWeight: 700,
            background: cat === c.key ? PX.sunYellow : 'transparent',
            color: cat === c.key ? PX.night : '#fff',
            border: `1.5px solid ${PX.sunYellow}`,
          }}>{c.label}</div>
        ))}
      </div>
      {/* gift grid (horizontal scroll rows, 2 cols) */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
        padding: '2px 10px 10px', maxHeight: 152, overflowY: 'auto',
      }} className="h-scroll">
        {items.map(g => (
          <div key={g.id} onClick={() => setPicker(g)} style={{
            background: '#222', border: `2px solid ${PX.sunYellow}`,
            padding: 4, textAlign: 'center', cursor: 'pointer',
            boxShadow: `2px 2px 0 ${PX.shadow}`,
          }} className="pixel-btn">
            <div style={{ fontSize: 22 }}>{g.emoji}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 9,
              color: '#fff', fontWeight: 700, marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{g.name}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: PX.sunYellow, marginTop: 2,
            }}>{g.coin}币</div>
          </div>
        ))}
      </div>

      {picker && (
        <QuantityPicker
          gift={picker}
          onClose={() => setPicker(null)}
          onConfirm={(n) => { onSend(picker, n); setPicker(null); }}
        />
      )}
    </div>
  );
}

function QuantityPicker({ gift, onClose, onConfirm }) {
  const qts = [1, 10, 52, 99, 520];
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: PX.night, color: '#fff',
        border: `3px solid ${PX.sunYellow}`, padding: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 28 }}>{gift.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 13, fontWeight: 700,
            }}>{gift.name}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 8,
              color: PX.sunYellow, marginTop: 2,
            }}>{gift.sub} · {gift.coin} 币</div>
          </div>
          <div onClick={onClose} style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 10,
            color: PX.red, cursor: 'pointer', padding: 4,
          }}>✕</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {qts.map(n => (
            <div key={n} onClick={() => onConfirm(n)} className="pixel-btn" style={{
              flex: 1, textAlign: 'center', padding: '10px 0', cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace", fontSize: 11,
              background: PX.sunYellow, color: PX.night,
              border: `2px solid #fff`, boxShadow: `2px 2px 0 ${PX.red}`,
            }}>×{n}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GIFT_CATS, GIFTS, GiftPanel, QuantityPicker });
