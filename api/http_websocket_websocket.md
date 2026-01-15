# Package websocket



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



### func NewFrame

```go
func NewFrame(
```



### func NewService

```go
func NewService(
```



## Types

### type Config



### type Connection



#### func (Connection) Close



#### func (Connection) Fd



#### func (Connection) Send



#### func (Connection) SendBinary



#### func (Connection) SendBytes



### type DefaultController



#### func (DefaultController) OnClose



#### func (DefaultController) OnConnect



#### func (DefaultController) OnMessage



### type Exception



### type Frame



#### func (Frame) Connection



#### func (Frame) Parse



#### func (Frame) Raw



#### func (Frame) RawString



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type WebSocket



#### func (WebSocket) Add



#### func (WebSocket) Close



#### func (WebSocket) GetFd



#### func (WebSocket) Send



