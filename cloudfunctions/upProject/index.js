// 废弃或者完结项目
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try{
    await db .collection('projects').where({
      openid: openid,
      _id: event._id
    }).update({
      data:{
        status: event.type,
        doTime: processDate(new Date())
      }
    })
  }catch(e){
    console.errorO(e)
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