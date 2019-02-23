const webpack = require('webpack');
const path = require('path');

let hostname = 'localhost';
let port = 3001;

module.exports = {
    entry: 'mocha-loader!./tests/test.js',
    output: {
        filename: 'test.build.js',
        path: path.join(__dirname, 'tests'),
        publicPath: 'http://' + hostname + ':' + port + '/tests'
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
    devServer: {
        contentBase: path.join(__dirname, 'tests'),
        host: hostname,
        port: port
    }
};
