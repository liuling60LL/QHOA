// pages/clock/add1.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    userInfo: {},
    markers: {},
    poi: {},
    fileList: [],
    cloudPath: [],
    plans: [],
    plan: '',
    project: '',
    customer: '',
    info: '',
    planId: ''
  },

  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'HRZBZ-U76WI-JTVGS-5YGS6-GLIMV-37FPJ'
    });
    this.location()
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow(){
    this.getData()
  },

  location(){
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.getLocation({
            type: 'gcj02',
            success (res) {
              that.formSubmit(res)
            },
            fail: function(){
              Dialog.confirm({
                title: '请授权位置信息',
                message: '请允许获取位置信息，不然将无法打卡',
              }).then(() => {
                  wx.openSetting({
                    success (res) {
                      console.log(res.authSetting)
                    }
                  })
                })
                .catch(() => {
                  // on cancel
                });
            }
          })
        }else{
          wx.getLocation({
            type: 'gcj02',
            success (res) {
              that.formSubmit(res)
            }
          })
        }
      }
    })
  },

  formSubmit(e) {
    var _this = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: e.latitude,
        longitude: e.longitude
      },
      success: function(res) {//成功后的回调
        // console.log(res);
        var res = res.result;
        var mks = [];
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: '../../images/定位.png',//图标路径
          width: 20,
          height: 20,
          callout: { //在markers上展示地址名称，根据需求是否需要
            content: res.address,
            color: '#000',
            display: 'ALWAYS'
          }
        });
        _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          poi: {
            latitude: res.location.lat,
            longitude: res.location.lng
          }
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        // console.log(res);
      }
    })
  },

  afterRead(event) {
    const { file } = event.detail;
    const { fileList } = this.data;
    fileList.push({url: file.url});
    this.setData({
      fileList
    })
  },

  deleteImg(event) {
    const delIndex = event.detail.index
    const { fileList } = this.data
    fileList.splice(delIndex, 1)
    this.setData({
      fileList
    })
  },

  uploadToCloud() {
    wx.cloud.init();
    const {planId,plan,project,customer,info,poi,markers,userInfo,fileList} = this.data;
    let timestamp = Date.parse(new Date());

    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`${planId}${timestamp}${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        const newFileList = data.map(item => ({ url: item.fileID }));
        this.setData({ cloudPath: data, fileList: newFileList });
        wx.cloud.callFunction({
          name: "clock",
          data: {
            planId:planId,
            plan,plan,
            project,project,
            customer:customer,
            info:info,
            longitude: poi.longitude,
            latitude: poi.latitude,
            address: markers[0].title,
            xiaoshou: userInfo.name,
            images: newFileList,
            markers: markers
          },
          success(res) {
            console.log(res)
            Toast({
              type: 'success',
              message: '打卡成功',
              onClose: () => {
                wx.navigateBack({
                  delta: 1,
                })
              },
            });
          },
          fail(res) {
            console.log("打卡失败", res)
          }
        })
      })
      .catch(e => {
        wx.showToast({ title: '打卡失败', icon: 'none' });
        console.log(e);
      });

  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  taps(e){
    const {msg}=e.currentTarget.dataset;
    Toast(msg);
  },

  getData() {
    let that = this;
    const{ userInfo }=this.data
    wx.cloud.callFunction({
      name: "getClockPlan",
      data: {
        openid: userInfo.openid
      },
      success(res) {
        if (res.result.data) {
          that.setData({
            plans: res.result.data
          })
        }
      },
      fail(res) {
        console.log("查询错误", res)
      }
    })
  },

  bindPickerChange(e){
    const{plans} = this.data
    const planId = plans[e.detail.value]._id
    const customer = plans[e.detail.value].customer
    const plan = plans[e.detail.value].planName
    const project = plans[e.detail.value].project
    this.setData({
      customer:customer,
      plan: plan,
      project: project,
      planId: planId
    })
  },

  submit(){
    const{planId,plan,project,customer,info,fileList}=this.data
    // if (!planId || !plan || !project || !customer || !info) {
    //   Toast('请正确填写打卡信息');
    //   return false;
    // }
    if (!project ) {
      Toast('请选择相关项目,如未录入项目，请先前往【项目管理】新增');
      return false;
    }
    if (fileList.length==0) {
      Toast('请拍摄现在图片');
      return false;
    }else {
      this.uploadToCloud()
    }
  }

})