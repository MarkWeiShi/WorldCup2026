# HelloTalk 2026 世界杯 H5 原型

## 当前版本

- 最新原型：`worldcup-prototype-v2.html`
- 本地预览：`http://localhost:8000/worldcup-prototype-v2.html`
- 更新时间：2026-05-11 CST
- HTML SHA1：`db789ce0343fb51a984608eafd2f680a19f46a71`
- 目标用途：用于演示当前 H5 交互结构，并反向更新 PRD。

## 原型边界

- `worldcup-prototype-v2.html` 是当前演示主文件，CSS、JS 与关键图片资源均内联。
- 页面视觉保持黑白线框风格，参考图只取结构和交互逻辑。
- UI 中隐藏可见 `TBD / placeholder / 跳转占位`，代码中保留 PRD 反推需要的模块 ID、页面层级、`data-prd-label` 和注释。
- 页面外部的 Stage / JS API 说明区已隐藏，避免影响演示。
- 当前默认刷新落在 `Tab 3 · 球场` 页面。

## 页面关系

```text
Global
├── 顶部 Home 图标 → FAN ID 配置流程
├── 顶部任务按钮 → 应援任务全量弹窗
├── 顶部 FANID 按钮 → Tab 1 · 入场
├── 右下商店浮窗 → Tab 5 · 商店
└── 底部 Tab
    ├── Tab 2 · 看台
    ├── Tab 3 · 球场
    └── Tab 4 · 媒体

Tab 3 · 球场
├── 进球助力入口
├── Tab 3.1 · 射门助力玩法
└── 焦点竞猜 · MATCH PK

Tab 4 · 媒体
├── ON AIR → Tab 4.1 · 直播语聊聚合页
├── CIRCLE → Tab 4.2 · 动态世界杯话题页
├── MEETUP → Tab 4.3 · 线下观赛页 → Meetup 详情 / 报名半屏
├── HIGHLIGHTS → Tab 4.4 · 短视频集合页 → Tab 4.4.1 · 观看视频页
└── GROUP → 国家球迷群半屏 → Tab 4.5 · App 群聊页

Tab 5 · 商店
├── VIP 年卡 / 终身卡 → SKU 半屏 → 对应赠送礼包
├── 装扮商城入口
├── 球队套系 COLLECTION
└── 限定礼物入口
```

## PRD 映射规则

- 底部 Tab 视觉不显示数字，但 DOM 中保留隐藏编号 `2 / 3 / 4`。
- 底部 Tab 使用 `data-tab-code` 和 `data-prd-label` 标明页面归属。
- 应援任务入口是顶部全局按钮，不属于底部 Tab。
- `Tab 3.1 · 射门助力玩法` 是 `Tab 3 · 球场` 的同级切换页面，用命名表达从属关系。
- `Tab 4.1 / 4.2 / 4.3 / 4.4 / 4.5` 用来表达媒体页下跳转到 App 体系二级页面的路径。
- `m1-task` 保留在 FAN ID 页面内；顶部任务弹窗复用同一份 `TASK_DATA`。

## 当前交互重点

- FAN ID 配置不再自动弹出，通过顶部 Home 图标进入。
- FAN ID 卡片已填入演示内容，避免演示时出现空状态。
- 底部 Tab 只保留 `看台 / 球场 / 媒体` 三个入口，去掉图标并压低高度。
- 顶部任务按钮打开全量应援任务弹窗。
- 任务清单已替换为世界杯活动任务，隐藏无效 `{number}` 和 HT 币 / RMB 占位。
- 右下角「商店」为全局常驻浮动入口。
- VIP 年卡和终身卡点击后进入 SKU 半屏，不同卡型展示不同赠送礼包。
- 直播语聊、动态圈子、线下 Meetup、短视频、国家球迷群均已补充二级或三级页面示意。
- 1F 球迷证三按钮已按 PRD 补齐：环球世界 / 射门助力 / 焦点竞猜均打开用户个人相关弹窗。
- 看台人浪模块使用内联黑白球场看台底图，顶部电子屏承载 TOP 国家滚动展示。
- 射门助力玩法每次进入都会弹出「送你一个特别惊喜！射门*1」，便于演示。

## 文件清单

```text
原型设计/
├── worldcup-prototype.html
├── worldcup-prototype-v2.html
├── README.md
└── CHANGELOG.md
```
