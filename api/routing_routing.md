# Package routing



## Functions

### func ConvertToMiddlewares

```go
func ConvertToMiddlewares(
```



### func NewGroup

```go
func NewGroup(
```



### func NewHttpRouter

```go
func NewHttpRouter(
```



### func NewRoute

```go
func NewRoute(
```



### func NewRouteList

```go
func NewRouteList(
```



### func NewRouter

```go
func NewRouter(
```



### func NewService

```go
func NewService(
```



## Types

### type Group



#### func (Group) Add

Add 添加路由，method 只允许字符串或者字符串数组


#### func (Group) DELETE



#### func (Group) Delete



#### func (Group) GET



#### func (Group) Get



#### func (Group) GetHost



#### func (Group) Group

Group 添加一个子组


#### func (Group) Host



#### func (Group) OPTIONS



#### func (Group) Options



#### func (Group) PATCH



#### func (Group) POST



#### func (Group) PUT



#### func (Group) Patch



#### func (Group) Post



#### func (Group) Put



#### func (Group) Routes



#### func (Group) TRACE



#### func (Group) Trace



### type HttpRouter



#### func (HttpRouter) Add



#### func (HttpRouter) DELETE



#### func (HttpRouter) Delete



#### func (HttpRouter) GET



#### func (HttpRouter) Get



#### func (HttpRouter) Group



#### func (HttpRouter) Middlewares



#### func (HttpRouter) Mount



#### func (HttpRouter) OPTIONS



#### func (HttpRouter) Options



#### func (HttpRouter) PATCH



#### func (HttpRouter) POST



#### func (HttpRouter) PUT



#### func (HttpRouter) Patch



#### func (HttpRouter) Post



#### func (HttpRouter) Print



#### func (HttpRouter) Put



#### func (HttpRouter) Route



#### func (HttpRouter) TRACE



#### func (HttpRouter) Trace



#### func (HttpRouter) Use



### type ParamNode



#### func (ParamNode) IsSame



### type Route



#### func (Route) GetHost



#### func (Route) GetName



#### func (Route) GetPath



#### func (Route) Handler



#### func (Route) Host



#### func (Route) Method



#### func (Route) Middlewares



#### func (Route) Name



### type RouteList



#### func (RouteList) Handle



### type RoutePrintItem



### type Router



#### func (Router) Add



#### func (Router) All



#### func (Router) Find



#### func (Router) IsEmpty



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type Tree



#### func (Tree) All



