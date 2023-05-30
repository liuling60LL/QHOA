import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({
  data: {
    date: '',
    index: '',
    show: false,
    userInfo: {},
    projects: [],
    customers: [],
    planName: '',
    project: '',
    detail: '',
    customer: '',
    company: '',
    phone: ''
  },

  onLoad(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow(){
    this.getData()
    this.getData2()
  },

  getData() {
    let that = this;
    const{userInfo} = this.data
    wx.cloud.callFunction({
      name: "projects",
      data: {
        openid: userInfo.openid
      },
      success(res) {
        if (res.result.data) {
          that.setData({
            projects: res.result.data
          })
        }
      },
      fail(res) {
        console.log("查询错误", res)
      }
    })
  },

  getData2() {
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
            customers: res.result.data
          })
        }
      },
      fail(res) {
        console.log("查询错误", res)
      }
    })
  },

  bindPickerChange(e){
    const{projects} = this.data
    const customer = projects[e.detail.value].customer
    const project = projects[e.detail.value].name
    const phone = projects[e.detail.value].phone
    const company = projects[e.detail.value].company
    const address = projects[e.detail.value].address
    this.setData({
      customer:customer,
      phone: phone,
      company: company,
      address: address,
      project: project
    })
  },

  bindPickerChange2(e){
    const{customers} = this.data
    const customer = customers[e.detail.value].name
    const phone = customers[e.detail.value].phone
    this.setData({
      customer:customer,
      phone: phone
    })
  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  add(){
    const{planName,project,date,customer,company,phone,address,detail,userInfo}=this.data
    if (!planName || !project || !date || !customer || !company || !phone || !address || !detail) {
      Toast('请正确填写计划内容');
      return false;
    }
    wx.cloud.callFunction({
      name: "addPlan",
      data: {
        planName: planName,
        project: project,
        date: date,
        customer: customer,
        company: company,
        phone: phone,
        address: address,
        detail: detail,
        xiaoshou: userInfo.name
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
        console.log("查询错误", res)
      }
    })
  },

  taps(e){
    const {msg}=e.currentTarget.dataset;
    Toast(msg);
  },
});