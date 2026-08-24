# 渲染后端

四个后端产出相同，差别只在源码是否离开本机；按敏感度选择，**永不静默降级**，并在结束时如实报告源码是否离开本机（脚本打到 stderr）。

| 后端 | 需要 | 源码离开本机 | 何时用 |
| --- | --- | --- | --- |
| 官方 PlantUML server | 网络 | 是 | 非敏感、要可分享 URL / 嵌入 |
| 自建 PlantUML server | Docker | 否 | 敏感、且不想装 Java |
| 本地 plantuml.jar | Java | 否 | 敏感 / 离线、已有 Java |
| Kroki | 网络（公共）/ Docker（自建） | 是 / 否 | 大图免编码 POST、或已有 Kroki |

选择优先级：用户显式指定 > 敏感内容选本地（自建 / jar）> 否则默认官方 server。

## 官方 PlantUML server（默认）

脚本默认：`--backend plantuml`（可省略），base = `https://www.plantuml.com/plantuml`。

```bash
node scripts/plantuml.mjs url    diagram.puml -f svg          # 打印 URL
node scripts/plantuml.mjs render diagram.puml -f svg -o diagram.svg
node scripts/plantuml.mjs text   diagram.puml                  # ASCII 文本图
```

## 自建 PlantUML server（隐私 / 离线）

官方 Docker 镜像，URL 形态与公共 server 完全一致，只换 base：

```bash
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
node scripts/plantuml.mjs render diagram.puml -f svg -o diagram.svg \
  --base http://localhost:8080/plantuml
```

## 本地 plantuml.jar（完全离线）

需 Java 运行时（JRE 11+）。适合敏感内容、与外界完全隔离的气隙（air-gapped）环境、或要可靠 `/utxt/` Unicode 框线：

```bash
java -jar plantuml.jar -tsvg  diagram.puml   # 产出 diagram.svg
java -jar plantuml.jar -tpng  diagram.puml
java -jar plantuml.jar -ttxt  diagram.puml    # ASCII 艺术
java -jar plantuml.jar -tutxt diagram.puml    # Unicode 框线（公共 server 不可靠时的可靠来源）
```

jar 自带 `-encodeurl / -decodeurl`，可交叉校验本脚本的编码。

## Kroki

公共 Kroki 的 `/plantuml/` 端点与官方 server **共用 PlantUML 自定义编码**（脚本已统一处理），base = `https://kroki.io`：

```bash
node scripts/plantuml.mjs render diagram.puml -f svg -o diagram.svg --backend kroki
```

大图免编码（避免 URL 过长）用 POST text/plain：

```bash
curl -s -o diagram.svg -X POST https://kroki.io/plantuml/svg \
  -H 'Content-Type: text/plain' --data-binary @diagram.puml
# SVG/PNG 走 /plantuml/svg 或 /plantuml/png
```

自建 Kroki：`docker run -d -p 8000:8000 yuzutech/kroki`，公共实例换 `http://localhost:8000`。

## 隐私红线

- 公共 server（plantuml.com / kroki.io）会收到完整源码——类名、业务逻辑、注释全明文上传第三方。
- PlantUML 生成的 **PNG 内嵌源码元数据**，分享图片即可能泄露；对外分享前用 `-nometadata`（本地 jar）或改用 SVG。
- 含敏感 / 专有信息的图，必须走自建 server 或本地 jar，**不要**因为方便就静默改用公共后端。
