# Package drivers



## Functions

### func EstimateParameters

```go
func EstimateParameters(
```



### func FileDriver

```go
func FileDriver(
```



### func Max

```go
func Max(
```



## Types

### type File



#### func (File) Add



#### func (File) AddString



#### func (File) Clear



#### func (File) Count



#### func (File) Load



#### func (File) ReadFrom

ReadFrom reads a binary representation of the BloomFilter (such as might
have been written by WriteTo()) from an i/o stream. It returns the number
of bytes read.


#### func (File) Save



#### func (File) Size



#### func (File) Test



#### func (File) TestAndAdd

TestAndAdd is the equivalent to calling Test(data) then Add(data).
Returns the result of Test.


#### func (File) TestAndAddString

TestAndAddString is the equivalent to calling Test(string) then Add(string).
Returns the result of Test.


#### func (File) TestOrAdd

TestOrAdd is the equivalent to calling Test(data) then if not present Add(data).
Returns the result of Test.


#### func (File) TestOrAddString

TestOrAddString is the equivalent to calling Test(string) then if not present Add(string).
Returns the result of Test.


#### func (File) TestString



#### func (File) WriteTo

WriteTo writes a binary representation of the BloomFilter to an i/o stream.
It returns the number of bytes written.


### type Redis



#### func (Redis) Add



#### func (Redis) AddString



#### func (Redis) Clear



#### func (Redis) Count



#### func (Redis) Load



#### func (Redis) Save



#### func (Redis) Size



#### func (Redis) Test



#### func (Redis) TestAndAdd

TestAndAdd is the equivalent to calling Test(data) then Add(data).
Returns the result of Test.


#### func (Redis) TestAndAddString

TestAndAddString is the equivalent to calling Test(string) then Add(string).
Returns the result of Test.


#### func (Redis) TestOrAdd

TestOrAdd is the equivalent to calling Test(data) then if not present Add(data).
Returns the result of Test.


#### func (Redis) TestOrAddString

TestOrAddString is the equivalent to calling Test(string) then if not present Add(string).
Returns the result of Test.


#### func (Redis) TestString



