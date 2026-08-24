# 新建 Skill 清单

## 最小结构

新 skill 至少应包含：

- `SKILL.md`
- `agents/openai.yaml`
- `references/`

## Frontmatter 检查项

- `name` 是否为英文短横线命名
- `description` 是否解释了“做什么、什么时候用”
- 长描述是否已显式加引号
- 是否需要 `metadata.internal: true`

## 文档检查项

- 首段是否一句话说清「做什么、什么时候用」（摘要先行）
- 正文标题是否统一中文（目录名、命令与代码标识除外）；路由节是否命名为「何时读哪份 reference」
- 是否在「何时读哪份 reference」为每个 reference 登记了触发意图
- 主入口是否足够简洁
- 复杂细节是否拆到了 `references/`

## 校验命令

公开 skill：

```bash
npx skills add /path/to/repo --list
```

内部模板类 skill：

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add /path/to/repo --list
```
