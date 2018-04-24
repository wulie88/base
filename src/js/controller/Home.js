var Class = require('../lib/Class.js'), 
Controller = require('../lib/Controller.js'),
PinkApi = require('../PinkApi.js')

var IS_PRODUCTION = ELF_ENV == 'production'

// 首页控制器
HomeController = Class.create({
  Extends: Controller,
  constructor: function(router){
    HomeController.superclass.constructor.call(this, 'home', router);
  },
  tpl: require('../view/Home.art'), // https://aui.github.io/art-template/zh-cn/docs/syntax.html
  data: {
    items: [
    	{
    		title: 'master',
    		subtitle: '正式版',
    		uri: '/PinkDiary/master'
    	},
    	{
    		title: 'dev',
    		subtitle: '最新测试版',
    		uri: '/PinkDiary/dev'
    	},
    	{
    		title: 'dev-6.9.0',
    		uri: '/PinkDiary/dev-6.9.0'
    	},
    	{
    		title: 'dev-6.8.0',
    		uri: '/PinkDiary/dev-6.8.0'
    	}
    ]
  },
  mounted: function () {
	  console.log(this.name + ' mounted')
  	var that = this
  	$('#o2_main').on('click', '.btnAdd', function() {
		that.data.items.push({
    		title: 'dev-6.7.0',
    		uri: '/PinkDiary/dev-6.7.0'
    	})
    	that.render()
  	})
  }
})

module.exports = HomeController;