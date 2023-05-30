// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let result = false
  let role = ''
  let msg = '失败'
  
  await db.collection('user_info')
  .where({
    username: event.username,
  })
  .get()
  .then(res => {
  let info = res.data[0]
  if(info){
    if(info.openid != ''){
      if(info.openid == wxContext.OPENID && info.password == event.password){
      result = true
      msg = '成功！'
      }
    } else {
      if(info.password == event.password){
          db.collection('user_info').doc(info._id)
          .update({
            data: {
              openid: wxContext.OPENID
            },
          })
      
      result = true
      msg = '成功！（绑定）'
      }
    }
	role = info.role
  }
	
  })
  return {
	result: result,
	role: role,
	msg: msg,
  }
}