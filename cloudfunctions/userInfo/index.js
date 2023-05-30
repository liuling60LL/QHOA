// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let totalPlan = 0
  let totalProject = 0

  const user = await db.collection('userInfo').where({
    openid: openid
  }).get()
  const data = user.data

  if(data.length === 0){
    try{
      await db.collection('userInfo').add({
        data:{
          openid: openid,
          name: '联系管理员授权', //昵称
          hasAuthorize: false,
          role:true,
          createTime: processDate(new Date()), //注册时间
        }
      })
    }catch(e){
      console.error(e)
    }
  }else{
    if(data[0].role){
      totalPlan = await db.collection('weekPlan').where({
        openid: openid,
        status: _.in(['1','2'])
      }).count()
      totalProject = await db.collection('projects').where({
        openid: openid,
      }).count()
    }else{
      totalPlan = await db.collection('weekPlan').where({
        status: _.in(['1','2'])
      }).count()
      totalProject = await db.collection('projects').count()
    }

    await db.collection('userInfo').where({
      openid: openid
    }).update({
      data:{
        totalPlan: totalPlan.total,
        totalProject: totalProject.total
      }
    })
  }

  return await db.collection('userInfo').where({
    openid: openid
  }).get()

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