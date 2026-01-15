# Package contracts



## Types

### type Ack



### type Application

Application 应用程序接口
application interface


### type Auth



### type Authenticatable



### type Authorizable



### type Basic



### type BitCount



### type BloomFactory



### type BloomFilter



### type BloomFilterDriver

BloomFilterDriver 通过名称与配置信息获取布隆过滤器
Get bloom filter by name and configuration info.


### type CacheFactory



### type CacheStore



### type CacheStoreProvider

CacheStoreProvider 缓存存储提供者
cache storage provider.


### type CallbackEvent



### type Class



### type ClassSerializer



### type Collect



### type Collection



### type Command



### type CommandArg



### type CommandArgType



### type CommandArguments



### type CommandEvent



### type CommandHandler



### type CommandHandlerProvider



### type CommandProvider

CommandProvider 命令提供者
command provider.


### type Component

Component 可注入的类
injectable class.


### type Config



### type ConfigProvider



### type Console



### type ConsoleInput



### type Container



### type Context



### type DBConnection



### type DBConnector

DBConnector 获取数据库连接实例
Get a database connection instance.


### type DBFactory



### type DBTx



### type EmailContent



### type EmailFactory



### type EncryptDriver



### type EncryptManager



### type Encryptor



### type Env



### type Event



### type EventDispatcher



### type EventListener



### type Exception



### type ExceptionHandler



### type Fields



#### func (Fields) Get



#### func (Fields) Set



### type FieldsProvider



### type File



### type FileSystem



### type FileSystemFactory



### type FileSystemProvider

FileSystemProvider 通过给定的名称和配置信息获取文件系统
Get the filesystem with the given name and configuration information.


### type FileVisibility



### type Float



### type ForeignKeysCollector



### type Gate



### type GateChecker

GateChecker 权限检查器
permission checker.


### type GateFactory



### type GateHook

GateHook 权限钩子
permission hook.


### type GeoLocation



### type GeoPos



### type GeoRadiusQuery



### type Getter



### type GetterE



### type Guard



### type GuardDriver

GuardDriver 守卫驱动程序
guard driver


### type Hasher



### type HasherFactory



### type HasherProvider



### type HttpContext



### type HttpEngine



### type HttpRequest



### type HttpResponse



### type HttpRouter



### type InsertType



### type InstanceProvider

InstanceProvider 容器实例提供者
container instance provider


### type Integer



### type Interface



### type Job



### type JobSerializer



### type JoinType



### type Json



### type Limiter



### type Logger



### type MagicalFunc

MagicalFunc 可以通过容器调用的魔术方法
Magic methods that can be called from the container.


### type Mailable



### type Mailer



### type MailerDriver

MailerDriver 通过给定的名称和配置信息获取邮件驱动程序
Get mail driver by given name and configuration info.


### type Middleware



### type ModelContext



### type Number



### type OptionalGetter



### type OptionalGetterE



### type OrderType



### type Pipe

Pipe 通过可用管道之一发送对象
Send an object through one of the available pipelines.


### type Pipeline



### type Policy

Policy 权限策略, 一组检查器
Permission policy, a set of checkers.


### type QueryBuilder



### type QueryCallback

QueryCallback 查询回调，用于构建子查询
query callback，for building subqueries.


### type QueryExecutor



### type QueryFunc

QueryFunc 用于构造 子 where 表达式
Used to construct sub-where expressions.


### type QueryProvider

QueryProvider 查询提供者
query provider.


### type Queue



### type QueueDriver

QueueDriver 通过给定的信息获取队列连接
Get queue connection with given information.


### type QueueManager



### type QueueMsg



### type QueueWorker



### type RateLimiter



### type RedisConnection



### type RedisConnectionCtx



### type RedisFactory



### type RedisSubscribeFunc

RedisSubscribeFunc 订阅给定的消息频道
Subscribe to a given message channel.


### type Relation



### type RelationCollector



### type RelationSetter



### type RelationType

RelationType 关联关系


### type Result



### type Route



### type RouteGroup



### type RouteParams



### type Router



### type Schedule



### type ScheduleEvent



### type Serialization



### type Serializer



### type ServiceProvider

ServiceProvider 服务提供者接口
Service Provider Interface.


### type Session



### type SessionStore



### type ShouldBeEncrypted



### type ShouldBeUnique



### type ShouldQueue



### type ShouldValidate



### type SqlExecutor



### type Sse



### type SseConnection



### type SseController



### type SseFactory



### type SyncEvent



### type UnionJoinType



### type UserProvider



### type UserProviderDriver

UserProviderDriver 用户提供者驱动程序
User Provider Driver


### type Validatable

Validatable 可验证的表单


### type Views



### type WebSocket



### type WebSocketConnection



### type WebSocketController



### type WebSocketFrame



### type WebSocketSender



### type WhereJoinType



### type Z



### type ZRangeBy



### type ZStore



