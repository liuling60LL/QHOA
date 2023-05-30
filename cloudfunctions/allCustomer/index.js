// 查询所有客户联系人
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('customers').orderBy('type', 'desc').get()
  
}