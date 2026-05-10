# HelloTalk 2026 世界杯 H5 单文件原型

## 当前版本

- 原型文件：`worldcup-prototype.html`
- 本地预览：`http://localhost:8000/worldcup-prototype.html`
- 收口日期：2026-05-10
- 目标用途：用于演示当前 H5 交互结构，并反向更新 PRD。

## 原型边界

- 这是单文件 HTML 原型，CSS 和 JS 都内联在 `worldcup-prototype.html`。
- 页面视觉允许简化，但代码中保留 PRD 反推需要的编号、模块 ID、页面层级和 `data-prd-label`。
- 当前默认刷新落在 `Tab 3 · 球场` 页面。

## 页面关系

```text
Global
├── 顶部 Home 图标 → FAN ID 配置流程
├── 顶部 FANID 按钮 → Tab 1 入场
├── 右下商店浮窗 → Tab 5 商店
└── 底部 Tab 栏
    ├── Tab 2 · 看台
    ├── Tab 3 · 球场
    ├── Tab 4 · 媒体
    └── Global · 应援任务常驻入口

Tab 3 · 球场
├── 进球助力入口
├── Tab 3.1 · 射门助力玩法
└── 焦点竞猜 · MATCH PK
```

## PRD 映射规则

- 底部 Tab 视觉不显示数字，但 DOM 中保留隐藏编号 `2 / 3 / 4`。
- 底部 Tab 使用 `data-tab-code` 和 `data-prd-label` 标明页面归属。
- 应援任务常驻入口标记为 `Global · 应援任务常驻入口 · 嵌入底部 Tab 栏`，不是第 4 个 Tab。
- `Tab 3.1 · 射门助力玩法` 是 `Tab 3 · 球场` 的同级切换页面，用命名表达从属关系。
- `m1-task` 保留在 FAN ID 页面内；底部任务抽屉复用同一份 `TASK_DATA`。

## 当前交互重点

- FAN ID 配置不再自动弹出，通过顶部 Home 图标进入。
- 底部 Tab 栏为黑白方形图标按钮，数字只保留在代码中。
- 底部 Tab 栏下半区集成「应援任务 ↑」，点击或上滑弹出任务半屏抽屉。
- 打开任务抽屉时，底部 Tab 栏整体上移。
- 右下角「商店」为全局常驻浮动入口。
- `更多赛事` 半屏弹窗支持点击上半屏关闭。
- 射门助力玩法每次进入都会弹出首次惊喜提示，便于演示。

## 文件清单

```text
原型设计/
├── worldcup-prototype.html
├── README.md
└── CHANGELOG.md
```
