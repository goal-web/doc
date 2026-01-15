# Package queue



## Functions

### func Conn

```go
func Conn(
```



### func Default

```go
func Default(
```



### func Later

```go
func Later(
```

Later 延迟后将新作业推送到队列中
push a new job onto the queue after a delay.


### func LaterOn

```go
func LaterOn(
```

LaterOn 延迟后将新作业推送到队列中
push a new job onto the queue after a delay.


### func NewJobSerializer

```go
func NewJobSerializer(
```



### func NewService

```go
func NewService(
```



### func NewWorker

```go
func NewWorker(
```



### func Push

```go
func Push(
```

Push 一个新工作进入队列
a new job onto the queue.


### func PushOn

```go
func PushOn(
```

PushOn 将新作业推送到队列中
push a new job onto the queue.


### func PushRaw

```go
func PushRaw(
```

PushRaw 将原始有效负载推送到队列中
push a raw payload onto the queue.


## Types

### type Config



### type Defaults



### type DriverException



### type Error



#### func (Error) Error



### type Exception



### type FailedJobs



### type Job



#### func (Job) Attempts



#### func (Job) Fail



#### func (Job) GetAttemptsNum



#### func (Job) GetConnectionName



#### func (Job) GetMaxTries



#### func (Job) GetOptions



#### func (Job) GetQueue



#### func (Job) GetRetryInterval



#### func (Job) GetTimeout



#### func (Job) Handle



#### func (Job) HasFailed



#### func (Job) IncrementAttemptsNum



#### func (Job) IsDeleted



#### func (Job) IsDeletedOrReleased



#### func (Job) IsReleased



#### func (Job) MarkAsFailed



#### func (Job) SetQueue



#### func (Job) Uuid



### type JobException



### type Manager



#### func (Manager) Connection



#### func (Manager) Extend



#### func (Manager) Queue



### type Serializer



#### func (Serializer) Serializer



#### func (Serializer) Unserialize



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type Worker



#### func (Worker) Stop



#### func (Worker) Work



### type WorkerConfig



### type WorkerParam



### type Workers



