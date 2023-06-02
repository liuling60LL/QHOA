import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    userInfo:{},
    totalPlan:'',
    totalProject:'',
    newUser:''
  },

  onLoad: function () {
  },

  onShow(){
    this.userinfo()
    this.getNewUser()
  },

  userinfo(){
    let that = this;
    wx.cloud.callFunction({
      name: "userInfo",
      data: {
      },
      success(res) {
        const user = res.result.data[0]
        console.log(user.totalProject)
        if(res.result){
          that.setData({
            userInfo: res.result.data[0],
            totalPlan: res.result.data[0].totalPlan,
            totalProject: res.result.data[0].totalProject,
            // newUser: user.newUser
          })
        }
      },
    })
  },
  getNewUser(){
    wx.cloud.callFunction({
      name: 'noAuth',
      data: {},
      success: res => {
        const length = res.result.noAuthList.length
        this.setData({
          newUser: length
        });
      },
      fail: error => {
        console.log(error);
      }
    });
  },

  checkUser(ev){
    const {url} = ev.currentTarget.dataset;
    const {userInfo} = this.data
    if(userInfo.hasAuthorize === 0){
      Toast.fail('未授权，请联系管理员');
    }else{
      wx.navigateTo({
        url: url,
      })
    }
  }

})