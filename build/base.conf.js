var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var envDev = true;   // 是否是开发环境

const styleLoaderOptions = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
}
const cssOptions = [
    { loader: 'css-loader', options: { sourceMap: true } }
]

var config = {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        },
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    css: envDev ? ['vue-style-loader', 'css-loader']
                                : ExtractTextPlugin.extract({
                                    use: cssOptions,
                                    fallback: styleLoaderOptions
                                }),
                },
                postcss: [require('autoprefixer')()]
            }
        }, {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: envDev 
            ? [{ loader: 'vue-style-loader',options: { insertAt: 'bottom' } }, 
                { loader: 'css-loader' }]
            : ExtractTextPlugin.extract({
                use: cssOptions,
                fallback: styleLoaderOptions
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/assets/img/[name].[ext]?[hash]'
                }
            }]
        }]
    },
    plugins: [
    ]
}
if (!envDev) {
    config.plugins.push(
        new ExtractTextPlugin({
            filename: "[name].css"
        })
    )
}

module.exports = config