# Rust

## 注释符号

- 条目注释用 `///`，不要用 `//`；模块级注释用 `//!`。
- 用 rustdoc 小节组织契约：`# Examples`、`# Errors`、`# Panics`、`# Safety`。
- 文档示例会被 `cargo test` 当作 doctest 运行，写出来就要能通过。

## 域模型移植性

rustdoc 同为 markdown 渲染：相邻行折叠成一段（以空格连接）、空行分段，与 JSDoc 同一套机制。但域模型以「首段 + 标准小节」形态映射，不套用标题域语法：

- title 域 → 首段一句话摘要（rustdoc 用首段作为文档列表页摘要，`#` 标题已被 `# Examples` 等标准小节占用，不再另立标题域）
- description 域 → 摘要后空行另起的段落
- signature 域 → `# Errors`、`# Panics`、`# Safety` 小节（参数、返回值惯例上写进 prose，不用标签）
- example 域 → `# Examples` 小节

## 示例

```rust
/// 按权重把 `total` 分配到 `items`
///
/// 权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
///
/// # Panics
///
/// `items` 为空时 panic。
///
/// # Examples
///
/// ```
/// let items = vec![Item { weight: 3 }, Item { weight: 7 }];
/// let result = distribute(100, &items);
/// assert_eq!(result, vec![30, 70]);
/// ```
pub fn distribute(total: u32, items: &[Item]) -> Vec<u32> {
    // ...
}
```

## rustdoc 小节

按惯例使用这些小节（用 `#` 开头）：

- `# Examples`：用例，最常见；示例会被 `cargo test` 运行。
- `# Panics`：什么输入/状态会 panic。
- `# Errors`：返回 `Result` 时，什么情况返回 `Err`。
- `# Safety`：`unsafe` 函数的安全要求（调用者必须保证什么）。
- `# Note`、`# Warning`：补充说明或注意事项。

首行一句话摘要，展开说明另起段落；title 职责由首段承担，不需要标题语法。

## 规范依据

- The rustdoc book：<https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html>（`///`、`//!`、doctest、首段摘要）
- RFC 1574 API documentation conventions：<https://rust-lang.github.io/rfcs/1574-more-api-documentation-conventions.html>（标准小节惯例）
- 查证日期：2026-08
