// 查询销售本人待办计划
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('weekPlan').where({
    openid: event.openid,
    status: '1'
  }).orderBy('status', 'asc').get()
  
}