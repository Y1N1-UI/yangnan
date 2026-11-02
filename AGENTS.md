# AGENTS.md

> **语言约定**：本项目所有说明文档、检查条目统一使用简体中文；文件路径、HTML/CSS/JS 标识符（类名、id、变量名、命令等）保留英文。生成文档、检查清单时必须遵守。

## 仓库概览

《高级网页设计》课程作业仓库。纯静态 HTML/CSS/JS——**无构建系统、无 package.json、无测试、无 lint、无 CI**。验证方式：直接在浏览器中打开 `.html` 文件。

- `index.html` 是课程主页，其余页面均为独立的练习/作业页。
- 语言：所有界面文字、提交信息、日志均为简体中文（`lang="zh-CN"`）。

## 硬性规则（课程要求，详见 `yn_prompt.md`）

- **前缀规则**：所有新建的 CSS 类名、元素 id、JS 变量必须以 `yn_` 开头（如 `.yn_home-link`、`yn_rotate`）。适用于一切新建内容。
- **主页入口规则**：每个新建的 `.html` 文件必须在 `index.html` 中加入可点击的入口卡片。此前曾因遗漏被明确指出过。
- **提示词记录规则**：每条已执行的提示词都要追加写入 `yn_prompt.md`——严禁覆盖。格式：日期、模型名、提示词原文。该文件是课程评分产物，正常提交入库。
- **注释规则（新建页面）**：每个新建的 `.html` 文件必须带注释——文件头注释 + 逐函数注释，**尤其 JS 部分每个函数都要有**。每个注释块须包含：作者 杨楠、建立时间、使用模型、函数名及简介。模板：

  ```html
  <!--
    作者：杨楠
    建立时间：2026-11-02
    使用模型：GLM-5.3-Flash
    功能：××页面 —— 一句话简介本页用途
  -->
  ```

  ```js
  /* 杨楠 | 2026-11-02 | GLM-5.3-Flash
   * 函数名：renderStats
   * 简介：统计班级人数、总分、平均分、及格率并写入四张统计卡片
   */
  ```

- 新页面应包含"返回首页 index.html"回链。

## Git 工作流

- 双远程并存：`origin` → Gitee `https://gitee.com/yang--nan/yang.git`（分支 `master`）；`github` → `git@github.com:Y1N1-UI/yangnan.git`（SSH 公钥认证）。推送时必须显式指定远程名，禁止裸 `git push`（跟踪目标可能已指向 GitHub，会误推）。
- 提交信息：中文，1–2 句，聚焦本次改动（如"新增 iconfont 底部导航练习页"），与最近历史风格一致。
- 优先按文件名逐个 `git add`；仅当确认改动中没有敏感文件（.env、密钥、node_modules 等）时才可用 `git add .`。
- 禁止 `--force`、`--amend`、`--no-verify`。推送被拒时先 `git pull --rebase`，出现冲突则停下询问用户。
- 完整提交/推送流程以 `.trae/skills/commit-project/SKILL.md`（Gitee）和 `.trae/skills/commit-github/SKILL.md`（GitHub）为准，作为"提交项目 / commit / push"类请求的唯一依据。

## 资源与共享代码

- `cdn/`——第三方库（fontawesome、lucide）已下载到本地供离线使用。优先使用 `cdn/` 下的本地副本，不要外链。
- `font/`——iconfont.cn 图标包（`iconfont.css`、`iconfont.js`、woff 字体）。用于 iconfont 练习页。
- `img/`——图片资源。
- `data.js`——共享作业数据（`SUBJECTS`、`STUDENTS`），通过 `<script src="data.js">` 暴露为 `window` 全局。`starter-level*` 页面必须基于该数据渲染（DOM 查找 + 数组方法），与参考目标页一比一还原——不得把数据硬编码进页面。

## 代码约定

- 较新的页面（iconfont、starter-level）使用**内联 `<style>`** 和 `yn_` 前缀；较早的练习采用 `*.html` 配同级 `*.css`（如 `stack004.html` + `stack004.css`）。新页面默认沿用较新的内联写法，除非另行说明。
- 页面命名：`<主题><编号>.html` 或 `<主题>-<序号>.html`；作业页内嵌学生姓名/日期（如 `starter-level1yangnan0531.html`）。

## 设计工作

- 当被要求提升或创建页面美感时，遵循 `skills/frontend-design/SKILL.md`（有辨识度的设计，避免模板化的 AI 默认风格）。
