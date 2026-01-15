# 控制器

## 简介

控制器可以将相关的请求处理逻辑组织到一个类中，而不是将所有逻辑定义为路由文件中的闭包。控制器存储在 `app/http/controllers` 目录中。

## 基本控制器

### 定义控制器

下面是一个基本控制器类的示例。请注意，控制器可以使用依赖注入来获取其所需的任何依赖项：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
)

type UserController struct {
	request contracts.HttpRequest
    db      contracts.DB
}

func NewUserController(request contracts.HttpRequest, db contracts.DB) *UserController {
	return &UserController{request: request, db: db}
}

func (controller *UserController) Show(id string) contracts.HttpResponse {
    user, err := controller.db.Table("users").Find(id)
    
    if err != nil {
		return http.NotFound("User not found")
    }
    
	return http.Json(user)
}
```

您可以像这样定义到控制器操作的路由：

```go
route.Get("/users/{id}", controllers.NewUserController)
```

当请求匹配指定的路由 URI 时，`NewUserController` 方法将被调用，然后框架将自动解析出控制器方法（在这种情况下是 `Show` 方法）并执行它。

### 单操作控制器

如果您的控制器只需要处理单个操作，您可以在控制器上实现 `Handle` 方法：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
)

type ShowProfile struct {
	request contracts.HttpRequest
    db      contracts.DB
}

func NewShowProfile(request contracts.HttpRequest, db contracts.DB) *ShowProfile {
	return &ShowProfile{request: request, db: db}
}

func (controller *ShowProfile) Handle(id string) contracts.HttpResponse {
    user, err := controller.db.Table("users").Find(id)
    
    if err != nil {
		return http.NotFound("User not found")
    }
    
	return http.Json(user)
}
```

当使用单操作控制器时，您不需要在路由中指定方法名称：

```go
route.Get("/users/{id}", controllers.NewShowProfile)
```

## 控制器中间件

中间件可以在路由文件中分配给控制器的路由：

```go
route.Get("/profile", controllers.NewShowProfile).Middleware(middleware.Auth())
```

或者，您可能会发现在控制器的构造函数中指定中间件更方便。在控制器的构造函数中使用 `Middleware` 方法，您可以为控制器的所有操作分配中间件：

```go
func NewUserController(request contracts.HttpRequest, db contracts.DB) *UserController {
	controller := &UserController{request: request, db: db}
    
    // 应用中间件
    controller.Middleware(middleware.Auth())
    
    return controller
}
```

## 依赖注入和控制器

### 构造函数注入

Goal-Web 的服务容器用于解析所有控制器。因此，您可以在控制器的构造函数中类型提示任何依赖项，它们将自动解析并注入到控制器实例中：

```go
type UserController struct {
	request contracts.HttpRequest
    db      contracts.DB
    logger  contracts.Logger
}

func NewUserController(request contracts.HttpRequest, db contracts.DB, logger contracts.Logger) *UserController {
    return &UserController{request: request, db: db, logger: logger}
}
```

### 方法注入

除了构造函数注入外，您还可以在控制器的方法上类型提示依赖项。一个常见的用例是类型提示 `contracts.HttpRequest` 实例：

```go
func (controller *UserController) Store(request contracts.HttpRequest) contracts.HttpResponse {
    name := request.Input("name")
    // 创建用户...
    
	return http.Json(map[string]interface{}{
        "message": "User created successfully",
    })
}
```

如果您的控制器方法需要从路由参数中获取输入，只需在其他依赖项之后添加参数即可。例如，如果您的路由定义如下：

```go
route.Get("/users/{id}", controllers.NewUserController)
```

您可以通过定义控制器方法来访问 `id` 参数，如下所示：

```go
func (controller *UserController) Show(request contracts.HttpRequest, id string) contracts.HttpResponse {
    // 获取用户...
    
	return http.Json(user)
}
```

## 资源控制器

Goal-Web 资源路由将典型的 "CRUD" 路由分配给控制器，只需一行代码。例如，您可能希望创建一个控制器来处理应用程序存储的「照片」的所有 HTTP 请求。使用 `Resource` 方法，您可以快速创建这样的控制器：

```go
route.Resource("/photos", controllers.NewPhotoController)
```

这个单一的路由声明创建了多个路由来处理各种资源操作。生成的控制器已经有了处理这些操作的方法，包括显示所有照片、创建新照片表单、存储新照片、显示特定照片等的方法。

### 资源控制器操作

以下是 `Resource` 方法创建的路由列表：

| 动词      | URI                  | 操作      | 路由名称       |
|----------|----------------------|-----------|---------------|
| GET      | /photos              | Index     | photos.index  |
| GET      | /photos/create       | Create    | photos.create |
| POST     | /photos              | Store     | photos.store  |
| GET      | /photos/{photo}      | Show      | photos.show   |
| GET      | /photos/{photo}/edit | Edit      | photos.edit   |
| PUT/PATCH| /photos/{photo}      | Update    | photos.update |
| DELETE   | /photos/{photo}      | Destroy   | photos.destroy|

### 指定资源模型

如果您使用了路由模型绑定，并且希望资源控制器的方法类型提示模型实例，可以在注册资源路由时使用 `Model` 方法：

```go
route.Resource("/photos", controllers.NewPhotoController).Model(models.Photo{})
```

### 部分资源路由

声明资源路由时，您可以指定控制器应处理的操作子集，而不是完整的默认操作集：

```go
route.Resource("/photos", controllers.NewPhotoController).Only("index", "show")
```

或者，您可以使用 `Except` 方法指定控制器不应处理的操作子集：

```go
route.Resource("/photos", controllers.NewPhotoController).Except("create", "store", "update", "destroy")
```

### API 资源路由

当声明用于 API 的资源路由时，您通常希望排除显示 HTML 模板的路由。为此，您可以使用 `ApiResource` 方法：

```go
route.ApiResource("/photos", controllers.NewPhotoController)
```

这将排除 `create` 和 `edit` 路由，这些路由通常用于返回 HTML 视图。

## 依赖注入和路由参数

有时，您可能需要在控制器方法中访问路由参数，同时也需要利用依赖注入。例如，您可能需要访问路由中的 `{photo}` 参数，同时也需要注入一个服务：

```go
func (controller *PhotoController) Show(photoService contracts.PhotoService, id string) contracts.HttpResponse {
    photo, err := photoService.FindById(id)
    
    if err != nil {
		return http.NotFound("Photo not found")
    }
    
	return http.Json(photo)
}
```

## 路由缓存

如果您的应用程序完全使用控制器路由，您应该利用 Goal-Web 的路由缓存。使用路由缓存将大大减少注册应用程序所有路由所需的时间。要生成路由缓存，请运行 `route:cache` 命令：

```bash
go run main.go route:cache
```

## 表单请求验证

对于更复杂的验证场景，您可能希望创建一个「表单请求」。表单请求是包含验证逻辑的自定义请求类。要创建表单请求类，您可以定义一个实现了验证规则的结构体：

```go
type StoreUserRequest struct {
    Name  string `form:"name" validate:"required"`
    Email string `form:"email" validate:"required,email"`
    Age   int    `form:"age" validate:"required,gt=0"`
}
```

然后，您可以在控制器方法中类型提示这个请求：

```go
func (controller *UserController) Store(request *StoreUserRequest) contracts.HttpResponse {
    // 请求已经通过验证
    // 创建用户...
    
	return http.Json(map[string]interface{}{
        "message": "User created successfully",
    })
}
```

## 下一步

现在您已经了解了 Goal-Web 的控制器基础，您可以继续阅读以下文档：

- [请求](requests.md)
- [响应](responses.md)
- [视图](views.md)
- [验证](validation.md)
