const app = getApp()
Page({

  data: {
    list: [],
    start: '',
    end: '',
    show: false,
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
    const{start,end,openid}=this.data
    wx.cloud.callFunction({
      name: "plansByWeek",
      data: {
        openid: openid,
        start: start,
        end: end
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

  startChange: function(e) {
    this.setData({
      start: e.detail.value
    })
    this.getData()
  },
  endChange: function(e) {
    this.setData({
      end: e.detail.value
    })
    this.getData()
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