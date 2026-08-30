# PHP（PHPDoc）

## 注释符号与标准现状

- docblock 用 `/** */`；摘要行与描述之间空一行（渲染折叠机制同 JSDoc）。
- **标准现状要点**：PSR-5（PHPDoc 标准）与 PSR-19（标签目录）**始终停留在 draft、从未获通过**；事实标准是 phpDocumentor 的实现，以及 PHPStan / Psalm 等静态分析器对类型语法的扩展（后者是前者的超集）。引用「PHPDoc 规范」时注意这一层——很多网传规则出处存疑。

## 标签

- `@param type $name 描述`、`@return type 描述`、`@throws FQCN 描述` 是主力
- `@var`：属性与行内变量的类型标注
- `@deprecated`、`@see`、`@link`、`@since`、`{@inheritDoc}` 按需
- **现代 PHP（7.4+ / 8.x）以原生类型声明为准，docblock 不重复纯类型**；docblock 类型只在原生表达不了时补充——泛型集合 `array<int, User>` / `list<User>`、更窄的字面量与联合类型等（这些是 PHPStan / Psalm 语法，选用前确认项目用哪个分析器）

## 域模型移植性

- title 域 → 摘要行
- description 域 → 空行后段落
- signature 域 → `@param` / `@return` / `@throws`
- example 域 → `@example` 支持度参差（phpDocumentor 认、分析器多忽略），示例更常写进描述的代码块

## 示例

```php
/**
 * 按权重把 total 分配到 items
 *
 * 权重为 0 的项自动跳过；末项承担余量，保证总量守恒。
 *
 * @param int $total 待分配总量
 * @param array<int, Item> $items 目标项列表
 * @return list<int> 顺序与输入一致的分配结果
 * @throws InvalidArgumentException items 为空时
 */
function distribute(int $total, array $items): array
{
    // ...
}
```

## 常见坑

- 原生已声明 `int $total` 还写 `@param int $total`（无描述、无窄化）→ 纯噪音，删
- `array` 原生类型表达不了元素类型——`@param array<int, Item>` 这类泛型标注正是 docblock 的当代价值所在
- 混用 PHPStan 与 Psalm 特有语法（如 `@psalm-` 前缀标签）→ 跟随项目所用分析器

## 规范依据

- phpDocumentor docblock 指南：<https://docs.phpdoc.org/guide/getting-started/what-is-a-docblock.html>（事实标准）
- PSR-5 draft（注意：从未获通过）：<https://github.com/php-fig/fig-standards/blob/master/proposed/phpdoc.md>
- PHPStan PHPDoc 类型：<https://phpstan.org/writing-php-code/phpdoc-types>（泛型集合等超集语法）
- 查证日期：2026-08
