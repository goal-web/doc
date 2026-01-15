# Package utils



## Functions

### func AllDirectories

```go
func AllDirectories(
```

AllDirectories 获取一个目录下的所有目录


### func AllFiles

```go
func AllFiles(
```

AllFiles 获取一个目录下的所有文件


### func CamelString

```go
func CamelString(
```

CamelString 驼峰


### func Compare

```go
func Compare(
```



### func CopyFile

```go
func CopyFile(
```

CopyFile 复制一个文件


### func DefaultBool

```go
func DefaultBool(
```



### func DefaultDuration

```go
func DefaultDuration(
```



### func DefaultError

```go
func DefaultError(
```



### func DefaultException

```go
func DefaultException(
```



### func DefaultFields

```go
func DefaultFields(
```



### func DefaultFloat

```go
func DefaultFloat(
```



### func DefaultFloat64

```go
func DefaultFloat64(
```



### func DefaultInt

```go
func DefaultInt(
```



### func DefaultInt64

```go
func DefaultInt64(
```



### func DefaultInterface

```go
func DefaultInterface(
```



### func DefaultString

```go
func DefaultString(
```



### func DefaultTime

```go
func DefaultTime(
```



### func DefaultUint

```go
func DefaultUint(
```



### func DefaultUint64

```go
func DefaultUint64(
```



### func DefaultValue

```go
func DefaultValue(
```



### func EachMap

```go
func EachMap(
```

EachMap 遍历任意 map


### func EachSlice

```go
func EachSlice(
```

EachSlice 遍历任意 slice 或者 array


### func EachStructField

```go
func EachStructField(
```

EachStructField 遍历结构体的字段


### func ExceptFields

```go
func ExceptFields(
```

ExceptFields 只获取指定 key 以外的数据


### func ExistsPath

```go
func ExistsPath(
```



### func FieldKeys

```go
func FieldKeys(
```



### func FileExists

```go
func FileExists(
```

FileExists 文件是否存在


### func Flatten

```go
func Flatten(
```



### func GetBoolField

```go
func GetBoolField(
```

GetBoolField 获取 ToFields 中的 bool，会尝试转换类型


### func GetCallable

```go
func GetCallable(
```



### func GetFloat64Field

```go
func GetFloat64Field(
```

GetFloat64Field 获取 ToFields 中的 float64，会尝试转换类型


### func GetFloatField

```go
func GetFloatField(
```

GetFloatField 获取 ToFields 中的 float32，会尝试转换类型


### func GetInt64Field

```go
func GetInt64Field(
```

GetInt64Field 获取 ToFields 中的 int64，会尝试转换类型


### func GetIntField

```go
func GetIntField(
```

GetIntField 获取 ToFields 中的 int，会尝试转换类型


### func GetMapKeys

```go
func GetMapKeys(
```

GetMapKeys 获取 ToFields 的所有 key


### func GetStringField

```go
func GetStringField(
```

GetStringField 获取 ToFields 中的字符串，会尝试转换类型


### func GetSubField

```go
func GetSubField(
```

GetSubField 获取下级 ToFields ，如果没有的话，匹配同前缀的放到下级 ToFields 中


### func GetTypeKey

```go
func GetTypeKey(
```

GetTypeKey 获取类型唯一字符串


### func Hash

```go
func Hash(
```



### func IfString

```go
func IfString(
```

IfString 类似三目运算


### func Ifi

```go
func Ifi(
```

Ifi 类似三目运算，返回第一个不是 nil 的值


### func IntOr

```go
func IntOr(
```

IntOr 尽量不返回0值


### func IsArray

```go
func IsArray(
```

IsArray 是否是数组或者 slice


### func IsEqual

```go
func IsEqual(
```

IsEqual 等于 =


### func IsGt

```go
func IsGt(
```

IsGt 大于 >


### func IsGte

```go
func IsGte(
```

IsGte 大于等于


### func IsIn

```go
func IsIn(
```

IsIn 存在 in


### func IsInT

```go
func IsInT(
```



### func IsInstanceIn

```go
func IsInstanceIn(
```

IsInstanceIn InstanceIn 判断变量是否是某些类型


### func IsLt

```go
func IsLt(
```

IsLt 小于 <


### func IsLte

```go
func IsLte(
```

IsLte 小于等于 <=


### func IsNotIn

```go
func IsNotIn(
```

IsNotIn 不存在 not in


### func IsNotInT

```go
func IsNotInT(
```



### func IsSameStruct

```go
func IsSameStruct(
```

IsSameStruct 判断是否同一个结构体


### func JoinFloat64Array

```go
func JoinFloat64Array(
```

JoinFloat64Array 连接 float64 数组，类似 strings.Join


### func JoinFloatArray

```go
func JoinFloatArray(
```

JoinFloatArray 连接 float32 数组，类似 strings.Join


### func JoinInt64Array

```go
func JoinInt64Array(
```

JoinInt64Array 连接 int64 数组，类似 strings.Join


### func JoinIntArray

```go
func JoinIntArray(
```

JoinIntArray 连接 int 数组，类似 strings.Join


### func JoinInterfaceArray

```go
func JoinInterfaceArray(
```

JoinInterfaceArray 连接 interface 数组，类似 strings.Join


### func JoinStringerArray

```go
func JoinStringerArray(
```

JoinStringerArray 连接fmt.Stringer数组，类似 strings.Join


### func LoadEnv

```go
func LoadEnv(
```

LoadEnv 加载 .env 文件


### func MakeKeysMap

```go
func MakeKeysMap(
```



### func MakeSymbolArray

```go
func MakeSymbolArray(
```

MakeSymbolArray 创建一个有指定字符组成的数组


### func Md5

```go
func Md5(
```

Md5 生成 md5 字符串


### func MergeFields

```go
func MergeFields(
```

MergeFields 合并两个 contracts.Fields


### func NoPanic

```go
func NoPanic(
```



### func NotNil

```go
func NotNil(
```

NotNil 尽量不要 nil


### func OnlyExistsFields

```go
func OnlyExistsFields(
```

OnlyExistsFields 只获取指定 key ，不存在或者 nil 则忽略


### func OnlyFields

```go
func OnlyFields(
```

OnlyFields 只获取指定 key 的数据


### func ParseStructTag

```go
func ParseStructTag(
```

ParseStructTag 解析结构体的tag


### func RandInt

```go
func RandInt(
```



### func RandIntArray

```go
func RandIntArray(
```



### func RandIntBySeed

```go
func RandIntBySeed(
```



### func RandStr

```go
func RandStr(
```

RandStr 生成随机字符串


### func RandomStringBySeed

```go
func RandomStringBySeed(
```

RandomStringBySeed 根据种子生成确定性的随机字符串
seed: 随机种子（相同种子生成相同结果）
length: 字符串长度
charset: 可选字符集（默认包含大小写字母和数字）


### func SetInterval

```go
func SetInterval(
```

SetInterval 设置一个定时器，类似 js 的 SetInterval，返回一个用于关闭该定时器的通道


### func SnakeString

```go
func SnakeString(
```

SnakeString 蛇形字符串


### func StringArray2InterfaceArray

```go
func StringArray2InterfaceArray(
```

StringArray2InterfaceArray 把字符串数组转成 any 数组


### func StringOr

```go
func StringOr(
```

StringOr 尽量不返回空字符串


### func SubString

```go
func SubString(
```

SubString 切割字符串


### func ToBool

```go
func ToBool(
```

ToBool 把能转换成 bool 的值转换成 bool


### func ToFields

```go
func ToFields(
```

ToFields 尝试把一个变量转换成 ToFields 类型


### func ToFloat

```go
func ToFloat(
```

ToFloat 把能转换成 float32 的值转换成 float32


### func ToFloat64

```go
func ToFloat64(
```

ToFloat64 把能转换成 float64 的值转换成 float64


### func ToInt

```go
func ToInt(
```

ToInt 把能转换成 int 的值转换成 int


### func ToInt16

```go
func ToInt16(
```

ToInt16 把能转换成 int 的值转换成 int


### func ToInt32

```go
func ToInt32(
```

ToInt32 把能转换成 int 的值转换成 int


### func ToInt64

```go
func ToInt64(
```

ToInt64 把能转换成 int64 的值转换成 int64


### func ToInt8

```go
func ToInt8(
```

ToInt8 把能转换成 int 的值转换成 int


### func ToString

```go
func ToString(
```

ToString 把能转换成 string 的值转换成 string


### func ToTypes

```go
func ToTypes(
```

ToTypes 把变量转换成反射类型


### func ToUInt

```go
func ToUInt(
```

uint


### func ToUInt16

```go
func ToUInt16(
```

uint


### func ToUInt32

```go
func ToUInt32(
```

uint


### func ToUInt64

```go
func ToUInt64(
```

uint


### func ToUInt8

```go
func ToUInt8(
```

uint


### func ToValue

```go
func ToValue(
```

ToValue 把 interface 转换成指定类型的 reflect.Value


## Types

### type CompareHandler



