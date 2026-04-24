# Comment Rules

Comments explain why. Code explains how.

## When Comments Are Worth Adding

Usually skip comments when:

- names already carry the intent
- types, signatures, or tests already explain the contract
- control flow is straightforward
- the comment would only restate the code

Add comments when:

- business rules depend on hidden assumptions, historical context, or external constraints
- a workaround, fallback, compatibility branch, or technical debt needs justification
- algorithms, regexes, bitwise logic, or timing behavior are not obvious
- fields, units, formats, enums, or return contracts are easy to misuse
- usage order, examples, or side effects are not obvious from the call site

## Language And Tone

- Follow the dominant project language. If no rule exists, infer it from existing docs, comments, and commit history.
- Keep one primary comment language per file whenever practical.
- Start with "what this is" before describing process details.
- Chinese comments are often written without end punctuation. English comments should stay concise, but readability matters more than forcing a punctuation rule.
- Break long explanations into lists so constraints and ordering are easy to scan.

## Comment Layers

### File Headers

Use multi-line `//` headers when a file has a cohesive responsibility, staged workflow, or hidden constraints. This avoids accidentally attaching `/** */` to the next export.

```ts
// ============================================================
// Order item normalization pipeline
// ------------------------------------------------------------
// - Redistributes quantity by priority
// - Preserves original order within the same priority
// - Assigns remainder to the last item to keep totals stable
// ============================================================
```

### API Block Comments

Prefer JSDoc / TSDoc-style blocks for:

- exported functions, classes, interfaces, and types
- public components, shared hooks, and reusable utilities
- internal symbols whose contract, edge cases, or side effects are still non-obvious

Do not treat every cross-file symbol as requiring a block comment. If the signature is already clear and there is no hidden contract, skip it.

```ts
/**
 * Distributes a total amount across weighted targets
 * @description
 * - Entries with weight 0 are skipped
 * - The last entry absorbs rounding remainder to keep totals stable
 * @param total Total amount to distribute
 * @param items Target entries
 * @returns Allocation results in input order
 * @example
 * ```ts
 * distribute(100, [
 *   { id: 'A', weight: 3 },
 *   { id: 'B', weight: 7 },
 * ])
 * ```
 */
```

When adding a primary explanation, prefer `@description` by default because it is more likely to appear directly in editor hints. If the project already standardizes on `@remarks`, keep that convention instead of mixing two tag styles.

### Section Comments And Regions

Section comments should mark meaningful phases in a long block, not every couple of lines.

```ts
// Validate required input
// Sort by priority
// Compute the remaining quantity
```

Use `//#region` / `//#endregion` only when folding genuinely helps, such as lifecycle groups, platform branches, or multiple parallel logic units.

### Inline Comments

Inline comments should explain local traps, tradeoffs, or why an apparently simpler implementation was avoided.

```ts
// Intentionally avoid await here to keep Bluetooth writes from becoming fully serial
queueWrite(packet)
```

## Types, Fields, And Props

- Treat comments as a two-level structure: the top-level comment describes the whole shape, while member comments describe individual fields, properties, or members.
- Start interface or type comments with what the structure represents.
- Keep class, interface, and type-level comments focused on overall responsibility or contract rather than documenting each member one by one.
- Push field-specific detail down to the field itself instead of overloading the top-level comment.
- Document only fields with traps, format constraints, unit differences, or enum semantics.
- For props, options, and config objects, prioritize format, units, default behavior, and callback timing.
- Apply this rule equally to interface fields, class properties, object-shape members, and TypeScript constructor parameter properties. Put field meaning on the member itself instead of stuffing it into a top-level `@remarks` or `@description`.

```ts
/**
 * Raw supplier response payload
 * @description Backend fields stay in snake_case until normalization
 */
interface RawSupplierResponse {
  /** Supplier name */
  s_name: string

  /**
   * Activation state
   * - '0' disabled
   * - '1' enabled
   */
  is_active: '0' | '1'
}
```

```ts
/**
 * Spot ticket normalization result
 * @description Stores the normalized ticket, target items, and computed outcomes
 */
export class SpotTicketNormalization {
  constructor(
    readonly ticket: SpotTicket,
    readonly targetItems: readonly OrderItem[],
    /** Target total quantity */
    readonly baseQty: Quantity,
    /** User-entered total quantity */
    readonly inputTotalQty: Quantity,
    readonly outcomes: readonly NormalizedOutcome[],
  ) {}
}
```

## Tag Guidance

These tags are usually safe and widely understood:

- `@param`
- `@returns`
- `@example`
- `@throws`
- `@see`
- `@deprecated`

Prefer this when adding a primary explanation:

- `@description`

Use these only when the codebase or tooling already supports them:

- `@remarks`
- `@default` or `@defaultValue`
- `@emits`

Choose tags based on:

- existing project conventions
- documentation tooling, IDE support, or lint rules
- whether the tag adds real value instead of just filling space

## Vue / React Differences

### Vue

- Component block comments can describe responsibility, constraints, and events
- Use `@emits` only when the project already accepts that pattern
- Field-level notes near `defineProps` / `defineEmits` are often more stable than a giant component header

### React

- Do not default to `@emits`
- Document callback props, prop interfaces, and custom hooks instead
- Put effect timing, controlled vs uncontrolled rules, and side-effect notes near the prop or hook that owns them

### Hooks And Utilities

- Document input constraints, default behavior, return contracts, and timing semantics such as debounce, throttle, or cancellation
- Add `@example` only when call order, return shape, or side effects are otherwise easy to misuse

## TODO / FIXME

- `TODO` is for planned improvements
- `FIXME` is for known bugs or incorrect behavior
- Never leave a bare marker. Include at least the reason and expected direction; add owner, condition, or timing when known

```ts
// TODO: Remove the local timezone fallback after the backend standardizes on UTC
// FIXME: The current regex cannot handle nested parentheses and should be replaced with a state-machine parser
```

## Quality Bar

Good comments usually:

- add information the code alone does not reveal
- stay scoped to the smallest useful location
- remain true after refactors
- include examples only when they materially reduce misuse

Bad comments usually:

- translate the code into prose
- use vague phrases such as "process data" or "set state"
- fall out of sync with current return shapes, timing, or behavior
- annotate every variable or loop step without adding insight
