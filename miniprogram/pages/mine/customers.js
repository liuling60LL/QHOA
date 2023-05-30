import Toast from '@vant/weapp/toast/toast';
Page({

  data: {
    list: [],
    xiaoshous: [],
    xiaoshou: '',
    openid: ''
  },

  onShow: function () {
    this.getData()
  },

  getData() {
    let that = this;
    const{openid} = this.data
    wx.cloud.callFunction({
      name: "allCustomer",
      data: {},
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
  
})