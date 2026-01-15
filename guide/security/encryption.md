# 加密与哈希

## 简介

在安全设计中，要区分“可逆加密”（Encryption）与“不可逆哈希”（Hashing）：

- **哈希**：用于密码等敏感数据的存储，无法从哈希值恢复原文
- **加密**：用于需要日后解密的场景（如加密某些配置或临时令牌）

Goal-Web 提供 `hashing` 模块帮助你安全地生成和验证密码哈希。

## 使用 hashing 组件存储密码

`hashing` 包提供了简单的全局函数，也可以通过依赖注入使用工厂。

### 通过全局函数使用

```go
import "github.com/goal-web/hashing"

func RegisterUser(password string) error {
	// 生成密码哈希
	hash := hashing.Make(password)

	// 将 hash 存入数据库，而不是明文密码
	_ = hash

	return nil
}
```

### 校验密码

登录时不应直接比对明文，而是将用户输入与已存储哈希进行匹配：

```go
func CheckPassword(input, storedHash string) bool {
	return hashing.Check(input, storedHash)
}
```

### 在控制器中结合认证使用

结合认证文档中的示例，推荐的登录逻辑类似：

```go
func (controller *AuthController) Login(request contracts.HttpRequest, auth contracts.Auth) contracts.HttpResponse {
	validation.Verify(request, contracts.Fields{
		"email":    "required|email",
		"password": "required",
	})

	email := request.Input("email")
	password := request.Input("password")

	userProvider := auth.UserProvider("users")
	user := userProvider.RetrieveById(email)
	if user == nil {
		return http.Unauthorized("Invalid credentials")
	}

	// 假设 user.GetAuthenticatableKey() 或其它字段中存的是密码哈希
	if !hashing.Check(password, user.GetAuthenticatableKey()) {
		return http.Unauthorized("Invalid credentials")
	}

	auth.Guard("web", request).Login(user)

	return http.Redirect("/dashboard")
}
```

## 自定义哈希驱动

`hashing.Factory` 支持扩展不同的哈希算法，你可以在服务提供者中注册新的驱动：

```go
package providers

import (
	"github.com/goal-web/contracts"
	"github.com/goal-web/hashing"
)

type HashServiceProvider struct{}

func (provider *HashServiceProvider) Register(app contracts.Application) {
}

func (provider *HashServiceProvider) Start() error {
	factory := hashing.Default()

	factory.Extend("custom", func() hashing.Driver {
		// 返回自定义 Driver 实现
		return hashing.Bcrypt{}
	})

	return nil
}

func (provider *HashServiceProvider) Stop() {}
```

然后在配置中将默认驱动改为 `custom` 即可。

## 加密敏感数据的建议

虽然当前框架更偏重哈希模块，对于真正需要“可逆加密”的场景，建议：

- 使用成熟、经过审计的加密库（如基于 AES-GCM 的实现）
- 将加密密钥放在安全的配置管理或环境变量中，而不是写入代码仓库
- 对需要长期存储的机密信息使用“分层密钥”：应用只掌握二级密钥，一级密钥由专用的 KMS（如云厂商密钥管理服务）管理

## 最佳实践

- 永远不要以明文形式存储密码
- 不在日志中记录密码或完整的敏感字段值
- 为不同用途的 Token 使用不同的密钥或哈希前缀
- 定期轮换密钥或提高哈希成本参数（如 bcrypt cost）

