# Package email



## Functions

### func New

```go
func New(
```



### func NewService

```go
func NewService(
```



### func Text

```go
func Text(
```



## Types

### type Config



### type Exception



### type Factory



#### func (Factory) Extend



#### func (Factory) Mailer



### type Job



#### func (Job) Attempts



#### func (Job) Construct



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



### type Mail



#### func (Mail) Delay



#### func (Mail) GetBcc



#### func (Mail) GetCc



#### func (Mail) GetDelay



#### func (Mail) GetFrom



#### func (Mail) GetHtml



#### func (Mail) GetQueue



#### func (Mail) GetSubject



#### func (Mail) GetText



#### func (Mail) GetTo



#### func (Mail) Queue



#### func (Mail) SetBcc



#### func (Mail) SetCc



#### func (Mail) SetFrom



#### func (Mail) SetTo



### type Mailer



#### func (Mailer) Later



#### func (Mailer) Queue



#### func (Mailer) Raw



#### func (Mailer) Send



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type Textual



#### func (Textual) Html



#### func (Textual) Text



