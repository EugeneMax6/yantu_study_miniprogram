const app = getApp()
Page({
  data: {
    spinShow: false,
    info: {}
  },

  onLoad: function(options) {
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formGet('/wx/user', null).then(res => {
      if (res.code ==200) {
        _this.setData({
          info: res.data
        });
      }
      _this.setData({
        spinShow: false
      });
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  logOutWechat() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    let token = wx.getStorageSync('token')
    app.formPut('/wx/loginOut/'+token, null).then(res => {
      if (res.code == 200) {
        app.message('解绑成功','success')
      }
      _this.setData({
        spinShow: false
      });
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  logOut(){
    let _this = this
    _this.setData({
      spinShow: true
    });
    wx.setStorageSync('token', '') 
    wx.reLaunch({
      url: '/pages/user/login/index',
    });

  },
  scan(){
    let _this = this
    wx.scanCode({
      success (res) {
        console.log(res)
        // 扫码获取一些数据 然后和前端/后端交互 实现扫码登陆
        app.formPost('/wx/scanLogin/'+res.result).then(res => {
          if (res.code == 200) {
            app.message('登录成功','success')
          }
          _this.setData({
            spinShow: false
          });
        }).catch(e => {
          _this.setData({
            spinShow: false
          });
          app.message(e, 'error')
        })

      }
    })
  }
})