# Jacob · AI 应用与软硬件项目集

持续更新的项目集合，收录企业 AI 应用、Agent 工作流、软硬件原型、知识系统与教育科技产品。
用于随简历投递，在线地址：<https://qiebo.github.io/jacob-portfolio/>

## 设计

项目档案式结构，内容和证据为主角：

- **首页**：项目集合入口、成果概览、类型筛选、能力边界与工作背景
- **项目卡片**：按业务智能化、AI 应用、软硬件结合、知识系统分类
- **案例页**：统一呈现背景、问题、我的工作、方案结构和结果证据
- **动效**：克制的滚动显现、筛选与图片灯箱，尊重 prefers-reduced-motion

## 结构

- `index.html`：首页（项目集合 + 成果概览 + 类型筛选 + 能力 + 工作背景 + 关于）
- `home.css`：首页项目档案视觉与响应式布局
- `cases/`：案例页
  - `ai-workflows.html` — 企业售前方案 AI 工作流（企业 AI 应用）
  - `desktop-digital-human.html` — 桌面数智人一体机（软硬件产品）
  - `child-ai-companion.html` — 逗包 · 儿童 AI 伴侣（全栈 AI 应用）
  - `x-bookmarks.html` — X 知识库（知识系统 + 采集管道）
  - `data-report-agent.html`、`enterprise-knowledge.html` — 暂存案例页，当前未放入首页集合
- `assets/`：项目实拍、海报与图谱素材
- `styles.css`：设计系统
- `script.js`：年份、页眉状态、滚动显现、图片灯箱

每个案例围绕四个问题展开：背景是什么、怎么设计的、我做了什么、留下了什么结果。

## 本地预览

```bash
python -m http.server 8321
# 打开 http://127.0.0.1:8321/
```
