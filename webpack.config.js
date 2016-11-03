var path = require('path');
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: "./src/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    externals:{
        "jquery": "$",
        "lodash": "_"
    },
    resolve:{
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            mangle: false,

        })
    ]

}