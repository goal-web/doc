# Package auth

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。

Package auth provides authentication functionality and singleton access.
包 auth 提供认证功能和单例访问。


## Functions

### func Default

```go
func Default(
```

Default returns the singleton instance of the auth service.
Default 返回认证服务的单例实例。


### func ExtendGuard

```go
func ExtendGuard(
```

ExtendGuard extends the guard with a custom driver.
ExtendGuard 使用自定义驱动扩展守卫。


### func ExtendUserProvider

```go
func ExtendUserProvider(
```

ExtendUserProvider extends the user provider with a custom driver.
ExtendUserProvider 使用自定义驱动扩展用户提供者。


### func GetGuard

```go
func GetGuard(
```

GetGuard returns the authentication guard with the given name.
GetGuard 返回指定名称的认证守卫。


### func Guard

```go
func Guard(
```

Guard creates a middleware that checks authentication using the specified guards.
Guard 创建使用指定守卫检查认证的中间件。


### func GuestMiddleware

```go
func GuestMiddleware(
```

GuestMiddleware ensures that the user is a guest (not authenticated).
GuestMiddleware 确保用户是访客（未认证）。


### func Middleware

```go
func Middleware(
```

Middleware ensures that the user is authenticated.
Middleware 确保用户已认证。


### func NewService

```go
func NewService(
```

NewService creates a new instance of the auth service provider.
NewService 创建认证服务提供者的新实例。


### func UserProvider

```go
func UserProvider(
```

UserProvider returns the user provider with the given name.
UserProvider 返回指定名称的用户提供者。


## Types

### type Auth

Auth implements the authentication service interface.
Auth 实现认证服务接口。


#### func (Auth) ExtendGuard

ExtendGuard registers a custom guard driver.
ExtendGuard 注册自定义守卫驱动。


#### func (Auth) ExtendUserProvider

ExtendUserProvider registers a custom user provider driver.
ExtendUserProvider 注册自定义用户提供者驱动。


#### func (Auth) Guard

Guard returns an authentication guard instance with the given name.
Guard 返回指定名称的认证守卫实例。


#### func (Auth) UserProvider

UserProvider returns a user provider instance with the given name.
UserProvider 返回指定名称的用户提供者实例。


### type Config

Config holds authentication configuration.
Config 保存认证配置。


### type Defaults

Defaults holds default configuration values for authentication.
Defaults 保存认证的默认配置值。


### type GuardException

GuardException represents an error related to authentication guards.
GuardException 表示与认证守卫相关的错误。


### type UserProviderException

UserProviderException represents an error related to user providers.
UserProviderException 表示与用户提供者相关的错误。


