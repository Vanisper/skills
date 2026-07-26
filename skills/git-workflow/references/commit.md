# 提交规范

提交头遵循 Conventional Commits 的基本结构：

`<type>[optional scope]: <subject>`

如果是破坏性变更，可以使用：

`<type>[optional scope]!: <subject>`

## Commitlint 约束（来自 schema-store）

这些约束来自共享配置 [schema-store/.commitlintrc.yaml](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml)，在 Conventional Commits 基础上增加了：

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
- `scope` 不要使用中文。`type` 与 `scope` 会进入 CI / 自动化匹配（commitlint、changelog、release 等），必须稳定、可枚举；中文存在近义词不统一（如「钱包 / wallet」「认证 / 鉴权」）问题，故一律英文。
- `subject` 的语言应跟随当前项目的语言偏好，并清楚描述实际改动。
- 如果项目没有明确约定，就跟随主要文档、注释和既有 commit 历史中的主流语言。
- 完整提交头长度应控制在 72 个字符以内。此 72 是 commitlint 的字符计数（基于 UTF-16 码元），不是终端里的显示宽度。
- `emoji` 可选。共享配置已开启 `useEmoji: true`、`emojiAlign: left`，默认放在 `type` 之前。
- 如果使用 `emoji`，以下两种写法都可以：
  - 放在提交头最前面（与配置的 `emojiAlign: left` 一致），例如 `🚀 feat(wallet): 新增企业开户入口`
  - 放在冒号后的 `subject` 开头，例如 `feat(wallet): 🚀 新增企业开户入口`
- 各 `type` 对应的 emoji 以 [commitlintrc](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml) 的 per-type 映射为准（如 `feat`→🚀、`fix`→🩹、`docs`→📖、`refactor`→💅），不要随意混用 gitmoji 风格。
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

可选的 emoji 示例（emoji 取自 commitlintrc 的 per-type 映射）：

- `🚀 feat(wallet): 新增企业开户入口`
- `🩹 fix(wallet): 修复审核结果页空态展示`
- `feat(wallet): 🚀 新增企业开户入口`
- `fix(wallet): 🩹 修复审核结果页空态展示`

## Body 与 Footer

提交头之外，按需补充 body 与 footer：

- header 与 body 之间必须空一行。
- body 用来说明「为什么这样改」「改了什么关键点」，不要复述 diff。按需用 `-` 无序列表（或有序列表）分点说明。
- 每行建议 ≤ 100 个字符（对应 commitlint `body-max-line-length` 的推荐默认值 100）。
- footer 用于标记破坏性变更、关联 issue 或引用，常见写法：

  - `BREAKING CHANGE: <说明>` —— 标记破坏性变更，commitlint 会据此提升语义版本。
  - `Refs: <引用>` —— 关联设计文档、需求或相关 commit。
  - `Closes #123` / `fix #123` —— 关闭 / 修复某个 issue。

示例：

```
feat(wallet): 新增企业开户入口

- 支持企业类型选择与证件上传
- 复用既有 KYC 校验链路，避免重复实现

Closes #42
```

### `!` 与 `BREAKING CHANGE:` 的取舍

二者都表示破坏性变更，可以单独用，也可以一起用：

- `!` 写在 header 的 `type(scope)` 之后、冒号之前，例如 `feat(api)!: 移除旧版登录接口`。适合破坏点一目了然、能在标题说清的场景。
- `BREAKING CHANGE:` 写在 footer，后跟一段说明，例如：

  ```
  feat(api): 调整登录返回结构

  BREAKING CHANGE: 登录接口不再返回 token 字段，改用 accessToken
  ```

经验：破坏点能在 header 一句话说清就用 `!`；需要展开影响范围或迁移方式时，用 footer 的 `BREAKING CHANGE:` 并补充说明；两者也可以同时使用。

## 来源

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Vanisper/schema-store/.commitlintrc.yaml](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml)
