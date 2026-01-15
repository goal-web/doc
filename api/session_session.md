# Package session



## Functions

### func Default

```go
func Default(
```



### func New

```go
func New(
```



### func NewService

```go
func NewService(
```



### func StartSession

```go
func StartSession(
```



## Types

### type Config



### type RequestAfterListener



#### func (RequestAfterListener) Handle

Handle 如果开启了 session 那么请求结束时保存 session


### type RequestBeforeListener



#### func (RequestBeforeListener) Handle



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type Session



#### func (Session) All



#### func (Session) Exists



#### func (Session) Flush



#### func (Session) Forget



#### func (Session) Get



#### func (Session) GetAuthenticatableKey



#### func (Session) GetName



#### func (Session) Has



#### func (Session) Invalidate



#### func (Session) IsStarted



#### func (Session) Migrate



#### func (Session) PreviousUrl



#### func (Session) Pull



#### func (Session) Put



#### func (Session) Regenerate



#### func (Session) RegenerateToken



#### func (Session) Remove



#### func (Session) Save



#### func (Session) SetId



#### func (Session) SetName



#### func (Session) SetPreviousUrl



#### func (Session) Start



#### func (Session) Token



