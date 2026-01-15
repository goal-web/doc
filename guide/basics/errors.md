# 错误处理

## 简介

Goal-Web 框架提供了一个全面的错误和异常处理系统，使您能够轻松地捕获、记录和处理应用程序中的各种错误情况。本文档将指导您了解如何在 Goal-Web 应用程序中有效地处理错误。

## 配置

错误处理配置通常位于 `config/app.go` 文件中。您可以在这里配置是否在开发过程中显示详细的错误信息，以及如何记录错误。

```go
// config/app.go
package config

func init() {
    configs["app"] = map[string]interface{}{
        // ...
        "debug": env.GetBool("APP_DEBUG", true),
        // ...
    }
}
```

## 错误处理基础

### 显示错误

在开发过程中，当应用程序遇到错误时，Goal-Web 会显示详细的错误页面，其中包含错误消息、堆栈跟踪和请求信息。这有助于您快速诊断和修复问题。

在生产环境中，为了安全起见，这些详细信息会被隐藏，而是显示一个通用的错误页面。您可以通过设置 `APP_DEBUG=false` 环境变量来启用生产模式。

### 错误处理中间件

Goal-Web 包含一个错误处理中间件，它会捕获应用程序中发生的所有错误，并将它们转换为适当的 HTTP 响应。这个中间件是自动注册的，您不需要手动添加它。

## 异常类型

Goal-Web 定义了几种常见的异常类型，您可以在应用程序中使用它们：

### HTTP 异常

HTTP 异常用于表示 HTTP 错误，如 404 Not Found 或 403 Forbidden。通常可以使用 `http.NotFound` 等错误响应方法来返回 HTTP 错误：

```go
func Show(request contracts.HttpRequest) contracts.HttpResponse {
	user := findUser(request.Input("id"))

	if user == nil {
		return http.NotFound("User not found")
	}

	return http.View("user.show", map[string]interface{}{
		"user": user,
	})
}
```

### 便捷的错误响应方法

Goal-Web 提供了多种便捷的错误响应方法，让您能够快速返回标准的 HTTP 错误响应：

```go
// 通用错误响应
return http.Error("Something went wrong", 500)

// 中止请求
return http.Abort(403)

// 常见 HTTP 错误的快捷方法
return http.NotFound("User not found")           // 404
return http.Forbidden("Access denied")           // 403
return http.Unauthorized("Login required")       // 401
return http.BadRequest("Invalid input")          // 400
return http.InternalServerError("Server error")  // 500
```

这些方法都会返回标准的 JSON 格式错误响应：

```json
{
    "error": "错误消息",
    "code": 状态码
}
```

所有错误响应方法都支持链式调用，您可以添加自定义头部或 Cookie：

```go
return http.NotFound("Resource not found")
    .Header("X-Error-ID", "ERR001")
    .WithoutCookie("session_id")
```

### 验证异常

验证异常用于表示输入验证失败。您可以使用 `validation.NewException` 函数配合验证结果来创建并抛出验证异常，由全局异常处理器统一处理：

```go
func Store(request contracts.HttpRequest) contracts.HttpResponse {
	errFields := validation.Valid(request, contracts.Fields{
		"title": "required|max:255",
		"body":  "required",
	})

	if len(errFields) > 0 {
		panic(validation.NewException(request.ToFields(), errFields))
	}

	// 存储博客文章...

	return http.Redirect("/posts")
}
```

### 自定义异常

您可以创建自己的异常类型，只需实现 `contracts.Exception` 接口：

```go
package exceptions

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

type CustomException struct {
	Message  string
	Code     int
	Previous contracts.Exception
}

func (e *CustomException) Error() string {
	return e.Message
}

func (e *CustomException) GetPrevious() contracts.Exception {
	return e.Previous
}

func (e *CustomException) ToResponse() contracts.HttpResponse {
	return http.Json(map[string]interface{}{
		"error":   true,
		"message": e.Message,
		"code":    e.Code,
	}, e.Code)
}
```

## 错误处理

### 全局异常处理

您可以在 `app/exceptions/handler.go` 文件中定义全局异常处理程序：

```go
package exceptions

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

type Handler struct {
}

func (handler *Handler) Handle(exception contracts.Exception) any {
	return http.Json(map[string]interface{}{
		"error":   true,
		"message": exception.Error(),
	}, http.StatusInternalServerError)
}

func (handler *Handler) Report(exception contracts.Exception) {
}

func (handler *Handler) ShouldReport(exception contracts.Exception) bool {
	return true
}
```

然后，在 `app/providers/exception_service_provider.go` 文件中注册异常处理程序：

```go
package providers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/goal/app/exceptions"
)

type ExceptionServiceProvider struct {
	// ...
}

func (provider *ExceptionServiceProvider) Register(app contracts.Application) {
	app.Singleton("exception.handler", func() contracts.ExceptionHandler {
		return &exceptions.Handler{}
	})
}
 
func (provider *ExceptionServiceProvider) Start() error {
	return nil
}

func (provider *ExceptionServiceProvider) Stop() {}
```

## 记录错误

Goal-Web 提供了一个强大的日志系统，您可以使用它来记录应用程序中的错误：

```go
func DoSomething(log contracts.Log) {
	result, err := doWork()
	if err != nil {
		log.Error("An error occurred: %v", err)
		return
	}

	_ = result
}
```

您可以配置日志系统将错误发送到各种目标，如文件、数据库、外部服务等。有关更多信息，请参阅[日志](logging.md)文档。

## HTTP 错误页面

### 自定义错误页面

您可以为不同的 HTTP 错误代码创建自定义错误页面。默认情况下，Goal-Web 会在 `resources/views/errors` 目录中查找错误视图。

例如，要创建一个自定义的 404 错误页面，您可以创建一个 `resources/views/errors/404.html` 文件：

```html
<!-- resources/views/errors/404.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Page Not Found</title>
    </head>
    <body>
        <div class="container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to home</a>
        </div>
    </body>
</html>
```

### 回退错误页面

如果没有为特定错误代码找到自定义错误页面，Goal-Web 将使用通用的错误页面。您可以通过创建 `resources/views/errors/default.html` 文件来自定义这个通用错误页面。

## 调试和故障排除

### 调试模式

在开发过程中，您可以启用调试模式以获取更详细的错误信息。您可以通过设置 `APP_DEBUG=true` 环境变量来启用调试模式。

### 使用日志进行故障排除

日志是故障排除的重要工具。Goal-Web 的日志系统允许您记录应用程序中的各种事件和错误。您可以使用不同的日志级别（如 debug、info、warning、error 等）来区分不同类型的消息。

```go
func DoSomething(log contracts.Log) {
	log.Debug("Starting operation...")

	result, err := doWork()
	if err != nil {
		log.Error("Operation failed: %v", err)
		return
	}

	log.Info("Operation completed successfully")
	_ = result
}
```

### 使用调试工具

Goal-Web 集成了各种调试工具，如请求/响应记录器、SQL 查询记录器等。这些工具可以帮助您识别和修复应用程序中的问题。

## 最佳实践

### 使用适当的错误类型

根据错误的性质选择适当的错误类型。例如，使用 HTTP 异常表示 HTTP 错误，使用验证异常表示验证失败等。

### 提供有用的错误消息

确保您的错误消息清晰、具体且有用。这将帮助用户理解发生了什么问题，以及他们可能需要采取什么行动来解决它。

### 记录详细的错误信息

在日志中记录详细的错误信息，包括错误消息、堆栈跟踪、请求数据等。这将帮助您诊断和修复生产环境中的问题。

### 优雅地处理错误

确保您的应用程序能够优雅地处理错误，而不会崩溃或显示敏感信息。使用统一的异常处理器和适当的错误返回结构来捕获和处理异常，并提供合理的回退机制。

## 下一步

现在您已经了解了 Goal-Web 的错误处理基础，您可以继续阅读以下文档：

- [日志](logging.md)
- [测试](../testing/getting-started.md)
