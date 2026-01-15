import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	base: '/doc/',
	title: "Goal Web",
	description: "A modern Go web framework",
	cleanUrls: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started/installation' },
      { text: '贡献', link: '/guide/prologue/contribution-guide' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '前言',
          collapsed: false,
          items: [
            { text: '发布说明', link: '/guide/prologue/release-notes' },
            { text: '升级指南', link: '/guide/prologue/upgrade-guide' },
            { text: '贡献指南', link: '/guide/prologue/contribution-guide' },
          ]
        },
        {
          text: '入门指南',
          collapsed: false,
          items: [
            { text: '安装', link: '/guide/getting-started/installation' },
            { text: '目录结构', link: '/guide/getting-started/directory-structure' },
            { text: '配置', link: '/guide/getting-started/configuration' },
            { text: '部署', link: '/guide/getting-started/deployment' },
          ]
        },
        {
          text: '核心架构',
          collapsed: true,
          items: [
            { text: '应用生命周期', link: '/guide/architecture/application-lifecycle' },
            { text: '服务容器', link: '/guide/architecture/service-container' },
            { text: '服务提供者', link: '/guide/architecture/providers' },
            { text: 'Facades', link: '/guide/architecture/facades' },
          ]
        },
        {
          text: '基础功能',
          collapsed: true,
          items: [
            { text: '路由', link: '/guide/basics/routing' },
            { text: '中间件', link: '/guide/basics/middleware' },
            { text: '控制器', link: '/guide/basics/controllers' },
            { text: '请求', link: '/guide/basics/requests' },
            { text: '响应', link: '/guide/basics/responses' },
            { text: '视图', link: '/guide/basics/views' },
            { text: '验证', link: '/guide/basics/validation' },
            { text: '错误处理', link: '/guide/basics/errors' },
            { text: '日志', link: '/guide/basics/logging' },
          ]
        },
        {
          text: '前端开发',
          collapsed: true,
          items: [
            { text: '模板', link: '/guide/frontend/templates' },
            { text: '资源', link: '/guide/frontend/assets' },
            { text: 'AJAX', link: '/guide/frontend/ajax' },
            { text: 'WebSockets', link: '/guide/frontend/websockets' },
          ]
        },
        {
          text: '安全相关',
          collapsed: true,
          items: [
            { text: '认证', link: '/guide/security/authentication' },
            { text: '授权', link: '/guide/security/authorization' },
            { text: '加密', link: '/guide/security/encryption' },
            { text: 'CSRF', link: '/guide/security/csrf' },
          ]
        },
        {
          text: '数据库',
          collapsed: true,
          items: [
            { text: '入门', link: '/guide/database/getting-started' },
            { text: '查询构建器', link: '/guide/database/query-builder' },
            { text: '迁移', link: '/guide/database/migrations' },
            { text: '填充', link: '/guide/database/seeding' },
          ]
        },
        {
          text: 'ORM',
          collapsed: true,
          items: [
            { text: '入门', link: '/guide/orm/getting-started' },
            { text: '关联', link: '/guide/orm/relationships' },
            { text: '集合', link: '/guide/orm/collections' },
            { text: '修改器', link: '/guide/orm/mutators' },
            { text: '序列化', link: '/guide/orm/serialization' },
          ]
        },
        {
          text: '深入了解',
          collapsed: true,
          items: [
            { text: '缓存', link: '/guide/digging-deeper/cache' },
            { text: '事件', link: '/guide/digging-deeper/events' },
            { text: '队列', link: '/guide/digging-deeper/queues' },
            { text: '任务调度', link: '/guide/digging-deeper/scheduling' },
          ]
        },
        {
          text: '微服务',
          collapsed: true,
          items: [
            { text: '简介', link: '/guide/microservices/introduction' },
            { text: '服务发现', link: '/guide/microservices/service-discovery' },
          ]
        },
        {
          text: '测试',
          collapsed: true,
          items: [
            { text: '入门', link: '/guide/testing/getting-started' },
            { text: 'HTTP 测试', link: '/guide/testing/http-tests' },
            { text: 'Mocking', link: '/guide/testing/mocking' },
          ]
        },
        {
          text: '部署',
          collapsed: true,
          items: [
            { text: '服务器要求', link: '/guide/deployment/server-requirements' },
            { text: '优化', link: '/guide/deployment/optimization' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            // This list should ideally be auto-generated or just link to the main api index
            { text: 'Application', link: '/api/application_application' },
            { text: 'Auth', link: '/api/auth_auth' },
            { text: 'Config', link: '/api/config_config' },
            { text: 'Console', link: '/api/console_console' },
            { text: 'Container', link: '/api/container_container' },
            { text: 'Contracts', link: '/api/contracts_contracts' },
            { text: 'Database', link: '/api/database_database' },
            { text: 'Events', link: '/api/events_events' },
            { text: 'Filesystem', link: '/api/filesystem_filesystem' },
            { text: 'Http', link: '/api/http_http' },
            { text: 'Log', link: '/api/supports_logs_logs' },
            { text: 'Queue', link: '/api/queue_queue' },
            { text: 'Redis', link: '/api/redis_redis' },
            { text: 'Routing', link: '/api/routing_routing' },
            { text: 'Session', link: '/api/session_session' },
            { text: 'Support', link: '/api/supports_supports' },
            { text: 'Validation', link: '/api/validation_validation' },
            { text: 'View', link: '/api/views_views' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/goal-web/goal-web' }
    ]
  }
})
