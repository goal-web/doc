# Package sse



## Functions

### func Default

```go
func Default(
```



### func New

```go
func New(
```



### func NewConnection

```go
func NewConnection(
```



### func NewFactory

```go
func NewFactory(
```



### func NewService

```go
func NewService(
```



### func NewSse

```go
func NewSse(
```



## Types

### type Connection



#### func (Connection) Close



#### func (Connection) Fd



#### func (Connection) Send



### type DefaultController



#### func (DefaultController) OnClose



#### func (DefaultController) OnConnect



### type Exception



### type Factory



#### func (Factory) Register



#### func (Factory) Sse



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type Sse



#### func (Sse) Add



#### func (Sse) Broadcast



#### func (Sse) Close



#### func (Sse) Count



#### func (Sse) GetFd



#### func (Sse) Send



