const AUTH_MODE ='fingerPrint'
 Page({
  data:{
    control:'开锁',
    count:0
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载时就获取后台的数据
    this.get_data()
  },
/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

},
send4: function () {
  this.data.control = ((this.data.control == "开锁") ? "关锁" : "开锁"),
    this.setData({
      control: this.data.control
    })
  wx.showToast({
    title: ((this.data.control == "开锁") ? "关锁" : "开锁"),
    duration: 1000
  })
  this.sendRequset(this.makeObj(this.data.control, ""));
},

sendRequset: function (obj) {
  wx.request(obj);
},
makeObj: function (sta,msg) {
  var obj = {
    url: "https://api.heclouds.com/devices/505305008/datapoints?type=3",

    header: {
      "Content-Type": "application/json",
      "api-key": "OxJfTPB9yc2TdUGvghG0EIA0QeA=",
    },
    method: "post",
    data: {

      
      "control": sta == "开锁" ? "ssuo" : "ksuo",
    
    },
    success: function (res) {
      if (msg != "") {
        wx.showToast({
          title: msg,
          duration: 2000
        })

      }
    }
  }
  return obj;
},

get_data: function () {
  // 获取数据
  var that = this;
  wx.request({
    url: 'https://api.heclouds.com/devices/505305008/datapoints?datastream_id=control&limit=1',
    header: {
      'content-type': 'application/json',
      'api-key': 'OxJfTPB9yc2TdUGvghG0EIA0QeA='
    },

    success: function (res) {
      console.log(res.data)
      wx.showToast({
        title: "OK",
        duration: 1000
      })


     

    }
  })
  }, 
   startAuth() {
     const startSoterAuthentication = () => {
       wx.startSoterAuthentication({
         requestAuthModes: [AUTH_MODE],
         challenge: 'test',
         authContent: '小程序示例',
         success: (res) => {
           wx.showToast({
             title: '认证成功'
           }),
             this.data.control = ((this.data.control == "开锁") ? "关锁" : "开锁"),
             this.setData({
               control: this.data.control
             })
           wx.showToast({
             title: ((this.data.control == "开锁") ? "关锁" : "开锁"),
             duration: 1000
           })
           this.sendRequset(this.makeObj(this.data.control, ""));
         },
         fail: (err) => {
           console.error(err)
           wx.showModal({
             title: '失败',
             content: '认证失败',
             showCancel: false
           })
         }
       })
     }

     const checkIsEnrolled = () => {
       wx.checkIsSoterEnrolledInDevice({
         checkAuthMode: AUTH_MODE,
         success: (res) => {
           console.log(res)
           if (parseInt(res.isEnrolled) <= 0) {
             wx.showModal({
               title: '错误',
               content: '您暂未录入指纹信息，请录入后重试',
               showCancel: false
             })
             return
           }
           startSoterAuthentication();
         },
         fail: (err) => {
           console.error(err)
         }
       })
     }

     wx.checkIsSupportSoterAuthentication({
       success: (res) => {
         console.log(res)
         checkIsEnrolled()
       },
       fail: (err) => {
         console.error(err)
         wx.showModal({
           title: '错误',
           content: '您的设备不支持指纹识别',
           showCancel: false
         })
       }
     })
   }
 
})