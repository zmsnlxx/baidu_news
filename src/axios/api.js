import axios from './axios.js'

// 登陆之后获取用户信息
const getUserinfo = (params) => {
  return axios.post(`user/info`, params)
}
// 登录接口
const login = (params) => {
  return axios.post(`user/login`, params)
}
// 注册接口
const register = (params) => {
  return axios.post(`user/register`, params)
}
// 查看公众号信息
const getPublicInfo = (params) => {
  return axios.post(`user/seeAuthor`, params)
}
// 获取评论
const getComment = (params) => {
  return axios.post(`user/getComment`, params)
}

// 判断是否点赞
const isFabulous = (params) => {
  return axios.post(`user/isFabulous`, params)
}
// 添加点赞
const addFabulous = (params) => {
  return axios.post(`user/addFabulous`, params)
}
// 删除点赞
const delFabulous = (params) => {
  return axios.post(`user/delFabulous`, params)
}
// 添加阅读记录
const addFootPrint = (params) => {
  return axios.post(`user/footPrint`, params)
}
// 回复评论
const addReply = (params) => {
  return axios.post(`user/addReply`, params)
}
// 获取评论
const getBlog = (params) => {
  return axios.post(`user/seeBlog`, params)
}
// 存储新闻头条
const addNews = (params) => {
  return axios.post(`user/news`, params)
}
// 存储评论
const addBlog = (params) => {
  return axios.post(`user/blog`, params)
}
const apiList = {
  getUserinfo,
  login,
  register,
  getPublicInfo,
  getComment,
  isFabulous,
  addFabulous,
  delFabulous,
  addFootPrint,
  addReply,
  getBlog,
  addNews,
  addBlog,
}
export default apiList
