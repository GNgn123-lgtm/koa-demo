const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

const Index = require('./actions/index')
router.get('/', Index)
router.get('/foo', Index)
router.get('/baz', Index)


module.exports = function () {
    return router.routes()
}