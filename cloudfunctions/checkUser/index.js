// 登录验证用户是否注册
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  const user = await db.collection('userInfo').where({
    openid: openid
  }).get()

  const exit = user.data

  if(exit.length !== 0 && exit[0].hasAuthorize === true){
    return 'success'
  }else{
    return 'false'
  }
}