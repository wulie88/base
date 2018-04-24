var IS_PRODUCTION = ELF_ENV == 'production'

var PinkApi = require('../PinkApi.js')
function OAuth(){
  this.getAuthcode = function(){
    var self = this;
    var transUrl = encodeURI('http://activity.fenfenriji.com/inviter/invite/auth');
    var url = 'http://openapi.fenfenriji.com/channel/authorize';
    var signatureUrl;
    PinkApi.signatureUrl(url+'?response_type=code&client_id=169025&redirect_uri='+transUrl+'&scope=basic&signature=1',function(data){
      signatureUrl = data.url;
      $.ajax({
        type: 'GET',
        url:signatureUrl,
        data: {},
        dataType: 'json',
        success: function(res){
          self.getAuthToken(res.code);
        },
        error:function(res){
          PinkApi.alert({title: '授权失败，请重新登录', emotion: 'cry', cancelBtn: '好的'})
        }
      })
    });
  }
  this.getAuthToken = function(code){
    var that = this
    $.ajax({
      type: 'GET',
      url: 'http://activity.fenfenriji.com/inviter/invite/auth',
      data: {code:code},
      dataType: 'json',
      success: function(res){
        console.log('getAuthToken', res);
        if(res.data.uid){
          that.uid = res.data.uid
          localStorage.setItem('oauth' + that.uid, JSON.stringify(res.data))
          that._success && that._success(res.data)
        } else {
          that._error && that._error(res)
        }
      },
      error:function(res){
        console.log('token错误为'+JSON.stringify(res));
      }
    })
  }
  this.hasAuthed = function() {
    this.uid = localStorage.getItem('uid')
    var dataStr = localStorage.getItem('oauth' + this.uid);
    if (dataStr) {
      return !! JSON.parse(dataStr).uid
    } else {
      return false
    }
  }
  this.auth = function(uid, success, error) {
    localStorage.setItem('uid', uid)
    if (!IS_PRODUCTION) {
      localStorage.setItem('oauth' + uid, JSON.stringify({uid: 23307989}))
    }
    this._success = success
    this._error = error || function() {}
    if (this.hasAuthed()) {
      var dataStr = localStorage.getItem('oauth' + this.uid)
      return this._success(JSON.parse(dataStr))

    }

    this.getAuthcode()
  }
}
module.exports = OAuth
