# 提交规范

提交头遵循 Conventional Commits 的基本结构：

`<type>[optional scope]: <subject>`

如果是破坏性变更，可以使用：

`<type>[optional scope]!: <subject>`

## 本地 Commitlint 规则

这个项目在 Conventional Commits 基础上增加了这些约束：

- `type` 必须是英文，并且只能是以下值之一：
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
- `scope` 可选，但如果填写，必须使用英文，并且能准确表达模块、页面、功能或技术域。
- `scope` 不要使用中文。
- `subject` 的语言应跟随当前项目的语言偏好，并清楚描述实际改动。
- 如果项目没有明确约定，就跟随主要文档、注释和既有 commit 历史中的主流语言。
- 完整提交头长度应控制在 72 个字符以内。
- `emoji` 可选。
- 如果使用 `emoji`，以下两种写法都可以：
  - 放在提交头最前面，例如 `✨ feat(wallet): 新增企业开户入口`
  - 放在冒号后的 `subject` 开头，例如 `feat(wallet): ✨ 新增企业开户入口`
- 同一个仓库内尽量保持 `emoji` 风格一致。

## 编写建议

- 一次 commit 尽量表达一个明确改动意图。
- 用简洁、明确的措辞，例如 `优化`、`修复`、`重构`、`补充`、`调整`。
- 避免 `修改一下`、`处理问题`、`更新代码` 这种含义过弱的表达。
- 如果改动明显属于某个页面或模块，优先把信息放进 `scope`，不要把 `subject` 写得过长。
- 如果项目整体是中文风格，优先写中文 `subject`；如果项目整体是英文风格，优先写英文 `subject`。
- 如果改动跨多个模块，且没有准确的 `scope`，可以省略 `scope`。

## Scope 建议

常见可用的 scope （仅供参考，视项目、变更需求具体情况而定）：

- 具体业务模块
  - `wallet`
  - `router`
  - `auth`
  - `api`
- 构建、依赖相关
  - `build`
  - `deps`

## 示例

- `fix(wallet): 修复审核结果页状态判断问题`
- `style(wallet): 优化开户选择页样式`
- `refactor(wallet): 重构审核结果流程`
- `feat(router): 新增钱包审核结果页入口`

可选的 emoji 示例：

- `✨ feat(wallet): 新增企业开户入口`
- `🐛 fix(wallet): 修复审核结果页空态展示`
- `feat(wallet): ✨ 新增企业开户入口`
- `fix(wallet): 🐛 修复审核结果页空态展示`

## 来源

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Vanisper/schema-store/.commitlintrc.yaml](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml)
