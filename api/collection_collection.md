# Package collection



## Functions

### func Collect

```go
func Collect(
```



### func New

```go
func New(
```



### func NewCollect

```go
func NewCollect(
```



## Types

### type Collection



#### func (Collection) Avg



#### func (Collection) Chunk



#### func (Collection) Count



#### func (Collection) Each

Each 遍历并且返回新的集合


#### func (Collection) Filter

Filter 过滤不需要的数据 filter 返回 true 时保留


#### func (Collection) First



#### func (Collection) Foreach

Foreach 遍历


#### func (Collection) GroupBy



#### func (Collection) Index



#### func (Collection) IsEmpty



#### func (Collection) Last



#### func (Collection) Len



#### func (Collection) Less



#### func (Collection) Map



#### func (Collection) Max



#### func (Collection) Merge



#### func (Collection) Min



#### func (Collection) Offset



#### func (Collection) Only



#### func (Collection) Pluck



#### func (Collection) Prepend



#### func (Collection) Pull



#### func (Collection) Push



#### func (Collection) Put



#### func (Collection) Random



#### func (Collection) Reverse



#### func (Collection) SafeAvg

SafeAvg struct 或者 map 情况下需要传 key


#### func (Collection) SafeMax

SafeMax struct 或者 map 情况下需要传 key


#### func (Collection) SafeMin

SafeMin struct 或者 map 情况下需要传 key


#### func (Collection) SafeSum

SafeSum struct 或者 map 情况下需要传 key


#### func (Collection) SetSorter



#### func (Collection) Shift



#### func (Collection) Skip

Skip 过滤不需要的数据 skipper 返回 true 时过滤


#### func (Collection) Sort

Sort sorter 必须是接收两个参数，并且返回一个 bool 值的函数


#### func (Collection) String



#### func (Collection) Sum



#### func (Collection) Swap



#### func (Collection) ToAnyArray



#### func (Collection) ToArray



#### func (Collection) ToArrayFields



#### func (Collection) ToFields



#### func (Collection) ToJson



#### func (Collection) Where

Where 根据条件过滤数据，支持 =,>,>=,<,<=,in,not in 等条件判断


#### func (Collection) WhereGt



#### func (Collection) WhereGte



#### func (Collection) WhereIn



#### func (Collection) WhereLt



#### func (Collection) WhereLte



#### func (Collection) WhereNotIn



### type Exception



#### func (Exception) Error



#### func (Exception) GetPrevious



### type MapException

MapException 遍历参数异常


### type SortException

SortException 排序参数异常


