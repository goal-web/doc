# 前端模板

## 简介

Goal-Web 框架提供了一个强大的模板系统，使您能够轻松地创建动态的 HTML 页面。默认情况下，Goal-Web 使用 Go 的内置 `html/template` 包来渲染视图，但它也支持其他模板引擎的集成。

## 模板基础

### 模板位置

默认情况下，所有的模板文件都应该存储在 `resources/views` 目录中。您可以使用子目录来组织您的模板，并使用点符号来引用它们。例如，存储在 `resources/views/admin/dashboard.html` 的模板可以通过 `admin.dashboard` 来引用。

### 基本用法

在控制器中，您可以使用 `http.View` 函数来渲染模板：

```go
func (controller *HomeController) Index() contracts.HttpResponse {
	return http.View("home", map[string]interface{}{
		"title": "Welcome to Goal-Web",
		"user":  currentUser,
	})
}
```

在这个例子中，`home` 是模板的名称，第二个参数是要传递给模板的数据。

### 模板语法

Goal-Web 使用 Go 的 `html/template` 包的语法。以下是一些基本的模板语法示例：

#### 显示变量

```html
<h1>&#123;&#123; .title }}</h1>
<p>Welcome, &#123;&#123; .user.Name }}!</p>
```

#### 条件语句

```html
&#123;&#123; if .user }}
    <p>Welcome, &#123;&#123; .user.Name }}!</p>
&#123;&#123; else }}
    <p>Welcome, Guest!</p>
&#123;&#123; end }}
```

#### 循环

```html
<ul>
    &#123;&#123; range .users }}
        <li>&#123;&#123; .Name }}</li>
    &#123;&#123; end }}
</ul>
```

#### 包含其他模板

```html
&#123;&#123; template "header" . }}
<div class="content">
    <!-- 页面内容 -->
</div>
&#123;&#123; template "footer" . }}
```

## 布局和组件

### 定义布局

Goal-Web 允许您定义可重用的布局模板。布局通常包含页面的公共部分，如页眉、页脚和导航菜单。

```html
<!-- resources/views/layouts/app.html -->
<!DOCTYPE html>
<html>
<head>
    <title>&#123;&#123; .title }} - Goal-Web</title>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <header>
        <!-- 页眉内容 -->
    </header>
    
    <div class="container">
        &#123;&#123; template "content" . }}
    </div>
    
    <footer>
        <!-- 页脚内容 -->
    </footer>
    
    <script src="/js/app.js"></script>
</body>
</html>
```

### 使用布局

要使用布局，您需要在页面模板中定义一个名为 "content" 的块，然后包含布局模板：

```html
<!-- resources/views/home.html -->
&#123;&#123; define "content" }}
    <h1>Welcome to Goal-Web</h1>
    <p>This is the home page.</p>
&#123;&#123; end }}

&#123;&#123; template "layouts/app" . }}
```

### 组件

组件是可重用的模板片段，可以在多个页面中使用。您可以将组件存储在 `resources/views/components` 目录中：

```html
<!-- resources/views/components/alert.html -->
<div class="alert alert-&#123;&#123; .type }}">
    &#123;&#123; .message }}
</div>
```

然后，在您的页面中使用它：

```html
&#123;&#123; template "components/alert" dict "type" "success" "message" "操作成功！" }}
```

## 模板函数

Goal-Web 提供了一些内置的模板函数，您可以在模板中使用它们：

### 基本函数

- `url`: 生成 URL
- `route`: 生成命名路由的 URL
- `asset`: 生成资源 URL
- `csrf_field`: 生成 CSRF 令牌字段
- `method_field`: 生成方法伪造字段

```html
<form action="&#123;&#123; url "/posts" }}" method="POST">
    &#123;&#123; csrf_field }}
    &#123;&#123; method_field "PUT" }}
    <!-- 表单字段 -->
</form>
```

### 字符串函数

- `upper`: 将字符串转换为大写
- `lower`: 将字符串转换为小写
- `title`: 将字符串转换为标题格式
- `trim`: 修剪字符串的空白

```html
<h1>&#123;&#123; upper .title }}</h1>
```

### 日期函数

- `now`: 获取当前时间
- `format_time`: 格式化时间

```html
<p>当前时间：&#123;&#123; format_time (now) "2006-01-02 15:04:05" }}</p>
```

### 数组和映射函数

- `len`: 获取数组或映射的长度
- `index`: 获取数组的元素
- `dict`: 创建一个映射

```html
<p>用户数量：&#123;&#123; len .users }}</p>
```

## 自定义模板函数

您可以在服务提供者中注册自定义模板函数：

```go
package providers

import (
	"github.com/goal-web/contracts"
	"strings"
	"time"
)

type ViewServiceProvider struct {
	app contracts.Application
}

func (provider *ViewServiceProvider) Register(app contracts.Application) {
	provider.app = app
}

func (provider *ViewServiceProvider) Start() error {
	provider.app.Call(func(views contracts.Views) {
		// 注册自定义函数
		views.AddFunc("slug", func(s string) string {
			return strings.ReplaceAll(strings.ToLower(s), " ", "-")
		})

		views.AddFunc("time_ago", func(t time.Time) string {
			// 实现时间前的逻辑
			return "刚刚"
		})
	})

	return nil
}

func (provider *ViewServiceProvider) Stop() {}
```

然后，在您的模板中使用它们：

```html
<a href="/posts/&#123;&#123; slug .title }}">&#123;&#123; .title }}</a>
<p>发布于 &#123;&#123; time_ago .created_at }}</p>
```

## 前端资源

### 资源位置

前端资源（如 CSS、JavaScript 和图像）应该存储在 `public` 目录中。这个目录是公开可访问的，您可以通过 Web 服务器直接访问这些文件。

### 资源编译

Goal-Web 不提供内置的资源编译工具，但您可以使用流行的前端工具，如 Webpack、Gulp 或 Vite，来编译和优化您的资源。

例如，您可以创建一个 `webpack.config.js` 文件来配置 Webpack：

```javascript
const path = require('path');

module.exports = {
    entry: './resources/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
```

然后，在 `package.json` 中添加构建脚本：

```json
{
    "scripts": {
        "dev": "webpack --mode development",
        "build": "webpack --mode production"
    }
}
```

### 使用资源

在模板中，您可以使用 `asset` 函数来生成资源 URL：

```html
<link rel="stylesheet" href="&#123;&#123; asset "/css/app.css" }}">
<script src="&#123;&#123; asset "/js/app.js" }}"></script>
```

## 前端框架集成

Goal-Web 可以与流行的前端框架（如 Vue.js、React 或 Angular）集成。

### Vue.js 集成

要集成 Vue.js，您可以在 HTML 模板中包含 Vue.js 库，并定义 Vue 组件：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Goal-Web + Vue.js</title>
</head>
<body>
    <div id="app">
        <h1>&#123;&#123; .title }}</h1>
        <p>&#123;&#123; message }}</p>
        <button @click="sayHello">Say Hello</button>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Welcome to Goal-Web + Vue.js!'
            },
            methods: {
                sayHello: function() {
                    alert('Hello, Vue.js!');
                }
            }
        });
    </script>
</body>
</html>
```

### React 集成

要集成 React，您可以使用类似的方法，但需要包含 React 和 ReactDOM 库：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Goal-Web + React</title>
</head>
<body>
    <div id="root"></div>
    
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    
    <script type="text/babel">
        function App() {
            const [message, setMessage] = React.useState('Welcome to Goal-Web + React!');
            
            function sayHello() {
                alert('Hello, React!');
            }
            
            return (
                <div>
                    <h1>&#123;&#123; .title }}</h1>
                    <p>{message}</p>
                    <button onClick={sayHello}>Say Hello</button>
                </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
```

## 最佳实践

### 模板组织

- 使用子目录来组织模板，如 `layouts`、`components`、`pages` 等
- 使用一致的命名约定，如 `kebab-case` 或 `snake_case`
- 将可重用的代码提取到组件或布局中

### 性能优化

- 在生产环境中缓存模板
- 最小化和压缩前端资源
- 使用 CDN 来提供静态资源
- 实现适当的缓存策略

### 安全性

- 始终使用 `&#123;&#123; . }}` 语法来自动转义输出，以防止 XSS 攻击
- 在表单中包含 CSRF 令牌
- 验证和清理用户输入

## 下一步

现在您已经了解了 Goal-Web 的前端模板基础，您可以继续阅读以下文档：

- [前端资源](assets.md)
- [AJAX 请求](ajax.md)
- [WebSocket](websockets.md)
