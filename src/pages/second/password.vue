<template>
    <div class="psw">
       <x-header>修改密码</x-header>
       <div class="ddd">
           <div style="width:90%;height:50%;background-color:#f7f7fa;position:absolute;top:20px;left:15px">
               <group>
                   <div class="span">
                       <span>账户</span>
                       <span style="margin-left:70%">{{sss}}</span>
                   </div>
                   <x-input title="旧密码" type="password" placeholder="请输入旧密码" v-model="one" style="font-size:12px"></x-input>
                   <x-input title="新密码" type="password" placeholder="请输入新密码" v-model="two" style="font-size:12px"></x-input>
                   <x-input title="确认新密码" type="password" placeholder="请确认新密码" v-model="three" style="font-size:12px;border-bottom:0.1px solid #767676"></x-input>
                   <x-button style="width:50%;margin-top:5px;margin-bottom:5px" @click.native="changePsw">修改密码</x-button>
                </group>
           </div>
       </div>
    </div>
</template>
<script>
import { Group, Cell, XHeader, XInput, XButton, AlertModule } from "vux";
export default {
  components: {
    Group,
    Cell,
    XButton,
    XHeader,
    XInput,
    AlertModule
  },
  data() {
    return {
      sss: "连续性",
      one: "",
      two: "",
      three: ""
    };
  },
  methods: {
    // 解码cookie的方法;
    DecodeCookie(str) {
      var strArr;
      var strRtn = "";
      strArr = str.split("a");
      for (var i = strArr.length - 1; i >= 0; i--) {
        strRtn += String.fromCharCode(eval(strArr[i]));
      }
      return strRtn;
    },
    getName() {
      var name = this.$cookieStore.getCookie("name");
      this.sss = this.DecodeCookie(name);
    },
    changePsw() {
      var params = {
        name: this.sss
      };
      this.$http.post("/api/user/getPsw", params).then(req => {
        console.log(req.body);
        var data = req.body.data;
        if (data != this.one) {
          AlertModule.show({
            content: "密码输入错误!"
          });
        } else if (this.two != this.three) {
          AlertModule.show({
            content: "两次密码不一致!"
          });
        } else {
          var lll = {
            name: this.sss,
            newPsw: this.two
          };
          this.$http.post("/api/user/changPsw", lll).then(req => {
            var message = req.body.message;
            AlertModule.show({
              content: message
            });
            this.one = "";
            this.two = "";
            this.three = "";
            // 修改密码后删除cookie退出登录，
            this.$cookieStore.delCookie("name");
            // 跳转到我的页面
            this.$router.push({
              path: "/my"
            });
          });
        }
      });
    }
  },
  created() {
    this.getName();
  }
};
</script>
<style scoped>
.ddd {
  width: 100%;
  background-color: #999;
  height: 430px;
  position: relative;
}
.span {
  width: 100%;
  font-size: 12px;
  padding: 10px 15px;
}
</style>


