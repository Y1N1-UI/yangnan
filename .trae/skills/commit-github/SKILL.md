---
name: commit-github
description: 把当前项目的改动用 git 提交并推送到 GitHub 远程仓库 github.com/Y1N1-UI/yangnan.git（SSH 公钥认证）。当用户说提交到github、提交github、push到github、上传到github时使用。不要用于提交到 Gitee、仅查看 git 状态或修改远端地址的请求。
---

# 提交到 GitHub

把当前工作目录（d:\gjwy\531yangnan）的改动提交并推送到 GitHub 仓库 `https://github.com/Y1N1-UI/yangnan.git`。该仓库使用用户已配置的 SSH 公钥认证，SSH 地址为 `git@github.com:Y1N1-UI/yangnan.git`。提交信息用中文书写。本仓库的 origin 指向 Gitee，GitHub 一律使用名为 `github` 的独立 remote，两者互不干扰。

## 步骤

1. **了解现状**（并行执行，不要用 `-uall`）：
   - `git status`
   - `git diff HEAD --stat`
   - `git log --oneline -5`（对齐已有提交信息的风格）
   - `git remote -v`
   - `git branch --show-current`

2. **确认远程**（不动 Gitee 的 origin）：
   - 名为 `github` 的 remote 不存在时：`git remote add github git@github.com:Y1N1-UI/yangnan.git`
   - `github` 已存在但指向其他地址时：停下询问用户，不要擅自改动或删除远程
   - 不要修改、覆盖或删除 origin（Gitee）

3. **暂存改动**：
   - 优先按文件名逐个 `git add <file>`；文件很多且确认 `git status` 中没有敏感文件（.env、密钥、node_modules 等）时，才可用 `git add .`
   - `yn_prompt.md` 是课程要求的提示词记录，属于项目文件，正常提交

4. **提交**：
   - 信息用中文，1-2 句，聚焦本次改动的原因与内容（如"新增 iconfont 底部导航练习页"）
   - 当前环境是 PowerShell 5，不支持 bash heredoc，用多个 `-m` 分段传递：

     ```
     git commit -m "一句话标题" -m "补充说明（可省略）" -m "Co-Authored-By: GLM noreply@z.ai"
     ```

   - 没有任何改动时不创建空提交，直接告知用户"没有可提交的内容"并结束
   - 预提交钩子失败时修复问题后新建提交，禁止 `--amend`、禁止 `--no-verify`

5. **推送**（走 SSH 公钥）：
   - 首次推送该分支：`git push -u github <当前分支>`
   - 之后的常规推送：`git push github`
   - 推送被拒绝（远端有新提交）时：先 `git pull --rebase github <分支>` 再推送；出现冲突则停下，展示冲突文件并询问用户如何处理
   - SSH 认证失败时：提示用户运行 `ssh -T git@github.com` 验证公钥配置，不要改用 HTTPS 或要求输入密码
   - 任何时候都禁止 `--force` 强推；确有必要时必须先向用户说明风险并获得明确同意

6. **汇报**：推送成功后用一句话报告分支、提交数与 GitHub 仓库地址；失败时给出具体报错与建议操作
