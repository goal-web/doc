# Package providers

Package providers contains authentication user provider implementations.
包 providers 包含认证用户提供者的实现。


## Functions

### func DBDriver

```go
func DBDriver(
```

DBDriver creates a new database-based user provider driver.
DBDriver 创建新的基于数据库的用户提供者驱动。


## Types

### type DB

DB implements a database-based user provider.
DB 实现基于数据库的用户提供者。


#### func (DB) RetrieveById

RetrieveById retrieves a user by their identifier.
RetrieveById 根据标识符获取用户。


