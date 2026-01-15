# Package config



## Functions

### func BoolOptional

```go
func BoolOptional(
```



### func Default

```go
func Default(
```

Default 返回配置单例。仅在首次调用时从默认应用中获取并缓存。


### func EncryptionCommand

```go
func EncryptionCommand(
```

EncryptionCommand 返回用于加密/解密环境文件的 CLI 命令与处理器。
支持指定驱动与密钥，不指定密钥时自动生成并在日志中输出。


### func Float64Optional

```go
func Float64Optional(
```



### func FloatOptional

```go
func FloatOptional(
```



### func Get

```go
func Get(
```

Get 按点号路径获取配置值（如 "app.debug"）。


### func GetBool

```go
func GetBool(
```



### func GetFloat

```go
func GetFloat(
```



### func GetFloat64

```go
func GetFloat64(
```



### func GetInt

```go
func GetInt(
```



### func GetInt16

```go
func GetInt16(
```



### func GetInt32

```go
func GetInt32(
```



### func GetInt64

```go
func GetInt64(
```



### func GetInt8

```go
func GetInt8(
```



### func GetString

```go
func GetString(
```



### func GetUInt

```go
func GetUInt(
```



### func GetUInt16

```go
func GetUInt16(
```



### func GetUInt32

```go
func GetUInt32(
```



### func GetUInt64

```go
func GetUInt64(
```



### func GetUInt8

```go
func GetUInt8(
```



### func Int16Optional

```go
func Int16Optional(
```



### func Int32Optional

```go
func Int32Optional(
```



### func Int64Optional

```go
func Int64Optional(
```



### func Int8Optional

```go
func Int8Optional(
```



### func IntOptional

```go
func IntOptional(
```



### func New

```go
func New(
```

New 创建一个配置实例，基于给定的环境源与模块提供器。
并发安全：写入使用写锁，读取使用读锁；环境值在未设置字段时作为后备。


### func NewDotEnv

```go
func NewDotEnv(
```

NewDotEnv 创建基于 DotEnv（键值对）数据源的环境读取器。
支持从本地文件或远程地址加载，OS 环境变量优先级最高。


### func NewService

```go
func NewService(
```

NewService 创建配置服务提供器，将 env 与各模块配置提供器注册到应用。


### func NewToml

```go
func NewToml(
```

NewToml 创建基于 TOML 数据源的环境读取器。
多个数据源将按顺序合并，后者可覆盖前者同名键。


### func NewYaml

```go
func NewYaml(
```

NewYaml 创建基于 YAML 数据源的环境读取器。
多个数据源将按顺序合并，后者可覆盖前者同名键。


### func Optional

```go
func Optional(
```



### func Reload

```go
func Reload(
```

Reload 重新计算并加载所有已注册的配置提供器（文件/URL/环境）。


### func Set

```go
func Set(
```

Set 设置或覆盖一个配置键的值，线程安全。


### func StringOptional

```go
func StringOptional(
```



### func ToEnvKey

```go
func ToEnvKey(
```

ToEnvKey 将 key 转换为大写，并将 . 替换为 _


### func UInt16Optional

```go
func UInt16Optional(
```



### func UInt32Optional

```go
func UInt32Optional(
```



### func UInt64Optional

```go
func UInt64Optional(
```



### func UInt8Optional

```go
func UInt8Optional(
```



### func UIntOptional

```go
func UIntOptional(
```



### func Unset

```go
func Unset(
```

Unset 删除指定配置键。


### func WithFields

```go
func WithFields(
```

WithFields 以已有字段初始化一个配置实例，常用于测试或注入默认值。


## Types

### type EnvProvider



