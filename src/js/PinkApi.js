
function pinkJsBridgeReady(readyCallback) {
  if (readyCallback && typeof readyCallback == 'function') {
    var Api = this;
    var pinkReadyFunc = function () {
      readyCallback(Api);
    };
    if (typeof window.PinkJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('PinkJSBridgeReady', pinkReadyFunc, false);
      } else if (document.attachEvent) {
        document.attachEvent('PinkJSBridgeReady', pinkReadyFunc);
        document.attachEvent('onPinkJSBridgeReady', pinkReadyFunc);
      }
    } else {
      pinkReadyFunc();
    }
  }
}

var PinkApi = {};

PinkApi.showToolbar = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('showToolbar');
	});
} 

PinkApi.setPageTitle = function (title) {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('setWebviewTitle', {'title': title});
	});
} 

PinkApi.goPaperShop = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinksns://mall/paper'});
	});
}

PinkApi.goEmotionShop = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinksns://mall/emotion'});
	});
}

PinkApi.goFontShop = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinksns://mall/font'});
	});
}

PinkApi.goSkinShop = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinksns://mall/skin'});
	});
}

PinkApi.goDuiBaNew = function (url) {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinksns://channel/biz/duiba?url=' + encodeURIComponent(url)});
	});
}

// params: {'title ': '我来自粉笔乐园', 'summary':'小手一抖 金币到手', 'target_url':'http://www.baidu.com', 'image_url':'http://icon.fenfenriji.com/AD/E4/A5/Image/1421837487445portrait.png'}
PinkApi.goShare = function (params) {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('share', params, function(data) {
			console.log('接收到:' + data.msg);
		});
	});
}

PinkApi.goWallet = function () {
	PinkApi.execute(function (api) {
		PinkJSBridge.callHandler('appJump', {'action': 'pinkwx://giftCertificates/app.weex.js'});
	});
}

PinkApi.goRelationships = function () {
  PinkApi.execute(function (api) {
    PinkJSBridge.callHandler('appJump', {'action': 'pinkwx://relationships/app.weex.js'});
  });
}

PinkApi.getUserInfo = function(callBack) {
    PinkApi.execute(function () {
        PinkJSBridge.callHandler('getUserInfo', {}, function(res) {
            if(res.uid) {
                callBack(res)
            } else {
                PinkJSBridge.callHandler('presentLogin', {}, function (userInfo) {
                    if (userInfo.uid) {
                        callBack(userInfo)
                    }
                });
            }
        });
    })
}

PinkApi.showOptionMenu  = function(){
   PinkApi.execute(function () {
     PinkJSBridge.callHandler('showOptionMenu', {});
   })
}

PinkApi.showMenuItems = function(menuList){
    menuList = menuList || ["menuItem:share:pink"]
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('showMenuItems',{
          "menuList":menuList}, function(data){

      });
    })
};

PinkApi.hideMenuItems = function () {
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('hideMenuItems', {
          "menuList": ['menuItem:copyUrl','menuItem:openWithSafari']
      });
    })
};

PinkApi.configSaveArea = function (color) {
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('configSaveArea', {
          "bottomBarColor": color
      });
    })
};

PinkApi.alert = function (params) {
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('alert', params);
    })
};

/*
title: '第三方分享',
summary: '第三方分享',
target_url: url,
image_url: 'http://img.fenfenriji.com/75/84/9B/Image/D673D3E9-0623-7DD8-566F-57D12A7CB165.png',
*/
PinkApi.onMenuShareSocial = function(params){
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('onMenuShareSocial', params, function(data) {});
    })
};

/*
title: '内部分享',
summary: '内部分享',
action_url: action_url,
image_url: 'http://img.fenfenriji.com/75/84/9B/Image/D673D3E9-0623-7DD8-566F-57D12A7CB165.png',
*/
PinkApi.onMenuSharePink = function(params){
    PinkApi.execute(function () {
      PinkJSBridge.callHandler('onMenuSharePink', params, function(data) {});
    })
};

PinkApi.goDownload = function () {
  open('https://android.myapp.com/myapp/detail.htm?apkName=pinkdiary.xiaoxiaotu.com&ADTAG=mobile')
}

PinkApi.hasJSBridge = function () {
	return window['PinkJSBridge'] !== undefined
}

PinkApi.queue = []
PinkApi.execute = function (func) {
  if (PinkApi.isReady) {
    func(window['PinkJSBridge'])
  } else {
    PinkApi.queue.push(func)
  }
}

pinkJsBridgeReady(function (api) {
  PinkApi.isReady = true;
  var func = PinkApi.queue.shift();
  while (func) {
    func(window['PinkJSBridge'])
    func = PinkApi.queue.shift()
  }
});

module.exports = PinkApi;