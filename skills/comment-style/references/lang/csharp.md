# C#（XML 文档注释）

## 注释符号与格式

- 文档注释用 `///` + XML 标签；`<summary>` 一句话定位，`<remarks>` 承载补充说明。
- **XML 须良构**：所有标签必须闭合（对比 Javadoc 宽松 HTML 的 `<li>` 可不闭合，这里不行），`&`、`<` 等需转义或包进 `<code>`。
- 编译器经 `/doc`（或 `GenerateDocumentationFile`）生成 XML 文件；IntelliSense 直接消费；公共成员缺文档会报 CS1591（项目是否开启该告警反映了团队对 API 裸奔的态度）。

## 域模型移植性

- title 域 → `<summary>`
- description 域 → `<remarks>`（分段用 `<para>`，列表用 `<list type="bullet">` + `<item>`）
- signature 域 → `<param name="...">`、`<returns>`、`<exception cref="...">`
- example 域 → `<example>` + `<code>`；交叉引用用 `<see cref="..."/>`、参数引用用 `<paramref name="..."/>`

## 示例

```csharp
/// <summary>按权重把 total 分配到 items。</summary>
/// <remarks>
/// <para>权重为 0 的项自动跳过；末项承担余量，保证总量守恒。</para>
/// </remarks>
/// <param name="total">待分配总量</param>
/// <param name="items">目标项列表</param>
/// <returns>顺序与输入一致的分配结果</returns>
/// <exception cref="ArgumentException">items 为空时</exception>
public List<int> Distribute(int total, List<Item> items)
{
    // ...
}
```

## 常见坑

- 泛型的 `cref` 用花括号：`<see cref="List{T}"/>`，尖括号会破坏 XML
- `<summary>` 写成长篇 → IntelliSense 提示臃肿；展开内容归位到 `<remarks>`
- `<inheritdoc/>` 可继承基类 / 接口文档，覆写成员优先用它而不是复制粘贴

## 规范依据

- Microsoft Learn：XML documentation comments（C# 规范附录）：<https://learn.microsoft.com/dotnet/csharp/language-reference/xmldoc/>（标签定义、良构要求、CS1591）
- 查证日期：2026-08
