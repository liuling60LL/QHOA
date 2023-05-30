import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({
  data: {
    date: '',
    show: false,
    userInfo: {},
    customer: '',
    phone: '',
    zhiwu: '',
    type: '',
    stage: '',
    name: '',
    company: '',
    address: '',
    info: '',
    fee: '',
    types: ['房地产','综合体','工业'],
    showTypes: false,
    stages: ['立项','施工','前期技术交流','投标','合同实施'],
    showStages: false,
    customers: []
  },

  onLoad(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow(){
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
            customers: res.result.data
          })
          console.log(that.data.customers)
        }
      },
      fail(res) {
        console.log("查询错误", res)
      }
    })
  },

  //新建项目
  add(){
    const{date,customer,userInfo,phone,zhiwu,type,stage,name,company,address,info,fee}=this.data
    if (!date || !customer || !phone || !fee || !type || !stage || !name || !company || !address || !info) {
      Toast('请正确填写项目信息');
      return false;
    }
    wx.cloud.callFunction({
      name: "addProject",
      data: {
        name: name,
        company: company,
        date: date,
        customer: customer,
        xiaoshou: userInfo.name,
        phone: phone,
        zhiwu: zhiwu,
        type: type,
        stage: stage,
        address: address,
        info: info,
        fee: fee*1
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
  },

  bindPickerChange(e){
    const{customers} = this.data
    const customer = customers[e.detail.value].name
    const phone = customers[e.detail.value].phone
    const zhiwu = customers[e.detail.value].zhiwu
    this.setData({
      customer:customer,
      phone: phone,
      zhiwu: zhiwu
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

  showTypesAction(){
    this.setData({
      showTypes: true
    })
  },
  onCancel1() {
    this.setData({
      showTypes: false
    })
  },
  onConfirm1(event) {
    const {
        value,
    } = event.detail;
    this.setData({
        type: value,
        showTypes: false
    })
  },

  showStagesAction(){
    this.setData({
      showStages: true
    })
  },
  onCancel2() {
    this.setData({
      showStages: false
    })
  },
  onConfirm2(event) {
    const {
        value,
    } = event.detail;
    this.setData({
        stage: value,
        showStages: false
    })
  },

  taps(e){
    const {msg}=e.currentTarget.dataset;
    Toast(msg);
  },
});