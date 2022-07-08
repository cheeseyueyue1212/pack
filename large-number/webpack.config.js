// js压缩
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: "none",
  optimization: {
    minimizer: [
      // js压缩
      new TerserPlugin({
        include: /\.min\.js$/
      }),
    ],
    minimize:true,
  }
}