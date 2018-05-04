const Koa = require('koa')
const logger = require('../middleware/logger')
const ServerRender = require('../middleware/view')
const build = require('../build/build')
const views = require('koa-views')
const app = new Koa()
const routes = require('./routes')

const isProduction = process.env.NODE_ENV == 'production'

app.use(logger())
app.use(build.devMw)
app.use(build.hotMw)
app.use(ServerRender)
app.use(routes())
app.listen(2000)
console.log('listening at port 2000')