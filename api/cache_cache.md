# Package cache

Package cache provides caching functionality and singleton access.
包 cache 提供缓存功能和单例访问。

Package cache provides caching functionality and singleton access.
包 cache 提供缓存功能和单例访问。

Package cache provides caching functionality and singleton access.
包 cache 提供缓存功能和单例访问。

Package cache provides caching functionality and singleton access.
包 cache 提供缓存功能和单例访问。

Package cache provides caching functionality and singleton access.
包 cache 提供缓存功能和单例访问。


## Functions

### func Add

```go
func Add(
```

Add adds a value to the cache with an expiration time if it doesn't exist.
Add 如果不存在则将带过期时间的值添加到缓存中。


### func CacheGet

```go
func CacheGet(
```

CacheGet retrieves a value from the cache by key.
CacheGet 根据键从缓存中获取值。


### func Decrement

```go
func Decrement(
```

Decrement decrements the value of the given key by the given value.
Decrement 按给定值减少指定键的值。


### func Default

```go
func Default(
```

Default returns the singleton instance of the cache factory.
Default 返回缓存工厂的单例实例。


### func Extend

```go
func Extend(
```

Extend registers a custom cache store provider.
Extend 注册自定义缓存存储提供者。


### func Flush

```go
func Flush(
```

Flush flushes all values from the cache.
Flush 清空缓存中的所有值。


### func Forever

```go
func Forever(
```

Forever puts a value to the cache without expiration time.
Forever 将无过期时间的值放入缓存中。


### func Forget

```go
func Forget(
```

Forget removes a value from the cache by key.
Forget 根据键从缓存中删除值。


### func GetPrefix

```go
func GetPrefix(
```

GetPrefix returns the cache key prefix.
GetPrefix 返回缓存键前缀。


### func Increment

```go
func Increment(
```

Increment increments the value of the given key by the given value.
Increment 按给定值增加指定键的值。


### func Many

```go
func Many(
```

Many retrieves multiple values from the cache by keys.
Many 根据键列表从缓存中获取多个值。


### func NewService

```go
func NewService(
```

NewService creates a new instance of the cache service provider.
NewService 创建缓存服务提供者的新实例。


### func Pull

```go
func Pull(
```

Pull retrieves and removes a value from the cache by key.
Pull 根据键从缓存中获取并删除值。


### func Put

```go
func Put(
```

Put puts a value to the cache with an expiration time.
Put 将带过期时间的值放入缓存中。


### func PutMany

```go
func PutMany(
```

PutMany puts multiple values to the cache with an expiration time.
PutMany 将多个带过期时间的值放入缓存中。


### func Remember

```go
func Remember(
```

Remember retrieves a value from the cache or executes the callback to set it.
Remember 从缓存中获取值，如果不存在则执行回调函数设置值。


### func RememberForever

```go
func RememberForever(
```

RememberForever retrieves a value from the cache or executes the callback to set it without expiration.
RememberForever 从缓存中获取值，如果不存在则执行回调函数设置值，无过期时间。


### func Store

```go
func Store(
```

Store returns a cache store instance with the given name.
Store 返回指定名称的缓存存储实例。


## Types

### type Config

Config holds cache configuration.
Config 保存缓存配置。


### type DriverException

DriverException represents an error in the cache module drivers.
DriverException 表示缓存模块驱动中的错误。


