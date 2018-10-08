import Vue from 'vue'
import Router from 'vue-router'
// 引入路由:
// 主页面
import Home from "../pages/Home.vue"
import Subscribe from "../pages/Subscribe.vue"
import My from "../pages/My.vue"
// 二级页面
// 注册页面
import Register from '../pages/second/register.vue'
// 个人资料页面
import Personal from "../pages/second/personal.vue"
// 阅读记录
import Footprint from "../pages/second/footprint.vue"
// 我的评论
import CommentNav from "../pages/second/comment.vue"
// 我的关注
import Follow from "../pages/second/follow.vue"
// 大咖入驻详情页
import Article from "../pages/second/article.vue"
// 文章页面
import Content from '../pages/second/content.vue'
// 我的点赞
import Fabulous from '../pages/second/fabulous.vue'
// 修改密码页面
import Password from '../pages/second/password.vue'
import {
  resolve
} from 'url';

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: (resolve) => {
      require(['../pages/Home.vue'], resolve)
    },
  }, {
    path: '/subscribe',
    name: 'Subscribe',
    component: (resolve) => {
      require(['../pages/Subscribe.vue'], resolve)
    }
  }, {
    path: '/my',
    name: 'My',
    component: (resolve) => {
      require(['../pages/My.vue'], resolve)
    }
  }, {
    path: '/content',
    name: 'Content',
    component: (resolve) => {
      require(['../pages/second/content.vue'], resolve)
    }
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/personal',
    component: Personal
  }, {
    path: '/footprint',
    component: Footprint
  }, {
    path: '/follow',
    component: Follow
  }, {
    path: '/comment',
    component: CommentNav
  }, {
    path: '/article',
    component: Article
  }, {
    path: '/fabulous',
    component: Fabulous
  }, {
    path: '/password',
    component: Password
  }]
})
