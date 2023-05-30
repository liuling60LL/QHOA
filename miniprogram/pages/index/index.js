import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    userInfo:{},
    totalPlan:'',
    totalProject:''
  },

  onLoad: function () {
  },

  onShow(){
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
            userInfo: res.result.data[0],
            totalPlan: res.result.data[0].totalPlan,
            totalProject: res.result.data[0].totalProject
          })
        }
      },
    })
  },

  checkUser(ev){
    const {url} = ev.currentTarget.dataset;
    const {userInfo} = this.data
    if(userInfo.hasAuthorize === false){
      Toast.fail('未授权，请联系管理员');
    }else{
      wx.navigateTo({
        url: url,
      })
    }
  }

})