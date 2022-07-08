const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// 删除上一次打包结果文件
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 日志信息样式
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
// css单独文件打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 多设备自动兼容 css
const autoprefixer = require('autoprefixer');

const setMPF = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // 获取所有的匹配目录
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index]

      // '/Users/liyue/Documents/pack/src/index/index.js',
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

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
    filename: '[name]_[chunkhash:8].js',
    path: __dirname + '/dist', // 绝对路径
    clean: true,
  },
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
    // output里已添加
    // new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 把css提取单独文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),

    // 构建异常捕获 可以用来上报
    function() {
      this.hooks.done.tap('MyPlugin', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('-watch') === -1) {
          console.log('-----------build error');
          process.exit(1)
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  optimization: {
    runtimeChunk: 'single',
  },
  stats: 'errors-only'
}