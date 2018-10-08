<template>
    <div class="Personal_details">
        <x-header title="快来关注吧"></x-header>
        <div>
            <div class="head" style="width:100%;height:150px;background-color:#ffffff;">
                <img :src="img" alt="" class="div" style="width:90px;height:90px;background-color:#999">
                <span class="span">{{autograph}}</span>
                <span style="position: absolute;top: 10px;left: 80%;display: inline-block;">{{num}}个粉丝</span>
            </div>
            
            <div>
                <div class="weui-panel__hd">文章</div>
                <div class="weui-panel weui-panel_access" v-for="item in list" :key="item.index" style="border-bottom: 1px solid #999999" @click="getDetails(item)">
                    <div class="weui-panel__bd">
                        <a href="#" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <img :src="item.thumbnail_pic_s" alt="" class="weui-media-box__thumb" style="width: 70px;height: 70px">
                        </div>
                        <div class="weui-media-box__bd" style="margin-left: 10px;display: flex;">
                            <div style="width: 80%;">
                            <h1 class="weui-media-box__title" style="font-size: 15px;margin-bottom:25px">{{item.title}}</h1>
                            <span style="font-size: 12px;color: grey;padding-top:15px">{{item.date}}</span>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  components: {
    XHeader
  },
  data() {
    return {
      name: "",
      autograph: "",
      img: "",
      list: [],
      show: false,
      num: 6
    };
  },
  methods: {
    getDetails(e) {
      console.log(e.url);
      window.location.href = e.url;
    }
  },
  mounted() {
    var name = window.localStorage.getItem("data");
    console.log(name);
    var params = {
      name: name
    };
    this.$api.getPublicInfo(params).then(req => {
      console.log(req.data);
      this.list = req.data.article;
      this.name = req.data.name;
      this.img = req.data.img;
      this.autograph = req.data.autograph;
      this.num = req.data.follow.length;
    });
  }
};
</script>
<style scoped>
.Personal_details {
  height: 800px;
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
.head {
  position: relative;
  border-bottom: 1px dashed #999;
}
.div {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.span {
  position: absolute;
  bottom: 10px;
  left: 20%;
  display: inline-block;
}
</style>

