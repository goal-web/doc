# 认证（Authentication）

## 简介

Goal-Web 提供了基于守卫（Guard）和用户提供者（UserProvider）的认证系统，风格类似 Laravel，但实现完全符合 Go 生态。认证依赖 `contracts.Auth` 接口和一组中间件与辅助函数。

典型目标包括：

- 为 Web 会话和 API Token 提供不同的守卫
- 简化登录 / 登出逻辑
- 方便地在控制器和视图中访问当前用户

## 配置

认证配置通常位于 `config/auth.go` 中，用于声明默认守卫和各守卫的驱动、用户提供者等信息：

```go
package config

import "github.com/goal-web/contracts"

func init() {
	configs["auth"] = contracts.Fields{
		"defaults": contracts.Fields{
			"guard": "web",
		},
		"guards": contracts.Fields{
			"web": contracts.Fields{
				"driver":   "session",
				"provider": "users",
			},
			"api": contracts.Fields{
				"driver":   "token",
				"provider": "users",
			},
		},
		"providers": contracts.Fields{
			"users": contracts.Fields{
				"driver": "orm",
				"model":  "App.Models.User",
			},
		},
	}
}
```

## 访问当前用户

在控制器或处理函数中，可以通过 `contracts.Auth` 获取当前守卫，再取得当前认证用户：

```go
package controllers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

type ProfileController struct {
	http.Controller
}

func (controller *ProfileController) Show(request contracts.HttpRequest, auth contracts.Auth) contracts.HttpResponse {
	user := auth.Guard("web", request).User()
	if user == nil {
		return http.Redirect("/login")
	}

	return http.View("profile.show", map[string]any{
		"user": user,
	})
}
```

在视图中，你可以通过框架提供的辅助函数（例如 `auth` 宏或手动注入的用户数据）使用当前用户，这部分用法与模板系统配置相关，可按项目需要扩展。

## 登录与登出

登录过程一般包括：

1. 校验请求参数（使用验证组件）
2. 根据凭据从用户提供者中检索用户
3. 调用守卫的 `Login` 方法写入会话或 Token

示例：

```go
func (controller *AuthController) Login(request contracts.HttpRequest, auth contracts.Auth) contracts.HttpResponse {
	// 验证输入
	validation.Verify(request, contracts.Fields{
		"email":    "required|email",
		"password": "required",
	})

	// 从请求中获取凭据
	email := request.Input("email")
	password := request.Input("password")

	// 使用用户提供者获取用户（伪代码）
	userProvider := auth.UserProvider("users")
	user := userProvider.RetrieveById(email)
	if user == nil {
		return http.Unauthorized("Invalid credentials")
	}

	// 检查密码（使用哈希组件，见加密章节）
	if !hashing.Check(password, user.GetAuthenticatableKey()) {
		return http.Unauthorized("Invalid credentials")
	}

	// 登录用户
	auth.Guard("web", request).Login(user)

	return http.Redirect("/dashboard")
}
```

登出则更为简单：

```go
func (controller *AuthController) Logout(request contracts.HttpRequest, auth contracts.Auth) contracts.HttpResponse {
	guard := auth.Guard("web", request)
	_ = guard.Logout()

	return http.Redirect("/")
}
```

## 认证中间件

认证中间件通常用于保护需要登录的路由。可以使用文档中介绍的 `middleware.Auth`：

```go
route.Group("/dashboard", func(group contracts.Route) {
	group.Middleware(middleware.Auth())

	group.Get("/", func() contracts.HttpResponse {
		// 只有已经登录的用户可以访问
		return http.View("dashboard.index", nil)
	})
})
```

对于 API，可以使用专门的 `api` 守卫，配合 Token 认证中间件（例如在自定义中间件中调用 `auth.Guard("api", request)` 并从 Header 中解析 Token）。

## 多守卫场景

在同一应用中，你可以同时启用多个守卫，例如：

- `web` 守卫：基于 Cookie 会话，用于浏览器访问
- `api` 守卫：基于 Token 或 JWT，用于移动端 / 前后端分离接口

在控制器中只需根据场景选择不同守卫：

```go
func (controller *ApiProfileController) Me(request contracts.HttpRequest, auth contracts.Auth) contracts.HttpResponse {
	user := auth.Guard("api", request).User()
	if user == nil {
		return http.Unauthorized("Unauthenticated")
	}

	return http.Json(map[string]any{
		"id":   user.GetAuthenticatableKey(),
		"name": "Api User", // 根据实际字段返回
	})
}
```

## 最佳实践

- 为 Web 与 API 使用不同守卫和驱动，避免状态混淆
- 所有需要登录的页面与接口都通过中间件强制认证
- 登录失败返回统一的错误结构，避免泄露帐号是否存在
- 登出时清理会话和敏感 Cookie

