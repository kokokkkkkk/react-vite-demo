基于，React18、Antd4，react-router-dom6及相关技术栈开发

## 初始化
```bash
# 安装依赖
npm i
# 启动服务
npm run dev
```

## 项目接口
```bash
接口使用的是心脏跳动旗下newbee-mall系列产品
# 项目地址
https://github.com/newbee-ltd/vue3-admin

```

### vite.config  配置项
```bash
 // 本地开发环境服务
    ...
    // 服务器代理，解决开发环境的跨域问题
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
      ...
    }
```