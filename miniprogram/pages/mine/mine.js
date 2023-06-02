import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    userInfo: {},
    role: true,
    arr: ["莫问收获，但问耕耘","愿你眼中总有光芒，愿你活出想要的模样","如果我会发光，就不必害怕黑暗", "要么忙着活 要么忙着死","活得尽兴 而不是庆幸", "如果你害怕做一件事 那就去做" ]
  },

  onLoad() {
    const{arr} = this.data
    Toast(arr[Math.floor((Math.random()*arr.length))])
  },

  onShow: function () {
    this.userinfo()
  },

  userinfo(){
    let that = this;

    wx.cloud.callFunction({
      name: "userInfo",
      data: {
      },
      success(res) {
        if(res.result){
          that.setData({
            userInfo: res.result.data[0]
          })
        }
        if(res.result.data[0].hasAuthorize === 0){
          Dialog.alert({
            title: '未授权',
            message: '用户未授权，请联系管理员授权',
          }).then(() => {
            wx.switchTab({
              url: '../index/index'
            })
          });
        }
      },
    })
  },

  goto(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },

  allCustomer(){
    wx.navigateTo({
      url: "../mine/customers",
    })
  },
  toAdmin() {
    let that = this;
    wx.cloud.callFunction({
      name: "updateUser",
      data: {
        _id: that.data.userInfo._id,
        role: false
      },
      success(res) {
        that.setData({
          'userInfo.role': false
        })
        wx.showToast({
          title: '切换成功',
          icon: 'none',
        })
        wx.switchTab({
          url: '../index/index'
        })
      },
      fail(res) {
        wx.showToast({
          title: '切换失败',
          icon: 'none',
        })
        console.log(res)
      }
    })
  },
  toStaff(){
    let that = this;
    wx.cloud.callFunction({
      name: "updateUser",
      data: {
        _id: that.data.userInfo._id,
        role: true
      },
      success(res) {
        that.setData({
          'userInfo.role': true
        })
        wx.showToast({
          title: '切换成功',
          icon: 'none',
        })
        wx.switchTab({
          url: '../index/index'
        })
      },
      fail(res) {
        wx.showToast({
          title: '切换失败',
          icon: 'none',
        })
        console.log(res)
      }
    })
  }

})