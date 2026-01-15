# Package table



## Functions

### func Auth

```go
func Auth(
```



### func SetFactory

```go
func SetFactory(
```



### func WithTX

```go
func WithTX(
```

WithTX 使用TX


## Types

### type CreateException



### type DeleteException



### type Exception



#### func (Exception) Error



#### func (Exception) GetPrevious



### type InsertException



### type InstanceFactory



### type NotFoundException



### type SelectException



### type Table



#### func (Table) Avg

Avg 检索给定列的平均值
Retrieve the average of the values of a given column.


#### func (Table) AvgE



#### func (Table) Chunk



#### func (Table) ChunkById



#### func (Table) ChunkByIdDesc

ChunkByIdDesc 通过比较 ID 对查询结果进行分块
chunk the results of a query by comparing IDs.


#### func (Table) Count

Count 检索查询的“count”结果
Retrieve the "count" result of the query.


#### func (Table) CountE



#### func (Table) Create

Create 保存新模型并返回实例
Save a new model and return the instance.


#### func (Table) CreateE



#### func (Table) Delete



#### func (Table) DeleteE



#### func (Table) Find



#### func (Table) FindOrFail

FindOrFail 按 ID 对单个记录执行查询
Execute a query for a single record by ID.


#### func (Table) First



#### func (Table) FirstE



#### func (Table) FirstOr

FirstOr 执行查询并获得第一个结果或调用回调
Execute the query and get the first result or call a callback.


#### func (Table) FirstOrCreate



#### func (Table) FirstOrCreateE



#### func (Table) FirstOrFail



#### func (Table) FirstWhere

FirstWhere 向查询添加基本 where 子句，并返回第一个结果
Add a basic where clause to the query, and return the first result.


#### func (Table) FirstWhereE

FirstWhereE 向查询添加基本 where 子句，并返回第一个结果
Add a basic where clause to the query, and return the first result.


#### func (Table) Get



#### func (Table) GetE



#### func (Table) GetPrimaryKeyField



#### func (Table) GetTable



#### func (Table) Insert



#### func (Table) InsertE



#### func (Table) InsertGetId



#### func (Table) InsertGetIdE



#### func (Table) InsertOrIgnore



#### func (Table) InsertOrIgnoreE



#### func (Table) InsertOrReplace

InsertOrReplace 将新记录插入数据库，同时如果存在，则先删除此行数据，然后插入新的数据
Insert a new record into the database, and if it exists, delete this row of data first, and then insert new data.


#### func (Table) InsertOrReplaceE



#### func (Table) Max

Max 检索给定列的最大值
Retrieve the maximum value of a given column.


#### func (Table) MaxE



#### func (Table) Min

Min 检索给定列的最小值
Retrieve the minimum value of a given column.


#### func (Table) MinE



#### func (Table) Paginate

Paginate 对给定的查询进行分页。
paginate the given query.


#### func (Table) SelectForUpdate



#### func (Table) SelectForUpdateE



#### func (Table) SetByRelation

SetByRelation 设置关联关系


#### func (Table) SetConnection

SetConnection 参数要么是 contracts.DBConnection 要么是 string


#### func (Table) SetCreatedTimeColumn

SetCreatedTimeColumn 设置创建时间字段


#### func (Table) SetExecutor

SetExecutor 参数必须是 contracts.DBTx 实例


#### func (Table) SetFactory

SetFactory 设置类


#### func (Table) SetPrimaryKey

SetPrimaryKey 设置主键


#### func (Table) SetRelation

SetRelation 设置关联关系


#### func (Table) SetUpdatedTimeColumn

SetUpdatedTimeColumn 设置更新时间字段


#### func (Table) SetWiths

SetWiths 初始化关联查询


#### func (Table) SimplePaginate

SimplePaginate 将给定的查询分页成一个简单的分页器
paginate the given query into a simple paginator.


#### func (Table) Sum

Sum 检索给定列的值的总和
Retrieve the sum of the values of a given column.


#### func (Table) SumE



#### func (Table) Update

Update 更新数据库中的记录
update records in the database.


#### func (Table) UpdateE



#### func (Table) UpdateOrCreate



#### func (Table) UpdateOrCreateE



#### func (Table) UpdateOrInsert



#### func (Table) UpdateOrInsertE



### type UpdateException



