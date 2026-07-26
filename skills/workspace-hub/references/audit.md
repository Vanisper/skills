# 体检清单（路由 C，兼作路由 A/B 的自检）

对已存在的壳工作空间逐项检查，输出体检报告；经用户确认后修复。路由 A/B 生成后也用它自检（此时 `projects/` 可能为零挂载，按「登记一致性」的规划中豁免处理）。发现分三级：

- **缺失**：结构性文件或登记不存在；
- **漂移**：实际状态与文档/约定不符；
- **建议**：不违规但可改进。

## 结构完整性

- 根部骨架：README.md、AGENTS.md、.gitignore、docs/、projects/ 是否齐备（scripts/、skills/ 视该空间约定）。
- .gitignore 是否排除 `projects/*`（挂载内容不入壳 git）。
- docs 骨架：README（导航）、guide、project-map 是否存在。
- 工作空间是否已 `git init`（`.gitignore` 排除 `projects/*` 的约定隐含壳本身应是 git 仓库；未初始化记为建议）。

## 登记一致性

- 三者对应：`projects/` 下每个实际挂载项 ↔ project-map 登记 ↔ `docs/projects/<项目名>/` 立项文档。**规划中 / 仓库未建的项目允许仅存在于 project-map 与 docs/projects（projects/ 下暂无挂载项），不算孤儿**；反过来 projects/ 下的挂载项必须在 project-map 登记。
- 导航（docs/README.md）是否收录全部现存文档（含 docs/projects/ 下的立项文档）。
- 各索引（business、blog 等）与目录内实际条目是否一致。

## 链接与引用

- 全部 markdown 相对链接是否可达。
- 文档互链是否使用相对路径。

## 约定一致性

- 书写语言与该空间主体语言约定是否一致。
- 未决事项是否都收在「待探讨」小节，而非写成含糊的肯定句。
- 命名、文档落点是否符合该空间 AGENTS.md / guide 所载规则。
- **基准缺失时的处理**：若该空间 AGENTS.md / guide 本身不存在，先把「约定文档缺失」记为缺失项；可对照本 skill 的方法论默认约定（中文精炼、未决入待探讨、相对路径互链等）作基线判漂移，并在报告中注明「依方法论默认约定判定」。

## 报告与修复

- 报告按三级分组列出，每项附出处（文件与位置）和修复建议。
- 修复流程（逐项确认后修复、改造场景按路由 A/B 补齐）见 [SKILL.md](../SKILL.md)「路由 C」。
