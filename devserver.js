var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'devbuild/', /* dev-server root dir */
    hot: true,
    inline :true,
    lazy: false,
    publicPath: config.output.publicPath, /* entry dir */
    stats: { colors: true },
    proxy:[
      {
        context:['/api/**','/data/**'],
        target:"http://localhost:3001",
        changeOrigin: true, //修改Header中的Origin
        ws: true, //轉送Websocket,
        pathRewrite: function(url, req, options) {
          console.log(url);
          console.log(req.url);
          console.log(options);

          var path = req.url.match(/^\/api\/v(1|2)\/(.*)/)[2];
          if(req.url.match(/^\/(api|data)\/v2/)){
            req.url = '/apiv2/' + path;
          }else{
            req.url = '/apiv1?path='+path;
          }
        }
      }
    ]
});
server.listen(3000);