// pages/index/index.js
// 注册一个页面实例对象
Page({

    /**
     * 页面的初始数据
     */
    /*
      乞丐版深拷贝:JSON.parse(JSON.stringify(data))
      缺点:
        1.无法拷贝函数
        2.会导致原型链丢失
        3.他无法转换特殊类型数据,例如Map(转为普通对象),Set(转为普通数组)
    */
    data: {
      msg:"我是初始化数据",
      userInfo:{}
    },

    // 获取用户个人信息-中期版本
    getUserInfo(event){
      // 框架给回调函数传递数据,一般两种渠道,一种this,一种实参
      console.log('getUserInfo',event)
      if(event.detail.rawData){
        // 能进入这个判断,说明用户允许授权了
        const userInfo = event.detail.userInfo;
        this.setData({
          userInfo
        })
      }
    },

    // 用于修改当前页面的msg数据
    changeMsg(){
      this.setData({
        msg:"我是修改之后的数据"
      })
    },

    handleParent(){
      console.log('handleParent')
    },
    handleClick(){
      // console.log('handleClick')
      // wx.navigateTo({
      //   url: '../log/log',
      // })
      wx.redirectTo({
        // url: '/pages/log/log',
        url: '../log/log',
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log('msg',this.data.msg)
      // this.data.msg = "我是修改之后的数据"
      // console.log('msg',this.data.msg)
      // console.log(1)
      // this.setData({
      //   msg:"我是修改之后的数据"
      // })
      // console.log('msg',this.data.msg)

      // this.msg=123;
      // console.log(this.msg)

      // console.log('---------onLoad--------')
      // debugger

      wx.getUserInfo({
        success:(detail)=>{
          // console.log('detail',detail)
          this.setData({
            userInfo:detail.userInfo
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      console.log('---------onReady--------')

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log('---------onShow--------')

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      console.log('---------onHide--------')

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log('---------onUnload--------')

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