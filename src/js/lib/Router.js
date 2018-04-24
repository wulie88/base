var Class = require('./Class.js'),
Util = require('./util.js'),
PinkApi = require('../PinkApi')

var Router = Class.create({
    constructor: function() {
        this.routes = {};
        this.currentController = null;
        this.currentUrl = null;
    },
    define: function(path, controller) {
        this.routes[path] = new controller(this) || function(){};
    },
    execute: function() {
        this.currentUrl = location.hash.slice(1) || '/';
        console.log('execute router for ' + this.currentUrl)

        // 默认首页
        if (this.currentUrl === '/') {
            var queries = Util.parseQuery(location.search)
            if (queries['signature'] && queries['signature'] != 1) {
                // 站内
                this.currentUrl = this.defaultInApp
            } else {
                this.currentUrl = this.defaultOutApp
            }
        }

        if (this.currentController) {
            this.currentController.unload()
        }
        var urls = this.currentUrl.split('*'), path = urls[0]
        if (this.routes[path]) {
            this.currentController = this.routes[path];
            var controller = this.currentController
            if (urls.length > 1) {
                controller.created(Util.parseQuery(urls[1]))
            } else {
                controller.created()
            }
            // 渲染
            controller.render()
            // 通知
            controller.mounted()
        } else {
            console.error('not match ' + this.currentUrl)
        }
    },
    buildHash: function(path, params) {
        return '#'+path+(params?'*'+$.param(params):'')
    },
    push: function(path, params) {
        var url = location.href.split('#')[0] + this.buildHash(path, params)
        // 支持内外打开
        if (PinkApi.isReady) {
            PinkApi.openWindow(url)
        } else {
            open(url)
        }
    },
    repalce: function(path, params) {
        location.repalce(location.href.split('#')[0] + this.buildHash(path, params))
    },
    init: function(inApp, outApp, render) {
        this.defaultInApp = inApp
        this.defaultOutApp = outApp
        this.render = render

        window.addEventListener('load', this.execute.bind(this), false);
        window.addEventListener('hashchange', this.execute.bind(this), false);
    }
})

module.exports = Router;
