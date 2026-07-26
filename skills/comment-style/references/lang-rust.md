# Rust

## 注释符号

- 条目注释用 `///`，不要用 `//`；模块级注释用 `//!`。
- 用 rustdoc 小节组织契约：`# Examples`、`# Errors`、`# Panics`、`# Safety`。
- 文档示例会被 `cargo test` 当作 doctest 运行，写出来就要能通过。

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

首行一句话摘要，展开说明另起段落。
