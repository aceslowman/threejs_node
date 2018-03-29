const path = require('path');
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
                  presets:['env']
                }
            }
        ]
    },
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "common",
                chunks: "all"
            }
        }
      }
    },
    node: {
      fs: 'empty',
    },
    devtool: 'source-map'
};
