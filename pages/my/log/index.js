const app = getApp()
Page({
  data: {
    logList: null,
    len: 0
  },
  onLoad: function(options) {
    this.search();
  },
  search: function() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formGet('/wx/userLog', null).then(res => {
      _this.setData({
        spinShow: false
      });
      if (res.code === 200) {
        _this.setData({
          logList: res.data,
          len: res.data.length
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  }
})