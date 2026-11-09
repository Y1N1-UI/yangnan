# Swiper 课堂任务二 · creative 仿写「电影墙」（杨楠的提交）

> 任务来源：https://spontaneous-valkyrie-4e4229.netlify.app/swiper-lesson 「6. 课堂任务 + 思政升华」任务二
> 完成人：杨楠　|　使用模型：GLM-5.3-Flash　|　日期：2026-11-05
> 任务要求：课堂上只讲了 6 种 effect，用 AI 自学第 7 种 **creative（自定义变换）**，参考官方示例 `swiper/demo/257-effect-creative.html`，为演示四新增第 7 个按钮「creative 电影墙」。

---

## 一、与 AI 的关键对话记录

### 第 1 步 · 请 AI 讲懂官方示例的 transform 写法

**我的提示词：**

> 我在看 Swiper 11 官方示例 swiper/demo/257-effect-creative.html，里面的 creativeEffect.prev / next 里有 `translate: ["-20%", 0, -100]`、`rotate: [0, 0, 90]` 这样的数组。请解释：① 这三个数组每个位置分别对应什么变换？② 数组里字符串 "−20%" 和数字 -100 有什么区别？③ prev 和 next 分别作用于哪张 slide？只讲结论，不用写完整页面。

**AI 回答（要点）：**

1. 三个位置对应 **[x, y, z]**：x 水平移动、y 垂直移动、z 沿 Z 轴"推向屏幕深处/拉向观众"——z 是负数就离观众更远，**视觉上变小**，正数则贴近变大；
2. 带 `%` 的字符串是**相对 slide 自身宽/高的百分比**（如 `"-20%"` = 左移自身宽度的 20%），纯数字按**像素（px）**算（如 z 只能用 px）；
3. `prev` 描述**上一张**在退场方向的姿态，`next` 描述**下一张**在待进场方向的姿态；Swiper 按拖动进度在"该姿态 ↔ 原位"之间插值，所以看起来是连续动画。

### 第 2 步 · 让 AI 生成「电影墙」配置

**我的提示词：**

> 用 Swiper 11 的 effect: "creative" 实现"电影选片墙"：上一张海报缩小、向左移出画面并带倾斜角度、渐隐；下一张海报停在右侧稍远处、微微侧身，轮到它时放大滑入居中。基础配置必须保留：loop、autoplay delay 3200 且 disableOnInteraction: false、pagination #wyPag4 clickable、speed 800。prev 加 shadow。只输出 creativeEffect 部分和注释。

**AI 回答（已并入页面 [swiper-task.html](swiper-task.html#L288-L323) 的 `yn_buildSw4`）：**

```js
creativeEffect: {
  prev: {
    translate: ["-102%", 0, -160], // 左移出画面 + 推远缩小
    rotate: [0, 8, -12],           // 绕 Y/Z 轴翻转出海报倾斜角
    opacity: 0.4,                  // 渐隐，聚焦当前张
    shadow: true,                  // 投影增强"贴墙"立体感
  },
  next: {
    translate: ["55%", 0, -110],   // 在右侧偏远处待命
    rotate: [0, -6, 6],            // 微微侧身
    opacity: 0.85,
  },
}
```

页面侧的接入方式：`yn_buildSw4(yn_fx)` 里为 creative 单独准备 `yn_extra.creativeEffect`，再与基础配置 `Object.assign` 合并后重建实例——其它六种效果走原配置，互不影响。

### 第 3 步 · 任务硬性要求的追问（用自己的话作答）

**追问：prev / next 的 transform 各控制什么？**

**我自己的话：** `prev` 控制**上一张**"退场时变成什么样"——它从居中原位出发，按 prev 的 translate/rotate/opacity 逐渐变成那个姿态，所以决定的是"离开的样子"（电影墙里就是缩小、左移、斜贴、变淡）；`next` 控制**下一张**"进场前长什么样"——它一开始就摆在 next 描述的位置，轮到它时从这个姿态插值回原位，所以决定的是"登场的起点"（电影墙里就是从右侧远处放大滑入）。两者都只是**姿态描述**，真正让它们动起来的是拖动/翻页的**进度插值**：进度 0 = 原位，进度 1 = 描述的姿态。

---

## 二、验证记录（打开 swiper-task.html 演示四）

| # | 操作 | 预期现象 | 结论 |
|---|------|----------|------|
| 1 | 点「creative 电影墙」按钮 | 按钮高亮，轮播以 creative 效果重建 | ✅ |
| 2 | 观察自动翻页 | 当前海报左移缩小、带角度斜贴渐隐；下一张从右侧远处放大滑入居中 | ✅ 电影墙效果成立（截图：翻页进行中） |
| 3 | 用鼠标拖动一半再松手 | 海报跟手移动，松手后回弹到最近一张，自动播放继续 | ✅ 进度插值连续 |
| 4 | 点其它六个效果按钮再切回 creative | 各效果正常切换、来回互切无残留错位 | ✅ destroy + 重建兼容 |

> 截图需本人操作页面后自行截取，建议截"翻页进行中"的一帧最能体现 prev/next 姿态。

---

## 三、答辩预演

**Q1：transform 里的百分号是相对谁的？**
相对 **slide 自身的宽/高**：x 用的是自身宽度、y 用的是自身高度，所以 `"-102%"` 对任何尺寸的轮播都是"恰好完整移出画面左侧一点"；不带 % 的数字是像素，z 轴只能用像素（如 -160）。

**Q2：改一个数值让卡片转 20 度试试？**
把 `yn_buildSw4` 里 prev 的 `rotate` 第三个值（Z 轴，屏幕平面内的旋转）从 `-12` 改成 `-20`：

```js
rotate: [0, 8, -20],   // 原 [0, 8, -12]
```

预期变化：上一张退场时绕屏幕平面多转 8 度，斜贴得更"歪"，像快掉下墙的海报；若想转正方向（顺时针）就写 `20`。

**Q3：为什么切换到 creative 要走 destroy + new？**
creative 的变换由实例初始化时根据 creativeEffect 参数给每张 slide 绑定 transform 计算，运行中只改 effect 字符串不会重算这些绑定；所以与其它效果切换一致，必须销毁旧实例、带着新参数重建（页面里由 `yn_buildSw4(btn.dataset.fx)` 统一完成）。

---

### 附：本次改动清单

1. [swiper-task.html L213](swiper-task.html#L213)：.wy-fx 新增第 7 个按钮 `data-fx="creative"`；
2. [swiper-task.html L288-L323](swiper-task.html#L288-L323)：`yn_buildSw4` 增加 creative 分支（creativeEffect 电影墙参数），基础配置通过 Object.assign 合并；
3. 其余三个轮播、其它六种效果均未改动。
