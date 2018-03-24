# 数字财经

## 项目相关库说明

- dva@2.x
- roadhog@2.x
- antd-mobile@2.x
详细依赖见 package.json

## 项目介绍

数字财经项目基于dvajs+roadhog,并使用antd-mobile作为基础组件库

## 环境准备

```bash
# 准备
# 安装 Node.js (7.6+)
# [Node.js](https://nodejs.org/en/)

# 克隆项目
$ git clone xxxx/df.git
# 安装依赖
# 建议使用 [cnpm](https://npm.taobao.org/)
$ npm i
# or
$ cnpm i

```

### 部署

```bash
把构建项目生成的dist文件夹上传到服务器
```


## 开发流程

```bash
# 启动服务
$ npm start
访问 http://127.0.0.1:8000/#/ + 路由
```

- 2、构建项目
```bash
$ npm run build
```

## 目录结构

```
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # (存放多页面入口html)公共文件，编译时copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── index.js     # 统一出口
│ ├── /routes/       # 页面容器
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ │ ├── skin.scss    # 全局样式
│ │ └── vars.scss    # 全局样式变量
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ └── request.js   # 异步请求函数
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .webpackrc.js    # roadhog配置
```