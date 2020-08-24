log("*   ╉ The Animal Protecting ╊");
log("*　　┏┓　　　┏┓+ +");
log("*　┏┛┻━━━┛┻┓ + +");
log("*　┃　　　　　　　┃");
log("*　┃　　　━　　　┃ ++ + + +");
log("*　████━████ 　+");
log("*　┃　　　　　　　┃ +");
log("*　┃　　　┻　　　┃");
log("*　┃　　　　　　　┃ + +");
log("*　┗━┓　　　┏━┛");
log("*　　　┃　　　┃");
log("*　　　┃　　　┃ + + + +");
log("*　　　┃　　　┃　　　　");
log("*　　　┃　　　┃ + 　");
log("*　　　┃　　　┃");
log("*　　　┃　　　┃　　+");
log("*　　　┃　　　┗━━━┓ + +");
log("*　　　┃　　　　　　　┣┓+ + + ");
log("*　　　┃　　　　　　　┏┛+ +");
log("*　　　┗┓┓┏━┳┓┏┛ + ");
log("*　　　　┃┫┫　┃┫┫");
log("*　　　　┗┻┛　┗┻┛+ + ");
log("*    Code is far away from bug!");
log("*        神兽保佑,代码无bug");
toast("Hello, Auto.js");
auto();
let deviceWidth = device.width;
let deviceHeight = device.height;
var readTotalNum = 6
var url = "http://192.168.1.56:8011";
var tmpList = [
  {
    id: 1997,
    username: "张欣怡",
    phone: 13270837022,
    password: "12345678@",
    valid: 1,
  },
];
run();

function run () {
  console.show();
  console.clear();
  // var userList = getInfo();
  var userList = tmpList;
  launchApp();
  main(tmpList[0]);
  back();
  console.hide();
}

function main (userinfo) {
  let haslogin=login(userinfo);
  if (haslogin) {
    text("推荐").waitFor()
    text("推荐").click()
    if (id("view_page").exists()) {
      if (id("rv_home_common").exists()) {
        readNews(userinfo)
      }
    }
  }
}

function readNews (userinfo) {
  log("开始刷")
  sleep(2000)
  let readResule = {
    readCount: 0
  }
  while (readTotalNum > readResule.readCount) {
    let thisReadResule = readCurrentScreenNews(userinfo)
    readResule.readCount += thisReadResule.readCount
    if (text("推荐").exists())
      swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2,
        deviceHeight - (deviceHeight - 70), 1500)//上滑x
    else
      back()
    sleep(1000)
    log("累计阅读文章数量" + readResule.readCount)
  }
}

// 阅读当前屏幕显示的新闻,返回阅读时长和数量
function readCurrentScreenNews (userinfo) {
  let readResule = {
    readCount: 0
  }
  newBack();
  let newsTitleArray = getCurrentScreenNews()
  log("当前页面新闻数量：" + newsTitleArray.length)
  for (let i = 0; i < newsTitleArray.length; i++) {
    // let i = newsTitleArray.length - 1
    if (newsTitleArray[i] == undefined) {
      log("当前屏幕文章已经阅读完")
      return readResule
    }
    log(newsTitleArray[i].text())
    userinfo['title'] = newsTitleArray[i].text()
    log(userinfo)
    if (postInfo(userinfo)) {
      return readResule
    }
    let NewsIndexFrame = getNewsFrameIndexTitleUi(newsTitleArray[i])
    if (NewsIndexFrame == null) return readResule
    let newsReadResule = shareNewsIndexTitleUi(NewsIndexFrame)
    insertInfo(userinfo)
    readResule.readCount += newsReadResule.readCount
    log("当前屏幕阅读文章数量" + readResule.readCount)
  }
  return readResule
}
//传入文章的title的控件对象,返回文章的可点击对象frame
function getNewsFrameIndexTitleUi (titleUi) {
  let frame = titleUi
  while (!frame.clickable()) {
    frame = frame.parent()
    if (frame == null) {
      log("没有可点击的框架" + titleUi.text())
      return null
    }
  }
  return frame
}

//阅读一篇文章，传入文章的title的控件对象
function shareNewsIndexTitleUi (NewsIndexFrame) {
  NewsIndexFrame.click();
  sleep(1000)
  if (!text("专题详情").exists()) {
    share()
    back()
  }
  sleep(1000)
  newBack()
  return {
    readCount: 1
  }
}
//找出当前页面所有文章的标题
function getCurrentScreenNews () {
  let newsTitleArray = id("title_tv").find()
  return newsTitleArray;
  // id("rv_home_common").findOne().children().forEach(child => {
  //   var target = child.find(id("title_tv"));
  //   return target;
  // });
}

function getInfo () {
  var res = http.get(url + '/kepuapp');
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    var account = res.body.json();
    log(account);
    return account;
  }
}

function postInfo (item) {
  var res = http.postJson(url + '/kepuapp', item);
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    if (res.body.json()['status'] === 'success')
      return true
    else
      return false
  }
}
function insertInfo (item) {
  var res = http.postJson(url + '/insert', item);
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    if (res.body.json()['status'] === 'success')
      return true
    else
      return false
  }
}

function launchApp () {
  let isLauchApp = false;
  while (!isLauchApp) {
    log("尝试启动");
    launchPackage("com.sevenplus.chinascience");
    sleep(8000);
    let mesbox = id("tv_cancel").findOnce();
    if (mesbox) {
      mesbox.click();
    }
    back()
    isLauchApp = id("bottom_layout").findOnce();
  }
  log("已启动");
}

function login (userinfo) {
  log("开始登录！")
  id("tab_image_iv5").waitFor();
  id("tab_image_iv5").click();
  var loginBox = id("login_tv").findOnce();
  if (!loginBox || !loginBox.text() === "登录/注册") {
    logout();
    sleep(1000);
    id("login_tv").waitFor();
  }
  id("login_tv").click();
  sleep(3000);
  id("et_phone").setText(userinfo["phone"]);
  id("et_psw").setText(userinfo["password"]);
  id("login_bt").click();
  sleep(3000);
  if (id("tv_cancel").exists()) {
    id("tv_cancel").findOne().click();
    log("请完善身份信息！");
    return false
    // addWrongAccount(item);
  }
  if (id("tab_image_iv1").exists()) {
    id("tab_image_iv1").findOne().click();
  } else {
    log("登录出错！");
    return false
    // addWrongAccount(item)
  }
  return true
}
function share () {
  if (id("zhuanfa_share_rly").exists()) {
    id("zhuanfa_share_rly").findOnce().click();
  }
  if (id("ll_third_share").exists()) {
    text("QQ好友").findOne().parent().click()
  }
  sleep(1000)
  // packageName("com.tencent.mobileqq").text("我的电脑").findOnce().parent().click()
  packageName("com.tencent.mobileqq").className("android.widget.RelativeLayout").clickable(true).findOne().click()
  id("com.tencent.mobileqq:id/dialogRightBtn").findOne().click();
  sleep(1000)
  id("com.tencent.mobileqq:id/dialogLeftBtn").findOne().click();
  if (id("iv_close").exists()) id("iv_close").findOne().click();
  sleep(3000)
  id("back_iv").findOne().click();
}

function newBack () {
  if (id("back_iv").exists()) id("back_iv").findOne().click();
  if (id("back").exists()) id("back").findOne().click();
  if (id("com.tencent.mobileqq:id/ivTitleBtnLeftButton").exists()) id("com.tencent.mobileqq:id/ivTitleBtnLeftButton").findOne().click();
  if (id("com.tencent.mobileqq:id/ivTitleBtnLeft").exists()) id("com.tencent.mobileqq:id/ivTitleBtnLeft").findOne().click();
  if (id("iv_close").exists()) id("iv_close").findOne().click();
}

function logout () {
  id("set_iv").waitFor();
  id("set_iv").click();
  sleep(2000);
  id("logout_bt").waitFor();
  id("logout_bt").click();
  id("tv_ok").waitFor();
  id("tv_ok").click();
}
