// 去除console
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css']
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  // publicPath: "https://cilixing-static.oss-cn-shanghai.aliyuncs.com/magnetarpwa/",
  //  publicPath: "./",
  // assetsPublicPath: "./", //
  // productionSourceMap: false,

  // something else codes
  configureWebpack: (config) => {
    config.plugins.push( // 打包后清除断点和控制台打印
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true, // 注释debugger
            drop_console: true, // 注释console
            pure_funcs: ['console.log'] // 移除console
          },
        },
        sourceMap: false, // 去除打包后生成的.map文件
        parallel: true,
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })

    );

  },
  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
      enableBridge: undefined
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Magnetar Search',
      short_name: 'Magnetar',
      background_color: '#ffffff',
    },
  },
}

// // 手机app打包方式
// // module.exports = {
// // 	publicPath: "./",
// // 	productionSourceMap: false,
// // }


