<template>
    <div class="footprint">
        <div class="home_content">
            <div>
                <x-header>我的关注</x-header>
                <div v-if="show" class="weui-panel weui-panel_access" style="border-bottom: 1px solid #999999" v-for="item in arr" :key="item">
                    <div class="weui-panel__bd">
                        <a href="#" class="weui-media-box weui-media-box_appmsg">
                            <div class="weui-media-box__hd">
                                <img :src="item.img" alt="" class="weui-media-box__thumb" style="width: 70px;height: 70px">
                            </div>
                            <div class="weui-media-box__bd" style="margin-left: 10px;display: flex;">
                                <div style="width: 80%;">
                                    <h1 class="weui-media-box__title" style="font-size: 15px;width:200px">{{item.title}}</h1>
                                    <span style="font-size: 12px;color: grey;display:inline-block;margin-top:10px">{{item.autograph}}</span>
                                </div>
                                <div style="width: 20%;position: relative;">
                                    <x-button @click.native="delFollow(item)" style="width:100%;height:20px;font-size:6px;position:absolute;bottom:0px" type="warn">取关</x-button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div v-else>
                    <h1>暂无关注!</h1>
                </div>
            </div>

            <!-- 防止底部导航条覆盖页面内容 -->
            <div class="div"></div>
        </div>
    </div>
</template>
<script>
import { XHeader, XButton, AlertModule } from "vux";
export default {
  components: {
    XHeader,
    XButton,
    AlertModule
  },
  data() {
    return {
      arr: [],
      img: "",
      name: "",
      autograph: "",
      show: true
    };
  },
  methods: {
    //   取消关注
    delFollow(e) {
      console.log(e);
      var name = this.$cookieStore.getCookie("name");
      var params = {
        //   用户名
        name: this.DecodeCookie(name),
        // 公众号名字
        userName: e.title
      };
      console.log(params);
      this.$http.post("/api/user/seeFollows", params).then(req => {
        console.log(req.body.message);
      });
      this.$http.post("/api/user/delFollow", params).then(req => {
        var message = req.body.message;
        AlertModule.show({
          content: message
        });
        this.getData();
      });
    },
    ddd(e) {
      // console.log(e);
      window.localStorage.removeItem("newsData");
      var newsData = JSON.stringify(e);
      window.localStorage.setItem("newsData", newsData);
      this.$router.push({
        path: "/content"
      });
    },
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
    getData() {
      var name = this.$cookieStore.getCookie("name");
      var params = {
        name: this.DecodeCookie(name)
      };
      this.$http.post("/api/user/seeFollow", params).then(req => {
        console.log(req.body.data);
        if (req.body.data.length == 0) {
          console.log("object");
          this.show = false;
        } else {
          this.arr = req.body.data;
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
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
  padding: 14px 15px 10px;
  color: #999999;
  font-size: 13px;
  position: relative;
  /* margin-top: -10px */
}

.weui-media-box {
  color: #000000;
  padding: 15px;
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

