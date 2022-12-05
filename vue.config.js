const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack:{
    resolve:{
      fallback:{ path: require.resolve("path-browserify") },
    }
  },

  pluginOptions:{
    'style-resources-loader':{
      preProcessor:'scss',
      patterns:[]
    }
  },

  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // open: process.platform === 'darwin',
    //将服务启动后默认打开浏览器
    proxy: {// 设置代理
      '/api': {
        target: 'http://127.0.0.1:1212',

        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       "target": "http://localhost:1000",
  //       "changeOrigin": true,
  //       "pathRewrite": {
  //         "^/api": ""
  //       }
  //     }
  //   },
  // }
})
