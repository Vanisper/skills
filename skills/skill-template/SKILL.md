---
name: skill-template
description: "Internal template for creating reusable skills in this repository. Use when bootstrapping a new skill, copying a bilingual skill structure, or checking required metadata, references, and validation steps."
metadata:
  internal: true
  "description-[zh-CN]": "用于本仓库中新建 skill 的内部模板。适用于复制双语 skill 结构、检查 metadata 填写、reference 组织方式和发布前校验流程。"
  short-description: "内部模板：新建 skill 结构示例"
---

# Skill Template

这是本仓库内部使用的 skill 模板，用于快速创建新的 skill 目录。

## 用途

- 复制成新的 `skills/<skill-name>`
- 演示最小可用的 `SKILL.md` 结构
- 演示 `agents/openai.yaml` 的基本写法
- 演示中英双语 `references/` 的组织方式

## 使用方式

1. 复制整个目录到新的 skill 目录
2. 修改 `name`、`description` 和 `metadata`
3. 更新 `agents/openai.yaml`
4. 按需保留或删减双语 references
5. 用 `npx skills add /path/to/repo --list` 验证发现结果

## Read More

- 中文清单：[references/checklist.zh-CN.md](references/checklist.zh-CN.md)
- English checklist: [references/checklist.md](references/checklist.md)
