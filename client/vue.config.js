module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8088,
    https: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://localhost:6000/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
