---
name: skill-template
description: "本仓库内部使用的 skill 模板。用于新建 skill 时复制基础结构、检查必填 metadata 与 reference 组织方式，以及发布前校验。"
metadata:
  internal: true
  short-description: "内部模板：新建 skill 结构示例"
---

# Skill Template

这是本仓库内部使用的 skill 模板，用于快速创建新的 skill 目录。

## 用途

- 复制成新的 `skills/<skill-name>`
- 演示最小可用的 `SKILL.md` 结构
- 演示 `agents/openai.yaml` 的基本写法
- 演示 `references/` 的组织方式

## 使用方式

1. 复制整个目录到新的 skill 目录
2. 修改 `name`、`description` 和 `metadata`
3. 更新 `agents/openai.yaml`
4. 按需增删 references
5. 用 `npx skills add /path/to/repo --list` 验证发现结果

## 语言说明

本仓库的 skill 文档统一用中文维护，不提供英文翻译（出于维护成本，非语言偏好）；skill id、目录名、`name` 保持英文以兼容 `skills` CLI。完整说明见 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

## 参考

- 新建 skill 清单：[references/checklist.md](references/checklist.md)
- 定位与行文约定：[CONTRIBUTING.md](../../CONTRIBUTING.md)（skill 的定位、行文约定两节）
