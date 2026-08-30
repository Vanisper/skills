# 目录与正文骨架范例

一句话：照这张骨架搭新 skill 的目录与 `SKILL.md` 分节，再逐段替换 `{{...}}`。结构对齐了，校验脚本就能过。

## 目录三件套

```text
skills/<skill-name>/
├── SKILL.md            # 入口：frontmatter + 精简正文
├── agents/
│   └── openai.yaml     # 面向 UI / 产品层的展示元信息
└── references/         # 按意图分流的细则，一意图一文件
    ├── structure.md
    └── checklist.md
```

- `references/` 可按需再分子目录（如 comment-style 的 `lang/` 按语言归组），校验脚本递归识别；链接与登记规则不变。

- 不要把 skill 放在仓库根目录，否则 `skills` CLI 发现不到。
- 额外资产目录（如 `templates/`、`assets/`）可按需携带，但须在 `SKILL.md` 登记用途。

## SKILL.md frontmatter 骨架

```yaml
---
name: <skill-name>            # 英文、小写、短横线
description: "做什么、什么时候用，一句话参与发现"
metadata:
  short-description: "简短定位，须与 openai.yaml 的 short_description 逐字一致"
---
```

## 正文分节骨架（推荐而非唯一）

下面是推荐大纲，不是唯一合法结构。有增量的 skill 可以增删节，但「何时读哪份 reference」标题固定，每个 reference 都要登记。

1. **一句话定位** — 首段说清做什么、什么时候用、什么时候别用。
2. **为什么这样设计**（可选）— 相对模型默认行为的增量。
3. **按场景使用 / 默认流程** — 1–2 个最小示例，细节下沉。
4. **何时读哪份 reference** — 每个 reference 绑定一个意图并在此登记（标题固定用词）。
5. **目录** — 列出 `references/` 与资产目录用途。

## 语言说明（仓库政策，不要原样贴进新 skill 的 SKILL.md）

本仓库的 skill 文档统一用中文维护，不提供英文翻译（维护成本取舍，非语言偏好）；skill id、目录名、`name` 保持英文以兼容 `skills` CLI。完整约定见仓库 [CONTRIBUTING.md](../../../CONTRIBUTING.md) 的「行文约定」「语言说明」两节。

复制模板时：这条是仓库政策，写在本文件备查即可，不要当作新 skill 正文的必抄段落。

## 校验契约（避免踩坑）

- `SKILL.md` 里指向 `references/`、`scripts/` 的相对链接必须真实存在，且每个 reference 文件都要被 `SKILL.md` 登记——没登记的 reference 是孤儿，校验会失败。
- `agents/openai.yaml` 的 `default_prompt` 须含 `$<skill-name>` 占位、`display_name` 非空、`short_description` 与 `metadata.short-description` 逐字一致。
- 内部 / 演示类 skill：`metadata.internal: true` 配 `policy.allow_implicit_invocation: false`，且不要登记进 README「当前 Skills」。
