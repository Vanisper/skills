# 贡献指南

这个仓库用来维护可复用的 Agent Skills。下面这份指南主要面向两类工作：

- 新增一个全新的 skill
- 维护现有 skill 的结构、文案和 references

## skill 的定位

这个仓库的 skill 本质是**个人经验与方法的说明书**：把一段可复用的经验、约定或风格，写成 agent 可直接执行的文档。这类内容以前可能写成博客；博客偏记录、随性，skill 则要求严肃、可执行、可复用——对「经验 → 说明书」是更合适的载体。

新增 skill 时的参考（非硬性门槛，帮判断领域边界是否清晰）：

- **领域有界**：能用一个名词短语命名专业面（git 提交 / 壳工作空间 / 注释规范）就合适；读起来像「整个职业」的（开发功能 / 写代码），说明边界还没收清楚
- **有增量**：写模型默认行为之外的内容——特有的规则与约定、拿来即用的模板、对照表、纠偏条目；经验风格类 skill 的增量就是这套风格本身
- **reference 按意图分流**：每个 reference 文件绑定一个用户意图，并在 SKILL.md「何时读哪份 reference」显式映射
- **体积匹配**：优先 checklist / 规则表 / 模板，警惕叙述通用流程的散文型 reference

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

skill 可按需携带 `references/` 之外的资产目录（如 `templates/`、`assets/`），但须在该 skill 的 `SKILL.md` 中登记其用途。

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
- 字符串值一律加引号（无论长短，避免解析歧义）；`name` 作为标识符，加不加引号均可，跟随现有 skill 惯例即可
- frontmatter 必须是合法 YAML，否则 `skills` CLI 会直接忽略这个 skill

## agents/openai.yaml 字段

每个 skill 的 `agents/openai.yaml` 面向 UI / 产品层：

```yaml
interface:
  display_name: "展示名（可中文）"
  short_description: "一句话定位，须与 SKILL.md 的 metadata.short-description 文本一致"
  default_prompt: "默认调用提示，用 $<skill-name> 占位"

policy:
  allow_implicit_invocation: true
```

- `short_description` 必须与 `SKILL.md` 的 `metadata.short-description` 文本一致（`node scripts/check-skills.mjs` 会校验）
- `policy.allow_implicit_invocation`：默认 `true`，允许 skill 被 description 隐式触发；纯内部或演示 skill 用 `false`，与 `metadata.internal: true` 配套
- `default_prompt` 用 `$<skill-name>` 占位（如 `$git-workflow`）

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

### 结构与一致性校验

```bash
node scripts/check-skills.mjs
```

校验 frontmatter 可解析、三件套齐备、`metadata.short-description` 与 `openai.yaml` 的 `short_description` 一致、README「当前 Skills」与目录同步。

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

## 行文约定

- **摘要先行**：SKILL.md 与每份 reference 的首段先给一句话定位——这是什么、什么时候读，再展开细节
- **说人话，术语作注**：先用自然的中文把意思说清；有信息量的专业术语（如「幂等」「气隙」）可加括号标注辅助理解，但不用术语替代解释，也不用「口径」「赋能」这类离开语境就难懂的词
- **标题统一中文**：正文标题用中文（目录名、命令与代码标识除外）；同义标题在全仓库用词一致，如各 skill 统一叫「何时读哪份 reference」
- 仓库级 `README.md` 用中文，方便维护
- `description` 参与 skill 发现，写清「做什么、什么时候用」
- 不要把复杂细节都塞进 `SKILL.md`，优先拆到 `references/`

## 维护现有 Skill 时的检查项

- 目录是否位于 `skills/<skill-name>/`
- `SKILL.md` frontmatter 是否还能被 YAML 正常解析
- `agents/openai.yaml` 的 `short_description` 是否与 `SKILL.md` 的 `metadata.short-description` 文本一致
- README 和 CONTRIBUTING 是否需要同步更新

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
