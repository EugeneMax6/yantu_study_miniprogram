import {
  formatSeconds
} from '../../../utils/util.js'

let app = getApp()
Page({
  data: {
    spinShow: false,
    paperId: null,
    form: {},
    timer: null,
    doTime: 0,
    remainTime: 0,
    remainTimeStr: '',
    modalShow: false,
    result: 0,
    timeOutShow: false,
    allquestionInfo:{},
   
  },
  onLoad: function(options) {
    let paperId = options.id
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formGet('/wx/paper/' + paperId, null)
      .then(res => {
        _this.setData({
          spinShow: false
        });
        if (res.code === 200) {
          console.log(res.data[0])
          _this.setData({
            form: res.data[0],
            paperId: paperId,
            remainTime: res.data[0].suggestTime * 60
          });
          _this.timeReduce()
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
  },
  timeReduce() {
    let _this = this
    let timer = setInterval(function() {
      let remainTime = _this.data.remainTime
      if (remainTime <= 0) {
        _this.timeOut()
      } else {
        _this.setData({
          remainTime: remainTime - 1,
          remainTimeStr: formatSeconds(remainTime),
          doTime: _this.data.doTime + 1
        });
      }
    }, 1000)
    _this.setData({
      timer: timer
    });
  },
  onUnload() {
    clearInterval(this.data.timer)
  },
  returnRecord() {
    wx.reLaunch({
      url: '/pages/record/index',
    });
  },
  timeOut() {
    clearInterval(this.data.timer)
    this.setData({
      timeOutShow: true
    });
  },
  formSubmit: function(e) {
    console.log(e)
    let _this = this
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    e.detail.value.id = this.data.paperId
    e.detail.value.doTime = this.data.doTime
    console.log(e.detail)
      //处理传给后端的数据
      var arr = []
      for (let key1 in e.detail.value) {
        let dict = {
          'qOrder':null,
          'qId':null,
          'qType':null,
          'myAnswer':null,
         };
        if(key1 !="doTime"&&key1 !="id"){
           // 每遍历一次，就创建一个字典对象
          let str=String(key1).split('_')
          console.log(str)
          let i=0
          for(let key2 in dict){
            if(key2!="myAnswer"){
              dict[key2]=str[i++]
            }
            else{
              dict[key2] = e.detail.value[key1];
            }
          }
           
        }
        dict['doTime']=this.data.doTime
        dict['paperId']=this.data.paperId
        if(dict['qOrder']!=null){
          arr.push(dict);
        }
      }
       console.log(arr);

    app.formPost('/wx/answerSubmit', arr)
      .then(res => {
        if (res.code === 200) {
          _this.setData({
            modalShow: true,
            result: res.data
          });
        } else {
          app.message(res.data, 'error')
        }
        wx.hideLoading()
      }).catch(e => {
        wx.hideLoading()
        app.message(e, 'error')
      })
  }
})