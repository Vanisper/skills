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
  - `metadata.description-[zh-CN]`
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
description: "What this skill does and when to use it."
---
```

### 推荐字段

```yaml
---
name: my-skill
description: "English description for discovery."
metadata:
  "description-[zh-CN]": "中文描述，方便中文使用者理解。"
  short-description: "简短说明"
---
```

### 注意事项

- `name` 使用英文、小写、短横线分隔
- `description` 会参与 skill 发现，尽量写清“做什么、什么时候用”
- 长字符串建议显式加引号
- 像 `description-[zh-CN]` 这种包含特殊字符的 key 也建议显式加引号
- frontmatter 必须是合法 YAML，否则 `skills` CLI 会直接忽略这个 skill

## 双语文档建议

推荐做法是：

- skill id 保持英文
- `SKILL.md` 主入口可以按仓库主要维护语言来写
- 详细说明放到 `references/`
- 中文文件使用 `*.zh-CN.md`
- 英文文件使用默认的 `.md`

例如：

```text
references/
├── checklist.md
└── checklist.zh-CN.md
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
- 面向发现的 `description` 建议保留英文
- 如果 skill 面向中文用户，可以补 `description-[zh-CN]`
- 不要把复杂细节都塞进 `SKILL.md`，优先拆到 `references/`

## 维护现有 Skill 时的检查项

- 目录是否位于 `skills/<skill-name>/`
- `SKILL.md` frontmatter 是否还能被 YAML 正常解析
- `agents/openai.yaml` 是否仍与 `SKILL.md` 含义一致
- 中文和英文 references 是否语义一致
- README 和 CONTRIBUTING 是否需要同步更新

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
