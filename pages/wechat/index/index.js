// pages/wechat/index/index.js
const app = getApp()
Page({
  data: {
    username:'',
    password:'',
  },
  toRegister(){
    wx.navigateTo({
      url: '/pages/user/register/index',
    })
  },
  toIndex(){
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  formSubmit: function(e) {
    let _this = this
    _this.setData({
      spinShow: true
    });
    wx.login({
      success(wxres) {
        if (wxres.code) {
          e.detail.value.code = wxres.code
          console.log(e.detail.value)
          app.formPost('/wx/bindCode', e.detail.value)
            .then(res => {
              _this.setData({
                spinShow: true
              });
              if (res.data != null) {
                wx.setStorageSync('token', res.data)
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              } else {
                app.message(res.message, 'error')
              }
            }).catch(e => {
              _this.setData({
                spinShow: false
              });
              app.message(e, 'error')
            })
        } else {
          console.log('error')
        }
      }
    })
  },
})