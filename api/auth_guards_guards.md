# Package guards

Package guards contains authentication guard implementations.
包 guards 包含认证守卫的实现。

Package guards contains authentication guard implementations.
包 guards 包含认证守卫的实现。


## Functions

### func SessionGuard

```go
func SessionGuard(
```

SessionGuard creates a session-based authentication guard.
SessionGuard 创建基于会话的认证守卫。


## Types

### type Jwt

Jwt implements a JWT-based authentication guard.
Jwt 实现基于 JWT 的认证守卫。


#### func (Jwt) Check

Check verifies if a user is authenticated.
Check 验证用户是否已认证。


#### func (Jwt) Error

Error returns any authentication errors.
Error 返回任何认证错误。


#### func (Jwt) GetAuthenticatableKey

GetAuthenticatableKey returns the key of the authenticated user.
GetAuthenticatableKey 返回认证用户的键。


#### func (Jwt) Guest

Guest verifies if the user is a guest (not authenticated).
Guest 验证用户是否为访客（未认证）。


#### func (Jwt) Login

Login authenticates the user and generates a JWT token.
Login 认证用户并生成 JWT 令牌。


#### func (Jwt) Logout

Logout logs the user out by blacklisting the JWT token.
Logout 通过将 JWT 令牌列入黑名单来注销用户。


#### func (Jwt) Once

Once authenticates the user without storing in session.
Once 认证用户但不存储在会话中。


#### func (Jwt) SetRedis

SetRedis sets the Redis connection for token blacklisting.
SetRedis 设置用于令牌黑名单的 Redis 连接。


#### func (Jwt) SetToken

SetToken sets the JWT token to be used for authentication.
SetToken 设置用于认证的 JWT 令牌。


#### func (Jwt) User

User returns the currently authenticated user.
User 返回当前认证的用户。


#### func (Jwt) Verify

Verify validates a JWT token and returns the authenticated user.
Verify 验证 JWT 令牌并返回认证用户。


### type JwtAuthClaims

JwtAuthClaims represents the claims in a JWT token for authentication.
JwtAuthClaims 表示用于认证的 JWT 令牌中的声明。


### type Session

Session implements a session-based authentication guard.
Session 实现基于会话的认证守卫。


#### func (Session) Check

Check verifies if a user is authenticated.
Check 验证用户是否已认证。


#### func (Session) Error

Error returns any authentication errors.
Error 返回任何认证错误。


#### func (Session) GetAuthenticatableKey

GetAuthenticatableKey returns the key of the authenticated user.
GetAuthenticatableKey 返回认证用户的键。


#### func (Session) Guest

Guest verifies if the user is a guest (not authenticated).
Guest 验证用户是否为访客（未认证）。


#### func (Session) Login

Login authenticates the user and stores in session.
Login 认证用户并存储在会话中。


#### func (Session) Logout

Logout logs the user out of the session.
Logout 从会话中注销用户。


#### func (Session) Once

Once authenticates the user without storing in session.
Once 认证用户但不存储在会话中。


#### func (Session) User

User returns the currently authenticated user.
User 返回当前认证的用户。


