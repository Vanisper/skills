# 回滚规范

回滚策略要根据影响范围来选：

- 还没提交的文件改动：优先使用 `git restore <file>` 或其他定向恢复方式。
- 仅存在于本地、尚未推送的提交：如果用户明确想改写本地历史，可以考虑 reset。
- 已经推送或已经共享给他人的提交：优先使用 `git revert`，不要直接 reset。
- 共享历史上的 merge 回滚：优先使用 `git revert -m 1 <merge-commit>`。

除非用户明确要求，并且分支历史可以安全改写，否则不要重写共享历史。

## Merge 回滚

对于共享分支，优先通过 revert merge commit 的方式撤销整次合并：

- `git revert -m 1 <merge-commit>`

只有在用户明确要求改写历史、且分支允许这样做时，才考虑 reset 或 force-push。

## 恢复心智

- 共享分支上优先选择可逆操作。
- 使用 reset 或 force-push 前，先说明影响。
- 如果不确定某个提交是否已经被共享，默认按“已经共享”处理。
