const path = require('path');

module.exports = {
    entry: './src/gameboard.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};