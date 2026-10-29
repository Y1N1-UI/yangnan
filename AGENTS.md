# AGENTS.md

## Repository overview

Coursework repo for 《高级网页设计》(Advanced Web Design class). Pure static HTML/CSS/JS — **no build system, no package.json, no tests, no lint, no CI**. Verify by opening `.html` files directly in a browser.

- `index.html` is the course hub page; every other page is a standalone practice/assignment page.
- Language: all UI text, commit messages, and logs are Simplified Chinese (`lang="zh-CN"`).

## Hard rules (course requirements, see `yn_prompt.md`)

- **Prefix rule**: all new CSS class names, element IDs, and JS variables must start with `yn_` (e.g. `.yn_home-link`, `yn_rotate`). Applies to anything you create.
- **Hub link rule**: every new `.html` file must get a linked entry card in `index.html`. This has been explicitly called out before when missed.
- **Prompt log rule**: append every executed prompt to `yn_prompt.md` — never overwrite. Format: date, model name, prompt text. The file is a graded course artifact and is committed normally.
- New pages should include a "返回首页 index.html" back-link.

## Git workflow

- Remote: `https://gitee.com/yang--nan/yang.git` (Gitee), branch `master`.
- Commit messages: Chinese, 1–2 sentences, focused on the change (e.g. "新增 iconfont 底部导航练习页"). Match recent history.
- Stage files individually; `git add .` only after confirming no sensitive files in the diff.
- Never use `--force`, `--amend`, or `--no-verify`. On push rejection: `git pull --rebase`, then stop and ask if conflicts appear.
- Full commit/push procedure: `.trae/skills/commit-project/SKILL.md` — treat it as source of truth for "提交项目 / commit / push" requests.

## Assets & shared code

- `cdn/` — third-party libraries (fontawesome, lucide) downloaded locally for offline use. Prefer local copies under `cdn/` over hotlinking.
- `font/` — iconfont.cn icon package (`iconfont.css`, `iconfont.js`, woff fonts). Used by iconfont practice pages.
- `img/` — images.
- `data.js` — shared assignment data (`SUBJECTS`, `STUDENTS`), exposed as `window` globals via `<script src="data.js">`. The `starter-level*` pages must render from this data (DOM lookup + array methods) to match a reference target 1:1 — do not hardcode data into pages.

## Code conventions

- Newer pages (iconfont, starter-level) use **inline `<style>`** and the `yn_` prefix; older exercises pair `*.html` with a sibling `*.css` (e.g. `stack004.html` + `stack004.css`). Follow the newer inline pattern for new pages unless told otherwise.
- Page naming: `<topic><nnn>.html` or `<topic>-<n>.html`; assignment pages embed student name/date (e.g. `starter-level1yangnan0531.html`).

## Design work

- When asked to improve or create page aesthetics, follow `skills/frontend-design/SKILL.md` (distinctive design, avoid templated AI defaults).
