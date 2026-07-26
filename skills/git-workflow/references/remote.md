# 远程仓库规范

涉及远程仓库操作时：

- push 或调整上游分支前，先检查 remote：`git remote -v`
- 首次推送前，确认当前分支和上游关系。
- 推送时尽量显式指定当前分支，而不是依赖模糊的默认行为。
- 除非用户明确要求，否则不要改 remote URL、默认分支或认证配置。

## 常用检查

- `git branch -vv`
- `git remote -v`
- `git push origin <branch>`

## Push 规则

- 只有在用户明确要求时才执行 push。
- 首次推送或设置上游分支时，优先使用显式分支名。
- 除非用户明确要求改写历史，否则不要 force-push。

## 常见坑

- **同步远端时避免裸 `git pull`**：`git pull` 默认会在本地与远端分叉时产生 merge commit，污染线性历史。改用 `git pull --ff-only origin <branch>`，分叉时直接失败，再决定 rebase 还是手动处理（详见 [merge.md](merge.md)）。
- **未跟踪文件不要 `git add -A` / `git add .` 一把梭**：pull 或切分支前后常混入临时文件、构建产物等未跟踪内容。先 `git status --short` 看清 `??` 条目，再按需 `git add <具体文件>`，避免把无关文件一起提交。
