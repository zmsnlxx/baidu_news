<template>
    <div class="input">
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top
            top="46px" @on-submit="onSubmit" ref="search"></search>
    </div>
</template>
<script>
import { Search } from "vux";
export default {
  components: {
    Search
  },
  methods: {
    setFocus() {
      this.$refs.search.setFocus();
    },
    resultClick(item) {
      console.log(item);
      window.localStorage.removeItem("data");
      window.localStorage.setItem("data", item.title);
      this.$router.push({
        path: "/article"
      });
    },
    getResult() {
      // console.log(this.value);
      var params = {
        data: this.value
      };
      console.log(params);
      this.$http.post("/api/user/getEearch", params).then(req => {
        this.results = req.body.data;
        console.log(this.results);
        if (this.results.length == 0) {
          console.log("---");
          this.results.push({ title: "暂无搜索结果" });
        }
      });
    },
    onSubmit() {
      this.$refs.search.setBlur();
      this.$vux.toast.show({
        type: "test",
        position: "top",
        text: "on submit"
      });
    }
  },
  data() {
    return {
      results: [],
      value: "请输入关键词"
    };
  }
};

function getResult(val) {
  let rs = [];
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} `,
      other: i
    });
  }
  return rs;
}
</script>
<style scoped>
.input {
  width: 100%;
  height: 55px;
  /* margin-bottom: 5px; */
}
</style>





