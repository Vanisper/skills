# Kotlin（KDoc）

## 注释符号与格式

- KDoc 用 `/** */`，**markdown 原生**：相邻行折段、空行分段、标题与列表直接用 markdown 语法——与 rustdoc 同一套渲染机制（见 [rust.md](rust.md)）。
- 首段即摘要，Dokka 以首段作列表页摘要。
- 文档工具是 Dokka。

## 标签

- `@param`、`@return`、`@throws` / `@exception`、`@see`、`@since` 常规使用
- `@property`：主构造器属性的说明写在**类的 KDoc** 里（主构造器参数位置无法单独挂块注释）——这是对基线「字段说明下沉到成员」的语言级例外，登记为差异而非违例
- `@constructor`：主构造器本身的说明
- `@receiver`：扩展函数的接收者
- `@sample`：引用一个真实函数作为示例（编译期校验存在性、防过时），优先于内联大段代码
- **没有 `@deprecated` 标签**：KDoc 明确不提供，弃用一律用 `@Deprecated` 注解表达（可携带 `ReplaceWith` 自动迁移）

## 域模型移植性

- title 域 → 首段摘要（markdown 标题语法可用但少见，Dokka 场景首段即够）
- description 域 → 空行后段落
- signature 域 → `@param` / `@return` / `@throws`；主构造器属性经 `@property`
- example 域 → `@sample`（优先）或内联代码块

## 示例

```kotlin
/**
 * 按权重把 [total] 分配到 [items]，返回顺序与输入一致的分配结果
 *
 * 权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
 *
 * @param total 待分配总量
 * @param items 目标项列表
 * @throws IllegalArgumentException items 为空时
 * @sample com.example.samples.distributeSample
 */
fun distribute(total: Int, items: List<Item>): List<Int> {
    // ...
}
```

## 常见坑

- 在 KDoc 里写 `@deprecated` → Dokka 不识别、IDE 不划线；必须用 `@Deprecated` 注解
- `[identifier]` 方括号是 KDoc 的交叉引用语法，误当普通 markdown 链接会断链
- 类体内的属性可以直接挂 KDoc（此时正常下沉，不走 `@property`）；只有主构造器属性才需要 `@property`

## 规范依据

- Document Kotlin code: KDoc：<https://kotlinlang.org/docs/kotlin-doc.html>（标签清单、无 @deprecated、@property 用法）
- Dokka：<https://kotlinlang.org/docs/dokka-introduction.html>
- 查证日期：2026-08
