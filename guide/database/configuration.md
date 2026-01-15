# 数据库配置

## 简介

Goal-Web 框架提供了简单、灵活的数据库配置和操作方式，支持多种数据库系统，包括 MySQL、PostgreSQL、SQLite 和 MongoDB 等。本文档将介绍如何配置和使用数据库连接。

## 配置数据库

### 基本配置

数据库配置通常位于 `config/database.go` 文件中。以下是一个基本的数据库配置示例：

```go
package config

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/database"
    "github.com/goal-web/supports/utils"
    "os"
)

func init() {
    configs.Add("database", func(env contracts.Env) interface{} {
        return database.Config{
            Default: env.GetString("DB_CONNECTION", "mysql"),
            Connections: map[string]contracts.Fields{
                "mysql": {
                    "driver":   "mysql",
                    "host":     env.GetString("DB_HOST", "localhost"),
                    "port":     env.GetString("DB_PORT", "3306"),
                    "database": env.GetString("DB_DATABASE", "goal"),
                    "username": env.GetString("DB_USERNAME", "root"),
                    "password": env.GetString("DB_PASSWORD", ""),
                    "charset":  env.GetString("DB_CHARSET", "utf8mb4"),
                    "collation": env.GetString("DB_COLLATION", "utf8mb4_unicode_ci"),
                    "prefix":    env.GetString("DB_PREFIX", ""),
                },
                "postgres": {
                    "driver":   "postgres",
                    "host":     env.GetString("DB_HOST", "localhost"),
                    "port":     env.GetString("DB_PORT", "5432"),
                    "database": env.GetString("DB_DATABASE", "goal"),
                    "username": env.GetString("DB_USERNAME", "postgres"),
                    "password": env.GetString("DB_PASSWORD", ""),
                    "charset":  env.GetString("DB_CHARSET", "utf8"),
                    "prefix":   env.GetString("DB_PREFIX", ""),
                    "sslmode":  env.GetString("DB_SSLMODE", "disable"),
                },
                "sqlite": {
                    "driver":   "sqlite",
                    "database": env.GetString("DB_DATABASE", "database.sqlite"),
                    "prefix":   env.GetString("DB_PREFIX", ""),
                },
                "mongodb": {
                    "driver":   "mongodb",
                    "host":     env.GetString("DB_HOST", "localhost"),
                    "port":     env.GetString("DB_PORT", "27017"),
                    "database": env.GetString("DB_DATABASE", "goal"),
                    "username": env.GetString("DB_USERNAME", ""),
                    "password": env.GetString("DB_PASSWORD", ""),
                    "options":  utils.StringMap{
                        "auth_source": env.GetString("DB_AUTHENTICATION_DATABASE", "admin"),
                    },
                },
            },
            Pool: contracts.Fields{
                "max_idle_conns":     env.GetInt("DB_MAX_IDLE_CONNS", 10),
                "max_open_conns":     env.GetInt("DB_MAX_OPEN_CONNS", 100),
                "conn_max_lifetime":  env.GetInt("DB_CONN_MAX_LIFETIME", 3600),
                "conn_max_idle_time": env.GetInt("DB_CONN_MAX_IDLE_TIME", 3600),
            },
            Migrations: contracts.Fields{
                "table":    env.GetString("DB_MIGRATIONS_TABLE", "migrations"),
                "path":     env.GetString("DB_MIGRATIONS_PATH", "database/migrations"),
            },
        }
    })
}
```

### 环境变量配置

数据库配置通常从环境变量中读取。您可以在 `.env` 文件中设置以下变量：

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=goal
DB_USERNAME=root
DB_PASSWORD=secret
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
DB_PREFIX=

# 连接池配置
DB_MAX_IDLE_CONNS=10
DB_MAX_OPEN_CONNS=100
DB_CONN_MAX_LIFETIME=3600
DB_CONN_MAX_IDLE_TIME=3600

# 迁移配置
DB_MIGRATIONS_TABLE=migrations
DB_MIGRATIONS_PATH=database/migrations
```

## 数据库连接

### 注册数据库服务提供者

在 `config/app.go` 文件中，确保数据库服务提供者已注册：

```go
package config

import (
    "github.com/goal-web/application"
    "github.com/goal-web/database"
    // 其他导入
)

func init() {
    application.Providers = append(
        application.Providers,
        // 其他服务提供者
        database.ServiceProvider{},
    )
}
```

### 获取数据库连接

您可以通过依赖注入或直接从容器中获取数据库连接：

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

### 使用多个数据库连接

如果您配置了多个数据库连接，可以使用 `Connection` 方法切换连接：

```go
// 使用默认连接
users, _ := db.Table("users").Get()

// 切换到 postgres 连接
products, _ := db.Connection("postgres").Table("products").Get()

// 切换到 mongodb 连接
documents, _ := db.Connection("mongodb").Collection("documents").Find()
```

## 读写分离

### 配置读写分离

您可以配置主从数据库来实现读写分离：

```go
"mysql": {
    "driver":   "mysql",
    "read": []contracts.Fields{
        {
            "host": env.GetString("DB_READ_HOST_1", "localhost"),
            "port": env.GetString("DB_READ_PORT_1", "3306"),
        },
        {
            "host": env.GetString("DB_READ_HOST_2", "localhost"),
            "port": env.GetString("DB_READ_PORT_2", "3306"),
        },
    },
    "write": contracts.Fields{
        "host": env.GetString("DB_WRITE_HOST", "localhost"),
        "port": env.GetString("DB_WRITE_PORT", "3306"),
    },
    "database": env.GetString("DB_DATABASE", "goal"),
    "username": env.GetString("DB_USERNAME", "root"),
    "password": env.GetString("DB_PASSWORD", ""),
    "charset":  env.GetString("DB_CHARSET", "utf8mb4"),
    "collation": env.GetString("DB_COLLATION", "utf8mb4_unicode_ci"),
    "prefix":    env.GetString("DB_PREFIX", ""),
},
```

### 使用读写连接

框架会自动根据操作类型选择适当的连接：

- 读操作（如 `Get`、`First`、`Find` 等）使用读连接
- 写操作（如 `Insert`、`Update`、`Delete` 等）使用写连接

您也可以显式指定使用读或写连接：

```go
// 强制使用写连接进行读操作
users, _ := db.UseWriteConnection().Table("users").Get()

// 强制使用读连接
user, _ := db.UseReadConnection().Table("users").Where("id", 1).First()
```

## 连接池配置

为了优化数据库性能，您可以配置连接池参数：

```go
"Pool": contracts.Fields{
    "max_idle_conns":     env.GetInt("DB_MAX_IDLE_CONNS", 10),    // 最大空闲连接数
    "max_open_conns":     env.GetInt("DB_MAX_OPEN_CONNS", 100),   // 最大打开连接数
    "conn_max_lifetime":  env.GetInt("DB_CONN_MAX_LIFETIME", 3600), // 连接最大生命周期（秒）
    "conn_max_idle_time": env.GetInt("DB_CONN_MAX_IDLE_TIME", 3600), // 连接最大空闲时间（秒）
},
```

这些参数可以帮助您控制数据库连接的使用和回收，避免连接泄漏和资源浪费。

## 调试数据库查询

### 启用查询日志

您可以启用查询日志来调试数据库操作：

```go
package main

import (
    "github.com/goal-web/application"
    "github.com/goal-web/contracts"
    "github.com/goal-web/supports/logs"
)

func main() {
    app := application.Make()
    
    // 启用查询日志
    db := app.Get("database").(contracts.DBConnection)
    db.EnableQueryLog()
    
    // 执行查询
    users, _ := db.Table("users").Get()
    
    // 获取查询日志
    queryLogs := db.GetQueryLog()
    for _, log := range queryLogs {
        logs.Default().Info("SQL", log.SQL, "Bindings", log.Bindings, "Time", log.Time)
    }
    
    // 应用逻辑...
}
```

### 监听查询事件

您还可以监听查询事件来记录或分析数据库操作：

```go
package providers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/database/events"
	"github.com/goal-web/supports/logs"
)

type EventServiceProvider struct {
	app contracts.Application
}

func (provider *EventServiceProvider) Register(app contracts.Application) {
	provider.app = app
}

func (provider *EventServiceProvider) Start() error {
	dispatcher := provider.app.Get("events").(contracts.EventDispatcher)
	
	dispatcher.Listen(events.QueryExecuted{}, func(event interface{}) {
		if queryEvent, ok := event.(events.QueryExecuted); ok {
			logs.Default().Info(
				"SQL", queryEvent.SQL,
				"Bindings", queryEvent.Bindings,
				"Time", queryEvent.Time,
				"Connection", queryEvent.Connection,
			)
		}
	})

	return nil
}

func (provider *EventServiceProvider) Stop() {}
```

## 事务处理

### 基本事务

您可以使用 `Transaction` 方法开始一个事务：

```go
db.Transaction(func(tx contracts.DBTransaction) error {
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

### 手动事务控制

您也可以手动控制事务的开始、提交和回滚：

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

## 数据库迁移配置

### 迁移配置

您可以配置迁移表名和路径：

```go
"Migrations": contracts.Fields{
    "table": env.GetString("DB_MIGRATIONS_TABLE", "migrations"), // 迁移表名
    "path":  env.GetString("DB_MIGRATIONS_PATH", "database/migrations"), // 迁移文件路径
},
```

### 创建迁移文件

您可以使用 Goal-Web CLI 创建迁移文件：

```bash
goal make:migration create_users_table
```

这将在 `database/migrations` 目录中创建一个新的迁移文件。

## 多数据库系统支持

### MySQL

```go
"mysql": {
    "driver":   "mysql",
    "host":     env.GetString("DB_HOST", "localhost"),
    "port":     env.GetString("DB_PORT", "3306"),
    "database": env.GetString("DB_DATABASE", "goal"),
    "username": env.GetString("DB_USERNAME", "root"),
    "password": env.GetString("DB_PASSWORD", ""),
    "charset":  env.GetString("DB_CHARSET", "utf8mb4"),
    "collation": env.GetString("DB_COLLATION", "utf8mb4_unicode_ci"),
    "prefix":    env.GetString("DB_PREFIX", ""),
    "strict":    env.GetBool("DB_STRICT_MODE", true),
    "engine":    env.GetString("DB_ENGINE", "InnoDB"),
},
```

### PostgreSQL

```go
"postgres": {
    "driver":   "postgres",
    "host":     env.GetString("DB_HOST", "localhost"),
    "port":     env.GetString("DB_PORT", "5432"),
    "database": env.GetString("DB_DATABASE", "goal"),
    "username": env.GetString("DB_USERNAME", "postgres"),
    "password": env.GetString("DB_PASSWORD", ""),
    "charset":  env.GetString("DB_CHARSET", "utf8"),
    "prefix":   env.GetString("DB_PREFIX", ""),
    "sslmode":  env.GetString("DB_SSLMODE", "disable"),
    "timezone": env.GetString("DB_TIMEZONE", "UTC"),
},
```

### SQLite

```go
"sqlite": {
    "driver":   "sqlite",
    "database": env.GetString("DB_DATABASE", "database.sqlite"), // 数据库文件路径
    "prefix":   env.GetString("DB_PREFIX", ""),
    "foreign_keys": env.GetBool("DB_FOREIGN_KEYS", true), // 启用外键约束
},
```

### MongoDB

```go
"mongodb": {
    "driver":   "mongodb",
    "host":     env.GetString("DB_HOST", "localhost"),
    "port":     env.GetString("DB_PORT", "27017"),
    "database": env.GetString("DB_DATABASE", "goal"),
    "username": env.GetString("DB_USERNAME", ""),
    "password": env.GetString("DB_PASSWORD", ""),
    "options":  utils.StringMap{
        "auth_source": env.GetString("DB_AUTHENTICATION_DATABASE", "admin"),
        "replica_set": env.GetString("DB_REPLICA_SET", ""),
        "connect_timeout_ms": env.GetString("DB_CONNECT_TIMEOUT_MS", "10000"),
    },
},
```

## 下一步

现在您已经了解了如何配置数据库连接，您可以继续阅读以下文档：

- [查询构建器](query.md)
- [模型和 ORM](orm.md)
- [迁移](migrations.md)
- [种子数据](seeding.md)
