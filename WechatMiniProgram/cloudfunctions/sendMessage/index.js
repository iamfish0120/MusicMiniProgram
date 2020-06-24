// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const templateId = 'FK1nwB_RM2_qLk-iPyOjFPsjSBzh66FVBUdsCdHHCbc'

    return await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
      lang: 'zh_CN',
      data: {
        thing1: {
          value: '123'
        },

        thing3: {
          value: '123'
        }

      },
      templateId: templateId,
      miniprogramState: 'developer'
    })
    console.log(result)
    return result

  } catch (err) {
    console.log(err)
    return err
  }
}