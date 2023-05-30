// 查询销售的所有项目
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('projects').where({
    openid: event.openid
  }).orderBy('status', 'asc').get()
  
}