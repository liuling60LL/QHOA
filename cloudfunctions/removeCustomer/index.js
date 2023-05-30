// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  try {
    return await db.collection('customers').where({
      openid: openid,
      _id: event.id
    }).remove()
  } catch(e) {
    console.error(e)
  }
  
}