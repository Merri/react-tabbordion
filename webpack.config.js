const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './dist/module/index.js',
    output: {
        path: __dirname + '/dist/umd/',
        filename: 'react-tabbordion.js',
        publicPath: '/build/',
        library: 'ReactTabbordion',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [
                    '/demo/',
                    '/dist/',
                    '/node_modules/',
                    '/style/',
                    '/test/',
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    optimization: {
        concatenateModules: true,
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    beautify: false,
                    comments: /^$/,
                    mangle: true,
                    output: {
                        comments: false,
                        semicolons: false
                    }
                }
            })
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            },
            'prop-types': {
                root: 'PropTypes',
                commonjs2: 'prop-types',
                commonjs: 'prop-types',
                amd: 'prop-types'
            }
        }
    ],
}
