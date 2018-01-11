const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000/',
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
    new webpack.NamedModulesPlugin(),
  	new webpack.SourceMapDevToolPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: [
        "style-loader",
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }
      ]},
      { test: /\.(sass|scss)$/, loader: [
        "style-loader",
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        "sass-loader"
      ]},
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
      extensions: [".js",".json",".jsx"]
  }
};
