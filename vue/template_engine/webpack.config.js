const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')

module.exports = {
    entry: join(__dirname, './src/index.js'),

    output: {
        path: join(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },

    module: {
        rules:[]
    },

    plugins: [
       new HtmlWebpackPlugin({
        template: "./index.html",

        inject: 'body'
       })
    ],

    devtool: "inline-source-map",

    devServer: {
        port: 8000,
        open: true
    },

    mode: 'development'
}