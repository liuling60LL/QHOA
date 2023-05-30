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
    const{openid}=this.data
    wx.cloud.callFunction({
      name: "daibanPlan",
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

  detail(ev) {
    let data = ev.currentTarget.dataset.data
    this.setData({
      detail: data,
      showDetail: true
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