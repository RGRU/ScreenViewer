const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {

    entry: path.join(__dirname, 'src/scripts/index.js'),

    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].js',
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

    },

    plugins: [

        new HtmlWebpackPlugin({
            title: 'ScreenViewer demo',
            filename: path.join(__dirname, 'docs/index.html'),
            template: 'src/index.html'
        }),

        new webpack.ProvidePlugin({
            // Enable as globals rule for eslint
            'Rx': 'rxjs/Rx'
        })

    ],

    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        host: '0.0.0.0',
        port: 3030,
        open: 'http://localhost:3030/'
    },

    // Настройки вотчера файлов
    watchOptions: {

        // Задержка перед тем, как пересобрать файлы
        // По-умолчанию 300ms
        aggregateTimeout: 100
    }

};