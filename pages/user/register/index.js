// pages/user/register/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    levelIndex:0,
    sex:0,
    form:{
      levelIndex:0,
      sex:0,
      userName:'',
      realName:'',
      password:'',
      password2:'',
      phone:'',
    },
  },
  bindLevelChange: function (e) {
    this.setData({
      levelIndex: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  formSubmit: function(e) {
    let _this = this;
    let form = e.detail.value
    console.log(form)
    if (form.userName == null || form.userName == '') {
      app.message('用户名不能为空', 'error');
      return;
    }
    if (form.realName == null || form.realName == '') {
      app.message('真实姓名不能为空', 'error');
      return;
    }
    if (form.password == null || form.password == '') {
      app.message('密码不能为空', 'error');
      return;
    }
    if (form.password2 == null || form.password != form.password2) {
      app.message('两次密码不相同', 'error');
      return;
    }
    if (form.userLevel == null || form.userLevel == '') {
      app.message('年级不能为空', 'error');
      return;
    }
    if (form.phone == null || form.phone == '') {
      app.message('手机号不能为空', 'error');
      return;
    }

    _this.setData({
      spinShow: true
    });
    app.formPost('/wx/Register', JSON.stringify(form))
      .then(res => {
        _this.setData({
          spinShow: false
        });
        if (res.code === 200) {
          wx.setStorageSync('token', res.data)
          wx.reLaunch({
            url: '/pages/index/index',
          });
        } else {
          app.message(res.msg, 'error')
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
  }
})