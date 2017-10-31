const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {

    entry: {
        index: path.join(__dirname, 'src/scripts/index.js')
    },

    output: {
        path: path.join(__dirname, 'dest/scripts'),
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
            desc: 'ScreenViewer demo. Looking in devtools console',
            filename: path.join(__dirname, 'dest/index.html'),
            template: 'src/index.html'
        })

    ],

    devServer: {
        contentBase: path.join(__dirname, 'dest'),
        host: '0.0.0.0',
        port: 3030
    },

    // Включаю вотчер файлов watch: true
    watch: true,

    // Настройки вотчера файлов
    watchOptions: {

        // Задержка перед тем, как пересобрать файлы
        // По-умолчанию 300ms
        aggregateTimeout: 100
    }

};