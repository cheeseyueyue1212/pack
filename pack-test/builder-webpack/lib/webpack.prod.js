
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base');

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
// js压缩
const TerserPlugin = require("terser-webpack-plugin");
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const prodConfig = {
  mode: 'production',
  plugins: [
    // new HtmlWebpackExternalsPlugin({
    //   // 包工具CDN
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://unpkg.com/react@18/umd/react.production.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    //       global: 'ReactDOM'
    //     }
    //   ],
    // }),
  ],
  optimization: {
    minimizer: [
      // js压缩
      new TerserPlugin(),
      // css压缩
      new CssMinimizerPlugin()
    ],
    minimize:true,

    // 分离公共包
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // 使用次数多，可以单独打包
        commons: {
          name: 'commons',
          chunks: 'all',
          // 使用次数
          minChunks: 2
        },
        defaultVendors: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        }
      },
    },
  },
};
module.exports = merge(baseConfig, prodConfig);