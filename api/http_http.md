# Package http



## Functions

### func Abort

```go
func Abort(
```

Abort 创建一个中止响应（通常用于中间件）
参数:
  - code: HTTP状态码
  - message: 错误消息（可选）


### func Api

```go
func Api(
```

Api 示例宏函数（根据文档中的例子）
这个函数会在初始化时通过ResponseMacro注册


### func Back

```go
func Back(
```

Back 重定向到前一个页面


### func BadRequest

```go
func BadRequest(
```

BadRequest 创建一个400响应
参数:
  - message: 错误消息（可选）


### func Binary

```go
func Binary(
```

Binary 创建一个二进制响应
参数:
  - data: 二进制数据
  - contentType: 内容类型（可选，默认application/octet-stream）


### func CallMacro

```go
func CallMacro(
```

CallMacro 调用已注册的响应宏
参数:
  - name: 宏名称
  - args: 传递给宏的参数


### func Download

```go
func Download(
```

Download 创建一个文件下载响应
参数:
  - filePath: 文件路径
  - fileName: 下载时显示的文件名（可选）


### func Error

```go
func Error(
```

Error 创建一个错误响应
参数:
  - message: 错误消息
  - code: HTTP状态码（可选，默认500）


### func File

```go
func File(
```

File 创建一个文件响应（在浏览器中显示文件）
参数:
  - filePath: 文件路径


### func Forbidden

```go
func Forbidden(
```

Forbidden 创建一个403响应
参数:
  - message: 错误消息（可选）


### func GetMacroNames

```go
func GetMacroNames(
```

GetMacroNames 获取所有已注册的宏名称


### func HasMacro

```go
func HasMacro(
```

HasMacro 检查是否存在指定名称的宏


### func Html

```go
func Html(
```

Html 创建一个HTML响应
参数:
  - html: HTML内容
  - code: HTTP状态码（可选，默认200）


### func InternalServerError

```go
func InternalServerError(
```

InternalServerError 创建一个500响应
参数:
  - message: 错误消息（可选）


### func Json

```go
func Json(
```

Json 创建JSON响应的简化方法
参数:
  - data: 要序列化的数据
  - code: HTTP状态码（可选，默认200）


### func Jsonp

```go
func Jsonp(
```

Jsonp 创建一个JSONP响应
参数:
  - callback: 回调函数名
  - data: 要序列化的数据
  - code: HTTP状态码（可选，默认200）


### func NewEngine

```go
func NewEngine(
```



### func NewJsonResponse

```go
func NewJsonResponse(
```



### func NewMiddleware

```go
func NewMiddleware(
```



### func NewRequest

```go
func NewRequest(
```



### func NewService

```go
func NewService(
```



### func NewStringResponse

```go
func NewStringResponse(
```



### func NoContent

```go
func NoContent(
```

NoContent 创建一个无内容响应（204状态码）


### func NotFound

```go
func NotFound(
```

NotFound 创建一个404响应
参数:
  - message: 错误消息（可选）


### func ParseRequestParams

```go
func ParseRequestParams(
```

ParseRequestParams 用于解析请求的参数到指定结构体，包括表单、文件和 JSON 数据


### func Plain

```go
func Plain(
```

Plain 创建一个纯文本响应
参数:
  - text: 文本内容
  - code: HTTP状态码（可选，默认200）


### func Redirect

```go
func Redirect(
```

Redirect 创建一个重定向响应
参数:
  - url: 重定向的目标URL
  - status: HTTP状态码，默认为302


### func Response

```go
func Response(
```

Response 创建一个基础响应
参数:
  - content: 响应内容
  - status: HTTP状态码（可选，默认200）


### func ResponseMacro

```go
func ResponseMacro(
```

ResponseMacro 注册一个响应宏
参数:
  - name: 宏名称
  - macro: 宏函数


### func Status

```go
func Status(
```

Status 创建一个仅包含状态码的响应
参数:
  - code: HTTP状态码


### func Stream

```go
func Stream(
```

Stream 创建一个流响应
参数:
  - reader: 数据流读取器
  - contentType: 内容类型（可选，默认application/octet-stream）


### func Text

```go
func Text(
```

Text 是Plain的别名，创建一个纯文本响应


### func Unauthorized

```go
func Unauthorized(
```

Unauthorized 创建一个401响应
参数:
  - message: 错误消息（可选）


### func View

```go
func View(
```

View 创建一个视图响应
参数:
  - templateName: 模板名称
  - data: 传递给模板的数据


### func Xml

```go
func Xml(
```

Xml 创建一个XML响应
参数:
  - data: 要序列化为XML的数据
  - code: HTTP状态码（可选，默认200）


## Types

### type BackResponse

BackResponse 返回前一个页面的响应结构体


#### func (BackResponse) Bytes

Bytes 实现HttpResponse接口


#### func (BackResponse) Cookie

Cookie 添加Cookie到响应


#### func (BackResponse) Header

Header 添加单个响应头


#### func (BackResponse) WithErrors

WithErrors 添加错误信息到重定向响应


#### func (BackResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (BackResponse) WithoutCookie

WithoutCookie 删除Cookie


### type BaseResponse



#### func (BaseResponse) AddHeader



#### func (BaseResponse) Cookie

Cookie 添加Cookie到响应


#### func (BaseResponse) DelHeader



#### func (BaseResponse) GetCookies

GetCookies 获取所有Cookie


#### func (BaseResponse) Header

Header 添加单个响应头


#### func (BaseResponse) Headers



#### func (BaseResponse) SetHeader



#### func (BaseResponse) SetHeaders



#### func (BaseResponse) SetStatus



#### func (BaseResponse) Status



#### func (BaseResponse) WithHeaders

WithHeaders 添加多个响应头


#### func (BaseResponse) WithoutCookie

WithoutCookie 删除Cookie（通过设置过期时间为过去）


### type BinaryResponse

BinaryResponse 二进制响应结构体


#### func (BinaryResponse) Bytes



#### func (BinaryResponse) Cookie

Cookie 添加Cookie到响应


#### func (BinaryResponse) Header

Header 添加单个响应头


#### func (BinaryResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (BinaryResponse) WithoutCookie

WithoutCookie 删除Cookie


### type Config



### type DownloadResponse

DownloadResponse 文件下载响应结构体


#### func (DownloadResponse) Bytes



#### func (DownloadResponse) Cookie

Cookie 添加Cookie到响应


#### func (DownloadResponse) Header

Header 添加单个响应头


#### func (DownloadResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (DownloadResponse) WithoutCookie

WithoutCookie 删除Cookie


### type Engine



#### func (Engine) Close



#### func (Engine) HandleFastHTTP



#### func (Engine) Start



#### func (Engine) Static



### type ErrorResponse

ErrorResponse 错误响应结构体


#### func (ErrorResponse) Bytes



#### func (ErrorResponse) Cookie

Cookie 添加Cookie到响应


#### func (ErrorResponse) Header

Header 添加单个响应头


#### func (ErrorResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (ErrorResponse) WithoutCookie

WithoutCookie 删除Cookie


### type Exception



### type FileResponse

FileResponse 文件响应结构体（用于在浏览器中显示文件）


#### func (FileResponse) Bytes



#### func (FileResponse) Cookie

Cookie 添加Cookie到响应


#### func (FileResponse) Header

Header 添加单个响应头


#### func (FileResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (FileResponse) WithoutCookie

WithoutCookie 删除Cookie


### type GeneralResponse

GeneralResponse 通用响应结构体


#### func (GeneralResponse) Bytes



#### func (GeneralResponse) Cookie

Cookie 添加Cookie到响应


#### func (GeneralResponse) Header

Header 添加单个响应头


#### func (GeneralResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (GeneralResponse) WithoutCookie

WithoutCookie 删除Cookie


### type HtmlResponse

HtmlResponse HTML响应结构体


#### func (HtmlResponse) Bytes



#### func (HtmlResponse) Cookie

Cookie 添加Cookie到响应


#### func (HtmlResponse) Header

Header 添加单个响应头


#### func (HtmlResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (HtmlResponse) WithoutCookie

WithoutCookie 删除Cookie


### type JsonResponse



#### func (JsonResponse) Bytes



#### func (JsonResponse) Cookie

Cookie 添加Cookie到响应


#### func (JsonResponse) Header

Header 添加单个响应头


#### func (JsonResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (JsonResponse) WithoutCookie

WithoutCookie 删除Cookie


### type JsonpResponse

JsonpResponse JSONP响应结构体


#### func (JsonpResponse) Bytes



#### func (JsonpResponse) Cookie

Cookie 添加Cookie到响应


#### func (JsonpResponse) Header

Header 添加单个响应头


#### func (JsonpResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (JsonpResponse) WithoutCookie

WithoutCookie 删除Cookie


### type Middleware



#### func (Middleware) Call



#### func (Middleware) Register



### type MiddlewareDuplicateException



### type MiddlewareNotFoundException



### type NoContentResponse

NoContentResponse 无内容响应结构体


#### func (NoContentResponse) Bytes



#### func (NoContentResponse) Cookie

Cookie 添加Cookie到响应


#### func (NoContentResponse) Header

Header 添加单个响应头


#### func (NoContentResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (NoContentResponse) WithoutCookie

WithoutCookie 删除Cookie


### type PlainResponse

PlainResponse 纯文本响应结构体


#### func (PlainResponse) Bytes



#### func (PlainResponse) Cookie

Cookie 添加Cookie到响应


#### func (PlainResponse) Header

Header 添加单个响应头


#### func (PlainResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (PlainResponse) WithoutCookie

WithoutCookie 删除Cookie


### type RedirectResponse

RedirectResponse 重定向响应结构体


#### func (RedirectResponse) Bytes

Bytes 实现HttpResponse接口


#### func (RedirectResponse) Cookie

Cookie 添加Cookie到响应


#### func (RedirectResponse) Header

Header 添加单个响应头


#### func (RedirectResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (RedirectResponse) WithoutCookie

WithoutCookie 删除Cookie


### type Request



#### func (Request) Cookie



#### func (Request) Cookies



#### func (Request) Except



#### func (Request) FormFile



#### func (Request) FormParams



#### func (Request) FormValue



#### func (Request) Get



#### func (Request) GetHeader



#### func (Request) IsTLS



#### func (Request) MultipartForm



#### func (Request) Only



#### func (Request) Optional



#### func (Request) Param



#### func (Request) Parse



#### func (Request) Path



#### func (Request) QueryParam



#### func (Request) QueryParams



#### func (Request) QueryString



#### func (Request) RealIP



#### func (Request) Scheme



#### func (Request) Set



#### func (Request) SetCookie



#### func (Request) SetHeader



#### func (Request) ToFields



### type ResponseMacroFunc

ResponseMacroFunc 响应宏函数类型


### type ServeClosed



#### func (ServeClosed) Event



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type StatusResponse

StatusResponse 状态响应结构体（仅返回状态码）


#### func (StatusResponse) Bytes



#### func (StatusResponse) Cookie

Cookie 添加Cookie到响应


#### func (StatusResponse) Header

Header 添加单个响应头


#### func (StatusResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (StatusResponse) WithoutCookie

WithoutCookie 删除Cookie


### type StreamResponse

StreamResponse 流响应结构体


#### func (StreamResponse) Bytes



#### func (StreamResponse) Cookie

Cookie 添加Cookie到响应


#### func (StreamResponse) Header

Header 添加单个响应头


#### func (StreamResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (StreamResponse) WithoutCookie

WithoutCookie 删除Cookie


### type StringResponse



#### func (StringResponse) Bytes



#### func (StringResponse) Header

Header 添加单个响应头


#### func (StringResponse) WithHeaders

WithHeaders 添加自定义响应头


### type ViewResponse

ViewResponse 视图响应结构体


#### func (ViewResponse) Bytes



#### func (ViewResponse) Cookie

Cookie 添加Cookie到响应


#### func (ViewResponse) Header

Header 添加单个响应头


#### func (ViewResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (ViewResponse) WithoutCookie

WithoutCookie 删除Cookie


### type XmlResponse

XmlResponse XML响应结构体


#### func (XmlResponse) Bytes



#### func (XmlResponse) Cookie

Cookie 添加Cookie到响应


#### func (XmlResponse) Header

Header 添加单个响应头


#### func (XmlResponse) WithHeaders

WithHeaders 添加自定义响应头


#### func (XmlResponse) WithoutCookie

WithoutCookie 删除Cookie


