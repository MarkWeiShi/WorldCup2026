const SPEC_COLORS = {
  aux: '#9E9E9E',
  one: PX.grassGreen,
  two: PX.skyBlue,
  three: PX.red,
  four: PX.gold,
  five: '#B388FF',
  six: '#CE93D8',
  seven: '#FFB74D',
  eight: '#4DD0E1',
  nine: '#8D6E63',
};

const SPEC_LEGEND = [
  { key: '辅', color: SPEC_COLORS.aux },
  { key: '一', color: SPEC_COLORS.one },
  { key: '二', color: SPEC_COLORS.two },
  { key: '三', color: SPEC_COLORS.three },
  { key: '四', color: SPEC_COLORS.four },
  { key: '五', color: SPEC_COLORS.five },
  { key: '六', color: SPEC_COLORS.six },
  { key: '七', color: SPEC_COLORS.seven },
  { key: '八', color: SPEC_COLORS.eight },
  { key: '九', color: SPEC_COLORS.nine },
];

const SPEC_LEFT_CARDS = [
  {
    id: 'left-record',
    side: 'left',
    target: 'anchor-record',
    color: SPEC_COLORS.aux,
    no: '辅助',
    title: '战绩/规则',
    desc: '领奖与规则认知支撑页',
    buttons: [
      ['去看 P7', 'P7'],
      ['去看 P8', 'P8'],
    ],
  },
  {
    id: 'left-share',
    side: 'left',
    target: 'anchor-share',
    color: SPEC_COLORS.six,
    no: '章六',
    title: '市场增长(分享)',
    desc: '分享邀请承接增长裂变',
    buttons: [['去看 P9', 'P9']],
  },
  {
    id: 'left-channel',
    side: 'left',
    target: 'anchor-channel',
    color: SPEC_COLORS.one,
    no: '章一',
    title: '官频开播+陪看房',
    desc: '官频列表与陪看链路入口',
    buttons: [
      ['去看 P4', 'P4'],
      ['去看 P13', 'P13'],
    ],
  },
  {
    id: 'left-room',
    side: 'left',
    target: 'anchor-room',
    color: SPEC_COLORS.three,
    no: '章三',
    title: '组队对战',
    desc: '红蓝阵营房内对抗主战场',
    buttons: [['去看 P11', 'P11']],
  },
  {
    id: 'left-shorts',
    side: 'left',
    target: 'anchor-shorts',
    color: SPEC_COLORS.two,
    no: '章二',
    title: '内容促播 短视频',
    desc: '短视频分发与播放承接',
    buttons: [
      ['去看 P5', 'P5'],
      ['去看 P5.1', 'P5.1'],
    ],
  },
  {
    id: 'left-circle',
    side: 'left',
    target: 'anchor-circle',
    color: SPEC_COLORS.eight,
    no: '章八',
    title: '信息流与圈子',
    desc: '圈子广场与话题表达场',
    buttons: [['去看 P14', 'P14']],
  },
];

const SPEC_RIGHT_CARDS = [
  {
    id: 'right-checkin',
    side: 'right',
    target: 'anchor-checkin',
    color: SPEC_COLORS.seven,
    no: '章七',
    title: '连胜打卡+48文化日',
    desc: '签到留存与文化日双承接',
    buttons: [
      ['去看 P16', 'P16'],
      ['去看 P15', 'P15'],
    ],
  },
  {
    id: 'right-focus',
    side: 'right',
    target: 'anchor-focus',
    color: SPEC_COLORS.four,
    no: '章四·1',
    title: '每日焦点赛',
    desc: '赛程焦点与竞猜入口',
    buttons: [['去看 P1', 'P1']],
  },
  {
    id: 'right-speak',
    side: 'right',
    target: 'anchor-speak',
    color: SPEC_COLORS.four,
    no: '章四·6',
    title: 'HT 世界杯赛季任务中枢',
    desc: '赛季主中枢与品牌主舞台',
    buttons: [['去看 P10', 'P10']],
  },
  {
    id: 'right-rank',
    side: 'right',
    target: 'anchor-rank',
    color: SPEC_COLORS.four,
    no: '章四·2',
    title: '48 国对抗总榜',
    desc: '国家荣誉榜与排名展示',
    buttons: [['去看 P2', 'P2']],
  },
  {
    id: 'right-shoot',
    side: 'right',
    target: 'anchor-shoot',
    color: SPEC_COLORS.four,
    no: '章四·3',
    title: '射门玩法 4 阶段',
    desc: '玩法演示与进度挑战页',
    buttons: [['去看 P3', 'P3']],
  },
  {
    id: 'right-predict',
    side: 'right',
    target: 'anchor-predict',
    color: SPEC_COLORS.four,
    no: '章四·5',
    title: '比分竞猜',
    desc: '奖池竞猜与赛果参与页',
    buttons: [['去看 P6', 'P6']],
  },
  {
    id: 'right-treasure',
    side: 'right',
    target: 'anchor-treasure',
    color: SPEC_COLORS.four,
    no: '章四·4',
    title: '宝箱福袋展示',
    desc: '宝箱福袋独立展示入口',
    buttons: [['去看 P19', 'P19']],
  },
  {
    id: 'right-meetup',
    side: 'right',
    target: 'anchor-meetup',
    color: SPEC_COLORS.nine,
    no: '章九·3',
    title: '线下 Meetup',
    desc: '线下观赛与城市活动承接',
    buttons: [['去看 P17', 'P17']],
  },
];

const SPEC_CARDS = [...SPEC_LEFT_CARDS, ...SPEC_RIGHT_CARDS];

function SpecLegendBlock({ item }) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        background: item.color,
        border: `2px solid ${PX.cream}`,
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 6,
        lineHeight: 1,
        color: PX.night,
      }}
      title={item.key}
    >
      {item.key}
    </div>
  );
}

function SpecMiniButton({ label, page, color, onAction }) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onAction(page);
      }}
      className="pixel-btn"
      style={{
        flex: 1,
        minHeight: 28,
        padding: '4px 8px',
        background: color,
        color: PX.night,
        border: `2px solid ${PX.night}`,
        boxShadow: `2px 2px 0 ${PX.night}`,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 8,
        lineHeight: 1.2,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function SpecCard({ card, top, registerRef, onAction }) {
  const pinLeft = card.side === 'left';
  return (
    <div
      ref={(node) => registerRef(card.id, node)}
      style={{
        position: 'absolute',
        top: Math.max(0, top || 0),
        width: 240,
        minHeight: 116,
        background: '#FFFFFF',
        border: `3px solid ${PX.night}`,
        boxShadow: `3px 3px 0 ${PX.night}`,
        padding: 10,
        [pinLeft ? 'right' : 'left']: 0,
      }}
    >
      <div style={{ height: 8, background: card.color, border: `2px solid ${PX.night}` }} />
      <div
        style={{
          marginTop: 6,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 8,
          lineHeight: 1.2,
          color: PX.night,
        }}
      >
        {card.no}
      </div>
      <div
        style={{
          marginTop: 4,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 15,
          fontWeight: 800,
          lineHeight: 1.25,
          color: PX.red,
        }}
      >
        {card.title}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 11,
          lineHeight: 1.4,
          color: PX.night,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {card.desc}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        {card.buttons.map(([label, page]) => (
          <SpecMiniButton key={`${card.id}-${label}`} label={label} page={page} color={card.color} onAction={onAction} />
        ))}
      </div>
    </div>
  );
}

function SplitBarPreview() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Press Start 2P', monospace", fontSize: 7 }}>
        <PixelFlag code="br" px={3} />
        <span style={{ color: PX.night }}>BR 1280</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: PX.night }}>1120 DE</span>
        <PixelFlag code="de" px={3} />
      </div>
      <div style={{ display: 'flex', height: 10, border: `2px solid ${PX.night}` }}>
        <div style={{ flex: 53, background: PX.red }} />
        <div style={{ flex: 47, background: '#2B7FE6' }} />
      </div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night, textAlign: 'center' }}>RED 53% · BLUE 47%</div>
    </div>
  );
}

function GiftTierPreview({ kind, label, priceOverride }) {
  const tiers = {
    low:  { icon: <PixelBall size={20} />,    price: '1-9' },
    mid:  { icon: <PixelFlag code="cn" px={3} />, price: '10-99' },
    high: { icon: <PixelTrophy size={22} />,  price: '100-999' },
    hot:  { icon: <PixelTrophy size={28} />,  price: '1000+' },
  };
  const t = tiers[kind];
  const displayPrice = priceOverride !== undefined ? priceOverride : t.price;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minWidth: 34 }}>
      <div style={{ position: 'relative', height: 30, display: 'flex', alignItems: 'center' }}>
        {t.icon}
        {kind === 'hot' && (
          <div style={{
            position: 'absolute', top: -4, right: -10,
            background: PX.red, color: '#fff',
            fontFamily: "'Press Start 2P', monospace", fontSize: 6,
            padding: '1px 3px', border: `1.5px solid ${PX.night}`,
            whiteSpace: 'nowrap',
          }}>HOT</div>
        )}
      </div>
      {displayPrice && (
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: PX.night,
          whiteSpace: 'nowrap',
        }}>
          {displayPrice}
        </div>
      )}
      {label && (
        <div style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          color: PX.night,
          whiteSpace: 'nowrap',
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

function HeatChartPreview() {
  const bars = [
    { code: 'BR', h: 58, c: '#FFDF00' },
    { code: 'AR', h: 54, c: '#75AADB' },
    { code: 'CN', h: 48, c: PX.red },
    { code: 'DE', h: 42, c: '#000000' },
    { code: 'FR', h: 36, c: '#002395' },
    { code: 'ES', h: 30, c: '#AA151B' },
  ];
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: 4, height: 64, background: PX.night, padding: 6, border: `2px solid ${PX.night}` }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ width: '100%', height: b.h, background: b.c, border: `1px solid ${PX.night}`, boxShadow: b.code === 'CN' ? `0 0 0 2px ${PX.sunYellow}` : 'none' }} />
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#fff' }}>{b.code}</div>
        </div>
      ))}
    </div>
  );
}

function PassCardMini() {
  return (
    <div style={{
      width: '100%', padding: 6,
      background: `linear-gradient(135deg, ${PX.gold} 0%, #FFA726 100%)`,
      border: `2px solid ${PX.night}`, boxShadow: `2px 2px 0 ${PX.night}`,
      display: 'flex', gap: 8, alignItems: 'center',
    }}>
      <PixelTrophy size={28} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night, lineHeight: 1.3 }}>SEASON PASS</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: PX.red, marginTop: 2 }}>2488</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: PX.night, marginTop: 1, textDecoration: 'line-through' }}>3888</div>
      </div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: PX.night, textAlign: 'center' }}>
        T3<br/>/20
      </div>
    </div>
  );
}

function ChestRewardPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PixelChest size={36} />
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: PX.sunYellow }}>+10%</div>
      </div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.3 }}>SETTLE BOX</div>
    </div>
  );
}

function PouchPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <PixelPouch size={34} />
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.3 }}>10K COIN<br/>UNLOCK</div>
    </div>
  );
}

// 德国队三件套预览组件直接复用 p10.jsx 挂到 window 上的 GermanFrame / GermanBubble / GermanBg
// （spec.jsx 在 p10.jsx 之后加载，这时 window.GermanFrame 已挂好）

const SPEC_BOTTOM_CARDS = [
  {
    id: 'bottom-battle',
    no: '章三',
    title: '组队对战',
    pageLabel: 'P11',
    background: SPEC_COLORS.three,
    textColor: '#FFFFFF',
    accent: PX.sunYellow,
    bodyShade: 'rgba(0,0,0,0.22)',
    summary: '在 3.5 版《直播语聊·组队对战》PRD 的 4V4 红蓝阵营基础上，叠加世界杯应援外皮，把语音聊天室的普通房内对抗改造成"国家队 vs 国家队"赛事化房战。下面是 P11 页面里 4 个核心模块的实际呈现。',
    previews: [
      {
        label: 'SPLIT BAR',
        caption: '红蓝阵营对抗进度条 · 实时送礼累计',
        visual: <SplitBarPreview />,
      },
      {
        label: '4 TIERS',
        caption: '4 档礼物对应 4 个赛事动作',
        visual: (
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'nowrap' }}>
            <GiftTierPreview kind="low"  priceOverride={null} label="传球" />
            <GiftTierPreview kind="mid"  priceOverride={null} label="过人" />
            <GiftTierPreview kind="high" priceOverride={null} label="射门" />
            <GiftTierPreview kind="hot"  priceOverride={null} label="进球" />
          </div>
        ),
      },
      {
        label: 'CHEST',
        caption: '结算触发宝箱 · 阵营消耗 10% 返还',
        visual: <ChestRewardPreview />,
      },
      {
        label: 'POUCH',
        caption: '福袋 1 万币累送解锁 · 稀有礼物',
        visual: <PouchPreview />,
      },
    ],
    buttons: [['去看 P11', 'P11']],
  },
  {
    id: 'bottom-htwc',
    no: '章四·6',
    title: 'HelloTalk 世界杯',
    pageLabel: 'P10',
    background: SPEC_COLORS.four,
    textColor: PX.night,
    accent: PX.red,
    bodyShade: 'rgba(255,255,255,0.45)',
    summary: '方案里"HelloTalk 世界杯"品牌名下的全部内容统一归到这一页——跨国对抗 + 语言学习 + 赛季化商业的主中枢。下面是 P10 页面里 5 个核心模块的实际呈现。',
    previews: [
      {
        label: 'HEAT TOP 10',
        caption: '48 国实时动态柱状 · 国旗色涂柱身 · 我国金边',
        visual: <HeatChartPreview />,
      },
      {
        label: 'AVATAR FRAME',
        caption: '中心留白=用户自己的头像 · 外围黑红金三色同心环装饰 · 4 角钻石 + 顶端 DE 小标',
        visual: <GermanFrame />,
      },
      {
        label: 'CHAT BUBBLE',
        caption: '空气泡+外围德国国旗角贴/足球/金红钻石装饰',
        visual: <GermanBubble />,
      },
      {
        label: 'CHAT BG',
        caption: '顶部国旗带+月亮+勃兰登堡门夜景+聊天气泡浮层',
        visual: <GermanBg />,
      },
      {
        label: 'SEASON PASS',
        caption: '通行证 2488 币 · 6 项权益 · 20 阶双轨',
        visual: <PassCardMini />,
      },
    ],
    buttons: [['去看 P10', 'P10']],
  },
  {
    id: 'bottom-gifts',
    no: '章五',
    title: '物料与礼物资产·国家礼物大厅',
    pageLabel: 'P12',
    background: SPEC_COLORS.five,
    textColor: PX.night,
    accent: PX.night,
    bodyShade: 'rgba(255,255,255,0.45)',
    summary: '方案章五「物料与礼物资产」的唯一 H5 承接页。48 国 × 4 档共 16 款礼物资产清单，按档位展示视觉与单价。本页在 H0 主页没有显性入口，从说明页或 DebugNav 直达。下面是 4 个档位的代表性视觉。',
    previews: [
      {
        label: '低价 · 1-9 币',
        caption: '足球 / 口哨 / 黄牌 / 红牌 · 弹射 2s · 破冰',
        visual: <GiftTierPreview kind="low" />,
      },
      {
        label: '中价 · 10-99 币',
        caption: '国旗 / 球衣 / 围巾 / 应援棒 · 全屏国旗动画',
        visual: <GiftTierPreview kind="mid" />,
      },
      {
        label: '高价 · 100-999 币',
        caption: '金球 / 奖杯模型 / 球星卡 · 3D 动效 5s',
        visual: <GiftTierPreview kind="high" />,
      },
      {
        label: '爆款 · 1000+ 币',
        caption: '大力神杯 / 冠军金戒 / 全家福 / 冠军之光',
        visual: <GiftTierPreview kind="hot" />,
      },
    ],
    buttons: [['去看 P12', 'P12']],
  },
];

function SpecBottomCard({ card, onAction }) {
  return (
    <div
      style={{
        background: card.background,
        border: `3px solid ${PX.night}`,
        boxShadow: `4px 4px 0 ${PX.night}`,
        padding: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 14,
          flexWrap: 'wrap',
          paddingBottom: 12,
          marginBottom: 14,
          borderBottom: `2px dashed ${card.textColor}`,
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 11,
            color: card.textColor,
            lineHeight: 1.2,
            padding: '4px 8px',
            background: card.bodyShade,
            border: `2px solid ${card.textColor}`,
          }}
        >
          {card.no}
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 200,
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: card.accent,
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 16,
            color: card.accent,
            background: card.bodyShade,
            padding: '5px 12px',
            border: `2px solid ${card.textColor}`,
          }}
        >
          {card.pageLabel}
        </div>
      </div>

      <div
        style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.6,
          color: card.textColor,
          marginBottom: 16,
        }}
      >
        {card.summary}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
        }}
      >
        {card.previews.map((pv, i) => (
          <div
            key={i}
            style={{
              background: card.bodyShade,
              border: `2px solid ${card.textColor}`,
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                minHeight: 76,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
              }}
            >
              {pv.visual}
            </div>
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 8,
                color: card.accent,
                lineHeight: 1.2,
                letterSpacing: 0.5,
                paddingTop: 6,
                borderTop: `1.5px dashed ${card.textColor}`,
              }}
            >
              {pv.label}
            </div>
            <div
              style={{
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 11,
                lineHeight: 1.45,
                color: card.textColor,
                fontWeight: 600,
              }}
            >
              {pv.caption}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, gap: 8 }}>
        {card.buttons.map(([label, page]) => (
          <button
            key={label}
            onClick={(event) => {
              event.stopPropagation();
              onAction(page);
            }}
            className="pixel-btn"
            style={{
              padding: '10px 18px',
              background: PX.cream,
              color: PX.night,
              border: `2px solid ${PX.night}`,
              boxShadow: `3px 3px 0 ${PX.night}`,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 11,
              cursor: 'pointer',
              letterSpacing: 1,
            }}
          >
            {label} →
          </button>
        ))}
      </div>
    </div>
  );
}

function SpecModal({ onClose, onJump }) {
  const overlayRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const leftColRef = React.useRef(null);
  const rightColRef = React.useRef(null);
  const cardRefs = React.useRef({});
  const [cardTops, setCardTops] = React.useState({});
  const [lines, setLines] = React.useState([]);

  const handleAction = React.useCallback((page) => {
    if (onClose) onClose();
    if (page && onJump) onJump(page);
  }, [onClose, onJump]);

  const registerCardRef = React.useCallback((id, node) => {
    if (node) {
      cardRefs.current[id] = node;
    } else {
      delete cardRefs.current[id];
    }
  }, []);

  const recalcCardTops = React.useCallback(() => {
    const container = bodyRef.current;
    const phone = phoneRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!container || !phone || !leftCol || !rightCol) return;

    const containerRect = container.getBoundingClientRect();
    const leftRect = leftCol.getBoundingClientRect();
    const rightRect = rightCol.getBoundingClientRect();
    const nextTops = {};

    SPEC_CARDS.forEach((card) => {
      const cardNode = cardRefs.current[card.id];
      const anchorNode = phone.querySelector(`#${card.target}`);
      if (!cardNode || !anchorNode) return;

      const anchorRect = anchorNode.getBoundingClientRect();
      const anchorCenterY = anchorRect.top - containerRect.top + anchorRect.height / 2;
      const colRect = card.side === 'left' ? leftRect : rightRect;
      const colOffsetY = colRect.top - containerRect.top;
      const top = anchorCenterY - colOffsetY - cardNode.offsetHeight / 2;
      nextTops[card.id] = Math.max(0, Math.round(top));
    });

    setCardTops((prev) => {
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(nextTops);
      if (prevKeys.length === nextKeys.length && nextKeys.every((key) => prev[key] === nextTops[key])) {
        return prev;
      }
      return nextTops;
    });
  }, []);

  const recalcLines = React.useCallback(() => {
    const container = bodyRef.current;
    const phone = phoneRef.current;
    if (!container || !phone) return;

    const containerRect = container.getBoundingClientRect();
    const nextLines = SPEC_CARDS.map((card) => {
      const cardNode = cardRefs.current[card.id];
      const anchorNode = phone.querySelector(`#${card.target}`);
      if (!cardNode || !anchorNode) return null;

      const cardRect = cardNode.getBoundingClientRect();
      const anchorRect = anchorNode.getBoundingClientRect();
      const isLeft = card.side === 'left';

      return {
        id: card.id,
        color: card.color,
        x1: Math.round((isLeft ? cardRect.right : cardRect.left) - containerRect.left),
        y1: Math.round(cardRect.top - containerRect.top + cardRect.height / 2),
        x2: Math.round((isLeft ? anchorRect.left : anchorRect.right) - containerRect.left),
        y2: Math.round(anchorRect.top - containerRect.top + anchorRect.height / 2),
      };
    }).filter(Boolean);

    setLines(nextLines);
  }, []);

  React.useLayoutEffect(() => {
    const recalc = () => {
      recalcCardTops();
      window.requestAnimationFrame(recalcLines);
    };

    const timer = window.setTimeout(recalc, 0);
    window.addEventListener('resize', recalc);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(recalc);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', recalc);
    };
  }, [recalcCardTops, recalcLines]);

  React.useLayoutEffect(() => {
    recalcLines();
  }, [cardTops, recalcLines]);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 95,
        background: 'rgba(0,0,0,0.78)',
      }}
    >
      <style>{`
        .spec-phone-wrap div[style*="position: sticky"],
        .spec-phone-wrap div[style*="position:sticky"] {
          position: static !important;
        }
      `}</style>
      <div
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        style={{
          position: 'fixed',
          top: 20,
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1280,
          width: 'calc(100vw - 40px)',
          background: PX.cream,
          border: `4px solid ${PX.night}`,
          boxShadow: '6px 6px 0 rgba(0,0,0,0.5)',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 4,
            height: 72,
            background: PX.night,
            borderBottom: `3px solid ${PX.sunYellow}`,
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 12,
                lineHeight: 1.4,
                color: PX.sunYellow,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              H5 说明页 · 2026 世界杯方案可视化落地
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: 11,
                lineHeight: 1.3,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              每个部门一眼定位: 你负责的活动在主页哪个模块
            </div>
          </div>

          <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
            {SPEC_LEGEND.map((item) => (
              <SpecLegendBlock key={item.key} item={item} />
            ))}
          </div>

          <button
            onClick={onClose}
            className="pixel-btn"
            style={{
              width: 36,
              height: 36,
              background: PX.sunYellow,
              color: PX.night,
              border: `3px solid ${PX.cream}`,
              boxShadow: `3px 3px 0 ${PX.shadow}`,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            X
          </button>
        </div>

        <div style={{ padding: 24 }}>
          <div ref={bodyRef} style={{ position: 'relative' }}>
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <defs>
                <marker
                  id="spec-arrow-head"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0,1 0,9 2,9 2,7 4,7 4,6 6,6 6,5 4,5 4,4 2,4 2,2 0,2" fill={PX.night} />
                </marker>
              </defs>
              {lines.map((line) => (
                <line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={PX.night}
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  markerEnd="url(#spec-arrow-head)"
                />
              ))}
            </svg>

            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 360px 1fr',
                gap: 24,
              }}
            >
              <div ref={leftColRef} style={{ position: 'relative' }}>
                {SPEC_LEFT_CARDS.map((card) => (
                  <SpecCard
                    key={card.id}
                    card={card}
                    top={cardTops[card.id]}
                    registerRef={registerCardRef}
                    onAction={handleAction}
                  />
                ))}
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  ref={phoneRef}
                  className="spec-phone-wrap"
                  style={{
                    width: 360,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    border: `3px solid ${PX.night}`,
                    boxShadow: `4px 4px 0 ${PX.night}`,
                    background: '#FFFFFF',
                  }}
                >
                  <HomePage onNav={() => {}} />
                </div>
              </div>

              <div ref={rightColRef} style={{ position: 'relative' }}>
                {SPEC_RIGHT_CARDS.map((card) => (
                  <SpecCard
                    key={card.id}
                    card={card}
                    top={cardTops[card.id]}
                    registerRef={registerCardRef}
                    onAction={handleAction}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
            {SPEC_BOTTOM_CARDS.map((card) => (
              <SpecBottomCard key={card.id} card={card} onAction={handleAction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SpecModal });
