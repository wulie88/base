/* global ELF_ENV:"development" */
// 可以通过模式来实现开发和正式的api和资源地址不一样
var IS_PRODUCTION = ELF_ENV == 'production'

require('../index.html')
require('../css/package.scss')

var Preloader = require('preloader.js'),
VConsole = require('./lib/vconsole.min.js'),
Util = require('./lib/util.js'),
PinkApi = require('./PinkApi.js'),
WXApi = require('./WXApi.js')

// use VConsole
new VConsole()

WXApi.execute(function(wxapi) {
  wxapi.configShare({
    title: '分享标题',
    desc: '分享描述',
    link: location.href,
    imgUrl: 'https://img.fenfenriji.com/90/68/AE/Image/61970B89-7CDE-C18A-5BBE-5A6A9DAE75E0.jpg'
  })
});


var App = function () {}
App.prototype = {
	// init
	init: function () {
		console.log('init')
    // 设置iPhone X底部颜色
    PinkApi.configSaveArea('#291e56')
	}
}

/**
 * preloader && start
 */
var app = new App() 
var preloader = new Preloader({
  resources: [],
  concurrency: 4,
  perMinTime: 0 // 加载每个资源所需的最小时间，一般用来测试 loading
})
preloader.addProgressListener(function (loaded, length) {
  console.log('loaded', loaded, length, loaded / length)
})
preloader.addCompletionListener(function () {
  $('#o2_loading').remove()
  $('#o2_main').removeClass('hide')

  app.init()
})

preloader.start()
