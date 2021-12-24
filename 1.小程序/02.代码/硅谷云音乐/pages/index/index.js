Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页轮播图数据
    banners:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      请求必须知道的三件事
        1.在哪发
          onLoad->相当于Vue的created
        2.怎么发
          在小程序中全局对象不是window,因为小程序没有遵守W3C的规则,所以不支持BOM
          小程序的全局对象是wx
          wx.request(Object object)
        3.往哪发
          接口文档
            请求三要素
              1.路由地址
              2.请求参数
              3.请求方式
    
    */
    //  console.log('wx',wx)
    // console.log(1)  
    wx.request({
      url:"http://localhost:3000/banner",
      data:{
        type:2
      },
      success:(res)=>{
        // res就是响应报文,其中具有响应头和响应体
        console.log('res',res)
        this.setData({
          banners:res.data.banners
        })
      }
    })
    // console.log(2)
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
    
  }
})