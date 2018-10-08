var user = require("./db");
var express = require("express");
var router = express.Router();
var author = require("./data/author.json");


// 自定义函数方法:
// cookie编码程序
function CodeCookie(str) {
  var strRtn = "";

  for (var i = str.length - 1; i >= 0; i--) {
    strRtn += str.charCodeAt(i);
    if (i) strRtn += "a"; //用a作分隔符
  }
  return strRtn;
}

//随机生成id
function setRandomId() {
  return Date.now() + "" + Math.floor(Math.random() * 10000);
}

// 所有接口:

// 修改头像
router.post("/api/user/upload", (req, res) => {
  // console.log(req.body.base64);
  user.Register.update({
      name: req.body.name
    }, {
      $set: {
        img: req.body.base64
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          message: "修改头像成功!"
        });
      }
    }
  );
});

// 注册接口
router.post("/api/user/register", (req, res) => {
  console.log(req.body);
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1002,
          message: "账号已被注册!"
        });
      } else {
        var newAccount = new user.Register({
          name: req.body.name,
          password: req.body.password,
          psw: req.body.psw,
          email: req.body.email,
          address: req.body.address
        });
        //   newAccount.psw = md5(newAccount.psw);
        newAccount.save(function (err) {
          if (!err) {
            res.send({
              status: 1000,
              message: "账号注册成功!"
            });
          } else {
            res.send({
              status: 1001,
              message: "账号注册失败!",
              data: err
            });
          }
        });
      }
    }
  );
});

// 登录接口
router.post("/api/user/login", (req, res) => {
  //   console.log(req.body);
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        if (data.password == req.body.password) {
          res.cookie("name", CodeCookie(data.name), {
            //有效期，单位是秒
            maxAge: 1000 * 24 * 60 * 60
          });
          res.send({
            status: 1000,
            message: "登录成功!"
          });
        } else {
          res.send({
            status: 1001,
            message: "密码错误!"
          });
        }
      } else {
        res.send({
          status: 1002,
          message: "账号未注册,请注册!"
        });
      }
    }
  );
});

// 查看个人资料
router.post("/api/user/info", (req, res) => {
  console.log(req.body);
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          message: data
        });
      } else {
        console.log(err);
      }
    }
  );
});

// 查看密码
router.post("/api/user/getPsw", (req, res) => {
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.password
        });
      } else {
        res.send({
          status: 1001,
          data: err
        });
      }
    }
  );
});

// 修改密码
router.post("/api/user/changPsw", (req, res) => {
  user.Register.update({
      name: req.body.name
    }, {
      $set: {
        password: req.body.newPsw
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          message: "修改成功!"
        });
      }
    }
  );
});

// 模糊搜索
router.post("/api/user/getEearch", (req, res) => {
  // console.log(req.body.data);
  var qs = new RegExp(req.body.data);
  user.Recommend.find({
      title: qs
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data
        });
      } else {
        res.send({
          status: 1001,
          data: "暂无数据!"
        });
      }
    }
  );
});

// 查看大咖入驻
router.post("/api/user/getAuthor", (req, res) => {
  console.log(req.body.num);
  user.Recommend.find(function (err, data) {
    if (data) {
      if (data.length == 0) {
        author.forEach(element => {
          var authorData = new user.Recommend({
            title: element.name,
            autograph: element.autograph,
            img: element.img,
            article: element.article,
            show: element.show
          });
          authorData.save(function (err) {
            if (!err) {}
          });
        });
      } else {
        res.send({
          status: 1000,
          data: data
        });
      }
    } else {
      res.send({
        status: 1001,
        data: "暂无数据!"
      });
    }
  }).limit(req.body.num);
});

// 判断是否关注
router.post("/api/user/isFollow", (req, res) => {
  user.Recommend.find(function (err, data) {
    if (data) {
      res.send({
        data: data
      });
    } else {
      res.send({
        data: err
      });
    }
  });
});

// 查看大咖入驻个人资料
router.post("/api/user/seeAuthor", (req, res) => {
  console.log("----");
  console.log(req.body.name);
  user.Recommend.findOne({
      title: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          name: data.title,
          autograph: data.autograph,
          img: data.img,
          article: data.article,
          follow: data.follow
        });
      } else {
        res.send({
          status: 1001,
          data: err
        });
      }
    }
  );
});

// 添加大咖入驻关注：需要实现双向添加关注,用户关注公众号之后：1,把用户的信息存到公众号的表格中;2,把公众号的信息存放到用户的表格中
router.post("/api/user/addFollow", (req, res) => {
  var data = {};
  data.name = req.body.userName;
  user.Recommend.update({
      title: req.body.name
    }, {
      $push: {
        follow: data
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          message: "添加关注成功!"
        });
      }
    }
  );
});
router.post("/api/user/addFollows", (req, res) => {
  user.Register.update({
      name: req.body.userName
    }, {
      $push: {
        follow: req.body.data
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          message: "添加关注成功!"
        });
      }
    }
  );
});

// 用户页面查看我的关注
router.post("/api/user/seeFollow", (req, res) => {
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.follow.reverse()
        });
      } else {
        res.send({
          status: 1001,
          data: "暂无关注,去添加关注吧!"
        });
      }
    }
  );
});
// 从公众号里删除粉丝
router.post("/api/user/seeFollows", (req, res) => {
  user.Recommend.update({
      title: req.body.userName
    }, {
      $pull: {
        follow: {
          name: req.body.name
        }
      }
    },
    err => {
      if (!err) {
        res.send({
          message: "取消成功!"
        });
      } else {
        console.log(err);
      }
    }
  );
});

// 用户页面取消关注
router.post("/api/user/delFollow", (req, res) => {
  user.Register.update({
      name: req.body.name
    }, {
      $pull: {
        follow: {
          title: req.body.userName
        }
      }
    },
    err => {
      if (!err) {
        res.send({
          status: 1000,
          message: "取消关注成功!"
        });
      } else {
        console.log(err);
      }
    }
  );
});

// 公众号页面查看关注/粉丝
router.post("/api/user/getFollow", (req, res) => {
  user.Recommend.findOne({
      title: req.body.nam
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.follow
        });
      }
    }
  );
});

// 存储新闻
router.post("/api/user/news", function (req, res) {
  user.Blog.findOne({
    title: req.body.title
  },(err,data) => {
    if(!data){
      console.log('--');
      var newBlog = new user.Blog({
        title: req.body.title,
      });
      newBlog.save(function (err) {
        if (!err) {
          res.send({
            status: 1000,
            message: "存储新闻成功!"
          });
        } else {
          res.send({
            status: 1001,
            message: "存储失败!"
          });
        }
      });
    }
  })
});
// 存储评论
router.post("/api/user/blog",function (req,res) {
  // console.log(req.body);
  user.Blog.updateOne(
    {title: req.body.title},
    {
      $push:{
        blog: req.body.blog
      }
    },
    (err,data) => {
      if(data){
        res.send({
          status:1000,
          message:'发表成功!'
        })
      }else{
        res.send({
          status:1001,
          message:err
        })
      }
    }
  )
})

// 获取评论
router.post("/api/user/seeBlog", function (req, res) {
  user.Blog.findOne(
    {title: req.body.title},
    function (err, data) {
    if (data) {
      console.log(data.blog);
      if(data.blog.length !=0){
        res.send({
          status:1000,
          data: data.blog.reverse()
        });
      }else{
        res.send({
          status:1001,
          data: "暂无人评论!"
        });
      }
    }else{
      console.log(err);
    }
  });
});

// 回复评论
router.post("/api/user/addReply", function (req, res) {
  user.Blog.update({
      id: req.body.id
    }, {
      $push: {
        reply: req.body.data
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});

// 阅读记录
router.post("/api/user/footPrint", function (req, res) {
  user.Register.update({
      name: req.body.name
    }, {
      $push: {
        footprint: req.body.footprint
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});

// 获取阅读记录
router.post("/api/user/getFootPrint", function (req, res) {
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.footprint.reverse()
        });
      } else {
        res.send({
          status: 1001,
          message: "暂无阅读记录呦!"
        });
      }
    }
  );
});

// 我的评论
router.post("/api/user/comment", function (req, res) {
  user.Register.update({
      name: req.body.name
    }, {
      $push: {
        comment: req.body.comment
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});

// 获取我的评论
router.post("/api/user/getComment", function (req, res) {
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.comment.reverse()
        });
      } else {
        res.send({
          status: 1000,
          message: "暂无评论记录,去评论吧!"
        });
      }
    }
  );
});

// 删除评论
router.post("/api/user/delComment", function (req, res) {
  user.Register.update({
      name: req.body.name
    }, {
      $pull: {
        comment: {
          title: req.body.title
        }
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});

// 添加点赞
router.post("/api/user/addFabulous", function (req, res) {
  user.Register.update({
      name: req.body.name
    }, {
      $push: {
        fabulous: req.body.fabulous
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});
// 删除点赞
router.post("/api/user/delFabulous", function (req, res) {
  user.Register.update({
      name: req.body.name
    }, {
      $pull: {
        fabulous: {
          title: req.body.title
        }
      }
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000
        });
      }
    }
  );
});

// 获取我的点赞
router.post("/api/user/getFabulous", function (req, res) {
  user.Register.findOne({
      name: req.body.name
    },
    (err, data) => {
      if (data) {
        res.send({
          status: 1000,
          data: data.fabulous.reverse()
        });
      } else {
        res.send({
          status: 1001,
          message: "暂无点赞,快去点赞吧!"
        });
      }
    }
  );
});

// 页面加载完成后判断是否已点赞
router.post("/api/user/isFabulous", function (req, res) {
  user.Register.find({
      author: req.body.author,
      "fabulous.title": req.body.title
    },
    (err, data) => {
      if (data) {
        if (data.length > 0) {
          res.send({
            status: 1000
          });
        } else {
          res.send({
            status: 1001
          });
        }
      }
    }
  );
});

module.exports = router;
