// pages/song/song.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储当前页面歌曲详细信息
        songObj:{},

        // 用于存储当前页面歌曲的url信息
        musicUrl:"",

        // 用于控制当前页面的C3效果
        isPlay:false
    },

    // 用于监视用户点击播放按钮,实现歌曲播放功能
    handlePlay(){
        // console.log('handlePlay1')
        const backgroundAudioManager = wx.getBackgroundAudioManager();
        if(!this.data.isPlay){
            backgroundAudioManager.src=this.data.musicUrl;
            backgroundAudioManager.title=this.data.songObj.name;

        }else{
            backgroundAudioManager.pause();
        }
        
        this.setData({
            isPlay:!this.data.isPlay
        })
        // console.log('handlePlay2')
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

        const result2 = await this.myAxios('/song/url',{id:songId})
        this.setData({
            musicUrl:result2.data[0].url
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