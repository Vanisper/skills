# Feature Dev Workflow

This reference adapts Anthropic Claude Code's `feature-dev` plugin into a Codex skill workflow. Use it when the task is large enough that the main `SKILL.md` checklist needs more structure.

## Phase 1: Discovery

Goal: understand what should be built and why.

- Restate the user's request in concrete terms.
- Identify the product problem, expected behavior, constraints, and success criteria.
- Check whether the user has already provided enough detail to start exploring.
- Ask immediately only when the missing information changes the search direction or makes the task impossible to scope.

Output:

- One short understanding summary.
- A small task plan if the work is substantial.

## Phase 2: Codebase Exploration

Goal: understand existing implementation patterns before designing.

Explore multiple angles:

- Similar features and their implementation path.
- Entry points such as routes, commands, components, handlers, jobs, or APIs.
- Architecture boundaries such as UI, domain logic, persistence, services, adapters, tests, and config.
- Project conventions from docs, existing files, tests, lint config, and agent instruction files such as `AGENTS.md`, `CLAUDE.md`, or local equivalents.
- Relevant testing patterns and fixtures.

Prefer:

- `git status --short --branch` before edits.
- `rg --files` for file discovery.
- `rg` for symbols and existing terminology.
- Reading key files after search results, not relying only on snippets.

Output:

- Key patterns found, with file references.
- Important files to read or modify.
- Likely integration points and risks.

## Phase 3: Clarifying Questions

Goal: resolve ambiguity before architecture and implementation.

Ask about:

- Required user-visible behavior and non-goals.
- Edge cases, error handling, loading states, empty states, permissions, and compatibility.
- Data model, migrations, persistence, external services, security, and performance needs.
- API contracts, rollout, backward compatibility, and test expectations.

Use judgment:

- Wait for answers when ambiguity affects architecture, user experience, data, public contracts, security, or irreversible work.
- For low-risk details, state a reasonable assumption and continue.
- If the user says "whatever you think is best", provide the recommendation and proceed only when the risk is acceptable or the user confirms.

## Phase 4: Architecture Design

Goal: choose a design that fits the codebase.

For larger features, compare 2-3 approaches:

- Minimal change: smallest diff and maximum reuse.
- Clean architecture: stronger boundaries and testability.
- Pragmatic balance: enough structure without broad refactoring.

For each viable approach, cover:

- Files to create or modify.
- Component responsibilities.
- Data flow and state ownership.
- Integration points and public contracts.
- Testing plan.
- Trade-offs and risks.

End with a recommendation. If the choice materially affects product behavior, data shape, public APIs, or long-term architecture, ask the user to choose before implementing.

## Phase 5: Implementation

Goal: build the feature within the chosen design.

- Keep changes scoped to the feature.
- Follow discovered conventions and existing helper APIs.
- Update or add tests near the changed behavior.
- Prefer small, understandable abstractions over broad rewrites.
- Preserve unrelated user changes in the worktree.
- Use `apply_patch` for manual edits.
- Keep the user updated before significant edits and while long commands run.

## Phase 6: Quality Review

Goal: catch meaningful issues before final response.

Review:

- Correctness and edge cases.
- Error handling and async or state races.
- Security and permission boundaries.
- Data migration or compatibility risks.
- Repetition, unclear abstractions, and convention drift.
- Missing tests for changed behavior.
- UI layout and accessibility when frontend is involved.

Verify with the narrowest useful commands first, then broaden when risk is high:

- Unit tests for touched code.
- Typecheck or lint when available.
- Build or targeted integration tests for cross-module changes.
- Browser or visual verification for significant frontend work.

If issues remain, fix them when feasible. If not, state the residual risk clearly.

## Phase 7: Summary

Goal: make the outcome easy to understand.

Final response should include:

- What changed.
- Important decisions or assumptions.
- Validation performed.
- Remaining risks or follow-ups, only when useful.
