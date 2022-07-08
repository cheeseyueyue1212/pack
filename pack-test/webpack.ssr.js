
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const webpack = require('webpack')
// css单独文件打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// js压缩
const TerserPlugin = require("terser-webpack-plugin");
// 删除上一次打包结果文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 多设备自动兼容 css
const autoprefixer = require('autoprefixer');
// 多页面应用时，获取目录
const glob = require('glob')

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const ESLintPlugin = require('eslint-webpack-plugin');


const setMPF = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // 获取所有的匹配目录
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index]

      // '/Users/liyue/Documents/pack/src/index/index.js',
      const match = entryFile.match(/src\/(.*)\/index-server\.js/);
      const pageName = match && match[1];

      if (pageName) {
        entry[pageName] = entryFile

        htmlWebpackPlugins.push(
          new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${pageName}/index.html`),
            chunks: ['vendors', 'commons', pageName],
            filename: `${pageName}.html`,
            inject: true,
            minify: {
              html5: true,
              collapseWhitespace: true,
              preserveLineBreaks: false,
              minifyCSS: true,
              minifyJS: true,
              removeComments: false
            }
          }),
        );
      }
    })

  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry, htmlWebpackPlugins}  = setMPF()


module.exports = {
  // 配置入口文件 entry
  entry,
  output: {
    filename: '[name]-server.js',
    path: __dirname + '/dist', // 绝对路径
    libraryTarget: 'umd',
    globalObject: 'this',
    publicPath: './'
  },
  mode: 'production',
  // mode: 'none',
  module: {
    rules: [
      {test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]},
      {test: /\.scss/, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
      {test: /\.less$/, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [autoprefixer({
                    overrideBrowserslist: [
                        'last 10 Chrome versions',
                        'last 5 Firefox versions',
                        'Safari >= 6',
                        'ie > 8'
                    ]
                })]
            }

        },
    },
    {
      loader: 'px2rem-loader',
      options: {
        // 适用750设计稿
        remUnit: 75,
        // px->rem 小数点位数
        remPrecision: 8
      }
    }
  ]},
      {test: /\.js$/, 'exclude': /node_modules/, use: [
        'babel-loader'
      ]},
      {test: /\.(png|jpg|gif|jpeg)$/, use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }
      ]},
      {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }
      ] },
      {test: /\.(svg)$/i, type: 'asset/resource'}
    ]
  },

  plugins: [
    // 把css提取单独文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),

    // 清除dist文件夹
    new CleanWebpackPlugin(),

    // new ESLintPlugin({
    //   extensions: ['.js', '.jsx'],
    //   fix:true //自动修复
    // })

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
  ].concat(htmlWebpackPlugins),

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

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9999,
    open: true
  },

  devtool: 'source-map'
}