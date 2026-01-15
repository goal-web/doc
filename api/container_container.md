# Package container



## Functions

### func New

```go
func New(
```



### func NewMagicalFunc

```go
func NewMagicalFunc(
```



## Types

### type ArgumentsTypeMap



#### func (ArgumentsTypeMap) FindConvertibleArg

FindConvertibleArg 找到可转换的参数


#### func (ArgumentsTypeMap) Pull



### type CanNotInjectException



### type Container



#### func (Container) Alias



#### func (Container) Bind



#### func (Container) Call



#### func (Container) DI



#### func (Container) DIByArguments



#### func (Container) Flush



#### func (Container) Get



#### func (Container) GetByArguments



#### func (Container) GetKey



#### func (Container) HasBound



#### func (Container) Instance



#### func (Container) Singleton



#### func (Container) StaticCall

StaticCall 静态调用，直接传静态化的方法


#### func (Container) StaticCallByArguments

StaticCallByArguments 静态调用，直接传静态化的方法和处理好的参数


### type DIFieldException



### type DIKindException



### type FuncTypeException



