---
name: comment-style
description: "代码注释与 API 文档规范 skill。用于在任意主流语言项目（TS/JS/Vue/React、Python、Go、Rust、Java、Kotlin、C#、C/C++、PHP、Shell 等）中补充、改写、评审或统一注释风格：以读者理解成本权衡注释去留、选择注释语言、按域模型组织 API 文档注释、为内部实现补必要注释，以及清理 TODO/FIXME。"
metadata:
  short-description: "代码注释、API 文档与语言偏好"
---

# Comment Style

在需要为代码补充、重写、清理或评审注释时使用这个 skill，适用于任意主流语言项目；示例以 TypeScript / JSDoc 为主，但规则不绑定具体技术栈，Python、Go、Rust、Java 等项目同样可触发。

## 目标

- 注释服务读者：裁判标准是**读者读起来的成本**，不是「代码能否表达」——两者相关但不等同，自解释性是相对读者的属性。
- 在噪音与裸奔之间权衡：既不复述代码制造噪音，也不把「克制」当默认值、放任模块内部零注释。
- 对公共 API 使用项目能接受的文档注释风格，按域模型组织；内部实现的非显然逻辑、阶段导航同样正当使用注释。
- 让注释尽量贴近被解释的代码，重构时同步维护，保持简洁、可扫描。

## 默认流程

1. 先看周围文件已有注释风格、文档标签和语言偏好。
2. 用「读者收益 vs 维护成本」权衡是否需要注释——按读者画像（语言背景、领域熟悉度）判断自解释性，不拿作者的熟悉度代替。
3. 需要解释契约时按域模型组织：先写「这是什么」，再补行为、边界、顺序或示例。域模型是基线方案（作者偏好），项目已有惯例时让位。
4. 细节尽量下沉到最小作用域：字段约束写字段级注释，局部陷阱写行内注释。
5. 完成前删除复述代码、过时、注释掉的死代码等坏注释，并用 checklist 自检。

## 注释语言策略

- 注释语言与项目主体语言对齐。
- 单个文件内尽量只保留一种主注释语言；专有名词、协议名、外部字段名保持原文。

## 重要纠偏

- 模型默认的「零注释 / 只给对外 API 写注释」是需要纠偏的失败模式，不是克制的美德；模块内部的非显然实现、阶段划分同样值得注释——权衡与读者画像细则见 rules.md「权衡模型」。
- 反向极端同样成立：注释不补偿烂命名，能改名先改名；复述代码的噪音注释要删。「跨文件消费」不等于「必须写 API 注释」，两个方向都由权衡模型裁决。
- 标签「该用什么」按四层裁决：规范依据 → 工具链现实 → 项目现状 → 个人偏好，事实与偏好不混写；各语言细则见对应 lang 文件。

## 参考文档

- 通用规则（权衡模型、命名与注释、域模型、强语言惯例优先、TODO）：[references/rules.md](references/rules.md)
- 标点细则（语境区分、句末句号、列表标点；作者风格偏好）：[references/punctuation.md](references/punctuation.md)
- 分语言惯例（可插拔，一门语言一个文件，含尾部「规范依据」出处）：
  - TypeScript / JavaScript / JSDoc：[references/lang/typescript.md](references/lang/typescript.md)
  - Rust：[references/lang/rust.md](references/lang/rust.md)
  - Java / Javadoc：[references/lang/java.md](references/lang/java.md)
  - Python：[references/lang/python.md](references/lang/python.md)
  - Go：[references/lang/go.md](references/lang/go.md)
  - C#：[references/lang/csharp.md](references/lang/csharp.md)
  - C / C++（Doxygen）：[references/lang/cpp.md](references/lang/cpp.md)
  - Kotlin：[references/lang/kotlin.md](references/lang/kotlin.md)
  - PHP：[references/lang/php.md](references/lang/php.md)
  - Shell：[references/lang/shell.md](references/lang/shell.md)
- 提交前检查：[references/checklist.md](references/checklist.md)

## 何时读哪份 reference

- 判断该不该写注释、写什么、API 契约规则 → `rules.md`。
- 中文注释句末句号、列表项标点等细则 → `punctuation.md`。
- 处理某门语言的文档注释符号、doc 工具链、标签选择 → 对应 `lang/<语言>.md`。
- 完成注释补充或改写后，收尾前 → `checklist.md`。

新增一门语言时，加一个 `references/lang/<语言>.md`，并在上面的参考文档列表、`rules.md` 路由表与 `checklist.md` 分语言组登记，不动既有语言文件——分语言惯例是可插拔的。
