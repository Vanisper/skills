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
