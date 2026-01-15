# 查询构建器

## 简介

Goal-Web 框架提供了一个流畅、便捷的查询构建器，用于执行各种数据库操作。查询构建器使用 PDO 参数绑定来保护您的应用程序免受 SQL 注入攻击，因此无需手动清理传入的字符串。

## 获取数据库连接

在使用查询构建器之前，您需要获取数据库连接实例。您可以通过依赖注入或从容器中获取：

```go
package controllers

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/database/query"
)

type UserController struct {
    // 通过依赖注入获取数据库连接
    DB contracts.DBConnection `di:"database"`
}

func (controller *UserController) Index() interface{} {
    // 使用数据库连接
    users, _ := controller.DB.Table("users").Get()
    return users
}

// 或者直接从容器中获取
func GetUsers(container contracts.Container) interface{} {
    db := container.Make("database").(contracts.DBConnection)
    users, _ := db.Table("users").Get()
    return users
}
```

## 运行原生 SQL 查询

### 运行 SELECT 查询

您可以使用 `Select` 方法运行原生 SQL 查询：

```go
users, err := db.Select("SELECT * FROM users WHERE active = ?", 1)
if err != nil {
    // 处理错误
}

// 使用命名参数
users, err := db.Select("SELECT * FROM users WHERE active = :active", map[string]interface{}{
    "active": 1,
})
```

### 运行 INSERT 查询

您可以使用 `Insert` 方法运行原生 INSERT 查询：

```go
affected, err := db.Statement("INSERT INTO users (name, email) VALUES (?, ?)", "John Doe", "john@example.com")
if err != nil {
    // 处理错误
}

// 使用命名参数
affected, err := db.Statement("INSERT INTO users (name, email) VALUES (:name, :email)", map[string]interface{}{
    "name":  "John Doe",
    "email": "john@example.com",
})
```

### 运行 UPDATE 查询

您可以使用 `Statement` 方法运行原生 UPDATE 查询：

```go
affected, err := db.Statement("UPDATE users SET active = ? WHERE id = ?", 0, 1)
if err != nil {
    // 处理错误
}
```

### 运行 DELETE 查询

您可以使用 `Statement` 方法运行原生 DELETE 查询：

```go
affected, err := db.Statement("DELETE FROM users WHERE id = ?", 1)
if err != nil {
    // 处理错误
}
```

## 查询构建器

### 从表中检索所有行

您可以使用 `Table` 方法指定要查询的表，然后使用 `Get` 方法检索所有结果：

```go
users, err := db.Table("users").Get()
if err != nil {
    // 处理错误
}

// 选择特定列
users, err := db.Table("users").Select("name", "email").Get()
```

### 检索单行或单列

如果您只需要检索一行数据，可以使用 `First` 方法：

```go
user, err := db.Table("users").Where("id", 1).First()
if err != nil {
    // 处理错误
}

// 检索单个值
email, err := db.Table("users").Where("id", 1).Value("email")
```

### 聚合函数

查询构建器还提供了各种聚合方法，如 `Count`、`Max`、`Min`、`Avg` 和 `Sum`：

```go
count, err := db.Table("users").Count()

max, err := db.Table("orders").Max("price")

min, err := db.Table("orders").Min("price")

avg, err := db.Table("orders").Avg("price")

sum, err := db.Table("orders").Sum("price")
```

## 条件查询

### 基本 WHERE 子句

您可以使用 `Where` 方法添加 `WHERE` 子句：

```go
users, err := db.Table("users").Where("active", 1).Get()

// 使用不同的操作符
users, err := db.Table("users").Where("age", ">", 18).Get()

// WHERE age > 18 AND active = 1
users, err := db.Table("users").Where("age", ">", 18).Where("active", 1).Get()
```

### OR 条件

您可以使用 `OrWhere` 方法添加 `OR` 条件：

```go
// WHERE active = 1 OR role = 'admin'
users, err := db.Table("users").Where("active", 1).OrWhere("role", "admin").Get()
```

### WHERE IN 子句

您可以使用 `WhereIn` 方法添加 `WHERE IN` 子句：

```go
// WHERE id IN (1, 2, 3)
users, err := db.Table("users").WhereIn("id", []interface{}{1, 2, 3}).Get()

// WHERE id NOT IN (1, 2, 3)
users, err := db.Table("users").WhereNotIn("id", []interface{}{1, 2, 3}).Get()
```

### WHERE NULL 子句

您可以使用 `WhereNull` 和 `WhereNotNull` 方法检查列是否为 NULL：

```go
// WHERE deleted_at IS NULL
users, err := db.Table("users").WhereNull("deleted_at").Get()

// WHERE deleted_at IS NOT NULL
users, err := db.Table("users").WhereNotNull("deleted_at").Get()
```

### WHERE BETWEEN 子句

您可以使用 `WhereBetween` 方法验证列的值是否在给定范围内：

```go
// WHERE price BETWEEN 100 AND 200
products, err := db.Table("products").WhereBetween("price", []interface{}{100, 200}).Get()

// WHERE price NOT BETWEEN 100 AND 200
products, err := db.Table("products").WhereNotBetween("price", []interface{}{100, 200}).Get()
```

### WHERE LIKE 子句

您可以使用 `WhereLike` 方法进行模糊匹配：

```go
// WHERE name LIKE '%John%'
users, err := db.Table("users").WhereLike("name", "%John%").Get()
```

### 高级 WHERE 子句

您可以使用闭包构建更复杂的 `WHERE` 条件：

```go
// WHERE (active = 1 AND role = 'user') OR (active = 0 AND role = 'admin')
users, err := db.Table("users").Where(func(query contracts.Query) {
    query.Where("active", 1).Where("role", "user")
}).OrWhere(func(query contracts.Query) {
    query.Where("active", 0).Where("role", "admin")
}).Get()
```

## 排序、分组和限制

### 排序

您可以使用 `OrderBy` 方法对结果进行排序：

```go
// ORDER BY created_at ASC
users, err := db.Table("users").OrderBy("created_at").Get()

// ORDER BY created_at DESC
users, err := db.Table("users").OrderBy("created_at", "desc").Get()

// 多列排序
users, err := db.Table("users").OrderBy("name").OrderBy("created_at", "desc").Get()
```

### 随机排序

您可以使用 `InRandomOrder` 方法随机排序结果：

```go
// ORDER BY RAND()
users, err := db.Table("users").InRandomOrder().Get()
```

### 分组

您可以使用 `GroupBy` 和 `Having` 方法对结果进行分组：

```go
// GROUP BY role
users, err := db.Table("users").GroupBy("role").Get()

// GROUP BY role HAVING count > 100
users, err := db.Table("users").GroupBy("role").Having("count", ">", 100).Get()
```

### 限制和偏移

您可以使用 `Limit` 和 `Offset` 方法限制结果数量：

```go
// LIMIT 10
users, err := db.Table("users").Limit(10).Get()

// LIMIT 10 OFFSET 20
users, err := db.Table("users").Limit(10).Offset(20).Get()
```

### 分页

您可以使用 `Paginate` 方法对结果进行分页：

```go
// 第 1 页，每页 15 条
result, err := db.Table("users").Paginate(1, 15)
if err != nil {
    // 处理错误
}

// 分页结果包含以下信息
fmt.Println("当前页:", result["current_page"])
fmt.Println("每页数量:", result["per_page"])
fmt.Println("总记录数:", result["total"])
fmt.Println("总页数:", result["last_page"])
fmt.Println("数据:", result["data"])
```

## 连接查询

### 内连接

您可以使用 `Join` 方法执行内连接：

```go
users, err := db.Table("users")
    .Join("orders", "users.id", "=", "orders.user_id")
    .Select("users.*", "orders.price")
    .Get()
```

### 左连接

您可以使用 `LeftJoin` 方法执行左连接：

```go
users, err := db.Table("users")
    .LeftJoin("orders", "users.id", "=", "orders.user_id")
    .Select("users.*", "orders.price")
    .Get()
```

### 右连接

您可以使用 `RightJoin` 方法执行右连接：

```go
users, err := db.Table("users")
    .RightJoin("orders", "users.id", "=", "orders.user_id")
    .Select("users.*", "orders.price")
    .Get()
```

### 高级连接

您可以使用闭包定义更复杂的连接条件：

```go
users, err := db.Table("users")
    .Join("orders", func(join contracts.Join) {
        join.On("users.id", "=", "orders.user_id")
            .Where("orders.status", "completed")
    })
    .Get()
```

## 插入操作

### 插入单行

您可以使用 `Insert` 方法插入新记录：

```go
id, err := db.Table("users").Insert(map[string]interface{}{
    "name":  "John Doe",
    "email": "john@example.com",
    "active": 1,
})
```

### 插入多行

您可以一次插入多条记录：

```go
ids, err := db.Table("users").Insert([]map[string]interface{}{
    {
        "name":  "John Doe",
        "email": "john@example.com",
        "active": 1,
    },
    {
        "name":  "Jane Smith",
        "email": "jane@example.com",
        "active": 1,
    },
})
```

### 自增 ID

如果表有自增 ID，`Insert` 方法将返回最后插入的 ID：

```go
id, err := db.Table("users").Insert(map[string]interface{}{
    "name":  "John Doe",
    "email": "john@example.com",
})

fmt.Println("插入的 ID:", id)
```

## 更新操作

### 更新记录

您可以使用 `Update` 方法更新记录：

```go
affected, err := db.Table("users").Where("id", 1).Update(map[string]interface{}{
    "name": "John Smith",
    "active": 0,
})

fmt.Println("受影响的行数:", affected)
```

### 批量更新

您可以一次更新多条记录：

```go
affected, err := db.Table("users").Where("active", 1).Update(map[string]interface{}{
    "active": 0,
})
```

### 递增和递减

您可以使用 `Increment` 和 `Decrement` 方法递增或递减列的值：

```go
// 将 votes 加 1
affected, err := db.Table("posts").Where("id", 1).Increment("votes")

// 将 votes 加 5
affected, err := db.Table("posts").Where("id", 1).Increment("votes", 5)

// 将 votes 减 1
affected, err := db.Table("posts").Where("id", 1).Decrement("votes")

// 将 votes 减 5
affected, err := db.Table("posts").Where("id", 1).Decrement("votes", 5)
```

## 删除操作

### 删除记录

您可以使用 `Delete` 方法删除记录：

```go
affected, err := db.Table("users").Where("id", 1).Delete()

fmt.Println("受影响的行数:", affected)
```

### 批量删除

您可以一次删除多条记录：

```go
affected, err := db.Table("users").Where("active", 0).Delete()
```

### 截断表

您可以使用 `Truncate` 方法清空表：

```go
err := db.Table("users").Truncate()
```

## 事务

### 自动事务

您可以使用 `Transaction` 方法执行事务：

```go
err := db.Transaction(func(tx contracts.DBTransaction) error {
    // 在事务中执行操作
    _, err := tx.Table("users").Insert(map[string]interface{}{
        "name":  "John Doe",
        "email": "john@example.com",
    })
    if err != nil {
        // 返回错误将回滚事务
        return err
    }
    
    _, err = tx.Table("profiles").Insert(map[string]interface{}{
        "user_id":    1,
        "bio":        "A web developer",
        "created_at": time.Now(),
    })
    if err != nil {
        return err
    }
    
    // 返回 nil 将提交事务
    return nil
})
```

### 手动事务

您也可以手动控制事务：

```go
// 开始事务
tx, err := db.BeginTransaction()
if err != nil {
    return err
}

// 执行操作
_, err = tx.Table("users").Insert(map[string]interface{}{
    "name":  "John Doe",
    "email": "john@example.com",
})
if err != nil {
    // 回滚事务
    tx.Rollback()
    return err
}

_, err = tx.Table("profiles").Insert(map[string]interface{}{
    "user_id":    1,
    "bio":        "A web developer",
    "created_at": time.Now(),
})
if err != nil {
    tx.Rollback()
    return err
}

// 提交事务
return tx.Commit()
```

## 调试

### 获取 SQL 语句

您可以使用 `ToSql` 方法获取生成的 SQL 语句和绑定参数：

```go
sql, bindings := db.Table("users").Where("active", 1).ToSql()

fmt.Println("SQL:", sql)
fmt.Println("绑定参数:", bindings)
```

### 启用查询日志

您可以启用查询日志来记录所有执行的查询：

```go
// 启用查询日志
db.EnableQueryLog()

// 执行查询
users, _ := db.Table("users").Get()

// 获取查询日志
queryLogs := db.GetQueryLog()
for _, log := range queryLogs {
    fmt.Println("SQL:", log.SQL)
    fmt.Println("绑定参数:", log.Bindings)
    fmt.Println("执行时间:", log.Time)
}
```

## 高级用法

### 子查询

您可以在查询中使用子查询：

```go
users, err := db.Table("users").Where("id", "in", func(query contracts.Query) {
    query.From("orders").Select("user_id").Where("status", "completed")
}).Get()
```

### 原始表达式

您可以使用 `Raw` 方法创建原始表达式：

```go
users, err := db.Table("users")
    .Select("name", db.Raw("COUNT(*) as user_count"))
    .GroupBy("name")
    .Get()
```

### 条件查询

您可以使用 `When` 方法根据条件构建查询：

```go
active := true

users, err := db.Table("users")
    .When(active, func(query contracts.Query) {
        query.Where("active", 1)
    })
    .Get()
```

### 分块处理结果

对于大型结果集，您可以使用 `Chunk` 方法分块处理：

```go
err := db.Table("users").OrderBy("id").Chunk(100, func(users []map[string]interface{}) bool {
    for _, user := range users {
        // 处理每个用户
        fmt.Println(user["name"])
    }
    
    // 返回 false 停止处理，返回 true 继续处理下一块
    return true
})
```

## 下一步

现在您已经了解了如何使用查询构建器，您可以继续阅读以下文档：

- [模型和 ORM](orm.md)
- [迁移](migrations.md)
- [种子数据](seeding.md)
- [数据库配置](configuration.md)