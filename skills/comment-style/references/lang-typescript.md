# TypeScript / JavaScript / JSDoc

## 块注释与标签

- 块注释用 `/** */`；首导出符号须单独写 JSDoc，避免文件级注释被误挂到第一个导出。
- 摘要写在首行，补充说明用 `@description`；摘要与 `@description` 之间空一行。
- 需要补充主说明时默认优先 `@description`：此写法面向 VS Code 悬浮提示 / TypeDoc 类工具链，提示更直接。注意经典 jsdoc 生成器（如 jsdoc CLI）会把 `@description` 当作完整描述并覆盖首行摘要，在该类项目里需另行约定。
- 若项目已统一使用 `@remarks`，延续现有约定，不要在一个项目里混出两套标签体系。

## 域布局与 hover 渲染

VS Code 悬浮提示按 markdown 渲染块注释：相邻行折叠成一段（以空格连接），空行分段。由此：

- title 用 `#` 标题语法时自成段落，副标题紧跟其后不用空行
- title 不用标题语法时，主副标题之间必须空一行，否则 hover 时两行被连成一行
- description 域用 `@description` 显式定位，与 title 的分界不依赖空行猜读

## 示例

```ts
/**
 * 按权重分配数量到目标项
 * @description
 * - 权重为 0 的项自动跳过
 * - 末项承担余量，保证总量守恒
 * @param total 待分配总量
 * @param items 目标项数组
 * @returns 顺序与输入一致的分配结果
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

## 标签选择

下列标签分属不同文档标准或框架，按项目实际工具链选用，不要一刀切：

- `@remarks`：TSDoc 标准标签（VS Code 悬浮提示、TypeDoc 支持），经典 jsdoc 不识别；与 `@description` 同属「补充说明」，同一项目只用一套
- `@default` / `@defaultValue`：两者同义但分属两个标准——`@default` 是 JSDoc 标签（值当代码字面量呈现，可自动探测简单字面量），`@defaultValue` 是 TSDoc 标签（内容当 markdown，TypeDoc 首选）；按项目文档工具选用。默认值权威来源仍是代码本身，仅在默认值不直观时才标注
- `@emits`：标准 JSDoc 中 `@fires` 的同义词（由 JSDoc issue #324 引入）；Vue 生态惯用 `@emits` 记录组件事件，React 不套用事件语义，改记 props / callback / Hook 契约

选择原则：

- 如果项目已经有稳定约定，就跟随现有约定
- 如果项目在用 TypeDoc，优先用 `@description` / `@remarks` / `@defaultValue` 等 TSDoc 标签
- 如果项目在用经典 jsdoc 生成器，避免 `@description` 覆盖首行摘要的陷阱，用 `@default` 而非 `@defaultValue`
- Vue 项目可自然用 `@emits`，React 项目记 props / callback / Hook 契约

## Vue / React 差异

- **Vue**：组件事件记 `@emits`、Props 记 `@prop` 或 `defineProps` 注释、`computed` / `ref` 优先命名自解释。
- **React**：Props 记 interface 注释、callback 记 JSDoc、Hook 返回值和契约记在 Hook 的块注释里。不要把 React 组件的 props callback 套用 Vue 的 `@emits` 语义。
