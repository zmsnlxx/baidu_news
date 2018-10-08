// cookie解码程序
function DecodeCookie(str) {
  var strArr;
  var strRtn = "";
  strArr = str.split("a");
  for (var i = strArr.length - 1; i >= 0; i--) {
    strRtn += String.fromCharCode(eval(strArr[i]));
  }
  return strRtn;
};
// 获取当前时间
function formatDate() {
  var now = new Date();
  var year = now.getFullYear(); //年
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
  var hh = now.getHours(); //时
  var mm = now.getMinutes(); //分
  var ss = now.getSeconds(); //秒
  var clock = year + "-";
  if (month < 10) clock += "0";
  clock += month + "-";
  if (day < 10) clock += "0";
  clock += day + " ";
  if (hh < 10) clock += "0";
  clock += hh + ":";
  if (mm < 10) clock += "0";
  clock += mm + ":";
  if (ss < 10) clock += "0";
  clock += ss;
  return clock;
};
// 获取cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
};
// 设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
};
// 删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


export default {
  DecodeCookie,
  formatDate,
  getCookie,
  setCookie,
  delCookie,
}
