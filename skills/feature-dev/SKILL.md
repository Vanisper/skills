---
name: feature-dev
description: "Use when implementing non-trivial product features or cross-file code changes that need codebase discovery, requirement clarification, architecture trade-off analysis, implementation, and post-change review. Adapted from Anthropic Claude Code's feature-dev workflow for Codex-style agent work."
metadata:
  "description-[zh-CN]": "用于实现较复杂的新功能或跨文件改动：先理解代码库、澄清需求、设计方案，再实现并做质量审查。基于 Anthropic Claude Code 的 feature-dev 工作流改写为 Codex Skill。"
  short-description: "结构化功能开发工作流"
---

# Feature Dev

结构化处理新功能开发：先弄清需求和代码现状，再设计、实现、验证和复盘。适合功能范围不小、会触碰多个模块、需要架构判断或用户确认的任务。

## 使用时机

- 用户要求实现新功能、重构式功能扩展、跨模块集成或较大行为变更。
- 需求还不完整，需要先探索代码后再提出澄清问题。
- 代码库已有相似功能、模式、约定或测试策略，需要先对齐再动手。
- 需要在几个实现路线之间做取舍。

不必用于很小的单点修复、纯问答、简单命令执行或用户明确要求“直接改”的低风险任务。

## 默认流程

1. **Discovery**：复述目标、识别约束和成功标准。若需求明显缺口会影响方向，先问。
2. **Codebase Exploration**：用 `rg`、`rg --files`、`git status`、相关测试和配置文件定位入口、相似功能、模块边界和项目规范。
3. **Clarifying Questions**：基于代码发现提出具体问题。问题会改变架构或行为时，等待用户回答；细节低风险时给出默认假设并继续。
4. **Architecture Design**：给出 2-3 个可行方案或一个明确推荐方案，说明取舍、文件影响、测试策略和风险。
5. **Implementation**：按用户选择或已确认的推荐方案实现。保持改动聚焦，遵循项目现有风格。
6. **Quality Review**：检查 bug、边界条件、重复、约定偏离、测试缺口和用户可见回归。尽量运行相关测试、类型检查或 lint。
7. **Summary**：说明已改内容、关键决策、验证结果、剩余风险和自然的下一步。

## Codex 执行约定

- 先读代码再设计；不要在未了解现有模式时大面积改动。
- 搜索优先用 `rg` / `rg --files`，并尽量并行读取互不依赖的文件。
- 对重要问题先问用户；对低风险实现细节，明确假设并继续完成任务。
- 设计方案不要为了数量而堆叠。小功能可以只给一个推荐方案；大功能才展开多个方案。
- 实现前如果方案选择会显著影响用户体验、数据模型、公共 API、迁移或安全边界，先获得明确确认。
- 审查时优先报告会实际影响功能、安全、可维护性或测试可信度的问题，避免泛泛风格建议。
- 最终回复保持简洁，但必须包含验证情况；如果没能运行测试，要说明原因。

## 角色视角

当任务复杂时，在同一个 Codex 回合内轮流使用这三个视角：

- **Explorer**：找入口、相似功能、数据流、依赖和关键文件。
- **Architect**：把需求映射到现有架构，选方案，列出改动地图和测试计划。
- **Reviewer**：从 bug、正确性、约定、可读性、测试覆盖和回归风险角度检查最终 diff。

详细角色提示见 [references/roles.md](references/roles.md)。完整阶段清单见 [references/workflow.md](references/workflow.md)。中文版本见 [references/workflow.zh-CN.md](references/workflow.zh-CN.md)。
