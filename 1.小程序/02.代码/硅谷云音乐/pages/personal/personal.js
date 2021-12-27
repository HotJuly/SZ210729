// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        // 用于存储手指移动距离
        moveDistance:0,

        //  用于控制元素移动的过渡样式
        moveTransition:"",

        // 用于存储用户个人信息
        userInfo:{}
    },

    // 用于跳转到登录界面
    toLogin(){
        wx.navigateTo({
          url: '/pages/login/login'
        })
    },

    // 用于监视用户手指按下事件
    handleTouchStart(event){
        // console.log('handleTouchStart',event)
        this.startY = event.touches[0].clientY;
        this.setData({
            moveTransition:""
        })
    },

    // 用于监视用户手指滑动事件
    handleTouchMove(event){
        // console.log('handleTouchMove',event)
        const moveY = event.touches[0].clientY;
        const moveDistance = moveY - this.startY;
        console.log('moveDistance',moveDistance)
        if(moveDistance>=80||moveDistance<=0)return;
        this.setData({
            moveDistance
        })
    },

    // 用于监视用户手指滑动事件
    handleTouchEnd(){
        this.setData({
            moveTransition:"transform 1s",
            moveDistance:0
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 由于personal页面是一个tabBar页面,他一直存在,不会销毁,所以onLoad不太好使,只会执行一次
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
        const userInfo = wx.getStorageSync("userInfo");
        // console.log(userInfo)
        this.setData({
            userInfo
        })
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