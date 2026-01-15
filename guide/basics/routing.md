# 路由

## 基本路由

Goal-Web 框架中最基本的路由接受一个 URI 和一个闭包，提供了一种非常简单和表达性强的方法来定义路由：

```go
package routes

import (
    "github.com/goal-web/http"
    "github.com/goal-web/http/router"
)

func Api() router.Router {
    return http.NewRouter(func(route router.Route) {
        route.Get("/", func() string {
            return "Hello World"
        })
    })
}
```

### 可用的路由方法

路由器允许您注册响应任何 HTTP 请求方法的路由：

```go
route.Get("/users", handler)      // GET 请求
route.Post("/users", handler)     // POST 请求
route.Put("/users/{id}", handler) // PUT 请求
route.Delete("/users/{id}", handler) // DELETE 请求
route.Patch("/users/{id}", handler)  // PATCH 请求
route.Options("/users", handler)  // OPTIONS 请求
```

有时您可能需要注册响应多个 HTTP 方法的路由。您可以使用 `Match` 方法来实现：

```go
route.Match([]string{"GET", "POST"}, "/users", handler)
```

或者，您可以使用 `Any` 方法注册一个响应所有 HTTP 方法的路由：

```go
route.Any("/users", handler)
```

## 路由参数

### 必选参数

有时您需要在路由中捕获 URI 片段。例如，您可能需要从 URL 中捕获用户的 ID。您可以通过定义路由参数来实现：

```go
route.Get("/users/{id}", func(id string) string {
    return "User " + id
})
```

您可以根据需要定义任意数量的路由参数：

```go
route.Get("/posts/{post}/comments/{comment}", func(post, comment string) string {
    return "Post " + post + ", Comment " + comment
})
```

路由参数始终包含在 `{}` 大括号内，并且应该由字母字符组成。路由参数名称中不能包含 `-` 字符。

### 可选参数

有时您可能需要指定一个路由参数，但是该参数的存在是可选的。您可以通过在参数名称后面加上 `?` 来实现：

```go
route.Get("/users/{name?}", func(name string) string {
    if name == "" {
        return "Users List"
    }
    return "User " + name
})
```

## 命名路由

命名路由允许为特定路由生成 URL 或重定向。您可以使用路由定义上的 `Name` 方法指定路由名称：

```go
route.Get("/users/{id}", handler).Name("users.show")
```

## 路由组

路由组允许您共享路由属性，如中间件或前缀，而无需在每个单独的路由上定义这些属性。

```go
route.Group("/admin", func(group router.Group) {
    group.Get("/users", adminUsersHandler)
    group.Get("/posts", adminPostsHandler)
})
```

### 路由前缀

`Group` 方法的第一个参数是该组中所有路由的 URI 前缀：

```go
route.Group("/admin", func(group router.Group) {
    // 匹配 /admin/users 的 GET 请求
    group.Get("/users", adminUsersHandler)
})
```

### 路由中间件

您可以使用 `Middleware` 方法将中间件应用于组内的所有路由：

```go
route.Group("/admin", func(group router.Group) {
    group.Middleware(adminMiddleware)
    group.Get("/users", adminUsersHandler)
})
```

## 路由模型绑定

Goal-Web 提供了强大的模型绑定功能，允许您直接在路由处理程序中接收模型实例：

```go
type User struct {
    ID   int
    Name string
}

func GetUser(id int) *User {
    // 从数据库获取用户
    return &User{ID: id, Name: "John"}
}

route.Get("/users/{id}", func(user *User) string {
    return "Hello, " + user.Name
})
```

在上面的例子中，框架会自动调用 `GetUser` 函数并将路由参数 `id` 传递给它，然后将返回的 `User` 实例注入到您的处理程序中。

## 回退路由

使用 `Fallback` 方法，您可以定义在没有其他路由匹配传入请求时将执行的路由：

```go
route.Fallback(func() string {
    return "页面未找到"
})
```

## 路由缓存

如果您的应用程序使用了大量的路由，您应该考虑使用 Goal-Web 的路由缓存。使用路由缓存将大大减少注册应用程序所有路由所需的时间。

要生成路由缓存，请运行 `route:cache` 命令：

```bash
go run main.go route:cache
```

如果需要清除路由缓存，可以使用 `route:clear` 命令：

```bash
go run main.go route:clear
```

## 表单方法伪造

HTML 表单不支持 `PUT`、`PATCH` 或 `DELETE` 请求方法。因此，当定义由 HTML 表单调用的 `PUT`、`PATCH` 或 `DELETE` 路由时，您需要添加一个隐藏的 `_method` 字段到表单中。与该字段一起发送的值将被用作 HTTP 请求方法：

```html
<form action="/users/1" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <!-- 其他表单字段 -->
</form>
```

## 访问当前路由

您可以使用 `Request` 实例的 `Route` 方法来访问处理传入请求的当前路由：

```go
func handler(request contracts.HttpRequest) string {
    routeName := request.Route().GetName()
    // ...
}
```

## 跨域资源共享 (CORS)

Goal-Web 可以自动响应 CORS OPTIONS 请求。要配置 CORS 行为，您可以调整 `config/cors.go` 文件中的 CORS 配置选项。

## 速率限制

Goal-Web 包含一个基于中间件实现的速率限制器。您可以使用 `RateLimit` 中间件来限制特定路由或路由组的流量：

```go
route.Group("/api", func(group router.Group) {
    group.Middleware(middleware.RateLimit(60, 1)) // 每分钟 60 个请求
    // ...
})
```

## 表单请求验证

Goal-Web 提供了多种方法来验证传入的 HTTP 请求。最常用的方法是使用表单请求验证功能：

```go
type CreateUserRequest struct {
    Name  string `form:"name" validate:"required"`
    Email string `form:"email" validate:"required,email"`
}

route.Post("/users", func(request *CreateUserRequest) string {
    // 请求已经通过验证
    return "User created: " + request.Name
})
```

## 下一步

现在您已经了解了 Goal-Web 的路由基础，您可以继续阅读以下文档：

- [中间件](middleware.md)
- [控制器](controllers.md)
- [请求](requests.md)
- [响应](responses.md)
