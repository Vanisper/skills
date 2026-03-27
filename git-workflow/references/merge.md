# Branch Merge Rules

When merging a development branch into a mainline branch such as `main` or `master`, use these defaults:

- Prefer Pull Request or Merge Request for team collaboration.
- If the target branch is protected, do not try to push or merge locally around that protection.
- Before merging, update the target branch and sync it back into the source branch to reduce late conflicts.
- When merging locally, prefer `--no-ff` to preserve an explicit merge record.
- After merge, delete the source branch only when the user asks or when the workflow clearly treats it as disposable.

## Recommended Merge Preparation

1. Update target branch:
   - `git checkout main`
   - `git pull origin main`
2. Sync target changes into source branch:
   - `git checkout develop`
   - `git merge main`
   - or `git rebase main` if the user explicitly wants a linear history and the history rewrite is acceptable
3. Merge source into target:
   - `git checkout main`
   - `git merge --no-ff develop`
4. Push merged target branch:
   - `git push origin main`

## Merge Strategy

Default strategy by context:

- Team repository: prefer PR or MR merge with review and CI checks.
- Personal or local-only repository: local merge is acceptable.
- If a hosting platform offers multiple merge modes, prefer `Create a merge commit` unless the repository has an explicit squash or rebase policy.

Why `--no-ff` is the default here:

- It keeps the branch merge visible in history.
- It makes it easier to trace when a feature or fix entered the main branch.
- It simplifies reverting an entire merged branch change set later.

## Rebase Considerations

`rebase` can be useful, but it should be chosen deliberately:

- `rebase` rewrites commit history, so it is usually a poor default for branches that have already been pushed or shared with other collaborators unless the user explicitly asks for it and the team allows it.
- If the branch has already been pushed, a later push after `rebase` often requires a history rewrite on the remote. Prefer `--force-with-lease` over plain `--force`.
- `rebase` replays commits one by one, so conflicts may surface repeatedly across several commits instead of once in a single merge.
- `rebase` reduces visible branch-merge context. If the repository values explicit branch history and merge points, prefer merge.
- If the team may need to revert an entire feature branch later, a preserved merge commit is often easier to reason about than a rebased linear history.

`rebase` is usually a better fit when:

- the branch is still local or unshared
- the user wants a cleaner linear history
- the repository explicitly prefers a rebase-based workflow

If conflicts happen during `rebase`, useful commands include:

- `git status`
- `git rebase --continue`
- `git rebase --abort`

## Merge Conflicts

If a merge conflict occurs:

- Resolve files intentionally instead of blindly taking one side.
- Stage only the conflict resolutions you have verified.
- Complete the merge with Git's merge commit flow.
- If the merge is no longer desired, abort it instead of forcing partial resolutions.

Useful commands:

- `git status`
- `git add <file>`
- `git commit`
- `git merge --abort`

## Source

- [Vanisper blog branch merge note](https://github.com/Vanisper/blog/blob/main/note/git/分支合并.md)
