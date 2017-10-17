'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var plugins = [
  new webpack.DefinePlugin(merge(config.dev.env, {
    'process.env': config.dev.env
  })),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin()
]

// 配置项目文件
Object.keys(config.base.htmlWebpackPluginConfig).forEach(name => {
  var pluginConfig = config.base.htmlWebpackPluginConfig[name]

  // 配置生成的html文件，定义路径等
  var conf = {
    title: pluginConfig.title,
    filename: pluginConfig.filename,
    template: pluginConfig.template, //模板路径
    inject: pluginConfig.inject,
    chunks: [name],
    author: pluginConfig.author
  }

  // 配置并插入多个htmlWebpackPlugin
  plugins.push(new HtmlWebpackPlugin(conf))
})

// 配置入口文件
plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, '../index.html'),
  inject: true,
  availableProjects: config.base.htmlWebpackPluginConfig,
  chunks: []
}))

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})