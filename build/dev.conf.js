var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var envDev = false;   // 是否是开发环境

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
    entry: {
        "index": [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.resolve(__dirname, '../view/app/index.js')
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        },
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
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    css: envDev ? ['style-loader', 'css-loader']
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
            ? [{ loader: 'style-loader',options: { insertAt: 'top' } }, 
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
}
if (!envDev) {
    config.plugins.push(
        new ExtractTextPlugin({
            filename: "[name].css"
        })
    )
}

module.exports = config