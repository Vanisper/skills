# 新建 Skill 提交前自检清单

一句话：搭好结构、写完正文后，逐条对下面这张单子，再跑校验命令收尾。

## 结构

- 目录位于 `skills/<skill-name>/`，三件套齐备（`SKILL.md`、`agents/openai.yaml`、`references/`）
- 额外资产目录（如 `templates/`）已在 `SKILL.md` 登记用途

## Frontmatter

- `name` 为英文、小写、短横线命名
- `description` 说清「做什么、什么时候用」（参与发现，必填）
- 字符串值一律加引号
- 内部 / 演示类 skill 才写 `metadata.internal: true`

## agents/openai.yaml

- `display_name` 非空
- `short_description` 与 `SKILL.md` 的 `metadata.short-description` **逐字一致**
- `default_prompt` 含 `$<skill-name>` 占位
- `policy.allow_implicit_invocation`：默认 `true`；`internal: true` 时须配 `false`

## 文档

- 首段一句话说清「做什么、什么时候用」（摘要先行）
- 正文标题统一中文（目录名、命令与代码标识除外）；路由节命名为「何时读哪份 reference」
- 每个 `references/*.md` 都在「何时读哪份 reference」登记了触发意图（无孤儿）
- `SKILL.md` 里指向 `references/`、`scripts/` 的相对链接都真实存在
- 复杂细节已拆到 `references/`

## 编辑纪律

- **过引导**：对着模型的默认失败模式立了轴；拿不准 / 纯偏好 / 已过时的问题已省略，而不是堆 caveat
- **偏好标注**：事实与偏好已分开写，偏好没有扮成铁律
- **示例对照规则**：文中示例服从旁边的规则（没有「规则说跟随项目、示例却指定唯一写法」）

## README

- 公开 skill 已登记到 README「当前 Skills」；内部 skill **不要**出现在那里

## 校验命令

```bash
node scripts/check-skills.mjs            # 结构与一致性，须 ✓ 全部通过
npx skills add /path/to/repo --list      # 公开 skill 发现校验
```

内部模板类 skill 追加：

```bash
INSTALL_INTERNAL_SKILLS=1 npx skills add /path/to/repo --list
```
