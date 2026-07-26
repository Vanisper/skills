---
name: comment-style
description: "代码注释与 API 文档规范 skill。用于在任意主流语言项目（TS/JS/Vue/React、Rust、Java 等）中补充、改写、评审或统一注释风格：判断是否需要注释、选择注释语言、编写 why-focused 注释、为导出 API 补充 JSDoc / TSDoc / rustdoc / Javadoc 风格文档，以及清理 TODO/FIXME。"
metadata:
  short-description: "代码注释、API 文档与语言偏好"
---

# Comment Style

在需要为代码补充、重写、清理或评审注释时使用这个 skill，适用于任意主流语言项目；示例以 TypeScript / JSDoc 为主，但规则不绑定具体技术栈，Rust、Java 等项目同样可触发。

## 注释语言策略

- 注释语言与项目主体语言对齐。
- 单个文件内尽量只保留一种主注释语言；专有名词、协议名、外部字段名保持原文。

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
- `@param`、`@returns`、`@example`、`@throws`、`@see`、`@deprecated` 一般较稳妥；需要补充说明时优先考虑 `@description`，面向 VS Code 悬浮提示 / TypeDoc 类工具链，提示更直接；若项目用经典 jsdoc 生成器，`@description` 会覆盖首行摘要，需在该项目内另行约定。
- `@remarks`、`@default` / `@defaultValue`、`@emits` 这类标签分属不同文档标准或框架（TSDoc、JSDoc、Vue 等），不能一刀切；选用前提见 [rules.md](references/rules.md)「标签建议」。
- `@emits` 是标准 JSDoc 中 `@fires` 的同义词。Vue 生态惯用 `@emits` 记录组件事件；React 默认应记录 props、callback 和 Hook 契约，而不是套用事件语义。
- 默认值的权威来源优先是代码本身。只有当默认值不直观、文档工具会读取该标签，或项目已有明确惯例时，才额外写默认值标签。

## Reference Guide

- 通用规则（何时写、语言策略、语境区分、标点、API 契约、TODO）：[references/rules.md](references/rules.md)
- 分语言惯例（可插拔，一门语言一个文件）：
  - TypeScript / JavaScript / JSDoc：[references/lang-typescript.md](references/lang-typescript.md)
  - Rust：[references/lang-rust.md](references/lang-rust.md)
  - Java / Javadoc：[references/lang-java.md](references/lang-java.md)
- 提交前检查：[references/checklist.md](references/checklist.md)

## 何时读取哪份 Reference

- 判断该不该写注释、写什么、通用标点与 API 契约规则 → `rules.md`。
- 处理某门语言的文档注释符号、doc 工具链、标签选择 → 对应 `lang-<语言>.md`。
- 完成注释补充或改写后，收尾前 → `checklist.md`。

新增一门语言时，加一个 `references/lang-<语言>.md`，并在上面两处登记，不动既有语言文件——分语言惯例是可插拔的。
