<template>
  <div class="Personal">
    <x-header>个人资料</x-header>
    <div class="cellNav">
      <group>
        <cell title="头像" is-link @click.native="updataImg">
          <img :src="src" alt="" style="width:40px;height:40px">
          <input type="file" id="file" name="file" style="width:0px" @change="handleFile">
        </cell>
        <cell is-link title="账号" :value="name">
        </cell>
        <cell is-link title="邮箱" :value="email">
        </cell>
      </group>
    </div>
    <x-button type="warn" @click.native="delCookie">退出登录</x-button>
    <span class="span" @click="changePsw">>>>修改密码</span>
  </div>
</template>
<script>
import { Group, Cell, CellBox, XButton, XHeader, AlertModule } from "vux";
import xingxing from "../../assets/星星.png";

export default {
  components: {
    Group,
    Cell,
    CellBox,
    XButton,
    XHeader,
    AlertModule
  },
  data() {
    return {
      name: "",
      email: "",
      src: xingxing,
      cookie: ""
    };
  },
  methods: {
    handleFile(e) {
      var img = document.getElementById("img");
      console.log(img);
      var $target = e.target || e.srcElement;
      // console.log($tar);
      var file = $target.files[0];
      // console.log(file);
      var type = file.type.split("/")[0];
      console.log(type);
      // console.log(type);
      if (type != "image") {
        console.log("请上传图片");
        return;
      }
      var size = Math.round(file.size / 1024 / 1024);
      if (size > 3) {
        alert("图片大小不得超过3M");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var that = this;
      reader.onload = function(e) {
        console.log(this.result);
        var data = {};
        data.base64 = this.result;
        data.name = that.DecodeCookie(that.$cookieStore.getCookie("name"));
        console.log(data);
        that.$http.post("/api/user/upload", data).then(req => {
          that.getParams();
          AlertModule.show({
            content: "修改头像成功!"
          });
        });
      };
    },
    updataImg() {
      var input = document.getElementById("file");
      input.click();
    },
    DecodeCookie(str) {
      var strArr;
      var strRtn = "";
      strArr = str.split("a");
      for (var i = strArr.length - 1; i >= 0; i--) {
        strRtn += String.fromCharCode(eval(strArr[i]));
      }
      return strRtn;
    },
    getParams() {
      var name = this.$cookieStore.getCookie("name");
      // 判断cookie是否有值;
      if (name) {
        this.cookie = this.DecodeCookie(name);
      }
      var params = {
        name: this.cookie
      };
      this.$http.post("/api/user/info", params).then(req => {
        console.log("获取用户信息");
        console.log(req.body);
        (this.name = req.body.message.name),
          (this.email = req.body.message.email);
        if (req.body.message.img) {
          this.src = req.body.message.img;
        } else {
          this.src = xingxing;
        }
      });
    },
    // 退出登录
    delCookie() {
      // 清除cookie
      this.$cookieStore.delCookie("name");
      // 跳转到我的页面
      this.$router.push({
        path: "/my"
      });
    },
    // 修改密码
    changePsw() {
      this.$router.push({
        path: "/password"
      });
    }
  },
  created() {
    this.getParams();
  }
};
</script>
<style scoped>
.cellNav {
  position: relative;
}
.span {
  display: block;
  position: absolute;
  right: 0px;
  margin-top: 20px;
  color: green;
}
</style>

