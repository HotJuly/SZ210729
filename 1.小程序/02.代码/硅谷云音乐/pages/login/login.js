// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于收集用户的手机号码
        phone:"17688197777",
        password:"",
        form:{
            phone:"123"
        }
    },

    // 用于监视用户修改phone输入框,并同步修改data中的数据
    handlePhone(event){
        // 通过event.detail.value可以获取到输入框的最新值
        // console.log('handlePhone',event)
        const phone = event.detail.value;
        this.setData({
            phone
        })
    },

    // 用于监视用户修改password输入框,并同步修改data中的数据
    handlePassWord(event){
        // 通过event.detail.value可以获取到输入框的最新值
        const password = event.detail.value;
        this.setData({
            password
        })
    },

    // 通过一个函数,收集到两个输入框的数据,并实现更新data
    handleChange(event){
        // 需要在执行函数的时候,就知道是哪个输入框触发的该函数
        const type = event.target.dataset.type;
        const value = event.detail.value;
        this.setData({
            [type]:value
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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