var path = require('path')
var webpack = require('webpack')

var config = {
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval',

    entry: ['./src/index.js'],

    output: {
        path: path.join(__dirname, ''),
        filename: 'index.js',
        publicPath: '/'
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
