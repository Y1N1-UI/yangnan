---
name: commit-project
description: 把当前项目的改动用 git 提交并推送到 Gitee 远程仓库 gitee.com/yang--nan/yang.git。当用户说提交项目、提交代码、commit、push、同步到 gitee、上传作业时使用。不要用于仅查看 git 状态、修改远端地址或回退历史的请求。
---

# 提交项目

把当前工作目录（d:\gjwy\531yangnan）的改动提交并推送到远程仓库 `https://gitee.com/yang--nan/yang.git`。这是《高级网页设计》课程作业仓库，提交信息用中文书写。

## 步骤

1. **了解现状**（并行执行，不要用 `-uall`）：
   - `git status`
   - `git diff`（含已暂存改动）
   - `git log --oneline -5`（对齐已有提交信息的风格）
   - `git remote -v`
   - `git branch --show-current`

2. **确认远程**：
   - 无 origin 时：`git remote add origin https://gitee.com/yang--nan/yang.git`
   - origin 已指向其他地址时：停下询问用户，不要擅自改动或删除远程。

3. **暂存改动**：
   - 按文件名逐个 `git add <file>`；文件很多且确认 `git status` 列表中没有敏感文件（.env、密钥、node_modules 等）时，才可用 `git add .`。
   - `yn_prompt.md` 是课程要求的提示词记录，属于项目文件，正常提交。

4. **提交**：
   - 信息用中文，1-2 句，聚焦本次改动的原因与内容（如"新增 iconfont 底部导航练习页"）。
   - 用 heredoc 传递多行信息，格式：

     ```bash
     git commit -m "$(cat <<'EOF'
     提交信息正文

     Co-Authored-By: GLM noreply@z.ai
     EOF
     )"
     ```
   - 没有任何改动时不创建空提交，直接告知用户"没有可提交的内容"并结束。
   - 预提交钩子失败时修复问题后新建提交，禁止 `--amend`、禁止 `--no-verify`。

5. **推送**：
   - 首次推送该分支：`git push -u origin <当前分支>`
   - 之后的常规推送：`git push`
   - 推送被拒绝（远端有新提交）时：先 `git pull --rebase origin <分支>` 再推送；出现冲突则停下，展示冲突文件并询问用户如何处理。
   - 任何时候都禁止 `--force` 强推；确有必要时必须先向用户说明风险并获得明确同意。

6. **汇报**：推送成功后用一句话报告分支、提交数与远端地址；失败时给出具体报错与建议操作。
