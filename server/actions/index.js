/**
 * @desc 首页的ctx
 * @return { function } async
 */

//  module.exports = async (ctx, next) => {
//     ctx.response.type = 'html';
//     ctx.body = readFile(devMw.fileSystem,'index.html')
//  }
const fs = require('fs')
const path = require('path')
const bundle = require('../../dist/server/index/index')

module.exports = async (ctx, next) => {
    ctx.response.type = 'text/html'
    const htmltmp = readFile(devMw.fileSystem, 'index.html')
    ctx.body = await ctx.render(htmltmp, bundle.default(ctx.path))
}