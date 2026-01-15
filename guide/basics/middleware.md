# 中间件

## 简介

中间件提供了一种便捷的机制来过滤进入应用程序的 HTTP 请求。例如，Goal-Web 包含一个中间件，用于验证应用程序的用户是否已通过身份验证。如果用户未通过身份验证，中间件会将用户重定向到登录页面。但是，如果用户已通过身份验证，中间件将允许请求继续深入应用程序。

除了身份验证之外，还可以编写其他中间件来执行各种任务。CORS 中间件可能负责向所有响应添加适当的头部。日志中间件可能记录应用程序接收的所有传入请求。

## 定义中间件

要创建一个新的中间件，可以使用以下方法：

```go
package middleware

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

func Auth(request contracts.HttpRequest, next contracts.Pipe, auth contracts.Auth, config contracts.Config) any {
	if auth.Guard(config.Get("auth").(auth.Config).Defaults.Guard, request).Guest() {
		return http.Redirect("/login")
	}

	response := next(request)

	return response
}
```

## 注册中间件

### 全局中间件

如果您想要中间件在每个 HTTP 请求期间运行，可以在路由器上注册全局中间件：

```go
func RegisterRoutes(router contracts.HttpRouter) {
	router.Use(middlewares.Example)

	router.Get("/profile", handler)
}
```

### 为路由分配中间件

如果您想将中间件分配给特定的路由，应该在路由定义时提供中间件：

```go
route.Get("/profile", handler).Middleware(middleware.Auth())
```

或者，您可以使用 `Group` 方法将中间件应用于一组路由：

```go
route.Group("/admin", func(group router.Group) {
    group.Middleware(middleware.Auth())
    
    group.Get("/users", adminUsersHandler)
    group.Get("/posts", adminPostsHandler)
})
```

## 中间件参数

中间件也可以接收额外的参数。例如，如果您的应用程序需要在执行特定操作之前验证用户是否具有特定的角色，您可以创建一个 `RoleMiddleware` 来接收角色名称作为参数：

```go
func Role(role string) any {
	return func(request contracts.HttpRequest, next contracts.Pipe, auth contracts.Auth) any {
		user := auth.Guard("web", request).User()
		if user == nil || user.GetRole() != role {
			return http.Abort(403, "Unauthorized action.")
		}

		return next(request)
	}
}
```

中间件可以接收任意数量的参数：

```go
route.Get("/admin/users", handler).Middleware(middleware.Role("admin"))
```

## 内置中间件

Goal-Web 框架包含了一组可以在应用程序中使用的中间件。以下是一些常用的内置中间件：

### 认证中间件

`Auth` 中间件用于验证用户是否已登录。如果用户未登录，中间件会将用户重定向到登录页面：

```go
route.Get("/profile", handler).Middleware(middleware.Auth())
```

### CORS 中间件

`Cors` 中间件用于处理跨域资源共享，允许来自不同域的请求访问您的应用程序：

```go
route.Group("/api", func(group router.Group) {
    group.Middleware(middleware.Cors())
    // API 路由定义
})
```

### 速率限制中间件

`RateLimit` 中间件用于限制对特定路由的请求频率：

```go
route.Group("/api", func(group router.Group) {
    group.Middleware(middleware.RateLimit(60, 1)) // 每分钟 60 个请求
    // API 路由定义
})
```

### 验证中间件

`Validate` 中间件用于验证传入请求的数据：

```go
type CreateUserRequest struct {
    Name  string `form:"name" validate:"required"`
    Email string `form:"email" validate:"required,email"`
}

route.Post("/users", handler).Middleware(middleware.Validate(CreateUserRequest{}))
```

## 中间件排序

有时，中间件的执行顺序很重要。例如，确保会话中间件在身份验证中间件之前运行，因为身份验证中间件需要使用会话中存储的数据。

在 Goal-Web 中，中间件的执行顺序由它们在路由器中注册的顺序决定：

```go
router.Use(
	middleware.Session,
	middleware.Auth,
	middleware.RateLimit(60, 1),
)
```

## 下一步

现在您已经了解了 Goal-Web 的中间件基础，您可以继续阅读以下文档：

- [控制器](controllers.md)
- [请求](requests.md)
- [响应](responses.md)
- [视图](views.md)
