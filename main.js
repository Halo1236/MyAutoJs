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
var url = "http://192.168.1.56:8011/kepuapp";
var tmpList = [
  {
    id: 1997,
    username: "张欣怡",
    phone: 16557972168,
    password: "asd123456",
    valid: 1,
  },
  {
    id: 1998,
    username: "韩啸熙",
    phone: 17031274032,
    password: "asd123456",
    valid: 1,
  },
  {
    id: 1999,
    username: "张伊雪",
    phone: 17037064645,
    password: "asd123456",
    valid: 1,
  },
];
run();

function run() {
  console.show();
  console.clear();
  // var userList = getInfo();
  var userList = tmpList;
  launchApp();
  login(tmpList[0]);
  back();
  console.hide();
}

function getInfo() {
  var res = http.get(url);
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    var account = res.body.json();
    log(account);
    return account;
  }
}

function postInfo(item) {
  var res = http.post(url, item);
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode);
  } else {
    log("请求成功: " + res.statusCode);
  }
}

function launchApp() {
  let isLauchApp = false;
  while (!isLauchApp) {
    log("尝试启动");
    launchPackage("com.sevenplus.chinascience");
    sleep(8000);
    let mesbox = id("tv_cancel").findOnce();
    if (mesbox) {
      mesbox.click();
    }
    isLauchApp = id("bottom_layout").findOnce();
  }
  log("已启动");
}

function login(userinfo) {
  log("开始登录！")
  id("tab_image_iv5").waitFor();
  id("tab_image_iv5").click();
  let loginBox = id("login_tv").findOnce();
  if (!loginBox || !loginBox.text() === "登录/注册") {
    logout();
  }
  loginBox.click();
  sleep(3000);
  let yijian = id("content")
    .className("android.widget.RelativeLayout")
    .className("android.widget.RelativeLayout")
    .className("android.widget.ImageView");
  if (yijian) {
    yijian.click();
    log.error("一键登录！");
  }

  id("et_phone").setText(userinfo["phone"]);
  id("et_psw").setText(userinfo["password"]);
  id("login_bt").click();
  if (id("tab_image_iv1").exists()) {
    id("tab_image_iv1").click();
  } else {
    log.error("登录出错！");
    // addWrongAccount(item)
  }
  if (id("tv_cancel").exists()) {
    id("tv_cancel").click();
    log.error("请完善身份信息！");
    // addWrongAccount(item);
  }
}

function back() {
  if (id("back_iv").exists()) id("back_iv").click();
  if (id("back").exists()) id("back").click();
  if (id("ivTitleBtnLeftButton").exists()) id("ivTitleBtnLeftButton").click();
  if (id("ivTitleBtnLeft").exists()) id("ivTitleBtnLeft").click();
}

function logout() {
  id("set_iv").waitFor();
  id("set_iv").click();
  sleep(2000);
  id("logout_bt").waitFor();
  id("logout_bt").click();
  id("tv_ok").waitFor();
  id("tv_ok").click();
}
