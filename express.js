var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) { }
}

var webpack = require('webpack');
var webpackConfig = require('./build/dev.conf');
var compiler = webpack(webpackConfig);
var devMw = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
});
var hotMw = require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
})
app.use(devMw)
app.use(hotMw)

app.get('/', function (req, res) {
    // res.body = readFile(devMw.fileSystem,'index.html')
    res.sendFile(__dirname + '/index.html')
})

var server = http.createServer(app);
server.listen(3001)