# Package database

Package database provides database functionality and singleton access.
包 database 提供数据库功能和单例访问。


## Functions

### func Begin

```go
func Begin(
```

Begin starts a new database transaction.
Begin 开始新的数据库事务。


### func Connection

```go
func Connection(
```

Connection returns a database connection instance with the given name.
Connection 返回指定名称的数据库连接实例。


### func Default

```go
func Default(
```

Default returns the singleton instance of the database factory.
Default 返回数据库工厂的单例实例。


### func DriverName

```go
func DriverName(
```

DriverName returns the name of the database driver.
DriverName 返回数据库驱动的名称。


### func Exec

```go
func Exec(
```

Exec executes a query without returning results.
Exec 执行不返回结果的查询。


### func Extend

```go
func Extend(
```

Extend registers a custom database connector.
Extend 注册自定义数据库连接器。


### func GetQuery

```go
func GetQuery(
```

GetQuery executes a query to get a single result.
GetQuery 执行查询以获取单个结果。


### func NewFactory

```go
func NewFactory(
```



### func NewService

```go
func NewService(
```



### func Query

```go
func Query(
```

Query executes a query and returns a collection of results.
Query 执行查询并返回结果集合。


### func Select

```go
func Select(
```

Select executes a select query and fills the destination with results.
Select 执行选择查询并将结果填充到目标中。


### func Transaction

```go
func Transaction(
```

Transaction executes a callback within a database transaction.
Transaction 在数据库事务中执行回调。


## Types

### type Config



### type ConnectionErrorCode



### type DBConnectionException



#### func (DBConnectionException) Error



#### func (DBConnectionException) GetPrevious



### type Factory



#### func (Factory) Connection



#### func (Factory) Extend



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



