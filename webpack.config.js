const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins:[
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.SourceMapDevToolPlugin()
  ]
};
