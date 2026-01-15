
# 服务容器

## 概念

服务容器是 Goal-Web 的核心组件之一，负责管理应用中的所有依赖关系：

- 统一创建和管理对象实例
- 支持按需解析（Lazy Resolve）
- 支持单例、普通绑定和已有实例注册
- 支持别名与类型自动解析

你可以把服务容器看作是一个强类型的依赖注入容器，它让你的业务代码更关注 "要什么"，而不是 "怎么构造"。

## 容器实现

容器的具体实现位于 `container` 包中，其核心结构大致如下：

- `binds`：普通绑定（每次解析都会创建新的实例）
- `singletons`：单例绑定（第一次解析时创建实例并缓存）
- `instances`：已存在的实例（直接返回，不再创建）
- `aliases`：别名映射，用于支持多种 key 访问同一服务

通过这些结构，容器可以灵活地管理各种服务和对象。

## 基本用法

### 创建容器

在应用内部，`Application` 自身就是一个容器实现；如果你需要单独使用容器，也可以直接创建：

```go
app := container.New()
```

### 绑定服务

绑定服务有三种常见方式：

#### 普通绑定

```go
app.Bind("redis", func() contracts.Redis {
    return redis.NewClient()
})
```

每次通过 `app.Get("redis")` 解析时，都会调用一次函数，返回一个新的实例。

#### 单例绑定

```go
app.Singleton("db", func() contracts.DB {
    return database.NewConnection()
})
```

容器会在第一次解析时创建实例并缓存，以后每次都返回同一个实例。

#### 直接注册实例

```go
logger := logs.Default()
app.Instance("logger", logger)
```

这种方式适合那些已经创建好的对象。

## 解析依赖

### 手动解析

最直接的方式是调用 `Get`：

```go
db := app.Get("db").(contracts.DB)
```

容器会根据 key 查找绑定、单例或实例并返回。

### 自动注入

容器不仅可以按 key 获取，还可以根据函数签名自动注入参数：

```go
func NewUserRepository(db contracts.DB, logger contracts.Logger) *UserRepository {
    return &UserRepository{db: db, logger: logger}
}

repoAny := app.Call(NewUserRepository)[0]
repo := repoAny.(*UserRepository)
```

容器会根据参数类型，从已注册的服务中自动匹配合适的实例。

这种自动注入能力在控制器、服务对象、命令等场景中非常常见，也大大减少了手动拼装依赖的工作量。

## 别名与类型解析

容器内部会为每个绑定生成一个基于类型的 key，并将你传入的字符串 key 映射为别名：

- 你可以通过字符串 key（如 `"db"`）访问服务
- 也可以通过类型 key 在某些高级场景下进行解析

这使得容器既保持了使用上的直观性，又保留了类型级别的精确控制。

## 在框架中的位置

在 Goal-Web 中，服务容器贯穿几乎所有模块：

- 控制器依赖注入
- 中间件依赖注入
- 命令行任务依赖注入
- 服务提供者注册与解析

掌握容器的用法，是深入理解 Goal-Web 核心架构的第一步。
