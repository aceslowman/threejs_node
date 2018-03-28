const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

var entry = './public/js/main.js',
    destination = path.join(__dirname, 'public/js/dist');

module.exports = {
    entry: entry,
    output: {
        path: destination,
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                  presets:['env'],
                }
            }
        ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "common",
                filename: 'common.bundle.js',
                chunks: "all"
            }
        }
      }
    },
    node: {
      fs: 'empty',
    }
};
