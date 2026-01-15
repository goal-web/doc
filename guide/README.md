# Goal-Web 框架文档

欢迎使用 Goal-Web 框架！这是一个用 Go 语言编写的高性能、易于使用的 Web 应用开发框架，设计理念借鉴了 PHP 的 Laravel 框架，为 Go 开发者提供了优雅、简洁的 API。

## 关于 Goal-Web

Goal-Web 是一个全功能的 Web 框架，专为构建现代、可靠的 Web 应用而设计。它提供了丰富的功能和工具，帮助开发者快速构建从简单到复杂的各类应用。

### 主要特点

- **模块化设计**：框架被分割成多个独立的模块，可以根据需要单独使用
- **依赖注入容器**：强大的服务容器，便于管理应用依赖
- **优雅的路由系统**：简洁而灵活的 HTTP 路由定义
- **中间件支持**：可组合的请求处理管道
- **数据库抽象层**：简化数据库操作的查询构建器和 ORM
- **认证与授权**：内置用户认证和权限控制系统
- **缓存系统**：支持多种缓存驱动
- **事件系统**：应用内的事件分发与处理
- **队列服务**：处理后台任务和延迟作业

## 文档结构

本文档分为以下几个主要部分：

1. **[前言](./prologue/release-notes)**：包含发布说明、升级指南和贡献指南
2. **[入门指南](./getting-started/installation)**：安装、目录结构、配置和部署
3. **[核心架构](./architecture/service-container)**：服务容器、应用生命周期、服务提供者和门面模式
4. **[基础功能](./basics/routing)**：路由、中间件、控制器、请求、响应、视图、验证、错误处理和日志
5. **[前端开发](./frontend/templates)**：模板和资源管理
6. **[安全相关](./security/authentication)**：认证、授权、加密和 CSRF 防护
7. **[数据库](./database/getting-started)**：数据库操作、查询构建器、迁移和数据填充
8. **[ORM](./orm/getting-started)**：对象关系映射、关联关系、集合、修改器和序列化
9. **[测试相关](./testing/getting-started)**：单元测试、HTTP 测试和模拟
10. **[深入了解](./digging-deeper/cache)**：缓存、事件、队列和任务调度
11. **[微服务](./microservices/introduction)**：微服务架构和服务发现
12. **[部署与优化](./deployment/server-requirements)**：服务器要求和性能优化

## 开始使用

如果你是第一次使用 Goal-Web 框架，我们建议你从[安装指南](./getting-started/installation.md)开始，然后阅读[目录结构](./getting-started/directory-structure.md)和[配置](./getting-started/configuration.md)文档。

## 贡献

Goal-Web 是一个开源项目，我们欢迎并感谢任何形式的贡献。如果你想为框架做出贡献，请阅读[贡献指南](./prologue/contribution-guide.md)。

## 许可证

Goal-Web 框架是在 MIT 许可证下发布的开源软件。