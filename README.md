# HelloTalk 2026 世界杯 H5 单文件原型

## 当前版本

- 原型文件：`worldcup-prototype.html`
- 本地预览：`http://localhost:8000/worldcup-prototype.html`
- 更新时间：2026-05-10 23:40 CST
- HTML SHA1：`d0cac5678280e90919fff15eb328055d03c78240`
- 目标用途：用于演示当前 H5 交互结构，并反向更新 PRD。

## 原型边界

- 这是单文件 HTML 原型，CSS 和 JS 都内联在 `worldcup-prototype.html`。
- 页面视觉保持黑白线框风格，参考图只取结构和交互逻辑。
- UI 中已隐藏大部分红色 TBD 占位，但代码中保留 PRD 反推需要的模块 ID、页面层级、`data-prd-label` 和注释。
- 页面外部的 Stage / JS API 说明区已隐藏，避免影响演示。
- 当前默认刷新落在 `Tab 3 · 球场` 页面。

## 页面关系

```text
Global
├── 顶部 Home 图标 → FAN ID 配置流程
├── 顶部 FANID 按钮 → Tab 1 · 入场
├── 右下商店浮窗 → Tab 5 · 商店
└── 底部 Tab / 任务栏
    ├── Tab 2 · 看台
    ├── Tab 3 · 球场
    ├── Tab 4 · 媒体
    └── Global · 应援任务常驻入口

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
- 应援任务常驻入口标记为 `Global · 应援任务常驻入口 · 嵌入底部 Tab 栏`，不是第 4 个 Tab。
- `Tab 3.1 · 射门助力玩法` 是 `Tab 3 · 球场` 的同级切换页面，用命名表达从属关系。
- `Tab 4.1 / 4.2 / 4.3 / 4.4 / 4.5` 用来表达媒体页下跳转到 App 体系二级页面的路径。
- `m1-task` 保留在 FAN ID 页面内；底部任务抽屉复用同一份 `TASK_DATA`。

## 当前交互重点

- FAN ID 配置不再自动弹出，通过顶部 Home 图标进入。
- FAN ID 卡片已填入演示内容，避免演示时出现空状态。
- 底部 Tab 栏为黑白方形图标按钮，数字只保留在代码中。
- 底部 Tab 栏下半区集成「应援任务 MATCH TASK ↑」，点击或上滑弹出任务半屏抽屉。
- 任务清单已替换为世界杯活动任务，隐藏无效 `{number}` 和 HT 币 / RMB 占位。
- 右下角「商店」为全局常驻浮动入口。
- VIP 年卡和终身卡点击后进入 SKU 半屏，不同卡型展示不同赠送礼包。
- 直播语聊、动态圈子、线下 Meetup、短视频、国家球迷群均已补充二级或三级页面示意。
- 射门助力玩法每次进入都会弹出「送你一个特别惊喜！射门*1」，便于演示。

## 文件清单

```text
原型设计/
├── worldcup-prototype.html
├── README.md
└── CHANGELOG.md
```
