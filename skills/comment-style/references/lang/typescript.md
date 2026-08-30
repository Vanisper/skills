# TypeScript / JavaScript / JSDoc

## 块注释与域布局

- 块注释用 `/** */`；首导出符号须单独写 JSDoc，避免文件级注释被误挂到第一个导出。
- 按域模型组织（title / description / signature / example），**域之间空一行**，构成见 [rules.md](../rules.md)「注释的构成（域模型）」。
- title 域可用 markdown 标题语法，层级随符号从属关系：类 / 接口 / 导出函数等顶层符号可用 `#`，方法、属性等成员用 `##` 或 `###`（具体级别是观感取舍，项目内一致即可）。

VS Code 悬浮提示按 markdown 渲染块注释：相邻行折叠成一段（以空格连接），空行分段。由此：

- title 用标题语法时自成段落，下一行可直接续写辅助描述，不会粘连
- title 不用标题语法时，主副标题之间必须空一行，否则 hover 时两行被连成一行
- description 域的标签跟随项目既有约定（`@description` 或 `@remarks`），不要按本文件示例另起一套

## 示例

顶层导出函数（标题域用 `#`，也可省略标题语法）：

```ts
/**
 * # 按权重分配数量到目标项
 *
 * @param total 待分配总量
 * @param items 目标项数组
 * @returns 顺序与输入一致的分配结果
 *
 * @example
 * ```ts
 * distribute(100, [
 *   { id: 'A', weight: 3 },
 *   { id: 'B', weight: 7 },
 * ])
 * ```
 */
export function distribute(total: number, items: Item[]): number[] {
  // ...
}
```

类与成员的层级变体（类用 `#`、方法用 `###` 属合法观感取舍）：

```ts
/**
 * # 转换器
 */
export class Transformer {
  /**
   * ### 从 `JSON` 转换到当前类的对象
   *
   * @description 会自动进行数据别名转换
   *
   * @param json `JSON`
   */
  static fromJson<T extends Transformer>(json: IJson = {}): T {
    // ...
  }
}
```

「使用向」注释（组件、对外库）可用更丰富的 markdown——链接、`***` 分隔线等，hover 原样渲染：

```ts
/**
 * 视图容器，和 div 类似，用于包裹各种元素内容
 *
 * 包裹文字建议使用 text
 * ***
 * [👉 组件文档](https://example.com/docs/view)
 * |
 * [使用说明](https://example.com/guide)
 */
```

## 标签选择（按四层裁决归位）

**层 1 规范依据**（事实，出处见尾部）：

- JSDoc 与 TSDoc 是两套标准：`@description`、`@default`、`@fires` 属 JSDoc；`@remarks`、`@defaultValue` 属 TSDoc（TSDoc 还把标签分为 core / extended / discretionary 三级）
- `@param`、`@returns`、`@example`、`@throws`、`@see`、`@deprecated` 两套标准都有，跨项目最稳妥

**层 2 工具链现实**（可实测验证）：

- 经典 jsdoc CLI 会把 `@description` 当作完整描述并**覆盖首行摘要**；VS Code 悬浮提示 / TypeDoc 则把两者都渲染
- `@default` 的值当代码字面量呈现（jsdoc 可自动探测简单字面量）；`@defaultValue` 的内容当 markdown（TypeDoc 首选）

**层 3 项目现状**：

- 已有稳定约定就跟随；`@description` 与 `@remarks` 同属「补充说明」，一个项目只用一套
- 项目用 TypeDoc → 优先 TSDoc 标签；项目用经典 jsdoc 生成器 → 避开 `@description` 覆盖陷阱、用 `@default`

**层 4 个人口味**（显式标注，他人可取舍）：

- 本仓库作者偏好用 `@description` 显式标记 description 域（面向 VS Code hover 的直接性）；默认值权威来源是代码本身，仅在不直观时补默认值标签

## Vue / React 差异

Vue：

- 模板里悬停组件标签的组件级说明，是 vue-language-tools 的 **rich hover**（[PR #5881](https://github.com/vuejs/language-tools/pull/5881)）；实验特性，需开启 `vue.hover.rich`
- skill **不据此立规则**：不要求开启、不依赖它写注释
- 面向使用者的可靠载体仍是成员级 `defineProps` JSDoc（写在 interface 成员上，使用方 hover 该 prop 时显示）；`<script setup>` 顶部盒式局域头面向维护者（见 [rules.md](../rules.md)「文件头与局域头注释」）

React：

- Props 记 interface 注释、callback 记 JSDoc、Hook 返回值和契约记在 Hook 的块注释里

## 规范依据

- JSDoc 标签参考：<https://jsdoc.app>（`@description`、`@default`、`@fires` 定义）
- TSDoc 标准：<https://tsdoc.org>（`@remarks`、`@defaultValue`，标签三级分类）
- vue-language-tools rich hover：<https://github.com/vuejs/language-tools/pull/5881>（实验特性、`vue.hover.rich`）
- 查证日期：2026-08；结论若与工具新版本行为冲突，以实测为准并回来更新本节
