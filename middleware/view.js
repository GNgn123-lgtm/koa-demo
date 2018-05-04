const  { createRenderer } = require('vue-server-renderer')
const fs = require('fs')


module.exports = async (ctx, next) => {
    ctx.render = (content, app) => {
        const renderer = createRenderer({
            template: content
        })
        const renderPromise = renderer.renderToStream(app, app)
        return renderPromise
    }
    await next()
}