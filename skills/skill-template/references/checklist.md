# New Skill Checklist

## Minimum Structure

A new skill should include at least:

- `SKILL.md`
- `agents/openai.yaml`
- `references/`

## Frontmatter Checks

- `name` uses English kebab-case
- `description` clearly explains what the skill does and when to use it
- long descriptions are explicitly quoted
- special keys such as `description-[zh-CN]` are explicitly quoted
- `metadata.internal: true` is set when the skill should stay hidden from normal discovery

## Documentation Checks

- the main entry stays concise
- detailed guidance is split into `references/`
- Chinese and English references stay semantically aligned

## Validation Commands

For public skills:

```bash
npx skills add /path/to/repo --list
```

For internal template-style skills:

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add /path/to/repo --list
```
