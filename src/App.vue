<template>
  <div id="app">
    <Task></Task>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? news.active : news.normal" >
      </van-tabbar-item>
      <van-tabbar-item to="/subscribe">
        <span>订阅</span>
        <img slot="icon" slot-scope="props" :src="props.active ? subscribe.active : subscribe.normal" >
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? my.active : my.normal" >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Task from "./pages/second/task.vue";
import { Tabbar, TabbarItem } from "vux";
// 图标
import news_one from "./assets/新闻.png";
import news_two from "./assets/新闻(1).png";
import subscribe_one from "./assets/订阅.png";
import subscribe_two from "./assets/订阅(1).png";
import my_one from "./assets/我的.png";
import my_two from "./assets/我的(1).png";

export default {
  name: "app",
  components: {
    Tabbar,
    TabbarItem,
    Task
  },
  data() {
    return {
      active: 0,
      news: {
        normal: news_one,
        active: news_two
      },
      subscribe: {
        normal: subscribe_one,
        active: subscribe_two
      },
      my: {
        normal: my_one,
        active: my_two
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
.div {
  width: 100%;
  height: 50px;
}
</style>
