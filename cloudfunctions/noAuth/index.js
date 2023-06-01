// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let noAuthList = [];

  const noAuth = await db.collection('userInfo')
    .where({
      hasAuthorize: true
    }).get();

  const data = noAuth.data

  for (let i = 0; i < data.length; i++) {
    if (data[i].hasAuthorize === true) {
      noAuthList.push(data[i]);
    }
  }

  const updateAuth = await db.collection('userInfo')
  .where({
    openid: event.openid || ''
  })
  .update({
    data: {
      name:event.name,
      test: event.test,
    }
  })

  return {
    noAuthList,
    updateAuth,
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}