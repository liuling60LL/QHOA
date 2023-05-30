import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({

  data: {
    list: [],
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
    const{userInfo} = this.data
    wx.cloud.callFunction({
      name: "customers",
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

  remove(ev){
    let data = ev.currentTarget.dataset.data
    let that = this
    Dialog.confirm({
      title: '删除联系人',
      message: data.name,
    })
      .then(() => {
        wx.cloud.callFunction({
          name: "removeCustomer",
          data: {
            id:data._id
          },
          success(res) {
            Toast.success('删除成功');
            that.onShow()
          },
          fail(res) {
            console.log("删除失败，请联系管理员", res)
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  add: function (e) {
    wx.navigateTo({
        url: "../customer/add"
    })
  },
  
})