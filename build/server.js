var path = require('path')
var webpack = require('webpack')
var chalk = require('chalk')
var webpackDevConfig = require('./webpack.dev')
var config = require('./config')
var webpackDevServer = require('webpack-dev-server')

var compiler = webpack(webpackDevConfig)
var server = new webpackDevServer(compiler, {
  contentBase: config.rule.output,
  hot: true,
  compress: true,
  stats: {
    colors: true
  },
  proxy: config.dev.proxy.realServer
})
server.listen(config.dev.port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log(chalk.blue(' # Access URLs:'))
  console.log(chalk.gray(' ----------------------------------------'))
  console.log('     Local: ' + chalk.green('http://localhost:' + config.dev.port + config.dev.path))
  console.log(chalk.gray(' ----------------------------------------'))
  console.log('')
})
