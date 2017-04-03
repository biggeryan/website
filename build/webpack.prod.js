var path = require('path')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var WebpackMd5Hash = require('webpack-md5-hash')
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base')
var config = require('./config')

module.exports = merge(webpackBaseConfig, {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        // include: config.rule.input,
        loader: ExtractTextWebpackPlugin.extract('style', 'css'),
      },
      {
        test: /\.scss$/,
        include: config.rule.input,
        loader: ExtractTextWebpackPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[hash:base64:8]!postcss!sass'),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: config.build.env
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextWebpackPlugin('css/[name].[contenthash:8].css'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors'],
      filename: 'js/[name].[chunkhash:8].js',
      minChunk: Infinity
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})
