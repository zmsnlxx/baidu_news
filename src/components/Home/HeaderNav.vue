<template>
  <div class="HeaderNav">
    <tab>
      <tab-item selected @on-item-click="onItemClick">头条</tab-item>
      <tab-item @on-item-click="onItemClick">社会</tab-item>
      <tab-item @on-item-click="onItemClick">国内</tab-item>
      <tab-item @on-item-click="onItemClick">国际</tab-item>
      <tab-item @on-item-click="onItemClick">娱乐</tab-item>
      <tab-item @on-item-click="onItemClick">体育</tab-item>
      <tab-item @on-item-click="onItemClick">军事</tab-item>
      <tab-item @on-item-click="onItemClick">科技</tab-item>
      <tab-item @on-item-click="onItemClick">财经</tab-item>
      <tab-item @on-item-click="onItemClick">时尚</tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
export default {
  components: {
    Tab,
    TabItem
  },
  name: "HeaderNav",
  data() {
    return {};
  },
  methods: {
    getData() {
      var params = {
        key: "147a8810e50d4bbe17abe8f12177b081",
        type: "top"
      };
      this.$http.get("/data/toutiao/index", { params, params }).then(req => {
        // console.log(req.body.result.data);
        // 把获取到的数据传给父组件Home
        var data = {
          data: req.body.result.data
        };
        this.$emit("changeValue", data, "lalala");
      });
    },
    onItemClick(index) {
      var arr = [
        "top",
        "shehui",
        "guonei",
        "guoji",
        "yule",
        "tiyu",
        "junshi",
        "keji",
        "caijing",
        "shishang"
      ];
      // console.log(arr[index]);
      var params = {
        key: "147a8810e50d4bbe17abe8f12177b081",
        type: arr[index]
      };
      this.$http.get("/data/toutiao/index", { params, params }).then(req => {
        console.log(req.body.result.data);
        // 把获取到的数据传给父组件Home
        var data = {
          data: req.body.result.data
        };
        this.$emit("changeValue", data, "lalala");
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
