
# 门面（Facades）

## 概念

门面（Facade）是一种让你以函数或全局变量的形式，优雅地访问容器中服务的模式。它的目标是：

- 提供简洁、可读的调用方式
- 仍然保留底层的依赖注入和可测试性

如果你熟悉 Laravel，那么 Goal-Web 中的门面概念会非常类似，只是实现方式更符合 Go 的语言风格。

## 为什么需要门面

在使用服务容器时，最直接的写法通常是：

```go
logger := app.Get("logger").(contracts.Logger)
logger.Info("User logged in")
```

当你在很多地方都需要记录日志时，这样的写法会显得啰嗦。通过门面，你可以将其简化为：

```go
logs.Info("User logged in")
``;

其中 `logs` 就是一个门面，它内部会从容器解析真正的 `contracts.Logger` 实例。

## 一个简化示例

下面是一个简化的日志门面示例，用于说明典型的实现思路：

```go
var app contracts.Application

func SetApplication(a contracts.Application) {
    app = a
}

func Logger() contracts.Logger {
    return app.Get("logger").(contracts.Logger)
}

func Info(message string, fields map[string]any) {
    Logger().Info(message, fields)
}
```

在应用启动时，你可以调用 `SetApplication` 将应用实例注入到门面中，之后就可以在任意地方使用 `Info` 等方法。

注意：实际框架中的门面实现会更加抽象和通用，这里仅用于帮助理解基本思路。

## 使用建议

门面可以让调用代码非常简洁，但也需要注意几个实践经验：

- 在核心业务逻辑中优先使用依赖注入，便于测试
- 在控制器、命令等上层代码中适度使用门面以提升可读性
- 不要在门面内部写业务逻辑，门面只负责转发调用

一个常见的折中方案是：

- 领域服务、仓储等核心组件通过构造函数注入依赖
- 日志、事件、队列等基础设施在上层可以通过门面简化调用

## 与服务容器和服务提供者的关系

门面本身不直接创建服务实例，而是依赖：

- 服务容器：真正保存和解析服务实例
- 服务提供者：在应用启动时向容器注册服务

你可以将三者的关系理解为：

- 服务提供者：定义 "有哪些服务"，以及如何创建它们
- 服务容器：负责保存和解析这些服务
- 门面：为这些服务提供一个更易用的调用外观

掌握门面模式，有助于你在保持代码简洁的同时，不牺牲可测试性与架构清晰度。
