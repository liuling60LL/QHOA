import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  data: {
    list: [],
    xiaoshous: [],
    xiaoshou: '',
    openid: ''
  },

  onShow: function () {
    this.setData({
      xiaoshous: app.globalData.xiaoshous
    })
  },

  getData() {
    let that = this;
    const{openid} = this.data
    wx.cloud.callFunction({
      name: "customers",
      data: {
        openid: openid
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

  copy(ev) {
    wx.setClipboardData({
      data: ev.currentTarget.dataset.data.phone,
      success (res) {
        wx.hideToast();
        wx.getClipboardData({
          success (res) {
            Toast('手机号已复制');
          }
        })
      }
    })
  },

  bindPickerChange(e){
    const{xiaoshous} = this.data
    const xiaoshou = xiaoshous[e.detail.value].name
    const openid = xiaoshous[e.detail.value].openid
    this.setData({
      xiaoshou:xiaoshou,
      openid: openid
    })
    this.getData()
  },
  
})