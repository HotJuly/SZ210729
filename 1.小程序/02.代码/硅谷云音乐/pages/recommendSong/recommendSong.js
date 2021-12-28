// pages/recommendSong/recommendSong.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 月份
        month:"--",
        // 日期
        day:"--",

        // 用于存储每日推荐的歌曲列表
        recommendList:[]
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
    onShow:async function () {
        if(!this.hasPermission())return;

        const date = new Date();
        // getDay是获取本周第几天,getDate是获取本月第几天
        const day = date.getDate();
        const month = date.getMonth()+1;
        this.setData({
            day,
            month
        });

        const result = await this.myAxios('/recommend/songs');
        this.setData({
            recommendList:result.recommend
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