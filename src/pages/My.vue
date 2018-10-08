<template>
    <div class="my" >
        <!-- 未登录时显示 -->
        <div class="head" style="width:100%;height:200px;background-color:#ffffff;" v-if="isShow">
          <img src="../assets/星星.png" alt="" class="div" style="width:90px;height:90px;background-color:#999">
          <span class="span" @click.stop="dialog = true">点击登录</span>
        </div>
        <!-- 已登录时显示 -->
        <div class="head" style="width:100%;height:200px;background-color:#ffffff;" v-else>
          <img :src="src" alt="" class="div" style="width:90px;height:90px;background-color:#999">
          <span class="span">{{userName}}</span>
        </div>
        <!-- 点击登录弹出模板 -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
          <div style="width:100%;height:100%;background-color:#ffffff">
            <x-header :left-options="{showBack: false}">欢迎登录</x-header>
            <v-form v-model="valid" style="width:90%;margin:0 auto;">
              <v-text-field v-model="name" :rules="nameRules" :counter="10" label="账号" required></v-text-field>
              <v-text-field v-model="password" :append-icon="e1 ? 'off' : 'on'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" label="密码*" min="8"></v-text-field>
              <x-button type="primary" @click.native="login">登录</x-button>
              <x-button type="primary" @click.native="register">注册</x-button>
            </v-form>
          </div>
        </v-dialog>
        <div>
          <group style="border-bottom:1px solid #e7e7e7;margin-top:-20px;">
              <cell link="/footprint" inline-desc='阅读记录'></cell>
              <cell link="/comment" inline-desc='我的评论'></cell>
              <cell link="/follow" inline-desc='我的关注'></cell>
              <cell link="/fabulous" inline-desc='我的点赞'></cell>
              <cell link="/personal" inline-desc='设置'></cell>
          </group>
        </div>
    </div>
</template>
<script>
import { Group, Cell, XHeader, XButton, AlertModule } from "vux";
import xingxing from "../assets/星星.png";
export default {
  components: {
    Group,
    Cell,
    XHeader,
    XButton,
    AlertModule
  },
  data() {
    return {
      src: "",
      userName: "",
      isShow: false,
      dialog: false,
      valid: false,
      e1: false,
      name: "",
      password: "",
      nameRules: [
        v => !!v || "请输入账号!",
        v => v.length <= 10 || "名称必须小于10个字符"
      ],
      email: "",
      emailRules: [
        v => !!v || "请输入邮箱",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "电子邮件必须有效"
      ]
    };
  },
  methods: {
    // 登录接口
    login() {
      console.log("----");
      console.log(this.name);
      console.log(this.password);
      var params = {
        name: this.name,
        password: this.password
      };
      this.$api.login(params).then(req => {
        var message = req.data.message;
        AlertModule.show({
          content: message
        });
        if (req.data.status === 1000) {
          this.dialog = false;
          this.getCookie();
        }
      });
    },
    // 页面跳转到注册页面
    register() {
      this.$router.push({
        path: "/register"
      });
    },
    // 获取用户信息
    getCookie() {
      var name = this.global.getCookie("name");
      if (name) {
        this.isShow = false;
        var params = {
          name: this.global.DecodeCookie(name)
        };
        this.$api
          .getUserinfo(params)
          .then(req => {
            console.log(req);
            this.userName = req.data.message.name;
            if (req.data.message.img) {
              this.src = req.data.message.img;
            } else {
              this.src = xingxing;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.isShow = true;
        AlertModule.show({
          content: "您还未登录账号,请登录!"
        });
      }
    }
  },
  created() {
    this.getCookie();
  }
};
</script>
<style scoped>
.my {
  height: 600px;
}
.head {
  position: relative;
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
  top: 75%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -10%);
}
</style>




