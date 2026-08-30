# C / C++（Doxygen）

## 注释符号与格式

- Doxygen 认多种块形态：`/** */`（JavaDoc 风格）、`/*! */`（Qt 风格）、`///`、`//!`——**项目内统一一种**。
- 命令前缀 `@`（JavaDoc 风格）与 `\`（原生风格）等价，同样项目内统一。
- **API 文档写在头文件**：使用者拿到的是头文件，实现细节注释留在 `.c` / `.cpp`。
- 首行摘要：显式 `@brief`，或开启 `JAVADOC_AUTOBRIEF` 让首句自动作 brief——跟随项目 Doxyfile 配置。

## 域模型移植性

- title 域 → `@brief`（或 autobrief 首句）
- description 域 → brief 后空行另起的 detailed description
- signature 域 → `@param[in]` / `@param[out]` / `@param[in,out]`、`@return`、`@retval`（逐个返回值枚举）、`@throws`
- example 域 → `@code ... @endcode`；关联引用 `@see`、提醒 `@note` / `@warning`

## 示例

```cpp
/**
 * @brief 按权重把 total 分配到 items
 *
 * 权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
 *
 * @param[in]  total  待分配总量
 * @param[in]  items  目标项数组
 * @param[out] out    分配结果，长度与 items 一致
 * @retval 0   成功
 * @retval -1  items 为空
 */
int distribute(int total, const Item* items, int* out);
```

## 常见坑

- `@param` 的 `[in]` / `[out]` 方向标注是 C / C++ 特有价值——指针出参不标方向，读者无从判断谁分配、谁写入
- 混用 `/*!` 与 `/**`、混用 `@` 与 `\` → 文档能生成但风格漂移，reviewer 无所适从
- 宏与条件编译包裹的声明，Doxygen 可能解析不到——复杂宏接口的文档写在展开后的稳定声明上

## 规范依据

- Doxygen Manual - Documenting the code：<https://www.doxygen.nl/manual/docblocks.html>（块形态、brief 规则）
- Doxygen Manual - Special Commands：<https://www.doxygen.nl/manual/commands.html>（`@param` 方向、`@retval` 等）
- 查证日期：2026-08
