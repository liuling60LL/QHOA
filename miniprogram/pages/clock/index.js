const app = getApp()
Page({

  data: {
    list: [],
    start: '',
    end: '',
    show: false,
    address: '',
    latitude: '',
    longitude: '',
    images: '',
    markers:''
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
    const{start,end,userInfo}=this.data
    wx.cloud.callFunction({
      name: "clockList",
      data: {
        openid: userInfo.openid, 
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
      show: true,
      cancelId: data._id,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      images: data.images,
      markers: data.markers
    })
  },

  imgYu: function (event) {
    let that = this
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = that.data.images;//获取data-list
    const newFileList = imgList.map(item => (item.url));
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: newFileList, // 当前显示图片的http链接
    })
  },
  
})