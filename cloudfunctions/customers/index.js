// 查询销售的客户联系人列表
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('customers').where({
    openid: event.openid
  }).orderBy('type', 'desc').get()
  
}