# Package querybuilder



## Functions

### func FromQuery

```go
func FromQuery(
```



### func FromSub

```go
func FromSub(
```



### func JoinStringerArray

```go
func JoinStringerArray(
```



### func JoinSubStringerArray

```go
func JoinSubStringerArray(
```



### func New

```go
func New(
```



## Types

### type Builder



#### func (Builder) AddSelect



#### func (Builder) AddSelectSub



#### func (Builder) Bind



#### func (Builder) CreateSql



#### func (Builder) DeleteSql



#### func (Builder) Distinct



#### func (Builder) From



#### func (Builder) FromMany



#### func (Builder) FromSub



#### func (Builder) FullJoin



#### func (Builder) FullOutJoin



#### func (Builder) GetBindings



#### func (Builder) GetTableName



#### func (Builder) GetWith



#### func (Builder) GroupBy



#### func (Builder) Having



#### func (Builder) InRandomOrder



#### func (Builder) InsertIgnoreSql



#### func (Builder) InsertReplaceSql



#### func (Builder) InsertSql



#### func (Builder) Join



#### func (Builder) JoinSub



#### func (Builder) LeftJoin



#### func (Builder) Limit



#### func (Builder) Offset



#### func (Builder) OrHaving



#### func (Builder) OrWhere



#### func (Builder) OrWhereBetween



#### func (Builder) OrWhereExists



#### func (Builder) OrWhereExistsRaw



#### func (Builder) OrWhereFunc



#### func (Builder) OrWhereIn



#### func (Builder) OrWhereIsNull



#### func (Builder) OrWhereNotBetween



#### func (Builder) OrWhereNotExists



#### func (Builder) OrWhereNotIn



#### func (Builder) OrWhereNotNull



#### func (Builder) OrWhereRaw



#### func (Builder) OrderBy



#### func (Builder) OrderByDesc



#### func (Builder) RightJoin



#### func (Builder) Select



#### func (Builder) SelectForUpdateSql



#### func (Builder) SelectSql



#### func (Builder) SelectSub



#### func (Builder) Skip



#### func (Builder) Take



#### func (Builder) ToSql



#### func (Builder) Union



#### func (Builder) UnionAll



#### func (Builder) UnionAllByProvider



#### func (Builder) UnionByProvider



#### func (Builder) UpdateSql



#### func (Builder) When



#### func (Builder) Where



#### func (Builder) WhereBetween

WhereBetween args 参数可以是整数、浮点数、字符串、any 等类型的数组，或者用` and `隔开的字符串，或者在源码中了解更多 https://github.com/goal-web/querybuilder/blob/78bcc832604bfcdb68579e3dd1441796a16994cf/builder.go#L74


#### func (Builder) WhereExists



#### func (Builder) WhereExistsRaw



#### func (Builder) WhereFields



#### func (Builder) WhereFunc



#### func (Builder) WhereIn

WhereIn args 参数可以是整数、浮点数、字符串、any 等类型的数组，或者用` and `隔开的字符串，或者在源码中了解更多 https://github.com/goal-web/querybuilder/blob/78bcc832604bfcdb68579e3dd1441796a16994cf/builder.go#L74


#### func (Builder) WhereIsNull



#### func (Builder) WhereNotBetween



#### func (Builder) WhereNotExists



#### func (Builder) WhereNotIn



#### func (Builder) WhereNotNull



#### func (Builder) WhereRaw



#### func (Builder) With



#### func (Builder) WithAvg



#### func (Builder) WithCount



#### func (Builder) WithMax



#### func (Builder) WithMin



#### func (Builder) WithPagination



#### func (Builder) WithSum



### type Expression



### type GroupBy



#### func (GroupBy) IsEmpty



#### func (GroupBy) String



### type Join



#### func (Join) String



### type Joins



#### func (Joins) IsEmpty



#### func (Joins) String



### type OrderBy



### type OrderByFields



#### func (OrderByFields) IsEmpty



#### func (OrderByFields) String



### type ParamException



#### func (ParamException) Error



#### func (ParamException) GetPrevious



### type Unions



#### func (Unions) IsEmpty



#### func (Unions) String



### type Where



#### func (Where) String



### type Wheres



#### func (Wheres) IsEmpty



#### func (Wheres) String



