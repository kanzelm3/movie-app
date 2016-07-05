var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var entry = [ 'babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'src', 'index.js') ]
var plugins = [
  new HtmlWebpackPlugin({
    title: 'Movie App',
    inject: false,
    template: require('html-webpack-template'),
    mobile: true,
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])
} else {
  entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  ].concat(entry)
  plugins = plugins.concat(new webpack.HotModuleReplacementPlugin())
}

module.exports = {

  entry: entry,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        excludes: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-relative-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.styl']
    }
  },

  plugins: plugins

}
