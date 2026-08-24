# Tag 与发布标记规范

处理发布 tag 时：

- 正式版本优先使用 annotated tag。
- lightweight tag 可以用于临时标记，但不要作为默认发布方式。
- 推送 tag 时尽量显式指定目标 tag，不要默认一次性推所有 tag。
- 已经发布出去的 tag，不要随意删除或移动，除非用户明确要求。

## 常用命令

- `git tag -a v1.2.3 -m "v1.2.3"`
- `git push origin v1.2.3`
- `git tag --list`

## 发布原则

- 把已发布 tag 视为稳定的发布标记。
- 创建或推送 tag 时，要明确具体版本号。
- 如果仓库已有发布流程，优先遵循现有流程，而不是额外发明一套。

## 常见坑

- **对发布点误用 lightweight tag**：lightweight tag 只是一个指向 commit 的指针，不带作者、日期、说明，也不是独立对象；annotated tag（`git tag -a`）是带校验和的独立对象，包含打 tag 者、日期和消息。正式版本（如 `v1.0.0`）必须用 annotated tag，否则 `git describe`、CHANGELOG 自动化、签名与校验都会受影响。
- **区分二者**：`git cat-file -t <tag-name>` 返回 `tag` 即 annotated，返回 `commit` 即 lightweight；或用 `git for-each-ref --format='%(refname:short) %(objecttype)' refs/tags` 一次性查看所有 tag 的类型。
