---
name: plantuml
description: "Mermaid 表达力不够时用 PlantUML 画更复杂的图（时序/类/组件/部署/状态/用例/C4 等）。把 PlantUML 源码编码成官方 server 或 Kroki 的可渲染 URL，直接取回 SVG/PNG 图片或 ASCII 文本图，默认无需本地 Java。涉及 sequence/class/component/deployment/state/usecase 图、C4 架构图、plantuml、puml 时使用。"
metadata:
  short-description: "PlantUML 图：编码渲染 SVG/PNG/ASCII，多后端可选"
---

# PlantUML

Mermaid 画不了或画不好的复杂图，用 PlantUML。典型场景：复杂时序图、类图、组件/部署图、状态机、用例图、C4 架构图，以及需要 `!include` 子图、主题皮肤、creole 排版时。**Mermaid 够用就别用本 skill**——它不替代简单图。

## 为什么这样设计

PlantUML 渲染通常要本地 Java + plantuml.jar，对用户环境要求高。本 skill 把渲染放到 server：把源码编码成 URL，server 直接返回 **SVG/PNG 图片** 或 **ASCII 文本图**（`/txt/`），**默认零本地 Java**。唯一一件模型干不了的事（原始 deflate + PlantUML 自定义 base64 编码）由 [scripts/plantuml.mjs](scripts/plantuml.mjs) 完成。

## 按场景使用

### 留档（项目规划 / 文档图，最常见）

`.puml` 源码落盘并纳入版本管理，渲染图生成在它旁边（同名 `.svg`）。**源码是事实来源，图片是产物**，两者并列维护；改图就改 `.puml` 再重渲染。

```bash
# 1. 写源码，如 docs/order-flow.puml（语法见 references/syntax.md）
# 2. 渲染到源码旁同名 .svg（render 不带 -o 即默认输出到旁边）
node scripts/plantuml.mjs render docs/order-flow.puml -f svg
# 3. 源码与图片一起提交；GitHub README 拦 SVG，那种位置用 -f png
```

### 临时分享（聊天 / 一次性，不落盘）

直接给公共 server 的分享 URL——注意：源码会上送公共 server，仅用于非敏感内容。

```bash
node scripts/plantuml.mjs url diagram.puml -f png   # png 比 svg 更通用
```

### 纯文本 / 终端（commit、邮件、终端输出）

直接渲染 ASCII 文本图到 stdout（公共 server `/txt/` 实测可用）。

```bash
node scripts/plantuml.mjs text diagram.puml
```

## 通用约束

- **格式**：默认 **SVG**（可缩放、不泄露源码）；GitHub README 等拦 SVG 的位置用 **PNG**，分享前 `-nometadata`（PNG 元数据内嵌源码）。
- **ASCII 文本图**：默认走 `/txt/`。`/utxt/`（Unicode 框线）在公共 server 上会被广告层注入 HTML、**不可靠**——要 Unicode 框线用本地 jar `-tutxt` 或自建 server。
- **隐私红线**：公共 server（plantuml.com / kroki.io）会收到完整源码。含敏感 / 专有信息的图，留档与临时都应切本地后端（`--base` 自建 server、或本地 jar）——**绝不静默改用公共后端**。Kroki 用于大图（免编码 POST）或已有 Kroki 的场景。
- **校验自愈**：脚本对 svg/png/txt 做 magic 校验，遇到广告层 HTML 注入或语法错会非零退出并把响应体当调试通道打印；按 [references/troubleshooting.md](references/troubleshooting.md) 的降级阶梯修。
- **如实报告**：脚本会打到 stderr——用了哪个 host、源码是否离开本机、写到了哪个文件。

## 何时读哪份 Reference

- 选后端、自建 server、本地 jar、Kroki POST、隐私取舍 → [backends.md](references/backends.md)
- 图种语法、最小模板、C4、皮肤主题 → [syntax.md](references/syntax.md)
- 渲染失败、降级阶梯、ASCII 对齐、PNG 元数据、GitHub SVG 限制 → [troubleshooting.md](references/troubleshooting.md)

## 目录

- `references/` — 按意图分流的细则。
- `scripts/plantuml.mjs` — 编码 + 拉取渲染产物（零依赖，Node 18+）。
