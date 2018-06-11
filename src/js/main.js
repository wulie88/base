/* global ELF_ENV:"development" */
// 可以通过模式来实现开发和正式的api和资源地址不一样
var IS_PRODUCTION = ELF_ENV == 'production'

require('../index.html')
require('../css/package.scss')

var VConsole = require('./lib/vconsole.min.js'),
Router = require('./lib/Router.js'),
WXApi = require('./WXApi.js'),
PinkApi = require('./PinkApi.js')

new VConsole()

WXApi.execute(function(wxapi) {
  wxapi.configShare({
    title: '分享标题',
    desc: '分享描述',
    link: location.href,
    imgUrl: 'https://img.fenfenriji.com/90/68/AE/Image/61970B89-7CDE-C18A-5BBE-5A6A9DAE75E0.jpg'
  })
});

var initOptionMenu = function () {
  var url = location.origin + location.pathname;
  var params = {title: '商城', summary:'ELF版积分商城', target_url:url, action_url:url, image_url:'http://img.fenfenriji.com/90/68/AE/Image/61970B89-7CDE-C18A-5BBE-5A6A9DAE75E0.jpg'}
  PinkApi.onMenuSharePink(params)
  PinkApi.showMenuItems(["menuItem:share:pink", "menuItem:share:social", "menuItem:copyUrl", "menuItem:openWithSafari"])
}()


$(function() {
  var router = new Router('/home', '/home', function(content) {
    $('#o2_main').html(content)
  })

  // #定义控制器对应的路由
  router.define('/home', require('./controller/Home.js'))

  $('#o2_loading').remove()
  $('#o2_main').removeClass('hide')
})
