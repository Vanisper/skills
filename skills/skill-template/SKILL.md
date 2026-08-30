---
name: skill-template
description: "本仓库内部使用的 skill 黄金样板。复制它得到理想的目录与正文骨架：填好 frontmatter、按意图分流 references、并在「何时读哪份 reference」登记，复制后即可通过校验脚本。"
metadata:
  internal: true
  short-description: "内部黄金样板：新建 skill 的填空式结构模板"
---

# Skill Template（复制后逐段替换 `{{...}}`）

这是仓库内部的「黄金样板」：复制整个目录成 `skills/<new-skill>/`，再把下面每段 `{{...}}` 换成你的内容。结构本身即示范——照着填就能通过 `node scripts/check-skills.mjs`。**正文各节先给一句话定位（摘要先行）、说人话，细节下沉到 `references/`。**

## {{一句话定位}}

{{首段先说清：这个 skill 做什么、什么时候用；再点明什么时候「别用」（边界）。参与发现的长描述写在 frontmatter 的 `description`，正文首段是给读者的人话版。}}

## 为什么这样设计

{{可选但推荐：说明相对模型默认行为的增量——特有规则、拿来即用的模板、对照表、纠偏条目。没有增量，就别建这个 skill。}}

## 按场景使用

{{把主干用法写成 1–2 个最小示例；每个场景先一句话点题，再给命令 / 步骤。复杂细节不要堆在这里，拆到 `references/`。}}

```bash
# {{最小可跑示例：让复制者照抄即可验证 skill 能用}}
```

## 何时读哪份 reference

按意图分流——每个 reference 文件绑定一个用户意图，一意图一文件；新增 reference 时在此登记触发意图（这是全仓库统一的路由节，标题固定叫「何时读哪份 reference」）。

- {{意图：照着搭目录、对齐正文骨架}} → [structure.md](references/structure.md)
- {{意图：提交前收尾自检}} → [checklist.md](references/checklist.md)

## 目录

- `references/` — 按意图分流的细则（当前：`structure.md`、`checklist.md`）。
- `agents/openai.yaml` — 面向 UI / 产品层的展示元信息（`display_name` / `short_description` / `default_prompt` / `policy`）。
