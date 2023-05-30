// 查询所有销售名单
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('userInfo').where({
    role: true
  }).get()

}