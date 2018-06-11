
Promise = require('promise')
// var OAuth = require('./OAuth.js')
// var oauth = new OAuth()

// // 初始化uid
// oauth.hasAuthed()

var AppMixin = {
  baseUrl: 'http://test.activity.ffrj.net/distribution/forward',
  uid: '6767499',
  get: function (path, params) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'get',
        url: AppMixin.baseUrl,
        data: $.extend({router: path, uid: AppMixin.uid}, params),
        dataType: 'json',
        success: function (res) {
          if (res.code || res.errorMsg) {
            reject(res)
            return;
          }

          resolve(res.data)
        },
        error: function () {
          reject()
        }
      })
    })
  }
}


module.exports = AppMixin
