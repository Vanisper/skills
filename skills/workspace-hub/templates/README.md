<!--
模板用途：壳工作空间根 README（工作空间总览）。
占位符：
- {{workspace_name}}：工作空间名称（根仓库/根目录名）
- {{tagline}}：工作空间一句话口号/副标题
- {{workspace_purpose}}：本工作空间承载的项目体系名称（如「xx 项目体系」）
生成时填充占位符并删除本注释。
-->

# {{workspace_name}}

> {{tagline}}

## 这是什么

本仓库是 {{workspace_purpose}} 的根工作空间（壳项目）：归集各项目、对齐规则、提供统一视角与总览。它只管理文档、规划与工作空间约定，不包含任何项目代码。

具体项目采用多仓库形态（不做 monorepo），以 clone 或链接等方式挂到 `projects/` 目录下使用；各仓库的托管平台与存在形式不限，可用可操作即可。运作细节见 [docs/guide.md](docs/guide.md)。

## 项目体系一览

<!-- 下表数据行为示例，按实际项目增删 -->

| 项目 | 一句话定位 | 状态 | 规划文档 |
| --- | --- | --- | --- |
| example-project | 一句话说明该项目的定位 | 规划中 | [docs/projects/example-project/README.md](docs/projects/example-project/README.md) |

项目间关系与整体规划详见 [docs/project-map.md](docs/project-map.md)。

## 目录结构

```
{{workspace_name}}/
├── README.md      # 本文件：工作空间总览
├── AGENTS.md      # AI 协作约定
├── skills/        # 工作空间级 skills
├── docs/          # 文档与规划（本工作空间的主体）
├── scripts/       # 工作空间辅助脚本
└── projects/      # 各项目的挂载落点（clone 或链接，不纳入根 git 管理）
```

- `docs/`：所有规划、调研、业务札记均落在这里，入口见下方快速入口。
- `scripts/`：工作空间级辅助脚本。
- `projects/`：各项目独立 git 管理，根仓库通过 `.gitignore` 忽略。
- `AGENTS.md`：面向 AI 协作者的工作空间约定。
- `skills/`：工作空间级 skills，其指令优先于 AGENTS.md 的一般约定。

## 快速入口

- 文档导航：[docs/README.md](docs/README.md)
- 工作空间使用指南：[docs/guide.md](docs/guide.md)
