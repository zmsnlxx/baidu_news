<template>
  <div class="register">
    <x-header>欢迎注册</x-header>
    <div class="group">
      <group>
        <x-input title="姓名" placeholder="必填" v-model="name"></x-input>
        <x-input title="密码" type="password" placeholder="必填" v-model="password"></x-input>
        <x-input title="再次输入" type="password" placeholder="必填" v-model="psw"></x-input>
        <x-input title="邮箱" type="email" placeholder="必填" v-model="email"></x-input>
        <x-button type="primary" text="注册" action-type='button' @click.native="goRegister"></x-button>
      </group>
    </div>
    <div class="div"></div>
  </div>
</template>
<script>
import { Group, XInput, XButton, AlertModule, XHeader } from "vux";
import { setTimeout } from "timers";
export default {
  components: {
    Group,
    XInput,
    XButton,
    AlertModule,
    XHeader
  },
  data() {
    return {
      title: "注册页面",
      name: "",
      password: "",
      psw: "",
      email: ""
    };
  },
  methods: {
    goRegister: function() {
      var ddd = this.email.indexOf("@");
      console.log(ddd);
      if (!this.name.length) {
        AlertModule.show({
          content: "您还未填写名字!"
        });
      } else if (!this.password.length) {
        AlertModule.show({
          content: "请输入密码!"
        });
      } else if (this.psw != this.password) {
        AlertModule.show({
          content: "两次密码不一致!"
        });
      } else if (this.email.length == 0) {
        AlertModule.show({
          content: "请输入邮箱!"
        });
      } else if (ddd == -1) {
        AlertModule.show({
          content: "请收入正确的邮箱格式"
        });
      } else {
        var userInfo = {
          name: this.name,
          password: this.password,
          psw: this.psw,
          email: this.email
        };
        console.log(userInfo);
        this.$api
          .register(userInfo)
          .then(req => {
            if (req) {
              console.log(req.data);
              var message = req.data.message;
              AlertModule.show({
                content: message
              });
              var _this = this;
              if (req.data.status === 1000) {
                setTimeout(function() {
                  _this.$router.push({
                    path: "/my"
                  });
                }, 1000);
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.group {
  margin-top: -10px;
  border-bottom: 1px solid #ececec;
}
</style>
