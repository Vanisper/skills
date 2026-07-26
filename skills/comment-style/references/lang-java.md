# Java / Javadoc

## 块注释与格式

- 块注释用 `/** */`；空行在生成文档时会被折叠，分段需显式用 `<p>`，列要点用 `<ul>` / `<li>`。
- `<li>` 可不闭合，但 `<ul>` 应闭合。
- 首行摘要是 Javadoc 的概要句，只写一句。

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
