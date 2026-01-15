# 配置

## 简介

Goal-Web 框架的所有配置文件都存储在 `config` 目录中。每个选项都有文档说明，因此请随时浏览文件并熟悉可用的选项。

## 环境配置

应用程序的环境变量配置基于您的服务器环境，可以使用 `.env` 文件、`env.toml` 或 `env.yaml` 文件进行配置。Goal-Web 支持多种配置文件格式，您可以根据自己的喜好选择使用。

### 环境变量类型

Goal-Web 框架使用 `github.com/goal-web/config` 包来处理配置文件。该包支持以下配置文件格式：

- TOML (`.toml`)
- YAML (`.yaml`)
- 环境变量文件 (`.env`)

### 基本配置示例

以下是一个基本的 `env.toml` 配置文件示例：

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

同样的配置使用 YAML 格式：

```yaml
app:
  name: "goal"
  key: "your-app-key"
  env: "local"
  debug: true
http:
  host: "0.0.0.0"
  port: "8008"
db:
  connection: "mysql"
  host: "127.0.0.1"
  port: "3306"
  database: "goal"
  username: "root"
  password: "password"
```

## 访问配置值

您可以在应用程序的任何地方使用 `config` 服务来访问配置值。例如：

```go
package controllers

import (
    "github.com/goal-web/contracts"
)

type ExampleController struct {
    config contracts.Config
}

func NewExampleController(config contracts.Config) *ExampleController {
    return &ExampleController{config: config}
}

func (controller *ExampleController) GetAppName() string {
    return controller.config.GetString("app.name")
}
```

您也可以使用 `env` 函数来访问环境变量：

```go
appName := env("app.name", "Goal")
```

第二个参数是默认值，如果配置项不存在，将返回该默认值。

## 配置缓存

为了提高应用程序的性能，您可以使用以下命令缓存所有配置文件：

```bash
go run main.go config:cache
```

这将创建一个缓存文件，包含应用程序使用的所有配置选项。

如果您需要在开发过程中清除配置缓存，可以使用以下命令：

```bash
go run main.go config:clear
```

## 维护模式

当您的应用程序处于维护模式时，所有路由都会显示一个自定义视图。这使得在更新或维护应用程序时可以轻松地"禁用"应用程序的一部分。

要启用维护模式，请运行 `down` 命令：

```bash
go run main.go down
```

要禁用维护模式，请使用 `up` 命令：

```bash
go run main.go up
```

## 调试模式

`app.debug` 配置选项决定了向用户显示多少错误信息。默认情况下，此选项设置为尊重 `app.env` 环境变量的值，在本地开发时为 `true`，在生产环境中为 `false`。

在开发过程中，您应该将 `app.debug` 设置为 `true`，以便在出现错误时获取更详细的信息。在生产环境中，应将此值设置为 `false` 以避免向用户显示敏感信息。

## 自定义配置文件

除了框架提供的默认配置文件外，您还可以创建自己的配置文件来组织应用程序特定的配置。例如，如果您的应用程序处理图像，您可以创建一个 `config/images.go` 文件：

```go
package config

type ImagesConfig struct {
    MaxWidth  int
    MaxHeight int
    Quality   int
}

func Images() ImagesConfig {
    return ImagesConfig{
        MaxWidth:  env("images.max_width", 1200),
        MaxHeight: env("images.max_height", 1200),
        Quality:   env("images.quality", 90),
    }
}
```

然后在 `env.toml` 文件中添加相应的配置：

```toml
[images]
max_width = 1200
max_height = 1200
quality = 90
```

## 下一步

现在您已经了解了如何配置 Goal-Web 应用程序，您可以继续阅读以下文档：

- [路由](../basics/routing.md)
- [控制器](../basics/controllers.md)
- [请求](../basics/requests.md)
- [响应](../basics/responses.md)