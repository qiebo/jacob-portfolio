# Jacob · 个人作品集

个人作品集网站，收录 AI 应用、软硬件原型、知识系统与 AI 工作流。
用于随简历投递，在线地址：<https://qiebo.github.io/jacob-portfolio/>

## 设计

现代编辑式风格，内容为主角：

- **配色**：暖白纸面 + 墨色文字 + 一点朱砂（仅用于编号与关键标记）
- **字体**：Noto Serif SC（标题）+ Noto Sans SC（正文）+ Space Grotesk（数字与标签）
- **图片**：画廊衬底式呈现，完整显示不裁切，点击可查看大图
- **动效**：克制的滚动显现与 hover 反馈，尊重 prefers-reduced-motion

## 结构

- `index.html`：首页（定位陈述 + 项目速览拼图 + 精选项目 + 能力 + 认可 + 关于）
- `cases/`：案例页
  - `desktop-digital-human.html` — 桌面数智人一体机（软硬件产品）
  - `child-ai-companion.html` — 逗包 · 儿童 AI 伴侣（全栈 AI 应用）
  - `x-bookmarks.html` — X 知识库（知识系统 + 采集管道）
  - `ai-workflows.html` — AI 工作流与 Skill（方法产品化）
- `assets/`：项目实拍、海报与图谱素材
- `styles.css`：设计系统
- `script.js`：年份、页眉状态、滚动显现、图片灯箱

每个案例围绕四个问题展开：背景是什么、怎么设计的、我做了什么、留下了什么结果。

## 本地预览

```bash
python -m http.server 8321
# 打开 http://127.0.0.1:8321/
```
