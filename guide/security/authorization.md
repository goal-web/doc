# 授权（Authorization）

## 简介

认证解决“你是谁”，授权解决“你能做什么”。Goal-Web 提供基于 Gate / Policy 的授权系统，对应 `contracts.Gate` 和 `contracts.GateFactory` 接口。

常见授权场景：

- 判断当前用户是否可以执行某个动作（如删除文章）
- 控制视图中某些按钮（如仅管理员可见）
- 封装复杂权限逻辑，避免在控制器中散落 if 判断

## 注册权限策略（Policy）

权限策略通常在服务提供者中注册，通过 `GateFactory` 定义能力（ability）与对应的检查逻辑：

```go
package providers

import (
	"github.com/goal-web/contracts"
)

type AuthServiceProvider struct{}

func (provider *AuthServiceProvider) Register(app contracts.Application) {
}

func (provider *AuthServiceProvider) Start() error {
	return nil
}

func (provider *AuthServiceProvider) Stop() {}
```

通常你会在应用启动阶段某处（例如自定义服务提供者的 `Start` 方法中）获得 `GateFactory`，并定义权限规则。这里给出一个基于用户角色的简单示例逻辑：

```go
// 伪代码：具体可在应用初始化时调用
func DefineAbilities(factory contracts.GateFactory) {
	factory.Define("view-post", func(user contracts.Authorizable, data ...any) bool {
		// 检查是否有查看文章的权限
		return true
	})

	factory.Define("delete-post", func(user contracts.Authorizable, data ...any) bool {
		// 只有管理员可以删除文章
		return user.Can("admin")
	})
}
```

## 在控制器中使用 Gate

授权检查通常在控制器中调用 `Gate` 来完成：

```go
package controllers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
)

type PostController struct {
	http.Controller
}

func (controller *PostController) Destroy(request contracts.HttpRequest, gate contracts.Gate) contracts.HttpResponse {
	postID := request.Input("id")

	if gate.Denies("delete-post", postID) {
		return http.Forbidden("You are not allowed to delete this post")
	}

	// 执行删除逻辑...

	return http.Json(map[string]any{
		"deleted": true,
	})
}
```

如果你更喜欢“失败即抛错”的写法，可以使用 `Authorize` 方法：

```go
func (controller *PostController) Update(request contracts.HttpRequest, gate contracts.Gate) contracts.HttpResponse {
	postID := request.Input("id")

	gate.Authorize("update-post", postID)

	// 授权通过，执行更新逻辑...

	return http.Json(map[string]any{
		"updated": true,
	})
}
```

## 在视图中进行授权判断

在模板中，可以通过注入的 `Gate` 或封装好的助手函数，控制某些按钮是否显示。一个简单思路是将当前用户的能力列表放入视图数据中：

```go
return http.View("post.show", map[string]any{
	"post":    post,
	"canEdit": gate.Allows("update-post", post.ID),
})
```

然后在模板中：

```html
{{ if .canEdit }}
<a href="/posts/{{ .post.ID }}/edit">Edit</a>
{{ end }}
```

## 基于模型的策略

对于复杂业务，可以按模型定义专门的策略对象，然后在注册阶段调用 `Policy` 方法，将模型类型与策略绑定。业务代码中只使用统一的能力名称，便于维护。

伪代码示例：

```go
type PostPolicy = contracts.Policy

var postPolicy = PostPolicy{
	"view": func(user contracts.Authorizable, data ...any) bool {
		// 检查是否可查看
		return true
	},
	"delete": func(user contracts.Authorizable, data ...any) bool {
		// 检查是否可删除
		return user.Can("admin")
	},
}

func RegisterPolicies(factory contracts.GateFactory) {
	factory.Policy(models.PostClass, postPolicy)
}
```

## 前后端协同的授权

- 后端 Gate / Policy 决定真正的权限边界
- 前端（视图或 SPA）仅做“界面级提示”，避免在前端实现关键授权逻辑

推荐做法：

- 所有安全关键操作都在服务端再次调用 Gate 检查
- 前端只根据接口返回的错误信息（如 403 Forbidden）做用户友好提示

## 最佳实践

- 将权限逻辑集中在策略或 Gate 定义中，避免在控制器里到处 `if role == "admin"` 的硬编码
- 区分“资源级权限”（能否访问这条记录）与“系统级权限”（能否访问某个模块）
- 所有修改类接口（POST/PUT/DELETE）必须通过授权检查

