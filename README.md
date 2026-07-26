# Skills

个人维护的 Agent Skills 仓库，收录一批可复用、跨 AI 编码工具的技能。每个 skill 是一份带 metadata 的说明文档（部分带脚本 / 模板资产），供 Claude Code、Codex、Cursor 等支持 Agent Skills 的工具按需加载。

skill 清单见下方 [当前 Skills](#当前-skills)。想动手安装再看 [安装](#安装)——安装与分发沿用 [vercel-labs/skills](https://github.com/vercel-labs/skills) 的 `skills` CLI。

## 当前 Skills

### `comment-style`

代码注释与 API 文档规范：判断是否需要注释、选注释语言、写 why-focused 注释、为导出 API 补 JSDoc/TSDoc，以及清理 TODO/FIXME（语言无关，覆盖 TS/JS/Vue/React/Rust/Javadoc 等）。

### `git-workflow`

可复用的 Git 工作流规范：commit、分支合并与 PR、rollback、remote/push、tag/release。

### `workspace-hub`

壳工作空间脚手架：建立或重组「根壳项目 + projects/ 挂载」的多仓库工作空间（全新体系 / 存量重组 / 体检改造）。

### `plantuml`

Mermaid 不够时用 PlantUML 画复杂图（时序/类/组件/部署/状态/用例/C4）：编码成 server/Kroki URL 取回 SVG/PNG 或 ASCII 文本图，默认零本地 Java。

## 安装

以下用 `npx`；习惯 `pnpm` 的把 `npx` 换成 `pnpx` 即可。

### 查看有哪些

先列出可安装的 skill，不做任何改动：

```bash
npx skills add Vanisper/skills --list
```

内部模板类 skill（如 `skill-template`）默认不列出，需要时打开：

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add Vanisper/skills --list
```

### 安装

安装单个 skill（默认装到当前项目）：

```bash
npx skills add Vanisper/skills --skill git-workflow
```

安装全部公开 skill：

```bash
npx skills add Vanisper/skills --skill '*'
```

`-g` 全局安装、`-a <agent>` 指定目标工具（如 `codex`）。例：全局装到 Codex——

```bash
npx skills add Vanisper/skills --skill git-workflow -g -a codex
```

本地调试用路径代替仓库名：

```bash
npx skills add /path/to/skills --skill git-workflow --list
```

### 更新

重新执行对应的 `add` 命令即可拉取最新版本；覆盖前 CLI 会提示确认，`-y` 可跳过。

### 常用参数

| 参数 | 说明 |
| --- | --- |
| `-l`, `--list` | 仅列出，不安装 |
| `-s`, `--skill` | 指定 skill，`'*'` 表示全部 |
| `-g`, `--global` | 全局安装，而非当前项目 |
| `-a`, `--agent` | 目标 agent，如 `codex` |
| `--copy` | 用复制而非符号链接 |
| `-y`, `--yes` | 跳过覆盖确认 |

安装位置由目标 agent 决定：项目级通常在该 agent 的项目目录（Codex 为 `.agents/skills/`），全局在其全局目录（Codex 为 `~/.codex/skills/`）。

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
- `skills/<skill>/<资产目录>/`（可选）
  某些 skill 会带额外资产目录（如 `workspace-hub` 的 `templates/`），用途在该 skill 的 SKILL.md 中登记

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
- YAML frontmatter 里的字符串值一律加引号，避免解析失败

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
