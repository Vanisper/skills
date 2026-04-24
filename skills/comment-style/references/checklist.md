# Comment Checklist

Before finishing or committing, quickly check:

- does this comment add information the code alone does not reveal
- does this code actually need a comment, or are naming and types already enough
- does the first line say what the symbol or structure is
- does the comment language match the dominant language of the project and file
- have field, prop, and option details been pushed down to the narrowest useful scope
- does the top-level comment stay about the whole shape, with field and property meaning documented on the members themselves, including constructor parameter properties
- do public APIs or non-obvious contracts use the block-comment style accepted by this codebase
- are the chosen tags compatible with the project's tooling, lint rules, and doc generation setup
- does React code avoid misusing `@emits`, and do Vue event notes stay close to the real event source
- is the default value already obvious from code, with extra documentation added only when it truly helps
- do TODO / FIXME notes include a reason and next step instead of a bare marker
- are there any stale, vague, or oversized comments that should be removed instead
