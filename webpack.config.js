/* webpack.config.js
 * @ Cong Min
 */
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/entry.js']
    },
    output: {
        path: './static',
        filename: '[name].[chunkhash:8].js',
        publicPath: "static/"
    },
    devtool:'#source-map',
    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            filename: '../index.html',
            chunks: ['app'],
            inject: 'body'
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.html$/, loader: 'html'
        },  {
            test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap'])
        },  {
            test: /\.css$/, loader: ExtractTextPlugin.extract(['css'])
        },  {
            test: /\.(png|jpg|gif)$/, loaders: [ 'url?limit=8192&name=img/[name].[ext]?[hash:8]', 'image-webpack' ]
        },  {
            test: /\.(eot|woff|woff2|ttf|svg)$/, loader: 'url', query: { limit: 8192, prefix: 'font/', name: 'font/[name].[ext]?[hash:8]' }
        }],
        resolve: {
            extensions: ['', '.js']
        }
    }
};