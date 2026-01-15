# 验证

## 简介

Goal-Web 提供了多种方法来验证传入的应用程序数据。默认情况下，Goal-Web 的基础控制器类使用了一个 `ValidatesRequests` 特性，它提供了一种便捷的方法来验证 HTTP 请求，并使用各种强大的验证规则。

## 验证快速入门

为了了解 Goal-Web 强大的验证功能，让我们看一个验证表单并向用户显示错误消息的完整示例。

### 定义路由

首先，假设我们有以下路由定义：

```go
route.Get("/post/create", controller.Action("PostController@create"))
route.Post("/post", controller.Action("PostController@store"))
```

### 创建控制器

接下来，让我们看一下处理新博客文章的控制器：

```go
package controllers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/http"
	"github.com/goal-web/validation"
)

type PostController struct {
	http.Controller
}

func (controller *PostController) Create() contracts.HttpResponse {
	return http.View("post.create")
}

func (controller *PostController) Store(request contracts.HttpRequest) contracts.HttpResponse {
	validation.Verify(request, contracts.Fields{
		"title": "required|max:255",
		"body":  "required",
	})

	// 存储博客文章...

	return http.Redirect("/posts")
}
```

在这个例子中，我们使用 `validation.Verify` 函数来验证传入的 HTTP 请求。验证规则被定义为一个映射，其中键是要验证的字段，值是应用于该字段的规则字符串。如果验证失败，将抛出验证异常，由全局异常处理器统一处理。

### 显示验证错误

当验证失败时，Goal-Web 会自动将错误消息闪存到会话，以便它们在下一个请求中可用。在您的视图中，您可以使用 `errors` 变量来访问这些错误消息：

```html
<!-- resources/views/post/create.html -->
<form method="POST" action="/post">
    <div>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" value="{{ .old.title }}">
        {{ if .errors.has "title" }}
            <div class="alert alert-danger">{{ .errors.first "title" }}</div>
        {{ end }}
    </div>

    <div>
        <label for="body">Body</label>
        <textarea id="body" name="body">{{ .old.body }}</textarea>
        {{ if .errors.has "body" }}
            <div class="alert alert-danger">{{ .errors.first "body" }}</div>
        {{ end }}
    </div>

    <div>
        <button type="submit">Create</button>
    </div>
</form>
```

在这个例子中，我们使用 `errors.has` 方法来检查是否存在特定字段的错误消息，并使用 `errors.first` 方法来显示该字段的第一个错误消息。

我们还使用 `old` 变量来保留表单的旧输入，这样用户就不必重新输入所有内容。

## 可用的验证规则

Goal-Web 提供了多种验证规则，您可以在验证数据时使用。以下是一些最常用的规则：

### 基本规则

- `required`: 字段必须存在且不为空
- `required_if:field,value`: 如果指定的其他字段等于指定的值，则该字段是必需的
- `required_unless:field,value`: 除非指定的其他字段等于指定的值，否则该字段是必需的
- `required_with:foo,bar,...`: 如果指定的任何其他字段存在，则该字段是必需的
- `required_with_all:foo,bar,...`: 如果所有指定的其他字段都存在，则该字段是必需的
- `required_without:foo,bar,...`: 如果指定的任何其他字段不存在，则该字段是必需的
- `required_without_all:foo,bar,...`: 如果所有指定的其他字段都不存在，则该字段是必需的

### 字符串规则

- `alpha`: 字段必须完全是字母字符
- `alpha_dash`: 字段可以包含字母、数字、破折号和下划线
- `alpha_num`: 字段必须完全是字母数字字符
- `email`: 字段必须格式化为电子邮件地址
- `max:value`: 字段的最大长度为 value
- `min:value`: 字段的最小长度为 value
- `size:value`: 字段的长度必须为 value
- `starts_with:foo,bar,...`: 字段必须以给定值之一开头
- `ends_with:foo,bar,...`: 字段必须以给定值之一结尾
- `url`: 字段必须格式化为 URL

### 数字规则

- `numeric`: 字段必须是数字
- `integer`: 字段必须是整数
- `digits:value`: 字段必须是数字，且长度为 value
- `digits_between:min,max`: 字段必须是数字，且长度在 min 和 max 之间
- `between:min,max`: 字段的值必须在 min 和 max 之间
- `gt:field`: 字段的值必须大于给定字段的值
- `gte:field`: 字段的值必须大于或等于给定字段的值
- `lt:field`: 字段的值必须小于给定字段的值
- `lte:field`: 字段的值必须小于或等于给定字段的值

### 日期规则

- `date`: 字段必须是有效的日期
- `date_equals:date`: 字段必须等于给定的日期
- `date_format:format`: 字段必须匹配给定的格式
- `after:date`: 字段必须是给定日期之后的值
- `after_or_equal:date`: 字段必须是给定日期之后或等于的值
- `before:date`: 字段必须是给定日期之前的值
- `before_or_equal:date`: 字段必须是给定日期之前或等于的值

### 数组规则

- `array`: 字段必须是数组
- `distinct`: 数组中的值必须是唯一的

### 其他规则

- `accepted`: 字段必须是 "yes"、"on"、1 或 true
- `boolean`: 字段必须能够转换为布尔值
- `confirmed`: 字段必须有一个匹配的 field_confirmation 字段
- `different:field`: 字段的值必须与给定字段的值不同
- `same:field`: 字段的值必须与给定字段的值相同
- `in:foo,bar,...`: 字段必须包含在给定的值列表中
- `not_in:foo,bar,...`: 字段不能包含在给定的值列表中
- `exists:table,column`: 字段的值必须存在于数据库表的列中
- `unique:table,column,except,idColumn`: 字段的值在数据库表的列中必须是唯一的

## 条件验证规则

有时，您可能希望仅在另一个字段具有给定值时才验证字段。例如，只有当 "payment_type" 字段的值为 "credit_card" 时，您才需要验证 "card_number" 字段。在这种情况下，您可以使用条件验证规则：

```go
errs := validation.Valid(request, contracts.Fields{
	"payment_type": "required|in:credit_card,paypal",
	"card_number":  "required_if:payment_type,credit_card",
})

if len(errs) > 0 {
	return http.RedirectBack().WithErrors(errs)
}
```

## 验证数组

验证表单输入中的数组字段不必是一项困难的任务。您可以使用 "点符号" 来验证数组中的属性：

```go
errs := validation.Valid(request, contracts.Fields{
	"photos.*.id":    "required|integer",
	"photos.*.title": "required|string|max:255",
})

if len(errs) > 0 {
	return http.RedirectBack().WithErrors(errs)
}
```

## 创建自定义验证规则

### 使用闭包

最简单的方法是使用闭包来创建自定义验证规则。在服务提供者的 `Start` 方法中，您可以通过 `validation.Validator`（底层为 go-playground/validator）来注册自定义验证器：

```go
package providers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/validation"
    "strings"
)

type AppServiceProvider struct {
	// ...
}

func (provider *AppServiceProvider) Register(app contracts.Application) {
}

func (provider *AppServiceProvider) Start() error {
	validation.Validator.RegisterValidation("uppercase", func(fl validator.FieldLevel) bool {
		str := fl.Field().String()
		return str == strings.ToUpper(str)
	})

	return nil
}
```

## 手动使用验证器

如果您不想使用 `validation.Verify` 方法，也可以直接调用底层的 `validation.Validator` 来手动验证数据：

```go
func (controller *PostController) Store(request contracts.HttpRequest) contracts.HttpResponse {
	errs := validation.Validator.ValidateMap(request.ToFields(), contracts.Fields{
		"title": "required|max:255",
		"body":  "required",
	})

	if len(errs) > 0 {
		return http.RedirectBack().WithErrors(errs)
	}

	// 存储博客文章...

	return http.Redirect("/posts")
}
```

## 下一步

现在您已经了解了 Goal-Web 的验证基础，您可以继续阅读以下文档：

- [错误处理](errors.md)
- [日志](logging.md)
- [前端开发](../frontend/templates.md)
