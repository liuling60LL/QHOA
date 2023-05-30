// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = event.FromUserName
  const Content = event.Content
  const MsgId = event.MsgId

  const user = await db.collection('userInfo').where({
    openid: openid
  }).get()

  const xiaoshou = user.data

  await db.collection('messages').add({
    data:{
      xiaoshou: xiaoshou[0].name,
      openid: openid,
      MsgId: MsgId,
      Content: Content,
      status: '1' //未回复
    }
  })
}