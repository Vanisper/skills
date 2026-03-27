---
name: git-workflow
description: Reusable Git workflow skill. Use when checking git status, staging changes, writing commit messages, committing, pushing branches, preparing pull requests, handling branch merges, rollback, remotes, or tags. Supports bilingual references: prefer Chinese reference files for Chinese users and English reference files for English-first projects. Commit headers must follow Conventional Commits and the Vanisper commitlint style: English type, optional English scope, project-preferred subject language, max header length 72, optional emoji either before the type or at the start of the subject.
metadata:
  description-[zh-CN]: 可复用的 Git 工作流规范。用于处理 git status、暂存、commit、push、Pull Request、分支合并、回滚、远程仓库和 tag 等操作。支持中英双语 reference：中文用户优先使用中文文档，英文项目优先使用英文文档。commit header 需遵循 Conventional Commits 与 Vanisper commitlint 风格：英文 type、可选英文 scope、subject 跟随项目语言偏好、header 长度不超过 72、emoji 可放在 type 前或 subject 开头。
  short-description: Git 操作与提交规范
---

# Git Workflow

在需要处理常见 Git 操作的代码仓库或工作区中使用这个 skill。

## 语言策略

- skill 目录名、`name`、reference 基础文件名继续使用英文，保证调用和生态兼容性。
- 中文用户或中文项目优先读取 `*.zh-CN.md`。
- 英文用户或英文项目优先读取默认的英文 `.md` 文件。
- 中英文版本的规则语义必须保持一致，后续增改规则时应同步更新。

## 目标

- 保持 Git 操作有边界、可追溯、非破坏性。
- 暂存和提交时避免混入无关改动。
- 让提交、合并、回滚这些动作都遵循项目约定。

## 基础规则

- 开始前先看 `git status --short`，确认 staged 和 unstaged 的边界。
- 除非用户明确要求，否则不要回退、重置或覆盖无关改动。
- 尽量保持一次提交只表达一个清晰意图。
- 如果用户说“暂存提交”或“提交当前改动”，默认只提交已经 staged 的内容。
- 在 push、merge、PR 之前，先确认当前分支和操作目标一致。

## 标准流程

默认按下面的顺序处理，除非用户明确要求别的流程：

1. 检查状态：`git status --short`
2. 查看相关 diff：`git diff` 或 `git diff --cached`
3. 只暂存本次任务需要的文件
4. 如果需要 commit，按 [references/commit.zh-CN.md](references/commit.zh-CN.md) 或 [references/commit.md](references/commit.md) 执行
5. 用 `git show --stat --oneline HEAD -1` 核对结果
6. 只有用户明确要求时才 push

涉及分支操作时：

- 只有在用户要求或工作流明确需要时才新建分支。
- 分支名优先使用清晰的英文语义。
- 除非用户明确要求改写历史，否则不要 force-push。

## Reference Guide

按用户语言或项目语言偏好选择对应 reference 文件：

- 提交规范：
  - 中文：[references/commit.zh-CN.md](references/commit.zh-CN.md)
  - English: [references/commit.md](references/commit.md)
- 分支合并与 PR 规范：
  - 中文：[references/merge.zh-CN.md](references/merge.zh-CN.md)
  - English: [references/merge.md](references/merge.md)
- 回滚规范：
  - 中文：[references/rollback.zh-CN.md](references/rollback.zh-CN.md)
  - English: [references/rollback.md](references/rollback.md)
- 远程仓库与 push 规范：
  - 中文：[references/remote.zh-CN.md](references/remote.zh-CN.md)
  - English: [references/remote.md](references/remote.md)
- tag 与发布标记规范：
  - 中文：[references/tags.zh-CN.md](references/tags.zh-CN.md)
  - English: [references/tags.md](references/tags.md)

## 何时读取哪份 Reference

- 用户在中文语境下询问 commit、merge、rollback、remote、tag，优先读取对应 `*.zh-CN.md`。
- 英文项目或英文语境下，优先读取默认英文 `.md` 文件。
- 如果某个主题只有一种语言版本，就直接使用现有版本。

## 默认行为

- 使用非交互式 Git 命令。
- 尽量总结这次 staged、committed、merged、reverted 或 pushed 的结果。
- 如果用户表达和 commit 规则冲突，优先保留 Conventional Commit 结构，再让 `subject` 跟随项目语言偏好。
- 默认优先使用当前项目主流的 commit `subject` 语言。如果项目没有明确约定，就跟随主要文档、注释和既有 commit 历史。
- 如果用户只给了一个大致意图，可以合理推断最小准确的 `type` 和 `scope`。

## Source Rules

这个 skill 参考了：

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- The team's commitlint rules from [Vanisper/schema-store/.commitlintrc.yaml](https://github.com/Vanisper/schema-store/blob/master/.commitlintrc.yaml)
- Branch merge guidance from [Vanisper/blog/note/git/分支合并.md](https://github.com/Vanisper/blog/blob/main/note/git/分支合并.md)
- Coverage ideas cross-checked with [jijunhao/git-skills](https://github.com/jijunhao/git-skills)
