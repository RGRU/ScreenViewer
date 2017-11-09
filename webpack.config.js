const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

// Base config
const config = {
    externals : /(rxjs\/Rx|Rx|rxjs)/,
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

module.exports = [

    // Build as UMD module
    Object.assign(
        {},
        config,
        {
            entry: path.join(__dirname, 'src/scripts/lib/screenViewer.js'),
            output: {
                path: path.join(__dirname, 'dist'),
                filename: 'screen-viewer.js',
                libraryTarget: 'umd',
                library: 'ScreenViewer',
                umdNamedDefine: true
            },
            plugins: [
                new webpack.ProvidePlugin({
                    // Enable as globals rule for eslint
                    'Rx': 'rxjs/Rx'
                })
            ]
        }
    ),

    // Build for using in browser
    // as <script src="...">
    Object.assign(
        {},
        config,
        {
            entry: {
                'screen-viewer': path.join(__dirname, 'src/scripts/lib/screenViewer.js'),
                'screen-viewer.min': path.join(__dirname, 'src/scripts/lib/screenViewer.js'),
            },
            output: {
                path: path.join(__dirname, 'dist/global'),
                filename: '[name].js',
                libraryTarget: 'window',
                libraryExport: 'default',
                library: 'ScreenViewer'
            },
            plugins: [
                new UglifyJsPlugin({
                    test: /\.min\.js$/
                })
            ]
        }
    )

]