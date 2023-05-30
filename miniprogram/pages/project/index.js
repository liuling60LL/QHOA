import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({

  data: {
    list: [],
    detail: [],
    show: false,
    userInfo: {}
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
    const {userInfo} = this.data
    wx.cloud.callFunction({
      name: "projects",
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
      show: true
    })
  },

  remove(ev){
    let data = ev.currentTarget.dataset.data
    let that = this
    Dialog.confirm({
      title: '确定废弃项目？',
      message: data.name,
    })
      .then(() => {
        wx.cloud.callFunction({
          name: "upProject",
          data: {
            _id: data._id,
            type: '3'
          },
          success(res) {
            Toast.success('废弃成功');
            that.onShow()
          },
          fail(res) {
            console.log("废弃失败，请联系管理员", res)
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  over(ev){
    let data = ev.currentTarget.dataset.data
    let that = this
    Dialog.confirm({
      title: '确定完结项目?',
      message: data.name,
    })
      .then(() => {
        wx.cloud.callFunction({
          name: "upProject",
          data: {
            _id: data._id,
            type: '2'
          },
          success(res) {
            Toast.success('处理成功');
            that.onShow()
          },
          fail(res) {
            console.log("处理失败，请联系管理员", res)
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  add: function (e) {
    wx.navigateTo({
        url: "../project/add"
    })
  },
  
})