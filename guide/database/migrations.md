# 数据库迁移

## 简介

数据库迁移用于对结构变更进行版本化管理，让你可以：

- 在团队内同步表结构变更
- 在不同环境（开发 / 测试 / 生产）之间安全迁移
- 快速回滚到某个历史结构

Goal-Web 的迁移基于 SQL 文件和一组控制台命令实现。

## 迁移文件位置与命名

迁移文件默认存放在 `database/migrations` 目录中，对应的配置在 `config/database.go` 中：

```go
Migrations: contracts.Fields{
	"table": "migrations",
	"path":  "database/migrations",
},
```

迁移由一对文件组成：

- `YYYY_MM_DD_HHMMSS_name.sql`      ：执行迁移时运行的 SQL（up）
- `YYYY_MM_DD_HHMMSS_name.down.sql` ：回滚迁移时运行的 SQL（down）

你可以使用命令自动生成基础迁移文件。

## 生成迁移

在应用根目录执行：

```bash
go run bootstrap/console/main.go make:migration create_users
```

或使用 `goal` 下的 Makefile：

```bash
cd goal
make make-migration NAME=create_users
```

该命令会在 `database/migrations` 目录下生成类似以下两个文件：

- `2026_01_16_123000_create_users.sql`
- `2026_01_16_123000_create_users.down.sql`

如果名称以 `create_` 开头，生成器会自动为 up 文件填充一个简单的建表 SQL，为 down 文件填充 `drop table` 语句，你可以在此基础上修改字段定义。

## 编写迁移 SQL

示例：`create_users.sql`：

```sql
CREATE TABLE IF NOT EXISTS users (
    id         INT UNSIGNED AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

对应的 `create_users.down.sql`：

```sql
DROP TABLE IF EXISTS users;
```

## 运行迁移

常用的迁移命令（在应用根目录）：

```bash
go run bootstrap/console/main.go migrate           # 执行所有未运行的迁移
go run bootstrap/console/main.go migrate:rollback  # 回滚上一次批次的迁移
go run bootstrap/console/main.go migrate:refresh   # 回滚所有迁移并重新执行
go run bootstrap/console/main.go migrate:reset     # 回滚所有迁移
go run bootstrap/console/main.go migrate:status    # 查看迁移执行状态
```

如果你使用 `goal` 项目的 Makefile，也可以：

```bash
cd goal
make migrate
make migrate-rollback
make migrate-refresh
make migrate-reset
make migrate-status
```

所有已执行迁移的记录会保存到配置中指定的 `migrations` 表中，用于决定哪些迁移需要执行或回滚。

## 多环境迁移建议

- **开发环境**：常用 `migrate:refresh` 快速重建结构
- **测试环境**：在 CI 中执行 `migrate`，确保测试运行前结构正确
- **生产环境**：仅在发布管线中运行 `migrate`，谨慎使用 `rollback` 和 `refresh`

## 下一步

当迁移体系就绪后，你可以结合：

- [查询构建器](query.md) 操作数据
- [模型和 ORM](orm.md) 用模型封装业务
- [种子数据](seeding.md) 为开发和测试填充数据

