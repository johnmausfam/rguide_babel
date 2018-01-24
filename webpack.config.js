const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'src/index.jsx')
    ],
    book: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'src/index2.jsx')
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  	new webpack.SourceMapDevToolPlugin()
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
        test: /\.(svg|png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000000000
            }
          }
        ]
      }
    ]
  },
  resolve: {
      extensions: [".js",".json",".jsx"],
      alias:{ images: path.resolve(__dirname, 'src/images/') }
  }
};
