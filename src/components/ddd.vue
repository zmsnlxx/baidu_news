<!--  -->
<template>
  <div class=''>
      <div>
          <x-header>{{title}}</x-header>
        </div>
        <div style="width:95%;margin:0 auto;border-bottom:1px solid #999;padding-bottom:10px">
          <h1 style="font-size:20px">{{title}}</h1>
          <span style="color:#999;font-size:12px;display:inline-block;margin-top:10px">{{time}}</span>
          <span style="color:#999;font-size:12px;display:inline-block;margin-top:10px;margin-left:15px">来源：{{address}}</span>
        </div>
        <div style="width:95%;margin:0 auto;margin-top:20px">
          <span style="color:#999;font-size:15px">不久前在大马士革南郊战事进入最后阶段之时，叙东部代尔祖尔沙漠地区残余的极端叛军，为了减轻友军在大马士革南郊的压力，出动迫击炮、重机枪和武装皮卡等装备，对代尔祖尔省迈亚丁市以南的叙军阵地发动了袭击。后来在援军地面火力的支援下，加上俄罗斯战机的持续轰炸，极端叛军的袭击最终被叙军所击退。与此同时，极端叛军对叙军也发动了汽车炸弹袭击，并在袭击中至少有30多名叙军官兵伤亡。</span>
          <img style="width:98%;height:200px;margin:20px 0px" v-lazy="img1" alt="">
          <span style="color:#999;font-size:15px">在叙军刚刚击退极端叛军的袭击不久后，24日凌晨美海军出动了多架F-18战斗机，对叙军位于迈亚丁附近的阵地进行了空袭，并在空袭中摧毁了叙军以及友军多个目标，包括弹药库、重型装备、哨所和建筑物等。另外美军在空袭叙军多个阵地的同时，也轰炸了叙利亚东部的T2油田，而美战机之所以轰炸T2油田，更多的是为了切断叙政府的收入来源。由于叙军在东部没有部署防空武器，因此，对于此次美军的空袭，叙军也束手无策。</span>
          <img style="width:98%;height:200px;margin:20px 0px" v-lazy="img2 || img1" alt="图片加载失败">
          <span style="color:#999;font-size:15px">此次美军战机空袭代尔祖尔，不仅摧毁了叙军大量地面目标，而且也给叙军以及友军造成了一定的伤亡。另外对于此次美军的空袭，叙军将其定义为侵略行为，而有中东媒体更是评论称，美军的空袭支援了极端叛军在叙东部的地面行动，其实这种指责并非毫无根据。在美军空袭叙军阵地结束不久后，极端叛军再次集结了大量人员和重型装备，从迈亚丁西侧对叙军及其友军阵地发动了进攻，并且进攻力度比两天前的进攻更加猛烈。</span>
          <img style="width:98%;height:200px;margin:20px 0px" v-lazy="img3 || img1" alt="图片加载失败">
          <span style="color:#999;font-size:15px">对于极端叛军对迈亚丁的进攻，叙军以及友军在反击的同时，俄罗斯也出动了多架战斗机，对进攻的极端叛军及其目标进行了轰炸。在俄叙联军空中和地面的有效打击下，极端叛军的进攻再次被击退，随后叙军声称击毙了至少15名极端叛军，而极端叛军则声称打死23名叙军及其俄罗斯士兵。当前极端叛军在代尔祖尔的控制区还有数千平方公里，并且人数也在几千人左右，而一旦叙军解决了南部的叛军，下一步就要收拾这帮极端叛军。</span>
        </div>
        <div style="width:95%;margin:0 auto;margin-top:20px;height:50px;margin-bottom:20px">
          <x-button style="width:50%" v-if="show" @click.native="addFabulous">点赞</x-button>
          <x-button type="primary" style="width:50%" @click.native="addFabulous" v-else>已赞</x-button>
        </div>

        <!-- 评论部分 -->
        <div style="width:95%;margin:0 auto;margin-top:20px;">
          <!-- 显示评论部分 -->
          <div class="weui-panel__hd">精彩评论</div>
          <div class="comment" v-for="(item,index) in data" :key="index">
            <div class="users" style="border-bottom:1px solid #999;margin-top:10px">
              <img class="img" :src="item.img" alt="">
              <p>{{item.author}}</p>
              <p style="font-size:12px;margin-left:50px;color:gray;margin-bottom:6px">{{item.message}}</p>
              <span style="font-size:12px;margin-left:80px;color:gray">{{item.time}}</span>
              <span style="font-size:12px;margin-left:10px" @click="reply1(item)">评论</span>
              <!-- 回复信息模块 -->
              <div class="reply" v-for="(i,index) in item.reply" :key="index">
                <span style="font-size:8px;margin-left:80px;">{{i.name}}:</span>
                <span style="font-size:8px;color:red">{{i.content}}</span>
                <span style="font-size:8px;color:gray">{{i.time}}</span>
              </div>
            </div>
          </div>
          <!-- 回复评论模态框 -->
          <v-dialog v-model="dialog2" max-width="500px">
            <div style="background-color:#c0ffff;padding:20px">
              <v-text-field name="input-1-3" label="回复点什么呢..." single-line v-model="content"></v-text-field>
              <x-button style="width:50%;" @click.native="reply2">回复</x-button>
            </div>
          </v-dialog>

          <!-- 提问部分 -->
          <div style="width:95%;margin:0 auto;margin-top:20px;position:fixed;bottom:50px">
            <group>
              <x-input placeholder="说点什么吧..." v-model="content_message"></x-input>
              <x-button @click.native="commentDdd">发表</x-button>
            </group>
          </div>
        </div>
  </div>
</template>

<script>
import { XHeader, XButton, XInput, Group, AlertModule } from "vux";
import xingxing from "../assets/星星.png";
export default {
  components: {
    XHeader,
    XButton,
    XInput,
    Group,
    AlertModule
  },
  data() {
    return {
      isShow: false,
      name: this.global.DecodeCookie(this.global.getCookie("name")),
      content: "",
      content_message: "",
      dialog2: false,
      data: [],
      show: true,
      title: "",
      time: "",
      address: "",
      img1: "",
      img2: "",
      img3: "",
      src: xingxing,
      img: ""
    };
  },
  methods: {
    // 点赞
    addFabulous() {
      if (this.name) {
        var params = {
          name: this.name,
          fabulous: this.getNews(),
          title: this.getNews().title
        };
        if (this.show) {
          console.log(params);
          this.$api
            .addFabulous(params)
            .then(req => {
              AlertModule.show({
                content: "感谢点赞!"
              });
              this.show = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$api
            .delFabulous(params)
            .then(req => {
              console.log("-----");
              this.show = true;
              AlertModule.show({
                content: "取消点赞!"
              });
              this.seeFabulous();
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        AlertModule.show({
          content: "您还未登录,请登录!"
        });
      }
    },
    // 获取点击的新闻数据
    getNews() {
      // 获取浏览的新闻数据
      var newsData = window.localStorage.getItem("newsData");
      newsData = JSON.parse(newsData);
      newsData.ddTime = this.global.formatDate();

      return newsData;
    },
    // 回复评论
    reply1(e) {
      window.localStorage.removeItem("id");
      window.localStorage.setItem("id", e.id);
      this.dialog2 = true;
    },
    reply2() {
      var id = localStorage.getItem("id");
      console.log(id);
      var params = {
        id: id,
        data: {
          name: this.name,
          content: this.content,
          time: this.global.formatDate()
        }
      };
      this.$api.addReply(params).then(req => {
        this.content = "";
        this.dialog2 = false;
        AlertModule.show({
          content: "回复成功!"
        });
        this.getComment();
      });
    },
    // 获取评论
    getComment() {
      console.log("====");
      // 获取评论
      //   this.$http.post("/api/user/seeBlog").then(req => {
      //     console.log(req.body.data);
      //     this.data = req.body.data;
      //     if (this.data.length == 0) {
      //       console.log("暂无评论");
      //     }
      //   });
    },
    // 发表评论
    commentDdd() {
      // // 获取评论，存储到我的评论
      var params = {
        name: this.name
      };
      this.$http.post("/api/user/info", params).then(req => {
        this.img = req.body.message.img;
        var data = this.getNews();
        data.message = this.content_message;
        // 判断是否登录
        if (this.name) {
          // 判断是否输入框有值,有值存储到数据库
          if (this.content_message) {
            var ddd = {
              name: this.global.DecodeCookie(name),
              comment: data
            };
            var params = {
              name: this.name,
              message: this.content_message,
              time: this.global.formatDate(),
              newsData: this.getNews(),
              img: this.img
            };
            console.log(params);
            this.$http.post("/api/user/comment", ddd).then(req => {
              console.log("存储我的评论成功!");
            });
            // 发表评论
            this.$http.post("/api/user/blog", params).then(req => {
              console.log(req.body);
              AlertModule.show({
                content: "发表成功!"
              });
              this.content_message = "";
              this.getComment();
            });
            // 如果输入框没有值，则提示未输入
          } else {
            AlertModule.show({
              content: "您不说点什么吗!"
            });
          }
        } else {
          AlertModule.show({
            content: "您还未登录,请登录账号!"
          });
          this.content_message = "";
        }
      });
    }
  },
  // 页面创建好执行的方法
  created() {
    console.log(this.show);
    // 获取点击新闻的信息，在页面展示
    var list = JSON.parse(window.localStorage.getItem("newsData"));
    this.title = list.title;
    this.time = list.time;
    this.address = list.author_name;
    this.img1 = list.thumbnail_pic_s;
    this.img2 = list.thumbnail_pic_s02;
    this.img3 = list.thumbnail_pic_s03;
    this.getComment();
  },
  // 页面加载完成执行
  mounted() {
    if (this.name) {
      var footPrintParams = {
        name: this.name,
        footprint: this.getNews()
      };
      var fabulousParams = {
        name: this.name,
        title: this.getNews().title
      };
      this.$api.addFootPrint(footPrintParams).then(req => {
        console.log("存储阅读记录成功");
      });
      this.$api
        .isFabulous(fabulousParams)
        .then(req => {
          if (req.data.status == 1000) {
            this.show = false;
          } else {
            this.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      AlertModule.show({
        content: "您还未登录,请登录账号!"
      });
    }
  }
};
</script>
<style scoped>
.weui-panel__hd {
  padding: 14px 15px 10px 0px;
  color: #999999;
  font-size: 13px;
  position: relative;
  /* margin-top: -10px */
}

.commten {
  border: 2px solid #e8e8e8;
}

.user {
  overflow: hidden;
  margin: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}

p {
  text-align: left;
  text-indent: 28px;
}
</style>
