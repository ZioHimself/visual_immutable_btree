const path = require('path');

module.exports = {
    entry: './src/main/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'target/public/js'),
    },
    mode: 'development',
};