// app.js
const {
  $Message
} = require('/component/iView/base/index');
App({
  globalData: {
    userInfo: null,
    isLogin: false,
    user: null,
    pageSize: 10,
    baseAPI: "http://localhost:8080",
  },
  onLaunch: function () {
    let _this = this
    let token = wx.getStorageSync('token')
    if (null == token || token == '') {
      wx.login({
        success(wxres) {
          if (wxres.code) {
            _this.formPost('/wx/codeLogin/'+wxres.code, {
            }).then(res => {
              if (res.code == 200) {
                wx.setStorageSync('token', res.data)
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              } else if (res.code == 500) {
                wx.reLaunch({
                  url: '/pages/user/login/index',
                });
              }
            }).catch(e => {
              _this.message(e, 'error')
            })
          } else {
            _this.message(res.errMsg, 'error')
          }
        }
      })
    }
  },
  message: function (content, type) {
    $Message({
      content: content,
      type: type
    });
  },
  formPost: function (url, data) {
    let _this = this
    return new Promise(function (resolve, reject) {
      wx.showNavigationBarLoading();
      wx.request({
        url: _this.globalData.baseAPI + url,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        method: 'POST',
        data,
        success(res) {
          console.log(res)
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            reject('网络出错')
            return false;
          }
          if (res.data.code === 400) {
            let token = res.data.res
            wx.setStorageSync('token', token)
            wx.request({
              url: _this.globalData.baseAPI + url,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token')
              },
              method: 'POST',
              data,
              success(result) {
                resolve(result.data);
                return true;
              }
            })
          } else if (res.data.code === 401) {
            wx.reLaunch({
              url: '/pages/user/login/index',
            });
          } else if (res.data.code === 501) {
            reject(res.data.msg)
            return false;
          } else {
            resolve(res.data);
            return true;
          }
        },
        fail(res) {
          reject(res.errMsg)
          return false;
        },
        complete(res) {
          wx.hideNavigationBarLoading();
        }
      })
    })
  },
  formPut: function (url, data) {
    let _this = this
    return new Promise(function (resolve, reject) {
      wx.showNavigationBarLoading();
      wx.request({
        url: _this.globalData.baseAPI + url,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        method: 'PUT',
        data,
        success(res) {
          console.log(res)
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            reject('网络出错')
            return false;
          }
          if (res.data.code === 400) {
            let token = res.data.res
            wx.setStorageSync('token', token)
            wx.request({
              url: _this.globalData.baseAPI + url,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token')
              },
              method: 'PUT',
              data,
              success(result) {
                resolve(result.data);
                return true;
              }
            })
          } else if (res.data.code === 401) {
            wx.reLaunch({
              url: '/pages/user/login/index',
            });
            return false;
          } else if (res.data.code === 501) {
            reject(res.data.msg)
            return false;
          } else {
            resolve(res.data);
            return true;
          }
        },
        fail(res) {
          reject(res.errMsg)
          return false;
        },
        complete(res) {
          wx.hideNavigationBarLoading();
        }
      })
    })
  },
  formGet: function (url, data) {
    let _this = this
    return new Promise(function (resolve, reject) {
      wx.showNavigationBarLoading();
      wx.request({
        url: _this.globalData.baseAPI + url,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        method: 'GET',
        data,
        success(res) {
          console.log(res)
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            reject('网络出错')
            return false;
          }
          if (res.data.code === 400) {
            let token = res.data.res
            wx.setStorageSync('token', token)
            wx.request({
              url: _this.globalData.baseAPI + url,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token')
              },
              method: 'GET',
              data,
              success(result) {
                resolve(result.data);
                return true;
              }
            })
          } else if (res.data.code === 401) {
            wx.reLaunch({
              url: '/pages/user/login/index',
            });
            return false;
          } else if (res.data.code === 501) {
            reject(res.data.msg)
            return false;
          } else {
            resolve(res.data);
            return true;
          }
        },
        fail(res) {
          reject(res.errMsg)
          return false;
        },
        complete(res) {
          wx.hideNavigationBarLoading();
        }
      })
    })
  }

})