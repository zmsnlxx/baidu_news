<template>
    <div class="footprint">
        <div class="home_content">
            <div>
                <x-header>我的评论</x-header>
                <div v-if="show" class="weui-panel weui-panel_access" v-for="item in data" :key="item.index" style="border-bottom: 1px solid #999999">
                  <div class="weui-panel__bd">
                      <a href="#" class="weui-media-box weui-media-box_appmsg" style="padding-bottom:5px">
                          <div class="weui-media-box__hd">
                              <img :src="item.thumbnail_pic_s" alt="" class="weui-media-box__thumb" style="width: 70px;height: 70px">
                          </div>
                          <div class="weui-media-box__bd" style="margin-left: 10px;display: flex;">
                              <div style="width: 80%;"  @click="ddd(item)">
                                  <h1 class="weui-media-box__title" style="font-size: 15px;width:200px">{{item.title}}</h1>
                                  <span style="font-size: 12px;color: grey;display:inline-block;margin-top:30px">{{item.category}}</span>
                                  <span style="font-size: 12px;color: grey;display: block">{{item.ddTime}}</span>
                              </div>
                          </div>
                      </a>
                      <!-- <span class="span" style="color:red">{{name}}:</span> -->
                      <span class="span">{{item.message}}</span>
                      <span class="span" style="color:#999">{{item.ddTime}}</span>
                      <!-- <span style="color:red" @click="delComment(item)">删除评论</span> -->
                  </div>
                </div>
                <div v-else>
                  <h1>暂无评论!</h1>
                </div>
            </div>

            <!-- 防止底部导航条覆盖页面内容 -->
            <div class="div"></div>
        </div>
    </div>
</template>
<script>
import { XHeader, AlertModule } from "vux";
export default {
  components: {
    XHeader,
    AlertModule
  },
  data() {
    return {
      data: [],
      name: "",
      show: false
    };
  },
  methods: {
    // 删除评论
    // delComment(e) {
    //   var name = this.global.getCookie("name");
    //   var params = {
    //     name: this.global.DecodeCookie(name),
    //     title: e.title
    //   };
    //   console.log(params);
    //   console.log(this.$api);
    //   this.$api
    //     .delCommentInfo(params)
    //     .then(req => {
    //       console.log("----");
    //       console.log(req.data);
    //       AlertModule.show({
    //         content: "删除评论成功!"
    //       });
    //       this.getData();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    ddd(e) {
      var newsData = JSON.stringify(e);
      window.localStorage.setItem("newsData", newsData);
      this.$router.push({
        path: "/content"
      });
    },
    getData() {
      var name = this.global.getCookie("name");
      this.name = this.global.DecodeCookie(name);
      var params = {
        name: this.global.DecodeCookie(name)
      };
      console.log(params);
      this.$api
        .getComment(params)
        .then(req => {
          console.log(req.data);
          if (req.data.status == 1000) {
            this.data = req.data.data;
            if (this.data.length == 0) {
              this.show = false;
              AlertModule.show({
                content: "暂无评论数据!"
              });
            } else {
              this.show = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.span {
  display: inline-block;
  margin-left: 15px;
  width: 70%;
  font-size: 12px;
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

