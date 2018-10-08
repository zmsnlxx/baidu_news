<template>
  <div class="ddd">
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
      <img style="width:98%;height:200px;margin:20px 0px" v-lazy="img2 || img1">
      <span style="color:#999;font-size:15px">此次美军战机空袭代尔祖尔，不仅摧毁了叙军大量地面目标，而且也给叙军以及友军造成了一定的伤亡。另外对于此次美军的空袭，叙军将其定义为侵略行为，而有中东媒体更是评论称，美军的空袭支援了极端叛军在叙东部的地面行动，其实这种指责并非毫无根据。在美军空袭叙军阵地结束不久后，极端叛军再次集结了大量人员和重型装备，从迈亚丁西侧对叙军及其友军阵地发动了进攻，并且进攻力度比两天前的进攻更加猛烈。</span>
      <img style="width:98%;height:200px;margin:20px 0px" v-lazy="img3 || img1">
      <span style="color:#999;font-size:15px">对于极端叛军对迈亚丁的进攻，叙军以及友军在反击的同时，俄罗斯也出动了多架战斗机，对进攻的极端叛军及其目标进行了轰炸。在俄叙联军空中和地面的有效打击下，极端叛军的进攻再次被击退，随后叙军声称击毙了至少15名极端叛军，而极端叛军则声称打死23名叙军及其俄罗斯士兵。当前极端叛军在代尔祖尔的控制区还有数千平方公里，并且人数也在几千人左右，而一旦叙军解决了南部的叛军，下一步就要收拾这帮极端叛军。</span>
    </div>
    <div style="width:95%;margin:0 auto;margin-top:20px;height:50px;margin-bottom:20px">
      <x-button style="width:50%" v-if="show" @click.native="addFabulous">点赞</x-button>
      <x-button type="primary" style="width:50%" @click.native="addFabulous" v-else>已赞</x-button>
    </div>

    <!-- 评论部分 -->
    <div v-if="blog_show" style="width:95%;margin:0 auto;margin-top:20px;">
      <!-- 显示评论部分 -->
      <div class="weui-panel__hd">精彩评论</div>
      <div class="comment" v-for="(item,index) in data" :key="index" style="margin-top:10px;">
        <div class="users" style="">
          <div class="left" style="width:12%;height:100%;margin-right:10px;float:left">
            <img class="img" :src="item.img" alt="">
          </div>
          <div class="right" style="float:right;width:83%">
            <h5 style="height:30px;line-height: 30px">{{item.name}}</h5>
            <p style="text-indent:0px;font-size:12px;color:gray;margin-bottom:6px;">{{item.message}}</p>
            <span style="font-size:10px;color:gray">{{item.time}}</span>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>暂无评论</h1>
    </div>
    <!-- 提问部分 -->
    <div style="width:95%;margin:0 auto;margin-top:20px;position:fixed;bottom:50px">
      <group>
        <x-input placeholder="说点什么吧..." v-model="content_message"></x-input>
        <x-button @click.native="commentDdd">发表</x-button>
      </group>
    </div>
    <div style="height:156px"></div>
  </div>
</template>
<script>
  import {
    XHeader,
    XButton,
    XInput,
    Group,
    AlertModule
  } from "vux";
  import xingxing from "../../assets/星星.png";
  import {
    setTimeout
  } from 'timers';
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
        name: "",
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
        img: "",
        blog_show:true
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
      // 获取页面信息
      getComment() {
        var params = {
          title: this.title
        }
        this.$api.getBlog(params).then((data) => {
          console.log('获取评论');
          console.log(data.data.status);
          console.log(data.data);
          if(data.data.status === 1000){
            console.log(this.blog_show);
            this.blog_show = true;
            this.data = data.data.data
            console.log(this.data);
          }else{
            this.blog_show = false;
          }
        })
      },
      // 发表评论
      commentDdd() {
        // 判断是否登录
        if (this.name) {
          var params = {
            name: this.name
          };
          this.$http.post("/api/user/info", params).then(req => {
            this.img = req.body.message.img;
            var data = this.getNews();
            data.message = this.content_message;
            // 判断是否输入框有值,有值存储到数据库
            if (this.content_message) {
              var ddd = {
                name: this.global.DecodeCookie(name),
                comment: data
              };
              var params = {
                title: this.title,
                blog:{
                  name: this.name,
                  message: this.content_message,
                  time: this.global.formatDate(),
                  img: this.img
                }
              };
              console.log(params);
              this.$http.post("/api/user/comment", ddd).then(req => {
                console.log("存储我的评论成功!");
              });
              // 发表评论
              this.$api.addBlog(params).then((data) => {
                if(data.data.status === 1000){
                  AlertModule.show({
                    content: "发表成功!"
                  });
                }
                this.content_message = "";
                this.getComment();
              });
              // 如果输入框没有值，则提示未输入
            } else {
              AlertModule.show({
                content: "您不说点什么吗!"
              });
            }
          });
        } else {
          AlertModule.show({
            content: "您还未登录,请登录账号!"
          });
          this.content_message = "";
        }
      }
    },

    // 页面加载完成执行
    mounted() {
      // 获取点击新闻的信息，在页面展示
        var list = JSON.parse(window.localStorage.getItem("newsData"));
        console.log(list);
        this.title = list.title;
        this.time = list.time;
        this.address = list.author_name;
        var that = this;
        setTimeout(function () {
          that.img1 = list.thumbnail_pic_s;
          that.img2 = list.thumbnail_pic_s02;
          that.img3 = list.thumbnail_pic_s03;
        }, 2000)
      this.name = this.global.DecodeCookie(this.global.getCookie("name"));
      if (this.name) {
        var footPrintParams = {
          name: this.name,
          footprint: this.getNews()
        };
        var fabulousParams = {
          name: this.name,
          title: this.getNews().title
        };
        var params = {
          title: this.title
        }
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
        this.$api.addNews(params).then((data) => {
          console.log(data);
          if(data.data.status === 1000){
            console.log('存储新闻头条成功！');
          }
        })
        var that = this
        setTimeout(function(){
          that.getComment();
        },1000)
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

  .comment {
    border: 2px solid #e8e8e8;
  }

  .user {
    overflow: hidden;
    margin: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    float: left;
  }

  p {
    text-align: left;
    text-indent: 28px;
  }

</style>
