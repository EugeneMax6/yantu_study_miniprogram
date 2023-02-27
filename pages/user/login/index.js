// pages/user/login/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    spinShow: false,
    username: '',
    password: '',
  },
  wechatLogin(){
    var _this = this
    wx.login({
      success(wxres) {
        if (wxres.code) {
          app.formPost('/wx/codeLogin/'+wxres.code, {
          }).then(res => {
            console.log(res)
            if (res.code == 200) {
              wx.setStorageSync('token', res.data)
              wx.reLaunch({
                url: '/pages/index/index',
              });
            } else if(res.code ==500){
              wx.reLaunch({
                url: '/pages/wechat/index/index',
              });
              app.message(res.data.msg, 'error')
            }
          }).catch(e => {
            console.log(e)
            app.message(e, 'error')
          })
        } else {
          app.message(res.errMsg, 'error')
        }
      }
    })
  },
  toRegister(){
    wx.navigateTo({
      url: '/pages/user/register/index',
    })
  },
  formSubmit: function(e) {
    let _this = this
    _this.setData({
      spinShow: true
    });
    wx.login({
      success(wxres) {
        if (wxres.code) {
          app.formPost('/wx/accountLogin', JSON.stringify(e.detail.value))
            .then(res => {
              _this.setData({
                spinShow: true
              });
              if (res.data) {
                wx.setStorageSync('token', res.data)
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              } else {
                app.message('登录失败', 'error')
              }
            }).catch(e => {
              _this.setData({
                spinShow: false
              });
              app.message('登录失败', 'error')
            })
        } else {
          app.message("出错了", 'error')
        }
      }
    })
  },
})