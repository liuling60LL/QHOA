// 查询销售本人周计划
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  return await db.collection('weekPlan').where({
    openid: openid,
    status: _.in(['1','2','3'])
  }).orderBy('status', 'asc').get()
  
}