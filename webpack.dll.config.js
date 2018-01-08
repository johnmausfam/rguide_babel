const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['redux','react-redux','react','react-dom']
  },
  output: {
    path: path.join(__dirname, './devbuild/static'), // 打包后文件输出的位置
    filename: '[name].dll.js',// vendor.dll.js中暴露出的全局变量名。
    library: '[name]_library' // 与webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
  ]
};
