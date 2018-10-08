<template>
  <div class="home">
    <!-- 使用组件 -->
    <HeaderNav @changeValue="changeValue" style="width:100%;position:fixed;top:0px;"></HeaderNav>
    <div style="height:44px"></div>
    <div class="home_content">
      <div>
        <div class="weui-panel weui-panel_access" v-for="item in list" :key="item.index" style="border-bottom: 1px solid #999999">
          <div class="weui-panel__bd">
            <a href="#" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img :src="item.thumbnail_pic_s" alt="" class="weui-media-box__thumb" style="width: 70px;height: 70px">
              </div>
              <div class="weui-media-box__bd" style="margin-left: 10px;display: flex;">
                <div style="width: 80%;" @click="ddd(item)">
                  <h1 class="weui-media-box__title" style="font-size: 15px;width:200px">{{item.title}}</h1>
                  <span style="font-size: 12px;color: grey;display:inline-block;margin-top:30px">{{item.author_name}}</span>
                  <span style="font-size: 14px;color: grey;display: block">{{item.address}}</span>
                </div>
                <div style="width: 20%;position:relative" @click="delNews(item)">
                  <p style="position:absolute;right:0px;bottom:0px;color:#9999;font-size:12px">X</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="load_more" v-if="show">
        <p style="text-align:center;">
          <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中.....</span>
          <inline-loading></inline-loading>
        </p>
      </div>
      <div class="no_more" v-else>
        <p style="text-align:center;">
          <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无更多数据</span>
        </p>
      </div>
      <!-- 防止底部导航条覆盖页面内容 -->
      <div class="div"></div>
    </div>
  </div>
</template>
<script>
  // 引入自己写的组件
  import HeaderNav from "../components/Home/HeaderNav";

  // 引入vux组件
  import {
    AlertModule,
    InlineLoading
  } from "vux";

  export default {
    // 注册组件
    components: {
      HeaderNav,
      AlertModule,
      InlineLoading
    },
    data() {
      return {
        message: "新闻",
        list: [],
        show: false,
      };
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollHeight - scrollTop === clientHeight) {
          this.show = true;
          var that = this
          setTimeout(function () {
            that.show = false;
          }, 2000)
        }else{
          this.show = false;
        }
      },
      //   父组件接受从子组件传过来的值
      changeValue(data) {
        console.log(data.data);
        this.list = data.data;
      },
      ddd(e) {
        var newsData = JSON.stringify(e);
        window.localStorage.setItem("newsData", newsData);
        this.$router.push({
          path: "/content"
        });
      },
      delObj(_arr, _obj) {
        var length = _arr.length;
        for (var i = 0; i < length; i++) {
          if (_arr[i] == _obj) {
            if (i == 0) {
              _arr.shift(); //删除并返回数组的第一个元素
              return;
            } else if (i == length - 1) {
              _arr.pop(); //删除并返回数组的最后一个元素
              return;
            } else {
              _arr.splice(i, 1); //删除下标为i的元素
              return;
            }
          }
        }
      },
      delNews(e) {
        console.log(e);
        this.delObj(this.list, e);
        AlertModule.show({
          content: "屏蔽成功!"
        });
      }
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
