# Go

## 注释符号与强约定

Go 的 doc comment 是**成文强约定，整体覆盖基线**（见 [rules.md](../rules.md)「强语言惯例优先」）：

- `//` 注释紧贴声明上方，**中间不能有空行**，否则不被识别为 doc comment。
- doc 注释是**整句、以被声明的标识符名开头、句号结尾**：`// Distribute 按权重把 total 分配到 items，……。`——工具（`go doc`、pkg.go.dev、staticcheck）依赖首词与标识符名的对应关系。
- **没有标签体系**：参数、返回值、错误语义用 prose 描述，不存在 `@param` / `@returns`。
- **每个导出标识符都应有 doc comment**——这是 Go 生态的成文惯例（与本 skill「不让 API 裸奔」同向）。

## 常用形态

- 包注释：`// Package foo 提供……` 写在 package 子句上方；大包可集中放在 `doc.go`。
- 弃用标记：`// Deprecated: 改用 XxxV2。` 独立成段，工具识别并在文档中标注。
- Go 1.19+ doc comment 语法：`[Name]` 链接到标识符、以 `# ` 开头的行作小节标题、缩进块作代码块、`gofmt` 会规范化这些格式。

## 域模型移植性

- title 域 → 首句（以标识符名开头的整句，pkg.go.dev 以首句为列表页摘要）
- description 域 → 后续段落（空行分段）
- signature 域 → 融入 prose（无标签；错误语义、并发安全、零值行为等契约写成句子）
- example 域 → 不写在注释里，写成 `ExampleXxx` 测试函数（`go test` 运行并展示在文档中）

## 示例

```go
// Distribute 按权重把 total 分配到 items，返回顺序与输入一致的分配结果。
//
// 权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
// items 为空时返回 nil。
func Distribute(total int, items []Item) []int {
    // ...
}
```

## 常见坑

- doc comment 与声明之间隔了空行 → 注释静默失效，文档页无内容
- 首词不是标识符名 → linter 告警（`ST1020` 等），文档语义断裂
- 想给示例配文档 → 用 `ExampleDistribute` 测试函数而非注释内代码块，前者可编译、可运行、防过时

## 规范依据

- Go Doc Comments（官方成文规范）：<https://go.dev/doc/comment>（标识符名开头、整句、无标签、Deprecated、1.19+ 语法）
- Effective Go - Commentary：<https://go.dev/doc/effective_go#commentary>
- 查证日期：2026-08
