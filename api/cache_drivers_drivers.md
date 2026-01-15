# Package drivers



## Functions

### func NewFile

```go
func NewFile(
```



### func NewMemory

```go
func NewMemory(
```



### func NewRedisCache

```go
func NewRedisCache(
```

NewRedisCache 创建Redis缓存实例
改进：添加参数验证


## Types

### type File



#### func (File) Add



#### func (File) Decrement



#### func (File) Flush



#### func (File) Forever



#### func (File) Forget



#### func (File) Get



#### func (File) GetPrefix



#### func (File) Increment



#### func (File) Many



#### func (File) Pull



#### func (File) Put



#### func (File) PutMany



#### func (File) Remember



#### func (File) RememberForever



### type Memory



#### func (Memory) Add



#### func (Memory) CleanupAllExpired

CleanupAllExpired 清理所有过期项


#### func (Memory) Decrement



#### func (Memory) Flush



#### func (Memory) Forever



#### func (Memory) Forget



#### func (Memory) Get



#### func (Memory) GetKeys

GetKeys 获取所有键（用于调试和监控）


#### func (Memory) GetKeysByPattern

GetKeysByPattern 根据模式获取键列表（简单实现）


#### func (Memory) GetPrefix



#### func (Memory) GetStats

GetStats 获取缓存统计信息


#### func (Memory) Increment



#### func (Memory) Many



#### func (Memory) Pull



#### func (Memory) Put



#### func (Memory) PutMany



#### func (Memory) Remember



#### func (Memory) RememberForever



### type RedisStore



#### func (RedisStore) Add



#### func (RedisStore) Decrement



#### func (RedisStore) Exists

Exists 检查键是否存在


#### func (RedisStore) Flush



#### func (RedisStore) Forever



#### func (RedisStore) Forget



#### func (RedisStore) Get



#### func (RedisStore) GetKeysByPattern

GetKeysByPattern 根据模式获取键列表


#### func (RedisStore) GetPrefix



#### func (RedisStore) GetStats

GetStats 获取缓存统计信息


#### func (RedisStore) GetTTL

GetTTL 获取键的剩余生存时间


#### func (RedisStore) Increment



#### func (RedisStore) Many



#### func (RedisStore) Pull



#### func (RedisStore) Put



#### func (RedisStore) PutMany



#### func (RedisStore) Remember



#### func (RedisStore) RememberForever



#### func (RedisStore) ScanKeys

ScanKeys 扫描键（用于大数据集）


