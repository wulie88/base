/*
 * 微信 api
 * 自带签名
 */
var wx = require('weixin-js-sdk')

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

var wxapi, WXApi = function() {}
WXApi.queue = []
WXApi.execute = function (func) {
  if (WXApi.isReady) {
    func(wxapi)
  } else {
    WXApi.queue.push(func)
  }
}

WXApi.prototype = {
	ready: function() {
	  WXApi.isReady = true;
	  var func = WXApi.queue.shift();
	  while (func) {
	    func(wxapi)
	    func = WXApi.queue.shift()
	  }
 	},
 	/*
 	配置分享
	config:
	{
		title: 分享标题
		desc: 分享描述
		link: 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: 分享图标
		type: 分享类型,music、video或link，不填默认为link
		dataUrl: 如果type是music或video，则要提供数据链接，默认为空
	}
	success: 用户确认分享后执行的回调函数
	cancel: 用户确认分享后执行的回调函数
	*/
 	configShare: function(config, success, cancel) {
 		config.success = config.success || function () {}
 		config.cancel = config.cancel || function () {}
 		// 分享给朋友
 		wx.onMenuShareAppMessage(config);
 		// 分享到朋友圈
		wx.onMenuShareTimeline(config);
		// 分享到QQ
		wx.onMenuShareQQ(config);
		// 分享到QQ空间
		wx.onMenuShareQZone(config);
 	},
 	onReady: function(config) {
 		var that = this
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: config['appId'], // 必填，公众号的唯一标识
		    timestamp: config['timestamp'], // 必填，生成签名的时间戳
		    nonceStr: config['nonceStr'], // 必填，生成签名的随机串
		    signature: config['signature'],// 必填，签名
		    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
		});

 		wx.error(function(res) {
 			console.error(res)
 		})
		wx.ready(function() {
			console.log('wx ready')
			that.ready();
		})
 	},
 	requestSign: function() {
 		var that = this
 		$.get('http://shop-app.mall.fenfenriji.com/wx/sign.php?url='+encodeURIComponent(location.href.split('#')[0]), function(data) {
 			that.onReady(data)
 		})
 	}
}

wxapi = new WXApi()
isWeixinBrowser() && wxapi.requestSign()

module.exports = WXApi;