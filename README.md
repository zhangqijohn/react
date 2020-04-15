# This is for Nodejs  Full stack Framework

# 技术栈

> Web客户端
+ 前端框架：React + React-router + Redux + React-hook
+ 前端UI库：Ant-Design UI
+ 底层框架：Create-react-app + Webpack  + Nodejs
+ 开发规范： eslint + prettier + standard + jsdoc
+ 开发语言： typescript

> Server服务端
+ 后端框架: egg + koa
+ 数据中间件: mysql + redis + mongodb
+ 远程通信：grpc
+ ORM框架：typeorm
+ LADP: ldapjs
+ 开发规范：tslint + prettier + standard
+ 开发语言： typescript

# 目录结构
> web客户端
```
    ├─public //公共资源入口
    └─src
        ├─api //web api管理
        ├─assets //静态资源
        ├─components //框架公共组件
        ├─layouts //框架底层
        │  ├─footer
        │  ├─header
        │  ├─menu
        │  ├─nav
        │  └─slider
        ├─pages //web界面组件
        │  └─game
        ├─router //路由入口
        └─utils //工具函数
```

> Server服务端
```
    ├─app //node应用入口
    │  ├─controller //路由控制器
    │  ├─entity //数据实体
    │  ├─extend //公共函数
    │  ├─middleware //中间件管理
    │  ├─model //数据模型处理实体
    │  ├─proto //proto处理
    │  ├─public //公共静态资源管理
    │  │  └─statics
    │  ├─service //服务
    │  └─utils
    ├─config //node公共配置
    ├─logs //node错误、监控日志
    │  └─node-web
    ├─run runner应用配置映射
    ├─test 自动化用例测试入口
    └─typings typescript *.d.ts处理
        ├─app
        │  ├─controller
        │  ├─extend
        │  ├─middleware
        │  ├─model
        │  └─service
        └─config
```

# 使用指南

> 拉取项目
```
    git -b dev http://git.q1op.com/frontend/framework/node-web.git

```

> 修改 ip 地址

1. node-web/server/config/config.local.ts
1. node-web/src/setupProxy.js

> Web客户端
```
    cd node-web进入客户端目录
    yarn install 安装客户端依赖
    yarn start 启动web客户端

```

> Server服务端
```
    cd servier 进入服务端server目录
    npm install 安装node服务端依赖
    npm run dev 启动服务端开发环境
    npm start 启动服务端进程
    npm stop 停止服务端进程

```

### 未完成的清单：

* 客户端数据状态管理和layout结构
* 客户端自定义eslint规范
* 服务层自定义eslint规范
* oauth 2.0登录鉴权
* grpc通信
* single spa前端微服务
* dockerfile部署
* 静态资源访问
* swagger open api