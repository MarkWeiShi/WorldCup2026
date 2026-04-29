// Shared page chrome + small utils used across P1–P10

function PageShell({ title, subtitle, onBack, children, bg = PX.cream, darkHeader = false }) {
  // 页面内文字默认 PX.night（不继承 body 的浅灰 #eee，避免白卡上字看不清）
  const defaultText = bg === PX.night ? '#fff' : PX.night;
  return (
    <div style={{ minHeight: '100%', background: bg, paddingBottom: 40, position: 'relative', color: defaultText }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        padding: '58px 12px 10px',
        background: darkHeader
          ? `linear-gradient(${PX.night}, #2A2A5E)`
          : 'linear-gradient(#87CEEB, #9FDBF5)',
        borderBottom: `3px solid ${PX.night}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div onClick={onBack} className="pixel-btn" style={{
          width: 34, height: 34, background: PX.cream,
          border: `2.5px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <PxIcon kind="back" size={16}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 12,
            color: darkHeader ? PX.sunYellow : PX.night,
            textShadow: darkHeader ? `2px 2px 0 ${PX.shadow}` : `2px 2px 0 ${PX.sunYellow}`,
            letterSpacing: 1,
          }}>{title}</div>
          {subtitle && (
            <div style={{
              fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
              color: darkHeader ? '#fff' : PX.night, marginTop: 3, fontWeight: 600,
            }}>{subtitle}</div>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 12px 30px' }}>{children}</div>
    </div>
  );
}

function Tag({ children, color = PX.sunYellow, textColor = PX.night, size = 7 }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: "'Press Start 2P', monospace", fontSize: size,
      background: color, color: textColor, padding: '2px 5px',
      border: `1.5px solid ${PX.night}`,
    }}>{children}</span>
  );
}

function ProgressBar({ value, max = 100, color = PX.grassGreen, height = 10 }) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div style={{
      height, background: '#fff', border: `2px solid ${PX.night}`,
      display: 'flex', padding: 1, position: 'relative',
    }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          flex: 1, background: i < Math.floor(pct * 12) ? color : 'transparent',
          marginRight: i < 11 ? 1 : 0,
        }}/>
      ))}
    </div>
  );
}

function Card({ children, onClick, style = {}, bg = '#fff' }) {
  return (
    <div onClick={onClick} className={onClick ? 'pixel-btn' : ''} style={{
      background: bg, border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`, padding: 10,
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function SecHead({ title, sub, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 12, marginBottom: 6 }}>
      <div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.night, letterSpacing: 1 }}>{title}</div>
        {sub && <div style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: '#666', marginTop: 2, fontWeight: 600 }}>{sub}</div>}
      </div>
      {action && <div onClick={onAction} style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.darkRed,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
      }}>{action}<PxIcon kind="chev" size={10}/></div>}
    </div>
  );
}

function TabBar({ tabs, active, onChange, size = 'md' }) {
  return (
    <div className="h-scroll" style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
      {tabs.map((t, i) => (
        <div key={i} onClick={() => onChange(i)} style={{
          flex: '0 0 auto', cursor: 'pointer',
          padding: size === 'sm' ? '4px 8px' : '6px 10px',
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: size === 'sm' ? 10 : 11, fontWeight: 700,
          background: active === i ? PX.night : PX.cream,
          color: active === i ? PX.sunYellow : PX.night,
          border: `2px solid ${PX.night}`,
          boxShadow: active === i ? 'none' : `2px 2px 0 ${PX.night}`,
        }}>{t}</div>
      ))}
    </div>
  );
}

function FlagRow({ codes, selected, onPick, px = 4 }) {
  return (
    <div className="h-scroll" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
      {codes.map(c => (
        <div key={c} onClick={() => onPick && onPick(c)} style={{
          flex: '0 0 auto', padding: 3, cursor: onPick ? 'pointer' : 'default',
          background: selected === c ? PX.sunYellow : 'transparent',
          border: `2px solid ${selected === c ? PX.red : 'transparent'}`,
        }}>
          <PixelFlag code={c} px={px}/>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { PageShell, Tag, ProgressBar, Card, SecHead, TabBar, FlagRow });
