var path = require('path');

module.exports = {
  /**
   * 约定一些参数
   */
  rule: {
    input: path.resolve(__dirname, '../src/'),
    output: path.resolve(__dirname, '../dist')
  },
  dev: {
    env: '"development"',
    port: '8080',
    path: '/',
    proxy: {
      'realServer': {
        '/oms-web/**': {
          target: 'http://202.75.218.137',
          secure: false,
          // changeOrigin: true
        }
      },
      'rapServer': {
        '/**': {
          target: 'http://rap.taobao.org/mockjs/13334/',
          secure: false
        }
      }
    }
  },
  build: {
    env: '"production"'
  }
}
