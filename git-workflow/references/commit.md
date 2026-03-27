# Commit Rules

Follow Conventional Commits as the base structure:

`<type>[optional scope]: <subject>`

Breaking changes may use:

`<type>[optional scope]!: <subject>`

## Local Commitlint Rules

This project adds these rules on top of Conventional Commits:

- `type` must be English and one of:
  - `feat`
  - `perf`
  - `fix`
  - `refactor`
  - `docs`
  - `build`
  - `types`
  - `chore`
  - `examples`
  - `test`
  - `style`
  - `ci`
  - `init`
- `scope` is optional, but if used it should be English and reflect a module, page, feature, or technical area.
- Do not use Chinese for `scope`.
- `subject` should follow the language preference of the current project and describe the actual change clearly.
- If the project has no explicit rule, follow the dominant language used in its docs, comments, and existing commit history.
- Keep the full commit header within 72 characters.
- Emoji is optional.
- If emoji is used, either of these placements is acceptable:
  - left side of the header, such as `✨ feat(wallet): add enterprise account onboarding`
  - start of the subject after the colon, such as `feat(wallet): ✨ add enterprise account onboarding`
- Keep emoji placement consistent within the same repository when possible.

## Writing Guidance

- Prefer one clear change intent per commit.
- Use concise wording that matches the project's language style, such as `optimize`, `fix`, `refactor`, `adjust`, or `add`.
- Avoid vague subjects like `update code`, `misc changes`, or `handle issue`.
- If the change touches a specific page or module, reflect that in `scope` instead of bloating the subject.
- If the project is mainly Chinese, prefer Chinese subjects. If the project is mainly English, prefer English subjects.
- If a change spans multiple areas and no single scope is accurate, omit the scope instead of forcing one.

## Scope Suggestions

Common scopes for reference only. Choose them according to the actual project and change context:

- Business or feature areas:
  - `wallet`
  - `router`
  - `auth`
  - `api`
- Build or dependency areas:
  - `build`
  - `deps`

## Examples

- `fix(wallet): correct audit result status handling`
- `style(wallet): refine account selection page styles`
- `refactor(wallet): restructure the audit result flow`
- `feat(router): add wallet audit result route`

Optional emoji examples:

- `✨ feat(wallet): add enterprise account onboarding`
- `🐛 fix(wallet): fix empty-state rendering on the audit result page`
- `feat(wallet): ✨ add enterprise account onboarding`
- `fix(wallet): 🐛 fix empty-state rendering on the audit result page`

## Source

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Vanisper/schema-store/.commitlintrc.yaml](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml)
