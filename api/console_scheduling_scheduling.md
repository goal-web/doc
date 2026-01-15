# Package scheduling



## Functions

### func NewCallbackEvent

```go
func NewCallbackEvent(
```



### func NewCommandEvent

```go
func NewCommandEvent(
```



### func NewSchedule

```go
func NewSchedule(
```



### func NewService

```go
func NewService(
```



## Types

### type CallbackEvent



#### func (CallbackEvent) Description



#### func (CallbackEvent) MutexName



### type CommandEvent



#### func (CommandEvent) Command



#### func (CommandEvent) MutexName



### type Event



#### func (Event) Between



#### func (Event) Cron



#### func (Event) Daily



#### func (Event) DailyAt



#### func (Event) Days



#### func (Event) EveryFifteenMinutes



#### func (Event) EveryFifteenSeconds



#### func (Event) EveryFiveMinutes



#### func (Event) EveryFiveSeconds



#### func (Event) EveryFourHours



#### func (Event) EveryFourMinutes



#### func (Event) EveryFourSeconds



#### func (Event) EveryMinute



#### func (Event) EverySecond



#### func (Event) EverySixHours



#### func (Event) EveryTenMinutes



#### func (Event) EveryTenSeconds



#### func (Event) EveryThirtyMinutes



#### func (Event) EveryThirtySeconds



#### func (Event) EveryThreeHours



#### func (Event) EveryThreeMinutes



#### func (Event) EveryThreeSeconds



#### func (Event) EveryTwoHours



#### func (Event) EveryTwoMinutes



#### func (Event) EveryTwoSeconds



#### func (Event) Expression



#### func (Event) FiltersPass



#### func (Event) Fridays



#### func (Event) Hourly



#### func (Event) HourlyAt



#### func (Event) LastDayOfMonth



#### func (Event) Mondays



#### func (Event) Monthly



#### func (Event) MonthlyOn



#### func (Event) MutexName



#### func (Event) OnOneServer



#### func (Event) Quarterly



#### func (Event) Run



#### func (Event) Saturdays



#### func (Event) SetMutexName



#### func (Event) Skip



#### func (Event) SpliceIntoPosition



#### func (Event) Sundays



#### func (Event) Thursdays



#### func (Event) Timezone



#### func (Event) Tuesdays



#### func (Event) TwiceDaily



#### func (Event) TwiceDailyAt



#### func (Event) TwiceMonthly



#### func (Event) UnlessBetween



#### func (Event) Wednesdays



#### func (Event) Weekdays



#### func (Event) Weekends



#### func (Event) Weekly



#### func (Event) WeeklyOn



#### func (Event) When



#### func (Event) WithoutOverlapping



#### func (Event) Yearly



#### func (Event) YearlyOn



#### func (Event) Years



### type Mutex



#### func (Mutex) Create



#### func (Mutex) Exists



#### func (Mutex) Forget



### type Schedule



#### func (Schedule) Call



#### func (Schedule) Exec



#### func (Schedule) GetEvents



#### func (Schedule) UseStore



### type ScheduleEventException



