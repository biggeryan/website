var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')

module.exports = {
  entry: {
    app: ['./src/index.js'],
    vendors: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', ''],
    alias: {
      'request': path.resolve(__dirname, '../src/utils/request.js'),
      'selfcodehandle': path.resolve(__dirname, '../src/utils/selfcodehandle.js'),
      'eventproxy': path.resolve(__dirname, '../src/utils/eventproxy.js')
    }
  },
  externals: { // 不会打包进去，需要自己页面引入--目前失效，需要其他方式
    // react: 'React'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     include: config.rule.input,
    //     loader: 'eslint'
    //   }
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: config.rule.input,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      title: '艾禾网络'
    }),
    new webpack.ProvidePlugin({ // 和react包对应起来并提供别名React
      'React': 'react'
    })
  ]
}
