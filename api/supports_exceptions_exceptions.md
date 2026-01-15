# Package exceptions



## Functions

### func New

```go
func New(
```



### func NewService

```go
func NewService(
```



### func Throw

```go
func Throw(
```



### func WithError

```go
func WithError(
```



### func WithPrevious

```go
func WithPrevious(
```



### func WithRecover

```go
func WithRecover(
```



### func WrapException

```go
func WrapException(
```

WrapException 包装 recover 的返回值


## Types

### type DefaultExceptionHandler



#### func (DefaultExceptionHandler) Handle



#### func (DefaultExceptionHandler) Report



#### func (DefaultExceptionHandler) ShouldReport



### type Exception



#### func (Exception) Error



#### func (Exception) GetPrevious



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



