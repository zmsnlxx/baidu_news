var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Baidu", function (err) {
  if (err) {
    console.log("数据库连接失败");
  } else {
    console.log("数据库连接成功");
  }
});

// 用户表
var registerSchema = new mongoose.Schema({
  name: String,
  password: String,
  psw: String,
  img: String,
  email: String,
  address: String,
  follow: [],
  footprint: [],
  comment: [],
  fabulous: [],
});

// 大咖推荐
var recommendSchema = new mongoose.Schema({
  title: String,
  autograph: String,
  img: String,
  article: [],
  show: Boolean,
  follow: []
})

// 用户评论
var blogSchema = new mongoose.Schema({
  title: String,
  blog: [],
  author: String,
  message: String,
  time: String,
  id: String,
  reply: [],
  img: String,
})


var User = {
  Register: mongoose.model("Register", registerSchema),
  Recommend: mongoose.model("Recommend", recommendSchema),
  Blog: mongoose.model("Blog", blogSchema),
};

module.exports = User;
