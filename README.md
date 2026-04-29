# HelloTalk 2026 世界杯 H5 · 像素风 Demo

**线上地址**：<https://worldcup.jekae.com>
**项目根**：`/Volumes/Loom/DataHub/CV/jekae/dev/worldcup_claudedesign/`
**一键部署**：`./deploy.sh`
**最后更新**：2026-04-27 · HOME 欢迎页接入 image2 分元素素材 · 全层动效 · 不使用整图贴底

## 项目定位

HelloTalk 为 **2026 FIFA 世界杯**（6/12–7/19）设计的移动端 H5 活动页原型。

- 风格：**8-bit / 16-bit 像素风**（steps() 帧动画 · 阶梯像素角 · `'Press Start 2P'` 英文字体）
- 定位：**管理层 demo**，核心是让人看了有"想玩"的感觉
- 原则：**视觉风格一致性 > 功能完备性 > 数据真实性**
- 规范对齐：《2026 世界杯大活动系统方案 v3》9 章面向用户内容已对齐

## 核心概念演进

### 阶段 1 · 原型分三轮生成（2026-04-22 初始化前）
Claude Design 分三轮生成 26 页完整原型。

### 阶段 2 · 方案对齐 · Plan C Wave 1/2/3（2026-04-22）
对照方案文档全面补齐缺失玩法（P11 宝箱/福袋闭环、P12 爆款礼、P14 圈子、H0 分享、16 国皮肤、球星像素图、P3 4 阶段演示）。

### 阶段 3 · HelloTalk 世界杯品牌化 + P10 重构（2026-04-23）
产品定位升级："开口即进球" 单点活动 → **HelloTalk 世界杯整体赛季**。P10 从"语音小游戏"重构为"**赛季任务中枢**"。

### 阶段 4 · P10 亮点升级 A+B+C+D+E（2026-04-23）
五组剧场感亮点：LIVE Ticker / 喧哗看台 / 赛季胶片带 / 解说员 + ON AIR / 微交互三件套。

### 阶段 5 · 绿茵场主题 + 五彩斑斓（2026-04-23）
从 3 色（奶白+夜蓝+金）扩到 15 色斑斓马赛克。世界地图横幅 / 斜草纹底 / 三卡分色 / 任务图标按 kind 分 10 色。

### 阶段 6 · 入场漏斗 5 屏 + PX24 扩色板 + CC0 真实像素素材（2026-04-24）
把"平铺 26 页"改成"入场仪式→H0 主会场"的漏斗。左上 HOME 按钮是唯一触发口，点击打开 5 屏 overlay：

```
E1 Splash (真实球场图 pitch.png + 倒计时 + 国旗跑马灯)
   ↓ START
E2 选国 (48 国网格 + 搜索 + 3 条用途说明)
   ↓ 下一步 · 存 localStorage.wc_country
E3 看/玩/送 3 张横卡 (玩法分类)
   ↓ 看具体活动
E4 活动亮点 8 张卡 2×4 网格 (产品展厅)
   ↓ 领取球迷证
E5 球迷证登记 (宝箱开启动画 + 碎屑 + 球迷证 + 配置卡)
   ↓ 进入世界杯主会场
H0 (现有首页不动)
```

素材：OpenGameArt Football Pitch + Kenney Pixel Platformer / Tiny Town / UI Pack Pixel Adventure（CC0 · 私用不标注）。E1 hero 用真实球场图 + 自制像素广告牌。8 活动图标手写 24×24 多色分层 SVG。

同步新建 **pixel-v2.jsx** 像素精灵库（内联 SVG + 4 色分层 + shape-rendering:crispEdges），分辨率从 8×8 升到 16~24 方格，补齐 PixelHouseIcon / PixelStadiumHero / PixelTrophy2 / PixelChest2 / PixelPassport / PixelMascot / PixelStarBurst / PixelWatchIcon / PixelPlayIcon / PixelGiftIcon 共 10 款精细精灵。

### 阶段 7 · HOME 首屏 HTML/CSS 1:1 复刻（2026-04-25）
将 HOME 入口打开后的 E1 Splash 重做为 DOM + CSS 组合页面，按视觉稿 864×1821 的比例绝对定位，拆分为 logo、跳过按钮、语言气泡、主标题布幅、倒计时、球场、用户头像节点、聊天气泡、CTA、底部卖点栏等元素。不再使用整图贴底。

- **跳过**：点击图右上角「跳过」关闭 HOME overlay
- **开始交流**：点击图中「开始交流」进入后续选国流程

### 阶段 8 · image2 分元素重制 + 全层动画（2026-04-27）
基于用户提供的 864×1821 欢迎页图，用 image2 重新生成分元素素材板，再裁出头像、球场、足球等正式资源接入 E1 Splash。页面仍保持 DOM/CSS 分层，不用整张参考图或伪透明底。

- **新增素材**：`worldcup/assets/welcome/`，包含 `background-plate.png`、`title-banner.png`、`step-country/guide/highlights/activate-v2.png`、`image2-asset-sheet.png`、7 个头像、足球、球场图
- **分层复刻**：logo、跳过按钮、语言气泡、白布幅、标题、倒计时、连接虚线、CTA、底栏全部是 HTML/CSS 元素
- **全层动效**：image2 纯背景底板轻微漂移、12 条弧形彩带动态漂浮、纸屑下落、气泡浮动、布幅摆动、标题呼吸、球旋转、头像漂浮、虚线脉冲、CTA 呼吸
- **可访问性**：保留 `prefers-reduced-motion: reduce`，动效自动降级

部署快照：`https://worldcup-jekae-bpehs0rdr-moons-projects-cc633ac1.vercel.app`（已 alias 到 `https://worldcup.jekae.com`）

## 当前页面清单（共 26 页）

```
H0    主页 · HelloTalk 世界杯品牌入口
P1    焦点赛详情                    P10    HelloTalk 世界杯 · 赛季任务中枢（★ 演示亮点）
P2    48 国对抗总榜                 P10.1  学习中心（词汇/跟读/语伴）
P2.1  国家详情                      P10.2  任务详情
P3    射门玩法（4 阶段演示）         P10.3  付费商店
P4    官频开播专区列表               P11    组队对战（重头戏）
P5    短视频分类列表                 P12    国家礼物大厅（16 款含爆款 4 枚）
P5.1  视频播放                      P13    陪看房间内
P6    比分竞猜                     P13.1  进球解说录制
P7    个人战绩 / 奖励                P14    圈子广场（投票/打赏/国家话题 18 格）
P8    规则说明（11 节折叠）          P15    文化专区
P9    分享邀请                     P16    连胜打卡日历
                                   P17    线下 Meetup
                                   P18    私聊话题包
                                   P19    宝箱 / 福袋展示
```

## 源码结构（`worldcup/` 目录）

```
worldcup/
├── index.html            · 路由 map + App 组件 + NavPanel + 左上 MuteButton + jumpTo 动画
├── vercel.json           · Cache-Control 头（防 Safari 缓存老版本）
├── sfx.js                · 8-bit 音效播放层（window.sfx） + muted 模块状态
├── bgm.js                · BGM 播放层（window.bgm） + muted 模块状态 + 后台 suspend
├── components.jsx        · PX 配色 / PhoneFrame / PixelFlag（10 国） / PixelTrophy / PxIcon（12 种 kind）
│                            PixelStar（6 球星） / PixelCommentator / PixelFan / PitchLine / PixelWorldMapBanner
├── page-chrome.jsx       · PageShell / Card / PixelBox / Tag / ProgressBar / SecHead / TabBar / FlagRow
├── pixel-v2.jsx          · 第二代精灵（SVG + shape-rendering:crispEdges + 4 色分层）
│                            PixelSprite / PixelHouseIcon / PixelStadiumHero / PixelTrophy2 / PixelChest2
│                            PixelPassport / PixelMascot / PixelStarBurst / PixelWatchIcon / PixelPlayIcon / PixelGiftIcon
├── onboarding.jsx        · 入场漏斗 4 屏（E1 Splash → E2 选国 → E3 玩法导览 → E4 通行证激活）
│                            全屏深紫星空 overlay + 中央竖向面板 · localStorage.wc_country 持久化
│                            入口唯一：仅左上 HOME 按钮触发
├── home.jsx              · H0 + HelloTalk 世界杯品牌 + TodayBanner + CheckInModule + TreasureEntry
├── p1-p3.jsx             · P1-P3（P3 含 4 阶段传球/过人/射门/进球演示）
├── p4-p9.jsx             · P4-P9（官频/短视频/竞猜/战绩/规则/分享）
├── p10.jsx               · HelloTalk 世界杯赛季任务中枢（★ 全面重构）
├── p10-sub.jsx           · P10.1/.2/.3 三子页
├── spec.jsx              · ★ SpecModal：中间拉长 H0 手机 + 左 6 右 8 共 14 张章节卡 + 章五 P12 底部独立卡 + SVG 点线+像素三角头箭头
├── p11*.jsx              · P11 组队对战（pitch / gifts / effects / modals / 主编排）含宝箱福袋闭环
├── p12-p15.jsx           · P12-P15（礼物大厅 16 款含爆款 4 枚 / 陪看房 / 录制 / 圈子 / 文化）
├── p16.jsx               · 连胜日历（Banner + 月历 + 集合页 4 Tab 弹窗）
├── p17-p19.jsx           · P17/P18/P19（Meetup 12 城/话题包 5 类/宝箱福袋详情）
└── assets/
    ├── sfx/              · 34 个 Kenney CC0 音效 · 312KB
    ├── bgm/              · 3 条循环 BGM · 732KB + ATTRIBUTION.txt
    └── welcome/          · image2 分元素素材板 + 头像/球场/足球裁切资源
```

## P10 · HelloTalk 世界杯赛季任务中枢（演示核心页）

### 结构（从上到下）

1. **PageShell Header** · HELLOTALK WORLD CUP · HelloTalk 世界杯 · 赛季任务中枢（深夜蓝 + 金字）
2. **五彩世界地图横幅**（`PixelWorldMapBanner`）· 48 块国旗色马赛克 + 独立 flash 动画 + 中央 "HELLOTALK WORLD CUP" 金字
3. **喧哗像素看台带**（`PixelStadiumStand`）· 3 排 90 个观众小像素人，墨西哥人浪 + 随机 bounce
4. **白色球场分隔线**（`PitchLine`）× 3
5. **SecHead** · HEAT CHART · Top 10 · 实时动态
6. **独立 LIVE Ticker**（`PixelTicker`）· 38px 高新闻带，16 条国家+热力/排名播报循环滚动
7. **HeatChart 柱状图**（深草绿底 + 白线 + 足球角标）· Top 10 实时动态（柱高 150ms 心跳 / 数字 1.2s 刷 / 排名自然换位）· 左上 `PixelCommentator` + ON AIR 红标
8. **我国大卡**（中国红底 + 国旗半透明纹理）· 1280 HEAT 数字点击爆炸（12 粒子 + coin 音效 + 数字 +1）
9. **SeasonFilmStrip** 赛季胶片带 · 5 里程碑节点（预热→小组赛→16强→半决赛→决赛）· 500ms 动态推进循环演示
10. **PassCard 通行证大卡**（金橙斜分 + 奖杯纹理 + shimmer 金光扫过）· 2488 金币 / 原价 3888 划掉 / "立即出战" 红底金字 CTA · 点开 PassIntroModal
11. **TODAY TASKS** 四 Tab（STUDY/SOCIAL/PAID/MATCH）+ 21 条任务列表 · 图标按 kind 分 10 色

### 通行证系统

- **PassIntroModal**（非全屏，顶部透出 60px 底层）· 6 项权益卡（头像框/气泡/背景/+20% 热力/补签卡×3/20 阶轨道）· 德国队母版预览（`GermanFrame` / `GermanBubble` / `GermanBg` 黑红金三色）· 20 阶双轨预览 5 节点
- **PassTracksModal** 20 阶双轨完整表（T1-T20，FREE 轨 + VIP 轨并排，VIP 列挂锁示意）

## 右侧 NavPanel（色条分组版 · 1 说明页 + 19 子项 + 2 分隔条）

按方案 4.1「活动页 6 模块」+ HT 自造扩展重组为 7 大模块逻辑分组。去掉模块头避免与子项重复，改用每个子项**左侧 5px 色条**做视觉分组识别。

```
【★ H5 说明页】            金色，打开 SpecModal 弹窗

▍官频开播专区  P4          绿 #4CAF50  模块一·官频开播
▍陪看房        P13         绿 #4CAF50  模块一·延伸

▍48 国对抗总榜 P2          金 #FFC107  模块二

▍射门玩法      P3          蓝 #2196F3  模块三

▍组队对战      P11         红 #E53935  模块四·房间玩法
▍宝箱福袋展示  P19         红 #E53935  模块四·3.1 中+顶层
▍国家礼物大厅  P12         红 #E53935  章五物料（送礼源头）

▍每日焦点赛    P1          橙 #FF9800  模块五
▍比分竞猜      P6          橙 #FF9800  模块五·衍生

▍短视频瀑布流  P5          紫 #9C27B0  模块六

▍HelloTalk 世界杯·赛季中枢 P10   深红 #C62828  HT 自造扩展

── 周边 ──
▍分享邀请      P9          蓝灰 #78909C  章六·市场增长
▍连胜打卡日历  P16         蓝灰 #78909C  章七
▍文化日        P15         蓝灰 #78909C  章七·延伸
▍信息流与圈子  P14         蓝灰 #78909C  章八
▍私聊话题包    P18         蓝灰 #78909C  章九.2
▍线下 Meetup   P17         蓝灰 #78909C  章九.3

── 辅助 ──
▍个人战绩      P7          灰 #9E9E9E
▍活动规则      P8          灰 #9E9E9E
```

第 1 项 `H5 说明页` 点击 → 打开 SpecModal 全局弹窗（见下方 SpecModal 章节）。
其他 19 项子项点击 → 对应 H0 锚点存在的走电影化跳转（5.4 秒动画）；`skipAnchor:true` 的子项（组队对战/宝箱福袋/礼物大厅/文化日/话题包/Meetup）直接 setPage 跳转。

点击按钮后的跳转节奏（电影化 4 段式，总 ~5.4 秒）：
1. **0-2.1s** · 自定义 `animateScrollTo` 慢速滑动到 H0 对应锚点（easeInOutQuad 缓动，模仿人手）
2. **2.1-2.25s** · 停顿 150ms + `click_soft` 轻提示音
3. **2.25-5.25s** · 红框闪烁 **6 下 3 秒**（`@keyframes flashRed6x`）
4. **5.25s** · `page_in` 音 + `setPage(targetPage)` 进入详情页，自动滚到顶

**锚点居中算法**：`targetScrollTop = currentScroll + anchorTopInScroller - (scrollerH - anchorH) / 2`，让锚点中心与 scroller 中心对齐。Anchor 高于 scroller 时 fallback 顶部 20px 留白。顶部 3 个 Hero IconPill（share/record/rules）物理上 scrollTop 不能为负，clamp 到 0 后直接闪烁（锚点仍完整可见）。

`jumpingRef` 防动画中重入点击。

## H5 说明页 SpecModal（部门验收图解）

右侧 NavPanel 第一项 · 金色按钮 "H5 说明页" · 全屏弹窗（**不局限于手机演示框**）

### 弹窗规格
- overlay · `position:fixed inset:0 z-index:95 background:rgba(0,0,0,0.78)` · 点击空白关闭
- 面板 · `top:20 bottom:20 left:50% transform:translateX(-50%) max-width:1280px` · PX.cream 底 + 4px solid PX.night + 硬阴影
- 顶部 sticky header：标题 + 副标 + 9 章色标 Legend + 右上 X 关闭
- Esc 键也能关闭

### 主体结构：H0 主页图解

- 中间：拉长展开的 H0 主页（从 TopBar 到 Footer 一屏全展开，`pointer-events:none` 禁止点击）
- 左侧 6 张章节卡：辅助战绩规则 / 章六 分享增长 / 章一 官频陪看 / 章三 组队对战 / 章二 短视频 / 章八 圈子
- 右侧 8 张章节卡：章七 日历 / 章四·1 焦点赛 / 章四·6 HT 世界杯 / 章四·2 总榜 / 章四·3 射门 / 章四·5 竞猜 / 章四·4 宝箱福袋 / 章九·3 Meetup
- 每张卡绝对定位，`top` 由 `useLayoutEffect` 按对应 H0 锚点的中心 Y 自动对齐
- SVG 点线（`stroke-dasharray:3 3`）+ 像素三角箭头 从卡片近手机一侧中点 → 手机内对应 anchor 的近卡片一侧中点

### 底部 3 张玩法特写卡（无 H0 锚点，独立说明）

- 章三 组队对战 P11（红底）· 语音聊天室红蓝对抗基础上的足球应援外皮
- 章四·6 HelloTalk 世界杯 P10（金底）· 方案里该品牌名下的所有内容统一归属
- 章五 物料与礼物资产 · 国家礼物大厅 P12（紫底）· 章五唯一承接页

### 跳转联动
每张卡片底部 "去看 Pxx" 按钮，点击后：
- 关闭 SpecModal
- 自动 `setPage(targetPage)` 跳到对应详情页
- 详情页自动从顶部开始显示

### 给部门的使用方式
1. 打开网站 → 点 NavPanel 第 1 项 "H5 说明页" → 弹窗打开
2. 在中间拉长的 H0 上按章节色标找到自己部门对应的模块
3. 点对应卡片的 "去看 Pxx" 跳到详情页 → Esc 或 X 关弹窗回图解 → 继续下一项

## 音频系统

### 全局静音按钮（左上角 MuteButton · index.html）
- 同时控制 sfx + bgm，状态持久化 `localStorage['wc_muted']`
- 两态视觉：奶白底 + 像素小喇叭"SOUND"（未静音，opacity 0.82）/ 红底 + 喇叭带 × "MUTED"（静音，opacity 1）
- 小屏 ≤720px 自动缩小

### SFX（`sfx.js` · `window.sfx`）
- 34 个 CC0 音效文件（Kenney interface/ui/digital/impact 精选）
- Audio pool 每音效 1 实例，启动 preload
- 音量 0.12 · 节流 80ms · iOS 首触统一解锁
- API：`play(name)` / `seq([{name,at}])` / `giftByPrice(coin)` / `goalBurst()` / `mvpBurst()` / `hatTrickBurst()` / `setMuted(val)` / `isMuted()`

### BGM（`bgm.js` · `window.bgm`）
- 3 条循环曲：`theme.mp3`（8-bit 主题）· `stadium.mp3`（球场欢呼）· `room.mp3`（柔和喧哗）
- 启动即 `preloadAll()`，切页 400ms 淡入淡出
- 页面映射：P11/P1/P17 → stadium；P13 → room；P5.1/P13.1 → 无；其他 → theme
- 后台挂起：`visibilitychange + pagehide + blur + focus + pageshow` 五事件兜底，`pause() + volume=0` 双写
- API：`setPage(p)` / `stop()` / `setVolume(v)` / `setMuted(val)` / `isMuted()`

## 像素组件库（`components.jsx`）

### 基础
- `PX` 调色板（grassGreen / skyBlue / sunYellow / red / gold / cream / night / darkRed 等）
- `PhoneFrame` · iPhone 15 Pro 机框（CSS var 响应式）
- `Card` / `PixelBox` / `PixelButton`

### 像素图元
- `PixelFlag`（10 国：ar/en/br/de/fr/es/cn/pt/nl/jp）
- `PixelBall` / `PixelCloud` / `PixelGoal` / `PixelChest` / `PixelPouch` / `PixelDice` / `PixelTrophy` / `PixelStadium`
- `PixelStar`（messi / ronaldo / neymar / kane / mbappe / haaland 像素球星）
- `PixelRing`（进度环）

### PxIcon（12 种 kind）
`back / calendar / trophy / info / share / chev / frame / bubble / scene / bolt / ticket`（每 kind 8×8 像素矩阵，多色支持）

### P10 专属
- `PixelCommentator`（24×24 解说员 + 耳机 + 麦克风）
- `PixelFan`（6×8 观众，配色变量）
- `PitchLine`（4px 白色球场边线 + 硬阴影）
- `PixelWorldMapBanner`（48 块国旗色马赛克 + flash 动画）

## 动画关键帧清单（`index.html`）

### 基础（初始）
blink / haloPulse / cloudDrift / ballRoll / ballWobble / chestShake / chestOpen / pouchGlow / pouchUnlock / diceRoll / ...

### P11 组队对战
idleSway / crowdBounce / tugShake / scoreBump / adUp/adDown / ballJitter / fwBurst / confettiFall / champDrop/champSpray / drumShake / arcAR/arcBR / smokeUp / tomFall / shoeAR/shoeBR / refPop / varTV/varGlitch / goalSlide / flagScroll / starDrop / trophyDescend / goldSparkle / shirtWave / whistlePop / hatBounce / tickerFly

### 方案 C Wave
chestOpen · pouchUnlock · passTrail · shootFly · netShake

### P10 亮点升级
heatBarPulse / heatBarGrow / goldGlow / modalSlideUp · tickerSlide / crowdBounce2 / mexicanWave / shimmerSweep / particleBurst / heatPopScale / filmNodePulse

### 绿茵场主题
mapFlash / softPulse

所有动画强制使用 `steps()` 帧跳，禁止 ease/linear 平滑补间。

## 开发工作流

### 修改代码 → 部署
```bash
cd /Volumes/Loom/DataHub/CV/jekae/dev/worldcup_claudedesign
# 改任意 jsx / html / js / sfx / bgm
./deploy.sh
```

`deploy.sh` 流程：`vercel --prod` → 解析 deployment URL → `vercel alias set worldcup.jekae.com` → curl 200 冒烟验证，日志落 `/Volumes/Loom/DataHub/Cache/CLI/worldcup-deploy-YYYYMMDD-HHMMSS.log`。

### 本地预览
直接双击 `worldcup/index.html` 在浏览器打开即可（`file://` + Babel Standalone 浏览器端转译）。

### Playwright 冒烟
```bash
cd /Volumes/Loom/DataHub/Cache/CLI/wc-pw-test
node p10-smoke.mjs        # P10 核心元素检查
node p10-highlights.mjs   # 5 组亮点 A-E
node p10-greenfield.mjs   # 绿茵场主题 7 项
```

### 加新页
1. 写新 jsx（复用 `PageShell` + 像素组件库）
2. `index.html` 两处：`<script src="...">` 挂载 + `pages` map 登记路由
3. `home.jsx` `DebugNav` 页码列表 + `index.html` `NAV_ENTRIES` 加入口（可选）
4. `./deploy.sh`

### 派 Codex 施工（多文件复杂改造）
Claude 负责：决策、沟通、规划、审查、部署、CHANGELOG
Codex 负责：代码执行（调 `~/.claude/skills/codex/scripts/ask_codex.sh` 带 `--workspace` / `--file` / `--reasoning high`）
派出去前写清 prompt：硬约束边界 + 设计规格 + 验证步骤 + 交付格式。

## 部署信息

- **Vercel**：`worldcup-jekae`（team `moons-projects-cc633ac1`，项目 ID `prj_eoGV9SUlZ4qFpL2iYUwsT69IHa5U`）
- **DNS**：Cloudflare `worldcup.jekae.com` CNAME → `cname.vercel-dns.com`（灰云）
- **SSL**：Vercel 自动签发
- **Deployment Protection**：已关（ssoProtection=null），公开访问
- **缓存策略**：`worldcup/vercel.json` 对 `/` / `.html` / `.jsx` / `.js` 全部 `no-cache, no-store, must-revalidate`（防 Safari 缓存老版本）
- **备份母版**：`backup/worldcup母版/`（冻结只读，首发时落的）

## 文档索引

- `HANDOFF.md` · 2026-04-22 初始化任务规范（原始需求，历史参考）
- `CHANGELOG.md` · 逐次改动流水（当前在维护，最新在文件头）
- `README.md` · 本文（项目总览）
- `文档/` · 业务方案文档
  - `2026世界杯大活动系统方案.docx` · v3 方案主文档
  - `世界杯H5活动方案_直播语聊.docx`
  - `世界杯-直播语聊内容方案.docx`

## 资源版权

| 类别 | 来源 | License |
|---|---|---|
| SFX × 34 | [Kenney.nl](https://kenney.nl/assets) | **CC0** 公共领域 |
| BGM `theme.mp3` | [Wolfgang_ / 8-Bit Battle Loop](https://opengameart.org/content/8-bit-battle-loop) | **CC0** |
| BGM `stadium.mp3` `room.mp3` | [Gregor Quendel / Free Crowd Cheering Sounds](https://opengameart.org/content/free-crowd-cheering-sounds) | **CC-BY 4.0**（署名见 `worldcup/assets/bgm/ATTRIBUTION.txt`）|

像素图元全部本项目自绘。

## 开发要点 · 踩坑清单

- **文字默认色**：`body` 默认 `#1A1A3E`（PX.night），`PageShell` 根 div 按 `bg` 自动切白/深。在深底卡片里写文本记得显式 `color: '#fff'`，否则会继承暗色看不见
- **比分/倒计时等带空格数字串**（如 `"2 : 1"`）必须 `whiteSpace: 'nowrap'`，窄屏会被拆行
- **新增 BGM/SFX**：同步 `NAMES`/`TRACKS`/`PAGE_TO_TRACK` 三个映射
- **新增页面**：三处同步 —— `index.html` `<script>` 挂载 + `pages` map + `NAV_ENTRIES`
- **iOS Safari `<audio>` 切后台会续播** → 五事件兜底 + `pause()+volume=0` 双写
- **视口高度** 用 `100dvh` 而非 `100vh`，iOS Safari URL 栏展开收起时自适应
- **锁定页面不滚动** = body `position:fixed + inset:0 + overscroll-behavior:none + overflow:hidden`
- **`<audio>` 不要换 `createMediaElementSource` 做 Web Audio 路由**（iOS 异步时序坑，会静音）
- **Safari 缓存** → `vercel.json` 加 `Cache-Control: no-cache`，用户刷新即可看到最新
- **Modal 内容超长** → `PixelModal` 改 flex column，内容 `flex:1 overflow:auto`，footer `flex:0` 永久锁底（不用 sticky）
- **弹窗非全屏** = 顶部 `margin: 60px auto 0` + `max-height: 85dvh` 透出底层
- **Codex sandbox 写权限** → 派 codex 时必须 `--workspace` 指到项目根
- **头像框/气泡/背景"三件套"** 德国队母版用黑红金三色条纹（`GermanFrame/GermanBubble/GermanBg`）
- **斜向双色块** 像素风兼容做法：`linear-gradient(45deg, A 50%, B 50%)` clip-path 式切分，不破坏像素硬边
- **48 块马赛克的动画错落** 用 `animationDelay: ${index * N}ms` 错开，避免整屏同步闪烁
- **`.phone-scroll` 切页不重置**：PhoneFrame 内层 scroll 容器跨页复用（children 换但 DOM 不换），因此 scrollTop 会"残留"上一页位置 —— 必须在 `setPage` useEffect 里显式 `el.scrollTop = 0` 复位
- **`scrollIntoView({smooth})` 太快**（~400ms），不适合演示级电影节奏，用 rAF + easeInOutQuad 自定义 1.4s 滑动才像人手

## 已知限制 / 待办

- `worldcup/ios-frame.jsx` 遗留未被引用，可删
- P10 热力榜"意大利"用西班牙国旗占位（`p10.jsx` `c === 'it' ? 'es' : c`），待补意大利 PixelFlag
- 背景音乐 CC-BY，商业发布需保留 ATTRIBUTION.txt 署名
- P10.1/.2/.3 三个子页在新主页无直接入口（只能 DebugNav 进），保留代码以防后期反悔
