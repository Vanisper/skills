# Skills

个人维护的技能仓库，收录可复用的 Codex / Agent Skills。

安装方式参考 [vercel-labs/skills](https://github.com/vercel-labs/skills) 提供的 `skills` CLI，用法尽量保持兼容。

## 安装

### 安装单个 Skill

安装 `git-workflow`：

```bash
npx skills add Vanisper/skills --skill git-workflow
```

如果你使用的是 Codex，并希望全局安装到 `~/.codex/skills/`：

```bash
npx skills add Vanisper/skills --skill git-workflow -g -a codex
```

如果你更习惯 `pnpm`，也可以把 `npx` 替换成 `pnpx`：

```bash
pnpx skills add Vanisper/skills --skill git-workflow -g -a codex
```

### 安装全部公开 Skills

```bash
npx skills add Vanisper/skills --skill '*' -g -a codex
```

### 从本地路径安装

适合本地调试或开发中的 skill：

```bash
npx skills add /Users/vanisper/Documents/GitHub/skills --skill git-workflow -g -a codex
```

### 查看可安装的公开 Skills

```bash
npx skills add Vanisper/skills --list
```

如果你想查看内部模板类 skill，需要打开内部 skill 列表：

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add Vanisper/skills --list
```

## 常用参数

| 参数 | 说明 |
| --- | --- |
| `-g`, `--global` | 全局安装，而不是安装到当前项目 |
| `-a`, `--agent` | 指定目标 agent，例如 `codex` |
| `-s`, `--skill` | 指定 skill 名称，`'*'` 表示全部 |
| `-l`, `--list` | 仅列出可安装的 skills，不执行安装 |
| `--copy` | 使用复制而不是符号链接 |
| `-y`, `--yes` | 跳过交互确认 |

## 安装范围

| 范围 | 默认位置 | 适用场景 |
| --- | --- | --- |
| 项目级 | 对应 agent 的项目目录，例如 Codex 的 `.agents/skills/` | 跟随项目一起维护、提交给团队 |
| 全局 | 对应 agent 的全局目录，例如 Codex 的 `~/.codex/skills/` | 跨项目复用 |

对 Codex 来说，按照 `vercel-labs/skills` 当前的默认映射，项目级通常安装到 `.agents/skills/`，全局安装到 `~/.codex/skills/`。

## 当前 Skills

### `comment-style`

代码注释与 API 文档规范，包含：

- 注释必要性判断
- JSDoc / TSDoc 风格 API 文档建议
- TypeScript / Vue / React 的注释层级约定
- TODO / FIXME 写法与自检清单

### `git-workflow`

可复用的 Git 工作流规范，包含：

- commit 规范
- 分支合并与 PR 规则
- rollback 规则
- remote / push 规则
- tag / release 标记规则

## 仓库内置模板

### `skill-template`

用于新建 skill 的内部模板，主要作用是：

- 提供标准目录结构示例
- 演示 `SKILL.md`、`agents/openai.yaml`、`references/` 的最小组合
- 演示 `references/` 的组织方式
- 演示 `metadata.internal: true` 的内部模板写法

这个模板默认不会出现在普通 `--list` 结果中。

## 仓库结构

仓库内的 skill 默认放在 `skills/<skill>` 目录下，每个 skill 目录通常包含：

- `skills/<skill>/SKILL.md`
  skill 入口说明和 metadata
- `skills/<skill>/agents/openai.yaml`
  面向 UI / 产品层的展示元信息
- `skills/<skill>/references/`
  按主题拆分的详细参考文档

## 贡献与新建 Skill

详细说明见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

如果你要新增 skill，推荐流程是：

1. 复制 `skills/skill-template` 到 `skills/<new-skill-name>`
2. 修改 `SKILL.md` frontmatter 和正文
3. 按需补充 `agents/openai.yaml` 与 `references/`
4. 用本地路径执行 `npx skills add /path/to/repo --list` 验证

## 维护约定

- skill id 和目录名保持英文，便于安装与跨工具兼容
- 文档统一用中文维护，不提供英文翻译（详见 [CONTRIBUTING.md](./CONTRIBUTING.md) 的语言说明）
- 新增 skill 时，优先放到 `skills/<skill>` 下，并保持主入口精简，把细则拆到 `references/`
- YAML frontmatter 里的长描述建议显式加引号，避免解析失败

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
