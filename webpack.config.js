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
            },{ test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    externals:{
        "jquery": "$",
        //"lodash": "_"
    },
    resolve:{
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.js',
            'vuex$': 'vuex/dist/vuex.js',
            'vue-resource': path.join(__dirname,'/bower_components/vue-resource/dist/vue-resource.js'),
            'bluebird$': 'bluebird/js/browser/bluebird.js',
            'vue-grid-layout$': 'vue-grid-layout/dist/vue-grid-layout.js',
            'vuex-toast$': 'vuex-toast/dist/vuex-toast.min.js',
            'lodash$':'lodash/index.js'
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