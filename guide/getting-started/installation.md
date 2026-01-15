# 安装

## 环境要求

在开始使用 Goal-Web 框架之前，请确保您的环境满足以下要求：

- Go 1.16 或更高版本
- Git

## 通过 Go 模块安装

Goal-Web 框架使用 Go 模块进行依赖管理。您可以通过以下步骤创建一个新的 Goal-Web 项目：

### 1. 创建项目目录

```bash
mkdir my-goal-app
cd my-goal-app
```

### 2. 初始化 Go 模块

```bash
go mod init github.com/yourusername/my-goal-app
```

### 3. 安装 Goal-Web 框架

```bash
go get -u github.com/goal-web/goal
```

## 使用脚手架创建项目

Goal-Web 提供了一个脚手架工具，可以帮助您快速创建一个新的项目，包含了基本的目录结构和配置文件。

### 1. 安装 Goal-CLI 工具

```bash
go install github.com/goal-web/goal-cli@latest
```

### 2. 创建新项目

```bash
goal-cli new my-goal-app
```

这个命令会创建一个包含完整目录结构的新项目。

### 3. 进入项目目录

```bash
cd my-goal-app
```

### 4. 启动开发服务器

```bash
go run main.go serve
```

现在，您可以通过访问 `http://localhost:8008` 来查看您的应用。

## 目录结构

安装完成后，您将看到一个基本的目录结构。关于目录结构的详细说明，请参阅[目录结构](./directory-structure.md)文档。

## 配置

Goal-Web 框架使用 TOML、YAML 或 .env 文件进行配置。默认情况下，配置文件位于项目根目录下的 `env.toml` 文件中。关于配置的详细说明，请参阅[配置](./configuration.md)文档。

## 下一步

现在您已经成功安装了 Goal-Web 框架，您可以：

- 了解[目录结构](./directory-structure.md)
- 学习如何[配置](./configuration.md)您的应用
- 探索[路由系统](../basics/routing.md)
- 了解[控制器](../basics/controllers.md)的使用方法