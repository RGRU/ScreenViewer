const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {

    entry: path.join(__dirname, 'src/scripts/lib/screenViewer.js'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'screen-viewer.js',
        libraryTarget: 'umd',
        library: 'ScreenViewer',
        umdNamedDefine: true
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    'eslint-loader'
                ]
            },

            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }

        ]

    }

};