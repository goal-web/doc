# AJAX 请求

## 简介

AJAX（Asynchronous JavaScript and XML）是一种在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。Goal-Web 框架提供了多种方式来处理 AJAX 请求，使您能够轻松地构建动态和交互式的 Web 应用程序。

## 基本概念

AJAX 请求通常使用 JavaScript 发送，并使用 JSON 格式进行数据交换。在 Goal-Web 中，您可以使用以下方式处理 AJAX 请求：

1. 在前端使用 JavaScript 库（如 jQuery、Axios 或 Fetch API）发送请求
2. 在后端使用控制器处理请求并返回 JSON 响应

## 在前端发送 AJAX 请求

### 使用 Fetch API

Fetch API 是现代浏览器提供的原生 API，用于发送 HTTP 请求。以下是使用 Fetch API 发送 AJAX 请求的示例：

```javascript
// GET 请求
fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // 处理数据
    })
    .catch(error => {
        console.error('Error:', error);
    });

// POST 请求
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // 处理数据
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 使用 Axios

Axios 是一个流行的 HTTP 客户端库，提供了更多功能和更好的浏览器兼容性。以下是使用 Axios 发送 AJAX 请求的示例：

1. 首先，安装 Axios：

```bash
npm install axios
```

2. 在 JavaScript 中使用 Axios：

```javascript
import axios from 'axios';

// 设置 CSRF 令牌
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// GET 请求
axios.get('/api/users')
    .then(response => {
        console.log(response.data);
        // 处理数据
    })
    .catch(error => {
        console.error('Error:', error);
    });

// POST 请求
axios.post('/api/users', {
    name: 'John Doe',
    email: 'john@example.com'
})
    .then(response => {
        console.log(response.data);
        // 处理数据
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 使用 jQuery

虽然现代 Web 开发越来越少使用 jQuery，但它仍然是一个流行的库，特别是在旧项目中。以下是使用 jQuery 发送 AJAX 请求的示例：

```javascript
// 设置 CSRF 令牌
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// GET 请求
$.ajax({
    url: '/api/users',
    type: 'GET',
    success: function(data) {
        console.log(data);
        // 处理数据
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});

// POST 请求
$.ajax({
    url: '/api/users',
    type: 'POST',
    data: {
        name: 'John Doe',
        email: 'john@example.com'
    },
    success: function(data) {
        console.log(data);
        // 处理数据
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});
```

## 在后端处理 AJAX 请求

### 创建 API 控制器

在 Goal-Web 中，您可以创建专门处理 API 请求的控制器。以下是一个示例：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
)

type UserController struct {
    // 依赖注入
}

// 获取用户列表
func (controller *UserController) Index() contracts.HttpResponse {
    // 获取用户数据
    users := []map[string]interface{}{
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
    }
    
    // 返回 JSON 响应
    return http.Json(users)
}

// 创建新用户
func (controller *UserController) Store(request contracts.HttpRequest) contracts.HttpResponse {
    // 验证请求数据
    validator := request.Validate(map[string]string{
        "name":  "required|string|max:255",
        "email": "required|email|max:255",
    })
    
    if validator.Fails() {
        return http.Json(validator.Errors()).WithStatus(422)
    }
    
    // 创建用户
    user := map[string]interface{}{
        "id":    3,
        "name":  request.Input("name"),
        "email": request.Input("email"),
    }
    
    // 返回 JSON 响应
    return http.Json(user).WithStatus(201)
}

// 获取单个用户
func (controller *UserController) Show(id int) contracts.HttpResponse {
    // 获取用户数据
    user := map[string]interface{}{
        "id":    id,
        "name":  "John Doe",
        "email": "john@example.com",
    }
    
    // 返回 JSON 响应
    return http.Json(user)
}

// 更新用户
func (controller *UserController) Update(request contracts.HttpRequest, id int) contracts.HttpResponse {
    // 验证请求数据
    validator := request.Validate(map[string]string{
        "name":  "required|string|max:255",
        "email": "required|email|max:255",
    })
    
    if validator.Fails() {
        return http.Json(validator.Errors()).WithStatus(422)
    }
    
    // 更新用户
    user := map[string]interface{}{
        "id":    id,
        "name":  request.Input("name"),
        "email": request.Input("email"),
    }
    
    // 返回 JSON 响应
    return http.Json(user)
}

// 删除用户
func (controller *UserController) Destroy(id int) contracts.HttpResponse {
    // 删除用户
    
    // 返回空响应
    return http.Json(nil).WithStatus(204)
}
```

### 注册 API 路由

在 `routes/api.go` 文件中，您可以注册 API 路由：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
    "your-app/app/controllers"
)

func Api(route contracts.Route) {
    // API 路由组
    route.Group("/api", func(route contracts.Route) {
        // 用户资源路由
        route.Resource("/users", controllers.UserController{})
        
        // 其他 API 路由
    })
}
```

## 处理 AJAX 响应

### JSON 响应

在 Goal-Web 中，您可以使用 `http.Json()` 函数返回 JSON 响应：

```go
func (controller *UserController) Index() contracts.HttpResponse {
    data := map[string]interface{}{
        "users": []map[string]interface{}{
            {"id": 1, "name": "John Doe"},
            {"id": 2, "name": "Jane Smith"},
        },
        "total": 2,
    }
    
    return http.Json(data)
}
```

### 自定义响应

您可以使用 `WithStatus`、`WithHeader` 等方法自定义响应：

```go
func (controller *UserController) Store(request contracts.HttpRequest) contracts.HttpResponse {
    // 创建用户
    user := map[string]interface{}{
        "id":   3,
        "name": request.Input("name"),
    }
    
    return http.Json(user).
        WithStatus(201).
        WithHeader("X-Created-At", time.Now().String())
}
```

### 错误响应

对于错误响应，您可以使用便捷的错误响应方法：

```go
func (controller *UserController) Show(id int) contracts.HttpResponse {
    // 查找用户
    user := findUser(id)
    
    if user == nil {
        return http.NotFound("User not found")
    }
    
    return http.Json(user)
}
```

您也可以使用其他便捷的错误响应方法：

```go
// 400 Bad Request
return http.BadRequest("Invalid user data")

// 401 Unauthorized
return http.Unauthorized("Authentication required")

// 403 Forbidden
return http.Forbidden("Access denied")

// 500 Internal Server Error
return http.InternalServerError("Database connection failed")

// 通用错误响应
return http.Error("Something went wrong", 422)
```

所有错误响应都会返回标准的 JSON 格式：

```json
{
    "error": "错误消息",
    "code": 状态码
}
```

## CSRF 保护

为了防止跨站请求伪造（CSRF）攻击，Goal-Web 提供了 CSRF 保护中间件。您需要在非 GET 请求中包含 CSRF 令牌。

### 在 HTML 中包含 CSRF 令牌

```html
<meta name="csrf-token" content="{{ csrf_token }}">
```

### 在 JavaScript 中设置 CSRF 令牌

```javascript
// Axios
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Fetch API
const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

// jQuery
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

## 处理文件上传

### 在前端发送文件

使用 FormData 对象发送文件：

```javascript
// 使用 Fetch API
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('avatar', document.querySelector('#avatar').files[0]);

fetch('/api/users', {
    method: 'POST',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: formData
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// 使用 Axios
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('avatar', document.querySelector('#avatar').files[0]);

axios.post('/api/users', formData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 在后端处理文件

```go
func (controller *UserController) Store(request contracts.HttpRequest) contracts.HttpResponse {
    // 验证请求数据
    validator := request.Validate(map[string]string{
        "name":   "required|string|max:255",
        "avatar": "required|file|mimes:jpeg,png,jpg|max:2048", // 最大 2MB
    })
    
    if validator.Fails() {
        return http.Json(validator.Errors()).WithStatus(422)
    }
    
    // 获取上传的文件
    avatar := request.File("avatar")
    
    // 存储文件
    path, err := avatar.Store("public/avatars")
    if err != nil {
        return http.Json(map[string]string{
            "error": "Failed to upload file",
        }).WithStatus(500)
    }
    
    // 创建用户
    user := map[string]interface{}{
        "id":     3,
        "name":   request.Input("name"),
        "avatar": path,
    }
    
    // 返回 JSON 响应
    return http.Json(user).WithStatus(201)
}
```

## 处理 AJAX 分页

### 在后端实现分页

```go
func (controller *UserController) Index(request contracts.HttpRequest) contracts.HttpResponse {
    // 获取分页参数
    page := request.IntInput("page", 1)
    perPage := request.IntInput("per_page", 10)
    
    // 计算偏移量
    offset := (page - 1) * perPage
    
    // 获取用户数据（示例）
    users := []map[string]interface{}{
        {"id": 1, "name": "John Doe"},
        {"id": 2, "name": "Jane Smith"},
        // ...
    }
    
    // 获取总数
    total := 100
    
    // 返回分页数据
    return http.Json(map[string]interface{}{
        "data":        users,
        "current_page": page,
        "per_page":    perPage,
        "total":       total,
        "last_page":   (total + perPage - 1) / perPage,
    })
}
```

### 在前端处理分页

```javascript
function fetchUsers(page = 1) {
    axios.get(`/api/users?page=${page}&per_page=10`)
        .then(response => {
            const { data, current_page, per_page, total, last_page } = response.data;
            
            // 显示用户数据
            const userList = document.querySelector('#user-list');
            userList.innerHTML = '';
            
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                userList.appendChild(li);
            });
            
            // 更新分页控件
            updatePagination(current_page, last_page);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updatePagination(currentPage, lastPage) {
    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';
    
    // 上一页按钮
    const prevButton = document.createElement('button');
    prevButton.textContent = '上一页';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => fetchUsers(currentPage - 1));
    pagination.appendChild(prevButton);
    
    // 页码按钮
    for (let i = 1; i <= lastPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.addEventListener('click', () => fetchUsers(i));
        pagination.appendChild(pageButton);
    }
    
    // 下一页按钮
    const nextButton = document.createElement('button');
    nextButton.textContent = '下一页';
    nextButton.disabled = currentPage === lastPage;
    nextButton.addEventListener('click', () => fetchUsers(currentPage + 1));
    pagination.appendChild(nextButton);
}

// 初始加载
fetchUsers();
```

## 实时搜索

### 在前端实现实时搜索

```javascript
const searchInput = document.querySelector('#search');
let debounceTimeout;

searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    
    debounceTimeout = setTimeout(() => {
        const query = this.value;
        searchUsers(query);
    }, 300); // 300ms 防抖
});

function searchUsers(query) {
    axios.get(`/api/users/search?q=${encodeURIComponent(query)}`)
        .then(response => {
            const users = response.data;
            
            // 显示搜索结果
            const userList = document.querySelector('#user-list');
            userList.innerHTML = '';
            
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
```

### 在后端处理搜索请求

```go
func (controller *UserController) Search(request contracts.HttpRequest) contracts.HttpResponse {
    // 获取搜索查询
    query := request.Input("q", "")
    
    // 搜索用户（示例）
    users := []map[string]interface{}{
        {"id": 1, "name": "John Doe"},
        {"id": 2, "name": "Jane Smith"},
        // 根据查询过滤的结果
    }
    
    // 返回搜索结果
    return http.Json(users)
}
```

## 处理 AJAX 表单提交

### 在前端提交表单

```javascript
const form = document.querySelector('#user-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    axios.post('/api/users', formData)
        .then(response => {
            console.log('User created:', response.data);
            // 显示成功消息
            showMessage('User created successfully!', 'success');
            // 重置表单
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            
            if (error.response && error.response.status === 422) {
                // 显示验证错误
                const errors = error.response.data;
                showValidationErrors(errors);
            } else {
                // 显示一般错误
                showMessage('An error occurred. Please try again.', 'error');
            }
        });
});

function showMessage(message, type) {
    const messageElement = document.querySelector('#message');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    
    // 5 秒后隐藏消息
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

function showValidationErrors(errors) {
    // 清除之前的错误
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // 显示新的错误
    for (const field in errors) {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errors[field][0];
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }
}
```

## 最佳实践

### 使用 API 资源

为了保持代码的一致性和可维护性，您可以创建 API 资源类来格式化 JSON 响应：

```go
package resources

type UserResource struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func NewUserResource(user map[string]interface{}) UserResource {
    return UserResource{
        ID:    user["id"].(int),
        Name:  user["name"].(string),
        Email: user["email"].(string),
    }
}

func NewUserResourceCollection(users []map[string]interface{}) []UserResource {
    resources := make([]UserResource, len(users))
    
    for i, user := range users {
        resources[i] = NewUserResource(user)
    }
    
    return resources
}
```

然后在控制器中使用这些资源：

```go
func (controller *UserController) Index() contracts.HttpResponse {
    // 获取用户数据
    users := []map[string]interface{}{
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
    }
    
    // 使用资源格式化响应
    return http.Json(resources.NewUserResourceCollection(users))
}
```

### 使用 API 版本控制

随着 API 的发展，您可能需要引入新版本而不破坏现有客户端。您可以使用路由前缀来实现 API 版本控制：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "your-app/app/controllers/api/v1"
    "your-app/app/controllers/api/v2"
)

func Api(route contracts.Route) {
    // API v1
    route.Group("/api/v1", func(route contracts.Route) {
        route.Resource("/users", v1.UserController{})
    })
    
    // API v2
    route.Group("/api/v2", func(route contracts.Route) {
        route.Resource("/users", v2.UserController{})
    })
}
```

### 使用 API 文档

为了帮助前端开发人员理解和使用您的 API，您应该提供 API 文档。您可以使用工具如 Swagger 来生成 API 文档。

## 安全性考虑

### CORS（跨源资源共享）

如果您的 API 需要被不同域的客户端访问，您需要配置 CORS。Goal-Web 提供了 CORS 中间件：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http/middleware"
)

func Api(route contracts.Route) {
    // API 路由组
    route.Group("/api", func(route contracts.Route) {
        // 应用 CORS 中间件
        route.Use(middleware.Cors(middleware.CorsOptions{
            AllowOrigins:     []string{"https://example.com"},
            AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
            AllowHeaders:     []string{"Content-Type", "X-CSRF-TOKEN", "X-Requested-With"},
            AllowCredentials: true,
            MaxAge:           86400,
        }))
        
        // 用户资源路由
        route.Resource("/users", controllers.UserController{})
    })
}
```

### 速率限制

为了防止 API 滥用，您可以实现速率限制：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http/middleware"
)

func Api(route contracts.Route) {
    // API 路由组
    route.Group("/api", func(route contracts.Route) {
        // 应用速率限制中间件
        route.Use(middleware.Throttle(60, 1)) // 每分钟 60 个请求
        
        // 用户资源路由
        route.Resource("/users", controllers.UserController{})
    })
}
```

## 下一步

现在您已经了解了如何在 Goal-Web 中处理 AJAX 请求，您可以继续阅读以下文档：

- [WebSocket](websockets.md)
- [前端模板](templates.md)
- [前端资源](assets.md)
