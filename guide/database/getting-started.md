# 数据库入门

## 简介

Goal-Web 内置了统一的数据库抽象层，涵盖：

- 连接管理与连接池
- 原生 SQL 执行
- 查询构建器
- ORM 模型访问
- 事务封装

数据库配置的详细说明见：[数据库配置](configuration.md)。本节主要从“怎么用”的角度，给你一个从 0 到可用的数据库使用路径。

## 前置准备

1. 在 `.env` 中配置数据库连接（例如 MySQL）：

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=goal
DB_USERNAME=root
DB_PASSWORD=secret
```

2. 在 `config/database.go` 中注册数据库配置（参考配置章节示例）。

3. 在应用服务提供者中注册数据库服务：

```go
package config

import (
	"github.com/goal-web/application"
	"github.com/goal-web/database"
)

func init() {
	application.Providers = append(
		application.Providers,
		database.ServiceProvider{},
	)
}
```

完成这些步骤后，你就可以在任何需要的地方注入数据库连接或使用 `database` 包提供的辅助函数。

## 通过依赖注入获取数据库连接

在控制器中最推荐的方式是直接注入 `contracts.DBConnection`：

```go
package controllers

import (
	"github.com/goal-web/contracts"
)

type UserController struct {
	DB contracts.DBConnection `di:"database"`
}

func (controller *UserController) Index() interface{} {
	users, _ := controller.DB.Table("users").Get()
	return users
}
```

如果你在普通函数中使用数据库，可以从容器取出连接：

```go
func ListUsers(container contracts.Container) interface{} {
	db := container.Make("database").(contracts.DBConnection)
	users, _ := db.Table("users").Get()
	return users
}
```

## 使用 database 包的辅助函数

对于简单场景，可以直接使用 `database` 包提供的全局函数，而不关心工厂和连接的细节：

```go
import "github.com/goal-web/database"

func CountActiveUsers() int64 {
	var count int64
	_ = database.Select(&count, "SELECT COUNT(*) FROM users WHERE active = ?", 1)
	return count
}
```

同样，你也可以使用 `database.Transaction` 直接包裹一段业务逻辑（见下文）。

## 事务

数据库写入操作通常需要事务来保证一致性。Goal-Web 提供两种用法：

### 使用 DBConnection.Transaction

```go
func Transfer(db contracts.DBConnection, from, to int64, amount int64) error {
	return db.Transaction(func(exec contracts.SqlExecutor) contracts.Exception {
		_, err := exec.Exec("UPDATE accounts SET balance = balance - ? WHERE id = ?", amount, from)
		if err != nil {
			return err
		}

		_, err = exec.Exec("UPDATE accounts SET balance = balance + ? WHERE id = ?", amount, to)
		if err != nil {
			return err
		}

		return nil
	})
}
```

### 使用 database.Transaction 辅助函数

```go
import "github.com/goal-web/database"

func TransferWithDefaultConnection(from, to int64, amount int64) error {
	return database.Transaction(func(exec contracts.SqlExecutor) contracts.Exception {
		_, err := exec.Exec("UPDATE accounts SET balance = balance - ? WHERE id = ?", amount, from)
		if err != nil {
			return err
		}

		_, err = exec.Exec("UPDATE accounts SET balance = balance + ? WHERE id = ?", amount, to)
		if err != nil {
			return err
		}

		return nil
	})
}
```

## 下一步

完成数据库基础配置与连接使用之后，你可以继续阅读：

- [查询构建器](query.md)：如何优雅地构造各种查询
- [模型和 ORM](orm.md)：如何用模型封装表和业务逻辑
- [迁移](migrations.md)：如何管理数据库结构变更
- [种子数据](seeding.md)：如何为开发和测试环境快速填充数据

