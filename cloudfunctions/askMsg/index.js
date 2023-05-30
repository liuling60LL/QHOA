// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = event.openid
  const msg = event.msg
  
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
        "touser": openid,
        "msgtype": 'text',
        "text": {
          "content": msg
        }
      })
    return result
  } catch (err) {
    return err
  }
  
}