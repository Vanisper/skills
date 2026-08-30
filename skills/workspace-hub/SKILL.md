---
name: workspace-hub
description: "建立或重组「壳工作空间」——以根壳项目归集多仓库项目体系（文档、规则、统一视角在壳，项目挂在 projects/ 下各自独立）。当用户想为新构想立项建体系、把散落各处的既有项目组织进统一工作空间、或对已有壳工作空间做体检/改造时使用。"
metadata:
  short-description: "壳工作空间脚手架：建体系 / 存量重组 / 体检改造"
---

# workspace-hub — 壳工作空间脚手架

把「根壳项目 + projects/ 挂载」模式整理成可执行流程。壳仓库只承载文档、规划与约定；真实项目以 clone 或链接挂在 `projects/` 下，git 各自独立。`templates/` 即一处可直接套用的壳骨架参照。

## 流程总览

现场勘察 → 路由确认 → 分阶段问询 → 执行（生成 / 重组 / 体检）→ 收尾登记。

## 第 0 步：现场勘察

先看现场再开口。探测当前目录：

- 目录是否为空；是否已是 git 仓库
- 是否存在壳骨架：README.md、AGENTS.md、docs/、projects/
- 当前目录（或其 projects/）下是否散落着独立项目（各自带 .git 或明显的工程结构）

现场不一定能看到全部信息——既有项目可能在本机他处或云端，需主动问用户是否已有项目、在哪里。

推断信号 → 推荐路由（信号仅作推荐，最终由第 1 步用户确认）：

| 现场 | 推荐路由 |
| --- | --- |
| 空目录 / 只有零星文件，且无既有项目 | A 全新体系 |
| 有既有项目（散落当前目录，或用户指明在本机他处 / 云端），无壳骨架 | B 存量重组 |
| 壳骨架存在（无论齐备与否） | C 体检 / 改造 |

## 第 1 步：路由确认

勘察结论只作推荐项，不默默执行：向用户一次性确认走哪条路由，附各路由一句话说明与推荐理由。证据不足或信号混杂时，如实说明看到了什么，让用户裁决。

## 问询纪律

- 优先一次一问、每问附推荐答案；用户已一次给出多项答案时按答推进，不要为了纪律再拆碎。
- 事实靠勘察（文件系统、git、工具）获取，不问用户；决策必须由用户拍板。
- 用户答「你定」时采用推荐答案，并在产出文档中如实标注为默认值。
- 每阶段结束输出小结，经确认后进入下一阶段；悬而未决的点归集进「待探讨」小节，不写成肯定句。

分阶段问题清单见 [references/elicitation.md](references/elicitation.md)。

## 路由 A：全新体系

1. 完成问询阶段 1–4。
2. 按 `templates/` 生成骨架：占位符统一为 `{{...}}` 语法、按问询结果填充；删除每个模板文件顶部的 HTML 注释以及正文内所有提示性 HTML 注释，只保留正文：

   | 模板 | 目标位置 |
   | --- | --- |
   | templates/README.md | README.md |
   | templates/AGENTS.md | AGENTS.md |
   | templates/gitignore | .gitignore |
   | templates/docs/README.md | docs/README.md |
   | templates/docs/guide.md | docs/guide.md |
   | templates/docs/project-map.md | docs/project-map.md |
   | templates/docs/style-guide.md | docs/style-guide.md |
   | templates/docs/business/README.md | docs/business/README.md |
   | templates/docs/blog/README.md | docs/blog/README.md |
   | templates/docs/projects/project/README.md | docs/projects/<项目名>/README.md（逐项目） |

   另建占位目录：`projects/.gitkeep`、`scripts/.gitkeep`、`skills/.gitkeep`。
3. 逐项目立项：每个项目按模板生成总领 README，未决事项收进各自「待探讨」。
4. 提示 git init 与首次提交；提交前需用户确认。

## 路由 B：存量重组

1. 问询阶段 1、2、4 照常；阶段 3 改为逐项目盘点：项目在哪里、什么形态、如何挂载。
2. 逐项目挂载到 `projects/`：
   - **云端仓库**：用户给地址，执行 clone。
   - **本机他处**：建链接——macOS / Linux 用 `ln -s <目标> <链接名>`（参数顺序：先目标后链接名；目标建议用绝对路径，避免随链接位置变动失效；覆盖已有链接用 `ln -sfn`）；Windows 用 `mklink`（目录符号链接 `/D` 通常需提权或开发者模式，junction `/J` 一般不需要）。
   - **操作受限**（跨目录访问、命令执行权限不足等）：不要卡死，输出「自助准备清单」——把所需的具体命令与说明整理给用户手动执行，完成后回来继续。
3. 生成壳骨架（同路由 A 第 2 步），并在 project-map 中逐项目登记。

## 路由 C：体检 / 改造

1. 按 [references/audit.md](references/audit.md) 清单逐项检查，输出分级体检报告（缺失 / 漂移 / 建议）。
2. 报告先行：逐项经用户确认后修复，不改动用户未确认的内容。
3. 改造场景（有项目无壳、或壳不完整）：缺失部分按路由 A 的生成流程与路由 B 的挂载流程补齐。

## 原则与边界

- 精炼：文档不写口水话；场景自洽，不堆功能。
- `projects/` 下各项目不越权改动——壳层工作不触碰项目内部。
- 语言适配：模板正文以中文为示例语言写成；主体语言不同时，整体翻译模板正文，并按 style-guide 模板的总原则改写注释与标点细则。
- 仓库形态：模板默认按多仓库形态表述；用户在问询中确认 monorepo 时，改写模板中的相关表述（README / guide / project-map 的仓库形态句）。
- 不发明用户未做出的决定；一切未决显式登记。

## 何时读哪份 reference

- 分阶段问询 / 决策 → [elicitation.md](references/elicitation.md)
- 路由 C 体检 / 改造、A/B 自检 → [audit.md](references/audit.md)

## 目录

- `references/` — 按意图分流的细则。
- `templates/` — 骨架模板，目录结构与目标工作空间同构
