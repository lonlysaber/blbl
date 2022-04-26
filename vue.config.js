module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',

  
  
  devServer: {
    // Paths
    
    proxy: {
        '/proxyApi': {
            target: 'https://api.bilibili.com',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/proxyApi': '/'
            }
        },
        '/dyna': {
          target: 'https://api.vc.bilibili.com',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
              '^/dyna': '/'
          },
        },
        '/table': {
          target: 'https://bangumi.bilibili.com',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
              '^/table': '/'
          }
        },
        '/api': {
          target: 'https://www.bilibili.com',
          changeOrigin: true,
          pathRewrite: {
              '^/api': '/'
          }
        },
        '/search': {
          target: 'http://api.bilibili.cn/',
          changeOrigin: true,
          pathRewrite: {
              '^/search': '/'
          }
        },
        '/hot': {
          target: 'https://s.search.bilibili.com',
          changeOrigin: true,
          pathRewrite: {
              '^/hot': '/'
          }
        },
      },
    
  },
 

}
