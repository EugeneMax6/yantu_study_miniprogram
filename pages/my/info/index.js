// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    spinShow: false,
    levelIndex: 0
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
      if (res.code == 200) {
        _this.setData({
          userInfo: res.data,
          levelIndex: res.data.userLevel-1
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
  bindLevelChange: function(e) {
    this.setData({
      levelIndex: e.detail.value
    })
  },
  bindDateChange(e) {
    let {
      value
    } = e.detail;
    this.setData({
      "userInfo.birthDay": value
    })
  },
  formSubmit: function(e) {
    let _this = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.formPut('/wx/user', e.detail.value)
      .then(res => {
        if (res.code == 200) {
          // wx.reLaunch({
          //   url: '/pages/my/index/index',
          // });
          app.message('修改成功','success')
        } else {
          app.message(res.message, 'error')
        }
        wx.hideLoading()
      }).catch(e => {
        app.message(e, 'error')
        wx.hideLoading()
      })
  }
})