log("*   ╉ The Animal Protecting ╊");
log("*　　┏┓　　　┏┓+ +");
log("*　┏┛┻━━━┛┻┓ + +");
log("*　┃　　　　　　　┃");
log("*　┃　　　━　　　┃ ++ + + +");
log("*　████━████ 　+");
log("*　┃　　　　　　　┃ +");
log("*　┃　　　┻　　　┃")
log("*　┃　　　　　　　┃ + +");
log("*　┗━┓　　　┏━┛");
log("*　　　┃　　　┃");
log("*　　　┃　　　┃ + + + +");
log("*　　　┃　　　┃　　　　");
log("*　　　┃　　　┃ + 　");
log("*　　　┃　　　┃")
log("*　　　┃　　　┃　　+");
log("*　　　┃　　　┗━━━┓ + +")
log("*　　　┃　　　　　　　┣┓+ + + ");
log("*　　　┃　　　　　　　┏┛+ +");
log("*　　　┗┓┓┏━┳┓┏┛ + ");
log("*　　　　┃┫┫　┃┫┫");
log("*　　　　┗┻┛　┗┻┛+ + ");
log("*    Code is far away from bug!");
log("*        神兽保佑,代码无bug");
toast('Hello, Auto.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
var url = "http://192.168.1.56:8011/kepuapp"

function run () {
  console.show()
  console.clear()
  var userList = getInfo()
  launchApp()
  login()
  back()
  console.hide()
}

function getInfo () {
  var res = http.get(url)
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode)
  } else {
    var account = res.body.json()
    log(account)
    return account
  }
}

function postInfo (item) {
  var res = http.post(url, item)
  if (res.statusCode != 200) {
    log("请求失败: " + res.statusCode)
  } else {
    log("请求成功: " + res.statusCode)
  }
}

function launchApp () {
  let isLauchApp = false

  while (!isLauchApp) {
    log("尝试启动")
    launchPackage("com.sevenplus.chinascience")
    sleep(8000)
    let mesbox = id("tv_cancel").findOnce()
    if (mesbox) {
      mesbox.click()
    }
    isLauchApp = id("bottom_layout").findOnce()
  }
  log("已启动")
}