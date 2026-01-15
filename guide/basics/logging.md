# 日志

## 简介

Goal-Web 提供了一个强大而灵活的日志系统，允许您记录应用程序中的消息，并将它们发送到各种输出目标，如文件、控制台或外部服务。日志对于监控应用程序的健康状况、调试问题和跟踪用户活动非常有用。

## 配置

日志配置通常位于 `config/logging.go` 文件中。您可以在这里配置默认的日志通道、可用的日志通道以及每个通道的特定配置。

```go
// config/logging.go
package config

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/supports/logs"
)

func init() {
    configs["logging"] = map[string]interface{}{
        "default": env.Get("LOG_CHANNEL", "stack"),
        
        "channels": map[string]interface{}{
            "stack": map[string]interface{}{
                "driver":   "stack",
                "channels": []string{"daily", "console"},
            },
            
            "single": map[string]interface{}{
                "driver": "single",
                "path":   storagePath("logs/goal.log"),
                "level":  env.Get("LOG_LEVEL", "debug"),
            },
            
            "daily": map[string]interface{}{
                "driver":   "daily",
                "path":     storagePath("logs/goal.log"),
                "level":    env.Get("LOG_LEVEL", "debug"),
                "days":     7,
                "formatter": &logs.LineFormatter{},
            },
            
            "console": map[string]interface{}{
                "driver":    "console",
                "level":     env.Get("LOG_LEVEL", "debug"),
                "formatter": &logs.ConsoleFormatter{},
            },
        },
    }
}
```

## 日志级别

Goal-Web 支持以下日志级别，按严重性递增排序：

- `debug`: 详细的调试信息
- `info`: 有趣的事件
- `notice`: 正常但重要的事件
- `warning`: 异常事件，但不是错误
- `error`: 运行时错误，不需要立即处理
- `critical`: 严重错误
- `alert`: 必须立即采取行动
- `emergency`: 系统不可用

您可以通过配置文件中的 `level` 选项来指定每个通道的最低日志级别。只有级别等于或高于指定级别的消息才会被记录。

## 写入日志消息

### 通过日志门面

最简单的方法是使用全局 `log` 门面：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
    "github.com/goal-web/supports/logs"
)

type UserController struct {
    http.Controller
}

func (controller *UserController) Show(request contracts.HttpRequest) contracts.HttpResponse {
    userId := request.Input("id")
    
    logs.Info("Showing user profile for user: %s", userId)
    
    // ...
    
    return http.View("user.profile", map[string]interface{}{
        "user": user,
    })
}
```

### 通过依赖注入

您也可以通过依赖注入来获取日志实例：

```go
func (controller *UserController) Show(request contracts.HttpRequest, log contracts.Log) contracts.HttpResponse {
    userId := request.Input("id")
    
    log.Info("Showing user profile for user: %s", userId)
    
    // ...
    
    return http.View("user.profile", map[string]interface{}{
        "user": user,
    })
}
```

### 上下文信息

您可以在日志消息中包含上下文信息：

```go
log.Info("User failed to login.", map[string]interface{}{
    "id":       user.ID,
    "username": user.Username,
    "ip":       request.Ip(),
})
```

## 可用的日志方法

Goal-Web 的日志系统提供了以下方法，对应于不同的日志级别：

```go
log.Debug(message, args...)
log.Info(message, args...)
log.Notice(message, args...)
log.Warning(message, args...)
log.Error(message, args...)
log.Critical(message, args...)
log.Alert(message, args...)
log.Emergency(message, args...)
```

每个方法接受一个消息字符串和可选的参数，用于格式化消息。

## 通道

Goal-Web 支持多种日志通道，每个通道可以有不同的配置和目标。

### 单文件通道

单文件通道将所有日志消息写入单个文件：

```go
"single": map[string]interface{}{
    "driver": "single",
    "path":   storagePath("logs/goal.log"),
    "level":  env.Get("LOG_LEVEL", "debug"),
},
```

### 每日文件通道

每日文件通道为每一天创建一个新的日志文件，并自动删除旧的日志文件：

```go
"daily": map[string]interface{}{
    "driver":   "daily",
    "path":     storagePath("logs/goal.log"),
    "level":    env.Get("LOG_LEVEL", "debug"),
    "days":     7,
    "formatter": &logs.LineFormatter{},
},
```

### 控制台通道

控制台通道将日志消息输出到控制台：

```go
"console": map[string]interface{}{
    "driver":    "console",
    "level":     env.Get("LOG_LEVEL", "debug"),
    "formatter": &logs.ConsoleFormatter{},
},
```

### 堆栈通道

堆栈通道允许您将日志消息发送到多个通道：

```go
"stack": map[string]interface{}{
    "driver":   "stack",
    "channels": []string{"daily", "console"},
},
```

## 自定义通道

您可以创建自定义日志通道，以满足特定的需求。首先，创建一个实现 `contracts.Logger` 接口的日志处理程序：

```go
package loggers

import (
    "github.com/goal-web/contracts"
)

type CustomLogger struct {
    // ...
}

func (logger *CustomLogger) Log(level contracts.LogLevel, message string, context map[string]interface{}) {
    // 实现日志记录逻辑
}
```

然后，在服务提供者中注册自定义通道：

```go
package providers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/goal/app/loggers"
)

type LogServiceProvider struct {
    // ...
}

func (provider *LogServiceProvider) Register(app contracts.Application) {
    app.Call(func(factory contracts.LoggerFactory) {
        factory.Extend("custom", func(config map[string]interface{}) contracts.Logger {
            return &loggers.CustomLogger{
                // 使用配置初始化日志记录器
            }
        })
    })
}
```

最后，在配置文件中使用自定义通道：

```go
"custom": map[string]interface{}{
    "driver": "custom",
    // 自定义配置选项
},
```

## 格式化日志消息

Goal-Web 允许您自定义日志消息的格式。您可以通过实现 `contracts.Formatter` 接口来创建自定义格式化程序：

```go
package formatters

import (
    "github.com/goal-web/contracts"
    "time"
)

type JsonFormatter struct {
    // ...
}

func (formatter *JsonFormatter) Format(level contracts.LogLevel, message string, context map[string]interface{}) string {
    // 将日志消息格式化为 JSON
    return fmt.Sprintf(`{"time":"%s","level":"%s","message":"%s","context":%s}`,
        time.Now().Format(time.RFC3339),
        level,
        message,
        formatContext(context),
    )
}

func formatContext(context map[string]interface{}) string {
    // 将上下文格式化为 JSON 字符串
    // ...
    return jsonString
}
```

然后，在配置文件中使用自定义格式化程序：

```go
"daily": map[string]interface{}{
    "driver":   "daily",
    "path":     storagePath("logs/goal.log"),
    "level":    env.Get("LOG_LEVEL", "debug"),
    "days":     7,
    "formatter": &formatters.JsonFormatter{},
},
```

## 监控和分析日志

### 日志轮转

Goal-Web 的每日文件通道会自动进行日志轮转，创建新的日志文件并删除旧的日志文件。您可以通过 `days` 选项来配置保留的天数。

### 外部日志服务

您可以创建自定义通道，将日志消息发送到外部日志服务，如 Elasticsearch、Logstash、Graylog 等。这些服务提供了强大的搜索、过滤和可视化功能，使您能够更好地理解和分析日志数据。

## 最佳实践

### 使用适当的日志级别

根据消息的重要性和紧急性选择适当的日志级别。例如，使用 `debug` 级别记录详细的调试信息，使用 `error` 级别记录运行时错误，使用 `emergency` 级别记录系统不可用的情况。

### 包含上下文信息

在日志消息中包含足够的上下文信息，以便于理解和调试问题。例如，包含用户 ID、请求 ID、操作类型等信息。

### 避免记录敏感信息

确保不要在日志中记录敏感信息，如密码、信用卡号码、个人身份信息等。如果需要记录包含敏感信息的数据，请确保先对其进行适当的屏蔽或加密。

### 定期检查和分析日志

定期检查和分析日志，以识别潜在的问题和趋势。这可以帮助您提前发现和解决问题，提高应用程序的可靠性和性能。

## 下一步

现在您已经了解了 Goal-Web 的日志基础，您可以继续阅读以下文档：

- [测试](../testing/getting-started.md)
- [错误处理](errors.md)
- [部署](../deployment/optimization.md)
