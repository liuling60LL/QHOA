// 新建项目
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try{
    await db.collection('projects').add({
      data:{
        openid: openid,
        company: event.company,
        name: event.name,
        date: event.date,
        customer: event.customer,
        xiaoshou: event.xiaoshou,
        phone: event.phone,
        zhiwu: event.zhiwu,
        type: event.type,
        stage: event.stage,
        address: event.address,
        info: event.info,
        fee: event.fee,
        status: '1'
      }
    })
  }catch(e){
    console.error(e)
  }
}