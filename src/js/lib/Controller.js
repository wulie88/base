var Class = require('./Class.js'),
AppMixin = require('./AppMixin.js');

var View = Class.create({
	constructor: function(superView){
		this.super = superView;
	},
	// 模板 https://aui.github.io/art-template/zh-cn/docs/syntax.html
	tpl: null, // require('../view/Home.art')
	// 对应的数据
	data: {},
	// 子视图
	views: {},
	// 页面创建
	created: function () {
		console.log('view created')
	},
	// 页面加载，此时才可以操作dom
	mounted: function () {
		console.log('view mounted')
	},
	// 页面卸载
	destroyed: function () {
		console.log('view destroyed')
	},
	// 导出为html
	render: function () {
		console.log('view render')
	}
})

var Controller = Class.create({
  	Extends: View,
  	Mixes: AppMixin,
	constructor: function(name, router){
		Controller.superclass.constructor.call(this, this);
		this.name = name;
		this.router = router;
		console.log(this.name + ' bind router')
	},
	// 导出为html
	render: function () {
		console.log(this.name + ' render')
		this.router.render(this.tpl(this.data))
	}
})

module.exports = Controller;