# 模型和 ORM

## 简介

Goal-Web 框架提供了一个简单而强大的 ORM（对象关系映射），允许您以面向对象的方式与数据库交互。ORM 使您能够使用 Go 结构体表示数据库表，并提供了一种优雅的方式来查询和操作数据库记录。

## 定义模型

### 基本模型结构

模型通常是一个表示数据库表的 Go 结构体。以下是一个基本的用户模型示例：

```go
package models

import (
    "github.com/goal-web/database/table"
    "time"
)

type User struct {
    ID        uint      `db:"id"`
    Name      string    `db:"name"`
    Email     string    `db:"email"`
    Password  string    `db:"password"`
    Active    bool      `db:"active"`
    CreatedAt time.Time `db:"created_at"`
    UpdatedAt time.Time `db:"updated_at"`
}

// TableName 返回表名
func (user User) TableName() string {
    return "users"
}

// Fields 返回字段映射
func (user User) Fields() map[string]interface{} {
    return map[string]interface{}{
        "id":         user.ID,
        "name":       user.Name,
        "email":      user.Email,
        "password":   user.Password,
        "active":     user.Active,
        "created_at": user.CreatedAt,
        "updated_at": user.UpdatedAt,
    }
}

// New 创建一个新的用户模型实例
func (user User) New(fields map[string]interface{}) interface{} {
    return User{
        ID:        fields["id"].(uint),
        Name:      fields["name"].(string),
        Email:     fields["email"].(string),
        Password:  fields["password"].(string),
        Active:    fields["active"].(bool),
        CreatedAt: fields["created_at"].(time.Time),
        UpdatedAt: fields["updated_at"].(time.Time),
    }
}
```

### 使用 Table 结构体

为了简化模型定义，Goal-Web 提供了 `table.Table` 结构体，您可以嵌入到您的模型中：

```go
package models

import (
    "github.com/goal-web/database/table"
    "time"
)

type User struct {
    table.Table `db:"users"` // 嵌入 Table 结构体并指定表名
    
    ID        uint      `db:"id"`
    Name      string    `db:"name"`
    Email     string    `db:"email"`
    Password  string    `db:"password"`
    Active    bool      `db:"active"`
    CreatedAt time.Time `db:"created_at"`
    UpdatedAt time.Time `db:"updated_at"`
}
```

### 表名约定

默认情况下，表名是模型名称的复数形式。例如，`User` 模型对应 `users` 表。您可以通过实现 `TableName` 方法来自定义表名：

```go
func (user User) TableName() string {
    return "custom_users"
}
```

或者使用 `db` 标签指定表名：

```go
type User struct {
    table.Table `db:"custom_users"`
    // 字段...
}
```

### 主键

默认情况下，主键名为 `id`。您可以通过实现 `PrimaryKey` 方法来自定义主键：

```go
func (user User) PrimaryKey() string {
    return "user_id"
}
```

### 时间戳

模型通常包含 `created_at` 和 `updated_at` 时间戳字段，用于自动记录创建和更新时间。您可以在模型中定义这些字段：

```go
type User struct {
    // 其他字段...
    CreatedAt time.Time `db:"created_at"`
    UpdatedAt time.Time `db:"updated_at"`
}
```

## 模型操作

### 检索模型

您可以使用 `Find` 方法通过主键检索模型：

```go
user := models.User{}

// 通过主键查找用户
found, err := db.Model(&user).Find(1)
if err != nil {
    // 处理错误
}

if found {
    fmt.Println("找到用户:", user.Name)
} else {
    fmt.Println("用户不存在")
}
```

### 检索所有模型

您可以使用 `Get` 方法检索所有记录：

```go
var users []models.User

// 检索所有用户
err := db.Model(&models.User{}).Get(&users)
if err != nil {
    // 处理错误
}

for _, user := range users {
    fmt.Println(user.Name)
}
```

### 条件查询

您可以使用查询构建器方法添加条件：

```go
var activeUsers []models.User

// 查询活跃用户
err := db.Model(&models.User{}).Where("active", true).Get(&activeUsers)
if err != nil {
    // 处理错误
}

// 使用多个条件
var adminUsers []models.User
err = db.Model(&models.User{}).Where("active", true).Where("role", "admin").Get(&adminUsers)
```

### 排序和限制

您可以使用 `OrderBy`、`Limit` 和 `Offset` 方法：

```go
var recentUsers []models.User

// 获取最近注册的 10 个用户
err := db.Model(&models.User{}).OrderBy("created_at", "desc").Limit(10).Get(&recentUsers)

// 分页
var users []models.User
err = db.Model(&models.User{}).OrderBy("id").Limit(10).Offset(20).Get(&users)
```

### 创建模型

您可以使用 `Create` 方法创建新记录：

```go
user := models.User{
    Name:     "John Doe",
    Email:    "john@example.com",
    Password: "secret",
    Active:   true,
}

// 创建用户
id, err := db.Model(&user).Create()
if err != nil {
    // 处理错误
}

fmt.Println("创建的用户 ID:", id)
```

### 更新模型

您可以使用 `Update` 方法更新记录：

```go
// 先检索用户
user := models.User{}
found, err := db.Model(&user).Find(1)
if err != nil || !found {
    // 处理错误或用户不存在
    return
}

// 修改字段
user.Name = "Jane Smith"
user.Active = false

// 更新用户
affected, err := db.Model(&user).Update()
if err != nil {
    // 处理错误
}

fmt.Println("受影响的行数:", affected)
```

您也可以只更新特定字段：

```go
// 只更新 name 和 active 字段
affected, err := db.Model(&user).Update(map[string]interface{}{
    "name":   "Jane Smith",
    "active": false,
})
```

### 删除模型

您可以使用 `Delete` 方法删除记录：

```go
// 通过主键删除
affected, err := db.Model(&models.User{}).Delete(1)

// 或者删除已检索的模型
user := models.User{}
found, err := db.Model(&user).Find(1)
if err != nil || !found {
    // 处理错误或用户不存在
    return
}

affected, err := db.Model(&user).Delete()
```

### 批量删除

您可以使用条件删除多条记录：

```go
// 删除所有非活跃用户
affected, err := db.Model(&models.User{}).Where("active", false).Delete()
```

## 关联关系

### 定义关联

Goal-Web ORM 支持多种关联类型：一对一、一对多和多对多。

#### 一对一关系

```go
type User struct {
    table.Table `db:"users"`
    
    ID       uint   `db:"id"`
    Name     string `db:"name"`
    Email    string `db:"email"`
    // 其他字段...
}

type Profile struct {
    table.Table `db:"profiles"`
    
    ID     uint   `db:"id"`
    UserID uint   `db:"user_id"`
    Bio    string `db:"bio"`
    // 其他字段...
}

// 用户有一个个人资料
func (user User) HasOne() map[string]interface{} {
    return map[string]interface{}{
        "profile": table.Relation{
            Model:      &Profile{},
            ForeignKey: "user_id",
            LocalKey:   "id",
        },
    }
}

// 个人资料属于一个用户
func (profile Profile) BelongsTo() map[string]interface{} {
    return map[string]interface{}{
        "user": table.Relation{
            Model:      &User{},
            ForeignKey: "id",
            LocalKey:   "user_id",
        },
    }
}
```

#### 一对多关系

```go
type User struct {
    table.Table `db:"users"`
    
    ID    uint   `db:"id"`
    Name  string `db:"name"`
    // 其他字段...
}

type Post struct {
    table.Table `db:"posts"`
    
    ID      uint   `db:"id"`
    UserID  uint   `db:"user_id"`
    Title   string `db:"title"`
    Content string `db:"content"`
    // 其他字段...
}

// 用户有多篇文章
func (user User) HasMany() map[string]interface{} {
    return map[string]interface{}{
        "posts": table.Relation{
            Model:      &Post{},
            ForeignKey: "user_id",
            LocalKey:   "id",
        },
    }
}

// 文章属于一个用户
func (post Post) BelongsTo() map[string]interface{} {
    return map[string]interface{}{
        "user": table.Relation{
            Model:      &User{},
            ForeignKey: "id",
            LocalKey:   "user_id",
        },
    }
}
```

#### 多对多关系

```go
type User struct {
    table.Table `db:"users"`
    
    ID   uint   `db:"id"`
    Name string `db:"name"`
    // 其他字段...
}

type Role struct {
    table.Table `db:"roles"`
    
    ID   uint   `db:"id"`
    Name string `db:"name"`
    // 其他字段...
}

// 用户有多个角色
func (user User) BelongsToMany() map[string]interface{} {
    return map[string]interface{}{
        "roles": table.Relation{
            Model:      &Role{},
            Table:      "role_user",    // 中间表
            ForeignKey: "user_id",      // 中间表中引用当前模型的外键
            RelatedKey: "role_id",      // 中间表中引用相关模型的外键
            LocalKey:   "id",           // 当前模型的主键
            RelatedPrimaryKey: "id",    // 相关模型的主键
        },
    }
}

// 角色有多个用户
func (role Role) BelongsToMany() map[string]interface{} {
    return map[string]interface{}{
        "users": table.Relation{
            Model:      &User{},
            Table:      "role_user",
            ForeignKey: "role_id",
            RelatedKey: "user_id",
            LocalKey:   "id",
            RelatedPrimaryKey: "id",
        },
    }
}
```

### 加载关联

#### 预加载关联

您可以使用 `With` 方法预加载关联：

```go
// 加载用户及其个人资料
var users []models.User
err := db.Model(&models.User{}).With("profile").Get(&users)

// 加载用户及其文章
err = db.Model(&models.User{}).With("posts").Get(&users)

// 加载用户及其角色
err = db.Model(&models.User{}).With("roles").Get(&users)

// 加载多个关联
err = db.Model(&models.User{}).With("profile", "posts", "roles").Get(&users)
```

#### 嵌套预加载

您可以使用点语法加载嵌套关联：

```go
// 加载用户、他们的文章以及每篇文章的评论
err := db.Model(&models.User{}).With("posts.comments").Get(&users)
```

#### 条件预加载

您可以为预加载的关联添加条件：

```go
// 只加载活跃用户的已发布文章
err := db.Model(&models.User{}).Where("active", true).With("posts", func(query contracts.Query) {
    query.Where("published", true)
}).Get(&users)
```

### 操作关联

#### 添加关联

```go
// 为用户添加角色
user := models.User{}
found, _ := db.Model(&user).Find(1)

if found {
    // 添加单个角色
    db.Model(&user).Attach("roles", 2)
    
    // 添加多个角色
    db.Model(&user).Attach("roles", []int{3, 4, 5})
    
    // 添加带有中间表额外字段的角色
    db.Model(&user).Attach("roles", map[string]interface{}{
        "role_id": 6,
        "expires_at": time.Now().AddDate(0, 1, 0), // 1 个月后过期
    })
}
```

#### 移除关联

```go
// 移除用户的角色
user := models.User{}
found, _ := db.Model(&user).Find(1)

if found {
    // 移除单个角色
    db.Model(&user).Detach("roles", 2)
    
    // 移除多个角色
    db.Model(&user).Detach("roles", []int{3, 4, 5})
    
    // 移除所有角色
    db.Model(&user).Detach("roles")
}
```

#### 同步关联

```go
// 同步用户的角色（移除所有现有角色，然后添加指定角色）
user := models.User{}
found, _ := db.Model(&user).Find(1)

if found {
    // 同步角色
    db.Model(&user).Sync("roles", []int{2, 3, 4})
}
```

## 高级用法

### 查询作用域

查询作用域允许您定义可重用的查询约束：

```go
package models

import "github.com/goal-web/contracts"

type User struct {
    // 字段...
}

// 活跃用户作用域
func (user User) ScopeActive(query contracts.Query) contracts.Query {
    return query.Where("active", true)
}

// 管理员作用域
func (user User) ScopeAdmin(query contracts.Query) contracts.Query {
    return query.Where("role", "admin")
}
```

使用作用域：

```go
var activeUsers []models.User
err := db.Model(&models.User{}).Scope("active").Get(&activeUsers)

var activeAdmins []models.User
err = db.Model(&models.User{}).Scope("active", "admin").Get(&activeAdmins)
```

### 全局作用域

全局作用域会自动应用于模型的所有查询：

```go
package models

import "github.com/goal-web/contracts"

type Post struct {
    // 字段...
    DeletedAt *time.Time `db:"deleted_at"`
}

// 全局作用域
func (post Post) GlobalScopes() map[string]func(contracts.Query) contracts.Query {
    return map[string]func(contracts.Query) contracts.Query{
        "not_deleted": func(query contracts.Query) contracts.Query {
            return query.WhereNull("deleted_at")
        },
    }
}
```

### 软删除

软删除允许您将记录标记为已删除而不实际从数据库中删除它们：

```go
package models

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/database/table"
    "time"
)

type Post struct {
    table.Table `db:"posts"`
    table.SoftDeletes // 启用软删除
    
    ID        uint       `db:"id"`
    Title     string     `db:"title"`
    Content   string     `db:"content"`
    DeletedAt *time.Time `db:"deleted_at"`
}
```

使用软删除：

```go
// 软删除文章
affected, err := db.Model(&models.Post{}).Delete(1)

// 包括已删除的文章
var allPosts []models.Post
err = db.Model(&models.Post{}).WithTrashed().Get(&allPosts)

// 只获取已删除的文章
var trashedPosts []models.Post
err = db.Model(&models.Post{}).OnlyTrashed().Get(&trashedPosts)

// 恢复已删除的文章
affected, err = db.Model(&models.Post{}).Restore(1)

// 永久删除文章
affected, err = db.Model(&models.Post{}).ForceDelete(1)
```

### 事件监听

您可以监听模型事件，如创建、更新和删除：

```go
package models

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/supports/logs"
)

type User struct {
    // 字段...
}

// 创建前事件
func (user User) Creating(event contracts.Event) {
    logs.Default().Info("Creating user")
    
    // 可以修改模型字段
    fields := event.GetFields()
    fields["created_at"] = time.Now()
}

// 创建后事件
func (user User) Created(event contracts.Event) {
    logs.Default().Info("User created", event.GetFields()["id"])
}

// 更新前事件
func (user User) Updating(event contracts.Event) {
    logs.Default().Info("Updating user")
    
    fields := event.GetFields()
    fields["updated_at"] = time.Now()
}

// 更新后事件
func (user User) Updated(event contracts.Event) {
    logs.Default().Info("User updated")
}

// 删除前事件
func (user User) Deleting(event contracts.Event) {
    logs.Default().Info("Deleting user")
}

// 删除后事件
func (user User) Deleted(event contracts.Event) {
    logs.Default().Info("User deleted")
}
```

### 自定义查询

您可以使用 `Query` 方法执行自定义查询：

```go
var users []models.User

// 执行自定义查询
err := db.Model(&models.User{}).Query(func(query contracts.Query) contracts.Query {
    return query.Where("active", true).OrderBy("created_at", "desc").Limit(10)
}).Get(&users)
```

## 最佳实践

### 模型组织

将模型放在 `app/models` 目录中，并按功能或模块组织：

```
app/
  models/
    user.go
    profile.go
    post.go
    comment.go
    role.go
```

### 使用仓库模式

为了保持代码的可维护性，您可以使用仓库模式将数据访问逻辑与业务逻辑分离：

```go
package repositories

import (
    "github.com/goal-web/contracts"
    "your-app/app/models"
)

type UserRepository struct {
    DB contracts.DBConnection `di:"database"`
}

func (repo *UserRepository) FindById(id int) (models.User, bool, error) {
    var user models.User
    found, err := repo.DB.Model(&user).Find(id)
    return user, found, err
}

func (repo *UserRepository) FindByEmail(email string) (models.User, bool, error) {
    var user models.User
    found, err := repo.DB.Model(&models.User{}).Where("email", email).First(&user)
    return user, found, err
}

func (repo *UserRepository) Create(userData map[string]interface{}) (uint, error) {
    return repo.DB.Model(&models.User{}).Create(userData)
}

func (repo *UserRepository) Update(id int, userData map[string]interface{}) (int64, error) {
    return repo.DB.Model(&models.User{}).Where("id", id).Update(userData)
}

func (repo *UserRepository) Delete(id int) (int64, error) {
    return repo.DB.Model(&models.User{}).Delete(id)
}
```

然后在控制器或服务中使用仓库：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http"
    "your-app/app/repositories"
)

type UserController struct {
    UserRepo *repositories.UserRepository `di:"*repositories.UserRepository"`
}

func (controller *UserController) Show(id int) contracts.HttpResponse {
    user, found, err := controller.UserRepo.FindById(id)
    
    if err != nil {
        return http.Error(err.Error(), 500)
    }
    
    if !found {
        return http.Json(map[string]string{
            "error": "User not found",
        }).WithStatus(404)
    }
    
    return http.Json(user)
}
```

## 下一步

现在您已经了解了如何使用模型和 ORM，您可以继续阅读以下文档：

- [迁移](migrations.md)
- [种子数据](seeding.md)
- [查询构建器](query.md)
- [数据库配置](configuration.md)
