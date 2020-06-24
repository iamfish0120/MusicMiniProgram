// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId:String,
    blog:Object
  },
  externalClasses:["iconfont","icon-pinglun","icon-fenxiang"],

  /**
   * 组件的初始数据
   */
  data: {
    loginShow:false,
    modalShow:false,
    content:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      wx.getSetting({
        success:(res)=>{
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res)=>{
                userInfo = res.userInfo
                //显示评论弹出层
                this.setData({
                  modalShow:true
                })
              }
            })
          }else{
            this.setData({
              loginShow:true
            })
          }
        }
      })
    },
    onLoginsuccess(event){
      userInfo = event.detail
      this.setData({
        loginShow:false
      },()=>{
        this.setData({
          modalShow:true
        })
      })
    },
    onLoginfail(){
      wx.showModal({
        title: '授权用户才能进行评论',
        content: '',
      })
    },
    
    onSend(event){
      //插入数据库
      let formId = event.detail.formId
      let content = event.detail.value.content
      if(content.trim()==''){
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }

      wx.showLoading({
        title: '评价中',
        mask:true
      })
      db.collection('blog-comment').add({
        data:{
          content,
          createTime:db.serverDate(),
          blogId:this.properties.blogId,
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        }
      }).then((res)=>{

        //推送模板消息
        // const tmplId = 'rV_13VS_fEQONMZ01D4YOTKDnM8SpQiEFYYqFM-RA1s'
        // wx.requestSubscribeMessage({
        //   tmplIds: [tmplId],
        //   success(res) {
        //     if (res[tmplId] == 'accept') {
        //       wx.cloud.callFunction({//调用云函数
        //         name: 'sendMessage',//你的云函数名称

        //       }).then((res) => {
        //         wx.showToast({
        //           title: '完成',
        //         })
        //       })
        //     }

        //   }
        // })
      

        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow:false,
          content:''
        })

        //父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })

      
    },
  }
})
