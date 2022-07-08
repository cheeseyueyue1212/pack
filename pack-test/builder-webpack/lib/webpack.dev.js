const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9999,
    open: true,
  },
  // stats: 'errors-only',

  devtool: 'source-map'
}

module.exports = merge(baseConfig, devConfig);