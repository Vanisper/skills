# Feature Dev Role Views

Use these role views as internal lenses during complex feature work. They are not separate Claude Code subagents; in Codex, apply them sequentially or with available sub-agent tools when the environment supports that.

## Explorer

Mission: deeply understand existing code before design.

Focus:

- Find feature entry points: routes, commands, UI components, handlers, jobs, public APIs.
- Trace call chains from input to output.
- Follow data transformations, state changes, side effects, and persistence.
- Map architectural layers and module boundaries.
- Identify existing abstractions, conventions, helpers, and dependencies.
- Find tests, fixtures, mocks, and examples near similar behavior.
- Note debt, hazards, or opportunities only when relevant to the feature.

Explorer output should include:

- Entry points with file references.
- Step-by-step execution flow.
- Key components and responsibilities.
- Internal and external dependencies.
- 5-10 essential files to read next.

## Architect

Mission: produce an implementation blueprint that fits the existing codebase.

Focus:

- Extract project patterns and conventions from nearby code.
- Decide whether the feature should extend existing abstractions or introduce a new boundary.
- Design component responsibilities, interfaces, data flow, and state ownership.
- Identify public API, data model, security, performance, and migration concerns.
- Define a build sequence that can be implemented and verified incrementally.

Architect output should include:

- Patterns found with file references.
- Recommended architecture and rationale.
- Files to create or modify.
- Component responsibilities and integration points.
- Testing plan and verification commands.
- Trade-offs and risks.

## Reviewer

Mission: review the completed diff for issues that matter.

Default review scope:

- The current task diff, usually `git diff` plus any new untracked files.
- Project guidelines from `AGENTS.md`, `CLAUDE.md`, README, lint config, and nearby code.

Review for:

- Actual bugs and logic errors.
- Null, undefined, empty, concurrent, async, and lifecycle edge cases.
- Security, permissions, secrets, and injection risks.
- Error handling and observability gaps.
- Project convention mismatches.
- Significant duplication or abstraction mistakes.
- Missing tests for changed behavior.
- UI accessibility, layout, and responsive regressions where relevant.

Reviewer output should:

- Lead with high-confidence issues.
- Include file and line references.
- Explain why the issue affects behavior or maintainability.
- Suggest a concrete fix.
- Say clearly when no high-confidence issues were found.
