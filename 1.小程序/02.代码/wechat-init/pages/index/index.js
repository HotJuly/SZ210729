// pages/index/index.js
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
      msg:"我是初始化数据"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log('msg',this.data.msg)
      // this.data.msg = "我是修改之后的数据"
      // console.log('msg',this.data.msg)
      // console.log(1)
      this.setData({
        msg:"我是修改之后的数据"
      })
      console.log('msg',this.data.msg)

      // this.msg=123;
      // console.log(this.msg)
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