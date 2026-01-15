# 种子数据（Seeding）

## 简介

种子数据用于为开发和测试环境快速填充初始数据。例如：

- 为本地开发创建一些测试用户、文章、权限
- 为集成测试准备一个可预测的数据集

Goal-Web 没有强制的“内建 Seeder 框架”，但可以很容易地基于现有组件实现一套适合自己项目的填充机制。

## 基本思路

常见的做法是：

1. 定义若干 Seeder 结构或函数，用于插入特定模块的数据
2. 在控制台命令或独立可执行程序中串联所有 Seeder
3. 在开发 / 测试环境运行该命令

## 使用查询构建器插入种子数据

以下示例展示如何通过查询构建器插入一些用户数据：

```go
package seeds

import "github.com/goal-web/contracts"

type UserSeeder struct {
	DB contracts.DBConnection `di:"database"`
}

func (s *UserSeeder) Run() error {
	_, err := s.DB.Table("users").InsertGetId(map[string]any{
		"name":   "Admin",
		"email":  "admin@example.com",
		"active": 1,
	})
	if err != nil {
		return err
	}

	return nil
}
```

在你的控制台命令中调用：

```go
package commands

import "github.com/goal-web/contracts"

type SeedCommand struct {
	app contracts.Application
}

func (cmd *SeedCommand) Handle() any {
	cmd.app.Call(func(seeder *seeds.UserSeeder) {
		_ = seeder.Run()
	})

	return nil
}
```

然后在应用的 console 启动代码中注册该命令，即可通过 `go run bootstrap/console/main.go db:seed` 之类的自定义命令执行种子填充（命令名称由你自行定义）。

## 使用 ORM 插入种子数据

如果你已经为表定义了模型，可以基于 ORM 提供的 `Create`、`FirstOrCreate` 等方法填充数据：

```go
package seeds

import (
	"github.com/goal-web/contracts"
	"your-app/app/models"
)

type RoleSeeder struct {
	DB contracts.DBConnection `di:"database"`
}

func (s *RoleSeeder) Run() error {
	query := s.DB.Model(&models.Role{})

	_, err := query.FirstOrCreateE(
		contracts.Fields{"name": "admin"},
		contracts.Fields{"description": "Administrator"},
	)
	if err != nil {
		return err
	}

	return nil
}
```

这样可以保证多次执行种子命令时不会重复创建相同记录。

## 与迁移配合

推荐的流程是：

1. 执行迁移，确保结构正确
2. 执行种子命令，填充基础数据

在 CI 或本地开发脚本中可以串联命令：

```bash
go run bootstrap/console/main.go migrate
go run bootstrap/console/main.go db:seed
```

## 最佳实践

- 将种子逻辑与业务逻辑分离，独立放在 `database/seeds` 或 `app/seeds` 目录
- 为不同模块拆分多个 Seeder，避免单个 Seeder 过于庞大
- 对于测试环境的种子数据，保证幂等（多次执行结果一致）

