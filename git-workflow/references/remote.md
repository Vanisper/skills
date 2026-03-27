# Remote Workflow

For remote operations:

- Check remotes before push or upstream changes: `git remote -v`
- Confirm the current branch and upstream before first push.
- Prefer pushing the current branch explicitly instead of relying on ambiguous defaults.
- Do not change remote URLs, default branches, or authentication setup unless the user asks.

## Useful Checks

- `git branch -vv`
- `git remote -v`
- `git push origin <branch>`

## Push Rules

- Push only when the user asks for it.
- Prefer explicit branch names when setting upstream or pushing a branch for the first time.
- Avoid force-push unless the user explicitly requests history rewriting.
