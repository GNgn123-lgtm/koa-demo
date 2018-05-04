const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base.conf');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = merge(base, {
    target: 'node',
    devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, '../view/app/server.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name]/[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: [/\.css$/, /\?vue&type=style/]
    }),
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        //     'process.env.VUE_ENV': '"server"'
        // }),
    ]
});