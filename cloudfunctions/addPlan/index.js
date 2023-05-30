// 销售录入客户信息
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try{
    await db.collection('weekPlan').add({
      data:{
        openid: openid,
        planName: event.planName,
        project: event.project,
        date: event.date,
        customer: event.customer,
        address: event.address,
        phone: event.phone,
        company: event.company,
        xiaoshou: event.xiaoshou,
        detail: event.detail,
        status: '1' //1、待执行 2、已执行 3、超时未执行
      }
    })
  }catch(e){
    console.error(e)
  }
}