# 排错与降级

## 校验：脚本已经替你做

`plantuml.mjs` 对 svg/png/txt 做 magic 校验，HTTP 非 2xx、文件空、内容是广告层 HTML 或不是预期格式都会**非零退出**，并把响应体预览打到 stderr——直接读预览定位问题。

- HTTP 400 + 错误正文：通常是 PlantUML 语法错（含出错行号）。
- HTTP 200 但校验失败、预览是 `<html>...`：公共 server 的广告层（Ezoic）注入了 HTML——换 `/txt/`（默认）、改 Kroki、或用本地 jar / 自建 server。
- HTTP 200 但 SVG 是「Welcome to PlantUML!」欢迎页：源码被解析成了空图，通常是 `@startuml/@enduml` 缺失或语法全错。

## 降级阶梯（渲染失败时按序尝试，每步后重渲染）

1. 删异形 shape、自定义 sprite/图标、自定义字体。
2. 去掉 `skinparam` 与 `!theme`，回到默认样式。
3. 删 `note` 与 `legend`。
4. 简化 label：短文本、特殊字符用引号包住。
5. 减少 edge（合并冗余连线、去掉回流）。
6. 换更简单的图种（如组件图画不下，退成时序图说明交互）。

仍失败：把源码贴给用户，说明改过哪里、卡在哪步，让用户直接改 `.puml`。

## ASCII 文本图对齐

- ASCII（`/txt/`）只在**等宽字体**下对齐才不乱；终端用 Courier / Monaco / Consolas 等。
- 节点多、标签长时 ASCII 会崩——这时 ASCII 不是合适的输出形态，改 SVG/PNG，或退回 Mermaid。
- 要 Unicode 框线（`/utxt/`）：公共 server 被 Ezoic 注入 HTML、不可靠，用本地 jar `-tutxt` 或自建 server。

## GitHub / Markdown 渲染

- GitHub README 引用**仓库内相对路径**的 SVG 可正常显示（经 raw 路由以 `image/svg+xml` 服务，内嵌脚本被 CSP 沙箱拦截，这就是 GitHub 的安全处理方式）。
- 不渲染 SVG 的位置：issue/PR 评论**拖拽上传的 SVG 附件**不内联、release assets 引用常失败、部分 wiki / 文档平台不支持——这些位置用 PNG：`![图](https://www.plantuml.com/plantuml/png/<encoded>)` 或本地落盘的 `.png`。
- 支持 SVG 的位置优先 SVG（可缩放、不泄露源码）。

## PNG 元数据泄露源码

PlantUML 把源码写进 PNG 元数据块，**分享 PNG 即可能泄露源码**。对外分享前：

- 优先用 SVG（无此问题），或
- 本地 jar 加 `-nometadata`：`java -jar plantuml.jar -nometadata -tpng diagram.puml`。

## 大图 / URL 过长

URL 超过约 7500 字符时脚本会警告。公共 server 对超长 URL 会拒绝（414 / 400）。解法：

- 改 Kroki POST 免编码：`curl -X POST https://kroki.io/plantuml/svg -H 'Content-Type: text/plain' --data-binary @diagram.puml -o diagram.svg`。
- 或自建 server / 本地 jar（无 URL 长度限制）。
- 或缩减图（按降级阶梯）。

## 网络 / 速率限制

- 公共 server 偶有可用性波动或速率限制——批量渲染建议自建 server 或本地 jar。
- 整个会话不要混用多个 base；自建就固定 `--base`。
