// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js';
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
        recommendList:[],

        // 用于存储用户跳转的歌曲下标
        currentIndex:null
    },

    // 用于监视用户点击歌曲卡片,实现跳转song页面功能
    toSong(event){
        // console.log(event.currentTarget.dataset)
        // const song = event.currentTarget.dataset.song
        const songId = event.currentTarget.dataset.songid
        const currentIndex = event.currentTarget.dataset.index

        this.setData({
            currentIndex
        })
        // url具有长度限制,只能传递小体量数据
        wx.navigateTo({
          url: '/songs/pages/song/song?songId='+songId,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.token = PubSub.subscribe('switchType',(msg,type)=>{
            // console.log('switchType',msg,type)
            let {currentIndex,recommendList} = this.data;
            if(type==="next"){
                // 能进入这里,说明用户点击了下一首按钮
                if(recommendList.length-1===currentIndex){
                    // 如果当前是最后一首歌,就回到第一首
                    currentIndex=0;
                }else{
                    currentIndex++;
                }
            }else{
                if(currentIndex===0){
                    // 如果当前是第一首歌,就回到最后一首
                    currentIndex=recommendList.length-1;
                }else{
                    currentIndex--;
                }
            }

            // 通过处理好的下标,找到对应歌曲的id数据
            const songId = recommendList[currentIndex].id;
            // console.log('songId',songId)
            this.setData({
                currentIndex
            })
            PubSub.publish('sendId',songId);
        })
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
        PubSub.unsubscribe(this.token)
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