# Package redis



## Functions

### func Conn

```go
func Conn(
```



### func Default

```go
func Default(
```



### func NewService

```go
func NewService(
```



## Types

### type Config



### type Connection



#### func (Connection) Append



#### func (Connection) AppendWithContext



#### func (Connection) BLPop



#### func (Connection) BLPopWithContext



#### func (Connection) BRPop



#### func (Connection) BRPopLPush



#### func (Connection) BRPopLPushWithContext



#### func (Connection) BRPopWithContext



#### func (Connection) BitCount



#### func (Connection) BitCountWithContext



#### func (Connection) BitOpAnd



#### func (Connection) BitOpAndWithContext



#### func (Connection) BitOpNot



#### func (Connection) BitOpNotWithContext



#### func (Connection) BitOpOr



#### func (Connection) BitOpOrWithContext



#### func (Connection) BitOpXor



#### func (Connection) BitOpXorWithContext



#### func (Connection) BitPos



#### func (Connection) BitPosWithContext



#### func (Connection) Client



#### func (Connection) ClientGetName



#### func (Connection) ClientGetNameWithContext



#### func (Connection) ClientWithContext



#### func (Connection) Command



#### func (Connection) CommandWithContext



#### func (Connection) Decr



#### func (Connection) DecrBy



#### func (Connection) DecrByWithContext



#### func (Connection) DecrWithContext



#### func (Connection) Del



#### func (Connection) DelWithContext



#### func (Connection) Dump



#### func (Connection) DumpWithContext



#### func (Connection) Eval

scripting start


#### func (Connection) EvalSha



#### func (Connection) EvalShaWithContext



#### func (Connection) EvalWithContext

scripting start


#### func (Connection) Exists



#### func (Connection) ExistsWithContext



#### func (Connection) Expire



#### func (Connection) ExpireAt



#### func (Connection) ExpireAtWithContext



#### func (Connection) ExpireWithContext



#### func (Connection) FlushAll



#### func (Connection) FlushAllWithContext



#### func (Connection) FlushDB



#### func (Connection) FlushDBWithContext



#### func (Connection) GeoAdd



#### func (Connection) GeoAddWithContext



#### func (Connection) GeoDist



#### func (Connection) GeoDistWithContext



#### func (Connection) GeoHash



#### func (Connection) GeoHashWithContext



#### func (Connection) GeoPos



#### func (Connection) GeoPosWithContext



#### func (Connection) GeoRadius



#### func (Connection) GeoRadiusByMember



#### func (Connection) GeoRadiusByMemberStore



#### func (Connection) GeoRadiusByMemberStoreWithContext



#### func (Connection) GeoRadiusByMemberWithContext



#### func (Connection) GeoRadiusStore



#### func (Connection) GeoRadiusStoreWithContext



#### func (Connection) GeoRadiusWithContext



#### func (Connection) Get

getter start


#### func (Connection) GetBit



#### func (Connection) GetBitWithContext



#### func (Connection) GetDel



#### func (Connection) GetDelWithContext



#### func (Connection) GetEx



#### func (Connection) GetExWithContext



#### func (Connection) GetRange



#### func (Connection) GetRangeWithContext



#### func (Connection) GetSet



#### func (Connection) GetSetWithContext



#### func (Connection) GetWithContext

getter start


#### func (Connection) HDel



#### func (Connection) HDelWithContext



#### func (Connection) HExists



#### func (Connection) HExistsWithContext



#### func (Connection) HGet

hash start


#### func (Connection) HGetAll



#### func (Connection) HGetAllWithContext



#### func (Connection) HGetWithContext

hash start


#### func (Connection) HIncrBy



#### func (Connection) HIncrByFloat



#### func (Connection) HIncrByFloatWithContext



#### func (Connection) HIncrByWithContext



#### func (Connection) HKeys



#### func (Connection) HKeysWithContext



#### func (Connection) HLen



#### func (Connection) HLenWithContext



#### func (Connection) HMGet



#### func (Connection) HMGetWithContext



#### func (Connection) HMSet



#### func (Connection) HMSetWithContext



#### func (Connection) HRandField



#### func (Connection) HRandFieldWithContext



#### func (Connection) HScan



#### func (Connection) HScanWithContext



#### func (Connection) HSet



#### func (Connection) HSetNX



#### func (Connection) HSetNXWithContext



#### func (Connection) HSetWithContext



#### func (Connection) HValues



#### func (Connection) HValuesWithContext



#### func (Connection) Incr



#### func (Connection) IncrBy



#### func (Connection) IncrByFloat



#### func (Connection) IncrByFloatWithContext



#### func (Connection) IncrByWithContext



#### func (Connection) IncrWithContext



#### func (Connection) Keys



#### func (Connection) KeysWithContext



#### func (Connection) LIndex



#### func (Connection) LIndexWithContext



#### func (Connection) LInsert



#### func (Connection) LInsertWithContext



#### func (Connection) LLen



#### func (Connection) LLenWithContext



#### func (Connection) LPop



#### func (Connection) LPopWithContext



#### func (Connection) LPush



#### func (Connection) LPushWithContext



#### func (Connection) LPushX



#### func (Connection) LPushXWithContext



#### func (Connection) LRange



#### func (Connection) LRangeWithContext



#### func (Connection) LRem



#### func (Connection) LRemWithContext



#### func (Connection) LSet



#### func (Connection) LSetWithContext



#### func (Connection) LTrim



#### func (Connection) LTrimWithContext



#### func (Connection) MGet



#### func (Connection) MGetWithContext



#### func (Connection) MSet



#### func (Connection) MSetNX



#### func (Connection) MSetNXWithContext



#### func (Connection) MSetWithContext



#### func (Connection) Migrate



#### func (Connection) MigrateWithContext



#### func (Connection) Move



#### func (Connection) MoveWithContext



#### func (Connection) PExpire



#### func (Connection) PExpireAt



#### func (Connection) PExpireAtWithContext



#### func (Connection) PExpireWithContext



#### func (Connection) PSubscribe



#### func (Connection) PSubscribeWithContext



#### func (Connection) PTTL



#### func (Connection) PTTLWithContext



#### func (Connection) Persist



#### func (Connection) PersistWithContext



#### func (Connection) PubSubChannels



#### func (Connection) PubSubChannelsWithContext



#### func (Connection) PubSubNumPat



#### func (Connection) PubSubNumPatWithContext



#### func (Connection) PubSubNumSub



#### func (Connection) PubSubNumSubWithContext



#### func (Connection) Publish



#### func (Connection) PublishWithContext



#### func (Connection) RPop



#### func (Connection) RPopCount



#### func (Connection) RPopCountWithContext



#### func (Connection) RPopLPush



#### func (Connection) RPopLPushWithContext



#### func (Connection) RPopWithContext



#### func (Connection) RPush



#### func (Connection) RPushWithContext



#### func (Connection) RPushX



#### func (Connection) RPushXWithContext



#### func (Connection) RandomKey



#### func (Connection) RandomKeyWithContext



#### func (Connection) Rename



#### func (Connection) RenameNX



#### func (Connection) RenameNXWithContext



#### func (Connection) RenameWithContext



#### func (Connection) SAdd

set start


#### func (Connection) SAddWithContext

set start


#### func (Connection) SCard



#### func (Connection) SCardWithContext



#### func (Connection) SDiff



#### func (Connection) SDiffStore



#### func (Connection) SDiffStoreWithContext



#### func (Connection) SDiffWithContext



#### func (Connection) SInter



#### func (Connection) SInterStore



#### func (Connection) SInterStoreWithContext



#### func (Connection) SInterWithContext



#### func (Connection) SIsMember



#### func (Connection) SIsMemberWithContext



#### func (Connection) SMembers



#### func (Connection) SMembersWithContext



#### func (Connection) SMove



#### func (Connection) SMoveWithContext



#### func (Connection) SPop



#### func (Connection) SPopN



#### func (Connection) SPopNWithContext



#### func (Connection) SPopWithContext



#### func (Connection) SRandMember



#### func (Connection) SRandMemberN



#### func (Connection) SRandMemberNWithContext



#### func (Connection) SRandMemberWithContext



#### func (Connection) SRem



#### func (Connection) SRemWithContext



#### func (Connection) SUnion



#### func (Connection) SUnionStore



#### func (Connection) SUnionStoreWithContext



#### func (Connection) SUnionWithContext



#### func (Connection) Scan



#### func (Connection) ScanWithContext



#### func (Connection) ScriptExists



#### func (Connection) ScriptExistsWithContext



#### func (Connection) ScriptFlush



#### func (Connection) ScriptFlushWithContext



#### func (Connection) ScriptKill



#### func (Connection) ScriptKillWithContext



#### func (Connection) ScriptLoad



#### func (Connection) ScriptLoadWithContext



#### func (Connection) Set

setter start


#### func (Connection) SetBit



#### func (Connection) SetBitWithContext



#### func (Connection) SetEX



#### func (Connection) SetEXWithContext



#### func (Connection) SetNX



#### func (Connection) SetNXWithContext



#### func (Connection) SetRange



#### func (Connection) SetRangeWithContext



#### func (Connection) SetWithContext

setter start


#### func (Connection) StrLen



#### func (Connection) StrLenWithContext



#### func (Connection) Subscribe



#### func (Connection) SubscribeWithContext



#### func (Connection) TTL



#### func (Connection) TTLWithContext



#### func (Connection) Type



#### func (Connection) TypeWithContext



#### func (Connection) Wait



#### func (Connection) WaitWithContext



#### func (Connection) ZAdd



#### func (Connection) ZAddWithContext



#### func (Connection) ZCard



#### func (Connection) ZCardWithContext



#### func (Connection) ZCount



#### func (Connection) ZCountWithContext



#### func (Connection) ZIncrBy



#### func (Connection) ZIncrByWithContext



#### func (Connection) ZInterStore



#### func (Connection) ZInterStoreWithContext



#### func (Connection) ZLexCount



#### func (Connection) ZLexCountWithContext



#### func (Connection) ZPopMax



#### func (Connection) ZPopMaxWithContext



#### func (Connection) ZPopMin



#### func (Connection) ZPopMinWithContext



#### func (Connection) ZRange



#### func (Connection) ZRangeByLex



#### func (Connection) ZRangeByLexWithContext



#### func (Connection) ZRangeByScore



#### func (Connection) ZRangeByScoreWithContext



#### func (Connection) ZRangeWithContext



#### func (Connection) ZRank



#### func (Connection) ZRankWithContext



#### func (Connection) ZRem



#### func (Connection) ZRemRangeByLex



#### func (Connection) ZRemRangeByLexWithContext



#### func (Connection) ZRemRangeByRank



#### func (Connection) ZRemRangeByRankWithContext



#### func (Connection) ZRemRangeByScore



#### func (Connection) ZRemRangeByScoreWithContext



#### func (Connection) ZRemWithContext



#### func (Connection) ZRevRange



#### func (Connection) ZRevRangeByLex



#### func (Connection) ZRevRangeByLexWithContext



#### func (Connection) ZRevRangeByScore



#### func (Connection) ZRevRangeByScoreWithContext



#### func (Connection) ZRevRangeWithContext



#### func (Connection) ZRevRank



#### func (Connection) ZRevRankWithContext



#### func (Connection) ZScan



#### func (Connection) ZScanWithContext



#### func (Connection) ZScore



#### func (Connection) ZScoreWithContext



#### func (Connection) ZUnionStore



#### func (Connection) ZUnionStoreWithContext



### type Factory



#### func (Factory) Connection



### type ServiceProvider



#### func (ServiceProvider) Register



#### func (ServiceProvider) Start



#### func (ServiceProvider) Stop



### type SubscribeException



