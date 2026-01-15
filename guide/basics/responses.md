# 响应

## 创建响应

### 字符串和数组

所有路由和控制器应该返回一个响应，以发送回用户的浏览器。Goal-Web 提供了几种不同的方式来返回响应。最基本的响应是从路由或控制器返回一个字符串：

```go
route.Get("/", func() string {
    return "Hello World"
})
```

除了从路由和控制器返回字符串外，您还可以返回数组或结构体。框架会自动将其转换为 JSON 响应：

```go
route.Get("/", func() map[string]interface{} {
    return map[string]interface{}{
        "name": "John",
        "age":  30,
    }
})
```

### Response 对象

通常，您不仅仅是从路由操作返回简单的字符串或数组。例如，您可能需要自定义响应的 HTTP 状态码或添加自定义头部。

Goal-Web 提供了一个 `contracts.HttpResponse` 接口，它允许您完全控制响应：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
)

type UserController struct {
	// ...
}

func (controller *UserController) Show(id string) contracts.HttpResponse {
	return http.Response("User Profile", http.StatusOK).WithHeaders(map[string]string{
		"Content-Type": "text/plain",
    })
}
```

## 重定向

重定向响应是 `contracts.HttpResponse` 接口的实例，因此您可以使用 `http.Redirect` 方法创建重定向响应：

```go
func (controller *UserController) Store() contracts.HttpResponse {
	// 存储用户...

	return http.Redirect("/users")
}
```

有时您可能希望将用户重定向到以前的位置，例如当提交的表单无效时。您可以使用 `Back` 方法来实现：

```go
func (controller *UserController) Store() contracts.HttpResponse {
	// 验证请求...

	if !valid {
		return http.Back().WithErrors(map[string]string{
			"email": "The email field is required.",
		})
	}

	// 存储用户...

	return http.Redirect("/users")
}
```

## 其他响应类型

`http` 包提供了几种方便的方法来生成其他类型的响应实例。

### 视图响应

如果您需要控制响应的状态和头部，但还需要返回视图作为响应内容，可以使用 `View` 方法：

```go
return http.View("greeting", map[string]interface{}{
    "name": "James",
})
```

### JSON 响应

`Json` 方法会自动将 `Content-Type` 头设置为 `application/json`，并使用 `json.Marshal` 函数将给定的数组或结构体转换为 JSON：

```go
return http.Json(map[string]interface{}{
    "name": "John",
    "age":  30,
})
```

如果您想创建一个 JSONP 响应，可以使用 `Jsonp` 方法：

```go
return http.Jsonp("callback", map[string]interface{}{
    "name": "John",
    "age":  30,
})
```

### 文件下载

`Download` 方法可用于生成强制用户浏览器下载给定路径文件的响应：

```go
return http.Download("path/to/file.pdf")
```

`Download` 方法接受文件名作为方法的第二个参数，这将确定下载文件的用户看到的文件名：

```go
return http.Download("path/to/file.pdf", "report.pdf")
```

### 文件响应

`File` 方法可用于在用户浏览器中显示文件，如图像或 PDF，而不是启动下载：

```go
return http.File("path/to/file.jpg")
```

### 无内容响应

`NoContent` 方法返回一个没有内容的响应，状态码为 204：

```go
return http.NoContent()
```

### XML 响应

`Xml` 方法会自动将 `Content-Type` 头设置为 `application/xml`，并将给定的数据转换为 XML：

```go
return http.Xml(map[string]interface{}{
    "name": "John",
    "age":  30,
})
```

### 流响应

`Stream` 方法用于返回流式响应，适用于大文件或实时数据传输：

```go
return http.Stream(reader, "application/octet-stream")
```

### 状态响应

`Status` 方法返回指定状态码的响应：

```go
return http.Status(404) // 返回 404 状态码
```

### 二进制响应

`Binary` 方法用于返回二进制数据：

```go
return http.Binary(data, "application/octet-stream")
```

### 纯文本响应

`Plain` 方法返回纯文本响应：

```go
return http.Plain("Hello World")
```

### 文本响应

`Text` 方法返回文本响应，与 `Plain` 类似：

```go
return http.Text("Hello World")
```

### HTML 响应

`Html` 方法返回 HTML 响应：

```go
return http.Html("<h1>Hello World</h1>")
```

## 错误响应

Goal-Web 提供了多种便捷的错误响应方法：

### 通用错误响应

`Error` 方法用于返回通用错误响应：

```go
return http.Error("Something went wrong", 500)
```

### 中止响应

`Abort` 方法用于中止请求并返回指定状态码：

```go
return http.Abort(403) // 返回 403 Forbidden
```

### 常见 HTTP 错误

Goal-Web 提供了常见 HTTP 错误的快捷方法：

#### 404 Not Found

```go
return http.NotFound("Page not found")
```

#### 403 Forbidden

```go
return http.Forbidden("Access denied")
```

#### 401 Unauthorized

```go
return http.Unauthorized("Authentication required")
```

#### 400 Bad Request

```go
return http.BadRequest("Invalid request")
```

#### 500 Internal Server Error

```go
return http.InternalServerError("Server error")
```

所有错误响应都会返回标准的 JSON 格式：

```json
{
    "error": "错误消息",
    "code": 状态码
}
```

## 响应宏

您可以定义自己的自定义响应，以便在应用程序的多个路由和控制器中重复使用。例如，您可以在服务提供者的 `Start` 方法中定义一个自定义 JSON 响应格式：

```go
package providers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

type AppServiceProvider struct {
	// ...
}

func (provider *AppServiceProvider) Register(app contracts.Application) {
}

func (provider *AppServiceProvider) Start() error {
	http.ResponseMacro("success", func(args ...interface{}) contracts.HttpResponse {
		data := interface{}(nil)
		code := 200
		if len(args) > 0 {
			data = args[0]
		}
		if len(args) > 1 {
			if c, ok := args[1].(int); ok {
				code = c
			}
		}

		return http.Json(map[string]interface{}{
			"data":    data,
			"status":  code,
			"message": "success",
		}, code)
	})

	return nil
}

func (provider *AppServiceProvider) Stop() {
}
```

定义宏后，您可以从应用程序的任何路由或控制器中使用它：

```go
func (controller *UserController) Show(id string) contracts.HttpResponse {
	user, err := controller.db.Table("users").Find(id)
	
	if err != nil {
		return http.Api(map[string]string{"error": "User not found"}, 404)
	}
	
	return http.Api(user, 200)
}
```

### 内置响应宏

Goal-Web 默认提供了一个 `api` 响应宏，用于标准化 API 响应格式：

```go
return http.Api(data, 200)
```

## 响应头

所有响应方法都是可链式调用的，允许您流畅地构建响应实例。例如，您可以使用 `WithHeaders` 方法向响应添加一系列头：

```go
return http.Response("Hello World", 200).WithHeaders(map[string]string{
    "Content-Type":  "text/plain",
    "X-Custom-Header": "Custom Value",
})
```

或者，您可以使用 `Header` 方法添加单个头：

```go
return http.Response("Hello World", 200).Header("Content-Type", "text/plain")
```

这些方法适用于所有响应类型：

```go
// JSON 响应添加自定义头
return http.Json(data).WithHeaders(map[string]string{
    "X-API-Version": "1.0",
})

// XML 响应添加缓存头
return http.Xml(data).Header("Cache-Control", "max-age=3600")

// 错误响应添加调试信息
return http.NotFound("Resource not found").Header("X-Debug-Info", "User ID not found")
```

## Cookie

### 生成 Cookie

要在传出的 Goal-Web 响应中附加 Cookie，可以使用 `Cookie` 方法。所有响应类型都支持 Cookie 操作：

```go
return http.Response("Hello World", 200).Cookie("name", "value", 60) // 60 分钟
```

`Cookie` 方法还接受几个更常用的参数，允许您进一步自定义 Cookie 的安全性和生命周期：

```go
return http.Response("Hello World", 200).Cookie(
    "name",    // Cookie 名称
    "value",   // Cookie 值
    60,        // 生命周期（分钟）
    "/",       // 路径
    "",        // 域
    false,     // 是否安全
    true,      // 仅 HTTP
)
```

### 过期 Cookie

您可以使用 `WithoutCookie` 方法从传出响应中删除 Cookie：

```go
return http.Response("Hello World", 200).WithoutCookie("name")
```

### Cookie 与其他响应类型

Cookie 方法可以与任何响应类型链式调用：

```go
// JSON 响应设置 Cookie
return http.Json(data).Cookie("session_id", sessionId, 120)

// 重定向响应设置 Cookie
return http.Redirect("/dashboard").Cookie("last_page", "/users", 30)

// 错误响应删除 Cookie
return http.Unauthorized("Please login").WithoutCookie("auth_token")
```

## 下一步

现在您已经了解了 Goal-Web 的响应基础，您可以继续阅读以下文档：

- [视图](views.md)
- [验证](validation.md)
- [错误处理](errors.md)
- [日志](logging.md)
