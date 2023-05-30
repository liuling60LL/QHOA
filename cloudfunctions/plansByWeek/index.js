// 查询销售本人周计划
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('weekPlan').where({
    openid: event.openid,
    date:  _.gte(event.start === ''?'2000-01-01':event.start).and(_.lte(event.end === ''?'2099-12-30':event.end))
  }).orderBy('status', 'asc').get()
  
}