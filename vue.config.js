const envConfig = require("./src/config/env_config")

module.exports = {
  publicPath: envConfig.publicPath, // 部署应用包时的基本 url
  outputDir: "dist", // build 构建文件目录
  assetsDir: "static", // 静态资源目录
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
}
