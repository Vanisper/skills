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

### 安装全部 Skills

```bash
npx skills add Vanisper/skills --skill '*' -g -a codex
```

### 从本地路径安装

适合本地调试或开发中的 skill：

```bash
npx skills add /Users/vanisper/Documents/GitHub/skills --skill git-workflow -g -a codex
```

### 查看可安装的 Skills

```bash
npx skills add Vanisper/skills --list
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

### `git-workflow`

可复用的 Git 工作流规范，包含：

- commit 规范
- 分支合并与 PR 规则
- rollback 规则
- remote / push 规则
- tag / release 标记规则
- 中英双语 references

## 仓库结构

仓库内的 skill 默认放在 `skills/<skill>` 目录下，每个 skill 目录通常包含：

- `skills/<skill>/SKILL.md`
  skill 入口说明和 metadata
- `skills/<skill>/agents/openai.yaml`
  面向 UI / 产品层的展示元信息
- `skills/<skill>/references/`
  按主题拆分的详细参考文档

## 维护约定

- skill id 和目录名保持英文，便于安装与跨工具兼容
- 可以为同一个 skill 同时提供中文和英文 reference
- 新增 skill 时，优先放到 `skills/<skill>` 下，并保持主入口精简，把细则拆到 `references/`

## 相关链接

- [vercel-labs/skills](https://github.com/vercel-labs/skills)
- [Vanisper/skills](https://github.com/Vanisper/skills)
