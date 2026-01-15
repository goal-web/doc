# 前端资源管理

## 简介

Goal-Web 框架提供了一套简单而强大的方式来管理前端资源，如 CSS、JavaScript、图像和字体等。本文档将介绍如何在 Goal-Web 应用程序中组织、编译和使用前端资源。

## 资源目录结构

在 Goal-Web 应用程序中，前端资源通常存储在以下目录中：

```
/resources
    /js
        app.js
    /css
        app.css
    /sass
        app.scss
    /less
        app.less
    /images
        logo.png
    /fonts
        font.ttf
/public
    /js
    /css
    /images
    /fonts
```

- `resources` 目录包含未编译的资源文件
- `public` 目录包含编译后的资源文件，这些文件可以通过 Web 服务器直接访问

## 资源编译

Goal-Web 不提供内置的资源编译工具，但您可以使用流行的前端构建工具，如 Webpack、Gulp、Rollup 或 Vite，来编译和优化您的资源。

### 使用 Webpack

Webpack 是一个流行的模块打包工具，可以处理 JavaScript、CSS 和其他资源。以下是一个基本的 Webpack 配置示例：

1. 首先，安装 Webpack 和相关依赖：

```bash
npm init -y
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env css-loader style-loader file-loader
```

2. 创建 `webpack.config.js` 文件：

```javascript
const path = require('path');

module.exports = {
    entry: './resources/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    }
};
```

3. 在 `package.json` 中添加构建脚本：

```json
{
    "scripts": {
        "dev": "webpack --mode development --watch",
        "build": "webpack --mode production"
    }
}
```

4. 运行构建命令：

```bash
# 开发模式（监视文件变化）
npm run dev

# 生产模式
npm run build
```

### 使用 Vite

Vite 是一个更现代的前端构建工具，提供了更快的开发体验。以下是使用 Vite 的示例：

1. 安装 Vite：

```bash
npm init -y
npm install --save-dev vite
```

2. 创建 `vite.config.js` 文件：

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'resources',
    build: {
        outDir: '../public',
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'resources/js/app.js')
            },
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const extType = info[info.length - 1];
                    if (/\.(css|scss|sass|less)$/.test(assetInfo.name)) {
                        return `css/[name][extname]`;
                    }
                    if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
                        return `images/[name][extname]`;
                    }
                    if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
                        return `fonts/[name][extname]`;
                    }
                    return `[name][extname]`;
                }
            }
        }
    },
    server: {
        port: 3000
    }
});
```

3. 在 `package.json` 中添加脚本：

```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    }
}
```

4. 运行命令：

```bash
# 开发模式
npm run dev

# 生产模式
npm run build
```

## 在模板中使用资源

### 基本用法

在模板中，您可以使用 `asset` 函数来生成资源 URL：

```html
<link rel="stylesheet" href="{{ asset "/css/app.css" }}">
<script src="{{ asset "/js/app.js" }}"></script>
<img src="{{ asset "/images/logo.png" }}" alt="Logo">
```

`asset` 函数会自动添加适当的基本 URL 和版本查询字符串（如果启用了版本控制）。

### 版本控制

为了有效地处理缓存，您可以在资源 URL 中添加版本查询字符串。在 Goal-Web 中，您可以通过配置来启用资源版本控制：

```go
// config/app.go
package config

func init() {
    configs.Add("app", map[string]interface{}{
        // ...
        "asset_version": "1.0.0",
        // ...
    })
}
```

启用版本控制后，`asset` 函数生成的 URL 将包含版本查询字符串：

```html
<!-- 输出：/css/app.css?v=1.0.0 -->
<link rel="stylesheet" href="{{ asset "/css/app.css" }}">
```

### 内联资源

在某些情况下，您可能希望将 CSS 或 JavaScript 直接内联到 HTML 中，而不是通过外部文件引用。Goal-Web 提供了 `inline_css` 和 `inline_js` 函数来实现这一点：

```html
<style>
    {{ inline_css "/css/critical.css" }}
</style>

<script>
    {{ inline_js "/js/critical.js" }}
</script>
```

## 处理图像和其他静态资源

### 图像优化

为了提高网站性能，您应该优化图像。您可以使用工具如 `imagemin` 来压缩图像：

1. 安装依赖：

```bash
npm install --save-dev imagemin-cli
```

2. 在 `package.json` 中添加脚本：

```json
{
    "scripts": {
        "optimize-images": "imagemin resources/images/* --out-dir=public/images"
    }
}
```

3. 运行优化命令：

```bash
npm run optimize-images
```

### 使用 SVG

SVG 是一种矢量图形格式，适合图标和简单图形。您可以直接在 HTML 中使用 SVG，或者通过 `img` 标签引用 SVG 文件：

```html
<!-- 直接在 HTML 中使用 SVG -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>

<!-- 通过 img 标签引用 SVG 文件 -->
<img src="{{ asset "/images/icon.svg" }}" alt="Icon">
```

## 使用 CSS 预处理器

Goal-Web 支持使用 CSS 预处理器，如 Sass、Less 或 Stylus。以下是使用 Sass 的示例：

1. 安装依赖：

```bash
npm install --save-dev sass sass-loader
```

2. 更新 Webpack 配置：

```javascript
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
```

3. 在 JavaScript 中导入 Sass 文件：

```javascript
// resources/js/app.js
import '../sass/app.scss';
```

## 使用 JavaScript 框架

### Vue.js

要在 Goal-Web 中使用 Vue.js，您可以按照以下步骤操作：

1. 安装 Vue.js 和相关依赖：

```bash
npm install vue vue-loader vue-template-compiler
```

2. 更新 Webpack 配置：

```javascript
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
```

3. 创建 Vue 组件：

```vue
<!-- resources/js/components/Example.vue -->
<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
        <button @click="sayHello">Say Hello</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Vue Component',
            message: 'This is a Vue component'
        };
    },
    methods: {
        sayHello() {
            alert('Hello from Vue!');
        }
    }
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
```

4. 在 JavaScript 中使用 Vue 组件：

```javascript
// resources/js/app.js
import Vue from 'vue';
import Example from './components/Example.vue';

new Vue({
    el: '#app',
    components: {
        Example
    }
});
```

5. 在模板中使用 Vue 组件：

```html
<div id="app">
    <example></example>
</div>

<script src="{{ asset "/js/app.js" }}"></script>
```

### React

要在 Goal-Web 中使用 React，您可以按照以下步骤操作：

1. 安装 React 和相关依赖：

```bash
npm install react react-dom @babel/preset-react
```

2. 更新 Webpack 配置：

```javascript
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // ...
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
```

3. 创建 React 组件：

```jsx
// resources/js/components/Example.jsx
import React, { useState } from 'react';

function Example() {
    const [message, setMessage] = useState('This is a React component');
    
    function sayHello() {
        alert('Hello from React!');
    }
    
    return (
        <div>
            <h1>React Component</h1>
            <p>{message}</p>
            <button onClick={sayHello}>Say Hello</button>
        </div>
    );
}

export default Example;
```

4. 在 JavaScript 中使用 React 组件：

```javascript
// resources/js/app.js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';

ReactDOM.render(<Example />, document.getElementById('app'));
```

5. 在模板中使用 React 组件：

```html
<div id="app"></div>

<script src="{{ asset "/js/app.js" }}"></script>
```

## 资源优化

### 代码分割

代码分割是一种将代码分割成更小的块的技术，可以按需加载，从而提高应用程序的性能。在 Webpack 中，您可以使用动态导入来实现代码分割：

```javascript
// 动态导入
import('./module').then(module => {
    // 使用模块
});
```

### 懒加载

懒加载是一种延迟加载资源的技术，直到需要时才加载。这可以提高初始页面加载速度。例如，您可以懒加载图像：

```html
<img data-src="{{ asset "/images/large-image.jpg" }}" class="lazy" alt="Large Image">
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
```

### 压缩和最小化

压缩和最小化资源可以减少文件大小，从而提高加载速度。在 Webpack 中，您可以使用插件来压缩 JavaScript 和 CSS：

1. 安装依赖：

```bash
npm install --save-dev terser-webpack-plugin css-minimizer-webpack-plugin
```

2. 更新 Webpack 配置：

```javascript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // ...
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
};
```

## 最佳实践

### 使用 CDN

内容分发网络 (CDN) 可以提高资源的加载速度。您可以将静态资源上传到 CDN，并在配置中设置 CDN URL：

```go
// config/app.go
package config

func init() {
    configs.Add("app", map[string]interface{}{
        // ...
        "asset_url": "https://cdn.example.com",
        // ...
    })
}
```

然后，`asset` 函数将使用 CDN URL 作为基本 URL：

```html
<!-- 输出：https://cdn.example.com/css/app.css -->
<link rel="stylesheet" href="{{ asset "/css/app.css" }}">
```

### 缓存策略

适当的缓存策略可以提高应用程序的性能。您可以在 Web 服务器中设置缓存头：

```go
// 在中间件中设置缓存头
func CacheControlMiddleware(request contracts.HttpRequest, next contracts.Pipe) any {
	response := next(request).(contracts.HttpResponse)

	// 对静态资源设置长期缓存
	path := request.Path()
	if strings.HasPrefix(path, "/js/") || strings.HasPrefix(path, "/css/") || strings.HasPrefix(path, "/images/") {
		response.Headers().Set("Cache-Control", "public, max-age=31536000, immutable")
	}

	return response
}
```

### 性能监控

监控前端性能可以帮助您识别和解决性能问题。您可以使用工具如 Lighthouse、WebPageTest 或浏览器开发者工具来评估性能。

## 下一步

现在您已经了解了如何在 Goal-Web 中管理前端资源，您可以继续阅读以下文档：

- [AJAX 请求](ajax.md)
- [WebSocket](websockets.md)
- [前端模板](templates.md)
