# Java / Javadoc

## 块注释与格式

- 块注释用 `/** */`；空行在生成文档时会被折叠，分段需显式用 `<p>`，列要点用 `<ul>` / `<li>`。
- 折叠来自 HTML 折叠空白的行为，与 markdown 渲染同源；标题能力靠块级 HTML 标签实现。JDK 23 起支持 `///` markdown 文档注释（JEP 467），标题与空行规则与 markdown 一致；存量主流仍是 `/** */` + HTML 风格，跟随项目现状。
- `<li>` 可不闭合，但 `<ul>` 应闭合。
- 首行摘要是 Javadoc 的概要句，只写一句。

## 域模型移植性

- title 域 → 首行概要句（Javadoc 以第一句为 summary，进入索引页）
- description 域 → `<p>` 开启的后续段落；标题需求用 `<h2>` 等块级 HTML 标签（成员上少见，接口/类级偶用）
- signature 域 → `@param`、`@return`、`@throws`
- example 域 → `<pre>{@code ...}</pre>` 或 JDK 23 markdown 注释中的代码块

## 示例

```java
/**
 * 按权重把 total 分配到 items。
 *
 * <p>权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
 *
 * <ul>
 *   <li>权重为 0 自动跳过
 *   <li>末项承担余量
 * </ul>
 *
 * @param total 待分配总量
 * @param items 目标项列表
 * @return 分配结果
 */
public List<Integer> distribute(int total, List<Item> items) {
    // ...
}
```

## 标签

- `@param`、`@return`、`@throws` 是主力标签。
- `@see`、`@since`、`@deprecated` 按需使用。
- `@code` 内联代码：`{@code variable}`。
- `@link` 交叉引用：`{@link ClassName#methodName}`。

## 常见坑

- 空行会被折叠——如果想换行，用 `<p>` 开启新段落。
- 列表不会自动识别，必须显式 `<ul>` / `<li>`。
- HTML 标签可以不闭合（`<li>` 常不闭合），但 `<ul>` / `<ol>` 应闭合以保证结构完整。

## 规范依据

- Documentation Comment Specification for the Standard Doclet：<https://docs.oracle.com/en/java/javase/21/docs/specs/javadoc/doc-comment-spec.html>（标签定义、首句 summary）
- How to Write Doc Comments（Oracle 风格指南）：<https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html>
- JEP 467 Markdown Documentation Comments：<https://openjdk.org/jeps/467>
- 查证日期：2026-08
