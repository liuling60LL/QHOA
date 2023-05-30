// 销售按计划打卡
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try{
    await db.collection('clocks').add({
      data:{
        openid: openid,
        planId: event.planId,
        customer: event.customer,
        plan: event.plan,
        project: event.project,
        longitude: event.longitude,
        latitude: event.latitude,
        address: event.address,
        xiaoshou: event.xiaoshou,
        info: event.info,
        images: event.images,
        markers: event.markers,
        Time: processDate(new Date()) 
      }
    })
    await db.collection('weekPlan').where({
      _id: event.planId
    }).update({
      data:{
        status:'3'
      }
    })
  }catch(e){
    console.error(e)
  }

  function processDate(_date) {
    var y = _date.getFullYear();
    var m = _date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = _date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = _date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = _date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second= _date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  };
}