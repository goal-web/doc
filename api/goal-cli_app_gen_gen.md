# Package gen



## Functions

### func AddHeaderAndFormatFiles

```go
func AddHeaderAndFormatFiles(
```

AddHeaderAndFormatFiles 给文件数组中的每个文件添加头部注释、移除未使用的引用，并格式化代码
参数:
- files: 文件路径数组，表示需要处理的文件列表
- headerComment: 需要添加的文件头部注释内容


### func CapitalizeFirstLetter

```go
func CapitalizeFirstLetter(
```

CapitalizeFirstLetter 将单词的首字母大写


### func ConvertCamelToSnake

```go
func ConvertCamelToSnake(
```

ConvertCamelToSnake converts a string from CamelCase to snake_case


### func ConvertFunc

```go
func ConvertFunc(
```



### func DBType

```go
func DBType(
```



### func ExtractServices

```go
func ExtractServices(
```



### func GenEnums

```go
func GenEnums(
```



### func GenMessages

```go
func GenMessages(
```



### func GenRouter

```go
func GenRouter(
```

GenRouter 通过指定的 importPath 和 usage 动态修改指定 Go 文件中的路由注册函数


### func GenRouters

```go
func GenRouters(
```



### func GenService

```go
func GenService(
```



### func GenServices

```go
func GenServices(
```

GenServices 生成 service 代码


### func GetComment

```go
func GetComment(
```



### func GetIndexComment

```go
func GetIndexComment(
```



### func GetModuleNameAndDir

```go
func GetModuleNameAndDir(
```

GetModuleNameAndDir 获取模块名和模块根目录


### func GetTemplate

```go
func GetTemplate(
```



### func GoType

```go
func GoType(
```

GoType 将 Proto 类型映射为 Go 类型


### func HasComment

```go
func HasComment(
```



### func HasMsgComment

```go
func HasMsgComment(
```



### func IsBasicType

```go
func IsBasicType(
```



### func Last

```go
func Last(
```



### func NotContains

```go
func NotContains(
```

NotContains 返回 true，如果字符串中不包含指定的子串


### func ParseProto

```go
func ParseProto(
```



### func Pro

```go
func Pro(
```



### func SDK

```go
func SDK(
```



### func SDKEnums

```go
func SDKEnums(
```



### func SDKMessages

```go
func SDKMessages(
```



### func SDKServices

```go
func SDKServices(
```

SDKServices 生成 service 代码


### func StringJoin

```go
func StringJoin(
```



### func Sub

```go
func Sub(
```



### func SubString

```go
func SubString(
```

SubString 切割字符串


### func ToCamelCase

```go
func ToCamelCase(
```

ToCamelCase 将字符串转换为大写开头的驼峰命名（PascalCase）


### func ToComments

```go
func ToComments(
```



### func ToMiddlewares

```go
func ToMiddlewares(
```



### func ToSnakeCase

```go
func ToSnakeCase(
```

ToSnakeCase 将驼峰命名转换为蛇形命名


### func ToTags

```go
func ToTags(
```

ToTags 生成 tag


### func TsType

```go
func TsType(
```

TsType 将 Proto 类型映射为 typescript 类型


## Types

### type Enum



### type EnumValue



### type ExtractServiceTemp



### type Field



### type Import



### type Message



### type Method



### type Proto

Proto 数据结构定义


### type RouterCollector



### type Service



