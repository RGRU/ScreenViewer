const
    webpack = require('webpack'),
    flowtypePlugin = require('flowtype-loader/plugin'),
    path = require('path');

module.exports = {

    entry: path.join(__dirname, 'test/spec.js'),

    output: {
        path: path.join(__dirname, 'temp/test'),
        filename: 'test.js',
        chunkFilename: '[hash].js',
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    'flowtype-loader'
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }

        ]
    },

    plugins: [

        new flowtypePlugin(),

        new webpack.ProvidePlugin({
            // Enable as globals rule for eslint
            'Rx': 'rxjs/Rx'
        })

    ]

};