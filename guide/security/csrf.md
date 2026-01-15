# CSRF 防护

## 简介

跨站请求伪造（CSRF）是 Web 应用中最常见的攻击方式之一。Goal-Web 通过中间件与前端约定提供内置的 CSRF 防护能力。

核心思路：

- 后端为每个会话生成 CSRF Token，并通过视图或接口下发给前端
- 前端在非 GET 请求中自动携带 CSRF Token（Header 或表单字段）
- 中间件在处理请求前验证 Token 是否匹配

## 启用 CSRF 中间件

在 HTTP 服务提供者或路由配置中，将 CSRF 中间件加入全局中间件链，通常仅对 Web 路由启用：

```go
router.Use(
	middleware.Session,
	middleware.Csrf(),
	middleware.Auth(),
)
```

对于纯 API（如使用 Token / JWT 认证的接口），一般通过其他方式防止 CSRF（例如只接受带认证 Header 的请求，且不依赖浏览器自动附带 Cookie），可以不启用 CSRF 中间件。

## 在 HTML 中注入 CSRF Token

典型做法是在布局模板中输出一个 `<meta>` 标签供前端脚本读取：

```html
<head>
    <meta name="csrf-token" content="{{ csrf_token }}">
</head>
```

其中 `csrf_token` 可以通过视图共享变量或模板函数提供。例如在某个服务提供者中：

```go
func (provider *AppServiceProvider) Start() error {
	// 伪代码：从当前请求或会话中获取 CSRF Token 注入视图
	provider.app.Call(func(views contracts.Views) {
		views.Share("csrf_token", func(request contracts.HttpRequest) string {
			return request.CsrfToken()
		})
	})

	return nil
}
```

实际项目中，你也可以根据自己的模板引擎封装为 `{{ csrf_field }}`、`{{ csrf_token }}` 等助手。

## 在前端自动携带 CSRF Token

### Axios 示例

```javascript
import axios from 'axios';

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
```

之后的所有 Axios 请求会自动携带 `X-CSRF-TOKEN` Header。

### Fetch 示例

```javascript
const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

fetch('/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': token,
  },
  body: JSON.stringify({ title: 'Hello', body: 'World' }),
});
```

### jQuery 示例

```javascript
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
  },
});
```

## 常见问题

### 1. CSRF 校验失败

检查以下几项：

- Token 是否正确注入到页面（浏览器查看源码确认）
- JavaScript 是否正确从 `<meta>` 标签读取 Token
- 请求是否携带了 `X-CSRF-TOKEN` 或约定的表单字段
- 是否对跨域请求启用了 CORS 且同时使用了 Cookie

### 2. API 与 CSRF

对于纯 API（移动端、第三方集成）通常不依赖 Cookie，而是通过 `Authorization` Header 携带 Token，这类接口体现为跨域资源访问风险更小，一般不启用 CSRF 中间件，而是：

- 使用 HTTPS 保护 Token 传输
- 设置合理的 Token 过期策略与刷新机制
- 对敏感操作使用多因素校验（如短信验证码）

## 最佳实践

- 为基于 Cookie 会话的 Web 路由启用 CSRF 中间件
- 所有非 GET/HEAD 请求都必须携带 CSRF Token
- 避免在公共缓存中暴露包含 Token 的页面
- 配合 CORS 和 SameSite Cookie 属性进一步减少 CSRF 攻击面

