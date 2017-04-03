var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var webpackBaseConfig = require('./webpack.base')
var config = require('./config')

webpackBaseConfig.entry['app'].unshift('webpack-dev-server/client?http://localhost:' + config.dev.port + '/', 'webpack/hot/dev-server')
module.exports = merge(webpackBaseConfig, {
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        // include: config.rule.input,
        loaders: [
          'style',
          'css'
        ]
      },
      {
        test: /\.scss$/,
        include: config.rule.input,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass'
        ]
      }
    ],
    'postcss': function() {
      return [
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ]
        }),
      ];
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:' + config.dev.port
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors'],
      filename: 'js/[name].js',
      minChunk: Infinity
    })
  ]
})
