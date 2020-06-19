// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  app.use(async(ctx,next)=>{
    ctx.data = {}
    ctx.data.openId = event,userInfo.openId
    await next()
  })

  app.router('music',async(ctx,next)=>{
    ctx.data.musicName = '123'
  })

  return app.serve()
}