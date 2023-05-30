// 销售录入客户信息
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try{
    await db.collection('customers').add({
      data:{
        openid: openid,
        name: event.name,
        phone: event.phone,
        company: event.company,
        zhiwu: event.zhiwu,
        info: event.info,
        type: event.type
      }
    })
  }catch(e){
    console.error(e)
  }

}