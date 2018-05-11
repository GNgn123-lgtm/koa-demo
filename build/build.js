const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const fs = require('fs')
const path = require('path')

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(webpackConf.output.path, file), 'utf-8')
    } catch (e) { }
}
global.readFile = readFile

const webpackConf = require('../build/client.conf')
const complier = webpack(webpackConf)
var devMw = devMiddleware(complier, {
    publicPath: webpackConf.output.publicPath,
    stats: {
        colors: true,
    }
})
global.devMw = devMw

var hotMw = hotMiddleware(complier, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
})

module.exports = {
    devMw,
    hotMw
}