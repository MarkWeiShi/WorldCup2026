// P10 — HelloTalk World Cup season task hub

const TASK_TABS = [
  { key: 'study', label: 'STUDY', sub: '学习', color: PX.grassGreen },
  { key: 'social', label: 'SOCIAL', sub: '社交', color: PX.skyBlue },
  { key: 'paid', label: 'PAID', sub: '付费', color: PX.sunYellow },
  { key: 'match', label: 'MATCH', sub: '赛事', color: PX.red },
];

const TASKS = {
  study: [
    { kind: 'info', n: '每日足球单词打卡', d: '10 词 / 天', r: '+10 热力', p: 0, max: 10, rep: '未完成' },
    { kind: 'bubble', n: '跟读足球解说金句', d: '跟读 3 句', r: '+15/次', p: 0, max: 3 },
    { kind: 'frame', n: '国家文化一问', d: '单选题', r: '+20', p: 0, max: 1, rep: '未完成' },
    { kind: 'bubble', n: '与母语者对话 1 次', d: '语言角', r: '+50/次', p: 0, max: 2 },
    { kind: 'chev', n: '纠错外国用户中文贴', d: '纠错助攻', r: '+20/次', p: 1, max: 3 },
    { kind: 'scene', n: '陪看房观看 15 分钟', d: '无限次', r: '+5', p: 0, max: 1, rep: '无限' },
    { kind: 'share', n: '圈子发图文贴', d: '国家文化', r: '+30/次', p: 0, max: 2 },
  ],
  social: [
    { kind: 'chev', n: '关注对方国家用户', d: '随机推荐', r: '+15', p: 0, max: 1 },
    { kind: 'bubble', n: '加入跨国语言角', d: '连续 5 分钟', r: '+25', p: 0, max: 1 },
    { kind: 'frame', n: '被关注 (被动)', d: '自动记录', r: '+10', p: 2, max: 5 },
    { kind: 'share', n: '邀请好友', d: '成功注册', r: '+100/人', p: 1, max: 10 },
  ],
  paid: [
    { kind: 'ticket', n: '购买国家应援包', d: '19 / 99 / 199 币', r: '+100/+500/+1200', p: 0, max: 3 },
    { kind: 'trophy', n: '送国家限定礼物', d: '金额 × 2 热力', r: '按额度', p: 0, max: 1 },
    { kind: 'frame', n: 'VIP 开通 / 续费', d: '本赛事期', r: '+2000 一次性', p: 0, max: 1 },
    { kind: 'bolt', n: '双倍热力卡', d: '39 币', r: '当日 ×2', p: 0, max: 1 },
    { kind: 'trophy', n: '国家代言人徽章', d: '199 币', r: '+500', p: 0, max: 1 },
    { kind: 'ticket', n: 'HT 币首充礼包', d: '首充解锁', r: '+300', p: 1, max: 1 },
  ],
  match: [
    { kind: 'info', n: '比分竞猜成功', d: '今日 3 场', r: '+100', p: 0, max: 3 },
    { kind: 'frame', n: '国家赢球日全勤', d: '应援国胜利', r: '+50 全员', p: 0, max: 1 },
    { kind: 'trophy', n: '晋级庆祝房送礼', d: '庆祝房内', r: '按金额', p: 0, max: 1 },
    { kind: 'calendar', n: '决赛签到', d: '决赛日', r: '+500', p: 0, max: 1 },
  ],
};

const KIND_COLOR = {
  info:     { bg: '#87CEEB', fg: PX.night },
  bubble:   { bg: '#4CAF50', fg: '#fff' },
  frame:    { bg: '#FFD700', fg: PX.night },
  scene:    { bg: '#FF9800', fg: '#fff' },
  bolt:     { bg: '#FFC107', fg: PX.night },
  ticket:   { bg: '#FF5722', fg: '#fff' },
  trophy:   { bg: '#F44336', fg: '#fff' },
  calendar: { bg: '#9C27B0', fg: '#fff' },
  chev:     { bg: '#00BCD4', fg: PX.night },
  share:    { bg: '#E91E63', fg: '#fff' },
};

const ALL_CODES = ['ar', 'br', 'en', 'de', 'fr', 'es', 'cn', 'pt', 'nl', 'jp', 'kr', 'be', 'hr', 'mx', 'us', 'ma', 'sn'];

const HEAT_SEED = [
  { code: 'br', name: '巴西', heat: 52340 },
  { code: 'ar', name: '阿根廷', heat: 48500 },
  { code: 'cn', name: '中国', heat: 45820 },
  { code: 'de', name: '德国', heat: 44200 },
  { code: 'fr', name: '法国', heat: 42900 },
  { code: 'es', name: '西班牙', heat: 40500 },
  { code: 'pt', name: '葡萄牙', heat: 38200 },
  { code: 'nl', name: '荷兰', heat: 36400 },
  { code: 'jp', name: '日本', heat: 34100 },
  { code: 'en', name: '英格兰', heat: 32800 },
];

const LIVE_TICKER_ITEMS = [
  { flagCode: 'br', code: 'BR', stat: '+320', tone: 'up', desc: '热力' },
  { flagCode: 'ar', code: 'AR', stat: '+180', tone: 'up', desc: '热力' },
  { flagCode: 'cn', code: 'CN', stat: '+240', tone: 'up', desc: '热力' },
  { flagCode: 'jp', code: 'JP', stat: '#8', tone: 'rank', desc: '反超至' },
  { flagCode: 'cn', code: 'CN', stat: '#2', tone: 'rank', desc: '上升至' },
  { flagCode: 'de', code: 'DE', stat: '+420', tone: 'up', desc: '热力' },
  { flagCode: 'fr', code: 'FR', stat: '120', tone: 'rank', desc: '距 #4 仅差' },
  { flagCode: 'es', code: 'ES', stat: '+150', tone: 'up', desc: '热力' },
  { flagCode: 'pt', code: 'PT', stat: '+210', tone: 'up', desc: '冲击 Top 6' },
  { flagCode: 'nl', code: 'NL', stat: '#8', tone: 'rank', desc: '守住' },
  { flagCode: 'en', code: 'EN', stat: '+95', tone: 'up', desc: '热力' },
  { flagCode: 'br', code: 'BR', stat: '150', tone: 'rank', desc: '距 50K 仅差' },
  { flagCode: 'cn', code: 'CN', stat: '3H', tone: 'rank', desc: '连续榜首竞争' },
  { flagCode: 'fr', code: 'FR', stat: '+260', tone: 'up', desc: '热力' },
  { flagCode: 'de', code: 'DE', stat: '#4', tone: 'rank', desc: '追平至' },
  { flagCode: 'es', code: 'ES', stat: '+175', tone: 'up', desc: '逼近 Top 5' },
];

const STAND_ZONE_COLORS = ['#009739', '#74ACDF', '#FFD700', '#111111', '#0055A4', '#D52B1E'];

const SEASON_STAGES = [
  { label: '预热', start: 0, end: 3 },
  { label: '小组赛', start: 4, end: 16 },
  { label: '16 强', start: 17, end: 24 },
  { label: '半决赛', start: 25, end: 34 },
  { label: '决赛', start: 35, end: 40 },
];

const PASS_BENEFITS = [
  { kind: 'frame', title: '国家专属头像框', desc: '中国限定 · 像素国旗纹理' },
  { kind: 'bubble', title: '国家专属聊天气泡', desc: '全站聊天可用 · 国旗边' },
  { kind: 'scene', title: '国家专属聊天背景', desc: '国家地标像素场景' },
  { kind: 'bolt', title: '任务热力 +20%', desc: '赛季内永久加成' },
  { kind: 'ticket', title: '补签卡 × 3', desc: '断签 24h 内补做' },
  { kind: 'trophy', title: '20 阶奖励轨道', desc: '免费 + VIP 双轨' },
];

const PASS_TRACKS = [
  { tier: 'T1', heat: 300, free: '金币×100', vip: '抽奖券×1' },
  { tier: 'T2', heat: 600, free: '头像挂件·低', vip: '限定挂件·低' },
  { tier: 'T3', heat: 900, free: '金币×150', vip: '双倍卡×1' },
  { tier: 'T4', heat: 1200, free: '装扮碎片×5', vip: '装扮碎片×15' },
  { tier: 'T5', heat: 1500, free: '徽章·铜', vip: '限定头像框' },
  { tier: 'T6', heat: 1800, free: '金币×200', vip: '金币×500' },
  { tier: 'T7', heat: 2100, free: '补签券×1', vip: '补签券×3' },
  { tier: 'T8', heat: 2400, free: '装扮碎片×10', vip: '限定气泡框·铜' },
  { tier: 'T9', heat: 2700, free: '金币×250', vip: '双倍卡×2' },
  { tier: 'T10', heat: 3000, free: '金币×500', vip: '国家助力包×1' },
  { tier: 'T11', heat: 3300, free: '徽章·银', vip: '限定头像框 PRO' },
  { tier: 'T12', heat: 3600, free: '金币×300', vip: '金币×800' },
  { tier: 'T13', heat: 3900, free: '装扮碎片×15', vip: '限定背景·银' },
  { tier: 'T14', heat: 4200, free: '头像挂件·中', vip: '限定挂件·中' },
  { tier: 'T15', heat: 4500, free: '徽章·银', vip: '限定球衣挂件' },
  { tier: 'T16', heat: 4800, free: '金币×400', vip: '金币×1000' },
  { tier: 'T17', heat: 5100, free: '装扮碎片×20', vip: '限定气泡·金' },
  { tier: 'T18', heat: 5400, free: '补签券×2', vip: '补签券×5' },
  { tier: 'T19', heat: 5700, free: '金币×600', vip: '双倍卡×5' },
  { tier: 'T20', heat: 6000, free: '金币×2000', vip: '稀有徽章+荣誉榜位' },
];

const MY_COUNTRY_CODE = 'cn';
const MY_COUNTRY_BASE_HEAT = 1280;
const BAR_WIDTH = 22;
const BAR_GAP = 1;
const BAR_STEP = BAR_WIDTH + BAR_GAP;
const BAR_LEFT = 8;
const BAR_HEIGHT = 120;

function formatRankHeat(value) {
  if (value >= 10000) return `${Math.floor(value / 1000)}K`;
  return String(value);
}

function formatHeat(value) {
  return value.toLocaleString('en-US');
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSeasonTimeline(dayIndex) {
  const currentIndex = SEASON_STAGES.findIndex((stage) => dayIndex >= stage.start && dayIndex <= stage.end);
  const stageIndex = currentIndex >= 0 ? currentIndex : SEASON_STAGES.length - 1;
  const stage = SEASON_STAGES[stageIndex];
  const span = Math.max(1, stage.end - stage.start + 1);
  const stageProgress = stageIndex === SEASON_STAGES.length - 1
    ? 1
    : Math.min(1, (dayIndex - stage.start + 1) / span);
  const connectors = SEASON_STAGES.slice(0, -1).map((_, index) => {
    if (index < stageIndex) return 1;
    if (index > stageIndex) return 0;
    return stageProgress;
  });
  return { stageIndex, stageProgress, connectors };
}

function nextHeatEntries(prev) {
  const next = prev.map((entry) => ({ ...entry }));
  const picks = new Set();
  const count = randomInt(1, 2);
  while (picks.size < count) picks.add(randomInt(0, next.length - 1));
  picks.forEach((index) => {
    next[index].heat += randomInt(1, 5);
  });
  return { next, pulses: Array.from(picks).map((index) => next[index].code) };
}

function getPatternBlocks(code) {
  const full = [{ type: 'h', color: PX.red, pct: 1 }];
  const map = {
    br: [
      { type: 'h', color: '#009739', pct: 0.66 },
      { type: 'h', color: '#FFDF00', pct: 0.34 },
    ],
    ar: [
      { type: 'h', color: '#74ACDF', pct: 0.33 },
      { type: 'h', color: '#ffffff', pct: 0.34 },
      { type: 'h', color: '#74ACDF', pct: 0.33 },
    ],
    cn: full,
    de: [
      { type: 'h', color: '#111111', pct: 0.33 },
      { type: 'h', color: '#D52B1E', pct: 0.33 },
      { type: 'h', color: '#FFDF00', pct: 0.34 },
    ],
    fr: [
      { type: 'v', color: '#0055A4', pct: 0.33 },
      { type: 'v', color: '#ffffff', pct: 0.34 },
      { type: 'v', color: '#D52B1E', pct: 0.33 },
    ],
    es: [
      { type: 'h', color: '#D52B1E', pct: 0.2 },
      { type: 'h', color: '#FFDF00', pct: 0.6 },
      { type: 'h', color: '#D52B1E', pct: 0.2 },
    ],
    pt: [
      { type: 'v', color: '#009739', pct: 0.33 },
      { type: 'v', color: '#D52B1E', pct: 0.67 },
    ],
    nl: [
      { type: 'h', color: '#21468B', pct: 0.33 },
      { type: 'h', color: '#ffffff', pct: 0.34 },
      { type: 'h', color: '#AE1C28', pct: 0.33 },
    ],
    jp: [{ type: 'h', color: '#ffffff', pct: 1 }],
    en: [{ type: 'h', color: '#ffffff', pct: 1 }],
  };
  return map[code] || full;
}

function HeatBarPattern({ code, height }) {
  const blocks = getPatternBlocks(code);
  let offset = 0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {blocks.map((block, index) => {
        const style = block.type === 'v'
          ? {
              position: 'absolute',
              left: `${offset * 100}%`,
              top: 0,
              width: `${block.pct * 100}%`,
              height: '100%',
              background: block.color,
            }
          : {
              position: 'absolute',
              left: 0,
              bottom: `${offset * 100}%`,
              width: '100%',
              height: `${block.pct * 100}%`,
              background: block.color,
            };
        offset += block.pct;
        return <div key={`${code}-${index}`} style={style} />;
      })}

      {code === 'cn' && (
        <div style={{
          position: 'absolute',
          top: 8,
          left: 4,
          width: 8,
          height: 6,
          background: '#FFDF00',
        }} />
      )}

      {code === 'jp' && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 10,
          height: 10,
          background: '#D52B1E',
          transform: 'translate(-50%, -50%)',
        }} />
      )}

      {code === 'en' && (
        <>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 6,
            height: '100%',
            background: '#D52B1E',
            transform: 'translateX(-50%)',
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '100%',
            height: 6,
            background: '#D52B1E',
            transform: 'translateY(-50%)',
          }} />
        </>
      )}
    </div>
  );
}

function PixelModal({ children, onClose, footer }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,26,62,0.85)',
        zIndex: 90,
        paddingBottom: 20,
      }}
    >
      <div
        className="modal-slide-up"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 320,
          maxHeight: '85dvh',
          margin: '60px auto 0',
          background: PX.cream,
          border: `3px solid ${PX.night}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          flex: '1 1 auto',
          overflowY: 'auto',
          padding: 12,
          paddingBottom: footer ? 4 : 12,
        }}>
          {children}
        </div>
        {footer && (
          <div style={{
            flex: '0 0 auto',
            padding: '8px 12px 12px',
            background: PX.cream,
            borderTop: `3px solid ${PX.night}`,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function PixelDivider() {
  return (
    <div style={{
      borderTop: `2px dashed ${PX.sunYellow}`,
      margin: '12px 0',
    }} />
  );
}

function RewardNode({ kind, label, active = false }) {
  const isDiamond = kind === 'free';
  return (
    <div style={{ position: 'relative', width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {isDiamond ? (
        <div style={{
          width: 10,
          height: 10,
          background: active ? PX.sunYellow : '#E6C86B',
          border: `2px solid ${PX.night}`,
          transform: 'rotate(45deg)',
        }} />
      ) : (
        <div style={{
          width: 18,
          height: 18,
          background: active ? PX.red : '#FFF0D2',
          border: `2px solid ${PX.night}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {active ? <PixelTrophy size={14} /> : <PixelStar name="messi" size={14} />}
        </div>
      )}
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 7,
        color: PX.night,
      }}>{label}</div>
    </div>
  );
}

function GermanFrame() {
  return (
    <div style={{
      width: 76, height: 76, position: 'relative',
      background: '#FFF6E0',
      border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* DE mini banner at top */}
      <div style={{
        position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)',
        background: PX.night, color: PX.sunYellow,
        fontFamily: "'Press Start 2P', monospace", fontSize: 6,
        padding: '1px 4px',
        border: `1px solid ${PX.night}`,
        letterSpacing: 1,
        zIndex: 2,
      }}>DE</div>
      {/* Empty avatar placeholder circle with German tri-color rings */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: '#FFFFFF',
        boxShadow: `0 0 0 3px ${PX.sunYellow}, 0 0 0 5px ${PX.red}, 0 0 0 7px ${PX.night}`,
        position: 'relative', overflow: 'hidden',
        marginTop: 4,
      }}>
        {/* generic empty avatar silhouette (grey head + shoulders) */}
        <div style={{
          position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
          width: 10, height: 10, background: '#D0D0D8', borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
          width: 22, height: 14, background: '#D0D0D8',
          borderTopLeftRadius: 11, borderTopRightRadius: 11,
        }} />
      </div>
      {/* 4 corner diamond ornaments */}
      {[
        { top: 3, left: 3, bg: PX.sunYellow },
        { top: 3, right: 3, bg: PX.sunYellow },
        { bottom: 3, left: 3, bg: PX.red },
        { bottom: 3, right: 3, bg: PX.red },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: o.top, bottom: o.bottom, left: o.left, right: o.right,
          width: 5, height: 5,
          background: o.bg,
          border: `1.5px solid ${PX.night}`,
          transform: 'rotate(45deg)',
        }} />
      ))}
    </div>
  );
}

function GermanBubble() {
  return (
    <div style={{
      width: 114, height: 70, position: 'relative',
      background: PX.cream,
      border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
    }}>
      {/* German flag sticker at top-left (OUTSIDE bubble) */}
      <div style={{
        position: 'absolute', top: 4, left: 4,
        width: 16, height: 12,
        display: 'flex', flexDirection: 'column',
        border: `1.5px solid ${PX.night}`,
        boxShadow: `1px 1px 0 ${PX.night}`,
      }}>
        <div style={{ flex: 1, background: PX.night }} />
        <div style={{ flex: 1, background: PX.red }} />
        <div style={{ flex: 1, background: PX.sunYellow }} />
      </div>
      {/* Small football at top-right (OUTSIDE bubble) */}
      <div style={{ position: 'absolute', top: 4, right: 4 }}>
        <PixelBall size={12} />
      </div>
      {/* Gold diamond at bottom-right */}
      <div style={{
        position: 'absolute', bottom: 4, right: 6,
        width: 6, height: 6,
        background: PX.sunYellow,
        border: `1.5px solid ${PX.night}`,
        transform: 'rotate(45deg)',
      }} />
      {/* Red diamond at bottom-left */}
      <div style={{
        position: 'absolute', bottom: 4, left: 6,
        width: 6, height: 6,
        background: PX.red,
        border: `1.5px solid ${PX.night}`,
        transform: 'rotate(45deg)',
      }} />
      {/* Central empty speech bubble */}
      <div style={{
        position: 'absolute',
        top: 22, left: 26, right: 26,
        height: 24,
        background: '#FFFFFF',
        border: `2px solid ${PX.night}`,
        boxShadow: `2px 2px 0 ${PX.night}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}>
        {/* 3 colored dots like "typing" */}
        <div style={{ width: 3, height: 3, background: PX.night }} />
        <div style={{ width: 3, height: 3, background: PX.red }} />
        <div style={{ width: 3, height: 3, background: PX.sunYellow }} />
        {/* Tail */}
        <div style={{
          position: 'absolute', bottom: -7, left: 10,
          width: 0, height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: `7px solid ${PX.night}`,
        }} />
        <div style={{
          position: 'absolute', bottom: -4, left: 11,
          width: 0, height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '3px solid transparent',
          borderTop: `5px solid #FFFFFF`,
        }} />
      </div>
    </div>
  );
}

function GermanBg() {
  return (
    <div style={{
      width: 114, height: 76, position: 'relative',
      background: '#FFF6DA',
      border: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      overflow: 'hidden',
    }}>
      {/* German flag top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 9, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: PX.night }} />
        <div style={{ flex: 1, background: PX.red }} />
        <div style={{ flex: 1, background: PX.sunYellow }} />
      </div>
      {/* Empty chat message bubbles */}
      <div style={{
        position: 'absolute',
        top: 12, left: 5, right: 5,
        display: 'flex', flexDirection: 'column', gap: 3,
      }}>
        <div style={{ width: 48, height: 8, background: '#FFFFFF', border: `1.5px solid ${PX.night}`, alignSelf: 'flex-start' }} />
        <div style={{ width: 32, height: 8, background: PX.sunYellow, border: `1.5px solid ${PX.night}`, alignSelf: 'flex-end' }} />
        <div style={{ width: 40, height: 8, background: '#FFFFFF', border: `1.5px solid ${PX.night}`, alignSelf: 'flex-start' }} />
      </div>
      {/* Moon top-right */}
      <div style={{ position: 'absolute', top: 14, right: 6, width: 5, height: 5, background: PX.sunYellow, borderRadius: '50%', border: `1px solid ${PX.night}` }} />
      {/* Brandenburg gate silhouette at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18, background: PX.night }}>
        {/* gate 6 columns */}
        {[8, 22, 36, 68, 82, 96].map((x, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: 0, left: x,
            width: 4, height: 13, background: '#3A3A3A',
          }} />
        ))}
        {/* gate roof */}
        <div style={{ position: 'absolute', bottom: 13, left: 5, right: 5, height: 3, background: '#3A3A3A' }} />
        {/* quadriga (horses on top, simplified) */}
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: 10, height: 2, background: PX.sunYellow }} />
      </div>
    </div>
  );
}

function PassIntroModal({ onClose, onTracks, onUnlock }) {
  const footer = (
    <>
      <div
        onClick={onUnlock}
        className="pixel-btn"
        style={{
          height: 44,
          background: PX.red,
          border: `3px solid ${PX.night}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10,
          color: PX.sunYellow,
          cursor: 'pointer',
        }}
      >
        <PxIcon kind="bolt" size={12} />
        立即出战 · 开通通行证
      </div>
      <div style={{
        marginTop: 8,
        textAlign: 'center',
        fontFamily: "'PingFang SC', sans-serif",
        fontSize: 10,
        color: '#6B6B83',
        fontWeight: 600,
      }}>已有 1,234 名球迷开通 · 开通后立即解锁所有权益</div>
    </>
  );
  return (
    <PixelModal onClose={onClose} footer={footer}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            background: PX.cream,
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            color: PX.night,
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 6 }}>
        <div className="halo-pulse" style={{ display: 'inline-flex' }}>
          <PixelTrophy size={56} />
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 12,
          color: PX.sunYellow,
        }}>HELLOTALK WORLD CUP PASS</div>
        <div style={{
          marginTop: 6,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 14,
          color: '#fff',
          fontWeight: 700,
          background: PX.night,
          padding: '6px 10px',
          border: `3px solid ${PX.sunYellow}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
        }}>赛 季 通 行 证</div>
        <div style={{
          marginTop: 6,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 10,
          color: 'rgba(255,255,255,0.7)',
          background: PX.night,
          padding: '4px 8px',
          display: 'inline-block',
          border: `3px solid ${PX.night}`,
        }}>限时 40 天 · 6.11 → 7.19</div>
      </div>

      <PixelDivider />

      <SecHead title="本季 6 项权益" />
      <div style={{ display: 'grid', gap: 8 }}>
        {PASS_BENEFITS.map((benefit, index) => (
          <div key={benefit.title} style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr',
            gap: 10,
            alignItems: 'center',
            background: index === 5 ? '#FFF1C6' : '#ffffff',
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`,
            padding: 8,
          }}>
            <div style={{
              width: 32,
              height: 32,
              background: PX.cream,
              border: `3px solid ${PX.night}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {benefit.kind === 'trophy' ? <PixelTrophy size={24} /> : <PxIcon kind={benefit.kind} size={20} />}
            </div>
            <div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 12,
                color: PX.night,
                fontWeight: 700,
              }}>{benefit.title}</div>
              <div style={{
                marginTop: 4,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: '#6B6B83',
              }}>{benefit.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <SecHead title="德国队身份三件套预览" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { vis: <GermanFrame />,  title: '头像框',   desc: '黑红金三色同心环 + 中心留白放用户自己的头像 + 4 角钻石 + 顶端 DE 小标' },
          { vis: <GermanBubble />, title: '聊天气泡', desc: '空气泡 + 外围国旗角贴 + 足球 + 金红钻石装饰' },
          { vis: <GermanBg />,     title: '聊天背景', desc: '顶部国旗带 + 月亮 + 勃兰登堡门夜景 + 聊天气泡浮层' },
        ].map((it, i) => (
          <Card key={i} style={{ padding: 10, background: '#fff', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>{it.vis}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                color: PX.red, marginBottom: 4, letterSpacing: 0.5,
              }}>{it.title}</div>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif", fontSize: 11,
                color: PX.night, lineHeight: 1.5, fontWeight: 600,
              }}>{it.desc}</div>
            </div>
          </Card>
        ))}
      </div>

      <PixelDivider />

      <SecHead title="20 阶奖励轨道 · 预览" />
      <div style={{
        background: '#fff',
        border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`,
        padding: 10,
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 8,
          color: PX.night,
          marginBottom: 8,
        }}>FREE</div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{
            position: 'absolute',
            left: 18,
            right: 18,
            top: 5,
            height: 2,
            background: PX.sunYellow,
          }} />
          {['T1', 'T5', 'T10', 'T15', 'T20'].map((label, index) => (
            <RewardNode key={label} kind="free" label={label} active={index === 4} />
          ))}
        </div>

        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 8,
          color: PX.red,
          marginBottom: 8,
        }}>VIP</div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{
            position: 'absolute',
            left: 18,
            right: 18,
            top: 9,
            height: 2,
            background: PX.red,
          }} />
          {['T1', 'T5', 'T10', 'T15', 'T20'].map((label, index) => (
            <RewardNode key={label} kind="vip" label={label} active={index === 2 || index === 4} />
          ))}
        </div>
        <div style={{
          marginTop: 10,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 11,
          color: PX.night,
          fontWeight: 700,
          lineHeight: 1.6,
        }}>
          T1 抽奖券×1 / T5 限定头像框 / T10 国家助力包 / T15 限定球衣挂件 / T20 稀有徽章+荣誉位
        </div>
        <div
          onClick={onTracks}
          className="pixel-btn"
          style={{
            marginTop: 10,
            background: PX.sunYellow,
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`,
            padding: '8px 10px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            color: PX.night,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          查看完整 20 阶双轨 ›
        </div>
      </div>

      <PixelDivider />

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 18,
          color: PX.sunYellow,
        }}>2488 金币</div>
        <div style={{
          marginTop: 4,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10,
          color: 'rgba(255,255,255,0.5)',
          background: PX.night,
          display: 'inline-block',
          padding: '4px 6px',
          textDecoration: 'line-through',
        }}>原价 3888</div>
      </div>

    </PixelModal>
  );
}

function PassTracksModal({ onClose }) {
  return (
    <PixelModal onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 11,
          color: PX.sunYellow,
          background: PX.night,
          padding: '8px 10px',
          border: `3px solid ${PX.sunYellow}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
        }}>20 阶奖励轨道 · 完整预览</div>
        <button
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            background: PX.cream,
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            color: PX.night,
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </div>

      <div style={{
        marginTop: 12,
        background: '#fff',
        border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '42px 58px 1fr 1fr',
          gap: 6,
          padding: '8px 6px',
          background: PX.night,
          color: PX.sunYellow,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
        }}>
          <div>T</div>
          <div>累计热力</div>
          <div>FREE 轨</div>
          <div>VIP 轨</div>
        </div>

        {PASS_TRACKS.map((track, index) => (
          <div
            key={track.tier}
            style={{
              display: 'grid',
              gridTemplateColumns: '42px 58px 1fr 1fr',
              gap: 6,
              padding: '8px 6px',
              background: index % 2 === 0 ? '#FFF8E7' : '#FFF3CF',
              borderTop: index === 0 ? 'none' : `2px dashed ${PX.night}`,
              alignItems: 'start',
            }}
          >
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: PX.red,
            }}>{track.tier}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: PX.night,
            }}>{track.heat}</div>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 10,
              color: PX.night,
              fontWeight: 700,
              lineHeight: 1.4,
            }}>{track.free}</div>
            <div style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 10,
              color: PX.night,
              fontWeight: 700,
              lineHeight: 1.4,
            }}>
              <div style={{
                width: 14,
                height: 14,
                background: PX.red,
                border: `2px solid ${PX.night}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <PxIcon kind="ticket" size={10} />
              </div>
              <span>{track.vip}</span>
            </div>
          </div>
        ))}
      </div>
    </PixelModal>
  );
}

function PixelTicker() {
  const items = [...LIVE_TICKER_ITEMS, ...LIVE_TICKER_ITEMS];
  return (
    <div style={{
      height: 38,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'stretch',
      background: PX.night,
      border: `3px solid ${PX.sunYellow}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      overflow: 'hidden',
    }}>
      <div
        className="live-blink"
        style={{
          width: 44,
          flexShrink: 0,
          background: PX.red,
          borderRight: `3px solid ${PX.sunYellow}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: PX.sunYellow,
          letterSpacing: 1,
        }}
      >
        LIVE
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div
          className="ticker-slide"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minWidth: 'max-content',
            paddingRight: 20,
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.code}-${index}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 14px 0 12px',
                whiteSpace: 'nowrap',
                borderRight: `2px dashed rgba(255,215,0,0.35)`,
              }}
            >
              <PixelFlag code={item.flagCode} px={3} />
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: '#fff',
              }}>{item.code}</span>
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: item.tone === 'up' ? PX.sunYellow : PX.red,
              }}>{item.stat}</span>
              <span style={{
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 11,
                color: PX.cream,
                fontWeight: 700,
              }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PixelStadiumStand() {
  const [waveRow, setWaveRow] = React.useState(-1);
  const [waveCycle, setWaveCycle] = React.useState(0);
  const [ribbonFlash, setRibbonFlash] = React.useState(false);

  const rows = React.useMemo(() => (
    Array.from({ length: 3 }, (_, rowIndex) => (
      Array.from({ length: 30 }, (_, fanIndex) => ({
        color: STAND_ZONE_COLORS[(fanIndex + rowIndex * 2) % STAND_ZONE_COLORS.length],
        bounceDelay: `${100 + ((rowIndex * 37 + fanIndex * 19) % 201)}ms`,
        duration: `${620 + ((rowIndex * 29 + fanIndex * 13) % 180)}ms`,
      }))
    ))
  ), []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setWaveRow((prev) => {
        const next = (prev + 1) % 3;
        setWaveCycle((value) => value + 1);
        return next;
      });
      setRibbonFlash(true);
      window.setTimeout(() => setWaveRow(-1), 920);
      window.setTimeout(() => setRibbonFlash(false), 260);
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
      height: 46,
      width: '100%',
      marginBottom: 8,
      position: 'relative',
      overflow: 'hidden',
      background: PX.night,
      borderTop: `2px solid ${PX.sunYellow}`,
      borderBottom: `3px solid ${PX.night}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
    }}>
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{
            position: 'absolute',
            left: rowIndex * 2 - 4,
            top: 6 + rowIndex * 11,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
          }}
        >
          {row.map((fan, fanIndex) => {
            const waveActive = waveRow === rowIndex;
            return (
              <PixelFan
                key={`${rowIndex}-${fanIndex}-${waveCycle}`}
                color={fan.color}
                size={8}
                className="crowd-bounce2"
                style={{
                  '--i': fanIndex,
                  animationDelay: fan.bounceDelay,
                  animationDuration: fan.duration,
                }}
                innerClassName={waveActive ? 'mexican-wave' : ''}
                innerStyle={waveActive ? { animationDelay: `${fanIndex * 30}ms` } : {}}
              />
            );
          })}
        </div>
      ))}

      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(16, 1fr)',
        gap: 0,
      }}>
        {Array.from({ length: 16 }, (_, index) => (
          <div key={index} style={{ background: ribbonFlash && index % 2 === 0 ? PX.sunYellow : 'transparent' }} />
        ))}
      </div>
    </div>
  );
}

function SeasonFilmStrip() {
  const [dayIndex, setDayIndex] = React.useState(0);
  const [glowFlash, setGlowFlash] = React.useState(false);
  const prevStageRef = React.useRef(0);
  const { stageIndex, connectors } = getSeasonTimeline(dayIndex);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setDayIndex((prev) => (prev >= 40 ? 0 : prev + 1));
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (prevStageRef.current === stageIndex) return undefined;
    prevStageRef.current = stageIndex;
    setGlowFlash(true);
    const timeoutId = window.setTimeout(() => setGlowFlash(false), 620);
    return () => clearTimeout(timeoutId);
  }, [stageIndex]);

  return (
    <div style={{
      marginTop: 12,
      marginBottom: 12,
      background: PX.night,
      border: `3px solid ${PX.sunYellow}`,
      boxShadow: `3px 3px 0 ${PX.night}`,
      padding: '8px 10px 10px',
      minHeight: 72,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: PX.sunYellow,
        }}>SEASON TIMELINE</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: PX.red,
        }}>{`DAY ${dayIndex}/40`}</div>
      </div>

      <div style={{ position: 'relative', paddingBottom: 18 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '18px 1fr 18px 1fr 18px 1fr 18px 1fr 18px',
          gap: 4,
          alignItems: 'center',
        }}>
          {SEASON_STAGES.map((stage, index) => (
            <React.Fragment key={stage.label}>
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div
                  className={index === stageIndex ? 'film-node-active' : ''}
                  style={{
                    width: 12,
                    height: 12,
                    margin: '0 auto',
                    background: index <= stageIndex ? PX.sunYellow : PX.night,
                    border: `2px solid ${index <= stageIndex ? PX.night : '#444444'}`,
                    boxShadow: glowFlash && index === stageIndex ? `0 0 0 2px ${PX.sunYellow}` : 'none',
                  }}
                />
                <div style={{
                  marginTop: 4,
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: 9,
                  color: '#fff',
                  fontWeight: index === stageIndex ? 700 : 600,
                  whiteSpace: 'nowrap',
                  transform: 'translateX(-8px)',
                }}>{stage.label}</div>
              </div>
              {index < SEASON_STAGES.length - 1 && (
                <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {Array.from({ length: 6 }, (_, segmentIndex) => {
                    const fillValue = connectors[index] * 6;
                    const active = segmentIndex < Math.floor(fillValue);
                    const partial = !active && segmentIndex === Math.floor(fillValue) && connectors[index] > 0 && connectors[index] < 1;
                    return (
                      <div
                        key={`${stage.label}-${segmentIndex}`}
                        style={{
                          flex: 1,
                          height: 4,
                          background: active
                            ? PX.sunYellow
                            : partial && dayIndex % 2 === 0
                              ? PX.gold
                              : '#5C5C5C',
                          border: `1px solid ${PX.night}`,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{
          position: 'absolute',
          left: `calc(${(stageIndex / (SEASON_STAGES.length - 1)) * 100}% - 4px)`,
          top: 18,
          width: 8,
          height: 10,
          transition: 'left 400ms steps(8, end)',
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(4, 2px)',
          gridTemplateRows: 'repeat(5, 2px)',
          lineHeight: 0,
          filter: glowFlash ? 'drop-shadow(0 0 6px rgba(255,215,0,0.9))' : 'none',
        }}
        className="halo-pulse"
        >
          {[
            '....',
            '.yy.',
            'yyyy',
            '.yy.',
            'y..y',
          ].flatMap((row) => row.split('')).map((cell, index) => (
            <div key={index} style={{ background: cell === 'y' ? PX.sunYellow : 'transparent' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PassCard({ unlocked, onOpenIntro, onOpenTracks }) {
  const trophyTiles = [
    { top: 10, left: 14 },
    { top: 12, right: 18 },
    { top: 42, left: 64 },
    { top: 46, right: 60 },
    { bottom: 18, left: 20 },
    { bottom: 14, right: 24 },
    { bottom: 52, left: 108 },
    { top: 28, left: '50%', transform: 'translateX(-50%)' },
  ];

  return (
    <Card style={{
      marginTop: 12,
      background: 'linear-gradient(45deg, #FFC107 0%, #FFC107 50%, #FF9800 50%, #FF9800 100%)',
      borderColor: PX.night,
      padding: 12,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}>
        {trophyTiles.map((tile, index) => (
          <div
            key={`trophy-tile-${index}`}
            className="soft-pulse"
            style={{
              position: 'absolute',
              ...tile,
            }}
          >
            <PxIcon kind="trophy" size={20} />
          </div>
        ))}
      </div>

      {!unlocked && (
        <div
          className="shimmer-sweep"
          style={{
            position: 'absolute',
            top: '-10%',
            left: -60,
            width: 60,
            height: '120%',
            transform: 'rotate(-20deg)',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40,
            height: 40,
            background: '#FFF2C2',
            border: `3px solid ${PX.sunYellow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `3px 3px 0 ${PX.night}`,
            flexShrink: 0,
          }}>
            <PixelTrophy size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
              color: PX.night,
              lineHeight: 1.4,
            }}>HELLOTALK WORLD CUP PASS</div>
            <div style={{
              marginTop: 4,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 11,
              color: PX.night,
              fontWeight: 700,
            }}>赛季通行证</div>
          </div>
        </div>

        {!unlocked ? (
          <>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 18,
                color: PX.night,
              }}>2488 金币</div>
              <div style={{
                marginTop: 4,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: 'rgba(26,26,62,0.5)',
                textDecoration: 'line-through',
              }}>原价 3888</div>
            </div>
            <div
              onClick={onOpenIntro}
              className="pixel-btn"
              style={{
                marginTop: 12,
                background: PX.red,
                border: `3px solid ${PX.night}`,
                boxShadow: `3px 3px 0 ${PX.night}`,
                padding: '10px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <PxIcon kind="bolt" size={12} />
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9,
                color: PX.sunYellow,
              }}>立即出战 · 开通通行证</div>
            </div>
          </>
        ) : (
          <>
            <div style={{
              marginTop: 12,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 12,
              color: PX.night,
              fontWeight: 700,
            }}>我的赛季进度 T3/20 · 距下一奖 120 热力</div>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={3} max={20} color={PX.sunYellow} />
            </div>
            <div
              onClick={onOpenTracks}
              className="pixel-btn"
              style={{
                marginTop: 12,
                background: PX.red,
                border: `3px solid ${PX.night}`,
                boxShadow: `3px 3px 0 ${PX.night}`,
                padding: '10px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <PxIcon kind="ticket" size={12} />
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9,
                color: PX.sunYellow,
              }}>查看双轨 · 当前 T3</div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function HeatChart({ entries, displayHeats, pulseCodes, myCountryCode, toast }) {
  const sorted = [...entries].sort((a, b) => b.heat - a.heat);
  const rankMap = {};
  sorted.forEach((entry, index) => {
    rankMap[entry.code] = index;
  });

  const myRank = sorted.findIndex((entry) => entry.code === myCountryCode) + 1;
  const topTenCut = sorted[9] ? sorted[9].heat : 0;
  const myEntry = sorted.find((entry) => entry.code === myCountryCode) || entries[0];
  const maxHeat = sorted[0] ? sorted[0].heat : 1;

  return (
    <>
      <SecHead title="HEAT CHART" sub="Top 10 · 实时动态" />
      <PixelTicker />
      <Card style={{
        background: '#2E7D32',
        padding: 10,
        borderColor: PX.sunYellow,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            left: 8,
            right: 8,
            top: 40,
            borderTop: '2px dashed rgba(255,255,255,0.35)',
          }} />
          <div style={{
            position: 'absolute',
            left: 8,
            right: 8,
            top: 58,
            borderTop: '2px dashed rgba(255,255,255,0.35)',
          }} />
          <div style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 20,
            borderTop: '2px dashed rgba(255,255,255,0.35)',
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PixelCommentator size={24} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 6px',
              background: PX.red,
              border: `2px solid ${PX.night}`,
              boxShadow: `2px 2px 0 ${PX.night}`,
            }}>
              <span className="live-blink" style={{ width: 8, height: 8, background: '#fff', display: 'inline-block' }} />
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 6,
                color: '#fff',
              }}>ON AIR</span>
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              color: PX.sunYellow,
            }}>TOP 10 · LIVE</div>
          </div>
          <LiveDot />
        </div>


        <div style={{
          width: '100%',
          maxWidth: 260,
          margin: '10px auto 0',
          background: '#101030',
          border: `3px solid ${PX.sunYellow}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
          padding: '10px 0 12px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'relative',
            width: BAR_LEFT * 2 + BAR_STEP * entries.length - BAR_GAP,
            height: 182,
            margin: '0 auto',
          }}>
            {entries.map((entry) => {
              const rankIndex = rankMap[entry.code] ?? 0;
              const ratio = entry.heat / maxHeat;
              const fillHeight = Math.max(24, Math.round(BAR_HEIGHT * ratio));
              const isMine = entry.code === myCountryCode;
              return (
                <div
                  key={entry.code}
                  onClick={() => {
                    toast?.(`${entry.name} · 今日 +${randomInt(80, 420)} · 全球 #${rankIndex + 1}`);
                    window.sfx?.play?.('click_soft');
                  }}
                  style={{
                    position: 'absolute',
                    left: BAR_LEFT,
                    top: 0,
                    width: BAR_WIDTH,
                    height: '100%',
                    transform: `translateX(${rankIndex * BAR_STEP}px)`,
                    transition: 'transform 400ms steps(8, end)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    height: 16,
                    textAlign: 'center',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 8,
                    color: PX.sunYellow,
                  }}>{formatRankHeat(displayHeats[entry.code] || entry.heat)}</div>

                  <div style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 34,
                    width: BAR_WIDTH,
                    height: BAR_HEIGHT,
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}>
                    <div className={isMine ? 'gold-glow' : ''} style={{
                      position: 'relative',
                      width: '100%',
                      height: fillHeight,
                      background: '#0F0F27',
                      border: `3px solid ${isMine ? PX.sunYellow : PX.night}`,
                      boxShadow: `3px 3px 0 ${PX.night}`,
                      overflow: 'hidden',
                    }}>
                      <div className="heat-bar-grow" style={{
                        position: 'absolute',
                        inset: 0,
                      }}>
                        <HeatBarPattern code={entry.code} height={fillHeight} />
                      </div>
                      {pulseCodes.includes(entry.code) && (
                        <div className="heat-bar-pulse" style={{
                          position: 'absolute',
                          inset: 0,
                          border: `3px solid ${PX.sunYellow}`,
                          pointerEvents: 'none',
                        }} />
                      )}
                    </div>
                  </div>

                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 16,
                    transform: 'translateX(-50%)',
                  }}>
                    <PixelFlag code={entry.code} px={3} />
                  </div>

                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 4,
                    transform: 'translateX(-50%)',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 7,
                    color: isMine ? PX.red : '#fff',
                    fontWeight: isMine ? 700 : 400,
                    whiteSpace: 'nowrap',
                  }}>{entry.code.toUpperCase()}</div>

                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: -10,
                    transform: 'translateX(-50%)',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 8,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}>#{rankIndex + 1}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          display: myRank > 10 ? 'block' : 'none',
          marginTop: 10,
          background: PX.cream,
          border: `3px solid ${PX.night}`,
          boxShadow: `3px 3px 0 ${PX.night}`,
          padding: '8px 10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PixelFlag code={myCountryCode} px={4} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 12,
                color: PX.night,
                fontWeight: 700,
              }}>{myEntry.name}</div>
              <div style={{
                marginTop: 4,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: PX.night,
              }}>#{myRank} · 今日 +{myEntry.heat - 45820} · 距 Top 10 还差 {Math.max(0, topTenCut - myEntry.heat)}</div>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          pointerEvents: 'none',
        }}>
          <div className="ball-wobble">
            <PixelBall size={16} />
          </div>
        </div>
      </Card>
    </>
  );
}

function P10Page({ onBack, toast }) {
  const [tab, setTab] = React.useState(0);
  const [entries, setEntries] = React.useState(HEAT_SEED);
  const [displayHeats, setDisplayHeats] = React.useState(() => {
    const init = {};
    HEAT_SEED.forEach((entry) => {
      init[entry.code] = entry.heat;
    });
    return init;
  });
  const [pulseCodes, setPulseCodes] = React.useState([]);
  const [showPassUnlocked, setShowPassUnlocked] = React.useState(false);
  const [showPassIntro, setShowPassIntro] = React.useState(false);
  const [showPassTracks, setShowPassTracks] = React.useState(false);
  const [myHeat, setMyHeat] = React.useState(MY_COUNTRY_BASE_HEAT);
  const [heatFlash, setHeatFlash] = React.useState(false);
  const [heatPopTick, setHeatPopTick] = React.useState(0);
  const [heatBursts, setHeatBursts] = React.useState([]);

  const entriesRef = React.useRef(entries);
  const burstIdRef = React.useRef(0);
  React.useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  React.useEffect(() => {
    const pulseId = setInterval(() => {
      setEntries((prev) => {
        const { next, pulses } = nextHeatEntries(prev);
        setPulseCodes(pulses);
        return next;
      });
    }, 150);

    const syncId = setInterval(() => {
      const nextDisplay = {};
      entriesRef.current.forEach((entry) => {
        nextDisplay[entry.code] = entry.heat;
      });
      setDisplayHeats(nextDisplay);
    }, 1200);

    return () => {
      clearInterval(pulseId);
      clearInterval(syncId);
    };
  }, []);

  React.useEffect(() => {
    if (!pulseCodes.length) return undefined;
    const clearId = setTimeout(() => setPulseCodes([]), 280);
    return () => clearTimeout(clearId);
  }, [pulseCodes]);

  const activeTab = TASK_TABS[tab];
  const activeTasks = TASKS[activeTab.key];

  function triggerHeatBurst() {
    const burstId = burstIdRef.current + 1;
    burstIdRef.current = burstId;
    const particles = Array.from({ length: 12 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 12;
      const radius = 20 + (index % 4) * 6;
      return {
        id: `${burstId}-${index}`,
        dx: `${Math.round(Math.cos(angle) * radius)}px`,
        dy: `${Math.round(Math.sin(angle) * radius)}px`,
      };
    });

    setMyHeat((prev) => prev + 1);
    setHeatFlash(true);
    setHeatPopTick((prev) => prev + 1);
    setHeatBursts((prev) => [...prev, { id: burstId, particles }]);
    window.sfx?.play?.('coin');

    window.setTimeout(() => setHeatFlash(false), 220);
    window.setTimeout(() => {
      setHeatBursts((prev) => prev.filter((burst) => burst.id !== burstId));
    }, 520);
  }

  return (
    <PageShell
      title="HELLOTALK WORLD CUP"
      subtitle="HelloTalk 世界杯 · 赛季任务中枢"
      onBack={onBack}
      darkHeader
      bg="repeating-linear-gradient(45deg, #2E7D32 0 20px, #4CAF50 20px 40px)"
    >
      <PixelWorldMapBanner />
      <PixelStadiumStand />
      <PitchLine />
      <HeatChart entries={entries} displayHeats={displayHeats} pulseCodes={pulseCodes} myCountryCode={MY_COUNTRY_CODE} toast={toast} />
      <PitchLine />

      <Card style={{ marginTop: 12, background: PX.red, borderColor: PX.sunYellow, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="soft-pulse" style={{ transform: 'scale(2.7)' }}>
            <PixelFlag code="cn" px={12} />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <PixelFlag code="cn" px={7} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 13,
              color: '#fff',
              fontWeight: 700,
            }}>中国</div>
            <div style={{
              marginTop: 4,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: PX.sunYellow,
            }}>MY COUNTRY · RANK #3</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              onClick={triggerHeatBurst}
              style={{
                position: 'relative',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              <div
                key={heatPopTick}
                className={heatPopTick ? 'heat-pop' : ''}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 20,
                  color: heatFlash ? PX.red : PX.sunYellow,
                  textShadow: `2px 2px 0 ${PX.night}`,
                }}
              >{myHeat} HEAT</div>
              {heatBursts.map((burst) => (
                <div key={burst.id} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  {burst.particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="particle-burst"
                      style={{
                        '--dx': particle.dx,
                        '--dy': particle.dy,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: 4,
                        height: 4,
                        marginLeft: -2,
                        marginTop: -2,
                        background: PX.sunYellow,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 2,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 6,
              color: PX.sunYellow,
            }}>HEAT</div>
          </div>
        </div>
        <div
          onClick={() => toast('切换应援国家 · 剩 1 次')}
          className="pixel-btn"
          style={{
            marginTop: 10,
            padding: '8px 10px',
            background: PX.sunYellow,
            color: PX.night,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            textAlign: 'center',
            border: `3px solid ${PX.night}`,
            boxShadow: `3px 3px 0 ${PX.night}`,
            cursor: 'pointer',
          }}
        >
          切换应援国家 · 剩 1 次
        </div>
      </Card>

      <SeasonFilmStrip />

      <PassCard
        unlocked={showPassUnlocked}
        onOpenIntro={() => setShowPassIntro(true)}
        onOpenTracks={() => setShowPassTracks(true)}
      />

      <SecHead title="TODAY TASKS" sub="完成任务 · 为国家积累热力" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 8 }}>
        {TASK_TABS.map((item, index) => (
          <div
            key={item.key}
            onClick={() => setTab(index)}
            className="pixel-btn"
            style={{
              padding: '8px 4px',
              cursor: 'pointer',
              textAlign: 'center',
              background: tab === index ? item.color : PX.cream,
              color: PX.night,
              border: `3px solid ${PX.night}`,
              boxShadow: tab === index ? `1px 1px 0 ${PX.night}` : `3px 3px 0 ${PX.night}`,
            }}
          >
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: PX.night,
            }}>{item.label}</div>
            <div style={{
              marginTop: 4,
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 10,
              color: PX.night,
              fontWeight: 700,
            }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <Card>
        {activeTasks.map((task, index) => (
          (() => {
            const colors = KIND_COLOR[task.kind] || { bg: PX.cream, fg: PX.night };
            return (
              <div
                key={`${task.n}-${index}`}
                onClick={() => toast(`任务详情 · ${task.n}`)}
                className="pixel-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 2px',
                  borderBottom: index < activeTasks.length - 1 ? `2px dashed #D4D4E3` : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  background: colors.bg,
                  border: `2px solid ${PX.night}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `2px 2px 0 ${PX.night}`,
                  flexShrink: 0,
                }}>
                  <PxIcon kind={task.kind} size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: 12,
                    color: PX.night,
                    fontWeight: 700,
                  }}>{task.n}</div>
                  <div style={{
                    marginTop: 4,
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 7,
                    color: '#6B6B83',
                  }}>
                    {task.d} · <span style={{ color: PX.darkRed }}>{task.r}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Tag color={task.p >= task.max ? PX.grassGreen : PX.gold}>
                    {task.rep || `${task.p}/${task.max}`}
                  </Tag>
                </div>
              </div>
            );
          })()
        ))}
      </Card>

      {showPassIntro && (
        <PassIntroModal
          onClose={() => setShowPassIntro(false)}
          onTracks={() => {
            setShowPassIntro(false);
            setShowPassTracks(true);
          }}
          onUnlock={() => {
            setShowPassUnlocked(true);
            setShowPassIntro(false);
            toast('通行证已开通');
          }}
        />
      )}

      {showPassTracks && <PassTracksModal onClose={() => setShowPassTracks(false)} />}
    </PageShell>
  );
}

Object.assign(window, { P10Page, ALL_CODES });
Object.assign(window, { GermanFrame, GermanBubble, GermanBg });
