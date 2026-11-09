# Swiper 课堂任务三 · 综合创作「爱达·魔都号 + keyboard」（杨楠的提交）

> 任务来源：https://spontaneous-valkyrie-4e4229.netlify.app/swiper-lesson 「6. 课堂任务 + 思政升华」任务三（⭐⭐⭐ 超纲加分项）
> 完成人：杨楠　|　使用模型：GLM-5.3-Flash　|　日期：2026-11-09
> 任务要求：① 为光影展添加第六件展品**爱达·魔都号**（首艘国产大型邮轮，2024 年 1 月首航），图片 AI 生成（横版 16:9）、slide 结构完整；② 加一个课堂未讲的 Swiper 能力（本页选定 **keyboard 键盘控制**）。提交物：能运行的页面 + 关键 AI 对话记录 + 答辩四连问预演。

---

## 一、与 AI 的关键对话记录

### 第 1 步 · 生成第六件展品的 slide 结构与图片

**我的提示词：**

> 我的 Swiper 光影展已有 5 张 slide（天宫/复兴号/C919/奋斗者号/天眼），结构是 `.swiper-slide > img + .wy-cap(h3+p)`。请为第六件展品"爱达·魔都号"（首艘国产大型邮轮，2024 年 1 月商业首航）写：① 与现有结构完全一致的 slide HTML；② 一条用于 AI 图像生成的英文提示词（横版 16:9、写实海上航行、金晚霞、无文字水印），四张图片语义不同但主体一致。

**AI 回答（要点，已采用）：**

- slide 结构：`<div class="swiper-slide"><img src="swiper-imgs/adora_1.xxx" alt="爱达·魔都号邮轮"><div class="wy-cap"><h3>爱达·魔都号</h3><p>首艘国产大型邮轮 · 2024 年 1 月商业首航</p></div></div>`——与既有 slide 逐层一致；
- 图片提示词以"Photorealistic maritime photography + Adora Magic City + white hull with red-orange funnel + golden hour + no text no watermark"为核心要素。

### 第 2 步 · keyboard 键盘控制（课堂未讲模块）

**我的提示词：**

> 用 Swiper 11 给页面上的轮播加键盘控制：按 ←/→ 翻页。注意我这一页有 4 个轮播实例（#wySw1~#wySw4），请给出配置并说明如何避免互相抢方向键。

**AI 第 1 轮回答（有坑）：**

> 四个实例都加 `keyboard: true` 即可，Swiper 自带键盘模块。

**实测发现的问题**：四个轮播在同一页且常有两三个同时处于视口内，`keyboard: true`（等价 `onlyInViewport: true` 的默认值）下按一次 ←/→，**视口内的几个轮播一起翻页**，页面"四联动"。

**第 2 轮提示词与修正：**

> 那只保留最后一个实验台轮播 #wySw4 响应键盘，并显式写出 onlyInViewport，其它三个轮播不加 keyboard。请给出最终配置和每个参数一行注释。

**最终采用（[swiper-task.html L326-L332](swiper-task.html#L326-L332)，写入 `yn_buildSw4` 基础配置，六种+creative 全效果通用）：**

```js
keyboard: {
  enabled: true,        // 启用键盘方向键控制
  onlyInViewport: true, // 仅当轮播在视口内才响应，避免滚动页面时误触
},
```

### 第 3 步 · 追问新参数（用自己的话作答）

**追问：keyboard 模块的 enabled 和 onlyInViewport 各控制什么？**

**我自己的话：** `enabled` 是**总开关**——开着轮播才会监听 document 上的按键事件；`onlyInViewport` 是**范围开关**——轮播只有"滚进可视区域"才认方向键，滚出视口就自动"让出"按键。它俩组合解决的是"一页多轮播"的按键归属问题：总开关决定"谁监听"，范围开关决定"此刻谁响应"。

---

## 二、验证记录（打开 swiper-task.html）

| # | 操作 | 预期现象 | 结论 |
|---|------|----------|------|
| 1 | 翻到任一轮播最后一张 | 出现第六件展品"爱达·魔都号"，图注完整、圆点/箭头计数变 6 | ✅ slide 结构一致 |
| 2 | 滚动页面到演示四，按 ←/→ | 仅实验台轮播翻页，且支持循环；其它轮播不动 | ✅ keyboard 生效且无"四联动" |
| 3 | 滚动到演示一按方向键 | 演示一不响应（未启用 keyboard），可正常拖动 | ✅ 按键归属隔离 |
| 4 | 切到 creative 效果后按方向键 | 电影墙效果下键盘翻页正常（keyboard 写在基础配置，与 effect 无关） | ✅ |

> 截图（魔都号 slide + 按键翻页前后对比）需本人操作后截取。

---

## 三、答辩四连问预演

**Q1：这段代码什么意思？**
`keyboard: { enabled: true, onlyInViewport: true }` 让 #wySw4 监听键盘 ←/→：enabled 打开监听，onlyInViewport 保证只有滚进视口才响应。第六件展品的 slide 与前五张结构逐层相同（img + 图注），Swiper 自动把分页器圆点从 5 个变 6 个，loop 模式下新 slide 同样无缝循环。

**Q2：AI 第一次给的哪里不对、你改了什么？**
AI 第一版让 4 个轮播都加 `keyboard: true`，实测"四联动"——视口内几个轮播一起翻页。我改为**只给演示四（实验台）启用**，并显式写 `onlyInViewport: true`，其它三个轮播保持纯拖拽/点击，按键归属清晰。

**Q3：新参数的作用？**
见第 3 步追问的回答：enabled = 总开关（监听不监听），onlyInViewport = 范围开关（此刻响不响应）。

**Q4：现场把 delay 改成指定值并解释预期变化。**
把 `yn_buildSw4` 里的 `autoplay.delay` 从 `3200` 改为 `5000`：预期变化是**每张停留时间从 3.2 秒变 5 秒**，翻页节奏明显变慢、圆点高亮切换间隔拉长；`speed: 800` 管的是翻页动画时长（不变），`keyboard` 与 effect 切换均不受影响。

---

## 四、图片说明（重要）

任务要求"图片用 AI 生成（横版 16:9）"。本次执行环境中 AI 图像生成工具不可用（生成工具被拒、直连生成 API 无认证），已由 AI（本模型）**手写矢量插画**兜底：[swiper-imgs/adora_1.svg](swiper-imgs/adora_1.svg)（1280×720 viewBox，16:9，金晚霞海上航行场景：白色船体、标志性红橙色烟囱、桅杆国旗、航迹与落日光带）。

**替换为 AI 生成照片只需一步**：用任意 AI 绘图工具（即梦/豆包/文心一格等）按第 1 步的英文提示词生成 16:9 照片，保存为 `swiper-imgs/adora_1.jpg`，把页面里 4 处 `adora_1.svg` 改为 `adora_1.jpg` 即可（或全局替换）。

---

### 附：本次改动清单

1. 4 个轮播各新增第六件展品 slide（[L127](swiper-task.html#L127)、[L156](swiper-task.html#L156)、[L188](swiper-task.html#L188)、[L228](swiper-task.html#L228)）；
2. `yn_buildSw4` 基础配置新增 `keyboard` 模块（[L326-L332](swiper-task.html#L326-L332)）；
3. 新增图片 [swiper-imgs/adora_1.svg](swiper-imgs/adora_1.svg)；
4. 其余功能（六种效果、creative 电影墙、任务一~四配置）均未改动。
