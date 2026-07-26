# 语法与模板

所有图都用 `@startuml ... @enduml` 包裹。下面每种图给一个最小可改模板；复杂语法查 [plantuml.com](https://plantuml.com/) 官方手册。

## 时序图（sequence）

```plantuml
@startuml
Alice -> Bob  : 认证请求
Bob --> Alice : 认证响应
Alice -> Bob  : 请求数据
Bob --> Alice : 数据
@enduml
```

`->` 实线箭头、`-->` 虚线箭头；参与者自动声明；`participant`/`actor` 可显式声明并改名。

## 类图（class）

```plantuml
@startuml
class Order {
  +id: Long
  +items: Item[]
  +total(): Money
}
class Item {
  +sku: String
  +qty: Int
}
Order "1" *-- "many" Item
@enduml
```

`*--` 组合、`o--` 聚合、`-->` 关联、`..>` 依赖、`--|>` 继承。

## 组件图（component）

```plantuml
@startuml
[Web 前端] as Web
[API 网关] as GW
component "订单服务" as Order
component "支付服务" as Pay

Web --> GW
GW  --> Order
GW  --> Pay
Order --> Pay
@enduml
```

## 部署图（deployment）

```plantuml
@startuml
node "用户终端" as Client
node "应用集群" as Cluster {
  node "app-1" as App1
  node "app-2" as App2
}
database "MySQL" as DB

Client --> Cluster
Cluster --> DB
@enduml
```

## 状态图（state）

```plantuml
@startuml
[*] --> 待支付
待支付 --> 已支付 : 支付成功
已支付 --> 已发货 : 发货
已发货 --> 已签收 : 签收
已签收 --> [*]
待支付 --> 已取消 : 超时
@enduml
```

## 用例图（usecase）

```plantuml
@startuml
left to right direction
actor 用户 as U
actor 运营 as O
rectangle 订单系统 {
  usecase "下单" as UC1
  usecase "退款" as UC2
}
U --> UC1
O --> UC2
@enduml
```

## C4 架构图

公共 server / Kroki **不能** `!includeurl https://...` 远程拉取；C4 必须用打包的标准库形式：

```plantuml
@startuml
!include <C4/C4_Context>

title 订单系统 · 系统上下文

Person(用户, "下单用户")
System(订单系统, "处理订单与支付")
System_Ext(支付渠道, "第三方支付")

Rel(用户, 订单系统, "下单 / 查询")
Rel(订单系统, 支付渠道, "发起支付")
@enduml
```

容器 / 组件层同理用 `!include <C4/C4_Container>`、`!include <C4/C4_Component>`。

## 皮肤与主题

```plantuml
@startuml
skinparam monochrome true       # 黑白线条，适合文档
skinparam backgroundColor #FFFFFF
' !theme cerulean              # 主题；公共 server 支持内置主题
Alice -> Bob : hi
@enduml
```

`skinparam` 调细节（monospace、padding、backgroundColor 等），`!theme` 套整体主题。

## 常见坑

- 公共 server / Kroki 无法 `!includeurl https://...`：远程 include 会失败，改用打包标准库（如 `<C4/...>`）或本地 jar。
- 异形 shape、过重 `skinparam`、sprites/图标、自定义字体是渲染失败的首批嫌疑——排错时先删这些（见 [troubleshooting.md](./troubleshooting.md)）。
- 标签含 `:` `|` 等特殊字符时用引号包住：`Alice -> Bob : "a:b | c"`。
