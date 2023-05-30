import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  data: {
    list: [],
    start: '',
    end: '',
    show: false,
    cancelId: '',
    showDetail: false,
    detail: '',
    userInfo:{}
  },

  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow: function () {
    this.getData()
  },

  getData() {
    let that = this;
    const{userInfo}=this.data
    wx.cloud.callFunction({
      name: "daibanPlan",
      data: {
        openid: userInfo.openid
      },
      success(res) {
        if (res.result.data) {
          that.setData({
            list: res.result.data
          })
        }
      },
      fail(res) {
        console.log("查询错误", res)
      }
    })
  },

  detail(ev) {
    let data = ev.currentTarget.dataset.data
    this.setData({
      detail: data,
      showDetail: true
    })
  },

  cancel(ev){
    let data = ev.currentTarget.dataset.data
    this.setData({
      show: true,
      cancelId: data._id
    })
  },

  cancelPlan(){
    let that = this
    const{msg,cancelId}=this.data
    if (!msg) {
      Toast.fail('请填写取消原因！');
      return false;
    }
    wx.cloud.callFunction({
      name: "cancelPlan",
      data: {
        _id: cancelId,
        msg: msg
      },
      success(res) {
        Toast.success('已取消');
        that.setData({
          msg: ''
        })
        that.onShow()
      },
      fail(res) {
        console.log("废弃失败，请联系管理员", res)
      }
    })
  },
  
})