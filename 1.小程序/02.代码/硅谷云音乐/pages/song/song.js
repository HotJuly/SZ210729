// pages/song/song.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储当前页面歌曲详细信息
        songObj:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        // console.log('options',options.songId)

        const songId = options.songId;

        // const song = JSON.parse(options.song)
        const result = await this.myAxios('/song/detail',{
            ids:songId
        })
        this.setData({
            songObj:result.songs[0]
        })

        wx.setNavigationBarTitle({
            title:this.data.songObj.name
        })
        // console.log('result',result)
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