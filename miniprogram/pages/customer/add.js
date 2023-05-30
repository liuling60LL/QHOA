import Toast from '@vant/weapp/toast/toast';
Page({

  data: {
    company: '',
    phone: '',
    name: '',
    zhiwu: '',
    info: '',
    checked: false
  },

 
  onLoad: function (options) {

  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  add(){
    const{company,phone,name,zhiwu,info,checked}=this.data
    if (!company || !phone || !name || !zhiwu || !info) {
      Toast('请填写完整客户信息');
      return false;
    }
    wx.cloud.callFunction({
      name: "addCustomer",
      data: {
        company:company,
        phone:phone,
        name:name,
        zhiwu:zhiwu,
        info: info,
        type: checked
      },
      success(res) {
        Toast({
          type: 'success',
          message: '新增成功',
          onClose: () => {
            wx.navigateBack({
              delta: 1,
            })
          },
        });
      },
      fail(res) {
        console.log("新增失败，请联系管理员", res)
      }
    })
  }

})