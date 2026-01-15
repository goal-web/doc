# 目录结构

## 简介

Goal-Web 框架的默认应用结构旨在为大型和小型应用提供一个良好的起点。当然，您可以根据自己的喜好自由组织应用程序的结构。Goal-Web 几乎不对任何类的位置施加限制——只要 Go 可以自动加载类即可。

## 根目录

### app 目录

`app` 目录包含应用程序的核心代码。您的应用程序中几乎所有的类都将位于此目录中。

```
app/
├── console/      # 命令行命令
├── enums/        # 枚举定义
├── http/         # HTTP 控制器和中间件
├── jobs/         # 队列任务
├── models/       # 数据模型
└── results/      # 自定义响应结果
```

### bootstrap 目录

`bootstrap` 目录包含引导框架的文件。该目录还包含一个 `cache` 目录，其中包含框架生成的用于性能优化的文件，如路由和服务缓存文件。

### config 目录

`config` 目录包含应用程序的所有配置文件。建议您阅读所有这些文件并熟悉所有可用的选项。

### database 目录

`database` 目录包含数据库迁移和种子文件。如果您愿意，您还可以使用此目录来存放 SQLite 数据库。

### public 目录

`public` 目录包含 `index.go` 文件和您的资源文件（如图像、JavaScript 和 CSS）。

### routes 目录

`routes` 目录包含应用程序的所有路由定义。默认情况下，Goal-Web 包含几个路由文件：`web.go`、`api.go` 和 `ws.go`。

### storage 目录

`storage` 目录包含应用程序生成的文件，如日志、缓存和编译后的模板文件。此目录分为 `app`、`framework` 和 `logs` 目录。

`app` 目录可用于存储应用程序生成的任何文件。`framework` 目录用于存储框架生成的文件和缓存。最后，`logs` 目录包含应用程序的日志文件。

### tests 目录

`tests` 目录包含自动化测试。默认情况下，提供了一个示例测试文件。

### views 目录

`views` 目录包含应用程序的模板文件。

## app 目录

应用程序的大部分业务逻辑都位于 `app` 目录中。默认情况下，此目录在应用程序的根命名空间下。

### console 目录

`console` 目录包含应用程序的所有自定义命令。这些命令可以使用 `go run main.go` 命令执行。您可以通过运行 `go run main.go list` 查看可用命令的列表。

### http 目录

`http` 目录包含控制器、中间件和表单请求。几乎所有处理 HTTP 请求的逻辑都将放在此目录中。

```
http/
├── controllers/  # 控制器
├── middlewares/  # 中间件
└── requests/     # 表单请求
```

### jobs 目录

`jobs` 目录包含应用程序的队列任务。任务可以排队等待处理，也可以在当前请求生命周期内同步执行。同步执行的任务有时被称为"命令"，因为它们代表应用程序可以执行的特定操作。

### models 目录

`models` 目录包含所有的数据模型类。Goal-Web 的 ORM 允许您定义表示数据库表的模型。

## 配置文件

Goal-Web 框架的所有配置文件都存储在 `config` 目录中。每个选项都有文档说明，因此请随时浏览文件并熟悉可用的选项。

### 环境配置

Goal-Web 应用程序的环境变量配置基于您的服务器环境，可以使用 `.env` 文件、`env.toml` 或 `env.yaml` 文件进行配置。

```toml
[app]
name = "goal"
key = "your-app-key"
env = "local"
debug = true

[http]
host = "0.0.0.0"
port = "8008"

[db]
connection = "mysql"
host = "127.0.0.1"
port = "3306"
database = "goal"
username = "root"
password = "password"
```

## 下一步

现在您已经了解了 Goal-Web 框架的目录结构，您可以继续阅读以下文档：

- [配置](./configuration.md)
- [路由](../basics/routing.md)
- [控制器](../basics/controllers.md)
- [请求](../basics/requests.md)