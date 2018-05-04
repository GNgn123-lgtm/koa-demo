const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const readyPromise = require('../build/build').readyPromise

const Index = require('./actions/index')
router.get('/', Index)

module.exports = function () {
    return router.routes()
}