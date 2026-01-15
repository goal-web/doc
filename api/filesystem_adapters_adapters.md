# Package adapters



## Functions

### func LocalAdapter

```go
func LocalAdapter(
```



### func NewLocalFileSystem

```go
func NewLocalFileSystem(
```



### func OssAdapter

```go
func OssAdapter(
```

OssAdapter constructs an Aliyun OSS filesystem adapter


### func QiniuAdapter

```go
func QiniuAdapter(
```



## Types

### type File



#### func (File) Disk



#### func (File) Read



#### func (File) ReadString



### type OSSFile



#### func (OSSFile) Disk



#### func (OSSFile) Read



#### func (OSSFile) ReadString



### type Oss



#### func (Oss) AllDirectories



#### func (Oss) AllFiles



#### func (Oss) Append



#### func (Oss) Copy



#### func (Oss) Delete



#### func (Oss) DeleteDirectory



#### func (Oss) Directories



#### func (Oss) Exists



#### func (Oss) Files



#### func (Oss) Get



#### func (Oss) GetVisibility



#### func (Oss) LastModified



#### func (Oss) MakeDirectory



#### func (Oss) Move



#### func (Oss) Name



#### func (Oss) Prepend



#### func (Oss) Put



#### func (Oss) Read



#### func (Oss) ReadStream



#### func (Oss) RefreshUrlIfExpired

RefreshUrlIfExpired 检测链接是否过期；若过期或接近过期（在 refreshThreshold 秒内），生成并返回新的链接，否则返回原链接
支持 V1（Expires）与 V4（x-oss-date + x-oss-expires）两种签名格式判断
refreshThreshold: 在过期前多少秒内进行刷新（默认为 0，即仅在过期时刷新）


#### func (Oss) SetVisibility

SetVisibility: OSS doesn't support per-object ACL change via this adapter; noop


#### func (Oss) Size



#### func (Oss) Url

Url 生成可下载链接：
- 若为私有桶，返回带签名的限时下载链接（默认 ttl 或 3600s）
- 若为公开桶，优先使用配置的 domain，否则使用 bucket.endpoint 组合


#### func (Oss) WriteStream



### type OssFileInfo

OssFileInfo implements fs.FileInfo for OSS objects


#### func (OssFileInfo) IsDir



#### func (OssFileInfo) ModTime



#### func (OssFileInfo) Mode



#### func (OssFileInfo) Name



#### func (OssFileInfo) Size



#### func (OssFileInfo) Sys



### type Qiniu



#### func (Qiniu) AllDirectories



#### func (Qiniu) AllFiles



#### func (Qiniu) Append



#### func (Qiniu) BucketManager



#### func (Qiniu) Copy



#### func (Qiniu) Delete



#### func (Qiniu) DeleteDirectory



#### func (Qiniu) Directories



#### func (Qiniu) Exists



#### func (Qiniu) Files



#### func (Qiniu) Get



#### func (Qiniu) GetVisibility



#### func (Qiniu) LastModified



#### func (Qiniu) Mac



#### func (Qiniu) MakeDirectory



#### func (Qiniu) Move



#### func (Qiniu) Name



#### func (Qiniu) PolicyToken

PolicyToken 创建自定义上传策略的令牌 see https://github.com/qiniu/go-sdk/blob/master/examples/create_uptoken.go


#### func (Qiniu) Prepend



#### func (Qiniu) Put



#### func (Qiniu) Read



#### func (Qiniu) ReadStream



#### func (Qiniu) SetVisibility

SetVisibility 七牛不支持修改单个文件的可见性


#### func (Qiniu) Size



#### func (Qiniu) UploadToken



#### func (Qiniu) Url



#### func (Qiniu) WriteStream



### type QiniuFile



#### func (QiniuFile) Disk



#### func (QiniuFile) Read



#### func (QiniuFile) ReadString



### type QiniuFileInfo



#### func (QiniuFileInfo) IsDir



#### func (QiniuFileInfo) ModTime



#### func (QiniuFileInfo) Mode



#### func (QiniuFileInfo) Name



#### func (QiniuFileInfo) Size



#### func (QiniuFileInfo) Sys



