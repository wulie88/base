var Class = require('./Class.js'),
Util = require('./util.js'),
PinkApi = require('../PinkApi')

var Router = Class.create({
    constructor: function(inApp, outApp, render) {
        this.defaultInApp = inApp
        this.defaultOutApp = outApp
        this.render = render

        window.addEventListener('load', this.init.bind(this), false);
        window.addEventListener('popstate', this.onPopstate.bind(this), false);

        this.routes = {};
        this.currentController = null;
        this.baseUrl = location.href.split('#')[0];
        this.currentUrl = null;
        this.history = []
    },
    define: function(path, controller) {
        this.routes[path] = controller || function(){};
    },
    execute: function(path, params) {
        if (this.currentController) {
            this.currentController.destroyed()
        }

        if (path in this.routes) {
            this.currentController = new this.routes[path](this);
            var controller = this.currentController
            // 创建
            controller.created(params)
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
        var url = this.baseUrl + this.buildHash(path, params)
        history.pushState({path: path, params: params}, null, url)
        this.execute(path, params)
    },
    replace: function(path, params) {
        var url = this.baseUrl + this.buildHash(path, params)
        history.replaceState({path: path, params: params}, null, url)
        this.execute(path, params)
    },
    onPopstate: function (e) {
        if (e.state) {
            var s = e.state
            this.execute(s.path, s.params)
        } else {
            this.init()
        }
    },
    init: function () {
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
        var urls = this.currentUrl.split('*'), path = urls[0], params = urls.length > 1 ? Util.parseQuery(urls[1]) : {};
        this.execute(path, params)
    }
})

module.exports = Router;
