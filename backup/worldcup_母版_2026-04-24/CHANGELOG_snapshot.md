# Changelog

## [2026-04-24]

- [回滚] E1 Splash 方案 B V1 动画层（worldcup/onboarding.jsx · worldcup/index.html · worldcup/assets/onb/sprites/）
  - 原因：用户反馈"效果太烂了"。抠出的 sprite 叠在底图上做原地动画：旋转时底图原件穿帮、球员底部带的草地纹理跟着跳违和、整体感觉"僵硬不自然"
  - 回滚动作：
    - `cp /Volumes/Loom/DataHub/Cache/CLI/wc-sprites/backup/onboarding.jsx worldcup/` 恢复
    - `cp /Volumes/Loom/DataHub/Cache/CLI/wc-sprites/backup/index.html worldcup/` 恢复
    - `rm -rf worldcup/assets/onb/sprites/`
    - 重部署 200 OK
  - 验证：onboarding.jsx 无 `SplashAnimLayer`，index.html 无 `splashSpin`/`splashTrophy` 等 5 个 keyframes
  - 工作区 `/Volumes/Loom/DataHub/Cache/CLI/wc-sprites/` 保留（含 backup / 原始抠图 / extract.py），如需重新试 B 方案可复用
  - E1 Splash 恢复为：静态 splash.png 底图 + 中间 UI 叠加（彩虹硬阴影 START + 淡黄胶囊 + 倒计时卡），这是用户满意的最后一个状态

- [新增] E1 Splash 方案 B V1 · 从静图抠 12 个 sprite 叠在底图上做原地动画（worldcup/onboarding.jsx · worldcup/assets/onb/sprites/ · worldcup/index.html）
  - 工作流: 手标 BBox → Pillow 裁图 + flood-fill 抠背景 → <img> 绝对定位 + CSS @keyframes steps 动画
  - 零安装 · 零 npm 新依赖 · 零服务器 · Pillow 11.3.0 已有
  - 12 个 sprite 总共 516 KB：1 trophy + 3 soccer balls + 7 players + 1 CHAMPIONS banner
  - 5 个 @keyframes 加到 index.html：splashSpin / splashSpinR（足球原地转）· splashTrophy（金杯 1→1.035 呼吸 + -2px 悬浮）· splashBounce（球员 ±3px 错峰微跳 · 7 人 0-0.9s delay 阶梯）· splashPulse（CHAMPIONS 横幅 1→1.06 呼吸）
  - 所有动画原地变换（rotate / scale / translateY ±3px），不涉及位移 → 不需要对 splash.png 做 inpaint
  - 坐标用百分比 percent 表达，自动适配不同面板宽度
  - 工作区: /Volumes/Loom/DataHub/Cache/CLI/wc-sprites/（含 backup/ + sprites/ + extract.py + sprites.json + 几张 zoom/contact 检查图 · 不占项目空间）
  - 备份: backup/onboarding.jsx + backup/index.html，如需回滚 cp 回来 + rm -rf sprites/ + 重部署，2 分钟恢复

- [修改] E1 START 按钮加彩虹硬阴影 + 提示胶囊改淡黄底（worldcup/onboarding.jsx · ObPrimaryBtn / ObSplash）
  - ObPrimaryBtn 新增 `rainbow` 可选 prop · true 时 boxShadow 换成 5 层 2px 递进堆叠：`#FFCDD2 (淡粉) → #FFF59D (淡黄) → #C8E6C9 (淡绿) → #BBDEFB (淡蓝) → PX24.night (夜蓝 anchor)`
  - 只 E1 START 开启 rainbow，E2/E3/E4/E5 的 CTA 保持单层夜蓝硬阴影（信息密度高的屏不过度抢眼）
  - "本次入场约 30 秒 · 1/5 开场仪式" 提示胶囊：rgba(26,26,62,0.82) 深底 + gold2 金字 → PX24.gold3 淡黄底 + PX24.night 夜蓝字 + 2px 红色小阴影，跟奶白主题更融合

- [修复] E1 Splash 内容位置下移避开 2026 主视觉（worldcup/onboarding.jsx · ObSplash）
  - 反馈：图裁短后 "2026" 文字往上挪了，但倒计时卡原来 justify-content:center 的位置没跟着调，叠在了 2026 上
  - paddingTop 40 / paddingBottom 200 / justifyContent center → paddingTop 280 / paddingBottom 10 / justifyContent flex-start
  - 倒计时卡现在从 y≈280 开始，正好落在 flag bunting（y≈200-260）下方的奶白留白区

- [修改] 入场漏斗整体收紧 · E2-E5 色调跟 E1 奶白图对齐（worldcup/onboarding.jsx · worldcup/assets/onb/splash.png）
  - 反馈：用户觉得面板太高 + 其他屏还是深紫底跟 E1 奶白图不匹配
  - 裁图：splash.png 从 920×1640 裁到 920×1400（PIL 切掉中间空白区 y:720-960 共 240px，拼接后底部内容保留完整）· 对应面板高 min(94dvh,820) → min(88dvh,700)
  - 面板背景：linear-gradient(night, #2A1A4E) → linear-gradient(cream2, cream, cream0)，E1 的图覆盖在上层不影响视觉
  - E2-E5 统一改造
    - 标题（Press Start 2P）金色 → 深红 `PX24.red` + 金黄 `PX24.gold3` 浅阴影（在奶白底上强对比跳出）
    - 正文文字 '#fff' → `PX24.night`；muted 浅白 rgba(255,255,255,0.7) → '#666' / '#555'
    - SKIP 按钮从透明描边金字 → 奶白底 + 夜蓝边 + 红色硬阴影
    - Back 按钮硬阴影从夜蓝 → 红色（呼应 E1 countdown 卡的双阴影风格）
    - 进度条填充 gold2 → red，空槽从 rgba(255,255,255,0.18) → rgba(26,26,62,0.15)
    - E2 搜索框阴影 gold2 → red；国家网格底 rgba(255,255,255,0.06) → PX24.cream2 + 夜蓝边 + 金阴影
    - E2 已选国家 highlight：被选时文字色 gold2 → red
    - E5 FAN PASS REGISTERED 文字 gold2 → red
  - 保持不变：深色 UI 元素（countdown 卡、CURRENT TEAM 条、START 按钮）故意保留深底 —— 作为浅色面板上的强对比焦点

- [修改] E1 Splash 全屏换成用户 Nano Banana 生成的亮色扁平像素画 splash.png（worldcup/assets/onb/splash.png · 920×1640 · 1.2 MB）
  - 背景：用户反馈"页面太暗、喜欢白底、不要立体感"。弃用原 pitch.png（暗色实景球场）
  - Prompt 走"亮色扁平像素 + 糖果马卡龙 + 任天堂系可爱美学"路线，参考 Animal Crossing / Pokémon / Kirby
  - 画布自带 FIFA WORLD CUP 2026 彩虹字母 logo、国旗串、两侧气球、彩色纸屑、音符、足球、金杯、7 个欢呼球员、底部国旗飘带、CHAMPIONS 小横幅 —— 视觉上构图完整，不需要 React 再叠
  - E1 改为 `position:absolute inset:0` 全屏 background-image，imageRendering:pixelated 保持锐利
  - 同步删除重复元素：
    - 原 React 渲染的 `WORLD CUP 2026` 金字 3 层硬阴影（图已内置 logo）
    - 原 `世界杯 · HelloTalk` 副标题（图已内置品牌）
    - 原底部国旗跑马灯 `.flag-scroll`（图底部已有飘带）
    - 原顶部 260px pitch.png hero + 深紫渐变过渡
  - 剩下只保留 UI 必须项，叠在图中央留白区：倒计时卡（深夜蓝底 + 金字 + 金边 + 双阴影，在奶白图上强对比）、START 按钮（红底，图自带暖色系背景里跳出）、`本次入场约 30 秒 · 1/5 开场仪式` 提示胶囊（深蓝底 + 金字 + 金边）
  - SKIP 按钮从深底金边改浅底深边（奶白底 + 夜蓝边 + 红色硬阴影）适配浅背景
  - 源图 `/Users/jk.lau/Downloads/ChatGPT Image 2026年4月24日 01_02_12.png` 941×1672 → Python PIL Lanczos 下采样到 920×1640（2x retina 尺寸）
  - pitch.png 保留未删（以备后续其他屏复用）

- [修改] 入场漏斗 4 屏 → 5 屏 · 扩色板 24 色 · 引入 Kenney / OpenGameArt 真实像素素材（worldcup/onboarding.jsx · worldcup/assets/onb/）
  - 背景：用户反馈"页面设计不够好看，色彩不够丰富，颗粒度不够细"。走 B 路径（下 CC0 素材直接用），目标让入口页视觉质量上来
  - 素材源（CC0 · 私用不标注）
    - **OpenGameArt Football Pitch**（chasersgaming · CC0）· pitch1.png 1296×672 真实像素球场图。Python PIL 清掉 4 个 OpenGameArt.org 水印并覆上自制 HELLOTALK / FIFA 2026 / WORLD CUP / HELLOTALK 彩色像素广告牌
    - **Kenney Pixel Platformer** · 180 个 16×16 彩色 tile，筛出 coin/gem/heart/key/door/bed/sign 作装饰素材库（放 worldcup/assets/onb/）
    - **Kenney Tiny Town / Pixel UI Pack Pixel Adventure** · 备用 pack 已下载在 Cache/CLI，未上阵
  - E1 Splash：顶部 260px 用真实球场 pitch.png 当 hero（不再手绘 SVG 球场），渐变过渡到深紫，`WORLD CUP 2026` 3 层硬阴影字放 hero 下方
  - E4 新增 "活动亮点 / WORLD CUP HIGHLIGHTS" 屏 · 8 张卡 2×4 网格 · 每张 = 左 4px 模块色条 + 白色图标盒 + 像素 SVG 活动图标（24×24 6 色分层）+ 中文名 + 一行描述
    - 8 张：官频开播 / 陪看房 / 48 国对抗总榜 / 射门玩法 / 组队对战 / 宝箱福袋 / 比分竞猜 / HelloTalk 赛季
    - 每张卡 accent 色沿用 NavPanel 色系（绿 / 金 / 蓝 / 红 / 橙 / 紫）
    - 卡片不跳转（按用户要求）
  - E5 球迷证登记 · 宝箱从 PNG 换回 SVG（Kenney tile_0032 识别错误实际是木桶 / 水），改用 24×24 手写 SVG `chest` + `chest_open` 两态，8 色分层（深木+主木+木高光+金饰+金高光+内部金光+sparkle+描边）
    - 开盖叠 radial gradient 金光 + 18 片彩色碎屑 confetti-fall
  - 色板扩展 PX24 · 7 色 → 24 色
    - 主色 4 层：night0/night/night2/night3 · red0/red/red2/red3 · gold0/gold/gold2/gold3 · green0/green/green2/green3 · blue0/blue/blue2/blue3 · cream0/cream/cream2
    - 装饰色：purple / purple2 / orange / orange2 / brown / brown2 / teal / pink
  - 顶部进度条从 3 格改 4 格（对应 E2/E3/E4/E5）
  - 全部 8 个活动图标新写在 onboarding.jsx 内的 ACT_ICONS · 每张 24×24 · 5-8 色分层，包括摄像机（官频）/ 电视+沙发（陪看房）/ 奖杯+48（总榜）/ 足球+网（射门）/ 双拳 VS（对战）/ 宝箱+sparkle（福袋）/ 骰子+问号（竞猜）/ 对话气泡+地球（HelloTalk）
  - pixel-v2.jsx 不动（老 sprite 保留给其他页面）
  - 其他页面（H0/P1-P19）完全不动 · 只改 onboarding.jsx + 新增 assets/onb/ 目录
  - 工作文件夹 /Volumes/Loom/DataHub/Cache/CLI/wc-kenney/ · 8 MB · 保留原始 zip + 预览 + 中间素材（可后续复用）

- [新增] 入场漏斗 4 屏 onboarding + 全局 HOME 按钮（worldcup/onboarding.jsx · pixel-v2.jsx · index.html · ~750 行）
  - 背景：原 H5 平铺直叙，用户从 H0 进来看不到"入场仪式 → 选阵营 → 玩法导览 → 激活通行证"的链路。加一层前置漏斗把平铺改成 4 步入场。
  - 视觉：全屏深紫星空 overlay + 中央 460×780 竖向面板（金黑描边 + 红硬阴影），跟 H5 像素美学一致
  - 流程
    - E1 Splash：大字 WORLD CUP 2026（3 层硬阴影）+ 倒计时 DD:HH:MM:SS 卡 + 12 国旗底部跑马灯 + START 入场
    - E2 选国：48 国网格（10 国走现有 PixelFlag，38 国走 3 色条 + 国旗代码回落）+ 搜索框 + 当前队伍卡 + 3 条用途说明
    - E3 玩法导览：看/玩/送 3 张横卡 · 蓝/黄/红 硬阴影 · 每张挂对应活动清单（每日焦点赛+陪看房+官频+短视频 / 射门+总榜+组队对战+竞猜 / 礼物大厅+宝箱+福袋+结算开箱）
    - E4 球迷证登记：像素宝箱开启动画（1.1s 震动 → 开盖露金光）+ 14 片彩色碎屑 confetti-fall + PixelPassport 球迷证徽本 + 配置卡（阵营国旗 + 中文名 + 首登礼包 100 积分 + ×3 首日加成 24h + 可进入 P10 + 付费通行证在 P10 内另行开通）
    - 区别于付费通行证：onboarding 只做免费身份登记，付费 pass 留给 P10 HelloTalk 世界杯 页面内开通，避免"没买就激活"的语义混淆
  - 任意屏右上 SKIP 直接退出；上下步之间挂 click_soft 音效；激活页挂 gift_boom + firework_pop×2；完成 done 挂 page_in
  - 持久化：localStorage.wc_country 保存所选国家 · localStorage.wc_onboarded 标记通关
  - 入口唯一：仅左上角新 HOME 按钮触发。NavPanel/DebugNav/H0 内部全部不触发 onboarding
- [新增] pixel-v2.jsx 第二代像素精灵库（worldcup/pixel-v2.jsx · 400+ 行）
  - 手法：内联 SVG + shape-rendering:crispEdges + 二维字符数组 + 4 色分层（O 描边 / H 高光 / 主色 / 阴影）
  - 原因：现有 PixelBall/PixelTrophy 用 CSS Grid 色块拼，8×8 格子 + 2~3 色无立体感，放大显平。新库走 16×16 ~ 24×24 + 4 色立刻有体积感
  - 精灵：PixelSprite（通用渲染器）· PixelHouseIcon（18×18 家按钮专用）· PixelStadiumHero（43×22 球场全景）· PixelTrophy2（24×24 金杯四色分层）· PixelChest2（24×20 宝箱 · 支持 open 开盖态）· PixelPassport（20×20 通行证本 · 金徽 + 金条）· PixelMascot（20×20 球衣小人 · wave 挥手态）· PixelStarBurst（16×16 星爆）· PixelWatchIcon/PixelPlayIcon/PixelGiftIcon（20×20 三大玩法图标）
- [新增] HOME 按钮样式（worldcup/index.html style 段 · .home-btn 类）
  - 位于左上 MUTE 按钮右侧并排（top:10 left:122，小屏 top:6 left:96）
  - 像素风 2px 夜蓝边 + 硬阴影 + 像素小房子图标 + HOME 文字
  - 悬停转金色、按下硬阴影归零产生按压位移
- [修改] index.html App 组件增加 onboardingActive state（worldcup/index.html）
  - 新增 HomeButton 小组件读 window.PixelHouseIcon 渲染
  - handleOpenOnboarding 开启时播 page_in 音效
  - handleCloseOnboarding 关闭时强制回 H0（保证用户从 onboarding 出来看到主页）
  - 在 script tag 顺序里，pixel-v2.jsx 排在 components.jsx 之后 / home.jsx 之前；onboarding.jsx 排在 spec.jsx 之后（依赖 PxIcon/PX/PixelFlag/FLAGS）

## [2026-04-23]

- [新增] 项目根 backup/ 目录 母版备份（worldcup_母版_2026-04-23/ · 1.6 MB 完整代码 + assets + CHANGELOG/README 快照）

- [修改] NavPanel 色条版：去掉 7 个模块头，改用每个子项左侧 5px 色条区分模块归属（worldcup/index.html）
  - 原因：带模块头版本太占纵向空间，且模块头文字和子项重复（"模块二·48 国总榜" 和 "48 国对抗总榜 P2" 同义）
  - 实现：每个子项 `style={{ boxShadow: 'inset 5px 0 0 <accent>, 2px 2px 0 rgba(0,0,0,0.55)' }}` · 同模块 accent 同色
  - 色条颜色：模块一绿 #4CAF50 · 模块二金 #FFC107 · 模块三蓝 #2196F3 · 模块四红 #E53935 · 模块五橙 #FF9800 · 模块六紫 #9C27B0 · HT 深红 #C62828 · 周边蓝灰 #78909C · 辅助灰 #9E9E9E
  - 行数从 7 头 + 19 子项 + 2 分隔 + 1 说明页 = 29 行 → 1 + 19 + 2 = 22 行，节省 7 行
  - 仅展示一次活动名，无重复视觉噪音
  - `.nav-module` / `.nav-module.is-ht` / `.nav-module.is-current` CSS 类保留但无元素引用（可后续清理）

- [修改] NavPanel 按方案 4.1 活动页 6 模块 + HT 自造扩展重构为 7 大模块结构（worldcup/index.html）
  - 从扁平 19 项改为分组：1 金色说明页 + 7 红色模块头 + 19 子项 + 2 灰分隔条 = 29 行
  - 7 大模块头：模块一 官频开播 / 模块二 48 国总榜 / 模块三 射门玩法 / 模块四 宝箱福袋展示（挂组队对战+宝箱福袋+礼物大厅 3 子项）/ 模块五 每日焦点赛 / 模块六 短视频瀑布流 / HelloTalk 世界杯（HT 扩展，加金色左边条区分）
  - P12 国家礼物大厅首次进入 NavPanel（归模块四，章五物料承接）
  - "周边"分组：分享邀请 P9 / 连胜日历 P16 / 文化日 P15 / 圈子 P14 / 话题包 P18 / Meetup P17
  - "辅助"分组：个人战绩 P7 / 活动规则 P8
  - 新增 3 个 CSS 类
    - `.nav-module` 深红 `#C62828` + 白字 Press Start 2P 10px + 2px 黑边 + 3px 硬阴影
    - `.nav-module.is-ht` 金色左 4px accent 条（HT 扩展标记）
    - `.nav-module.is-current` 金底夜蓝字（当前页高亮）
    - `.nav-subitem` 白底夜蓝字 PingFang 11px + 左缩进 14px + margin-left 8px
    - `.nav-subitem.is-current` 金底加粗
    - `.nav-divider` 金色 Press Start 2P 8px + 虚线顶边分隔
  - NavPanel 组件按 `type` 字段（spec/module/sub/divider）分支渲染
  - 模块头点击跳对应主页面（模块一→P4 / 模块四→P19 / HT→P10 等），skipAnchor:true 直接跳不走 H0 锚点动画

- [修改] 德国队三件套精细版从说明页同步到 P10 通行证页（worldcup/p10.jsx + worldcup/spec.jsx）
  - `p10.jsx` 的 `GermanFrame` / `GermanBubble` / `GermanBg` 三个函数体整体替换为精细版：头像框中心留白 + 三色同心环 + 4 角钻石 + DE 小标；气泡中空 + 外围国旗贴/足球/钻石装饰；背景国旗顶带 + 月亮 + 勃兰登堡门六柱剪影 + 聊天气泡浮层
  - 尺寸从 48/80/80 px 升级为 76/114/114 px
  - PassIntroModal「德国队身份三件套预览」布局从 3 列横排改为 3 行图+文（每行组件全尺寸展示 + 右侧 title red label + 中文 desc）
  - `spec.jsx` 删除本地 3 份重复 Preview 组件定义，直接引用 window 上的 GermanFrame/GermanBubble/GermanBg（代码单一来源）
  - 旧版本的 "Deutschland" 气泡文字版移除

- [修改] P11 PreBattleModal 移除用户可选「对战时长」模块 + 跟随赛程 tab 可选中（worldcup/p11-modals.jsx）
  - **删除整个时长选择 UI**（原 `5/10/15 MIN` 3 选 1）：方案定位是"配合世界杯赛程的语音聊天室活动"，时长应跟随赛事节奏而非用户手选。内部 demo timer 保留 10 分钟默认值，UI 上用户不再看到选择器
  - 移除 `[dur, setDur]` state + `DURATION_OPTIONS` 常量 + tab 切换时锁时长的 useEffect
  - 新增 `SCHEDULE_TODAY` 常量（3 场真实赛程，加 `stage` 阶段字段）
  - 跟随赛程 tab 内 3 张赛程卡从展示改成可点击（`schedulePick` state，金底红阴影高亮选中）
  - 赛程卡下方加绿底说明条「跟随本场比赛节奏 · 赛后自动结算开箱」
  - 开始对战按钮的 payload 换成 `SCHEDULE_TODAY[schedulePick]`（原本硬编码 `{a:'ar',b:'en'}`），dur 写死 10 传给 `onStart`

- [修改] H5 说明页 SpecModal 重建为「部门验收图解」(完全替换旧 7-section 文字版)
  - `worldcup/spec.jsx` 整文件重写（旧 810 行 → 新 ~700 行）
    - 中间栏：<HomePage> 完整拉长渲染，360px 宽 + `pointer-events:none` 完全静态，让部门直接在 H0 上看到自己的模块位置
    - 左侧 6 张章节卡（辅助/章六/章一/章三/章二/章八），右侧 8 张（章七/章四·1/四·6/四·2/四·3/四·5/四·4/章九·3）
    - 每张卡绝对定位，`useLayoutEffect` 读 anchor 中心 Y 自动对齐，window resize 重算
    - SVG 点线 + 像素三角箭头：`stroke-dasharray:3 3` + 自定义 marker polygon 贴边像素三角，从卡片近手机一侧中点 → 对应 anchor 的近卡片一侧中点
    - 顶部 sticky header 加 9 章色标 Legend
    - 底部 3 张玩法特写卡（flex row，横排到窄屏竖排）：
      - 章三 组队对战 P11（红底）· "语音聊天室红蓝对抗方案基础上的足球应援外皮"
      - 章四·6 HelloTalk 世界杯 P10（金底）· "方案里该品牌名下的所有内容统一归属此页"
      - 章五 国家礼物大厅 P12（紫底）· "48 国×4 档 16 款礼物资产清单，章五唯一承接页，无 H0 入口"
  - `worldcup/home.jsx` 新增 2 个锚点（纯追加）
    - `id="anchor-treasure"` 挂 TreasureEntry 外层
    - `id="anchor-meetup"` 挂 BottomEntries 第二个 Entry(MEETUP 线下观赛)
  - `index.html` 无代码改动（SpecModal 导出 API 不变：`Object.assign(window, { SpecModal })` + signature `{ onClose, onJump }`）
  - 验证：`@babel/parser` 语法 PASS · spec.jsx 0 emoji · Vercel 部署 200

- [修改] 清理 README / CHANGELOG 自夸措辞
  - README.md `已全部覆盖（~99%）+ 多轮产品增强扩展` → `已对齐`
  - README.md "H5 说明页 SpecModal（讲解神器）" 章节整段重写为"部门验收图解"的新结构描述
  - CHANGELOG.md 历史记录 "超越原方案的 8 项增强" → "原方案以外的 8 项补充项"

- [修改] P10「开口即进球」重构为 HelloTalk 世界杯赛季任务中枢（详情页头部改名 HELLOTALK WORLD CUP · HelloTalk 世界杯 · 赛季任务中枢，其他页面一律未动）
  - `worldcup/p10.jsx`（272 → 1320 行）整页重构
    - 新增 `HeatChart` 实时柱状图：Top 10 国家，国旗主色涂柱身（巴西绿/阿根廷蓝白/中国红/德国黑红金/法国蓝白红/葡萄牙绿红/荷兰红白蓝/日本白红/西班牙红黄/英格兰白红），柱高归一化，150ms steps() 心跳+微动，1200ms sync 显示数字，排名自然重排（translateX steps(8)），我国柱 3px 金边 + .gold-glow 脉冲高亮，非 Top10 时挂外挂条兜底
    - 新增 `PassCard` 通行证大卡（默认未开通：PixelTrophy + 2488 金币 + 原价 3888 划掉 + 红底金字"立即出战·开通通行证" CTA；已开通态：赛季进度 T3/20 + 距下一奖热力显示 + ProgressBar，点击跳 PassTracksModal）
    - 新增 `PassIntroModal` 非全屏通行证弹窗（顶部透出 ~60px 底层，.modal-slide-up 入场动画，内容可滚）：大像素奖杯 + 标题 + 6 项权益卡（国家头像框/聊天气泡/聊天背景/+20% 热力/补签卡×3/20 阶轨道）+ 德国队母版预览（GermanFrame 三层嵌套边相框 / GermanBubble 黑红金三横条气泡+Deutschland 字 / GermanBg 勃兰登堡门夜景剪影）+ 20 阶双轨预览 5 节点 + sticky bottom CTA
    - 新增 `PassTracksModal` 20 阶双轨完整弹窗（T1-T20，FREE 列 + VIP 列 + 累计热力列 + VIP 列挂锁示意）
    - 新增辅助组件 `HeatBarPattern`（国旗色柱身生成器）、`PixelModal`（共用弹窗容器）、`GermanFrame / GermanBubble / GermanBg`（德国母版身份三件套）
    - 任务数据 TASKS 所有 `ic: emoji` 改成 `kind: 'frame/bubble/scene/bolt/ticket/trophy/info/chev/share/calendar'`，渲染层走 PxIcon 像素图标
    - TASK_TABS 去 emoji，改成 label 英文 + sub 中文 双行
    - 删除旧 P10 底部冗余模块：LEARNING HUB 入口、BOOST STORE 入口、原 48 国热力榜（已挪上部）、MY COUNTRY 2×2 方格、TIMELINE 时间线、REWARD CENTER 奖励中心、底部挥旗小人
  - `worldcup/components.jsx`（+72 行，纯追加不改现有）
    - FLAGS 补 3 面：pt（葡萄牙 左绿右红）/ nl（荷兰 红白蓝横）/ jp（日本 白底红圆）
    - PxIcon 补 5 个 kind：frame（像素相框）/ bubble（speech bubble）/ scene（山+太阳）/ bolt（Z 形闪电）/ ticket（矩形票券）
  - `worldcup/index.html`（+26 行，只在 </style> 前追加）
    - @keyframes heatBarPulse（柱高 300ms steps(2) 微震）
    - @keyframes heatBarGrow（柱入场 600ms steps(12) scaleY 0→1）
    - @keyframes goldGlow（我国柱 1.6s steps(8) box-shadow 脉冲）
    - @keyframes modalSlideUp（弹窗 400ms steps(8) 入场）
  - 验证：Babel 解析 3 文件 PASS · grep 新增代码 0 emoji · Playwright iPhone 15 实机冒烟 0 JS 错误 · 关键元素全部渲染（HELLOTALK WORLD CUP / HeatChart / PassCard / PassIntroModal 含 Deutschland 母版 / 2488 价 + 3888 划掉 / 立即出战 CTA）
  - 边界遵守：未动 NavPanel / NAV_ENTRIES / pages map / DebugNav / MuteButton / 其他 23 个 .jsx 与 sfx.js bgm.js

- [修复] P10 上线后两处小瑕疵收口（仅动 worldcup/p10.jsx 一个文件）
  - 柱状图第 10 根柱（🇬🇧 EN）右溢出：柱宽 26→22 / 间隙 2→1 / 两侧留白 14→8 / panel 固定宽 340 改成 width:100% maxWidth:260，10 柱完整塞进 iPhone 15 屏
  - 通行证弹窗底部 CTA 初始盖住第 4 项权益：重构 `PixelModal` 支持独立 `footer` 参数（panel 改 flex column，内容区 flex:1 可滚，footer flex:0 永久锁底），`PassIntroModal` 把 sticky CTA + "已有 1,234 名球迷开通" 抽成 footer 传入；用户滚到底时最后一项完全露出 CTA 上方不被遮挡
  - Playwright 复测：柱状图 10 柱无溢出 · 弹窗底部滚动后德国母版/20 阶预览/价格区/CTA 声明全部完整显示 · 20 阶双轨弹窗打开正常 · 0 JS 错误

- [新增] P10 五组亮点升级 A+B+C+D+E（从静态卡片堆叠 → 有剧场感的活页面 · 只动 p10.jsx / components.jsx / index.html 三个文件，其他禁动，零 emoji）
  - **A · LIVE Ticker 贡献播报**（p10.jsx 新 `PixelTicker` 组件）：HeatChart panel 内顶行一条滚动新闻带，16 条国家+热力/排名播报循环（"BR +320 热力" / "CN 上升至 #2" / "FR 距 #4 仅差 120"），无用户名纯数据，30s tickerSlide steps(120) 循环，hover 暂停
  - **B · 喧哗像素看台观众带**（p10.jsx 新 `PixelStadiumStand` + components.jsx 新 `PixelFan`）：header 下方 46px 高看台，3 排共 90 个 6×8 像素观众头像，分 6 色区按国家主色涂装（巴西绿/阿根廷蓝白/中国金红/德国黑红金/法国蓝白红/西班牙红黄），每头随机 100-300ms bounce delay，定期触发墨西哥人浪（连续 8 秒依次跳高）
  - **C · 动态赛季进度胶片**（p10.jsx 新 `SeasonFilmStrip` + index.html `filmNodePulse` keyframe）：PassCard 上方 72px 高胶片带，5 里程碑节点（预热/小组赛/16强/半决赛/决赛）+ 4 段 segmented 连接进度条，dayIndex 每 500ms 递增循环（0→40→0），金色小人 steps(8) 滑到当前节点，进度条分段实时 fill，DAY N/40 计数器同步刷新 · 用户停留 10 秒可看到 5+ 次推进和节点切换
  - **D · 柱顶解说员 + ON AIR**（components.jsx 新 `PixelCommentator` 组件）：HeatChart panel 'TOP 10 · LIVE' 标题左侧挂 24×24 像素解说员头像（肤色头 + 黑耳机 + 深棕发 + 灰麦克风），旁边闪烁红 ON AIR 标
  - **E · 微交互三件套**
    - E1 我国 HEAT 数字点击 → 12 个金色粒子 8 方向爆炸 500ms + 数字 scale 1.3 + value+1 + 字色闪 PX.red + `sfx.play('coin')` + `particle-burst` / `heat-pop` 动画
    - E2 PassCard 未开通态金光 shimmer（absolute 60×120% 倾斜金色 gradient，`shimmer-sweep` 3.2s steps(30) 无限扫过，pointer-events:none 不挡点击）
    - E3 柱子点击 → toast 弹 `{中文国名} · 今日 +{80~420} · 全球 #{rank}` + `sfx.play('click_soft')`
  - 追加 7 组 keyframes：tickerSlide / crowdBounce2 / mexicanWave / shimmerSweep / particleBurst / heatPopScale / filmNodePulse
  - 追加 2 个 components.jsx 组件：PixelCommentator / PixelFan（二次 `Object.assign(window, ...)`，不改现有导出）
  - 验证：Babel 解析 3 文件 PASS · grep 新增代码 0 emoji · find -mmin 仅 3 文件 · Playwright iPhone 15 实测：.ticker-slide × 1 / .crowd-bounce2 × 90 / SEASON TIMELINE × 1 / DAY 12→18 动态推进 ✓ / ON AIR × 1 / .shimmer-sweep × 1 / .film-node-active × 1 · 0 JS 错误

- [新增] H5 说明页弹窗 · SpecModal（独立于手机框的全局弹窗，帮管理层 demo 讲解者快速理解全部玩法）
  - **新增文件** `worldcup/spec.jsx` · 810 行 · 完整数据层 + SpecModal 组件 + 7 section 渲染
  - **index.html 追加**：
    - `<script type="text/babel" src="spec.jsx">` 挂载
    - NAV_ENTRIES 顶部新增第一项 `{ key:'spec', label:'H5 说明页', action:'spec' }`
    - `.nav-btn.is-spec` CSS（金色背景高亮和其他按钮区分）
    - NavPanel 组件加 `onOpenSpec` prop 处理 spec 特例
    - App 组件加 `showSpec` state + `openSpec` + `specJump` callback + 挂 `<SpecModal>`
  - **弹窗规格**：
    - overlay `position:fixed inset:0 z-index:95 background:rgba(0,0,0,0.7)` · 点击空白区关闭
    - 面板 `inset:24px max-width:1200px margin:0 auto` · PX.cream 底 + 4px solid PX.night + 硬阴影
    - 顶部 sticky header（标题 + 副标 + 右上 X 关闭） + 内部 flex:1 overflow-y:auto 滚动区
    - **不局限于手机框**：桌面全屏可读，手机视口也自适应
  - **7 个 Section**（每个都带"跳转演示"按钮，点击关弹窗 + setPage）：
    1. 项目总览（左表 7 字段 + 右 3 卖点卡 + 红色"去看主页 H0"大按钮）
    2. 页面地图（26 页清单 + 18 项 NavPanel 顺序两列并排）
    3. 核心玩法按方案 9 章详解（每章带去看按钮）
    4. 原方案以外的 8 项补充项（金色边框 + 奖杯角标）
    5. 关键交互 & 动画细节（40+ keyframes 分类清单）
    6. 演示脚本（7 分钟 5-7 步走位 + 每步按钮）
    7. 技术栈 & 部署（无构建 React UMD + Vercel + deploy.sh）
  - **跳转按钮**：11 个按钮覆盖 H0/P1/P4/P5/P5.1/P9/P10/P11/P12/P14/P15/P16/P17/P18/P19 等所有关键页面
  - **Playwright 验证**：NavPanel 第 1 项为 "H5 说明页" ✓ · 弹窗打开关闭 ✓ · 跳转按钮点击关弹窗 + setPage ✓ · 0 JS 错误
  - **Codex 独立 review**：代码逻辑 PASS（overlay / onJump / 像素风主链通过）；发现 1 处内容 bug —— 章四"活动页 6 模块"的 bullets 只列了 5 条（4.1/4.2/4.3/4.5/4.6），漏了 4.4 宝箱福袋展示；已立即修复（spec.jsx:88 补上 `4.4 宝箱福袋展示` + buttons 加 `去看 P19`）
  - 零 emoji · 像素风 Press Start 2P + PingFang SC + 3px solid 硬阴影 · Esc 键也能关弹窗

- [清理] 彻底清除应用代码里最后 2 处 "开口即进球 / SPEAK TO SCORE" 残留（backup 母版冻结区除外）
  - `worldcup/p4-p9.jsx:748` P8 规则说明的"活动总览"文案改写：`"开口即进球"主题语言应援活动 · 30 天` → `"HelloTalk 世界杯 · 语言应援赛季"主题活动 · 40 天`（同时改 30→40 天与方案 v3 一致）
  - `worldcup/p11-pitch.jsx:180` P11 球场竖版边线滚动广告：`SPEAK TO SCORE` × 2 → `48 NATIONS` + `LANGUAGE CUP`（保留广告条像素风 + 金色字体）
  - 全项目 `worldcup/` grep 已 0 命中旧字样；`backup/worldcup母版/` 冻结区保留（历史参考不动），`CHANGELOG.md` 和 `README.md` 里的提及是改动史/叙事必要对照

- [修改] NavPanel 跳转锚点居中算法 + 再慢 0.5x + 13 按钮逐个验证（worldcup/index.html）
  - **居中算法**：原先 `targetScrollTop = currentScroll + anchorTopInScroller - 60`（anchor 顶距 scroller 顶 60px）改为 `targetScrollTop = currentScroll + anchorTopInScroller - (scrollerH - anchorH) / 2`（anchor 中心 = scroller 中心）。Anchor 高于 scroller 高度时 fallback 到 20px 顶部留白
  - **滑动速度再慢 0.5x**：`animateScrollTo` 时长 1400ms → **2100ms**（总跳转节奏从 4.7s 变 5.4s：2.1s 慢滑 + 0.15s 停 + 3s 闪 + 0.15s 切页）
  - **Playwright 13 按钮自动化验证**（`/Volumes/Loom/DataHub/Cache/CLI/wc-pw-test/nav-all-buttons.mjs`）：逐个测 NavPanel 所有 anchor 按钮，验证页面切换正确 / 锚点位置（居中 OR 顶限时完整可见）/ 闪烁触发 / 详情页滚顶 / 0 JS 错误
  - 结果：**13/13 全通过**。10 个 section 类型 anchor 居中误差 Δ ≤ 1px；3 个 Hero 顶部 IconPill（share/record/rules）因 anchor 已在 H0 顶部 scrollTop 不能为负，clamp 到 0 后直接闪烁，属合理物理限制（锚点完整可见）
  - **Codex 独立 review**（`--read-only` 模式）二审：动画时长、中心算法、翻页复位、anchor 映射全部 PASS，与自测结论一致

- [修改] NavPanel 跳转节奏电影化 + 详情页自动滚顶（worldcup/index.html）
  - **慢速滚动**：替换浏览器原生 `scrollIntoView({behavior:'smooth'})`（~400ms）为自定义 `animateScrollTo`（1400ms + easeInOutQuad 缓动，模仿人手滑动节奏，rAF 逐帧刷 scrollTop）
  - **闪烁时长**：`.flash-red` 从 900ms 闪 2 下 → 新 `@keyframes flashRed6x` **3000ms 闪 6 下**（节奏更稳，气氛更足）
  - **节奏编排**：runJumpAnimation 改写成 3 段式
    1. 0-1400ms：慢速滑动到目标锚点（滑到 scroller 顶部 60px 位置，留呼吸空间）
    2. 1400-1550ms：停顿 150ms + `sfx.play('click_soft')` 轻提示音
    3. 1550-4550ms：`.flash-red` 闪 6 下 3 秒
    4. 4550ms：`sfx.play('page_in')` + `setPage(targetPage)`
    加 `jumpingRef` 防用户在动画中多次点击触发重入
  - **详情页自动滚顶**：App 的 `setPage` useEffect 新增 `requestAnimationFrame(() => document.querySelectorAll('.phone-scroll').forEach(el => el.scrollTop = 0))`，每次页面切换后把手机内层 scroll 容器复位到顶端，避免因上一个页面的 scroll 位置残留在同一 DOM 容器里导致新详情页打开时看到中间部分
  - Playwright 实测：800ms 时 scrollTop=664 验证滑动中 / 1600ms 时 flash-red active / 4698ms 时最终 setPage P10 / P10 打开后 scrollTop=0 · 0 JS 错误

- [新增] P10 绿茵场主题 + 五彩斑斓大改造（7 项，纯 additive，零 emoji，像素风 steps 动画）
  - **1 · 世界地图横幅**（p10.jsx 顶部新增 + components.jsx 追加 `PixelWorldMapBanner`）：PageShell header 下方 64px 高横条，8×6=48 块像素国旗色块平铺（palette 12-15 色循环），每块独立 delay 的 `.map-flash` 动画（每 2.4s 变亮变暗 steps 8），覆盖 rgba(26,26,62,0.35) 半透明夜蓝，中央金色 Press Start 2P 'HELLOTALK WORLD CUP · 48 国赛季' + 白线点缀
  - **2 · 页面底草地斜纹**：PageShell bg prop 改 `linear-gradient(45deg, #2E7D32 0 20px, #4CAF50 20px 40px) repeat` 实现 45° 斜向深浅绿 20px 交替条纹（像真草地割纹）
  - **3 · HEAT CHART Card 深草绿 + 球场白线 + 足球角标**：Card bg 从 PX.night 改 `#2E7D32`，内部 3 条白色虚线作球场白线，右下角常驻 PixelBall size=16 + .ball-wobble
  - **4 · 我国大卡中国红 + 国旗纹理**：Card bg PX.night→PX.red，背景 absolute 叠 PixelFlag code='cn' px=12 opacity 0.18 作纹理（pointer-events:none），文字改白 + 金色保持对比度
  - **5 · 通行证卡金橙奖杯色**：PassCard 未开通/已开通两态均改 `linear-gradient(45deg, #FFC107 50%, #FF9800 50%)` 斜分双色，标题/价格文字从金色改 PX.night（深字在金底上可读），原价 3888 划线改 rgba(26,26,62,0.5)，CTA 保持红底金字不变，背景叠奖杯图案 opacity 0.12 纹理
  - **6 · 白色球场分隔线**（components.jsx 追加 `PitchLine`）：观众带下方 / HEAT CHART 下方各一条 4px 白色 solid + PX.night 2px 边 + 2px 2px 0 rgba(0,0,0,0.4) 硬阴影，做像素风球场边线
  - **7 · 任务图标按 kind 分 10 色**（p10.jsx 渲染层加 `KIND_COLOR` 查表）：每个任务 32×32 图标容器背景按 task.kind 分色——info 天蓝 / bubble 草绿 / frame 金黄 / scene 橙 / bolt 金 / ticket 深橙 / trophy 红 / calendar 紫 / chev 青 / share 粉；PxIcon 保持原色不变，仅容器背景分色
  - components.jsx 追加 2 组件（PitchLine / PixelWorldMapBanner）+ 二次 `Object.assign(window, ...)` 导出
  - index.html 追加 2 组动画：mapFlash（2.4s steps(8)）/ softPulse（1.4s steps(4)）
  - 验证：Babel 解析 3 文件 PASS · grep 新增代码 0 emoji · find -mmin 仅 3 文件 · Playwright iPhone 15 实测 `.map-flash × 48` + 0 JS 错误 + 顶/中/底三段截图确认 7 项全部生效

- [修复] P10 LIVE Ticker 显示被压扁问题（worldcup/p10.jsx）
  - 原因：Ticker 原本嵌在 HeatChart panel 内部，和 ON AIR + TOP 10 · LIVE 标题行挤同一个 Card，高度 26px + 字号 8px 在狭窄空间里视觉上几乎被压扁
  - 修法 1：把 `<PixelTicker />` 从 HeatChart 的 Card 内抽出，独立放在 SecHead 和 HeatChart Card 之间，作为横跨手机宽度的 Live 新闻带
  - 修法 2：Ticker 自身尺寸升级 —— height 26→38 · border 2px 金线改成 3px solid PX.sunYellow + 3px 3px 0 硬阴影 · LIVE 标签宽 32→44 字号 7→9 · 滚动内容字号 8/9→10/11 · item 之间加 2px dashed 金色竖线分隔
  - 效果：Ticker 完整显示，每条播报（国旗 + 2字母 + 热力数字 + 中文描述）清晰可读

- [修改] 外部入口全面品牌化为 HelloTalk 世界杯（收口 3 处旧"开口即进球"残留）
  - `worldcup/home.jsx` Hero 小标语：`48 国跨文化对抗 · 开口即进球` → `48 国跨文化对抗 · HelloTalk 世界杯`
  - `worldcup/home.jsx` SpeakToScore 卡 SectionTitle：`SPEAK TO SCORE · 开口即进球 · 语言应援` → `HELLOTALK WORLD CUP · HelloTalk 世界杯 · 语言应援赛季`
  - `worldcup/index.html` NAV_ENTRIES：`{ key:'speak', label:'开口即进球', page:'P10' }` → `label:'HelloTalk 世界杯'`（jumpTo / pages map / anchor-speak key 全部保持不变，路由链路不受影响）
  - Playwright 复测：3 处旧名 0 残留 · 3 处新名全部出现 · 0 JS 错误

- [删除] P10 绿色横幅「让每一次开口都变成进球」（worldcup/p10.jsx）
  - 该横幅是旧版"开口即进球"单点玩法口号残留，新 P10 已升级为「HelloTalk 世界杯赛季任务中枢」（学习/社交/付费/赛事四大类任务），旧口号只对得上"学习"一小部分，信息不对口
  - 删除后顺序：HeatChart 柱状图 → 我国大卡 → PassCard → TODAY TASKS，结构更清晰

## [2026-04-22]

- [新增] 左上角全局静音按钮，同时控制 sfx + bgm，状态持久化到 localStorage(`wc_muted`)，刷新/跨页仍保留
  - `worldcup/sfx.js` 新增 `muted` 模块级变量（启动从 localStorage 读取）+ `play()` 在 muted 时短路 + `window.sfx.setMuted(val)` / `isMuted()` API
  - `worldcup/bgm.js` 新增 `muted` 变量 + `playTrack()` 在 muted 时只记录 currentTrack 不发声 + `window.bgm.setMuted(val)`（静音时 pause+volume=0 所有 track；取消静音时恢复 currentTrack fade-in）+ `isMuted()`
  - `worldcup/index.html` 加 `.mute-btn` 像素风样式（奶白底/红底两态）+ `MuteButton` React 组件（fixed top:10 left:10，mobile 收到 top:6 left:6，像素小喇叭 + SOUND/MUTED 文字），挂在 `<App/>` 根节点；点击时 suppressNextClick 防自带 nav-btn whoosh 误触

- [新增] 5 个 HANDOFF 规范里原本缺失的页面，保持原有像素风
  - `worldcup/p4-p9.jsx` 新增 `P4Page`（官频开播专区列表）、`P5Page`（短视频分类列表）、`P51Page`（视频播放页）、`P8Page`（规则说明 11 节折叠）、`P9Page`（分享邀请）
- [修改] `worldcup/p4-p9.jsx` 的 `P6Page` 补完：外层 Tab（全部场次 / 我的竞猜）、三级竞猜 Tab（胜平负 / 比分 / 首球）、奖池大数字、下注截止倒计时、命中率榜 + 奖金榜入口
- [修改] `worldcup/p4-p9.jsx` 的 `P7Page` 补完：奖励领取区（未领/已领）、国家内个人排名卡、签到记录入口、"我的竞猜"入口 → P6、"分享战绩" CTA → P9
- [新增] `worldcup/p12-p15.jsx` 把原 P4/P5/P5.1/P8/P9 的 5 个页面（礼物大厅 / 陪看房间内 / 进球解说录制 / 圈子 / 文化专区）按新页码迁移：`P12Page` / `P13Page` / `P131Page` / `P14Page` / `P15Page`，内容保持不变
- [修改] `worldcup/index.html` 加载 `p12-p15.jsx` 脚本；`pages` 路由 map 扩到 22 个键（加 P12 / P13 / P13.1 / P14 / P15；并给 P5.1、P6、P7 补传 `nav` 以支持子页跳转）
- [修改] `worldcup/home.jsx`
  - `DebugNav` 页码列表扩到 22 项
  - `HomePage.handleNav` 把 `rules` → P8、`share` → P9、`record` → P7 都接通
  - `FocusMatch` 的「进入陪看房」改跳 P1（焦点赛详情）；「立即竞猜」保持 P6
  - `Ranking` 的「完整榜单」action → P2
  - `Shooting` 的「立即射门 →」→ P3
  - `LiveRooms` 每张房间卡 → P13；「全部」action → P4
  - `EntryBars` 开箱/福袋 bar → P13；竞猜 bar → P6
  - `Shorts` 每张短视频卡 → P5.1；「更多」action → P5
  - `BottomEntries` 圈子入口 → P14；Meetup 暂无页面继续 toast
- [新增] 项目根目录 `HANDOFF.md`（上次会话落笔），本次实施本文档第二阶段任务

- [部署] Vercel 首发
  - 项目名：`worldcup-jekae`（team: `moons-projects-cc633ac1`），项目 ID `prj_eoGV9SUlZ4qFpL2iYUwsT69IHa5U`
  - 部署源：`worldcup/` 目录（纯静态，无构建）
  - Production URL：https://worldcup-jekae-mqw9rrfvs-moons-projects-cc633ac1.vercel.app
  - 自定义域名：**https://worldcup.jekae.com**（Cloudflare 灰云 DNS CNAME → cname.vercel-dns.com，SSL 由 Vercel 签发）
  - 通过 Vercel API PATCH `ssoProtection=null` 关闭默认部署保护，已验证 200 可公开访问
  - 备份母版：`backup/worldcup母版/`（已 `chmod -R a-w` 冻结）

- [修改] `worldcup/components.jsx` `PhoneFrame` 缩小：440×956 → **375×813**，borderRadius 56→48，内屏 46→40，动态岛 126×37→108×32，Home 指示器 139→118；并加 `maxWidth: calc(100vw - 12px)` 防小屏溢出
- [修改] `worldcup/index.html` `.app-wrap` padding 从 `20px 10px 80px` 收紧为 `20px 6px 90px`，420px 以下小屏再降到 `12px 4px 100px`，手机浏览器能完整展示框
- [新增] 项目根 `deploy.sh`（`chmod +x`）一键部署脚本：
  - 进入 `worldcup/` → `vercel --prod --yes` → 解析 deployment URL → `vercel alias set <url> worldcup.jekae.com` → curl 200 冒烟
  - 日志写到 `/Volumes/Loom/DataHub/Cache/CLI/worldcup-deploy-YYYYMMDD-HHMMSS.log`
  - 已实跑验证 OK（本次部署快照 `worldcup-jekae-p4z90akt6-moons-projects-cc633ac1.vercel.app`）

- [修改] `worldcup/index.html` 大改版
  - 锁定整页：`html, body { height:100vh; overflow:hidden }`，`.app-wrap { justify-content: flex-start }` 手机框靠左
  - 加 CSS var `--phone-w / --phone-h`，小屏（≤640px）自动缩到 ≤320px 宽，保持 375:813 比例
  - 新增 **右侧导航面板 NavPanel**：13 个活动按钮（焦点赛/竞猜/开口进球/48国榜/射门/官频/陪看房/短视频/圈子/战绩/规则/分享/语聊房对决），每个按钮映射一个主页锚点 + 目标页
  - 新增 `flashRed2` 关键帧 + `.flash-red::after` 50% 透明红像素色块，`steps(1, end)` 两下闪烁
  - App 新增 `jumpTo(anchorKey, targetPage)`：当前页非 H0 时先 `setPage('H0')`，`pendingJumpRef` 在 H0 渲染完的下一帧执行 `scrollIntoView + flash-red + setPage(target, 1000ms 后)`
- [修改] `worldcup/components.jsx` `PhoneFrame` 改用 className + CSS var 读尺寸，flexShrink 0 保证并排布局稳定
- [修改] `worldcup/home.jsx` 给 H0 每个主活动入口挂 `id="anchor-<key>"`
  - `anchor-focus` 焦点赛按钮组 / `anchor-speak` Speak 大卡 / `anchor-rank` 48国榜 / `anchor-shoot` 射门区 / `anchor-channel` 正在直播 / `anchor-room` 开箱 bar / `anchor-predict` 竞猜 bar / `anchor-shorts` 集锦 / `anchor-circle` 圈子
  - `TopBar.IconPill` 加 `id` prop，挂 `anchor-record` / `anchor-rules` / `anchor-share`
  - `BottomEntries.Entry` 加 `id` prop 以支持 anchor-circle

- [修改] `worldcup/index.html` 布局再调
  - 引入四个布局变量 `--nav-w / --gap-w / --pad-x / --reserved-bottom`，驱动 `--phone-h / --phone-w` 动态尺寸：phone 高度 = `min(940, 100vh - 78, 可用宽 × 2.168)`，宽度 = 高 / 2.168，自动吃满竖向空间但保持 iPhone 比例
  - 导航面板用 `margin-left: auto` 推到右边，与手机之间自然留出 gap，和容器右边界也留 padding
  - 小屏（≤720）保留中文活动名，按钮改竖排（图标上、文字下），字号 10px
- [修改] `worldcup/index.html` NAV_ENTRIES 重命名对齐《2026 世界杯大活动系统方案》v3：焦点赛 / 比分竞猜 / 开口进球 / 48 国榜 / 射门挑战 / 官频开播 / 陪看房 / 短视频 / 圈子广场 / 文化日 / 个人战绩 / 活动规则 / 分享邀请 / 组队对战（文化日与组队对战无 H0 锚点，直接 setPage）

- [新增] `worldcup/p16.jsx` **P16 连胜打卡日历**（doc 七章完整三层触达）
  - `P16Banner` 顶部公告栏（今日焦点广播）
  - `P16CheckIn` 签到大卡（连胜天数 + 阶梯徽章进度 + 签到按钮）
  - `P16Legend` 色标图例（紫/橘/蓝/绿）
  - `P16Calendar` 6 月网格（7×5，文化日/赛程日/已签到/今日状态，可点击打开弹窗）
  - `P16CultureDayScroll` 15 国文化日横滑卡
  - `P16NotifyToggle` 消息推送开关（像素 toggle）
  - `P16CollectionModal` 半弹窗集合页（4 Tab：信息流贴 / 直播官频 / 课程 / 奖励；对齐 doc 七.1 第三层）
- [新增] `worldcup/p17-p19.jsx`
  - **P17 Meetup 线下观赛**：头图 + S/A 级 Tab + 12 城市卡 + 近期 5 场派对横滑（带报名进度条）+ 8 阶段 SOP 折叠 + 4 件到场礼包
  - **P18 私聊话题包**：5 类 Tab（破冰/文化/语言/竞猜/约房）+ 每类 3 条话题卡（带发送/预览双按钮）+ 今日 Top 3 热门
  - **P19 宝箱福袋详情**：头卡（chest-shake + pouch-glow 联动）+ 3 档宝箱选择 + 福袋进度条 6800/10000 + 6 款福袋奖品掉率 + 4 阶段爆率表（小组赛/进球瞬间/淘汰赛/决赛）
- [修改] `worldcup/p12-p15.jsx` P14Page 顶部新增两种专用帖子样式
  - **VoteCard 投票贴**：红蓝二选一 + 投票前/后状态切换 + 实时占比条 + 命中徽章提示
  - **TipCard 打赏贴**：9/99/999 币三档打赏按钮 + 金贴榜阶梯进度（500/2000/10000）+ 6 位打赏者头像滚动
- [修改] `worldcup/home.jsx`
  - 新增 `TodayBannerStrip` 在 TopBar 下 Hero 上（红条 + PixelBall + 今日焦点文案 + CTA），点击 → P16
  - 新增 `CheckInModule` 在 FocusMatch 下 SpeakToScore 上（深色卡 + 连胜大数字 + 14 天迷你月历网格 + 进入日历），点击 → P16，`id="anchor-checkin"` 支持 nav flash
  - `handleNav` `checkin` 分支从 toast 改为 `onNav('P16')`，`DebugNav` 页码扩到 26 项
- [修改] `worldcup/page-chrome.jsx` `PageShell` 根 div 加 `position: relative`，让子页内的模态可以用 `position: absolute; inset: 0` 挂到当前页面而非全局 viewport
- [修改] `worldcup/index.html`
  - 加载 `p16.jsx` / `p17-p19.jsx`
  - `pages` 路由 map 补 P16 / P17 / P18 / P19
  - `NAV_ENTRIES` 加 4 项：连胜日历(📅 P16) / Meetup(🎉 P17) / 话题包(💬 P18) / 宝箱福袋(📦 P19)

- [修复] H0 FocusMatch 和 P1 的比分 `2 : 1` 在窄屏下被空格拆成三行显示 → 两处比分 div 加 `whiteSpace: 'nowrap'`

- [修改] 背景滚动彻底锁死 · 交互方向分离
  - `html, body` 从 `overflow:hidden` 升级为 `position:fixed + inset:0 + overscroll-behavior:none`，防 iOS 橡皮筋把整页往上拉
  - `.nav-panel` 加 `overflow-x:hidden + overscroll-behavior:contain`，只允许上下滑，滑到尽头不传给外层
  - `.phone-scroll` 加 `overflow-x:hidden !important` 覆盖行内 `overflow:auto`，防止横向误触
- [修改] `NAV_ENTRIES` 18 项活动名 1:1 对齐《2026 世界杯大活动系统方案 v3》副标和 4.1 六模块，**全部去 emoji 图标**
  - 每日焦点赛 / 比分竞猜 / 开口即进球 / 48 国对抗总榜 / 射门玩法 / 官频开播专区 / 陪看房 / 短视频瀑布流 / 组队对战 / 宝箱福袋展示 / 连胜打卡日历 / 信息流与圈子 / 文化日 / 私聊话题包 / 线下 Meetup / 分享邀请 / 个人战绩 / 活动规则
  - 顺序重排为按 doc 章节流程（一→二→三→四六模块→七→八→九→六增长→辅助）
- [修改] `.nav-btn` 样式适配纯中文：居中对齐、`white-space: nowrap + overflow: hidden + text-overflow: ellipsis`、font-size 12px（桌面）/ 10px（小屏）；`--nav-w` 桌面 168→172、小屏 86→100px

- [修复] 手机端浏览体验
  - `home.jsx` `DebugNav` 默认 `open` 从 `true` 改 `false`，不再展开挡住焦点赛卡片
  - `DebugNav` 外层加 `className="debug-nav-wrap"`，小屏（≤720px）CSS `display: none !important` 直接隐藏 —— NavPanel 已完整覆盖，DebugNav 在移动端冗余
  - `index.html` 所有视口高度从 `100vh` → `100dvh`（dynamic viewport height），iOS Safari URL 栏展开/收起时自动重算，不再出现顶部留白或底部溢出
  - `--reserved-bottom` 小屏从 72px 收到 18px（DebugNav 已隐藏无需留位），手机获得额外 54px 高
  - `.app-wrap` 小屏 `align-items: flex-start`，顶对齐消除 Safari 栏下方的空白带

- [新增] 8-bit 全站音效系统
  - `worldcup/assets/sfx/` 存放 34 个 CC0 音效（Kenney.nl 精选：interface / ui / digital / impact 四个包），总 312KB
  - `worldcup/sfx.js` 播放层：HTMLAudioElement pool（每音效 3 实例支持并发），iOS pointerdown/touchstart 首次解锁，50ms 节流，全局音量 0.25
  - `window.sfx` API：`play(name)` / `seq([{name,at}])` / `giftByPrice(coin)` / `goalBurst()` / `mvpBurst()` / `hatTrickBurst()` / `suppressNextClick()`
  - document 级事件代理（冒泡阶段）：所有 `.pixel-btn` 自动播 `click`、`.nav-btn` 自动播 `whoosh`，实现零侵入覆盖 80% 交互
- [修改] 全站高价值节点插桩（约 10 处）
  - **P11 组队对战（重头戏）**
    - `startBattle` → `whistle_tweet + unlock`
    - `sendGift` 按 **4 档价位**（`giftByPrice`：低价 1-9 → `gift_low`；10-99 → `gift_mid`；100-999 → `gift_high`；1000+ → `gift_boom`）
    - EFFECT_MAP 15 种道具各自音效：烟花 3 连 `firework_pop`、香槟 `splat`、大鼓 `drum_hit`、鞋 `whoosh+card_snap`、便便/鸡蛋/番茄 `splat`、裁判 `whistle+card_snap`、VAR `tv_static`、进球 `goalBurst()`、球衣 `gift_mid`、大力神杯 `gift_boom`、冠军 `mvpBurst()`、星星 `achievement`
    - Combo ≥2 `combo_tick`，分数跳涨回声 `coin_big`
    - Hat-trick 触发 `hatTrickBurst()`（3 连 tick + hattrick 主题）
    - 倒计时结束 `settle` 触发 `mvpBurst()`
  - P3 射门：`kick` → 350ms 后 `goalBurst()` / `error`
  - P6 下注：`coin + confirm`（未选则 `error`）
  - P14 投票选红/蓝：`select + confirm`；打赏 9/99/999 自动档位
  - P15 QUIZ：答对 `correct_ding + coin`，答错 `error`
  - P16 今日签到：`coin × 3 + achievement` 4 连音
  - P16 日历格子点击：`modal_open`；领奖：`coin + unlock`
  - P7 奖励领取：`coin + unlock`
  - P9 复制邀请码：`copy_done`
  - P10.1 词汇盲盒翻卡：`card_flip + correct_ding`；录音：`whistle_tweet`
  - P12 礼物大厅送出：`giftByPrice(总价)` 自动档位
  - P13.1 解说录制：`whistle_tweet`
  - P17 Meetup 报名：`confirm + achievement`
  - NavPanel jumpTo 闪烁期间：两声 `tick`；flash 结束切页：`page_in`
- [修改] `worldcup/index.html` `<script src="sfx.js">` 在 components.jsx 前加载，window.sfx 在所有页面可用
- 音效全部 **CC0 公共领域**（Kenney License），`worldcup/assets/sfx/KENNEY_LICENSE.txt` 附 license 原文

- [修复] sfx 太突兀：
  - 全局音量 0.25 → **0.12**，节流 50ms → 80ms
  - **取消 `.pixel-btn` document 级 auto-click 代理**（每个按钮都响太密），只保留 `.nav-btn` → whoosh
  - P11 `sendGift` 去叠加：只播 gift 档位/道具对应一个音效，删掉 `coin_big` 分数回声 + `combo_tick` 连击叠
  - `goalBurst` 从 6 层精简到 2 层（goal_fanfare + 1 声烟花）
  - `mvpBurst` 从 5 层精简到 2 层（mvp_fanfare + achievement）
  - `hatTrickBurst` 从 5 层精简到 1 层（单播 hattrick 主题）
  - P16 签到从 4 连音缩到 2 音（coin + achievement）
  - jumpTo 闪烁期间去掉 tick × 2，只保留到页后的 page_in
- [新增] **BGM 背景音乐系统**（每页独立循环，切页淡入淡出）
  - `worldcup/assets/bgm/`：
    - `theme.ogg`（8-bit Battle Loop · Wolfgang_ · **CC0** · [OpenGameArt](https://opengameart.org/content/8-bit-battle-loop)）· 880KB
    - `stadium.mp3`（强烈有节奏欢呼 · Gregor Quendel · CC-BY 4.0 · [OpenGameArt](https://opengameart.org/content/free-crowd-cheering-sounds)）· 1.5MB
    - `room.mp3`（柔和观众喧哗 · Gregor Quendel · CC-BY 4.0）· 1.5MB
    - `ATTRIBUTION.txt` CC-BY 必需的署名
  - `worldcup/bgm.js` 播放层：同时只播 1 条，`setPage(p)` 400ms 淡入淡出；iOS 首次 touch 解锁；音量 **0.06**（极低，不抢 sfx）
  - 页面 → BGM 映射
    - **P11 组队对战 + P1 焦点赛 + P17 Meetup** → `stadium`（球场强烈欢呼）
    - **P13 陪看房** → `room`（柔和观众喧哗）
    - H0 + 其他所有页 → `theme`（8-bit 上扬主题）
    - **P5.1 视频播放 + P13.1 录制** → 无 BGM（不压视频/录音）
  - `index.html` App 在 `page` state 变化时调 `window.bgm.setPage(page)` 自动切换

- [修复] BGM 交叉叠播 + 切后台仍播 两个 bug
  - **交叉叠播**：原 `bgm.js` 用模块级单 `fadeTimer`，两次快速切页时第二次 `clearInterval` 打断第一次的 fade，前一首永不暂停。改为每个 Audio 元素挂自己的 `__fadeTimer`，并在每次切页 `silenceOthers(target)` 强制淡出所有非目标曲目（兜 zombie 状态）
  - **后台继续播**：加 `document.visibilitychange` + `window.blur / focus / pagehide` 监听。切到桌面/其他 tab/锁屏立即 pause，回前台自动 resume；iOS Safari 多事件兜底

- [重写] `worldcup/bgm.js` 改用 **Web Audio API**，解决 iOS Safari 背景播放（像 B 站那样切桌面还响）
  - 管线：`<audio>` → `createMediaElementSource` → `GainNode` → `AudioContext.destination`
  - 所有音频经过 `AudioContext`，背景时 `ctx.suspend()` 直接掐断整个管线输出，前台 `ctx.resume()` 恢复
  - 淡入淡出从 `setInterval + volume` 改用 `GainNode.linearRampToValueAtTime`（Web Audio 原生调度，更稳）
  - 不设 MediaSession 元数据，避免 iOS 把 audio 当"持续媒体"挂到锁屏通知中心
  - 事件订阅：`visibilitychange + pagehide + blur` 都挂 suspend；`visibilitychange(visible) + pageshow + focus` 都挂 resume

- [回退] `bgm.js` Web Audio API 版在 iOS Safari 上静音（`createMediaElementSource` 的异步时序在 iOS 有坑），回退到 HTMLAudioElement 主线，保留 per-audio `__fadeTimer` + `silenceOthers` + 后台 pause 双保险（`pause()` + `volume=0` 双写）
- [修复] P11 开战哨声跟点击不同步 · 把 `sfx.play('whistle_tweet')` 从 `useEffect(phase==='live')`（render 后异步）挪到 `startBattle()`（点击同步）

- [优化] 音频加载延迟（点"开始对战"几秒才响的根因）
  - `bgm.js`：script 加载瞬间 `preloadAll()` 预创建 3 个 Audio 元素 + `load()` 触发下载，不再等 `setPage` 懒加载
  - `sfx.js`：Audio pool 从 3 个/音效降到 1 个，启动时总并发从 **102 → 34**，手机 Safari 不再抢带宽把小哨声也阻塞
- [优化] BGM 文件压缩（ffmpeg）
  - `stadium.mp3` 1.5MB → **240KB**（320kbps 立体声 → 48kbps 单声道）
  - `room.mp3`    1.5MB → **231KB**（同上）
  - `theme.ogg`   880KB → **267KB** `theme.mp3`（320kbps → 80kbps stereo，并换 .mp3 确保 iOS 兼容）
  - 总 3.9MB → **732KB** · 81% 瘦身
  - `bgm.js` TRACKS map 同步更新（theme.ogg → theme.mp3）

- [新增] 项目根 `README.md`，作为总览入口：项目定位 / 技术栈 / 26 页清单 / 源码结构 / NavPanel 18 项 / 音频系统 / 部署流程 / 资源版权表 / 已知限制。CHANGELOG 保持逐次流水，README 作为稳定总览
- [修改] memory `project_worldcup_h5.md` 更新到当前状态：页面从 22 → 26、音频系统新加入 sfx.js + bgm.js 两个模块、踩坑清单、NavPanel 18 项文案对齐 doc

- [修复] 多页文字在白底卡片上看不清（P15 民俗故事 / QUIZ / H0 等）
  - 根因：`body { color: #eee }` 继承进页面，白卡上文本 `#eee` 浅灰 ≈ 隐身
  - 修法 1：`PageShell` 根 div 设 `color: defaultText`（深底 → #fff / 浅底 → PX.night），覆盖 body 浅灰
  - 修法 2：`body` 默认色从 `#eee` 改 `#1A1A3E`（PX.night），照顾不走 PageShell 的页面（H0 / P11 等）；深色背景区域（NavPanel / DebugNav / Toast / 深色卡片）本来就显式设了白字，不受影响

- [修改] `README.md` 加「开发要点 · 踩坑清单」沉淀 10 条关键经验（文字色 / whiteSpace 防拆行 / BGM+SFX 新增流程 / iOS 后台续播 / `100dvh` / 锁定不滚 / `createMediaElementSource` 坑 / 首页和 P11 不走 PageShell 等）
- [新增] `worldcup/p11-modals.jsx` 追加 `WinnerChestRewards`，为 `MVPSettlement` 增加胜方开箱区块：2 秒抖箱、`chestOpen` 开盖、3 个像素奖品并排、返币文案与碎屑音效联动
- [新增] `worldcup/p11.jsx` 增加 `PouchProgress` 与满额解锁遮罩；`sendGift` 接入 `pouchSum` 累积、5000/8000 阈值提示音、10000 满额重置与 2 秒福袋解锁态
- [新增] `worldcup/p12-p15.jsx` 在 `P12Page` 末尾补 4 款爆款礼物，并新增 `renderGiftIcon(g)` 让黄牌/金戒/全家福/冠军之光走像素图标渲染
- [新增] `worldcup/home.jsx` 在 H0 Hero 的 Countdown 卡下增加分享按钮，点击直达 `P9`；`HomePage` 同步把 `onNav` 透传给 `Hero`
- [新增] `worldcup/index.html` 增补 `chestOpen` 与 `pouchUnlock` 两段 steps 动画，供 P11 结算开箱和福袋满额遮罩复用
- [新增] `worldcup/p12-p15.jsx` 为 `P14Page` 追加 48 国子话题网格、世界杯挑战横滑卡、世界杯精华置顶卡，统一插在原讨论列表与浮动发帖按钮之间
- [新增] `worldcup/home.jsx` 在 `BottomEntries` 与 `Footer` 之间追加 `TreasureEntry` 宝箱福袋入口卡，点击直达 `P19`
- [新增] `worldcup/p11-pitch.jsx` 为 P11 对战皮肤补齐 16 强国家 `KITS` 配色，覆盖 de/fr/es/en/pt/nl/jp/kr/mx/us/be/hr/ma/sn
- [新增] `worldcup/components.jsx` 追加 `PixelStar` 像素球星头像组件，并挂到 `window` 导出供页面复用
- [新增] `worldcup/p11.jsx` 在 mic panel 下方追加“本场球星”横列，预览 messi / ronaldo / neymar / kane
- [新增] `worldcup/p1-p3.jsx` 为 P3 射门玩法追加 `stage` 演示层与独立 `DEMO · 传球→过人→射门→进球` 按钮
- [新增] `worldcup/index.html` 追加 `passTrail` / `shootFly` / `netShake` 三段 steps 关键帧，供 P3 连贯演示复用

- [修改] `worldcup/index.html` NAV_ENTRIES 18 项按《2026 世界杯大活动系统方案 v3》**章节流程**重排（原按 4.1 六模块为中心）：一 官频开播 → 二 陪看房/短视频 → 三 组队对战/宝箱福袋 → 四 焦点赛/48国榜/射门/开口进球/竞猜 → 六 分享 → 七 日历/文化日 → 八 圈子 → 九 话题包/Meetup → 辅助 战绩/规则
- [部署] Wave 1+2+3+NavPanel 重排三波增量一并上线（部署快照 `worldcup-jekae-nru8w3suq`），纯增加，原有 26 页内容 0 改动

- [新增] `worldcup/vercel.json` 对 `.html / .jsx / .js` 加 `Cache-Control: no-cache, no-store, must-revalidate`。修复 iOS Safari 缓存老版本导致 NavPanel 点击无反应的类问题；以后改完直接 `./deploy.sh` 无需担心用户端缓存
- [验证] Playwright 头部测试 NavPanel「开口即进球」按钮：桌面 click + iPhone 15 viewport tap 都能成功到 P10（localStorage.wc_page=P10，SPEAK TO SCORE 渲染正常，0 JS 错误）

## 未完成 / 下阶段建议
- `PageShell` 可选加右侧图标组以更贴近 H0 的顶部栏样式（HANDOFF 有此要求，当前子页只有返回+标题）
- `ios-frame.jsx` 未被 `index.html` 引用，可删
- `worldcup/p10.jsx` 热力榜列出"意大利"时用了西班牙国旗替代（`c === 'it' ? 'es' : c`），若要补真实意大利国旗需在 `components.jsx` 的 `PixelFlag` 里加 `it` 图样
