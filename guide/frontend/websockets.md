# WebSocket

## 简介

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。它提供了在客户端和服务器之间建立持久连接的标准方式，使得双方可以随时发送数据。Goal-Web 框架提供了对 WebSocket 的支持，使您能够轻松地构建实时应用程序，如聊天应用、实时通知和在线游戏等。

## 基本概念

WebSocket 连接是通过 HTTP 握手开始的，然后升级到 WebSocket 协议。一旦连接建立，客户端和服务器可以直接通过该连接发送消息，而无需重新发起请求。

## 服务器端实现

### 安装依赖

首先，您需要安装 WebSocket 相关的依赖：

```bash
go get github.com/goal-web/websocket
```

### 配置 WebSocket 服务器

在 `config/app.go` 文件中，确保 WebSocket 服务提供者已注册：

```go
package config

import (
    "github.com/goal-web/application"
    "github.com/goal-web/websocket"
    // 其他导入
)

func init() {
    application.Providers = append(
        application.Providers,
        // 其他服务提供者
        websocket.ServiceProvider{},
    )
}
```

### 创建 WebSocket 处理器

创建一个 WebSocket 处理器来处理连接和消息：

```go
package websockets

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/supports/logs"
    "github.com/goal-web/websocket"
)

type ChatHandler struct {
    // 依赖注入
}

// OnOpen 处理新连接
func (handler *ChatHandler) OnOpen(socket contracts.WebSocket) {
    logs.Default().Info("New connection opened", socket.ID())
    
    // 将连接添加到聊天室
    socket.Join("chat-room")
    
    // 发送欢迎消息
    socket.Emit("welcome", map[string]interface{}{
        "message": "Welcome to the chat room!",
    })
}

// OnClose 处理连接关闭
func (handler *ChatHandler) OnClose(socket contracts.WebSocket) {
    logs.Default().Info("Connection closed", socket.ID())
    
    // 从聊天室移除连接
    socket.Leave("chat-room")
}

// OnError 处理错误
func (handler *ChatHandler) OnError(socket contracts.WebSocket, err error) {
    logs.Default().Error("WebSocket error", err)
}

// OnMessage 处理接收到的消息
func (handler *ChatHandler) OnMessage(socket contracts.WebSocket, message string) {
    logs.Default().Info("Received message", message)
    
    // 广播消息到聊天室
    socket.Broadcast("chat-room", "message", map[string]interface{}{
        "user":    socket.ID(),
        "message": message,
    })
}

// 处理特定事件
func (handler *ChatHandler) OnEvent(socket contracts.WebSocket, event string, data interface{}) {
    switch event {
    case "typing":
        // 广播用户正在输入
        socket.Broadcast("chat-room", "typing", map[string]interface{}{
            "user": socket.ID(),
        })
    case "join-room":
        // 处理加入房间请求
        if room, ok := data.(string); ok {
            socket.Join(room)
            socket.Emit("joined", map[string]interface{}{
                "room": room,
            })
        }
    }
}
```

### 注册 WebSocket 路由

在 `routes/websocket.go` 文件中，注册 WebSocket 路由：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/websocket"
    "your-app/app/websockets"
)

func WebSocket(route contracts.Route) {
    // 注册 WebSocket 路由
    route.WebSocket("/ws/chat", websockets.ChatHandler{})
    
    // 您可以注册多个 WebSocket 路由
    // route.WebSocket("/ws/notifications", websockets.NotificationHandler{})
}
```

然后，在 `routes/web.go` 文件中，确保 WebSocket 路由已加载：

```go
package routes

import (
    "github.com/goal-web/contracts"
)

func Web(route contracts.Route) {
    // 加载 WebSocket 路由
    WebSocket(route)
    
    // 其他 Web 路由
}
```

## 客户端实现

### 使用原生 WebSocket API

在前端，您可以使用浏览器的原生 WebSocket API 连接到服务器：

```javascript
// 创建 WebSocket 连接
const socket = new WebSocket('ws://localhost:8080/ws/chat');

// 连接打开时触发
socket.addEventListener('open', (event) => {
    console.log('Connection opened');
});

// 接收到消息时触发
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log('Received message:', data);
    
    // 处理不同类型的消息
    if (data.event === 'welcome') {
        console.log('Welcome message:', data.data.message);
    } else if (data.event === 'message') {
        displayMessage(data.data.user, data.data.message);
    } else if (data.event === 'typing') {
        showTypingIndicator(data.data.user);
    }
});

// 连接关闭时触发
socket.addEventListener('close', (event) => {
    console.log('Connection closed');
});

// 发生错误时触发
socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
});

// 发送消息
function sendMessage(message) {
    socket.send(JSON.stringify({
        event: 'message',
        data: message
    }));
}

// 发送正在输入事件
function sendTyping() {
    socket.send(JSON.stringify({
        event: 'typing',
        data: null
    }));
}

// 加入房间
function joinRoom(room) {
    socket.send(JSON.stringify({
        event: 'join-room',
        data: room
    }));
}
```

### 使用 Socket.IO 客户端

如果您在服务器端使用了 Socket.IO 兼容的库，您可以使用 Socket.IO 客户端：

1. 首先，安装 Socket.IO 客户端：

```bash
npm install socket.io-client
```

2. 然后，在 JavaScript 中使用 Socket.IO：

```javascript
import { io } from 'socket.io-client';

// 创建 Socket.IO 连接
const socket = io('http://localhost:8080', {
    path: '/ws/socket.io'
});

// 连接事件
socket.on('connect', () => {
    console.log('Connected to server');
});

// 接收欢迎消息
socket.on('welcome', (data) => {
    console.log('Welcome message:', data.message);
});

// 接收聊天消息
socket.on('message', (data) => {
    displayMessage(data.user, data.message);
});

// 接收正在输入事件
socket.on('typing', (data) => {
    showTypingIndicator(data.user);
});

// 接收加入房间确认
socket.on('joined', (data) => {
    console.log('Joined room:', data.room);
});

// 断开连接事件
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// 发送消息
function sendMessage(message) {
    socket.emit('message', message);
}

// 发送正在输入事件
function sendTyping() {
    socket.emit('typing');
}

// 加入房间
function joinRoom(room) {
    socket.emit('join-room', room);
}
```

## 实现聊天应用示例

### 服务器端代码

```go
package websockets

import (
    "encoding/json"
    "github.com/goal-web/contracts"
    "github.com/goal-web/supports/logs"
    "github.com/goal-web/websocket"
    "time"
)

type ChatMessage struct {
    User      string    `json:"user"`
    Message   string    `json:"message"`
    Timestamp time.Time `json:"timestamp"`
}

type ChatHandler struct {
    // 存储最近的消息
    messages []ChatMessage
}

// OnOpen 处理新连接
func (handler *ChatHandler) OnOpen(socket contracts.WebSocket) {
    logs.Default().Info("New connection opened", socket.ID())
    
    // 将连接添加到聊天室
    socket.Join("chat-room")
    
    // 发送欢迎消息
    socket.Emit("welcome", map[string]interface{}{
        "message": "Welcome to the chat room!",
    })
    
    // 发送最近的消息历史
    socket.Emit("history", handler.messages)
}

// OnClose 处理连接关闭
func (handler *ChatHandler) OnClose(socket contracts.WebSocket) {
    logs.Default().Info("Connection closed", socket.ID())
    
    // 从聊天室移除连接
    socket.Leave("chat-room")
    
    // 通知其他用户
    socket.Broadcast("chat-room", "user-left", map[string]interface{}{
        "user": socket.ID(),
    })
}

// OnError 处理错误
func (handler *ChatHandler) OnError(socket contracts.WebSocket, err error) {
    logs.Default().Error("WebSocket error", err)
}

// OnMessage 处理接收到的消息
func (handler *ChatHandler) OnMessage(socket contracts.WebSocket, message string) {
    logs.Default().Info("Received message", message)
    
    // 解析消息
    var data map[string]interface{}
    if err := json.Unmarshal([]byte(message), &data); err != nil {
        logs.Default().Error("Failed to parse message", err)
        return
    }
    
    // 处理不同类型的事件
    if event, ok := data["event"].(string); ok {
        switch event {
        case "message":
            // 处理聊天消息
            if content, ok := data["data"].(string); ok {
                // 创建消息对象
                chatMessage := ChatMessage{
                    User:      socket.ID(),
                    Message:   content,
                    Timestamp: time.Now(),
                }
                
                // 存储消息
                handler.messages = append(handler.messages, chatMessage)
                if len(handler.messages) > 100 {
                    // 只保留最近的 100 条消息
                    handler.messages = handler.messages[1:]
                }
                
                // 广播消息到聊天室
                socket.Broadcast("chat-room", "message", chatMessage)
            }
        case "typing":
            // 广播用户正在输入
            socket.Broadcast("chat-room", "typing", map[string]interface{}{
                "user": socket.ID(),
            })
        case "join-room":
            // 处理加入房间请求
            if room, ok := data["data"].(string); ok {
                socket.Join(room)
                socket.Emit("joined", map[string]interface{}{
                    "room": room,
                })
                
                // 通知其他用户
                socket.Broadcast(room, "user-joined", map[string]interface{}{
                    "user": socket.ID(),
                })
            }
        }
    }
}
```

### 前端 HTML 和 JavaScript

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Goal-Web 聊天应用</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .chat-container {
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .chat-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
        }
        
        .chat-messages {
            height: 400px;
            overflow-y: auto;
            padding: 10px;
            background-color: #f9f9f9;
        }
        
        .message {
            margin-bottom: 10px;
            padding: 8px 12px;
            border-radius: 5px;
            max-width: 70%;
            word-wrap: break-word;
        }
        
        .message-self {
            background-color: #DCF8C6;
            margin-left: auto;
        }
        
        .message-other {
            background-color: #FFFFFF;
        }
        
        .message-info {
            text-align: center;
            color: #888;
            margin: 10px 0;
        }
        
        .message-meta {
            font-size: 0.8em;
            color: #888;
            margin-top: 5px;
        }
        
        .typing-indicator {
            color: #888;
            font-style: italic;
            padding: 5px 10px;
            display: none;
        }
        
        .chat-input {
            display: flex;
            padding: 10px;
            background-color: #FFFFFF;
            border-top: 1px solid #ccc;
        }
        
        .chat-input input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin-right: 10px;
        }
        
        .chat-input button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .chat-input button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h2>Goal-Web 聊天室</h2>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="typing-indicator" id="typing-indicator"></div>
        <div class="chat-input">
            <input type="text" id="message-input" placeholder="输入消息..." autocomplete="off">
            <button id="send-button">发送</button>
        </div>
    </div>
    
    <script>
        // 创建 WebSocket 连接
        const socket = new WebSocket('ws://localhost:8080/ws/chat');
        
        // DOM 元素
        const chatMessages = document.getElementById('chat-messages');
        const typingIndicator = document.getElementById('typing-indicator');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        
        // 用户 ID
        let userId = '';
        
        // 连接打开时触发
        socket.addEventListener('open', (event) => {
            console.log('Connection opened');
            addInfoMessage('已连接到聊天服务器');
        });
        
        // 接收到消息时触发
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
            
            // 处理不同类型的消息
            if (data.event === 'welcome') {
                addInfoMessage(data.data.message);
                userId = data.data.userId || 'user-' + Math.floor(Math.random() * 1000);
            } else if (data.event === 'message') {
                addChatMessage(data.data.user, data.data.message, data.data.timestamp, false);
            } else if (data.event === 'typing') {
                showTypingIndicator(data.data.user);
            } else if (data.event === 'history') {
                // 显示历史消息
                data.data.forEach(msg => {
                    addChatMessage(msg.user, msg.message, msg.timestamp, msg.user === userId);
                });
                addInfoMessage('以上是历史消息');
            } else if (data.event === 'user-joined') {
                addInfoMessage(`用户 ${data.data.user} 加入了聊天室`);
            } else if (data.event === 'user-left') {
                addInfoMessage(`用户 ${data.data.user} 离开了聊天室`);
            }
        });
        
        // 连接关闭时触发
        socket.addEventListener('close', (event) => {
            console.log('Connection closed');
            addInfoMessage('与服务器的连接已关闭');
        });
        
        // 发生错误时触发
        socket.addEventListener('error', (event) => {
            console.error('WebSocket error:', event);
            addInfoMessage('连接错误，请刷新页面重试');
        });
        
        // 发送按钮点击事件
        sendButton.addEventListener('click', sendMessage);
        
        // 输入框按下回车键事件
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
        
        // 输入框输入事件
        let typingTimeout;
        messageInput.addEventListener('input', () => {
            clearTimeout(typingTimeout);
            
            // 发送正在输入事件
            socket.send(JSON.stringify({
                event: 'typing',
                data: null
            }));
            
            // 5 秒后停止显示正在输入
            typingTimeout = setTimeout(() => {
                // 可以发送停止输入事件
            }, 5000);
        });
        
        // 发送消息
        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                // 发送消息到服务器
                socket.send(JSON.stringify({
                    event: 'message',
                    data: message
                }));
                
                // 显示自己的消息
                addChatMessage(userId, message, new Date().toISOString(), true);
                
                // 清空输入框
                messageInput.value = '';
            }
        }
        
        // 添加聊天消息
        function addChatMessage(user, message, timestamp, isSelf) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${isSelf ? 'message-self' : 'message-other'}`;
            
            const formattedTime = formatTimestamp(timestamp);
            
            messageElement.innerHTML = `
                <div>${escapeHtml(message)}</div>
                <div class="message-meta">
                    ${isSelf ? '你' : escapeHtml(user)} · ${formattedTime}
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            scrollToBottom();
        }
        
        // 添加信息消息
        function addInfoMessage(message) {
            const infoElement = document.createElement('div');
            infoElement.className = 'message-info';
            infoElement.textContent = message;
            
            chatMessages.appendChild(infoElement);
            scrollToBottom();
        }
        
        // 显示正在输入指示器
        function showTypingIndicator(user) {
            typingIndicator.textContent = `${user} 正在输入...`;
            typingIndicator.style.display = 'block';
            
            // 3 秒后隐藏
            setTimeout(() => {
                typingIndicator.style.display = 'none';
            }, 3000);
        }
        
        // 滚动到底部
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // 格式化时间戳
        function formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleTimeString();
        }
        
        // 转义 HTML
        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    </script>
</body>
</html>
```

## 扩展功能

### 房间和频道

WebSocket 连接可以加入不同的房间或频道，以便进行分组通信：

```go
// 加入房间
socket.Join("room-name")

// 离开房间
socket.Leave("room-name")

// 向房间广播消息
socket.Broadcast("room-name", "event-name", data)
```

### 身份验证

您可以使用中间件对 WebSocket 连接进行身份验证：

```go
package routes

import (
    "github.com/goal-web/contracts"
    "github.com/goal-web/http/middleware"
    "github.com/goal-web/websocket"
    "your-app/app/websockets"
)

func WebSocket(route contracts.Route) {
    // 使用身份验证中间件
    route.Group("/ws", func(route contracts.Route) {
        route.Use(middleware.Auth())
        
        // 注册 WebSocket 路由
        route.WebSocket("/chat", websockets.ChatHandler{})
    })
}
```

在 WebSocket 处理器中，您可以访问已认证的用户：

```go
func (handler *ChatHandler) OnOpen(socket contracts.WebSocket) {
    // 获取已认证的用户
    user := socket.Get("user")
    
    // 使用用户信息
    if user != nil {
        // ...
    }
}
```

### 心跳检测

为了保持连接活跃，您可以实现心跳检测机制：

```go
func (handler *ChatHandler) OnOpen(socket contracts.WebSocket) {
    // 设置心跳检测
    go func() {
        ticker := time.NewTicker(30 * time.Second)
        defer ticker.Stop()
        
        for {
            select {
            case <-ticker.C:
                // 发送 ping 消息
                err := socket.Emit("ping", nil)
                if err != nil {
                    // 连接可能已关闭
                    return
                }
            }
        }
    }()
}
```

在客户端，响应 ping 消息：

```javascript
// 处理 ping 消息
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    
    if (data.event === 'ping') {
        // 响应 pong 消息
        socket.send(JSON.stringify({
            event: 'pong',
            data: null
        }));
    }
    
    // 处理其他消息...
});
```

## 最佳实践

### 连接管理

- **限制连接数**：设置每个客户端的最大连接数，以防止资源耗尽。
- **超时处理**：实现连接超时机制，自动关闭空闲连接。
- **重连机制**：在客户端实现自动重连逻辑，以处理网络波动。

### 消息处理

- **消息格式**：使用一致的消息格式，如 JSON 结构，包含事件类型和数据。
- **消息验证**：验证接收到的消息格式和内容，以防止恶意输入。
- **消息队列**：对于高流量应用，考虑使用消息队列来处理 WebSocket 消息。

### 安全性

- **身份验证**：确保 WebSocket 连接经过身份验证。
- **授权**：验证用户是否有权限执行特定操作。
- **速率限制**：实现消息速率限制，以防止滥用。
- **数据验证**：验证所有传入的数据，以防止注入攻击。

### 扩展性

- **水平扩展**：使用 Redis 或其他分布式系统来同步多个服务器实例之间的 WebSocket 连接。
- **负载均衡**：使用支持 WebSocket 的负载均衡器，如 Nginx 或 HAProxy。

## 下一步

现在您已经了解了如何在 Goal-Web 中使用 WebSocket，您可以继续阅读以下文档：

- [前端模板](templates.md)
- [前端资源](assets.md)
- [AJAX 请求](ajax.md)