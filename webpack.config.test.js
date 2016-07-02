const path = require('path')
const config = require('./webpack.config')

config.devServer = {
  host: 'localhost',
  port: '8081'
}

const index = path.resolve(__dirname, './src/__tests__/index.js')

config.entry = {
  test: [`mocha!${index}`]
}

config.output.publicPath = 'http://localhost:8081/'

config.externals = {
  jsdom: 'window',
  cheerio: 'window',
  'react/addons': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': 'window',
  'text-encoding': 'window'
}

module.exports = config
