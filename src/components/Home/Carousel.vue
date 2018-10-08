<template>
    <div id="carousel">
        <swiper loop auto :list="demo06_list" @on-index-change="demo06_onIndexChange"></swiper>
    </div>
</template>
<script>
const baseList = [
  {
    url: "javascript:",
    img:
      "https://publish-pic-cpu.baidu.com/7d02e34b-8d22-4a0b-9034-120c86befad1.jpeg@q_90,w_450"
  },
  {
    url: "javascript:",
    img:
      "https://publish-pic-cpu.baidu.com/884d4849-86bc-4617-89c4-8854cf1491e9.jpeg@q_90,w_450"
  },
  {
    url: "javascript:",
    img:
      "https://publish-pic-cpu.baidu.com/11cdaa01-c2c8-4037-b4ff-e4cb559bce9a.jpeg@q_90,w_450"
  }
];
const urlList = baseList.map((item, index) => ({
  // url: "http://m.baidu.com",
  img: item.img,
  fallbackImg: item.fallbackImg
}));
import { Swiper, GroupTitle, SwiperItem } from "vux";
export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle
  },
  methods: {
    demo06_onIndexChange(index) {
      this.demo06_index = index;
    }
  },
  data() {
    return {
      demo06_list: urlList
    };
  }
};
</script>
<style scoped>
</style>
