# 分支合并规范

当开发分支需要合并到 `main` 或 `master` 这类主线分支时，默认遵循以下规则：

- 团队协作优先通过 Pull Request 或 Merge Request 合并。
- 如果目标分支受保护，不要绕过保护策略在本地强行推送或合并。
- 合并前先更新目标分支，再把目标分支的最新内容同步回源分支，减少最后一刻的冲突。
- 本地合并时默认优先使用 `--no-ff`，保留明确的合并记录。
- 合并后是否删除源分支，取决于用户要求或既有工作流，不要擅自删除。

## 推荐合并准备流程

1. 更新目标分支：
   - `git checkout main`
   - `git pull origin main`
2. 将目标分支最新内容同步到源分支：
   - `git checkout develop`
   - `git merge main`
   - 如果用户明确要求线性历史，也可以使用 `git rebase main`，但要先评估 rebase 对历史改写的影响
3. 将源分支合并回目标分支：
   - `git checkout main`
   - `git merge --no-ff develop`
4. 推送目标分支：
   - `git push origin main`

## 合并策略

按场景选择默认策略：

- 团队仓库：优先 PR 或 MR，配合代码审查和 CI 检查。
- 个人或纯本地仓库：可以接受本地直接合并。
- 如果托管平台提供多种合并方式，默认优先 `Create a merge commit`，除非仓库已经明确规定使用 squash 或 rebase。

为什么这里默认推荐 `--no-ff`：

- 可以保留分支合并轨迹。
- 更容易追溯某个功能或修复是在什么时候进入主分支的。
- 后续如果整条分支需要撤销，也更方便处理。

## Rebase 使用注意事项

`rebase` 不是不能用，但使用前要先确认这些问题：

- `rebase` 会改写提交历史，不适合直接用于已经共享、已经推送且多人协作的分支，除非用户明确要求，并且团队允许这样做。
- 如果分支已经推送过，`rebase` 之后通常需要再次推送历史，优先考虑 `--force-with-lease`，不要默认直接 `--force`。
- `rebase` 会把一组提交逐个重放，冲突可能会在多个提交上重复出现，处理成本不一定比 merge 更低。
- `rebase` 之后，原本分支的合并上下文会变弱。如果项目希望保留清晰的分支轨迹和 merge 点，优先使用 merge。
- 如果后续需要按“整条功能分支”回滚，保留 merge commit 往往比 rebase 后的线性提交更容易处理。

更适合使用 `rebase` 的场景：

- 个人本地分支，尚未共享给他人。
- 提交历史需要整理成更线性的结构。
- 仓库或团队已经明确要求线性历史。

如果 `rebase` 过程中发生冲突，常用命令有：

- `git status`
- `git rebase --continue`
- `git rebase --abort`

## 合并冲突

如果发生合并冲突：

- 有意识地逐个解决冲突，不要机械地只取某一边。
- 只暂存已经确认无误的冲突解决结果。
- 按正常 merge 流程完成合并提交。
- 如果不准备继续合并，使用 `git merge --abort` 中止，而不是留下半解决状态。

常用命令：

- `git status`
- `git add <file>`
- `git commit`
- `git merge --abort`

## 来源

- [Vanisper/blog/note/git/分支合并.md](https://github.com/Vanisper/blog/blob/main/note/git/%E5%88%86%E6%94%AF%E5%90%88%E5%B9%B6.md)
