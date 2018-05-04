var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require("html-webpack-plugin")
var merge = require('webpack-merge')
var base = require('./base.conf')

var config = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        "index": [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.resolve(__dirname, '../view/app/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/bundle.js',
        publicPath: '/dist/static/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/' + 'index.html'),
            template: path.resolve(__dirname, '../view/app/index.html'),
            inject: 'body',
            hash: true,
            chunks: ['index', 'vendors']
        })
    ]
})

module.exports = config