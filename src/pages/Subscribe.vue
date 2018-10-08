<template>
    <div class="subscribe">
      <div style="position: relative; overflow: hidden;">
        <v-toolbar color="teal lighten-3">
          <v-toolbar-title>推荐订阅</v-toolbar-title>
        </v-toolbar>
        
        <div id="scrolling-techniques" style="max-height: 600px;" class="scroll-y">
          <!-- 搜索框 -->
          <InputNav></InputNav>
          <!-- 轮播图 -->
          <Carousel></Carousel>
          <v-container style="padding:15px">
            <div class="weui-panel__hd">大咖入驻</div>
            <div class="weui-panel weui-panel_access" v-for="item in list" :key="item.index" style="border-bottom: 1px solid #999999">
              <div class="weui-panel__bd" style="height:80px">
                <a href="#" class="weui-media-box weui-media-box_appmsg">
                  <div class="weui-media-box__hd">
                    <img :src="item.img" alt="" class="weui-media-box__thumb" style="width: 70px;height: 70px">
                  </div>
                  <div class="weui-media-box__bd" style="margin-left: 10px;display: flex;">
                    <div style="width: 80%;"  @click="getDetails(item)">
                      <h1 class="weui-media-box__title" style="font-size: 15px">{{item.title}}</h1>
                      <span style="font-size: 12px;margin-top:20px;color: grey;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.autograph}}</span>
                    </div>
                    <div style="width: 20%;">
                      <p style="line-height: 68px;color:orangered" v-if="item.show" @click="addFollow(item)">关注</p>
                      <p style="line-height: 68px;" v-else>取关</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="loading" v-if="isShow" @click="ddd">
              <span style="color:white">查看更多</span>
            </div>
            <div v-else>
              <load-more :show-loading="false" :tip="message" background-color="#fbf9fe"></load-more>
            </div>
          </v-container>
        </div>
      </div>
      <div class="div"></div>
    </div>
</template>
<script>
// 引入搜索框组件
import InputNav from "../components/Home/InputNav";
// 引入轮播图组件
import Carousel from "../components/Home/Carousel";
// 引入vux组件
import { LoadMore, AlertModule } from "vux";
export default {
  // 注册组件
  components: {
    InputNav,
    Carousel,
    LoadMore,
    AlertModule
  },
  data() {
    return {
      list: [],
      show: true,
      message: "暂无更多数据",
      isShow: true,
      num: 0
    };
  },
  methods: {
    // 解码cookie的方法;
    DecodeCookie(str) {
      var strArr;
      var strRtn = "";
      strArr = str.split("a");
      for (var i = strArr.length - 1; i >= 0; i--) {
        strRtn += String.fromCharCode(eval(strArr[i]));
      }
      return strRtn;
    },
    // 添加关注
    addFollow(e) {
      var name = this.$cookieStore.getCookie("name");
      if (name) {
        e.show = false;
        var params = {
          userName: this.DecodeCookie(name),
          name: e.title,
          data: e
        };
        this.$http.post("/api/user/addFollow", params).then(req => {
          var message = req.body.message;
          AlertModule.show({
            content: message
          });
          this.show = false;
        });
        this.$http.post("/api/user/addFollows", params).then(req => {
          console.log("添加成功");
        });
      } else {
        AlertModule.show({
          content: "您还未登录,请登录！"
        });
      }
    },
    ddd() {
      this.num++;
      if (this.num > 3) {
        this.isShow = false;
      } else {
        this.getData(this.num);
      }
    },
    getData(e) {
      var num = 3;
      if (isNaN(e)) {
        var params = {
          num: num
        };
        this.$http.post("/api/user/getAuthor", params).then(req => {
          this.list = req.body.data;
          // console.log(this.list);
          this.list.forEach(element => {
            element.follow.forEach(el => {
              if (el.name == this.DecodeCookie(name)) {
                element.show = false;
              }
            });
          });
        });
      } else {
        var params = {
          num: num + e
        };
        // console.log(params);
        this.$http.post("/api/user/getAuthor", params).then(req => {
          // console.log(req.body.data);
          this.list = req.body.data;
          this.list.forEach(element => {
            element.follow.forEach(el => {
              if (el.name == this.DecodeCookie(name)) {
                element.show = false;
              }
            });
          });
        });
      }
    },
    getDetails(i) {
      console.log(i);
      window.localStorage.removeItem("data");
      window.localStorage.setItem("data", i.title);
      this.$router.push({
        path: "/article"
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.loading {
  width: 100%;
  height: 20px;
  background-color: #999;
  text-align: center;
}
.weui-panel:first-child {
  margin-top: 0;
}

.weui-panel {
  background-color: #ffffff;
  margin-top: 0px;
  position: relative;
  overflow: hidden;
}

.weui-panel__hd {
  padding: 14px 15px 10px 0px;
  color: #999999;
  font-size: 13px;
  position: relative;
  /* margin-top: -10px */
}

.weui-media-box {
  color: #000000;
  padding: 5px;
  position: relative;
}

.weui-media-box_appmsg {
  display: flex;
  -webkit-box-align: center;
  /* -webkit-align-items: center; */
  align-items: center;
}

a {
  text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
}

.weui-media-box_appmsg .weui-media-box__thumb {
  width: 100%;
  max-height: 100%;
  vertical-align: top;
}

a img {
  border: 0;
}

weui-media-box_appmsg .weui-media-box__hd {
  margin-right: 0.8em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.weui-media-box_appmsg .weui-media-box__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
}

.weui-media-box__title {
  font-weight: 400;
  font-size: 17px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
}

.weui-media-box__desc {
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.weui-panel__hd::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}
</style>
