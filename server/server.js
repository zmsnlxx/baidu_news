var express = require("express");
var app = express();
// 
var bodyParser = require("body-parser");
// 引入写好的api接口
var api = require("./api");
// 操作路径
var path = require("path");
// 操作文件
var fs = require("fs");
//cookie-parser模块，用于cookie解析，cookie的值是一个字符串，格式为x1=y1;x2=y2;.....。cookie-parser可以将字符串解析为对象，添加在请求报文对象req.cookies中。
var cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(api);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, "../dist")));
// 因为是单页应用 所有请求都走/dist/index.html
app.get("*", function (req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf-8"
  );
  res.send(html);
});
app.listen(3000, function () {
  console.log("服务器已开启");
});
