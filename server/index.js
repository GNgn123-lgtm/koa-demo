const Koa = require('koa');
const logger = require('../middleware/logger')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')

const readFile = (fs, file) => {
    try {
        console.log('readhtml', path.join(webpackConf.output.path, file))
        return fs.readFileSync(path.join(webpackConf.output.path, file), 'utf-8')
    } catch (e) { }
}

const app = new Koa();
const staticPath = '/dist/static/'

const webpackConf = require('../build/dev.conf')
const complier = webpack(webpackConf)
var devMw = devMiddleware(complier, {
    publicPath: webpackConf.output.publicPath
})
var hotMw = hotMiddleware(complier, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
})
app.use(devMw)
app.use(hotMw)

app.use(logger())
app.use(async (ctx) => {
    ctx.response.type = 'html';
    ctx.body = readFile(devMw.fileSystem,'index.html')
    // ctx.body = fs.readFileSync( './index.html', 'utf-8')
})

app.listen(3000)
console.log('listening at port 3000')