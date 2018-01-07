const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3000/',
      'react-hot-loader/patch',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'src/index.jsx')
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  	new webpack.SourceMapDevToolPlugin()
  ],
  module: {
    rules: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
