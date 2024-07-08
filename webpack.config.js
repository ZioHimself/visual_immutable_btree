const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')

module.exports = {
    entry: './src/main/js/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'target/public/js'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    mode: 'development',
    devtool:'source-map',
    resolve: { extensions: ['.ts'] },
};