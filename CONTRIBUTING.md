# 贡献指南

这个仓库用来维护可复用的 Agent Skills。下面这份指南主要面向两类工作：

- 新增一个全新的 skill
- 维护现有 skill 的结构、文案和 references

## 目录约定

仓库里的 skill 统一放在：

```text
skills/<skill-name>/
```

每个 skill 至少包含：

```text
skills/<skill-name>/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
```

不要把 skill 直接放在仓库根目录，否则 `skills` CLI 很可能无法正确发现。

## 新建 Skill 的推荐流程

### 1. 复制模板

直接复制内置模板：

```bash
cp -R skills/skill-template skills/<new-skill-name>
```

如果你在 macOS 或 Linux 下，也可以用：

```bash
rsync -a skills/skill-template/ skills/<new-skill-name>/
```

### 2. 修改基础信息

至少需要改这些内容：

- `skills/<skill-name>/SKILL.md`
  - `name`
  - `description`
  - `metadata.short-description`
- `skills/<skill-name>/agents/openai.yaml`
  - `display_name`
  - `short_description`
  - `default_prompt`

## Frontmatter 约定

### 必填字段

```yaml
---
name: my-skill
description: "说明这个 skill 的用途和触发场景。"
---
```

### 推荐字段

```yaml
---
name: my-skill
description: "写清楚这个 skill 做什么、什么时候用，参与 skill 发现。"
metadata:
  short-description: "简短说明"
---
```

### 注意事项

- `name` 使用英文、小写、短横线分隔
- `description` 会参与 skill 发现，尽量写清“做什么、什么时候用”
- 长字符串建议显式加引号
- frontmatter 必须是合法 YAML，否则 `skills` CLI 会直接忽略这个 skill

## 语言说明

本仓库的 skill 文档统一用中文维护，包括 `SKILL.md` 正文、`references/` 和 frontmatter 的 `description`，不提供英文翻译。这是出于维护成本的取舍，并非语言偏好。

- skill id、目录名、`name` 保持英文，兼容 `skills` CLI 的发现与安装
- `references/` 下每个主题只保留一份中文文件，命名用 `*.md`，不加语言后缀
- 如果某个 skill 确实需要面向英文用户，再单独处理，不作为默认约定

例如：

```text
references/
└── checklist.md
```

## 什么时候用 `metadata.internal: true`

如果一个 skill 只是：

- 仓库内部模板
- 维护辅助工具
- 不希望出现在默认安装列表里

可以这样写：

```yaml
metadata:
  internal: true
```

带 `internal: true` 的 skill 默认不会出现在普通的 `--list` 结果里。

如果要验证内部 skill，可用：

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add /path/to/repo --list
```

## 推荐校验流程

### 本地发现校验

```bash
npx skills add /path/to/repo --list
```

### 内部 Skill 校验

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add /path/to/repo --list
```

### 远端仓库校验

推送到 GitHub 后再验证：

```bash
npx skills add owner/repo --list
```

## 文案建议

- 仓库级 `README.md` 用中文，方便维护
- `description` 参与 skill 发现
- 不要把复杂细节都塞进 `SKILL.md`，优先拆到 `references/`

## 维护现有 Skill 时的检查项

- 目录是否位于 `skills/<skill-name>/`
- `SKILL.md` frontmatter 是否还能被 YAML 正常解析
- `agents/openai.yaml` 是否仍与 `SKILL.md` 含义一致
- README 和 CONTRIBUTING 是否需要同步更新

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
