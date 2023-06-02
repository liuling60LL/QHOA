// pages/manage/authority.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noAuthList: [],
    show: false,
    curUser:{},
    columns: ['true','false'],
    checked:false,
    openid: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.userinfo()
  },
  userinfo(){
    wx.cloud.callFunction({
      name: 'noAuth',
      data: {},
      success: res => {
        this.setData({
          noAuthList: res.result.noAuthList
        });
      },
      fail: error => {
        console.log(error);
      }
    });
  },
  updateClick(event) {
    let user = event.currentTarget.dataset.userinfo;
    if (user){
      this.setData({
        curUser: user,
        openid:user.openid.substring(user.openid.length - 10),
        checked:user.hasAuthorize
      })
    }
    if (user){
      this.setData({
        show: true
      })
    }
  },
  onNameInput: function (e) {
    const { curUser } = this.data
    curUser.name = e.detail
    this.setData({ curUser })
  },
  getUserInfo(event) {
    const { curUser } = this.data
    wx.cloud.callFunction({
      name: 'noAuth',
      data: {
        openid: curUser.openid,
        hasAuthorize:curUser.hasAuthorize,
        name:curUser.name
      },
      success: res => {
        Toast('修改成功');
        this.userinfo()
      },
      fail: error => {
        Toast('修改失败');
        console.log('err',error);
      }
    });
  },

  onClose() {
    this.setData({ close: false });
  },
  onClose() {
    this.setData({
      // showPopup: false,
    });
  },
  onAuthChange(){
    const { curUser,checked } = this.data
    // curUser.hasAuthorize = checked
    this.setData({
      checked: !checked,
    });
    this.setData({ curUser })
  },
  onChange(ev){
    const { curUser } = this.data
    curUser.hasAuthorize = Number(ev.detail)
    this.setData({ curUser })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})