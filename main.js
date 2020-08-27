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
let deviceWidth = device.width === 0 ? 1080 : device.width;
let deviceHeight = device.height === 0 ? 1920 : device.height;
log(deviceWidth)
log(deviceHeight)
var readTotalNum = 20
var url = "http://192.168.1.56:8011";
var tmpList = [
  {
    id: 1997,
    username: "张欣怡",
    phone: 13270837022,
    password: "12345678@",
    valid: 1,
  },
  {
    id: 1997,
    username: "111",
    phone: 13270837022,
    password: "12345678@",
    valid: 1,
  },
  {
    id: 1997,
    username: "222",
    phone: 13270837022,
    password: "12345678@",
    valid: 1,
  },
];
run()
function run () {
  console.show();
  console.clear();
  var userList = getInfo();
  // var userList = tmpList;
  launchApp();
  // try {
  while (true) {
    for (let index = 0; index < userList.length; index++) {
      main(userList[index]);
    }
  }
  // } catch (error) {
  //   console.error(error);
  //   console.trace(error);
  //   back();
  //   console.hide();
  //   run();
  // }
}

function main (userinfo) {
  let haslogin = login(userinfo);
  if (haslogin) {
    text("推荐").waitFor();
    text("推荐").click();
    if (id("view_page").exists()) {
      if (id("rv_home_common").exists()) {
        readNews(userinfo);
      }
    }
  }
}

function readNews (userinfo) {
  log("开始刷")
  sleep(3000)
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
    if (postInfo(userinfo)) {
      continue
    }
    log(userinfo)
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
}

function getInfo () {
  var res = http.get(url + '/kepuapp');
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    var account = res.body.json();
    // log(account);
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
    log("已阅读插入成功！");
  }
}

function insertWrong (item) {
  var res = http.postJson(url + '/wrong', item);
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    log("插入无效账号成功！");
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
  id("tab_image_iv5").findOne(6000).click();
  var loginBox = id("login_tv").findOnce();
  if (!loginBox || !loginBox.text() === "登录/注册") {
    logout();
    sleep(1000);
  }
  id("login_tv").findOne(6000).click();
  sleep(3000);
  id("et_phone").setText(userinfo["phone"]);
  id("et_psw").setText(userinfo["password"]);
  id("login_bt").click();
  sleep(3000);

  if (text("暂不升级").exists()) {
    text("暂不升级").findOne(6000).click();
  }

  if (text("取消").exists()) {
    text("取消").findOne(6000).click();
    log("请完善身份信息！");
    insertWrong(userinfo)
    return false
  }

  if (id("tab_image_iv1").exists()) {
    id("tab_image_iv1").findOne(6000).click();
  } else {
    log("登录出错！");
    insertWrong(userinfo)
    back()
    return false
  }
  return true
}

function share () {
  id("zhuanfa_share_rly").findOne(6000).click();
  if (id("ll_third_share").exists()) {
    text("QQ好友").findOne(6000).parent().click()
  }
  sleep(2000)
  packageName("com.tencent.mobileqq").className("android.widget.RelativeLayout").clickable(true).findOne(6000).click()
  id("com.tencent.mobileqq:id/dialogRightBtn").findOne(6000).click();
  sleep(3000)
  id("com.tencent.mobileqq:id/dialogLeftBtn").findOne(6000).click();
  sleep(3000)
  let iv_close = id("iv_close").findOnce()
  if (iv_close) iv_close.click();
  id("back_iv").findOne(6000).click();
}

function newBack () {
  if (id("back_iv").exists()) id("back_iv").findOne(6000).click();
  if (id("back").exists()) id("back").findOne(6000).click();
  if (id("com.tencent.mobileqq:id/ivTitleBtnLeftButton").exists()) id("com.tencent.mobileqq:id/ivTitleBtnLeftButton").findOne(6000).click();
  if (id("com.tencent.mobileqq:id/ivTitleBtnLeft").exists()) id("com.tencent.mobileqq:id/ivTitleBtnLeft").findOne(6000).click();
  if (id("iv_close").exists()) id("iv_close").findOne(6000).click();
}

function logout () {
  id("set_iv").findOne(6000).click();
  sleep(2000);
  id("logout_bt").findOne(6000).click();
  id("tv_ok").findOne(6000).click();
}
