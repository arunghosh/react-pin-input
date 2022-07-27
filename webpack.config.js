const path = require('path');

let entry = './src/index.js';
let output = {
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist/',
};

if (process.env.NODE_ENV === 'dev') {
  entry = './example/index.js';
  output = {
    path: path.join(__dirname, 'example'),
    publicPath: '/example/',
  };
}

module.exports = {
  entry,
  output: Object.assign(output, {
    filename: 'bundle.js',
    globalObject: "this",
    library: 'react-pin-input',
    libraryTarget: 'umd', // universal module definition
  }),
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
