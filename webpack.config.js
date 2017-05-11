var path = require('path')
var webpack = require('webpack')

var config = {
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval',

    entry: ['./index.js'],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-tabbordion.min.js',
        publicPath: '/dist'
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
