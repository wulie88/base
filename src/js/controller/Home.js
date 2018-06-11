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
    items: require('../config/projects.json')
  },
  created: function () {
    // 对数据加工
  },
  mounted: function () {
	  console.log(this.name + ' mounted')
  	var that = this
  	this.$root.on('click', '.btnAdd', function() {
		  that.data.items.push({
    		title: 'dev-6.7.0',
    		uri: '/PinkDiary/dev-6.7.0'
    	})
    	that.render()
  	})
  }
})

module.exports = HomeController;