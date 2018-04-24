
var OAuth = require('./OAuth.js')
var oauth = new OAuth()

// 初始化uid
oauth.hasAuthed()

var AppMixin = {
  baseUrl: 'http://activity.fenfenriji.com/inviter',
  getResponse: function (uri, callback) {
    $.ajax({
      type: 'get',
      url: AppMixin.baseUrl + uri,
      data: {uid: oauth.uid},
      dataType: 'json',
      success: function (res) {
        if (callback) {
          callback(res)
        }
      }
    })
  },
  oauth: function(uid, success, error) {
  	return oauth.auth(uid, success, error)
  }

}


module.exports = AppMixin
