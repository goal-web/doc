# 视图

## 简介

Goal-Web 不仅仅可以用来构建 API，它还提供了强大的视图系统，使您能够创建动态的 HTML 页面。视图将您的控制器或应用程序逻辑与表示逻辑分离，并存储在 `resources/views` 目录中。

一个简单的视图可能看起来像这样：

```html
<!-- resources/views/greeting.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Goal-Web</title>
    </head>
    <body>
        <h1>Hello, {{ .name }}</h1>
    </body>
</html>
```

将此视图存储在 `resources/views/greeting.html` 后，我们可以像这样返回它：

```go
route.Get("/greeting", func() contracts.HttpResponse {
    return http.View("greeting", map[string]interface{}{
        "name": "John",
    })
})
```

## 创建和渲染视图

### 创建视图

视图文件通常存储在 `resources/views` 目录中，并使用 HTML 文件扩展名。Goal-Web 默认使用 Go 的 `html/template` 包来渲染视图，但您也可以配置其他模板引擎。

### 渲染视图

一旦您创建了一个视图，您可以使用全局 `http.View` 函数从控制器或路由中返回它：

```go
func (controller *HomeController) Index() contracts.HttpResponse {
    return http.View("home", map[string]interface{}{
        "name": "John",
    })
}
```

如您所见，`View` 函数的第一个参数是视图文件的名称，第二个参数是应该对视图可用的数据数组。

### 嵌套视图目录

视图也可以嵌套在 `resources/views` 目录的子目录中。"点"符号可用于引用嵌套视图。例如，如果您的视图存储在 `resources/views/admin/profile.html`，您可以这样引用它：

```go
return http.View("admin.profile", map[string]interface{}{
    "user": user,
})
```

### 确定视图是否存在

如果您需要确定视图是否存在，您可以使用 `contracts.Views` 接口的 `Exists` 方法：

```go
func (controller *HomeController) Index(view contracts.Views) contracts.HttpResponse {
    if view.Exists("custom.admin.profile") {
        return http.View("custom.admin.profile", data)
    }
    
    return http.View("admin.profile", data)
}
```

## 向视图传递数据

如前面的示例所示，您可以将数据数组传递给视图：

```go
return http.View("greeting", map[string]interface{}{
    "name": "John",
})
```

当以这种方式传递信息时，数据应该是一个键/值对的映射。在您的视图中，您可以使用与键对应的变量名称访问每个值。

### 与所有视图共享数据

有时，您可能需要与应用程序渲染的所有视图共享一段数据。您可以使用视图服务的 `Share` 方法。通常，您可以在应用自己的服务提供者的 `Start` 方法中调用 `Share` 方法：

```go
package providers

import (
	"github.com/goal-web/contracts"
)

type AppServiceProvider struct {
	app contracts.Application
}

func (provider *AppServiceProvider) Register(app contracts.Application) {
	provider.app = app
}

func (provider *AppServiceProvider) Start() error {
	provider.app.Call(func(views contracts.Views) {
		views.Share("key", "value")
	})
	return nil
}

func (provider *AppServiceProvider) Stop() {}
```

## 视图组件

视图组件是可重用的视图片段，可以在整个应用程序中使用。它们类似于布局中的"部分视图"，但更强大。

### 创建组件

要创建一个组件，您可以在 `resources/views/components` 目录中创建一个新的视图文件：

```html
<!-- resources/views/components/alert.html -->
<div class="alert alert-{{ .type }}">
    {{ .message }}
</div>
```

### 渲染组件

您可以使用 `Component` 方法在视图中渲染组件：

```html
<!-- resources/views/home.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Goal-Web</title>
    </head>
    <body>
        {{ Component "alert" .alert }}
        
        <div class="container">
            {{ .content }}
        </div>
    </body>
</html>
```

然后，在您的控制器中：

```go
return http.View("home", map[string]interface{}{
    "content": "Welcome to Goal-Web!",
    "alert": map[string]interface{}{
        "type": "success",
        "message": "You are now logged in.",
    },
})
```

## 布局

### 定义布局

布局是应用程序中常见的视图结构，如页眉、页脚和导航菜单。Goal-Web 允许您定义这些布局作为单独的视图：

```html
<!-- resources/views/layouts/app.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Goal-Web - {{ .title }}</title>
    </head>
    <body>
        <div class="container">
            {{ .content }}
        </div>
    </body>
</html>
```

### 扩展布局

当定义一个子视图时，使用 `Extends` 函数来指定子视图应该"继承"哪个布局：

```html
<!-- resources/views/child.html -->
{{ Extends "layouts.app" }}

{{ Define "content" }}
    <p>This is my body content.</p>
{{ End }}

{{ Define "title" }}My Page Title{{ End }}
```

## 模板引擎

Goal-Web 默认使用 Go 的 `html/template` 包作为其模板引擎。这个包提供了一组强大的模板功能。

### 基本用法

在您的视图中，您可以使用双大括号语法来显示变量：

```html
<h1>Hello, {{ .name }}</h1>
```

您也可以使用条件语句：

```html
{{ if .isAdmin }}
    <p>Welcome, Admin!</p>
{{ else }}
    <p>Welcome, User!</p>
{{ end }}
```

循环也是可能的：

```html
<ul>
    {{ range .users }}
        <li>{{ .name }}</li>
    {{ end }}
</ul>
```

### 自定义模板函数

您可以通过在服务提供者中注册自定义模板函数来扩展模板引擎：

```go
package providers

import (
	"github.com/goal-web/contracts"
	"strings"
)

type AppServiceProvider struct {
	app contracts.Application
}

func (provider *AppServiceProvider) Register(app contracts.Application) {
	provider.app = app
}

func (provider *AppServiceProvider) Start() error {
	provider.app.Call(func(views contracts.Views) {
		views.AddFunc("upper", strings.ToUpper)
	})
	return nil
}

func (provider *AppServiceProvider) Stop() {}
```

然后，您可以在视图中使用这个函数：

```html
<h1>{{ upper .name }}</h1>
```

## 优化视图

默认情况下，Goal-Web 会在每次请求时编译视图。在生产环境中，您可能希望缓存视图以提高性能。您可以使用 `view:cache` 命令来实现：

```bash
go run main.go view:cache
```

要清除视图缓存，您可以使用 `view:clear` 命令：

```bash
go run main.go view:clear
```

## 下一步

现在您已经了解了 Goal-Web 的视图基础，您可以继续阅读以下文档：

- [验证](validation.md)
- [错误处理](errors.md)
- [日志](logging.md)
- [前端开发](../frontend/templates.md)
