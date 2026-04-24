---
name: comment-style
description: "Code comment and API doc style guide for adding, revising, or reviewing comments in TypeScript, JavaScript, Vue, and React codebases. Use when deciding whether code needs comments, standardizing comment language, writing concise why-focused comments, documenting exported APIs with JSDoc/TSDoc-compatible tags, or cleaning up stale TODO/FIXME notes. Supports bilingual references: prefer Chinese references for Chinese users and English references for English-first projects."
metadata:
  short-description: "代码注释、API 文档与语言偏好"
  "description-[zh-CN]": "代码注释与 API 文档规范。用于在 TypeScript、JavaScript、Vue、React 项目中补充、改写、评审或统一注释风格，包括判断是否需要注释、选择注释语言、编写 why-focused 注释、为导出 API 补充 JSDoc/TSDoc 风格文档，以及清理 TODO/FIXME。支持中英双语 reference：中文用户优先中文，英文项目优先英文。"
---

# Comment Style

在需要为代码补充、重写、清理或评审注释时使用这个 skill，尤其适合 TypeScript / JavaScript / Vue / React 项目。

## Language Strategy

- skill id、目录名、`name` 和 reference 基础文件名使用英文。
- 注释语言优先跟随项目主流语言；如果没有明确约定，就参考既有文档、注释、提交信息和 UI 文案。
- 单个文件内尽量只保留一种主注释语言；专有名词、协议名、外部字段名保持原文。
- 中文语境或中文项目优先读取 `*.zh-CN.md`。
- 英文语境或英文项目优先读取默认英文 `.md` 文件。

## Goals

- 只写代码自身不能稳定表达的信息：原因、约束、边界、兼容性、技术债、时序、副作用。
- 让注释尽量贴近被解释的代码，减少失真和过时。
- 对公共 API 使用项目能接受的 JSDoc / TSDoc 风格注释，而不是机械地给所有符号补块注释。
- 保持注释简洁、可扫描，并在重构时同步维护。

## Default Workflow

1. 先看周围文件已有注释风格、文档标签和语言偏好。
2. 判断这段代码是否真的需要注释；命名、类型和直观控制流通常不需要额外解释。
3. 需要解释契约时，先写“这是什么”，再补行为、边界、顺序或示例。
4. 细节尽量下沉到最小作用域：字段约束写字段级注释，局部陷阱写行内注释。
5. 完成前删除复述代码、过时或范围过大的注释，并用 checklist 自检。

## Important Corrections

- 不要把“跨文件消费”直接等同于“必须写 API 注释”。优先为导出 API、公共组件、复用 Hook，或任何存在非直观契约、边界、副作用的符号补文档。
- `@param`、`@returns`、`@example`、`@throws`、`@see`、`@deprecated` 一般较稳妥；`@remarks` / `@description`、`@default` / `@defaultValue`、`@emits` 应跟随项目工具链和既有约定，而不是强制一刀切。
- `@emits` 主要用于 Vue 组件或显式事件发射器。React 组件默认应记录 props、callback 和 Hook 契约，而不是套用 “emits” 语义。
- 默认值的权威来源优先是代码本身。只有当默认值不直观、文档工具会读取该标签，或项目已有明确惯例时，才额外写默认值标签。

## Reference Guide

- 核心规则：
  - 中文：[references/rules.zh-CN.md](references/rules.zh-CN.md)
  - English: [references/rules.md](references/rules.md)
- 提交前检查：
  - 中文：[references/checklist.zh-CN.md](references/checklist.zh-CN.md)
  - English: [references/checklist.md](references/checklist.md)

## 何时读取哪份 Reference

- 需要判断某段代码该不该写注释、该用哪种注释形式时，先看 `rules`。
- 完成注释补充或改写后，收尾前看 `checklist`。
- 中文语境下优先读取 `*.zh-CN.md`；英文语境下优先读取默认英文文件。
