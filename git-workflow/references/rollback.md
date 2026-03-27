# Rollback Rules

Choose rollback strategy by impact scope:

- Uncommitted file changes: prefer `git restore <file>` or another targeted file restore.
- Local commits not yet pushed: reset may be acceptable if the user explicitly wants to rewrite local history.
- Pushed or shared commits: prefer `git revert` instead of reset.
- Merged branch rollback on shared history: prefer `git revert -m 1 <merge-commit>`.

Never rewrite shared history unless the user clearly asks for it and the branch is safe to rewrite.

## Merge Rollback

For shared branches, prefer reverting a merge instead of rewriting history:

- `git revert -m 1 <merge-commit>`

Use reset or force-push for merge rollback only when the user explicitly asks for a history rewrite and the branch is safe to rewrite.

## Recovery Mindset

- Prefer reversible actions on shared branches.
- Explain the impact before using reset or force-push.
- When unsure whether commits are already shared, treat them as shared.
