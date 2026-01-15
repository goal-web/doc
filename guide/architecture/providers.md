
# 服务提供者

## 概念

服务提供者（Service Provider）是连接 "服务容器" 与 "具体功能模块" 的桥梁。它的职责包括：

- 向容器注册绑定（Bind / Singleton / Instance）
- 在应用启动时执行初始化逻辑
- 在应用停止时执行清理逻辑

所有与模块初始化相关的代码（数据库连接、缓存、队列、视图引擎等），都应该集中放在服务提供者中，而不是散落在业务代码里。

## 接口定义

服务提供者实现 `contracts.ServiceProvider` 接口：

- `Register(Application)`：注册服务和绑定
- `Start() error`：启动服务（可选的异步任务、连接等）
- `Stop()`：优雅关闭服务，释放资源

应用在启动时会依次调用所有服务提供者的 `Register` 和 `Start` 方法，在停止时倒序调用 `Stop` 方法。

## 一个典型示例

下面是一个基于实际 HTTP 模块实现的简化服务提供者示例，用于展示常见的结构和依赖注入方式：

```go
type HttpServiceProvider struct {
    app             contracts.Application
    RouteCollectors []any
}

func NewHttpService(routes ...any) contracts.ServiceProvider {
    return &HttpServiceProvider{RouteCollectors: routes}
}

func (provider *HttpServiceProvider) Register(app contracts.Application) {
    provider.app = app

    app.Singleton("HttpMiddleware", func() contracts.Middleware {
        return NewMiddleware(provider.app)
    })

    app.Singleton("HttpRouter", func() contracts.HttpRouter {
        return routing.NewHttpRouter(provider.app)
    })

    app.Singleton("HttpEngine", func(router contracts.HttpRouter, config contracts.Config, middleware contracts.Middleware) contracts.HttpEngine {
        httpConfig := config.Get("http").(Config)
        middlewares := append(
            routing.ConvertToMiddlewares(middleware, httpConfig.GlobalMiddlewares...),
            router.Middlewares()...,
        )
        return NewEngine(provider.app, router, middlewares, httpConfig)
    })

    for _, collector := range provider.RouteCollectors {
        provider.app.Call(collector)
    }
}

func (provider *HttpServiceProvider) Start() error {
    var err error

    provider.app.Call(func(
        router contracts.HttpRouter,
        engine contracts.HttpEngine,
        config contracts.Config,
    ) {
        httpConfig := config.Get("http").(Config)

        err = router.Mount()
        if err != nil {
            return
        }

        address := utils.StringOr(
            httpConfig.Address,
            fmt.Sprintf("%s:%s", httpConfig.Host, utils.StringOr(httpConfig.Port, "8000")),
        )
        err = engine.Start(address)
    })

    return err
}

func (provider *HttpServiceProvider) Stop() {
    provider.app.Call(func(engine contracts.HttpEngine) {
        _ = engine.Close()
    })
}
```

在这个例子中：

- `Register` 通过容器注册 HttpMiddleware、HttpRouter、HttpEngine 等核心依赖，并执行路由收集器
- `Start` 通过容器解析依赖，从配置中获取地址，挂载路由并启动 HttpEngine
- `Stop` 通过容器解析 HttpEngine 并关闭 HTTP 服务

## 应用中的服务提供者

在应用初始化阶段，你可以一次性注册所有需要的服务提供者：

```go
app.RegisterServices(
    config.NewService(env, configProviders),
    database.NewService(),
    queue.NewService(true),
    http.NewService(routes...),
)
```

这种方式有几个好处：

- 模块边界清晰：每个服务提供者只关心一个模块
- 生命周期清晰：可以在 `Start` / `Stop` 中管理资源
- 测试方便：可以在测试中替换或只注册部分服务提供者

## 自定义服务提供者

当你需要为自己的业务模块（如 `Order`、`Billing`、`Notification`）提供统一的初始化入口时，可以编写自定义服务提供者：

```go
type OrderServiceProvider struct{}

func NewOrderService() contracts.ServiceProvider {
    return &OrderServiceProvider{}
}

func (provider *OrderServiceProvider) Register(app contracts.Application) {
    app.Singleton("order.repo", func() contracts.OrderRepository {
        return NewOrderRepository(app.Get("db").(contracts.DB))
    })
}

func (provider *OrderServiceProvider) Start() error {
    return nil
}

func (provider *OrderServiceProvider) Stop() {}
```

然后在应用启动时注册它：

```go
app.RegisterServices(NewOrderService())
```

## 与其他模块的关系

服务提供者通常会与以下模块紧密合作：

- 服务容器：用于注册和解析依赖
- 配置模块：从配置中读取连接信息、开关等
- 日志模块：在 `Start` / `Stop` 中记录关键日志

通过服务提供者，你可以为自己的业务构建清晰的模块边界和稳定的初始化流程。
