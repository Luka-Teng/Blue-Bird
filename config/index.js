
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const fs = require("fs")

const config = {
  base: {
    entry: {}, // 项目入口配置，对应 webpack 中的 entry.
    htmlWebpackPluginConfig: {} // 对应 webpack 中的 htmlWebpackPlugin 配置
  },	
	build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

var blacklist = ['.DS_Store', 'common', 'pyramid'] // 黑名单中的项目不会被获取
var srcPath = path.resolve(__dirname, '../src')
var dirs = fs.readdirSync(srcPath)

dirs.forEach(dirName => {
  if (blacklist.indexOf(dirName) > -1) {
    return
  }
  var dirPath = `${srcPath}/${dirName}`
  
  if (!fs.lstatSync(dirPath).isDirectory()) {
    return
  }
  
  var project = require(`${dirPath}/project.json`)

	//define entries
  config.base.entry[project.name] = `${dirPath}/${project.entry}`
	
	//save the individual htmlwebpackplugin config 
  config.base.htmlWebpackPluginConfig[project.name] = {
    title: project.title,
    filename: `${project.name}/${project.filename}`,
    template: `${dirPath}/${project.template}`,
    inject: true,
    author: project.author
  }
})

module.exports = config
