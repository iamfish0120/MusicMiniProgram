const rp = require('request-promise')
const APPID = 'wxccafe9a1bce1789b'
const APPSECRET = 'e95f8366a3299217c95aab220279796a'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const fs = require('fs')
const path = require(('path'))
const fileName = path.resolve(__dirname,'./access_token.json')

const updateAccessToken = async()=>{
    const resStr = await rp(URL)
    const res = JSON.parse(resStr)
    //console.log(res)
    if(res.access_token){
        fs.writeFileSync(fileName,JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    }else{
        await updateAccessToken()
    }
}

const getAccessToken = async()=>{
    //读文件
    try {
        const readRes = fs.readFileSync(fileName,'utf8')
        const readObj = JSON.parse(readRes)
        //console.log(readObj.access_token)
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if((nowTime - createTime)/1000/60/60 >= 2){
            await updateAccessToken()
            await getAccessToken()
        }
        //console.log(readObj.access_token)
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }
}

setInterval(async()=>{
    await updateAccessToken()
},(7200-300)*1000)

// updateAccessToken()
//  console.log(getAccessToken())
module.exports = getAccessToken